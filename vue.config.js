// module.exports = {
//     devServer:{
//         proxy:{
//             '/mall-user':{   // 根据eureka上的名字加后缀
//                 target: process.env.VUE_APP_BASE_URL+userServiceName, // 要访问的后端接口域名  axios写法为/mall-user/login
//                 changeOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
//                 ws: false,  // 关闭wbsSocket
//                 pathRewrite:{
//                     // '^/mall-user':'/api' 则未http://127.0.0.1:8080/api/login
//                     '^/mall-user':''  // 配出来的接口是 http://127.0.0.1:8080/login
//                 }
//             },
//             // 'mall-order':{
//             //     target: 'http://localhost:8082/mall-order',
//             //     changeOrigin: true, // 开启代理
//             // }
//         }
//     },
//
//     // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
//     //例如 https://www.my-app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 baseUrl 为 /my-app/。
//     // publicPath: './',
//     // 用于放置生成的静态资源
//     assetsDir: 'static',
// }