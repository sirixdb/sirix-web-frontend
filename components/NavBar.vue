<template>
  <el-menu mode="horizontal" :router="true" class="nav">
    <el-menu-item>
      <img class="nav-logo" alt="SirixDB" src="../assets/logo.png" />
    </el-menu-item>
    <el-menu-item index="/" to="/">Home</el-menu-item>
    <el-menu-item index="/databases" to="about">Databases</el-menu-item>
    <el-menu-item index="/table" to="table">Table</el-menu-item>
    <el-menu-item index="/query" to="query">Query</el-menu-item>
    <el-menu-item index="/compare" to="compare">Compare</el-menu-item>
    <el-menu-item v-if="loggedIn()" @click="logout()">Logout</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  methods: {
    loggedIn() {
      return this.$auth.loggedIn;
    },

    async logout() {
      const options = this.$auth.strategies.keycloak.options;
      const accessToken = this.$auth.getToken("keycloak");
      const refreshToken = this.$auth.getRefreshToken("keycloak");
      await this.$axios.$post(
        "sirix/logout",
        {
          access_token: accessToken.replace(options.token_type + " ", ""),
          refresh_token: refreshToken.replace(options.token_type + " ", "")
        },
        {}
      );
      await this.$auth.logout();
      this.$router.push("/login");
    }
  }
};
</script>