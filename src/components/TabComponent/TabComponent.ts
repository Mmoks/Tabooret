export default {
    name: 'TabComponent',
    components: {},
    props: {
        tab: Object
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
            //@ts-ignore
            this.tabIsHovered = true
        },
        unHover() {
            //@ts-ignore
            this.tabIsHovered = false
        }
    }
}
