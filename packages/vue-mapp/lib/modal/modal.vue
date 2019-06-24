<script>
import manager from 'vue-mapp/controller/modal'

export default {
  name: 'TheModal',
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: 'sm',
      validator: v => !v || /xs|sm|md|lg/.test(v),
    },
    height: {
      type: String,
      default: '',
      validator: v => !v || /xs|sm|md/.test(v),
    },
    fullscreen: {
      type: [Boolean, String],
      default: false,
      validator: v => typeof v === 'boolean' || /mobile/.test(v),
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
      overlay: false,
    }
  },
  created() {
    manager.register(this)
  },
  mounted() {
    document.body.appendChild(this.$el)
  },
  destroyed() {
    this.$el.remove()
    manager.hide(this.name)
  },
  methods: {
    show() {
      manager.show(this.name)
    },
    hide(e) {
      manager.hide(this.name)
      this.$emit('close')
    },
    clickOnOverlay() {
      if (this.closable === true || this.closable === 'overlay') {
        this.hide()
      }
      this.$emit('overlay')
    },
    onOpened() {
      this.overlay = true
      this.$emit('show')
    },
  },
}
</script>

<template>
  <transition
    v-if="visible"
    name="slide-y"
    @enter="onOpened"
    @before-leave="overlay = false"
  >
    <div class="the-modal">
      <div class="the-modal__spacer" />

      <the-box
        v-bind="$attrs"
        :class="{
          'the-modal__box': true,
          [`the-modal__box--w${width}`]: width,
          [`the-modal__box--h${height}`]: height,
          'the-modal__box--full-mobile': fullscreen === 'mobile',
          'the-modal__box--full': fullscreen === true,
        }"
      >
        <base-button
          v-if="!$scopedSlots.menu && (closable === true || closable === 'icon')"
          slot="menu"
          class="the-modal__close"
          icon="close"
          @click="hide"
        />

        <template
          v-for="(_, slotName) in $scopedSlots"
          :slot="slotName"
        >
          <div
            :key="slotName"
            data-scroll-lock-scrollable
            class="the-modal__scrollable"
          >
            <slot :name="slotName" />
          </div>
        </template>
      </the-box>

      <div class="the-modal__spacer" />

      <transition
        v-if="overlay"
        name="fade"
      >
        <div
          class="the-modal__overlay"
          @click="clickOnOverlay"
        />
      </transition>
    </div>
  </transition>
</template>

<style lang="scss" src="./modal.scss"></style>
