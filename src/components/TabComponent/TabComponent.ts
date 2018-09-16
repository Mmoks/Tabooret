import { DELETE_TAB } from '@/store/actions.type' 


export default {
    name: 'TabComponent',
    components: {},
    props: {
        tab: Object,
        tabsetID: Number,
    },
    data() {
        return {
            tabIsHovered: false as boolean
        }
    },
    computed: {},
    mounted() {
    },
    methods: {
        hover() {
            this.tabIsHovered = true
        },
        
        unHover() {
            this.tabIsHovered = false
        },

        deleteTab() {
            this.$store.dispatch(DELETE_TAB, {
                tabID: this.tab.id,
                tabsetID: this.tabsetID,
            });
        }    
    }
}
