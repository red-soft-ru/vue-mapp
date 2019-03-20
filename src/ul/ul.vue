<script lang="ts">
import { Vue, Component, Prop, Provide, Inject } from 'vue-property-decorator';

@Component({
  name: 'vm-ul'
})
export default class VueMappList extends Vue {

  @Provide()
  container: VueMappList = this;

  @Prop([String, Boolean])
  nav: string | boolean;

  @Prop([String, Boolean])
  icon: string | boolean;

  @Prop([String, Boolean])
  nowrap: string | boolean;

  @Prop([String, Boolean])
  expanded: string | boolean;

  @Prop(Boolean)
  disabled: boolean;

  @Prop({
    type: String,
    default: ''
  })
  label: string;

  @Prop({
    type: String,
    default: '',
    validator: v => !v || /border/.test(v)
  })
  theme: string;
}
</script>

<template>
  <div
    :class="[
      {
        'is--nav': nav,
        'is--icon': icon,
        'is--nowrap': nowrap,
        'is--disabled': disabled,
      },
      theme && 'vm-list--' + theme,
    ]"
    class="vm-list"
  >
    <div
      v-if="label"
      class="vm-list__label subtitle-2"
    >
      {{ label }}
    </div>
    <div
      v-if="theme === 'border'"
      :class="{ 'is--label': label }"
      class="vm-list__border"
    />
    <slot />
  </div>
</template>

<style lang="scss">
@import 'vars';

.vm-list {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  list-style: none;

  &__label {
    display: flex;
    padding: 10px 16px;
  }

  &__item {
    position: relative;
    flex-shrink: 0;
    height: auto;
    min-height: 40px;
    overflow: hidden;

    &-row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
    }

    &::before, &::after {
      position: absolute;
      left: 0;
      width: 100%;
      height: 1px;
      background: $color-divider;
    }

    .vm-list__border {
      position: absolute;
      top: 10px;
      bottom: 10px;
      left: 18px;
      display: block;
      width: 2px;
      content: '';
      background: $color-divider;

      &.is--label {
        top: 54px;
      }
    }

    &.is--opened {

      // &::before, &::after {
      //   content: '';
      // }
    }

    &.is--opened + &.is--opened {

      &::before {
        display: none;
      }
    }

    &::before {
      top: 0;
    }

    &::after {
      bottom: 0;
    }

    &-head {
      position: relative;
      display: flex;
      flex-direction: column;
      min-height: 2.85714286em;
      padding: 10px 16px;
      padding-right: 12px;
      margin: 0;
      line-height: 24px;
      color: inherit !important;
      text-decoration: none;
      text-transform: none;
      user-select: none;

      &::after {
        content: '';
      }

      & > i:first-child {
        position: absolute;
        top: 10px;
        left: 16px;
        font-size: 24px;
        opacity: .56;

        .vm-list__item.is--active & {
          opacity: 1;
        }
      }

      .vm-list.is--icon & {
        padding-left: 64px;
      }

      .is--singleline {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }

    &-subtitle {
      max-height: 20px;
      font-size: 14px;
      opacity: .54;
    }

    & & .vm-list__border {
      position: absolute;
      top: 10px;
      bottom: 10px;
      left: 3px;
      display: block;
      width: 2px;
      content: '';
      background: $color-divider;

      &.is--label {
        top: 54px;
      }
    }

    & & &-head {
      padding-left: 48px;

      & .vm-list.is--icon {
        padding-left: 64px;
      }
    }

    &.is--active {
      color: $color-primary;
    }

    &-expander {
      position: static !important;
      color: $color-text-light;

      .vm-list__item.is--closed & {
        transform: rotateZ(180deg) translate3d(0, 0, 0);
      }
    }
  }

  &:not(.is--disabled) {

    .vm-list__item-head {
      position: relative;
      z-index: 1;
      cursor: pointer;
      transition: background .05s cubic-bezier(.25,.8,.25,1);
      will-change: background, color;

      &::after {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
      }

      &:hover::after {
        background: rgba(0,0,0,.05);
      }

      &:active::after {
        background: rgba(0,0,0,.08);
      }
    }
  }

  &__expand {

    .vm-list__item.is--closed & {
      height: 0 !important;
    }
  }

  &.is--nowrap {

    .vm-list__item * {
      @apply --text-nowrap;
    }
  }

  .vm-divider {
    margin: 8px 0;
  }

  &.is--nav > .vm-list__item > .vm-list__item-head {
    font-weight: 500;
  }
}
</style>
