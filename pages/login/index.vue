<template>
  <div>
    <h3>Login</h3>
    <el-button type="primary" @click="login()">Login via Keycloak</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

//import axios from "~/plugins/axios";

@Component
export default class Login extends Vue {
  private login(): void {
    console.log("bla")
    this.$axios
      .$get("https://localhost:9443/user/authorize", {})
      .then((res: any) => {
        console.log(res);
      });
  }
}
</script>

<style lang="scss">
</style>
