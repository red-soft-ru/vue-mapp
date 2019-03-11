import Textarea from './textarea.vue';

export function install(Vue, options) {
  Vue.component('vm-textarea', Textarea.extend(options));
}

const plugin = {
  install,
  Textarea,
};

export default plugin;
