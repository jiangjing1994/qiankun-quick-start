export default ({request}) => ({
    SAVE_DASHBOARD(dashboard) {
        return request({
            url: '/api/dashboard/',
            method: 'post',
            data: dashboard
        })
    },
    GET_DASHBOARD(id) {
        return request({
            url: '/api/dashboard/' + id,
            method: 'get'
        })
    },
    SEARCH_DASHBOARD_BY_NAME(name) {
        return request({
            url: '/api/dashboard/search?name=' + name
        })
    },
    DELETE_DASHBOARD_BY_ID(id){
        return request({
            url: '/api/dashboard/' + id,
            method: 'delete'
        })
    }

});