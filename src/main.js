import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 全局引入UI库 vant
import '@/plugins/vant'
//  全局引入 过滤器
import '@/common/filter'
// 全局引入rem
import '@/common/rem'
// 全局引入icons
import './icons'
// 瀑布流
import waterfall from 'vue-waterfall2'
Vue.use(waterfall)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
