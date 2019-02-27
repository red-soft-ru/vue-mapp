import Vue from 'vue';
import App from './App.vue';
import router from './views/router';
import store from './store';
import VueMapp from '../pack/all';

Vue.config.productionTip = false;
Vue.use(VueMapp);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
