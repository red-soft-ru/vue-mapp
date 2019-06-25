<template>
  <div class="vm-layout">
    <vm-outside
      name="vm-layout-aside"
      position="left"
    >
      <slot name="sidebar" />
    </vm-outside>
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
        <vm-button
          icon="settings"
          @click="showMenu"
        />
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
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #edeef0;

  &__nav {
    top: 0;
    left: 0;
    z-index: 20;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 18rem;
    height: 100vh;
    background: #FFF;
    outline: none;
    box-shadow: var(--vm-shadow-md);
    // box-shadow: 0 1px 5px 0 rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
    transition: transform .4s cubic-bezier(.25,.8,.25,1);
    will-change: transform;

    &.is--hidden {
      transform: translateX(-105%);
    }

    .vm-layout.is--fixed & {
      position: relative;
      flex-shrink: 0;
      box-shadow: var(--vm-shadow-md);
      transition: none;
    }
  }

  &__wrapper {
    width: 100%;
  }
}
</style>
