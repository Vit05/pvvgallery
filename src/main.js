import Vue from 'vue'
import App from './App.vue'
import Styles from './assets/common.scss'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  Styles,
  store,
  render: h => h(App)
}).$mount('#app')
