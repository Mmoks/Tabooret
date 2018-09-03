import store from '@/store/store';

export default {
  name: 'tabset',
  components: {},
  props: ["id"],
  data () {
    return {

    }
  },
  computed: {

  },
  mounted () {
    store.dispatch("loadTabsets", "tabsetsData");
  },
  methods: {

  }
}
