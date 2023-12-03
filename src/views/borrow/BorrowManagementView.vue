<template>
  <div style="padding: 20px">
    <div>
      <el-form :inline="true" :model="params" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="params.bookName" placeholder="请输入图书名称" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="params.bookNo" placeholder="请输入图书标准码" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="params.userName" placeholder="请输入用户名称" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="onSearch">搜索</el-button>
          <el-button type="warning" :icon="Refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button-box">
      <el-button type="primary" @click="handleAddBorrow">添加图书</el-button>
    </div>
    <el-table :data="tableData" stripe row-key="id" :tree-props="{ children: 'children' }" default-expand-all border
      style="width: 100%" empty-text="暂无数据" show-overflow-tooltip>
      
      <el-table-column prop="id" label="编号" />
      <el-table-column prop="bookName" label="图书名称" width="200px" />
      <el-table-column prop="bookNo" label="图书标准码"  width="200px" />
      <el-table-column prop="userNo" label="会员码" width="200px"  />
      <el-table-column prop="userName" label="用户名称" width="200px"  />
      <el-table-column prop="userPhone" label="用户联系方式" width="200px"  />
      <el-table-column prop="score" label="借书积分" width="200px"  />
      <el-table-column prop="createtime" label="创建时间" width="180" />
      <!-- <el-table-column prop="updatetime" label="更新时间" width="180" /> -->
      <el-table-column label="操作" width="250"  fixed="right">
        <template #default="scope">
          <!-- scope.row 就是当前行数据 -->
           
          <!-- <el-button type="primary" v-on:click="handleUpdateBorrow(scope.row.id)">编辑</el-button> -->
          <el-popconfirm width="220" confirm-button-text="确认" cancel-button-text="取消" :icon="InfoFilled"
            icon-color="#626AEF" title="你确定要删除这一条数据吗？" @confirm="handleDeleteBorrow(scope.row.id)">
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination v-model:current-page="params.pageNum" v-model:page-size="params.pageSize"
        :page-sizes="[10, 20, 50, 100]" layout="sizes, prev, pager, next,  " :total="params.total" background
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  
  </div>
</template>

<script lang="ts" setup>
import { onActivated, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, InfoFilled, Refresh } from '@element-plus/icons-vue'
// import type { FormInstance, FormRules } from 'element-plus'
import { deleteBorrowApi, getBorrowList } from '@/api/borrow'
import { useRouter } from 'vue-router'


const tableData = ref<object[]>([])

const onSearch = () => {
  params.pageNum = 1
  getList()
}
const onReset = () => {
  params.bookName = ''
  params.bookNo = ''
  params.userName = ''
  onSearch()
}

const params = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0,
  bookName: '',
  bookNo:'',
  userName:''
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
  getBorrowList(params).then(res => {
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

const handleAddBorrow = () => {
  router.push('/AddBorrow')
}

const handleUpdateBorrow = (id: string) => {
  router.push({ path: '/EditBorrow', query: { id } })
}

const handleDeleteBorrow = (id: string) => {
  deleteBorrowApi(id).then(res => {
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
