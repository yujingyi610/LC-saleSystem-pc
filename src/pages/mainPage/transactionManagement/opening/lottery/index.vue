<template>
    <div class="lottery">
        <el-card class="lottery_con">
            <div slot="header" class="clearfix">
                <span>电子摇号</span>
            </div>
            <div style="overflow: hidden">
                <el-form :inline="true" :model="formInline" style="display: inline-block">
                    <el-form-item label="城市公司">
                        <el-select v-model="formInline.cityCompany">
                            <el-option v-for="(item, index) in cityCompanyOption" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="项目名称">
                        <el-select v-model="formInline.projectName">
                            <el-option v-for="(item, index) in projectNameOption" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="推盘批次">
                        <el-select v-model="formInline.releases" value-key="id">
                            <el-option v-for="(item, index) in releasesOption" :key="index" :label="item.batchName" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-button v-if="radio" type="success" style="float: right" @click="handleLotteRunRest">摇号重置</el-button>
            </div>
            
            <el-container class="height100">
                <el-aside width="500px" class="right_bottom_btn_wrap">
                    <el-card class="box-card margin_bottom20">
                        <div slot="header" class="clearfix">
                            <span>参与摇号人员列表</span>
                        </div>
                        <div class="text item">
                            <el-table :data="LotteryPersonnelList"  style="width: 100%" height="340">
                                <el-table-column type="index" label="序号"></el-table-column>
                                <el-table-column prop="customName" label="客户姓名" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="tel" label="手机号" :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="raiseCode" label="认筹号" :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="releases" label="推盘批次" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        {{formInline.releases.batchName}}    
                                    </template>
                                </el-table-column>
                                <el-table-column prop="isCheck" label="是否签到">
                                    <template slot-scope="scope">
                                        是
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                    <el-button type="success" class="right_bottom_btn" @click="handlelotteRun">摇号</el-button>
                </el-aside>
                <el-main style="padding: 0; padding-bottom: 20px;" class="right_bottom_btn_wrap">
                    <el-card class="box-card margin_bottom20">
                        <div slot="header" class="clearfix">
                            <span>摇中人员列表</span>
                        </div>
                        <div class="text item height100">
                            <el-table :data="RollPeopleList"  style="width: 100%" height="340">
                                <el-table-column prop="index" label="轮次/序号" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        {{scope.row.roundVal}}/{{scope.row.snVal}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="customName" label="客户姓名" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="sex" label="性别"></el-table-column>
                                <el-table-column prop="tel" label="手机号" :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="raiseCode" label="认筹号" :show-overflow-tooltip="true"></el-table-column>
                                <!-- <el-table-column prop="isGo" label="是否已进入"></el-table-column> -->
                            </el-table>
                        </div>
                    </el-card>
                    <div class="right_bottom_btn">
                        <el-button type="success" @click="handleGetlistRecords">刷新</el-button>
                    </div>
                </el-main>
            </el-container>
        </el-card>
    </div>
</template>

<script>
import {getCityList, getPrjByCityId, getBathList, getHouseViewBathID} from '@/api/pages/mainPage/transactionManagement/houseQuery'
import {getlistRecords, lotteRun, getSignListSignInfos, lotteRunRest} from '@/api/pages/mainPage/transactionManagement/opening'
    export default {
        props: {
            row: Object
        },
        watch: {
			"formInline.cityCompany": function(e) {
				// this.formInline.projectName = null;
				this.handleGetPrjByCityId({ id: e });
			},
			"formInline.projectName": function(e) {
				// this.formInline.releases = null;
				this.handleGetBathList({ projectId: e });
			},
			"formInline.releases": function(e) {
                // this.formInline.releases = null;
				console.log(this.formInline)
                // this.handleGetHouseViewBathID({ batchId: e });
                this.handleGetSignListSignInfos();
                this.handleGetlistRecords();
			},
		},
        data() {
            return{
                formInline: {// 头部搜索Form表单
					cityCompany: '',// 城市公司
					projectName: '',// 项目名称
					releases: {}// 推盘批次
                },
                cityCompanyOption: [],// 选择城市公司下拉数据
				projectNameOption: [],// 选择项目名称下拉数据
				releasesOption: [],// 选择推盘批次下拉数据
                radio: 1,// 是否测试摇号
                LotteryPersonnelList: [],// 参与摇号人员列表
                RollPeopleList: [],// 摇中人员列表
                
            }
        },
        methods: {
            handleGetCityList() {// 获取城市公司
				getCityList().then(res => {
					if (res.status === 200) {
						this.cityCompanyOption = res.data;
					}
				});
			},
			handleGetPrjByCityId(params) {// 通过城市公司ID获取项目
				getPrjByCityId(params).then(res => {
					if (res.status === 200) {
						this.projectNameOption = res.data;
					}
				});
			},
			handleGetBathList(params) {// 通过项目ID获取推盘
				getBathList(params).then(res=>{
					 
					this.releasesOption = res.data;
				})
            },
            handleGetSignListSignInfos() {// 获取参与摇号人员信息列表
                let params = new URLSearchParams();
                params.append( "batchId",this.formInline.releases.id );
                getSignListSignInfos(params).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.LotteryPersonnelList = res.data.signInList;
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message,
                            showClose: true
                        })
                    }
                })
            },
            handleGetlistRecords() {// 获取摇中的列表
                let params = new URLSearchParams();
                params.append( "batchId",this.formInline.releases.id );
                getlistRecords(params).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.RollPeopleList = res.data;
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message,
                            showClose: true
                        })
                    }
                })
            },
            handlelotteRun() {// 摇号
                let data = {
                    batchId: this.formInline.releases.id
                }
                data = this.Qs.stringify(data);
                lotteRun(data).then(res=>{
                     
                    if( res.status === 200 ){
                        this.handleGetlistRecords()
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message,
                            showClose: true
                        })
                    }
                })
            },
            handleLotteRunRest() {// 摇号重置
                let data = {
                    batchId: this.formInline.releases.id
                }
                data = this.Qs.stringify(data);
                lotteRunRest(data).then(res=>{
                     
                    if( res.status === 200 ){
                        this.handleGetlistRecords()
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message,
                            showClose: true
                        })
                    }
                })
            }
        },
        created() {
            this.handleGetCityList();
        },
    }
</script>

<style scoped lang="scss">
.lottery{
    position: absolute;
    padding: 20px;
    box-sizing: border-box;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .lottery_con{
        width: 100%;
        height: 100%;
        background: #fff;
    }
}
.form{
    margin-bottom: 20px;
}
.card{
    overflow: hidden;
    padding: 0 20px;
    .header{
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        border-bottom: 1px solid #e5e5e5;
        margin-bottom: 20px
    // overflow: hidden;
        
    }
}
</style>