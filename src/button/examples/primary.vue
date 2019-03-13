<template>
  <vm-button
    @click="onClick"
    color="success"
  >
    Success Button
  </vm-button>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ButtonPrimaryDemo extends Vue {

  onClick() {
    this.$snackbar.show({
      text: 'Привет',
      actionLabel: 'Закрыть',
    });
  }
}
</script>

