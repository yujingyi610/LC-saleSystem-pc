<template>
    <div class="height440 check">
        <el-card>
            <div slot="header" class="clearfix">
                <span>电子签到</span>
            </div>
            <div style="overflow: hidden">
                <el-form :inline="true" :model="formInline">
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
                        <el-select v-model="formInline.releases">
                            <el-option v-for="(item, index) in releasesOption" :key="index" :label="item.batchName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="float: right">
                        <el-button type="primary" @click="handlesignAll">全部签到</el-button>
                        <el-button type="primary" @click="handleSignRestAll">全部重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-container class="height100 check_con">
                <el-aside width="500px" class="right_bottom_btn_wrap height100">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>验证信息</span>
                        </div>
                        <div class="text item height100">
                            <div class="form">
                                <el-input placeholder="请输入验证信息" v-model="Authentication"></el-input>
                                <el-button type="success" @click="handleByIDcard">身份证验证</el-button>
                                <el-button type="success" @click="handleByIdentificationCard">认筹号验证</el-button>
                                <el-button type="success" @click="handleByTel">手机号验证</el-button>
                            </div>
                            <!-- 验证到客户信息后显示 -->
                            <div v-if="userInfo">
                                <el-form ref="form" :model="userInfo" label-width="80px">
                                    <el-row>
                                        <el-col :span="12">
                                            <el-form-item label="客户姓名">{{userInfo.customName}}</el-form-item>
                                            <el-form-item label="证件类型">{{userInfo.certificateName}}</el-form-item>
                                            <el-form-item label="客户性别">{{userInfo.sex}}</el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="手机号码">{{userInfo.tel}}</el-form-item>
                                            <el-form-item label="身份证号">{{userInfo.certificateNo}}</el-form-item>
                                            <el-form-item label="联系地址">{{userInfo.location}}</el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-form>
                                <el-card class="box-card nopadding margin_bottom20">
                                    <div slot="header" class="clearfix">
                                        <span>认筹信息</span>
                                    </div>
                                    <div class="text item height100">
                                        <el-table :data="ReleasesList"  style="width: 100%">
                                            <el-table-column type="index" label="序号"></el-table-column>
                                            <el-table-column prop="raiseCode" label="认筹号" show-overflow-tooltip></el-table-column>
                                            <el-table-column prop="submitTime" label="认筹日期" show-overflow-tooltip></el-table-column>
                                        </el-table>
                                    </div>
                                </el-card>
                            </div>
                        </div>
                    </el-card>
                    <div v-if="userInfo.id">
                        <el-button v-if="!isCheck" type="success" class="right_bottom_btn" @click="handleSignIn">签到</el-button>   
                        <el-button v-else type="success" class="right_bottom_btn" @click="printCode">打印号码牌</el-button>   
                    </div>
                    
                </el-aside>
                <el-main style="padding: 0" class="right_bottom_btn_wrap">
                    <div class="card">
                        <div class="clearfix header">
                            <span style="float: left">签到信息</span>
                            <span style="float: right; font-size: 12px">总认筹人数：<span style="color: #E60012">{{allPeople}}</span></span>
                        </div>
                        <el-tabs type="card" style="float: left; width: 100%; height: 320px">
                            <el-tab-pane label="已签到">
                                <is-check :data="signInList"></is-check>
                            </el-tab-pane>
                            <el-tab-pane label="未签到">
                                <not-check :data="noSignList"></not-check>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="right_bottom_btn">
                        <el-button type="success" @click="handleGetSignExportSignInfo('signIn')">导出已签到</el-button>
                        <el-button type="success" @click="handleGetSignExportSignInfo('noSignIn')">导出未签到</el-button>
                    </div>
                </el-main>
            </el-container>
        </el-card>
        <div id="code" style="display: none"></div> 
    </div>
</template>

