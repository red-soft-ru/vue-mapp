<script lang="ts">
import { Vue, Component, Prop, Provide, Inject } from 'vue-property-decorator';
import VueMappIcon from '../icon/icon.vue';
import { VNode } from 'vue/types';
import VueMappList from '../ul/ul.vue';

@Component({
  name: 'vm-li'
})
export default class VueMappListItem extends Vue {

  closed: boolean = true;
  haveSublist: boolean = false;

  @Inject()
  container: VueMappList;

  @Prop([String, Boolean])
  disabled: string | boolean;

  @Prop([String, Boolean])
  active: string | boolean;

  @Prop({
    type: String,
    default: 'single',
    validator: v => !v || /single|double|triple/.test(v)
  })
  theme: string;

  render(h) {
    const { closed } = this;
    const defaultSlot = this.$slots.default || [];
    const listItems: VNode[] = [];
    const childs: VNode[] = [];
    let link: any;
    let haveSublist = false;

    defaultSlot.forEach((child, idx) => {
      const options = child.componentOptions;
      const tag = options && options.tag;

      switch (tag) {
        case 'vm-ul':
          listItems.push(child);
          break;
        case 'router-link':
          link = child;
          break;
        default:
          childs.push(child);
      }
    });

    let entry;

    const entryParams = {
      class: {
        'vm-list__item-head': true
      },
      on: {
        click: this.click
      }
    };

    if (link) {
      link.data = { ...link.data, ...entryParams };
      entry = link;
    } else if (listItems.length || this.$slots.expand) {
      haveSublist = true;

      entry = [
        h('div', entryParams, [
          h('div', {
            staticClass: 'is--singleline'
          }, [
            childs,
            h(VueMappIcon, {
              staticClass: 'vm-list__item-expander'
            }, 'keyboard_arrow_up')
          ]),
        ]),
        h('div', {
          staticClass: 'vm-list__expand'
        }, [
          listItems,
          this.$slots.expand
        ])
      ];
    } else {
      function createElement(childs, subtitle = false) {
        return h('div', {
          class: {
            'vm-list__item-row': true,
            'vm-list__item-subtitle': subtitle
          }
        }, childs);
      }

      entry = h('div', entryParams, [
        createElement([
          childs,
          h('div', this.$slots['top-right']),
        ]),
        createElement([
          h('div', this.$slots['middle-left']),
          h('div', this.$slots['middle-right']),
        ], true),
        createElement([
          h('div', this.$slots['bottom-left']),
          h('div', this.$slots['bottom-right']),
        ], true),
      ]);
    }

    this.haveSublist = haveSublist;

    return h('div', {
      staticClass: 'vm-list__item',
      attrs: {
        disabled: this.disabled
      },
      class: {
        'is--closed': haveSublist && closed,
        'is--opened': haveSublist && !closed,
        'is--active': this.active
      }
    }, [
      entry
    ]);
  }

  click(e) {
    if (this.disabled) return;

    if (this.haveSublist) {
      this.closed = !this.closed;
    }

    this.$emit('click', e);
  }

  created() {
    this.closed = !this.container.expanded;
  }
}
</script>
