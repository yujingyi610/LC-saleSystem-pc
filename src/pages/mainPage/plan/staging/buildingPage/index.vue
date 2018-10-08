<template>
    <div class="buildingPage">
        <el-card class="box-card margin_bottom20">
            <div slot="header" class="clearfix">
                <span style="float: left" class="title">楼栋信息</span>
                <div style="float: right">
                    <p class="update_date" style="display: inline-block">更新日期：<span>{{buildingInfo.updateTime}}</span></p>
                    <!-- <el-button type="text" style="margin-left: 26px">编辑</el-button> -->
                </div>
            </div>
            <div class="text item">
                <el-form ref="form" :model="buildingInfo" style="font-size:12px">
                    <el-row :gutter="50">
                        <el-col :span="8">
                            <el-form-item label="楼栋名称">{{buildingInfo.buildName}}</el-form-item>
                            <el-form-item label="交付日期">{{buildingInfo.preSaleGetDate}}</el-form-item>
                            <el-form-item label="毛坯/精装">{{buildingInfo.deliveryStandard}}</el-form-item>
                            
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="所属分期">{{buildingInfo.devstagesName}}</el-form-item>
                            <el-form-item label="预售证编码">{{buildingInfo.preSaleNo}}</el-form-item>
                            <el-form-item label="房产性质">{{buildingInfo.houseKindName}}</el-form-item>
                            
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="支付状态">{{buildingInfo.deliverStatusText}}</el-form-item>
                            <el-form-item label="预售证领取日期">{{buildingInfo.preSaleGetDate}}</el-form-item>
                            <el-form-item label="备注">{{buildingInfo.remark}}</el-form-item>
                            <!-- <el-form-item label="计价方式">{{buildingInfo.priceMethodText}}</el-form-item> -->
                        </el-col>
                    </el-row>
                    <el-form-item label="预售证扫描证"><img style="width: 80px; height: 80px; margin-right: 15px" v-for="(item, index) in buildingInfo.commonResources" :key="index" :src="item.fileUrl"></el-form-item>
                </el-form>
            </div>
        </el-card>
        <component :is="isShow" v-on:handleShow="handleIsShow" v-on:createHouse="handleCreate" @updataTree="handleUpdataTree" v-bind:createHouseInfo="createHouseInfo" :buildingInfo="buildingInfo"></component>
    </div>
</template>

<script>
import {getBuildInfo} from "@/api/pages/mainPage/plan/house"
import FloorView from './floorView'
import CreateHouse from './createHouse'
import unitView from './unitView'
import parkingArea from './parkingArea'
    export default {
        props: {
            val: Object,
            node: Object,
            nodeAll: Object
        },
        watch: {
            // val() { 
            //     console.log(this.val)
            //     this.isShow = '';
            //     let params = new URLSearchParams();
            //     params.append( "id",this.val.id );
            //     this.handleGetBuildInfo(params);
            // },
            val: {
                handler(oldVal, newVal) {
                    if( oldVal.id !== newVal.id ){
                        this.isShow = '';
                        let params = new URLSearchParams();
                        params.append( "id",this.val.id );
                        this.handleGetBuildInfo(params);
                    }
                },
                deep: true
            },
            node: {
                handler(oldVal, newVal) {
                    if( oldVal.id !== newVal.id ){
                        this.isShow = '';
                        let params = new URLSearchParams();
                        params.append( "id",this.val.id );
                        this.handleGetBuildInfo(params);
                    }
                },
                deep: true
            },
            // node() { 
            //     let params = new URLSearchParams();
            //     params.append( "id",this.val.id );
            //     this.handleGetBuildInfo(params);
            // },
        },
        components: {
            'floor-view': FloorView,
            'create-house': CreateHouse,
            'unit-view': unitView,
            'parking-area':parkingArea
        },
        methods: {
            handleGetBuildInfo(params) {
                getBuildInfo(params).then(res=>{
                	 ;
//                  console.log(res.data.area.areaName);
                    this.buildingInfo = res.data.build;
//                  console.log(this.buildingInfo);
					console.log(this.buildingInfo.buildName);
                    this.createHouseInfo.buildName = this.buildingInfo.buildName;
                    this.createHouseInfo.nature = this.buildingInfo.nature;
                    this.createHouseInfo.val = this.val;
                    this.createHouseInfo.build = this.buildingInfo;
                    if(res.data.area.formatName === "车位" || res.data.area.formatName === "储藏室" || res.data.area.formatCode === "PROJECT_FORMATE_6" || res.data.area.formatCode === "PROJECT_FORMATE_7"){
                    	this.isShow = 'parking-area';
                    }else{
                    	this.isShow = 'floor-view';
                    }
                    
                })
            },
            handleIsShow(val) {
                console.log('楼栋模块父组件接受到的切换显示模块的数据', val)
                this.$emit('updataTree', this.nodeAll);
                console.log(this.isShow)
                this.isShow = val;
                console.log(this.isShow)
            },
            handleCreate(val) {
                console.log('楼栋模块父组件接受到的生成房间的数据', val)
                this.createHouseInfo = val;
            },
            handleUpdataTree() {
                console.log('楼栋组件接收到的更新树')
                this.$emit('updataTree', this.nodeAll);
            }
        },
        created() {
            // this.setNewsApi();
            let params = new URLSearchParams();
            params.append( "id",this.val.id );
            this.handleGetBuildInfo(params);
        },
        data() {
            return{
                LastUpdate: '2016-2-1',
                buildingInfo:{},
                isShow: '',
                createHouseInfo: {}
            }
        }
    }
</script>

<style scoped>
.buildingPage{
    overflow: auto;
    height: 100%;
}
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
</style>