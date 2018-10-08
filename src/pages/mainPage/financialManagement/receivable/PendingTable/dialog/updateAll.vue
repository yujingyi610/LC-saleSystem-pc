<template>
	<div>
		<!-- 批量更新弹框 -->
		<el-dialog :visible.sync="Flag" width="900px" v-if="Flag">
			<span slot="title" class="dialog-footer">
				<span style="font-size: 14px">批量更新</span>
                <div style="float: right; margin: -5px 30px 0 0;">
                    <el-button type="success" @click="handleUpdate">下载模板</el-button>
                </div>
			</span>
            <div class="text item">
                <el-upload
                class="upload-demo"
                ref="upload"
                action="/zuul/api/finance/receivable/importExcel"
                :multiple="false"
                :limit="1"
                :file-list="fileList"
                :on-success="handleSuccess"
                :on-error="handleError"
                name="file"
                :auto-upload="false">
                <el-button slot="trigger" type="primary">选取文件</el-button>
                <el-button style="float: right;" type="success" @click="submitUpload">导入更新</el-button>
                </el-upload>
            </div>
            <!-- <el-card class="box-card space_bottom"> -->
                <div>
                    <span class="resultTitle">导入更新结果信息：</span>
                    <span class="showErrInfo">{{errList}}
                        <!-- <span v-for="(item, index) in errList" :key="index">
                            <span>第{{item.lineNum}}行：</span>
                            <span v-for="(item2, index2) in item.msgList" :key="index2">
                                {{item2}}
                            </span>
                            <br />
                        </span> -->
                    </span>
                </div>
            <!-- </el-card> -->
			<span slot="footer" class="dialog-footer">
				<el-button type="success" @click="handleSave" :disabled="errList?true:false">完成</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { exportExcel } from "@/api/pages/mainPage/financialManagement/receivable";
export default {
  watch: {},
  data() {
    return {
        Flag: false,
        fileList: [],
        upDateData: {
            file: 'xls'
        },
        errList: null,
        params: null
    };
  },
  methods: {
    show(params) {
        this.fileList = [];
        this.errList = null;
        this.params = params;
      this.Flag = true;
    },
    submitUpload() {
        this.$refs.upload.submit();
    },
    handleUpdate() {// 下载
        
        exportExcel(this.params).then(res=>{
            // console.log(res)
            // 创建隐藏的可下载链接
            var eleLink = document.createElement('a');
            eleLink.download = 'template.xls';
            eleLink.style.display = 'none';
            // 字符内容转变成blob地址
            var blob = new Blob([res]);
            eleLink.href = URL.createObjectURL(blob);
            console.log(eleLink.href)
            // 触发点击
            document.body.appendChild(eleLink);
            eleLink.click();
            // 然后移除
            document.body.removeChild(eleLink);
        })
    },
    handleSuccess(response, file, fileList) {
        if( response.status === 200 ){
            this.errList = '';
            this.$message({
                type: 'success',
                message: '导入成功！'
            })
        }else{
            this.$message.error('导入有误，请检查！');
            console.log(response)
            this.errList = response.message
        }
    },
    handleError(err, file, fileList) {
        this.$message.error(err)
    },
    handleSave() {
      // 保存
      this.Flag = false;
      this.$emit('update')
    }
  }
};
</script>

<style scoped>
.resultTitle{
    font-size: 12px;
}
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