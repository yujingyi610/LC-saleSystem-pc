<template>
    <div>
        <el-dialog title="请选择用户" :visible.sync="dialogVisible" width="1000px" append-to-body>
            <el-form :inline="true">
                <el-form-item label="客户姓名">
                    <el-input v-model="customName"></el-input>
                </el-form-item>
                <el-form-item label="客户手机号">
                    <el-input v-model="mobile"></el-input>
                </el-form-item>
                <el-form-item label="客户证件号">
                    <el-input v-model="certificateNo"></el-input>
                </el-form-item>
                <el-button type="success" @click="handlegetCustomerInfo">查找</el-button>
            </el-form>
            <el-table :data="tableData" style="width: 100%" highlight-current-row @current-change="handleChooseOne">
                <el-table-column prop="customName" label="客户姓名"></el-table-column>
                <el-table-column prop="customMobile" label="客户手机号"></el-table-column>
                <el-table-column prop="certificateNo" label="客户证件号"></el-table-column>
            </el-table>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[10, 20]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {getCustomerInfo} from '@/api/pages/mainPage/transactionManagement/fromTheManagement/index.js'
    export default {
        data() {
            return{
                dialogVisible: false,
                customName: '',
                mobile: '',
                certificateNo: '',

                tableData: [],
                total: 0,
                pageNum: 1,
                pageSize: 10,

                projectId: null,
                currentRow: []
            }
        },
        methods: {
            show(projectId) {
                this.projectId = projectId;
                this.customName = '';
                this.mobile = '';
                this.certificateNo = '';
                this.tableData = [];
                this.total = 0;
                this.pageNum = 1;
                this.pageSize = 10;
                this.dialogVisible = true;
                // this.handlegetCustomerInfo()
            },
            handlegetCustomerInfo() {// 根据客户姓名、手机号、证件号获取客户列表
                if( !this.customName && !this.mobile && !this.certificateNo ){
                    this.$message.error('请先输入搜索项！');
                    return
                }
                let params = new URLSearchParams();
                params.append('projectId', this.projectId);
                params.append('pageNum', this.pageNum);
                params.append('pageSize', this.pageSize);
                params.append('customName', this.customName);
                params.append('mobile', this.mobile);
                params.append('certificateNo', this.certificateNo);
                getCustomerInfo(params).then(res=>{
                    if( res.status === 200 ){
                        if( !res.data.list[0] ){
                            this.$message({
                                type: 'warning',
                                message: '未查到数据，请确认后重新查找！'
                            })
                        }
                        this.tableData = res.data.list;
                        this.total = res.data.total;
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            handleChooseOne(val) {
                this.currentRow = val;
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.handlegetCustomerInfo()
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                this.handlegetCustomerInfo()
            },
            handleConfirm() {
                this.$emit('chooseCustom', this.currentRow)
                this.dialogVisible = false;
            }
        }
    }
</script>

<style scoped>

</style>