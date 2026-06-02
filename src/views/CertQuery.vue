<template>
  <div class="cert-query-page">
    <!-- Page Banner -->
    <section class="page-banner">
      <div class="banner-bg">
        <div class="banner-pattern"></div>
      </div>
      <div class="container">
        <h1>证书真伪查询中心</h1>
        <p class="banner-desc">一键验证，权威可信 · 保障您的合法权益</p>
      </div>
    </section>

    <!-- 查询区域 -->
    <section class="query-section">
      <div class="container">
        <div class="query-card">
          <!-- Tab切换 -->
          <el-tabs v-model="activeTab" class="query-tabs">
            <el-tab-pane label="按证书编号查询" name="certNo">
              <div class="query-form">
                <el-form :model="queryForm" :rules="queryRules" ref="queryFormRef" label-position="top">
                  <el-form-item label="证书编号" prop="certNo">
                    <el-input 
                      v-model="queryForm.certNo" 
                      placeholder="请输入12位数字证书编号"
                      maxlength="12"
                      show-word-limit
                      prefix-icon="el-icon-ticket"
                    >
                      <template slot="append">
                        <el-tooltip content="证书编号格式：12位纯数字" placement="top">
                          <i class="el-icon-question"></i>
                        </el-tooltip>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="验证码" prop="captcha">
                    <div class="captcha-group">
                      <el-input 
                        v-model="queryForm.captcha" 
                        placeholder="请输入验证码"
                        style="width: 200px"
                      ></el-input>
                      <div class="captcha-image" @click="refreshCaptcha">
                        <img :src="captchaImg" alt="验证码" />
                        <span class="captcha-refresh">换一张</span>
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <el-button 
                      type="primary" 
                      size="large" 
                      @click="handleQuery"
                      :loading="queryLoading"
                    >
                      <i class="el-icon-search"></i> 立即查询
                    </el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
            
            <el-tab-pane label="按企业名称查询" name="orgName">
              <div class="query-form">
                <el-form :model="queryForm" :rules="queryRules" ref="queryFormRef" label-position="top">
                  <el-form-item label="企业全称" prop="orgName">
                    <el-input 
                      v-model="queryForm.orgName" 
                      placeholder="请输入企业营业执照上的完整名称"
                      prefix-icon="el-icon-office-building"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="验证码" prop="captcha">
                    <div class="captcha-group">
                      <el-input 
                        v-model="queryForm.captcha" 
                        placeholder="请输入验证码"
                        style="width: 200px"
                      ></el-input>
                      <div class="captcha-image" @click="refreshCaptcha">
                        <img :src="captchaImg" alt="验证码" />
                        <span class="captcha-refresh">换一张</span>
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <el-button 
                      type="primary" 
                      size="large" 
                      @click="handleQuery"
                      :loading="queryLoading"
                    >
                      <i class="el-icon-search"></i> 立即查询
                    </el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </section>

    <!-- 查询结果 -->
    <section class="result-section" v-if="queryResult">
      <div class="container">
        <div class="result-card" :class="resultStatus">
          <!-- 成功状态 -->
          <div v-if="resultStatus === 'success'" class="result-success">
            <div class="success-header">
              <i class="el-icon-circle-check"></i>
              <h3>✅ 证书有效</h3>
            </div>
            <div class="result-content">
              <div class="cert-preview">
                <img src="@/assets/cert-sample.jpg" alt="证书预览" />
                <div class="preview-mask">
                  <el-button type="primary" size="small" @click="downloadCert">
                    <i class="el-icon-download"></i> 下载电子证书
                  </el-button>
                </div>
              </div>
              <el-descriptions 
                :column="1" 
                border 
                class="cert-details"
              >
                <el-descriptions-item label="证书编号">
                  {{ queryResult.certNo }}
                </el-descriptions-item>
                <el-descriptions-item label="获证组织">
                  {{ queryResult.orgName }}
                </el-descriptions-item>
                <el-descriptions-item label="认证标准">
                  {{ queryResult.standardCode }}
                </el-descriptions-item>
                <el-descriptions-item label="认证范围">
                  {{ queryResult.scope }}
                </el-descriptions-item>
                <el-descriptions-item label="发证日期">
                  {{ queryResult.issueDate }}
                </el-descriptions-item>
                <el-descriptions-item label="有效期至">
                  {{ queryResult.expireDate }}
                  <el-tag 
                    v-if="isExpired(queryResult.expireDate)" 
                    size="mini" 
                    type="danger"
                    style="margin-left: 10px"
                  >
                    已过期
                  </el-tag>
                  <el-tag 
                    v-else-if="isExpiringSoon(queryResult.expireDate)" 
                    size="mini" 
                    type="warning"
                    style="margin-left: 10px"
                  >
                    即将到期
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="证书状态">
                  <el-tag :type="getStatusTagType(queryResult.status)">
                    {{ queryResult.status }}
                  </el-tag>
                </el-descriptions-item>
              </el-descriptions>
            </div>
            <div class="result-actions">
              <el-button @click="shareResult">
                <i class="el-icon-share"></i> 分享结果
              </el-button>
              <el-button type="primary" @click="contactVerify">
                <i class="el-icon-phone"></i> 人工核实
              </el-button>
            </div>
          </div>

          <!-- 失败状态 -->
          <div v-else class="result-failure">
            <i class="el-icon-warning-outline"></i>
            <h3>未找到相关证书</h3>
            <p class="failure-desc">
              请检查证书编号或企业名称是否正确，或联系人工客服协助查询
            </p>
            <div class="failure-actions">
              <el-button @click="queryResult = null">
                <i class="el-icon-refresh"></i> 重新查询
              </el-button>
              <el-button type="primary" @click="contactSupport">
                <i class="el-icon-customer-service"></i> 人工协助
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 常见问题 -->
    <section class="faq-section">
      <div class="container">
        <h2 class="section-title">常见问题</h2>
        <el-collapse v-model="activeFaqs" accordion class="faq-list">
          <el-collapse-item 
            v-for="(faq, index) in faqs" 
            :key="index"
            :title="faq.question"
            :name="index"
          >
            <p>{{ faq.answer }}</p>
          </el-collapse-item>
        </el-collapse>
      </div>
    </section>

    <!-- 权威说明 -->
    <section class="authority-section">
      <div class="container">
        <div class="authority-card">
          <i class="el-icon-s-flag"></i>
          <h3>查询说明</h3>
          <p>
            本查询系统数据来源于中标信认证官方数据库，查询结果具有法律效力。
            如发现证书信息有误，请及时联系我司核实更正。
          </p>
          <div class="authority-links">
            <a href="https://www.cnca.cn" target="_blank">
              <i class="el-icon-link"></i> 国家认证认可监督管理委员会
            </a>
            <a href="https://www.cnas.org.cn" target="_blank">
              <i class="el-icon-link"></i> 中国合格评定国家认可委员会
            </a>
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
      activeFaqs: 0,
      queryLoading: false,
      captchaImg: '/api/captcha?' + Date.now(),
      queryForm: {
        certNo: '',
        orgName: '',
        captcha: ''
      },
      queryRules: {
        certNo: [{ validator: validateCertNo, trigger: 'blur' }],
        orgName: [{ validator: validateOrgName, trigger: 'blur' }],
        captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      queryResult: null,
      resultStatus: '', // 'success' or 'failure'
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
  methods: {
    refreshCaptcha() {
      this.captchaImg = '/api/captcha?' + Date.now()
      this.queryForm.captcha = ''
    },
    async handleQuery() {
      try {
        await this.$refs.queryFormRef.validate()
        this.queryLoading = true
        
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Mock 查询结果（实际项目调用后端接口）
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
          this.queryResult = null
          this.resultStatus = 'failure'
          this.$message.warning('未找到相关证书')
        }
        
        // 滚动到结果区域
        if (this.queryResult || this.resultStatus === 'failure') {
          this.$nextTick(() => {
            document.querySelector('.result-section')?.scrollIntoView({ behavior: 'smooth' })
          })
        }
      } catch (error) {
        this.$message.error(error.message || '查询失败，请重试')
      } finally {
        this.queryLoading = false
        this.refreshCaptcha()
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
    getStatusTagType(status) {
      const map = {
        '有效': 'success',
        '暂停': 'warning',
        '撤销': 'danger',
        '过期': 'info'
      }
      return map[status] || 'info'
    },
    downloadCert() {
      this.$message.success('开始下载电子证书...')
      // window.open(`/api/cert/${this.queryResult.certNo}/download`)
    },
    shareResult() {
      this.$message.info('分享功能开发中')
    },
    contactVerify() {
      this.$router.push('/contact?certVerify=true')
    },
    contactSupport() {
      this.$router.push('/contact')
    }
  },
  watch: {
    activeTab() {
      this.queryForm.certNo = ''
      this.queryForm.orgName = ''
      this.queryForm.captcha = ''
      this.queryResult = null
    }
  },
  mounted() {
    this.refreshCaptcha()
  }
}
</script>

<style scoped lang="scss">
.page-banner {
  position: relative;
  min-height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0A2E6D 0%, #1a4a8d 100%);
  color: #fff;
  text-align: center;
  overflow: hidden;

  .banner-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .banner-pattern {
      width: 100%;
      height: 100%;
      background-image: 
        radial-gradient(circle at 20% 80%, rgba(74,144,226,0.15) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(212,175,55,0.1) 0%, transparent 50%),
        linear-gradient(45deg, transparent 49%, rgba(255,255,255,0.03) 50%, transparent 51%);
      background-size: 100% 100%, 100% 100%, 20px 20px;
    }
  }

  .container {
    position: relative;
    z-index: 1;
    padding: 40px 20px;
  }

  h1 {
    font-size: 42px;
    font-weight: 700;
    margin-bottom: 15px;
  }

  .banner-desc {
    font-size: 18px;
    opacity: 0.9;
  }
}

