import Tag from './tag.vue';

export function install(Vue, options) {
  Vue.component('vm-tag', Tag.extend(options));
}

const plugin = {
  install,
  Tag,
};

export default plugin;
