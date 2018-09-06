import store from '@/store/store';
import TabComponent from '@/components/TabComponent/TabComponent';

import { FETCH_TABSETS_DATA } from '@/store/actions.type';

export default {
  name: 'TabsetComponent',
  components: {
    TabComponent,
  },
  props: [],
  data () {
    return {
      tabsets: []
    }
  },
  computed: {
    foo() {
      return store.state.tabsets;
    }
  },
  mounted() {
    store.dispatch(FETCH_TABSETS_DATA, 'tabsetsData').then(() => {
      // @ts-ignore
      this.tabsets = store.state.tabsets;
    });
    return store.state.tabsets
  },
  methods: {
    getTabsets() {
      return store.state.tabsets;
    }
  }
}
