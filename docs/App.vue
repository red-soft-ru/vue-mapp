<template>
  <div id="app">
    <app-header />
    <app-menu v-if="menuVisible" />
    <div class="app-router">
      <router-view />
    </div>
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
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700');
@import './css/index';

:root {
  --vm-text-medium: 500;
}

body {
  margin: 0;
}

.app-router {
  flex-grow: 1;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Roboto;
  color: #2c3e50;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
