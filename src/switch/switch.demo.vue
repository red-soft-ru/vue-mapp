<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: '',
})
export default class SwitchDemo extends Vue {

}
</script>

<template>
  <vm-switch>
    <vm-option>Один</vm-option>
    <vm-option>Два</vm-option>
    <vm-option>Три</vm-option>
  </vm-switch>
</template>
