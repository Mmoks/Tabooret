import TabComponent from '@/components/TabComponent/TabComponent';
import { Tabset, ChangeTabsetNamePayload } from '@/interface.ts';
import { DELETE_TABSET, TOGGLE_TABSET_LOCKING, CHANGE_TABSET_NAME, RESTORE_TABSET } from '@/store/actions.type';


export default {
  name: 'TabsetComponent',
  components: {
    TabComponent,
  },

  data() {
    return {
      nameIsEditing: false as boolean,
      tabsetName: '' || this.tabset.tabsetName as string,
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

    startEditingTabsetName() {
      if (this.tabset.locked) return;

      this.nameIsEditing = true;

      this.$nextTick(() => {
          this.$refs.tabsetNameInput.$el.focus();
      });

    },

    saveTabsetName(event) {
      if (!this.nameIsEditing) return;

      let payload: ChangeTabsetNamePayload = {
        id: this.tabset.id,
        tabsetName: this.tabsetName
      };

      this.$store.dispatch(CHANGE_TABSET_NAME, payload)
      this.nameIsEditing = false;      
      event.target.blur();
    },

    cancelEditing() {
      this.tabsetName = this.tabset.tabsetName;
      this.nameIsEditing = false;
    },

    restoreTabset() {
      this.$store.dispatch(RESTORE_TABSET, this.tabset.tabs);
      if (!this.tabset.locked) this.$store.dispatch(DELETE_TABSET, this.tabset.id);
    }
  },
}