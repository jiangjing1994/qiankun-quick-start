import ecStat from 'echarts-stat'
import moment from 'moment'

export const createbaseTemplateConfig = ({chart_type, isDashboard, i}) =>{
    let x =0,y=0, w=6, h=4
    if(isDashboard){
        x = 100
        y = 100
        w = 600
        h = 400
    }
    const pos = {
        x,
        y,
        w,
        h,
    }
    return{
        chart_type,
        i,
        ...pos,
        static: false,
    }
}
export const createDefaultOption = ({chart_type}) =>{

    const chart_option_config = {
        echarts_bar: {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
            }]
        },
        echarts_bar_y_category: {
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
            },
            series: [
                {
                    name: '2011年',
                    type: 'bar',
                    data: [18203, 23489, 29034, 104970, 131744, 630230]
                },
                {
                    name: '2012年',
                    type: 'bar',
                    data: [19325, 23438, 31000, 121594, 134141, 681807]
                }
            ]
        },
        echarts_line: {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
        },
        echarts_radar: {
            radar: {
                indicator: [
                    { name: '销售（sales）', max: 6500},
                    { name: '管理（Administration）', max: 16000},
                    { name: '信息技术（Information Techology）', max: 30000},
                    { name: '客服（Customer Support）', max: 38000},
                    { name: '研发（Development）', max: 52000},
                    { name: '市场（Marketing）', max: 25000}
                ]
            },
            series: [{
                name: '预算 vs 开销（Budget vs spending）',
                type: 'radar',
                data: [
                    {
                        value: [4300, 10000, 28000, 35000, 50000, 19000],
                        name: '预算分配（Allocated Budget）'
                    },
                    {
                        value: [5000, 14000, 28000, 31000, 42000, 21000],
                        name: '实际开销（Actual Spending）'
                    }
                ]
            }]
        },
        echarts_pie:{
            series: [
                {
                    type: 'pie',
                    data: [
                        {value: 535, name: '荆州'},
                        {value: 510, name: '兖州'},
                        {value: 634, name: '益州'},
                        {value: 735, name: '西凉'}
                    ],

                }
            ]
        },
        echarts_ring:{
            series: [
                {
                    type: 'pie',
                    radius: ['50%', '70%'],
                    data: [
                        {value: 535, name: '荆州'},
                        {value: 510, name: '兖州'},
                        {value: 634, name: '益州'},
                        {value: 735, name: '西凉'}
                    ],

                }
            ]
        },
        echarts_scatter:{
            xAxis: {},
            yAxis: {},
            series: [{
                symbolSize: 20,
                data: [
                    [10.0, 8.04],
                    [8.0, 6.95],
                    [13.0, 7.58],
                    [9.0, 8.81],
                    [11.0, 8.33],
                    [14.0, 9.96],
                    [6.0, 7.24],
                    [4.0, 4.26],
                    [12.0, 10.84],
                    [7.0, 4.82],
                    [5.0, 5.68]
                ],
                type: 'scatter'
            }]
        },
        echarts_gauge:{
            series: [
                {
                    name: '业务指标',
                    type: 'gauge',
                    detail: {formatter: '{value}%'},
                    data: [{value: 50, name: '完成率'}]
                }
            ]
        },
        simple_table:{
            data: [
                {name:'张三', sex:'男'},
                {name:'李四', sex:'女'},
                {name:'王五', sex:'不详'},
            ],
            column:[
                {
                    label:'姓名',
                    prop:'name'
                }, {
                    label:'性别',
                    prop:'sex'
                }
            ],
            settings:{}

        },
        scroll_table:{
            header: ['列1', '列2', '列3'],
            data: [
                ['行1列1', '行1列2', '行1列3'],
                ['行2列1', '行2列2', '行2列3'],
                ['行3列1', '行3列2', '行3列3'],
                ['行4列1', '行4列2', '行4列3'],
                ['行5列1', '行5列2', '行5列3'],
                ['行6列1', '行6列2', '行6列3'],
                ['行7列1', '行7列2', '行7列3'],
                ['行8列1', '行8列2', '行8列3'],
                ['行9列1', '行9列2', '行9列3'],
                ['行10列1', '行10列2', '行10列3']
            ],
            rowNum:5,
            headerBGC:'#00BAFF',
            oddRowBGC:'#003B51',
            evenRowBGC:'#0A2732',
            waitTime:2000,
            headerHeight:35,
            columnWidth:'[]',
            align:'[]',
            index:false,
            indexHeader:'-',
            carousel:'single',
            hoverPause:true

        },
        base_flow:{
            "name": "流程",
            "key": "id",
            "nodeList": [
                {
                    "id": "nodeA",
                    "name": "需求审批",
                    "left": 10,
                    "top": 10,
                },
                {
                    "id": "nodeB",
                    "name": "需求分析",
                    "left": 260,
                    "top": 10,
                },
                {
                    "id": "nodeC",
                    "name": "节点C",
                    "left": 610,
                    "top": 10,
                },
                {
                    "id": "nodeD",
                    "name": "节点D",
                    "left":910,
                    "top": 10,
                }
            ],
            "lineList": [
                {
                    "from": "nodeA",
                    "to": "nodeB"
                },
                {
                    "from": "nodeB",
                    "to": "nodeC"
                },
                {
                    "from": "nodeC",
                    "to": "nodeD"
                }
            ]
        },
        text_base:{
            staticData:'普通文本',
            openStaticData:true,
            textAlign: "left",
            fontSize: 15,
            fontWeight: "normal",
            color: "rgba(51, 51, 51, 1)",
            split: 0,
            lineHeight: 24,
            backgroundColor: "rgba(11, 157, 248, 0.3)",
            scroll: false,
            link: false,
            linkTarget: "_blank",
            linkHref: "https://www.baidu.com/",
            textDecoration: "none"
        },
        text_time:{
            //staticData:'2010.12.10',
            openStaticData:true,
            textAlign: "left",
            fontSize: 15,
            fontWeight: "normal",
            color: "rgba(51, 51, 51, 1)",
            split: 0,
            lineHeight: 24,
            backgroundColor: "rgba(11, 157, 248, 0.3)",
            scroll: false,
            link: false,
            textDecoration: "none",
            type:'YYYY.MM.DD HH:mm:ss'
        },
        data_icons:{
            span: 6,
            decimals: 0,
            data: [
                {
                    title: "今日注册",
                    count: 12678,
                    color: "red",
                    append: "个",
                    click: a => {
                        console.log(a);
                    }
                },
                {
                    title: "今日登录",
                    count: 22139,
                },
                {
                    title: "今日订阅",
                    count: 35623,
                },
                {
                    title: "今日评论",
                    count: 16826,
                },
                {
                    title: "今日评论",
                    count: 16826,
                },
                {
                    title: "今日评论",
                    count: 16826,
                },
                {
                    title: "今日评论",
                    count: 16826,
                }
            ]
        },
        filters_input:{

            type: 'search',

        },
        ornament_icon:{

            iconName: 'search',

        }

    }

    return chart_option_config[chart_type]

}
export const createDefaultSettings = ({chart_type}) =>{

    const CHART_DATA_TEM = {
        chart_type: chart_type,
        title: {
            show: false,
            text: "",
            align: "flex-start",
            fontsize: "18",
            titleheight: "40",
            notes: ""
        },
        dataModel: {
            id: 0,
            type: "",
            name: ""
        },
        xAxisSelected: [],
        yAxisSelected: [],
        parameters: []
    }
    const chart_settings_config = {
        echarts_bar:CHART_DATA_TEM,
        echarts_bar_y_category:CHART_DATA_TEM,
        echarts_line: CHART_DATA_TEM,
        echarts_radar: CHART_DATA_TEM,
        echarts_pie: CHART_DATA_TEM,
        echarts_ring: CHART_DATA_TEM,
        echarts_scatter: CHART_DATA_TEM,
        echarts_gauge: {...CHART_DATA_TEM,
            range_max :100,
            range_min : 0,
            highlight : '#dff9f9'

        },


        simple_table:{...CHART_DATA_TEM,columnSelected:[]},
        scroll_table:{...CHART_DATA_TEM,columnSelected:[],
            rowNum:5,
            headerBGC:'#00BAFF',
            oddRowBGC:'#003B51',
            evenRowBGC:'#0A2732',
            waitTime:2000,
            headerHeight:35,
            columnWidth:'[]',
            align:'[]',
            index:false,
            indexHeader:'-',
            carousel:'single',
            hoverPause:true



        },
        base_flow:{...CHART_DATA_TEM,columnSelected:[],
            name: "流程",
            key: "id",
            color: "red",
            backgroundColor: "rgba(255, 233, 27, 0)",
            nodeList:`[
                {
                    "id":"nodeA",
                    "name":"节点A",
                    "left":10,
                    "top":10,
                    "list":[
                        {
                            "value":"234",
                            "color":"red"
                        },
                        {
                            "value":"232",
                            "color":"blue"
                        }
                    ]
                },
                {
                    "id":"nodeB",
                    "name":"节点B",
                    "left":180,
                    "top":10,
                    "list":[
                        {
                            "value":"上一版本",
                            "color":"red"
                        },
                        {
                            "value":"下一版本",
                            "color":"blue"
                        }
                    ]
                },
                {
                    "id":"nodeC",
                    "name":"节点C",
                    "left":391,
                    "top":10,
                    "list":[
                        {
                            "value":"上一版本",
                            "color":"red"
                        },
                        {
                            "value":"下一版本",
                            "color":"blue"
                        }
                    ]
                },
                {
                    "id":"nodeD",
                    "name":"节点D",
                    "left":603,
                    "top":10,
                    "list":[
                        {
                            "value":"需求上架"
                        }
                    ]
                }
            ]`,
            lineList:`[
                {
                    "from":"nodeA",
                    "to":"nodeB"
                },
                {
                    "from":"nodeB",
                    "to":"nodeC"
                },
                {
                    "from":"nodeC",
                    "to":"nodeD"
                }
            ]`

        },
        text_base:{...CHART_DATA_TEM,columnSelected:[],
            staticData:'普通文本',
            openStaticData:true,
            textAlign: "left",
            fontSize: 15,
            fontWeight: "normal",
            color: "rgba(51, 51, 51, 1)",
            split: 0,
            lineHeight: 24,
            backgroundColor: "rgba(11, 157, 248, 0.3)",
            scroll: false,
            link: false,
            linkTarget: "_blank",
            linkHref: "https://www.baidu.com/",
            textDecoration: "none"

        },
        text_time:{...CHART_DATA_TEM,columnSelected:[],
            staticData:moment().format('YYYY.MM.DD HH:mm:ss'),
            openStaticData:true,
            textAlign: "left",
            fontSize: 15,
            fontWeight: "normal",
            color: "rgba(51, 51, 51, 1)",
            split: 0,
            lineHeight: 24,
            backgroundColor: "rgba(11, 157, 248, 0.3)",
            scroll: false,
            link: false,
            textDecoration: "none",
            type:'YYYY.MM.DD HH:mm:ss'
        },
        data_icons:{...CHART_DATA_TEM,columnSelected:[],
            span:6,
            gutter:10,
            animation:true,
            backgroundColor:'#e5ffff',
            itemBackgroundColor:'#4ffbfa',
            color:'#3FA1FF',
            titleColor:'#333333',
            discount:false,
            decimals:0

        },
        filters_input:{
            ...CHART_DATA_TEM,
            staticData:'静态数据',
            openStaticData:true,
            type: 'search',
            link: true,
            linkTarget: '_blank',
            linkHref: "https://www.baidu.com/",
        },
        ornament_icon:{
            ...CHART_DATA_TEM,
            staticData:'静态数据',
            openStaticData:true,
            iconName: 'search',

        }
    }

    return chart_settings_config[chart_type]
}

