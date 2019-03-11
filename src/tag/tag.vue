<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'vm-tag'
})
export default class VueMappTag extends Vue {

}
</script>

<template>
  <div class="vm-tag">
    <slot />
  </div>
</template>

<style lang="scss">
@import 'vars';

.vm-tag {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 8px;
  font-size: $text-small-2;
  font-weight: 500;
  line-height: 1;
  text-transform: uppercase;
  background: $color-bg-dark;
  border-radius: 2px;

  + .vm-tag {
    margin-left: 8px;
  }
}

</style>

