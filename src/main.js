import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import axios from 'axios'
import VueAxios from "vue-axios";
//将axios注册为全局属性,使用方法为this.axios
Vue.use(VueAxios,axios)
//VUE中使用vue-particles粒子背景特效插件
import VueParticles from 'vue-particles'
import el from "element-ui/src/locale/lang/el";
Vue.use(VueParticles)

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    //标题修改
    document.title = `${to.meta.title} | 秒杀商城`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }

    // 若无token重定向到登录页面
    // if(localStorage.getItem('JWT_TOKEN')){
    //     // 如果在登录界面
    //     if(name === 'login'){
    //         next('/')
    //     }else{
    //         next();
    //     }
    // }else {
    //     if(name === 'login'){
    //         next();
    //     }else {
    //         next({name:'login'});
    //     }
    // }
});

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');

// 配置全局拦截器,每次向后端请求携带头信息
// axios.interceptors.request.use(
//   config => {
//       if(localStorage.JWT_TOKEN){
//           config.headers.HTTP2_HEADER_AUTHORIZATION = 'Bearer ${localStorage.JWT_TOKEN}';
//       }
//       return config;
//       // error => {
//       //     return Promise.reject(error);
//       // }
//   }
// );
