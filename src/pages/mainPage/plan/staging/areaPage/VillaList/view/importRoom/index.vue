<template>
    <div class="importRoom">
        <div v-show="!isShow">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="title">{{val.name}}房间<i class="el-icon-arrow-right"></i>导入房间</span>
                <div style="float: right">
                    <el-button type="success" @click="handleUpdate">下载模板</el-button>
                    <el-button @click="handleClose">取消</el-button>
                    <el-button type="success" @click="handleFinish">完成</el-button>
                </div>
            </div>
            <div class="text item">
                <el-upload
                class="upload-demo"
                ref="upload"
                action="/api/project/houseManage/house/importVilla"
                :data="upDateData"
                :file-list="fileList"
                name="files"
                :on-success="handleSuccess"
                :on-error="handleError"
                :auto-upload="false">
                <el-button slot="trigger" type="primary">选取文件</el-button>
                <el-button style="float: right;" type="success" @click="submitUpload">上传</el-button>
                </el-upload>
            </div>
        </el-card>
        <el-card class="box-card space_bottom">
            <div>
                <span>错误信息：</span>
                <span class="showErrInfo">
                    <span v-for="(item, index) in errList" :key="index">
                        <span>第{{item.lineNum}}行：</span>
                        <span v-for="(item2, index2) in item.msgList" :key="index2">
                            {{item2}}
                        </span>
                        <br />
                    </span>
                </span>
            </div>
            <div>
                <span>导入成功:</span>
                <el-button type="success" @click="handleFinish">查看房间浏览</el-button>
            </div>
        </el-card>
        </div>
        <!-- <view-room v-if="isShow" v-bind:buildingInfo="buildingInfo" v-on:goBack="handleGoBack"></view-room> -->
    </div>
</template>

<script>
// import ViewRoom from './ViewRoom'
    export default {
        props: {
            val: Object
        },
        components: {
            // 'view-room': ViewRoom
        },
        data() {
            return {
                fileList: [
                    // {
                    //     name: 'food.jpeg', 
                    //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                    // }
                ],
                errList: [],
                isShow: false,
                upDateData: {
                    areaId: ''
                }
            }
        },
        methods: {
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleClose() {
                this.$emit('showClick');
            },
            handleFinish() {
                this.$emit('showClick');
            },
            handleShowRoom() {
                // this.isShow = true;
                this.$emit('showClick');
            },
            handleGoBack() {
                this.isShow = false;
            },
            handleUpdate() {// 下载
                window.location.href = '/api/project/tpl/house_villa_tpl.xls'
            },
            handleSuccess(response, file, fileList) {
                if( response.status === 200 ){
                    this.errList = [];
                    this.$message({
                        type: 'success',
                        message: '导入成功！'
                    })
                }else{
                    if( response.data ){
                        this.$message.error('导入有误，请检查！');
                        this.errList = [];
                        response.data.importHouseValidationDtos.map(item=>{
                            let msgList = [];
                            for( let key in item.validationResult.errorMsg ){
                                msgList.push(item.validationResult.errorMsg[key])
                            }
                            this.errList.push({
                                lineNum : item.lineNum,
                                msgList
                            })
                        })
                    }else{
                        this.$message.error(response.message)
                    }
                }
            },
            handleError(err, file, fileList) {
                this.$message.error(err)
            }
        },
        created() {
            console.log(this.val);
            this.upDateData.areaId = this.val.id;
        }
    }
</script>

<style scoped>
.showErrInfo{
    float: left; 
    width: 100%; 
    min-height: 100px; 
    border: 1px solid #e1e1e1; 
    margin: 10px 0 20px;
    color: #666;
    box-sizing: border-box;
    padding:10px;
}
</style>