.query-section {
  padding: 50px 0 30px;

  .query-card {
    max-width: 700px;
    margin: 0 auto;
    background: #fff;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-card);
    padding: 40px;
  }

  .query-tabs {
    :deep(.el-tabs__nav) {
      margin: 0 auto 30px;
    }

    :deep(.el-tabs__item) {
      font-size: 16px;
      font-weight: 500;
      padding: 0 30px;
    }
  }

  .query-form {
    .el-form-item {
      margin-bottom: 25px;

      :deep(.el-form-item__label) {
        font-weight: 500;
        font-size: 15px;
      }
    }

    .captcha-group {
      display: flex;
      align-items: center;
      gap: 15px;

      .captcha-image {
        position: relative;
        cursor: pointer;

        img {
          height: 40px;
          border: 1px solid #dcdfe6;
          border-radius: 4px;
        }

        .captcha-refresh {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 12px;
          color: var(--secondary-blue);
          white-space: nowrap;
        }

        &:hover .captcha-refresh {
          color: var(--primary-blue);
          text-decoration: underline;
        }
      }
    }

    .el-button {
      width: 100%;
      padding: 15px;
      font-size: 16px;
    }
  }
}

.result-section {
  padding: 30px 0 60px;

  .result-card {
    max-width: 900px;
    margin: 0 auto;
    background: #fff;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-card);
    overflow: hidden;

    &.success {
      border-top: 4px solid #67c23a;
    }

    &.failure {
      border-top: 4px solid #f56c6c;
    }
  }

  .result-success {
    padding: 40px;

    .success-header {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 30px;
      padding-bottom: 25px;
      border-bottom: 2px solid var(--bg-light);

      i {
        font-size: 48px;
        color: #67c23a;
      }

      h3 {
        font-size: 24px;
        color: var(--text-main);
        margin: 0;
      }
    }

    .result-content {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 40px;
      margin-bottom: 40px;

      .cert-preview {
        position: relative;
        border: 2px dashed #dcdfe6;
        border-radius: 8px;
        overflow: hidden;

        img {
          width: 100%;
          display: block;
        }

        .preview-mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;

          &:hover {
            opacity: 1;
          }
        }
      }

      .cert-details {
        :deep(.el-descriptions__label) {
          width: 120px;
          font-weight: 500;
        }
      }
    }

    .result-actions {
      display: flex;
      justify-content: center;
      gap: 20px;
      padding-top: 30px;
      border-top: 2px solid var(--bg-light);
    }
  }

  .result-failure {
    padding: 60px 40px;
    text-align: center;

    i {
      font-size: 64px;
      color: #e6a23c;
      margin-bottom: 20px;
    }

    h3 {
      font-size: 22px;
      color: var(--text-main);
      margin-bottom: 15px;
    }

    .failure-desc {
      font-size: 15px;
      color: var(--text-light);
      margin-bottom: 30px;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }

    .failure-actions {
      display: flex;
      justify-content: center;
      gap: 20px;
    }
  }
}

