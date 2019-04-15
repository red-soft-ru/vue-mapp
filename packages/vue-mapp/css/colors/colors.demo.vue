<script lang="ts">
import { Component } from 'vue-property-decorator';
import DemoRoute from '~/mixins/demo.mixin';

@Component({
  demo: {
    title: 'Colors',
    path: '/colors',
    group: 'css',
  },
})
export default class ColorsDemo extends DemoRoute {}
</script>

<template>
  <api-layout :examples="examples" />
</template>

<examples>

- title: Default text
  subtitle: Default text color
  src: ./examples/text-default.vue

- title: Light text
  subtitle: Use <b>.text-light</b>
  src: ./examples/text-light.vue

- title: Dark text
  subtitle: Use <b>.text-dark</b>
  src: ./examples/text-dark.vue

- title: Primary Text
  subtitle: Use <b>.text-primary</b>
  src: ./examples/text-primary.vue

- title: Accent Text
  subtitle: Use <b>.text-accent</b>
  src: ./examples/text-accent.vue

- title: Success Text
  subtitle: Use <b>.text-success</b>
  src: ./examples/text-success.vue

- title: Warning Text
  subtitle: Use <b>.text-warning</b>
  src: ./examples/text-warning.vue

- title: Primary Background
  subtitle: Use <b>.bg-primary</b>
  src: ./examples/bg-primary.vue

- title: Warning Background
  subtitle: Use <b>.bg-warning</b>
  src: ./examples/bg-warning.vue

</examples>
