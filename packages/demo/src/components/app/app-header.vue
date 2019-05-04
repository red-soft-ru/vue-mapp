<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppHeader',
  computed: {
    ...mapGetters('ui', [
      'menuVisible',
    ]),
  },
  methods: {
    showMenu() {
      this.$store.commit('ui/SET_MENU_VISIBILITY', true)
    },
  },
}
</script>

<template>
  <vm-header
    color="primary"
    theme="shadow"
  >
    <vm-button
      slot="trigger"
      icon="menu"
      @click="showMenu"
    />

    <router-link
      slot="title"
      to="/"
    >
      {{ $route.meta.title }}
    </router-link>
  </vm-header>
</template>
