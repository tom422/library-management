<template>
  <div style="padding: 20px">
    <div>
      <el-form :inline="true" :model="params" class="demo-form-inline">
        <el-form-item label="">
          <el-input
            v-model="params.name"
            placeholder="请输入用户名"
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
      <el-button type="primary" @click="handleAddCategory"
        >添加分类</el-button
      >
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
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="remark" label="备注" />
      <el-table-column prop="createtime" label="创建时间" width="180" />
      <el-table-column prop="updatetime" label="更新时间" width="180" />
      <el-table-column label="操作" width="350">
        <template #default="scope">
          <!-- scope.row 就是当前行数据 -->
          <el-button
            type="primary"
            v-on:click="handleUpdateCategory(scope.row.id)"
            >编辑</el-button
          >
          <el-popconfirm
            width="220"
            confirm-button-text="确认"
            cancel-button-text="取消"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="你确定要删除这一条数据吗？"
            @confirm="handleDeleteCategory(scope.row.id)"
          >
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
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
import { deleteCategoryApi, getCategoryList } from '@/api/category'
import { useRouter } from 'vue-router'

const tableData = ref<object[]>([])

const onSearch = () => {
  params.pageNum = 1
  getList()
}
const onReset = () => {
  params.name = ''

  onSearch()
}

const params = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
  name: ''
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
  getCategoryList(params).then(res => {
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

const handleAddCategory = () => {
  router.push('/AddCategory')
}

const handleUpdateCategory = (id: string) => {
  router.push({ path: '/EditCategory', query: { id } })
}

const handleDeleteCategory = (id: string) => {
  deleteCategoryApi(id).then(res => {
    if (res.code == 200) {
      ElMessage.success('删除成功')
      onSearch()
    } else {
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
