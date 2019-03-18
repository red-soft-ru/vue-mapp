<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { escapeTags } from '#/utils/parse';

@Component
export default class ApiExamples extends Vue {

  @Prop({
    type: Array,
    default: () => [],
  })
  examples: any[];

  onExampleClick(example) {
    this.$router.push({
      query: {
        demo: example.name
      }
    });
  }

  getHtml(s) {
    return escapeTags(s.subtitle);
  }
}
</script>

<template>
  <div :class="$style.root">
    <div
      v-for="(example, key) in examples"
      :key="key"
      :class="$style.example"
      @click="onExampleClick(example)"
    >
      <div :class="$style.exampleTitle">
        <div class="subtitle-2">
          {{ example.title }}
        </div>
        <div
          v-html="getHtml(example)"
          class="caption text-light"
        />
      </div>
      <div :class="$style.rendered">
        <component :is="example.component" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.root {
  width: 100%;
  overflow-y: auto;
}

.example {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100px;
  cursor: pointer;
  border-style: solid;
  border-width: 0 0 1px;

  @apply px-4 pt-3 pb-4;


  &:hover {
    background: rgba(0,0,0,.04);
  }
}

.exampleTitle {
  @apply mb-2;
}

.rendered {
  pointer-events: none;

  * {
    animation: none;
  }

}
</style>
