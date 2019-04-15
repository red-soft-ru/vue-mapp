import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';

Vue.use(Vuex);

export class RootState {
  links: object = {};
}

export default new Vuex.Store({
  modules,
  state: new RootState(),
});
