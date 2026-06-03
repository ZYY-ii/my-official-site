<template>
  <div class="service-page">
    <!-- Page Banner -->
    <section class="page-banner">
      <div class="banner-bg"></div>
      <div class="container">
        <h1>认证服务</h1>
        <p class="banner-desc">专业、高效、权威的认证解决方案</p>
        <div class="breadcrumb">
          <router-link to="/">首页</router-link>
          <i class="el-icon-arrow-right"></i>
          <span>认证服务</span>
        </div>
      </div>
    </section>

    <!-- 服务分类导航 -->
    <section class="service-nav-section">
      <div class="container">
        <div class="nav-tabs">
          <div 
            v-for="(category, index) in serviceCategories" 
            :key="index"
            :class="['nav-tab', { active: activeCategory === index }]"
            @click="activeCategory = index"
          >
            <i :class="category.icon"></i>
            <span>{{ category.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 服务详情展示 -->
    <section class="service-detail-section">
      <div class="container">
        <div class="service-content">
          <!-- 左侧服务列表 -->
          <div class="service-list">
            <div 
              v-for="(service, sIndex) in currentCategoryServices" 
              :key="sIndex"
              :class="['service-item', { active: selectedService === sIndex }]"
              @click="selectedService = sIndex"
            >
              <div class="service-item-header">
                <i :class="service.icon"></i>
                <h3>{{ service.name }}</h3>
              </div>
              <p class="service-item-desc">{{ service.shortDesc }}</p>
              <div class="service-item-tags">
                <span v-for="tag in service.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
          </div>

          <!-- 右侧服务详情 -->
          <div class="service-info">
            <div v-if="currentService" class="info-card">
              <h2 class="info-title">{{ currentService.name }}</h2>
              <p class="info-desc">{{ currentService.fullDesc }}</p>

              <!-- 认证标准 -->
              <div class="info-section">
                <h3><i class="el-icon-document"></i> 认证依据标准</h3>
                <ul class="standard-list">
                  <li v-for="(std, index) in currentService.standards" :key="index">
                    <i class="el-icon-check"></i> {{ std }}
                  </li>
                </ul>
              </div>

              <!-- 认证流程 -->
              <div class="info-section">
                <h3><i class="el-icon-timer"></i> 认证流程</h3>
                <div class="process-steps">
                  <div 
                    v-for="(step, index) in currentService.process" 
                    :key="index"
                    class="step"
                  >
                    <div class="step-number">{{ index + 1 }}</div>
                    <div class="step-content">
                      <h4>{{ step.title }}</h4>
                      <p>{{ step.desc }}</p>
                    </div>
                    <!-- <div v-if="index < currentService.process.length - 1" class="step-arrow">
                      <i class="el-icon-arrow-right"></i>
                    </div> -->
                  </div>
                </div>
              </div>

              <!-- 所需资料 -->
              <div class="info-section">
                <h3><i class="el-icon-folder-opened"></i> 所需资料</h3>
                <ul class="docs-list">
                  <li v-for="(doc, index) in currentService.requiredDocs" :key="index">
                    <i class="el-icon-document"></i> {{ doc }}
                  </li>
                </ul>
              </div>

              <!-- 认证周期与费用 -->
              <div class="info-section">
                <h3><i class="el-icon-coin"></i> 认证周期与费用</h3>
                <div class="price-info">
                  <div class="price-item">
                    <span class="label">认证周期：</span>
                    <span class="value">{{ currentService.duration }}</span>
                  </div>
                  <div class="price-item">
                    <span class="label">参考费用：</span>
                    <span class="value price">{{ currentService.price }}</span>
                  </div>
                </div>
              </div>

              <!-- FAQ -->
              <div class="info-section">
                <h3><i class="el-icon-question"></i> 常见问题</h3>
                <el-collapse v-model="activeFaqs" accordion>
                  <el-collapse-item 
                    v-for="(faq, index) in currentService.faqs" 
                    :key="index"
                    :title="faq.question"
                    :name="index"
                  >
                    <p>{{ faq.answer }}</p>
                  </el-collapse-item>
                </el-collapse>
              </div>

              <!-- 相关下载 -->
              <div class="info-section">
                <h3><i class="el-icon-download"></i> 相关下载</h3>
                <div class="download-list">
                  <div v-for="(file, index) in currentService.downloads" :key="index" class="download-item">
                    <i class="el-icon-document"></i>
                    <span class="file-name">{{ file.name }}</span>
                    <span class="file-size">{{ file.size }}</span>
                    <el-button type="text" size="small" @click="downloadFile(file)">
                      下载
                    </el-button>
                  </div>
                </div>
              </div>

              <!-- CTA按钮 -->
              <div class="info-actions">
                <el-button type="primary" size="large" @click="contactNow">
                  <i class="el-icon-phone"></i> 立即咨询
                </el-button>
                <el-button size="large" plain @click="applyNow">
                  <i class="el-icon-edit"></i> 在线申请
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 特色服务Banner -->
    <section class="feature-banner">
      <div class="container">
        <div class="feature-grid">
          <div class="feature-card" v-for="(feature, index) in features" :key="index">
            <div class="feature-icon">
              <i :class="feature.icon"></i>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.desc }}</p>
            <el-button type="text" @click="learnMore(feature)">
              了解详情 <i class="el-icon-arrow-right"></i>
            </el-button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Service',
  data() {
    return {
      activeCategory: 0,
      selectedService: 0,
      activeFaqs: 0,
      serviceCategories: [
        {
          name: '管理体系认证',
          icon: 'el-icon-s-platform',
          services: [
            {
              name: 'ISO 9001 质量管理体系认证',
              icon: 'el-icon-circle-check',
              shortDesc: '帮助企业建立标准化的质量管理体系，提升产品和服务质量',
              fullDesc: 'ISO 9001是国际标准化组织发布的质量管理体系标准，适用于各类组织。通过认证可以证明企业具备稳定提供满足顾客要求和适用法律法规要求的产品和服务的能力。',
              tags: ['制造业', '服务业', '通用'],
              standards: ['ISO 9001:2015', 'GB/T 19001-2016'],
              process: [
                { title: '咨询签约', desc: '了解需求，签订合同' },
                { title: '文件准备', desc: '编制质量手册、程序文件' },
                { title: '体系运行', desc: '实施体系，记录运行' },
                { title: '内部审核', desc: '内审员进行内部审核' },
                { title: '管理评审', desc: '最高管理者评审体系' },
                { title: '现场审核', desc: '认证机构现场审核' },
                { title: '发证监督', desc: '颁发证书，定期监督' }
              ],
              requiredDocs: [
                '营业执照副本复印件',
                '组织机构代码证',
                '质量手册和程序文件',
                '组织架构图',
                '生产工艺流程图',
                '内审和管理评审记录'
              ],
              duration: '30-60天',
              price: '￥3,000元起',
              faqs: [
                { question: '证书有效期多久？', answer: 'ISO 9001证书有效期为3年，每年需要进行监督审核。' },
                { question: '是否需要每年复审？', answer: '是的，证书有效期内每年需要进行一次监督审核，3年后需要再认证。' },
                { question: '小微企业是否可以认证？', answer: '可以，我们针对小微企业有专门的简化流程和优惠价格。' }
              ],
              downloads: [
                { name: 'ISO9001认证申请表', size: '256KB', url: '#' },
                { name: '认证合同范本', size: '180KB', url: '#' },
                { name: '认证流程图', size: '420KB', url: '#' }
              ]
            },
            {
              name: 'ISO 14001 环境管理体系认证',
              icon: 'el-icon-s-cooperation',
              shortDesc: '帮助企业建立环境管理体系，实现可持续发展',
              fullDesc: 'ISO 14001是国际通用的环境管理体系标准，帮助组织识别、管理和减少对环境的影响，提高环境绩效。',
              tags: ['环保', '制造业', '建筑业'],
              standards: ['ISO 14001:2015', 'GB/T 24001-2016'],
              process: [
                { title: '环境因素识别', desc: '识别活动、产品和服务中的环境因素' },
                { title: '法律法规识别', desc: '收集适用的环境法律法规' },
                { title: '目标指标制定', desc: '制定环境目标和指标' },
                { title: '运行控制', desc: '建立运行控制程序' },
                { title: '应急准备', desc: '制定应急预案' },
                { title: '监测测量', desc: '监测环境绩效' },
                { title: '持续改进', desc: '持续改进环境绩效' }
              ],
              requiredDocs: [
                '营业执照',
                '环评报告及批复',
                '排污许可证',
                '环境管理手册',
                '环境因素清单',
                '法律法规清单'
              ],
              duration: '45-60天',
              price: '￥4,000元起',
              faqs: [
                { question: '哪些企业需要做ISO14001？', answer: '所有希望改善环境绩效、满足法律法规要求的组织都可以认证，特别是制造业、建筑业等环境影响较大的行业。' },
                { question: '没有环评可以认证吗？', answer: '不可以，环评报告及批复是必备文件。' }
              ],
              downloads: [
                { name: 'ISO14001认证申请表', size: '260KB', url: '#' },
                { name: '环境因素识别表', size: '195KB', url: '#' }
              ]
            },
            {
              name: 'ISO 45001 职业健康安全管理体系',
              icon: 'el-icon-s-flag',
              shortDesc: '保护员工健康安全，降低职业健康安全风险',
              fullDesc: 'ISO 45001是职业健康安全管理体系国际标准，帮助组织提供安全健康的工作场所，预防与工作相关的伤害和健康损害。',
              tags: ['安全', '通用', '高风险行业'],
              standards: ['ISO 45001:2018', 'GB/T 45001-2020'],
              process: [
                { title: '危险源辨识', desc: '识别工作场所的危险源' },
                { title: '风险评估', desc: '评估职业健康安全风险' },
                { title: '风险控制', desc: '制定风险控制措施' },
                { title: '法规识别', desc: '识别适用的法律法规' },
                { title: '目标制定', desc: '制定OH&S目标' },
                { title: '运行控制', desc: '建立运行控制程序' },
                { title: '应急准备', desc: '制定应急预案' }
              ],
              requiredDocs: [
                '营业执照',
                '安全生产许可证（如适用）',
                '职业健康安全管理手册',
                '危险源清单',
                '法律法规清单',
                '应急预案'
              ],
              duration: '45-60天',
              price: '￥4,000元起',
              faqs: [
                { question: 'ISO45001和OHSAS18001有什么区别？', answer: 'ISO 45001是OHSAS 18001的升级版，采用高阶结构，更强调领导作用和员工参与。' }
              ],
              downloads: [
                { name: 'ISO45001认证申请表', size: '258KB', url: '#' },
                { name: '危险源辨识表', size: '210KB', url: '#' }
              ]
            }
          ]
        },
        {
          name: '产品认证',
          icon: 'el-icon-goods',
          services: [
            {
              name: 'CCC 强制性产品认证',
              icon: 'el-icon-shopping-cart-full',
              shortDesc: '中国强制性产品认证，市场准入必备',
              fullDesc: 'CCC认证是中国政府为保护消费者人身安全和国家安全、加强产品质量管理、依照法律法规实施的一种产品合格评定制度。',
              tags: ['强制性', '电子产品', '汽车'],
              standards: ['CCC认证目录', 'GB国家标准'],
              process: [
                { title: '申请受理', desc: '提交申请材料' },
                { title: '型式试验', desc: '送样检测' },
                { title: '工厂检查', desc: '工厂质量保证能力检查' },
                { title: '评定发证', desc: '认证结果评定，颁发证书' },
                { title: '获证后监督', desc: '年度监督检查' }
              ],
              requiredDocs: [
                '申请书',
                '营业执照',
                '产品说明书',
                '产品图纸',
                '关键元器件清单',
                'CB报告（如有）'
              ],
              duration: '4-8周',
              price: '根据产品类别定价',
              faqs: [
                { question: '哪些产品需要CCC认证？', answer: '列入CCC认证目录的产品必须获得认证才能销售，包括电线电缆、开关、家用电器、汽车等22大类160多种产品。' }
              ],
              downloads: [
                { name: 'CCC认证目录', size: '1.2MB', url: '#' },
                { name: 'CCC认证申请表', size: '245KB', url: '#' }
              ]
            }
          ]
        },
        {
          name: '专项认证',
          icon: 'el-icon-s-claim',
          services: [
            {
              name: '两化融合管理体系认证',
              icon: 'el-icon-data-line',
              shortDesc: '信息化和工业化融合管理体系认证',
              fullDesc: '两化融合管理体系是引导组织强化变革管理、系统推进两化融合的管理体系标准，适用于所有希望系统建立、实施、保持和改进两化融合管理机制的组织。',
              tags: ['信息化', '制造业', '数字化转型'],
              standards: ['GB/T 23001-2017', '两化融合管理体系要求'],
              process: [
                { title: '贯标启动', desc: '成立工作组，启动贯标' },
                { title: '现状调研', desc: '调研两化融合现状' },
                { title: '体系分析', desc: '分析差距，制定方案' },
                { title: '文件编写', desc: '编写体系文件' },
                { title: '体系运行', desc: '实施体系，记录运行' },
                { title: '内部审核', desc: '内审和管理评审' },
                { title: '评定审核', desc: '第三方评定审核' }
              ],
              requiredDocs: [
                '营业执照',
                '两化融合管理手册',
                '两化融合方针和目标',
                '新型能力打造方案',
                '业务流程优化方案'
              ],
              duration: '3-6个月',
              price: '￥20,000元起',
              faqs: [
                { question: '两化融合认证有什么好处？', answer: '可以获得政府补贴、提升企业竞争力、促进数字化转型、获得招投标加分等。' }
              ],
              downloads: [
                { name: '两化融合申请表', size: '268KB', url: '#' },
                { name: '贯标工作指南', size: '850KB', url: '#' }
              ]
            }
          ]
        }
      ],
      features: [
        {
          title: '极速认证套餐',
          icon: 'el-icon-lightning',
          desc: '加急服务，最快15天拿证，适合急需证书的企业',
          link: '/service/express'
        },
        {
          title: '中小企业扶持计划',
          icon: 'el-icon-wallet',
          desc: '专为中小企业设计，价格优惠，流程简化',
          link: '/service/sme'
        },
        {
          title: '集团多基地打包认证',
          icon: 'el-icon-office-building',
          desc: '集团企业多场所统一认证，节省成本，统一管理',
          link: '/service/group'
        }
      ]
    }
  },
  computed: {
    currentCategoryServices() {
      return this.serviceCategories[this.activeCategory].services
    },
    currentService() {
      return this.currentCategoryServices[this.selectedService]
    }
  },
  methods: {
    contactNow() {
      this.$router.push('/contact')
    },
    applyNow() {
      this.$router.push('/contact?apply=true')
    },
    downloadFile(file) {
      window.open(file.url)
      this.$message.success(`开始下载：${file.name}`)
    },
    learnMore(feature) {
      this.$message.info(`了解更多：${feature.title}`)
    }
  },
  watch: {
    activeCategory() {
      this.selectedService = 0
    }
  }
}
</script>

