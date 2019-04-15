<script>
export default {
  name: 'VmChip',
  methods: {
    close() {
      this.$emit('close')
    },
    click() {
      this.$emit('click')
    },
  },
}
</script>

<template>
  <div class="vm-chip">
    <div
      @click="click"
      class="vm-chip__label"
    >
      <slot />
    </div>
    <vm-button
      @click="close"
      class="vm-chip__close"
      icon="cancel"
      noshadow
    />
  </div>
</template>

<style lang="scss">
.vm-chip {
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: calc(100% - 8px);
  height: 32px;
  padding-right: 4px;
  padding-left: 12px;
  margin: 2px 4px 2px 0;
  white-space: nowrap;
  background: var(--vm-color-bg-dark);
  border-radius: 28px;

  &__label {
    // TODO mixin (branch card)
    // @apply --text-nowrap;
  }

  &__close {
    margin-left: 8px;

    i {
      font-size: 22px;
    }
  }

  .vm-chip__close {
    padding: 0 2px;
  }
}

</style>
