import Snackbar from './snackbar.vue'
import SnackbarManager from './manager'

const manager = new SnackbarManager()

export default {
  snackbar: manager,
  Snackbar,
  install(Vue) {
    Vue.component('vm-snackbar', Snackbar)
    Vue.prototype.$snackbar = manager
  },
}
