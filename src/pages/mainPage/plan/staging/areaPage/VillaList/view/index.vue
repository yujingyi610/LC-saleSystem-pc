<template>
    <div>
        <el-card class="box-card space_bottom" v-if="!isShow">
            <div slot="header" class="clearfix">
                <span class="title">{{mainTitle}}</span>
                <div style="float: right">
                    <el-button v-if="isImport" type="success" @click="handleOpenAddBuild" v-has="'prj:build:add'">新增{{mainTitle}}</el-button>
                    <el-button v-else type="success" @click="handleAddBuildingFrom" v-has="'prj:build:add'">引入{{mainTitle}}</el-button>
                    <el-button type="success" @click="FatherChange">楼栋列表</el-button>
                    <el-button type="success" @click="handleImportRoom" v-has="'prj:house:import'">导入房间</el-button>
                </div>
            </div>
            <div v-if="buildList">
                <el-card class="box-card" v-for="(buildItem, index) in buildList" :key="index" style="margin-bottom: 40px">
                    <div slot="header" class="clearfix">
                        <span class="title">{{buildItem.buildName}}</span>
                        <div style="float: right">
                            <el-button type="success" @click="handleOpenAddHouse(buildItem)" v-has="'prj:house:add'">新增房间</el-button>
                            <el-button type="success" @click="handleOpenAddFloor(buildItem)" v-has="'prj:floor:add'">新增楼层</el-button>
                            <el-button type="success" @click="handleRedactHouseInfo(buildItem)" v-has="'prj:house:edit'">编辑房间资料</el-button>
                            <el-button type="success" @click="handleUnitView(buildItem)">单元视图</el-button>
                        </div>
                    </div>
                    <div class="text item">
                        <el-table v-if="buildItem.floorList" :data="buildItem.floorList" style="width: 100%" border>
                            <el-table-column label="楼层名称:" prop="name" fixed width="80"></el-table-column>
                            <el-table-column v-for="(item, index) in buildItem.cellList" :key="index" :label="item.unitName+'单元房间'" :prop="item.unitName" :width="86*item.maxNum + 20">
                                <template slot-scope="scope">
                                    <span v-if="scope.row[item.unitName]" v-for="(item2, index2) in scope.row[item.unitName]" :key="index2" class="cellItem">
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

            </div>
            <div v-else>暂无楼栋！请先导入楼栋！</div>

        </el-card>
        <!-- 新增楼栋 -->
        <el-dialog :title="title" :visible.sync="addBuilding" class="width870">
            <el-form ref="addForm" :model="addForm" label-width="80px" :rules="addRule">
                <el-row :gutter="10">
                    <el-col :span="8">
                        <el-form-item :label="mainTitle + '名称:'"  label-width="100px" prop="buildName" required>
                            <el-input v-model="addForm.buildName"></el-input>
                        </el-form-item>
                        <el-form-item label="交付日期:"  label-width="100px" prop="deliverDate">
                            <el-date-picker type="date" placeholder="选择日期" v-model="addForm.deliverDate" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="毛坯/精装:"  label-width="100px">
                            <el-select v-model="addForm.deliveryStandard">
                                <el-option label="毛坯" value="毛坯"></el-option>
                                <el-option label="精装" value="精装"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="所属区域:">{{addForm.areaName}}
                            <!-- <el-input v-model="addForm.devstagesName"></el-input> -->
                        </el-form-item>
                        <el-form-item label="预售证编号:">
                            <el-input v-model="addForm.preSaleNo"></el-input>
                        </el-form-item>
                        
                    </el-col>
                    <el-col :span="8">
                        <!-- <el-form-item label="交付状态:" label-width="100px">
                            <el-select v-model="addForm.deliverStatusText">
                                <el-option label="未交付" value="未交付"></el-option>
                                <el-option label="已交付" value="已交付"></el-option>
                            </el-select>
                        </el-form-item> -->
                        <el-form-item label="预售证领取日期:" label-width="100px">
                            <el-date-picker type="date" placeholder="选择日期" v-model="addForm.preSaleGetDate" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="房产性质:">
                            <el-select v-model="addForm.houseKindName">
                                <el-option label="商品房" value="商品房"></el-option>
                                <el-option label="经济适用房" value="经济适用房"></el-option>
                                <el-option label="房改房" value="房改房"></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- <el-form-item label="计价方式:" label-width="100px">
                            <el-select v-model="addForm.priceMethodText">
                                <el-option label="建筑面积" value="建筑面积"></el-option>
                                <el-option label="套内面积" value="套内面积"></el-option>
                                <el-option label="按套（个）" value="按套（个）"></el-option>
                            </el-select>
                        </el-form-item> -->
                    </el-col>
                </el-row>
                <el-form-item label="备注:"  label-width="100px">
                    <el-input type="textarea" v-model="addForm.remark" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="预售证扫描证:" label-width="100px">
                    <el-upload
                        ref="upload"
                        action="/zuul/api/storage/files/multipart/file"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        name="files"
                        :data="upLoadData"
                        :file-list="commonResources"
                        :beforeUpload="beforeAvatarUpload"
                        :on-success="handleSuccess"
                        list-type="picture-card">
                        <i class="el-icon-plus"></i>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                    </el-upload>
                </el-form-item>
            </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addBuilding = false">取 消</el-button>
                    <el-button type="success" @click="submitForm('addForm')">保存</el-button>
                </div>
        </el-dialog>
        <!-- 引入楼栋 -->
        <el-dialog :title="'引入' + mainTitle" :visible.sync="addBuildingFrom" class="width870">
            <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%;text-align: center" border @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" :selectable="selectable"></el-table-column>
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="interfaceFloorCode" :label="mainTitle + '编号'" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="name" :label="mainTitle + '名称'" width="200">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.name"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="firstBusinessTypeName" label="一级业态" show-overflow-tooltip></el-table-column>
                <el-table-column prop="secondBusinessTypeName" label="二级业态" show-overflow-tooltip></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelBuilding2">取 消</el-button>
                <el-button type="success" @click="saveBuilding2">引入</el-button>
            </div>
        </el-dialog>
        <!-- 新增楼层 -->
        <el-dialog title="新增楼层" :visible.sync="addFloor">
            <el-form :model="addFloorForm" :inline="true">
                <el-col :span="12" style="padding-left:30px;">
                  <el-form-item label="楼层名称:">
                    <el-input v-model="addFloorForm.name" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="新增规则:">
                    <el-select v-model="addFloorForm.rule">
                      <el-option label="在此楼层之上添加" value="above"></el-option>
                      <el-option label="在此楼层之下添加" value="under"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12" style="padding-left:30px;">
                  <el-form-item label="请选择楼层:">
                    <el-select v-model="addFloorForm.floor">
                        <el-option v-for="(item, index) in locationFloorList" :key="index" :label="item.floorName" :value="item.floor"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
            </el-form>
            <div slot="footer" class="dialog-footer" style="margin-top:55px;">
                <el-button @click="addFloor = false" class="mainBtn_">取 消</el-button>
                <el-button type="primary" @click="handleAddFloor">确 定</el-button>
            </div>
        </el-dialog>
        <component :is="isShow" v-bind:buildInfo="buildInfo" v-on:showClick="handleShow" :val="val" :formatCode="areaInfo.formatCode" @upDataTree="handleUpDataTree"></component>
    </div>
