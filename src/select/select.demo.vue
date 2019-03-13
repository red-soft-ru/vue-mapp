<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: '',
})
export default class SelectDemo extends Vue {
  states: string[] = ['first', 'second', 'third'];
}
</script>

<template>
  <vm-select placeholder="Укажите значение">
    <vm-option
      v-for="(state, key) in states"
      :value="key"
      :label="state"
      :key="key"
    />
  </vm-select>
</template>

<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
}
</style>


