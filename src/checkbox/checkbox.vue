<script lang="ts">
import InputElement from '../input.mixin';
import { Component, Prop, Watch } from 'vue-property-decorator';

@Component({
  name: 'vm-checkbox',
  model: {
    prop: 'model',
    event: 'input'
  }
})
export default class VueMappCheckbox extends InputElement {
  emitValue: boolean = false;

  $refs: {
    input: HTMLInputElement
  };

  @Prop(Boolean) iconRight: boolean;
  @Prop([Boolean, Array]) model: boolean | any[];

  @Watch('model')
  updateValue(newValue) {
    this.emitValue = newValue;
  }

  private get modelValue(): boolean | any[] {
    const fieldValue = this.field && this.field.emitValue;
    return /undefined|null/.test(fieldValue) ? this.model : fieldValue;
  }

  get checked(): boolean {
    const { modelValue } = this;

    if (modelValue instanceof Array) {
      return modelValue.indexOf(this.value) >= 0;
    } else {
      return !!this.emitValue;
    }
  }

  click($event?) {
    const { modelValue } = this;

    if (modelValue instanceof Array) {

      if (this.checked) {
        const idx = modelValue.indexOf(this.value);
        modelValue.splice(idx, 1);
      } else {
        modelValue.push(this.value);
      }
    } else {
      this.emitValue = !this.emitValue;
      this.$emit('input', this.emitValue, $event);
    }

    this.form && this.form.change();
    this.$emit('click');
  }

  created() {
    if (typeof this.modelValue === 'boolean') {
      this.emitValue = this.modelValue;
    }
  }
}
</script>

<template>
  <div
    :disabled="status === 'disabled'"
    :readonly="status === 'readonly'"
    :class="{
      'is--checked': checked,
      'is--right': iconRight
    }"
    @click="click"
    class="vm-checkbox"
  >
    <div class="vm-checkbox__icon">
      <div
        v-if="checked"
        class="vm-checkbox__checkmark"
      />
    </div>

    <div
      v-if="label || $slots.default"
      class="vm-checkbox__label"
    >
      <span>{{ label }}</span>
      <slot />
    </div>

    <input
      ref="input"
      v-show="false"
      :disabled="freezed"
      :checked="checked"
      :name="name"
      @click="click"
      type="checkbox"
    >
  </div>
</template>

<style lang="scss">
@import 'vars';
@import './theme.scss';

* {
  box-sizing: border-box;
  line-height: 20px;
}

.vm-checkbox {
  position: relative;
  display: inline-flex;
  align-items: flex-start;
  width: auto;
  padding: 6px 24px 6px 0;
  font-size: 1em;
  vertical-align: middle;
  cursor: pointer;

  [readonly] & {
    cursor: default;
  }

  &.is--right {
    flex-direction: row-reverse;
    padding-right: 0;
  }

  &__icon {
    position: relative;
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    margin: 1px 0;
    border-style: solid;
    border-width: 2px;
    border-radius: 2px;
    will-change: opacity;

    .vm-checkbox.is--right & {
      margin-right: 0;
      margin-left: 16px;
    }

    .vm-checkbox.is--checked & {
      border: none;
    }
  }

  &__checkmark {
    position: absolute;
    top: 2px;
    left: 6px;
    width: 6px;
    height: 12px;
    border-style: solid;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  &__label {
    margin-left: 16px;

    .vm-checkbox.is--right & {
      flex-grow: 1;
      margin-left: 0;
    }
  }

  .vm-column & {
    padding-right: 0;
  }
}
</style>
