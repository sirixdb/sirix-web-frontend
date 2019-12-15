<template>
  <div class="databases">
    <el-button-group>
      <el-button
        type="primary"
        icon="el-icon-circle-plus"
        @click="databaseDialogFormVisible = true"
      >Create New Database</el-button>
    </el-button-group>
    <el-dialog title="Create New Database" :visible.sync="databaseDialogFormVisible">
      <el-form :model="databaseForm">
        <el-form-item label="Database name">
          <el-input v-model="databaseForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Database type">
          <el-select v-model="databaseForm.type" placeholder="Select">
            <el-option
              v-for="item in databaseTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="databaseDialogFormVisible = false">Cancel</el-button>
        <el-button
          :loading="createDatabaseSpinner"
          id="confirmDatabaseCreation"
          type="primary"
          @click="createNewDatabase()"
        >Create</el-button>
      </span>
    </el-dialog>

    <h3>Databases</h3>
    <el-tree :data="databases" :props="defaultProps" @node-click="handleNodeClick" />
    <file-upload
      v-if="addResource"
      v-bind:options="fileUploadOptions"
      style="width: 50vw; float: right; height: 125px;"
      v-on:uploaded="addChildResource"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { JsonObj, JsonVal } from "vue-meta/types/vue-meta";
import FileUpload from "@/components/FileUpload.vue";

@Component({
  components: {
    FileUpload
  }
})
export default class DatabasesView extends Vue {
  created() {
    this.getDatabases().then(databases => {
      this.databases = databases;
    });
  }

  private currentlySelectedTreeNode:JsonObj = {};
  private databases: Array<JsonObj> = [];
  private defaultProps = this.databases;
  private addResource = false;
  private fileUploadOptions = {};

  private addChildResource(formData: FormData) {
    formData.forEach((value: FormDataEntryValue, key: string, parent: FormData)  => {
      let resourcesNode = this.currentlySelectedTreeNode.children as JsonVal[];
      let resourceNode: JsonObj = {};
      resourceNode["label"] = key;
      resourcesNode.push(resourceNode);
    });
  }

  private handleNodeClick(treeNode: JsonObj) {
    this.currentlySelectedTreeNode = treeNode;

    debugger;

    const label = treeNode.label as String;
    const databaseName = label.substring(0, label.indexOf("(") - 1);
    const databaseType = label.substring(
      label.indexOf("(") + 1,
      label.indexOf(")")
    );

    if (!databaseType || databaseType.length == 0) {
      this.addResource = false;
      return;
    }

    this.addResource = true;
    let acceptedFiles = "";
    
    if (databaseType == "json") acceptedFiles = "application/json";
    else if (databaseType == "xml") acceptedFiles = "application/xml";

    this.fileUploadOptions = {
      url: `${this.$axios.defaults.baseURL}/sirix/${databaseName}`,
      acceptedFiles: acceptedFiles
    };
  }

  private getDatabases(): Promise<Array<JsonObj>> {
    return this.$axios
      .$get("sirix?withResources=true", {
        headers: { accept: "application/json" }
      })
      .then((res: any) => {
        let databases: Array<JsonObj> = res["databases"];
        let treeData: Array<JsonObj> = [];
        databases.forEach((database: JsonObj) => {
          let databaseNode: JsonObj = {};
          databaseNode["label"] = `${database.name} (${database.type})`;

          let resources = database["resources"] as JsonVal[];
          let resourcesNode: JsonVal[] = [];

          if (resources != null) {
            resources.forEach((resource: JsonVal) => {
              let resourceNode: JsonObj = {};
              resourceNode["label"] = resource;
              resourcesNode.push(resourceNode);
            });
          }

          databaseNode["children"] = resourcesNode;
          treeData.push(databaseNode);
        });
        return Promise.resolve(this.sortDatabases(treeData));
      })
      .catch(() => {
        return Promise.resolve(new Array());
      });
  }

  private sortDatabases(databases: Array<JsonObj>): Array<JsonObj> {
    databases.sort((d1, d2) =>
      String(d1.label).localeCompare(String(d2.label))
    );
    return databases;
  }

  private getResources(database: string, databaseType: string) {
    return this.$axios
      .$get(`sirix/${database}`)
      .then((res: any) => {
        return res.data;
      })
      .catch(() => {
        return Promise.resolve(new Array());
      });
  }

  private databaseForm = { name: "", type: "" };
  private databaseTypes: Array<JsonObj> = [
    { label: "XML Database", value: "application/xml" },
    { label: "JSON Database", value: "application/json" }
  ];
  private databaseCreateType: string = "";
  private createDatabaseSpinner: boolean = false;
  private databaseDialogFormVisible = false;

  private createNewDatabase(): void {
    this.createDatabaseSpinner = true;
    let databaseName = this.databaseForm.name;
    let databaseType = this.databaseForm.type;

    this.newDatabase(databaseName, databaseType).then((success: boolean) => {
      if (success) {
        const type = databaseType.substring(databaseType.indexOf("/") + 1);
        this.databaseDialogFormVisible = false;
        this.databases.push({ label: `${databaseName} (${type})` });
        this.sortDatabases(this.databases);
      }
      this.createDatabaseSpinner = false;
    });
  }

  private newDatabase(name: string, databaseType: string): Promise<boolean> {
    return this.$axios
      .$put(`sirix/${name}`, {}, { headers: { "content-type": databaseType } })
      .then((res: any) => {
        return true;
      })
      .catch(e => {
        return false;
      });
  }
}
</script>

<style scoped>
.el-tree {
  width: 40vw;
  float: left;
}
</style>
