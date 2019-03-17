import { Vue, Component } from 'vue-property-decorator';

@Component
export default class DemoRoute extends Vue {
  get examples() {
    // @ts-ignore
    console.log(this.$options.examples); // @ts-ignore
    // @ts-ignore
    return this.$options.examples;
  }
}
