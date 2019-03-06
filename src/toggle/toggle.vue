<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import InputElement from '../input.mixin';

@Component({
  name: 'vm-toggle'
})
export default class VueMappToggle extends InputElement {

  emitValue: boolean = false;

  @Prop([String, Boolean])
  iconRight: string | boolean;

  @Watch('value')
  updateValue(newValue) {
    this.emitValue = newValue;
  }

  public toggle() {
    if (this.status === 'disabled') return;

    if (this.value === undefined) {
      this.emitValue = !this.emitValue;
    }

    this.$emit('input', !this.value);
  }

  created() {
    this.emitValue = !!this.value;
  }
}
</script>

<template>
  <div
    :disabled="status === 'disabled'"
    :class="{
      'is--checked': emitValue,
      'is--right': iconRight
    }"
    @click="toggle"
    class="vm-toggle"
  >
    <div class="vm-toggle__thumb" />
    <div
      v-if="$slots.default || label"
      class="vm-toggle__label"
    >
      <span>{{ label }}</span>
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@import 'vars';
@import './theme.scss';

$toggle-height: 14px;
$toggle-thumb-size: 20px;

.vm-toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: auto;
  padding: 6px 24px 6px 0;
  cursor: pointer;

  &.is--right {
    flex-direction: row-reverse;
  }

  &__thumb {
    position: relative;
    width: 34px;
    height: $toggle-height;
    border-radius: $toggle-height;
    transition: all .15s linear;

    &::after {
      position: absolute;
      top: -3px;
      left: 0;
      z-index: 2;
      width: $toggle-thumb-size;
      height: $toggle-thumb-size;
      content: '';
      border-radius: 50%;
      box-shadow: $shadow-1;
      transition: transform .15s linear;
      transform: translateX(-2px);
      will-change: transform, background;

      .vm-toggle.is--checked & {
        transform: translateX(80%);
      }
    }
  }

  &__label {
    margin-left: 16px;

    .vm-toggle.is--right & {
      flex-grow: 1;
      margin-left: 0;
    }
  }
}
</style>
