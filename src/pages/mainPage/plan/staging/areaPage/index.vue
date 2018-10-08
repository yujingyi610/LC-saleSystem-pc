<template>
    <div class="areaPage">
        <el-card class="box-card margin_bottom20" >
            <div slot="header" class="clearfix">
                <span style="float: left" class="title">区域信息</span>
                <div style="float: right">
                    <p class="update_date" style="display: inline-block">更新日期：<span>{{form.updateTime}}</span></p>
                </div>
            </div>
            <div class="text item">
                <el-form ref="form" :model="form" size="mini" style="font-size:12px">
                    <el-row :gutter="10">
                        <el-col :span="8"><el-form-item label="组团名称:">{{form.areaName}}</el-form-item></el-col>
                        <el-col :span="12"><el-form-item label="所属分期:">{{form.devstagesName}}</el-form-item></el-col>
                        <el-col :span="4"><el-form-item label="业态:">{{form.formatName}}</el-form-item></el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="8"><el-form-item label="物业费标准:">{{form.propertyFee}}</el-form-item></el-col>
                        <el-col :span="16"><el-form-item label="备注:" >{{form.remark}}</el-form-item></el-col>
                    </el-row>
                </el-form>
            </div>
        </el-card>
        <component :is="isShow" :val="val" :node="node" :nodeAll="nodeAll" :areaInfo="form" @upDataTree="handleUpdataTree"></component>
    </div>
</template>

<script>
import {getAreaInfo} from "@/api/pages/mainPage/plan/house"
import buildList from './buildList'
import VillaList from './VillaList'
    export default {
        props:{
            val: Object,
            node: Object,
            nodeAll: Object
        },
        components: {
            buildList,
            VillaList
        },
        methods: {
            handleGetAreaInfo(params) {
                getAreaInfo(params).then(res=>{
                     ;
                    this.form = res.data;
                    
                }).then(()=>{
                    if( this.form.formatCode === 'PROJECT_FORMATE_1' || this.form.formatName === '别墅' ){
                        this.isShow = 'villa-list'
                    }else{
                        this.isShow = 'build-list'
                    }
                })
            },
            handleUpdataTree() {
                console.log('areaPage更新树触发了')
                this.$emit('updataTree', this.nodeAll);
            }
        },
        created() {
            let params = new URLSearchParams();
            params.append( "id",this.val.id );
            this.handleGetAreaInfo(params);
        },
        watch: {
            node: function() {
                let params = new URLSearchParams();
                params.append( "id",this.val.id );
                this.handleGetAreaInfo(params);
            },
            val: function() {
                let params = new URLSearchParams();
                params.append( "id",this.val.id );
                this.handleGetAreaInfo(params);
            }
        },
        data(){
            return{
                form: {},
                isShow: ''
            }
        }
    }
</script>

<style scoped>

</style>
