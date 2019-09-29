<template>
  <div class="hello">
    <el-row>
      <el-col :span="12" :offset="6">
        <el-card class="box-card">
          <h1>SIRIXDB</h1>SIRIXDB IS A LOG-STRUCTURED TEMPORAL NOSQL DOCUMENT STORE
          WHICH STORES THE HISTORIES OF ALL RESOURCES IN A SPACE-EFFICIENT MANNER.
          IT SUPPORTS THE EFFICIENT RECONSTRUCTION OF ANY REVISION AS WELL AS COMPARISONS.
          A QUERY PROCESSOR SUPPORTS SOPHISTICATED TIME TRAVEL QUERIES.
          SEE THE OPEN SOURCE REPOSITORY.
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

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
