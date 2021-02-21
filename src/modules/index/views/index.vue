<template>
    <div id="mainContent">
        <div class="headSearch">
            <el-input class="input-with-select" placeholder="请输入内容" v-model="input1">
                <el-select placeholder="请选择" slot="prepend" v-model="select">
                    <el-option label="手机" value="1"></el-option>
                    <el-option label="电脑" value="2"></el-option>
                    <el-option label="书籍" value="3"></el-option>
                </el-select>
                <el-button @click="queryProduct()" icon="el-icon-search" slot="append"></el-button>
            </el-input>
        </div>

        <div id="productList">
            <div v-for="v in productData ">
                <img class="productPic" v-bind:src="v.productImgPath">
                <span>￥</span>
                <strong>{{v.productPrice}}</strong>
            </div>
        </div>
    </div>

</template>

<script>
    import '../css/index.css'
    import http from "../../../utils/request";
    import publicUrl from "../../../config";
    import * as Message from "element-ui";

    export default {
        data() {
            return {
                input1: '',
                select: '',
                requestParams: {
                    productName: '',
                    productBrand: '',
                    Type: '',
                    productDescription: '',
                    lowestPrice: '',
                    highestPrice: '',
                    rushStartTime: '',
                    rushEndTime: ''
                },
                productData: [],
            }

        },
        methods: {
            // 查询商品列表
            async queryProduct() {
                this.productData = await http.post(`${publicUrl.mall_product}/mallProduct/queryProduct`, this.requestParams);
                console.log(this.productData)
            }
        },

        // beforeCreate（创建前）,
        // created（创建后）,
        // beforeMount(载入前),
        // mounted（载入后）,
        // beforeUpdate（更新前）,
        // updated（更新后）,
        // beforeDestroy（销毁前）,
        // destroyed（销毁后）
        // 在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图
        created() {
            this.queryProduct();
        },
        // 在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作
        mounted() {

        },
    }
</script>
<style>

</style>


