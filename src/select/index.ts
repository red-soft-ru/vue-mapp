import Select from './select.vue';

export function install(Vue, options) {
  Vue.component('vm-select', Select.extend(options));
}

const plugin = {
  install,
  Select,
};

export default plugin;
