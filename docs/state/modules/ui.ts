import { Module } from 'vuex';
import { RouteConfig } from 'vue-router';
import router from '#/views/router';
import { RootState } from '../store';
import { ComponentDemoParams } from '@vmsrc/types';

export class UiVuexState {
  menuVisible: boolean = false;
}

const UiModule: Module<UiVuexState, RootState> = {
  namespaced: true,
  state: new UiVuexState(),
  getters: {
    menuVisible: s => s.menuVisible,
  },
  mutations: {
    SET_MENU_VISIBILITY(state, value) {
      state.menuVisible = value;
    },
  },
};

export default UiModule;
