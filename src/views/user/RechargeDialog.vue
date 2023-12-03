<!-- eslint-disable no-undef -->
<template>
    <div>
        <el-dialog v-model="dialogVisible" title="充值积分" width="40%">
            <div style="padding: 0 20px;">
                <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="当前账户积分" prop="account">
                        <el-input v-model="formData.account" disabled type="primary" />
                    </el-form-item>
                    <el-form-item label="充值积分" prop="score">
                        <el-input v-model="formData.score" type="primary" />
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
import { addAccountApi } from '@/api/user'
import { User } from '@/api/types';

const dialogVisible = ref(false)
const formRef = ref<FormInstance>()

const formData = ref<User>({
    name: '',
    username: '',
    age: '',
    sex: '',
    phone: '',
    address: '',
    account: 0,
    score: 0
})

const rules = reactive<FormRules>({
    score: [{ required: true, message: '请输入积分', trigger: 'blur' },
    {
     validator:  (rule,value,callback) => {
      value = parseInt(value)
      // eslint-disable-next-line no-empty
      if (value < 0 || value > 1000) {
        callback(new Error('请输入大于0,小于1000的整数'))
      }

      callback()
    },
    trigger: 'change'
  }
]
})

const Emits = defineEmits(['success'])

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(valid => {
        if (valid) {
            console.log('submit!')
            addAccountApi(formData.value).then(res => {
                if (res.code == 200) {
                    ElMessage.success('添加成功')
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

function close() {


    resetForm(formRef.value)
}
function open(row: User) {
    formData.value = JSON.parse(JSON.stringify(row))
    dialogVisible.value = true
}

// eslint-disable-next-line no-undef
defineExpose({
    open
})
</script>

<style scoped></style>
