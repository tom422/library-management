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
      <!-- <el-form-item label="用户名:" prop="username">
        <el-input
          v-model="formData.username"
          placeholder="请输入用户名"
          clearable
        />
      </el-form-item> -->
      <el-form-item label="年龄:" prop="age">
        <el-input v-model="formData.age" placeholder="请输入年龄" clearable />
      </el-form-item>
      <el-form-item label="性别:" prop="sex">
        <el-radio-group v-model="formData.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
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
import { useRouter } from 'vue-router'
import { User } from '@/api/types';
 
const formData = reactive<User>({
  name: '',
  username: '',
  age: '',
  sex: '',
  phone: '',
  address: '',
  account: 0,
  score: 0
})

const ruleFormRef = ref<FormInstance>()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const checkAge = (rule: any, value: string | undefined, callback: any) => {
  let reg = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/ //年龄是1-120之间有效
  if (value == undefined) {
    callback([new Error('帐号输入不合法')])
    return
  }
  value = value.toString()
  if (value && value.length > 0) {
    if (!reg.test(value)) {
      callback([new Error('年龄输入不合法')])
    } else {
      callback()
    }
  } else if (value.length == 0) {
    callback()
  } else {
    callback(new Error('年龄输入不合法'))
  }
}
// eslint-disable-next-line no-undef
const rules = reactive<FormRules<User>>({
  name: [{ required: true, message: '请输入姓名', trigger: 'change' }],
  username: [{ required: true, message: '请输入用户名', trigger: 'change' }],
  age: [ { required: true, message: '请输入年龄', trigger: 'change' },
    {
      required: true,
      validator: checkAge,
      message: '请输入正确的年龄',
      trigger: 'blur'
    }],
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
