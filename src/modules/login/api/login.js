//登录认证,传入userName和password
import axios from 'axios'
import da from "element-ui/src/locale/lang/da";
export function loginCheck(params) {
    console.log(params);
    // this.$http({
    //     method:'get',
    //     url:'http://localhost:8083/mall-user/login',
    //     params:params
    // });

    let data = axios({
        method:'get',
        url:'http://localhost:8083/mall-user/login',
        params:params
    }).then(response => {
        console.log(response.data.data)
        data = response.data.data;
    })
}

export function test() {
    return axios(
        {
            method:'get',
            url:'http://localhost:8083/mall-user/login',
            params:{
                userName:'dd',
                password:'dd'
            }
        }
    )
}