import Divider from './divider.vue';

export function install(Vue, options) {
  Vue.component('vm-divider', Divider.extend(options));
}

const plugin = {
  install,
  Divider,
};

export default plugin;
