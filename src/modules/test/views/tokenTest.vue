<template>
    <div class="handle-row">
        <el-button type="primary" @click="handleTest1()">test1</el-button>
        <el-button type="primary" @click="handleTest2()">test2</el-button>
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
