---
outline: deep
---

# 介绍

## 简介

`electron-xs-admin` 基于vue-xs-admin开发的 Electron 后台框架模板

## 模版仓库

- [github](https://github.com/jsxiaosi/electron-xs-admin)

## 项目依赖

- electron: 版本29.x以上,
- electron-builder: 版本24.13.x以上,
- vite-plugin-electron: 版本0.28.x以上,
- vite-plugin-electron-renderer: 版本0.14.x以上,

## 运行

### 开发环境

```bash
npm run electron:dev
```

### 生成环境

```bash
npm run electron:build
```

## 项目目录结构

```bash
.
├── build                         #全局公共配置目录 // [!code focus]
│   └── vite                      #存放vue页面目录  // [!code focus]
│       └── plugin                # // [!code focus]
│           └── electron.ts       #vite-plugin-electron插件 // [!code focus]
├── public                        #公共静态文件目录
├── electron                      #Electron相关的进程脚本 // [!code focus]
│   ├── main                      #主进程脚本 // [!code focus]
│   └── preload                   #预加载脚本，用于渲染进程的安全增强 // [!code focus]
├── src                           #项目代码目录
│   ├── App.vue                   #主vue模块
│   ├── assets                    #项目静态文件目录
│   ├── components                #公共组件
│   ├── config                    #项目配置
│   ├── enum                      #枚举
│   ├── layouts                   #布局目录
│   ├── locales                   #国际化配置
│   ├── instruct                  #指令
│   ├── main.js                   #入口文件
│   ├── router                    #路由
│   ├── server                    #请求存放目录
│   ├── store                     #vuex
│   ├── styles                    #公共样式
│   ├── utils                     #公共方法
│   └── views                     #存放vue页面目录
├── LICENSE
├── README.md
├── .editorconfig                 #规范编译器编码样式文件
├── .env.development              #开发环境变量
├── .env.production               #生产环境变量
├── .env.staging                  #测试环境变量
├── .eslintrc.js                  #esLint配置文件
├── .eslintrcignore               #esLint忽略配置文件
├── stylelint.config.js           #styleLint配置文件
├── .stylelintignore              #styleLint忽略配置文件
├── commitlint.config.js          #commitLint配置文件
├── electron-builder.json         #Electron配置文件  // [!code focus]
├── prettier.config.js            #prettier配置文件
├── .prettierignore               #prettier忽略配置文件
├── index.html                    #根模板
├── jsconfig.json
├── package-lock.json
├── package.json
└── vite.config.js                #vite配置文件
```
