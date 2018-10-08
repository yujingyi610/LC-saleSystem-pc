<template>
    <div>
        <el-dialog title="新增特殊折扣" :visible.sync="searchTicketFlag" append-to-body width="80%">
            <el-form>
                <el-form-item label="券号：">
                    <el-input v-model="searchValue" placeholder="请输入优惠券号"><i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch"></i></el-input>
                </el-form-item>
            </el-form>
            <el-table :data="table" border height="350" @row-click="handleChooseOne" style="width: 100%; margin-bottom: 20px">
                <el-table-column prop="ticketCode" label="优惠券号"></el-table-column>
                <el-table-column prop="companyName" label="发放公司"></el-table-column>
                <el-table-column prop="userRealName" label="姓名"></el-table-column>
                <el-table-column prop="remainAmount" label="可用金额"></el-table-column>
                <el-table-column prop="useAmount" label="使用金额">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.useAmount"></el-input>
                    </template>
                </el-table-column>
            </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="searchTicketFlag = false">取 消</el-button>
            <el-button type="primary" @click="handleChoose">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from "@/axios/api.js"
    export default {
        data() {
            return {
                searchTicketFlag: false,
                searchValue: '',// 搜索内容
                table: [],
                chooseOne: null
            }
        },
        methods: {
            show() {// 打开
                this.searchTicketFlag = true;
            },
            handleSearch() {// 搜索 
                let params = {
                    ticketCode: this.searchValue
                }
                axios.service({
                    url: '/api/finance/ticket/grant/getTicketByTicketCode',
                    method: 'get',
                    params
                }).then(res=>{
                    if( res.status === 200 ){
                        this.table = res.data.ticket;
                    }
                })
            },
            handleChooseOne(item) {// table中选中一项
                this.chooseOne = item;
            },
            handleChoose() {// 确定
                this.$emit('addTicket', this.chooseOne)
                this.searchTicketFlag = false;                
            }
        }
    }
</script>

<style scoped>

</style>