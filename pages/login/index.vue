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
    this.$auth.loginWith('keycloak')
  }
}
</script>

<style lang="scss">
</style>
