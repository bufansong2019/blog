// head
module.exports = [
  // 注入到页面<head> 中的标签，格式[tagName, { attrName: attrValue }, innerHTML?]
  ['link', { rel: 'icon', href: '/img/favicon.ico' }], // favicons，资源放在public文件夹
  ['meta', { name: 'keywords', content: '卜凡松,鱼行二进制' }],
  ['meta', { name: 'baidu-site-verification', content: 'codeva-XqpfgmSRwP' }], // 百度站长验证
  ['meta', { name: 'algolia-site-verification', content: '256C26140F7ACCC1' }], // Algolia 搜索验证
  // Algolia DocSearch v3
  ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@docsearch/css@3' }],
  ['script', { src: 'https://cdn.jsdelivr.net/npm/@docsearch/js@3', defer: true }],
  ['meta', { name: 'theme-color', content: '#11a8cd' }],
  ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],
  // 霞鹜文楷字体 - 异步加载不阻塞渲染
  ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/lxgw-wenkai-screen-webfont@1.6.0/style.css', media: 'print', onload: "this.media='all'" }],
  ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.6.0/style.css', media: 'print', onload: "this.media='all'" }],
  ['noscript', {}, '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-screen-webfont@1.6.0/style.css"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.6.0/style.css">'],
  // 百度统计
  ['script', {}, `
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?c1466e1dffa52359f9cecfcb277dfcb9";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  `],
];