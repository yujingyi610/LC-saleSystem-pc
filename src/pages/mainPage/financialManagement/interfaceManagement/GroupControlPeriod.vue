<template>
    <div id="GroupControlPeriod">
        <!-- 头部搜索form -->
		<div class="searchForm">
			<el-form :inline="true" :model="formInline">
				<el-form-item label="城市公司">
					<el-select v-model="formInline.cityCompany" clearable>
						<el-option v-for="(item, index) in cityCompanyOption" :key="index" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="项目名称">
					<el-select v-model="formInline.projectName" clearable>
						<el-option v-for="(item, index) in projectNameOption" :key="index" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item style="float: right">
					<el-button type="primary"  @click="handleRedact">编辑</el-button>
					<el-button type="primary"  @click="handleSave">保存</el-button>
				</el-form-item>
			</el-form>
            <el-table :data="tableData" border style="width: 100%" :cell-style="cellStyle" :header-cell-style="cellStyle">
                <el-table-column prop="devstagesName" label="销售分期"></el-table-column>
                <el-table-column prop="areaName" label="组团" >
                    <template slot-scope="scope">
                        <span v-if="scope.row.isDevstages">--</span>
                        <span v-else>{{scope.row.areaName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="NC项目期数编码" >
                    <template slot-scope="scope">
                        <div v-if="scope.row.isDevstages">
                            <el-input v-model="scope.row.devstagesPeriods" v-if="redactFlag" @change="changeNum(scope.row, scope.$index)"></el-input>
                            <span v-else>{{scope.row.devstagesPeriods}}</span>
                        </div>
                        <div v-else>
                            <el-input v-model="scope.row.areaPeriods" v-if="redactFlag" @change="changeNum(scope.row, scope.$index)"></el-input>
                            <span v-else>{{scope.row.areaPeriods}}</span>
                        </div>
                        
                    </template>
                </el-table-column>
                <el-table-column prop="devstagesName" label="名称" ></el-table-column>
            </el-table>
		</div>
    </div>
</template>

<script>
import {getCityList, getPrjByCityId} from '@/api/pages/mainPage/transactionManagement/houseQuery'

import {getProjectDevstagesByProjectId, periods} from '@/api/pages/mainPage/financialManagement/GroupControlPeriod.js'
    export default {
        watch: {
			"formInline.cityCompany": function(e) {
				this.formInline.projectName = null;
				if( e ){
					this.handleGetPrjByCityId({ id: e });
				}
			},
			"formInline.projectName": function(e) {
				// this.formInline.releases = null;
				if( e ){
					this.handlegetProjectDevstagesByProjectId({ projectId: e });
				}
			}
		},
        data() {
            return{
                cityCompanyOption: [],// 选择城市公司下拉数据
				projectNameOption: [],// 选择项目名称下拉数据
                formInline: {// 头部搜索Form表单
					cityCompany: null,// 城市公司
					projectName: null,// 项目名称
                },
                tableData: [],
                redactFlag: false,
                reg: /^[A-Za-z0-9]+$/
            }
        },
        methods: {
            handleGetCityList() {// 获取城市公司
                let userInfo = JSON.parse(sessionStorage.getItem('user-info'));
                if( userInfo.cityId ){
                    this.cityCompanyOption.push({
                        id: userInfo.cityId,
                        name: userInfo.cityName,
                        code: userInfo.cityCode
					})
					this.formInline.cityCompany = this.cityCompanyOption[0].id
                }else{
                    //获取城市公司列表
                    getCityList().then(res => {
                        if (res.status === 200) {
							this.cityCompanyOption = res.data;
							this.formInline.cityCompany = this.cityCompanyOption[0].id
                        }
                    });
                }

			},
            handleGetPrjByCityId(params) {// 通过城市公司ID获取项目
                let userInfo = JSON.parse(sessionStorage.getItem('user-info'));
                if( userInfo.projects && userInfo.projects[0] && userInfo.cityId ){
                    this.projectNameOption= userInfo.projects;
                    this.projectNameOption.map(item=>{
                        item.name = item.projectName
					})
					if( this.projectNameOption[0] ){
						this.formInline.projectName = this.projectNameOption[0].id
					}

                }else{
                    getPrjByCityId(params).then(res => {
                        if (res.status === 200) {
							this.projectNameOption = res.data;
							if( this.projectNameOption[0] ){
								this.formInline.projectName = this.projectNameOption[0].id
							}

                        }
                    });
                }
            },
            handlegetProjectDevstagesByProjectId(params) {
                this.tableData = []
                getProjectDevstagesByProjectId(params).then(res=>{
                    console.log(res)
                    if( res.status === 200 && res.data ){
                        res.data.map(item=>{
                            this.tableData.push({
                                devstagesName:item.devstagesName,
                                devstagesCode:item.devstagesCode,
                                devstagesId:item.devstagesId,
                                dId:item.dId,
                                devstagesPeriods:item.devstagesPeriods,
                                isDevstages: true,


                                projectId: item.projectId,
                                projectName: item.projectName,
                                projectCode: item.projectCode,
                            })
                            if( item.areaInfo ){
                                item.areaInfo.map(item2=>{
                                    this.tableData.push({
                                        devstagesName:item.devstagesName,
                                        devstagesCode:item.devstagesCode,
                                        devstagesId:item.devstagesId,
                                        dId:item.dId,
                                        devstagesPeriods:item.devstagesPeriods,

                                        area:item2.area,
                                        areaCode:item2.areaCode,
                                        areaName:item2.areaName,
                                        aId: item2.aId,
                                        areaPeriods: item2.areaPeriods,

                                        projectId: item.projectId,
                                        projectName: item.projectName,
                                        projectCode: item.projectCode,
                                    })
                                })
                            }
                            
                        })
                        console.log(this.tableData)
                    }else{
                        this.tableData = [];
                    }
                })
            },
            handleRedact() {// 点击顶部编辑按钮
				this.redactFlag = true;
            },
            handleSave() {// 点击顶部保存按钮
                let devstagesPeriodsList = [];
                let areaPeriodsList = [];
                

                this.tableData.map(item=>{
                    if( item.isDevstages ){
                        devstagesPeriodsList.push({
                            devstagesCode: item.devstagesCode,
                            devstagesId: item.devstagesId,
                            devstagesName: item.devstagesName,
                            devstagesPeriods: item.devstagesPeriods,
                            id: item.dId,

                            projectId: item.projectId,
                            projectName: item.projectName,
                            projectCode: item.projectCode,
                        })
                    }else{
                        areaPeriodsList.push({
                            areaCode: item.areaCode,
                            areaId: item.area,
                            areaName: item.areaName,
                            areaPeriods: item.areaPeriods,
                            id: item.aId,

                            devstagesCode: item.devstagesCode,
                            devstagesId: item.devstagesId,
                            devstagesName: item.devstagesName,

                            projectId: item.projectId,
                            projectName: item.projectName,
                            projectCode: item.projectCode,
                        })
                    }
                })
                periods({ devstagesPeriodsList, areaPeriodsList }).then(res=>{
                    console.log(res)
                    if( res.status === 200 ){
                        this.$message.success('保存成功！')
                        this.redactFlag = false;
                        this.handlegetProjectDevstagesByProjectId({ projectId: this.formInline.projectName });
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            changeNum(row, index) {
                // let reg = /^[A-Za-z0-9]+$/
                if( row.isDevstages ){
                    if( !this.reg.test(row.devstagesPeriods) ){
                        this.$message.error('只能输入数字和字母！')
                        this.tableData[index].devstagesPeriods = ''
                    }
                }else{
                    if( !this.reg.test(row.areaPeriods) ){
                        this.$message.error('只能输入数字和字母！')
                        this.tableData[index].areaPeriods = ''
                    }
                }
            },
            cellStyle({row, column, rowIndex, columnIndex}){              
                if(columnIndex === 1 || columnIndex === 0){//指定列号                  
                    return 'background: #F8F8F8'              
                }else{                  
                    return ''              
                }          
            } 

        },
        created() {
			this.handleGetCityList();
		}
    }
</script>

<style scoped>
#GroupControlPeriod{
    background: #ffffff;
    height: 100%;
}
.searchForm{
	/* height:68px;  */
	background:rgba(255,255,255,1);
	border-radius: 6px ;
	box-sizing: border-box;
	padding: 20px 25px;
	overflow: hidden;
}
</style>