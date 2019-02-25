import Icon from './icon.vue';

const plugin = {
  install(Vue, options) {
    Vue.component('vm-icon', Icon.extend(options));
  }
};

export {
  Icon,
};

export default plugin;
