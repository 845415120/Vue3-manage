<template >
  <div class="f-menu" :style="{ width: $store.state.asideWidth }">
    <el-menu
      :default-active="defautAction"
      :collapse="isCollapse"
      class="border-0"
      @select="handleSelect"
      :collapse-transition="false"
      :unique-opened="true"
    >
      <template v-for="(item, index) in asideMenus" :key="index">
        <el-sub-menu
          v-if="item.child && item.child.length > 0"
          :index="item.name"
        >
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <!-- 子菜单 -->
          <el-menu-item
            v-for="(item2, index2) in item.child"
            :key="index2"
            :index="item2.frontpath"
          >
            <el-icon>
              <component :is="item2.icon"></component>
            </el-icon>
            <span>{{ item2.name }}</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item v-else :index="item.frontpath">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import FormDrawer from '../../components/FormDrawer.vue'
// 菜单栏折叠
const isCollapse = computed(() => !(store.state.asideWidth == "250px"))

const store = useStore()
const router = useRouter()
const route = useRoute()
// 默认选中当前菜单路径
const defautAction = ref(route.path)

const asideMenus = computed(() => store.state.menus)


const formDrawerRef = null

const handleSelect = function (e) {
  router.push(e)
}
</script>
<style >
.f-menu {
  translate: all 0.2;
  width: 250px;
  top: 64px;
  bottom: 0;
  left: 0;
  overflow: auto;
  @apply shadow-md fixed bg-light-50;
}
/* 隐藏菜单滚动条 */
.f-menu::-webkit-scrollbar {
  width: 0;
}
</style>