<template>
  <div>
    <h1 v-if="loggedIn()">You are logged in.</h1>
    <h1 v-else="!loggedIn()">You are not logged in.</h1>
  </div>
</template>
<script>
export default {
  props: [
    'expanded'
  ],

  middleware: ['auth'],

  methods: {
  	loggedIn() {
      return this.$auth.loggedIn
   	},

    async logout() {
      await this.$auth.logout()
      this.$router.push('/login')
    }
  }
}
</script>
<style scoped>
</style>
