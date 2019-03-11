import Popup from './popup.vue';

export function install(Vue, options) {
  Vue.component('vm-popup', Popup.extend(options));
}

const plugin = {
  install,
  Popup,
};

export default plugin;
