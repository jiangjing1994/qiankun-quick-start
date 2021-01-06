<template>
    <div class="ren-dashboard-main-layout" id="editor_panel" :style="{'background-color': report.background_color}" @click="deactivateEv">
        <!--背景图片-->
        <div id="background" style="content: '';display: block;width: 100%;height: 100%;position: absolute;top: 0;right: 0;bottom: 0;left: 0;background-size: 100% 100%;transform-origin: 0 0;"
             :style="{'width': report.width + 'px', 'height': report.height + 'px', 'transform': 'scale('+scale+', '+scale+')',
             'background-image': 'url(\''+report.background_pic+'\')',
             'opacity': report.background_alpha /100,  'filter': 'blur(' + report.background_blur+ 'px)'}">
        </div>
        <!--图表元素-->
        <div id="layout" style="background-size: 100% 100%;transform-origin: 0 0;"
             :style="{'width': report.width + 'px', 'height': report.height*scale + 'px', 'transform': 'scale('+scale+', '+scale+')'}">
            <VueDragResize v-for="(element, index) in layout" :key="index"
                           :w="element.w" :h="element.h "
                           :x="element.x" :y="element.y" :z="element.z"
                           :isActive="element.active"
                           :parentW="report.width" :parentH="report.height"
                           :parentLimitation="true"
                           @resizing="changeSize($event, index)" @dragging="changePosition($event, index)"
                           @clicked.stop="activateEv(index)"
                           @deactivated="deactivateEv(index)"
            >

                <simple-dashboard-text v-if="element.chart_settings && element.chart_settings.chart_name === 'simple-dashboard-text'" :element="element"></simple-dashboard-text>
                <data-v-element v-else :element="element"></data-v-element>
                <div v-if="element.active" style="position:absolute;top:2px;right:5px;color:white;z-index: 10000;cursor:pointer;font-size:24px;">
                    <el-popconfirm
                            title="确认删除该元素么？"
                            @onConfirm="deleteElement(index)"
                    >
                        <div slot="reference" style="cursor:pointer;"><i class="el-icon-close"></i></div>
                    </el-popconfirm>

                    <div style="cursor:pointer;"  @click="copyElement(index)"><i class="el-icon-document-copy"></i></div>
                </div>
            </VueDragResize>

        </div>

        <div class="scale-block">
            <el-slider
                    v-model="editor_scale"
                    :max="200"
                    @change="changeScale"
                    show-input>
            </el-slider>
        </div>
    </div>
</template>

<script>
    import VueDragResize from 'vue-drag-resize';
    import { mapState, mapActions } from 'vuex'

    import DataVElement from '../element/DataVElement'
    import SimpleDashboardText from '../element/SimpleDashboardText'

    export default {
        name: 'dashboard-editor-app',
        components: {
            VueDragResize, DataVElement, SimpleDashboardText
        },
        data() {
            return {
                editor_scale: 100 ,
            }
        },

        computed: {
            ...mapState({
                report: state => state.dashboard.report,
                layout: state => state.dashboard.layout,
                scale: state => state.dashboard.scale,
            })
        },

        mounted() {

            let listEl = document.getElementById('editor_panel');
            if(this.report.resize_type === 1){
                this.autoResizeScreen({'width': listEl.clientWidth, 'height': listEl.clientHeight})
                this.editor_scale = Math.round(100 * this.scale)
            }
            window.addEventListener('resize', () => {
                if(this.report.resize_type === 1){
                    this.autoResizeScreen({'width': listEl.clientWidth, 'height': listEl.clientHeight})
                }
            })

        },

        methods: {
            deleteElement(index){
                this.layout.splice(index, 1)
            },
            copyElement(index){
                let copied = JSON.parse(JSON.stringify(this.layout[index]))
                copied.x = copied.x + 20
                copied.y = copied.y + 20
                console.log(copied)
                this.layout.push(copied)
            },
            changePosition(newRect, index) {
                this.resizeElement({'index': index, 'rect': newRect})
            },
            changeSize(newRect, index) {
                this.resizeElement({'index': index, 'rect': newRect})
            },
            changeScale(){
                this.refreshScale(this.editor_scale/100.0)
            },
            activateEv(index){
                this.setActive(index)
            },
            deactivateEv(index){
                if(index.target && (index.target.getAttribute("id") === 'layout' || index.target.getAttribute("id") ==='backaground')){
                    if(this.layout.find((l)=>l.active===true) !== undefined) {
                        this.unsetActive(this.layout.indexOf(this.layout.find((l) => l.active === true)))
                    }
                }
                //this.unsetActive(index)
            },

            ...mapActions('ren/dashboard', [
                'resizeElement', 'autoResizeScreen','refreshScale',
                'setActive', 'unsetActive'
            ])
        }
    }
</script>
