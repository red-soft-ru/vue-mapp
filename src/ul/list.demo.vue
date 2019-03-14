<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  demo: {
    title: 'List',
    path: '/list',
    group: 'list',
  },
})
export default class ListDemo extends Vue {
}
</script>

<template>
  <vm-ul label="label">
    <vm-li>1 red</vm-li>
    <vm-li>1 white</vm-li>
    <vm-li>
      <!-- <div>dsf</div> -->
      <vm-ul>
        <vm-li>2 blue</vm-li>
        <vm-li>2 black</vm-li>
        <vm-li>
          <vm-ul label="label">
            <vm-li>3 yellow</vm-li>
            <vm-li>3 secondsecondsecondsecond</vm-li>
          </vm-ul>
        </vm-li>
      </vm-ul>
    </vm-li>
    <!-- <vm-li>
      <vm-ul theme="border">
        <vm-li>2 grey</vm-li>
        <vm-li>2 indigo</vm-li>
      </vm-ul>
    </vm-li> -->
  </vm-ul>
</template>
