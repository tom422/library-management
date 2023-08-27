<template>
  <header class="books-header">
      <div class="logo">
        <img src="../assets/Logo.png" alt="logo"  >
         <span>图书管理系统</span>
      </div>
  </header>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.books-header {
  width: 100%;
  height: 60px ;
  line-height: 60px;
  background: white;
  overflow: hidden;
  margin-bottom: 2px;

  .logo{
    width: 100%;
    line-height: 60px;
  }
  .logo img {
      width: 60px;
      margin-left: 20px;
      vertical-align: middle;
    position: relative;
    top: -4px;
  }
  .logo span{
    margin-left: 25px;
    font-size: 24px;
  }
}
</style>