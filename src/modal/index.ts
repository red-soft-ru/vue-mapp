import Modal from './modal.vue';

export default (Vue, options) => {
  Vue.component('vm-modal', Modal.extend(options));
};
