<script lang="ts">
import InputElement from '../input.mixin';
import { Component, Inject, Prop, Watch } from 'vue-property-decorator';
import { VMOptionContainer } from '../types';
import { removeFromArray } from '../helpers/modify';

@Component({
  name: 'vm-option',
  inheritAttrs: false
})
export default class VueMappOption extends InputElement {

  hidden: boolean = false;
  selected: boolean = false;
  classes: string[] = [];

  @Prop(Boolean) init: boolean;

  @Inject('optionContainer')
  container: VMOptionContainer;

  get text(): string {
    const { $el } = this;

    return this.label || ($el && $el.innerText) || '';
  }

  click() {
    const { container } = this;

    if (!this.freezed) {
      this.selected = !this.selected;
      container.setOption(this);
    }
  }

  created() {
    const { container } = this;

    if (!container) {
      throw new Error('vm-option can not be used outside of the container');
    }

    const { model, isMultiple } = this.container;
    const noModelValue = /null|undefined/.test(model);

    if (noModelValue) {

      if (this.init) {
        this.selected = true;
        this.container.setOption(this);
      }
    } else {

      if (isMultiple) {
        this.selected = model.indexOf(this.value) >= 0;
      } else {
        this.selected = this.value === model;
      }
    }

    this.container.options.push(this);
  }

  beforeDestroy() {
    removeFromArray(this.container.options, this);
  }
}
</script>

<template>
  <!-- eslint-disable-next-line vue/require-component-is -->
  <component
    :is="container.optionComponent || 'div'"
    v-show="!hidden"
    :class="[
      classes,
      {
        'is--selected': selected
      }
    ]"
    :model="selected"
    :disabled="disabled"
    :readonly="readonly"
    @click="click"
    class="vm-option"
  >
    <div class="vm-option__label">
      <slot />
      <span>{{ label }}</span>
    </div>
  </component>
</template>

<style lang="scss">
.vm-option {
  cursor: pointer;
  user-select: none;

  &__label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>


