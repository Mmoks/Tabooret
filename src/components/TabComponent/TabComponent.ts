export default {
    name: 'TabComponent',
    components: {},
    props: {
        tab: Object
    },
    data() {
        return {
            hovered: false as boolean
        }
    },
    computed: {},
    mounted() {
    },
    methods: {
        hover() {
            //@ts-ignore
            this.hovered = true
        },
        unHover() {
            //@ts-ignore
            this.hovered = false
        }
    }
}
