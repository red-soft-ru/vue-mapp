<template>
  <div class="shadow-sm" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ShadowSmallDemo extends Vue {}
</script>

<style scoped>
.shadow-sm {
  width: 60%;
  height: 60px;
  margin: 30px;
}
</style>
