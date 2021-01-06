export default ({request}) => ({
    GET_DATAMODEL_BY_DSID(id){
        return request({
            url: '/api/dataModel/dataSource/'+id,
            methods: 'get'
        })
    },
    SEARCH_DATA_MODEL(params) {
        return request({
            url: '/api/dataModel/search',
            method: 'get',
            params
        })
    },
    GET_DATA_MODEL(id) {
        return request({
            url: '/api/dataModel/' + id,
            method: 'get'
        })
    },
    SAVE_DATA_MODEL(id, dataModel) {
        if(id===0){
            return request({
                url: '/api/dataModel/',
                method: 'post',
                data: dataModel
            })
        } else {
            return request({
                url: '/api/dataModel/update',
                method: 'post',
                data: dataModel
            })
        }
    },
    DELETE_DATA_MODEL(id) {
        return request({
            url: '/api/dataModel/' + id,
            method: 'delete'
        })
    },
    DATA_MODEL_COLS_FETCH(dataModel) {
        return request({
            url: '/api/dataModel/fetch/columns',
            method: 'post',
            data: dataModel
        })
    }
})
