import Option from './option.vue';

export function install(Vue, options) {
  Vue.component('vm-option', Option.extend(options));
}

const plugin = {
  install,
  Option,
};

export default plugin;
