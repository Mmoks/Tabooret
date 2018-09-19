import TabsetComponent from '../TabsetComponent/TabsetComponent';

import { mapGetters } from 'vuex';
import { UPLOAD_NEW_TABSET } from '@/store/actions.type';

export default {
  name: 'TabsetsListComponent',
  components: {
    TabsetComponent,
  },
  data() {
    return {
    }
  },
  props: [],
  
  computed: {
    ...mapGetters([
       'fullTabsetsData',
    ]),
  },
  
  mounted () {
  },
  
  methods: {

  }
  
}  
