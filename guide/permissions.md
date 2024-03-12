---
outline: deep
---

# 权限

路由权限分为两种

- 角色路由控制
- 后端路由控制

两种权限基本原理一样，初始化路由时判断是否拥有访问权限，如果无权限责过滤路由不进行注册

## 角色路由

1. 开启角色路由判断
    修改 `public/serverConfig.json` 文件 文件中 `permissionMode` 为 `ROLE`

    ```json
    {
      "permissionMode": "ROLE"  
    }
    ```

2. 配置角色权限在路由的 `meta` 配置下添加 `roles`  

    ```js
    import { RoleEnum } from '@/enum/role';
    import { t } from '@/hooks/web/useI18n';
    import type { AppRouteRecordRaw } from '@/router/type';

    const permissions: AppRouteRecordRaw[] = [
      {
        path: '/permissions',
        redirect: '/permissions/page',
        name: 'RtPermissions',
        meta: { title: 'route.pathName.permissions', icon: 'guide', position: 7 },
        children: [
          {
            path: 'page',
            name: 'RtPermissionsPage',
            component: () => import('@/views/permissions/page/index.vue'),
            meta: { title: t('route.pathName.permissionsPage') },
          },
          {
            path: 'test-page-admin',
            name: 'RtPermissionsTestPageAdmin',
            component: () => import('@/views/permissions/test-permissions-a/index.vue'),
            meta: { 
              title: t('route.pathName.testPermissionsPage1'), 
              // 角色权限编码
              roles: [RoleEnum.ADMIN] // [!code focus]
            },
          },
          {
            path: 'test-page-test',
            name: 'RtPermissionsTestPageTest',
            component: () => import('@/views/permissions/test-permissions-b/index.vue'),
            meta: { 
              title: t('route.pathName.testPermissionsPage2'), 
              // 角色权限编码
              roles: [RoleEnum.TEST] // [!code focus]
            },
          },
        ],
      },
    ];

    export default permissions;

    ```

    如果 `roles` 不配置则不进行权限判断，默认可访问

3. 角色路由权限判断逻辑:  
    文件路径：`src/router/utils.ts`

    ```ts
    function filterNoPermissionRouteList(
      routerList: AppRouteRecordRaw[],
      roleName: RoleEnum,
    ): AppRouteRecordRaw[] {
      const newRouteList = [...routerList];
      let newRoute = newRouteList.filter((i) => !i.meta?.roles || i.meta?.roles?.includes(roleName));
      newRoute = newRoute.map((i) => {
        if (i.children && i.children.length) {
          i.children = filterNoPermissionRouteList(i.children, roleName);
        }
        return i;
      });

      return newRoute || [];
    }
    ```

::: warning 注意

如果父级路由没有权限，子路由都一律没有权限。父级路由有访问权限，子路由则正常按照权限判断
举例：例如当前用户是admin

```ts
  {
    path: '/permissions',
    redirect: '/permissions/page',
    name: 'RtPermissions',
    meta: { title: 'route.pathName.permissions', icon: 'guide', position: 7 },
    children: [
      {
        path: 'page',
        name: 'RtPermissionsPage',
        component: () => import('@/views/permissions/page/index.vue'),
        meta: { title: t('route.pathName.permissionsPage') },
      },
      {
        path: 'test-page-admin',
        name: 'RtPermissionsTestPageAdmin',
        component: () => import('@/views/permissions/test-permissions-a/index.vue'),
        meta: { 
          title: t('route.pathName.testPermissionsPage1'), 
          roles: [RoleEnum.ADMIN] 
        },
      },
      {
        path: 'test-page-test',
        name: 'RtPermissionsTestPageTest',
        component: () => import('@/views/permissions/test-permissions-b/index.vue'),
        meta: { 
          title: t('route.pathName.testPermissionsPage2'), 
          roles: [RoleEnum.TEST] 
        },
      },
    ],
  },
```

路由路径 | 权限  | 说明
---------|----------|---------
 `/permissions` | `ROOT` | 如果没有访问权限，其下所有子路由也无法访问
 `/permissions/page` | `否` | 只要父级路由/permissions有权限，所有用户都可以访问
 `/permissions/test-page-admin` | `ADMIN` | 只有在/permissions有权限且用户角色为 `ADMIN` 时可以访问
 `/permissions/test-page-test`| `TEST` | 只有在/permissions有权限且用户角色为 `TEST` 时可以访问

:::

## 后端路由权限控制

1. 开启后端路由判断
    修改 `public/serverConfig.json` 文件中 `permissionMode` 为 `REAREND`

    ```json
    {
      "permissionMode": "REAREND"  
    }
    ```

2. 接口返回格式  
    模拟接口 `mock/route.mock.ts`

    ```ts
    // 公共路由（任何权限都会返回的路由列表）
    const power = [
      {
        path: '/welcome',
        name: 'RtWelcome',
      },
      // ...省略的代码
    ];

    // admin权限路由
    const adminPermissionRouter = [
      {
        path: '/permissions',
        name: 'RtPermissions',
        children: [
          {
            path: 'page',
            name: 'RtPermissionsPage',
          },
          {
            path: 'test-page-admin',
            name: 'RtPermissionsTestPageAdmin',
          },
        ],
      },
      // ...省略的代码
    ];

    // test权限路由
    const testPermissionRouter = [
     {
        path: '/permissions',
        name: 'RtPermissions',
        children: [
          {
            path: 'page',
            name: 'RtPermissionsPage',
          },
          {
            path: 'test-page-test',
            name: 'RtPermissionsTestPageTest',
          },
        ],
      },
    ];
    // ...省略的代码
    ```

