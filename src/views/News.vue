<template>
  <div class="news-page">
    <!-- Page Banner -->
    <section class="page-banner">
      <div class="banner-bg"></div>
      <div class="container">
        <h1>新闻动态</h1>
        <div class="breadcrumb">
          <router-link to="/">首页</router-link>
          <i class="el-icon-arrow-right"></i>
          <span>新闻动态</span>
        </div>
      </div>
    </section>

    <!-- 搜索与筛选 -->
    <section class="news-filter-section">
      <div class="container">
        <div class="filter-bar">
          <div class="category-tabs">
            <span 
              v-for="cat in categories" 
              :key="cat.value"
              :class="['tab-item', { active: currentCategory === cat.value }]"
              @click="currentCategory = cat.value"
            >
              {{ cat.label }}
            </span>
          </div>
          <div class="search-box">
            <el-input 
              v-model="searchKeyword" 
              placeholder="搜索新闻关键词..."
              prefix-icon="el-icon-search"
              clearable
              @keyup.enter.native="handleSearch"
            ></el-input>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
          </div>
        </div>
      </div>
    </section>

    <!-- 新闻列表 -->
    <section class="news-list-section">
      <div class="container">
        <div class="news-grid">
          <div class="news-card" v-for="news in paginatedNews" :key="news.id" @click="goToDetail(news)">
            <div class="news-image">
              <img :src="news.cover || require('@/assets/news-default.jpg')" :alt="news.title" />
              <span class="news-tag" :class="news.category">{{ news.categoryName }}</span>
              <span class="news-date-badge">
                <span class="day">{{ formatDay(news.publishTime) }}</span>
                <span class="month">{{ formatMonth(news.publishTime) }}</span>
              </span>
            </div>
            <div class="news-content">
              <h3>{{ news.title }}</h3>
              <p class="news-meta">
                <i class="el-icon-date"></i> {{ news.publishTime }}
              </p>
              <p class="news-summary">{{ news.summary }}</p>
              <div class="read-more-wrapper">
                <span class="read-more-link" @click.stop="goToDetail(news)">
                  <span class="link-text">阅读全文</span>
                  <i class="el-icon-arrow-right link-arrow"></i>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <el-empty v-if="newsList.length === 0" description="暂无相关新闻"></el-empty>

        <!-- 分页 -->
        <div class="pagination-wrapper" v-if="totalPages > 1">
          <el-pagination
            :current-page="currentPage"
            :page-size="pageSize"
            :total="total"
            :page-sizes="[6, 12, 20]"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handlePageChange"
          ></el-pagination>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'News',
  data() {
    return {
      categories: [
        { label: '全部', value: '' },
        { label: '公司新闻', value: 'company' },
        { label: '行业动态', value: 'industry' },
        { label: '政策法规', value: 'policy' },
        { label: '通知公告', value: 'notice' }
      ],
      currentCategory: '',
      searchKeyword: '',
      currentPage: 1,
      pageSize: 6,
      newsList: [
        {
          id: 1,
          title: '国家认监委公告[2025]第16号-质量管理体系认证规则',
          category: 'policy',
          categoryName: '政策法规',
          publishTime: '2025-10-24',
          summary: '质量管理体系认证规则更新，新增对气候变化考虑的要求，企业需关注新标准变化...',
          cover: ''
        },
        {
          id: 2,
          title: '关于IAF和ISO在管理体系标准中增加对气候变化考虑的通知',
          category: 'industry',
          categoryName: '行业动态',
          publishTime: '2025-02-25',
          summary: '国际认可论坛和ISO组织联合发布关于气候变化考虑的通知，各认证机构需及时调整...',
          cover: ''
        },
        {
          id: 3,
          title: '中标信认证2025年度客户满意度调查报告',
          category: 'company',
          categoryName: '公司新闻',
          publishTime: '2025-01-15',
          summary: '我司2025年度客户满意度达到98.5%，连续三年保持行业领先水平...',
          cover: ''
        },
        {
          id: 4,
          title: '2026年春节放假通知',
          category: 'notice',
          categoryName: '通知公告',
          publishTime: '2026-01-20',
          summary: '根据国家法定节假日安排，结合我司实际情况，现将2026年春节放假安排通知如下...',
          cover: ''
        },
        {
          id: 5,
          title: '新版ISO 9001:2025标准解读培训圆满结束',
          category: 'company',
          categoryName: '公司新闻',
          publishTime: '2025-12-10',
          summary: '我司组织的ISO 9001:2025标准解读培训圆满结束，共有150家企业参加...',
          cover: ''
        },
        {
          id: 6,
          title: '认证认可条例修订草案公开征求意见',
          category: 'policy',
          categoryName: '政策法规',
          publishTime: '2025-11-05',
          summary: '市场监管总局就认证认可条例修订草案公开征求意见，截止日期为2025年12月5日...',
          cover: ''
        }
      ]
    }
  },
  computed: {
    filteredNews() {
      let result = this.newsList
      if (this.currentCategory) {
        result = result.filter(item => item.category === this.currentCategory)
      }
      if (this.searchKeyword) {
        const keyword = this.searchKeyword.toLowerCase()
        result = result.filter(item => 
          item.title.toLowerCase().includes(keyword) ||
          item.summary.toLowerCase().includes(keyword)
        )
      }
      return result
    },
    paginatedNews() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.filteredNews.slice(start, end)
    },
    total() {
      return this.filteredNews.length
    },
    totalPages() {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  methods: {
    handleSearch() {
      this.currentPage = 1
    },
    handlePageChange(page) {
      this.currentPage = page
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.currentPage = 1
    },
    goToDetail(news) {
      this.$router.push(`/news/${news.id}`)
    },
    formatDay(dateStr) {
      return new Date(dateStr).getDate().toString().padStart(2, '0')
    },
    formatMonth(dateStr) {
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
      return months[new Date(dateStr).getMonth()]
    }
  },
  watch: {
    currentCategory() {
      this.currentPage = 1
    }
  }
}
</script>

