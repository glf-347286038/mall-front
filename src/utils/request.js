/**
 * 对 axios进行二次封装
 * 以前写法：axios.default.baseURL = 'XXX'
 * 现写法：const xx = axios.create({})
 * 一个项目中可能有不同的基地址，就要用自定义写法设置不同的基地址
 */
import message, {Message} from 'element-ui'
import axios from 'axios'
import qs from 'qs'
import router from '../router/index'
import {getItem, removeItem, setItem} from '../utils/storage'
import {messages} from "../components/common/i18n";

const instance = axios.create({
   // baseURL:'/mall-user', // 后台有多个服务只好注释掉了
    timeout:5000,
})

// post设置请求头
// instance.defaults.headers.post['Content-Type'] ='application/json;charset=UTF-8'

// 在instance上添加请求拦截器，补充token信息
instance.interceptors.request.use(function (request) {
    // if(request.method==='post' || request.method==='POST'){
    //     request.data = qs.stringify(request.data)
    // }
    let token = getItem('token');
    // 如果有token则添加到header中
    token && (request.headers.Authorization = `Bearer ${token}`)
    return request
}), function (error) {
    return Promise.reject(error)
}

// 处理token过期 添加响应拦截器，处理401 token过期
instance.interceptors.response.use(function (response) {
    // 只将请求结果的data字段返回
    if (response.status === 200) {
        return new Promise.resolve(response.data)
    }else {
        return Promise.reject(response)
    }
}, async function (error) {
    if(error.response.status){
        switch (error.response.status) {
            case 401:
                // removeItem('token')
                const refresh_token = getItem('refresh_token');
                if(refresh_token){
                    // 用refresh_token 再次取回一个有效的token
                    try{
                        const res = await axios({
                            method:'get',
                            url:'http://localhost:8083/mall-user/login/refreshToken',
                            params:{
                                refreshToken:refresh_token
                            }
                        });
                        const newToken = res.data.data.access_token
                        if(!newToken){
                            message.Message.error('登录失效，请重新登录')
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
                    }catch (e) {
                        // 没有拿到新token
                        message.Message.error('登录失效,请重新登录')
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
            // 401:未登录
            // 未登录则跳转登录页面，并携带当前页面的路径
            // 在登录成功后返回当前页面，这一步需要在登录页操作。
            case 403:
                message.Message.error('未登录');
                await router.replace({
                    path: '/login',
                    query: {redirect: router.currentRoute.fullPath}
                });
                break;
            // 404：请求不存在
            case 404:
                message.Message.error('网络请求不存在')
                break;
            // 其他错误直接抛出错误提示
            default:
                message.Message.error(error.response.data.message);
        }
    }
});

/**
 * get方法，对应get请求
 * @param url 请求的url地址
 * @param params 请求时携带的参数
 * @returns {Promise<unknown>}
 */
export function get(url,params) {
    return new Promise(((resolve, reject) => {
        axios.get(url,{
            params:params
        })
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error.data)
            })
    }));
}


export function post(url,params) {
    return new Promise(((resolve, reject) => {
        axios.post(url,qs.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error.data)
            })
    }))
}

export default instance