<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: '',
})
export default class RadioDemo extends Vue {

}
</script>

<template>
  <div>
    <vm-field>
      <div>
        <vm-radio
          value="first"
          label="Первый"
        />
        <vm-radio
          value="second"
          label="Второй"
        />
        <vm-radio
          value="third"
          label="Третий"
        />
      </div>
    </vm-field>
  </div>
</template>
