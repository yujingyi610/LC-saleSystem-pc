<template>
    <div>
        <el-card class="box-card noBgColor" v-if="!isShow">
            <div slot="header" class="clearfix">
                <span class="title">{{buildInfo.buildName}}的房间</span>
                <div style="float: right">
                    <el-button type="success" @click="handleCopyFrom">从其他房间复制</el-button>
                    <el-button type="success" @click="handleFinish">完成</el-button>
                </div>
            </div>
            <div class="text item table_header_bgColor">
                <el-table v-if="tableData && cellList" :data="tableData" style="width: 100%" border>
                    <el-table-column label="楼层名称:" prop="name" fixed width="80"></el-table-column>
                    <el-table-column v-for="(item, index) in cellList" :key="index" :label="item.unitName+'单元房间'" :prop="item.unitName" :width="86*item.maxNum + 20">
                        <template slot-scope="scope">
                            <span v-if="scope.row[item.unitName]" v-for="(item2, index2) in scope.row[item.unitName]" :key="index2" class="cellItem">
                                <el-checkbox v-model="item2.isChecked">
                                    <span class="cell_name cell_con" @click="handleRedactAllInfo(item2, item.unitName)">{{item2.houseName}}</span>
                                    <!-- <div>
                                        <div class="selectStyle">
                                            <select v-model="item2.houseLayoutName" class="select" @change="handleIsModify">
                                                <option v-for="item in options3" :key="item.layoutName" :value="item.layoutName">{{item.layoutName}}</option>
                                            </select>
                                        </div>
                                        <div class="selectStyle">
                                            <select v-model="item2.orientation" class="select" @change="handleIsModify">
                                                <option v-for="item in options2" :key="item.value" :value="item.value" :label="item.label">{{item.value}}</option>
                                            </select>
                                        </div>
                                    </div> -->
                                </el-checkbox>
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <component :is="isShow" :data="houseInfo" :buildInfo="buildInfo" :tableData="tableData" :cellList="cellList" @closeChild="handleCloseChild"></component>
    </div>
</template>

