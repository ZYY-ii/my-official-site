<template>
  <div class="contact-page">
    <!-- Page Banner -->
    <section class="page-banner">
      <div class="banner-bg"></div>
      <div class="container">
        <h1>联系我们</h1>
        <p class="banner-desc">有任何问题？我们随时为您提供专业支持</p>
      </div>
    </section>

    <!-- 主体内容 -->
    <section class="contact-content-section">
      <div class="container">
        <div class="contact-layout">
          <!-- 左侧联系信息 -->
          <aside class="contact-info">
            <div class="info-card">
              <h3>联系信息</h3>
              
              <div class="contact-item" @click="copyText(companyInfo.address)">
                <div class="contact-icon">
                  <i class="el-icon-location-outline"></i>
                </div>
                <div class="contact-detail">
                  <h4>公司地址</h4>
                  <p>{{ companyInfo.address }}</p>
                  <span class="copy-tip">点击复制</span>
                </div>
              </div>

              <div class="contact-item" @click="copyText(companyInfo.phone)">
                <div class="contact-icon">
                  <i class="el-icon-phone-outline"></i>
                </div>
                <div class="contact-detail">
                  <h4>咨询热线</h4>
                  <p class="phone-number">{{ companyInfo.phone }}</p>
                  <span class="copy-tip">点击复制</span>
                </div>
              </div>

              <div class="contact-item" @click="copyText(companyInfo.email)">
                <div class="contact-icon">
                  <i class="el-icon-message"></i>
                </div>
                <div class="contact-detail">
                  <h4>电子邮箱</h4>
                  <p>{{ companyInfo.email }}</p>
                  <span class="copy-tip">点击复制</span>
                </div>
              </div>

              <div class="contact-item">
                <div class="contact-icon">
                  <i class="el-icon-time"></i>
                </div>
                <div class="contact-detail">
                  <h4>工作时间</h4>
                  <p>{{ companyInfo.workTime }}</p>
                </div>
              </div>
            </div>

            <!-- 社交媒体 -->
            <div class="social-card">
              <h3>关注我们</h3>
              <div class="social-grid">
                <div class="social-item wechat">
                  <i class="el-icon-chat-dot-round"></i>
                  <p>微信公众号</p>
                  <img src="@/assets/wechat-qr.png" alt="微信公众号" class="qr-popup" />
                </div>
                <div class="social-item wecom">
                  <i class="el-icon-user"></i>
                  <p>企业微信</p>
                  <span class="add-tip">扫码添加</span>
                </div>
              </div>
            </div>
          </aside>

          <!-- 右侧地图+表单 -->
          <main class="contact-main">
            <!-- 地图 -->
            <div class="map-card">
              <h3>我们的位置</h3>
              <div class="map-container">
                <!-- 实际项目嵌入百度/高德地图 -->
                <div class="map-placeholder">
                  <i class="el-icon-map-location"></i>
                  <p>江苏省淮安市清江浦区汇丰中央广场1号楼</p>
                  <el-button type="primary" size="small" @click="openMap">
                    <i class="el-icon-navigation"></i> 导航到这里
                  </el-button>
                </div>
              </div>
            </div>

            <!-- 在线留言 -->
            <div class="message-card">
              <h3>在线留言</h3>
              <p class="message-desc">有认证需求？留下联系方式，专家顾问将在30分钟内联系您！</p>
              
              <el-form 
                :model="messageForm" 
                :rules="messageRules" 
                ref="messageFormRef"
                label-position="top"
              >
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="姓名" prop="name">
                      <el-input v-model="messageForm.name" placeholder="请输入您的姓名"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="手机号" prop="phone">
                      <el-input 
                        v-model="messageForm.phone" 
                        placeholder="请输入11位手机号"
                        maxlength="11"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                
                <el-form-item label="公司名称" prop="company">
                  <el-input v-model="messageForm.company" placeholder="请输入公司全称"></el-input>
                </el-form-item>
                
                <el-form-item label="咨询类型" prop="type">
                  <el-select v-model="messageForm.type" placeholder="请选择咨询类型" style="width: 100%">
                    <el-option label="ISO9001质量管理体系" value="iso9001" />
                    <el-option label="ISO14001环境管理体系" value="iso14001" />
                    <el-option label="ISO45001职业健康安全" value="iso45001" />
                    <el-option label="产品认证（CCC/CE等）" value="product" />
                    <el-option label="其他咨询" value="other" />
                  </el-select>
                </el-form-item>
                
                <el-form-item label="留言内容" prop="content">
                  <el-input 
                    v-model="messageForm.content" 
                    type="textarea" 
                    :rows="4"
                    placeholder="请简要描述您的需求或问题..."
                  ></el-input>
                </el-form-item>
                
                <el-form-item>
                  <el-button 
                    type="primary" 
                    size="large" 
                    @click="submitMessage"
                    :loading="submitting"
                    style="width: 100%"
                  >
                    <i class="el-icon-send"></i> 免费获取方案
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </main>
        </div>
      </div>
    </section>

    <!-- 客服悬浮按钮 -->
    <div class="float-service">
      <el-tooltip content="在线客服" placement="left">
        <el-button 
          type="primary" 
          circle 
          size="large"
          @click="openChat"
        >
          <i class="el-icon-customer-service"></i>
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号'))
      } else if (!/^1[3-9]\d{9}$/.test(value)) {
        callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    }

    return {
      companyInfo: {
        address: '江苏省淮安市清江浦区汇丰中央广场1号楼511-515室',
        phone: '0517-83768688',
        email: 'cscccertification@163.com',
        workTime: '周一至周五 09:00 - 17:30（法定节假日除外）'
      },
      messageForm: {
        name: '',
        phone: '',
        company: '',
        type: '',
        content: ''
      },
      messageRules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phone: [{ validator: validatePhone, trigger: 'blur' }],
        company: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择咨询类型', trigger: 'change' }],
        content: [
          { required: true, message: '请输入留言内容', trigger: 'blur' },
          { min: 10, message: '内容不少于10个字', trigger: 'blur' }
        ]
      },
      submitting: false
    }
  },
  methods: {
    copyText(text) {
      navigator.clipboard.writeText(text).then(() => {
        this.$message.success('已复制到剪贴板')
      }).catch(() => {
        // 降级方案
        const textarea = document.createElement('textarea')
        textarea.value = text
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        this.$message.success('已复制到剪贴板')
      })
    },
    openMap() {
      const address = encodeURIComponent(this.companyInfo.address)
      window.open(`https://map.baidu.com/search?querytype=s&da_src=shareurl&wd=${address}`, '_blank')
    },
    openChat() {
      // 集成企业微信/第三方客服
      this.$message.info('在线客服功能开发中，请拨打 0517-83768688')
    },
    async submitMessage() {
      try {
        await this.$refs.messageFormRef.validate()
        this.submitting = true
        
        // 模拟API提交
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        this.$message.success('留言提交成功！我们将在30分钟内联系您')
        this.$refs.messageFormRef.resetFields()
      } catch (error) {
        this.$message.error(error.message || '提交失败，请重试')
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.page-banner {
  position: relative;
  height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--primary-blue);
  color: #fff;
  text-align: center;

  .banner-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/contact-banner.jpg') center/cover;
    opacity: 0.3;
  }

  .container {
    position: relative;
    z-index: 1;
  }

  h1 {
    font-size: 42px;
    margin-bottom: 12px;
  }

  .banner-desc {
    font-size: 18px;
    opacity: 0.9;
  }
}

.contact-content-section {
  padding: 60px 0;

  .contact-layout {
    display: grid;
    grid-template-columns: 380px 1fr;
    gap: 40px;
  }
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.info-card,
.social-card,
.map-card,
.message-card {
  background: #fff;
  border-radius: var(--border-radius);
  padding: 35px;
  box-shadow: var(--shadow-card);
}

.info-card,
.social-card {
  h3 {
    font-size: 20px;
    color: var(--text-main);
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid var(--bg-light);
  }
}

.contact-item {
  display: flex;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px dashed #e8e8e8;
  cursor: pointer;
  transition: background 0.3s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: var(--bg-light);
    border-radius: 8px;
  }

  .contact-icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    i {
      font-size: 22px;
      color: #fff;
    }
  }

  .contact-detail {
    flex: 1;

    h4 {
      font-size: 16px;
      color: var(--text-main);
      margin-bottom: 5px;
    }

    p {
      font-size: 14px;
      color: var(--text-light);
      line-height: 1.6;
      margin: 0;
    }

    .phone-number {
      font-size: 18px;
      font-weight: 600;
      color: var(--primary-blue);
    }

    .copy-tip {
      font-size: 12px;
      color: var(--secondary-blue);
      opacity: 0;
      transition: opacity 0.3s;
    }
  }

  &:hover .copy-tip {
    opacity: 1;
  }
}

