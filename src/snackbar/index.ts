import Snackbar from './snackbar.vue';
import SnackbarManager from './manager';

const manager = new SnackbarManager();

export default function(Vue, options) {
  const component = Snackbar.extend({
    data: () => ({
      manager,
    }),
    ...options,
  });

  Vue.component('vm-snackbar', component);
  Vue.prototype.$snackbar = manager;
}

export { Snackbar, manager as snackbar };
