import ListItem from './li.vue';

const plugin = {
  install(Vue, options) {
    Vue.component('vm-li', ListItem.extend(options));
  },
};

export { ListItem };

export default plugin;
