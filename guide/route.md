---
outline: deep
---

# 路由配置

路由配置存放在 `src/router` 目录下

```bash
├── modules                         #路由模块
│   ├── root                        #根路由配置（如：首页、登录页等）
│   ├── index.ts                    #模块集成导入文件
├── index.ts                        #主路由配置文件
├── type.ts                         #路由类型定义文件
└── utils.ts                        #路由工具和辅助函数
```

## 路由模块

模块基本结构

```ts
import type { AppRouteRecordRaw } from '@/router/type';
import { t } from '@/hooks/web/useI18n';

const nested: AppRouteRecordRaw[] = [
  {
    path: '/nested',
    redirect: '/nested/menu1',
    name: 'RtNested',
    meta: {
      title: t('route.pathName.nested'),
      icon: 'iEL-grid',
      position: 6,
    },
    children: [
      {
        path: 'menu1',
        name: 'RtMenu1',
        redirect: '/nested/menu1/menu1-1',
        meta: { title: t('route.pathName.nested1') },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1/index.vue'),
            name: 'RtMenu1-1',
            meta: { title: t('route.pathName.nested1_1') },
          },
        ],
      },
    ],
  },
];

export default nested;
```

## 添加新的路由

在 `src/router/modules` 下新建 `*.ts` 文件

```ts
import type { AppRouteRecordRaw } from '@/router/type';
import { t } from '@/hooks/web/useI18n';

const test: AppRouteRecordRaw[] = [
  {
    path: '/test',
    redirect: '/test/index',
    name: 'RtAdminInfo',
    alwaysShow: false,
    meta: { title: t('route.pathName.test'), icon: 'test', position: 11 },
    children: [
      {
        path: 'index',
        name: 'Rttest',
        component: () => import('@/views/about/index.vue'),
        meta: { title: t('route.pathName.test') },
      },
    ],
  },
];

export default test;
```

路由即可完成注册，不需要手动添加引入，`src/router/modules/index.ts` 默认会 `modules` 目录下的所有 `*.ts` 文件作为路由模块自动注册

## 多级路由

``` ts
import type { AppRouteRecordRaw } from '@/router/type';
import { t } from '@/hooks/web/useI18n';

const nested: AppRouteRecordRaw[] = [
  {
    path: '/nested',
    redirect: '/nested/menu1',
    name: 'RtNested',
    meta: {
      title: t('route.pathName.nested'),
      icon: 'iEL-grid',
      position: 6,
    },
    children: [
      {
        path: 'menu1',
        name: 'RtMenu1',
        redirect: '/nested/menu1/menu1-1',
        meta: { title: t('route.pathName.nested1') },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1/index.vue'),
            name: 'RtMenu1-1',
            meta: { title: t('route.pathName.nested1_1') },
          },
          {
            path: 'menu1-2',
            name: 'RtMenu1-2',
            redirect: '/nested/menu1/menu1-2/menu1-2-1',
            meta: { title: t('route.pathName.nested1_2') },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
                name: 'RtMenu1-2-1',
                meta: { title: t('route.pathName.nested1_2_1') },
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
                name: 'RtMenu1-2-2',
                meta: { title: t('route.pathName.nested1_2_2') },
              },
            ],
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3/index.vue'),
            name: 'RtMenu1-3',
            meta: { title: t('route.pathName.nested1_3') },
          },
        ],
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index.vue'),
        name: 'RtMenu2',
        meta: { title: t('route.pathName.nested2') },
      },
    ],
  },
];

export default nested;
```

::: warning 嵌套路由如何设置公共布局？
由于 VueRoute [keepAlive三级路由渲染两次问题](https://github.com/vuejs/router/issues/626)一直没得到官网的修复，所以目前项目的处理是无论是多少层级的路由会处理成二级。

需要嵌套路由设置公共布局目前有以下两个方案：

1. 二级以上路由禁用 `keepAlive` 并移除扁平化处理，直接按照 VueRoute 的方式添加嵌套公共布局
   在 `src/router/utils.ts` 中的 `initRoute` 进行调整

    ```ts

    // 初始化权限路由
    async function initRoute(permission: RoleEnum | null) {
      resetRouter();
      clearAllCachePage();
      let routeList: AppRouteRecordRaw[] = [];
      if (permission) {
        routeList = await getRouteList(permission);
        // 更新路由列表前通过formatFlatteningRoutes打平树结构
        privilegeRouting(
          router.options.routes as RouteRecordRaw[],
          formatFlatteningRoutes(routeList) as AppRouteRecordRaw[], // [!code --]
          routeList, // [!code ++]
        );
        setWholeMenus(routeList);
      }

      return routeList;
    }
    ```  

2. 通过组件的形式套在三级路由页面

:::

## 开启keepAlive缓存

在路由 `Meta` 中设置 `keepAlive` 属性即可开启缓存

```ts
  {
    path: 'test',
    name: 'Rttest',
    component: () => import('@/views/about/index.vue'),
    meta: {
      title: t('route.pathName.test'), 
      keepAlive: true,  // [!code focus]
    },
  },
```

::: warning keepAlive注意事项

1. 必须要为路由设置 `name` 才能正确开启缓存
2. 页面必须设置 `name` 且必须要和路由配置 `name` 一致
3. `name` 必须要唯一

:::

## 页面刷新

页面刷新采用重定向的方式，跳转到 `redirect` 页面再跳转回到原始页面的方式达到刷新效果

```ts
  router.replace({
    path: '/redirect' + path,
    query: query,
  });
```

1. path: 需要重定向的路口
2. query: 路由参数

## 添加外部链接

### 1. 浏览器标签打开新页面  

添加外部链接在路由配置里面把 `path` 路径改成 `外部地址` 即可点击打开新的浏览器标签跳转

```ts
  {
    path: 'https://github.com/jsxiaosi/vue-xs-admin',
    name: 'RtLink',
    meta: { title: t('route.pathName.thirdParty'), icon: 'link' },
  },
```

### 2. 添加内嵌外部页面

添加内嵌页面在 `Meta` 属性中添加 `externalUrl` 参数设置内嵌页面 `Url`，然后再组件中使用 `iframe` 打开 `Url`

```ts
{
  path: 'embedded-page',
  component: () => import('@/views/external-link/embedded-page/index.vue'),
  name: 'RtGitLink',
  meta: {
    title: t('route.pathName.embeddedDocument'),
    externalUrl: 'https://jsxiaosi.github.io/vue-xs-admin-docs/',
  },
},
```

## 路由配置说明

`AppRouteRecordRaw` 是在原始的 `Route` 配置基础上进行的扩展，其基础路由设置与 `Route` 保持一致。

```ts
export interface Meta extends RouteMeta {
  // 菜单标题
  title: string;
  // 设置菜单图标
  icon?: string;
  //排序位置 （子路由无效）
  position?: number;
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
  // 外部页面地址
  externalUrl?: string;
}

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children'> {
  //单个子路由的时候是否开启折叠（默认单个子路由的请求下，子路由会提升显示在菜单栏）
  alwaysShow?: boolean; 
  // 不显示菜单栏
  hidden?: boolean;
  // 子路由配置
  children?: AppRouteRecordRaw[];
  meta?: Meta;
}
```
