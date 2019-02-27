<template>
  <hr class="vm-divider">
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'vm-divider'
})
export default class VueMappDivider extends Vue {

}
</script>

<style lang="scss">
@import 'vars';

.vm-divider {
  display: block;
  flex-shrink: 0;
  width: 100%;
  height: 0;
  padding: 0;
  margin: 0;
  border-color: $color-divider;
  border-style: solid;
  border-width: 0 0 1px;
}
</style>
