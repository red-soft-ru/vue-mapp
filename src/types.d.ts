import InputElement from './input.mixin';
// import VueMappOption from './option/index__';
import VueMappOption from './option/component.vue';

export type VMInputState = 'init' | 'disabled' | 'readonly';

export type VMInputCheckState =
  | 'init'
  | 'novalidate'
  | 'valid'
  | 'error'
  | 'process'
  | 'changed';

export interface VMOptionContainer {
  model: any;
  firstSelectedOption: VueMappOption | null;
  isMultiple: boolean;
  options: VueMappOption[];
  setOption: (option: VueMappOption) => void;
  showPopup: () => void;
  hidePopup: () => void;
  initOption: (option: VueMappOption) => void;
}
