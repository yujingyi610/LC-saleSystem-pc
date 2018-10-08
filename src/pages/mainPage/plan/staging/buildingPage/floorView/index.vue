<template>
    <div style="position:relative">
        <el-card class="box-card noBgColor" v-if="!isShow">
            <div slot="header" class="clearfix">
                <span class="title">{{createHouseInfo.buildName}}的房间</span>
                <div style="float: right">
                    <el-button v-has="'prj:floor:add'" type="success" @click="addFloor" v-show="tableData" >新增楼层</el-button>
                    <el-button v-has="'prj:house:edit'" type="success" @click="redactHouseInfo" v-show="tableData" >编辑房间</el-button>
                    <el-button type="success" @click="importRoom" v-show="!tableData" v-has="'prj:house:import'">导入房间</el-button>
                    <el-button type="success" @click="createHouse" v-show="!tableData" v-has="'prj:house:add'">生成房间</el-button>
                    <el-button type="success" @click="unitView" v-if="tableData">单元视图</el-button>
                </div>
            </div>
            <div class="text item table_header_bgColor">
                <el-table v-if="tableData && cellList" :data="tableData" style="width: 100%" border>
                    <el-table-column label="楼层名称:" prop="name" fixed width="80"></el-table-column>
                    <el-table-column v-for="(item, index) in cellList" :key="index" :label="item.unitName+'单元房间'" :prop="item.id" :width="86*item.maxNum + 20">
                        <template slot-scope="scope">
                            <span v-if="scope.row[item.id]" v-for="(item2, index2) in scope.row[item.id]" :key="index2" class="cellItem">
                                <span class="cell_name cell_con">{{item2.houseName}}</span>
                                <!-- <div>
                                    <span class="cell_houseType cell_con">
                                        <span v-if="item2.houseLayoutName">{{item2.houseLayoutName}}</span>
                                        <span v-else>未设置</span>
                                    </span>
                                    <span class="cell_orientation cell_con">
                                        <span v-if="item2.orientation">{{item2.orientation}}</span>
                                        <span v-else>未设置</span>
                                    </span>
                                </div> -->
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
                <div v-else>请生成房间</div>
            </div>
        </el-card>
        <el-dialog title="新增楼层" :visible.sync="dialogFormVisible">
            <el-form :model="form" :inline="true">
                <el-form-item label="楼层名称:">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="请选择楼层:">
                    <el-select v-model="form.floor">
                        <el-option v-for="(item, index) in locationFloorList" :key="index" :label="item.floorName" :value="item.floor"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="新增规则:">
                    <el-select v-model="form.rule">
                        <el-option label="在此楼层之上添加" value="above"></el-option>
                        <el-option label="在此楼层之下添加" value="under"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAddFloor">确 定</el-button>
            </div>
        </el-dialog>
        <component :is="isShow" v-bind:createHouseInfo="createHouseInfo" v-bind:tableData="tableData" v-bind:cellList="cellList" v-on:showClick="handleShow"></component>
        <!-- <redact-info v-show="isShow" v-bind:tableData="tableData" v-bind:cellList="cellList" v-on:showClick="handleShow"></redact-info> -->
    </div>
</template>

<script>
import {getHouseView, saveFloor, getUnitFloor} from "@/api/pages/mainPage/plan/house"
import redactInfo from './redactHouseInfo'
import ImportRoom from './ImportRoom'
    export default {
        props: {
            createHouseInfo: Object
        },
        components: {
            'redact-info': redactInfo,
            'import-room': ImportRoom
        },
        methods: {
            // 获取房间视图
            handleGetHouseView(params) {
                getHouseView(params).then(res=>{
                     ;
                    if( res.status === 200 ){
                        if( !res.data.statistics && res.data.floorHouseArray[0] ){
                            this.tableData = [];
                            this.cellList = res.data.unitArray;
                            this.cellList.map(item=>{
                                item.maxNum = 1
                            })
                            console.log(this.tableData)
                            console.log(this.cellList)
                            return
                        }
                        if( res.data.floorHouseArray[0] ){
                            this.tableData = [];
                            this.locationFloorList = [];
                            let arr = [];
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
                                arr.push(floorObj);
                                // this.locationFloorList.push({
                                //     floorName: floorItem.floorName,
                                //     floor: index + 1
                                // })
                            })
                            
                            this.cellList = res.data.unitArray;
                            this.cellList.map(item=>{
                                item.maxNum = item.maxNum || 1
                            })
                            this.maxFloorNum = res.data.maxFloorNum;
                            this.buildName = res.data.build.buildName;
                            this.tableData = arr;
                            console.log(this.tableData)
                            // console.log(this.locationFloorList)
                            this.handleGetFloorListByUnitId()
                        }
                        
                    }
                    
                })

            },
            handleGetFloorListByUnitId() {// 获取楼层下拉列表
                let params = new URLSearchParams();
                params.append( "id", this.cellList[0].id );
                getUnitFloor(params).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.locationFloorList = res.data
                    }
                })
            },
            arraySpanMethod({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 0) { return [1, 2] }
                else if (columnIndex === 1) { return [0, 0] }
            },
            createHouse() {
                this.$emit('handleShow','create-house');
            },
            redactHouseInfo() {
                if( this.tableData && this.cellList ){
                    this.isShow = 'redact-info';
                }else{
                    this.$message.error('请先生成房间！')
                }

            },
            handleShow() {
                this.$emit('updataTree');
                let params = new URLSearchParams();
                params.append( "buildId",this.createHouseInfo.val.id );
                this.handleGetHouseView(params);
                this.isShow = '';
            },
            unitView() {
                this.$emit('handleShow','unit-view');
            },
            importRoom() {
                this.isShow = 'import-room'
            },
            addFloor() {
                if( this.tableData ){
                    this.dialogFormVisible = true;
                }else{
                    this.$message.error('请先生成房间！')
                }

            },
            handleAddFloor() {// 新增楼层
                console.log(this.form)
                let params = {
                    floorName: this.form.name,
                    floor: this.form.floor,
                    buildId: this.createHouseInfo.val.id,
                    rule: this.form.rule
                }
                saveFloor(params).then(res=>{
                    if( res.status === 200 ){
                        this.$notify({
                            title: '成功',
                            message: '新增成功',
                            type: 'success'
                        });
                        this.$emit('updataTree');
                        let params = new URLSearchParams();
                        params.append( "buildId",this.createHouseInfo.val.id );
                        this.handleGetHouseView(params);
                    }
                })
                this.dialogFormVisible = false;
            }
        },
        created() {
            console.log('楼栋视图模块接收到的生成房间的数据', this.createHouseInfo);
            let params = new URLSearchParams();
            params.append( "buildId",this.createHouseInfo.val.id );
            console.log(this.createHouseInfo.val.id)
            this.handleGetHouseView(params);
        },
        data() {
            return{
                tableData: null,
                cellList: null,
                isShow: '',
                form: {
                    name: '',
                    floor: '',
                    rule: 'above'
                },
                dialogFormVisible: false,
                locationFloorList: [],
                maxFloorNum: null,
                buildName: ''
            }
        }
    }
</script>

<style scoped>
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
  tr td{
      background: #f1f1f1;
  }
</style>
