<script lang="ts">
import { mapGetters } from 'vuex'

export default {
  name: 'AppMenu',
  computed: {
    ...mapGetters('routes', [
      'components',
    ]),
    groups() {
      return []
    },
    entries() {
      const groups = {}

      this.components.forEach(component => {
        const group = component.group
        const target = groups[group] || []

        groups[group] = target.concat([component])
      })

      return groups
    },
  },
  methods: {
    close() {
      this.$store.commit('ui/SET_MENU_VISIBILITY', false)
    },
  },
}
</script>

<template>
  <vm-modal
    :class="$style.root"
    fullscreen
    transition="slide-x"
    @close="close"
  >
    <vm-header slot="header">
      <vm-button
        slot="trigger"
        icon="arrow_back"
        @click="close"
      />

      <span slot="title">Vue Mapp Demo</span>
    </vm-header>

    <div :class="$style.groups">
      <div
        v-for="(group, key) in entries"
        :key="key"
        :class="$style.group"
      >
        <div :class="$style.groupLabel">
          <span class="subtitle-2">{{ key }}</span>
        </div>
        <div :class="$style.groupEntry">
          <div
            v-for="(item, idx) in group"
            :key="idx"
            :class="$style.groupItem"
          >
            <router-link :to="item.path">
              <vm-button>{{ item.title }}</vm-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </vm-modal>
</template>

<style lang="scss" module>

.root {
  align-items: flex-start;
}

.groups {
  margin-top: 16px;
}

.group {
  display: flex;
  margin: 0 24px;
  border-style: solid;
  border-width: 0 0 1px;

  &:last-child {
    border-style: none;
  }
}

.groupLabel, .groupEntry {
  padding: 20px;
}

.groupLabel {
  flex-shrink: 0;
  width: 20%;
  padding-left: 0;
  line-height: 36px;
  text-align: left;
  text-transform: capitalize;
}

.groupItem {
  width: 50%;
  text-align: left;

  a {
    text-decoration: none;
  }

  button {
    min-width: auto;
  }
}

.groupEntry {
  display: flex;
  flex-wrap: wrap;
  width: 80%;
}
</style>
