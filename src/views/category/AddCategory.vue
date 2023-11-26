<template>
  <div>
    <h2>新增分类</h2>
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
        <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { saveCategoryApi } from '@/api/category'
import { useRouter } from 'vue-router'
import { Category } from '@/api/types';

const formData = reactive<Category>({
   name:'',
   remark:''
})

const ruleFormRef = ref<FormInstance>()
// eslint-disable-next-line no-undef
const rules = reactive<FormRules<Category>>({
  name: [{ required: true, message: '请输入名称', trigger: 'change' }],
  remark: [{ required: true, message: '请输入备注', trigger: 'change' }],
})

const router = useRouter()
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      saveCategoryApi(formData).then((res)=>{
        if(res.code == 200){
          resetForm(ruleFormRef.value)
          router.back()
        }else{
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

</script>

<style scoped></style>