export const createChartTemplate = (value) =>{


    const baseTemplateConfig= createbaseTemplateConfig(value)
    const chart_option = createDefaultOption(value)
    const chart_settings = createDefaultSettings(value)
    return {
        ...baseTemplateConfig,
        chart_option,
        chart_settings
    }
}

export const createDataModelParms = ({chart_settings, rows},noDimension = false) =>{
    const {
        yAxisSelected = [] ,
        xAxisSelected = [],
        columnSelected = [],
    } = chart_settings



    const axisSelecteds = noDimension? columnSelected : [...xAxisSelected,...yAxisSelected]

    let columnsConfig ={}

    let columns = []
    let dimension = []
    let metrics = []
    let labelMap ={}
    let legendName = {}

    axisSelecteds.forEach(item=>{
        columnsConfig[item.variableName] = item
        columns.push(item.variableName)
        labelMap[item.variableName]=item.name||item.variableName
        legendName[item.variableName]=item.name||item.variableName
        if("dimension" === item.type) dimension.push(item.variableName)
        if("metric" === item.type) metrics.push(item.variableName)
    })

    return {
        dimension,
        labelMap,
        legendName,
        metrics,
        columnsConfig,
        rows,
        columns,
    }
}

export const createExtraParmsParms = ({chart_settings}) =>{
    const {
        legendVisible,
        tooltipVisible
    } = chart_settings
    return {
        legendVisible,
        tooltipVisible
    }
}