.faq-section {
  padding: 60px 0;
  background: var(--bg-light);

  .section-title {
    font-size: 28px;
    text-align: center;
    margin-bottom: 40px;
    color: var(--primary-blue);
  }

  .faq-list {
    max-width: 800px;
    margin: 0 auto;
    background: #fff;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-card);

    :deep(.el-collapse-item__header) {
      font-size: 16px;
      font-weight: 500;
      padding-left: 25px;
    }

    :deep(.el-collapse-item__content) {
      padding: 15px 25px 25px;
      font-size: 15px;
      color: var(--text-light);
      line-height: 1.8;
    }
  }
}

.authority-section {
  padding: 50px 0;

  .authority-card {
    max-width: 700px;
    margin: 0 auto;
    background: linear-gradient(135deg, rgba(10,46,109,0.05) 0%, rgba(74,144,226,0.05) 100%);
    border-radius: var(--border-radius);
    padding: 40px;
    text-align: center;
    border: 2px solid var(--secondary-blue);

    i {
      font-size: 48px;
      color: var(--primary-blue);
      margin-bottom: 20px;
    }

    h3 {
      font-size: 22px;
      color: var(--text-main);
      margin-bottom: 15px;
    }

    p {
      font-size: 15px;
      color: var(--text-light);
      line-height: 1.8;
      margin-bottom: 25px;
    }

    .authority-links {
      display: flex;
      flex-direction: column;
      gap: 12px;

      a {
        color: var(--secondary-blue);
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;

        &:hover {
          color: var(--primary-blue);
          text-decoration: underline;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .query-card {
    padding: 30px 20px;
  }

  .result-success {
    .result-content {
      grid-template-columns: 1fr;
    }

    .cert-preview {
      max-width: 300px;
      margin: 0 auto;
    }
  }

  .result-failure,
  .result-success {
    padding: 40px 25px;
  }

  .authority-card {
    padding: 30px 20px;
  }
}
</style>