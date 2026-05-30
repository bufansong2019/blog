<template>
  <div class="twikoo-comments">
    <div v-if="loading" class="twikoo-loading">评论加载中...</div>
    <div id="tcomment"></div>
  </div>
</template>

<script>
const SCRIPT_URL = 'https://cdn.jsdelivr.net/npm/twikoo@1.6.44/dist/twikoo.min.js';
let scriptPromise = null;

function loadTwikooScript() {
  if (scriptPromise) return scriptPromise;
  if (typeof window !== 'undefined' && window.twikoo) {
    scriptPromise = Promise.resolve();
    return scriptPromise;
  }
  scriptPromise = new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export default {
  name: 'Twikoo',
  props: {
    envId: {
      type: String,
      default: 'https://twikoo.f1sh.org/'
    },
    path: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: true
    };
  },
  mounted() {
    this.initTwikoo();
  },
  beforeDestroy() {
    const el = document.getElementById('tcomment');
    if (el) el.innerHTML = '';
  },
  methods: {
    async initTwikoo() {
      await this.$nextTick();

      let inited = false;
      const timeout = setTimeout(() => {
        if (!inited) {
          this.loading = false;
          const el = document.getElementById('tcomment');
          if (el) el.innerHTML = '<p style="text-align:center;color:var(--textColor);padding:2rem;opacity:0.6">评论加载失败，请刷新重试</p>';
        }
      }, 8000);

      await loadTwikooScript();

      if (typeof window === 'undefined' || !window.twikoo) return;

      inited = true;
      clearTimeout(timeout);

      const commentPath = this.path || window.location.pathname.replace(/\/$/, '');

      window.twikoo.init({
        envId: this.envId,
        el: '#tcomment',
        path: commentPath,
        lang: 'zh-CN'
      });

      // 延迟注入主题色样式，确保 Twikoo 的 Element UI CSS 已加载
      setTimeout(() => {
        if (document.getElementById('twikoo-theme-style')) return;
        const style = document.createElement('style');
        style.id = 'twikoo-theme-style';
        style.textContent = `
          .twikoo-comments .el-button {
            color: #11a8cd !important;
            border-color: #11a8cd !important;
            background-color: transparent !important;
          }
          .twikoo-comments .el-button--primary {
            background-color: #11a8cd !important;
            color: #fff !important;
          }
          .twikoo-comments .el-button:hover,
          .twikoo-comments .el-button:focus {
            background-color: #11a8cd !important;
            color: #fff !important;
            opacity: 0.85;
          }
          .twikoo-comments svg,
          .twikoo-comments i,
          .twikoo-comments .el-icon {
            color: #11a8cd !important;
          }
          .twikoo-comments .el-input__inner:focus,
          .twikoo-comments .el-textarea__inner:focus {
            border-color: #11a8cd !important;
          }
          .twikoo-comments a {
            color: #11a8cd !important;
          }
          .twikoo-comments .el-checkbox__input.is-checked .el-checkbox__inner,
          .twikoo-comments .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            background-color: #11a8cd !important;
            border-color: #11a8cd !important;
          }
        `;
        document.head.appendChild(style);
      }, 300);

      this.loading = false;
    }
  }
};
</script>

<style scoped>
.twikoo-loading {
  text-align: center;
  color: var(--textColor);
  padding: 2rem;
  font-size: 0.9rem;
  opacity: 0.7;
}

#tcomment {
  margin-top: 1rem;
}
</style>