const itemStyle = (value)=>{

    let warnRule = []
    try {

        warnRule = eval(value.thresholdConfig)
    }catch  {
        warnRule =''
    }

    if(warnRule==='' || warnRule === undefined){
        return {}
    }



    //  const warnRule = JSON.parse(thresholdConfig)
    return {
        normal: {
            color: function (params) {

                let index_color = params.value;
                let seriesIndex = params.seriesIndex;


                let result = '#a5e1f5'

                try {
                    //const warnRule = data[seriesIndex]['warnRule']

                    warnRule.forEach(({gt,lte,color })=>{
                        if(index_color >gt &&index_color <= lte ){

                            if(color) result =  color
                        }
                    })
                }catch  {
                    result = '#000000'
                }
                return result

            }
        }
    }
}

const markLine = (value)=>{

    let warnRule = []
    try {

        warnRule = eval(value.thresholdConfig)
    }catch  {
        warnRule =[]
    }

    if(warnRule==='' || warnRule === undefined){
        return {}
    }

    let data =[]
    try {
        data = warnRule.map(item=>{
            return{
                yAxis:item.lte,
                item
            }
        })
    }catch  {
        data =[]
    }



    return {
        symbol: "none",
        itemStyle: {
            normal: {
                borderWidth: 0,
                lineStyle: {
                    type: 'dashed',
                    color: '#139948',
                    width: 1,
                },
            },
        },
        label: {
            normal: {
                padding: 2,
                fontSize: 14,
                fontFamily: 'Microsoft YaHei',
                formatter: function(params) {

                    let result =''

                    try {
                        result = params.data.item.text;

                    }catch  {
                        result = ''
                    }
                    return result
                },
            },
        },
        data
    }

}


