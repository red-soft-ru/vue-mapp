<script lang="ts">
import { Component, Prop, Provide, Watch } from 'vue-property-decorator';
import InputElement from '../input.mixin';
import VueMappOption from '../option/option.vue';
import { removeFromArray } from '../helpers/modify';

@Component({
  name: 'vm-switch',
  model: {
    prop: 'value',
    event: 'select'
  }
})
export default class VueMappSwitch extends InputElement {
  selectedOption: VueMappOption | null = null;
  selectedOptions: VueMappOption[] = [];
  options: VueMappOption[] = [];

  @Provide() optionContainer = this;
  @Prop(Boolean) margin: boolean;
  @Prop(Boolean) multiple: boolean;
  @Prop({
    type: Boolean,
    default: true,
  }) uppercase: boolean;

  get emitValue() {
    if (this.multiple) {
      return this.selectedOptions.map(option => option.value);
    } else {
      return this.selectedOption ? this.selectedOption.value : null;
    }
  }

  setOption(option: VueMappOption): void {
    if (this.multiple) {
      this.setOptionMultiple(option);
    } else {
      this.setOptionSingle(option);
    }

    this.$emit('select', this.emitValue);

    if (this.form) {
      this.form.change();
    }
  }

  setOptionSingle(option: VueMappOption) {
    const { selectedOption } = this;

    if (option.selected) {
      if (selectedOption && selectedOption !== option) {
        selectedOption.selected = false;
      }
      this.selectedOption = option;
    } else {
      this.selectedOption = null;
    }
  }

  setOptionMultiple(option: VueMappOption) {
    const selectedOptions = this.selectedOptions.slice();

    if (option.selected) {
      selectedOptions.push(option);
    } else {
      removeFromArray(selectedOptions, option);
    }

    this.selectedOptions = selectedOptions;

    if (!this.margin) {
      this.setOptionsClasses(option);
    }
  }

  setOptionsClasses(option) {
    const { options } = this;

    const optionIndex = options.indexOf(option);
    const isLastOption = optionIndex + 1 === options.length;
    const prevOption = optionIndex && options[optionIndex - 1];
    const nextOption = !isLastOption && options[optionIndex + 1];

    const classes = {
      'is--first': false,
      'is--last': false
    };

    if (option.selected) {

      if (isLastOption || nextOption && !nextOption.selected) {
        classes['is--last'] = true;
      } else if (nextOption) {
        nextOption.classes['is--first'] = false;
      }

      if (!prevOption || prevOption && !prevOption.selected) {
        classes['is--first'] = true;
      } else {
        prevOption.classes['is--last'] = false;
      }
    } else {

      if (nextOption && nextOption.selected) {
        nextOption.classes['is--first'] = true;
      }

      if (prevOption && prevOption.selected) {
        prevOption.classes['is--last'] = true;
      }
    }

    option.classes = classes;
  }
}
</script>
<template>
  <div
    :class="{
      'is--margin': multiple && margin,
      'is--multiple': multiple,
      'is--uppercase': uppercase
    }"
    class="vm-switch"
  >
    <div
      ref="options"
      class="vm-switch__options"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@import 'vars';
@import './theme.scss';

.vm-switch {
  display: flex;
  flex-direction: column;

  .vm-option {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    padding: 0 10px;
    overflow: hidden;
    line-height: 32px;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    border-radius: 2px;
  }

  &__options {
    display: flex;
    flex-wrap: nowrap;
    width: auto;
    height: auto;
    border-radius: 2px;
  }

  &.is--margin {

    .vm-option {
      margin-right: 8px;
      border-radius: 2px;
    }
  }

  &.is--uppercase {

    .vm-option {
      font-weight: 500;
      text-transform: uppercase;
    }
  }

  &.is--multiple:not(.is--margin) {

    .vm-option {

      &.is--first {
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;

        &:not(.is--last) {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
      }

    &.is--last {
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;

      &:not(.is--first) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
    }

    .vm-option:not(.is--first):not(.is--last) {
      border-radius: 0;
    }
  }
}
</style>

