import Vue from 'vue';
import Prism from 'prismjs';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';
import router from './views/router';
import store from './state/store';
import VueMapp from '../pack/all';
import App from './App.vue';

import './components';

Vue.config.productionTip = false;

Vue.use(VueMapp);

Prism.plugins.NormalizeWhitespace.setDefaults({
  'remove-trailing': true,
  'remove-indent': true,
  'left-trim': true,
  'right-trim': true,
  'break-lines': 80,
  'remove-initial-line-feed': false,
  'tabs-to-spaces': 2,
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
