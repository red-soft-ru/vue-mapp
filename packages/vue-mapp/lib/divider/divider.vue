<script>
export default {
  name: 'VmDivider',
}
</script>

<template>
  <hr class="vm-divider">
</template>

<style lang="scss">

.vm-divider {
  display: block;
  flex-shrink: 0;
  width: 100%;
  height: 0;
  padding: 0;
  margin: 0;
  border-color: var(--vm-color-divider);
  border-style: solid;
  border-width: 0 0 1px;
}
</style>