<script>
// import QRCode from 'qrcode'// 引入生成二维码
import isCheck from './isCheck'// 已签到
import NotCheck from './NotCheck'// 未签到
import {getIDcardInfo} from '@/api/pages/IDcard'
import {getCityList, getPrjByCityId, getBathList, getHouseViewBathID} from '@/api/pages/mainPage/transactionManagement/houseQuery'
import {getSign, getSignListSignInfos, getSignExportSignInfo, signIn, signAll, signRestAll} from '@/api/pages/mainPage/transactionManagement/opening'
    export default {
        props: {
            row: Object
        },
        components: {
            isCheck,
            NotCheck
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
			},
		},
        data() {
            return{
                /*********顶部搜索form数据***********/
				cityCompanyOption: [],// 选择城市公司下拉数据
				projectNameOption: [],// 选择项目名称下拉数据
				releasesOption: [],// 选择推盘批次下拉数据
				formInline: {// 头部搜索Form表单
					cityCompany: '',// 城市公司
					projectName: '',// 项目名称
					releases: ''// 推盘批次
                },
                Authentication: '',// 验证信息
                userInfo: {},// 客户信息
                ReleasesList: [],// 认筹信息列表
                isCheck: true,// 判断是否签到
                allPeople: 0,// 总认筹人数
                noSignList: [],// 未签到列表
                signInList: [],// 已签到列表
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
            handleByIDcard() {// 身份证验证
                let params = new URLSearchParams();
                params.append( "batchId",this.formInline.releases );
                params.append( "certificateNo",this.Authentication );
                this.handlegetSign(params)
            },
            handleByIdentificationCard() {// 认筹号验证
                let params = new URLSearchParams();
                params.append( "batchId",this.formInline.releases );
                params.append( "raiseCode",this.Authentication );
                this.handlegetSign(params)
            },
            handleByTel() {// 手机号验证
                let params = new URLSearchParams();
                params.append( "batchId",this.formInline.releases );
                params.append( "mobile",this.Authentication );
                this.handlegetSign(params)
            },
            handlegetSign(params) {// 通过手机号/认筹号/省份证好获取设置过的认筹
                getSign(params).then(res=>{
                     ;
                    this.isCheck = false;
                    if( res.status === 200 ){
                        this.userInfo = res.data[0];
                        this.ReleasesList = res.data;
                        for( let i = 0, len = this.ReleasesList.length; i < len; i++ ){
                            if( !this.ReleasesList[i].signed ){
                                this.isCheck = false;
                                break
                            }
                            this.isCheck = true;
                        }
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            handleSignIn() {// 签到
                let raiseIds = '';
                this.ReleasesList.map((item, index)=>{
                     
                    if( item.signed === false ){
                        raiseIds = raiseIds + ',' + item.id;
                    }
                })
                raiseIds = raiseIds.substring(1);
                let data = {
                    batchId: this.formInline.releases,
                    raiseIds
                }
                data = this.Qs.stringify(data);
                signIn(data).then(res=>{
                     
                    if( res.status === 200 ){
                        this.$message.success('签到成功！')
                        this.isCheck = true;
                        this.handleGetSignListSignInfos();
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            printCode() {// 打印号码牌
                let qrcode = new QRCode('code')
                this.userInfo = {
                    customName: '张三'
                }
                let str = '客户姓名：';
                let name = this.userInfo.customName;
                str += name;
                qrcode.makeCode(str)
                setTimeout(function() {
					var myWindow = window.open('','')
					myWindow.document.body.innerHTML = document.getElementById('code').innerHTML;
					myWindow.focus()
					myWindow.print();
					myWindow.close();
				}, 1000);

            },
            handlesignAll() {// 全部签到
                let data = {
                    batchId: this.formInline.releases
                }
                data = this.Qs.stringify(data);
                signAll(data).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.handleGetSignListSignInfos();
                    }
                })
            },
            handleSignRestAll() {// 全部重置
                let data = {
                    batchId: this.formInline.releases
                }
                data = this.Qs.stringify(data);
                signRestAll(data).then(res=>{
                     
                    if( res.status === 200 ){
                        this.handleGetSignListSignInfos();
                    }
                })            
            },
            handleGetSignListSignInfos() {// 签到信息列表
                let params = new URLSearchParams();
                params.append( "batchId",this.formInline.releases );
                getSignListSignInfos(params).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.allPeople = res.data.raiseSum;
                        this.signInList = res.data.signInList;
                        this.noSignList = res.data.noSignList;
                    }
                })
            },
            handleGetSignExportSignInfo(signInType) {// 下载签到列表
                window.location.href = "/api/project/elecOpen/elec/sign/exportSignInfo?batchId="+this.formInline.releases+"&signInType="+signInType;
            }
        },
        created() {
            this.handleGetCityList();
        },
        mounted() {
            let _this = this;
            let timer = setInterval(()=>{
                $.ajax({
                    type : "GET",
                    url : 'http://127.0.0.1:24010/ZKIDROnline/ScanReadIdCardInfo?OP-DEV=1&CMD-URL=4&common=1&random=7429',
                    dataType : "json",
                    async: true,
                    timeout:15000,
                    success: function (res) {},
                    error: function (res) {
                        if( res.responseText.indexOf('"IDNumber": "') !== -1 ){
                            let arr = res.responseText.split('"IDNumber": "');
                            let arr2 = arr[1].split('"');
                            _this.Authentication = arr2[0];
                            _this.handleByIDcard()
                        }
                        
                    }
                });
            },3000)
            this.$once('hook:beforeDestroy', () => {            
                clearInterval(timer);                                    
            })
        }
    }
</script>

<style scoped lang="scss">
.check{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    box-sizing: border-box;
    padding: 20px;
    .check_con{
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