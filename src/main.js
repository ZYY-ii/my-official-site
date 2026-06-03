import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js' 

console.log('当前环境:', process.env.NODE_ENV)
console.log('基础路径:', process.env.VUE_APP_BASE_URL)
console.log('API 地址:', process.env.VUE_APP_API_BASE_URL)

Vue.config.productionTip = false

new Vue({
  router, 
  render: h => h(App),
}).$mount('#app')
