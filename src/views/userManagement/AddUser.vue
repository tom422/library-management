<template>
  <div>
    <h2>新增用户</h2>
    <el-form
      ref="ruleFormRef"
      :rules="rules"
      :inline="true"
      :model="formData"
      status-icon
      class="demo-form-inline"
      label-width="150px"
    >
      <el-form-item label="姓名:" prop="name" >
        <el-input  v-model="formData.name" placeholder="请输入姓名" clearable />
      </el-form-item>
      <el-form-item label="用户名:" prop="username">
        <el-input
          v-model="formData.username"
          placeholder="请输入用户名"
          clearable
        />
      </el-form-item>
      <el-form-item label="年龄:" prop="age">
        <el-input v-model="formData.age" placeholder="请输入年龄" clearable />
      </el-form-item>
      <el-form-item label="性别:" prop="sex">
        <el-input v-model="formData.sex" placeholder="请输入性别" clearable />
      </el-form-item>
      <el-form-item label="联系方式:" prop="phone">
        <el-input
          v-model="formData.phone"
          placeholder="请输入联系方式"
          clearable
        />
      </el-form-item>
      <el-form-item label="地址:" prop="address">
        <el-input
          v-model="formData.address"
          placeholder="请输入地址"
          clearable
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { saveUserApi } from '@/api/user'
import { useRouter, useRoute } from 'vue-router'
interface RuleForm {
  name: string
  username: string
  age: string
  sex: string
  phone: string
  address: string
}
const formData = reactive<RuleForm>({
  name: '',
  username: '',
  age: '',
  sex: '',
  phone: '',
  address: ''
})

const ruleFormRef = ref<FormInstance>()

// eslint-disable-next-line no-undef
const rules = reactive<FormRules<RuleForm>>({
  name: [{ required: true, message: '请输入姓名', trigger: 'change' }],
  username: [{ required: true, message: '请输入用户名', trigger: 'change' }],
  age: [{ required: true, message: '请输入年龄', trigger: 'change' }],
  sex: [{ required: true, message: '请输入性别', trigger: 'change' }],
  phone: [{ required: true, message: '请输入手机号', trigger: 'change' }],
  address: [{ required: true, message: '请输入地址', trigger: 'change' }],
})

const router = useRouter()
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      saveUserApi(formData).then(()=>{
        resetForm(ruleFormRef.value)
        router.back()
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

</script>

<style scoped></style>
