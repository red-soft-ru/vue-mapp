import Toggle from './toggle.vue';

export function install(Vue, options) {
  Vue.component('vm-toggle', Toggle.extend(options));
}

const plugin = {
  install,
  Toggle,
};

export default plugin;
