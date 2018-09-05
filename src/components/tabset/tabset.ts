import store from '@/store/store';
import tab from '@/components/tab/tab';

import { FETCH_TABSETS_DATA } from '@/store/actions.type';

export default {
  name: 'tabset',
  components: {tab},
  props: ['id'],
  data () {
    return {

    }
  },
  computed: {

  },
  mounted () {
    store.dispatch(FETCH_TABSETS_DATA, 'tabsetsData');
  },
  methods: {

  }
}
