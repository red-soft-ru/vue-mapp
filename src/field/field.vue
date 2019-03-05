<script lang="ts">
// import InputElement from 'component/input/input-element';
import InputElement from '../input.mixin';
import { Component, Prop, Watch } from 'vue-property-decorator';

@Component({
  name: 'vm-field',
  provide() {
    return {
      field: this,
    };
  },
})
export default class VueMappField extends InputElement {
  emitValue: any = null;

  @Prop(String)
  message: string;

  @Watch('emitValue')
  updateValue(newValue, oldValue) {
    if (!this.freezed) {
      this.$emit('input', newValue);
    }
  }

  @Watch('value')
  updateEmitValue(newValue) {
    this.emitValue = newValue;
  }

  created() {
    this.emitValue = this.value;
  }
}
</script>

<template>
  <div
    :readonly="status === 'readonly'"
    :disabled="status === 'disabled'"
    class="vm-field"
  >
    <div
      v-if="label"
      class="vm-field__label"
    >
      {{ label }}
    </div>
    <div class="vm-field__content">
      <slot />
    </div>
    <div class="vm-field__message">
      {{ message }}
    </div>
  </div>
</template>

<style lang="scss">

.vm-field {
  margin-bottom: 24px;

  &__label {
    font-size: 0.85714286em;
    font-weight: 500;
    line-height: 1.2;
    opacity: .8;
  }

  &__message {
    min-height: 20px;
    margin-top: 4px;
    font-size: 12px;
    line-height: 20px;
    opacity: .8;
  }
}
</style>
