<template>
    <div>
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
                    <el-table-column prop="devstagesName" label="分期" ></el-table-column>
                    <el-table-column prop="areaName" label="区域/组团"></el-table-column>
                    <el-table-column prop="priceMethod" label="计价方式"></el-table-column>
                    <el-table-column prop="panoramicPlanPrice" label="全景计划价格（元）"></el-table-column>
                    <el-table-column prop="kickoffPrice" label="启动会单价（元）"></el-table-column>
                    <el-table-column prop="buildNameStr" label="楼栋名称" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="totalCount" label="套数" ></el-table-column>
                    <el-table-column prop="beforeTotalAmount" label="调整前总价（元）" ></el-table-column>
                    <el-table-column prop="afterTotalAmount" label="调整后总价（元）" ></el-table-column>
                    <el-table-column prop="beforeAvgAmount" label="调整前单价（元）" ></el-table-column>
                    <el-table-column prop="afterAvgAmount" label="调整后单价（元）" ></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="lookdeleteBuildlist(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <!-- 附件信息 -->
        <el-card class="box-card"
            v-loading="loading"
            element-loading-text="上传中，请稍后..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
            <div slot="header" class="clearfix">
                <span class="title">附件信息</span>
            </div>
            <el-table :data="accessoryTable" border style="width: 100%; margin-bottom: 20px">
                <el-table-column prop="fileRealName" label="文件名称"></el-table-column>
                <el-table-column prop="fileLength" label="附件大小"></el-table-column>
                <el-table-column prop="updateUser" label="上传人"></el-table-column>
                <el-table-column prop="updateTime" label="上传时间"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleUpLoadFile(scope.row)">下载</el-button>
                        <el-button type="text" @click="handleDelFile(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-upload action="/zuul/api/storage/files/multipart/file"
                :show-file-list="false" 
                :on-success="handleUpDateSuccess"
                :on-error="handleUpDateError"
                :on-progress="handleProgress"
                :before-upload="beforeAvatarUpload"
                :data="upLoadData"
                name="files"
                style="float: right">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-card>
        <el-button style="float: right" type="success" @click="handleSaveFile">保存附件信息</el-button>
        <house-table ref="HouseDialogRef"></house-table>
    </div>
</template>

<script>
import { 
    getDiscountslist,// 获取折扣方案数据
    getpriceSchemeAreaList,// 获取调价楼栋列表数据
    lookBuildInfor,// 查看调价楼栋房间
    savePriceScheme
} from "@/api/pages/mainPage/plan/price/index.js";
import houseTable from './houseTable'
    export default {
        components: {
            houseTable
        },
        data() {
            return{
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
                idArr: [],
                accessoryTable: [],
                commonResources: [],// 上传楼栋图片
                upLoadData: {
                    bussinessType: 'project'
                },
                loading: false
            }
            
        },
        methods: {
            show(data) {// 打开新增弹框
                if( data ){
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
                    if( data.resourceMaps && data.resourceMaps[0] ){
                        data.resourceMaps.map(item=>{
                            this.accessoryTable.push(item)
                            this.commonResources.push(item)
                        })
                    }
                    
                    getDiscountslist({ pId: this.DataInfo.id }).then(res=>{// 获取折扣方案数据列表
                         ;
                        if( res.status === 200 )
                        this.DataInfo.discountSchemeDtos = res.data;
                    })
                    this.handleCloseChild();// 获取调价区域楼栋列表数据
                }
            },
            handleCloseChild() {// 关闭新增调价楼栋弹框，重新请求调价楼栋列表数据
                let  params = {
                    pId:this.priceschemeId
                }
                getpriceSchemeAreaList(params).then(res=>{
                    if(res.status === 200){
                        this.DataInfo.priceBuildDtos = res.data;
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
            handleUpDateSuccess(response, file, fileList) {// 文件上传
                 
                this.loading = false;
                if( response.status === 200 ){
                    this.$message({
                        type: 'success',
                        message: '上传成功！',
                        showClose: true
                    })
                    response.data.map(item=>{
                        this.commonResources.push({
                            fileUrl: item.fileUrl,
                            resourceId: item.id
                        })
                        item.canDel = true;
                        this.accessoryTable.push(item);
                    })
                }
            },
            handleUpDateError(err) {
            // 上传失败
            this.$alert(JSON.parse(err.message).message, "提示", {
                confirmButtonText: "确定",
                showClose: false,
                callback: action => {
                this.loading = false;
                }
            });
            },
            handleProgress(file, fileList) {
            // 上传中
            if (!this.loading) {
                 

                this.loading = true;
            }
            },
            beforeAvatarUpload(file) {// 上传前判断文件大小
                const isLt2M = file.size / 1024 / 1024 < 10;
                if (!isLt2M) {
                this.$message.error('上传文件大小不能超过 10MB!');
                }
                return isLt2M;
            },
            handleUpLoadFile(row) {// 下载附件
                window.open(row.fileUrl, '_blank');
            },
            handleDelFile(index) {// 删除
                this.accessoryTable.splice(index, 1);
                this.commonResources.splice(index, 1);
                this.$message({
                    type: 'success',
                    message: '删除成功！'
                })
            },
            // 保存
            handleSaveFile() {
                this.DataInfo.priceSchemeResources = this.commonResources;
                savePriceScheme(this.DataInfo).then(res=>{
                     ;
                    if(res.status === 200){
                        
                        this.$message({
                            message: '保存成功!',
                            type: 'success',
                            showClose: true
                        });
                    }else{
                        this.$message.error(res.message)
                    }
                });
            },
        },
        created() {
        }
    }
</script>

<style scoped>

</style>