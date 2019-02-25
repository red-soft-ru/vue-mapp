<template>
  <i
    :class="[
      'vm-icon',
      library,
    ]"
    :style="{
      'font-size': 20
    }"
  >
    <slot />
    {{ name }}
  </i>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'vm-icon',
})
export default class VueMappIcon extends Vue {

  @Prop({
    type: String,
    default: 'material-icons',
  })
  library: string;

  @Prop({
    type: [String, Number],
    default: '',
  })
  size: string | number;

  @Prop({
    type: String,
    default: '',
  })
  name: string;
}
</script>

<style lang="scss">
@import 'vars';

.vm-icon {
  display: inline-block;
  min-width: 1em;
  min-height: 1em;
  font-size: 24px;
  vertical-align: middle;
  user-select: none;
  fill: currentColor;
  text-rendering: optimizeLegibility;
}
</style>
