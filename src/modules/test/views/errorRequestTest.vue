<template>
    <div class="handle-row">
        <el-button type="primary" @click="handleTestLogin()">登录</el-button>
        <el-button type="primary" @click="handle403()">403</el-button>
        <el-button type="primary" @click="handleNoGrant()">权限等级不够</el-button>
        <el-button type="primary" @click="handle401()">401不携带token或token失效</el-button>
        <el-button type="primary" @click="handleTest404()">404</el-button>
        <br>
        <br>
        <el-button type="primary" @click="getRequest()">get</el-button>
        <el-button type="primary" @click="postRequest()">post</el-button>
        <el-button type="primary" @click="putRequest()">put</el-button>
        <br>
        <br>
        <el-input v-model="key" placeholder="错误类型">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
        </el-input>
        <el-button type="primary" @click="testError()">发送异常类型</el-button>
        <br>
        <br>
        <el-button type="primary" @click="testNoCatch()">不捕获异常</el-button>
    </div>
</template>

<script>


    import instance from "../../../utils/request";
    import * as Message from "element-ui";
    import http from "../../../utils/request";
    import * as qs from "qs";
    import publicUrl from "../../../config";

    export default {
        name: 'test',
        data() {
            return {
                data:'',
                key:'手动抛错'
            }
        },
        methods: {
            handleTestLogin() {
                const params = {
                    userName: '卧龙',
                    password: 'abc123',
                }
                const data = {
                    params
                }
                try{
                    const res = this.axios.get(`${publicUrl.mall_user}/oauth/login`,data);
                }catch (e) {
                    alert(e)
                }
            },
            handle403() {
                const params = {
                    userName: '卧龙',
                    password: 'abc123',
                }
                const data = {
                    params
                }
                const xx = http.get(`${publicUrl.mall_user}/oauth/login`,data)
            },
            async handleNoGrant() {
                const res = await http.get(`${publicUrl.mall_user}/test/grant`)
                Message.Message.success(res.data)
            },

            handleTest404() {
                http.get(`${publicUrl.mall_user}/oa`);
            },

            async handle401(){
                const res = this.axios.get(`${publicUrl.mall_user}/test/grant`)
            },

            async getRequest() {
                let params={
                    name:'高',
                    age:'24',
                }
                try {
                    const res = await http.get(`${publicUrl.mall_user}/test/testGet`,params);
                }catch (e) {
                    Message.Message.error(e.toString())
                }
            },

            async postRequest() {
                const req={
                    name:'卧龙',
                    age:'24',
                }
                const res = await http.post(`${publicUrl.mall_user}/test/testPost`,req);
            },

            async putRequest() {
                const params  = {
                    name:'卧龙',
                    age:13,
                }
                const data = {
                    requestMethodDTO:params
                }
                const res = await http.get(`${publicUrl.mall_user}/test/testPut`,params);
            },

            async testError() {
                const params  = {
                    key:this.key
                }
                const res = await http.get(`${publicUrl.mall_user}/test/testError`,params);
            },

            async testNoCatch(){
                await http.get(`${publicUrl.mall_user}/test/testNoCatch`)
            }

        },

        computed: {
            unreadNum(){
                return this.unread.length;
            }
        }
    }
</script>

<style>
    .handle-row{
        margin-left: 50px;
        margin-top: 30px;
    }
</style>
