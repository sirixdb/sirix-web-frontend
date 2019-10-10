<template>
  <div>
    <h3>Revision History Metadata</h3>
    <el-pagination
      @size-change="SizeChange"
      @current-change="CurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[5,10, 20,30, 50, 100]"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total"
    ></el-pagination>
    <el-table :data="history" class="data-table">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="index" width="65"></el-table-column>
      <el-table-column prop="revision" label="revision" width="80"></el-table-column>
      <el-table-column prop="revisionTimestamp" label="time" width="220"></el-table-column>
      <el-table-column prop="author" label="author" width="140"></el-table-column>
      <el-table-column prop="commitMessage" label="commit"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="SizeChange"
      @current-change="CurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[5,10, 20,30, 50, 100]"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import { Inject } from "inversify-props";
import HistoryItem from "@/models/HistoryItem";
import IDataService from "@/services/IDataService";
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "~/plugins/axios";
import "~/mock/mock.js";
@Component
export default class TableView extends Vue {
  private dataService!: IDataService;
  private keywords: string = "";

  // pagination
  private currentPage: number = 1;
  private pageSize: number = 50;
  private total: number = 0;

  private history: HistoryItem[] = [
    {
      revision: 3,
      revisionTimestamp: "2019-09-23T18:25:43.511Z",
      author: "Johannes Lichtenberger",
      commitMessage: "Insert a JSON object"
    }
  ];

  private created() {
    this.fetchRevisionCounts().then(total => {
      this.total = total;
      this.fetchRevisionPaged(total, 1, this.pageSize);
    });
  }

  private fetchRevisionCounts(): Promise<number> {
    // wait for api path
    return axios
      .get("/api/counts")
      .then((res: any) => {
        // console.log(res);

        return Promise.resolve(res.data.count);
      })
      .catch(() => {
        return 0;
      });
  }

  private fetchRevisionPaged(
    total: number,
    page: number,
    pageSize: number
  ): void {
    axios
      .get("/api/history", {
        params: {
          total: total,
          page: page,
          pageSize: pageSize
        }
      })
      .then((res: any) => {
        // console.log(res);
        this.history = res.data;
      });
  }

  private SizeChange(val: number) {
    this.pageSize = val;
  }

  private CurrentChange(val: number) {
    this.currentPage = val;
    this.fetchRevisionPaged(this.total, val, this.pageSize);
  }
}
</script>

<style lang="scss">
.data-table {
  width: 70%;
  text-align: center;
  margin: auto;
}
</style>
