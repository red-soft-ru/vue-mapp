import pull from 'lodash/pull'
import { lockViewport, unlockViewport } from 'vue-mapp/controller/ui'

export default {
  registeredItems: {},
  activeItems: [],
  getModal(name) {
    return this.registeredItems[name]
  },
  show(name) {
    const modalItem = this.getModal(name)

    if (modalItem) {
      modalItem.visible = true

      if (this.activeItems.length === 0) {
        lockViewport()
      }

      this.activeItems.push(modalItem)
    } else {
      console.warn(`Modal with name '${name}' is not found`)
    }
  },
  hide(name) {
    const modalItem = this.getModal(name)

    if (modalItem) {
      modalItem.visible = false
      pull(this.activeItems, modalItem)

      if (this.activeItems.length === 0) {
        unlockViewport()
      }
    } else {
      console.warn(`Modal with name '${name}' is not found`)
    }
  },
  register(modal) {
    this.registeredItems[modal.name] = modal
  },
}
