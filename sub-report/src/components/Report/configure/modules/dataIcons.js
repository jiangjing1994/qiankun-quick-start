export const dataIcons = (dataModelParms,settings) => {


    const {
        labelMap,
        dimension,
        metrics,
        rows
    } = dataModelParms

    const label = dimension[0]
    const value = metrics[0]
    const row = rows[0]
    let data = metrics.map(item=>{
        return{
            title:labelMap[item],
            count:row[item]
        }
    })





    return  {
        ...settings,
        data
    }

}

