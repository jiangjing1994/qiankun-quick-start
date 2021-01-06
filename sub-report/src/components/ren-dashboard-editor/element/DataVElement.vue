<template>
    <div v-if="show">
        <dv-charts v-if="element.chart_settings.chart_name === 'dv-charts'"
                   ref="chart"
                   :style="{'height': element.h + 'px', 'width': element.w + 'px'}"
                   :option="element.chart_option">

        </dv-charts>
        <component v-else-if="element.chart_settings.chart_name.startsWith('dv-border-box') || element.chart_settings.chart_name.startsWith('dv-decoration')"
                   v-bind:is="element.chart_settings.chart_name"
                   ref="chart"
                   :style="{'height': element.h + 'px', 'width': element.w + 'px'}"
                   :color="[element.chart_settings.color1, element.chart_settings.color1]"
                   :reverse="element.chart_settings.reverse"
        >
        </component>
        <component v-else v-bind:is="element.chart_settings.chart_name"
                   ref="chart"
                   :style="{'height': element.h + 'px', 'width': element.w + 'px'}"
                   :config="element.chart_config"
                   >
        </component>
    </div>
</template>
<script>
    import {mapActions} from 'vuex'
    import {generateDatavChart} from '../libs/datav-chart-generate'
    export default {
        props: ['element'],
        data(){
          return {
              show: false,
              data: []
          }
        },
        watch: {
            'element.chart_settings': {
                handler: function(){
                    this.refresh()
                },
                deep: true
            },
            'element.chart_option': {
                handler: function(){
                    //this.refresh()
                },
                deep: true
            }
        },
        mounted(){
            setTimeout (()=>{
                this.$nextTick(() => {
                    this.refresh()
                    this.show = true
                })
            },0)
        },

        methods: {
            refresh:function(){
                if(this.element.chart_settings.dataModelId !== undefined){
                    this.loadModelData(this.element.chart_settings.dataModelId).then((res)=>{
                        if(this.element.chart_option == undefined){
                            this.element.chart_option = {}
                        }
                        this.data = res

                        let options = generateDatavChart(this.element.chart_settings, res, this.element.chart_option)
                        if(options &&
                            (this.element.chart_settings.chart_name === "dv-digital-flop" ||
                                this.element.chart_settings.chart_name === "dv-capsule-chart")
                        ) {
                            this.element.chart_config = options
                        }else if(options){
                            this.$refs.chart.chart.setOption(options, true)
                        }
                    })
                }
            },
            ...mapActions('ren/dashboard', ['loadModelData'])
        }

    }
</script>