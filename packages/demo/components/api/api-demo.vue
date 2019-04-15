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
    <div>
      <component :is="component" />
    </div>
  </div>
</template>

<style lang="postcss" module>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;

  @apply p-5;
}
</style>
