import '../src/css/index.scss';
import Button from '@vmsrc/button';
import Icon from '@vmsrc/icon';
import Loader from '@vmsrc/loader';
import Header from '@vmsrc/header';
import Modal from '@vmsrc/modal';
import Chip from '@vmsrc/chip';
import Divider from '@vmsrc/divider';
import Card from '@vmsrc/card';
import Tag from '@vmsrc/tag';
import Box from '@vmsrc/box';

export default (Vue, options: any = {}) => {
  Vue.use(Button, options.button);
  Vue.use(Icon);
  Vue.use(Loader);
  Vue.use(Header);
  Vue.use(Modal);
  Vue.use(Chip);
  Vue.use(Divider);
  Vue.use(Card);
  Vue.use(Tag);
  Vue.use(Box);
};
