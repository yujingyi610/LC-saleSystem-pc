<template>
    <div class="redactHouseInfo">
        <el-card class="box-card noBgColor" v-show="!isShow">
            <div slot="header" class="clearfix">
                <span>{{createHouseInfo.buildName}}的房间</span>
                <div style="float: right">
                    <el-button type="success" @click="copyFrom">从其他房间复制</el-button>
                    <el-button type="success" @click="handleFinish">完成</el-button>
                </div>
            </div>
            <div class="text item table_header_bgColor">
                <el-checkbox v-model="checkAll" style="float: right" @change="handleCheckAll">全选</el-checkbox>
                <el-table v-if="tableData1 && cellList1" :data="tableData1" style="width: 100%" border>
                    <el-table-column label="楼层名称:" prop="name" fixed width="80"></el-table-column>
                    <el-table-column v-for="(item, index) in cellList1" :key="index" :label="item.unitName+'单元房间'" :prop="item.id" :width="86*item.maxNum + 20">
                        <template slot-scope="scope">
                            <span v-if="scope.row[item.id]" v-for="(item2, index2) in scope.row[item.id]" :key="index2" class="cellItem">
                                <el-checkbox v-model="item2.isChecked">
                                    <span class="cell_name cell_con" @click="handleRedactAllInfo(item2, item.id)">{{item2.houseName}}</span>
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
        <!-- <span v-loading.fullscreen.lock="fullscreenLoading"></span> -->
        <component :is="isShow" v-bind:cellList="cellList1" v-bind:tableData="tableData1" v-bind:data="data" :createHouseInfo="createHouseInfo" v-on:closeChild="closeChild"></component>
    </div>
</template>

<script>
import {getHouseView, upDateHouse, getHouseType} from "@/api/pages/mainPage/plan/house"
import AllInfo from './allInfo'
import CopyFrom from './copyFrom'
    export default {
        props: {
            cellList: Array,
            tableData: Array,
            createHouseInfo: Object
        },
        components: {
            'all-info': AllInfo,
            'copy-from': CopyFrom
        },
        methods: {
            arraySpanMethod({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 0) { return [1, 2] }
                else if (columnIndex === 1) { return [0, 0] }
            },
            handleGetHouseType() {// 获取下拉户型数据
                let params = new URLSearchParams();
                params.append( "areaId", this.createHouseInfo.build.areaId );
                getHouseType(params).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.options3 = res.data;
                    }
                })
            },
            // 获取房间视图
            handleGetHouseView(params) {
                getHouseView(params).then(res=>{
                      
                    this.tableData1 = [];
                    res.data.floorHouseArray.map((floorItem, index)=>{
                        let floorObj = {
                            name: floorItem.floorName
                        }
                        floorItem.houseDtos.map(houseItem=>{
                            if( floorObj[houseItem.unitId] ){
                                floorObj[houseItem.unitId].push(houseItem)
                            }else{
                                floorObj[houseItem.unitId] = [];
                                floorObj[houseItem.unitId].push(houseItem)
                            }
                        })
                        this.tableData1.push(floorObj);
                    })
                    console.log(this.tableData1)
                    this.cellList1 = res.data.unitArray;
                    this.cellList1.map(item=>{
                        item.maxNum = item.maxNum || 1
                    })
                    // this.maxFloorNum = res.data.maxFloorNum;
                    // this.buildName = res.data.build.buildName;
                })

            },
            handleRedactAllInfo(info, unit) {
                this.data.info = info;
                this.data.unit = unit;
                this.isShow = 'all-info';
            },
            handleCheckAll() {// 全选
                // if( this.checkAll ){
                    console.log(this.checkAll)
                    this.tableData1.map(item=>{
                        for( let key in item ){
                            if( key !== 'name' && item[key] ){
                                item[key].map(item2=>{
                                    this.$set(item2, 'isChecked', this.checkAll)
                                })
                            }
                        }
                    })
                // }
            },
            closeChild(chooseHouseName) {
                
                if( chooseHouseName ){
                    console.log(chooseHouseName);
                    console.log(this.tableData1)
                    console.log(this.cellList1)
                    let unitName = chooseHouseName.split('')[0];
                    let floor = chooseHouseName.split('')[1];
                    let name = chooseHouseName.split('')[1] + chooseHouseName.split('')[2] + chooseHouseName.split('')[3];
                    let chooseForm = {};
                    this.tableData1.map(item=>{
                        if( item.name == floor ){
                            this.cellList1.map(cellItem=>{
                                if( cellItem.unitName === unitName ){
                                    let cellId = cellItem.id;
                                    item[cellId].map(item2=>{
                                        if( item2.houseName == name ){
                                            chooseForm = item2
                                        }
                                    })
                                }
                            })
                            
                        }
                    })
                    this.tableData1.map(item=>{
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
                                        item2.isPresent = chooseForm.isPresent;
                                        item2.baseFormatName = chooseForm.baseFormatName;
                                        item2.baseFormatCode = chooseForm.baseFormatCode;
                                        item2.formatId = chooseForm.formatId;

                                    }
                                })
                            }
                        }
                    })
                    console.log(this.tableData1)
                    let list = [];
                    this.tableData1.map(floorItem=>{
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
                         
                        if( res.status === 200 ){
                            this.$message({
                                type: 'success',
                                message: '批量更新成功！',
                                showClose: true
                            })
                            let params = new URLSearchParams();
                            params.append( "buildId",this.createHouseInfo.val.id );
                            this.handleGetHouseView(params)
                            this.isShow = '';
                            this.$emit('showClick')
                        }
                    })
                    return
                }
                let params = new URLSearchParams();
                params.append( "buildId",this.createHouseInfo.val.id );
                this.handleGetHouseView(params)
                this.isShow = '';
                // this.$emit('showClick')
            },
            handleFinish() {
                let list = [];
                this.tableData1.map(floorItem=>{
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
                     
                    if( res.status === 200 ){
                        this.$message({
                            type: 'success',
                            message: '保存成功！'
                        })
                        this.$emit('showClick')
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            // 从其他房间复制
            copyFrom() {
                // 判断修改后是否保存，未保存则不能跳转
                if( this.isModify ){
                    alert('房间信息修改后未保存！')
                }else{
                    this.isShow = 'copy-from'
                }

            },
            // 修改后未保存
            handleIsModify() {
                this.isModify = true;
            }
        },
        created() {
            console.log(this.createHouseInfo)
            this.tableData1 = this.tableData;
            this.cellList1 = this.cellList;
            console.log(this.tableData1)
            console.log(this.cellList1)
        
            this.handleGetHouseType();
            
        },
        data() {
            return {
                tableData1: [],
                cellList1: [],
                isShow: '',
                data: {},
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
                // fullscreenLoading: false
                checkAll: false
            }
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
    float: left;
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
