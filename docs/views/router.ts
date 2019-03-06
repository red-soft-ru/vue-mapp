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
    {
      path: '/divider',
      name: 'divider',
      component: () => import('vue-mapp/divider/divider.demo.vue'),
    },
    {
      path: '/card',
      name: 'card',
      component: () => import('vue-mapp/card/card.demo.vue'),
    },
    {
      path: '/tag',
      name: 'tag',
      component: () => import('vue-mapp/tag/tag.demo.vue'),
    },
    {
      path: '/',
      name: 'checkbox',
      component: () => import('vue-mapp/checkbox/checkbox.demo.vue'),
    },
  ],
});
