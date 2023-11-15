<template>
  <div style="padding: 20px">
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-input
            v-model="params.username"
            placeholder="请输入用户名"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model="params.phone"
            placeholder="请输入联系方式"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model="params.email"
            placeholder="请输入邮箱"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="onSearch"
            >搜索</el-button
          >
          <el-button type="warning" :icon="Refresh" @click="onReset"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="button-box">
      <el-button type="primary" @click="handleAddAdmin">添加管理员</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%"
      empty-text="暂无数据"
    >
      <!-- <el-table-column type="index" label="序号" width="60"  /> -->
      <el-table-column prop="id" label="编号" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="phone" label="联系方式" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="createtime" label="创建时间" width="180" />
      <el-table-column label="状态" width="350">
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            @change="handleStatusChange(scope.row)"
            class="ml-2"
            style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="350">
        <template #default="scope">
          <!-- scope.row 就是当前行数据 -->
          <el-button type="primary" v-on:click="handleUpdateAdmin(scope.row.id)"
            >编辑</el-button
          >
          <el-popconfirm
            width="220"
            confirm-button-text="确认"
            cancel-button-text="取消"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="你确定要删除这一条数据吗？"
            @confirm="handleDeleteAdmin(scope.row.id)"
          >
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
          <el-button type="warning" @click="handleChangePassword(scope.row)"
            >修改密码</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
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
    <ChangePassword ref="ChangePasswordRef" @success="getList"></ChangePassword>
  </div>
</template>

<script lang="ts" setup>
import { onActivated, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, InfoFilled, Refresh } from '@element-plus/icons-vue'
// import type { FormInstance, FormRules } from 'element-plus'
import { deleteAdminApi, getAdminList, updateAdminInfoApi } from '@/api/admin'
import { useRouter } from 'vue-router'
import ChangePassword from './ChangePassword.vue'
import { getCurrentAdmin } from '@/utils/getCurrentAdmin'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ChangePasswordRef = ref<any>(null)

function handleChangePassword(admin: unknown) {
  ChangePasswordRef.value?.open(admin)
}

const tableData = ref<object[]>([])
const formInline = reactive({
  Admin: '',
  region: '',
  date: ''
})

const onSearch = () => {
  params.pageNum = 1
  getList()
}
const onReset = () => {
  params.email = ''
  params.phone = ''
  params.username = ''
  onSearch()
}

const params = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
  username: '',
  phone: '',
  email: ''
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

const getList = () => {
  getAdminList(params).then(res => {
    if (res.code == 200) {
      tableData.value = res.data.list as unknown as object[]
      params.total = res.data.total
    } else {
      ElMessage.error(res.msg)
    }
  })
}

onActivated(() => {
  getList()
})
const router = useRouter()

const handleAddAdmin = () => {
  router.push('/AddAdmin')
}

const handleUpdateAdmin = (id: string) => {
  router.push({ path: '/EditAdmin', query: { id } })
}

const handleDeleteAdmin = (id: string) => {
  deleteAdminApi(id).then(res => {
    if (res.code == 200) {
      ElMessage.success('删除成功')
      onSearch()
    } else {
      ElMessage.error(res.msg)
    }
  })
}
const currentAdmin = getCurrentAdmin()

// eslint-disable-next-line no-undef, @typescript-eslint/no-explicit-any
function handleStatusChange(row: any){
  if (currentAdmin.id == row.id && !row.status) {
    row.status = true
    ElMessage.warning('你的操作不合法')
    return
  }
  updateAdminInfoApi(row).then((res)=>{
    if (res.code == 200) {
      ElMessage.success('修改成功')
      getList()
    }else{
      ElMessage.error(res.msg)
    }
  })
}
</script>

<style lang="css" scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
}

.button-box {
  text-align: right;
  padding: 15px 0;
}
</style>
