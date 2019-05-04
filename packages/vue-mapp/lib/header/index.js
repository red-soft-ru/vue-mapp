import VmHeader from './header'

export default {
  install(Vue) {
    Vue.component('vm-header', VmHeader)
  },
}

export { default as VmHeader } from './header'
