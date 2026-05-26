const nav = require('./themeConfig/nav.js');
// const sidebar = require('./themeConfig/sidebar.js');

// 主题配置
module.exports = {
  nav, // 顶部导航栏
  sidebarDepth: 2, // 侧边栏显示深度，默认1，最大2（显示到h3标题）
  logo: '/img/logo.png', // 导航栏logo
  repo: 'bufansong2019/bufansong2019.github.io', // 导航栏右侧生成Github链接
  searchMaxSuggestions: 10, // 搜索结果显示最大数
  lastUpdated: '上次更新', // 开启更新时间，并配置前缀文字   string | boolean (取值为git提交时间)
  editLinks: false, // 启用编辑链接
  docsDir: 'docs', // 编辑的文件夹
  docsBranch: 'main', // 编辑的分支
  editLinkText: '帮助我们改善此页面',
  searchPlaceholder: '按下 𝑺 搜索', // 可选：搜索栏占位文本，默认："$ grep ..."

  //*** 以下配置是Vdoing主题改动和新增的配置 ***//

  category: false, // 是否打开分类功能，默认true
  tag: false, // 是否打开标签功能，默认true
  // archive: false, // 是否打开归档功能，默认true
  // categoryText: '随笔', // 碎片化文章预设生成的分类值，默认'随笔'

  // titleBadge: false, // 文章标题前的图标是否显示，默认true
  // titleBadgeIcons: [ // 文章标题前图标的地址，默认主题内置图标
  //   '图标地址1',
  //   '图标地址2'
  // ],
  // contentBgStyle: 1, // 文章内容块的背景风格，默认无

  // rightMenuBar: false, // 是否显示右侧文章大纲栏，默认true
  sidebarOpen: false, // 初始状态是否打开侧边栏，默认true
  pageButton: false, // 是否显示快捷翻页按钮，默认true

  sidebar: { mode: 'structuring', collapsable: false }, // 侧边栏配置
  pageStyle: 'line', // 页面风格，可选值：'card'卡片 | 'line' 线
  updateBar: {
    // 最近更新栏
    showToArticle: false // 显示到文章页底部，默认true
  },
  author: {
    // 文章默认的作者信息
    name: 'bufansong', // 必需
    link: 'https://github.com/bufansong2019' // 可选
  },
  social: {
    // 社交图标，显示于博主信息栏和页脚栏
    // iconfontCssFile: '//at.alicdn.com/t/font_1678482_u4nrnp8xp6g.css',
    icons: [
      {
        iconClass: 'icon-youjian',
        title: '发邮件',
        link: 'bufansong2019@163.com'
      },
      {
        iconClass: 'icon-github',
        title: 'GitHub',
        link: 'https://github.com/bufansong2019'
      },
      {
        iconClass: 'icon-bilibili',
        title: '哔哩哔哩',
        link: 'https://space.bilibili.com/292027886'
      }
    ]
  },
  footer: {
    // 页脚信息
    createYear: 2026, // 博客创建年份
    copyrightInfo: '鱼行二进制 | By bufansong | <a href="https://github.com/bufansong2019/bufansong2019.github.io/blob/main/LICENSE" target="_blank">MIT License</a>'
  }
};