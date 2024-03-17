import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "vue-xs-admin",
  description: "一款开箱即用后台模板",
  lastUpdated: true,
  outDir: 'docs/.vitepress/dist',
  base: '/vue-xs-admin-docs',
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/jsxiaosi/vue-xs-admin-docs/tree/main/:path',
      text: '编辑此页面',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指南', link: '/guide/introduce' }
    ],

    sidebar: [
      {
        text: '指南',
        collapsed: false,
        items: [
          { text: '介绍', link: '/guide/introduce' },
          { text: '开始', link: '/guide/started' },
          { text: '项目配置', link: '/guide/config' },
          { text: '路由配置', link: '/guide/route' },
          { text: '菜单栏与面包屑', link: '/guide/menu' },
          { text: '路由权限配置', link: '/guide/permissions' },
          { text: '标签页', link: '/guide/tabs' }
        ]
      },
      {
        text: '进阶',
        collapsed: false,
        items: [
          { text: '国际化', link: '/guide/advanced/locales' },
          { text: 'Svg图标', link: '/guide/advanced/icon' },
          { text: '组件', link: '/guide/advanced/component' },
          { text: '项目规范', link: '/guide/advanced/lint' },
          { text: '主题', link: '/guide/advanced/theme' },
        ]
      },
      {
        text: 'Electron',
        collapsed: false,
        items: [
          { text: '介绍', link: '/guide/electron/introduce' },
          { text: 'IPC进程通信', link: '/guide/electron/ipc' }
        ]
      },
      {
        text: '模版',
        collapsed: false,
        items: [
          { text: 'min-xs-admin', link: 'https://github.com/jsxiaosi/min-xs-admin' },
          { text: 'electron-xs-admin', link: 'https://github.com/jsxiaosi/electron-xs-admin' },
          { text: 'tauri-xs-admin', link: 'https://github.com/jsxiaosi/tauri-xs-admin' },

        ]
      },
      {
        text: '周边',
        collapsed: false,
        items: [
          { text: '函数工具库', link: 'https://jsxiaosi.gitee.io/utils/' },
          { text: '规范配置', link: 'https://github.com/jsxiaosi/eslint-config/' },
          { text: '组件库模版', link: 'https://github.com/jsxiaosi/xs-components-lib' },
        ]
      },
      {
        text: '常见问题',
        link: '/guide/issus'
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jsxiaosi/vue-xs-admin' }
    ]
  }
})
