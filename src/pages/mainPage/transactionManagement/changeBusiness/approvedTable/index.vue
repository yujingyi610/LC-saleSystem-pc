<template>
    <div>
        <div class="searchForm">
            <el-form :inline="true" :model="formInline">
                <el-row>
					<el-col :span="6">
                        <el-form-item label="城市公司">
                            <el-select v-model="formInline.cityCompany" :clearable="cityCompanyOption.length > 1">
                                <el-option v-for="(item, index) in cityCompanyOption" :key="index" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
					</el-col>
                    <el-col :span="6">
                        <el-form-item label="项目名称">
                            <el-select v-model="formInline.projectName" :clearable="projectNameOption.length > 1">
                                <el-option v-for="(item, index) in projectNameOption" :key="index" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="推盘批次">
                            <el-select v-model="formInline.releases" clearable>
                                <el-option v-for="(item, index) in releasesOption" :key="index" :label="item.batchName" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="客户名称">
							<el-input v-model="formInline.userName"></el-input>
						</el-form-item>
                    </el-col>
				</el-row>
                <el-row>
					<el-col :span="6">
                        <el-form-item label="业务类型">
                        <el-select v-model="formInline.type" clearable>
                            <el-option v-for="(item, index) in typeOption" :key="index" :label="item.value" :value="item.label"></el-option>
                        </el-select>
                    </el-form-item>
					</el-col>
                    <el-col :span="6">
                        <el-form-item label="单据类型">
                        <el-select v-model="formInline.changeType" clearable>
                            <el-option v-for="(item, index) in changeTypeOption" :key="index" :label="item.value" :value="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                    </el-col>
                    <div style="float: right; margin: 0">
                        <el-button type="primary" @click="handleSearch">查询</el-button>
                    </div>
				</el-row>
            </el-form>
        </div>
        <el-table :data="tableData" border style="width: 100%" @row-click="handleLookRow">
            <el-table-column type="index" label="序号" width="50"  ></el-table-column>
            <el-table-column prop="title" label="流程标题" show-overflow-tooltip width="300"  ></el-table-column>
            <el-table-column prop="typeText" label="业务类型"  show-overflow-tooltip ></el-table-column>
            <el-table-column prop="changeTypeText" label="单据类型"   show-overflow-tooltip></el-table-column>
            <el-table-column prop="statusText" label="流程状态"   show-overflow-tooltip></el-table-column>
            <el-table-column prop="pcCurrentUserName" label="当前处理人" show-overflow-tooltip  ></el-table-column>
            <el-table-column prop="date" label="发起时间/批准时间" show-overflow-tooltip  >
                <template slot-scope="scope">
                    {{scope.row.submitTime}}
                </template>
            </el-table-column>
            <el-table-column prop="changeCode" label="流水号"  ></el-table-column>
            <!-- <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
                <el-button @click.stop.prevent="handleRedact(scope.row)" type="text">编辑</el-button>
                <el-button @click.stop.prevent="handleDelect(scope.row)" type="text">删除</el-button>
            </template>
            </el-table-column> -->
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
import {getCityList, getPrjByCityId, getBathList, getHouseViewBathID} from '@/api/pages/mainPage/transactionManagement/houseQuery'
import {getList} from '@/api/pages/mainPage/transactionManagement/change/index.js'
    export default {
        watch: {
            "formInline.cityCompany": function(e) {
                this.formInline.projectName = '';
                if( e ){
				    this.handleGetPrjByCityId({ id: e });
                }
			},
			"formInline.projectName": function(e) {
                this.formInline.releases = '';
                if( e ){
                    this.handleGetBathList({ projectId: e });
                }                
			},
        },
        data() {
            return{
                cityCompanyOption: [],// 选择城市公司下拉数据
				projectNameOption: [],// 选择项目名称下拉数据
				releasesOption: [],// 选择推盘批次下拉数据
                formInline: {// 头部搜索Form表单
					cityCompany: '',// 城市公司
					projectName: '',// 项目名称
                    releases: '',// 推盘批次
                    userName: '',// 客户姓名
					tel: '',// 客户手机
                    code: '',// 认购单号
                    type: '',
                    changeType: ''
                },
                typeOption: [
                    {
                        value: '认购',
                        label: 'RG'
                    },
                    {
                        value: '签约',
                        label: 'QY'
                    }
                ],
                changeTypeOption: [
                    {
                        value: '签约更名',
                        label: 'QYGM'
                    },{
                        value: '预定更名',
                        label: 'YDGM'
                    },{
                        value: '预定换房',
                        label: 'YDHF'
                    },{
                        value: '签约换房',
                        label: 'QYHF'
                    },{
                        value: '预定退房',
                        label: 'DYTF'
                    },{
                        value: '签约退房',
                        label: 'QYTF'
                    },{
                        value: '签约变更',
                        label: 'QYBG'
                    },{
                        value: '延期签约',
                        label: 'YQQY'
                    },{
                        value: '延期付款',
                        label: 'YQFK'
                    }
                ],
                tableData: [],
                currentPage: 1,// 分页当前页数
				pageSize: 10, // 分页数量
                total: 0,// 总数
                
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
                    this.formInline.cityCompany = this.cityCompanyOption[0].id;
                }else{
                    //获取城市公司列表
                    getCityList().then(res => {
                        if (res.status === 200) {
                            this.cityCompanyOption = res.data;
                            this.formInline.cityCompany = this.cityCompanyOption[0].id;
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
                        this.formInline.projectName = this.projectNameOption[0].id;
                    }
                    this.handleGetList()
                }else{
                    getPrjByCityId(params).then(res => {
                        if (res.status === 200) {
                            this.projectNameOption = res.data;
                            if( this.projectNameOption[0] ){
                                this.formInline.projectName = this.projectNameOption[0].id;
                            }
                            this.handleGetList()
                        }
                    });
                }
			},
			handleGetBathList(params) {// 通过项目ID获取推盘
				getBathList(params).then(res=>{
					 
					this.releasesOption = res.data;
				})
            },
			handleSearch() {// 点击顶部搜索按钮
				this.handleGetList()
			},
            handleGetList() {// 请求table数据
                let params = new URLSearchParams();
                params.append('projectCityId', this.formInline.cityCompany)
                params.append('projectId', this.formInline.projectName)
                params.append('batchId', this.formInline.releases);
                params.append('customName', this.formInline.userName);
                params.append('tel', this.formInline.tel);
                params.append('status', 'APPROVED')
                params.append('pageNum', this.currentPage);
                params.append('pageSize', this.pageSize);
                params.append('type', this.formInline.type);
                params.append('changeType', this.formInline.changeType);
                getList(params).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.tableData = res.data.list;
                        this.total = res.data.total;
                    }
                })
            },
            handleLookRow(row) {// 点击table某行触发，查看详细信息
                //  
                // console.log(this.title)
                
            },
            handleRedact(row) {// 编辑
                // this.redactFlag = true;
            },
            handleDelect(row) {// 删除
            // 判断是因为，table中可以进行操作，弹框内的按钮也可以进行操作，row是table内的操作
                if( row ){

                }else{
                    console.log(this.LookForm)// 使用的数据是this.LookForm
                }
            },
            /**********分页相关************/
            handleSizeChange(val) {
				//  
				this.pageSize = val;
                this.handleGetList()
            },
            handleCurrentChange(val) {
				//  
				this.currentPage = val;
                this.handleGetList() 
            },
        },
        created() {
            this.handleGetCityList();
            // this.handleGetList()
        }
    }
</script>

<style scoped>
.searchForm{
	background:rgba(255,255,255,1);
	border-radius: 6px ; 
	box-sizing: border-box;
	padding: 20px 0;
}
</style>