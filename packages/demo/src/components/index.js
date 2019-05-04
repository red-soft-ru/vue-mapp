import Vue from 'vue'

const exec = require.context('.', true, /\.vue$/)

exec.keys().forEach(file => {
  const component = exec(file).default
  const name = component.name

  if (name) {
    Vue.component(component.name, component)
  }
})
