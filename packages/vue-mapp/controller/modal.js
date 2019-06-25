import Vue from 'vue'
import pull from 'lodash/pull'
import ui from 'vue-mapp/controller/ui'

const modalController = new Vue({
  data: {
    registeredItems: {},
    activeItems: [],
  },
  methods: {
    getModal(name) {
      return this.registeredItems[name]
    },
    show(name) {
      const modalItem = this.getModal(name)

      if (modalItem) {
        modalItem.show()
      } else {
        console.warn(`Modal with name '${name}' is not found`)
      }
    },
    hide(name) {
      const modalItem = this.getModal(name)

      if (modalItem) {
        modalItem.hide()
      } else {
        console.warn(`Modal with name '${name}' is not found`)
      }
    },
    register(modal) {
      this.registeredItems[modal.name] = modal
    },
    registerActive(modal) {
      if (this.activeItems.length === 0) {
        ui.lockViewport()
      }

      this.activeItems.push(modal)
    },
    unregisterActive(modal) {
      pull(this.activeItems, modal)

      if (this.activeItems.length === 0) {
        ui.unlockViewport()
      }
    },
  },
})

modalController.install = Vue => {
  Vue.prototype.$modal = modalController
}

export default modalController
