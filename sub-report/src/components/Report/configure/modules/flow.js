export const flow = ( settings) => {



    const {
        columns,
        rows
    } = settings

    const column = columns[0]
    // let nodeList = rows.map((item,index)=>{
    //     return {
    //                 id: item[column],
    //                 name: item[column],
    //                 left: 10+index*50,
    //                 top: 10,
    //     }
    // })

    const {
        name,
        key,
        nodeList,
        lineList
    } = settings



        return  {
            ...settings,

     }

}

