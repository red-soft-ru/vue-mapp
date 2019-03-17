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

    <h6
      v-if="$slots.title || title"
      :class="[
        'vm-header__title',
        size && 'vm-header__title--' + size,
      ]"
    >
      <slot name="title" />
      {{ title }}
    </h6>

    <div class="vm-header__center">
      <slot name="center" />
    </div>

    <div class="vm-header__body">
      <slot />
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
    validator: v => !v || /xsmall|small/.test(v)
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
  flex-shrink: 0;
  align-items: center;
  width: 100%;
  height: 64px;
  padding-right: 20px;
  padding-left: 20px;

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
    box-shadow: $shadow-sm;
  }

  &--xsmall {
    height: 40px;
  }

  &--small {
    height: 56px;
  }

  &__title {
    text-align: left;

    &--xsmall {
      font-size: 16px;
    }

    &--small {
      font-size: 18px;
    }

    > a {
      color: inherit;
      text-decoration: none;
    }
  }

  &__center {
    flex-grow: 1;
  }

  &__body {

    > .vm-button:last-child {
      margin-right: -8px;
    }
  }

  &__trigger {
    position: relative;
    flex-shrink: 0;
    margin-right: 16px;
    margin-left: -4px;
  }
}
</style>
