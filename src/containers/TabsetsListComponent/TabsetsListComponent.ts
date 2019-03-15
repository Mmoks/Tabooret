import TabsetComponent from "../../components/TabsetComponent/TabsetComponent";

import { mapGetters } from "vuex";
import * as actionsTypes from "@/store/actions.type";
import { DeleteTabPayload } from "@/models/Tab.model";
import store from "@/store/store";
import { ChangeTabsetNamePayload } from "@/models/Tabset.model";

export default {
  name: "TabsetsListComponent",
  components: {
    TabsetComponent
  },
  data() {
    return {};
  },
  props: [],

  computed: {
    ...mapGetters(["tabsets"])
  },

  mounted() {
    store.dispatch(actionsTypes.UPLOAD_NEW_TABSET).then(async () => {
      await store.dispatch(actionsTypes.FETCH_TABSETS_DATA);
      await store.dispatch(actionsTypes.SORT_BY_STAR);
    });
  },

  methods: {
    deleteTab(payload: DeleteTabPayload) {
      store.dispatch(actionsTypes.DELETE_TAB, payload);
    },

    deleteTabset(tabsetId: number) {
      store.dispatch(actionsTypes.DELETE_TABSET, tabsetId);
    },

    toggleLock(tabsetId: number) {
      store.dispatch(actionsTypes.TOGGLE_TABSET_LOCKING, tabsetId);
    },

    toggleStar(tabsetId: number) {
      store.dispatch(actionsTypes.TOGGLE_TABSET_STARING, tabsetId);
    },

    changeTabsetName(payload: ChangeTabsetNamePayload) {
      store.dispatch(actionsTypes.CHANGE_TABSET_NAME, payload);
    }
  }
};
