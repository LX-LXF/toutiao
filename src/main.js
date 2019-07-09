import Vue from 'vue'
import App from './App.vue'
import ElemenUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from '@/router'

Vue.use(ElemenUI)




Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
