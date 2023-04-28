<template >
  <!-- element ui  Layout布局24份- -->
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div>欢迎光临</div>
        <div>此站点是jiang的后台</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <h2 class="title">欢迎回来</h2>
      <div class="">
        <span class="line"></span>
        <span>账号密码登录</span>
        <span class="line"></span>
      </div>
      <div>
        <el-form :rules="rules" :model="form" class="w-[250px]">
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名">
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="form.password"
              placeholder="请输入密码"
              show-password
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button round class="w-[250px]" type="primary" @click="onSubmit"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>
<script  setup>
import { reactive, onMounted, onBeforeMount } from 'vue'
import { login } from '@/api/manger.js'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
// import { useCookies } from '@vueuse/integrations/useCookies'
import { setToken } from '@/composables/auth.js'
const store = useStore()
const router = useRouter()
const form = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
      // 失去焦点时 
    },

  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
      // 失去焦点时 
    },
  ]
}


const onSubmit = () => {
  login(form.username, form.password)
    .then(res => {
      console.log(res)
      // 提示成功
      ElNotification({
        message: '登录成功 ',
        type: 'success',
        duration: 3000
      })
      // 存储token和用户相关信息
      setToken(res.token)

      // 跳转后台
      // 引入useRouter
      router.push("/")
    })
    .catch(err => {
      ElNotification({
        message: '用户名或密码错误 ',
        type: 'error',
        duration: 3000
      })
      console.log(err)
    })
}
// 监听回车事件
function onKeyUp (e) {
  if (e.key == "Enter") onSubmit()
}
// 回车登录 添加键盘监听
onMounted(() => {
  document.addEventListener("keyup", onKeyUp)
})
onBeforeMount(() => {
  document.removeEventListener("keyup", onKeyUp)
})

</script>
<style scoped>
.login-container {
  @apply min-h-screen min-w-screen bg-indigo-500;
}
.login-container .left,
.login-container .right {
  @apply flex items-center justify-center;
}
.login-container .right {
  @apply bg-light-50 flex-col;
}
.left > div > div:first-child {
  @apply font-bold text-5xl text-light-50 mb-4;
}
.left > div > div:last-child {
  @apply text-gray-200 text-sm;
}
.right .title {
  @apply font-bold text-4xl text-gray-800;
}
.right > div {
  @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}
.right .line {
  @apply h-[1px] w-16 bg-gray-200;
}
</style> 