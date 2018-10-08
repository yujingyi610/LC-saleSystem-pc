<template>
	<div>
        <el-dialog :title="title" :visible.sync="infoDialogFlag" width="900px">
			<!-- 详细信息 -->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span class="title">详细信息</span>
                </div>
                <el-form :model="infoForm"  v-if="title === '已逾期'">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="房号:">{{infoForm.houseFullName}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="客户名称:">{{infoForm.customName}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="房款类型:">{{infoForm.paymentTypeName}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="应收日期:">{{infoForm.receivableDate}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="应收金额:">{{infoForm.receivableAmount}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="已收金额:">{{infoForm.receivedAmount}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="未收金额:">{{infoForm.unreceivedAmount}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="逾期措施:">{{infoForm.prosecution}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="逾期金额:">{{infoForm.OverdueAmount}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="逾期天数:">{{infoForm.OverdueDays}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="计划回笼日期:">{{infoForm.planRecycleDate}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="计划回笼金额:">{{infoForm.planRecycleAmount}}</el-form-item>
                        </el-col>
                        
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="处理人:">{{infoForm.updateUser}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            
                            <el-form-item label="处理日期:">{{infoForm.updateTime}}</el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-form :model="infoForm"  v-else-if="title === '已按揭详情'">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="房号:">{{infoForm.houseFullName}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="客户名称:">{{infoForm.customName}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="房款类型:">{{infoForm.paymentTypeName}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="应收日期:">{{infoForm.receivableDate}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="应收金额:">{{infoForm.receivableAmount}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="已收金额:">{{infoForm.receivedAmount}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="按揭进度:">{{infoForm.mortgageLoanstPlan}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="预计放款日期:">{{infoForm.planCreditDate}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        
                        <el-col :span="12">
                            <el-form-item label="贷款银行:">{{infoForm.loanBank}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="具体银行名称:">{{infoForm.loanBankSub}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="贷款期限:">{{infoForm.loanDuration}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="参考利率:">{{infoForm.loanRate}}</el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-form :model="infoForm"  v-else>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="房号:">{{infoForm.houseFullName}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="客户名称:">{{infoForm.customName}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="房款类型:">{{infoForm.paymentTypeName}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="应收日期:">{{infoForm.receivableDate}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="应收金额:">{{infoForm.receivableAmount}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="已收金额:">{{infoForm.amountReceived}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="未收金额:">{{infoForm.amountUnreceived}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="当时已收金额:">{{infoForm.receivableAmount}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="当时未收金额:">{{infoForm.unreceivedAmount}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="起诉措施:">{{infoForm.prosecution}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="逾期金额:">{{infoForm.OverdueAmount}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="逾期天数:">{{infoForm.OverdueDays}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="处理人:">{{infoForm.updateUser}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="处理日期:">{{infoForm.updateTime}}</el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
			<span slot="footer" class="dialog-footer">
				<el-button type="success" @click="infoDialogFlag = false">确定</el-button>
			</span>
		</el-dialog>
		
	</div>
</template>

<script>
// import {  } from "@/api/pages/mainPage/financialManagement/receivable";
export default {
  watch: {},
  data() {
    return {
        infoDialogFlag: false,
        title: '',
        infoForm: {
            houseFullName: '',//房号
            customName: '',// 客户名称
            paymentTypeName: '',// 房款类型
            signDate: '',// 签约日期
            receivableAmount: '',// 应收金额
            receivableDate: '',// 应收日期
            contractAmount: '',// 合同金额
            receivedAmount: '',// 已收金额
            unreceivedAmount: '',// 未收金额
            nearestReceivableDate: '',// 上次计划回笼日期
            OverdueAmount: '',// 逾期金额
            OverdueDays: '',// 逾期天数
            planRecycleDate: '',// 计划回笼日期
            planRecycleAmount: '',// 计划回笼金额
            updateUser: '',// 处理人
            updateTime: '',// 处理时间
            prosecution: '',// 处理措施
            amountUnreceived: '',
            amountReceived: ''
        }
    };
  },
  methods: {
    show(info, title) {
        console.log(info)
        if( info ){
            this.infoForm = {// 应收款信息
                houseFullName: '',//房号
                customName: '',// 客户名称
                paymentTypeName: '',// 房款类型
                signDate: '',// 签约日期
                receivableAmount: '',// 应收金额
                receivableDate: '',// 应收日期
                receivedAmount: '',// 已收金额
                unreceivedAmount: '',// 未收金额
                OverdueAmount: '',// 逾期金额
                OverdueDays: '',// 逾期天数
                planRecycleDate: '',// 计划回笼日期
                planRecycleAmount: '',// 计划回笼金额
                updateUser: '',// 处理人
                updateTime: '',// 处理时间
                prosecution: '',// 处理措施
                amountUnreceived: '',
                amountReceived: ''

            }
            this.infoForm.houseFullName = info.finBalanceForm.houseFullName;// 房号
            this.infoForm.customName = info.customName;// 客户姓名
            this.infoForm.paymentTypeName = info.finPaymentPlan.paymentTypeName;// 房款类型
            this.infoForm.receivableAmount = info.finPaymentPlan.receivableAmount;// 应收金额
            this.infoForm.receivableDate = info.finPaymentPlan.receivableDate;// 应收日期
            this.infoForm.receivedAmount = info.finPaymentPlan.receivedAmount;// 已收金额
            this.infoForm.unreceivedAmount = info.finPaymentPlan.unreceivedAmount;// 未收金额
            this.infoForm.updateUser = info.finBalanceForm.updateUser;// 处理人
            this.infoForm.updateTime = info.finBalanceForm.updateTime;// 处理时间

            let day = parseInt((new Date() - new Date(info.finPaymentPlan.receivableDate))/(1000*60*60*24))
            if( day > 0 ){
                this.infoForm.OverdueDays = day;// 逾期天数
                this.infoForm.OverdueAmount = info.finReceivableForm&&info.finReceivableForm.OverdueAmount?info.finReceivableForm.OverdueAmount:info.finPaymentPlan.unreceivedAmount;// 逾期金额
            }else{
                this.infoForm.OverdueDays = 0;// 逾期天数
                this.infoForm.OverdueAmount = 0;// 逾期金额
            }
            // 逾期信息
            if( info.finReceivablePlanOverdue ){
                this.infoForm.planRecycleDate = info.finReceivablePlanOverdue.planRecycleDate;// 计划回笼时间
                this.infoForm.planRecycleAmount = info.finReceivablePlanOverdue.planRecycleAmount;// 计划回笼金额
                this.infoForm.updateUser = info.finReceivablePlanOverdue.updateUser;// 处理人
                this.infoForm.updateTime = info.finReceivablePlanOverdue.updateTime;// 处理时间
            }
            if( info.finReceivableForm && info.finReceivableForm.prosecutionState === 2 ) {
                this.infoForm.prosecution = '已撤诉'
            }else if( info.finReceivablePlan ){
                if( info.finReceivablePlan.dealOverdueStatus === 0 ){
                    this.infoForm.prosecution = '未延期'
                }else if( info.finReceivablePlan.dealOverdueStatus === 1 ){
                    this.infoForm.prosecution = '已延期'
                }
            }
            // 起诉信息
            if( info.finReceivableProsecute ){
                this.infoForm.amountReceived = info.finReceivableProsecute.amountReceived;// 已收金额
                this.infoForm.amountUnreceived = info.finReceivableProsecute.amountUnreceived;// 未收金额
                this.infoForm.prosecution = info.finReceivableProsecute.nolleDate?'已撤诉':'已起诉';
                this.infoForm.updateUser = info.finReceivableProsecute.updateUser;// 处理人
                this.infoForm.updateTime = info.finReceivableProsecute.updateTime;// 处理时间
            }
            // if( info.finReceivableForm) {
            //     if( info.finReceivableForm.prosecutionState === 2  ){
            //         this.infoForm.prosecution = '已撤诉'
            //     }else if( info.finReceivableForm.prosecutionState === 1  ){
            //         this.infoForm.prosecution = '已起诉'
            //     }else if( info.finReceivableForm.prosecutionState === 0  ){
            //         this.infoForm.prosecution = '未办理'
            //     }
                
            // }
            if( title === '已按揭详情' ){
                if( info.finReceivablePlanMortgage ){
                    this.infoForm.mortgageLoanstPlan = info.finReceivablePlanMortgage.mortgageLoanstPlan;// 按揭进度
                    this.infoForm.loanDuration = info.finReceivablePlanMortgage.loanDuration;// 贷款期限
                    this.infoForm.loanBank = info.finReceivablePlanMortgage.loanBank;// 贷款银行
                    this.infoForm.loanBankSub = info.finReceivablePlanMortgage.loanBankSub;// 贷款支行
                    this.infoForm.loanRate = info.finReceivablePlanMortgage.loanRate;// 贷款参考利率
                    this.infoForm.planCreditDate = info.finReceivablePlanMortgage.planCreditDate;// 预计放款日期
                    this.infoForm.loanBankSub = info.finReceivablePlanMortgage.loanBankSub;// 贷款支行
                }
            }
            this.title = title;
            this.infoDialogFlag = true;
        }
    }
  }
};
</script>

<style scoped>
</style>