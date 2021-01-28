<template>
    <div class="handle-row">
        <el-button type="primary" @click="handleTest1()">权限测试</el-button>
        <el-button type="primary" @click="handleTest2()">refreshToken</el-button>
        <el-button type="primary" @click="handleTest3()">test3</el-button>
        <el-button type="primary" @click="handleTest4()">404</el-button>
    </div>

</template>

<script>


    import instance from "../../../utils/request";

    export default {
        name: 'test',
        data() {
            return {

            }
        },
        methods: {
            handleTest1() {

            },
            handleTest2() {
                const xx = instance.get('/mall-user/login/login',data)
            },
            handleTest3() {
                const res = instance.get("/mall-user/test/test");

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
