import Input from './input.vue';

export function install(Vue, options) {
  Vue.component('vm-input', Input.extend(options));
}

const plugin = {
  install,
  Input,
};

export default plugin;
