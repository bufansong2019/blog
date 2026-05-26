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
    script.onerror = () => resolve(); // 静默失败，loading 保持显示
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
    // 清空容器，防止 SPA 切换时残留
    const el = document.getElementById('tcomment');
    if (el) el.innerHTML = '';
  },
  methods: {
    async initTwikoo() {
      // 确保 DOM 已渲染
      await this.$nextTick();
      // 确保 twikoo 脚本已加载（全局只加载一次）
      await loadTwikooScript();

      if (typeof window === 'undefined' || !window.twikoo) return;

      const commentPath = this.path || window.location.pathname.replace(/\/$/, '');

      window.twikoo.init({
        envId: this.envId,
        el: '#tcomment',
        path: commentPath,
        lang: 'zh-CN'
      });

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
