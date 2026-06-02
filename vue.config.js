const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  
  // 使用环境变量
  publicPath: process.env.VUE_APP_BASE_URL || 
    (process.env.NODE_ENV === 'production' ? '/my-official-site/' : '/'),
  
  outputDir: 'dist',
  productionSourceMap: false
})