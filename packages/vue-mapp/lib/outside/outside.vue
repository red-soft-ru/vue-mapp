<script>
import modal from 'vue-mapp/mixins/modal.mixin'
import VmOverlay from 'vue-mapp/lib/overlay'

export default {
  name: 'VmOutside',
  components: {
    VmOverlay,
  },
  mixins: [modal],
  props: {
    size: {
      type: [String, Number],
      default: 0,
    },
    position: {
      type: String,
      default: 'left',
      validator: v => /left|right|top|bottom/.test(v),
    },
    overlay: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    vertical() {
      return /top|bottom/.test(this.position)
    },
    boxStyles() {
      const styles = {}

      if (this.size) {
        const size = typeof this.size === 'number' ? `${this.size}px` : this.size

        if (this.vertical) {
          styles.height = size
        } else {
          styles.width = size
        }
      }

      return Object.keys(styles).length ? styles : null
    },
  },
}
</script>

<template>
  <aside
    :name="name"
    class="vm-outside"
  >
    <transition
      v-if="visible"
      :name="`outside-${position}`"
      appear
      @enter="onOpened"
      @after-leave="onClosed"
    >
      <vm-box
        v-bind="$attrs"
        :style="boxStyles"
        :class="[
          'vm-outside__box',
          vertical && 'vm-outside__box--vertical',
          position && `vm-outside__box--${position}`,
        ]"
      >
        <template
          v-for="(_, slotName) in $scopedSlots"
          :slot="slotName"
        >
          <div
            :key="slotName"
            data-scroll-lock-scrollable
            class="vm-outside__scrollable"
          >
            <slot :name="slotName" />
          </div>
        </template>
      </vm-box>
    </transition>

    <transition
      v-if="visible"
      name="fade"
    >
      <vm-overlay @click="clickOnOverlay" />
    </transition>
  </aside>
</template>

<style lang="scss" src="./outside.scss"></style>
