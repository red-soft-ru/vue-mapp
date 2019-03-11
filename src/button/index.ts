import get from 'lodash/get';
import Button from './button.vue';

export default (Vue, params = {}) => {
  const options = {
    props: {},
  };

  Object.keys(params).forEach(param => {
    const property = get(Button, `options.props.${param}`, {});

    if (property) {
      options.props[param] = {
        ...property,
        default: params[param],
      };
    }
  });

  Vue.component('vm-button', Button.extend(options));
};

export { Button };
