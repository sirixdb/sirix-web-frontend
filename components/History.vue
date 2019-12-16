<template>
  <div class="block">
    <div class="radio">
      Order:
      <el-radio-group v-model="reverse">
        <el-radio :label="true">descending</el-radio>
        <el-radio :label="false">ascending</el-radio>
      </el-radio-group>
    </div>

    <el-timeline :reverse="reverse">
      <el-timeline-item
        v-for="(hist, index) in history"
        :key="index"
        :timestamp="hist.revisionTimestamp"
      >
        <el-card>
          <h4>{{ hist.commitMessage }}</h4>
          <p>{{ hist.author }} committed {{ hist.revision }} on {{ hist.revisionTimestamp }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
props: ["database", "resource", "contentType"];

export default {
  data() {
    return this.$axios
      .$get(`sirix/${this.database}/${this.resource}/history`, {
        headers: { accept: `${this.contentType}` }
      })
      .then(res => {
        return res.data;
      })
      .catch(() => {
        return Promise.resolve({});
      });
  }
};
</script>

<style scoped>
</style>