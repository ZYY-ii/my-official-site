<template>
  <div class="cert-query-page">
    <!-- Page Banner -->
    <section class="page-banner">
      <div class="banner-bg">
        <div class="banner-pattern"></div>
        <div class="banner-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
      </div>
      <div class="container banner-content">
        <h1>证书真伪查询中心</h1>
        <p class="banner-desc">一键验证 · 权威可信 · 保障您的合法权益</p>
        <div class="banner-features">
          <span><i class="el-icon-check"></i> 官方数据库</span>
          <span><i class="el-icon-check"></i> 实时查询</span>
          <span><i class="el-icon-check"></i> 权威认证</span>
        </div>
      </div>
    </section>

    <!-- 查询区域 -->
    <section class="query-section">
      <div class="container">
        <div class="query-wrapper">
          <!-- Tab切换 -->
          <div class="query-tabs-custom">
            <div 
              class="tab-item" 
              :class="{ active: activeTab === 'certNo' }"
              @click="activeTab = 'certNo'"
            >
              <i class="el-icon-ticket"></i>
              <span>证书编号查询</span>
            </div>
            <div 
              class="tab-item" 
              :class="{ active: activeTab === 'orgName' }"
              @click="activeTab = 'orgName'"
            >
              <i class="el-icon-office-building"></i>
              <span>企业名称查询</span>
            </div>
            <div class="tab-active-bar" :style="tabBarStyle"></div>
          </div>

          <div class="query-card">
            <div class="query-form">
              <el-form 
                v-if="activeTab === 'certNo'" 
                :model="queryForm" 
                :rules="queryRules" 
                ref="queryFormRef"
              >
                <div class="form-group">
                  <label class="form-label">
                    <i class="el-icon-ticket"></i>
                    证书编号
                  </label>
                  <el-input 
                    v-model="queryForm.certNo" 
                    placeholder="请输入12位数字证书编号"
                    maxlength="12"
                    class="custom-input"
                  >
                    <template slot="append">
                      <el-tooltip content="证书编号位于证书右上角" placement="top">
                        <i class="el-icon-question"></i>
                      </el-tooltip>
                    </template>
                  </el-input>
                  <div class="input-hint">示例：123456789012</div>
                </div>

                <el-button 
                  type="primary" 
                  size="large" 
                  @click="handleQuery"
                  :loading="queryLoading"
                  class="query-btn"
                >
                  <i class="el-icon-search"></i>
                  <span>立即查询</span>
                </el-button>
              </el-form>

              <el-form 
                v-else 
                :model="queryForm" 
                :rules="queryRules" 
                ref="queryFormRef"
              >
                <div class="form-group">
                  <label class="form-label">
                    <i class="el-icon-office-building"></i>
                    企业全称
                  </label>
                  <el-input 
                    v-model="queryForm.orgName" 
                    placeholder="请输入企业营业执照上的完整名称"
                    class="custom-input"
                  ></el-input>
                  <div class="input-hint">请输入完整的公司名称</div>
                </div>

                <el-button 
                  type="primary" 
                  size="large" 
                  @click="handleQuery"
                  :loading="queryLoading"
                  class="query-btn"
                >
                  <i class="el-icon-search"></i>
                  <span>立即查询</span>
                </el-button>
              </el-form>
            </div>
          </div>

          <!-- 快捷提示 -->
          <div class="query-tips">
            <div class="tip-item">
              <i class="el-icon-info"></i>
              <span>查询结果具有法律效力</span>
            </div>
            <div class="tip-item">
              <i class="el-icon-time"></i>
              <span>7×24小时在线查询</span>
            </div>
            <div class="tip-item">
              <i class="el-icon-lock"></i>
              <span>数据安全加密保护</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 查询结果 -->
    <section class="result-section" v-if="queryResult || resultStatus === 'failure'">
      <div class="container">
        <div class="result-card" :class="resultStatus">
          <!-- 成功状态 -->
          <div v-if="resultStatus === 'success'" class="result-success">
            <div class="result-header">
              <div class="status-badge success">
                <i class="el-icon-circle-check"></i>
                <span>证书有效</span>
              </div>
              <!-- <div class="cert-qr">
                <img src="@/assets/qr-placeholder.png" alt="二维码" />
                <span>扫码验证</span>
              </div> -->
            </div>

            <div class="result-body">
              <div class="cert-info-grid">
                <div class="info-item">
                  <div class="info-label">证书编号</div>
                  <div class="info-value">{{ queryResult.certNo }}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">获证组织</div>
                  <div class="info-value">{{ queryResult.orgName }}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">认证标准</div>
                  <div class="info-value">
                    <el-tag size="small" type="primary">{{ queryResult.standardCode }}</el-tag>
                  </div>
                </div>
                <div class="info-item full-width">
                  <div class="info-label">认证范围</div>
                  <div class="info-value">{{ queryResult.scope }}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">发证日期</div>
                  <div class="info-value">{{ queryResult.issueDate }}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">有效期至</div>
                  <div class="info-value">
                    {{ queryResult.expireDate }}
                    <el-tag 
                      v-if="isExpired(queryResult.expireDate)" 
                      size="mini" 
                      type="danger"
                      class="status-tag"
                    >
                      已过期
                    </el-tag>
                    <el-tag 
                      v-else-if="isExpiringSoon(queryResult.expireDate)" 
                      size="mini" 
                      type="warning"
                      class="status-tag"
                    >
                      即将到期
                    </el-tag>
                    <el-tag 
                      v-else
                      size="mini" 
                      type="success"
                      class="status-tag"
                    >
                      有效
                    </el-tag>
                  </div>
                </div>
              </div>
            </div>

            <div class="result-footer">
              <el-button @click="printCert" class="action-btn">
                <i class="el-icon-printer"></i> 打印证书
              </el-button>
              <el-button type="primary" @click="downloadCert" class="action-btn primary">
                <i class="el-icon-download"></i> 下载电子证书
              </el-button>
              <el-button @click="shareResult" class="action-btn">
                <i class="el-icon-share"></i> 分享
              </el-button>
            </div>
          </div>

          <!-- 失败状态 -->
          <div v-else class="result-failure">
            <div class="failure-icon">
              <i class="el-icon-warning-outline"></i>
            </div>
            <h3>未找到相关证书</h3>
            <p class="failure-desc">
              请检查输入的证书编号或企业名称是否正确<br>
              或联系人工客服协助查询
            </p>
            <div class="failure-actions">
              <el-button @click="queryResult = null; resultStatus = ''" class="action-btn">
                <i class="el-icon-refresh"></i> 重新查询
              </el-button>
              <el-button type="primary" @click="contactSupport" class="action-btn primary">
                <i class="el-icon-customer-service"></i> 联系客服
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 权威说明 -->
    <section class="authority-section">
      <div class="container">
        <div class="authority-card">
          <div class="authority-header">
            <div class="header-icon">
              <i class="el-icon-s-flag"></i>
            </div>
            <h3>查询说明</h3>
          </div>
          <p class="authority-text">
            本查询系统数据来源于中标信认证官方数据库，查询结果具有法律效力。
            如发现证书信息有误，请及时联系我司核实更正。
          </p>
          <div class="authority-links">
            <a href="https://www.cnca.cn" target="_blank" class="link-item">
              <i class="el-icon-link"></i> 
              <span>国家认证认可监督管理委员会</span>
            </a>
            <a href="https://www.cnas.org.cn" target="_blank" class="link-item">
              <i class="el-icon-link"></i> 
              <span>中国合格评定国家认可委员会</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 常见问题 -->
    <section class="faq-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">常见问题</h2>
          <p class="section-subtitle">快速解答您的疑问</p>
        </div>
        <div class="faq-list">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="faq-item"
            :class="{ active: activeFaqs === index }"
            @click="activeFaqs = activeFaqs === index ? -1 : index"
          >
            <div class="faq-question">
              <span class="faq-number">{{ index + 1 }}</span>
              <span class="faq-text">{{ faq.question }}</span>
              <i class="el-icon-arrow-right faq-icon"></i>
            </div>
            <div class="faq-answer" v-show="activeFaqs === index">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'CertQuery',
  data() {
    const validateCertNo = (rule, value, callback) => {
      if (this.activeTab === 'certNo') {
        if (!value) {
          callback(new Error('请输入证书编号'))
        } else if (!/^\d{12}$/.test(value)) {
          callback(new Error('证书编号应为12位数字'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    
    const validateOrgName = (rule, value, callback) => {
      if (this.activeTab === 'orgName') {
        if (!value || value.trim() === '') {
          callback(new Error('请输入企业全称'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }

    return {
      activeTab: 'certNo',
      activeFaqs: -1,
      queryLoading: false,
      queryForm: {
        certNo: '',
        orgName: ''
      },
      queryRules: {
        certNo: [{ validator: validateCertNo, trigger: 'blur' }],
        orgName: [{ validator: validateOrgName, trigger: 'blur' }]
      },
      queryResult: null,
      resultStatus: '',
      faqs: [
        {
          question: '如何获取证书编号？',
          answer: '证书编号位于证书右上角，为12位纯数字。您也可以在获证时收到的电子邮件或短信中查找。'
        },
        {
          question: '证书状态为"暂停"是什么意思？',
          answer: '证书暂停表示该证书因未按时接受监督审核、企业信息变更未报备等原因暂时失效。企业完成整改后可申请恢复。'
        },
        {
          question: '证书过期了怎么办？',
          answer: '证书过期后自动失效。如需继续使用，请在到期前3个月联系我们办理再认证手续。'
        },
        {
          question: '查询结果有法律效力吗？',
          answer: '本系统查询结果与纸质证书具有同等法律效力，可用于招投标、客户审核等场景。'
        },
        {
          question: '为什么查不到我的证书？',
          answer: '可能原因：1) 证书编号/企业名称输入错误；2) 证书为其他机构颁发；3) 证书信息尚未同步。建议核对信息或联系客服。'
        }
      ]
    }
  },
  computed: {
    tabBarStyle() {
    return this.activeTab === 'certNo' 
      ? { left: '10%' }
      : { left: '60%' }
  }
  },
  methods: {
    async handleQuery() {
      try {
        await this.$refs.queryFormRef.validate()
        this.queryLoading = true
        
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        if (this.activeTab === 'certNo' && this.queryForm.certNo === '123456789012') {
          this.queryResult = {
            certNo: '123456789012',
            orgName: '某某科技有限公司',
            standardCode: 'ISO 9001:2015',
            scope: '软件产品开发与销售的质量管理',
            issueDate: '2025-01-15',
            expireDate: '2028-01-14',
            status: '有效'
          }
          this.resultStatus = 'success'
          this.$message.success('查询成功')
        } else {
          this.resultStatus = 'failure'
          this.$message.warning('未找到相关证书')
        }
        
        this.$nextTick(() => {
          document.querySelector('.result-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      } catch (error) {
        this.$message.error(error.message || '查询失败，请重试')
      } finally {
        this.queryLoading = false
      }
    },
    isExpired(expireDate) {
      return new Date(expireDate) < new Date()
    },
    isExpiringSoon(expireDate, days = 90) {
      const expire = new Date(expireDate)
      const now = new Date()
      const diffDays = Math.ceil((expire - now) / (1000 * 60 * 60 * 24))
      return diffDays > 0 && diffDays <= days
    },
    downloadCert() {
      this.$message.success('开始下载电子证书...')
    },
    printCert() {
      this.$message.info('打印功能开发中')
    },
    shareResult() {
      this.$message.info('分享功能开发中')
    },
    contactSupport() {
      this.$router.push('/contact')
    }
  },
  watch: {
    activeTab() {
      this.queryForm.certNo = ''
      this.queryForm.orgName = ''
      this.queryResult = null
      this.resultStatus = ''
    }
  }
}
</script>

<style scoped lang="scss">
.cert-query-page {
  background: #f5f7fa;
  min-height: 100vh;
}

/* Banner Section */
.page-banner {
  position: relative;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-blue);
  color: #fff;
  overflow: hidden;

  .banner-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/cert-banner.jpg') center/cover;
    opacity: 0.2;

    .banner-pattern {
      width: 100%;
      height: 100%;
      background-image: 
        radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%);
    }

    .banner-shapes {
      position: absolute;
      width: 100%;
      height: 100%;
      
      .shape {
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.03);
        
        &.shape-1 {
          width: 300px;
          height: 300px;
          top: -100px;
          right: -100px;
        }
        
        &.shape-2 {
          width: 200px;
          height: 200px;
          bottom: -50px;
          left: 10%;
        }
        
        &.shape-3 {
          width: 150px;
          height: 150px;
          top: 40%;
          right: 20%;
        }
      }
    }
  }

  .banner-content {
    position: relative;
    z-index: 1;
    padding: 60px 20px;
  }

  h1 {
    font-size: 42px;
    font-weight: 700;
    margin-bottom: 15px;
    letter-spacing: -0.5px;
  }

  .banner-desc {
    font-size: 18px;
    opacity: 0.9;
    margin-bottom: 30px;
    font-weight: 300;
  }

  .banner-features {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    
    span {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      opacity: 0.9;
      
      i {
        color: #4ade80;
      }
    }
  }
}

/* Query Section */
.query-section {
  padding: 60px 0 40px;
  position: relative;
  z-index: 2;

  .query-wrapper {
    max-width: 700px;
    margin: 0 auto;
  }

  .query-tabs-custom {
    position: relative;
    display: flex;
    background: #fff;
    border-radius: 12px 12px 0 0;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
    overflow: hidden;
    margin-bottom: 0;

    .tab-item {
      flex: 1;
      padding: 20px;
      text-align: center;
      cursor: pointer;
      font-size: 16px;
      font-weight: 500;
      color: #64748b;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      position: relative;
      z-index: 1;

      i {
        font-size: 20px;
      }

      &.active {
        color: #0A2E6D;
        font-weight: 600;
      }

      &:hover {
        color: #0A2E6D;
      }
    }

    .tab-active-bar {
      position: absolute;
      bottom: 0;
      width: 30%;
      height: 3px;
      background: linear-gradient(90deg, #0A2E6D, #2563eb);
      transition: all 0.3s;
    }
  }

  .query-card {
    background: #fff;
    border-radius: 0 0 12px 12px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    padding: 40px;

    .query-form {
      .form-group {
        margin-bottom: 30px;

        .form-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 12px;

          i {
            color: #2563eb;
          }
        }

        .custom-input {
          :deep(.el-input__inner) {
            height: 50px;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 15px;
            transition: all 0.3s;

            &:focus {
              border-color: #2563eb;
              box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
            }
          }

          :deep(.el-input-group__append) {
            background: #f1f5f9;
            border: 2px solid #e2e8f0;
            border-left: none;
            border-radius: 0 8px 8px 0;
            cursor: pointer;

            i {
              color: #64748b;
            }

            &:hover {
              background: #e2e8f0;
            }
          }
        }

        .input-hint {
          margin-top: 8px;
          font-size: 13px;
          color: #94a3b8;
        }
      }

      .query-btn {
        width: 100%;
        height: 54px;
        font-size: 16px;
        font-weight: 600;
        border-radius: 8px;
        background: linear-gradient(135deg, #0A2E6D 0%, #2563eb 100%);
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        transition: all 0.3s;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
        }

        &:active {
          transform: translateY(0);
        }
      }
    }
  }

  .query-tips {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 25px;
    flex-wrap: wrap;

    .tip-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #64748b;

      i {
        color: #2563eb;
        font-size: 16px;
      }
    }
  }
}

/* Result Section */
.result-section {
  padding: 40px 0 60px;

  .result-card {
    max-width: 900px;
    margin: 0 auto;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    overflow: hidden;
    animation: slideUp 0.5s ease;

    &.success {
      border-top: 4px solid #10b981;
    }

    &.failure {
      border-top: 4px solid #f59e0b;
    }
  }

  .result-success {
    .result-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30px 40px;
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
      border-bottom: 1px solid #bbf7d0;

      .status-badge {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 20px;
        background: #10b981;
        color: #fff;
        border-radius: 8px;
        font-weight: 600;
        font-size: 16px;

        i {
          font-size: 24px;
        }
      }

      .cert-qr {
        text-align: center;
        
        img {
          width: 80px;
          height: 80px;
          border-radius: 8px;
          border: 2px solid #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        span {
          display: block;
          margin-top: 8px;
          font-size: 12px;
          color: #64748b;
        }
      }
    }

    .result-body {
      padding: 40px;

      .cert-info-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 25px;

        .info-item {
          &.full-width {
            grid-column: 1 / -1;
          }

          .info-label {
            font-size: 13px;
            color: #64748b;
            margin-bottom: 8px;
            font-weight: 500;
          }

          .info-value {
            font-size: 16px;
            color: #1e293b;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;

            .status-tag {
              margin-left: 10px;
            }
          }
        }
      }
    }

    .result-footer {
      display: flex;
      justify-content: center;
      gap: 15px;
      padding: 30px 40px;
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;

      .action-btn {
        min-width: 140px;
        height: 44px;
        font-weight: 500;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.3s;

        &.primary {
          background: linear-gradient(135deg, #0A2E6D 0%, #2563eb 100%);
          border: none;
          color: #fff;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
          }
        }

        &:hover {
          background: #f1f5f9;
        }
      }
    }
  }

  .result-failure {
    padding: 60px 40px;
    text-align: center;

    .failure-icon {
      width: 100px;
      height: 100px;
      margin: 0 auto 25px;
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        font-size: 50px;
        color: #f59e0b;
      }
    }

    h3 {
      font-size: 24px;
      color: #1e293b;
      margin-bottom: 15px;
      font-weight: 700;
    }

    .failure-desc {
      font-size: 15px;
      color: #64748b;
      margin-bottom: 35px;
      line-height: 1.8;
    }

    .failure-actions {
      display: flex;
      justify-content: center;
      gap: 15px;

      .action-btn {
        min-width: 140px;
        height: 44px;
        font-weight: 500;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;

        &.primary {
          background: linear-gradient(135deg, #0A2E6D 0%, #2563eb 100%);
          border: none;
          color: #fff;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
          }
        }

        &:hover {
          background: #f1f5f9;
        }
      }
    }
  }
}

/* Authority Section */
.authority-section {
  padding: 50px 0;
  background: #fff;

  .authority-card {
    max-width: 800px;
    margin: 0 auto;
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    border-radius: 16px;
    padding: 40px;
    text-align: center;
    border: 2px solid #bae6fd;

    .authority-header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-bottom: 20px;

      .header-icon {
        width: 40px;
        height: 40px;
        background: #0A2E6D;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;

        i {
          color: #fff;
          font-size: 20px;
        }
      }

      h3 {
        font-size: 20px;
        color: #0A2E6D;
        margin: 0;
        font-weight: 700;
      }
    }

    .authority-text {
      font-size: 15px;
      color: #475569;
      line-height: 1.8;
      margin-bottom: 25px;
    }

    .authority-links {
      display: flex;
      justify-content: center;
      gap: 30px;
      flex-wrap: wrap;

      .link-item {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #2563eb;
        font-size: 14px;
        text-decoration: none;
        transition: all 0.3s;

        &:hover {
          color: #0A2E6D;
          transform: translateY(-2px);
        }

        i {
          font-size: 16px;
        }
      }
    }
  }
}

/* FAQ Section */
.faq-section {
  padding: 60px 0 80px;

  .section-header {
    text-align: center;
    margin-bottom: 40px;

    .section-title {
      font-size: 32px;
      color: #0A2E6D;
      margin-bottom: 10px;
      font-weight: 700;
    }

    .section-subtitle {
      font-size: 16px;
      color: #64748b;
    }
  }

  .faq-list {
    max-width: 800px;
    margin: 0 auto;

    .faq-item {
      background: #fff;
      border-radius: 12px;
      margin-bottom: 15px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      transition: all 0.3s;

      &:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }

      &.active {
        box-shadow: 0 4px 16px rgba(37, 99, 235, 0.15);
      }

      .faq-question {
        padding: 20px 25px;
        display: flex;
        align-items: center;
        gap: 15px;
        cursor: pointer;
        user-select: none;

        .faq-number {
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, #0A2E6D, #2563eb);
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          flex-shrink: 0;
        }

        .faq-text {
          flex: 1;
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
        }

        .faq-icon {
          font-size: 16px;
          color: #94a3b8;
          transition: transform 0.3s;
        }
      }

      &.active .faq-icon {
        transform: rotate(90deg);
      }

      .faq-answer {
        padding: 0 25px 20px 70px;
        
        p {
          margin: 0;
          font-size: 15px;
          color: #64748b;
          line-height: 1.8;
        }
      }
    }
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .page-banner {
    min-height: 300px;
    
    h1 {
      font-size: 28px;
    }
    
    .banner-desc {
      font-size: 15px;
    }
    
    .banner-features {
      flex-direction: column;
      gap: 10px;
    }
  }

  .query-card {
    padding: 30px 20px;
  }

  .cert-info-grid {
    grid-template-columns: 1fr !important;
  }

  .result-success {
    .result-header {
      flex-direction: column;
      gap: 20px;
      text-align: center;
    }

    .result-footer {
      flex-direction: column;
      
      .action-btn {
        width: 100%;
      }
    }
  }

  .result-failure {
    padding: 40px 20px;
  }

  .authority-card {
    padding: 30px 20px;
    
    .authority-links {
      flex-direction: column;
      gap: 15px;
    }
  }

  .faq-list {
    .faq-item {
      .faq-question {
        padding: 15px 20px;
      }
      
      .faq-answer {
        padding: 0 20px 15px 60px;
      }
    }
  }
}
</style>