import Header from './header.vue';

export default (Vue, options) => {
  Vue.component(Header.name, Header.extend(options));
};
