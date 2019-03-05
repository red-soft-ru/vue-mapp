import VueMappForm from './form.vue';

export interface VueMappSubmitData<T> {
  data: T;
  event: Event | null;
  form: VueMappForm;
}
