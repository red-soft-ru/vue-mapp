<template>
  <div
    :class="[
      'vm-loader',
      size && 'vm-loader--' + size,
    ]"
  >
    <div class="vm-loader__spin" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'vm-icon',
})
export default class VueMappLoader extends Vue {

  @Prop({
    type: [String, Number],
    default: '',
    validator: v => !v || /xsmall|small|large|xlarge/.test(v)
  })
  size: string;
}
</script>

<style lang="scss">
.vm-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: var(--vm-color-primary);

  &--xsmall {
    font-size: 16px;
  }

  &--small {
    font-size: 18px;
  }

  &--large {
    font-size: 30px;
  }

  &--xlarge {
    font-size: 40px;
  }

  &__spin {
    flex-shrink: 0;
    width: 1em;
    height: 1em;
    margin: auto;
    border-color: var(--vm-color-divider);
    border-style: solid;
    border-width: 0.125em;
    border-top-color: currentColor;
    border-radius: 50%;
    animation: spin 720ms infinite linear;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
