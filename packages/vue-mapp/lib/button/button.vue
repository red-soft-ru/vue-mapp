<script>
import VmLoader from 'vue-mapp/lib/loader'

export default {
  components: {
    VmLoader,
  },
  props: {
    type: {
      type: String,
      default: 'button',
    },
    look: {
      type: String,
      default: '',
      validator: v => !v || /outlined|raised|filled/.test(v),
    },
    color: {
      type: String,
      default: '',
      validator: v => !v || /primary|secondary|error|success|warning|/.test(v),
    },
    icon: {
      type: String,
      default: '',
    },
    corner: {
      type: String,
      default: '',
      validator: v => !v || /rounded/.test(v),
    },
    size: {
      type: String,
      default: '',
      validator: v => !v || /small|large|xlarge/.test(v),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    filled() {
      return /elevated|unelevated/.test(this.look)
    },
    colorClass() {
      const { color, filled } = this
      return filled ? `bg-${color}` : `text-${color}`
    },
  },
  methods: {
    click() {
      this.$nextTick(() => {
        this.$el.blur()
      })
    },
  },
}
</script>

<template>
  <button
    v-bind="$attrs"
    :type="type"
    :disabled="disabled || loading"
    :class="[
      colorClass,
      corner && 'vm-button--' + corner,
      size && !icon && 'vm-button--' + size,
      icon && 'vm-button--icon-' + size,
      {
        'vm-button--full': fullWidth,
        'vm-button--filled': filled,
        'vm-button--icon': icon,
        'vm-button--elevated': look === 'elevated',
      }
    ]"
    class="vm-button"
    v-on="$listeners"
    @click="click"
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

<style lang="scss">

.vm-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 88px;
  height: 36px;
  min-height: 2.57142857em;
  padding: 0 0.85714286em;
  margin: 8px;
  overflow: hidden;
  font-family: inherit;
  font-size: 14px;
  font-weight: var(--vm-font-medium);
  // color: $color-primary;
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
  // border-radius: $border-radius;
  outline: none;
  will-change: opacity;

  &::-moz-focus-inner {
    border: 0;
  }

  &:disabled {
    // color: $color-disabled;
    cursor: default;
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: '';
    background-color: currentColor;
    opacity: 0;
    transition: opacity 64ms linear;
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

  & + & {
    margin-left: 0;
  }

  &--filled {

    &:disabled {
      background: transparent;
      box-shadow: none;
    }

    &:disabled::before {
      opacity: 0.24;
    }
  }

  &--elevated {
    box-shadow: var(--vm-shadow-sm);
  }

  &--outlined {
    padding: 0 1em;
    border: 2px solid currentColor;
  }

  &--rounded {
    padding-right: 1rem;
    padding-left: 1rem;
    border-radius: 5rem;
  }

  &--full {
    width: 100%;
  }

  &--small {
    min-width: auto;
    height: 28px;
    font-size: 12px;
    font-weight: var(--vm-font-bold)
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
    width: 40px;
    min-width: auto;
    height: 40px;
    margin: 0;
    color: inherit;
    border: none;
    border-radius: 50%;
    opacity: .8;

    &:hover {
      opacity: 1;
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
