<template>
  <div>
    <h2>新增管理员</h2>
    <el-form
      ref="ruleFormRef"
      :rules="rules"
      :inline="true"
      :model="formData"
      status-icon
      class="demo-form-inline"
      label-width="150px"
    >
   
      <el-form-item label="用户名:" prop="username">
        <el-input
          v-model="formData.username"
          placeholder="请输入用户名"
          clearable
        />
      </el-form-item>
     
      <el-form-item label="联系方式:" prop="phone">
        <el-input
          v-model="formData.phone"
          placeholder="请输入联系方式"
          clearable
        />
      </el-form-item>
      <el-form-item label="邮箱:" prop="email">
        <el-input
          v-model="formData.email"
          placeholder="请输入邮箱"
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
import { saveAdminApi } from '@/api/admin'
import { useRouter } from 'vue-router'
import { Admin } from '@/api/types';

const formData = reactive<Admin>({
  username: '',
  phone: '',
  email: ''
})

const ruleFormRef = ref<FormInstance>()
// eslint-disable-next-line no-undef
const rules = reactive<FormRules<Admin>>({
  username: [{ required: true, message: '请输入用户名', trigger: 'change' }],
  phone: [{ required: true, message: '请输入手机号', trigger: 'change' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'change' }, { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }],
})

const router = useRouter()
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      saveAdminApi(formData).then(()=>{
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
