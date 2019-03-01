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
      path: '/chip',
      name: 'chip',
      component: () => import('vue-mapp/chip/chip.demo.vue'),
    },
  ],
});
