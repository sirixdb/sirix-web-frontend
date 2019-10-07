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
              <highlight :code="formatXML()"></highlight>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="Tree View">
            <el-card class="box-card">
              <el-tree
                class="filter-tree"
                :data="data"
                :props="defaultProps"
                default-expand-all
                ref="tree"
              ></el-tree>
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
@Component({
  components: {
    highlight
  }
})
export default class TableView extends Vue {
  // pagination
  private queryString: String = "";
  private result: String = "result here";
  private data = [
    {
      id: 1,
      label: "first level 1",
      children: [
        {
          id: 4,
          label: "second level 1-1",
          children: [
            {
              id: 9,
              label: "third level 1-1-1"
            },
            {
              id: 10,
              label: "third level 1-1-2"
            }
          ]
        }
      ]
    },
    {
      id: 2,
      label: "first level 2",
      children: [
        {
          id: 5,
          label: "second level 2-1"
        },
        {
          id: 6,
          label: "second level 2-2"
        }
      ]
    },
    {
      id: 3,
      label: "first level 3",
      children: [
        {
          id: 7,
          label: "second level 3-1"
        },
        {
          id: 8,
          label: "second level 3-2"
        }
      ]
    }
  ];
  private defaultProps = {
    children: "children",
    label: "label"
  };

  private query(queryString: String): void {
    axios
      .get("/api/search", {
        params: {
          string: queryString
        }
      })
      .then((res: any) => {
        // console.log(res);
        this.result = res.data;
      });
  }
  private formatRaw() {
    return "raw view";
  }
  private formatJSON() {
    return `{
    data: {
        num: 5
    },
    name: "jack"
}`;
  }
  private formatXML() {
    return `<ul>
  <li class="li-1"><p>Hello</p></li>
  <li>
    <span style="color: red;">
      Hello
    </span>
  </li>
</ul>`;
  }
  private formatTree() {
    return "raw view";
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
  }
  .box-card {
    margin: 15px 0;
    text-align: left;
  }
}
</style>
