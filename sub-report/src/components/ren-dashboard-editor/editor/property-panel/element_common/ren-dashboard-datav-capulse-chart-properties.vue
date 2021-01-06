<template>
    <div style="overflow: hidden;height: 100vh;">
        <div>
            <el-form class="aside-form" label-position="top" label-width="80px" :model="selectedItem"
                     v-if="selectedItem!==undefined">
                <p>暂无</p>
            </el-form>
            <p>&nbsp;</p><br/>
            <p>&nbsp;</p><br/>
            <p>&nbsp;</p><br/>
            <p>&nbsp;</p><br/>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from "vuex"
    import BetterScrollMixin from '@/components/better_scroll_mixin'

    export default {
        mixins: [BetterScrollMixin],

        computed: {
            ...mapGetters('ren/dashboard', [
                'selectedItem'
            ]),
        }
    }
</script>