<template>
  <div class="hello">
    <el-row>
      <el-col :span="12" :offset="6">
        <el-card class="box-card">
          <h1>SirixDB</h1>SirixDB is a log-structured temporal, versioned NoSQL document store which stores the histories of all resources in a space-efficient manner.
          It supports the efficient reconstruction of any revision as well as comparisons thereof.
          A query processor supports sophisticated time travel queries.
          See the
          <a
            href="https://github.com/sirixdb/sirix"
          >open source repository</a>.
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.box-card {
  text-align: center;
}
</style>