<script>
import { escapeTags } from '~/utils/parse'

export default {
  name: 'ApiExamples',
  props: {
    examples: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onExampleClick(example) {
      this.$router.push({
        query: {
          demo: example.name,
        },
      })
    },
    getHtml(s) {
      return escapeTags(s.subtitle)
    },
  },
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
          class="caption text-light"
          v-html="getHtml(example)"
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
  padding: .5rem;
  cursor: pointer;
  border-style: solid;
  border-width: 0 0 1px;

  &:hover {
    background: rgba(0,0,0,.04);
  }
}

.exampleTitle {
  margin-bottom: .5rem;
}

.rendered {
  pointer-events: none;

  * {
    animation: none;
  }
}
</style>
