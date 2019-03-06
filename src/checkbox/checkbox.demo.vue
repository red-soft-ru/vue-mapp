<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: '',
})
export default class CheckboxDemo extends Vue {

}
</script>

<template>
  <div class="wrapper">
    <h3>Перечень изменений</h3>
    <vm-checkbox>Изменение местонахождения юридического лица</vm-checkbox>
    <vm-checkbox>Изменение места фактического осуществления деятельности</vm-checkbox>
    <vm-checkbox>Реорганизация юридического лица</vm-checkbox>
  </div>
</template>

<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: column
}
</style>

