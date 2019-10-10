<template>
  <div class="query-component">
    <h3>Query</h3>
    <el-row>
      <el-col :md="20">
        <el-input type="textarea" :rows="2" placeholder="Query write here" v-model="queryString"></el-input>
      </el-col>
      <el-col :md="4">
        <el-button type="primary" @click="query(queryString)">RUN</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-tabs type="border-card" class="result">
          <!-- <el-tab-pane label="Raw Data">
            <el-card class="box-card">{{formatRaw()}}</el-card>
          </el-tab-pane>-->
          <el-tab-pane label="JSON View">
            <el-card class="box-card">
              <!-- <pre>{{formatJSON()}}</pre> -->

              <highlight :code="formatJSON().toString(16)"></highlight>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="XML View">
            <el-card class="box-card">
              <highlight :code="XML"></highlight>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="Tree View">
            <el-card class="box-card">
              <el-tree :props="treeProps" :data="data" default-expand-all ref="tree">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span class="node_name">{{ node.label }}</span>:
                  <span
                    v-show="data.value"
                    :class="{ isString: typeof(data.value)=='string' }"
                  >{{ data.value}}</span>
                </span>
              </el-tree>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import highlight from "~/components/CodeHighLight/index.vue";

import axios from "~/plugins/axios";
import "~/mock/mock.js";
import json2Tree from "./json2tree";
import json2xml from "./json2xml";
@Component({
  components: {
    highlight
  }
})
export default class TableView extends Vue {
  // pagination
  private queryString: String = "";
  private result: String = "result here. click Run button.";
  private data: any[] = [];
  private XML = "";

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
        this.result = res.data;
        var json = JSON.parse(res.data);
        var data = {
          data: json
        };
        this.data = this.formatTree(data);

        this.XML = this.formatXML(data);
      });
  }
  private formatRaw() {
    return "raw view";
  }
  private formatJSON() {
    return this.result;
  }

  private formatXML(json: any) {
    var xml = json2xml(json);

    return xml;
    //     return `<ul>
    //   <li class="li-1"><p>Hello</p></li>
    //   <li>
    //     <span style="color: red;">
    //       Hello
    //     </span>
    //   </li>
    // </ul>`;
  }
  private formatTree(obj: any) {
    var data = json2Tree({ xml: obj });

    return data;
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
