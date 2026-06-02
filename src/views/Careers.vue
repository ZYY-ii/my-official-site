<template>
  <div class="careers-page">
    <!-- Page Banner -->
    <section class="page-banner">
      <div class="banner-bg"></div>
      <div class="container">
        <h1>诚聘英才</h1>
        <p class="banner-slogan">在中标信，遇见更好的自己</p>
        <p class="banner-desc">加入我们，共筑品质未来</p>
      </div>
    </section>

    <!-- 为什么选择我们 -->
    <section class="why-us-section">
      <div class="container">
        <h2 class="section-title">为什么选择我们</h2>
        <div class="benefits-grid">
          <div class="benefit-card" v-for="(benefit, index) in benefits" :key="index">
            <div class="benefit-icon">
              <i :class="benefit.icon"></i>
            </div>
            <h3>{{ benefit.title }}</h3>
            <p>{{ benefit.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 热招职位 -->
    <section class="jobs-section">
      <div class="container">
        <h2 class="section-title">热招职位</h2>
        
        <!-- 筛选器 -->
        <div class="job-filters">
          <el-select v-model="filterDept" placeholder="所属部门" clearable size="small">
            <el-option label="全部部门" value="" />
            <el-option v-for="dept in departments" :key="dept" :label="dept" :value="dept" />
          </el-select>
          <el-select v-model="filterLocation" placeholder="工作地点" clearable size="small">
            <el-option label="全部地点" value="" />
            <el-option v-for="loc in locations" :key="loc" :label="loc" :value="loc" />
          </el-select>
          <el-button type="primary" size="small" @click="applyFilters">
            <i class="el-icon-search"></i> 筛选
          </el-button>
        </div>

        <!-- 职位列表 -->
        <div class="jobs-grid">
          <div 
            v-for="job in filteredJobs" 
            :key="job.id"
            class="job-card"
            :class="{ 'urgent': job.isUrgent }"
          >
            <div class="job-header">
              <h3 class="job-title">{{ job.title }}</h3>
              <div class="job-tags">
                <el-tag v-if="job.isUrgent" size="mini" type="danger" effect="dark">急聘</el-tag>
                <el-tag v-if="job.acceptFresh" size="mini" type="success">接受应届</el-tag>
                <el-tag v-if="job.weekendOff" size="mini">双休</el-tag>
              </div>
            </div>
            <div class="job-meta">
              <span><i class="el-icon-office-building"></i> {{ job.department }}</span>
              <span><i class="el-icon-location-outline"></i> {{ job.location }}</span>
              <span class="job-salary">{{ job.salary }}</span>
            </div>
            <p class="job-desc">{{ job.shortDesc }}</p>
            <div class="job-footer">
              <span class="job-deadline">
                <i class="el-icon-time"></i> 截止：{{ job.deadline }}
              </span>
              <el-button type="primary" size="small" @click="applyJob(job)">
                立即申请
              </el-button>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <el-empty 
          v-if="filteredJobs.length === 0" 
          description="暂无招聘职位"
          :image-size="120"
        >
          <el-button type="primary" @click="submitResume">
            提交简历至人才库
          </el-button>
        </el-empty>
      </div>
    </section>

    <!-- 招聘流程 -->
    <section class="process-section">
      <div class="container">
        <h2 class="section-title">招聘流程</h2>
        <div class="process-steps">
          <div class="step" v-for="(step, index) in process" :key="index">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h4>{{ step.title }}</h4>
              <p>{{ step.desc }}</p>
            </div>
            <div class="step-connector" v-if="index < process.length - 1">
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 投递通道 -->
    <section class="apply-section">
      <div class="container">
        <div class="apply-card">
          <h3>直接投递</h3>
          <p>将简历发送至我们的招聘邮箱，邮件标题格式：应聘职位+姓名+手机号</p>
          <div class="contact-info">
            <a href="mailto:hr@cscccertification.com" class="email-link">
              <i class="el-icon-message"></i> hr@cscccertification.com
            </a>
          </div>
          <div class="qr-section">
            <p>或扫码添加企业微信咨询</p>
            <img src="@/assets/wechat-qr.png" alt="企业微信二维码" class="qr-code" />
          </div>
        </div>
      </div>
    </section>

    <!-- 申请模态框 -->
    <el-dialog
      title="申请职位"
      :visible.sync="applyDialogVisible"
      width="600px"
      :before-close="handleApplyClose"
    >
      <el-form :model="applyForm" :rules="applyRules" ref="applyFormRef" label-position="top">
        <el-form-item label="应聘职位" prop="jobTitle">
          <el-input v-model="applyForm.jobTitle" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="applyForm.name" placeholder="请输入您的姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="applyForm.phone" placeholder="请输入11位手机号" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="applyForm.email" placeholder="请输入常用邮箱"></el-input>
        </el-form-item>
        <el-form-item label="简历附件" prop="resume">
          <el-upload
            class="resume-upload"
            action="/api/upload"
            :limit="1"
            accept=".pdf,.doc,.docx"
            :on-exceed="handleExceed"
            :before-upload="beforeUpload"
          >
            <el-button size="small" type="primary">点击上传简历</el-button>
            <div slot="tip" class="el-upload__tip">
              支持 PDF/DOC/DOCX 格式，大小不超过 10MB
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input 
            v-model="applyForm.remark" 
            type="textarea" 
            :rows="3"
            placeholder="可补充说明您的优势或期望..."
          ></el-input>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button @click="applyDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitApplication" :loading="submitting">
          提交申请
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Careers',
  data() {
    return {
      benefits: [
        { icon: 'el-icon-wallet', title: '五险一金', desc: '全额缴纳养老、医疗、失业、工伤、生育保险及住房公积金' },
        { icon: 'el-icon-sunny', title: '带薪年假', desc: '法定年假+公司福利假，工作满1年享5-15天带薪年假' },
        { icon: 'el-icon-reading', title: '专业培训', desc: '入职培训+技能提升+外部进修，助力职业成长' },
        { icon: 'el-icon-trend', title: '晋升透明', desc: '双通道晋升机制，管理/专业序列并行，凭能力说话' }
      ],
      departments: ['审核部', '市场部', '客服部', '行政部', '技术部'],
      locations: ['江苏淮安', '远程办公', '全国'],
      filterDept: '',
      filterLocation: '',
      jobs: [
        {
          id: 1,
          title: '高级审核员（质量体系方向）',
          department: '审核部',
          location: '江苏淮安',
          salary: '10k-15k·13薪',
          shortDesc: '负责ISO 9001等管理体系的现场审核工作',
          isUrgent: true,
          acceptFresh: false,
          weekendOff: true,
          deadline: '2026-07-31',
          requirements: ['5年以上审核经验', '持有CCAA审核员证书', '适应出差']
        },
        {
          id: 2,
          title: '认证咨询顾问',
          department: '市场部',
          location: '全国',
          salary: '8k-12k+提成',
          shortDesc: '为企业提供认证咨询、体系搭建辅导服务',
          isUrgent: false,
          acceptFresh: true,
          weekendOff: true,
          deadline: '2026-08-15',
          requirements: ['熟悉认证流程', '沟通表达能力强', '有销售经验者优先']
        },
        {
          id: 3,
          title: '客服专员',
          department: '客服部',
          location: '江苏淮安',
          salary: '5k-7k',
          shortDesc: '负责客户咨询接待、进度跟踪、满意度回访',
          isUrgent: false,
          acceptFresh: true,
          weekendOff: true,
          deadline: '2026-07-20',
          requirements: ['普通话标准', '熟练使用办公软件', '服务意识强']
        },
        {
          id: 4,
          title: '前端开发工程师',
          department: '技术部',
          location: '远程办公',
          salary: '12k-18k·14薪',
          shortDesc: '负责公司官网、后台管理系统的前端开发',
          isUrgent: true,
          acceptFresh: false,
          weekendOff: true,
          deadline: '2026-08-31',
          requirements: ['精通Vue 2/3', '熟悉Element UI', '有项目经验']
        }
      ],
      process: [
        { title: '投递简历', desc: '在线提交或邮件发送简历' },
        { title: '简历筛选', desc: 'HR 3个工作日内反馈初筛结果' },
        { title: '专业面试', desc: '部门主管进行专业能力评估' },
        { title: '综合复试', desc: '高管面试+薪酬沟通' },
        { title: 'Offer发放', desc: '发放录用通知，办理入职' }
      ],
      applyDialogVisible: false,
      submitting: false,
      applyForm: {
        jobTitle: '',
        name: '',
        phone: '',
        email: '',
        resume: '',
        remark: ''
      },
      applyRules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    filteredJobs() {
      let result = [...this.jobs]
      if (this.filterDept) {
        result = result.filter(j => j.department === this.filterDept)
      }
      if (this.filterLocation) {
        result = result.filter(j => j.location === this.filterLocation)
      }
      // 按紧急程度和更新时间排序
      return result.sort((a, b) => {
        if (a.isUrgent && !b.isUrgent) return -1
        if (!a.isUrgent && b.isUrgent) return 1
        return new Date(b.deadline) - new Date(a.deadline)
      })
    }
  },
  methods: {
    applyFilters() {
      // 实际项目可调用API筛选
      this.$message.success('筛选条件已应用')
    },
    applyJob(job) {
      this.applyForm.jobTitle = job.title
      this.applyDialogVisible = true
      this.$nextTick(() => {
        this.$refs.applyFormRef?.resetFields()
      })
    },
    handleApplyClose() {
      this.applyDialogVisible = false
      this.$refs.applyFormRef?.resetFields()
    },
    handleExceed() {
      this.$message.warning('最多只能上传1个文件')
    },
    beforeUpload(file) {
      const isValidType = ['application/pdf', 'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        .includes(file.type)
      const isValidSize = file.size / 1024 / 1024 < 10
      
      if (!isValidType) {
        this.$message.error('仅支持 PDF/DOC/DOCX 格式')
        return false
      }
      if (!isValidSize) {
        this.$message.error('文件大小不能超过 10MB')
        return false
      }
      return true
    },
    async submitApplication() {
      try {
        await this.$refs.applyFormRef.validate()
        this.submitting = true
        
        // 模拟提交
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        this.$message.success('申请提交成功！我们将在3个工作日内联系您')
        this.applyDialogVisible = false
        this.$refs.applyFormRef.resetFields()
      } catch (error) {
        this.$message.error(error.message || '提交失败，请重试')
      } finally {
        this.submitting = false
      }
    },
    submitResume() {
      this.$message.info('人才库功能开发中，请直接发送邮件至 hr@cscccertification.com')
    }
  }
}
</script>

<style scoped lang="scss">
.page-banner {
  position: relative;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0A2E6D 0%, #1a4a8d 100%);
  color: #fff;
  text-align: center;
  padding: 60px 20px;

  .banner-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/careers-banner.jpg') center/cover;
    opacity: 0.25;
  }

  .container {
    position: relative;
    z-index: 1;
  }

  h1 {
    font-size: 48px;
    margin-bottom: 20px;
  }

  .banner-slogan {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  .banner-desc {
    font-size: 18px;
    opacity: 0.9;
  }
}

.why-us-section {
  padding: 80px 0;
  background: var(--bg-light);

  .section-title {
    text-align: center;
    font-size: 36px;
    margin-bottom: 50px;
    color: var(--primary-blue);
  }

  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
  }

  .benefit-card {
    background: #fff;
    padding: 40px 30px;
    border-radius: var(--border-radius);
    text-align: center;
    box-shadow: var(--shadow-card);
    transition: all 0.3s;

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 24px rgba(0,0,0,0.12);
    }

    .benefit-icon {
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
      margin-bottom: 12px;
      color: var(--text-main);
    }

    p {
      font-size: 14px;
      color: var(--text-light);
      line-height: 1.6;
    }
  }
}

.jobs-section {
  padding: 80px 0;

  .section-title {
    text-align: center;
    font-size: 36px;
    margin-bottom: 40px;
    color: var(--primary-blue);
  }

  .job-filters {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 40px;
    flex-wrap: wrap;

    .el-select {
      width: 180px;
    }
  }

  .jobs-grid {
    display: grid;
    gap: 25px;
  }

  .job-card {
    background: #fff;
    border: 2px solid #e8e8e8;
    border-radius: var(--border-radius);
    padding: 30px;
    transition: all 0.3s;
    position: relative;

    &:hover {
      border-color: var(--secondary-blue);
      box-shadow: var(--shadow-card);
      transform: translateY(-3px);
    }

    &.urgent {
      border-left: 4px solid #f56c6c;
    }

    .job-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 15px;
      flex-wrap: wrap;
      gap: 10px;

      .job-title {
        font-size: 20px;
        font-weight: 600;
        color: var(--text-main);
        margin: 0;
      }

      .job-tags {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
    }

    .job-meta {
      display: flex;
      gap: 25px;
      margin-bottom: 15px;
      font-size: 14px;
      color: var(--text-light);

      i {
        margin-right: 5px;
      }

      .job-salary {
        color: #f56c6c;
        font-weight: 600;
        margin-left: auto;
      }
    }

    .job-desc {
      font-size: 15px;
      color: var(--text-light);
      margin-bottom: 20px;
      line-height: 1.6;
    }

    .job-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 20px;
      border-top: 1px solid #f0f0f0;

      .job-deadline {
        font-size: 13px;
        color: var(--text-light);

        i {
          margin-right: 5px;
        }
      }
    }
  }
}

