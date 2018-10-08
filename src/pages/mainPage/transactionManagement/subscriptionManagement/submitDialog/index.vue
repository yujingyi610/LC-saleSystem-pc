<template>
	<div id="showHouseInfo">
		<!-- 编辑认购单弹框 -->
		<el-dialog title="认购单详情" :visible.sync="Flag" width="900px" v-if="Flag">
			<div>
				<el-form :inline="true">
					<el-form-item label="认购单号">{{houseInfo.subscribeCode}}</el-form-item>
					<el-form-item label="认购日期">{{houseInfo.subscribeDate}}</el-form-item>
				</el-form>
			</div>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span class="title">房间信息</span>
				</div>
				<div class="text item">
					<el-form :inline="true" :model="houseInfo">
						<div>
							<el-form-item label="房间号码:">{{houseInfo.houseDesc}}</el-form-item>
						</div>
						<div v-if="houseInfo">
							<el-row>
								<el-col :span="6">
									<el-form-item label="建筑面积:"><span class="units">{{houseInfo.floorSpace}}m<sup>2</sup></span></el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="分摊面积:"><span class="units">{{houseInfo.apportionArea}}m<sup>2</sup></span></el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="地下室面积:"><span class="units">{{houseInfo.basementArea}}m<sup>2</sup></span></el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="赠送面积:"><span class="units">{{houseInfo.giftArea}}m<sup>2</sup></span></el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="6">
									<el-form-item label="计价方式:"><span class="units">{{houseInfo.priceMethod}}</span></el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="套内面积:"><span class="units">{{houseInfo.buildingArea}}m<sup>2</sup></span></el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="花园面积:"><span class="units">{{houseInfo.gardenArea}}m<sup>2</sup></span></el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="天台面积:"><span class="units">{{houseInfo.roofArea}}m<sup>2</sup></span></el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="6">
									<el-form-item label="计价面积:"><span class="units">{{houseInfo.priceArea}}m<sup>2</sup></span></el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="预售表单价:"><span class="units">{{houseInfo.prePrice}}元/m<sup>2</sup></span></el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="预售表总价:"><span class="units">{{houseInfo.preTotalPrice}}元</span></el-form-item>
								</el-col>
								<!-- <el-col :span="6">
									<el-form-item label="预售底单价:"><span class="units">{{houseInfo.preMinPrice}}元/m<sup>2</sup></span></el-form-item>
								</el-col> -->
							</el-row>
							<el-row>
								<!-- <el-col :span="6">
									<el-form-item label="预售底总价:"><span class="units">{{houseInfo.preMinTotalPrice}}元</span></el-form-item>
								</el-col> -->
							</el-row>
						</div>
					</el-form>
				</div>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span class="title">客户信息</span>
				</div>
				<el-table :data="userTable" border style="width: 100%; margin-bottom: 20px">
					<el-table-column prop="customName" label="客户名称" show-overflow-tooltip></el-table-column>
					<el-table-column prop="tel" label="手机号码" show-overflow-tooltip></el-table-column>
					<el-table-column prop="certificateName" label="证件类型" show-overflow-tooltip></el-table-column>
					<el-table-column prop="certificateNo" label="证件号码" show-overflow-tooltip></el-table-column>
				</el-table>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span class="title">认筹信息</span>
				</div>
				<div class="text item">
					<el-form :inline="true" :model="IdentificationInfo">
						<el-form-item label="认筹金是否可转定金:">
							{{IdentificationInfo.flag}}
						</el-form-item>
						<div style="display: inline-block" v-if="IdentificationInfo.flag === '是'">
							<el-form-item label="认筹单号:">{{IdentificationInfo.code}}</el-form-item>
							<el-form-item label="认筹金额:">{{IdentificationInfo.price}}元</el-form-item>
						</div>
					</el-form>
				</div>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span class="title">付款信息</span>
				</div>
				<div class="text item">
					<el-table :data="paymentTable" border style="width: 100%; margin-bottom: 20px">
						<el-table-column prop="paymentTypeName" label="房款类型" show-overflow-tooltip></el-table-column>
						<el-table-column prop="receivableAmount" label="应收金额（元）" show-overflow-tooltip></el-table-column>
						<el-table-column prop="date" label="应收日期" show-overflow-tooltip>
							<template slot-scope="scope">
									{{houseInfo?houseInfo.subscribeDate:''}}
							</template>
						</el-table-column>
						<el-table-column prop="receivedAmount" label="已收金额（元）" show-overflow-tooltip>
							<template slot-scope="scope">
								{{scope.row.receivedAmount || 0}}
							</template>
						</el-table-column>
						<el-table-column prop="unreceivedAmount" label="未收金额（元）" show-overflow-tooltip>
							<template slot-scope="scope">
								{{scope.row.unreceivedAmount || scope.row.receivableAmount - scope.row.receivedAmount}}
							</template>	
						</el-table-column> 
					</el-table>
				</div>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span class="title">置业顾问信息</span>
				</div>
				<div class="text item">
					<el-form :inline="true" :model="counselorInfo">
						<el-form-item label="置业顾问:">
							{{counselorInfo.propertyConsultName}}
						</el-form-item>
						<el-form-item label="顾问手机:">
							{{counselorInfo.propertyConsultMobile}}
						</el-form-item>
					</el-form>
				</div>
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
      Flag: false, // 编辑认购单弹框
      houseInfo: null, // 房间信息
      house: null, // 房间全部信息
      userTable: [], // 客户信息
      cardTypeOpiton: [
        {
          value: "身份证"
        }
      ],
      IdentificationInfo: {
        // 认筹信息
        flag: "否", // 认筹金是否可转定金
        code: "", // 认筹单号
        price: "" // 认筹金额
      },
      raiseInfo: {}, // 认筹单相关信息
      raiseOpiton: [], // 认筹单号下拉框
      paymentTable: [], // 付款信息
      counselorInfo: {
        // 置业顾问信息
        name: "", // 姓名
        tel: "" // 手机号
      },
      id: "" // 认购单ID
    };
  },
  methods: {
    show(info) {
			// 打开编辑认购单弹框
			console.log(info)
			this.paymentTable = [];
      this.Flag = true;
      this.houseInfo = info;
      this.userTable = info.customs;
      this.counselorInfo.propertyConsultName = info.propertyConsultName;
      this.counselorInfo.propertyConsultMobile = info.propertyConsultTel;
      this.counselorInfo.propertyConsultId = info.propertyConsultId;

			this.IdentificationInfo.flag = info.raiseTranDepositFlag?'是':'否';
      this.IdentificationInfo.code = info.raiseCode;
      console.log(this.IdentificationInfo.code)
      this.IdentificationInfo.raiseCode = info.raiseCode;
      console.log(this.IdentificationInfo.raiseCode)
      this.IdentificationInfo.price = info.raiseTranDepositAmount;

			let date = new Date();
      let date1 = date.toLocaleString(date)
      info.trdTradePayment.date = date1.split(' ')[0];
      info.trdTradePayment.receivedPrice = info.trdTradePayment.receivedPrice || 0;
      this.paymentTable.push(info.trdTradePayment)
    },
  }
};
</script>

<style scoped>
.units {
  position: relative;
  float: left;
}
.units sup {
  position: absolute;
  top: -3px;
  right: -6px;
  transform: scale(0.7);
}
</style>