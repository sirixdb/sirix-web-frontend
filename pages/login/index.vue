<template>
  <div>
    <h3>Login</h3>
    <el-button type="primary" @click="login()">Login via Keycloak</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Login extends Vue {
  private login(): void {
    // window.open("https://localhost:9443/user/authorize", "_self")
    this.$auth.loginWith('keycloak')
    console.log("logged in?" + this.$auth.loggedIn)
  }
}
</script>

<style lang="scss">
</style>
