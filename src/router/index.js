import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueRouter)
Vue.use(ElementUI)

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/Home.vue') },
  { path: '/about', name: 'About', component: () => import('@/views/About.vue') },
  { path: '/news', name: 'News', component: () => import('@/views/News.vue') },
  { path: '/service', name: 'Service', component: () => import('@/views/Service.vue') },
  { path: '/docs', name: 'Docs', component: () => import('@/views/Docs.vue') },
  { path: '/cert-query', name: 'CertQuery', component: () => import('@/views/CertQuery.vue') },
  { path: '/careers', name: 'Careers', component: () => import('@/views/Careers.vue') },
  { path: '/contact', name: 'Contact', component: () => import('@/views/Contact.vue') }
]

const router = new VueRouter({
  mode: 'hash', 
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

export default router