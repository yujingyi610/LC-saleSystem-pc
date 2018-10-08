<template>
	<div>
		<!-- 应收处理弹框 -->
		<el-dialog title="应收处理" :visible.sync="Flag" width="1100px" v-if="Flag">
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
                                <el-date-picker v-model="receivableForm.planRecycleDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="计划回笼金额:">
                                <el-input v-model="receivableForm.planRecycleAmount"></el-input>
                            </el-form-item>
                        </el-col>
                        
                    </el-row>
                    <el-form-item label="备注说明:">
                        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="receivableForm.remark"></el-input>
                    </el-form-item>
                </el-form>
			</el-card>
            <el-card class="box-card" v-show="receivableForm.OverdueDays > 0">
				<div slot="header" class="clearfix">
					<span class="title">逾期信息</span>
				</div>
				<el-form :model="overdueForm">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="逾期原因:">
                                <el-select v-model="overdueForm.receivableCause">
                                    <el-option v-for="(item, index) in reasonOption" :key="index" :label="item.itemValue" :value="item.itemValue"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="计划回笼日期:">
                                <el-date-picker v-model="receivableForm.planRecycleDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="计划回笼金额:">
                                <el-input v-model="receivableForm.planRecycleAmount"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="客户分类:">
                                <el-select v-model="overdueForm.customType">
                                    <el-option v-for="(item, index) in CustomClassOption" :key="index" :label="item.itemValue" :value="item.itemValue"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="合同风险分类:">
                                <el-select v-model="overdueForm.contractRiskType">
                                    <el-option v-for="(item, index) in ContractRiskClassificationOption" :key="index" :label="item.itemValue" :value="item.itemValue"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="合同类型:">
                                <el-select v-model="overdueForm.contractType">
                                    <el-option v-for="(item, index) in ContractTypeOption" :key="index" :label="item.itemValue" :value="item.itemValue"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="工程进度放款限制:">
                        <el-select v-model="overdueForm.completeRegistration">
                            <el-option v-for="(item, index) in ProjectProgressLoanLimitsOption" :key="index" :label="item.itemValue" :value="item.itemValue"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注说明:">
                        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="receivableForm.remark"></el-input>
                    </el-form-item>
                </el-form>
			</el-card>
            <el-card class="box-card" v-show="showMortgage">
				<div slot="header" class="clearfix">
					<span class="title">按揭信息</span>
				</div>
				<el-form :model="MortgageForm">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="按揭进度:">
                                <el-select v-model="MortgageForm.mortgageLoanstPlan">
                                    <el-option v-for="(item, index) in MortgageProgressOption" :key="index" :label="item.itemValue" :value="item.itemValue"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="计划完成日期:">
                                <el-date-picker v-model="MortgageForm.mortgageLoanstFinishDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="贷款期限:">
                                <el-input v-model="MortgageForm.loanDuration" @change="handleNum"><i slot="suffix" class="el-input__icon" style="font-style: normal">月</i></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="贷款银行:">
                                <el-cascader :options="bankOption"  v-model="MortgageForm.loanBank" :props='props'></el-cascader>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="8">
                            <el-form-item label="银行具体名称:">
                                <el-select v-model="MortgageForm.loanBankSub">
                                    <el-option v-for="(item, index) in BranchBankOption" :key="index" :label="item.bankName" :value="item.bankName"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="8">
                            <el-form-item label="贷款参考利率(基准*):">
                                <el-input  v-model="MortgageForm.loanRate" @change="handleNum2" :maxlength='4'></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="预计放款日期:">
                                <el-date-picker v-model="MortgageForm.planCreditDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    
                    <el-form-item label="情况说明:">
                        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="MortgageForm.mortgageLoanstState"></el-input>
                    </el-form-item>
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
				<el-button type="success" @click="handleSave">保存</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import {
        getOverdueReason, 
        getLoanPeriod, 
        getMortgageProgress, 
        getProjectProgressLoanLimits, 
        getContractRiskClassification, 
        getContractTypes, 
        getCustomClass, 
        getLoanReferenceRate,
        receivableCheck
    } from '@/api/pages/mainPage/financialManagement/receivable'
