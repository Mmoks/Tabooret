import TabComponent from '@/components/TabComponent/TabComponent';
import { Tabset } from '@/interface.ts';
import { DELETE_TABSET, TOGGLE_TABSET_LOCKING } from '@/store/actions.type';


export default {
  name: 'TabsetComponent',
  components: {
    TabComponent,
  },
  
  data() {
    return {}
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
    },

    toggleLock() {
      this.$store.dispatch(TOGGLE_TABSET_LOCKING, this.tabset.id);
    },

  }
}