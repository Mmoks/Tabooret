import { DELETE_TAB } from '@/store/actions.type'
import { TabDataInterface } from '../../models/TabComponent.model'

export default {
  name: 'TabComponent',
  components: {},
  props: {
    tab: Object,
    tabsetID: Number,
    lockedTabset: Boolean,
  },

  data(): TabDataInterface {
    return {
      tabIsHovered: false,
    }
  },

  computed: {},

  mounted() {},

  methods: {
    deleteTab() {
      return !this.lockedTabset
        ? this.$store.dispatch(DELETE_TAB, {
            tabID: this.tab.id,
            tabsetID: this.tabsetID,
          })
        : null
    },
  },
}
