<template>
    <div>
        <KemForm
                ref="editForm"
                :form-items="formItems"
                :form-config="{labelPosition:'left',size:'mini',labelWidth:'120px'}"
                :data="chart.chart_settings"
        >
            <div slot="metricsSelected">
                <el-table
                        :data="chart.chart_settings.metricsSelected"
                        border
                        style="width: 100%">
                    <el-table-column prop="name" label="指标名称" width="100"></el-table-column>
                    <el-table-column prop="name" label="指标单位" width="180">
                        <template slot-scope="scope">
                            <KemInput v-model="scope.row.unit_name"></KemInput>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="指标宽度" width="180">
                        <template slot-scope="scope">
                            <KemInputNumber v-model="scope.row.span"></KemInputNumber>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="指标字体颜色" width="180">
                        <template slot-scope="scope">
                            <KemColorPicker v-model="scope.row.metric_color"></KemColorPicker>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

        </KemForm>

    </div>
</template>
<script>

export default{
    props: ['chart'],


    data() {
        return {

            sas:'s',


        }

    },

    computed: {
        formItems() {
            const type = this.chart?.chart_settings?.chart_type
            const base = [
                {label: '显示图例', prop: 'legendVisible', span:12, component: 'el-switch',},
                {label: '显示提示框', prop: 'tooltipVisible', span:12, component: 'el-switch',},
            ]
            const baseText = [

                {label: '字体大小', prop: 'fontSize', span:24, component: 'KemInputNumber',},
                {label: '动态数据', prop: 'setData', span:24, component: 'KemInput',},
                {label: '字体间距', prop: 'split', span:24, component: 'KemInputNumber',},
                {label: '字体行高', prop: 'lineHeight', span:24, component: 'KemInputNumber',},
                {label: '字体颜色', prop: 'color', span:24, component: 'KemInputColor',},
                {label: '字体背景', prop: 'backgroundColor', span:24, component: 'KemInputColor',},
                {label: '文字粗细', prop: 'fontWeight', span:24,component: 'KemSelect',props:{
                        options:[
                            {label:'normal',value:'normal'},
                            {label:'bold',value:'bold'},
                            {label:'bolder',value:'bolder'},
                            {label:'lighter',value:'lighter'},
                        ]},},


                {label: '对齐方式', prop: 'textAlign', span:24,component: 'KemSelect',props:{
                        options:[
                            {label:'left',value:'left'},
                            {label:'right',value:'right'},
                            {label:'center',value:'center'},

                        ]},},
                {label: '文本修饰', prop: 'textDecoration', span:24, component: 'KemSelect', props:{
                        options:[
                            {label:'none',value:'none'},
                            {label:'underline',value:'underline'},
                            {label:'overline',value:'overline'},
                            {label:'line',value:'line'},
                            {label:'blink',value:'blink'},

                        ]}},

            ]
            let formItems = {
                echarts_line:[
                    ...base,
                    {label: '设置为面积图', prop: 'area', span:12, component: 'el-switch',},
                    {label: '隐藏水平线', prop: 'hiddenMarkLine', span:12, component: 'el-switch',},
                    {label: '堆叠选项', prop: 'stack', span:12, component: 'CodeEditorButton',},
                    {label: '指标所在的轴', prop: 'axisSite', span:12, component: 'CodeEditorButton',},
                    {label: '左右轴标题', prop: 'yAxisName', span:12, component: 'CodeEditorButton',},
                    {label: '左右轴最小值', prop: 'min', span:12, component: 'CodeEditorButton',},
                    {label: '左右轴最大值', prop: 'max', span:12, component: 'CodeEditorButton',},
                    {label: '倾斜', prop: 'axisLabelRotate', span:24, component: 'KemInputNumber',},


                ],
                echarts_bar:[
                    ...base,
                    {label: '隐藏水平线', prop: 'hiddenMarkLine', span:12, component: 'el-switch',},
                    {label: '禁用阈值颜色', prop: 'hiddenWarnItemStyle', span:12, component: 'el-switch',},
                    {label: '堆叠选项', prop: 'stack', span:12, component: 'CodeEditorButton',},
                    {label: '显示折线', prop: 'showLine', span:12, component: 'CodeEditorButton',},
                    {label: '指标所在的轴', prop: 'axisSite', span:12, component: 'CodeEditorButton',},
                    {label: '左右轴标题', prop: 'yAxisName', span:12, component: 'CodeEditorButton',},
                    {label: '左右轴最小值', prop: 'min', span:12, component: 'CodeEditorButton',},
                    {label: '左右轴最大值', prop: 'max', span:12, component: 'CodeEditorButton',},
                    {label: '设置数据排序方式', prop: 'dataOrder', span:12, component: 'CodeEditorButton',},
                    {label: '倾斜', prop: 'axisLabelRotate', span:24, component: 'KemInputNumber',},


                ],
                echarts_bar_y_category:[
                    ...base,
                    {label: '隐藏水平线', prop: 'hiddenMarkLine', span:12, component: 'el-switch',},
                    {label: '禁用阈值颜色', prop: 'hiddenWarnItemStyle', span:12, component: 'el-switch',},
                    {label: '坐标轴标题', prop: 'yAxisName', span:12, component: 'CodeEditorButton',},
                    {label: '堆叠选项', prop: 'stack', span:12, component: 'CodeEditorButton',},
                    {label: 'axisSite', prop: 'axisSite', span:12, component: 'CodeEditorButton',},
                    {label: '显示折线', prop: 'showLine', span:12, component: 'CodeEditorButton',},
                    {label: '倾斜', prop: 'axisLabelRotate', span:24, component: 'KemInputNumber',},


                ],
                echarts_radar:[
                    ...base,

                ],

                echarts_pie:[
                    ...base,
                    {label: '饼图半径', prop: 'radius', span:24, component: 'KemInputNumber',},
                    {label: '纵向偏移量', prop: 'offsetY', span:24, component: 'KemInputNumber',},
                    {label: '显示类型', prop: 'roseType', span:24,component: 'KemSelect',props:{
                            options:[
                                {label:'默认',value:''},
                                {label:'radius',value:'radius'},
                                {label:'area',value:'area'},
                            ]},},
                    {label: '选中模式', prop: 'selectedMode', span:24,component: 'KemSelect',props:{
                            options:[
                                {label:'默认',value:''},
                                {label:'single',value:'single'},
                                {label:'multiple',value:'multiple'},
                            ]},},
                    {label: '扇区放大动画', prop: 'hoverAnimation', span:24, component: 'el-switch',},
                    //{label: '多圆饼图', prop: 'level', span:12, component: 'CodeEditorButton',},
                    //{label: 'legend显示数量', prop: 'legendLimit', span:24, component: 'KemInputNumber',},
                    {label: '超出显示“其他”', prop: 'limitShowNum', span:24, component: 'KemInputNumber',},

                ],
                echarts_ring:[
                    ...base,
                    {label: '环图半径', prop: 'radius', span:24, component: 'CodeEditorButton',},
                    {label: '纵向偏移量', prop: 'offsetY', span:24, component: 'KemInputNumber',},
                    {label: '显示类型', prop: 'roseType', span:24,component: 'KemSelect',props:{
                            options:[
                                {label:'默认',value:''},
                                {label:'radius',value:'radius'},
                                {label:'area',value:'area'},
                            ]},},
                    {label: '选中模式', prop: 'selectedMode', span:24,component: 'KemSelect',props:{
                            options:[
                                {label:'默认',value:''},
                                {label:'single',value:'single'},
                                {label:'multiple',value:'multiple'},
                            ]},},
                    {label: '扇区放大动画', prop: 'hoverAnimation', span:24, component: 'el-switch',},
                    {label: '超出显示“其他”', prop: 'limitShowNum', span:24, component: 'KemInputNumber',},

                ],

                echarts_scatter:[
                    ...base,
                ],
                // unit
                // pos
                // radius
                // range
                // highlight
                echarts_gauge:[
                    ...base,
                    {label: '单位', prop: 'unit', span:24, component: 'KemInput',},
                    // {label: '位置', prop: 'pos', span:24, component: 'KemInputSlider',props:{
                    //         formatTooltip:(val)=>{
                    //             return val + '%';
                    //         }
                    //     }},
                    /*{label: '半径', prop: 'radius', span:24, component: 'KemInputSlider',props:{
                            formatTooltip:(val)=>{
                                return val + '%';
                            }
                        }},*/
                    {label: '最大值', prop: 'range_max', span:24, component: 'KemInputNumber',},
                    {label: '最小值', prop: 'range_min', span:24, component: 'KemInputNumber',},
                    {label: '颜色', prop: 'highlight', span:24, component: 'KemInputColor',},

                ],
                simple_table:[],
                // header	表头数据	Array<String>	---	[]
                // data	表数据	Array<Array>	---	[]
                // rowNum	表行数	Number	---	5
                // headerBGC	表头背景色	String	---	'#00BAFF'
                // oddRowBGC	奇数行背景色	String	---	'#003B51'
                // evenRowBGC	偶数行背景色	String	---	#0A2732
                // waitTime	轮播时间间隔(ms)	Number	---	2000
                // headerHeight	表头高度	Number	---	35
                // columnWidth	列宽度	Array<Number>	[1]	[]
                // align	列对齐方式	Array<String>	[2]	[]
                // index	显示行号	Boolean	true|false	false
                // indexHeader	行号表头	String	-	'#'
                // carousel	轮播方式	String	'single'|'page'	'single'
                // hoverPause	悬浮暂停轮播	Boolean	---	true

                scroll_table:[
                    {label: 'index', span:24, prop: 'index',component: 'KemSwitch',},
                    {label: 'columnWidth',  span:24,prop: 'columnWidth',component: 'CodeEditorButton',},
                    {label: 'align', span:24,prop: 'align',component: 'CodeEditorButton',},
                    {label: '表行数', span:24,prop: 'rowNum',component: 'KemInputNumber',},
                    {label: '表头背景色', span:24,prop: 'headerBGC',component: 'KemInputColor',},
                    {label: '奇数行背景色', span:24,prop: 'oddRowBGC',component: 'KemInputColor',},
                    {label: '偶数行背景色', span:24,prop: 'evenRowBGC',component: 'KemInputColor',},
                    {label: '轮播时间间隔(ms)', span:24,prop: 'waitTime',component: 'KemInputNumber',},
                    {label: '表头高度', span:24,prop: 'headerHeight',component: 'KemInputNumber',},
                    {label: '列宽度', span:24,prop: 'columnWidth',component: 'CodeEditorButton',props:{content:'Array<Number>'}},
                    {label: '列对齐方式', span:24,prop: 'align',component: 'CodeEditorButton',props:{content:'Array<String>'}},
                    {label: '显示行号', span:24,prop: 'index',component: 'KemSwitch',},
                    {label: '行号表头', span:24,prop: 'indexHeader',component: 'KemInput',},
                    {label: '轮播方式', span:24,prop: 'carousel', component: 'KemSelect',props:{
                            options:[
                                {label:'single',value:'page'},
                                {label:'multiple',value:'single'},
                            ]},},
                    {label: '悬浮暂停轮播', span:24,prop: 'hoverPause',component: 'KemSwitch',},


                ],

                core_metrics:[
                    {label: '指标字体颜色', prop: 'metricColor', span:12, component: 'KemColorPicker',},
                    {label: '是否显示边框', prop: 'isBoard', span:12, component: 'KemSwitch',},
                    {label: '指标字体大小', prop: 'metricFontsize', span:24, component: 'KemInputNumber',},
                    {label: '单位字体大小', prop: 'metricUnitFontsize', span:24, component: 'KemInputNumber',},
                    {label: '标题字体大小', prop: 'titleFontsize', span:24, component: 'KemInputNumber',},
                    {
                        label: '各个指标配置',
                        span:24,
                        prop: 'metricsSelected',
                        showIf: () => true,
                        slot: 'metricsSelected'
                    }
                ],
                base_flow:[
                    {label: 'name', prop: 'name', span:24, component: 'KemInput',},
                    {label: 'key', prop: 'key', span:24, component: 'KemInput',},
                    {label: '颜色', prop: 'color', span:24, component: 'KemInputColor',},
                    {label: '背景色', prop: 'backgroundColor', span:24, component: 'KemInputColor',},
                    {label: 'nodeList', prop: 'nodeList', span:24, component: 'CodeEditorButton',},
                    {label: 'lineList', prop: 'lineList', span:24, component: 'CodeEditorButton',},

                    {label: '绑定标题', prop: 'bindLabel', span:24, component: 'CodeEditorButton',props:{content:'{label:"标题",color:"red"}'}},
                    {label: '绑定值', prop: 'bindvalue', span:24, component: 'CodeEditorButton',props:{content:'[{label:"值",color:"red"}]'}},

                ],

                filters_input:[

                    {label: '类型', prop: 'type', span:24, component: 'KemSelect', props:{
                            options:[
                                {label:'search',value:'search'},
                            ]}},
                    {label: '文字连接', prop: 'link', span:24, component: 'el-switch',},
                    {label: '连接方式', prop: 'linkTarget', span:24, component: 'KemSelect', props:{
                            options:[
                                {label:'_parent',value:'_parent'},
                                {label:'_blank',value:'_blank'},
                            ]}},
                    {label: '链接地址', prop: 'linkHref', span:24, component: 'KemInput',},
                    {label: '文字提示', prop: 'placeholder', span:24, component: 'KemInput',},
                    {label: '静态参数', prop: 'staticParams', span:24, component: 'CodeEditorButton',},
                 ],
                ornament_icon:[


                    {label: 'name', prop: 'iconName', span:24, component: 'IconSelect',},
                 ],
                text_base:[
                    ...baseText,
                    {label: '跑马灯', prop: 'scroll', span:24, component: 'el-switch',},
                    {label: '文字连接', prop: 'link', span:24, component: 'el-switch',},
                    {label: '连接方式', prop: 'linkTarget', span:24, component: 'KemSelect', props:{
                            options:[
                                {label:'_parent',value:'_parent'},
                                {label:'_blank',value:'_blank'},
                            ]}},
                    {label: '链接地址', prop: 'linkHref', span:24, component: 'KemInput',},
                ],
                text_time:[
                    ...baseText,

                    {label:'显示格式',prop:'type',span:24,component:'KemSelect',props:{
                        options:[
                            {label:'YYYY.MM.DD HH:mm:ss',value:'YYYY.MM.DD HH:mm:ss'},
                            {label:'YYYY.MM.DD',value:'YYYY.MM.DD'},
                            {label:'HH:mm:ss',value:'HH:mm:ss'},
                        ]
                        }}
                ],
                text_carousel:[
                    ...baseText
                ],
                data_icons:[
                    {label: '宽度', prop: 'span', span:24, component: 'KemInputNumber'},
                    {label: '间隔', prop: 'gutter', span:24, component: 'KemInputNumber'},
                    {label: '动画', prop: 'animation', span:24, component: 'KemSwitch'},
                    {label: '背景颜色', prop: 'backgroundColor', span:24, component: 'KemInputColor'},
                    {label: '卡片颜色', prop: 'itemBackgroundColor', span:24, component: 'KemInputColor'},
                    {label: '字体颜色', prop: 'color', span:24, component: 'KemInputColor'},
                    {label: '文字颜色', prop: 'titleColor', span:24, component: 'KemInputColor'},
                    {label: '禁用计数器', prop: 'discount', span:24, component: 'KemSwitch'},
                    {label: '保留小数位数', prop: 'decimals', span:24, component: 'KemInputNumber'},

                ],
            }
            return formItems[type];
        }
    },
    created(){

    }
}
</script>
