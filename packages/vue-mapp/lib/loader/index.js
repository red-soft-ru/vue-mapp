import VmLoader from './loader'

export default {
  VmLoader,
  install(Vue) {
    Vue.component('vm-loader', VmLoader)
  },
}
