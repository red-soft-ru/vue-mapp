import Button from 'vue-mapp/lib/button'
import Box from 'vue-mapp/lib/box'
// import Icon from 'vue-mapp/lib/icon';
// import Loader from 'vue-mapp/lib/loader';
// import Header from 'vue-mapp/lib/header';
// import Modal from 'vue-mapp/lib/modal';
// import Chip from 'vue-mapp/lib/chip';
// import Divider from 'vue-mapp/lib/divider';
// import Tag from 'vue-mapp/lib/tag';
// import Snackbar from 'vue-mapp/lib/snackbar';

export default function(Vue) {
  Vue.use(Button)
  // Vue.use(Icon);
  // Vue.use(Loader);
  // Vue.use(Header);
  // Vue.use(Modal);
  // Vue.use(Chip);
  // Vue.use(Divider);
  // Vue.use(Tag);
  Vue.use(Box)
  // Vue.use(Snackbar);
};

export { snackbar } from 'vue-mapp/lib/snackbar'
