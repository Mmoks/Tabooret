import { FilterInputData } from "../../models/FilterInputComponent.model";
import { mapGetters } from "vuex";
import store from "@/store/store";
import { FILTER_TABSETS_BY_NAME } from "@/store/actions.type";

export default {
  name: "FilterInputComponent",
  components: {},
  props: [],
  data(): FilterInputData {
    return {
      isFocused: false,
      query: ""
    };
  },
  computed: {
    ...mapGetters(["tabsets"])
  },
  mounted() {},
  methods: {
    filterTabsets() {
      return store.dispatch(FILTER_TABSETS_BY_NAME, this.query.toLowerCase());
    }
  }
};
