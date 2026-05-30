// import vue from 'vue/dist/vue.esm.browser'

export default ({
  Vue,      // VuePress 正在使用的 Vue 构造函数
  options,  // 附加到根实例的一些选项
  router,   // 当前应用的路由实例
  siteData  // 站点元数据
}) => {
  // window.Vue = vue // 使页面中可以使用Vue构造函数（使页面中的vue demo生效）

  // auto 模式跟随系统深色/浅色实时切换
  if (typeof window !== 'undefined') {
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkQuery.addEventListener('change', () => {
      const raw = localStorage.getItem('mode');
      const mode = raw ? JSON.parse(raw) : null;
      if (!mode || mode === 'auto') {
        document.body.className = document.body.className.replace(
          /theme-mode-(light|dark)/,
          `theme-mode-${darkQuery.matches ? 'dark' : 'light'}`
        );
      }
    });
  }

  // 百度统计路由跟踪
  if (router) {
    router.beforeEach((to, from, next) => {
      if (typeof _hmt !== 'undefined' && to.path) {
        _hmt.push(['_trackPageview', to.fullPath])
      }
      next()
    })
  }
}
