import store from '@/store/store';
import tab from '@/components/tab/tab';

import { FETCH_TABSETS_DATA } from '@/store/actions.type';

export default {
  name: 'tabset',
  components: {
    tab
  },
  props: ['id'],
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
