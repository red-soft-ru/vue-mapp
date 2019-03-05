<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ApiDemo extends Vue {

  @Prop({
    type: String,
    default: '',
  })
  component: string;
}
</script>

<template>
  <div>Demo</div>
</template>

<style lang="postcss">
.root {
  width: 100%;
}
</style>
