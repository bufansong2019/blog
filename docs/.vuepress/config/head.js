// head
module.exports = [
  // 注入到页面<head> 中的标签，格式[tagName, { attrName: attrValue }, innerHTML?]
  ['link', { rel: 'icon', href: '/img/favicon.ico' }], // favicons，资源放在public文件夹
  ['meta', { name: 'keywords', content: '卜凡松,技术分享,Java,vue' }],
  ['meta', { name: 'baidu-site-verification', content: 'codeva-XqpfgmSRwP' }], // 百度站长验证
  ['meta', { name: 'theme-color', content: '#11a8cd' }], // 移动浏览器主题颜色  ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],
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
  // 搜索框添加快捷键
  ['script', { language: 'javascript', type: 'text/javascript', src: '/js/pgmanor-self.js' }]
];