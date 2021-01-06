import Mock from 'mockjs'

const Random = Mock.Random
var dayjs = require('dayjs');

Mock.mock('/api/report/1', 'get', ()=>{
    return  {
        report: {
            name: '测试样例报表',
            notes: '',
            theme: 'walden',
            isRefresh: false,
            refreshInterval: 0
        },
        layout: [
            {"x":0,"y":0,"w":4,"h":6,"i":"0",
                chart_settings: {
                    chart_type: "simple_line_chart",
                    title: {
                        show: false,
                        text: "",
                        align: "flex-start",
                        fontsize: "18",
                        titleheight: "32",
                        notes: ""
                    },
                    dataModel:{
                        id: 1,
                        type: 'sql',
                        name: '实验模型1'
                    },
                    xAxisSelected: [
                        {name: "采集日期", variableName: "collectionTime"},
                        {name: "所属主机", variableName: "ip"}
                    ],
                    yAxisSelected: [
                        {name: "cpu使用率", variableName: "cpu_percent"}
                    ],
                    isSecondyAxis: false,
                    yAxisSelected2: [],
                    seriesSelected: [],
                    num_limit: 1000
                },
                chart_option: {
                    title: {
                        text: "测试",
                        subtext: ""
                    },
                    legend: {
                        show: true,
                        orient: 'horizontal',
                        x: 'center',
                        y: 'top'
                    }
                }
            },
            {"x":4,"y":0,"w":4,"h":6,"i":"1",
                chart_settings: {
                    chart_type: "simple_line_chart",
                    title: {
                        show: false,
                        text: "",
                        align: "flex-start",
                        fontsize: "18",
                        titleheight: "32",
                        notes: ""
                    },
                    dataModel:{
                        id: 1,
                        type: 'sql',
                        name: '实验模型1'
                    },
                    xAxisSelected: [
                        {name: "采集日期", variableName: "collectionTime"},
                    ],
                    yAxisSelected: [
                        {name: "cpu使用率", variableName: "cpu_percent"}
                    ],
                    isSecondyAxis: false,
                    yAxisSelected2: [],
                    seriesSelected: [
                        {name: "所属主机", variableName: "ip"}
                    ],
                    num_limit: 1000
                },
                chart_option:  {
                    title: {
                        text: "测试",
                        subtext: ""
                    },
                    legend: {
                        show: true,
                        orient: 'horizontal',
                        x: 'center',
                        y: 'top'
                    }
                }
            },
            {"x":8,"y":0,"w":4,"h":6,"i":"2",
                chart_settings: {
                    chart_type: "simple_bar_chart",
                    title: {
                        show: false,
                        text: "",
                        align: "flex-start",
                        fontsize: "18",
                        titleheight: "32",
                        notes: ""
                    },
                    dataModel:{
                        id: 1,
                        type: 'sql',
                        name: '实验模型1'
                    },
                    xAxisSelected: [
                        {name: "所属主机", variableName: "ip"}
                    ],
                    yAxisSelected: [
                        {name: "cpu使用率", variableName: "cpu_percent"}
                    ],
                    isSecondyAxis: false,
                    yAxisSelected2: [],
                    seriesSelected: [

                    ],
                    num_limit: 1000
                },
                chart_option:  {
                    title: {
                        text: "测试",
                        subtext: ""
                    },
                    legend: {
                        show: true,
                        orient: 'horizontal',
                        x: 'center',
                        y: 'top'
                    }
                }
            },
            {"x":0,"y":6,"w":4,"h":6,"i":"3",
                chart_settings: {
                    chart_type: "simple_pie_chart",
                    title: {
                        show: false,
                        text: "",
                        align: "flex-start",
                        fontsize: "18",
                        titleheight: "32",
                        notes: ""
                    },
                    dataModel:{
                        id: 1,
                        type: 'sql',
                        name: '实验模型1'
                    },
                    xAxisSelected: [
                        {name: "所属主机", variableName: "ip"}
                    ],
                    yAxisSelected: [
                        {name: "cpu使用率", variableName: "cpu_percent"}
                    ],
                    isSecondyAxis: false,
                    yAxisSelected2: [],
                    seriesSelected: [],
                    num_limit: 1000
                },
                chart_option:  {
                    title: {
                        text: "测试",
                        subtext: ""
                    },
                    legend: {
                        show: true,
                        orient: 'horizontal',
                        x: 'center',
                        y: 'top'
                    }
                }
            },
            {"x":4,"y":6,"w":4,"h":6,"i":"4",
                chart_settings: {
                    chart_type: "core_metrics",
                    dataModel:{
                        id: 1,
                        type: 'sql',
                        name: '实验模型1'
                    },
                    title: {
                        show: false,
                        text: "",
                        align: "flex-start",
                        fontsize: "18",
                        titleheight: "32",
                        notes: ""
                    },
                    metricsSelected: [
                        {name: "cpu使用率", variableName: "cpu_percent", displayName: "CPU平均使用率", unit: "", formatFunction: "", aggFunction: "sum", },
                        {name: "内存使用率", variableName: "mem_percent", displayName: "CPU平均最大值", unit: "", formatFunction: "", aggFunction: "avg", }
                    ],
                    metricColor: '#0498ff'
                },
                chart_option: {}
            },
            {"x":8,"y":6,"w":4,"h":6,"i":"5",
                chart_settings: {
                    chart_type: "simple_table",
                    dataModel:{
                        id: 1,
                        type: 'sql',
                        name: '实验模型1'
                    },
                    title: {
                        show: false,
                        text: "",
                        align: "flex-start",
                        fontsize: "18",
                        titleheight: "32",
                        notes: ""
                    },
                    columnSelected: [
                        {name: "cpu使用率", variableName: "cpu_percent"},
                        {name: "内存使用率", variableName: "mem_percent"}
                    ]
                },
                chart_option: {}
            }
        ]
    }
})

