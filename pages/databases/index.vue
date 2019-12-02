<template>
  <div class="databases">
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
}
</script>
