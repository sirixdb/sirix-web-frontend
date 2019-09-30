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

<script>
export default {
  data() {
    return {
      history: [
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
        },
        {
          revision: 1,
          revisionTimestamp: "2019-09-19T12:12:43.111Z",
          author: "Marc Kramis",
          commitMessage: "Initial commit"
        },
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
        },
        {
          revision: 1,
          revisionTimestamp: "2019-09-19T12:12:43.111Z",
          author: "Marc Kramis",
          commitMessage: "Initial commit"
        },
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
        },
        {
          revision: 1,
          revisionTimestamp: "2019-09-19T12:12:43.111Z",
          author: "Marc Kramis",
          commitMessage: "Initial commit"
        },
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
        },
        {
          revision: 1,
          revisionTimestamp: "2019-09-19T12:12:43.111Z",
          author: "Marc Kramis",
          commitMessage: "Initial commit"
        },
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
        },
        {
          revision: 1,
          revisionTimestamp: "2019-09-19T12:12:43.111Z",
          author: "Marc Kramis",
          commitMessage: "Initial commit"
        },
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
        },
        {
          revision: 1,
          revisionTimestamp: "2019-09-19T12:12:43.111Z",
          author: "Marc Kramis",
          commitMessage: "Initial commit"
        },
      ],

      keywords: "",
      // pagination
      currentPage: 1,
      pageSize: 10,
      total: 0,
    };
  },
  computed: {
    GetShowItems() {
      let recoderShow = [];
      const filterrecoder = this.history.filter((data) => {
        return (
          !this.keywords ||
          data.commitMessage.toLowerCase().includes(this.keywords.toLowerCase())
        );
      });

      this.total = filterrecoder.length;
      if (this.total >= 0) {
        const offset = (this.currentPage - 1) * this.pageSize;
        recoderShow = filterrecoder.slice(offset, this.pageSize + offset);
      }
      return recoderShow;
    }
  },
  methods: {
    SizeChange(val) {
      this.pageSize = val;
    },
    CurrentChange(val) {
      this.currentPage = val;
    }
  },
};
</script>

<style lang="scss">
.data-table {
  width: 70%;
  text-align: center;
  margin: auto;
}
</style>
