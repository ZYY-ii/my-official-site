// vue.config.js
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  
  // 🔑 核心：使用环境变量动态设置 publicPath
  publicPath: process.env.VUE_APP_BASE_URL || 
    (process.env.NODE_ENV === 'production' ? '/my-official-site/' : '/'),
  
  outputDir: 'dist',
  
  // 生产环境优化
  productionSourceMap: false,
  
  // 开发服务器配置
  devServer: {
    port: 8080,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: { '^/api': '/api' }
      }
    }
  },
  
  // CSS 配置（可选）
  css: {
    extract: true,
    loaderOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  }
})