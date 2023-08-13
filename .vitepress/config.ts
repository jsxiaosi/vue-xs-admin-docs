import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "vue-xs-admin",
  description: "一款开箱即用后台模板",
  lastUpdated: true,
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
          { text: '路由权限配置', link: '/guide/permissions' }
        ]
      },
      {
        text: '进阶',
        collapsed: false,
        items: [
          { text: '国际化', link: '/guide/locales' },
          { text: 'Svg图标', link: '/guide/icon' },
          { text: '项目规范', link: '/guide/lint' },
          { text: '主题', link: '/guide/theme' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
