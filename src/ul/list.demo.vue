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
  <vm-ul label="label 1">
    <!-- <vm-li>red</vm-li>
    <vm-li>white</vm-li> -->
    <vm-li>
      <div>list 1</div>
      <vm-ul
        label="label 2"
        theme="border"
      >
        <vm-li theme="triple">
          <div>top left</div>
          <div slot="top-right">
            top right
          </div>
          <div slot="middle-left">
            middle left
          </div>
          <div slot="middle-right">
            middle right
          </div>
          <div slot="bottom-left">
            bottom left
          </div>
          <div slot="bottom-right">
            bottom right
          </div>
        </vm-li>
        <vm-li theme="double">
          <div>top left</div>
          <div slot="top-right">
            top right
          </div>
          <div slot="middle-left">
            middle left
          </div>
          <div slot="middle-right">
            middle right
          </div>
        </vm-li>
        <vm-li>black</vm-li>
        <vm-li>
          <span>list 2</span>
          <vm-ul
            label="label 3"
            theme="border"
          >
            <vm-li>yellow</vm-li>
            <vm-li>secondsecondsecondsecond</vm-li>
            <vm-li>
              <vm-ul
                theme="border"
              >
                <vm-li>yellow</vm-li>
                <vm-li>secondsecondsecondsecond</vm-li>
              </vm-ul>
            </vm-li>
          </vm-ul>
        </vm-li>
      </vm-ul>
    </vm-li>
    <vm-li>orange</vm-li>
    <!-- <vm-li>
      <vm-ul>
        <vm-li>2 blue</vm-li>
        <vm-li>2 black</vm-li>
        <vm-li>
          <vm-ul>
            <vm-li>3 yellow</vm-li>
            <vm-li>3 secondsecondsecondsecond</vm-li>
          </vm-ul>
        </vm-li>
      </vm-ul>
    </vm-li> -->
  </vm-ul>
</template>
