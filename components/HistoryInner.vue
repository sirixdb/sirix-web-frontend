<template>
  <div class="block">
    <div class="radio, space">
      Order:
      <el-radio-group v-model="reverse">
        <el-radio :label="true">descending</el-radio>
        <el-radio :label="false">ascending</el-radio>
      </el-radio-group>
    </div>

    <el-timeline :reverse="reverse">
      <el-timeline-item
        placement="top"
        v-for="(hist, index) in history"
        :key="index"
        :timestamp="hist.revisionTimestamp"
      >
        <el-card>
          <h4>{{ hist.commitMessage || "No commit message" }}</h4>
          <p>
            <strong>{{ hist.author }}</strong> committed
            <strong>
              <el-button
                type="text"
                @click="() => $emit('revision', hist.revision)"
              >revision {{ hist.revision }}</el-button>
            </strong> on
            <em>{{ hist.revisionTimestamp }}</em>
          </p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  props: ["reverse", "history"]
};
</script>

<style scoped>
.space {
  margin-bottom: 2em;
}
</style>
