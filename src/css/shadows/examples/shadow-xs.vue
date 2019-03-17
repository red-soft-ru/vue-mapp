<template>
  <div class="shadow-xs" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ShadowLowDemo extends Vue {}
</script>

<style scoped>
.shadow-xs {
  width: 60%;
  height: 60px;
  margin: 30px;
}
</style>
