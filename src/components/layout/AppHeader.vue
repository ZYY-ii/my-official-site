<template>
  <header class="app-header" :class="{ 'scrolled': isScrolled }">
    <div class="container header-inner">
      <!-- Logo -->
      <router-link to="/" class="logo">
        <img src="@/assets/logo.png" alt="中标信认证" class="logo-img" />
        <span class="logo-text">中标信认证</span>
      </router-link>

      <!-- PC端导航 -->
      <nav class="nav-menu">
        <router-link 
          v-for="item in menuItems" 
          :key="item.path" 
          :to="item.path" 
          class="nav-item" 
          active-class="active"
          exact
        >
          {{ item.name }}
        </router-link>
      </nav>

      <!-- 移动端菜单开关 -->
      <div class="mobile-toggle" @click="toggleMobileMenu">
        <span :class="{ 'open': mobileMenuOpen }"></span>
        <span :class="{ 'open': mobileMenuOpen }"></span>
        <span :class="{ 'open': mobileMenuOpen }"></span>
      </div>
    </div>

    <!-- 移动端下拉菜单 -->
    <transition name="slide-down">
      <nav v-show="mobileMenuOpen" class="mobile-menu">
        <router-link 
          v-for="item in menuItems" 
          :key="item.path" 
          :to="item.path" 
          class="mobile-item" 
          active-class="active"
          @click.native="mobileMenuOpen = false"
        >
          {{ item.name }}
        </router-link>
      </nav>
    </transition>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      isScrolled: false,
      mobileMenuOpen: false,
      menuItems: [
        { path: '/', name: '网站首页' },
        { path: '/about', name: '关于我们' },
        { path: '/news', name: '新闻动态' },
        { path: '/service', name: '认证服务' },
        { path: '/docs', name: '公开文件' },
        { path: '/cert-query', name: '证书查询' },
        { path: '/careers', name: '诚聘英才' },
        { path: '/contact', name: '联系我们' }
      ]
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 20
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    }
  }
}
</script>

<style scoped lang="scss">
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: #fff;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);

  &.scrolled {
    height: 60px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 18px;
  color: var(--primary-blue);

  .logo-img {
    height: 36px;
    width: auto;
  }
}

.nav-menu {
  display: flex;
  gap: 32px;

  .nav-item {
    font-size: 15px;
    font-weight: 500;
    color: var(--text-main);
    padding: 8px 0;
    position: relative;

    &:hover, &.active {
      color: var(--primary-blue);
    }

    &.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--secondary-blue);
      border-radius: 2px;
    }
  }
}

/* 移动端适配 */
.mobile-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  cursor: pointer;

  span {
    display: block;
    height: 2px;
    background: var(--text-main);
    border-radius: 2px;
    transition: all 0.3s;

    &.open:nth-child(1) { transform: translateY(8px) rotate(45deg); }
    &.open:nth-child(2) { opacity: 0; }
    &.open:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
  }
}

.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  padding: 16px 0;

  .mobile-item {
    display: block;
    padding: 12px 24px;
    font-size: 16px;
    color: var(--text-main);
    border-bottom: 1px solid #f0f0f0;

    &:last-child { border-bottom: none; }
    &.active { color: var(--primary-blue); background: var(--bg-light); }
  }
}

.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter, .slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 768px) {
  .nav-menu { display: none; }
  .mobile-toggle { display: flex; }
}
</style>