import Button from '@vmsrc/button';
import Icon from '@vmsrc/icon';
import Loader from '@vmsrc/loader';
import Chip from '@vmsrc/chip';
import Divider from '@vmsrc/divider';
import Card from '@vmsrc/card';

export function install(Vue, options) {
  Vue.use(Button);
  Vue.use(Icon);
  Vue.use(Loader);
  Vue.use(Chip);
  Vue.use(Divider);
  Vue.use(Card);
}

const plugin = {
  install,
};

export default plugin;
