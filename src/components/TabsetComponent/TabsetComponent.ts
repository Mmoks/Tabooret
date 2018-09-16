import TabComponent from '@/components/TabComponent/TabComponent';
import { Tabset } from '@/interface.ts';
import { DELETE_TABSET } from '@/store/actions.type';


export default {
  name: 'TabsetComponent',
  components: {
    TabComponent,
  },
  props: {
    tabset: {} as Tabset 
  },
  computed: {

  },
  mounted() {
  },
  methods: {
    deleteTabset() {
      this.$store.dispatch(DELETE_TABSET, this.tabset.id);
    }
  }
}
