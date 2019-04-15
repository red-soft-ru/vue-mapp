import Card from './card.vue';

export function install(Vue, options) {
  Vue.component('vm-card', Card.extend(options));
}

const plugin = {
  install,
  Card,
};

export default plugin;
