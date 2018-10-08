<template>
    <div>
        <el-dialog :visible.sync="addFlag" width="80%">
            <div slot="title">
                <span >查看调价方案</span>
            </div>
            <el-form :model="DataInfo" ref="DataInfo">
                <el-row :gutter="24">
                    <el-col :span="8">
                        <el-form-item label="方案名称:">{{DataInfo.schemeName}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="是否首开:">{{DataInfo.isFirstOpen?'是':'否'}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="8">
                        <el-form-item label="城市公司">{{form.cityCompany?form.cityCompany.name:''}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="项目名称">{{form.projectName?form.projectName.name:''}}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="分期">{{form.devstagesId?form.devstagesId.name:''}}</el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="调价说明:">{{DataInfo.schemeRemark}}</el-form-item>
            </el-form>
            <el-card>
                <div slot="header" class="clearfix" >
                    <span class="title">折扣方案</span>
                    <span style="margin-left: 20px; font-size: 12px;color: #808080">折扣计算方式：{{DataInfo.discountCompMethod}}</span>
                    <span style="font-size: 12px; margin-left: 20px; margin-right: 5px; color: #808080">是否覆盖之前折扣:</span>
                    <el-radio-group v-model="DataInfo.isCover" disabled >
                      <el-radio :label="1" size="min">是</el-radio>
                      <el-radio :label="0" size="min">否</el-radio>
                    </el-radio-group>
                </div>
                <div class="text item">
                    <el-table :data="DataInfo.discountSchemeDtos" border style="width: 100%">
                        <el-table-column type="index" label="序号" width="50"></el-table-column>
                        <el-table-column prop="discountName" label="折扣名称" width="180"></el-table-column>
                        <el-table-column prop="discountType" label="折扣类型"></el-table-column>
                        <el-table-column prop="discountMethod" label="优惠方式"></el-table-column>
                        <el-table-column prop="discountItem" label="折扣明细"></el-table-column>
                    </el-table>
                </div>
            </el-card>
            <el-card class="box-card" >
                <div slot="header" class="clearfix">
                    <span class="title">调价楼栋列表</span>
                </div>
                <div class="text item">
                    <el-table :data="DataInfo.priceBuildDtos" border style="width: 100%" show-summary :summary-method="getSummaries">
                        <el-table-column type="index" label="序号" width="50"></el-table-column>
                        <el-table-column prop="devstagesName" label="分期"  show-overflow-tooltip></el-table-column>
                        <el-table-column prop="areaName" label="区域/组团" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="priceMethod" label="计价方式" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="panoramicPlanPrice" label="全景计划价格"></el-table-column>
                        <el-table-column prop="kickoffPrice" label="启动会单价"></el-table-column>
                        <el-table-column prop="buildNameStr" label="楼栋名称" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="totalCount" label="套数" ></el-table-column>
                        <el-table-column prop="beforeTotalAmount" label="调整前总价" ></el-table-column>
                        <el-table-column prop="afterTotalAmount" label="调整后总价" ></el-table-column>
                        <el-table-column prop="beforeAvgAmount" label="调整前单价" ></el-table-column>
                        <el-table-column prop="afterAvgAmount" label="调整后单价" ></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="lookdeleteBuildlist(scope.row)">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
            <el-card class="box-card" >
                <div slot="header" class="clearfix">
                    <span class="title">附件</span>
                </div>
                <div class="text item">
                    <el-table :data="accessoryTable" border style="width: 100%; margin-bottom: 20px">
                        <el-table-column prop="fileRealName" label="文件名称"></el-table-column>
                        <el-table-column prop="fileLength" label="附件大小"></el-table-column>
                        <el-table-column prop="updateUser" label="上传人"></el-table-column>
                        <el-table-column prop="updateTime" label="上传时间"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="text"  @click="handleUpLoadFile(scope.row)">下载</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addFlag = false">确定</el-button>
            </div>
        </el-dialog>
        <house-table ref="HouseDialogRef"></house-table>
    </div>
</template>

<script>
import { 
    getDiscountslist,// 获取折扣方案数据
    getpriceSchemeAreaList,// 获取调价楼栋列表数据
    lookBuildInfor,// 查看调价楼栋房间
} from "@/api/pages/mainPage/plan/price/index.js";
import houseTable from './houseTable'
    export default {
        components: {
            houseTable
        },  
        data() {
            return{
                addFlag: false,// 新增调价方案
                form: {
                    cityCompany: null,// 城市公司
					projectName: null,// 项目名称
                    devstagesId: null,// 推盘批次
                },
                DataInfo: {
					projectName: null,// 项目名称
                    devstagesId: null,// 分期
                    devstagesName: null,// 分期
                    devstagesCode: null,// 分期
                    projectCityId: null,// 城市公司ID
                    projectCityName: null,//
                    projectCityCode: null,//
                    schemeName:"",//方案名称
                    //createTimeStart:"",//制定时间
                    kickoffPrice: undefined,//启动会价格
                    schemeRemark:"",//调价说明
                    discountCompMethod:"",//折扣计算方式
                    projectId : null , //项目id
                    projectCode : null,//项目编码
                    discountSchemeDtos:[],//新增折扣方案表
                    priceBuildDtos:[],//调价楼栋列表
                    priceSchemeResourceDto:{},
                    isCover: 0,// 是否覆盖当前折扣
                    // object:"",
                },
                total: {},
                accessoryTable: [],
            }
            
        },
        methods: {
            show(data) {// 打开新增弹框
                this.accessoryTable = [];
                if( data ){ 
                     
                    if( data.resourceMaps && data.resourceMaps[0] ){
                        data.resourceMaps.map(item=>{
                            this.accessoryTable.push(item)
                        })
                    }

                    this.DataInfo.schemeName = data.schemeName;
                    this.DataInfo.isFirstOpen = data.isFirstOpen;
                    this.DataInfo.kickoffPrice = data.kickoffPrice;
                    this.DataInfo.schemeRemark = data.schemeRemark;
                    this.DataInfo.discountCompMethod = data.discountCompMethod;
                    this.DataInfo.projectId = data.projectId;
                    this.DataInfo.projectCityId = data.projectCityId;
                    this.DataInfo.projectCityName = data.projectCityName;
                    
                    this.form.cityCompany = {
                        name: data.projectCityName,
                        id: data.projectCityId
                    };
                    this.form.projectName = {
                        name: data.projectName,
                        id: data.projectId
                    };;
                    this.form.devstagesId = {
                        name: data.devstagesName,
                        id: data.devstagesId
                    };;

                    this.total = {
                        afterSchemaAvgAmount: data.afterSchemaAvgAmount,
                        afterSchemaTotalAmount: data.afterSchemaTotalAmount,
                        beforeSchemaAvgAmount: data.beforeSchemaAvgAmount,
                        beforeSchemaTotalAmount: data.beforeSchemaTotalAmount,
                        totalNum: data.totalNum,
                    }

                    this.DataInfo.projectName = data.projectName;
                    this.DataInfo.projectCode = data.projectCode;
                    this.DataInfo.devstagesName = data.devstagesName;
                    this.DataInfo.devstagesId = data.devstagesId;;
                    this.DataInfo.isCover = data.isCover;
                    this.DataInfo.devstagesCode = data.devstagesCode
                    this.DataInfo.id = data.id;
                    this.priceschemeId = data.id;
                    getDiscountslist({ pId: this.DataInfo.id }).then(res=>{// 获取折扣方案数据列表
                         ;
                        if( res.status === 200 )
                        this.DataInfo.discountSchemeDtos = res.data;
                    })
                    this.handleCloseChild();// 获取调价区域楼栋列表数据
                }
                this.addFlag = true;
            },
            handleCloseChild() {// 关闭新增调价楼栋弹框，重新请求调价楼栋列表数据
                let  params = {
                    pId:this.priceschemeId
                }
                getpriceSchemeAreaList(params).then(res=>{
                    if(res.status === 200){
                          
                        this.DataInfo.priceBuildDtos = res.data;
                        // this.DataInfo.priceBuildDtos.map(item=>{
                        //     item.buildStr = '';
                        //     item.priceBuildDtos.map((item2, index2)=>{
                        //         if( index2 !== item.priceBuildDtos.length - 1 ){
                        //             item.buildStr = item.buildStr + item2.buildName + '、'
                        //         }else{
                        //             item.buildStr = item.buildStr + item2.buildName
                        //         }
                        //     })
                        // })
                    }
                })
            },
            getSummaries(param) {// 合计
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                        return;
                    }
                    if( column.property === 'totalCount' ){
                        return sums[index] = this.total.totalNum
                    }
                    if( column.property === 'afterAvgAmount' ){
                        return sums[index] = this.total.afterSchemaAvgAmount
                    }
                    if( column.property === 'afterTotalAmount' ){
                        return sums[index] = this.total.afterSchemaTotalAmount
                    }
                    if( column.property === 'beforeAvgAmount' ){
                        return sums[index] = this.total.beforeSchemaAvgAmount
                    }
                    if( column.property === 'beforeTotalAmount' ){
                        return sums[index] = this.total.beforeSchemaTotalAmount
                    }
                });

                return sums;
            },
            //调价楼栋查看
            lookdeleteBuildlist(item){
                 
                let id = item.id;
                let params = {
                    priceAreaId:id
                }
                lookBuildInfor(params).then(res=>{
                     
                    if(res.status === 200){
                        this.$refs.HouseDialogRef.handleOpenDialog(res.data)
                    }
                })
                
            },
            
        },
        created() {
        }
    }
</script>

<style scoped>

</style>