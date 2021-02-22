<template>
    <div id="mainContent">
        <div class="headSearch">
            <el-input class="input-with-select" placeholder="请输入宝贝名称" v-model="requestParams.productName">
                <el-select placeholder="请选择" slot="prepend" v-model="select">
                    <el-option label="数码" value="1"></el-option>
                    <el-option label="衣服" value="2"></el-option>
                    <el-option label="书籍" value="3"></el-option>
                </el-select>
                <el-button @click="queryProduct()" icon="el-icon-search" slot="append"></el-button>
            </el-input>
        </div>

        <div id="productList" v-loading="loading" element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.6)">
            <div v-for="v in productData " class="product">
                <div class="pic=box">
                    <img class="productPic" v-bind:src="v.productImgPath">
                </div>
                <div class="info=box">
                    <div class="row1-price-stock">
                        <div class="price">
                            <span>￥</span>
                            <strong>{{v.productPrice}}</strong>
                        </div>
                        <div class="stock">
                            <span>库存{{v.productStock}}件</span>
                        </div>
                    </div>
                    <div class="row2-name">
                        <a class="product-name">
                            【限时抢购】 {{v.productBrand}}/{{v.productName}}
                        </a>
                    </div>
                    <div class="row3-shop">
                        <div class="shop">
                            <a>
                                <i class="el-icon-more"></i>
                                <span>程序员旗舰店</span>
                            </a>
                        </div>
                        <div class="shop-location">浙江 杭州</div>
                    </div>
                    <div class="row4-sek-kill">
                        <div class="rush-time">
                            <ul>
                                <li>
                                    <span>开抢时间</span>
                                    <span class="start-time-info">{{v.rushStartTime}}</span>
                                </li>
                                <li>
                                    <span>结束时间</span>
                                    <span class="start-time-info">{{v.rushEndTime}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="secKill">
                            <el-button @click="secKill(v.productId,v.productName,v.productPrice)" type="primary">立即抢购
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--支付弹出框-->
        <div id="element-ui">
            <div id="pay-form">
                <el-dialog :visible.sync="dialogFormVisible" title="收货地址">
                    <el-form :model="payForm">
                        <div class="pay-form-name-price">
                            <span class="form-product-name">{{payForm.productName}}</span>
                            <span class="form-product-price">￥{{payForm.productPrice}}</span>
                        </div>
                        <el-form-item :label-width="formLabelWidth" class="pay-form-payMethod" label="付款方式">
                            <el-select placeholder="余额" v-model="payForm.payMethod">
                                <el-option label="余额" value="shanghai"></el-option>
                                <el-option label="支付宝" value="beijing"></el-option>
                                <el-option label="微信" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label-width="formLabelWidth" label="输入密码">
                            <el-input autocomplete="off" type="password" v-model="payForm.password"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="dialog-footer" slot="footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button @click="payConfirm(payForm.productId,payForm.productPrice,payForm.password)"
                                   type="primary">确 定
                        </el-button>
                    </div>
                </el-dialog>
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
                select: '', // 搜索时宝贝分类
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
                productData: [], // 搜索商品的数组
                loading: true, // 搜索商品加载组件
                secKillLoading: false, //抢购按钮加载标识
                payMethod: [{
                    payMethod: '余额',
                }, {
                    payMethod: '支付宝支付(暂不支持)',
                }, {
                    payMethod: '微信支付(暂不支持)',
                }],
                dialogFormVisible: false,  //支付表单是否弹出
                formLabelWidth: '120px', // 支付表单的输入框宽度
                payForm: {
                    productId: '',
                    productName: '',
                    productPrice: '',
                    payMethod: '',
                    password: '',
                },
            }

        },
        methods: {
            // 查询商品列表
            async queryProduct() {
                this.loading = true;
                this.productData = await http.post(`${publicUrl.mall_product}/mallProduct/queryProduct`, this.requestParams);
                this.loading = false;
                console.log(this.productData)
            },

            // 秒杀抢购按钮,弹出支付方式
            async secKill(productId, productName, productPrice) {
                // 将表单状态改为可见
                this.dialogFormVisible = true;
                this.payForm.productId = productId;
                this.payForm.productName = productName;
                this.payForm.productPrice = productPrice;
                // 此处可以将账户余额查询出来显示在前端

            },

            // 取消支付和关闭支付
            async payCancel() {

            },

            // 点击确认支付
            async payConfirm(productId, productPrice, password) {
                Message.Message.success("" + productId + productPrice + password)
                // 调用后台接口.....非常重要！！
                // 支付完成后才关闭支付窗口
                this.dialogFormVisible = false
                // Message.Message.success("支付方式为:"+row.payMethod)
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


