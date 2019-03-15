import { SHOW_ONLY_STARRED } from "@/store/actions.type";
import { mapGetters } from "vuex";
import store from '@/store/store';

export default {
  name: "TheNavigationBarComponent",
  components: {},
  props: [],

  data() {
    return {
      menuVisible: false,
    };
  },

  computed: {
    ...mapGetters(["showOnlyStarred", "tabsets", "starredTabsetsCount"])
  },

  mounted() {},
  methods: {
    toggleShowOnlyStarred() {
      store.dispatch(SHOW_ONLY_STARRED, !this.showOnlyStarred);
    }
  }
};
