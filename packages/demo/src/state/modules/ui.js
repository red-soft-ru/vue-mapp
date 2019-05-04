export const state = {
  menuVisible: false,
}

export const getters = {
  menuVisible: s => s.menuVisible,
}

export const mutations = {
  SET_MENU_VISIBILITY(state, value) {
    state.menuVisible = value;
  },
}

export const actions = {}
