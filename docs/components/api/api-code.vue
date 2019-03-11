<script lang="ts">
import get from 'lodash/get';
import trim from 'lodash/trim';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { parseComponent } from 'vue-sfc-parser';
import Prism from 'prismjs';
import Clipboard from 'clipboard';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-scss';

Prism.plugins.NormalizeWhitespace.setDefaults({
  'remove-trailing': true,
  'remove-indent': true,
  'left-trim': true,
  'right-trim': true,
  'break-lines': 80,
  'remove-initial-line-feed': false,
  'tabs-to-spaces': 5,
});

const TAG_SEQUENCE = ['template', 'script', 'style'];
const BLOCK_TYPES = {
  script: 'typescript',
  template: 'html',
  style: 'scss',
};

@Component
export default class ApiCode extends Vue {

  selectedBlock: string = 'sfc';

  @Prop({
    type: Object,
    default: null,
  })
  schema: object;

  @Prop({
    type: String,
    default: '',
  })
  code: string;

  get blockTypes() {
    const types = {
      sfc: 'html',
    };

    Object
      .keys(BLOCK_TYPES)
      .filter(type => this.parsedSfc[type])
      .forEach(type => {
        types[type] = BLOCK_TYPES[type];
      });

    return types;
  }

  get parsedSfc() {
    const parsed = parseComponent(this.code);

    return {
      template: parsed.template,
      script: parsed.script,
      style: parsed.styles[0],
    };
  }

  get sfcCode(): string {
    const blocks: any[] = [];

    for (const type in this.blockTypes) {

      if (type !== 'sfc') {
        const lang = this.blockTypes[type];
        const blockCode = get(this.parsedSfc, `${type}.content`, '');

        blocks.push({
          name: type,
          code: Prism.highlight(blockCode, Prism.languages[lang]),
          lang: get(this.parsedSfc, `${type}.lang`, '')
        });
      }
    }

    return blocks
      .sort((a,b) => {
        return TAG_SEQUENCE.indexOf(a.name) - TAG_SEQUENCE.indexOf(b.name);
      }).map(block => {
        return `<span class="token comment">&lt;${block.name}${
          block.lang ? ` lang="${block.lang}"` : ''
        }></span>${block.code}<span class="token comment">&lt;/${block.name}></span>`;
      }).join('\n\n');
  }

  get finalCode(): string {
    const block = this.selectedBlock;
    const code = get(this.parsedSfc, `${block}.content`, this.code);
    const lang = get(this.blockTypes, block, 'html');

    if (block === 'sfc') return this.sfcCode;
    else return trim(Prism.highlight(code, Prism.languages[lang]), '\n');
  }

  selectBlock(type) {
    this.selectedBlock = type;
  }

  mounted() {
    const target = this.$refs.copyButton as Vue;
    const clipboard = new Clipboard(target.$el, {
      target: () => this.$refs.copySource
    });

    clipboard.on('success', event => {
      event.clearSelection();

      // snackbar({
      //   text: 'Код скопирован'
      // });
    });
  }
}
</script>

<template>
  <vm-box :class="$style.root">
    <vm-header
      slot="header"
      theme="border"
      size="small"
    >
      <div
        slot="title"
        :class="$style.blockTypes"
      >
        <vm-button
          v-for="(type, key) in blockTypes"
          :key="key"
          :theme="selectedBlock === key ? 'filled' : ''"
          @click="selectBlock(key)"
          corner="rounded"
          size="small"
        >
          {{ key }}
        </vm-button>
      </div>
      <vm-button
        ref="copyButton"
        icon="file_copy"
      />
      <vm-button
        icon="fullscreen"
        size="xlarge"
      />
    </vm-header>
    <div :class="$style.codeWrapper">
      <pre :class="$style.pre">
        <code
          ref="copySource"
          :class="$style.code"
          v-html="finalCode"
        />
      </pre>
    </div>
  </vm-box>
</template>

<style lang="scss" module>

.root {
  width: 100%;
}

.codeWrapper {
  @apply p-4;
}

.blockTypes {
  margin-left: -10px;
}

.pre, .code {
  font-family: 'Roboto Mono', Menlo, monospace;
  font-size: 13px;
  text-shadow: none;
  background: none;
  -webkit-font-smoothing: initial;
}

.pre {
  display: flex;
  height: 100%;
  margin: 0;
  overflow: auto;
  font-size: 1em;
  hyphens: none;
  line-height: 20px;
  text-align: left;
  word-break: normal;
  word-wrap: normal;
  tab-size: 4;
  white-space: pre;
  word-spacing: normal;
}
</style>
