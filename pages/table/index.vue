<template>
  <div>
    <h3>Revision History Metadata</h3>
    <el-row type="flex" justify="start">
      <el-col :span="2" :offset="3">search:</el-col>
      <el-col :span="3">
        <el-input v-model="keywords" size="mini" placeholder="commit keywords" />
      </el-col>
    </el-row>
    <el-table :data="GetShowItems" class="data-table">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="index" width="65"></el-table-column>
      <el-table-column prop="revision" label="revision" width="80"></el-table-column>
      <el-table-column prop="revisionTimestamp" label="time" width="220"></el-table-column>
      <el-table-column prop="author" label="author"></el-table-column>
      <el-table-column prop="commitMessage" label="commit"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="SizeChange"
      @current-change="CurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[5,10, 20,30, 50, 100]"
      :page-size="pageSize"
      layout="sizes,total, prev, pager, next"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import { Inject } from "inversify-props";
import HistoryItem from "@/models/historyItem";
import IDataService from "@/services/IDataService";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TableView extends Vue {
  @Inject()
  private dataService!: IDataService;
  private keywords: string = "";

  // pagination
  private currentPage: number = 1;
  private pageSize: number = 10;
  private total: number = 0;

  get GetShowItems(): HistoryItem[] {
    const offset = (this.currentPage - 1) * this.pageSize;
    const response = this.dataService.getHistory(
      this.keywords,
      offset,
      this.pageSize
    );
    this.total = response.total;
    return response.data;
  }

  private SizeChange(val: number) {
    this.pageSize = val;
  }

  private CurrentChange(val: number) {
    this.currentPage = val;
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
