import Date from './date.vue';

export function install(Vue, options) {
  Vue.component('vm-date', Date.extend(options));
}

const plugin = {
  install,
  Date,
};

export default plugin;
