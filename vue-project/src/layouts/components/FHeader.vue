<template>
  <div class="f-header">
    <span class="logo">
      <el-icon><Grid /></el-icon>
      jiang后台管理系统
    </span>
    <el-tooltip effect="dark" content="菜单" placement="bottom">
      <el-icon class="icon-btn" @click="$store.commit('handleAsideWidth')"
        ><Fold v-if="$store.state.asideWidth == '250px'" />
        <Food v-else />
      </el-icon>
    </el-tooltip>
    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefresh"><Refresh /></el-icon>
    </el-tooltip>
    <!-- right -->
    <div class="ml-auto flex items-center">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <el-icon class="icon-btn" @click="toggle">
          <FullScreen v-if="!isFullscreen" />
          <Close v-else />
        </el-icon>
      </el-tooltip>
      <!-- 下拉菜单 -->
      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="felx items-center text-light-50">
          <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar" />
          {{ $store.state.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">
              修改密码

              <el-drawer
                v-model="drawer"
                title="修改密码"
                size="45%"
                :close-on-click-modal="false"
              >
                <!-- 修改密码表单 -->
                <el-form :rules="rules" :model="form" class="w-[250px]">
                  <el-form-item prop="password">
                    <el-input
                      v-model="form.password"
                      placeholder="请输入新密码"
                    >
                      <template #prefix>
                        <el-icon><Lock /></el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="repassword">
                    <el-input
                      type="password"
                      v-model="form.repassword"
                      placeholder="请再次输入密码"
                      show-password
                    >
                      <template #prefix>
                        <el-icon><Lock /></el-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      round
                      class="w-[250px]"
                      type="primary"
                      @click="onSubmit"
                      >确定</el-button
                    >
                  </el-form-item>
                </el-form>
              </el-drawer>
            </el-dropdown-item>
            <el-dropdown-item command="logout"> 退出登录 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import FormDrawer from '../../components/FormDrawer.vue'
import { login, logout, updatepassword } from "@/api/manger.js"
import { showModal, toast } from "@/composables/util.js"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { useFullscreen } from '@vueuse/core'


// 全屏
const { isFullscreen, enter, exit, toggle } = useFullscreen()

const router = useRouter()
const store = useStore()
// 修改密码

const drawer = ref(false)
const form = reactive({
  password: '',
  repassword: ''
})
const rules = {
  password: [
    {
      required: true,
      message: '新密码不能为空',
      trigger: 'blur'
      // 失去焦点时 
    },
  ],
  repassword: [
    {
      required: true,
      message: '确认密码不能为空',
      trigger: 'blur'
      // 失去焦点时 
    },

  ],

}
const onSubmit = () => {
  updatepassword(form)
    .then(res => {
      toast("修改密码成功!")
    })
    .finally(() => {

    })

}
// 

const handleCommand = (c) => {
  switch (c) {
    case "logout":
      handleLogout()
      break
    case "rePassword":
      drawer.value = true
      break

  }
}
// 刷新
const handleRefresh = () => location.reload()

function handleLogout () {
  showModal("是否要退出登录").then(res => {
    logout()
      .finally(() => {
        store.dispatch("logout")
        // 跳转回登录页
        router.push("/login")
        // 提示
        toast("退出登录成功")
      })
  })
}
</script>
<style >
.f-header {
  @apply flex items-center bg-indigo-500 text-light-50 fixed top-0 left-0 right-0;
  height: 64px;
}
.logo {
  width: 250px;
  @apply flex items-center justify-center text-xl font-thin;
}
.icon-btn {
  @apply flex items-center justify-center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}
.icon-btn:hover {
  @apply bg-indigo-400;
}
.f-header .dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex items-center justify-center mx-5;
}
</style>