<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: '',
})
export default class DateDemo extends Vue {

}
</script>

<template>
  <div class="wrapper">
    <vm-date close-on-select />
  </div>
</template>

<style>
.wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>


