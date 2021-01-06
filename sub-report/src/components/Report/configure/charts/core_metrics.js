export default {
    chart_type: "core_metrics",
    new_chart_template: function (chart_type, x, y, w, h, i) {
        return {
            "x": x,
            "y": y,
            "w": w,
            "h": h,
            "i": i,
            static: false,
            "chart_option": {
                series: [{name: "测试数据1", value: 10000}, {name: "测试数据2", value: 20000}],
                title: {
                    text: "",
                    subtext: "",
                    link: "",
                    left: 'center',
                    show: true

                },
                legend: {
                    show: true,
                    orient: 'horizontal',
                    x: 'center',
                    y: 'top'
                },
            },
            chart_settings: {
                chart_type: "core_metrics",
                title: {
                    show: false,
                    text: "",
                    align: "flex-start",
                    fontsize: "18",
                    titleheight: "32",
                    notes: ""
                },
                metricsSelected: [],
                metricColor: '#0498ff',
                metricFontsize: 32,
                metricUnitFontsize: 14,
                titleFontsize: 18,
                isBoard: true
            }
        }
    },
    generate_the_chart(chart, chart_settings, data) {

        if (!data || data.length <= 0) {
            return
        }
        if (!chart.chart_option) chart.chart_option = {}
        chart.chart_option.series = []
        for (let i = 0; i < chart.chart_settings.metricsSelected.length; i++) {

            let metric_value = data[0][chart.chart_settings.metricsSelected[i].variableName];
            for (let j = 1; j < data.length; j++) {

                if (chart.chart_settings.metricsSelected[i]['aggFunction'] === 'sum') {
                    metric_value += data[j][chart.chart_settings.metricsSelected[i].variableName]
                } else if (chart.chart_settings.metricsSelected[i]['aggFunction'] === 'avg') {
                    metric_value += data[j][chart.chart_settings.metricsSelected[i].variableName]
                } else if (chart.chart_settings.metricsSelected[i]['aggFunction'] === 'max') {
                    metric_value = metric_value > data[j][chart.chart_settings.metricsSelected[i].variableName] ? metric_value : data[j][chart.chart_settings.metricsSelected[i].variableName];
                } else if (chart.chart_settings.metricsSelected[i]['aggFunction'] === 'min') {
                    metric_value = metric_value < data[j][chart.chart_settings.metricsSelected[i].variableName] ? metric_value : data[j][chart.chart_settings.metricsSelected[i].variableName];
                } else if (chart.chart_settings.metricsSelected[i]['aggFunction'] === 'count') {
                    break;
                } else {
                    metric_value += data[j][chart.chart_settings.metricsSelected[i].variableName]
                }
            }

            if (chart.chart_settings.metricsSelected[i]['aggFunction'] === 'avg') {
                metric_value = metric_value / data.length
            }
            if (chart.chart_settings.metricsSelected[i]['aggFunction'] === 'count') {
                metric_value = data.length
            }

            chart.chart_option.series.push({
                name: chart.chart_settings.metricsSelected[i].displayName,
                unit_name: chart.chart_settings.metricsSelected[i].unit_name,
                metric_color: chart.chart_settings.metricsSelected[i].metric_color,
                span: chart.chart_settings.metricsSelected[i].span,
                value: metric_value
            })
        }

        return{
            chart,
            chart_settings,
            data,
        }

    },

    chart_properties_form: [
        {name:'图表配置', component: 'ChartPropertiesFormBaseSettings'},

    ],
}
