---
outline: deep
---

# Tabs标签页

## 路由配置是否显示标签页

```ts
  {
    path: '/about',
    redirect: '/about/index',
    name: 'RtAdminInfo',
    meta: { 
      title: t('route.pathName.about'),  
      icon: 'about',
      position: 11, 
      alwaysShow: true, 
      hideTabs: true, // [!code focus]
    },
  },
```

::: warning 注意

如果路由配置是不显示在侧边栏上，那么默认情况下不显示标签页~！如果想要修改这个默认配置在
`src/layouts/page-layouts/components/AppTabs/hooks/useTabsChange.ts`:

```ts
  const addRouteTabs = (routeRaw: MultiTabsType) => {
    const { path, name, meta } = routeRaw;
    if (!meta?.hideTabs && !meta?.hideSidebar) { // [!code --]
    if (!meta?.hideTabs) { // [!code ++]

      const currentRoute = { path, meta, name };
      usePermissionStoreHook().handleMultiTabs('add', currentRoute);
    }
  };
```

:::

## 详情页标签

系统提供了 `useDetailsNavigation` hooks打开详情页

### Query 参数详情页

```ts
const { openDetails } = useDetailsNavigation();

openDetails({
  path: `/details_page/details_info`,
  name: `RtDetailsInfo`,
  query: { id: `${params}` },
  title: { 'zh-CN': `详情页-${params}`, en: `pageDatails-${params}` },
});
```

### Params 参数详情页

```ts
const { openDetails } = useDetailsNavigation();

openDetails({
  path: `/details_page/details_params/${params}`,
  name: `RtDetailsParams`,
  title: { 'zh-CN': `详情页-params-${params}`, en: `pageDatails-${params}` },
});
```

## 标签持久化

标签默认情况下是持久化存储

通过系统配置文件 `public/serverConfig.json` 控制是否持久化标签页

```json
{
  "tabPersistent": false //true: 标签页持久化、 false: 关闭标签页持久化
}
```

## 标签拖拽

标签默认情况下是可拖拽排序

通过系统配置文件 `public/serverConfig.json` 控制是否可拖拽排序

```json
{
  "closeTabDrag": false //true: 标签页持久化、 false: 关闭标签页持久化
}
```
