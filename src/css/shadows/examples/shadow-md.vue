<template>
  <div class="shadow-md" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ShadowMediumDemo extends Vue {}
</script>

<style scoped>
.shadow-md {
  width: 60%;
  height: 60px;
  margin: 30px;
}
</style>
