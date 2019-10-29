<template>
  <div>
    <h1>You are Secure</h1>
    <el-link type="primary"><el-button type="success">Callback</el-button></el-link>
  </div>
</template>
<script>
export default {
    middleware: ['auth']
}
</script>
<style scoped>
</style>
