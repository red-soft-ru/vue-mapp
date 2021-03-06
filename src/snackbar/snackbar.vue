<template>
  <transition
    @after-leave="afterLeave"
    @after-enter="afterEnter"
    name="slide-y"
  >
    <div
      v-if="active"
      :class="{
        'vm-snackbar': true,
        'vm-snackbar--center': center
      }"
    >
      <div class="vm-snackbar__text">
        {{ text }}
      </div>
      <vm-button
        v-if="actionText"
        @click="onActionClick"
      >
        {{ actionText }}
      </vm-button>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Button } from 'vue-mapp/button';

@Component({
  name: 'vm-snackbar',
  components: {
    'vm-button': Button
  }
})
export default class VueMappSnackbar extends Vue {
  timer: NodeJS.Timer | null = null;
  active: boolean = false;

  @Prop({
    type: Boolean,
    default: false,
  })
  center: boolean;

  @Prop({
    type: String,
    default: '',
  })
  text: string;

  @Prop({
    type: String,
    default: '',
  })
  actionText: string;

  @Prop({
    type: Number,
    default: 2400
  })
  duration: number;

  show() {
    if (!this.$el) {
      const div = document.createElement('div');

      document.body.appendChild(div);
      this.$mount(div);
    }

    this.active = true;
  }

  hide() {
    this.active = false;

    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  onActionClick() {
    this.$emit('action', event);
    this.hide();
  }

  afterLeave() {
    this.$emit('hide');
  }

  afterEnter() {
    const { duration } = this;

    this.$emit('show');

    if (duration > 0) {
      this.timer = setTimeout(() => {
        this.hide();
      }, this.duration);
    }
  }

  beforeDestroy() {
    this.$el.remove();
  }
}
</script>

<style lang="scss">

$snackbar-bg:             #323232;
$snackbar-color:          #FFF;
$snackbar-button:         rgba(159,168,218,.12);
$snackbar-button-text:    rgb(159,168,218);
$transition: .4s cubic-bezier(.25,.8,.25,1);


.vm-snackbar {
  position: fixed;
  bottom: 24px;
  left: 24px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 344px;
  max-width: 100vw;
  min-height: 48px;
  max-height: 80px;
  font-size: 14px;
  color: $snackbar-color;
  background: $snackbar-bg;
  border-radius: 2px;
  will-change: background-color, color, transform;

  .vm-button {
    color: $snackbar-button-text;

    &:hover {
      background: $snackbar-button;
    }
  }

  &.is--center {
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0 auto;
    border-radius: 2px 2px 0 0;
  }

  &__text {
    align-self: flex-start;
    padding: 14px 24px;
    line-height: 24px;
  }

  &-enter, &-leave-to {
    transform: translateY(150%);
  }

  &-enter-active, &-leave-active {
    opacity: .5s;
    transform: translateY(0);
  }

  &-enter-active {
    transition: transform .32s $transition;
  }

  &-leave-active {
    transition: transform .16s $transition;
  }

  .vm-layout & {
    font-size: 1em;
  }

  button {
    flex-shrink: 0;
    min-width: auto;
    margin: 0 16px;
  }
}

</style>
