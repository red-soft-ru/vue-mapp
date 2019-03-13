<script lang="ts">
import InputElement from '../input.mixin';
import { VueConstructor } from 'vue/types/vue';
import { Component, Prop, Watch, Provide } from 'vue-property-decorator';
import VueMappInput from '../input/input.vue';
import VueMappMenu from '../menu/menu.vue';
import VueMappButton from '../button/button.vue';
import VueMappCheckbox from '../checkbox/checkbox.vue';
import VueMappOption from '../option/option.vue';
import VueMappChip from '../chip/chip.vue';
import VueMappDivider from '../divider/divider.vue';
import VueMappLoader from '../loader/loader.vue';
import VueMappPopup from '../popup/popup.vue';
import { removeFromArray } from '../helpers/modify';

@Component({
  name: 'vm-select',
  model: {
    prop: 'value',
    event: 'select'
  },
  inheritAttrs: false,
  components: {
    'vm-input': VueMappInput,
    'vm-button': VueMappButton,
    'vm-menu': VueMappMenu,
    'vm-checkbox': VueMappCheckbox,
    'vm-chip': VueMappChip,
    'vm-divider': VueMappDivider,
    'vm-loader': VueMappLoader
  }
})
export default class VueMappSelect extends InputElement {
  opened: boolean = false;
  selectedOption: VueMappOption | null = null;
  selectedOptions: VueMappOption[] = [];
  options: VueMappOption[] = [];
  fieldValue: string = '';
  popupFilterValue: string = '';
  noFilteredOptions: boolean = false;
  // TODO добавил:
  loading: boolean = false;

  $refs: {
    menu: VueMappMenu,
    menuInput: VueMappInput,
    popup: VueMappPopup,
    options: HTMLElement
  };

  @Provide() optionContainer = this;
  @Prop(Boolean) filter: string;
  @Prop(String) placeholder: string;
  @Prop(Boolean) multiple: boolean;
  @Prop(Boolean) hideArrow: boolean;
  @Prop(Boolean) multiline: boolean;
  @Prop({
    type: Boolean,
    default: true,
  }) showClearButton: boolean;

  @Watch('value')
  updateFromModel(modelValue) {
    if (modelValue === this.emitValue) return;

    if (modelValue instanceof Array) {
      const { options } = this;

      for (let i = 0; i < options.length; i++) {
        const option = options[i];

        option.selected = modelValue.indexOf(option.value) >= 0;
      }
    }
  }

  @Watch('multiple')
  transformValue(multiple) {
    const { selectedOption } = this;

    if (multiple) {
      if (selectedOption) {
        this.setOption(selectedOption);
        this.selectedOption = null;
      }
      this.fieldValue = '';
    } else {
      this.selectedOptions.forEach((option, idx) => {
        if (idx === 0) {
          this.setOption(option);
        } else {
          option.selected = false;
        }
      });
      this.selectedOptions = [];
    }
  }

  get emitValue() {
    if (this.multiple) {
      return this.selectedOptions.map(option => option.value);
    } else {
      return this.selectedOption ? this.selectedOption.value : null;
    }
  }

  private get isAsync(): boolean {
    return /async/.test(this.filter);
  }

  get modelIsArray() {
    return this.multiple || this.value instanceof Array;
  }

  get optionComponent(): VueConstructor | null {
    return this.modelIsArray ? VueMappCheckbox : null;
  }

  get filterInField(): boolean {
    return /field/.test(this.filter);
  }

  get isEmpty(): boolean {
    const { emitValue } = this;

    if (this.modelIsArray) {
      return emitValue && emitValue.length === 0;
    } else {
      return emitValue === null;
    }
  }

  private setOptionsVisibility(text: string): void {
    const searchRegex = new RegExp(text, 'i');
    const { options } = this;

    let finded = false;

    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      const matched = searchRegex.test(option.text);

      option.hidden = !matched;
      finded = matched;
    }

