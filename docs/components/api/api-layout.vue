<template>
  <div :class="$style.root">
    <div :class="$style.left">
      <div :class="$style.demo">
        <slot name="demo" />
      </div>

      <div :class="$style.code">
        <slot name="code" />
      </div>
    </div>

    <div :class="$style.params">
      <slot name="params" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ApiLayout extends Vue {

}
</script>

<style lang="postcss" module>

.root {
  display: flex;
  width: 100%;
  height: 100%;
}

.left {
  display: flex;
  flex-direction: column;
  width: 60%;
  border-style: solid;
  border-width: 0 1px 0 0;
}

.params {
  width: 40%;
}

.code {
  border-style: solid;
  border-width: 1px 0 0 0;
}

.demo, .code {
  flex-basis: 50%;
  overflow: auto;
}

/*
$output-height: 32px;

.root {
  size: 100%;
  display: flex;
  overflow: auto;
  min-width: 1024px;
} */

/*
.api-demo {


    & > div {
        height: 100%;
    }

    &__live {
        position: relative;
        border: 0 0 1px / solid;
        box: horizontal center middle;
        padding: 24px 24px $output-height;
        flex-basis: 50%;
        min-height: 200px;

        .api-demo__title {
            position: absolute;
            top: 24px;
            left: 24px;
        }
    }

    &__title {
        font-size: $text-small-2;
        line-height: 1;
        text-transform: uppercase;
        font-weight: 500;
        opacity: .56;
    }

    &__code {
        flex-basis: 50%;
        min-height: 128px;
        height: 100%;
    }

    &__left {
        box: vertical;
        overflow: auto;
    }

    &__params {
        border: 0 0 0 1px / solid;
        padding: 24px 24px;
        overflow: auto;

        &-about {
            margin-bottom: 32px;
        }

        .api-demo__title {
            margin-bottom: 24px;
        }
    }

    &__output {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        background: $grey-200;
        border-width: 1px 0 0;
        border-style: solid;
        box: horizontal middle;
        font-weight: 500;
        font-size: 12px;

        &-title {
          background: rgba(0,0,0,.48);
          line-height: $output-height;
          color: #FFF;
          padding: 0 12px;
        }

        &-content {
          padding: 0 12px;
        }
    }
} */

</style>
