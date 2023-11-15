<!-- eslint-disable no-undef -->
<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="修改密码"
      width="30%"
    >
      <div>
        <el-form
          ref="formRef"
          :model="adminForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="新密码"
            prop="newPass"
             >
            <el-input
              v-model="adminForm.newPass"
              type="password"
              show-password
              autocomplete="off"
            />
          </el-form-item>
           
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="submitForm(formRef)">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { updateAdminNewPasswordApi } from '@/api/admin';
import { useRouter } from 'vue-router'
import { getCurrentAdmin } from '@/utils/getCurrentAdmin';
const dialogVisible = ref(false)
const router = useRouter()
const formRef = ref<FormInstance>()

const adminForm = reactive({
  id: '',
  username:'',
  password:'',
  newPass: ''
})

const currentAdmin = getCurrentAdmin()
const rules = reactive<FormRules>({
  newPass: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 10, message: '密码长度在3到10之间', trigger: 'blur' },
  ],
 
})

const Emits = defineEmits(['success'])

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(valid => {
    if (valid) {
      console.log('submit!')
      updateAdminNewPasswordApi(adminForm).then(res =>{
        if (res.code == 200) {
          if (adminForm.id == currentAdmin.id) {
            router.push('/login')
            return
          }

          ElMessage.success('修改成功')
          close()
          Emits('success')
        } else {
          ElMessage.error(res.msg)
        }
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()

  dialogVisible.value = false
}


function close(){
  adminForm.id = ""
  adminForm.newPass = ""
  adminForm.username = ""
  adminForm.password = ""
  
  resetForm(formRef.value)
}
function open(admin: unknown) {
  const copyAdmin = JSON.parse(JSON.stringify(admin))
  adminForm.id = copyAdmin.id
  adminForm.username = copyAdmin.username
  adminForm.password = copyAdmin.password
  dialogVisible.value = true
}

// eslint-disable-next-line no-undef
defineExpose({
  open
})
</script>

<style scoped></style>
