/**
 * 对 axios进行二次封装
 * 以前写法：axios.default.baseURL = 'XXX'
 * 现写法：const xx = axios.create({})
 * 一个项目中可能有不同的基地址，就要用自定义写法设置不同的基地址
 */
import message from 'element-ui'
import axios from 'axios'
import qs from 'qs'
import router from '../router/index'
import {getItem,removeItem} from '../utils/storage'
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
        return Promise.resolve(response.data)
    }else {
        return Promise.reject(response)
    }
}, async function (error) {
    // 如果是401错误 则做以下错误
    // if (error.response.status === 401) {
    //     // 从取出refresh_token
    //     const refreshToken = localStorage.getItem('refresh_token');
    //     // 是否有refreshToken
    //     if (refreshToken) {
    //         // 用refresh_token 重发请求 再次取回一个有效期的
    //         try {
    //             // 注意这里重新发请求要用axios  不能用封装的instance  url地址是根据接口文档写的
    //             const {data: res} = await axios({
    //                 method: 'PUT',
    //                 url: 'http://localhost:8083/mall-user/login/refreshToken',
    //                 params: {
    //                     refreshToken: refreshToken
    //                 }
    //             })
    //             // 定义赋值新的token
    //             const newToken = res.data.token
    //             let refresh_token = '';
    //             refresh_token = res.data.refresh_token;
    //             // 更新token
    //             localStorage.setItem('token',newToken);
    //             // 更新refresh_token
    //             localStorage.setItem('refresh_token',res.data.refresh_token);
    //             // 再发请求
    //             return instance(error.config)
    //         } catch {  // 如果没有拿到新的token
    //             // 回登录页
    //             await router.push({
    //                 path: '/login',
    //                 // query:{} 回到历史页
    //             })
    //         }
    //     } else {   // 如果没有refreshToken
    //         await router.push('/login')
    //     }
    // } else {  // 如果不是401错误
    //     return Promise.reject(error)
    // }
    if(error.response.status){
        switch (error.response.status) {
            // 401:未登录
            // 未登录则跳转登录页面，并携带当前页面的路径
            // 在登录成功后返回当前页面，这一步需要在登录页操作。
            case 401:
                message.Message.error('未登录');
                await router.replace({
                    path: '/login',
                    query: {redirect: router.currentRoute.fullPath}
                });
                break;
            // 430:token过期处理
            // 清处本地token 用refresh_token重新获取token
            case 403:
                removeItem('token')
                break;
            // 404：请求不存在
            case 404:
                message.Message.error('网络请求不存在')
                break;
            // 其他错误直接抛出错误提示
            default:
                message.Message.error(error.response.data.message);
        }
        // return Promise.reject(error.response);
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