    this.popupFilterValue = text;
    this.noFilteredOptions = !finded;
  }

  private clearPopupFilter(): void {
    this.$refs.menuInput.clear();
    this.popupFilterValue = '';

    this.options.forEach(option => {
      option.hidden = false;
    });
  }

  private onFilterInput(inputValue: string): void {

    if (this.filterInField) {

      if (!inputValue && this.fieldValue) {
        this.clear();
      } else {
        this.fieldValue = inputValue;
      }
    } else {
      this.popupFilterValue = inputValue;
    }

    if (this.isAsync) {
      this.setOptionsVisibility(inputValue);
    }

    this.$emit('input', inputValue);
  }

  setOption(option: VueMappOption): void {

    if (this.multiple) {
      this.setOptionMultiple(option);
    } else {
      this.setOptionSingle(option);
      this.hide();
    }

    this.$emit('select', this.emitValue);

    this.form && this.form.change();
  }

  private setOptionSingle(option: VueMappOption) {
    const { selectedOption } = this;

    if (selectedOption && selectedOption !== option) {
      selectedOption.selected = false;
    }

    this.selectedOption = option;
    this.fieldValue = option.text;
  }

  private setOptionMultiple(option: VueMappOption) {
    const selectedOptions = this.selectedOptions.slice();

    if (option.selected) {
      selectedOptions.push(option);
    } else {
      removeFromArray(selectedOptions, option);
    }

    selectedOptions.sort(((a, b) => a.text.length - b.text.length));
    this.selectedOptions = selectedOptions;
  }

  removeOption(option: VueMappOption) {
    option.selected = false;
    this.setOption(option);
  }

  clear(): void {
    this.selectedOption = null;
    this.fieldValue = '';
    this.popupFilterValue = '';
    this.noFilteredOptions = false;

    this.selectedOptions.forEach(option => {
      option.selected = false;
      option.hidden = false;

      if (option.init) {
        this.setOption(option);
      }
    });

    this.selectedOptions = [];
    this.$emit('select', '');
  }

  hide() {
    const { selectedOption } = this;

    if (!this.multiple) {

      if (selectedOption) {
        this.fieldValue = selectedOption.text;
      } else {
        this.fieldValue = '';
      }
    }

    this.opened = false;
    this.$emit('close');
  }

  show() {
    this.opened = true;
    this.$emit('focus');
    this.$refs.popup.saveOpenedContentRect();
    this.$refs.popup.setPosition();
  }

  get fieldClickable() {
    return !this.multiple && !this.filterInField;
  }

  private onFieldInput(e) {
    this.onFilterInput(e);
  }

  private onFieldFocus() {
    this.show();
  }

  private onFieldBlur() {
    this.opened ? null : this.hide();
  }

  private onFieldClick() {
    if (this.fieldClickable) {
      this.show();
    }
  }

  // private onMenuExpanded(): void {
  //     this.scrollToActiveItem();
  //     window.addEventListener('keydown', this.onKeyPress);
  // }

  // private scrollToActiveItem(): void {
  //     const { multiple, firstOption } = this;

  //     if (multiple || !firstOption) return;

  //     this.$nextTick(() => {
  //         const optionTop = firstOption.$el.offsetTop;
  //         const optionHeight = firstOption.$el.clientHeight;
  //         const container = this.$refs.items.parentElement
  //         const { offsetHeight, scrollHeight } = container;
  //         const topMax = offsetHeight - optionHeight;
  //         const scrollMax = scrollHeight - offsetHeight;
  //         const scrollTop = Math.min(optionTop - offsetHeight + optionHeight * 2, scrollMax);

  //         container.scrollTop = scrollTop;
  //     })
  // }
}
</script>