.process-section {
  padding: 80px 0;
  background: var(--bg-light);

  .section-title {
    text-align: center;
    font-size: 36px;
    margin-bottom: 50px;
    color: var(--primary-blue);
  }

  .process-steps {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 30px;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
  }

  .step {
    flex: 1;
    min-width: 200px;
    max-width: 220px;
    text-align: center;
    position: relative;

    .step-number {
      width: 50px;
      height: 50px;
      margin: 0 auto 20px;
      background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 20px;
      font-weight: 700;
    }

    .step-content {
      h4 {
        font-size: 18px;
        color: var(--text-main);
        margin-bottom: 10px;
      }

      p {
        font-size: 14px;
        color: var(--text-light);
        line-height: 1.6;
      }
    }

    .step-connector {
      position: absolute;
      top: 25px;
      right: -30px;
      color: var(--secondary-blue);
      font-size: 24px;
    }
  }
}

.apply-section {
  padding: 80px 0;

  .apply-card {
    max-width: 600px;
    margin: 0 auto;
    background: linear-gradient(135deg, rgba(10,46,109,0.05) 0%, rgba(74,144,226,0.05) 100%);
    border-radius: var(--border-radius);
    padding: 50px 40px;
    text-align: center;
    border: 2px solid var(--secondary-blue);

    h3 {
      font-size: 24px;
      color: var(--text-main);
      margin-bottom: 15px;
    }

    p {
      font-size: 15px;
      color: var(--text-light);
      margin-bottom: 25px;
    }

    .contact-info {
      margin-bottom: 30px;

      .email-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 18px;
        font-weight: 500;
        color: var(--primary-blue);
        padding: 12px 30px;
        background: #fff;
        border-radius: 30px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        transition: all 0.3s;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.12);
        }
      }
    }

    .qr-section {
      p {
        margin-bottom: 15px;
        font-size: 14px;
      }

      .qr-code {
        width: 150px;
        height: 150px;
        border: 4px solid #fff;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
    }
  }
}

.resume-upload {
  :deep(.el-upload__tip) {
    font-size: 12px;
    color: var(--text-light);
  }
}

@media (max-width: 992px) {
  .benefits-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .process-steps {
    flex-direction: column;
    align-items: center;
  }

  .step {
    .step-connector {
      display: none;
    }
  }

  .job-filters {
    flex-direction: column;
    align-items: center;

    .el-select {
      width: 100%;
      max-width: 300px;
    }
  }
}

@media (max-width: 576px) {
  .benefits-grid {
    grid-template-columns: 1fr;
  }

  .job-card {
    .job-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .job-meta {
      flex-wrap: wrap;
      gap: 10px;

      .job-salary {
        margin-left: 0;
        width: 100%;
      }
    }

    .job-footer {
      flex-direction: column;
      gap: 15px;
      align-items: flex-start;
    }
  }

  .apply-card {
    padding: 40px 25px;
  }
}
</style>