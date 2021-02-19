<template>
<!--    <div style="margin-top: 15px;">-->
<!--        <el-input placeholder="请输入内容" v-model="input1" class="input-with-select">-->
<!--            <el-select v-model="select" slot="prepend" placeholder="请选择">-->
<!--                <el-option label="手机" value="1"></el-option>-->
<!--                <el-option label="电脑" value="2"></el-option>-->
<!--                <el-option label="书籍" value="3"></el-option>-->
<!--            </el-select>-->
<!--            <el-button slot="append" icon="el-icon-search"></el-button>-->
<!--        </el-input>-->
<!--    </div>-->
<!--    <div class="content">-->

<!--    </div>-->
    <div id="mainContent">
        <el-row :gutter="20">
            <el-col :span="24"><div class="headSearch">
                <el-input placeholder="请输入内容" v-model="input1" class="input-with-select">
                    <el-select v-model="select" slot="prepend" placeholder="请选择">
                        <el-option label="手机" value="1"></el-option>
                        <el-option label="电脑" value="2"></el-option>
                        <el-option label="书籍" value="3"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div></el-col>
        </el-row>

        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple">
                <div id = "productList">
                    <div v-for="v in productList ">
                        <img v-bind:src="v.src">
                        <span>￥</span>
                        <span>{{v.price}}</span>
                    </div>
                </div>

                <div class="product">
                    <div class="productPicture">
                        <a id="item00001">
                            <img src="../img/iphoneXSAMAX.jpg" alt="iphoneXSMAX" class="productPic">
                        </a>
                    </div>
                    <div class="productInfo">
                        <div class="row-1">
                            <div class="productPrice">
                                <span>￥</span>
                                <strong>5000</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div></el-col>
        </el-row>
    </div>

</template>

<script>
    import '../css/index.css'
    export default {
        data() {
            return {
                input1: '',
                select: '',
                productList:[
                    {
                        src:'../img/HongMik30.jpg',
                        price:'22',
                    },
                    {
                        src:require('../img/HongMik30.jpg'),
                        price:'22',
                    },
                    {
                        src:require('../img/Honor30.jpg'),
                        price:'22',
                    },
                ],
            }

        }
    }
</script>
<style>

</style>


