---
outline: deep
---

# 项目配置

项目配置采用远程加载的方式，你可以把配置文件存放在后端服务器，通过接口获取。加载项目配置文件后会在，它们将被存储在 [`Pinia`](https://pinia.vuejs.org/zh/) 的 `useAppStore` 以及浏览器的 `localStorage` 中。

## 项目配置说明

```ts

export type SidebarMode = 'vertical' | 'horizontal' | 'blend';

export interface AppConfig {
  // 标题
  title: string;
  // 折叠菜单
  collapseMenu: boolean;
  // 菜单显示模式： 'vertical'：左侧模式 | 'horizontal'：顶部模式 | 'blend'：混合模式
  sidebarMode: SidebarMode;
  // 主题模式：白天主题、夜间主题
  themeMode: 'light' | 'dark';
  // 国际化
  locale: string;
  // storage配置
  StorageConfig: {
    // 存储缀
    prefix: string;
    // 存储时效 
    expire: number;
    // 是否开启加密 
    isEncrypt: boolean;
    // 加密密钥 
    secret_key: string;
    // 加密秘钥偏移量 
    secret_iv: string;
  };
  // 移动端菜单
  drawerSidebar?: boolean;
  // 主题颜色
  primaryColor: string;
  // 灰色模式
  greyMode: boolean;
  // 色弱模式
  colorWeaknessMode: boolean;
  // 隐藏侧边菜单栏
  hideSidebar: boolean;
  // 隐藏顶部
  hideNavbart: boolean;
  // 隐藏标签栏
  hideTabs: boolean;
  // 隐藏标签栏操作按钮
  hideTabsConfig: boolean;
  // 标签持久化
  labelPersistent: boolean;
  // 侧边栏按钮
  sidebarFold: 'none' | 'top' | 'bottom';
  // 路由模式 REAREND后端路由、ROLE角色权限控制路由
  permissionMode: keyof typeof PermissionMode;
}

export enum PermissionMode {
  REAREND = 'REAREND',
  ROLE = 'ROLE',
}
```

## 配置文件路径

`public/serverConfig.json`

项目配置文件可存储在后端服务器，只需要更改获取文件地址改成后端接口地址即可

打开 `src/server/config.ts` ，修改 `ROUTE_CONFIG_INFO` 地址

```ts
enum Api {
  ROUTE_CONFIG_INFO = '/serverConfig.json',
}
```

::: warning 注意

项目配置加载后默认存在localStorage，下次加载时默认在localStorage获取，所以修改项目配置后需要清除localStorage，并刷新页面

:::

::: warning _storage

在项目中如果使用_storage来读写 storage 需要在项目配置加载完成才能使用，否则会因为前缀不匹配导致获取不到数据

:::
