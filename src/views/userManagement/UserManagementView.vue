<template>
  <div style="padding: 20px;">
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-input
            v-model="params.name"
            placeholder="请输入姓名"
            clearable
          />
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model="params.phone"
            placeholder="请输入联系方式"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button type="primary" @click="handleAddUser">添加用户</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="编号" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="address" label="地址" />
      <el-table-column prop="phone" label="联系方式" />
      <el-table-column prop="sex" label="性别" />

      <el-table-column   label="操作" >
        <template #default>
            <!-- scope.row 就是当前行数据 -->
            <el-button type="primary">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
      <el-pagination
        v-model:current-page="params.pageNum"
        v-model:page-size="params.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="sizes, prev, pager, next,  "
        :total="params.total"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Search } from "@element-plus/icons-vue"
// import type { FormInstance, FormRules } from 'element-plus'
import { getUserList } from '@/api/user'
import { useRouter } from 'vue-router';

const tableData = ref<object[]>([])
const formInline = reactive({
  user: '',
  region: '',
  date: ''
})

const onSubmit = () => {
  params.pageNum = 1
  getList()
}


const params = reactive({
  pageNum:1,
  pageSize:10,
  total:0,
  name:"",
  phone:''
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleSizeChange = (_val: number) => {
   params.pageNum = 1
   getList()
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleCurrentChange = (_val: number) => {
  getList()
}



const getList = ()=>{
  getUserList(params).then(res => {
    tableData.value = res.data.list as unknown as object[]
    params.total = res.data.total
  })
}

getList()

const router = useRouter()

const handleAddUser = ()=>{
  router.push("/AddUser")
}

</script>
