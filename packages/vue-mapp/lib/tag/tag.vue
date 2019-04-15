<script>
export default {
  name: 'VmTag',
}
</script>

<template>
  <div class="vm-tag">
    <slot />
  </div>
</template>

<style lang="scss">
.vm-tag {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 8px;
  font-weight: 500;
  line-height: 1;
  text-transform: uppercase;
  background: var(--vm-color-bg-dark);
  border-radius: 2px;

  + .vm-tag {
    margin-left: 8px;
  }
}

</style>
