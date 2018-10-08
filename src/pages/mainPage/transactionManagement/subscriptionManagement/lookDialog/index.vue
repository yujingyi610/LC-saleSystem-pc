<template>
	<div id="showHouseInfo">
		<!-- 编辑认购单弹框 -->
		<el-dialog title="编辑认购单" :visible.sync="Flag" width="900px" v-if="Flag">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span class="title">房间信息</span>
				</div>
				<div class="text item">
					<el-form :inline="true" :model="houseInfo">
						<div>
							<el-form-item label="房间号码:">
								<div @click="handleSearchHouse">
									<dialog-input :val="houseInfo?houseInfo.houseFullName:''"></dialog-input>
								</div>

							</el-form-item>
              <el-form-item label="认购日期" style="float: right">
								<el-date-picker v-model="subscribeDate" type="date" placeholder="选择日期" :picker-options="pickerOptions" :clearable="false"></el-date-picker>
							</el-form-item>
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
					<el-table-column prop="userName" label="客户名称">
						<template slot-scope="scope">
							<el-input v-model="scope.row.customName"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="tel" label="手机号码">
						<template slot-scope="scope">
							<el-input v-model="scope.row.tel" disabled></el-input>
						</template>
					</el-table-column>
					<el-table-column label="证件类型">
						<template slot-scope="scope">
							<el-select v-model="scope.row.certificateName">
								<el-option v-for="(item, index) in cardTypeOption" :key="index" :label="item.dictName" :value="item.dictName"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column label="证件号码">
						<template slot-scope="scope">
							<el-input v-model="scope.row.certificateNo"></el-input>
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="150">
						<template slot-scope="scope">
							<el-button @click.stop.prevent="handleDelect(scope.$index)" type="text">清空客户</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div style="overflow: hidden">
					<el-button type="success" style="float: right" @click="addUser">添加客户</el-button>
				</div>
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
							<el-form-item label="认筹单号:">
								<el-select v-model="IdentificationInfo.code" value-key="raiseCode">
									<el-option v-for="(item, index) in raiseOpiton" :key="index" :label="item.raiseCode" :value="item"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="认筹金额:">
								{{IdentificationInfo.price}}元
							</el-form-item>
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
						<el-table-column prop="receivableAmount" label="应收金额（元）">
              <template slot-scope="scope">
                <el-input v-model="scope.row.receivableAmount" @change="handlePrice(scope.$index)"></el-input>
              </template>
            </el-table-column>
						<el-table-column prop="date" label="应收日期" show-overflow-tooltip>
              <template slot-scope="scope">
                {{new Date(subscribeDate).toLocaleString().split(' ')[0]}}
              </template>
            </el-table-column>
						<el-table-column prop="receivedPrice" label="已收金额（元）" show-overflow-tooltip></el-table-column>
						<el-table-column prop="receivableAmount" label="未收金额（元）" show-overflow-tooltip></el-table-column>
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
				<el-button type="success" @click="handleSave" v-has="'trd:rg:add'">保存</el-button>
				<el-button type="success" @click="handleUp" v-has="'trd:rg:sublit'">提交</el-button>
			</span>
		</el-dialog>
		<search-house ref="searchHouseRef" @confirmHouse="handleConfirmHouse"></search-house>
    <find-custom ref="findCustomRef" @chooseCustom="handleChooseCustom"></find-custom>
	</div>
</template>

