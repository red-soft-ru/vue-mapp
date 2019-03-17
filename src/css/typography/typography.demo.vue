<script lang="ts">
import { Component } from 'vue-property-decorator';
import DemoRoute from '@vmsrc/demo.mixin';

@Component({
  demo: {
    title: 'Typography',
    path: '/typography',
    group: 'css',
  },
})
export default class TypographyDemo extends DemoRoute {}
</script>

<template>
  <api-layout :examples="examples" />
</template>

<examples>

- title: H1 Headline
  subtitle: Use $<h1>$ or <b>.headline-1</b>
  src: ./examples/headline-1.vue

- title: H2 Headline
  subtitle: Use $<h2>$ or <b>.headline-2</b>
  src: ./examples/headline-2.vue

- title: H3 Headline
  subtitle: Use $<h3>$ or <b>.headline-3</b>
  src: ./examples/headline-3.vue

- title: H4 Headline
  subtitle: Use $<h4>$ or <b>.headline-4</b>
  src: ./examples/headline-4.vue

- title: H5 Headline
  subtitle: Use $<h5>$ or <b>.headline-5</b>
  src: ./examples/headline-5.vue

- title: H6 Headline
  subtitle: Use $<h6>$ or <b>.headline-6</b>
  src: ./examples/headline-6.vue

- title: Subtitle 1
  subtitle: Use $<b>$ or <b>.subtitle-1</b>
  src: ./examples/subtitle-1.vue

- title: Subtitle 2
  subtitle: Use <b>.subtitle-2</b>
  src: ./examples/subtitle-2.vue

- title: Body 1
  subtitle: Use $<p>$ or <b>.body-1</b>
  src: ./examples/body-1.vue

- title: Body 2
  subtitle: Use <b>.body-2</b>
  src: ./examples/body-2.vue

- title: Caption
  subtitle: Use $<small>$ or <b>.caption</b>
  src: ./examples/caption.vue

- title: Overline
  subtitle: Use <b>.overline</b>
  src: ./examples/overline.vue

- title: Tag
  subtitle: Use <b>.tag</b>
  src: ./examples/tag.vue

</examples>
