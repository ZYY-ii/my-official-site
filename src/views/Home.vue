<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-bg">
        <div class="hero-overlay"></div>
      </div>
      <div class="container hero-content">
        <div class="hero-text">
          <h1 class="hero-title">权威认证 · 赋能企业高质量发展 </h1>
          <p class="hero-subtitle">一站式管理体系认证解决方案提供商</p>
          <div class="hero-buttons">
            <el-button type="primary" size="large" @click="$router.push('/service')">
              查看服务项目
            </el-button>
            <el-button size="large" plain @click="$router.push('/contact')">
              立即咨询
            </el-button>
          </div>
        </div>
        <div class="hero-image">
          <!-- <img src="@/assets/hero-certification.svg" alt="认证服务" /> -->
        </div>
      </div>
    </section>

    <!-- 核心优势 -->
    <section class="advantages-section">
      <div class="container">
        <h2 class="section-title">为什么选择我们</h2>
        <div class="advantages-grid">
          <div class="advantage-card" v-for="(item, index) in advantages" :key="index">
            <div class="advantage-icon">
              <i :class="item.icon"></i>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 服务分类 -->
    <section class="services-section">
      <div class="container">
        <h2 class="section-title">我们的服务</h2>
        <div class="services-grid">
          <div class="service-card" v-for="(category, index) in serviceCategories" :key="index" @click="goToService(category)">
            <div class="service-icon">
              <i :class="category.icon"></i>
            </div>
            <h3>{{ category.name }}</h3>
            <p>{{ category.desc }}</p>
            <ul class="service-list">
              <li v-for="(service, sIndex) in category.services" :key="sIndex">{{ service }}</li>
            </ul>
            <el-button type="text" class="service-link">
              了解详情 <i class="el-icon-arrow-right"></i>
            </el-button>
          </div>
        </div>
      </div>
    </section>

    <!-- 最新动态 -->
    <section class="news-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">最新动态</h2>
          <router-link to="/news" class="more-link">查看更多 <i class="el-icon-arrow-right"></i></router-link>
        </div>
        <div class="news-grid">
          <div class="news-card" v-for="news in latestNews" :key="news.id" @click="goToNews(news)">
            <div class="news-image">
              <img src="@/assets/news-default.jpg" :alt="news.title" />
              <span class="news-tag" :class="news.category">{{ news.categoryName }}</span>
            </div>
            <div class="news-content">
              <h3>{{ news.title }}</h3>
              <p class="news-date">{{ news.publishTime }}</p>
              <p class="news-summary">{{ news.summary }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 客户案例 -->
    <section class="clients-section">
      <div class="container">
        <h2 class="section-title">合作客户</h2>
        <div class="clients-slider">
          <div class="client-logo" v-for="(client, index) in clients" :key="index">
            <img :src="client.logo" :alt="client.name" />
          </div>
        </div>
      </div>
    </section>

    <!-- 快速入口 -->
    <section class="quick-links-section">
      <div class="container">
        <div class="quick-links-grid">
          <div class="quick-link-card" v-for="link in quickLinks" :key="link.name" @click="handleQuickLink(link)">
            <div class="quick-link-icon">
              <i :class="link.icon"></i>
            </div>
            <h3>{{ link.name }}</h3>
            <p>{{ link.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      advantages: [
        { icon: 'el-icon-certificate', title: 'CNAS认可资质', desc: '国家认可委权威认可，证书全国通用' },
        { icon: 'el-icon-trophy', title: '一手发证源头', desc: '直接发证，无中间环节，效率更高' },
        { icon: 'el-icon-cloudy', title: '全程线上服务', desc: '在线申请、进度查询、证书下载' },
        { icon: 'el-icon-user-solid', title: '行业专家顾问团', desc: '10年以上经验审核员团队' }
      ],
      serviceCategories: [
        {
          name: '管理体系认证',
          icon: 'el-icon-s-platform',
          desc: '帮助企业建立标准化管理体系',
          services: ['ISO 9001 质量管理体系', 'ISO 14001 环境管理体系', 'ISO 45001 职业健康安全']
        },
        {
          name: '产品认证',
          icon: 'el-icon-goods',
          desc: '产品符合性认证，提升市场竞争力',
          services: ['CCC 强制性认证', 'CE 欧盟认证', 'RoHS 环保认证']
        },
        {
          name: '专项认证',
          icon: 'el-icon-s-claim',
          desc: '满足特定行业和专业领域需求',
          services: ['两化融合管理体系', '信息安全管理体系', '能源管理体系']
        }
      ],
      latestNews: [
        {
          id: 1,
          title: '国家认监委公告[2025]第16号-质量管理体系认证规则',
          category: 'policy',
          categoryName: '政策法规',
          publishTime: '2025-10-24',
          summary: '质量管理体系认证规则更新，新增对气候变化考虑的要求...',
          cover: '@/assets/news-default.jpg'
        },
        {
          id: 2,
          title: '关于IAF和ISO在管理体系标准中增加对气候变化考虑的通知',
          category: 'industry',
          categoryName: '行业动态',
          publishTime: '2025-02-25',
          summary: '国际认可论坛和ISO组织联合发布关于气候变化考虑的通知...',
          cover: ''
        },
        {
          id: 3,
          title: '中标信认证2025年度客户满意度调查报告',
          category: 'company',
          categoryName: '公司新闻',
          publishTime: '2025-01-15',
          summary: '我司2025年度客户满意度达到98.5%，连续三年保持行业领先...',
          cover: ''
        }
      ],
      clients: [
        { name: '客户1', logo: '@/assets/client1.png' },
        { name: '客户2', logo: '@/assets/client2.png' },
        { name: '客户3', logo: '@/assets/client3.png' },
        { name: '客户4', logo: '@/assets/client4.png' },
        { name: '客户5', logo: '@/assets/client5.png' },
        { name: '客户6', logo: '@/assets/client6.png' }
      ],
      quickLinks: [
        { name: '证书查询', icon: 'el-icon-search', desc: '输入编号查真伪', path: '/cert-query' },
        { name: '在线申请', icon: 'el-icon-edit-outline', desc: '填写表单提交需求', path: '/contact' },
        { name: '下载中心', icon: 'el-icon-download', desc: '获取申请表、合同模板', path: '/docs' },
        { name: '联系我们', icon: 'el-icon-phone', desc: '电话/邮箱/地图', path: '/contact' }
      ]
    }
  },
  methods: {
    goToService(category) {
      this.$router.push({ path: '/service', query: { category: category.name } })
    },
    goToNews(news) {
      this.$router.push(`/news/${news.id}`)
    },
    handleQuickLink(link) {
      this.$router.push(link.path)
    }
  }
}
</script>

