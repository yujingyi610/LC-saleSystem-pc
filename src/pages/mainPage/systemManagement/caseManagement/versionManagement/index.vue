<template>
    <div class="ver">
        <el-card>
            <div slot="header" class="clearfix">
                <span>版本修改</span>
                <div style="float: right">
                    <el-button type="success" @click="submitForm('form')">保存</el-button>
                </div>
            </div>
            <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                <el-form-item label="版本：" prop="version">
                    <el-input v-model="form.version"></el-input>
                </el-form-item>
                <el-form-item label="下载地址：" prop="downLoadUrl">
                    <el-input v-model="form.downLoadUrl"></el-input>
                </el-form-item>
                <el-form-item label="提示信息：" prop="msg">
                    <el-input v-model="form.msg"></el-input>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import {getIpadVersion, updateIpadVersion} from '@/api/pages/mainPage/systemManagement/caseManagement/index.js'
    export default {
        data() {
            return{
                form: {},
                rules: {
                    version: [
                        { required: true, message: '请填写版本号', trigger: 'blur' }
                    ],
                    downLoadUrl: [
                        { required: true, message: '请填写下载地址', trigger: 'blur' }
                    ],
                    msg: [
                        { required: true, message: '请填写提示信息', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handlegetIpadVersion() {// 获取版本信息
                getIpadVersion().then(res=>{
                     
                    if( res.status === 200 ){
                        if( res.data ){
                            this.form = res.data
                        }else{
                            this.$message.error('未查到版本信息！')
                        }
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.handleupdateIpadVersion()
                } else {
                    // console.log('error submit!!');
                    return false;
                }
                });
            },
            handleupdateIpadVersion() {// 编辑版本信息
                this.form.id = this.form.versionId;
                this.form.versionId = null;
                updateIpadVersion(this.form).then(res=>{
                     
                    if( res.status === 200 ){
                        this.$message.success('保存成功！')
                        this.handlegetIpadVersion()
                    }else{
                        this.$message.error(res.message)
                    }
                })
            }
        },
        created() {
            this.handlegetIpadVersion()
        }
    }
</script>

<style scoped>
.ver{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /* background: #fff; */
    padding: 20px;
    box-sizing: border-box;
    border-radius: 4px;
}
</style>