import Vue from 'vue'
import App from './App.vue'
import ElemenUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router/index.js'

import axios from 'axios'
Vue.use(ElemenUI)
Vue.prototype.axios = axios



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
