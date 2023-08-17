# 常见问题

## 控制台报错 Cannot convert undefined or null to object

```js
TypeError: Cannot convert undefined or null to object
    at Function.keys (<anonymous>)
    at translateI18n (useI18n.ts:33:21)
    at index.ts:43:36
    at vue-router.mjs:2009:35
    at new Promise (<anonymous>)
    at vue-router.mjs:1981:18
    at Object.runWithContext (runtime-core.esm-bundler.js:3865:18)
    at runWithContext (vue-router.mjs:3239:19)
    at vue-router.mjs:3590:69
```

解决方式：
清除 `LocalStorage` 存储
