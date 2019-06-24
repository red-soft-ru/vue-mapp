<template>
  <div class="shadow-lg" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ShadowLargeDemo extends Vue {}
</script>

<style scoped>
.shadow-lg {
  width: 60%;
  height: 60px;
  margin: 30px;
}
</style>