<script>
import {getHouseView, upDateHouse, getHouseType} from "@/api/pages/mainPage/plan/house"
// import allInfo from './allInfo'
import allInfo from '../../../../buildingPage/floorView/redactHouseInfo/allInfo'
import copyFrom from './copyFrom'
    export default {
        props:{
            buildInfo: Object
        },
        components: {
            allInfo,
            copyFrom
        },
        data() {
            return{
                tableData: null,
                cellList: null,
                options: [{
                    label: '园林景',
                    value: '园林景'
                    }, {
                    label: '海景',
                    value: '海景'
                }],
                isPresentOption: [{
                    label: '是',
                    value: 0
                },{
                    label: '否',
                    value: 1
                }],
                options2: [
                    {label: '朝向东',value: '朝向东'},
                    {label: '朝向南',value: '朝向南'},
                    {label: '朝向西',value: '朝向西'},
                    {label: '朝向北',value: '朝向北'},
                    {label: '朝向东南',value: '朝向东南'},
                    {label: '朝向西南',value: '朝向西南'},
                    {label: '朝向东北',value: '朝向东北'},
                    {label: '朝向西北',value: '朝向西北'}
                ],
                options3: [],
                isModify: false,// 修改后是否保存，未保存弹出提醒框
                isShow: '',
                houseInfo: {}// 存放所点击的房间的数据
            }
        },
        methods: {
            // 获取房间视图
            handleGetHouseView() {
                let params = new URLSearchParams();
                params.append( "buildId",this.buildInfo.build.itemRefId );
                getHouseView(params).then(res=>{
                      
                    this.tableData = [];
                    res.data.floorHouseArray.map((floorItem, index)=>{
                        let floorObj = {
                            name: floorItem.floorName
                        }
                        floorItem.houseDtos.map(houseItem=>{
                            if( floorObj[houseItem.unitName] ){
                                floorObj[houseItem.unitName].push(houseItem)
                            }else{
                                floorObj[houseItem.unitName] = [];
                                floorObj[houseItem.unitName].push(houseItem)
                            }
                        })
                        this.tableData.push(floorObj);
                    })
                    console.log(this.tableData)
                    this.cellList = res.data.unitArray;
                    this.cellList.map(item=>{
                        item.maxNum = item.maxNum || 1
                    })
                    // this.maxFloorNum = res.data.maxFloorNum;
                    // this.buildName = res.data.build.buildName;
                })
            },
            handleGetHouseType() {// 获取下拉户型数据
                let params = new URLSearchParams();
                params.append( "areaId", this.buildInfo.build.areaId );
                getHouseType(params).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.options3 = res.data;
                    }
                })
            },
            // 修改后未保存
            handleIsModify() {
                this.isModify = true;
            },
            handleRedactAllInfo(info, unit) {//  编辑单个房间详情
                this.houseInfo.info = info;
                this.houseInfo.unit = unit;
                this.isShow = 'all-info';
            },
            handleCloseChild(chooseHouseName) {// 关闭子组件页面，刷新编辑页面数据
                this.isShow = '';
                // this.handleGetHouseView();
                if( chooseHouseName ){
                    console.log(chooseHouseName);

                    let unitName = chooseHouseName.split('+')[0];
                    let name = chooseHouseName.split('+')[1];                    
                    let floor = name.split('')[0];
                    let chooseForm = {};
                    this.tableData.map(item=>{
                        if( item.name == floor ){
                            item[unitName].map(item2=>{
                                if( item2.houseName == name ){
                                    chooseForm = item2
                                }
                            })
                        }
                    })

                    this.tableData.map(item=>{
                        for( let key in item ){
                            if( key != 'name' ){
                                item[key].map(item2=>{
                                    if( item2.isChecked ){
                                        item2.preSaleGetDate = chooseForm.preSaleGetDate;
                                        // item2.houseLayoutName = chooseForm.houseLayoutName;// 户型
                                        item2.format = chooseForm.format;
                                        item2.floorSpace = chooseForm.floorSpace;
                                        item2.apportionArea = chooseForm.apportionArea;
                                        item2.basementArea = chooseForm.basementArea;
                                        item2.giftArea = chooseForm.giftArea;
                                        item2.preTotalPrice = chooseForm.preTotalPrice;
                                        item2.prePrice = chooseForm.prePrice;
                                        item2.sightName = chooseForm.sightName;
                                        item2.doupBeginDate = chooseForm.doupBeginDate;
                                        item2.doupEndDate = chooseForm.doupEndDate;
                                        item2.houseKindName = chooseForm.houseKindName;
                                        item2.priceMethod = chooseForm.priceMethod;
                                        item2.buildingArea = chooseForm.buildingArea;
                                        item2.gardenArea = chooseForm.gardenArea;
                                        item2.roofArea = chooseForm.roofArea;
                                        item2.carTypeText = chooseForm.carTypeText;
                                        // item2.orientation = chooseForm.orientation;// 朝向
                                        item2.houseStatusName = chooseForm.houseStatusName;
                                        item2.isInit = chooseForm.isInit;
                                        item2.preSaleNo = chooseForm.preSaleNo;
                                        item2.preMinPrice = chooseForm.preMinPrice;
                                        item2.preMinTotalPrice = chooseForm.preMinTotalPrice;

                                    }
                                })
                            }
                        }
                    })
                }
                console.log(this.tableData)
                let list = [];
                this.tableData.map(floorItem=>{
                    for( let key in floorItem ){
                        if( key !== 'name' ){
                            floorItem[key].map(houseItem=>{
                                list.push(houseItem)
                            })
                        }
                    }
                })
                console.log(list)
                upDateHouse(list).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.$message({
                            type: 'success',
                            message: '更新成功！'
                        })
                        this.handleGetHouseView();
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            handleFinish() {// 完成按钮，关闭编辑页面
                this.$emit('showClick')
            },
            handleCopyFrom() {// 从其他房间复制
                this.isShow = 'copy-from';
            }
        },
        created() {
            console.log(this.buildInfo);
            this.handleGetHouseView();
            this.handleGetHouseType()
        }
    }
</script>

<style scoped>
.redactHouseInfo{
    position: absolute;
    width: 100%;
    background: #fff;
    left: 0;
    top: 0;
    bottom: 0;
}
.select{
    display:block;
    width:100%;
    height:100%;
    box-sizing:border-box;
    background:none;
    border:1px solid #e1e1e1;
    outline:none;
    -webkit-appearance:none;
    padding:0 5px;
    line-height:inherit;
    color:inherit;
    cursor:default;
    font-size:12px;
    position:relative;
    z-index:3;
}
.select option{
    color:#404040;
}
.select option:hover{
    color:#fff;
}
.select option:checked{
    background:#f5f7fa;
}
.selectStyle{
    display:block;
    margin:0 auto;
    overflow:hidden;
    height:20px;
    width:60px;
    border-radius:0;
    background-size:auto 80%;
    color:#404040;
    line-height: 20px;
    position:relative;
    z-index:1;
    border-radius: 3px;
}
.selectStyle:before{
    position:absolute;
    z-index:1;
    top:50%;
    right:10px;
    margin-top:-2.5px;
    display:block;
    width:0;
    height:0;
    border-style:solid;
    border-width:5px 5px 0 5px;
    border-color:#fff transparent transparent transparent;
    content:"";
}
.selectStyle:after{
    position:absolute;
    z-index:1;
    top:50%;
    right:10px;
    margin-top:-3.5px;
    display:block;
    width:0;
    height:0;
    border-style:solid;
    border-width:5px 5px 0 5px;
    border-color:#909399 transparent transparent transparent;
    content:"";
}
</style>