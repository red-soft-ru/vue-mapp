<script>

export default {
  name: 'VmModal',
  props: {
    maxWidth: {
      type: [String, Number],
      default: 480,
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: String,
      default: 'slide-y',
    },
    position: {
      type: String,
      default: '',
      validator: v => !v || /top|right|bottom|left/.test(v),
    },
  },
  data() {
    return {
      overlay: false,
    }
  },
  computed: {
    simple() {
      return !(this.$slots.header && this.$slots.footer)
    },
  },
  methods: {
    close(e) {
      this.$emit('close', e)
    },
  },
}
</script>

<template>
  <transition
    :name="transition"
    @before-leave="overlay = false"
    @enter="overlay = true"
  >
    <div class="vm-modal">
      <div class="vm-modal__spacer" />
      <div
        :style="{
          maxWidth: maxWidth ? maxWidth + 'px' : null,
        }"
        :class="{
          'vm-modal__content': true,
          'vm-modal__content--fullscreen': fullscreen,
        }"
      >
        <div class="vm-modal__header">
          <slot name="header" />
        </div>

        <div class="vm-modal__body">
          <slot />
        </div>

        <div class="vm-modal__footer">
          <slot name="footer" />
        </div>
      </div>
      <div class="vm-modal__spacer" />
      <transition :name="transition && 'fade'">
        <div
          v-if="overlay"
          class="vm-modal__overlay"
          @click="close"
        />
      </transition>
    </div>
  </transition>
</template>

<style lang="scss">

.vm-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  // padding: 32px 0;

  &--simple {
    overflow: auto;
  }

  &__spacer {
    flex-grow: 1;
  }

  &__content {
    z-index: 2;
    min-width: 320px;
    max-width: calc(100% - 32px);
    height: auto;
    max-height: calc(100% - 32px);
    background: var(--vm-bg-default);
    border-radius: 2px;
    box-shadow: var(--vm-shadow-lg);

    &--fullscreen {
      width: 100vw;
      max-width: none;
      height: 100vh;
      max-height: none;
      border-radius: 0;
    }
  }

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 120vw;
    height: 120vh;
    background: var(--vm-bg-overlay);
    transform: translate(-10vw, -10vh);
  }
}
</style>