Mock.mock('/api/fetch_data', 'get', ()=>{
    let datas = []
    let now_date = dayjs()
    for(let i = 0; i< 1000; i++) {
        now_date = now_date.add(1, 'minute')
        let obj = {
            id: i,
            business: "随机业务",
            system: "CRM",
            application: "订单中心",
            collectionTime: now_date.format('YYYY-MM-DD HH:mm:ss') ,
            ip: Random.natural(1,3),
            cpu_percent: Random.natural(50, 100),
            mem_percent: Random.natural(1, 100),
            net_in: Random.natural(100, 800),
            net_out: Random.natural(100, 800)
        }
        datas.push(obj)


        let obj2 = {
            id: i,
            business: "随机业务2",
            system: "CRM",
            application: "订单中心",
            collectionTime: now_date.format('YYYY-MM-DD HH:mm:ss') ,
            ip: Random.natural(1,3),
            cpu_percent: Random.natural(1, 50),
            mem_percent: Random.natural(1, 100),
            net_in: Random.natural(100, 800),
            net_out: Random.natural(100, 800)
        }
        datas.push(obj2)
    }
    return {data: datas}
})

Mock.mock('/api/data_model/1', 'get', ()=>{
    return {
        id: 1,
        name: '测试数据模型',
        datasource: {
            id: 1,
            name: "测试用数据库"
        },
        dimensions: [
            {name: "所属业务", variableName: "business"},
            {name: "所属系统", variableName: "system"},
            {name: "所属应用", variableName: "application"},
            {name: "采集日期", variableName: "collectionTime"},
            {name: "所属主机", variableName: "ip"}

        ],
        metrics: [
            {name: "cpu使用率", variableName: "cpu_percent"},
            {name: "内存使用率", variableName: "mem_percent"},
            {name: "网络上行流量", variableName: "net_in"},
            {name: "网络下行流量", variableName: "net_out"}
        ]
    }
});