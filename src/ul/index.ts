import List from './ul.vue';

const plugin = {
  install(Vue, options) {
    Vue.component('vm-ul', List.extend(options));
  },
};

export { List };

export default plugin;
