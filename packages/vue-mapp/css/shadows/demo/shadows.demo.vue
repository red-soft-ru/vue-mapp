<script lang="ts">
import { Component } from 'vue-property-decorator';
import DemoRoute from '~/mixins/demo.mixin';

@Component({
  demo: {
    title: 'Shadows',
    path: '/shadows',
    group: 'css',
  },
})
export default class ShadowsDemo extends DemoRoute {}
</script>

<template>
  <api-layout :examples="examples" />
</template>

<examples>

- title: Low shadow
  subtitle: Use <b>.shadow-xs</b>
  src: ./examples/shadow-xs.vue

- title: Small shadow
  subtitle: Use <b>.shadow-sm</b>
  src: ./examples/shadow-sm.vue

- title: Medium shadow
  subtitle: Use <b>.shadow-md</b>
  src: ./examples/shadow-md.vue

- title: Large shadow
  subtitle: Use <b>.shadow-lg</b>
  src: ./examples/shadow-lg.vue

- title: High shadow
  subtitle: Use <b>.shadow-xl</b>
  src: ./examples/shadow-xl.vue

</examples>