<style scoped lang="scss">
.home-page {
  overflow-x: hidden;
}

/* Hero Section */
.hero-section {
  position: relative;
  min-height: 600px;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #0A2E6D 0%, #1a4a8d 100%);
  color: #fff;
  overflow: hidden;

  .hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/hero-bg.jpg') center/cover;
    opacity: 0.2;
  }

  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(10, 46, 109, 0.85);
  }

  .hero-content {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }

  .hero-title {
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 20px;
    line-height: 1.3;
  }

  .hero-subtitle {
    font-size: 20px;
    margin-bottom: 40px;
    opacity: 0.9;
  }

  .hero-buttons {
    display: flex;
    gap: 20px;

    .el-button {
      padding: 15px 40px;
      font-size: 16px;
    }
  }

  .hero-image {
    img {
      width: 100%;
      max-width: 500px;
      animation: float 3s ease-in-out infinite;
    }
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* Section Common */
.section-title {
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 50px;
  color: var(--primary-blue);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: var(--accent-gold);
    border-radius: 2px;
  }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  .more-link {
    color: var(--secondary-blue);
    font-weight: 500;

    &:hover {
      color: var(--primary-blue);
    }
  }
}

/* Advantages Section */
.advantages-section {
  padding: 100px 0;
  background: var(--bg-light);

  .advantages-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
  }

  .advantage-card {
    background: #fff;
    padding: 40px 30px;
    border-radius: var(--border-radius);
    text-align: center;
    box-shadow: var(--shadow-card);
    transition: all 0.3s;

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 12px 24px rgba(0,0,0,0.12);
    }

    .advantage-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 20px;
      background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        font-size: 36px;
        color: #fff;
      }
    }

    h3 {
      font-size: 20px;
      margin-bottom: 10px;
      color: var(--text-main);
    }

    p {
      font-size: 14px;
      color: var(--text-light);
      line-height: 1.6;
    }
  }
}

