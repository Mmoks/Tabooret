import TabComponent from '@/components/TabComponent/TabComponent';
import { Tabset, ChangeTabsetNamePayload } from '@/interface.ts';
import { DELETE_TABSET, TOGGLE_TABSET_LOCKING, CHANGE_TABSET_NAME } from '@/store/actions.type';


export default {
  name: 'TabsetComponent',
  components: {
    TabComponent,
  },
  
  data() {
    return {
      nameIsChanging: false as boolean,
      tabsetName: '' as string,
      isHovered: false as boolean,
    }
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

    startChangingTabsetName() {
      this.nameIsChanging = true;
    },

    saveTabsetName(event) {
      let payload: ChangeTabsetNamePayload = {
        id: this.tabset.id,
        tabsetName: this.tabsetName
      };

      this.$store.dispatch(CHANGE_TABSET_NAME, payload)
      event.target.blur();     
      this.nameIsChanging = false;      
    }
  }
}