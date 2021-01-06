export function newBoxBorder(){
    return {id: 0, w: 200, h: 200, x: 0, y: 0, z: 10,
        active: true,
        name: "基础边框",
        notes: "",
        chart_settings: {chart_name: 'dv-border-box-1', color1: '#37a2da', color2: '#32c5e9'}}
}

export function newDatavDecoration(){
    return {
        id: 0, w: 200, h: 200, x: 0, y: 0, z: 100,
        active: true,
        name: "装饰",
        notes: "",
        chart_settings: {chart_name: 'dv-decoration-1', color1: '#37a2da', color2: '#32c5e9'}
    }
}

export function newDigitalFlop(){
    return {
        id: 0, w: 200, h: 200, x: 0, y: 0, z: 100,
        active: true,
        name: "数字翻盘",
        notes: "",
        chart_config: {number: [100], content: '{nt}个'},
        chart_settings: {chart_name: 'dv-digital-flop', fontContent: '{nt}个'}
    }
}

export function newCapsuleChart(){
    return {
        id: 0, w: 200, h: 200, x: 0, y: 0, z: 100,
        active: true,
        name: "胶囊柱状图",
        notes: "",
        chart_config: {data: [
                {
                    name: '南阳',
                    value: 167
                },
                {
                    name: '周口',
                    value: 67
                },
                {
                    name: '漯河',
                    value: 123
                },
                {
                    name: '郑州',
                    value: 55
                },
                {
                    name: '西峡',
                    value: 98
                }
            ]},
        chart_settings: {chart_name: 'dv-capsule-chart'}
    }
}
export function newScrollBoard(){
    return {
        id: 0, w: 200, h: 200, x: 0, y: 0, z: 100,
        active: true,
        name: "轮播表",
        notes: "",
        chart_config: {data: [
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
            ]},
        chart_settings: {chart_name: 'dv-scroll-board'}
    }
}



export function newLBaseLineChart(){
    return {
        id: 0, w: 200, h: 200, x: 0, y: 0, z: 100,
        active: true,
        name: "折线图",
        notes: "",
        chart_settings: {chart_name: 'dv-charts'},
        chart_option: {
            title: {
                show: true,
                text: '测试',
                style: {
                    fill: '#eee',
                    fontSize: 17,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    textBaseline: 'bottom'
                }
            },
            legend: {
                show: true,
                orient: 'horizontal',
                left: 'auto',
                right: 'auto',
                top: 'auto',
                bottom: 'auto',
                selectAble: true,
                textStyle: {
                    fontSize: 13,
                    fill: '#fff'
                },
                data: [{
                    name: '销售额变化',
                }]
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                data: 'value'
            },
            series: [
                {
                    name: '销售额变化',
                    data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
                    type: 'line',
                    linePoint: {
                        radius: 2,
                        style: {
                            stroke: 'transparent'
                        }
                    }
                }
            ]
        }
    }
}

export function newBaseBarChart(){
    return {
        id: 0, w: 200, h: 200, x: 0, y: 0, z: 100,
        active: true,
        name: "折线图",
        notes: "",
        chart_settings: {chart_name: 'dv-charts'},
        chart_option: {
            title: {
                show: true,
                text: '测试',
                style: {
                    fill: '#eee',
                    fontSize: 17,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    textBaseline: 'bottom'
                }
            },
            legend: {
                show: true,
                orient: 'horizontal',
                left: 'auto',
                right: 'auto',
                top: 'auto',
                bottom: 'auto',
                selectAble: true,
                textStyle: {
                    fontSize: 13,
                    fill: '#fff'
                },
                data: [{
                    name: '销售额变化',
                }]
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                data: 'value'
            },
            series: [
                {
                    name: '销售额变化',
                    data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
                    type: 'bar',
                    linePoint: {
                        radius: 2,
                        style: {
                            stroke: 'transparent'
                        }
                    }
                }
            ]
        }
    }
}
export function newPieChart(){
    return {
        id: 0, w: 200, h: 200, x: 0, y: 0, z: 100,
        active: true,
        name: "饼图",
        notes: "",
        chart_settings: {
            chart_name: 'dv-charts',
            pie: true
        },
        chart_option: {
            title: {
                text: '畅销饮料占比饼状图'
            },
            series: [
                {
                    type: 'pie',
                    data: [
                        { name: '可口可乐', value: 93 },
                        { name: '百事可乐', value: 32 },
                        { name: '哇哈哈', value: 65 },
                        { name: '康师傅', value: 44 },
                        { name: '统一', value: 52 },
                    ],
                    insideLabel: {
                        show: true
                    }
                }
            ]
        }
    }
}

export function newSimpleDashboardText(){
    return {
        id: 0, w: 200, h: 200, x: 0, y: 0, z: 100,
        active: true,
        name: "普通文字",
        notes: "",
        chart_settings: {
            chart_name: 'simple-dashboard-text',
            fontText: "简单文本",
            fontSize: 24,
            fontColor: '#fff',
            fontFamily: 'inherit',
            fontWeight: 'normal'
        }
    }

}

