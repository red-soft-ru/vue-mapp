import Vue from 'vue';

import router from './views/router';
import store from './state/store';
import VueMapp from '../pack/all';
import App from './App.vue';

import './components';

Vue.config.productionTip = false;

Vue.use(VueMapp);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
