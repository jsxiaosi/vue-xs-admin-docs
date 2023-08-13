---
outline: deep
---

# Svg图标

## 如何添加新的Svg图标

### 注册svg图标

把 `.svg` 文件保存到 `src/assets/icons` 目录下即可，[`vite-plugin-svg-icons`](https://github.com/anncwb/vite-plugin-svg-icons/blob/main/README.zh_CN.md) 插件会默认查找当前目录的 `.svg` 文件进行注册，注册时会默认指定前缀

命名规则：

```ts
'icon-[dir]-[name]'
```

在 `src/assets/icons/error` 目录下添加 `403.svg` 图标，那么使用时资源链接应该是这样：`icon-error-403`

### 使用

通过svg标签使用

```vue
<svg class="svg" :aria-hidden="true">
  <use href="icon-error-403" xlink:href="icon-error-403" :fill="color" />
</svg>
```

## 内置SvgIcon组件

### 使用.svg图标

在 `SvgIcon` 组件中默认添加了 `icon-` 前缀，在使用手动添加的图标时只要传递 `[dir]-[name]` 即可

举例：

```vue
 <SvgIcon name="error-403"></SvgIcon>
```

### 组件参数

参数 | 类型 | 默认值 | 说明
---------|----------|---------|---------
prefix | icon 前缀 | `icon` | `string`
name | icon 名称 |  | `string`
color |  颜色 | `#333` | `string`
className | 样式类名 |  | `string`

## 使用Element Plus Icon

项目同时也集成了 [`Element Plus Icon`](https://element-plus.gitee.io/zh-CN/component/icon.html) 图标，采用按需引入的方式

在 `src/utils/plugin/element.ts` 中添加你想要使用的 [`Element Plus Icon`](https://element-plus.gitee.io/zh-CN/component/icon.html) 图标

```ts
import { Avatar } from '@element-plus/icons-vue';

export const iconComponents = [ Avatar ]
```

`SvgIcon` 组件中使用时 `name` 规则：`iEL-[name]`

```vue
<SvgIcon name="iEL-arrow"></SvgIcon>
```

::: warning 注意
如果名称是驼峰需要需要改成横杆隔开。  

举例：使用 `ArrowRight` 图标，那么 `SvgIcon` 组件中使用时 `name` 传递 `iEL-arrow-right`

```vue
<SvgIcon name="iEL-arrow-right"></SvgIcon>
```

:::
