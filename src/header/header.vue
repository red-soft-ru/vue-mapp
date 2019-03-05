<template>
  <div
    :class="[
      'vm-header',
      color && 'vm-header--' + color,
      size && 'vm-header--' + size,
      theme && 'vm-header--' + theme,
    ]"
  >
    <div
      v-if="$slots.trigger"
      class="vm-header__trigger"
    >
      <slot name="trigger" />
    </div>

    <h6 class="vm-header__title">
      <slot name="title" />
      {{ title }}
    </h6>

    <div class="vm-header__icons">
      <slot name="icons" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class VmHeader extends Vue {

  @Prop({
    type: String,
    default: '',
  })
  title: string;

  @Prop({
    type: String,
    default: '',
    validator: v => !v || /small|medium|large/.test(v)
  })
  size: string;

  @Prop({
    type: String,
    default: '',
    validator: v => !v || /accent|success|warning|primary/.test(v)
  })
  color: string;

  @Prop({
    type: String,
    default: '',
    validator: v => !v || /shadow|border/.test(v)
  })
  theme: string;
}
</script>

<style lang="scss">
@import "vars";

.vm-header {
  z-index: 1;
  display: flex;
  align-items: center;
  width: 100%;
  height: 64px;

  &--primary {
    color: $color-primary-text;
    background: $color-primary;
  }

  &--border {
    border-color: $color-divider;
    border-style: solid;
    border-width: 0 0 1px;
  }

  &--shadow {
    box-shadow: $shadow-2;
  }

  &__title {
    flex-grow: 1;
    text-align: left;

    > a {
      color: inherit;
      text-decoration: none;
    }
  }

  &__trigger {
    position: relative;
    flex-shrink: 0;
    width: 64px;
  }
}
</style>
