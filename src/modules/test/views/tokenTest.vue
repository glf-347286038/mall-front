<template>
    <div class="handle-row">
        <el-button type="primary" @click="handleTest1()">权限测试</el-button>
        <el-button type="primary" @click="handleTest2()">refreshToken</el-button>
        <el-input v-model="params.access_token" placeholder="token" class="handle-input mr10"></el-input>
        <el-button type="primary" @click="handleCheckToken()">验证token有效性</el-button>
        <el-button type="primary" @click="handleTest4()">404</el-button>
    </div>

</template>

<script>


    import instance from "../../../utils/request";
    import {getItem} from "../../../utils/storage";
    import * as Message from "element-ui";
    import http from "../../../utils/request";
    import publicUrl from "../../../config";

    export default {
        name: 'test',
        data() {
            return {
                params: {
                    access_token:''
                }
            }
        },
        methods: {
            handleTest1() {

            },
            handleTest2() {
                const xx = instance.get('/mall-user/login/login',data)
            },

            handleCheckToken() {
                const req = {
                    accessToken: this.params.access_token
                }
                const res = http.get('http://47.98.149.207:8080/mall-user/oauth/checkToken',req)
                Message.Message.info(res.success)
            },
            handleTest4() {
                const res = instance.get("/mall-user/test/test2");
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
        margin-top: 30px;
    }
</style>