3. 获取路由逻辑  
    获取后端路由逻辑在 `src/router/utils.ts` 文件中 `getAsyncRoute` 方法，方法具体如下：

    ```ts
    async function getAsyncRoute(permission: RoleEnum) {
      const res = await getRouteApi({ name: permission });
      if (res.data.length) {
        return handleRouteList(sortRouteList(sidebarRouteList), res.data);
      } else {
        console.error('No requested route');
        return [];
      }
    }
    ```

4. 后端路由权限判断逻辑  
    权限判断逻辑在 `src/router/utils.ts` 文件中 `handleRouteList` 方法，方法具体如下：

    ```ts
    function handleRouteList(routerList: AppRouteRecordRaw[], dataRouter: RouteDataItemType[]) {
      const newRouteList: AppRouteRecordRaw[] = [];
      routerList.forEach((i) => {
        if (!i.meta?.whiteList) {
          const rItem = dataRouter.find((r) => r.name === i.name);
          if (rItem) {
            if (i.children && i.children.length) {
              const children = handleRouteList(i.children, rItem.children);
              if (children) newRouteList.push({ ...i, children: children });
            } else {
              newRouteList.push(i);
            }
          }
        } else {
          newRouteList.push(i);
        }
      });
      return newRouteList;
    }
    ```

::: warning 注意
为了方便演示后端路由获取不同权限的路由，所以通过角色编码去获取不同权限后端路由列表。这里可以自行更改，只要修改 `src/router/utils.ts` 文件中 `getAsyncRoute` 方法即可
:::

### 后端路由白名单

某些业务场景下，模块固定在系统展示，不需要权限判断时，可以为模块或者单个路由指定白名单

在路由 `meta` 配置中设置 `whiteList` 为 `true`

```ts
const permissions: AppRouteRecordRaw[] = [
  {
    path: '/permissions',
    redirect: '/permissions/page',
    name: 'RtPermissions',
    meta: { 
      title: 'route.pathName.permissions', 
      icon: 'guide', 
      position: 7, 
      whiteRoute: true // [!code focus]
    },
    children: [
      {
        path: 'page',
        name: 'RtPermissionsPage',
        component: () => import('@/views/permissions/page/index.vue'),
        meta: { title: t('route.pathName.permissionsPage') },
      },
      {
        path: 'test-page-admin',
        name: 'RtPermissionsTestPageAdmin',
        component: () => import('@/views/permissions/test-permissions-a/index.vue'),
        meta: { title: t('route.pathName.testPermissionsPage1'), },
      },
      {
        path: 'test-page-test',
        name: 'RtPermissionsTestPageTest',
        component: () => import('@/views/permissions/test-permissions-b/index.vue'),
        meta: { title: t('route.pathName.testPermissionsPage2'), },
      },
    ],
  },
];
```

::: warning 注意

1. 父级指定了白名单，子路由默认拥有访问权限
2. 父级没有指定白名单且没有访问权限，那么子路由设置白名单也没有访问权限
3. 子路路由设置了白名单，只要父级有访问权限，子路由就拥有访问权限
:::

## 内部模块

有些页面会被设计为系统内部页面。这类页面通常具有以下特性：

1. 不显示在导航菜单中
2. 不显示标签页
3. 不进行权限判断

为了简化这类页面的管理，项目中引入了一个白名单机制

白名单的管理位于以下文件路径：
`src/router/modules/index.ts`

```ts
const whiteCatalogue = ['root'];
```

要添加新的模块到白名单，只需将其名称添加到 whiteCatalogue 数组中即可。之后，该页面或模块将自动被项目视为系统内部页面

::: warning 注意

内部模块在注册的时候是和 `'/'` 路由是同级的，如果你的页面需要在 `layout` 中显示，那么你需要为父级路由指定 `layout`

error 页面举例：

```ts
import type { AppRouteRecordRaw } from '@/router/type';
import { t } from '@/hooks/web/useI18n';

const Layout = () => import('@/layouts/page-layouts/index.vue'); // [!code ++]

const error: AppRouteRecordRaw[] = [
  {
    path: '/error',
    redirect: '/error/404',
    name: 'error',
    alwaysShow: true,
    component: Layout, // [!code ++]
    meta: {
      title: 'route.pathName.error',
      icon: 'iEL-remove-filled',
      position: 8,
      whiteRoute: true,
    },
    children: [
      {
        path: '403',
        name: '403',
        component: () => import('@/views/error/403.vue'),
        meta: { title: t('route.pathName.error403') },
      },
      {
        path: '404',
        name: '404',
        component: () => import('@/views/error/404.vue'),
        meta: { title: t('route.pathName.error404') },
      },
      {
        path: '500',
        name: '500',
        component: () => import('@/views/error/500.vue'),
        meta: { title: t('route.pathName.error500') },
      },
    ],
  },
];

export default error;
```

:::

## 切换权限

当用户权限发生变化时，用户权限的变化可能会影响其能够访问的路由列表。为了确保路由列表与用户权限保持同步，你可以调用 `initRoute` 方法刷新其可以访问的路由列表

示例：

```ts
const roleChange = async () => {
  userInfoStore.setRoles(userInfoStore.roles === RoleEnum.ADMIN ? RoleEnum.TEST : RoleEnum.ADMIN);
  initRoute(userInfoStore.roles);
};
```
