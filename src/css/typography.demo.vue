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
export default class TypographyDemo extends DemoRoute {

}
</script>

<template>
  <api-layout :examples="examples" />
</template>

<example path="./examples/typography.vue" />
