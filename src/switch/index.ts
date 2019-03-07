import Switch from './switch.vue';

export function install(Vue, options) {
  Vue.component('vm-switch', Switch.extend(options));
}

const plugin = {
  install,
  Switch,
};

export default plugin;