<script>
import dialogInput from "@/components/dialogLongInput"; // 模拟input的带放大镜的弹框
import searchHouse from "../searchHouse"; // 选择房间的弹框
import findCustom from '@/components/findCustom'
import {
  saveTrdSubscribeForm,
  getSubscripeSetting,
  getByUser,
  sumbitOperationTrdSubscribeForm
} from "@/api/pages/mainPage/transactionManagement/subscriptionManagement";
import { getCustomerInfo, getCustomerLabel } from "@/api/pages/mainPage/transactionManagement/fromTheManagement/index.js";
export default {
  components: {
    dialogInput,
    searchHouse,
    findCustom
  },
  watch: {
    "IdentificationInfo.code"(e) {
        
      if( e.raiseAmount || e.raiseCode){
        this.IdentificationInfo.price = e.raiseAmount;
        this.IdentificationInfo.raiseCode = e.raiseCode;
        this.raiseInfo = e;
      }

    },
    'userTable': {
				handler:function(newValue,oldValue){
					console.log(newValue);
					if( newValue[0] && newValue[0].customId ){
            this.handleGetByUser();
						// this.IdentificationInfo.code = '';
						// this.IdentificationInfo.price = '';
					}
        },
        deep:true,
      }
  },
  data() {
    return {
      Flag: false, // 编辑认购单弹框
      houseInfo: null, // 房间信息
      house: null, // 房间全部信息
      userTable: [], // 客户信息
      cardTypeOption: [],
      IdentificationInfo: {
        // 认筹信息
        flag: "否", // 认筹金是否可转定金
        code: "", // 认筹单号
        raiseCode: '',
        price: "" // 认筹金额
      },
      raiseInfo: {}, // 认筹单相关信息
      raiseOpiton: [], // 认筹单号下拉框
      paymentTable: [], // 付款信息
      counselorInfo: {
        // 置业顾问信息
        propertyConsultName: "", // 姓名
        propertyConsultMobile: "" // 手机号
      },
      id: "", // 认购单ID
      nicheId: null,// 商机id
      pickerOptions: {
        disabledDate: (time)=> {
            return time.getTime() > new Date();
        }
      },
      subscribeDate: null,// 认购日期
    };
  },
  methods: {
    show(info) {
      this.subscribeDate = null;
      this.houseInfo = null;
      this.userTable = [];
      this.IdentificationInfo = {
        // 认筹信息
        flag: "", // 认筹金是否可转定金
        code: "", // 认筹单号
        raiseCode: '',
        price: "" // 认筹金额
      };
      this.raiseInfo = {};
      this.raiseOpiton = [];
      this.paymentTable = [];
      this.counselorInfo = {
        propertyConsultName: "", // 姓名
        propertyConsultMobile: "", // 手机号
        propertyConsultId: ''
      }
      // 打开编辑认购单弹框
      console.log(1111, info)
      this.Flag = true;
      if( info.subscribeDate ){
        this.subscribeDate = info.subscribeDate.split(" ")[0];//new Date(info.subscribeDate);
      }else{
        this.subscribeDate = new Date();
      }

      this.houseInfo = info;
      this.userTable = info.customs;
      this.counselorInfo.propertyConsultName = info.propertyConsultName;
      this.counselorInfo.propertyConsultMobile = info.propertyConsultTel;
      this.counselorInfo.propertyConsultId = info.propertyConsultId;
      console.log('置业顾问：', this.counselorInfo)
      this.IdentificationInfo.flag = info.raiseTranDepositFlag?'是':'否';
      this.IdentificationInfo.code = info.raiseCode;
      console.log(this.IdentificationInfo.code)
      this.IdentificationInfo.raiseCode = info.raiseCode;
      console.log(this.IdentificationInfo.raiseCode)
      this.IdentificationInfo.price = info.raiseTranDepositAmount;

      console.log(this.IdentificationInfo.price)
      console.log(this.IdentificationInfo)
      this.house = {};
      this.house.batch = {
        cityCompany: info.projectCityId, // 城市公司
        projectName: info.projectId, // 项目名称
        releases: info.batchId // 推盘批次
      };
      this.house.houseInfo = {
        id: info.houseId
      };
      this.raiseInfo.id = info.raiseId;
      this.nicheId = info.nicheId;
      this.id = info.id;
      let date = new Date(this.subscribeDate);
      let date1 = date.toLocaleString()
      info.trdTradePayment.date = date1.split(' ')[0];
      info.trdTradePayment.receivedPrice = 0;
      this.paymentTable.push(info.trdTradePayment)

      getByUser({ customId: this.userTable[0].customId }).then(res => {
         ;
        if (res.status !== 200) {
          this.$message({
            type: "error",
            message: res.message
          });
          return;
        }
        if (res.status === 200 && res.data.length !== 0) {
          this.raiseOpiton = res.data;
          // let params = new URLSearchParams();
          // params.append("pushBathId", this.raiseOpiton[0].batchId);
          // this.handleGetSubscripeSetting(params);


          // this.IdentificationInfo.price = this.raiseOpiton[0].raiseAmount;
          // this.IdentificationInfo.code = this.raiseOpiton[0].raiseCode;

        }
      });
    },
    handleGetCustomerLabel() {
      getCustomerLabel().then(res => {
        // res.data.customInfoLabel.certificateTypeLabel.labelDictList.map(
        // label => {
        //     this.cardTypeOpiton.push({
        //         dictName: label.dictName,
        //         dictType: label.dictType
        //     });
        // }
        // );
        if( res.status === 200 ){
            res.data.map(label=>{
                this.cardTypeOption.push({
                    dictName: label.itemValue,
                    dictType: label.itemCode
                })
            })
        }
      });
    },
    /*******新增认购单弹框内按钮******/
    handleSearchHouse() {
      // 查找房间
      this.$refs.searchHouseRef.show();
    },
    handlePrice(index) {// 处理应收金额不能小于0
      if( isNaN(Number(this.paymentTable[index].receivableAmount)) ){
        this.paymentTable[index].receivableAmount = 1;
        this.$message.error('请输入数字！');
        return
      }
      if( this.paymentTable[index].receivableAmount <= 0 ){
        this.paymentTable[index].receivableAmount = 1;
      }
      this.paymentTable[index].receivableAmount = Number(this.paymentTable[index].receivableAmount)
    },
    handleSave() {
      // 保存
      if( !this.house ){
        this.$message.error('请选择房间！');
        return
      }
      if( !this.userTable[0] || !this.userTable[0].customId ){
        this.$message.error('请添加客户！');
        return
      }
      for( let i = 0; i < this.userTable.length; i++ ){
        if( !this.userTable[i].certificateNo || !this.userTable[i].tel){
          this.$message.error('请完善客户信息！')
          return
        }
        if( this.userTable[i].certificateName === '居民身份证' && !this.idCard(this.userTable[i].certificateNo) ){
          this.$message.error('居民身份证格式错误！')
          return
        }
      }

      let raiseId = null;
      if (this.raiseInfo.id) {
        raiseId = this.raiseInfo.id;
      } else {
        raiseId = this.houseInfo.raiseId;
      }
      this.userTable.map(item=>{
        item.id = null;
      })
      this.userTable[0].nicheId = this.nicheId;
      let data = {
        batchId: this.house.batch.releases,
        customs: this.userTable,
        houseId: this.house.houseInfo.id,
        propertyConsultId: this.counselorInfo.propertyConsultId,
        propertyConsultName: this.counselorInfo.propertyConsultName,
        propertyConsultTel: this.counselorInfo.propertyConsultMobile,
        raiseTranDepositFlag: this.IdentificationInfo.flag === '是'?1:0,
        raiseTranDepositAmount: this.IdentificationInfo.price,
        raiseCode: this.IdentificationInfo.raiseCode,
        raiseId,
        id: this.id,
        subscribeDate: this.subscribeDate,
        trdTradePayment: {
          receivableAmount: this.paymentTable[0].receivableAmount
        }
      };
       
      saveTrdSubscribeForm(data).then(res => {
         ;
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "保存成功！",
            showClose: true
          });
          this.id = "";
          this.Flag = false;
          this.$emit("upDate");
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    handleUp() {
      // 提交
      if( !this.house ){
        this.$message.error('请选择房间！');
        return
      }
      if( !this.userTable[0] || !this.userTable[0].customId ){
        this.$message.error('请添加客户！');
        return
      }
      for( let i = 0; i < this.userTable.length; i++ ){
        if( !this.userTable[i].certificateNo || !this.userTable[i].tel ){
          this.$message.error('请完善客户信息！')
          return
        }
        if( this.userTable[i].certificateName === '居民身份证' && !this.idCard(this.userTable[i].certificateNo) ){
          this.$message.error('居民身份证格式错误！')
          return
        }
      }

      let raiseId = null;
      if (this.raiseInfo.id) {
        raiseId = this.raiseInfo.id;
      } else {
        raiseId = this.houseInfo.raiseId;
      }
      this.userTable.map(item=>{
        item.id = null;
      })
      this.userTable[0].nicheId = this.nicheId;
      let data = {
        batchId: this.house.batch.releases,
        customs: this.userTable,
        houseId: this.house.houseInfo.id,
        propertyConsultId: this.counselorInfo.propertyConsultId,
        propertyConsultName: this.counselorInfo.propertyConsultName,
        propertyConsultTel: this.counselorInfo.propertyConsultMobile,
        raiseTranDepositFlag: this.IdentificationInfo.flag === '是'?1:0,
        raiseTranDepositAmount: this.IdentificationInfo.price,
        raiseCode: this.IdentificationInfo.raiseCode,
        raiseId,
        nicheId: this.nicheId,
        id: this.id,
        subscribeDate: this.subscribeDate,
        trdTradePayment: {
          receivableAmount: this.paymentTable[0].receivableAmount
        }
      };
       
      saveTrdSubscribeForm(data).then(res => {
         ;
        if (res.status !== 200) {
          this.$message({
            type: "error",
            message: res.message
          });
          return;
        }
        if (res.status === 200) {
          let params = new URLSearchParams();
          params.append("id", res.data);
          // console.log(sumbitOperationTrdSubscribeForm)
          sumbitOperationTrdSubscribeForm(params).then(res2 => {
            if (res2.status !== 200) {
              this.$message({
                type: "error",
                message: res2.message
              });
              return;
            }
            if (res2.status === 200) {
              this.$message({
                type: "success",
                message: "提交成功！",
                showClose: true
              });
              this.Flag = false;
              this.$emit("upDate");
            }
          });
        }
      });
    },
    handleDelect(index) {
      // 客户信息table，删除客户操作
      if (this.userTable.length >= 1) {
        this.userTable.splice(index, 1);
        this.counselorInfo.propertyConsultName = '';
        this.counselorInfo.propertyConsultMobile = '';
        this.counselorInfo.propertyConsultId = '';

        this.IdentificationInfo.flag = '';
        this.IdentificationInfo.code = '';
        this.IdentificationInfo.raiseCode = '';
        this.IdentificationInfo.price = '';

        this.nicheId = null;
        if( !this.userTable[0] ){
          return
        }
        if (!this.house) {
						this.$message({
							type: "error",
							message: "请选择房间！"
						});
						return;
					}
					let params = {
						projectId: this.house.batch.projectName,
						mobile: this.userTable[0].tel
					};
					getCustomerInfo(params).then(r => {
            console.log(r)
            if( r.status === 200 ){
              let res = r.data.list[0]
              if (res != null && res != "") {
                if (res.isPrincess) {
                  this.$message({
                    type: "error",
                    message: "未分配置业顾问，请分配置业顾问！"
                  });
                  return;
                }
                this.counselorInfo = res;
                this.nicheId = res.nicheId;
              } else {
                this.$message({
                  type: "error",
                  message: "未找到用户数据"
                });
              }
            }
          });
          this.handleGetSubscripeSetting()
      } else {
        // alert("客户信息不能为空！");
      }
    },
    addUser() {// 点击新增客户按钮
      if (!this.house) {
        this.$message({
          type: "error",
          message: "请选择房间！"
        });
        return;
      }
      this.$refs.findCustomRef.show(this.house.batch.projectName)
    },
    handleChooseCustom(info) {// 得到客户信息，关闭弹框
				if( info ){
					console.log(info);
					for( let i = 0; i < this.userTable.length; i++ ){
						if( this.userTable[i].customId === info.customId ){
							this.$message.error('不能重复添加客户！')
							return
						}
					}

					this.userTable.push({
						customName: info.customName,// 客户姓名
						tel: info.customMobile,// 手机号码
						certificateName: info.certificateName,// 证件类型
						certificateType: info.certificateType,// 证件类型
						certificateNo: info.certificateNo,// 证件号码
						customId: info.customId,// 客户id
						sex: info.customSex,// 性别
					})
					if( !this.nicheId ){
						this.nicheId = info.nicheId;
					}
					if( this.counselorInfo.propertyConsultId && res.propertyConsultId !== this.counselorInfo.propertyConsultId){
						return
					}
					this.counselorInfo = {
						propertyConsultId: info.propertyConsultId,
						propertyConsultMobile: info.propertyConsultMobile,
						propertyConsultName: info.propertyConsultName,
					};
				}
			},
    handleSearchUser(row, index) {
      // 根据手机号搜索用户
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (!reg.test(row.tel)) {
        this.$message({
          type: "error",
          message: "手机格式不正确"
        });
      } else {
        this.handleGetCustomerInfo(row, index);
      }
    },
    handleGetCustomerInfo(row, index) {
      // 查询用户
      if (!this.house) {
        this.$message({
          type: "error",
          message: "请选择项目！"
        });
        return;
      }
      let params = {
        projectId: this.house.batch.projectName,
        mobile: row.tel
      };
      // this.IdentificationInfo.code = '';
      // this.IdentificationInfo.price = '';
      getCustomerInfo(params).then(res => {
         ;
        if (res != null && res != "") {
          if (res.isPrincess) {
            this.$message({
              type: "error",
              message: "未分配置业顾问，请分配置业顾问！"
            });
            return;
          }
          this.userTable[index].customName = res.customName;
          this.userTable[index].certificateName = res.certificateName;
          this.userTable[index].certificateType = res.certificateType;
          this.userTable[index].certificateNo = res.certificateNo;
          this.userTable[index].customId = res.customId;
          this.userTable[index].sex = res.customSex;
          if( !this.counselorInfo.propertyConsultId){

            this.counselorInfo = res;
          }


          this.nicheId = res.nicheId;
          getByUser({ customId: this.counselorInfo.customId }).then(res => {
             ;
            if (res.status !== 200) {
              this.$message({
                type: "error",
                message: res.message
              });
              return;
            }
            if (res.status === 200) {
              this.raiseOpiton = res.data;
              console.log(this.raiseOpiton);
            }
          });
        } else {
          this.$message({
            type: "error",
            message: "未找到用户数据"
          });
        }
      });
    },
    handleGetByUser() {
				getByUser({customId: this.userTable[0].customId}).then(res=>{
					 
					if( res.status === 200 ){
            // this.IdentificationInfo.flag = '否';
            // this.IdentificationInfo.code = '';
            // this.IdentificationInfo.raiseCode = '';
            // this.IdentificationInfo.price = '';
						this.raiseOpiton = res.data;
						console.log(this.raiseOpiton)
					}
        })

        if( this.userTable[0].tel.length !== 11 ){
          this.counselorInfo.propertyConsultName = '';
          this.counselorInfo.propertyConsultMobile = '';
          this.counselorInfo.propertyConsultId = '';

          this.userTable[0].customName = '';
          this.userTable[0].certificateName = '';
          this.userTable[0].certificateType = '';
          this.userTable[0].certificateNo = '';
          this.userTable[0].customId = '';
          this.userTable[0].sex = '';
          return
        }
        if (!this.house) {
						this.$message({
							type: "error",
							message: "请选择项目！"
						});
						return;
					}
					let params = {
						projectId: this.house.batch.projectName,
						mobile: this.userTable[0].tel
					};
					getCustomerInfo(params).then(r => {
            console.log(r)
            if( r.status === 200 ){
              let res = r.data.list[0]
              if (res != null && res != "") {
                if (res.isPrincess) {
                  this.$message({
                    type: "error",
                    message: "未分配置业顾问，请分配置业顾问！"
                  });
                  return;
                }



                this.counselorInfo = res;
              } else {
                this.$message({
                  type: "error",
                  message: "未找到用户数据"
                });
              }
            }

          });
          this.handleGetSubscripeSetting()
		},
    handleGetSubscripeSetting() {
      // 查询认购设置信息
      // this.paymentTable = [];
      let params = new URLSearchParams();
        params.append("pushBathId", this.house.batch.releases);
      getSubscripeSetting(params).then(res => {
         
        if (res.status !== 200) {
          this.$message({
            type: "error",
            message: res.message
          });
          return;
        }
        if (res.status === 200) {
          if (res.data !== null) {
            this.IdentificationInfo.flag = res.data.transFlag ? "是" : "否";
            // let date = new Date();
						// let date1 = date.toLocaleString().split(' ')[0]
            // this.paymentTable.push({
            //   type: "定金",
            //   dowpayAmount: res.data.dowpayAmount,
            //   uncollectedPrice: res.data.dowpayAmount,
            //   receivedPrice: 0,
            //   date: date1
            // });
          }
        }
      });
    },
    handleConfirmHouse(house) {
      // 选中房间，子组件触发
      if (house) {
        // 清空数据
        this.houseInfo = null;
        this.house = null;
        this.userTable = [];
        this.IdentificationInfo.flag = '';
        this.IdentificationInfo.code = '';
        this.IdentificationInfo.price = '';
        this.IdentificationInfo.raiseCode = '';
        this.raiseInfo = {};
        this.raiseOpiton = [];
        this.paymentTable = [];
        this.counselorInfo.name = '';
        this.counselorInfo.tel = '';
        this.nicheId = null;

        this.houseInfo = house.houseInfo;
        this.house = house;
        console.log(this.houseInfo);
        console.log(this.house);

        this.handleGetSubscripeSetting();
      }
    },
  },
  created() {
    this.handleGetCustomerLabel();
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
/* .dialogInput {
  width: 250px !important;
}
.dialogInput .input {
  width: 250px !important;
} */
</style>
