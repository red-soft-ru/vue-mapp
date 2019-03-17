<template>
  <div class="shadow-xl" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ShadowHighDemo extends Vue {}
</script>

<style scoped>
.shadow-xl {
  width: 60%;
  height: 60px;
  margin: 30px;
}
</style>
