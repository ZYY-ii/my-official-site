<template>
  <div class="about-page">
    <!-- Page Banner -->
    <section class="page-banner">
      <div class="banner-bg"></div>
      <div class="container">
        <h1>关于我们</h1>
        <div class="breadcrumb">
          <router-link to="/">首页</router-link>
          <i class="el-icon-arrow-right"></i>
          <span>关于我们</span>
        </div>
      </div>
    </section>

    <!-- 公司简介 -->
    <section class="company-intro">
      <div class="container">
        <div class="intro-grid">
          <div class="intro-text">
            <h2>公司简介</h2>
            <p class="lead">中标信认证（江苏）有限公司是一家经国家认证认可监督管理委员会批准成立的第三方认证机构</p>
            <p>公司成立于2015年，注册资本1000万元，总部位于江苏省淮安市。我们专注于为企业提供质量管理体系、环境管理体系、职业健康安全管理体系等各类认证服务。</p>
            <p>凭借专业的技术团队、严谨的审核流程和高效的客户服务，我们已成功为超过500家企业提供了认证服务，客户满意度持续保持在98%以上。</p>
            <div class="intro-stats">
              <div class="stat-item">
                <div class="stat-number">500+</div>
                <div class="stat-label">服务企业</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">98%</div>
                <div class="stat-label">客户满意度</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">10+</div>
                <div class="stat-label">年经验</div>
              </div>
            </div>
          </div>
          <div class="intro-image">
            <img src="@/assets/about-office.jpg" alt="公司办公环境" />
          </div>
        </div>
      </div>
    </section>

    <!-- 使命愿景价值观 -->
    <section class="mvv-section">
      <div class="container">
        <div class="mvv-grid">
          <div class="mvv-card">
            <div class="mvv-icon">
              <i class="el-icon-s-flag"></i>
            </div>
            <h3>使命</h3>
            <p>为企业提供可靠的质量保障背书，助力企业提升管理水平和市场竞争力</p>
          </div>
          <div class="mvv-card">
            <div class="mvv-icon">
              <i class="el-icon-star-on"></i>
            </div>
            <h3>愿景</h3>
            <p>成为国内领先的综合性认证服务平台，打造值得信赖的认证品牌</p>
          </div>
          <div class="mvv-card">
            <div class="mvv-icon">
              <i class="el-icon-s-check"></i>
            </div>
            <h3>价值观</h3>
            <p>诚信、专业、高效、创新，以客户为中心，持续创造价值</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 发展历程 -->
  <section class="timeline-section">
    <div class="timeline-section-container">
      <h2 class="section-title">发展历程</h2>
      <div class="timeline-container">
        <div class="timeline-line"></div>
        <div class="timeline-items">
          <div 
            v-for="(item, index) in timeline" 
            :key="index"
            :class="['timeline-item', index % 2 === 0 ? 'top' : 'bottom']"
          >
            <div class="timeline-card">
              <div class="year">{{ item.year }}</div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </div>
            <div class="timeline-dot"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

    <!-- 荣誉资质 -->
    <section class="honors-section">
      <div class="container">
        <h2 class="section-title">荣誉资质</h2>
        <div class="honors-grid">
          <div class="honor-card" v-for="(honor, index) in honors" :key="index" @click="previewHonor(honor)">
            <img :src="honor.image" :alt="honor.title" />
            <div class="honor-overlay">
              <i class="el-icon-zoom-in"></i>
            </div>
            <div class="honor-title">{{ honor.title }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心团队 -->
    <section class="team-section">
      <div class="container">
        <h2 class="section-title">核心团队</h2>
        <div class="team-grid">
          <div class="team-card" v-for="(member, index) in team" :key="index">
            <div class="team-photo">
              <img :src="member.photo" :alt="member.name" />
            </div>
            <h3>{{ member.name }}</h3>
            <div class="team-position">{{ member.position }}</div>
            <p class="team-desc">{{ member.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 社会责任 -->
    <section class="csr-section">
      <div class="container">
        <h2 class="section-title">社会责任</h2>
        <div class="csr-content">
          <div class="csr-text">
            <p>中标信认证始终秉持"取之于社会，回馈于社会"的理念，积极参与公益事业，推动可持续发展。</p>
            <ul class="csr-list">
              <li><i class="el-icon-check"></i> 每年开展免费认证培训，帮助中小企业提升管理水平</li>
              <li><i class="el-icon-check"></i> 支持环保事业，推行绿色办公和低碳认证</li>
              <li><i class="el-icon-check"></i> 资助贫困学生，累计捐款超过50万元</li>
              <li><i class="el-icon-check"></i> 参与行业标准制定，推动认证行业规范化发展</li>
            </ul>
          </div>
          <div class="csr-image">
            <img src="@/assets/csr-activity.jpg" alt="社会责任活动" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// 1. 在顶部引入图片
import honor1 from '@/assets/honor1.png'
import honor2 from '@/assets/honor1.png'
import honor3 from '@/assets/honor1.png'
import honor4 from '@/assets/honor1.png'

import team1 from '@/assets/team1.jpg'
import team2 from '@/assets/team1.jpg'
import team3 from '@/assets/team1.jpg'
import team4 from '@/assets/team1.jpg'
export default {
  name: 'About',
  data() {
    return {
      timeline: [
        { year: '2015', title: '公司成立', desc: '中标信认证（江苏）有限公司正式成立' },
        { year: '2016', title: '获得CNAS认可', desc: '通过国家认可委CNAS认可，获得认证资质' },
        { year: '2018', title: '业务拓展', desc: '服务范围扩展至全国，服务企业突破200家' },
        { year: '2020', title: '数字化转型', desc: '推出在线认证服务平台，实现全流程线上办理' },
        { year: '2018', title: '业务拓展', desc: '服务范围扩展至全国，服务企业突破200家' },
        { year: '2020', title: '数字化转型', desc: '推出在线认证服务平台，实现全流程线上办理' },
        { year: '2023', title: '里程碑', desc: '累计服务企业超过500家，客户满意度98%' },
        { year: '2024', title: '里程碑', desc: '累计服务企业超过500家，客户满意度98%' },
        { year: '2025', title: '新起点', desc: '启动新一轮战略升级，打造智慧认证生态' },
        { year: '2026', title: '新起点', desc: '启动新一轮战略升级，打造智慧认证生态' }
      ],
      honors: [
        { title: 'CNAS认可证书', image: honor1 },
        { title: 'CMA资质证书', image: honor2 },
        { title: '行业协会会员证', image: honor3 },
        { title: 'AAA信用企业', image: honor4 }
      ],
      team: [
        { name: '张总经理', position: '总经理', photo: team1, desc: '15年认证行业经验，曾任多家知名认证机构高管' },
        { name: '李技术总监', position: '技术总监', photo: team2, desc: '高级工程师，ISO审核员资格，精通各类管理体系标准' },
        { name: '王首席审核员', position: '首席审核员', photo: team3, desc: '20年质量管理经验，累计审核企业超过300家' },
        { name: '赵市场总监', position: '市场总监', photo: team4, desc: '10年市场营销经验，擅长企业咨询服务' }
      ]
    }
  },
  methods: {
    previewHonor(honor) {
      // 实现图片预览功能
      this.$message.info(`预览：${honor.title}`)
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
    background: url('@/assets/about-banner.jpg') center/cover;
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

      &:hover {
        text-decoration: underline;
      }
    }

    i {
      margin: 0 10px;
    }
  }
}

.company-intro {
  padding: 100px 0;

  .intro-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }

  h2 {
    font-size: 32px;
    margin-bottom: 20px;
    color: var(--primary-blue);
  }

  .lead {
    font-size: 18px;
    font-weight: 500;
    color: var(--text-main);
    margin-bottom: 20px;
    line-height: 1.8;
  }

  p {
    font-size: 15px;
    color: var(--text-light);
    margin-bottom: 15px;
    line-height: 1.8;
  }

  .intro-stats {
    display: flex;
    gap: 40px;
    margin-top: 40px;
    padding-top: 40px;
    border-top: 2px solid var(--bg-light);
  }

  .stat-item {
    text-align: center;

    .stat-number {
      font-size: 36px;
      font-weight: 700;
      color: var(--primary-blue);
      margin-bottom: 5px;
    }

    .stat-label {
      font-size: 14px;
      color: var(--text-light);
    }
  }

  .intro-image {
    img {
      width: 100%;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-card);
    }
  }
}

.mvv-section {
  padding: 80px 0;
  background: var(--bg-light);

  .mvv-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }

  .mvv-card {
    background: #fff;
    padding: 50px 40px;
    border-radius: var(--border-radius);
    text-align: center;
    box-shadow: var(--shadow-card);
    transition: all 0.3s;

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 12px 24px rgba(0,0,0,0.12);
    }

    .mvv-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 25px;
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
      font-size: 24px;
      margin-bottom: 15px;
      color: var(--primary-blue);
    }

    p {
      font-size: 15px;
      color: var(--text-light);
      line-height: 1.8;
    }
  }
}

