import Snackbar from './snackbar.vue'

export default {
  currentSnackbar: null,
  nextSnackbar: null,
  show(options) {
    if (!options) {
      return console.warn('snackbar: options is empty')
    }

    const snackbar = new Snackbar({
      propsData: {
        text: options.text,
        center: options.center,
        actionText: options.actionLabel,
        duration: options.duration,
      },
    })

    if (options.action instanceof Function) {
      snackbar.$once('action', options.action)
    }

    snackbar.$once('hide', () => {
      this.hide()
    })

    if (this.currentSnackbar) {
      this.nextSnackbar = snackbar
      this.currentSnackbar.hide()
    } else {
      this.currentSnackbar = snackbar
      snackbar.show()
    }

    return snackbar
  },
  hide() {
    const { nextSnackbar, currentSnackbar } = this

    if (currentSnackbar) {
      currentSnackbar.$destroy()
    }

    if (nextSnackbar) {
      this.currentSnackbar = nextSnackbar
      nextSnackbar.show()
      this.nextSnackbar = null
    } else {
      this.currentSnackbar = null
    }
  },
}
