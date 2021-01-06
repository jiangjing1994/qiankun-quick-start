<template>
    <div style="overflow: hidden;height: calc(100vh - 64px);">
        <div>
            <el-table :data="layout" :show-header="false" style="width: 100%" @row-click="selectRow">
                <el-table-column prop="name" label="图层" >
                    <template slot-scope="scope">

                       <div :style="{'background-color': scope.row.active?'#f0f9eb':'transparent'}">
                           {{scope.row.name}}:{{scope.row.z}}
                       </div>
                    </template>

                </el-table-column>
            </el-table>
            <p><br/></p>
            <p><br/></p>
            <p><br/></p>
            <p><br/></p>
        </div>
    </div>
</template>
<script>
    import {mapState, mapActions} from 'vuex'
    import BetterScrollMixin from '@/components/better_scroll_mixin'

    export default {
        mixins: [BetterScrollMixin],
        computed: {
            ...mapState({
                layout: state => state.dashboard.layout,
            })
        },
        methods:{
            selectRow(row){
                this.setActive(this.layout.indexOf(row))
              // this.setActive(row)
            },
            ...mapActions('ren/dashboard', [
                'setActive', 'unsetActive'
            ])
        }
    }
</script>
