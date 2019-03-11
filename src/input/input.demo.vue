<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: '',
})
export default class InputDemo extends Vue {

}
</script>

<template>
  <div class="wrapper">
    <vm-input
      placeholder="г. Москва"
      label="Местонахождение юридического лица"
      description="Укажите город"
    />
  </div>
</template>

<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: column
}
</style>