import {getBank} from '@/api/pages/mainPage/transactionManagement/contractManagement'
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
            reasonOption: [],// 逾期原因下拉数据
            LoanPeriodOption: [],// 贷款期限下拉数据
            MortgageProgressOption: [],// 按揭进度下拉数据
            ProjectProgressLoanLimitsOption: [],// 工程进度放款限制下拉数据
            CustomClassOption: [],// 客户分类下拉数据
            ContractRiskClassificationOption: [],// 合同风险分类下拉数据
            ContractTypeOption: [],// 合同类型下拉数据
            LoanReferenceRateOption: [],// 贷款参考利率下拉数据
            bankOption: [],// 主行下拉数据
            BranchBankOption: [],// 支行下拉数据
            paymentId: '',
            balanceId: '',
            showMortgage: false,// 是否展示按揭信息
            showICBC: false,// 是否展示工行
            props: {
                value: 'name',
                label: 'name'
            }
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
                this.balanceId = info.finBalanceForm.id;
                this.paymentId = info.finPaymentPlan.id;
                // 逾期信息
                // if( info.finReceivablePlanOverdue ){
                //     this.receivableForm.planRecycleDate = info.finReceivablePlanOverdue.planRecycleDate;// 计划回笼时间
                    // this.receivableForm.planRecycleAmount = info.finReceivablePlanOverdue.planRecycleAmount;// 计划回笼金额
                    // this.overdueForm.receivableCause = info.finReceivablePlanOverdue.receivableCause;// 逾期原因
                //     this.receivableForm.remark = info.finReceivablePlanOverdue.remark;// 逾期备注/应收备注
                // }
                // if( info.finReceivableForm ){
                //     this.overdueForm.completeRegistration = info.finReceivableForm.completeRegistration;// 工程进度放款限制
                //     this.overdueForm.contractRiskType = info.finReceivableForm.contractRiskType;// 合同风险分类
                //     this.overdueForm.contractType = info.finReceivableForm.contractType;// 合同类型
                //     this.overdueForm.customType = info.finReceivableForm.customType;// 客户分类
                // }
                // // 按揭信息
                // if( info.finReceivablePlanMortgage ){
                //     this.MortgageForm.mortgageLoanstPlan = info.finReceivablePlanMortgage.mortgageLoanstPlan;
                //     this.MortgageForm.loanBank = [info.finReceivablePlanMortgage.loanBank, info.finReceivablePlanMortgage.loanBankSub];
                //     this.MortgageForm.loanDuration = info.finReceivablePlanMortgage.loanDuration;
                //     this.MortgageForm.loanRate = info.finReceivablePlanMortgage.loanRate;
                //     this.MortgageForm.mortgageLoanstFinishDate = info.finReceivablePlanMortgage.mortgageLoanstFinishDate;
                //     this.MortgageForm.planCreditDate = info.finReceivablePlanMortgage.planCreditDate;
                //     this.MortgageForm.mortgageLoanstState = info.finReceivablePlanMortgage.mortgageLoanstState;
                // }
            }
            this.Flag = true;
            this.handlegetOverdueReason();
            this.handlegetLoanPeriod();
            this.handlegetMortgageProgress();
            this.handlegetProjectProgressLoanLimits();
            this.handlegetCustomClass();
            this.handlegetContractRiskClassification();
            this.handlegetContractTypes();
            this.handlegetLoanReferenceRate()
            this.handlegetBank();
        },
        handlegetOverdueReason() {// 获取逾期原因
            getOverdueReason().then(res=>{
                if( res.status === 200 ){
                    this.reasonOption = res.data;
                }
            })
        },
        handlegetLoanPeriod() {//获取贷款期限
            getLoanPeriod().then(res=>{
                if( res.status === 200 ){
                    this.LoanPeriodOption = res.data;
                }
            })
        },
        handlegetMortgageProgress() {//获取按揭进度
            getMortgageProgress().then(res=>{
                if( res.status === 200 ){
                    this.MortgageProgressOption = res.data;
                }
            })
        },
        handlegetProjectProgressLoanLimits() {//获取工程进度放款限制
            getProjectProgressLoanLimits().then(res=>{
                if( res.status === 200 ){
                    this.ProjectProgressLoanLimitsOption = res.data;
                }
            })
        },
        handlegetCustomClass() {//获取客户分类
            getCustomClass().then(res=>{
                if( res.status === 200 ){
                    this.CustomClassOption = res.data;
                }
            })
        },
        handlegetContractRiskClassification() {//获取合同风险分类
            getContractRiskClassification().then(res=>{
                if( res.status === 200 ){
                    this.ContractRiskClassificationOption = res.data;
                }
            })
        },
        handlegetContractTypes() {//获取合同类型
            getContractTypes().then(res=>{
                if( res.status === 200 ){
                    this.ContractTypeOption = res.data;
                }
            })
        },
        handlegetLoanReferenceRate() {//获取贷款参考利率
            getLoanReferenceRate().then(res=>{
                if( res.status === 200 ){
                    this.LoanReferenceRateOption = res.data;
                }
            })
        },
        handlegetBank() {// 获取银行数据
            this.bankOption = [];
            let params = new URLSearchParams();
            params.append('devstagesId', this.receivableForm.devstagesId);

            getBank(params).then(res=>{
                 
                if( res.status === 200 ){
                    if( res.data && res.data.length > 0 ){
                        res.data.map(item=>{
                            if( item.name.indexOf('工商银行') == -1 ){
                                this.bankOption.push(item)
                            }
                        })
                    }
                    // this.bankOption = res.data;
                }else{
                    this.$message.error(res.message)
                }
            })
        },
        handleBranchBank(params) {// 获取支行数据
            this.BranchBankOption = [];
            getBankList(params).then(res=>{
                 
                if( res.status === 200 ){
                    this.BranchBankOption = res.data;
                }else{
                    this.$message.error(res.message)
                }
            })
        },
        handleNum() {// 判断贷款期限是否为正整数
            this.MortgageForm.loanDuration = parseInt(this.MortgageForm.loanDuration)
            if( isNaN(this.MortgageForm.loanDuration) || this.MortgageForm.loanDuration < 1  ){
                this.$message.error('贷款期限必须为正整数！')
                this.MortgageForm.loanDuration = 1;
            }else if( this.MortgageForm.loanDuration > 360 ){
                this.$message.error('贷款期限不得大于360个月！')
                this.MortgageForm.loanDuration = 360;
            }
        },
        handleNum2() {// 判断贷款参考利率
            this.MortgageForm.loanRate = Number(this.MortgageForm.loanRate)
            if( isNaN(this.MortgageForm.loanRate) || this.MortgageForm.loanRate < 0  ){
                this.$message.error('贷款参考利率必须为正数！')
                this.MortgageForm.loanRate = 0.01;
            }
            this.MortgageForm.loanRate = (this.MortgageForm.loanRate).toFixed(2)
        },
        handleSave() {// 保存
            let data = {
                receivableAmount: this.receivableForm.OverdueAmount,// 逾期金额
                receivableDays: this.receivableForm.OverdueDays,// 逾期天数
                receivableCause: this.overdueForm.receivableCause,// 逾期原因
                remark: this.receivableForm.remark,// 逾期备注/应收备注
                planRecycleDate: this.receivableForm.planRecycleDate,// 计划回笼时间
                planRecycleAmount: this.receivableForm.planRecycleAmount,// 计划回笼金额
                customType: this.overdueForm.customType,// 客户分类
                contractRiskType: this.overdueForm.contractRiskType,// 合同风险分类
                contractType: this.overdueForm.contractType,// 合同类型
                completeRegistration: this.overdueForm.completeRegistration,// 工程进度放款限制
                mortgageLoanstPlan: this.MortgageForm.mortgageLoanstPlan,// 当前按揭办理进度
                mortgageLoanstState: this.MortgageForm.mortgageLoanstState,// 按揭说明
                mortgageLoanstFinishDate: this.MortgageForm.mortgageLoanstFinishDate,// 按揭进度完成时间
                planCreditDate: this.MortgageForm.planCreditDate,// 预计放款时间
                loanRate: this.MortgageForm.loanRate,// 贷款利率
                
                loanDuration: this.MortgageForm.loanDuration,// 贷款期限
                paymentId: this.paymentId,
                balanceId: this.balanceId,
                
            }
            if( this.MortgageForm.loanBank.length > 0 ){
                data.loanBank = this.MortgageForm.loanBank[0]// 贷款银行
                data.loanBankSub = this.MortgageForm.loanBank[1]// 贷款支行
            }
            console.log(data)
            data = this.Qs.stringify(data)
            receivableCheck(data).then(res=>{
                if( res.status === 200 ){
                    this.$message.success('保存成功！')
                    this.Flag = false;
                    this.$emit('update')
                }else{
                    this.$message.error(res.message)
                }
            })
            
        }
    }
};
</script>

<style scoped>

</style>