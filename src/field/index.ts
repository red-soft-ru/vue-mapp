import Field from './field.vue';

export function install(Vue, options) {
  Vue.component('vm-field', Field.extend(options));
}

const plugin = {
  install,
  Field,
};

export default plugin;
