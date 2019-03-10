import TabComponent from '../TabComponent/TabComponent'
import { ChangeTabsetNamePayload } from '@/interface.ts'
import {
  DELETE_TABSET,
  TOGGLE_TABSET_LOCKING,
  CHANGE_TABSET_NAME,
  TOGGLE_TABSET_STARING,
} from '@/store/actions.type'
import {
  TabsetDataInterface,
  TabsetPropsInterface,
} from '../../models/TabsetComponent.model'
import { Tab } from '../../models/Tab.model'

export default {
  name: 'TabsetComponent',
  components: {
    TabComponent,
  },

  data(): TabsetDataInterface {
    return {
      nameIsEditing: false,
      tabsetName: '' || this.tabset.tabsetName,
      isHovered: false,
    }
  },

  props: {
    tabset: {},
  } as TabsetPropsInterface,

  computed: {},

  mounted() {},

  methods: {
    deleteTabset() {
      this.$store.dispatch(DELETE_TABSET, this.tabset.id)
    },

    toggleLock() {
      this.$store.dispatch(TOGGLE_TABSET_LOCKING, this.tabset.id)
    },

    toggleStar() {
      this.$store.dispatch(TOGGLE_TABSET_STARING, this.tabset.id)
    },

    startEditingTabsetName() {
      this.nameIsEditing = true

      this.$nextTick(() => {
        this.$refs.tabsetNameInput.$el.focus()
      })
    },

    saveTabsetName(event) {
      if (!this.nameIsEditing) {
        return
      }

      const payload: ChangeTabsetNamePayload = {
        id: this.tabset.id,
        tabsetName: this.tabsetName,
      }

      this.$store.dispatch(CHANGE_TABSET_NAME, payload)
      this.nameIsEditing = false
      event.target.blur()
    },

    cancelEditing() {
      this.tabsetName = this.tabset.tabsetName
      this.nameIsEditing = false
    },

    restoreTabset() {
      this.tabset.tabs.map((tab: Tab) =>
        window.chrome.tabs.create({
          url: tab.url,
          active: false,
        })
      )
      return !this.tabset.locked
        ? this.$store.dispatch(DELETE_TABSET, this.tabset.id)
        : null
    },
  },
}
