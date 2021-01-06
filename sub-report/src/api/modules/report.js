export default ({request}) => ({
    SAVE_REPORT(report){
        return request({
            url: '/api/report/',
            method: 'post',
            data: report
        })
    },
    GET_REPORT(id){
        return request({
            url: '/api/report/'+id,
            method: 'get'
        })
    },



    FETCH_DATAMODEL_DATA(id){
        return request({
            url: '/api/dataModel/'+id+'/fetch'
        })
    },
    FETCH_ANALYSIS_DATA(modelId, parameters, sql){
        return request({
            url: '/api/analysisData/fetch',
            method: 'post',
            data: {
                dataModelId: modelId,
                parameters: parameters,
                sql: sql
            }
        })
    },
    SEARCH_REPORT_BY_NAME(params){
        return request({
            method: 'get',
            params,
            url: '/api/report/search'
           // url: '/api/report/search'?name=' + name'
        })
    },
    DELETE_REPORT_BY_ID(id){
        return request({
            url: '/api/report/' + id,
            method: 'delete'
        })
    },
    SEND_MAIL(params){
        return request({
            url: '/api/mail/send',
            method: 'post',
            data: params
        })
    },

    SAVE_USERFOLLOW(report){
        return request({
            url: '/api/userfollow',
            method: 'post',
            data: report
        })
    },
    GET_USERFOLLOW(userId='123',userPage=23 ){
        return request({
            url: '/api/userfollow',
            method: 'get',
            params:{
                userId,
                userPage
            }
        })
    },

})
