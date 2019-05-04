import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

/**
 * Define store for usage in this file
 */
const store = new Vuex.Store({
  modules: {
    ...modules,
  },
  strict: process.env.NODE_ENV !== 'production',
})

export default store
