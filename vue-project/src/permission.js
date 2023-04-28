import { router, addRoutes } from "./router"
// token
import { getToken } from "@/composables/auth"
//错误弹窗
import { toast, showFullLoaing, hideFullLoaing } from "@/composables/util"
import store from "./store"



// 全局前置守卫
router.beforeEach(async (to, from, next) => {

  // 显示loding
  showFullLoaing()

  const token = getToken()
  // 没有登陆强制跳转回登录页
  if (!token && to.path != "/login") {
    toast("请先登录", "error")
    return next({ path: "/login" })
  }

  // 防止重复登录
  if (token && to.path == "/login") {
    toast("请勿重复登录", "error")
    return next({ path: from.path ? from.path : "/" })

  }

  // 如果用户登录,自动获取用户信息,并存储在vuex中
  let hasNewRouters = false
  if (token) {
    let { menus } = await store.dispatch("getinfo")
    // 动态添加路由
    hasNewRouters = addRoutes(menus)

  }
  // 设置页面标题
  let title = (to.meta.title ? to.meta.title : "") + "江"
  document.title = title

  next()
})

// 全局后置钩子,当页面加载完成后关闭进度条 loding
router.afterEach((to, from) => hideFullLoaing())

