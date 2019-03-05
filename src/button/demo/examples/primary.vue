<template>
  <vm-button
    @click="onClick"
    color="primary2"
  />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  demo: {
    title: 'Primary Button',
  },
})
export default class ButtonPrimaryDemo extends Vue {

  onClick() {
    console.warn('Clicked');
  }
}
</script>
