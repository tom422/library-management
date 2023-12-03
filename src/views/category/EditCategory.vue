<template>
  <div>
    <h2>编辑分类</h2>
    <el-form
      ref="ruleFormRef"
      :rules="rules"
      :inline="true"
      :model="formData"
      status-icon
      class="demo-form-inline"
      label-width="150px"
    >
    <el-form-item label="名称:" prop="name">
        <el-input
          v-model="formData.name"
          placeholder="请输入名称"
          clearable
        />
      </el-form-item>
     
      <el-form-item label="备注:" prop="remark">
        <el-input
          v-model="formData.remark"
          placeholder="请输入备注"
          clearable
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { onActivated, reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { updateCategoryInfoApi, getCategoryInfoApi } from '@/api/category'
import { useRouter, useRoute } from 'vue-router'
import { Category } from '@/api/types'

const formData = ref<Category>({
   name:'',
   remark:''
})

const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules<Category>>({
  name: [{ required: true, message: '请输入名称', trigger: 'change' }],
  remark: [{ required: true, message: '请输入备注', trigger: 'change' }],
})

const router = useRouter()
const route = useRoute()
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      updateCategoryInfoApi(formData.value).then((res) => {
        if (res.code == 200) {
          resetForm(ruleFormRef.value)
          ElMessage.success('修改成功')
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

const getCategoryInfo = (id: string) => {
  getCategoryInfoApi(id).then(res => {
    if (res.code == 200) {
      formData.value = res.data
    } else {
      ElMessage.error(res.msg)
    }
  })
}
onActivated(() => {
  console.log(route)
  if (route.query.id) {
    getCategoryInfo(route.query.id as string)
  }
})
</script>

<style scoped></style>
