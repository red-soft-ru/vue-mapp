import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../state/store';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  next();
  store.commit('ui/SET_MENU_VISIBILITY', false);
});

export default router;
