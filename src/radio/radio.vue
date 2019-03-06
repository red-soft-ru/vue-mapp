<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import InputElement from '../input.mixin';

@Component({
  name: 'vm-radio',
  model: {
    prop: 'model',
    event: 'input'
  }
})
export default class VueMappRadio extends InputElement {

  @Prop() model: any;
  @Prop({
    required: true
  }) value: any;

  init: boolean = false;

  private get checked(): boolean {
    const fieldValue = this.field && this.field.emitValue;
    const modelValue = /undefined|null/.test(fieldValue) ? this.model : fieldValue;

    return this.value === modelValue;
  }

  public get emitValue(): boolean {
    return this.checked ? this.value : null;
  }

  public click() {
    if (this.status === 'disabled') return;

    if (this.field) {
      this.field.emitValue = this.value;
    }

    this.$emit('input', this.value);
  }

  mounted() {

    if (this.init) {
      this.click();
    }
  }
}
</script>

<template>
  <div
    :disabled="status === 'disabled'"
    :class="{
      'is--checked': emitValue
    }"
    @click="click"
    class="vm-radio"
  >
    <div class="vm-radio__icon" />
    <div
      v-if="$slots.default || label"
      class="vm-radio__label"
    >
      {{ label }}
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@import 'vars';
@import './theme.scss';

.vm-radio {
  position: relative;
  display: flex;
  flex-shrink: 0;
  width: auto;
  padding: 6px 24px 6px 0;
  font-size: 1em;
  line-height: 20px;
  cursor: pointer;

  &__icon {
    position: relative;
    box-sizing: border-box;
    flex: 0 0 auto;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border-style: solid;
    border-width: 2px;
    border-radius: 50%;

    &::after {
      position: absolute;
      top: 3px;
      left: 3px;
      border-color: inherit;
      border-style: solid;
      border-width: 5px;
      border-radius: 50%;

      .vm-radio.is--checked & {
        content: '';
      }
    }
  }

  &__label {
    margin-left: 16px;
  }
}
</style>
