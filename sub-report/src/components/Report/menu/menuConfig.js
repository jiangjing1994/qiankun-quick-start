
export const  menuData=[
    {
        label: '基础图表',value:'base_charts',icon: "charts",
        children: [

            {value:'echarts_line',label:'折线图',icon: "charts-line"},
            {value:'echarts_bar',label:'柱状图',icon: "charts-bar"},
            {value:'echarts_bar_y_category',icon: "charts-tiao",label:'条形图',},
            {value:'echarts_radar',icon: "charts-radar",label:'雷达图',},
            {value:'echarts_scatter',icon: "charts-scatter",label:'散点图',},
            {value:'echarts_gauge',icon: "echarts-gauge",label:'仪表盘',},
            {value:'echarts_pie',icon: "echarts-pie",label:'饼图'},
            {value:'echarts_ring',icon: "echarts-ring",label:'环图'}
        ]
    },

    {
        label: '数据模版',value:'data',icon: "metrics",
        children: [
            {value:'core_metrics',icon: "d",label:'核心指标',},
            {value:'data_icons',icon: "d",label:'数据展示',},

        ]
    },

    {
        label: '表格',value:'table',icon: "table",
        children: [
            {value:'simple_table',icon: "d",label:'基础表格',},
            {value:'scroll_table',icon: "d",label:'轮播表格',},

        ]
    },

    {
        label: '高级图表',value:'advance_charts',icon: "advance",
        children: [
            {value:'echarts_customize',icon: "d",label:'自定义图表',},
            {value:'base_flow',icon: "d",label:'标准流程图',},

        ]
    },

    {
        label: '文本',value:'text',icon: "text",
        children: [
            {value:'text_base',icon: "d",label:'文本框',},
            {value:'text_time',icon: "d",label:'时间框',},
            {value:'text_carousel',icon: "d",label:'跑马灯',},
        ]
    },

    {
        label: '过滤条件',value:'filters',icon: "filter",
        children: [
            {value:'filters_input',icon: "d",label:'文本域',},
            // {value:'6',icon: "d",label:'一般表格',},

        ]
    },
    {
        label: '装饰',value:'ornament',icon: "filter",
        children: [
            {value:'ornament_icon',icon: "d",label:'svg-icon',},
            // {value:'6',icon: "d",label:'一般表格',},

        ]
    },

]
