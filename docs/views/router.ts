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
      path: '/checkbox',
      name: 'checkbox',
      component: () => import('vue-mapp/checkbox/checkbox.demo.vue'),
    },
    {
      path: '/radio',
      name: 'radio',
      component: () => import('vue-mapp/radio/radio.demo.vue'),
    },
    {
      path: '/toggle',
      name: 'toggle',
      component: () => import('vue-mapp/toggle/toggle.demo.vue'),
    },
    {
      path: '/switch',
      name: 'switch',
      component: () => import('vue-mapp/switch/switch.demo.vue'),
    },
    {
      path: '/input',
      name: 'input',
      component: () => import('vue-mapp/input/input.demo.vue'),
    },
    {
      path: '/textarea',
      name: 'textarea',
      component: () => import('vue-mapp/textarea/textarea.demo.vue'),
    },
    {
      path: '/popup',
      name: 'popup',
      component: () => import('vue-mapp/popup/popup.demo.vue'),
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('vue-mapp/menu/menu.demo.vue'),
    },
    {
      path: '/date',
      name: 'date',
      component: () => import('vue-mapp/date/date.demo.vue'),
    },
  ],
});
