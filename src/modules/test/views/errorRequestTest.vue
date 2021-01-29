<template>
    <div class="handle-row">
        <el-button type="primary" @click="handleTest1()">登录</el-button>
        <el-button type="primary" @click="handleTest2()">403</el-button>
        <el-button type="primary" @click="handleTest3()">401</el-button>
        <el-button type="primary" @click="handleTest4()">404</el-button>
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
    </div>
</template>

<script>


    import instance from "../../../utils/request";
    import * as Message from "element-ui";
    import http from "../../../utils/request";
    import * as qs from "qs";

    export default {
        name: 'test',
        data() {
            return {
                data:'',
                key:'手动抛错'
            }
        },
        methods: {
            handleTest1() {
                const params = {
                    userName: '卧龙',
                    password: 'abc123',
                }
                const data = {
                    params
                }
                try{
                    const res = this.axios.get("http://localhost:8083/mall-user/login/login",data);
                }catch (e) {
                    alert(e)
                }
            },
            handleTest2() {
                const params = {
                    userName: '卧龙',
                    password: 'abc123',
                }
                const data = {
                    params
                }
                const xx = instance.get('/mall-user/login/login',data)
            },
            async handleTest3() {
                const res = await http.get('/mall-user/test/test')
                Message.Message.success(res.data)
            },
            handleTest4() {
                const res = instance.get("/mall-user/test/test2");
            },

            async getRequest() {
                let params={
                    name:'高',
                    age:'24',
                }

                try {
                    const res = await http.get("/mall-user/test/testGet",params);
                }catch (e) {
                    Message.Message.error(e.toString())
                }

            },

            async postRequest() {
                const req={
                    name:'卧龙',
                    age:'24',
                }
                const res = await http.post("/mall-user/test/testPost",req);
            },

            async putRequest() {
                const params  = {
                    name:'卧龙',
                    age:13,
                }
                const data = {
                    requestMethodDTO:params
                }
                const res = await http.get("/mall-user/test/testPut",params);
            },

            async testError() {
                const params  = {
                    key:this.key
                }
                const res = await http.get("/mall-user/test/testError",params);
            },

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
