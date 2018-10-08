<template>
	<div>
		<!-- 应收处理弹框 -->
		<el-dialog title="应收处理" :visible.sync="Flag" width="1000px" v-if="Flag">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span class="title">应收款信息</span>
				</div>
				<el-form :model="receivableForm">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="房号:">{{receivableForm.houseFullName}}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="客户名称:">{{receivableForm.customName}}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="房款类型:">{{receivableForm.paymentTypeName}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="签约日期:">{{receivableForm.signDate}}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="应收金额:">{{receivableForm.receivableAmount}}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="应收日期:">{{receivableForm.receivableDate}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="合同金额:">{{receivableForm.contractAmount}}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="已收金额:">{{receivableForm.receivedAmount}}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="未收金额:">{{receivableForm.unreceivedAmount}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="上次计划回笼日期:">{{receivableForm.nearestReceivableDate}}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="逾期金额:">{{receivableForm.OverdueAmount}}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="逾期天数:">{{receivableForm.OverdueDays}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        
                        <el-col :span="8">
                            <el-form-item label="是否网签:">
                                <el-switch v-model="receivableForm.netSignFlag" active-color="#4DBE61" disabled></el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="!receivableForm.netSignFlag">
                            <el-form-item label="未网签原因:">{{receivableForm.noNetSignReason}}</el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
			</el-card>
            <el-card class="box-card">
				<div slot="header" class="clearfix">
					<span class="title">应收盘点</span>
				</div>
				<el-form :model="receivableForm">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="计划回笼日期:">
                                <el-date-picker v-model="receivableForm.planRecycleDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" disabled></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="计划回笼金额:">{{receivableForm.planRecycleAmount}}</el-form-item>
                        </el-col>
                        
                    </el-row>
                    <el-form-item label="备注说明:">{{receivableForm.remark}}</el-form-item>
                </el-form>
			</el-card>
            <el-card class="box-card" v-show="receivableForm.OverdueDays > 0">
				<div slot="header" class="clearfix">
					<span class="title">逾期信息</span>
				</div>
				<el-form :model="overdueForm">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="逾期原因:">{{overdueForm.receivableCause}}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="计划回笼日期:">{{receivableForm.planRecycleDate}}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="计划回笼金额:">{{receivableForm.planRecycleAmount}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="客户分类:">{{overdueForm.customType}}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="合同风险分类:">{{overdueForm.contractRiskType}}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="合同类型:">{{overdueForm.contractType}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="工程进度放款限制:">{{overdueForm.completeRegistration}}</el-form-item>
                    <el-form-item label="备注说明:">{{receivableForm.remark}}</el-form-item>
                </el-form>
			</el-card>
            <el-card class="box-card" v-show="showMortgage">
				<div slot="header" class="clearfix">
					<span class="title">按揭信息</span>
				</div>
				<el-form :model="MortgageForm">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="按揭进度:">{{MortgageForm.mortgageLoanstPlan}}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="计划完成日期:">
                                <el-date-picker v-model="MortgageForm.mortgageLoanstFinishDate" type="date" placeholder="选择日期" disabled></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="贷款期限:">{{MortgageForm.loanDuration}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="贷款银行:">{{MortgageForm.loanBank.length > 0?MortgageForm.loanBank[0]:''}}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="银行具体名称:">{{MortgageForm.loanBank.length > 0?MortgageForm.loanBank[1]:''}}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="贷款参考利率:">{{MortgageForm.loanRate}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="情况说明:">{{MortgageForm.mortgageLoanstState}}</el-form-item>
                </el-form>
			</el-card>
            <el-card class="box-card" v-show="showICBC">
				<div slot="header" class="clearfix">
					<span class="title">工行信息</span>
				</div>
				<el-form :model="ICBCForm">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="进度状态:">{{ICBCForm.hosueFullName}}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="贷款金额:">{{ICBCForm.hosueFullName}}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="贷款期限:">{{ICBCForm.hosueFullName}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="利率浮动类型:">{{ICBCForm.hosueFullName}}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="利率浮动值:">{{ICBCForm.hosueFullName}}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="还款方式:">{{ICBCForm.hosueFullName}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="当前状态更新时间:">{{ICBCForm.hosueFullName}}</el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
			</el-card>
			<span slot="footer" class="dialog-footer">
				<el-button type="success" @click="Flag = false">确定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
    data() {
        return {
            Flag: false,
            receivableForm: {// 应收款信息
                hosueFullName: '',//房号
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
                netSignFlag: false,// 是否网签
                noNetSignReason: '',// 未网签原因
                planRecycleDate: '',// 计划回笼日期
                planRecycleAmount: '',// 计划回笼金额
                remark: '',// 应收备注
            },
            overdueForm: {// 预期信息
                receivableCause: '',// 逾期原因
                customType: '',// 客户分类
                contractRiskType: '',// 合同风险分类
                contractType: '',// 合同类型
                completeRegistration: '',// 工程进度放款限制
                planRecycleAmount: '',// 计划回笼金额
                planRecycleDate:'',// 计划回笼日期
                remark: '',// 逾期备注
            },
            MortgageForm: {// 按揭信息
                mortgageLoanstPlan: '',// 按揭进度
                loanBank: [],// 贷款银行
                loanBankSub: '',// 银行具体名称
                loanDuration: '',// 贷款期限
                loanRate: '',// 贷款参考利率
                mortgageLoanstFinishDate:'',// 计划完成日期
                planCreditDate:'',// 预计放款日期
                mortgageLoanstState:'',// 情况说明
            },
            ICBCForm: {// 工行信息
                hosueFullName: 'aaaaaa',
            },
            showMortgage: false,// 是否展示按揭信息
            showICBC: false,// 是否展示工行
        };
    },
    methods: {
        show(info) {
            this.receivableForm = {// 应收款信息
                hosueFullName: '',//房号
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
                netSignFlag: false,// 是否网签
                noNetSignReason: '',// 未网签原因
                planRecycleDate: '',// 计划回笼日期
                planRecycleAmount: '',// 计划回笼金额
                remark: '',// 应收备注
            }
            this.overdueForm = {// 预期信息
                receivableCause: '',// 逾期原因
                customType: '',// 客户分类
                contractRiskType: '',// 合同风险分类
                contractType: '',// 合同类型
                completeRegistration: '',// 工程进度放款限制
                planRecycleAmount: '',// 计划回笼金额
                planRecycleDate:'',// 计划回笼日期
                remark: '',// 逾期备注
            }
            this.MortgageForm = {// 按揭信息
                mortgageLoanstPlan: '',// 按揭进度
                loanBank: [],// 贷款银行
                loanBankSub: '',// 银行具体名称
                loanDuration: '',// 贷款期限
                loanRate: '',// 贷款参考利率
                mortgageLoanstFinishDate:'',// 计划完成日期
                planCreditDate:'',// 预计放款日期
                mortgageLoanstState:'',// 情况说明
            }
            if( info ){
                if( !info.trdSignForm ){
                    this.$message.error('未找到该签约单！');
                    return
                }
                console.log(info)
                // this.showMortgage = true;
                if( info.finPaymentPlan ){
                    this.showMortgage = info.finPaymentPlan.paymentItemName === '公积金' || info.finPaymentPlan.paymentItemName === '按揭款'
                }

                this.receivableForm.houseFullName = info.finBalanceForm.houseFullName;// 房号
                this.receivableForm.customName = info.customName;// 客户姓名
                this.receivableForm.paymentTypeName = info.finPaymentPlan.paymentTypeName;// 房款类型
                this.receivableForm.signDate = info.trdSignForm.signDate;// 签约日期
                this.receivableForm.receivableAmount = info.finPaymentPlan.receivableAmount;// 应收金额
                this.receivableForm.receivableDate = info.finPaymentPlan.receivableDate;// 应收日期
                this.receivableForm.contractAmount = info.trdSignForm.contractAmount;// 合同金额
                this.receivableForm.receivedAmount = info.finPaymentPlan.receivedAmount;// 已收金额
                this.receivableForm.unreceivedAmount = info.finPaymentPlan.unreceivedAmount;// 未收金额
                this.receivableForm.nearestReceivableDate = info.finBalanceForm.nearestReceivableDate;// 上次计划回笼日期

                let day = parseInt((new Date() - new Date(info.finPaymentPlan.receivableDate))/(1000*60*60*24))
                if( day > 0 ){
                    this.receivableForm.OverdueDays = day;// 逾期天数
                    this.receivableForm.OverdueAmount = info.finReceivableForm&&info.finReceivableForm.OverdueAmount?info.finReceivableForm.OverdueAmount:info.finPaymentPlan.unreceivedAmount;// 逾期金额
                }else{
                    this.receivableForm.OverdueDays = 0;// 逾期天数
                    this.receivableForm.OverdueAmount = 0;// 逾期金额
                }
                
                this.receivableForm.netSignFlag = info.trdSignForm.netSignFlag?true:false;// 是否网签
                this.receivableForm.noNetSignReason = info.trdSignForm.noNetSignReason;// 未网签原因

                this.receivableForm.devstagesId = info.finBalanceForm.devstagesId;// 分期id
                
                // 逾期信息
                if( info.finReceivablePlanOverdue ){
                    this.receivableForm.planRecycleDate = info.finReceivablePlanOverdue.planRecycleDate;// 计划回笼时间
                    this.receivableForm.planRecycleAmount = info.finReceivablePlanOverdue.planRecycleAmount;// 计划回笼金额
                    this.overdueForm.receivableCause = info.finReceivablePlanOverdue.receivableCause;// 逾期原因
                    this.receivableForm.remark = info.finReceivablePlanOverdue.remark;// 逾期备注/应收备注
                }
                if( info.finReceivableForm ){
                    this.overdueForm.completeRegistration = info.finReceivableForm.completeRegistration;// 工程进度放款限制
                    this.overdueForm.contractRiskType = info.finReceivableForm.contractRiskType;// 合同风险分类
                    this.overdueForm.contractType = info.finReceivableForm.contractType;// 合同类型
                    this.overdueForm.customType = info.finReceivableForm.customType;// 客户分类
                }
                // 按揭信息
                if( info.finReceivablePlanMortgage ){
                    this.MortgageForm.mortgageLoanstPlan = info.finReceivablePlanMortgage.mortgageLoanstPlan;
                    this.MortgageForm.loanBank = [info.finReceivablePlanMortgage.loanBank, info.finReceivablePlanMortgage.loanBankSub];
                    this.MortgageForm.loanDuration = info.finReceivablePlanMortgage.loanDuration;
                    this.MortgageForm.loanRate = info.finReceivablePlanMortgage.loanRate;
                    this.MortgageForm.mortgageLoanstFinishDate = info.finReceivablePlanMortgage.mortgageLoanstFinishDate;
                    this.MortgageForm.planCreditDate = info.finReceivablePlanMortgage.planCreditDate;
                    this.MortgageForm.mortgageLoanstState = info.finReceivablePlanMortgage.mortgageLoanstState;
                }
            }
            this.Flag = true;
        },
    }
};
</script>

<style scoped>

</style>