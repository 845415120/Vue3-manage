import { createRouter, createWebHashHistory } from 'vue-router'

import Index from '@/pages/index.vue'
import Login from '@/pages/login.vue'
import NotFound from '@/pages/404.vue'
import Admin from '@/layouts/admin.vue'
import List from '@/pages/goods/list.vue'
import CategoryList from '@/pages/category/list.vue'
import Skus from '@/pages/skus/list.vue'
import { arrowMiddleware } from 'element-plus'

// 默认路由 所以用户共享
const routes = [
  {
    path: '/',
    component: Admin,
    children: [{

      path: '/',

      component: Index,
      meta: {
        title: "后台首页"
      }
    },
    {
      path: '/goods/list',
      component: List,
      meta: {
        title: "商品详情页"
      },
    },
    {
      path: '/category/list',
      component: CategoryList,
      meta: {
        title: "列表"
      },
    },
    {
      path: '/skus/list',
      component: Skus,
      meta: {
        title: "规格列表"
      },
    },

    ]
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: "登录页"
    },
  },
  // 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },

]

// 动态路由,用于匹配菜单动态添加路由
const asyncRoutes = [

]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

// 动态添加路由的方法
export function addRoutes (menus) {
  // 
  let hasNewRouters = false
  const findRoutesByMenus = (arr) => {
    arr.forEach(e => {
      let item = asyncRoutes.find(o => o.path == e.frontpath)
      if (item && router.hasRoute(item.path)) {
        router.addRoute("admin", item)
        hasNewRouters = true
      }
      if (e.child && e.child.lenght > 0) {
        findRoutesByMenus(e.child)
      }
    })
  }
  findRoutesByMenus(menus)
  return hasNewRouters
}