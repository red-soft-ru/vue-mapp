
import Button from '@vmsrc/button';
import Icon from '@vmsrc/icon';
import Loader from '@vmsrc/loader';

export function install(Vue, options) {
  Vue.use(Button);
  Vue.use(Icon);
  Vue.use(Loader);
}

const plugin = {
  install,
};

export default plugin;
