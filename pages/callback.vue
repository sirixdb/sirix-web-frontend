<template />
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
