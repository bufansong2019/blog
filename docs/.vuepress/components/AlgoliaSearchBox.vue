<template>
  <div class="algolia-search-wrapper search-box">
    <div id="algolia-search-input"></div>
  </div>
</template>

<script>
export default {
  props: ['options'],

  mounted() {
    // Vdoing 的 .navbar span 冲掉了 DocSearch 内部 flex 布局，动态注入 style 覆盖主题默认样式
    const style = document.createElement('style')
    const themeColor = '#11A8CD'
    style.textContent = `
    :root { --docsearch-primary-color: ${themeColor}; }

    /*--- 按钮区域适配三个主题模式 ---*/
    .DocSearch-Button { padding: 0 2px 0 14px !important; }
    .theme-mode-dark .DocSearch-Button { background: rgba(60,60,70,.85) !important; }
    .theme-mode-read .DocSearch-Button { background: rgba(225,225,190,.85) !important; }

    /*--- 深色模式弹窗变量 ---*/
    .theme-mode-dark {
      --docsearch-container-background: rgba(0,0,0,.7);
      --docsearch-modal-background: rgb(39,39,43);
      --docsearch-hit-background: rgba(30,30,34,.8);
      --docsearch-hit-shadow: none;
      --docsearch-footer-background: rgb(39,39,43);
      --docsearch-text-color: rgb(155,155,170);
      --docsearch-muted-color: rgb(120,120,140);
      --docsearch-searchbox-background: rgba(30,30,34,.8);
      --docsearch-searchbox-focus-background: rgba(30,30,34);
    }
    /*--- 阅读模式弹窗变量（保持中性灰调，与浅色/深色模式风格统一）---*/
    .theme-mode-read {
      --docsearch-container-background: rgba(0,0,0,.4);
      --docsearch-modal-background: rgb(245,245,213);
      --docsearch-hit-background: rgba(236,236,204,.8);
      --docsearch-hit-shadow: none;
      --docsearch-footer-background: rgb(245,245,213);
      --docsearch-text-color: #2c3e50;
      --docsearch-muted-color: #8292a0;
      --docsearch-searchbox-background: rgba(236,236,204,.8);
      --docsearch-searchbox-focus-background: rgb(236,236,204);
    }

    /* 还原 DocSearch 内部 flex（Vdoing 用 span 选择器冲掉了） */
    .DocSearch-Button-Container, .DocSearch-Button-Keys { display: flex !important; }
    /* 隐藏快捷键提示（如 ⌘K） */
    .DocSearch-Button-Keys { display: none !important; }
    /* 按钮悬停/聚焦时显示主题色边框 */
    .DocSearch-Button:focus, .DocSearch-Button:hover { box-shadow: 0 0 0 1px ${themeColor} !important; }
    .DocSearch-Button-Placeholder { font-size: .9rem !important; }
    /* 搜索图标缩小到 16px */
    .DocSearch-Search-Icon { width: 16px !important; height: 16px !important; }
    /* 弹窗打开时取消右边距偏移
       桌面端（≥1280px）保持 overflow:visible 防止右侧目录 sticky 失效 */
    body.DocSearch--active { margin-right: 0 !important; }
    @media (min-width: 1280px) { body.DocSearch--active { overflow: visible !important; } }
    /* 搜索结果项背景使用主题变量 */
    .DocSearch-Hit a { background: var(--docsearch-hit-background) !important; }
    .DocSearch-Hit[aria-selected=true] a { background: ${themeColor} !important; }
    /* 首次加载淡入动画（配合 head.js 的 defer 加载） */
    .DocSearch-Button { animation: docsearchFadeIn .4s ease both; }
    @keyframes docsearchFadeIn { from { opacity: 0; transform: translateY(-2px); } to { opacity: 1; transform: translateY(0); } }
    `
    document.head.appendChild(style)

    // Vdoing JS 会给 .links 设 inline max-width，导致搜索框被挤窄
    // 用 MutationObserver 持续确保 max-width 被释放
    const links = this.$el.closest('.links')
    let observer = null
    if (links) {
      const release = () => links.style.removeProperty('max-width')
      release()
      observer = new MutationObserver(release)
      observer.observe(links, { attributes: true, attributeFilter: ['style'] })
    }
    this._linksObserver = observer

    // 监听 DocSearch 弹窗状态，锁住 html 滚动（移动端兼容）
    this.initDocSearchObserver()

    // 立即尝试初始化，如果 docsearch 脚本还没加载则轮询等待
    this.initSearch()
  },

  beforeDestroy() {
    if (this._linksObserver) this._linksObserver.disconnect()
    if (this._searchTimer) clearInterval(this._searchTimer)
    if (this._docSearchObserver) this._docSearchObserver.disconnect()
    document.documentElement.style.overflow = ''
  },

  methods: {
    // 移动端：DocSearch 弹窗打开时锁住 html 滚动（iOS Safari 只锁 body 无效）
    initDocSearchObserver() {
      if (typeof window === 'undefined') return
      this._docSearchObserver = new MutationObserver(() => {
        const isActive = document.body.classList.contains('DocSearch--active')
        if (isActive && window.innerWidth < 1280) {
          document.documentElement.style.overflow = 'hidden'
        } else {
          document.documentElement.style.overflow = ''
        }
      })
      this._docSearchObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    },

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
