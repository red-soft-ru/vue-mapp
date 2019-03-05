<template>
  <button
    v-bind="$attrs"
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'vm-button',
      theme && 'vm-button--' + theme,
      corner && 'vm-button--' + corner,
      color && 'vm-button--' + color,
      size && 'vm-button--' + size,
      {
        'vm-button--full': fullWidth,
        'vm-button--filled': /raised/.test(theme),
        'vm-button--icon': !$slots.default,
      }
    ]"
    v-on="$listeners"
  >
    <span
      v-if="loading"
      class="vm-button__loader"
    >
      <slot
        v-if="$slots.loader"
        name="loader"
      />
      <vm-loader
        v-else
        size="xsmall"
      />
    </span>

    <span
      :class="{
        'vm-button__label': true,
        'vm-button__label--hidden': loading,
      }"
    >
      <vm-icon
        v-if="icon"
        :name="icon"
        :class="{
          'vm-button__icon': true,
          'vm-button__icon--single': !$slots.default,
        }"
      />
      <slot />
    </span>
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Icon } from 'vue-mapp/icon';
import { Loader } from 'vue-mapp/loader';

@Component({
  name: 'vm-button',
  components: {
    'vm-icon': Icon,
    'vm-loader': Loader
  }
})
export default class VueMappButton extends Vue {
  @Prop({
    type: String,
    default: 'button'
  })
  type: string;

  @Prop({
    type: String,
    default: '',
    validator: v => !v || /outlined|raised|filled/.test(v)
  })
  theme: string;

  @Prop({
    type: String,
    default: '',
    validator: v => !v || /accent|success|warning/.test(v)
  })
  color: string;

  @Prop({
    type: String,
    default: ''
  })
  icon: string;

  @Prop({
    type: String,
    default: '',
    validator: v => !v || /rounded/.test(v)
  })
  corner: string;

  @Prop({
    type: String,
    default: '',
    validator: v => !v || /small|large|xlarge/.test(v)
  })
  size: string;

  @Prop({
    type: Boolean,
    default: false
  })
  loading: boolean;

  @Prop({
    type: Boolean,
    default: false
  })
  disabled: boolean;

  @Prop({
    type: Boolean,
    default: false
  })
  fullWidth: boolean;
}
</script>

<style lang="scss">
@import "vars";

.vm-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 88px;
  height: 36px;
  min-height: 2.57142857em;
  padding: 0 0.85714286em;
  margin: 0;
  overflow: hidden;
  font-family: inherit;
  font-size: 14px;
  font-weight: $text-medium;
  color: $color-primary;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.08929em;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  background-color: transparent;
  border: none;
  border-radius: $border-radius;
  outline: none;
  will-change: opacity;

  &::-moz-focus-inner {
    border: 0;
  }

  &:disabled {
    color: $color-disabled;
    cursor: default;
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: "";
    background-color: currentColor;
    opacity: 0;
    transition: opacity 16ms linear;
  }

  &:hover::before {
    opacity: 0.08;
  }

  &:focus::before {
    opacity: 0.14;
  }

  &:active::before {
    opacity: 0.18;
  }

  &:disabled::before {
    opacity: 0;
  }

  &--success {
    color: $color-success;
  }

  &--warning {
    color: $color-warning;
  }

  &--accent {
    color: $color-accent;
  }

  &--filled {
    color: $color-primary-text;
    background: $color-primary;

    // Find a way to do this better
    &.vm-button--accent {
      background: $color-accent;
    }

    &.vm-button--warning {
      background: $color-warning;
    }

    &.vm-button--success {
      background: $color-success;
    }

    &:disabled {
      background: transparent;
      box-shadow: none;
    }

    &:disabled::before {
      opacity: 0.24;
    }
  }

  &--raised {
    box-shadow: $shadow-2;
  }

  &--outlined {
    padding: 0 1em;
    border: 2px solid currentColor;
  }

  &--rounded {
    padding-right: 16px;
    padding-left: 16px;
    border-radius: 5rem;
  }

  &--full {
    width: 100%;
  }

  &--small {
    min-width: auto;
    height: 28px;
    font-size: 12px;
  }

  &--large {
    height: 44px;
    font-size: 14px;
  }

  &--xlarge {
    height: 52px;
    font-size: 16px;
  }

  &--icon {
    min-width: auto;
    height: auto;
    padding: 0;
    color: inherit;
    border: none;

    &::before {
      content: none;
    }
  }

  &__label {
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    justify-content: center;
    text-decoration: none;

    &--hidden {
      visibility: hidden;
    }
  }

  &__icon {
    margin-right: 0.33333333em;
    margin-left: -0.08333333em;
    font-size: 1.71428571em;

    &--single {
      margin-right: 0;
      margin-left: 0;
    }
  }

  &__loader {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
}
</style>
