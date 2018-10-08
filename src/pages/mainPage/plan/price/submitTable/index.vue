<template>
    <div>
        <el-form :model="searchForm" :inline="true">
            <el-form-item label="城市公司:">
                <el-select v-model="searchForm.cityCompany" :clearable="cityCompanyOption.length > 1">
                    <el-option v-for="(item, index) in cityCompanyOption" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目名称:">
                <el-select v-model="searchForm.projectName" :clearable="projectNameOption.length > 1">
                    <el-option v-for="(item, index) in projectNameOption" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="制定时间:">
                <el-date-picker v-model="searchForm.createTime" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="标题:">
                <el-input v-model="searchForm.schemeName" auto-complete="off" placeholder="请输入搜索关键字"></el-input>
            </el-form-item>
            <div style="float: right">
                <el-button type="success" @click="searchScheme">搜索</el-button>
            </div>
        </el-form>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="projectName" label="项目名称"  show-overflow-tooltip ></el-table-column>
            <el-table-column prop="schemeName" label="方案名称"  show-overflow-tooltip  ></el-table-column>
            <el-table-column prop="createTime" label="制定时间"  show-overflow-tooltip ></el-table-column>
            <!-- <el-table-column prop="effectDate" label="审核日期"></el-table-column> -->
            <el-table-column prop="statusText" label="状态"  show-overflow-tooltip ></el-table-column>
            <el-table-column label="操作"  >
                <template slot-scope="scope">
                    <div v-if="scope.row.status !== 'SUBMITTING'">
                        <el-button type="text" @click="handleLook(scope.row)">查看</el-button>
                        <el-button type="text" v-has="'prj:price:cancel'" @click="handleRevoke(scope.row)">撤回</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        <look-dialog ref="lookRef"></look-dialog>
    </div>
</template>

<script>
import {getCityList, getPrjByCityId } from '@/api/pages/mainPage/transactionManagement/houseQuery'
import { 
    getPriceSchemeList,// 请求列表数据
    getPriceScheme,// 获取调价方案
    revokePriceScheme,// 撤回调价方案
    } from "@/api/pages/mainPage/plan/price/index.js";
import lookDialog from '../look'
    export default {
        watch: {
			"searchForm.cityCompany": function(e) {
                this.searchForm.projectName = null;
                if( e ){
                    this.handleGetPrjByCityId({ id: e });
                }
			},
        },
        components: {
            lookDialog
        },
        data() {
            return{
                /*******头部搜索*****/
                searchForm: {
                    cityCompany: '',//  城市公司
                    projectName: '',// 项目名称
                    createTime: [],// 制定时间
                    schemeName: '',// 标题
                },
                cityCompanyOption: [],// 选择城市公司下拉数据
                projectNameOption: [],// 选择项目名称下拉数据
                tableData: [],// table数据
                /*******分页*****/
                pageSize: 10,// 每页数量
                currentPage: 1,// 当前页
                total: 0
            }
        },
        methods: {
            /************ajax请求************/
            handleGetCityList() {// 获取城市公司
                this.cityCompanyOption = [];
                let userInfo = JSON.parse(sessionStorage.getItem('user-info'));
                if( userInfo.cityId ){
                    this.cityCompanyOption.push({
                        id: userInfo.cityId,
                        name: userInfo.cityName,
                        code: userInfo.cityCode
                    })
                    this.searchForm.cityCompany = this.cityCompanyOption[0].id;
                }else{
                    //获取城市公司列表
                    getCityList().then(res => {
                        if (res.status === 200) {
                            this.cityCompanyOption = res.data;
                            this.searchForm.cityCompany = this.cityCompanyOption[0].id;
                        }
                    });
                }
				
			},
            handleGetPrjByCityId(params) {// 通过城市公司ID获取项目
                let userInfo = JSON.parse(sessionStorage.getItem('user-info'));
                if( userInfo.projects && userInfo.projects[0] && userInfo.cityId ){
                    this.projectNameOption = userInfo.projects;
                    this.projectNameOption.map(item=>{
                        item.name = item.projectName
                    })
                    if( this.projectNameOption[0] ){
                        this.searchForm.projectName = this.projectNameOption[0].id;
                    }
                    this.handlegetPriceSchemeList()
                }else{
                    getPrjByCityId(params).then(res => {
                        if (res.status === 200) {
                            this.projectNameOption = res.data;
                            if( this.projectNameOption[0] ){
                                this.searchForm.projectName = this.projectNameOption[0].id;
                            }
                            this.handlegetPriceSchemeList()
                        }
                    });
                }
			},
            handlegetPriceSchemeList() {// 请求table数据
                let params = {
                    projectCityId: this.searchForm.cityCompany,
                    projectId: this.searchForm.projectName,
                    schemeName:this.searchForm.schemeName,
                    pageNum:this.currentPage,
                    pageSize:this.pageSize,
                    status: 'SUBMIT'
                };
                if( this.searchForm.createTime && this.searchForm.createTime[0] ){
                    params.createTimeStart = this.searchForm.createTime[0];
                    params.createTimeStop = this.searchForm.createTime[1];
                }
                getPriceSchemeList(params).then(res=>{
                     
                    if(res.status === 200){
                        this.tableData = res.data.list;
                        this.total = res.data.total;
                    }
                });
            },
            /*********searchForm按钮*********/
            searchScheme(){// 搜索
                this.handlegetPriceSchemeList();
            },
            /**********************分页方法***************************/
            handleSizeChange(val) {
                this.pageSize = val;
                this.handlegetPriceSchemeList();
            },

            //当前页改变
            handleCurrentChange(val) {
                this.currentPage = val;
                this.handlegetPriceSchemeList();
            },
            /***************/
            handleLook(row) {// 查看table所点击的一行
                 
                let data = {
                    id: row.id
                };
                getPriceScheme(data).then(res=>{
                     
                    if( res.status === 200 ){
                        this.$refs.lookRef.show(res.data)
                    }
                })
            },
            handleRevoke(row) {// 撤回
                let params = new URLSearchParams();
                params.append('id', row.id)
                revokePriceScheme(params).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.$message({
                            type: 'success',
                            message: '撤回成功！'
                        })
                        this.handlegetPriceSchemeList();
                    }else{
                        this.$message.error(res.message)
                    }
                })
            }
        },
        created() {
            this.handleGetCityList();
            // this.handlegetPriceSchemeList();
        }   
    }
</script>

<style scoped>

</style>