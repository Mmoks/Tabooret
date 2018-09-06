import { Component, Vue } from 'vue-property-decorator';
import TabsetComponent from '@/components/TabsetComponent/TabsetComponent'; // @ is an alias to /src

@Component({
  components: {
	TabsetComponent,
  },
})
export default class Home extends Vue {}