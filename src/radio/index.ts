import Radio from './radio.vue';

export function install(Vue, options) {
  Vue.component('vm-radio', Radio.extend(options));
}

const plugin = {
  install,
  Radio,
};

export default plugin;
