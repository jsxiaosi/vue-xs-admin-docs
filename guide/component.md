---
outline: deep
---

# 组件注册

所有第三方组件的配置都在 `src/utils/plugin` 目录下统一管理

目前系统中使用的UI组件库 `Element-Plus` 是全局按需导入的，并没有完全把 `Element-Plus` 的组件全部引入，用到什么组件再导入

## 全局按需导入

组件配置文件：`src/utils/plugin/element.ts`

```ts
import type { App, Component } from 'vue';
import {
  ElTag,
  ElButton,
  ElInput,
  ElScrollbar,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElIcon,
  ElTooltip,
  ElDrawer,
  ElRow,
  ElCol,
  ElCard,
  ElDescriptions,
  ElDescriptionsItem,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElForm,
  ElFormItem,
  ElAlert,
  ElDatePicker,
  ElCascader,
  ElSelect,
  ElOption,
  ElCheckboxGroup,
  ElCheckbox,
  ElRadioGroup,
  ElRadio,
  ElTable,
  ElTableColumn,
  ElCalendar,
  ElTabs,
  ElTabPane,
  ElDivider,
  ElSwitch,
  ElProgress,
  ElColorPicker,
  // 指令
  ElLoading,
  ElInfiniteScroll,
} from 'element-plus';

// https://element-plus.org/zh-CN/component/icon.html
import {
  HomeFilled,
  Avatar,
  Operation,
  Grid,
  Setting,
  RemoveFilled,
  Refresh,
  CaretLeft,
  CaretRight,
  ArrowDown,
  Management,
  Select,
  ArrowRight,
  FullScreen,
  Briefcase,
  Printer,
} from '@element-plus/icons-vue';

// Directives
const plugins = [ElLoading, ElInfiniteScroll];

const components = [
  ElTag,
  ElButton,
  ElInput,
  ElScrollbar,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElIcon,
  ElTooltip,
  ElDrawer,
  ElRow,
  ElCol,
  ElCard,
  ElDescriptions,
  ElDescriptionsItem,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElForm,
  ElFormItem,
  ElAlert,
  ElDatePicker,
  ElCascader,
  ElSelect,
  ElOption,
  ElCheckboxGroup,
  ElCheckbox,
  ElRadioGroup,
  ElRadio,
  ElTable,
  ElTableColumn,
  ElCalendar,
  ElTabs,
  ElTabPane,
  ElDivider,
  ElSwitch,
  ElProgress,
  ElColorPicker,
];

// Icon
export const iconComponents = [
  HomeFilled,
  Avatar,
  Operation,
  Grid,
  Setting,
  RemoveFilled,
  Refresh,
  CaretLeft,
  CaretRight,
  ArrowDown,
  Management,
  Select,
  ArrowRight,
  FullScreen,
  Briefcase,
  Printer,
];

export function useElementPlus(app: App) {
  // 注册组件
  components.forEach((component: Component) => {
    app.component(component.name as string, component);
  });
  // 注册指令
  plugins.forEach((plugin) => {
    app.use(plugin);
  });
  // 注册图标
  iconComponents.forEach((component: Component) => {
    app.component(transElIconName(component.name as string), component);
  });
}

const transElIconName = (iconName: string): string => {
  return 'iEL' + iconName.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase());
};
```

## 全局完整导入

修改配置文件 `src/utils/plugin/element.ts` 内容如下：

```ts
import type { App } from 'vue';
import ElementPlus from 'element-plus';
import * as iconComponents from '@element-plus/icons-vue';

export function useElementPlus(app: App) {
  // 注册组件
  app.use(ElementPlus);

  // 注册图标
  for (const [key, component] of Object.entries(iconComponents)) {
    app.component(transElIconName(key), component);
  }
}

const transElIconName = (iconName: string): string => {
  return 'iEL' + iconName.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase());
};
```

添加样式 `src/styles/index.scss` 内容如下：

```scss
@use 'element-plus/theme-chalk/src/index.scss'; // [!code ++]
@use 'element-plus/theme-chalk/src/dark/css-vars.scss';
@use './theme.scss';
@use './intro.scss';
@use './transition.scss';
@use './sidebar.scss';
@use './mixin.scss';

// ...
```

## 页面按需导入

```vue
<script setup lang="ts">
  import { ElButton } from 'element-plus'
</script>

<template>
  <el-button>我是 ElButton</el-button>
</template>
```
