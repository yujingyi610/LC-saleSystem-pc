<template>
    <div>
        <el-dialog title="引入分期" :visible.sync="addFrom" v-if="addFrom" class="paddingTop20" width="80%">
            <el-form ref="addFromForm" :model="addFromForm">
                <el-form-item>
                    <el-row :gutter="24">
                    <el-col :span="8">
                        <el-form-item label="城市公司:" style="margin-bottom: 0px" label-width="65px">
                            {{addFromForm.cityName}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="所属项目公司:" style="margin-bottom: 0px" label-width="90px">
                            <el-select v-model="addFromForm.company"  placeholder="请选择所属项目公司" value-key="id">
                                <el-option v-for="(item, index) in proCompanyOption" :key="index" :label="item.businessCompanyName" :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="所属项目:" style="margin-bottom: 0px;" label-width="100px">
                            <el-select v-model="addFromForm.project"  placeholder="请选择所属项目" value-key="id">
                                <el-option v-for="(item, index) in proOption" :key="index" :label="item.projectName" :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <el-table ref="multipleTable" :data="tableList" tooltip-effect="dark" style="width: 100%;text-align: center" border @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" :selectable="selectable"  ></el-table-column>
                <el-table-column type="index" label="序号" width="120"  ></el-table-column>
                <el-table-column prop="phaseName" label="分期名称" width="120"  ></el-table-column>
                <el-table-column prop="phaseCode" label="项目分期编号" show-overflow-tooltip  ></el-table-column>
                <el-table-column prop="projectName" label="所属项目" show-overflow-tooltip  ></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCancel2">取 消</el-button>
                <el-button type="success" @click="handleSave2">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    getProjectCompanyAll,
    getPrjByCompanyId,
    getDevstByprjInfoId
} from "@/api/pages/mainPage/plan/house"
    export default {
        data() {
            return{
                addFrom: false,
                addFromForm: {
                    cityCompany: null,
                    cityName: null,
                    company: null,
                    project: null
                },
                proCompanyOption: [],//
                proOption: [],//
                tableList: [],//
                multipleSelection: []
            }
        },
        watch: {
            'addFromForm.cityCompany'(e) {
                this.addFromForm.company = null;
                if( e )
                this.handleGetProjectCompanyAll({ cityCode: e })
            },
            'addFromForm.company'(e) {
                this.addFromForm.project = null;
                if( e )
                this.handleGetPrjByCompanyId({ prjCompanyId: e.id })
            },
            'addFromForm.project'(e) {
                this.tableList = [];
                if( e )
                this.handleGetDevstByprjInfoId({ projectInfoId: e.id })
            }
        },
        methods: {
            show(projectCityCode, projectCityName) {
                this.addFromForm.cityCompany = null;
                this.addFromForm.company = null;
                this.addFromForm.project = null;
                console.log(projectCityCode)
                this.addFromForm.cityCompany = projectCityCode;
                this.addFromForm.cityName = projectCityName;
                this.addFrom = true;
            },
            handleCancel2() {
                this.addFrom = false;
                this.addFromForm.cityCompany = null;
                this.addFromForm.cityName = null;
                this.addFromForm.company = null;
                this.addFromForm.project = null;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            selectable(row, index){
                if( row.existcount === 0 ){
                    return true
                }else{
                    return false
                }
            },
            handleSave2() {
                console.log(this.addFromForm)
                let devstagesIdList = this.multipleSelection.map(item=>{
                    return item.id
                })
                this.$emit('addFromOther', {
                    devstagesIdList,
                    prjCompanyId: this.addFromForm.company.businessCompanyId
                })
                this.addFrom = false;
            },
            handleGetProjectCompanyAll(params) {
                getProjectCompanyAll(params).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.proCompanyOption = res.data;
                    }
                })
            },
            handleGetPrjByCompanyId(params) {
                getPrjByCompanyId(params).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.proOption = res.data;
                    }
                })
            },
            handleGetDevstByprjInfoId(params) {
                getDevstByprjInfoId(params).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.tableList = res.data;
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>