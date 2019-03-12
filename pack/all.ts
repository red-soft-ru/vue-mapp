import Button from '@vmsrc/button';
import Icon from '@vmsrc/icon';
import Loader from '@vmsrc/loader';
import Chip from '@vmsrc/chip';
import Divider from '@vmsrc/divider';
import Card from '@vmsrc/card';
import Tag from '@vmsrc/tag';
import Checkbox from '@vmsrc/checkbox';
import Radio from '@vmsrc/radio';
import Field from '@vmsrc/field';
import Toggle from '@vmsrc/toggle';
import Option from '@vmsrc/option';
import Switch from '@vmsrc/switch';
import Input from '@vmsrc/input';
import Textarea from '@vmsrc/textarea';
import Popup from '@vmsrc/popup';
import Menu from '@vmsrc/menu';

export function install(Vue, options) {
  Vue.use(Button);
  Vue.use(Icon);
  Vue.use(Loader);
  Vue.use(Chip);
  Vue.use(Divider);
  Vue.use(Card);
  Vue.use(Tag);
  Vue.use(Checkbox);
  Vue.use(Radio);
  Vue.use(Field);
  Vue.use(Toggle);
  Vue.use(Option);
  Vue.use(Switch);
  Vue.use(Input);
  Vue.use(Textarea);
  Vue.use(Popup);
  Vue.use(Menu);
}

const plugin = {
  install,
};

export default plugin;
