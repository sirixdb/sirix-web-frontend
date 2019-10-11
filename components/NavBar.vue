<template>
  <el-menu mode="horizontal" :router="true" class="nav">
    <el-menu-item>
      <img class="nav-logo" alt="SirixDB" src="../assets/logo.png" />
    </el-menu-item>
    <el-menu-item index="/" to="/">Home</el-menu-item>
    <el-menu-item index="/about" to="about">About</el-menu-item>
    <el-menu-item index="/table" to="table">Table</el-menu-item>
    <el-menu-item index="/query" to="query">Query</el-menu-item>
    <el-menu-item index="/compare" to="compare">Compare</el-menu-item>
  </el-menu>
</template>