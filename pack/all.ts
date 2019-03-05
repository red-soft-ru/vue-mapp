import '../src/css/index.scss';
import Button from '@vmsrc/button';
import Icon from '@vmsrc/icon';
import Loader from '@vmsrc/loader';
import Header from '@vmsrc/header';
import Modal from '@vmsrc/modal';

export default (Vue, options: any = {}) => {
  Vue.use(Button, options.button);
  Vue.use(Icon);
  Vue.use(Loader);
  Vue.use(Header);
  Vue.use(Modal);
};
