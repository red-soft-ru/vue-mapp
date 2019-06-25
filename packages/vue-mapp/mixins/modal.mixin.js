import controller from 'vue-mapp/controller/modal'

export default {
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: true,
    },
    closable: {
      type: [Boolean, String],
      default: true,
      validator: v => typeof v === 'boolean' || /icon|overlay/.test(v),
    },
  },
  data() {
    return {
      visible: false,
    }
  },
  created() {
    controller.register(this)
  },
  mounted() {
    document.body.appendChild(this.$el)
  },
  destroyed() {
    this.$el.remove()
    controller.unregisterActive(this)
  },
  methods: {
    show() {
      this.visible = true
      window.addEventListener('keydown', this.onKeyPress)
      controller.registerActive(this)
      this.$emit('show')
    },
    hide(e) {
      this.visible = false
      this.$emit('close')
      window.removeEventListener('keydown', this.onKeyPress)
      controller.unregisterActive(this)
    },
    clickOnOverlay() {
      if (this.closable === true || this.closable === 'overlay') {
        this.hide()
        this.$emit('overlay')
      }
    },
    onOpened() {
      this.$emit('opened')
    },
    onClosed() {
      this.$emit('closed')
    },
    onKeyPress(e) {
      // when escape pressed
      if (e.keyCode === 27 && this.closable) {
        this.hide()
      }
    },
  },
}