<template>
  <div
    :class="{
      'is--multiple': multiple,
      'is--opened': opened,
      'is--dirty': !isEmpty
    }"
    class="vm-select"
  >
    <vm-input
      :class="{
        'is--active': filterInField,
        'is--inline': !multiple && !filterInField
      }"
      :value="fieldValue"
      :expanded="!isEmpty"
      :label="label"
      :disabled="disabled"
      :readonly="multiple || !filterInField"
      :placeholder="placeholder"
      :box="box"
      :size="size"
      :showClearButton="hideArrow && showClearButton && !loading"
      @input="onFieldInput"
      @focus="onFieldFocus"
      @blur="onFieldBlur"
      @click.native="onFieldClick"
      class="vm-select__field"
    >
      <template
        slot="entry"
        v-if="multiple"
      >
        <vm-chip
          v-for="option in selectedOptions"
          @close="removeOption(option)"
          static="static"
        >
          {{ option.text }}
        </vm-chip>
      </template>
      <vm-button
        slot="right"
        v-if="!hideArrow"
        :disabled="disabled"
        @click="show"
        class="vm-select__arrow"
        icon="arrow_drop_down"
      />
      <vm-loader
        slot="right"
        v-if="loading"
      />
    </vm-input>
    <vm-popup
      ref="popup"
      v-show="opened"
      v-bind="$attrs"
      :fillTrigger="true"
      :closeOnSelect="!multiple"
      :floatTrigger="filterInField"
      @outside="hide"
      root-class="vm-select"
    >
      <div
        v-if="modelIsArray && !filterInField"
        class="vm-select__toolbar"
      >
        <vm-input
          ref="popupInput"
          :box="false"
          :value="popupFilterValue"
          @input="onFilterInput"
          placeholder="Поиск"
          size=""
        >
          <vm-button
            slot="right"
            v-if="popupInput"
            @click="clearPopupFilter"
            title="Очистить фильтр"
            icon="keyboard_backspace"
          />
          <vm-button
            slot="right"
            @click="opened = false"
            class="vm-select__toolbar-close"
            title="Закрыть"
            icon="close"
          />
        </vm-input>
      </div>
      <div
        ref="options"
        :class="{ 'is--multiline': multiline }"
        class="vm-select__options"
      >
        <slot />
        <div
          v-if="noFilteredOptions"
          class="vm-select__options-empty"
        >
          Записи не найдены
        </div>
      </div>
      <template v-if="modelIsArray && showClearButton && !filterInField">
        <vm-divider />
        <div class="vm-select__footer">
          <vm-button>Сбросить</vm-button>
        </div>
      </template>
    </vm-popup>
  </div>
</template>

<style lang="scss">
@import 'vars';
@import './theme.scss';

$select-toolbar-height: 46px;

.vm-select {

  &__arrow {

    .vm-icon {
      font-size: 28px;
    }
  }

  .vm-option {
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 44px;
    padding: 12px 16px;

    &:not([disabled])::after {
       content: '';
    }

    .vm-checkbox__label {
      margin-left: 24px;
    }
  }

  &:not(.is--multiple) {

    .vm-option {

       &.is--selected {
        font-weight: 500;
      }
    }
  }

  &__options {
    height: 100%;
    padding: 6px 0;
    overflow: auto;

    &:not(.is--multiline) {

      .vm-option__label,
      .vm-checkbox__label {
        @apply --text-nowrap;
      }
    }

    &-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 48px;
    }
  }

  &__toolbar {
    position: relative;
    display: flex;
    flex: 0 0 auto;
    flex-direction: row;
    align-items: center;

    .vm-input {
      padding: 0;
      margin: 0;
    }

    .vm-input__right {
      padding-right: 8px;
    }

    + .vm-select__options {
      height: calc(100% - $select-toolbar-height);
    }

    input {
      min-height: $select-toolbar-height;
      padding-left: 16px;
    }
  }

  &__footer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 8px;
  }

  .vm-input {

    &.is--inline {

      input {
        cursor: pointer;
      }
    }
  }

  &.is--multiple {

    .vm-input__main {
      margin-top: 4px;

      & > * {
        margin: 0 4px 4px 0;
      }
    }

    .vm-chip + input {
      margin-left: 6px;
    }

    .vm-input {

      &.is--active {

        input {
          min-width: 104px;
        }
      }
    }

    &.is--dirty {

      & > .vm-input:not(.is--active) {

        input {
          max-width: 0;
          margin: 0;
        }
      }
    }
  }
}
</style>
