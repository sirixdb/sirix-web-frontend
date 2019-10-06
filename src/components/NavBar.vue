<template>
    <el-menu mode="horizontal" :router="true" class="nav">
        <el-menu-item index="/" :route="{ name: 'home' }">
            <img class="nav-logo" alt="SirixDB" src="../assets/logo.png"/>
        </el-menu-item>
        <el-menu-item index="/" :route="{ name: 'home' }">Home</el-menu-item>
        <el-menu-item index="/about" :route="{ name: 'about' }">About</el-menu-item>
        <el-menu-item index="/table" :route="{ name: 'table' }">Table</el-menu-item>
    </el-menu>
</template>
