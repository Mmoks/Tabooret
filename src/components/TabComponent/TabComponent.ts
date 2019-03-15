import { DELETE_TAB } from "@/store/actions.type";
import { TabData } from "../../models/TabComponent.model";
import { Tab, DeleteTabPayload } from "@/models/Tab.model";

export default {
  name: "TabComponent",
  components: {},
  props: {
    tab: Object,
    tabsetId: Number,
    lockedTabset: Boolean
  },

  data(): TabData {
    return {
      tabIsHovered: false
    };
  },

  computed: {},

  mounted() {},

  methods: {
    deleteTab() {
      this.$emit("delete-tab", {
        tabId: this.tab.id,
        tabsetId: this.tabsetId
      } as DeleteTabPayload);
    }
  }
};
