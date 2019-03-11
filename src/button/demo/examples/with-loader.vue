<template>
  <vm-button
    @click="onClick"
    :loading="loading"
    color="success"
    theme="outlined"
  >
    Loading
  </vm-button>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ButtonWithLoader extends Vue {

  loading: boolean = true;

  onClick() {
    // console.warn('Clicked');
  }
}
</script>

