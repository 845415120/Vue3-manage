<template>
  <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
    抽屉组件
  </el-button>

  <el-drawer
    v-model="drawer"
    :title="title"
    :with-header="false"
    :size="size"
    :close-on-click-modal="false"
    :destroy-on-close="destroyOnClose"
  >
    <div class="formDrawer">
      <div class="body">
        <slot></slot>
      </div>
    </div>
    <div class="actions">
      <el-button type="primary" @click="submit">{{ confirmText }}</el-button>
      <el-button type="default" @click="close">取消</el-button>
    </div>
  </el-drawer>
</template>
<script setup>
import { ref } from 'vue'
const drawer = ref(false)

const props = defineProps({
  title: String,
  default: "1",

  size: {
    type: String,
    default: "45%"
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  confirmText: {
    type: String,
    default: "提交"
  }

})
// 打开
const open = () => drawer.value = true
// 关闭
const close = () => drawer.value = false
// 提交
const emit = defineEmits(["submit"])
const submit = () => emit("submit")

// 向父组件暴露方法

defineExpose({
  open,
  close
})
</script>
<style >
.formDrawer {
  width: 100%;
  height: 100%;
  position: relative;
  @apply flex flex-col;
}
.formDrawer .body {
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}
.formDrawer .actions {
  height: 50px;
  @apply mt-auto flex items-center;
}
</style>