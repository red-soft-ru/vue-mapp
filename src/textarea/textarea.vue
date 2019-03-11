<script lang="ts">
import InputElement from '../input.mixin';
import autosize from '../helpers/autosize';
import { Component, Watch, Prop } from 'vue-property-decorator';
import VueMappInput from '../input/input.vue';

@Component({
  name: 'vm-textarea',
  components: {
    'vm-input': VueMappInput,
  },
})
export default class VueMappTextarea extends InputElement {
  inputValue: string | number = '';
  focused: boolean = false;

  @Prop([String, Number])
  rows: string | number;
  @Prop(String)
  placeholder: string;

  $refs: {
    textarea: HTMLInputElement;
    wrapper: HTMLDivElement;
    container: HTMLDivElement;
    label: HTMLDivElement;
    svgboxpath: SVGPathElement;
    input: any;
  };

  private get $_box(): boolean {
    const { form, box } = this;

    if (box !== null) {
      return !!box;
    } else {
      return !!(form && form.box);
    }
  }

  @Watch('box')
  updateView() {
    this.$nextTick(this.updateAutosize);
  }

  @Watch('value')
  updateFromPropValue(value) {
    if (value !== this.inputValue) {
      this.inputValue = value;
      this.$nextTick(() => {
        this.updateAutosize();
        this.drawBox();
      });
    }
  }

  onFocus($event) {
    if (/readonly|disabled/.test(this.status)) return;
    this.focused = true;
    this.$emit('focus', $event);
  }

  onBlur($event) {
    const { form } = this;

    this.focused = false;

    if ((form && !form.validateOnSubmit) || !this.novalidate) {
      this.validate();
    }

    this.$emit('blur', $event);
  }

  onInput($event) {
    if (this.$refs.textarea.value !== this.inputValue) {
      // this.VMInputCheckState = 'changed';
      this.$emit('input', $event.target.value);
      this.inputValue = $event.target.value;
    }
    this.drawBox();
  }

  drawBox() {
    this.$nextTick(() => {
      this.$refs.input.drawBoxSvg();
    });
  }

  updateAutosize() {
    autosize.update(this.$refs.textarea);
  }

  mounted() {
    this.inputValue = this.value;
    this.$nextTick(() => {
      autosize(this.$refs.textarea);
      this.updateAutosize();
    });
  }
}
</script>

<template>
  <vm-input
    ref="input"
    :label="label"
    :box="box"
    :expanded="focused || !!inputValue"
    class="vm-textarea"
  >
    <!-- <textarea
      ref="textarea"
      slot="main"
      :disabled="status === 'disabled'"
      :type="$_type"
      :name="name"
      :rows="rows"
      :placeholder="placeholder"
      :maxlength="$_maxlength === Infinity ? null : $_maxlength"
      :readonly="status === 'readonly'"
      :spellcheck="spellcheck"
      :autocomplete="autocomplete"
      :value="inputValue"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
      @keydown="drawBox"
    /> -->
    <textarea
      ref="textarea"
      slot="main"
      :disabled="status === 'disabled'"
      :name="name"
      :rows="rows"
      :placeholder="placeholder"
      :readonly="status === 'readonly'"
      :value="inputValue"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
      @keydown="drawBox"
    />
  </vm-input>
</template>

<style lang="scss">
.vm-textarea {

  textarea {
    z-index: 1;
    display: block;
    flex: 1 1;
    flex-grow: 1;
    min-height: 32px;
    padding: 4px 0;
    overflow: hidden;
    font-family: inherit;
    font-size: 1em;
    line-height: 24px;
    text-overflow: ellipsis;
    white-space: nowrap;
    resize: none;
    background: none;
    border: none;
    size: 100%;

    &[disabled] {
      opacity: 1;
    }

    &[readonly] {
      &:hover {
        text-overflow: initial;
      }
    }

    &::-webkit-input-placeholder {
      font-size: 1em;
      text-shadow: none;
      -webkit-text-fill-color: initial;
    }

    &:focus {
      outline: none;
    }

    &::placeholder {
      opacity: 0.54;
    }

    &.is--box {

      textarea {
        padding: 16px;
      }
    }
  }

  .vm-input__container {
    align-items: flex-start;
    height: auto !important;
  }
}
</style>

