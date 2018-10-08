<template>
    <div class="projectPage">
        <el-card class="box-card margin_bottom20" v-if="!onlyRead">
            <div slot="header" class="clearfix">
                <span style="float: left" class="title">分期信息</span>
            </div>
            <div class="text item">
                <el-form :model="form2" class="line_height26" :rules="rules" ref="form2">
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="所属项目:" label-width="80px" prop="project">
                                <el-input v-model="form2.project"></el-input>
                            </el-form-item>
                            <el-form-item label="项目公司:" label-width="80px" prop="projectCompany" >
                                <el-input v-model="form2.projectCompany"></el-input>
                            </el-form-item>
                            <el-form-item label="总可售面积:" label-width="80px">
                                <el-input v-model="form2.area"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="项目分期编号:" label-width="150px" prop="code">
                                <el-input v-model="form2.code"></el-input>
                            </el-form-item>
                            <el-form-item label="项目公司注册地址:" label-width="150px" prop="adress">
                                <el-input v-model="form2.adress"></el-input>
                            </el-form-item>
                            <el-form-item label="总户数:" label-width="150px">
                                <el-input v-model="form2.totalHouseholds"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="项目分期名称:" label-width="100px" prop="name">
                                <el-input v-model="form2.name"></el-input>
                            </el-form-item>
                            <el-form-item label="股权占比:" label-width="100px">
                                <el-input v-model="form2.equityRatio" prefix-icon="el-icon-search"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="备注:" label-width="80px">
                        <el-input type="textarea" v-model="form2.remarks" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div style="text-align: center">
                <el-button @click="HandleCancel" class="mainBtn_">取消</el-button>
                <el-button type="success" @click="submitForm('form2')">保存</el-button>
            </div>
        </el-card>
        <el-card v-else class="box-card margin_bottom20" >
            <div slot="header" class="clearfix">
                <span style="float: left" class="title">分期信息</span>
                <div style="float: right">
                    <p class="update_date" style="display: inline-block">更新日期：<span>{{form.updateTime}}</span></p>
                    <!-- <el-button type="text" @click="handleRedact">编辑</el-button> -->
                </div>
            </div>
            <div class="text item">
                <el-form ref="form" :model="form" style="font-size:12px">
                    <el-row :gutter="10">
                        <el-col :span="8">
                            <el-form-item label="所属项目:">{{form.projectName}}</el-form-item>
                            <el-form-item label="项目公司:">{{form.projectCompanyName}}</el-form-item>
                            <el-form-item label="总可售面积:">{{form.totalArea}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="现变更募分期编号:">{{form.devstagesCode}}</el-form-item>
                            <el-form-item label="项目公司注册地址:">{{form.projectCompanyRegAddr}}</el-form-item>
                            <el-form-item label="总户数:">{{form.totalHouseHolder}}</el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="项目分期名称:">{{form.devstagesName}}</el-form-item>
                            <el-form-item label="股权占比:">{{form.equityRate?form.equityRate+'%':''}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="备注:">{{form.remark}}</el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-card class="box-card space_bottom" v-if="!houTypeshow">
            <div slot="header" class="clearfix">
                <span class="title">区域/组团</span>
                <div style="float: right">
                    <el-button type="success" @click="handleAddArea" v-has="'prj:group:add'">新增区域</el-button>
                </div>

            </div>
            <el-table :data="areaData" border style="text-align: center; font-size: 12px">
                <el-table-column type="index" label="序号" width="80"  ></el-table-column>
                <el-table-column property="areaName" label="区域/组团名称" width="200"  show-overflow-tooltip ></el-table-column>
                <el-table-column property="devstagesName" label="所属分期"   show-overflow-tooltip></el-table-column>
                <el-table-column property="propertyFee" label="物业费标准"  show-overflow-tooltip ></el-table-column>
                <el-table-column property="formatName" label="业态"   show-overflow-tooltip></el-table-column>
                <el-table-column property="remark" label="备注"  show-overflow-tooltip ></el-table-column>
                <el-table-column property="handle" label="操作" width="300"  >
                    <template slot-scope="scope">
                        <el-button @click.native.stop="handleSeeMore(scope.row)" type="text" size="small" v-has="'prj:group:view'">查看</el-button>
                        <el-button @click.native.stop="handleClick(scope.$index, scope.row)" type="text" size="small" v-has="'prj:group:modify'">编辑</el-button>
                        <el-button v-if="scope.row.formaCode !== 'PROJECT_FORMATE_6' && scope.row.formaCode !== 'PROJECT_FORMATE_7'" type="text" @click.native.stop="houseType(scope.$index, scope.row)">户型</el-button>
                        <el-button type="text" size="small" @click.native.stop="handleDel(scope.$index)" v-has="'prj:group:del'">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>


        </el-card>
        			<!--户型组件-->
       	<houseType v-on:child="listenToMyBoy" v-if="houTypeshow" :val="val" :node="node" :nodeAll="nodeAll" :areaInfo="areaInfo"></houseType>


           <!-- 添加区域弹框 -->
        <el-dialog :title="title" :visible.sync="addArea" v-if="addArea">
            <el-form ref="addForm" :model="addForm" :rules="addRule" label-width="120px">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="区域/组团名称:" prop="areaName">
                            <el-input :maxlength=50 v-model="addForm.areaName"></el-input>
                        </el-form-item>
                        <el-form-item label="业态:" prop="formatName">
                            <el-select v-model="addForm.formatName" :disabled="isReadOnly">
                                <el-option v-for="(item, index) in formatList" :key="index" :label="item.formatName" :value="item.formatName"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属分期:">{{addForm.devstagesName}}
                        </el-form-item>
                        <el-form-item label="物业费标准:">
                            <el-input v-model="addForm.propertyFee"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="备注:">
                    <el-input style="width:560px;" type="textarea" :maxlength=255 v-model="addForm.remark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="margin-top:55px;">
                <el-button @click="addArea = false">取 消</el-button>
                <el-button type="primary" @click="submitForm1('addForm')">保存</el-button>
            </div>
        </el-dialog>
        <!-- 查看区域弹框 -->
        <el-dialog :visible.sync="seeMore" class="width870">
            <span slot="title">
                <span>{{seeMoreObj.areaName}}</span>
                <div style="float: right; margin-right: 50px">
                    <el-button type="text" @click.native.stop="redactFormItem2" v-has="'prj:group:modify'">编辑</el-button>
                </div>
            </span>
            <el-form ref="form" :model="seeMoreObj">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="区域/组团名称:">{{seeMoreObj.areaName}}</el-form-item>
                        <el-form-item label="业态:">{{seeMoreObj.formatName}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item style="width: 140px" label="所属分期:">{{seeMoreObj.devstagesName}}</el-form-item>
                        <el-form-item label="物业费标准:">{{seeMoreObj.propertyFee}}</el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="备注:">{{seeMoreObj.remark}}</el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import houseType from './houseType'
import {getDevstInfo, getAreaList, saveArea, updateArea, deleteArea, getFormat} from "@/api/pages/mainPage/plan/house"
    export default {
        props: {
            val: Object,
            node: Object,
            nodeAll: Object
        },
        components: {
	        'houseType':houseType
	    },
        methods: {
            
        	listenToMyBoy(){
	    		this.houTypeshow=false;
	    	},
	    	houseType(index, row){
                 
                this.areaInfo.info = row;
                this.areaInfo.form = this.form;
	    		this.houTypeshow=!this.houTypeshow;

	    	},
            handleGetDevstInfo(params) {
                getDevstInfo(params).then(res=>{
                     
                    this.form = res.data;
                    this.addForm.devstagesName = this.form.devstagesName;
                }).then(()=>{
                    // let params2 = new URLSearchParams();
                    // params2.append( "devstagesId", this.form.id );
                    // params2.append( "pageNum", 1 );
                    // params2.append( "pageSize", 20 );
                    // getAreaList(params2).then(res=>{
                    //      ;
                    //     this.areaData = res.data.list;
                    // })
                    this.handleGetList();
                    let params3 = new URLSearchParams();
                    params3.append( "id", this.form.projectId );
                    getFormat(params3).then(res=>{
                         
                        this.formatList = res.data
                    })
                })
            },
            handleGetList() {// 获取列表数据
                let params = new URLSearchParams();
                params.append( "devstagesId", this.form.id );
                params.append( "pageNum", this.currentPage );
                params.append( "pageSize", this.pageSize );
                getAreaList(params).then(res=>{
                     
                    if( res.status === 200 ){
                        this.areaData = res.data.list;
                        this.total = res.data.total;
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            handleRedact() {
                this.onlyRead = false;
                this.form2.project = this.form.project;
                this.form2.code = this.form.code;
                this.form2.name = this.form.name;
                this.form2.projectCompany = this.form.projectCompany;
                this.form2.adress = this.form.adress;
                this.form2.equityRatio = this.form.equityRatio;
                this.form2.area = this.form.area;
                this.form2.totalHouseholds = this.form.totalHouseholds;
                this.form2.remarks = this.form.remarks;
            },
            handleReady() {
                this.onlyRead = true;
                this.form.project = this.form2.project;
                this.form.code = this.form2.code;
                this.form.name = this.form2.name;
                this.form.projectCompany = this.form2.projectCompany;
                this.form.adress = this.form2.adress;
                this.form.equityRatio = this.form2.equityRatio;
                this.form.area = this.form2.area;
                this.form.totalHouseholds = this.form2.totalHouseholds;
                this.form.remarks = this.form2.remarks;
            },
            HandleCancel() {
                this.onlyRead = true;
            },
            saveArea() {
                this.addArea = false;
                console.log(this.formatList)
                this.formatList.map(item=>{
                    if( item.formatName === this.addForm.formatName ){
                         
                        this.addForm.formatCode = item.formatCode;
                        this.addForm.formatId = item.id;
                    }
                })
                let newArea = {
                    devstagesId: this.val.id,
                    projectId: this.form.projectId,
                    // id: this.addForm.id,
                    areaName: this.addForm.areaName,
                    devstagesName: this.addForm.devstagesName,
                    propertyFee: this.addForm.propertyFee,
                    formatName: this.addForm.formatName,
                    formatCode: this.addForm.formatCode,
                    formatId: this.addForm.formatId,
                    remark: this.addForm.remark
                }
                console.log(newArea);
                if( this.isAdd ){
                    saveArea(newArea).then(res=>{
                         
                        if( res.status === 200 ){
                            this.handleGetList();
                            this.$emit('updataTree', this.nodeAll);
                            this.$notify({
                                title: '成功',
                                message: '保存成功',
                                type: 'success'
                            });
                        }else{
                            this.$message.error(res.message)
                        }
                    })
                }else{
                    newArea.id = this.addForm.id;
                    console.log(newArea)
                    updateArea(newArea).then(res=>{
                         ;
                        if( res.status === 200 ){
                            this.handleGetList();
                            this.$emit('updataTree', this.nodeAll);
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
                this.addForm.areaName = '';
                // this.addForm.devstagesName = '';
                this.addForm.propertyFee = '';
                this.addForm.formatName = '';
                this.addForm.formatId = '';
                this.addForm.formatCode = '';
                this.addForm.remark = '';
                this.isAdd = true;

            },
            handleClick(index, row) {
                console.log(index, row);
                this.isReadOnly = row.isHasChildrenNode == 'Y'?true:false;//判断区域下是否有子节点，有则无法编辑
                this.isAdd = false;
                this.index = index;
                this.addArea = true;
                this.addForm.id = row.id;
                this.addForm.areaName = row.areaName;
                this.addForm.devstagesName = row.devstagesName;
                this.addForm.propertyFee = row.propertyFee;
                this.addForm.formatName = row.formatName;
                this.addForm.formatCode = row.formatCode;
                this.addForm.formatId = row.formatId;
                this.addForm.remark = row.remark;
            },
            handleDel(index) {
                this.$confirm('此操作将不可逆, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    let params = new URLSearchParams();
                    params.append( "id", this.areaData[index].id );
                    deleteArea(params).then(res=>{
                        console.log('删除分期', res);
                        if( res.status == 200 ){
                            this.handleGetList();
                            this.$emit('updataTree', this.nodeAll);
                            this.$notify({
                                title: '成功',
                                message: '删除成功',
                                type: 'success'
                            });
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
            },

            handleSizeChange(val) {
                //  
                this.pageSize = val;
                this.handleGetList();

            },
            handleCurrentChange(val) {
                //  
                this.currentPage = val;
                this.handleGetList();
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.handleReady();
                } else {
                    return false;
                }
                });
            },
            submitForm1(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.saveArea();
                } else {
                    return false;
                }
                });
            },
            redactFormItem2() {
                this.seeMore = false;
                this.addArea = true;
                this.addForm = this.seeMoreObj;
                this.isAdd = false;
                this.title = this.seeMoreObj.areaName;
                console.log(1111, this.addForm);
            },
            handleSeeMore(val, ...rest) {
                console.log(val, rest)
                this.seeMoreObj = val;
                this.seeMore = true;
                this.index = val.index;
            },
            tableRowClassName(val) {
                //把每一行的索引放进row

                val.row.index = val.rowIndex;
            },
            handleAddArea() {
                this.isReadOnly = false;
                this.addArea = true;
                this.title = '新增区域/组团';
                this.addForm = {
                    id: '',
                    areaName: '',
                    devstagesName: this.form.devstagesName,
                    formatName: '',
                    formatCode: '',
                    formatId: '',
                    propertyFee: '',
                    remark: ''
                }
            }
        },
        created() {
            console.log(this.val.id)
            let params = new URLSearchParams();
            params.append( "id",this.val.id );
            this.handleGetDevstInfo(params);
            // this.setNewsApi();
        },
        watch: {
            val: function() {
                // this.form.name = this.val.label;
                let params = new URLSearchParams();
                params.append( "id",this.val.id );
                this.handleGetDevstInfo(params);
            }
        },
        data(){
            return{
            	houTypeshow:false,
                LastUpdate: '2014-09-29',
                form: {},
                form2: {
                    project: '',
                    code: '',
                    name: '',
                    projectCompany: '',
                    adress: '',
                    equityRatio: '',
                    area: '',
                    totalHouseholds: '',
                    remarks: ''
                },
                onlyRead: true,
                areaData: [],
                addArea: false,
                addForm: {
                    id: '',
                    areaName: '',
                    devstagesName: '',
                    formatName: '',
                    propertyFee: '',
                    remark: ''
                },
                isAdd: true,
                index: -1,
                pageSize: 10,// 每页数量
                currentPage: 1,// 当前页
                total: 0,// 总数
                rules: {
                    project: [
                        { required: true, message: '请输入所属项目名称', trigger: 'blur' }
                    ],
                    projectCompany: [
                        { required: true, message: '请输入项目公司名称', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入分期编号', trigger: 'blur' }
                    ],
                    adress: [
                        { required: true, message: '请输入项目公司注册地址', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入分期名称', trigger: 'blur' }
                    ]
                },
                addRule: {
                    areaName: [
                        { required: true, message: '请输入区域名称', trigger: 'blur' }
                    ],
                    formatName: [
                        { required: true, message: '请选择业态', trigger: 'blur' }
                    ]
                },
                seeMoreObj: {},
                seeMore: false,
                title: '区域/组团',
                formatList: [],
                areaInfo:{},// 查看户型所需的该区域的信息
                isReadOnly:false,//判断是否可编辑
            }
        }
    }
</script>

<style scoped>

</style>
