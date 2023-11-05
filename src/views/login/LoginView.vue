<template>
  <div class="login-page">
    <div class="login-form">
      <div class="login-title">
        登录
      </div>
      <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" label-width="0"  >
        <el-form-item  prop="username">
          <el-input v-model="loginForm.username" :prefix-icon="User" ></el-input>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input v-model="loginForm.password"  type="password" :prefix-icon="Lock">
          </el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" style="width: 100%;" @click="login">登录</el-button>
          <!-- <el-button type="info" @click="resetLoginForm">重置</el-button> -->
        </el-form-item>
      </el-form>
              
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref ,reactive} from 'vue'
import { User,Lock } from '@element-plus/icons-vue'
import { Login } from '@/api/admin';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
// import { useRouter } from 'vue-router'
const loginForm =  reactive({
  username: 'admin',
  password: '123456'
})
const loginFormRef = ref()
const loginRules = reactive({
  username:[
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password:[
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})

const router = useRouter()
const login = () => {
  loginFormRef.value.validate(async (valid: unknown) => {
    if (!valid) return

    Login(loginForm).then((res)=>{
      if (res.code == 200) {
        ElMessage.success('登录成功')
        router.replace("/")
        sessionStorage.setItem('admin', JSON.stringify(res.data))
      }else{
        ElMessage.error(res.msg)
      }

    })
    // const { data } = await useRouter().post('/login', loginForm.value)
    // if (data.code === 200) {
    //   localStorage.setItem('token', data.token)
    //   useRouter().push('/')
    // }
  })
}
// const resetLoginForm = () => {
//   loginForm.username = ''
//   loginForm.password = ''
// }
</script>
<style lang="scss" scoped>
.login-page {
  height: 100vh;
  width: 100vw;
}

.login-form {
  width: 400px;
  min-height: 300px;
  background-color: #fff;
  border-radius: 10px;
  padding:50px 35px 15px 35px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.btns {
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
}

.login-title{
  text-align: center;
  font-size: 30px;
  color: dodgerblue;
  line-height: 60px;
  height: 80px;
}
</style>