</template>

<script>
import redactHouseInfo from './redactHouseInfo'
import importRoom from './importRoom'
import unitView from './unitView'
import createHouse from './createHouse'
import {getAreaInfo, getVillaView, saveBuild, upload, saveFloor, getSyncBuildList, addFromBuild, getUnitFloor} from "@/api/pages/mainPage/plan/house"
    export default {
        props:{
            val: Object,
            node: Object,
            nodeAll: Object,
            areaInfo: Object,
            isImport: Boolean
        },
        components: {
            'redact-house': redactHouseInfo,
            'import-room': importRoom,
            'unit-view': unitView,
            'create-house': createHouse
        },
        computed: {
            mainTitle() {
                return this.areaInfo.formatName === '车位'?'子分区':'楼栋'
            }
        },
        methods: {
            selectable(row, index){
                if( row.existcount === 0 ){
                    return true
                }else{
                    return false
                }
            },
            handleGetVillaView() {// 获取别墅视图

                let params2 = new URLSearchParams();
                params2.append( "areaId", this.val.id );
                params2.append( "pageNum", 1 );
                params2.append( "pageSize", 20 );
                getVillaView(params2).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.buildList = [];
                        // this.buildingData = res.data;
                        res.data.map(buildItem=>{
                            let obj = {
                                build: buildItem.build,
                                buildName: buildItem.build.buildName,
                                cellList: buildItem.unitArray,
                                floorList: [],
                                locationFloorList: []
                            }
                            if( buildItem.floorHouseArray ){
                                buildItem.floorHouseArray.map((floorItem, index)=>{
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
                                    obj.floorList.push(floorObj);
                                    // obj.locationFloorList.push({
                                    //     floorName: floorItem.floorName,
                                    //     floor: index + 1
                                    // })
                                    if( obj.cellList[0] ){
                                        let params = new URLSearchParams();
                                        params.append( "id", obj.cellList[0].id );
                                        getUnitFloor(params).then(res=>{
                                             ;
                                            if( res.status === 200 ){
                                                obj.locationFloorList = res.data
                                            }
                                        })
                                        obj.cellList.map(item=>{
                                            item.maxNum = item.maxNum || 1
                                        })
                                    }
                                    
                                })
                            }
                            this.buildList.push(obj)
                            
                            // buildItem.floorHouseArray[0].houseDtos.map(houseItem=>{
                            //     if( obj.floorList[0][houseItem.unitName] ){
                            //         obj.floorList[0][houseItem.unitName].push(houseItem);
                            //     }else{
                            //         obj.floorList[0][houseItem.unitName] = [];
                            //         obj.floorList[0][houseItem.unitName].push(houseItem);
                            //     }
                            // })
                            
                        })
                        console.log(this.buildList)
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
            FatherChange() {// 切换视图
                this.$emit('changeChild','build-list')
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.saveBuilding()
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            handleOpenAddBuild() {
                this.addForm.buildName = '';
                this.addForm.areaName = this.areaInfo.areaName;
                this.addForm.deliverStatusText = '';
                this.addForm.preSaleGetDate = '';
                this.addForm.preSaleNo = '';
                this.addForm.deliverDate = '';
                this.commonResources = [];
                this.addForm.deliveryStandard = '';
                this.addForm.houseKindName = '';
                this.addForm.priceMethodText = '';
                this.addForm.remark = '';
                this.addBuilding = true;
            },
            saveBuilding() {// 保存楼栋
                // this.$refs.upload.submit()
                this.addBuilding = false;
                let newBuilding = {
                    id: this.addForm.id,
                    areaId: this.val.id,
                    projectId: this.areaInfo.projectId,
                    buildName: this.addForm.buildName,
                    areaName: this.addForm.areaName,
                    deliverStatusText: this.addForm.deliverStatusText,
                    preSaleGetDate: this.addForm.preSaleGetDate,
                    preSaleNo: this.addForm.preSaleNo,
                    deliverDate: this.addForm.deliverDate,
                    // fileList: [],
                    deliveryStandard: this.addForm.deliveryStandard,
                    houseKindName: this.addForm.houseKindName,
                    priceMethodText: this.addForm.priceMethodText,
                    remark: this.addForm.remark,
                    commonResources: this.commonResources,// 图片地址
                }
                console.log(newBuilding)
                saveBuild(newBuilding).then(res=>{
                     
                    if( res.status === 200 ){
                        this.$emit('updataTree');
                        this.handleGetVillaView();
                        // this.$emit('updataTree', this.nodeAll);
                        this.$notify({
                            title: '成功',
                            message: '保存成功',
                            type: 'success'
                        });
                    }
                })
                this.addForm.buildName = '';
                this.addForm.areaName = this.areaInfo.areaName;
                this.addForm.deliverStatusText = '';
                this.addForm.preSaleGetDate = '';
                this.addForm.preSaleNo = '';
                this.addForm.deliverDate = '';
                this.commonResources = [];
                this.addForm.deliveryStandard = '';
                this.addForm.houseKindName = '';
                this.addForm.priceMethodText = '';
                this.addForm.remark = '';
            },
            beforeAvatarUpload (file) {
                console.log(file)
                // let files = [];
                // files.push(file)
                // let fd = new FormData()
                // fd.append('bussinessType', 'aaa')
                // console.log(files)
                // upload(fd).then(res => {
                //      
                // })
                // return true
            },
            handleSuccess(response, file, fileList) {
                console.log(response);
                console.log(fileList);
                response.data.map(item=>{
                    this.commonResources.push({
                        fileUrl: item.fileUrl,
						url: item.fileUrl
                    })
                })
                 
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
                this.commonResources = fileList;
                this.commonResources.map(item=>{
                    item.url = item.fileUrl
                })
            },
            handlePreview(file) {
                console.log(file);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除该扫描证？`);
            },
            handleAddBuildingFrom() {
                getSyncBuildList({ devstId: this.areaInfo.devstagesId }).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.tableData3 = res.data;
                        this.tableData3.map(item=>{
                            item.name = item.floorCode;
                        })
                    }else{
                        this.$message.error('查询失败！')
                    }
                })
                this.addBuildingFrom = true;
            },
            saveBuilding2() {
                let builds = this.multipleSelection.map(item=>{
                    return {
                        id: item.id,
                        name: item.name
                    }
                })
                addFromBuild({
                    builds,
                    areaId: this.areaInfo.id,
                    devstId: this.areaInfo.devstagesId
                }).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.$message({
                            type: 'success',
                            message: ' 引入成功！'
                        })
                        this.$emit('updataTree');
                        this.handleGetVillaView();
                        this.addBuildingFrom = false;
                    }else{
                        this.$message.error(res.message)
                    }
                })
                
            },
            cancelBuilding2() {
                this.addBuildingFrom = false;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleRedactHouseInfo(buildInfo) {// 编辑房间资料
                if( buildInfo.locationFloorList[0] && buildInfo.floorList[0] && buildInfo.cellList){
                    this.buildInfo = buildInfo;
                    this.isShow = 'redact-house'
                }else{
                    this.$message.error('请先生成或导入房间！')
                }
                
            },
            handleUnitView(buildInfo) {// 单元视图
                this.buildInfo = buildInfo;
                this.isShow = 'unit-view'
            },
            handleShow() {// 关闭编辑房间资料
                this.isShow = '';
                this.$emit('updataTree');
                this.handleGetVillaView();
            },
            handleImportRoom() {// 导入房间
                this.isShow = 'import-room'
            },
            handleUpDataTree() {// 更新左侧树
                this.$emit('updataTree');
            },
            handleOpenAddFloor(buildInfo) {// 打开新增楼层弹框
                this.locationFloorList = buildInfo.locationFloorList;
                this.addFloor = true;
                console.log(buildInfo)
                this.addFloorForm.buildId = buildInfo.build.itemRefId;
            },
            handleAddFloor() {// 新增楼层
                console.log(this.addFloorForm)
                let params = {
                    floorName: this.addFloorForm.name,
                    floor: this.addFloorForm.floor,
                    buildId: this.addFloorForm.buildId,
                    rule: this.addFloorForm.rule
                }
                console.log(params)
                saveFloor(params).then(res=>{
                    if( res.status === 200 ){
                        this.$notify({
                            title: '成功',
                            message: '新增成功',
                            type: 'success'
                        });
                        this.$emit('updataTree');
                        this.handleGetVillaView();
                    }
                })
                this.addFloor = false;
            },
            handleOpenAddHouse(buildInfo) {// 新增房间
                if( buildInfo.floorList[0] && buildInfo.cellList){
                    this.isShow = 'create-house';
                    this.buildInfo = buildInfo;
                }else{
                    this.$message.error('请先新增单元和楼层！')
                }
                
            }
        },
        created() {
            console.log(this.areaInfo)
            this.handleGetVillaView();
        },
        data() {
            return {
                buildList: null,// 楼栋视图数据
                addBuilding: false,// 新增楼栋弹框
                addBuildingFrom: false,// 引入楼栋弹框
                title: '新增',
                addForm: {
                    buildName: '',
                    areaName: '',
                    deliverStatusText: '',
                    preSaleGetDate: '',
                    preSaleNo: '',
                    deliverDate: '',
                    fileList: [],
                    deliveryStandard: '',
                    houseKindName: '',
                    priceMethodText: '',
                    remark: ''
                },
                addRule: {
                    buildName: [
                        { required: true, message: '请输入楼栋名称', trigger: 'blur' }
                    ],
                    deliverDate: [
                        { required: true, message: '请输入交付日期', trigger: 'blur' }
                    ]
                },
                upLoadData: {// 上传文件附加参数
                    bussinessType: 'project'
                },
                commonResources: [],// 上传楼栋图片
                tableData3: [],
                isShow: '',// 子组件名称
                buildInfo: {},// 要传递给子组件的所点击的楼栋信息
                addFloor: false,// 新增楼层弹框
                addFloorForm: {
                    name: '',
                    floor: '',
                    rule: 'above'
                },
                locationFloorList: []// 新增楼层所需的当前楼栋的楼层名称列表
            }
        }
    }
</script>

<style scoped>

</style>
