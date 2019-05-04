<template>
  <div id="app">
    <app-header />
    <app-menu v-if="menuVisible" />
    <main class="app-router">
      <router-view />
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters('ui', [
      'menuVisible',
    ]),
  },
  created() {
    this.getComponentRoutes()
  },
  methods: {
    ...mapActions('routes', [
      'getComponentRoutes',
    ]),
  },
}
</script>

<style lang="scss">
/* stylelint-disable selector-max-type */
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700');
@import './css/index';
@import '~vue-mapp/theme/default.scss';

:root {
  --vm-text-medium: 500;
  --vm-color-primary: #01579b;
}

body {
  display: flex;
  flex-direction: column;
  min-width: 1140px;
  height: 100vh;
  margin: 0;
  overflow: hidden;
  font-family: Roboto, sans-serif;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-router {
  flex-grow: 1;
  height: calc(100vh - 64px);
}
</style>
