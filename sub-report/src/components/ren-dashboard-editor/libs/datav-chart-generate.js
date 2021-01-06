export function generateDatavChart(chart_settings, model_data, chart_option){
    if(chart_settings.chart_name === 'dv-digital-flop'){
        return generateDatavDigitalFlop(chart_settings, model_data)
    } else if(chart_settings.chart_name === 'dv-capsule-chart'){
        return generateDatavCapsuleChart(chart_settings, model_data)
    } else {
        return generateDatavSChart(chart_settings, model_data, chart_option)
    }
}

export function generateDatavSChart(chart_settings, model_data, chart_option){

    if(chart_settings.xAxisSelected === undefined || chart_settings.xAxisSelected.length<=0){
        return null
    }

    if(chart_settings.yAxisSelected === undefined || chart_settings.yAxisSelected.length<=0){
        return null
    }

    let options = {}
    options.title = Object.assign({}, chart_option.title)
    options.legend =  Object.assign({}, chart_option.legend)

    options.xAxis = {
        boundaryGap: false
    }
    options.yAxis =  {
        data: 'value',
        splitLine: {
            show: false,
        },
    }
    options.series = []

    //判断是否为饼图
    if(chart_settings.pie){
        options.xAxis = undefined
        options.yAxis = undefined
        options.legend.data = []



        for(let j=0;j<chart_settings.yAxisSelected.length;j++) {
            let s = {
                name: chart_settings.yAxisSelected[j].name,
                type: "pie",
                data: [],
                insideLabel: {
                    show: chart_settings.insideLabel_show
                },
                roseType: chart_settings.roseType
            }

            for (let i = 0; i < model_data.length; i++) {
                let x_name = chart_settings.xAxisSelected.map((x)=>{
                    return model_data[i][x.variableName]
                }).join("-")
                if(options.legend.data.indexOf(x_name)<0){
                    options.legend.data.push(x_name)
                }
                s.data.push({name: x_name, value: model_data[i][chart_settings.yAxisSelected[j].variableName]})
            }
            options.series.push(s)
        }
        return options

    }

    //生成lengend 和 series
    //y轴数据
    let series = {}
    options.legend.data = []
    for(let j = 0; j<chart_settings.yAxisSelected.length; j++) {
        options.legend.data.push({name: chart_settings.yAxisSelected[j].name})
        series[chart_settings.yAxisSelected[j].name] = []
    }

    //生成x轴和y轴，以及series
    let xAxis_name = ""
    let xAxis_data = []
    //生成x轴的名称
    for (let j = 0; j < chart_settings.xAxisSelected.length; j++) {
        if(j!==0){
            xAxis_name += "_"
        }
        xAxis_name += chart_settings.xAxisSelected[j].name
    }

    //遍历数据
    for(let i=0;i<model_data.length;i++) {
        //xAxis的数据生成
        let xAxis_this_data = ""
        for (let j = 0; j < chart_settings.xAxisSelected.length; j++) {
            if(j!==0){
                xAxis_this_data += "_"
            }
            xAxis_this_data += model_data[i][chart_settings.xAxisSelected[j].variableName]
        }
        if(xAxis_data.indexOf(xAxis_this_data)<0){
            xAxis_data.push(xAxis_this_data)
        }

        //生成series数据
        for(let j = 0; j<chart_settings.yAxisSelected.length;j++) {
            series[chart_settings.yAxisSelected[j].name].push(model_data[i][chart_settings.yAxisSelected[j].variableName])
        }


    }
    options.xAxis ={
        name: xAxis_name,
        data: xAxis_data
    }

    for(let i=0;i<chart_settings.yAxisSelected.length;i++){
        let s={
            name: chart_settings.yAxisSelected[i].name,
            type: chart_settings.yAxisSelected[i].chart_type ? chart_settings.yAxisSelected[i].chart_type :'line',
            data: series[chart_settings.yAxisSelected[i].name],
            smooth: chart_settings.yAxisSelected[i].smooth ? chart_settings.yAxisSelected[i].smooth: false,
            lineArea: {
                show: chart_settings.yAxisSelected[i].area ? chart_settings.yAxisSelected[i].area: false
            },
            linePoint: {
                style: {

                },
                radius: chart_settings.yAxisSelected[i].linePoint_radius ? chart_settings.yAxisSelected[i].linePoint_radius: 4

            },
            label: {
                show: chart_settings.yAxisSelected[i].label_show ? chart_settings.yAxisSelected[i].label_show: false
            },
            lineStyle: {

            },
            barStyle: {

            }
        }



        if (chart_settings.yAxisSelected[i].area_color_from && chart_settings.yAxisSelected[i].area_color_to){
            s.lineArea.gradient = [chart_settings.yAxisSelected[i].area_color_from, chart_settings.yAxisSelected[i].area_color_to]
        }

        if (chart_settings.yAxisSelected[i].stack && chart_settings.yAxisSelected[i].stack !== ""){
            s.stack = chart_settings.yAxisSelected[i].stack
        }

        if (chart_settings.yAxisSelected[i].color && chart_settings.yAxisSelected[i].color !== "") {
            s.lineStyle.stroke = chart_settings.yAxisSelected[i].color
            s.linePoint.style.stroke = chart_settings.yAxisSelected[i].color
            s.linePoint.style.fill = chart_settings.yAxisSelected[i].color

            s.barStyle.fill = chart_settings.yAxisSelected[i].color
        }

        if (chart_settings.yAxisSelected[i].bar_color_from && chart_settings.yAxisSelected[i].bar_color_to){
            s.gradient = {
                color: [chart_settings.yAxisSelected[i].bar_color_from, chart_settings.yAxisSelected[i].bar_color_to]
            }
        }
        if (chart_settings.yAxisSelected[i].backgroundBar_show) {
            s.backgroundBar = {
                show: chart_settings.yAxisSelected[i].backgroundBar_show
            }
        }


        options.series.push(s)
    }


    return options
}

export function generateDatavDigitalFlop(chart_settings, model_data){

    if(!chart_settings.yAxisSelected || chart_settings.yAxisSelected.length<1){
        return undefined
    }

    let data  = []
    for(let i=0;i<model_data.length;i++) {
        data.push(model_data[i][chart_settings.yAxisSelected[0].variableName])
    }

    let config = {
        number: data,
        content: chart_settings.fontContent ? chart_settings.fontContent:'{nt}',
    }

    if(chart_settings.fontSize){
        if(!config.style){
            config.style = {}
        }
        config.style.fontSize = chart_settings.fontSize
    }
    if(chart_settings.fontColor){
        if(!config.style){
            config.style = {}
        }
        config.style.fill = chart_settings.fontColor
    }




    return config
}


export function generateDatavCapsuleChart(chart_settings, model_data){

    if(!chart_settings.yAxisSelected || chart_settings.yAxisSelected.length<1){
        return undefined
    }

    let data  = []
    for(let i=0;i<model_data.length;i++) {
        let x_name = chart_settings.xAxisSelected.map((x)=>{
            return model_data[i][x.variableName]
        }).join("-")
        data.push({
            name: x_name,
            value: model_data[i][chart_settings.yAxisSelected[0].variableName]
        })
    }

    let config = {
        data: data,
    }


    return config
}
