<template>
  <div class="home">
    <div class="common-layout">
        <b-header></b-header>
        <el-container class="controller">
          <el-aside width="200px">
            <b-aside></b-aside>
          </el-aside>
          <el-container style="padding-left: 4px">
            <el-main class="bgColor">
                <router-view v-slot="{ Component }">
                  <keep-alive>
                      <component :is="Component" />
                    </keep-alive>
                </router-view>
            </el-main>
          </el-container>
        </el-container>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BHeader from "@/components/bHeader.vue";
import BAside from "@/components/bAside.vue";
export default defineComponent({
  name: 'HomeView',
  components: {
    BHeader,
    BAside
    // HelloWorld,
  },

});
</script>
<style scoped lang="scss">
.home{
  min-height: 100vh;
}
.common-layout{
  .controller{
    height: calc(100vh - 62px) ;
  }
}
</style>
