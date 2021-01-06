<template>
    <div class="" style="width: 100%" >
<!--        <div class="aside-title">-->
<!--            <span class="collaspe-btn" :class="{'is-collapse': asideCollapse}" @click="collapseAside">-->
<!--                <ren-icon-svg name="double-right-arrow"></ren-icon-svg>-->
<!--            </span>-->
<!--            <span v-show="!asideCollapse">控制面板</span>-->
<!--        </div>-->

        <el-card>
            <div slot="header">
                控制面板
            </div>
            <div style="height:  calc(100vh - 150px);overflow: auto">

                <component v-if="!asideCollapse"  :is="componentName"></component>

            </div>

        </el-card>
    </div>
</template>
<script>
    import ReportMainSettings from "../settings/ReportMainSettings"
    import PanelBaseSetting from '../settings/PanelBaseSetting'

    import {mapState, mapActions} from "vuex"
    export default {
        components: {
            ReportMainSettings,
            PanelBaseSetting,
        },

        computed: {
            ...mapState({
                report: state => state.app.report,
                asideCollapse: state => state.report.asideCollapse,
                asideType: state => state.report.asideType
            }),
            componentName(){
                return {
                    report:'ReportMainSettings',
                    echart:'PanelBaseSetting'
                }[this.asideType]
            }
        },
        methods: {
            collapseAside () {
                this.asideCollapseToggle()
            },
            ...mapActions('ren/report', [
                'asideCollapseToggle'
            ]),
        }
    }
</script>
