<template>
  <div class="query-component">
    <h3>Compare</h3>
    <el-row>
      <el-col :md="11">
        <el-card class="box-card">
          <highlight :code="jsonLeft"></highlight>
        </el-card>
      </el-col>
      <el-col :md="11" :offset="2">
        <el-card class="box-card">
          <highlight :code="jsonRight"></highlight>
        </el-card>
      </el-col>
    </el-row>
    <el-button type="primary" @click="query(queryString)">RUN</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import highlight from "~/components/CodeHighLight/index.vue";

import axios from "~/plugins/axios";
import "~/mock/mock.js";

@Component({
  components: {
    highlight
  }
})
export default class TableView extends Vue {
  // pagination
  private queryString: String = "";
  private jsonLeft: String = "";
  private jsonRight: String = "";

  private treeProps = {
    label: "nodeName",
    children: "children"
  };

  private mounted() {
    this.query(this.queryString);
  }
  private query(queryString: String): void {
    axios
      .get("/api/json", {
        params: {
          string: queryString
        }
      })
      .then((res: any) => {
        console.log(res);
        this.jsonLeft = res.data.toString(16);
        axios
          .get("/api/comparejson", {
            params: {
              string: queryString
            }
          })
          .then((res: any) => {
            console.log(res);
            this.jsonRight = res.data.toString(16);
            this.compare(this.jsonLeft, this.jsonRight);
          });
      });
  }
  private compare(jsonLeft: any, jsonRight: any) {
    var left = JSON.parse(jsonLeft);
    var right = JSON.parse(jsonRight);
  }
}
</script>

<style lang="scss">
.query-component {
  width: 70%;
  text-align: center;
  margin: auto;
  .result {
    margin-top: 20px;
    .node_name {
      color: rgb(103, 103, 255);
    }
    .isString {
      color: brown;
    }
    .isNum {
      color: black;
    }
  }
  .box-card {
    margin: 15px 0;
    text-align: left;
  }
}
</style>
