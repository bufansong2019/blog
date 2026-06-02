<template>
  <div class="algolia-search-wrapper search-box">
    <div id="algolia-search-input"></div>
  </div>
</template>

<script>
export default {
  props: ['options'],

  mounted() {
    // 恢复 DocSearch 内部 flex 布局：Vdoing 的 .navbar span 冲掉了 display:flex
    const style = document.createElement('style')
    const themeColor = '#11A8CD'
    style.textContent = `
    :root { --docsearch-primary-color: ${themeColor}; }
    .DocSearch-Button-Container, .DocSearch-Button-Keys { display: flex !important; }
    .DocSearch-Button { padding: 0 2px 0 14px !important; }
    .DocSearch-Button:focus, .DocSearch-Button:hover { box-shadow: 0 0 0 1px ${themeColor} !important; }
    .DocSearch-Button-Keys { display: none !important; }
    .DocSearch-Button-Placeholder { font-size: .9rem !important; }
    .DocSearch-Search-Icon { width: 16px !important; height: 16px !important; }
    body.DocSearch--active { margin-right: 0 !important; overflow: visible !important; }
    .DocSearch-Hit a { background: var(--docsearch-hit-background) !important; }
    .DocSearch-Hit[aria-selected=true] a { background: ${themeColor} !important; }
    .DocSearch-Button { animation: docsearchFadeIn .4s ease both; }
    @keyframes docsearchFadeIn { from { opacity: 0; transform: translateY(-2px); } to { opacity: 1; transform: translateY(0); } }
    `
    document.head.appendChild(style)

    // 放开父容器宽度限制（Vdoing JS 设的 inline max-width）
    const links = this.$el.closest('.links')
    let observer = null
    if (links) {
      const release = () => links.style.removeProperty('max-width')
      release()
      observer = new MutationObserver(release)
      observer.observe(links, { attributes: true, attributeFilter: ['style'] })
    }
    this._linksObserver = observer

    // 立即尝试初始化，如果 docsearch 脚本还没加载则轮询等待
    this.initSearch()
  },

  beforeDestroy() {
    if (this._linksObserver) this._linksObserver.disconnect()
    if (this._searchTimer) clearInterval(this._searchTimer)
  },

  methods: {
    initSearch() {
      const start = () => {
        if (!this.options || !window.docsearch) return

        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
        const shortcut = isMac ? '⌘K' : 'Ctrl+K'

        window.docsearch({
          ...this.options,
          container: '#algolia-search-input',
          placeholder: '搜索文档',
          translations: {
            button: {
              buttonText: `搜索 (${shortcut})`,
              buttonAriaLabel: '搜索'
            },
            modal: {
              searchBox: {
                resetButtonTitle: '清除',
                resetButtonAriaLabel: '清除',
                cancelButtonText: '取消',
                cancelButtonAriaLabel: '取消'
              },
              startScreen: {
                recentSearchesTitle: '最近搜索',
                noRecentSearchesText: '无最近搜索',
                saveRecentSearchButtonTitle: '保存到搜索记录',
                removeRecentSearchButtonTitle: '移除搜索记录',
                favoriteSearchesTitle: '收藏',
                removeFavoriteSearchButtonTitle: '移除收藏'
              },
              errorScreen: {
                titleText: '无法获取结果',
                helpText: '请检查网络连接'
              },
              footer: {
                selectText: '选择',
                navigateText: '切换',
                closeText: '关闭',
                searchByText: ''
              },
              noResultsScreen: {
                noResultsText: '未找到结果',
                suggestedQueryText: '试试搜索',
                reportMissingResultsText: '认为应该显示结果？',
                reportMissingResultsLinkText: '反馈给我们'
              }
            }
          }
        })
      }

      start()
      if (!window.docsearch) {
        this._searchTimer = setInterval(() => {
          if (window.docsearch) {
            clearInterval(this._searchTimer)
            this._searchTimer = null
            start()
          }
        }, 50)
      }
    }
  }
}
</script>
