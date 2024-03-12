---
outline: deep
---

# 开始

## 准备

- [Node.js](http://nodejs.org/) 和 [Git](https://git-scm.com/) -项目开发环境
- [Vite](https://cn.vitejs.dev/) - 熟悉 Vite 特性
- [Vue3](https://v3.cn.vuejs.org/) - 熟悉 Vue 基础语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 Es6 基本语法
- [Vue-Router](https://router.vuejs.org/zh/) - 熟悉 Vue-Router 基本使用
- [Element-Plus](https://element-plus.gitee.io/#/zh-CN/) - Element-Plus Ui 基本使用

## 环境

- [Node.js](http://nodejs.org/) 版本18.x以上

## 拉取项目

### github 拉取代码

::: code-group

```bash [ssh]
git clone git@github.com:jsxiaosi/vue-xs-admin.git
```

```bash [https]
git clone https://github.com/jsxiaosi/vue-xs-admin.git
```

:::

### gitee 拉取代码

::: code-group

```bash [ssh]
git clone git@gitee.com:jsxiaosi/vue-xs-admin.git
```

```bash [https]
git clone https://gitee.com/jsxiaosi/vue-xs-admin.git
```

:::

### [`xs-cli`](https://github.com/jsxiaosi/xs-cli) 创建

```bash
npx @jsxiaosi/xs-cli create [project-name]
```

## 安装依赖

推荐使用[`pnpm`](https://pnpm.io/zh/)安装依赖

- `pnpm`

```bash
pnpm install
```

- `npm`安装

```bash
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
# 如果下载依赖慢可以使用淘宝镜像源安装依赖
npm install --registry=https://registry.npmmirror.com

```

- `yarn`

```bash
yarn install
```

## 项目目录结构

```bash
.
├── build                         #全局公共配置目录
├── public                        #公共静态文件目录
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
├── prettier.config.js            #prettier配置文件
├── .prettierignore               #prettier忽略配置文件
├── index.html                    #根模板
├── jsconfig.json
├── package-lock.json
├── package.json
└── vite.config.js                #vite配置文件
```
