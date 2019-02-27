import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('vue-mapp/button/button.demo.vue'),
    },
    {
      path: '/divider',
      name:  'divider',
      component: () => import('vue-mapp/divider/divider.demo.vue'),
    },
  ],
});
