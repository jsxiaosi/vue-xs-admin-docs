---
outline: deep
---

# 主题

项目内置夜间主题和白天主题，以及提供切换 `hooks`

## 切换主题

```vue
<script setup lang="ts">
  import { useTheme } from '@/hooks/web/useTheme';

  const { color } = useTheme();
</script>

<template>
  <div
    class="theme cursor"
    @click="
      () => {
        color = color === 'dark' ? 'light' : 'dark';
      }
    "
  >
   {{color}}
  </div>
</template>

```

## 配置主题颜色

修改 `Element Plus` 主题配置在 `src/styles/var/element/theme` 目录下

`light.scss` 白天主题

`dark.scss` 夜间主题

具体配置变量参考 [`Element Plus`](https://element-plus.gitee.io/zh-CN/guide/theming.html)
