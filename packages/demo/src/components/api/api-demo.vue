<script>
export default {
  name: 'ApiDemo',
  props: {
    component: {
      type: [Function, String],
      default: '',
    },
  },
}
</script>

<template>
  <div :class="$style.root">
    <div>
      <component :is="component" />
    </div>
  </div>
</template>

<style lang="scss" module>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 1rem;
}
</style>
