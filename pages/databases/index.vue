<template>
  <div class="databases">
    <el-button-group>
      <el-button type="primary" icon="el-icon-circle-plus" @click="databaseDialogFormVisible = true">Create New Database</el-button>
    </el-button-group>
    <el-dialog title="Create New Database" :visible.sync="databaseDialogFormVisible">
      <el-form :model="databaseForm">
        <el-form-item label="Database name" required=true>
          <el-input v-model="databaseForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="databaseDialogFormVisible = false">Cancel</el-button>
        <el-button id="confirmDatabaseCreation" type="primary" @click="createNewDatabase()">Create</el-button>
      </span>
    </el-dialog>

    <h3>Databases</h3>
    <el-tree :data="databases" :props="defaultProps"></el-tree>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TreeView extends Vue {
  created() {
    console.log("begin");
    this.getDatabases().then(databases => {
      this.databases = databases;
    });
    this.databases.forEach(element => {
      for (let database in element.keys) {
        this.getResources(database);
      }
    });
  };

  private databases: Array<Map<string, string>> = [];
  private defaultProps = this.databases;

  private databaseDialogFormVisible = false;
  
  private databaseForm = { name: '' }

  private getDatabases(): Promise<Array<Map<string, string>>> {
    return this.$axios
      .$get("/sirix")
      .then((res: any) => {
        return Promise.resolve(res.data);
      })
      .catch(() => {
        return Promise.resolve(new Array());
      });
  }

  private getResources(database: string) {
    this.$axios
      .$get(`sirix/${database}`)
      .then((res: any) => {
        console.log(res.data);
      })
      .catch(() => {
        return Promise.resolve(new Array());
      });
  }

  private createNewDatabase() : void {
    // TODO modify spinner (loading) of create button
    this.newDatabase(this.databaseForm.name)
      .then((success : boolean) => {
        if (success) {
          this.databaseDialogFormVisible = false;
        } else {

        }
      })
  }

  private newDatabase(name: string) : Promise<boolean> {
    return this.$axios
      .$put(`sirix/${name}`)
      .then((res: any) => {
        console.log(res);
        return true;
      })
      .catch((e) => {
        console.log(e);
        return false;
      })
  }
}
</script>
