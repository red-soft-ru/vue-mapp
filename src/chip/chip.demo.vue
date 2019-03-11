<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: '',
})
export default class ChipDemo extends Vue {
  chips: string[] = ['first', 'second', 'third', 'fourth', 'fifth'];

  close(idx) {
    this.chips.splice(idx, 1);
  }
}
</script>

<template>
  <div class="wrapper">
    <vm-chip
      v-for="(chip, idx) in chips"
      :key="idx"
      @close="close(idx)"
    >
      {{ chip }}
    </vm-chip>
  </div>
</template>

<style lang="scss">
.wrapper {
  display: flex;
}
</style>