.timeline-section {
  padding: 100px 0;

  .section-title {
    text-align: center;
    font-size: 36px;
    margin-bottom: 60px;
    color: var(--primary-blue);
  }
}
.timeline-section-container {
  position: relative;
  padding: 0 20px;
  margin: 0 auto;
}

.timeline-container {
  position: relative;
  // max-width: 1200px;
  margin: 0 auto;
}

.timeline-line {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  height: 4px;
  background: linear-gradient(to right, var(--primary-blue), var(--secondary-blue));
  border-radius: 2px;
  z-index: 1;
}

.timeline-items {
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 2;
}

.timeline-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 0 10px;

  &.top {
    // 上方卡片：卡片在上，圆点在下（时间轴线上）
    .timeline-card {
      margin-bottom: 120px; // 卡片底部到时间轴线的距离
      text-align: center;
      position: relative;

      // 向下箭头
      &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 8px solid transparent;
        border-top-color: #fff;
        margin-top: 1px;
      }
    }

    .timeline-dot {
      // 圆点定位在时间轴线上
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      margin-top: 0;
    }
  }

  &.bottom {
    // 下方卡片：圆点在上（时间轴线上），卡片在下
    .timeline-dot {
      // 圆点定位在时间轴线上
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      margin-bottom: 0;
    }

    .timeline-card {
      margin-top: 260px; // 时间轴线到卡片顶部的距离
      text-align: center;
      position: relative;

      // 向上箭头
      &::after {
        content: '';
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 8px solid transparent;
        border-bottom-color: #fff;
        margin-bottom: 1px;
      }
    }
  }
}

