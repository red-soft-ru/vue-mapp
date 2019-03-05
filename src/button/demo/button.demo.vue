<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  demo: {
    title: 'Button',
    path: '/button',
    group: 'input',
  },
})
export default class ButtonDemo extends Vue {

  code = {
    tag: 'vm-button',
    attrs: [
      {
        name: 'theme',
        value: 'rounded',
      },
    ],
    events: [
      {
        name: 'click',
        value: 'counter++',
      }
    ],
    slots: [],
  };

  created() {
    console.log(this.examples, this.$options.examples);
  }
}
</script>

<template>
  <api-layout>
    <api-demo
      slot="demo"
      component="vm-button"
    />
    <api-code
      slot="code"
      :code="$options.examples.primary.source"
    />
  </api-layout>
  <!-- <div>
    <vm-button :disabled="disabled">
      Default
    </vm-button>
    <vm-button
      :loading="loading"
      :disabled="disabled"
      theme="outlined"
    >
      Outlined
    </vm-button>
    <vm-button
      :loading="loading"
      :disabled="disabled"
      theme="outlined"
      corner="rounded"
      color="warning"
      icon="alarm"
    >
      Outlined Rounded
    </vm-button>
    <vm-button
      :disabled="disabled"
      theme="filled"
    >
      Filled
    </vm-button>
    <vm-button
      :disabled="disabled"
      theme="raised"
      corner="rounded"
    >
      Rounded Raised
    </vm-button>

    <vm-button
      @click="loading = !loading"
      icon="alarm"
    >
      Toggle Load
    </vm-button>
    <router-view />

    <vm-button @click="disabled = !disabled">
      Toggle Disabled
    </vm-button>

    <vm-button
      icon="home"
      full-width
    >
      Full Width Button
    </vm-button>

    <vm-button
      size="small"
    >
      small
    </vm-button>

    <vm-button
      theme="outlined"
      size="large"
      icon="person"
    >
      large
    </vm-button>

    <vm-button
      theme="outlined"
      size="xlarge"
      corner="rounded"
      icon="person"
    >
      Вход
    </vm-button>

    <vm-button
      theme="outlined"
      size="xlarge"
      color="accent"
      icon="alarm"
    >
      Alarm
    </vm-button>

    <vm-button
      theme="filled"
      size="xlarge"
      color="success"
    >
      xlarge success
    </vm-button>

    <vm-button
      theme="outlined"
      size="xlarge"
      color="warning"
    >
      xlarge warning
    </vm-button>

    <vm-button
      theme="outlined"
      size="xlarge"
      icon="alarm"
    />
  </div> -->
</template>

<example path="./examples/primary.vue" />
