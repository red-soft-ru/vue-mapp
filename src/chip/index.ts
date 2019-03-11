import Chip from './chip.vue';

export function install(Vue, options) {
  Vue.component('vm-chip', Chip.extend(options));
}

const plugin = {
  install,
  Chip,
};

export default plugin;
