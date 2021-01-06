
export function generateMetrics(chart, data){

    if(!data || data.length <= 0){
        return
    }
    if(!chart.chart_option)  chart.chart_option={}
    chart.chart_option.series = []
    for(let i = 0 ; i <chart.chart_settings.metricsSelected.length;i++){

        let metric_value = data[0][chart.chart_settings.metricsSelected[i].variableName];
        for(let j = 1; j < data.length;j++){

            if(chart.chart_settings.metricsSelected[i]['aggFunction'] === 'sum'){
                metric_value += data[j][chart.chart_settings.metricsSelected[i].variableName]
            }else if(chart.chart_settings.metricsSelected[i]['aggFunction'] === 'avg'){
                metric_value += data[j][chart.chart_settings.metricsSelected[i].variableName]
            }else if(chart.chart_settings.metricsSelected[i]['aggFunction'] === 'max'){
                metric_value = metric_value > data[j][chart.chart_settings.metricsSelected[i].variableName] ? metric_value : data[j][chart.chart_settings.metricsSelected[i].variableName];
            }else if(chart.chart_settings.metricsSelected[i]['aggFunction'] === 'min') {
                metric_value = metric_value < data[j][chart.chart_settings.metricsSelected[i].variableName] ? metric_value : data[j][chart.chart_settings.metricsSelected[i].variableName];
            }else if(chart.chart_settings.metricsSelected[i]['aggFunction'] === 'count') {
                break;
            }else{
                metric_value += data[j][chart.chart_settings.metricsSelected[i].variableName]
            }
        }

        if(chart.chart_settings.metricsSelected[i]['aggFunction'] === 'avg'){
            metric_value = metric_value / data.length
        }
        if(chart.chart_settings.metricsSelected[i]['aggFunction'] === 'count'){
            metric_value = data.length
        }

        chart.chart_option.series.push({
            name: chart.chart_settings.metricsSelected[i].displayName,
            value: metric_value
        })
    }


}