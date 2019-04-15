<script>
export default {
  name: 'VmBox',
}
</script>

<template>
  <div class="vm-box">
    <div class="vm-box__header">
      <slot name="header" />
    </div>
    <div class="vm-box__body">
      <slot />
    </div>
    <div class="vm-box__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss">
.vm-box {
  display: flex;
  flex-direction: column;
  border-radius: var(--vm-radius-box);

  &__header {
    flex-shrink: 0;
  }

  &__body {
    padding: 202px;
    overflow: auto;
  }

  &__footer {
    flex-shrink: 02;
  }
}
</style>
