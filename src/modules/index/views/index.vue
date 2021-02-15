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
        <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
    </div>

</template>

<script>
    import '../css/index.css'
    export default {
        data() {
            return {
                input1: '',
                select: ''
            }
        }
    }
</script>
<style>

</style>


