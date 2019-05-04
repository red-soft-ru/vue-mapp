import VmSnackbar from './snackbar'
import SnackbarManager from './manager'

export default {
  install(Vue) {
    Vue.component('vm-snackbar', VmSnackbar)
    Vue.prototype.$snackbar = SnackbarManager
  },
}

export { default as snackbar } from './manager'
export { default as VmSnackbar } from './snackbar'
