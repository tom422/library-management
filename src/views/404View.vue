<template>
  <div style="text-align: center; min-height: 100vh" class="page-box">
    <div >
      <div style="font-size: 100px">404</div>
      <div style="font-size: 35px">未找到页面</div>
      <div  >
        <el-button type="text" @click="$router.push('/')">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
    .page-box{
        display: flex;
        flex-direction: column;
         padding-top: 20vh;
    }

</style>
