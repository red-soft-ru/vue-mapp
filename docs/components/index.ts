import Vue from 'vue';
import get from 'lodash/get';

const exec = require.context('.', true, /\.vue$/);

exec.keys().forEach(file => {
  const component = exec(file).default;
  const name = get(component, 'options.name');

  if (name) {
    Vue.component(name, component);
  }
});
