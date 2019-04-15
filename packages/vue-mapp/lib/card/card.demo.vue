<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: '',
})
export default class CardDemo extends Vue {

}
</script>

<template>
  <div>
    <vm-card>
      <div slot="title">
        Title
      </div>
      <div slot="header">
        Header
      </div>
      <vm-icon slot="icons">
        add
      </vm-icon>
      <div slot="content">
        Content
      </div>
      <div>Slot default</div>
    </vm-card>

    <vm-card rounding="corner">
      <div slot="header">
        Header
      </div>
      <div slot="icons">
        <vm-icon>
          add
        </vm-icon>
      </div>
      <div slot="content">
        Corner
      </div>
    </vm-card>

    <vm-card
      :hoverup="true"
      rounding="rounder"
    >
      <div slot="title">
        Hoverup
      </div>
      <div slot="content">
        Rounder
      </div>
    </vm-card>

    <vm-card shadow="none">
      <div slot="title">
        Shadow none
      </div>
      <div slot="content">
        Content
      </div>
    </vm-card>

    <vm-card shadow="flat">
      <div slot="title">
        Shadow flat
      </div>
      <div slot="content">
        Content
      </div>
    </vm-card>
  </div>
</template>

<style lang="scss">
.vm-card {
  padding: 16px;
}
</style>
