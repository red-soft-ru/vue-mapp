<script lang="ts">
export default {
  name: 'VmIcon',
  props: {
    library: {
      type: String,
      default: 'material-icons',
    },
    size: {
      type: [String, Number],
      default: '',
      validator: v => {
        return typeof (v) === 'number' ||
          !v ||
          /xsmall|small|large|xlarge/.test(v)
      },
    },
    name: {
      type: String,
      default: '',
    },
  },
}
</script>

<template>
  <i
    :class="[
      'vm-icon',
      library,
    ]"
    :style="{
      'font-size': 20
    }"
  >
    <slot />
    {{ name }}
  </i>
</template>

<style lang="scss">

.vm-icon {
  display: inline-block;
  min-width: 1em;
  min-height: 1em;
  font-size: 1.5rem;
  vertical-align: middle;
  user-select: none;
  fill: currentColor;
  text-rendering: optimizeLegibility;
}
</style>
