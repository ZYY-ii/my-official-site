<template>
  <div id="app">
    <AppHeader />
    <main class="main-content">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style lang="scss">
/* 全局 CSS 变量（与设计系统对齐） */
html {
  --primary-blue: #0A2E6D;
  --secondary-blue: #4A90E2;
  --accent-gold: #D4AF37;
  --text-main: #333333;
  --text-light: #666666;
  --bg-light: #F8F9FA;
  --border-radius: 8px;
  --shadow-card: 0 4px 12px rgba(0, 0, 0, 0.08);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif;
  color: var(--text-main);
  line-height: 1.6;
  background-color: #fff;
  -webkit-font-smoothing: antialiased;
}

/* 防止固定Header遮挡内容 */
#app .main-content {
  min-height: calc(100vh - 80px);
  padding-top: 70px; /* 与Header高度匹配 */
}

a {
  text-decoration: none;
  color: inherit;
  transition: color 0.3s;
}

ul {
  list-style: none;
}

/* 容器通用类 */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>