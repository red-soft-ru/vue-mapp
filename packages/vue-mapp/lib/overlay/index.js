import VmOverlay from './overlay.vue'

VmOverlay.install = Vue => {
  Vue.component('vm-overlay', VmOverlay)
}

export default VmOverlay
