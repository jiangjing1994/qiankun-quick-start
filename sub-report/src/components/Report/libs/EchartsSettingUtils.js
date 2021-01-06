export function validateSetting(chart_option){
    if(chart_option.settings.xAxis == undefined){
        return false
    }else if(chart_option.settings.yAxis == undefined || chart_option.settings.length <1){
        return false
    }
}



function processData(chart_option, chart_settings, data){

    //这里data已经是进行排序的数据了，这个需要根据sql来限制
    for(let i = 0;i < data.length; i++){
        let this_data = data[i]

        //设置X轴的类别
        let new_series_category = []
        let new_category = chart_settings.xAxisSelected.map((item)=>this_data[item.variableName])

        if(chart_option.seriesSelected && chart_option.seriesSelected.length>0){
            new_series_category = chart_option.seriesSelected.map((item)=>this_data[item.variableName])
        }

        new_category = new_category.concat(new_series_category)
        let new_category_name = new_category.join("_")

        if(!chart_option.xAxis.data.some((d) => d === new_category_name)){
            chart_option.xAxis.data.push(new_category_name)
        }

        //设置Pie的series信息
        if(chart_settings.chart_type.indexOf('pie') >= 0){

            //设置pie的series
            chart_option.series = chart_option.series || []
            chart_option.series[0] = chart_option.series[0] || {}
            chart_option.series[0].name = chart_settings.yAxisSelected[0].name
            chart_option.series[0].type = 'pie'
            chart_option.series[0].data = chart_option.series[0].data || []

            //聚合分类数据
            if(chart_option.series[0].data.some((d) => d.name === new_category_name)) {
                chart_option.series[0].data.find((d) => d.name === new_category_name).value += data[i][chart_settings.yAxisSelected[0].variableName]

            }else{
                chart_option.series[0].data.push({
                    name: new_category_name,
                    value: data[i][chart_settings.yAxisSelected[0].variableName]
                })
            }

            //设置legend
            chart_option.legend.data = chart_option.legend.data || []
            if(!chart_option.legend.data.some((l)=> l === new_category_name)){
                chart_option.legend.data.push(new_category_name)
            }

            continue
        }

        //对Y轴进行分析
        for(let j=0;j<chart_settings.yAxisSelected.length;j++){

            //设置seris名称
            let series_name = chart_settings.yAxisSelected[j].name
            //初始化series
            let series = {}
            if(chart_settings.isLineArea) series['areaStyle'] = {}; //设置是否为面积图
            if(chart_settings.isLineSmooth) series['smooth'] = true; //设置是否光滑
            if(chart_settings.isLineLabel) series['label'] = {normal: {show:true, posistion: 'top'}}; //线是否显示数字


            if(chart_settings.seriesSelected && chart_settings.seriesSelected.length > 0){
                series_name = series_name + "-" + (chart_settings.seriesSelected.map((s)=>this_data[s.variableName]).join("-"))
            }

            if(chart_option.series.some(s=>s.name === series_name)){
                series = chart_option.series.find(s=>s.name === series_name)
            }else{
                series.name = series_name
                if(chart_settings.chart_type.indexOf('line')>=0){
                    series.type = "line"
                }else if(chart_settings.chart_type.indexOf('bar')>=0){
                    series.type = "bar"
                }

                series.data = []
                chart_option.series.push(series)

                chart_option.legend.data.push(series_name)
            }

            let data_index = chart_option.xAxis.data.findIndex((name)=> name === new_category_name)
            if(series.data[data_index]){
                if (!chart_settings.yAxisSelected.agg_func || chart_settings.yAxisSelected.agg_func === "sum"){
                    series.data[data_index] += data[i][chart_settings.yAxisSelected[j].variableName]
                }
            }else{
                series.data[data_index] = data[i][chart_settings.yAxisSelected[j].variableName]
            }

        }


        for(let j=0;j<chart_settings.yAxisSelected2.length&&chart_settings.isSecondyAxis;j++){


            //设置seris名称，并初始化
            let series_name = chart_settings.yAxisSelected2[j].name
            //设置系列属于第二轴
            let series = {
                yAxisIndex: 1
            }

            if(chart_settings.isLineArea) series['areaStyle'] = {}; //设置是否为面积图
            if(chart_settings.isLineSmooth) series['smooth'] = true; //设置是否光滑
            if(chart_settings.isLineLabel) series['label'] = {normal: {show:true, posistion: 'top'}}; //线是否显示数字


            //根据分类选择设置系列名称
            if(chart_settings.seriesSelected && chart_settings.seriesSelected.length > 0){
                series_name = series_name + "-" + (chart_settings.seriesSelected.map((s)=>this_data[s.variableName]).join("-"))
            }

            //查找系列是否已经存在
            if(chart_option.series.some(s=>s.name === series_name)){
                series = chart_option.series.find(s=>s.name === series_name)
            }else{
                series.name = series_name
                if(chart_settings.chart_type.indexOf('line')>=0){
                    series.type = "line"
                }else if(chart_settings.chart_type.indexOf('bar')>=0){
                    series.type = "bar"
                }

                series.data = []
                chart_option.series.push(series)

                chart_option.legend.data.push(series_name)
            }

            let data_index = chart_option.xAxis.data.findIndex((name)=> name === new_category_name)
            if(series.data[data_index]){
                if (!chart_settings.yAxisSelected2.agg_func || chart_settings.yAxisSelected2.agg_func === "sum"){
                    series.data[data_index] += data[i][chart_settings.yAxisSelected2[j].variableName]
                }
            }else{
                series.data[data_index] = data[i][chart_settings.yAxisSelected2[j].variableName]
            }

        }

    }

    return chart_option

}

