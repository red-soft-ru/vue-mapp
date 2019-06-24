import ViewportMixin from './viewport.mixin'
import AgentMixin from './agent.mixin'

export default function(Vue) {
  Vue.prototype.$ui = new Vue({
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
}
