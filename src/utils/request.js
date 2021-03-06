/**
 * 对 axios进行二次封装
 * 以前写法：axios.default.baseURL = 'XXX'
 * 现写法：const xx = axios.create({})
 * 一个项目中可能有不同的基地址，就要用自定义写法设置不同的基地址
 */
import message from 'element-ui'
import axios from 'axios'
import router from '../router/index'
import {getItem, removeItem, setItem} from '../utils/storage'

const instance = axios.create({
   // baseURL:'/mall-user', // 后台有多个服务只好注释掉了
    timeout:60000,
})

// 在instance上添加请求拦截器，补充token信息
instance.interceptors.request.use(function (request) {
    let token = getItem('token');
    // 如果有token则添加到header中
    token && (request.headers.Authorization = `Bearer ${token}`)
    return request
}), function (error) {
    return Promise.reject(error)
}

// 处理token过期 添加响应拦截器，处理401 token过期 统一处理后端异常，要注意空指针异常，e.getMessage为null,所以下面才有判断
instance.interceptors.response.use(function (response) {
    // 只将请求结果的data字段返回
    // 后台的ResponseData类的success字段判断请求是否成功
    let result = response.data;
    if (result.success) {
        return Promise.resolve(result.data)
    }else {
        message.Message.error(result.message?result.message:'操作失败:空指针异常')
        return Promise.reject(result)
    }
}, async function (error) {
    if(error.response.status){
        switch (error.response.status) {
            // unAuthorization 使用refresh_token请求access_token
            case 401:
                // removeItem('token')
                const refresh_token = getItem('refresh_token');
                if(refresh_token){
                    try{
                        const res = await axios({
                            method:'get',
                            url:'http://47.98.149.207:8080/mall-user/oauth/refreshToken',
                            params:{
                                refreshToken:refresh_token
                            }
                        });
                        const newToken = res.data.data.access_token
                        if(!newToken){
                            message.Message.error('登录失效，请重新登录')
                            removeItem('token')
                            removeItem('refresh_token')
                            await router.push({
                                path: '/login',
                                query: {
                                    redirect: router.currentRoute.fullPath
                                }
                            })
                        }
                        setItem('token',newToken)
                        // 再次发送请求
                        return instance(error.config)
                        // 用刚刷新的token再次请求还401，则为权限不够
                    }catch (e) {
                        // 没有拿到新token
                        message.Message.error('登录失效,请重新登录')
                        removeItem('token')
                        removeItem('refresh_token')
                        await router.push({
                            path:'/login',
                            query:{
                                redirect: router.currentRoute.fullPath
                            }
                        })
                    }
                }else {
                    // 没有refresh_token
                    await router.replace({
                        path: '/login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
                }
                break;
            // 403: 服务器拒绝处理
            // 未登录则跳转登录页面，并携带当前页面的路径
            // 在登录成功后返回当前页面，这一步需要在登录页操作。
            case 403:
                message.Message.error('资源不可用');
                // await router.replace({
                //     path: '/login',
                //     query: {redirect: router.currentRoute.fullPath}
                // });
                break;
            // 404：请求不存在
            case 404:
                message.Message.error('网络请求不存在')
                break;
            case 500:
                message.Message.error("服务器内部错误")
                break;
            // 其他错误直接抛出错误提示
            default:
                message.Message.error(error.response.data.message);
        }
    }
})


/**
 * axios二次封装
 */
const http = {
    /**
     * get
     * @param url
     * @param params
     * @returns {Promise<>}
     */
    get(url, params) {
        return new Promise((resolve, reject) => {
            instance.get(url, {
                params:params
            }).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    /**
     * post
     * @param url
     * @param data
     * @returns {Promise<>}
     */
    post(url, data) {
        return new Promise((resolve, reject) => {
            instance.post(url, data)
                .then((response) => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    /**
     * put
     * @param url
     * @param data
     * @returns {Promise<>}
     */
    put(url, data) {
        return new Promise((resolve, reject) => {
            instance.put(url, data).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    /**
     * delete
     * @param url
     * @param data
     * @returns {Promise<>}
     */
    delete(url, data) {
        return new Promise((resolve, reject) => {
            instance.delete(url, data).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    },
}
export {instance}
export default http