export function generateEchartOption(chart_option, chart_settings, data) {

    if(chart_settings.chart_type === "echarts_radar"){
        return generateEchartRadarOption(chart_option, chart_settings, data)
    }

    //如果还没有选择数据源类型，则直接返回chart_option
    if(!chart_settings.dataModelId){
        return chart_option;
    }

    //清空数据
    chart_option['series'] = []

    //初始化
    chart_option.xAxis = chart_option.xAxis || {}
    chart_option.yAxis = chart_option.yAxis || {}

    //生成x轴配置信息
    chart_option.xAxis['type'] = "category"
    chart_option.xAxis.data = []

    //生成y轴配置信息
    chart_option.yAxis['type'] = ""
    chart_option.yAxis['type'] = "value"

    if(chart_settings.isSecondyAxis){
        chart_option.yAxis = [chart_option.yAxis]
        chart_option.yAxis.push({'type': "value"})
    }

    //设置legend
    chart_option.legend = chart_option.legend || {}
    chart_option.legend.data = []

    //设置title
    chart_option.title = chart_option.title || {}
    chart_option.title.text = chart_option.title.text || ""
    chart_option.title.subtext = chart_option.title.subtext || ""

    //生成格式化数据
    chart_option = processData(chart_option, chart_settings, data)

    //pie图不需要xAxis，yAxis
    if(chart_settings.chart_type.indexOf('pie') >= 0){
        chart_option.xAxis = []
        chart_option.yAxis = []
    }

    return chart_option
}

export function generateEchartRadarOption(chart_option, chart_settings, data) {

    //如果还没有选择数据源类型，则直接返回chart_option
    if(!chart_settings.dataModelId){
        return chart_option;
    }

    //清空数据
    chart_option['series'] = []
    chart_option.xAxis = {show: false}
    chart_option.yAxis = {show: false}
    chart_option.legend.data = []


    let indicators = []
    let series_data = []

    for(let j = 0;j < chart_settings.yAxisSelected.length; j++){
        series_data.push({
            name: chart_settings.yAxisSelected[j].name,
            value: []
        })
        chart_option.legend.data.push(chart_settings.yAxisSelected[j].name)
    }

    //根据数据生成series
    let max = 0;
    for(let i = 0;i < data.length; i++){
        //设置series数据
        for(let j = 0;j < chart_settings.yAxisSelected.length; j++){
            series_data[j].value.push(data[i][chart_settings.yAxisSelected[j].variableName])

            //获取最大的值
            if(max < data[i][chart_settings.yAxisSelected[j].variableName]){
                max = data[i][chart_settings.yAxisSelected[j].variableName]
            }
        }

        let x_name = data[i][chart_settings.xAxisSelected[0].variableName]
        if(!indicators.some((indicator)=>indicator.name === x_name)){
            indicators.push({name: x_name})
        }
    }

    indicators.map((indicator)=>{
        return {
            name: indicator.name,
            max: max
        }
    })

    chart_option.radar = {
        indicator: indicators
    }

    chart_option.series = [{
        type: 'radar',
        // areaStyle: {normal: {}},
        data: series_data,
        areaStyle: {
            color: 'rgba(255, 0, 0, 0.3)'
        }
    }]


    return chart_option

}
