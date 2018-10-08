<template>
    <div>
        <el-card class="box-card space_bottom" v-if="!isShow">
            <div slot="header" class="clearfix">
                <span class="title">{{mainTitle}}</span>
                <div style="float: right">
                    <el-button v-if="isImport" type="success" @click="handleOpenAddBuild" v-has="'prj:build:add'">新增{{mainTitle}}</el-button>
                    <el-button v-else type="success" @click="handleAddBuildingFrom" v-has="'prj:build:add'">引入{{mainTitle}}</el-button>
                    <el-button type="success" @click="importRoom"  v-has="'prj:house:import'" v-show="areaInfo.formatCode !== 'PROJECT_FORMATE_6' && areaInfo.formaCode !== 'PROJECT_FORMATE_7'">导入房间</el-button>
                </div>
            </div>
            <el-table :data="buildingData" border style="text-align: center; font-size: 12px" :row-class-name="tableRowClassName">
                <el-table-column type="index" label="序号"  ></el-table-column>
                <el-table-column property="buildName" :label="mainTitle + '名称'"   show-overflow-tooltip></el-table-column>
                <el-table-column property="areaName" label="所属区域"   show-overflow-tooltip></el-table-column>
                <!-- <el-table-column property="deliverStatusText" label="交付状态"  >
                    <template slot-scope="scope">
                        <span :style="{color:scope.row.deliverStatusText=='已交付'?'#404040':'#999'}">{{scope.row.deliverStatusText}}</span>
                    </template>
                </el-table-column> -->
                <el-table-column property="preSaleNo" label="预售证编号"   show-overflow-tooltip></el-table-column>
                <el-table-column property="houseKindName" label="房产性质"   show-overflow-tooltip></el-table-column>
                <el-table-column property="handle" label="操作"  width="200"  >
                    <template slot-scope="scope">
                        <el-button @click.native.stop="handleSeeMore(scope.row)" type="text" size="small" v-has="'prj:build:view'">查看</el-button>
                        <el-button @click.native.stop="handleClick(scope.$index)" type="text" size="small" v-has="'prj:build:edit'">编辑</el-button>
                        <el-button type="text" size="small" @click.native.stop="handleDel(scope.$index)" v-has="'prj:build:del'">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </el-card>
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
        <el-dialog :title="'引入' + mainTitle" :visible.sync="addBuildingFrom" class="width870">
            <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%;text-align: center" border @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" :selectable="selectable"  ></el-table-column>
                <el-table-column type="index" label="序号" width="50"  ></el-table-column>
                <el-table-column prop="interfaceFloorCode" :label="mainTitle + '编号'" width="200" show-overflow-tooltip  ></el-table-column>
                <el-table-column prop="name" :label="mainTitle + '名称'" width="200"  >
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.name"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="firstBusinessTypeName" label="一级业态" show-overflow-tooltip  ></el-table-column>
                <el-table-column prop="secondBusinessTypeName" label="二级业态" show-overflow-tooltip  ></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelBuilding2">取 消</el-button>
                <el-button type="success" @click="saveBuilding2">引入</el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="seeMore" class="width870">
            <span slot="title">
                <span>{{seeMoreObj.buildName}}</span>
                <div style="float: right; margin-right: 50px">
                    <el-button type="text" @click.native.stop="redactFormItem2" v-has="'prj:build:edit'">编辑</el-button>
                </div>
            </span>
            <el-form ref="form" :model="seeMoreObj">
                <el-row :gutter="10">
                    <el-col :span="8">
                        <el-form-item :label="mainTitle + '名称:'">{{seeMoreObj.buildName}}</el-form-item>
                        <el-form-item label="交付日期:">{{seeMoreObj.deliverDate}}</el-form-item>
                        <el-form-item label="毛坯/精装:">{{seeMoreObj.deliveryStandard}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="所属区域:">{{seeMoreObj.areaName}}</el-form-item>
                        <el-form-item label="预售证编号:">{{seeMoreObj.preSaleNo}}</el-form-item>
                        
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="房产性质:">{{seeMoreObj.houseKindName}}</el-form-item>
                        <!-- <el-form-item label="交付状态:">{{seeMoreObj.deliverStatusText}}</el-form-item> -->
                        <el-form-item label="预售证领取日期:">{{seeMoreObj.preSaleGetDate}}</el-form-item>
                        <!-- <el-form-item label="计价方式:">{{seeMoreObj.priceMethodText}}</el-form-item> -->
                    </el-col>
                </el-row>
                <el-form-item label="备注:">{{seeMoreObj.remark}}</el-form-item>
                <el-form-item label="预售证扫描证">
                    <img style="width: 80px; height: 80px; margin-right: 15px" v-for="(item, index) in seeMoreObj.commonResources" :key="index" :src="item.fileUrl">
                    <!-- <img v-for="(item, index) in seeMoreObj.fileList" :key="index" :src="item.filename"/> -->
                </el-form-item>
            </el-form>
        </el-dialog>
        <component :is="isShow" :areaInfo="areaInfo" @closeChild="handleClose"></component>
    </div>
</template>

<script>
import {getAreaInfo, getBuildList, saveBuild, updateBuild, deleteBuild, upload, getSyncBuildList, addFromBuild} from "@/api/pages/mainPage/plan/house"
import {getDevstInfo} from "@/api/pages/mainPage/plan/house"// 获取所在分期的类型是引入的还是自己生成的
import ImportRoom from '../ImportRoom'
    export default {
        props:{
            val: Object,
            node: Object,
            nodeAll: Object,
            areaInfo: Object
        },
        components: {
            ImportRoom
        },
        methods: {
            selectable(row, index){
                if( row.existcount === 0 ){
                    return true
                }else{
                    return false
                }
            },
            handleGetBuildList() {// 获取楼栋列表
                let params = new URLSearchParams();
                params.append( "areaId", this.val.id );
                params.append( "pageNum", this.pageNum );
                params.append( "pageSize", this.pageSize );
                getBuildList(params).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.buildingData = res.data.list;
                        this.total = res.data.total;
                    }else{
                        this.$message.error('查询失败！')
                    }
                })
                // this.$emit('upDataTree')
            },
            handleGetDevsInfo() {// 获取所在分期的类型是引入的还是自己生成的
                let params = new URLSearchParams();
                params.append( "id",this.areaInfo.devstagesId );
                getDevstInfo(params).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.isImport = res.data.type===1?true:false;
                        console.log(this.isImport)
                    }
                })
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
                // if( !this.addForm.buildName ){
                //     this.$message.error('请输入楼栋名称！');
                //     return
                // }
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
                if( this.isAdd ){
                    saveBuild(newBuilding).then(res=>{
                         
                        if( res.status === 200 ){
                            this.handleGetBuildList()
                            this.$emit('upDataTree', this.nodeAll);
                            this.$notify({
                                title: '成功',
                                message: '保存成功',
                                type: 'success'
                            });
                        }else{
                            this.$message.error(res.message)
                        }
                    })
                    // this.buildingData.push(newBuilding);
                }else{
                    console.log(this.seeMoreObj)
                    updateBuild(newBuilding).then(res=>{
                         
                        if( res.status === 200 ){
                            this.handleGetBuildList()
                            this.$emit('upDataTree', this.nodeAll);
                            this.$notify({
                                title: '成功',
                                message: '保存成功',
                                type: 'success'
                            });
                        }else{
                            this.$message.error(res.message)
                        }
                        
                    })
                }
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
                this.isAdd = true;
            },
            handleClick(index) {
                let row = this.buildingData[index];
                this.isAdd = false;
                this.index = index;
                this.addBuilding = true;
                this.title = '编辑楼栋';
                this.addForm.id = row.id;
                this.addForm.buildName = row.buildName;
                this.addForm.areaName = row.areaName;
                this.addForm.deliverStatusText = row.deliverStatusText;
                this.addForm.preSaleGetDate = new Date(row.preSaleGetDate);
                this.addForm.preSaleNo = row.preSaleNo;
                this.addForm.deliverDate = row.deliverDate;
                this.commonResources = row.commonResources;
                this.commonResources.map(item=>{
                    item.url = item.fileUrl
                })
                this.addForm.deliveryStandard = row.deliveryStandard;
                this.addForm.houseKindName = row.houseKindName;
                this.addForm.priceMethodText = row.priceMethodText;
                this.addForm.remark = row.remark;
            },
            handleDel(index) {
                this.$confirm('此操作将不可逆, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = new URLSearchParams();
                    params.append( "id", this.buildingData[index].id );
                    deleteBuild(params).then(res=>{
                        console.log('删除楼栋', res);
                        if( res.status == 200 ){
                            this.handleGetBuildList();
                            this.$emit('upDataTree', this.nodeAll);
                            this.$notify({
                                title: '成功',
                                message: '删除成功',
                                type: 'success'
                            });
                        }else{
                            this.$message.error(res.message)
                        }
                    })
                }).catch(() => {
                    /*this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });*/
                });

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
            beforeAvatarUpload (file) {
                console.log(file)
            },
            handleSizeChange(val) {
                 
                this.pageSize = val;
                this.handleGetBuildList()
            },
            handleCurrentChange(val) {
                 
                this.pageNum = val;
                this.handleGetBuildList()
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
                        this.$message.error(res.message)
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
                        this.handleGetBuildList();
                        this.$emit('upDataTree', this.nodeAll);
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
            handleSeeMore(val) {
                 
                this.seeMoreObj = val;
                this.seeMore = true;
                this.index = val.index;
            },
            redactFormItem2() {
                this.seeMore = false;
                this.addBuilding = true;
                this.isAdd = false;
                this.title = '编辑楼栋';
                this.addForm = this.seeMoreObj;
                console.log(1111, this.addForm);
            },
            tableRowClassName(val) {
                //把每一行的索引放进row
                val.row.index = val.rowIndex;
            },
            importRoom() {
                this.isShow = 'import-room'
            },
            handleClose() {
                this.isShow = '';
                this.handleGetBuildList()
                this.$emit('upDataTree', this.nodeAll);
            }
        },
        created() {
            this.handleGetBuildList();
            this.handleGetDevsInfo();
            console.log(this.areaInfo);
            this.addForm.areaName = this.areaInfo.areaName;
        },
        watch: {
            node: function() {
                this.handleGetBuildList();
            },
            val: function() {
                this.handleGetBuildList();
            }
        },
        computed: {
            mainTitle() {
                return this.areaInfo.formatCode === 'PROJECT_FORMATE_6'?'子分区':'楼栋'
            }
        },
        data(){
            return{
                pageNum: 1,
                pageSize: 10,
                total: 0,
                commonResources: [],// 上传楼栋图片
                upLoadData: {
                    bussinessType: 'project'
                },
                buildingData: [],
                addBuilding: false,
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
                isAdd: true,
                index: -1,
                currentPage: 1,
                rules: {
                    name: [
                        { required: true, message: '请输入组团名称', trigger: 'blur' }
                    ],
                    format: [
                        { required: true, message: '请输入业态', trigger: 'blur' }
                    ]
                },
                addRule: {
                    buildName: [
                        { required: true, message: '请输入楼栋名称', trigger: 'blur' }
                    ],
                    deliverDate: [
                        { required: true, message: '请输入交付日期', trigger: 'blur' }
                    ]
                },
                addBuildingFrom: false,
                tableData3: [],
                multipleSelection: [],
                seeMoreObj: {},
                seeMore: false,
                title: '新增',
                isImport: false,// 判断是引入的分期还是自己生成的分期,true是引入的，false是自己生成的
                isShow: ''
            }
        }
    }
</script>

<style scoped>

</style>
