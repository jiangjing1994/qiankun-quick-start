import BScroll from 'better-scroll'

export default {
    data(){
        return {
            BS: null
        }
    },
    mounted () {
        this.scrollInit()
    },
    beforeDestroy () {
        this.scrollDestroy()
    },
    methods: {
        scrollInit () {
            this.BS = new BScroll(this.$el, {
                mouseWheel: true,
                click: true,
                // 如果你愿意可以打开显示滚动条
                scrollbar: {
                    fade: true,
                    interactive: false
                }
            })
        },
        scrollDestroy () {
            try {
                this.BS.destroy()
            } catch (e) {
                delete this.BS
                this.BS = null
            }
        }
    }
}