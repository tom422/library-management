<template>
  <header class="books-header">
    <div class="logo">
      <img src="@/assets/logo.png" alt="logo" />
      <span>图书管理系统</span>
    </div>
    <div  class="header-right">
      <el-dropdown >
        <span class="el-dropdown-link">
          管理员
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout" >退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
const userInfo = ref({})
onMounted(() => {
  const userStr = sessionStorage.getItem('admin')
  if (userStr) {
    userInfo.value = JSON.parse(userStr)
  }
})
function logout() {
   sessionStorage.removeItem('admin')
   location.reload();
}
</script>

<style lang="scss" scoped>
.books-header {
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: white;
  overflow: hidden;
  margin-bottom: 2px;
  display: flex;

  .logo {
    width: 300px;
    line-height: 60px;
  }
  .logo img {
    width: 60px;
    margin-left: 20px;
    vertical-align: middle;
    position: relative;
    top: -4px;
  }
  .logo span {
    margin-left: 25px;
    font-size: 24px;
  }


  .header-right{
    text-align: right;
    flex: 1;
    padding-right:20px ;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
