<template>
  <footer class="app-footer">
    <div class="container footer-grid">
      <!-- 品牌简介 -->
      <div class="footer-col brand">
        <h3 class="col-title">中标信认证</h3>
        <p class="brand-desc">
          专业、权威、高效的第三方认证服务机构，助力企业高质量发展。
        </p>
        <div class="social-links">
          <span class="icon">微</span>
          <span class="icon">博</span>
          <span class="icon">领</span>
        </div>
      </div>

      <!-- 快速导航 -->
      <div class="footer-col">
        <h3 class="col-title">快速导航</h3>
        <ul class="link-list">
          <li><router-link to="/about">关于我们</router-link></li>
          <li><router-link to="/news">新闻动态</router-link></li>
          <li><router-link to="/service">认证服务</router-link></li>
          <li><router-link to="/docs">公开文件</router-link></li>
        </ul>
      </div>

      <!-- 核心服务 -->
      <div class="footer-col">
        <h3 class="col-title">核心服务</h3>
        <ul class="link-list">
          <li>ISO9001 质量管理体系</li>
          <li>ISO14001 环境管理体系</li>
          <li>ISO45001 职业健康安全</li>
          <li>CNAS 认可咨询</li>
        </ul>
      </div>

      <!-- 联系方式 -->
      <div class="footer-col">
        <h3 class="col-title">联系我们</h3>
        <ul class="contact-list">
          <li>📞 0517-83768688</li>
          <li>📧 cscccertification@163.com</li>
          <li>📍 江苏省淮安市清江浦区汇丰中央广场1号楼</li>
          <li>🕒 工作日 09:00 - 17:30</li>
        </ul>
      </div>
    </div>

    <!-- 底部版权 -->
    <div class="footer-bottom">
      <p>
        Copyright © 2026 中标信认证（江苏）有限公司 All Rights Reserved. 
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">苏ICP备2023020496号-1</a>
        | 苏公网安备32081202000589号
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped lang="scss">
.app-footer {
  background: var(--primary-blue);
  color: #fff;
  padding-top: 60px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
  gap: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.col-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 10px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 30px;
    height: 2px;
    background: var(--accent-gold);
  }
}

.brand-desc {
  font-size: 14px;
  color: rgba(255,255,255,0.8);
  line-height: 1.8;
  margin-bottom: 20px;
}

.social-links {
  display: flex;
  gap: 12px;

  .icon {
    width: 32px;
    height: 32px;
    background: rgba(255,255,255,0.15);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover { background: var(--secondary-blue); }
  }
}

.link-list, .contact-list {
  li {
    margin-bottom: 12px;
    font-size: 14px;
    color: rgba(255,255,255,0.85);
    transition: color 0.3s;

    a:hover { color: #fff; text-decoration: underline; }
    &:hover { color: #fff; }
  }
}

.footer-bottom {
  text-align: center;
  padding: 20px 0;
  font-size: 13px;
  color: rgba(255,255,255,0.6);

  a { color: rgba(255,255,255,0.8); }
}

/* 响应式 */
@media (max-width: 992px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 576px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .footer-bottom {
    padding: 15px 20px;
    font-size: 12px;
    line-height: 1.6;
  }
}
</style>