<template>
  <div>
    <h2>新增借书记录</h2>
    <div class="form_box">
      <el-form ref="ruleFormRef" :rules="rules" :model="formData" status-icon class="demo-form-inline" label-width="100px"
        label-position="left">

      

        <el-form-item label="图书标准码:" prop="bookNo">
          <!-- <el-input v-model="formData.bookNo" placeholder="请输入所需积分" clearable /> -->
          <el-select style="width: 100%;" v-model="formData.bookNo" filterable placeholder="请选择"   @change="selBook">
            <el-option
              v-for="item in bookList"
              :key="item.bookNo"
              :label="item.bookNo"
              :value="item.bookNo"
            
            />
          </el-select>
        </el-form-item>
        <el-form-item label="图书名称:" prop="bookName">
          <el-input v-model="formData.bookName"  disabled  clearable />
        </el-form-item>
        <el-form-item label="所需积分:" prop="score">
          <el-input v-model="formData.score" disabled clearable />
        </el-form-item>

        <el-form-item label="图书数量:" prop="nums">
          <el-input v-model="formData.nums" disabled clearable />
        </el-form-item>
        <el-form-item label="用户ID:" prop="userNo">
          <!-- <el-input v-model="formData.userId" placeholder="请输入用户ID" clearable /> -->
          <el-select style="width: 100%;" v-model="formData.userNo" filterable placeholder="请选择"  @change="selUser">
            <el-option
              v-for="item in userList"
              :key="item.id"
              :label="item.username"
              :value="item.username"
             
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用户名称:" prop="userName">
          <el-input v-model="formData.userName" disabled placeholder="请输入分类" clearable />
        </el-form-item>
    
        <el-form-item label="用户联系方式:" prop="userPhone">
          <el-input v-model="formData.userPhone" disabled placeholder="请输入用户联系方式" clearable />
        </el-form-item>
        <el-form-item label="用户积分:" prop="account">
          <el-input v-model="formData.account" disabled placeholder="请输入用户联系方式" clearable />
        </el-form-item>
        <el-form-item label="借书天数:" prop="days">
          <el-input-number :min="1" :max="30"  v-model="formData.days"  clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onActivated, reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { saveBorrowApi } from '@/api/borrow'
import { useRouter } from 'vue-router'
import { Book, Borrow, User } from '@/api/types';
import { getUserAll } from '@/api/user'
import { getBookAll } from '@/api/book'

const formData = ref<Borrow>({
  bookName: '',
  bookNo: '',
  publishDate: '',
  userNo: '',
  userName: '',
  userPhone: '',
  score: 0,
  nums:0,
  account:0,
  days:1
})

const ruleFormRef = ref<FormInstance>()
// eslint-disable-next-line no-undef
const rules = reactive<FormRules<Borrow>>({
  // bookName: [{ required: true, message: '请输入图书名称', trigger: 'change' }],
  bookNo: [{ required: true, message: '请输入图书标准码', trigger: 'change' }],
  userNo: [{ required: true, message: '请输入会员码', trigger: 'change' }],
  // score: [{ required: true, message: '请输入标准码', trigger: 'change' }],
})

const router = useRouter()
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      saveBorrowApi(formData.value).then((res) => {
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


const userList = ref<User[]>()
const bookList = ref<Book[]>()
const getList = () => {
  getUserAll().then(res => {
    if (res.code == 200) {
      userList.value = res.data
    }
  })


  getBookAll().then(res => {
    if (res.code == 200) {
      bookList.value = res.data
    }
  })
}


onActivated(()=>{
  getList()
})


const selBook = ()=>{
  const Book = bookList.value?.find(v=> v.bookNo === formData.value.bookNo) as Book
  console.log(Book);
  
  formData.value.bookName = Book.name
  formData.value.score = Book.score
  formData.value.nums = Book.nums
  
}

const selUser = ()=>{
  const user = userList.value?.find(v=> v.username === formData.value.userNo) as User
  formData.value.userName = user.name
  formData.value.userPhone = user.phone
  formData.value.account = user.account
}

</script>

<style scoped></style>
