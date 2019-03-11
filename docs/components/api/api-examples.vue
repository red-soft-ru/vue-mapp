<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ApiExamples extends Vue {

  @Prop({
    type: Object,
    default: () => ({}),
  })
  examples: any[];
}
</script>

<template>
  <div>
    <div
      v-for="(example, key) in examples"
      :key="key"
      :class="$style.example"
      @click="$emit('select', key)"
    >
      <span class="subtitle-1">{{ key }}</span>
      <div :class="$style.rendered">
        <component :is="example.component" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.root {
  width: 100%;
}

.example {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
  cursor: pointer;


  &:hover {
    background: rgba(0,0,0,.04);
  }
}

.rendered {
  pointer-events: none;

  * {
    animation: none;
  }

}
</style>
