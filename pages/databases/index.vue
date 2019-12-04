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
          <el-select v-model="databaseCreateType" placeholder="Select">
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
    <el-tree :data="databases" :props="defaultProps"></el-tree>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { JsonObj } from "vue-meta/types/vue-meta";

@Component
export default class DatabasesView extends Vue {
  created() {
    this.getDatabases().then(databases => {
      this.databases = databases;
    });
  }

  private databases: Array<JsonObj> = [];
  private defaultProps = this.databases;

  private getDatabases(): Promise<Array<JsonObj>> {
    return this.$axios
      .$get("sirix/", {headers: {'accept': 'application/json'}})
      .then((res: any) => {
        let databases: Array<JsonObj> = res['databases'];
        console.log(databases)
        let dataStructure: Array<JsonObj> = [];
        databases.forEach((database: JsonObj) => {
          // Note: this reflects the current return of data from the server. It is expected to change.
          let node: JsonObj = {};
          node['label'] = `${Object.keys(database)[0]} (${Object.values(database)[0]})`;
          dataStructure.push(node);
          console.log(node)
        });
        console.log(dataStructure)
        return Promise.resolve(dataStructure);
      })
      .catch(() => {
        return Promise.resolve(new Array());
      });
  }

  private getResources(database: string) {
    return this.$axios
      .$get(`sirix/${database}`)
      .then((res: any) => {
        return res.data;
      })
      .catch(() => {
        return Promise.resolve(new Array());
      });
  }

  private databaseForm = { name: "" };
  private databaseTypes: Array<JsonObj> = [
    { label: "XML Database", value: "application/xml" },
    { label: "JSON Database", value: "application/json" }
  ];
  private databaseCreateType: string = "";
  private createDatabaseSpinner: boolean = false;
  private databaseDialogFormVisible = false;

  private createNewDatabase(): void {
    this.createDatabaseSpinner = true;
    this.newDatabase(this.databaseForm.name, this.databaseCreateType).then(
      (success: boolean) => {
        if (success) {
          this.databaseDialogFormVisible = false;
        } else {
        }
        this.createDatabaseSpinner = false;
      }
    );
  }

  private newDatabase(name: string, databaseType: string): Promise<boolean> {
    return this.$axios
      .$put(`sirix/${name}`, { "content-type": databaseType })
      .then((res: any) => {
        console.log(res);
        return true;
      })
      .catch(e => {
        console.log(e);
        return false;
      });
  }
}
</script>
