<template>
  <vm-box class="bg-primary">
    <h5>Lorem ipsum</h5>
    <span class="subtitle-2 text-light">
      Lorem ipsum dolor sit amet
    </span>
    <hr>
    <p>
      Lorem ipsum <span class="text-success">dolor sit</span> amet,
      consectetur adipiscing elit.
      Suspendisse pretium vestibulum urna et scelerisque.
      <span class="tag">In pretium</span> tellus quis eleifend commodo.
      Fusce sit amet elementum velit, non sollicitudin nunc.
      Mauris et <span class="text-error">sapien</span>
      sed enim <span class="text-warning">hendrerit consequat</span>.
    </p>
    <hr>
    <vm-button theme="secondary">
      Read More
    </vm-button>
  </vm-box>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ColorPrimaryTextDemo extends Vue {}
</script>
