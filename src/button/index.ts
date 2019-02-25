import Button from './button.vue';

export function install(Vue, options) {
  Vue.component('vm-button', Button.extend(options));
}

const plugin = {
  install,
  Button,
};

export default plugin;
