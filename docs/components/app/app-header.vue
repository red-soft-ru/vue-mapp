<template>
  <vm-header theme="shadow">
    <vm-button
      slot="trigger"
      @click="showMenu"
      icon="menu"
    />

    <router-link
      slot="title"
      to="/"
    >
      {{ $route.meta.title }}
    </router-link>
  </vm-header>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component
export default class AppHeader extends Vue {

  @Getter('menuVisible', { namespace: 'ui' })
  menuVisible;

  showMenu() {
    this.$store.commit('ui/SET_MENU_VISIBILITY', true);
  }
}
</script>

<style lang="scss">
//
</style>