/* Services Section */
.services-section {
  padding: 100px 0;

  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }

  .service-card {
    background: #fff;
    border: 2px solid #e8e8e8;
    border-radius: var(--border-radius);
    padding: 40px 30px;
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      border-color: var(--secondary-blue);
      box-shadow: var(--shadow-card);
      transform: translateY(-5px);
    }

    .service-icon {
      width: 70px;
      height: 70px;
      background: var(--bg-light);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;

      i {
        font-size: 32px;
        color: var(--primary-blue);
      }
    }

    h3 {
      font-size: 22px;
      margin-bottom: 10px;
      color: var(--text-main);
    }

    p {
      font-size: 14px;
      color: var(--text-light);
      margin-bottom: 20px;
    }

    .service-list {
      margin-bottom: 20px;

      li {
        padding: 8px 0;
        font-size: 14px;
        color: var(--text-main);
        border-bottom: 1px dashed #e8e8e8;

        &:last-child {
          border-bottom: none;
        }

        &::before {
          content: '•';
          color: var(--secondary-blue);
          font-weight: bold;
          margin-right: 8px;
        }
      }
    }

    .service-link {
      color: var(--secondary-blue);
      font-weight: 500;

      &:hover {
        color: var(--primary-blue);
      }
    }
  }
}

/* News Section */
.news-section {
  padding: 100px 0;
  background: var(--bg-light);

  .news-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }

  .news-card {
    background: #fff;
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--shadow-card);
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 24px rgba(0,0,0,0.12);
    }

    .news-image {
      position: relative;
      height: 200px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
      }

      &:hover img {
        transform: scale(1.1);
      }

      .news-tag {
        position: absolute;
        top: 15px;
        left: 15px;
        padding: 5px 12px;
        border-radius: 4px;
        font-size: 12px;
        color: #fff;
        font-weight: 500;

        &.policy { background: #f56c6c; }
        &.industry { background: #409eff; }
        &.company { background: #67c23a; }
      }
    }

    .news-content {
      padding: 25px;

      h3 {
        font-size: 18px;
        margin-bottom: 10px;
        color: var(--text-main);
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .news-date {
        font-size: 13px;
        color: var(--text-light);
        margin-bottom: 10px;
      }

      .news-summary {
        font-size: 14px;
        color: var(--text-light);
        line-height: 1.6;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }
}

/* Clients Section */
.clients-section {
  padding: 80px 0;
  background: #fff;

  .clients-slider {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    gap: 40px;
  }

  .client-logo {
    img {
      height: 60px;
      width: auto;
      opacity: 0.6;
      transition: opacity 0.3s;
      filter: grayscale(100%);

      &:hover {
        opacity: 1;
        filter: grayscale(0%);
      }
    }
  }
}

/* Quick Links Section */
.quick-links-section {
  padding: 80px 0;
  background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
  color: #fff;

  .quick-links-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
  }

  .quick-link-card {
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(10px);
    border-radius: var(--border-radius);
    padding: 40px 30px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: rgba(255,255,255,0.2);
      transform: translateY(-5px);
    }

    .quick-link-icon {
      width: 70px;
      height: 70px;
      margin: 0 auto 20px;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        font-size: 32px;
      }
    }

    h3 {
      font-size: 20px;
      margin-bottom: 10px;
    }

    p {
      font-size: 14px;
      opacity: 0.9;
    }
  }
}

/* Responsive */
@media (max-width: 992px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-title {
    font-size: 36px;
  }

  .hero-image {
    display: none;
  }

  .advantages-grid,
  .services-grid,
  .news-grid,
  .quick-links-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 28px;
  }

  .section-title {
    font-size: 28px;
  }

  .advantages-grid,
  .services-grid,
  .news-grid,
  .quick-links-grid {
    grid-template-columns: 1fr;
  }

  .clients-slider {
    flex-direction: column;
  }
}
</style>