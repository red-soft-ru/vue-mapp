<template>
  <vm-button
    @click="click"
    color="success"
  >
    Success Button
  </vm-button>
</template>

<script>
export default {
  methods: {
    click() {
      this.$snackbar.show({
        text: 'Привет',
        actionLabel: 'Закрыть',
      });
    }
  }
}
</script>
