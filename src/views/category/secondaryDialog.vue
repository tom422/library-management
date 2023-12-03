<!-- eslint-disable no-undef -->
<template>
    <div>
        <el-dialog v-model="dialogVisible" title="添加二级分类" width="40%">
            <div style="padding: 0 20px;">
                <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="分类名称" prop="name">
                        <el-input v-model="formData.name" type="primary"   />
                    </el-form-item>
                    <el-form-item label="分类备注" prop="remark">
                        <el-input v-model="formData.remark" type="primary"  />
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
import { saveCategoryApi } from '@/api/category'

const dialogVisible = ref(false)
const formRef = ref<FormInstance>()

const formData = reactive({
    id: '',
    name: '',
    remark: '',
    pid: ''
})

const rules = reactive<FormRules>({
    name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
})

const Emits = defineEmits(['success'])

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(valid => {
        if (valid) {
            console.log('submit!')
            saveCategoryApi(formData).then(res => {
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
    formData.id = ''
    formData.name = ''
    formData.remark = ''
    formData.pid = ''

    resetForm(formRef.value)
}
function open(pid: unknown) {
    formData.pid = pid as string
    dialogVisible.value = true
}

// eslint-disable-next-line no-undef
defineExpose({
    open
})
</script>

<style scoped></style>