<style scoped lang="scss">
.el-button--primary{
  border-radius: var(--border-radius)!important;
  background-color: var(--primary-blue)!important;
  border-color: var(--primary-blue)!important;
}
.page-banner {
  position: relative;
  height: 600px;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%);
  background: var(--primary-blue);
  color: #fff;

  .banner-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/service-banner.jpg') center/cover;
    opacity: 0.2;
  }

  .container {
    position: relative;
    z-index: 1;
  }

  h1 {
    font-size: 48px;
    margin-bottom: 15px;
  }

  .banner-desc {
    font-size: 20px;
    margin-bottom: 20px;
    opacity: 0.9;
  }

  .breadcrumb {
    font-size: 14px;
    opacity: 0.8;

    a {
      color: #fff;
      &:hover { text-decoration: underline; }
    }

    i { margin: 0 10px; }
  }
}

.service-nav-section {
  padding: 40px 0;
  background: var(--bg-light);

  .nav-tabs {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  .nav-tab {
    padding: 15px 30px;
    background: #fff;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    font-weight: 500;
    color: var(--text-light);
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);

    i {
      font-size: 20px;
    }

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.12);
      color: var(--primary-blue);
    }

    &.active {
      background: var(--primary-blue);
      color: #fff;
    }
  }
}

.service-detail-section {
  padding: 60px 0;

  .service-content {
    display: grid;
    grid-template-columns: 380px 1fr;
    gap: 40px;
  }

  .service-list {
    .service-item {
      background: #fff;
      border: 2px solid #e8e8e8;
      border-radius: var(--border-radius);
      padding: 25px;
      margin-bottom: 20px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        border-color: var(--secondary-blue);
        box-shadow: var(--shadow-card);
      }

      &.active {
        border-color: var(--primary-blue);
        background: linear-gradient(135deg, rgba(10,46,109,0.05) 0%, rgba(74,144,226,0.05) 100%);
      }

      .service-item-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 10px;

        i {
          font-size: 28px;
          color: var(--primary-blue);
        }

        h3 {
          font-size: 18px;
          color: var(--text-main);
          margin: 0;
        }
      }

      .service-item-desc {
        font-size: 14px;
        color: var(--text-light);
        margin-bottom: 15px;
        line-height: 1.6;
      }

      .service-item-tags {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;

        .tag {
          padding: 4px 10px;
          background: var(--bg-light);
          border-radius: 12px;
          font-size: 12px;
          color: var(--text-light);
        }
      }
    }
  }

  .service-info {
    .info-card {
      background: #fff;
      border-radius: var(--border-radius);
      padding: 40px;
      box-shadow: var(--shadow-card);
    }

    .info-title {
      font-size: 32px;
      color: var(--primary-blue);
      margin-bottom: 20px;
    }

    .info-desc {
      font-size: 16px;
      color: var(--text-light);
      line-height: 1.8;
      margin-bottom: 40px;
      padding-bottom: 40px;
      border-bottom: 2px solid var(--bg-light);
    }

    .info-section {
      margin-bottom: 40px;

      h3 {
        font-size: 20px;
        color: var(--text-main);
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 10px;

        i {
          color: var(--secondary-blue);
        }
      }
    }

    .standard-list,
    .docs-list {
      li {
        padding: 10px 0;
        font-size: 15px;
        color: var(--text-main);
        display: flex;
        align-items: center;
        gap: 10px;

        i {
          color: var(--accent-gold);
        }
      }
    }

    .process-steps {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .step {
        display: flex;
        align-items: flex-start;
        gap: 20px;
        position: relative;

        .step-number {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 700;
          flex-shrink: 0;
        }

        .step-content {
          flex: 1;
          background: var(--bg-light);
          padding: 15px 20px;
          border-radius: 8px;

          h4 {
            font-size: 16px;
            color: var(--text-main);
            margin-bottom: 5px;
          }

          p {
            font-size: 14px;
            color: var(--text-light);
            margin: 0;
          }
        }

        .step-arrow {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--secondary-blue);
          font-size: 20px;
        }
      }
    }

    .price-info {
      background: linear-gradient(135deg, rgba(10,46,109,0.05) 0%, rgba(74,144,226,0.05) 100%);
      padding: 25px;
      border-radius: 8px;
      border-left: 4px solid var(--accent-gold);

      .price-item {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        font-size: 16px;

        &:not(:last-child) {
          border-bottom: 1px dashed #ddd;
        }

        .label {
          color: var(--text-light);
        }

        .value {
          font-weight: 600;
          color: var(--text-main);

          &.price {
            color: #f56c6c;
            font-size: 20px;
          }
        }
      }
    }

    .download-list {
      .download-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px;
        background: var(--bg-light);
        border-radius: 8px;
        margin-bottom: 10px;

        i {
          font-size: 24px;
          color: var(--secondary-blue);
        }

        .file-name {
          flex: 1;
          font-size: 14px;
          color: var(--text-main);
        }

        .file-size {
          font-size: 13px;
          color: var(--text-light);
          margin-right: 15px;
        }
      }
    }

    .info-actions {
      display: flex;
      gap: 20px;
      justify-content: center;
      padding-top: 40px;
      border-top: 2px solid var(--bg-light);

      .el-button {
        padding: 15px 40px;
        font-size: 16px;
      }
    }
  }
}

.feature-banner {
  padding: 80px 0;
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%);
  color: #fff;

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }

  .feature-card {
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(10px);
    padding: 40px 30px;
    border-radius: var(--border-radius);
    text-align: center;
    transition: all 0.3s;

    &:hover {
      background: rgba(255,255,255,0.2);
      transform: translateY(-5px);
    }

    .feature-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 20px;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        font-size: 36px;
      }
    }

    h3 {
      font-size: 22px;
      margin-bottom: 15px;
    }

    p {
      font-size: 15px;
      margin-bottom: 20px;
      opacity: 0.9;
    }

    .el-button {
      color: #fff;
      font-weight: 500;

      &:hover {
        color: var(--accent-gold);
      }
    }
  }
}

@media (max-width: 992px) {
  .service-content {
    grid-template-columns: 1fr;
  }

  .service-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .service-list {
    grid-template-columns: 1fr;
  }

  .nav-tabs {
    flex-direction: column;
  }
}
</style>