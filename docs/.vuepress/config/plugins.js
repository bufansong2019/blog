// 插件配置
module.exports = [
  // 全文搜索插件
  'fulltext-search',

  // 代码块复制按钮
  [
    'one-click-copy',
    {
      copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'],
      copyMessage: '复制成功',
      duration: 1000,
      showInMobile: false
    }
  ],

  // 图片放大插件
  [
    'vuepress-plugin-zooming',
    {
      selector: '.theme-vdoing-content img:not(.no-zoom)',
      options: {
        bgColor: 'rgba(0,0,0,0.6)'
      }
    }
  ],

  // 上次更新时间
  [
    '@vuepress/last-updated',
    {
      transformer: (timestamp, lang) => {
        const dayjs = require('dayjs');
        return dayjs(timestamp).format('YYYY/MM/DD, HH:mm:ss');
      }
    }
  ]
];