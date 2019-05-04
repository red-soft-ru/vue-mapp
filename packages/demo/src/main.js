import Vue from 'vue'
import router from './views/router'
import store from './state/store'
import App from './App'
import VueMapp from 'vue-mapp'
import './components'

Vue.config.productionTip = false

Vue.use(VueMapp)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
