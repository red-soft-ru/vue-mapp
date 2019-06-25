<script>
export default {
  name: 'TheBox',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    padding: {
      type: String,
      default: '',
      validator: v => !v || /none/.test(v),
    },
    inline: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      pinned: false,
    }
  },
  computed: {
    showHeader() {
      return this.haveTitle || this.$slots.menu
    },
    haveTitle() {
      return this.$slots.header || this.title
    },
    headerTransparent() {
      return !this.haveTitle && this.$slots.menu
    },
  },
  methods: {
    handleScroll({ target: { scrollTop } }) {
      this.pinned = scrollTop > 0
    },
  },
}
</script>

<template>
  <div
    :class="{
      'the-box': true,
      'the-box--inline': inline,
    }"
  >
    <div
      v-if="showHeader"
      :class="{
        'the-box__header': true,
        'the-box__header--transparent': headerTransparent,
        'the-box__header--pinned': pinned,
      }"
    >
      <slot
        v-if="$slots.header"
        name="header"
      />
      <template v-else>
        <!-- <div class="the-box__title-wrapper"> -->
        <div
          class="the-box__title"
        >
          {{ title }}
        </div>
        <div class="the-box__menu">
          <slot name="menu" />
        </div>
      </template>
    </div>

    <div
      :class="{
        'the-box__body': true,
        'the-box__body--nopad': padding === 'none',
      }"
      data-scroll-lock-scrollable
      @scroll="handleScroll"
    >
      <slot />
    </div>

    <div
      v-if="$slots.footer"
      class="the-box__footer"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss">
.the-box {
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  background: var(--the-box-bg);

  &,
  &__body {
    border-radius: var(--the-box-radius);
  }

  &__header,
  &__body,
  &__footer {
    padding: 1.5rem;

    @include mq($from: md) {
      padding: 2.5rem;
    }
  }

  &__body {
    position: relative;
    flex-grow: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    -webkit-transform: translate3d(0,0,0);

    &:not(:last-child) {
      padding-bottom: 0;
    }

    &--nopad {
      padding: 0;
    }
  }

  &--inline {
    border-radius: 0;
    box-shadow: none;
  }

  &__footer,
  &__header {
    flex-shrink: 0;
  }

  &__header {
    position: relative;
    z-index: 1;
    display: flex;
    flex-shrink: 0;
    align-items: flex-start;
    justify-content: space-between;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    line-height: 1.25;
    border-top-left-radius: var(--the-box-radius);
    border-top-right-radius: var(--the-box-radius);
    transition: box-shadow .15s;

    &--transparent {
      background: inherit;
    }

    &--pinned {
      box-shadow: rem(6px 0 4px) 0 rgba(0, 0, 0, .2)
    }

  }

  &__header + &__body {
    padding-top: 2rem;
  }

  &__header--transparent + &__body {
    padding-top: 0;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom-right-radius: var(--the-box-radius);
    border-bottom-left-radius: var(--the-box-radius);
  }

  &__title {
    overflow: hidden;
    font-size: rem(22px);
    font-weight: var(--the-font-bold);
    line-height: rem(28px);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__subtitle {
    font-size: 1.12rem;
    color: var(--the-color-text-light);
  }

  &__menu {
    margin-right: -0.5rem;
    margin-left: 2rem;
  }
}
</style>
