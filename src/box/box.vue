<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class VmBox extends Vue {

}
</script>

<template>
  <div class="vm-box">
    <div class="vm-box__header">
      <slot name="header" />
    </div>
    <div class="vm-box__body">
      <slot />
    </div>
    <div class="vm-box__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss">
@import '../css/vars.scss';

.vm-box {
  display: flex;
  flex-direction: column;

  &__header {
    flex-shrink: 0;
  }

  &__body {
    overflow: auto;
  }

  &__footer {
    flex-shrink: 0;
  }
}
</style>
