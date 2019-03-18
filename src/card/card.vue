<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'vm-card'
})
export default class VueMappCard extends Vue {

  @Prop({
    type: String,
    default: '',
    validator: v => !v || /none|flat/.test(v)
  })
  shadow: string;

  @Prop({
    type: String,
    default: '',
    validator: v => !v || /corner|rounder/.test(v)
  })
  rounding: string;

  @Prop({
    type: Boolean,
    default: false
  })
  hoverup: boolean;

  @Prop({
    type: String,
    default: ''
  })
  title: string;
}
</script>

<template>
  <div class="vm-card">
    <div
      :class="[
        { 'vm-card__wrapper--hoverup': hoverup },
        rounding && 'vm-card__wrapper--' + rounding,
        shadow && 'vm-card__wrapper--' + shadow
      ]"
      class="vm-card__wrapper"
    >
      <div
        v-if="$slots.title || $slots.header || title"
        class="vm-card__header"
      >
        <div
          v-if="$slots.title || title"
          class="vm-card__title"
        >
          {{ title }}
          <slot name="title" />
        </div>
        <slot name="header" />
        <div class="vm-card__icons">
          <slot name="icons" />
        </div>
      </div>
      <div
        v-if="$slots.content"
        class="vm-card__content"
      >
        <slot name="content" />
      </div>
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@import 'vars';

$card-header-height: 60px;
$card-padding: 20px;

/*
 *  TODO add stylelint rule?
 *
 *  "at-rule-no-unknown": [
 *    true,
 *    {
 *      "ignoreAtRules": [
 *        "mixin",
 *        "include"
 *      ]
 *    }
 *  ]
 */

// @mixin text-nowrap {
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
// }

.vm-card {

  &__wrapper {
    position: relative;
    background: $color-bg-light;
    border-radius: 2px;
    box-shadow: $shadow-xs;

    &--none {
      box-shadow: none;
    }

    &--flat {
      box-shadow: $shadow-xs;
    }

    &--hoverup {

      &:hover {
        box-shadow: $shadow-sm;
        transition: box-shadow $transition-ease-out;
      }
    }

    &--corner {
      border-radius: 0;
    }

    &--rounder {
      border-radius: 8px;
    }
  }

  &__content {
    padding: $card-padding;
  }

  &__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: $card-header-height;
    padding-right: calc($card-padding / 2);
    padding-left: $card-padding;

    + .vm-card__content {
      padding-top: 0;
    }
  }

  &__title {
    display: flex;
    flex: 1 1 auto;
    margin: 0;
    font-size: 1.28571429em;
    font-weight: 500;
    line-height: $card-header-height;

    // @include text-nowrap;
  }

  &__icons {
    margin-left: $card-padding;
  }

  .vm-list__item-head {
    padding-left: $card-padding;
  }
}
</style>