const regressionLine = (data,type='exponential')=>{



    var myRegression = ecStat.regression('exponential', data);

    myRegression.points.sort(function(a, b) {
        return a[0] - b[0];
    });

    return{
        name: 'line',
        type: 'line',
        showSymbol: false,
        smooth: true,
        data: myRegression.points,
        markPoint: {
            itemStyle: {
                color: 'transparent'
            },
            label: {
                show: true,
                position: 'left',
                formatter: myRegression.expression,
                color: '#333',
                fontSize: 14
            },
            data: [{
                coord: myRegression.points[myRegression.points.length - 1]
            }]
        }
    }


}

export {itemStyle,markLine,regressionLine}
let a = [
    {
        "id":"nodeA",
        "name":"需求评审",
        "left":20,
        "top":20,
        "list":[
            {
                "value":"[0].重开数",
                "color":"red"
            },
            {
                "value":"[0].缺陷总数",
                "color":"blue"
            }
        ]
    },
    {
        "id":"nodeB",
        "name":"节点B",
        "left":270,
        "top":20,
        "list":[
            {
                "value":"[0].重开数",
                "color":"red"
            },
            {
                "value":"[0].缺陷总数",
                "color":"blue"
            }
        ]
    },
    {
        "id":"nodeC",
        "name":"节点C",
        "left":520,
        "top":20,
        "list":[
            {
                "value":"上一版本",
                "color":"red"
            },
            {
                "value":"[0].缺陷总数",
                "color":"blue"
            }
        ]
    },
    {
        "id":"nodeD",
        "name":"节点D",
        "left":770,
        "top":20,
        "list":[
            {
                "value":"需求上架"
            }
        ]
    },

    {
        "id":"nodeH",
        "name":"nodeH",
        "left":20,
        "top":160,
        "list":[
            {
                "value":"[0].重开数",
                "color":"red"
            },
            {
                "value":"[0].缺陷总数",
                "color":"blue"
            }
        ]
    },
    {
        "id":"nodeG",
        "name":"nodeG",
        "left":270,
        "top":160,
        "list":[
            {
                "value":"[0].重开数",
                "color":"red"
            },
            {
                "value":"[0].缺陷总数",
                "color":"blue"
            }
        ]
    },
    {
        "id":"nodeF",
        "name":"nodeF",
        "left":520,
        "top":160,
        "list":[
            {
                "value":"上一版本",
                "color":"red"
            },
            {
                "value":"[0].缺陷总数",
                "color":"blue"
            }
        ]
    },
    {
        "id":"nodeE",
        "name":"nodeE",
        "left":770,
        "top":160,
        "list":[
            {
                "value":"需求上架"
            }
        ]
    },



    {
        "id":"nodeI",
        "name":"nodeI",
        "left":20,
        "top":300,
        "list":[
            {
                "value":"[0].重开数",
                "color":"red"
            },
            {
                "value":"[0].缺陷总数",
                "color":"blue"
            }
        ]
    },
    {
        "id":"nodeJ",
        "name":"nodeJ",
        "left":270,
        "top":300,
        "list":[
            {
                "value":"[0].重开数",
                "color":"red"
            },
            {
                "value":"[0].缺陷总数",
                "color":"blue"
            }
        ]
    },
    {
        "id":"nodeK",
        "name":"nodeK",
        "left":520,
        "top":300,
        "list":[
            {
                "value":"上一版本",
                "color":"red"
            },
            {
                "value":"[0].缺陷总数",
                "color":"blue"
            }
        ]
    },
    {
        "id":"nodeL",
        "name":"nodeL",
        "left":770,
        "top":300,
        "list":[
            {
                "value":"需求上架"
            }
        ]
    },
]
const asda =[
    {
        "from":"nodeA",
        "to":"nodeB"
    },
    {
        "from":"nodeB",
        "to":"nodeC"
    },
    {
        "from":"nodeC",
        "to":"nodeD"
    },
    {
        "from":"nodeD",
        "to":"nodeE"
    },
    {
        "from":"nodeE",
        "to":"nodeF"
    },
    {
        "from":"nodeF",
        "to":"nodeG"
    },
    {
        "from":"nodeG",
        "to":"nodeH"
    },
    {
        "from":"nodeH",
        "to":"nodeI"
    },
    {
        "from":"nodeI",
        "to":"nodeJ"
    },
    {
        "from":"nodeJ",
        "to":"nodeK"
    },
    {
        "from":"nodeK",
        "to":"nodeL"
    },
 ]
