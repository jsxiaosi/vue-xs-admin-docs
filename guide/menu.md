---
outline: deep
---

# 菜单栏配置

`菜单栏和路由挂钩`，权限在过滤路由的同时也会把菜单项给过滤，默认情况下你在 `src/router/modules` 下创建了路由，在有访问权限的情况下，默认会显示在菜单栏上。

## 菜单项显示信息配置

在[路由配置说明](/guide/route.md#路由配置说明)可以看到 `Meta` 配置说明有以下几个属性

```ts
export interface Meta extends RouteMeta {
  // 菜单标题 // [!code focus]
  title: string; // [!code focus]
  // 设置菜单图标 // [!code focus]
  icon?: string; // [!code focus]
  //排序位置 （子路由无效） // [!code focus]
  position?: number; // [!code focus]
  // 是否显示面包屑
  breadcrumb?: boolean;
  // 是否开启缓存
  keepAlive?: boolean;
  // 权限路由白名单（只有后端路由模式才生效）
  whiteRoute?: boolean;
  // 路由层级（扁平化路由时自动添加）
  pathList?: number[];
  // 角色权限
  roles?: RoleEnum[];
}
```

### title

配置菜单栏显示名称，接受 `i18n` 字符串

```ts
  {
    path: '/about',
    redirect: '/about/index',
    name: 'RtAdminInfo',
    alwaysShow: true, 
    meta: { 
      title: t('route.pathName.about'),  // [!code focus]
      icon: 'about',
      position: 11 
    },
  },
```

### icon

配置菜单栏显示图表，接受 `Icon` 图标名称

```ts
  {
    path: '/about',
    redirect: '/about/index',
    name: 'RtAdminInfo',
    alwaysShow: true, 
    meta: { 
      title: t('route.pathName.about'),  
      icon: 'about', // [!code focus]
      position: 11 
    },
  },
```

### position

配置菜单栏显示顺序

```ts
  {
    path: '/about',
    redirect: '/about/index',
    name: 'RtAdminInfo',
    alwaysShow: true, 
    meta: { 
      title: t('route.pathName.about'),  
      icon: 'about',
      position: 11  // [!code focus]
    },
  },
```

::: warning 注意
`position` 只针对父级路由生效，子路由根据配置的数组顺序渲染菜单项

```ts
const detailsPage: AppRouteRecordRaw[] = [
  {
    path: '/details_page',
    name: 'RtDetailsPage',
    meta: { 
      title: t('route.pathName.detailsPage'), 
      icon: 'iEL-management', 
      position: 9,  // 生效 // [!code ++]
    },
    component: () => import('@/views/details-page/index.vue'),
    children: [
      {
        path: 'details_info',
        name: 'RtDetailsInfo',
        meta: {
          title: '',
          icon: 'iEL-management',
          whiteRoute: true,
          keepAlive: true,
          position: 1, // 不生效 // [!code --]
        },
        component: () => import('@/views/details-page/datails-info/index.vue'),
      },
      {
        path: 'details_params/:id',
        name: 'RtDetailsParams',
        meta: {
          title: '',
          icon: 'iEL-management',
          whiteRoute: true,
          keepAlive: true,
          position: 2, // 不生效 // [!code --]
        },
        component: () => import('@/views/details-page/datails-params/index.vue'),
      },
    ],
  },
];

export default detailsPage;
```

:::

## 菜单栏层级

上面 👆🏻 介绍提到菜单栏是和路由挂钩的，通过路由来配置渲染菜单栏包括层级

项目在渲染菜单栏时，当路由 `children` 大于 `1` 时会自动变成嵌套模式。如果 `children` 等于 `1` 只有一个子路由的情况下，默认会把第一个子路由作为根模块路由显示在菜单栏上，可以通过设置 `alwaysShow` 属性把菜单项设置成带有层级

```ts
import type { AppRouteRecordRaw } from '@/router/type';
import { t } from '@/hooks/web/useI18n';

const about: AppRouteRecordRaw[] = [
  {
    path: '/about',
    redirect: '/about/index',
    name: 'RtAdminInfo',
    alwaysShow: true, // [!code focus]
    meta: { title: t('route.pathName.about'), icon: 'about', position: 11 },
    children: [
      {
        path: 'index',
        name: 'RtAbout',
        component: () => import('@/views/about/index.vue'),
        meta: { title: t('route.pathName.about') },
      },
    ],
  },
];

export default about;
```

## 菜单栏隐藏

路由配置添加 `hidden` 属性

```ts
import type { AppRouteRecordRaw } from '@/router/type';
import { t } from '@/hooks/web/useI18n';

const detailsPage: AppRouteRecordRaw[] = [
  {
    path: '/details_page',
    name: 'RtDetailsPage',
    meta: { title: t('route.pathName.detailsPage'), icon: 'iEL-management', position: 9 },
    component: () => import('@/views/details-page/index.vue'),
    children: [
      {
        path: 'details_info',
        name: 'RtDetailsInfo',
        hidden: true, // [!code focus]
        meta: {
          title: '',
          icon: 'iEL-management',
          whiteRoute: true,
          keepAlive: true,
        },
        component: () => import('@/views/details-page/datails-info/index.vue'),
      },
      {
        path: 'details_params/:id',
        name: 'RtDetailsParams',
        hidden: true, // [!code focus]
        meta: {
          title: '',
          icon: 'iEL-management',
          whiteRoute: true,
          keepAlive: true,
        },
        component: () => import('@/views/details-page/datails-params/index.vue'),
      },
    ],
  },
];

export default detailsPage;
```

## 菜单外部链接

1. 浏览器标签打开新页面  
    添加外部链接在路由配置里面把 `path` 路径改成 `外部地址` 即可点击打开新的浏览器标签跳转

    ```ts
      {
        path: 'https://github.com/jsxiaosi/vue-xs-admin',
        name: 'RtLink',
        meta: { title: t('route.pathName.thirdParty'), icon: 'link' },
      },
    ```

## 面包屑

面包屑默认会根据当前打开的路由去查找对应的父级路由组成面包屑，如果不希望当前路由显示面包屑，可以在路由 `Meta` 属性中配置 `breadcrumb` 来实现

```ts
  {
    path: '/about',
    redirect: '/about/index',
    name: 'RtAdminInfo',
    alwaysShow: true, 
    meta: { 
      title: t('route.pathName.about'),  
      icon: 'about',
      breadcrumb: false, // [!code focus]
    },
  },
```
