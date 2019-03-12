import TabComponent from "../TabComponent/TabComponent";
import {
  DELETE_TABSET,
  TOGGLE_TABSET_LOCKING,
  CHANGE_TABSET_NAME,
  TOGGLE_TABSET_STARING
} from "@/store/actions.type";
import { TabsetData } from "../../models/TabsetComponent.model";
import { Tab, DeleteTabPayload } from "../../models/Tab.model";
import { ChangeTabsetNamePayload } from "@/models/Tabset.model";

export default {
  name: "TabsetComponent",
  components: {
    TabComponent
  },

  data(): TabsetData {
    return {
      nameIsEditing: false,
      tabsetName: "" || this.tabset.tabsetName,
      isHovered: false
    };
  },

  props: {
    tabset: Object
  },

  computed: {},

  mounted() {},

  methods: {
    deleteTabset() {
      this.$emit("delete-tabset", this.tabset.id);
    },

    toggleLock() {
      this.$emit("toggle-lock", this.tabset.id);
    },

    toggleStar() {
      this.$emit("toggle-star", this.tabset.id);
    },

    startEditingTabsetName() {
      this.nameIsEditing = true;

      this.$nextTick(() => {
        this.$refs.tabsetNameInput.$el.focus();
      });
    },

    saveTabsetName(event) {
      if (!this.nameIsEditing) {
        return;
      }

      const payload: ChangeTabsetNamePayload = {
        id: this.tabset.id,
        tabsetName: this.tabsetName
      };
      this.$emit("change-tabset-name", payload);
      this.nameIsEditing = false;
      event.target.blur();
    },

    cancelEditing() {
      this.tabsetName = this.tabset.tabsetName;
      this.nameIsEditing = false;
    },

    restoreTabset() {
      this.tabset.tabs.map((tab: Tab) =>
        window.chrome.tabs.create({
          url: tab.url,
          active: false
        })
      );
      return !this.tabset.locked
        ? this.$emit("delete-tabset", this.tabset.id)
        : null;
    },

    deleteTab(payload: DeleteTabPayload) {
      this.$emit("delete-tab", payload);
    }
  }
};
