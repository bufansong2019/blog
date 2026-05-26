const head = require('./config/head.js');
const plugins = require('./config/plugins.js');
const themeConfig = require('./config/themeConfig.js');

module.exports = {
  theme: 'vdoing',
  title: '鱼行二进制',
  description: '漫游逻辑深海，记录每一行成长代码，分享技术学习笔记。',
  base: '/',
  markdown: {
    lineNumbers: true // 代码行号
  },

  head,
  plugins,
  themeConfig
};