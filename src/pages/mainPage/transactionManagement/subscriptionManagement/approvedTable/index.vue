<template>
    <div>
		<!-- 头部搜索form -->
		<div class="searchForm">
			<el-form :inline="true" :model="formInline">
                <el-row>
					<el-col :span="8">
                        <el-form-item label="城市公司">
                            <el-select v-model="formInline.cityCompany" :clearable="cityCompanyOption.length > 1">
                                <el-option v-for="(item, index) in cityCompanyOption" :key="index" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
					</el-col>
                    <el-col :span="8">
                        <el-form-item label="项目名称">
                            <el-select v-model="formInline.projectName" :clearable="projectNameOption.length > 1">
                                <el-option v-for="(item, index) in projectNameOption" :key="index" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="推盘批次">
                            <el-select v-model="formInline.releases" clearable>
                                <el-option v-for="(item, index) in releasesOption" :key="index" :label="item.batchName" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    
				</el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="客户名称">
							<el-input v-model="formInline.userName"></el-input>
						</el-form-item>
                    </el-col>
					<el-col :span="8">
                        <el-form-item label="客户手机">
                            <el-input v-model="formInline.tel"></el-input>
                        </el-form-item>
					</el-col>
                    
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="房间名称">
                            <div @click="handleFindHouse">
                                <long-input :val="formInline.houseName"></long-input>
                            </div>
                        </el-form-item>
					</el-col>
                    <el-col :span="12">
                        <el-form-item label="认购时间:">
                            <el-date-picker v-model="formInline.createTime" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                        </el-form-item>
					</el-col>
                    <el-form-item style="float: right">
                        <el-button type="primary" @click="handleReset">重置</el-button>
                        <el-button type="primary" @click="handleSearch">查询</el-button>
                    </el-form-item>
                </el-row>
				
			</el-form>
		</div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" label="序号" width="50"  ></el-table-column>
            <el-table-column prop="houseDesc" label="房间名称" min-width="250" class-name="table_houseName"  ></el-table-column>
            <el-table-column label="客户姓名" min-width="150"  >
                <template slot-scope="scope">
                    <div v-if="scope.row.showAll">
						<div v-for="(item, index) in scope.row.customs" :key="index" style="line-height: 30px">
							<div v-if="index === 0" style="color: #25AE50"  @click.stop.prevent="handleShowOne(scope.row)">
								<span >{{item.customName}}</span>
                        		<i class="el-icon-caret-top"></i>
							</div>
							<div v-else>{{item.customName}}</div>
						</div>
                    </div>
                    <div v-else style="color: #25AE50" @click.stop.prevent="handleShowAll(scope.row)">
                        <span>{{scope.row.customs[0].customName}}</span>
                        <i class="el-icon-caret-bottom"></i>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="性别"  >
                <template slot-scope="scope">
                    <div v-if="scope.row.showAll">
						<div v-for="(item, index) in scope.row.customs" :key="index" style="line-height: 30px">
							<div>{{item.sex}}</div>
						</div>
                    </div>
                    <div v-else>
                        <span>{{scope.row.customs[0].sex}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="手机号"  >
                <template slot-scope="scope">
                    <div v-if="scope.row.showAll">
						<div v-for="(item, index) in scope.row.customs" :key="index" style="line-height: 30px">
							<div>{{item.tel}}</div>
						</div>
                    </div>
                    <div v-else>
                        <span>{{scope.row.customs[0].tel}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="subscribeCode" label="认购单号" min-width="200"   show-overflow-tooltip></el-table-column>
            <el-table-column prop="propertyConsultName" label="置业顾问" min-width="100"  show-overflow-tooltip ></el-table-column>
            <el-table-column label="操作" width="150"  >
            <template slot-scope="scope">
                <div v-if="scope.row.status !== 'SUBMITTING'">
                    <el-button @click.stop.prevent="handleLookRow(scope.row)" type="text">查看</el-button>
                    <el-button @click.stop.prevent="handleBack(scope.row)" type="text" v-if="scope.row.pcCurrentActivityCode !== 'financeActivity'">撤回</el-button>
                </div>
            </template>
            </el-table-column>
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
        <submit-dialog ref="dialogRef"></submit-dialog>
        <house-detail ref="houseRef" @chooseHouse="handleChooseHouse"></house-detail>
    </div>
</template>

<script>
import submitDialog from '../submitDialog'
import houseDetail from '@/components/houseDetail'
import longInput from '@/components/dialogLongInput'
import {getCityList, getPrjByCityId, getBathList, getHouseViewBathID} from '@/api/pages/mainPage/transactionManagement/houseQuery'
import {listTrdSubscribeForm, getTrdSubscribeForm, deleteTrdSubscribeForm, revokeTrdSubscribeForm} from '@/api/pages/mainPage/transactionManagement/subscriptionManagement'
    export default {
        props: {
			showDropdown: String
		},
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
            showDropdown() {
				console.log(this.showDropdown);
				if( this.showDropdown === '全部' ){
					this.signType = '';
				}else if( this.showDropdown === '已签约' ){
					this.signType = 'SIGN';
				}else if( this.showDropdown === '未签约未逾期' ){
					this.signType = 'DEADLINE';
				}else if( this.showDropdown === '未签约已逾期' ){
					this.signType = 'OVERDUE';
				}
				this.handleGetList()
			}
        },
        components: {
            submitDialog,
            houseDetail,
            longInput
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
                    houseName: '',// 房间名称
                    createTime: [],// 认购时间
                },
                tableData: [],
                currentPage: 1,// 分页当前页数
                pageSize: 10, // 分页数量
                total: 0,// 总数
                signType: '',// 签约状态
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
                    
                    this.handleGetList();
                }else{
                    getPrjByCityId(params).then(res => {
                        if (res.status === 200) {
                            this.projectNameOption = res.data;
                            if( this.projectNameOption[0] ){
                                this.formInline.projectName = this.projectNameOption[0].id;
                            }
                            
                            this.handleGetList();
                        }
                    });
                }
			},
			handleGetBathList(params) {// 通过项目ID获取推盘
				getBathList(params).then(res=>{
					 
					this.releasesOption = res.data;
				})
            },
            handleFindHouse() {//查找房间
                this.$refs.houseRef.show()
            },
            handleChooseHouse(houseInfo) {// 选中房间，回显
                 
                if( houseInfo ){
                    this.formInline.houseName = houseInfo.houseFullName;
                    this.formInline.houseId = houseInfo.id;
                }
            },
            handleReset() {// 重置
                this.formInline.cityCompany = '';
                this.formInline.projectName = '';
                this.formInline.releases = '';
                this.formInline.userName = '';
                this.formInline.tel = '';
                this.formInline.houseName = '';
                this.formInline.houseId = '';
                this.formInline.createTime = [];
                this.currentPage = 1;
                this.pageSize = 10;
                this.handleGetCityList();
            },
            handleSearch() {// 点击顶部搜索按钮
                // alert('submit!');
                this.handleGetList();
			},
            handleGetList() {// 请求table数据
                let params = new URLSearchParams();
                params.append('projectCityId', this.formInline.cityCompany);
                params.append('projectId', this.formInline.projectName);
                params.append('batchId', this.formInline.releases);
                params.append('status', 'SUBMIT');
                // params.append('signType', this.signType);
                params.append('pageNum', this.currentPage);
                params.append('pageSize', this.pageSize);
                params.append('customName', this.formInline.userName);
                params.append('tel', this.formInline.tel);
                if( this.formInline.createTime && this.formInline.createTime[0] ){
                    params.append('subscribeStartDate', this.formInline.createTime[0]);
                    params.append('subscribeEndDate', this.formInline.createTime[1]);
                }
                if( this.formInline.houseId ){
                    params.append('houseId', this.formInline.houseId);
                }
                console.log('上传数据',params)
                listTrdSubscribeForm(params).then(res=>{
                     
                    if( res.status === 200 ){
                        let list = res.data.list;
                        list.map(item=>{
                            this.$set(item, 'showAll', false);
                        })
                        this.tableData = list;
                        this.total = res.data.total
                    }else{
						this.$message({
							type: "error",
							message: res.message
						});
					}
                    
                })
            },
            handleShowAll(row) {// 点击姓名中的箭头，展开该认购单的全部客户
                row.showAll = true;                   
            },
            handleShowOne(row) {// 点击姓名中的箭头，只显示该认购单的一个客户
                row.showAll = false;
            },
            handleLookRow(row) {// 点击table某行触发，查看详细信息
                 
                // console.log(this.title)
                let params = new URLSearchParams();
                params.append('id', row.id)
                getTrdSubscribeForm(params).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.$refs.dialogRef.show(res.data);
                    }else{
						this.$message({
							type: "error",
							message: res.message
						});
					}
                })
            },
            handleRedact(row) {// 编辑
                // this.redactFlag = true;
                let params = new URLSearchParams();
                params.append('id', row.id)
                getTrdSubscribeForm(params).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.$refs.dialogRef.show(res.data);
                    }else{
						this.$message({
							type: "error",
							message: res.message
						});
					}
                })
            },
            handleBack(row) {// 撤回
                let params = new URLSearchParams();
                params.append('id', row.id)
                revokeTrdSubscribeForm(params).then(res=>{
                    if( res.status === 200 ){
                        this.$message.success('撤回成功！')
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            handleDelect(row) {// 删除
                this.$confirm("此操作将永久删除该认购单, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        let params = new URLSearchParams();
                        params.append('id', row.id)
                        deleteTrdSubscribeForm(params).then(res=>{
                             ;
                            if( res.status === 200 ){
                                this.$message({
                                    type: "success",
                                    message: "删除成功！"
                                })
                                this.handleGetList()
                            }else{
                                this.$message({
                                    type: "error",
                                    message: res.message
                                });
                            }
                        })
                    })
                    .catch(() => {
                        // this.$message({
                        //     type: "info",
                        //     message: "已取消作废"
                        // });
                });



                
            },
            /**********分页相关************/
            handleSizeChange(val) {
                 
                this.pageSize = val;
                this.handleGetList()
            },
            handleCurrentChange(val) {
                 
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

</style>