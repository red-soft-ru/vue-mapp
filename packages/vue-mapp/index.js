import Button from './lib/button'
import Box from './lib/box'
import Icon from './lib/icon'
import Loader from './lib/loader'
import Header from './lib/header'
import Modal from './lib/modal'
import Chip from './lib/chip'
import Divider from './lib/divider'
import Tag from './lib/tag'
import Snackbar from './lib/snackbar'

export default function(Vue) {
  Vue.use(Button)
  Vue.use(Icon)
  Vue.use(Loader)
  Vue.use(Header)
  Vue.use(Modal)
  Vue.use(Chip)
  Vue.use(Divider)
  Vue.use(Tag)
  Vue.use(Box)
  Vue.use(Snackbar)
};

export { snackbar } from './lib/snackbar'
