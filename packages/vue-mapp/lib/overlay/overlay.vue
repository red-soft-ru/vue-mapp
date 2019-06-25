<script>
export default {
  name: 'VmOverlay',
}
</script>

<template>
  <div
    class="vm-overlay"
    v-on="$listeners"
  />
</template>

<style lang="scss">
.vm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 120vw;
  height: 120vh;
  background: var(--vm-overlay-bg);
  transform: translate(-10vw, -10vh);
  will-change: opacity;
}
</style>
