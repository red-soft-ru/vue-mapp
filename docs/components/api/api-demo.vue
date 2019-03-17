<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ApiDemo extends Vue {

  @Prop({
    type: [Function, String],
    default: '',
  })
  component: any;
}
</script>

<template>
  <div :class="$style.root">
    <component :is="component" />
  </div>
</template>

<style lang="postcss" module>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  @apply p-5;
}
</style>
