<template>
    <div class="page_3">
        <el-card class="box-card margin_bottom20" style="overflow-x:hidden">
            <div slot="header" class="clearfix">
                <span style="float: left" class="title">项目概要</span>
                <div style="float: right">
                    <p class="update_date" style="display: inline-block">更新日期：<span>{{ProgramObjective.updateTime}}</span></p>
                    <!-- <el-button type="text">编辑</el-button> -->
                </div>
            </div>
            <div class="text item">
                <el-form :model="ProgramObjective" class="demo-form-inline">
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-form-item label="项目名称:">{{ProgramObjective.projectName}}</el-form-item>
                            <el-form-item label="项目等级:">{{ProgramObjective.projectGrade}}</el-form-item>
                            <el-form-item label="项目地址:">{{ProgramObjective.cityName}}</el-form-item>
                            
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="归属公司:">{{ProgramObjective.projectCityName}}</el-form-item>
                            <el-form-item label="项目负责人:">{{ProgramObjective.projectMgrName}}</el-form-item>
                            <el-form-item label="启动会日期:">{{ProgramObjective.kickOffDate}}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item   label="管控方式:">
                                <span v-if="this.ProgramObjective.escrowType === 0 "> 投资</span>
                                <span v-else-if="this.ProgramObjective.escrowType === 1">代建</span>
                            </el-form-item>
                            <el-form-item label="营销负责人:">{{ProgramObjective.marketMgrName}}</el-form-item>
                            <el-form-item label="邮政编码:">{{ProgramObjective.postCode}}</el-form-item>
                            
                        </el-col>
                    </el-row>
                    <el-form-item label="所属项目公司:">{{ProgramObjective.projectCompanyNames}}</el-form-item>
                    <el-form-item label="备注:">{{ProgramObjective.remark}}</el-form-item>
                </el-form>
            </div>
            <el-button type="text" @click="viewDetails" style="float: right;margin-bottom:20px;padding:0!important;" v-has="'prj:project:view'">查看详情<i class="el-icon-arrow-right"></i></el-button>
        </el-card>
        <el-card class="box-card space_bottom" >

				<div slot="header" class="clearfix">
	                <span style="float: left" class="title">项目分期</span>
                    <div style="display: inline-block;float: right">
                        <el-button type="success" @click="handleAddProject" v-has="'prj:dev:add'">新增分期</el-button>
                        <el-button type="success" @click="handleAddFrom" v-has="'prj:dev:introduce'">引入分期</el-button>
                    </div>
	            </div>
	            <el-table :data="tableData" border fit :row-class-name="tableRowClassName"
	                style="width: 100%; font-size: 12px; text-align: center;">
	                <el-table-column type="index" label="序号" width="54"  ></el-table-column>
	                <el-table-column prop="devstagesName" label="分期名称" width="80"   show-overflow-tooltip></el-table-column>
	                <el-table-column prop="projectCompanyName" label="项目公司" min-width="210"   show-overflow-tooltip></el-table-column>
	                <el-table-column prop="totalArea" label="总可售面积" min-width="150"  show-overflow-tooltip ></el-table-column>
	                <el-table-column prop="totalHouseHolder" label="总户数" width="90"   show-overflow-tooltip></el-table-column>
	                <el-table-column label="操作" width="250"   >
	                    <template slot-scope="scope">
	                        <el-button type="text" @click.native.stop="handleSeeMore(scope.row)" v-has="'prj:dev:view'">查看</el-button>
	                        <el-button type="text" @click.native.stop="redactFormItem(scope.$index, tableData)" v-has="'prj:dev:modify'">编辑</el-button>
	                        <el-button type="text" @click.native.stop="deleteFormItem(scope.$index, tableData)" v-has="'prj:dev:del'">删除</el-button>
	                    </template>
	                </el-table-column>
	            </el-table>

	            <el-pagination
	            @size-change="handleSizeChange"
	            @current-change="handleCurrentChange"
	            :current-page="currentPage"
	            :page-sizes="[10, 20, 30, 40]"
	            :page-size="pageSize"
	            layout="total, sizes, prev, pager, next, jumper"
	            :total="total">
	            </el-pagination>

        </el-card>
        <project-details v-if="isShow" v-on:handleClose="closeChild" :ProgramObjective="ProgramObjective"></project-details>
        <el-dialog :title="title" :visible.sync="addProject" v-if="addProject" width="900px">
            <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="114px" >
                <el-row :gutter="20">
                    <el-col :span="9">
                        <el-form-item label="所属项目:"  style="width: 100%" >{{form.projectName}}</el-form-item>
                    </el-col>
                    <el-col :span="15">
                        <el-form-item label="项目公司:" prop="projectCompanyName" label-width="114px">
                            <div @click="handleFindProCompany" v-if="form.type !== 2">
                                <dialog-input :val="form.projectCompanyName"></dialog-input>
                            </div>
                            <div v-else>{{form.projectCompanyName}}</div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="9">
                        <el-form-item label="分期名称:" prop="devstagesName" class="formItem" >
                            <el-input :maxlength=40 v-model="form.devstagesName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="15">
                        <el-form-item label="项目公司注册地址:" label-width="114px">{{form.projectCompanyRegAddr}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="9">
                        <el-form-item label="股权占比:(%)">
                            <el-input @change="equityRateChange(val)" :min=0  :max=10000 v-model="form.equityRate" auto-complete="off"  type="number"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="15">
                        <el-form-item label="总可售面积:" label-width="114px">
                            <el-input @change="totalAreaChange(val)" :min=0 :max=1000000000 v-model="form.totalArea" auto-complete="off" type="number"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="9">
                        <el-form-item label="总户数:">
                            <el-input @change="totalHouseHolderChange(val)" :min=0 :max=1000000000 v-model="form.totalHouseHolder" auto-complete="off" type="number"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="备注:" size="medium">
                    <el-input :maxlength=255 type="textarea" v-model="form.remark" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCancel">取 消</el-button>
                <el-button type="success" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog :title="seeMoreObj.devstagesName" :visible.sync="seeMore" class="width870">
            <span slot="title">
                <span>{{seeMoreObj.devstagesName}}</span>
                <div style="float: right; margin-right: 50px">
                    <el-button type="text" @click.native.stop="redactFormItem2" v-has="'prj:dev:modify'">编辑</el-button>
                </div>
            </span>
            <el-form ref="form" :model="seeMoreObj">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="所属项目:">{{seeMoreObj.projectName}}</el-form-item>
                        <el-form-item label="分期名称:">{{seeMoreObj.devstagesName}}</el-form-item>
                        <el-form-item label="股权占比(%):">{{seeMoreObj.equityRate}}</el-form-item>
                        <el-form-item label="总户数:">{{seeMoreObj.totalHouseHolder}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目公司:">{{seeMoreObj.projectCompanyName}}</el-form-item>
                        <el-form-item label="项目公司注册地址:">{{seeMoreObj.projectCompanyRegAddr}}</el-form-item>
                        <el-form-item label="总可售面积:">{{seeMoreObj.totalArea}}</el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="备注:">{{seeMoreObj.remark}}</el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="选择项目公司" ref="singleTable" :visible.sync="findProCompany" width="600px">
            <span>项目公司：</span><el-input placeholder="项目公司" v-model="searchValue" :clearable="true"></el-input> <el-button type="primary" style="float:right;margin-right:20px;" @click="search">搜索</el-button>
            <el-table :data="ProCompanyList" highlight-current-row @current-change="handleCurrentChange1" style="width: 100%;margin-top:20px;" height="360">
            <el-table-column prop="orgUnitCode" label="项目公司编码" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="orgUnitName" label="项目公司名称" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="areaName" label="项目公司注册地址" width="180" show-overflow-tooltip></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="findProCompany = false">取 消</el-button>
                <el-button type="primary" @click="handleChooseProCompany">确 定</el-button>
            </span>
        </el-dialog>
        <add-from-other ref="AddFromRef" @addFromOther="handleAddFromOther"></add-from-other>
    </div>
</template>

<script>
import {getProjectInfo, getDevstList, updateDevst, saveDevst, deleteDevst, getProjectCompanyList, joinSync} from "@/api/pages/mainPage/plan/house"


import projectDetails from './projectDetails'
import DialogInput from '@/components/dialogLongInput'
import addFromOther from './addFromOther'// 引入分期
export default {
    props: {
        val: Object,
        node: Object,
        nodeAll: Object
    },
    components: {
        'project-details': projectDetails,
        'dialog-input': DialogInput,
        addFromOther
    },
    watch: {
        val() {
            let params = new URLSearchParams();
            params.append( "id",this.val.id );
            this.handleGetProjectInfo(params);
        },
        node() {
            let params = new URLSearchParams();
            params.append( "id",this.val.id );
            this.handleGetProjectInfo(params);
        },
        searchValue(){
          if(this.searchValue == '' || this.searchValue == null){
            this.handleFindProCompany();
          }
        }
    },
    methods: {
        //股权占比最大值
        equityRateChange(val){
            if(this.form.equityRate > 100){
                this.form.equityRate = 100
            }else if( this.form.equityRate < 0.01 ){
                this.form.equityRate = 0.01
            }
        },
        search:function(){
          let params = new URLSearchParams();
          params.append( "upperOrgUnitCode", this.ProgramObjective.projectCityCode );
          params.append( "orgUnitName", this.searchValue);
          // params.append( "pid", 'a34fbc3e2d0211e8af88005056b44833' );
          getProjectCompanyList(params).then(res=>{
             
            this.ProCompanyList = res.data;
          })
        },
        //总可售面积最大值
        totalAreaChange(val){
            if(this.form.totalArea > 1000000000){
                this.form.totalArea = 1000000000
            }
        },
        //总户数最大值
        totalHouseHolderChange(val){
            if(this.form.totalHouseHolder > 1000000000){
                this.form.totalHouseHolder = 1000000000
            }
        },
        // 获取项目详情数据
        handleGetProjectInfo(params) {
            getProjectInfo(params).then(res=>{
                 
                this.ProgramObjective = res.data;
                this.form.project = this.ProgramObjective.projectName;
            }).then(()=>{
                this.handleGetDevstList()
            })
        },
        handleGetDevstList() {
            let params2 = new URLSearchParams();
            params2.append( "projectCityId",this.ProgramObjective.projectCityId );
            params2.append( "projectId",this.ProgramObjective.id );
            params2.append( "pageNum", this.pageNum );
            params2.append( "pageSize", this.pageSize );
            getDevstList(params2).then(res=>{
                //  
                if( res.status === 200 ){
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                }else{
                    this.$message.error(res.message)
                }
            })
        },
        // 查看项目详情
        viewDetails() {
            console.log(11222);
            this.isShow = true;
        },
        // 关闭项目详情
        closeChild() {
            this.isShow = false;
        },
        // 打开新增分期弹窗
        handleCancel() {
            this.addProject =  false;
            this.title = '新增分期';
        },
        // 保存分期前处理内容是否符合规则
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.handleSave();
            } else {
                return false;
            }
            });
        },
        // 保存分期
        handleSave() {
            this.addProject =  false;
            this.addFrom = false;
            let newForm = {};
            newForm.id = this.form.id;
            newForm.projectId = this.form.projectId;
            newForm.projectName = this.form.projectName;
            newForm.projectCompanyName = this.form.projectCompanyName;
            newForm.projectCompanyCode = this.form.projectCompanyCode;
            newForm.projectCompanyId = this.form.projectCompanyId;
            newForm.devstagesName = this.form.devstagesName;
            newForm.projectCompanyRegAddr = this.form.projectCompanyRegAddr;
            newForm.equityRate = this.form.equityRate;
            newForm.totalArea = this.form.totalArea;
            newForm.totalHouseHolder = this.form.totalHouseHolder;
            newForm.remark = this.form.remark;
            console.log(2222, newForm, this.index)
            console.log(newForm)
            if( this.isRedact ){// 判断为新增还是修改
                console.log('修改')
                updateDevst(newForm).then(res=>{
                    if( res.status == 200 ){
                        this.handleGetDevstList()
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
                console.log('新增')
                saveDevst(newForm).then(res=>{
                     
                    if( res.status == 200 ){
                        this.handleGetDevstList()
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
            this.form.projectCompanyName = '';
            this.form.devstagesName = '';
            this.form.projectCompanyRegAddr = '';
            this.form.equityRate = '';
            this.form.totalArea = '';
            this.form.totalHouseHolder = '';
            this.form.remark = '';
            this.form.id = '';
            this.form.type = null;
            this.isRedact = false;

            this.title = '新增分期';
        },
        redactFormItem(index, rows) {
            this.addProject =  true;
            this.isRedact = true;
            this.index = index;
            this.title = '编辑分期';
            console.log(rows[index]);
            this.form.projectId = this.ProgramObjective.id,// 项目id
            this.form.projectName = this.ProgramObjective.projectName;// 项目名称
            this.form.projectCompanyName = rows[index].projectCompanyName;// 项目公司名称
            this.form.projectCompanyCode = rows[index].projectCompanyCode;
            this.form.projectCompanyId = rows[index].projectCompanyId;
            this.form.devstagesName =  rows[index].devstagesName;// 分期名称
            this.form.projectCompanyRegAddr =  rows[index].projectCompanyRegAddr;// 项目公司注册地址
            this.form.equityRate =  rows[index].equityRate;// 股权占比
            this.form.totalArea =  rows[index].totalArea;// 总可售面积
            this.form.totalHouseHolder =  rows[index].totalHouseHolder;// 总户数
            this.form.remark =  rows[index].remark;// 备注
            this.form.id =  rows[index].id;// 分期id
            this.form.type =  rows[index].type;// 判断新增还是引入

        },
        redactFormItem2() {
            this.seeMore = false;
            this.addProject = true;
            this.isRedact = true;
            this.title = '编辑分期';
            this.form = this.seeMoreObj;
            this.form.address = this.seeMoreObj.registeredAddress;
            // console.log(1111, this.form);
        },
        deleteFormItem(index, rows) {
            this.$confirm('此操作将不可逆, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                let params = new URLSearchParams();
                params.append( "id", rows[index].id );
                deleteDevst(params).then(res=>{
                    console.log('删除分期', res);
                    if( res.status == 200 ){
                        this.handleGetDevstList()
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
            this.handleGetDevstList()
        },
        handleCurrentChange(val) {
            //  
            this.pageNum = val;
            this.handleGetDevstList()
        },
        handleAddProject() {
            this.addProject = true;
            this.form = {
                projectId: this.ProgramObjective.id,// 项目id
                projectName: this.ProgramObjective.projectName,// 项目名称
                projectCompanyName: '', // 项目公司名称
                devstagesName: '',// 分期名称
                projectCompanyRegAddr: '',// 项目公司注册地址
                equityRate: '',// 股权占比
                totalArea: '',// 总可售面积
                totalHouseHolder: '',// 总户数
                remark: ''// 备注
            }
        },
        handleAddFrom() {
            // 引入分期
            this.$refs.AddFromRef.show(this.ProgramObjective.projectCityCode,this.ProgramObjective.projectCityName)
        },
        handleAddFromOther(obj) {
            obj.projectId = this.ProgramObjective.id;
            joinSync(obj).then(res=>{
                 ;
                if( res.status === 200 ){
                    this.$message({
                        type: 'success',
                        message: '引入成功！'
                    })
                    this.handleGetDevstList();
                    this.$emit('updataTree', this.nodeAll);
                }else{
                    this.$message.error(res.message)
                }
            })
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
        handleFindProCompany() {
            console.log(this.ProgramObjective)
            let params = new URLSearchParams();
            params.append( "upperOrgUnitCode", this.ProgramObjective.projectCityCode );
            // params.append( "pid", 'a34fbc3e2d0211e8af88005056b44833' );
            getProjectCompanyList(params).then(res=>{
                 
                if( res.status === 200 ){
                    this.ProCompanyList = res.data;
                }else{
                    this.$message.error(res.message)
                }
                
            })
            this.findProCompany = true;
        },
        handleCurrentChange1(val) {
            this.currentRow = val;
        },// 选中项目公司
        handleChooseProCompany() {
            this.findProCompany = false;
            this.form.projectCompanyName = this.currentRow.orgUnitName;
            this.form.projectCompanyCode = this.currentRow.orgUnitCode;
            this.form.projectCompanyId = this.currentRow.id;
            this.form.projectCompanyRegAddr = this.currentRow.areaName;
        }
    },
    created() {
        console.log(111, this.val, this.node)
        // this.setNewsApi();

        //获取项目信息列表
        let params = new URLSearchParams();
        params.append( "id",this.val.id );



        this.handleGetProjectInfo(params);
    },
    data() {
        return {
            LastUpdate: '2014-09-29',
            ProgramObjective: {},
            tableData: [],
            isShow: false,
            addProject: false,
            form: {
                id: '',// 分期ID
                projectId: '',// 项目id
                projectName: '',// 项目名称
                projectCompanyName: '', // 项目公司名称
                devstagesName: '',// 分期名称
                projectCompanyRegAddr: '',// 项目公司注册地址
                equityRate: '',// 股权占比
                totalArea: '',// 总可售面积
                totalHouseHolder: '',// 总户数
                remark: ''// 备注
            },
            formLabelWidth: '100px',
            isRedact: false,
            index: -1,
            currentPage: 1,
            rules: {
                devstagesName: [
                    { required: true, message: '请输入分期名称', trigger: 'blur' }
                ],
                projectCompanyName: [
                    { required: true, message: '请输入项目公司名称', trigger: 'blur' }
                ]
            },
            title: '新增分期',
            seeMoreObj: {},
            seeMore: false,
            findProCompany: false,
            ProCompanyList: [],
            currentRow: null, // 选中的项目公司
            pageNum: 1,
            pageSize: 10,
            total: 0,
            searchValue:'',
        };
    }
}
</script>

<style scoped>
.page_3{
    width: 100%;
}
  .text {
    font-size: 14px;
  }

  .item {
    display: inline-block;
    padding: 5px 15px;
    width: 100%;
  }

  .clearfix:before,.clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
    margin-bottom: 20px;
  }
  .formItem{
    width: 74px;
    text-align: right;
  }

</style>
