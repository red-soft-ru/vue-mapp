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
          @click="close"
          class="vm-modal__overlay"
        />
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class VmModal extends Vue {

  overlay: boolean = false;

  @Prop({
    type: [String, Number],
    default: 480,
  })
  maxWidth: string | number;

  @Prop({
    type: Boolean,
    default: false,
  })
  fullscreen: boolean;

  @Prop({
    type: String,
    default: 'slide-y',
  })
  transition: string;

  @Prop({
    type: String,
    default: '',
    validator: v => !v || /top|right|bottom|left/.test(v),
  })
  position: string;

  get simple(): boolean {
    return !(this.$slots.header && this.$slots.footer);
  }

  close(e) {
    this.$emit('close', e);
  }
}
</script>

<style lang="scss">
@import "vars";

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
    background: $bg-default;
    border-radius: 2px;
    box-shadow: $shadow-lg;

    &--fullscreen {
      width: 100vw;
      max-width: none;
      height: 100vh;
      max-height: none;
      border-radius: none;
    }
  }

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 120vw;
    height: 120vh;
    background: $bg-overlay;
    transform: translate(-10vw, -10vh);
  }
}
</style>
