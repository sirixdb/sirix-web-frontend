<template>
  <div>
    <h3>Revision History Metadata</h3>
    <!-- <el-row type="flex" justify="start">
      <el-col :span="2" :offset="3">search:</el-col>
      <el-col :span="3">
        <el-input v-model="keywords" size="mini" placeholder="commit keywords" />
      </el-col>
    </el-row>-->
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
      <el-table-column prop="author" label="author" width="150"></el-table-column>
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
import "@/mock/index.js";
import { Component, Prop, Vue } from "vue-property-decorator";

interface HistoryItem {
  revision: number;
  revisionTimestamp: string;
  author: string;
  commitMessage: string;
}

@Component
export default class TableView extends Vue {
  private history: HistoryItem[] = [
    {
      revision: 3,
      revisionTimestamp: "2019-09-23T18:25:43.511Z",
      author: "Johannes Lichtenberger",
      commitMessage: "Insert a JSON object"
    },
    {
      revision: 2,
      revisionTimestamp: "2019-09-21T15:22:41.121Z",
      author: "Marc Kramis",
      commitMessage: "Remove JSON object record"
    }
  ];

  private keywords: string = "";
  // pagination
  private currentPage: number = 1;
  private pageSize: number = 50;
  private total: number = 0;

  // get GetShowItems(): HistoryItem[] {
  //   let recoderShow: HistoryItem[] = [];
  //   const filterrecoder = this.history.filter((data: HistoryItem) => {
  //     return (
  //       !this.keywords ||
  //       data.commitMessage.toLowerCase().includes(this.keywords.toLowerCase())
  //     );
  //   });

  //   this.total = filterrecoder.length;
  //   if (this.total >= 0) {
  //     const offset = (this.currentPage - 1) * this.pageSize;
  //     recoderShow = filterrecoder.slice(offset, this.pageSize + offset);
  //   }
  //   return recoderShow;
  // }

  private created() {
    this.fetchRevisionCounts().then((total) => {
      this.total = total;
      this.fetchRevisionPaged(total, 0);
    });
  }

  private fetchRevisionCounts(): Promise<number> {
    // wait for api path
    return this.$axios
      .get("/api/counts")
      .then((res: any) => {
        // console.log(res);

        return Promise.resolve(res.data.count);
      })
      .catch(() => {
        return 0;
      });
  }

  private fetchRevisionPaged(total: number, page: number): void {
    this.$axios.get("/api/history", { page }).then((res: any) => {
      // console.log(res);
      this.history = res.data;
    });
  }

  private SizeChange(val: number) {
    this.pageSize = val;
  }

  private CurrentChange(val: number) {
    this.currentPage = val;
    this.fetchRevisionPaged(this.total, val);
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
