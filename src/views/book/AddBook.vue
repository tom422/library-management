<template>
  <div>
    <h2>新增图书</h2>
    <div class="form_box">
      <el-form ref="ruleFormRef" :rules="rules"   :model="formData" status-icon class="demo-form-inline"
      label-width="100px" label-position="left">

      <el-form-item label="图书名称:" prop="name">
        <el-input  v-model="formData.name" placeholder="请输入名称" clearable />
      </el-form-item>

      <el-form-item label="图书描述:" prop="description">
        <el-input type="textarea" v-model="formData.description" placeholder="请输入图书描述" clearable />
      </el-form-item>
      <el-form-item label="出版日期:" prop="publishDate">
        <el-date-picker style="width:100%" v-model="formData.publishDate"   value-format="YYYY-MM-DD" type="date" placeholder="请输入出版日期"  />
        <!-- <el-input v-model="formData.publishDate" placeholder="请输入出版日期" clearable /> -->
      </el-form-item>
      <el-form-item label="作者:" prop="author">
        <el-input v-model="formData.author" placeholder="请输入作者" clearable />
      </el-form-item>
      <el-form-item label="出版社:" prop="publisher">
        <el-input v-model="formData.publisher" placeholder="请输入出版社" clearable />
      </el-form-item>
      <el-form-item label="分类:" prop="categories">
        <el-cascader v-model="formData.categories" :options="categoryTree"  :props="{ value:'name', label:'name'}"  @change="handleChange" />
        <el-input v-model="formData.categories"  placeholder="请输入分类" clearable />
      </el-form-item>
      <el-form-item label="图书标准码:" prop="bookNo">
        <el-input v-model="formData.bookNo" placeholder="请输入标准码" clearable />
      </el-form-item>
      <el-form-item label="图书封面:" prop="cover">
        <el-input v-model="formData.cover" placeholder="请输入封面" clearable />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
      </el-form-item>
    </el-form>
    </div>
   
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { saveBookApi } from '@/api/book'
import { getCategoryTree } from '@/api/category'
import { useRouter } from 'vue-router'
import { Book } from '@/api/types';

const formData = ref<Book>({
  name: '',
  description: '',
  publishDate: '',
  author: '',
  publisher: '',
  category: '',
  bookNo: '',
  cover: '',
})

const ruleFormRef = ref<FormInstance>()
// eslint-disable-next-line no-undef
const rules = reactive<FormRules<Book>>({
  name: [{ required: true, message: '请输入名称', trigger: 'change' }],
  description: [{ required: true, message: '请输入描述', trigger: 'change' }],
  publishDate: [{ required: true, message: '请输入出版日期', trigger: 'change' }],
  author: [{ required: true, message: '请输入作者', trigger: 'change' }],
  publisher: [{ required: true, message: '请输入出版社', trigger: 'change' }],
  categories: [{ required: true, message: '请选择分类', trigger: 'change' }],
  bookNo: [{ required: true, message: '请输入标准码', trigger: 'change' }],
  cover: [{ required: true, message: '请输入封面', trigger: 'change' }],
})

const router = useRouter()
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      saveBookApi(formData.value).then((res) => {
        if (res.code == 200) {
          resetForm(ruleFormRef.value)
          router.back()
        } else {
          ElMessage.error(res.msg)
        }

      })


      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}


const categoryTree = ref([])


const getCategory = async () => {
  getCategoryTree().then((res) => {
    if (res.code == 200) {
      categoryTree.value = res.data
    }
  })
}
getCategory()
const handleChange = (value) => {
  console.log(value)
}

</script>

<style scoped></style>
