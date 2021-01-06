export const table = (columns, rows, settings) => {

    return {
        data:rows,
        column:settings.column,
        settings
    }
}
export const scrolltable = (dataModelParms,settings) => {

    const {
        rows,
        columns,
    } = dataModelParms


    const data = rows.map(item=>{


        return columns.map(i => {
            return item[i]
        })
    })




    return {
        header:columns,
        data,
        ...settings
    }
}