.timeline-card {
  background: #fff;
  padding: 20px 15px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-card);
  width: 160px;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.15);
  }

  .year {
    font-size: 28px;
    font-weight: 700;
    color: var(--secondary-blue);
    margin-bottom: 10px;
  }

  h3 {
    font-size: 16px;
    margin-bottom: 8px;
    color: var(--text-main);
    font-weight: 600;
  }

  p {
    font-size: 12px;
    color: var(--text-light);
    line-height: 1.6;
    margin: 0;
  }
}

.timeline-dot {
  width: 20px;
  height: 20px;
  background: var(--accent-gold);
  border: 4px solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 3px var(--primary-blue);
  flex-shrink: 0;
  transition: all 0.3s;
  z-index: 10;

  &:hover {
    transform: translateY(-50%) scale(1.2);
    box-shadow: 0 0 0 5px var(--secondary-blue);
  }
}

.honors-section {
  padding: 100px 0;
  background: var(--bg-light);

  .section-title {
    text-align: center;
    font-size: 36px;
    margin-bottom: 60px;
    color: var(--primary-blue);
  }

  .honors-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
  }

  .honor-card {
    position: relative;
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--shadow-card);
    cursor: pointer;

    img {
      width: 100%;
      height: 280px;
      object-fit: cover;
      transition: transform 0.3s;
    }

    .honor-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(10, 46, 109, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s;

      i {
        font-size: 48px;
        color: #fff;
      }
    }

    &:hover {
      img {
        transform: scale(1.1);
      }

      .honor-overlay {
        opacity: 1;
      }
    }

    .honor-title {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 15px;
      background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
      color: #fff;
      font-size: 14px;
      text-align: center;
    }
  }
}

.team-section {
  padding: 100px 0;

  .section-title {
    text-align: center;
    font-size: 36px;
    margin-bottom: 60px;
    color: var(--primary-blue);
  }

  .team-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
  }

  .team-card {
    background: #fff;
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--shadow-card);
    text-align: center;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 12px 24px rgba(0,0,0,0.12);
    }

    .team-photo {
      height: 250px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
      }
    }

    &:hover .team-photo img {
      transform: scale(1.05);
    }

    h3 {
      font-size: 20px;
      margin: 20px 0 5px;
      color: var(--text-main);
    }

    .team-position {
      font-size: 14px;
      color: var(--secondary-blue);
      font-weight: 500;
      margin-bottom: 15px;
    }

    .team-desc {
      font-size: 14px;
      color: var(--text-light);
      padding: 0 20px 25px;
      line-height: 1.6;
    }
  }
}

.csr-section {
  padding: 100px 0;
  background: var(--bg-light);

  .section-title {
    text-align: center;
    font-size: 36px;
    margin-bottom: 60px;
    color: var(--primary-blue);
  }

  .csr-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }

  p {
    font-size: 16px;
    color: var(--text-light);
    margin-bottom: 30px;
    line-height: 1.8;
  }

  .csr-list {
    li {
      padding: 12px 0;
      font-size: 15px;
      color: var(--text-main);
      display: flex;
      align-items: flex-start;

      i {
        color: var(--accent-gold);
        margin-right: 12px;
        margin-top: 4px;
      }
    }
  }

  .csr-image {
    img {
      width: 100%;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-card);
    }
  }
}

/* Responsive */
@media (max-width: 992px) {
  .intro-grid,
  .csr-content {
    grid-template-columns: 1fr;
  }

  .mvv-grid,
  .honors-grid,
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .timeline::before {
    left: 20px;
  }

  .timeline-item,
  .timeline-item.reverse {
    padding-left: 60px;
    padding-right: 0;
    justify-content: flex-start;
  }

  .timeline-item.reverse .timeline-content {
    text-align: left;
  }

  .timeline-dot {
    left: 12px !important;
    right: auto !important;
  }
}

@media (max-width: 576px) {
  .mvv-grid,
  .honors-grid,
  .team-grid {
    grid-template-columns: 1fr;
  }

  .intro-stats {
    flex-direction: column;
    gap: 20px;
  }

  .timeline-item,
  .timeline-item.reverse {
    padding-left: 50px;
  }
}
</style>