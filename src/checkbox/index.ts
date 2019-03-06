import Checkbox from './checkbox.vue';

export function install(Vue, options) {
  Vue.component('vm-checkbox', Checkbox.extend(options));
}

const plugin = {
  install,
  Checkbox,
};

export default plugin;
