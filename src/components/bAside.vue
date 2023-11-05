<template>
  <div class="left-menu bgColor">
    <el-menu
      
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      router
      @open="handleOpen"
      @close="handleClose"
      :default-active="$route.path"
      
    >
      <el-menu-item index="/">
        <el-icon><HomeFilled /></el-icon> 
        <template #title>首页</template>
      </el-menu-item>
      <el-sub-menu index="user"> 
        <template #title>
          <el-icon><location /></el-icon>
          <span>会员管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/user">会员列表</el-menu-item>
          <el-menu-item index="/addUser">添加会员</el-menu-item>
        </el-menu-item-group>
        
         
      </el-sub-menu>
      <el-sub-menu index="admin">
        <template #title>
          <el-icon><location /></el-icon>
          <span>管理员管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin">管理员列表</el-menu-item>
          <el-menu-item index="/AddAdmin">添加用管理员</el-menu-item>
        </el-menu-item-group>
        
         
      </el-sub-menu>

      
      <el-menu-item index="/about">
        <el-icon><icon-menu /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Document,
  Menu as IconMenu,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Location,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Setting
} from '@element-plus/icons-vue'

const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
.left-menu {
  overflow-y: auto;

  height: 100%;
}
</style>
