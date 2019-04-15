import get from 'lodash/get';
import { Module } from 'vuex';
import { RouteConfig } from 'vue-router';
import router from '~/views/router';
import { RootState } from '../store';
import { ComponentDemoParams } from '~/types/demo';

export class RoutesVuexState {
  components: ComponentDemoParams[] = [];
}

const RoutesModule: Module<RoutesVuexState, RootState> = {
  namespaced: true,
  state: new RoutesVuexState(),
  getters: {
    components: s => s.components,
  },
  mutations: {
    SET_COMPONENTS(state, components) {
      state.components = components;
    },
  },
  actions: {
    getComponentRoutes({ commit }) {
      const exec = require.context(
        '../../../vue-mapp/components',
        true,
        /.+\.demo\.vue$/
      );
      const components: ComponentDemoParams[] = [];
      const routes: RouteConfig[] = [];

      exec.keys().forEach(file => {
        const component = exec(file).default;
        const options = get(component, 'options.demo');

        if (options) {
          components.push(options);

          routes.push({
            path: options.path,
            meta: {
              title: options.title,
            },
            component,
          });
        }
      });

      commit('SET_COMPONENTS', components);
      router.addRoutes(routes);

      return components;
    },
  },
};

export default RoutesModule;