.social-card {
  .social-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .social-item {
    text-align: center;
    padding: 20px 10px;
    background: var(--bg-light);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;

    &:hover {
      background: #e8f4ff;
      transform: translateY(-3px);
    }

    i {
      font-size: 32px;
      color: var(--primary-blue);
      margin-bottom: 10px;
    }

    p {
      font-size: 13px;
      color: var(--text-main);
      margin: 0;
    }

    .qr-popup {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -150%);
      width: 150px;
      height: 150px;
      background: #fff;
      border-radius: 12px;
      padding: 10px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s;
      z-index: 10;

      &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        border: 8px solid transparent;
        border-top-color: #fff;
      }
    }

    &:hover .qr-popup {
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, -120%);
    }

    &.wecom .add-tip {
      font-size: 11px;
      color: var(--text-light);
    }
  }
}

.contact-main {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.map-card,
.message-card {
  h3 {
    font-size: 20px;
    color: var(--text-main);
    margin-bottom: 20px;
  }
}

.map-container {
  height: 300px;
  background: var(--bg-light);
  border-radius: 12px;
  overflow: hidden;

  .map-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--text-light);

    i {
      font-size: 48px;
      margin-bottom: 15px;
      color: var(--secondary-blue);
    }

    p {
      margin-bottom: 20px;
      text-align: center;
      max-width: 80%;
    }
  }
}

.message-card {
  .message-desc {
    font-size: 14px;
    color: var(--text-light);
    margin-bottom: 25px;
    line-height: 1.6;
  }

  .el-form-item {
    margin-bottom: 20px;

    :deep(.el-form-item__label) {
      font-weight: 500;
      font-size: 14px;
    }
  }

  .el-button {
    padding: 15px;
    font-size: 16px;
  }
}

.float-service {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 100;

  .el-button {
    width: 60px;
    height: 60px;
    box-shadow: 0 4px 16px rgba(10,46,109,0.3);

    i {
      font-size: 24px;
    }

    &:hover {
      transform: scale(1.1);
    }
  }
}

@media (max-width: 992px) {
  .contact-layout {
    grid-template-columns: 1fr;
  }

  .contact-info {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .info-card,
  .social-card {
    flex: 1;
    min-width: 280px;
  }

  .social-card .social-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .contact-item {
    padding: 15px 0;
  }

  .info-card,
  .social-card,
  .map-card,
  .message-card {
    padding: 25px 20px;
  }

  .message-card .el-row {
    .el-col {
      width: 100%;
    }
  }

  .float-service {
    bottom: 20px;
    right: 20px;
  }
}
</style>