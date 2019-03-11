<template>
  <div id="app">
    <app-header />
    <app-menu v-if="menuVisible" />
    <main class="app-router">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component
export default class App extends Vue {

  @Getter('menuVisible', { namespace: 'ui' })
  menuVisible;

  created() {
    this.$store.dispatch('routes/getComponentRoutes');
  }
}
</script>

<style lang="scss">
/* stylelint-disable selector-max-type */
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700');
@import './css/index';

:root {
  --vm-text-medium: 500;
  --vm-color-primary: #01579b;
}

body {
  margin: 0;
  overflow: hidden;
}

.app-router {
  flex-grow: 1;
  height: calc(100vh - 64px);
}

#app {
  display: flex;
  flex-direction: column;
  min-width: 1140px;
  height: 100vh;
  font-family: Roboto, sans-serif;
  color: #2c3e50;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
