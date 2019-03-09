import { SORT_BY_STAR } from "@/store/actions.type";
import { mapGetters } from "vuex";
import { SHOW_ONLY_STARED } from "@/store/mutations.type";

export default {
  name: "TheNavigationBarComponent",
  components: {},
  props: [],

  data() {
    return {
      menuVisible: false,
      count: 0
    };
  },

  computed: {
    ...mapGetters(["showOnlyStared", "fullTabsetsData"])
  },

  mounted() {
    setTimeout(() => {
      console.log("SADAS", this.fullTabsetsData);
      for (let tabset of this.fullTabsetsData) {
        if (tabset.stared) {
          this.count++;
        }
      }
    }, 500); 
  },
  methods: {
    toggleShowOnlyStared() {
      this.$store.commit(SHOW_ONLY_STARED, !this.showOnlyStared);
      this.$store.dispatch(SORT_BY_STAR);
    }
  }
};
