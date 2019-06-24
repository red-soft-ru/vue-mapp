import get from 'lodash/get'
import router from '~/views/router'

export const state = {
  components: [],
}

export const getters = {
  components: s => s.components,
}

export const mutations = {
  SET_COMPONENTS(state, components) {
    state.components = components
  },
}

export const actions = {
  getComponentRoutes({ commit }) {
    const exec = require.context(
      '~/../../vue-mapp/lib',
      true,
      /.+\.demo\.vue$/
    )
    const components = []
    const routes = []

    exec.keys().forEach(file => {
      const component = exec(file).default
      const options = get(component, 'demo')

      if (options) {
        components.push(options)

        routes.push({
          path: options.path,
          meta: {
            title: options.title,
          },
          component,
        })
      }
    })

    console.log(components)

    commit('SET_COMPONENTS', components)
    router.addRoutes(routes)

    return components
  },
}
