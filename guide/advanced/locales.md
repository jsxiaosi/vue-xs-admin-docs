---
outline: deep
---

# 国际化

项目使用的是 [`vue-i18n`](https://vue-i18n.intlify.dev/) 库来实现多语言功能，目前项目内置 `en`、 `zh-CN` 两种语言，国际化配置目录在 `src/locales` 下

## 添加新的语言

1. 在 `src/locales/modules` 目录下创建一个 `zh-HK.json` 文件

    ```json
    {
      "home": "首頁"
    }

    ```

2. 在 `src/enum/locales` 添加枚举

    ```ts
    export enum LocalesEnum {
      EN = 'en',
      ZHCN = 'zh-CN',
      ZHHK = 'zh-HK', // [!code ++]
    }
    ```

完成以上步骤即可注册新语言

::: tip

项目内置 [`@intlify/unplugin-vue-i18n`](https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n) 插件自动加载国际化资源，无需手动添加引入注册，并且按照官方添加 [`TypeScript`](https://vue-i18n.intlify.dev/guide/advanced/typescript.html) 支持

<img src="./../public/guide/locales/TypeScript.png">

:::

## 如何使用

使用方式和 [`vue-i18n`](https://vue-i18n.intlify.dev/guide/advanced/directive.html) 一样没有任何区别

```vue
<div id="string-syntax">
  <p>{{ $t('route.home') }}</p>
</div>
```

## 切换国际化

切换国家化方法参考 `src/components/Application/AppLocale.vue` 通过修改 [`AppConfig`](/guide/config.md#项目配置说明) 的 `locale` 实现

具体代码

```ts
import { LocalesEnum } from '@/enum/locales';
import { useRootSetting } from '@/hooks/setting/useRootSetting';

const { setAppConfigMode } = useRootSetting();
const tolochos = () => {
  setAppConfigMode({ locale: LocalesEnum.ZHHK });
};
```

## 设置默认国际化

设置默认国际化在 [`项目配置`](/guide/config.md) 文件中修改 `locale` 值为你想要的默认语言代码即可

举例：`public/serverConfig.json`

```json
{
  "title": "XsAdmin",
  "collapseMenu": false,
  "sidebarMode": "vertical",
  "themeMode": "dark",
  "locale": "zh-HK", // [!code focus]
  "primaryColor": "#409eff",
  "greyMode": false,
  "colorWeaknessMode":false,
  "hideNavbart": false,
  "hideTabs": false,
  "labelPersistent": true,
  "sidebarFold": "top",
  "permissionMode": "REAREND",
  "StorageConfig":{
    "expire": 0, 
    "isEncrypt": false
  }
}
```

::: warning 注意
项目默认存放的项目配置路径是 `public/serverConfig.json`，如果你的项目配置文件存在后端服务器，那么你应该去修改后端服务器的配置文件
:::

## 配合 i18n-ally 插件

项目默认提供了 `i18n-ally` 的配置，只要在你的 `vscode` 安装了 `i18n-ally` 插件即可

<img src="../public/guide/locales/i18n-ally.gif">

### 路由配置

在路由配置中你需要使用 `src/hooks/web/useI18n` 提供的 `t` 函数编写国际化字符串才能实时预览

举例：

```ts
import { t } from '@/hooks/web/useI18n'; // [!code focus]

const about: AppRouteRecordRaw[] = [
  {
    path: '/about',
    redirect: '/about/index',
    name: 'RtAdminInfo',
    alwaysShow: false,
    meta: { 
      title: t('route.pathName.about'), // [!code focus]
      icon: 'about', 
    },
  },
];
```
