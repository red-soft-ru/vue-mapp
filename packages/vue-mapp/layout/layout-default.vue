<template>
  <div class="vm-layout">
    <nav
      v-if="$slots.sidebar"
      class="vm-layout__nav"
    >
      <slot name="sidebar" />
    </nav>
    <vm-outside name="vm-layout-aside" />
    <div class="vm-layout__wrapper">
      <vm-header
        class="vm-layout__header bg-primary"
        title="Настройки"
        view="shadow"
      >
        <vm-button
          slot="trigger"
          icon="menu"
          @click="showMenu"
        />
        <vm-button icon="settings" />
        <slot name="header" />
      </vm-header>
      <main class="vm-layout__main">
        <slot />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VmLayoutDefault',
  props: {
    nav: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    showMenu() {
      this.$modal.show('vm-layout-aside')
    },
  },
}
</script>

<style lang="scss">
.vm-layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  background-color: #edeef0;

  &__nav {
    // position: fixed;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    z-index: 20;
    will-change: transform;
    outline: none;
    left: 0;
    top: 0;
    box-shadow: var(--vm-shadow-md);
    height: 100vh;
    width: 18rem;
    transition: transform .4s cubic-bezier(.25,.8,.25,1);
    box-shadow: 0 1px 5px 0 rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
    background: #FFF;

    &.is--hidden {
      transform: translateX(-105%);
    }

    .vm-layout.is--fixed & {
      position: relative;
      box-shadow: var(--vm-shadow-md);
      flex-shrink: 0;
      transition: none;
    }
  }

  &__wrapper {
    width: 100%;
  }
}
</style>
