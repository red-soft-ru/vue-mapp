import Vue from 'vue'
import ViewportMixin from './viewport.mixin'
import AgentMixin from './agent.mixin'

const uiController = new Vue({
  mixins: [ViewportMixin, AgentMixin],
  data() {
    return {
      ready: false,
    }
  },
  computed: {
    mobile() {
      return this.devType === 'mobile' || /xs/.test(this.screen)
    },
    tablet() {
      return /sm/.test(this.screen)
    },
  },
  created() {
    if (document.fonts) {
      document.fonts.ready.then(() => {
        this.ready = true
      })
    } else {
      this.ready = true
    }
    // document.fonts.onloadingdone = function(fontFaceSetEvent) {}
  },
})

uiController.install = Vue => {
  Vue.prototype.$ui = uiController
}

export default uiController
