<template>
    <div class="login-wrap">
        <div id="loginBackground">
            <vue-particles
                    color="#4169E1"
                    :particleOpacity="0.7"
                    :particlesNumber="100"
                    shapeType="circle"
                    :particleSize="4"
                    linesColor="#FFFFFF"
                    :linesWidth="1"
                    :lineLinked="true"
                    :lineOpacity="0.4"
                    :linesDistance="150"
                    :moveSpeed="3"
                    :hoverEffect="true"
                    hoverMode="grab"
                    :clickEffect="true"
                    clickMode="push"
            >
            </vue-particles>
        </div>
        <div class="ms-login">
            <div class="ms-title">
                <a href="javascript:void(0);">秒杀系统</a>
            </div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="login()">登录</el-button>
                </div>
<!--                <p class="login-tips">Tips : 用户名和密码随便填。</p>-->
            </el-form>
        </div>
    </div>
</template>

<script>
    import {setItem} from "../../../utils/storage";

    export default {
        data: function() {
            return {
                param: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                },
                // 登录返回的数据
                data:{
                    access_token:'',
                    refresh_token:'',
                    info:{
                        userId:'',
                        userName:'',
                        age:'',
                        phone:'',
                        sex:'',
                    }
                }
            };
        },
        methods: {
            async login(){
                this.axios({
                    method:'get',
                    url:'http://localhost:8083/mall-user/login/login',
                    params:{
                        userName:this.param.username,
                        password:this.param.password,
                    }
                }).then(res=>{
                    const response = res.data.data;
                    this.data.access_token = response.access_token;
                    this.data.refresh_token = response.refresh_token;
                    this.data.info = response.info;
                    if(this.data.access_token !=='') {
                        setItem('ms_username', this.param.username);
                        setItem('ms_userId', this.data.info.userId);
                        setItem('token', this.data.access_token);
                        setItem('refresh_token', this.data.refresh_token);
                        this.$router.push('/dashboard')
                        this.$message.success('登录成功');
                    }
                }).catch((error) =>{
                    this.$message.error(error.toString());
                })
            },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../../assets/img/login-bck.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
/*设置登录界面粒子特效的背景*/
/*#loginBackground {*/
/*    font-size: 12px;*/
/*    line-height: 30px;*/
/*    !*粒子特效背景颜色*!*/
/*    background-color: #25525a;*/
/*    height: 100%;*/
/*}*/
</style>