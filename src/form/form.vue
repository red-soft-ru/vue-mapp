<script lang="ts">
// import InputElement from 'component/input/input-element';
import InputElement from '../input.mixin';
import { Component, Prop } from 'vue-property-decorator';
import { VMInputState } from '../types';
import { VueMappSubmitData } from './types';

@Component({
  name: 'vm-form',
  provide() {
    return {
      form: this,
    };
  },
})
export default class VueMappForm extends InputElement {
  changed: boolean = false;
  inputComponents: InputElement[] = [];

  @Prop({
    type: Boolean,
    default: true,
  })
  freezeOnSubmit: boolean;

  @Prop([Boolean, String])
  submitOnEnter: string | boolean;

  @Prop([Boolean, String])
  validateOnSubmit: string | boolean;

  private onEnterSubmit() {
    if (this.submitOnEnter) {
      this.submit();
    }
  }

  submit(event?): void {
    if (this.freezed) return;

    const data = {};

    const promises: Promise<any>[] = [];

    this.inputComponents.forEach((cmp: InputElement) => {
      if (cmp.emitValue !== undefined && cmp.name) {
        data[cmp.name] = cmp.emitValue;
      }

      if (cmp.validateStatus !== undefined && !cmp.novalidate) {
        promises.push(cmp.validate());
      }
    });

    Promise.all(promises).then(result => {
      const allValid: boolean = result.every(status => {
        return /valid|novalidate/.test(status);
      });

      if (allValid) {
        const submitData: VueMappSubmitData<object> = {
          data: JSON.parse(JSON.stringify(data)),
          event: event || null,
          form: this,
        };

        if (this.freezeOnSubmit) {
          this.injectStatus = 'readonly';
        }

        this.$emit('submit', submitData);
        this.changed = false;
      }
    });
  }

  clear() {
    this.inputComponents.forEach(cmp => {
      if (cmp.clear instanceof Function) {
        cmp.clear();
      }
    });
  }

  change() {
    this.$emit('change');
    this.changed = true;
  }

  enable() {
    this.injectStatus = 'init';
  }
}
</script>

<template>
  <form
    :class="{
      'is--readonly': readonly
    }"
    @input="changed = true"
    @change="changed = true"
    @submit.prevent="submit"
    @keydown.enter="onEnterSubmit"
    class="vm-form"
  >
    <slot />
  </form>
</template>

<style lang="scss">
.vm-form {
  will-change: opacity;

  .vm-input {
    margin-bottom: 24px;
  }
}
</style>