<style scoped lang="scss">
.page-banner {
  position: relative;
  height: 600px;
  display: flex;
  align-items: center;
  background: var(--primary-blue);
  color: #fff;

  .banner-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/news-banner.jpg') center/cover;
    opacity: 0.2;
  }

  .container {
    position: relative;
    z-index: 1;
  }

  h1 {
    font-size: 48px;
    margin-bottom: 10px;
  }

  .breadcrumb {
    font-size: 14px;
    opacity: 0.9;

    a {
      color: #fff;
      &:hover { text-decoration: underline; }
    }

    i { margin: 0 10px; }
  }
}

.news-filter-section {
  padding: 40px 0;
  background: var(--bg-light);
  border-bottom: 1px solid #e8e8e8;

  .filter-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  .category-tabs {
    display: flex;
    gap: 10px;

    .tab-item {
      padding: 10px 20px;
      background: #fff;
      border-radius: 20px;
      cursor: pointer;
      font-size: 15px;
      color: var(--text-light);
      transition: all 0.3s;
      border: 2px solid transparent;

      &:hover {
        color: var(--primary-blue);
        border-color: var(--secondary-blue);
      }

      &.active {
        background: var(--primary-blue);
        color: #fff;
      }
    }
  }

  .search-box {
    display: flex;
    gap: 10px;

    .el-input {
      width: 300px;
    }
  }
}

.news-list-section {
  padding: 60px 0;

  .news-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
    margin-bottom: 40px;
  }

  .news-card {
    background: #fff;
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--shadow-card);
    transition: all 0.3s;
    cursor: pointer;
    display: flex;
    flex-direction: column;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 24px rgba(0,0,0,0.12);
    }

    .news-image {
      position: relative;
      height: 240px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
      }

      &:hover img {
        transform: scale(1.05);
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
        &.notice { background: #e6a23c; }
      }

      .news-date-badge {
        position: absolute;
        top: 15px;
        right: 15px;
        background: rgba(255,255,255,0.95);
        padding: 8px 12px;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);

        .day {
          display: block;
          font-size: 24px;
          font-weight: 700;
          color: var(--primary-blue);
          line-height: 1;
        }

        .month {
          display: block;
          font-size: 11px;
          color: var(--text-light);
          margin-top: 2px;
        }
      }
    }

    .news-content {
      padding: 24px 28px 20px; // 减小整体 padding
      flex: 1;
      display: flex;
      flex-direction: column;

      h3 {
        font-size: 19px;
        margin-bottom: 12px;
        color: var(--text-main);
        line-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .news-meta {
        font-size: 13px;
        color: var(--text-light);
        margin-bottom: 12px;

        i { margin-right: 5px; }
      }

      .news-summary {
        font-size: 14px;
        color: var(--text-light);
        line-height: 1.8;
        margin-bottom: 16px;
        flex: 1;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      // ✨ 新的"阅读全文"设计
      .read-more-wrapper {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .read-more-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          font-size: 13px;
          color: var(--secondary-blue);
          font-weight: 500;
          padding: 6px 14px;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(64, 158, 255, 0.08), rgba(64, 158, 255, 0.02));
          border: 1px solid rgba(64, 158, 255, 0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;

          // 悬浮动效
          &:hover {
            background: linear-gradient(135deg, rgba(64, 158, 255, 0.15), rgba(64, 158, 255, 0.05));
            border-color: var(--secondary-blue);
            color: var(--primary-blue);
            padding-left: 18px;
            padding-right: 18px;
            box-shadow: 0 4px 12px rgba(64, 158, 255, 0.15);
            transform: translateX(2px);
          }

          .link-text {
            position: relative;
            z-index: 1;
          }

          .link-arrow {
            font-size: 12px;
            transition: transform 0.3s;
          }

          &:hover .link-arrow {
            transform: translateX(3px);
          }
        }
      }
    }
  }

  .pagination-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }
}

@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
  }

  .filter-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .category-tabs {
    flex-wrap: wrap;
  }

  .search-box {
    .el-input {
      width: 100%;
    }
  }
}

.read-more-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  padding: 4px 0;
  position: relative;

  .link-text {
    font-size: 14px;
    font-weight: 600;
    background: linear-gradient(90deg, var(--primary-blue), #4facfe);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .link-arrow {
    font-size: 12px;
    color: var(--primary-blue);
    transition: transform 0.3s;
  }

  // 底部动态下划线
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--primary-blue), #4facfe);
    transition: width 0.3s;
  }

  &:hover::after {
    width: 100%;
  }

  &:hover .link-arrow {
    transform: translateX(4px);
  }
}
</style>