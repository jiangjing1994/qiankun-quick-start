export default ({request}) => ({
    GET_ALL_DATASOURCE(){
        return request({
            url: '/api/dataSource/',
            methods: 'get'
        })
    },
    SEARCH_DATA_SOURCE_BY_NAME(params) {
        return request({
            url: '/api/dataSource/search',
            method: 'get',
            params
        })
    },
    GET_DATA_SOURCE(id){
        return request({
            url: '/api/dataSource/' + id,
            method: 'get'
        })
    },
    SAVE_DATA_SOURCE(datasource){
        if(datasource.id === 0){
            return request({
                url:'/api/dataSource/',
                method: 'post',
                data: datasource
            })
        } else {
            return request({
                url: '/api/dataSource/',
                method: 'put',
                data: datasource
            })
        }
    },
    TEST_DATA_SOURCE_CONNECTION(datasource){
        return request({
            url:'/api/dataSource/test',
            method: 'post',
            data: datasource
        })
    }
})
