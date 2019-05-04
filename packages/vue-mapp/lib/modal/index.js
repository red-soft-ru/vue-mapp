import VmModal from './modal'

export default {
  install(Vue) {
    Vue.component('vm-modal', VmModal)
  },
}

export { default as VmModal } from './modal'
