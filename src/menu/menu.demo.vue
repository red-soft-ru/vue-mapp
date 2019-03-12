<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: '',
})
export default class MenuDemo extends Vue {
  btns: string[] = ['first', 'second', 'third'];
}
</script>

<template>
  <vm-menu>
    <vm-button slot="trigger">
      Menu
    </vm-button>
    <vm-button v-for="btn in btns">
      {{ btn }}
    </vm-button>
  </vm-menu>
</template>

