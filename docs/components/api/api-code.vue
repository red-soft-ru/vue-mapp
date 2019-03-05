<script lang="ts">
import Prism from 'prismjs';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ApiCode extends Vue {

  @Prop({
    type: Object,
    default: '',
  })
  schema: object;

  @Prop({
    type: String,
    default: 'html',
  })
  lang: string;

  @Prop({
    type: String,
    default: 'html',
  })
  code: string;

  // get code(): string {
  //   const { schema } = this;
  //   const slots = '';
  //   const attrs = ' width="300"';

  //   return '';

    //   export function attr (item) {
    //     let prefix = '\n\t' + item.label,
    //         suffix = ''

    //     switch (typeof item.value) {
    //         case 'string':
    //             suffix = `="${item.value}"`; break;
    //         case 'boolean':
    //             item.value ? null : prefix = '';
    //     }

    //     return prefix + suffix;
    // }

    //  const _attrs = [
    //         attr({ label: 'primary', value: this.primary }),
    //         attr({ label: 'raised', value: this.raised }),
    //         attr({ label: 'disabled', value: this.disabled }),
    //         attr({ label: 'loading', value: this.loading }),
    //         attr({
    //             label: 'icon',
    //             value: this.icon ? 'settings' : false
    //         }),
    //         attr({
    //             label: '@click',
    //             value: this.emittedEvents.indexOf('click') >= 0 ? 'counter++' : false
    //         }),
    //     ].filter(i => !!i);

    //     let attrs: string = _attrs.join('');

    //     switch(_attrs.length) {
    //         case 0: break;
    //         case 1:
    //             if (attrs.length < 24) {
    //                 attrs = ' ' + attrs.slice(2);
    //                 break;
    //             }
    //         default: attrs = _attrs.join('') + '\n'; break;
    //     }

    //     return `<vm-button${attrs}>${this.label}</vm-button>`;

    // if (slots) {
    //   return `<${schema.tag}${attrs}>${slots}</${schema.tag}>`;
    // } else {
    //   return `<${schema.tag}${attrs} />`;
    // }
  // }

  get finalCode(): string {
    const lang = Prism.languages[this.lang];
    return Prism.highlight(this.code, lang);
  }

  mounted() {
    // const target = this.$refs['copy-button'];
    // const clipboard = new Clipboard(target.$el, {
    //   target: () => this.$refs['copy-source']
    // });

    // clipboard.on('success', event => {
    //   event.clearSelection();

    //   snackbar({
    //     text: 'Код скопирован'
    //   });
    // });
  }
}
</script>

<template>
  <div :class="$style.root">
    <pre :class="[`language-${lang}`, $style.pre]">
      <code
        ref="copySource"
        :class="$style.code"
        v-html="finalCode"
      />
    </pre>
  </div>
</template>

<style lang="scss" module>
.root {
  width: 100%;
  padding: 20px;
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
