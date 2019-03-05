import Vue from 'vue';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    demo?: ComponentDemoParams;
  }
}

export interface ComponentDemoParams {
  path?: string;
  group?: string;
  title: string;
}
