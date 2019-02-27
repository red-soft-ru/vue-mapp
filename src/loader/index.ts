import Loader from './loader.vue';

const plugin = {
  install(Vue, options) {
    Vue.component('vm-loader', Loader.extend(options));
  },
};

export { Loader };

export default plugin;
