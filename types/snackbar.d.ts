import Vue from 'vue';
import SnackbarManager from '@vmsrc/snackbar/manager';

export interface SnackbarOptions {
  text: string;
  center?: boolean;
  duration?: number;
  actionLabel?: string;
  action?: () => any;
}

declare module 'vue/types/vue' {
  interface Vue {
    $snackbar: SnackbarManager;
  }
}

declare module 'vue-mapp/snackbar' {
  // export function show(): void;
}
