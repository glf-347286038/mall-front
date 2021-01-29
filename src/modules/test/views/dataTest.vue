<template>
    <div class="handle-row">
        <el-button type="primary" @click="list()">list对象</el-button>
        <el-button type="primary" @click="object()">单个对象</el-button>
        <el-button type="primary" @click="string()">字符串</el-button>
        <el-button type="primary" @click="map()">map</el-button>
    </div>

</template>

<script>


    import instance from "../../../utils/request";

    export default {
        name: 'test',
        data() {
            return {
                data:[],
            }
        },
        methods: {
            list() {
                instance.get('/mall-user/test/list').then(response=>{

                })
            },
            object() {
                const xx = instance.get('/mall-user/test/login',data)
            },
            string() {
                const res = instance.get("/mall-user/test/test");

            },
            map() {
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
