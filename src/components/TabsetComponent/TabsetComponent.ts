import { mapGetters } from 'vuex'
import TabComponent from '@/components/TabComponent/TabComponent';

import { UPLOAD_NEW_TABSET } from '@/store/actions.type';

export default {
  name: 'TabsetComponent',
  components: {
    TabComponent,
  },
  props: [],
  computed: {
     ...mapGetters([
       'fullTabsetsData',
    ])
  },
  mounted() {
    // @ts-ignore
    this.$store.dispatch(UPLOAD_NEW_TABSET, 'tabsetsData');
  },
  methods: {
  }
}
