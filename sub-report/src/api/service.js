import axios from 'axios'
import { get } from 'lodash'

/**
 * @description 创建请求实例
 */
function createService() {
    const service = axios.create()

    //对请求进行拦截处理
    service.interceptors.request.use(
        config => config,
        error => {
            //发送错误
            console.log(error)
            return Promise.reject(error)
        }
    )

    //对请求响应的拦截处理
    service.interceptors.response.use(
        response => {
            // axios返回的数据
            const dataAxios = response.data
            // 后端返回的状态码
            const { code } = dataAxios
            // 根据code进行判断
            if ( code === undefined){
                //如果没有code，说明不是约定的返回结果，那么直接返回
               return dataAxios
            }else {
                switch(code){
                    case 0:
                        return dataAxios.data
                    case 200:
                        return dataAxios.data
                    default:
                        return dataAxios
                }
            }
        },
        error => {
            const status = get(error, 'response.status')
            switch (status) {
                case 400: error.message = '请求错误'; break
                case 401: error.message = '未授权，请登录'; break
                case 403: error.message = '拒绝访问'; break
                case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
                case 408: error.message = '请求超时'; break
                case 500: error.message = '服务器内部错误'; break
                case 501: error.message = '服务未实现'; break
                case 502: error.message = '网关错误'; break
                case 503: error.message = '服务不可用'; break
                case 504: error.message = '网关超时'; break
                case 505: error.message = 'HTTP版本不受支持'; break
                default: break
            }
            //todo: 应该提供错误提示
            console.error(error)
            return Promise.reject(error)
        }
    )
    return service
}

function createRequestFunction(service) {
    return function (config){
        //todo：用户认证信息
        const configDefault = {

        }
        return service(Object.assign(configDefault, config))
    }
}

// 用于真实网络请求的实例和请求方法
export const service = createService()
export const request = createRequestFunction(service)