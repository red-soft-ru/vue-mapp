import Menu from './menu.vue';

export function install(Vue, options) {
  Vue.component('vm-menu', Menu.extend(options));
}

const plugin = {
  install,
  Menu,
};

export default plugin;
