<template>
  <div>
    <el-form ref="form" :model="form">
      <el-row>
        <el-col :span="8">
          <el-form-item label="城市公司：">
            <el-select v-model="form.cityCompanyId" :clearable="cityCompanyOption.length > 1">
              <el-option v-for="(item, index) in cityCompanyOption" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称：">
            <el-select v-model="form.projectId" :clearable="projectOption.length > 1">
              <el-option v-for="(item, index) in projectOption" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="推盘批次：">
            <el-select v-model="form.batchId" clearable>
              <el-option v-for="(item, index) in batchOption" :key="index" :label="item.batchName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户手机：">
            <el-input v-model="form.tel" disabled></el-input>
          </el-form-item>
          <el-form-item label="证件类型：">
            <el-select v-model="cardSelected" value-key="dictName">
              <el-option v-for="(item, index) in cardTypeOption" :key="index" :label="item.dictName" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="置业顾问：">{{form.propertyConsultName}}</el-form-item>
          <el-form-item label="收款方式：">{{form.receiptMethod}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户名称：">
            <el-input v-model="form.customName"></el-input>
          </el-form-item>
          <el-form-item label="证件号码：">
            <el-input v-model="form.certificateNo"></el-input>
          </el-form-item>
          <el-form-item label="联系方式：">{{form.propertyConsultTel}}</el-form-item>
          <el-form-item label="应收意向金：">{{form.raiseAmount}}元</el-form-item>
        </el-col>
        <el-col :span="8">
            <el-button type="success" @click="addUser">添加客户</el-button>
            <el-button type="success" @click="delUser">清空客户</el-button>
        </el-col>
      </el-row>
    </el-form>
    <find-custom ref="findCustomRef" @chooseCustom="handleChooseCustom"></find-custom>
  </div>
</template>

<script>
import {
  getCityList,
  getPrjByCityId,
  getBatchByPorject,
  getCustomerInfo,
  getCustomerLabel
} from "@/api/pages/mainPage/transactionManagement/fromTheManagement/index.js";
import findCustom from '@/components/findCustom'
import { getRaiseSettingDto } from "@/api/pages/mainPage/transactionManagement/pushplateManagement/index.js";
export default {
  components: {
    findCustom
  },
  data() {
    
    return {
      /*********顶部搜索form数据***********/
      cityCompanyOption: [],
      projectOption: [],
      batchOption: [],
      form: {
        // 头部搜索Form表单
        cityCompanyId: "", // 城市公司ID
        projectId: "", // 项目ID
        batchId: "", // 推盘批次
        tel: "", // 客户手机
        receiptMethod: "无",
        raiseAmount: 0,
        certificateNo: "",
        certificateType: "",
        customId: "",
        customName: "",
        nicheId: "",
        propertyConsultId: "",
        propertyConsultName: "",
        //目前缺下面得
        certificateName: "",
        propertyConsultTel: "",
        sex: ""
      },
      cardTypeOption: [],
      cardSelected: {
        dictName: "",
        dictType: ""
      },
    };
  },
  methods: {
    handleGetCityList() {// 获取城市公司
      let userInfo = JSON.parse(sessionStorage.getItem('user-info'));
      if( userInfo.cityId ){
          this.cityCompanyOption.push({
              id: userInfo.cityId,
              name: userInfo.cityName,
              code: userInfo.cityCode
          })
          this.form.cityCompanyId = this.cityCompanyOption[0].id;
      }else{
          //获取城市公司列表
          getCityList().then(res => {
              if (res.status === 200) {
                  this.cityCompanyOption = res.data;
                  this.form.cityCompanyId = this.cityCompanyOption[0].id;
              }
          });
      }
      
    },
    handleGetPrjByCityId(params) {// 通过城市公司ID获取项目
        let userInfo = JSON.parse(sessionStorage.getItem('user-info'));
        if( userInfo.projects && userInfo.projects[0] && userInfo.cityId ){
            this.projectOption= userInfo.projects;
            this.projectOption.map(item=>{
                item.name = item.projectName
            })
            if( this.projectOption[0] ){
              this.form.projectId = this.projectOption[0].id;
            }
        }else{
            getPrjByCityId(params).then(res => {
                if (res.status === 200) {
                    this.projectOption = res.data;
                    if( this.projectOption[0] ){
                      this.form.projectId = this.projectOption[0].id;
                    }
                }
            });
        }
    },
    handleGetBatchByPorject(params) {
      getBatchByPorject(params).then(res => {
        if (res.status === 200) this.batchOption = res.data;
      });
    },
    handleGetRaiseSettingDto(params) {
      getRaiseSettingDto(params).then(res => {
        if (res.data != null) {
          this.form.raiseAmount = res.data.amount;
          this.form.receiptMethod = res.data.receiptMethod;
        }
      });
    },
    handleGetCustomerInfo() {
      if (this.form.projectId == "") {
        this.$message({
          type: "error",
          message: "请选择项目！"
        });
        return;
      }
      let params = {
        projectId: this.form.projectId,
        // certificateNo: this.form.certificateNo,
        // customName: this.form.customName,
        mobile: this.form.tel
      };
      getCustomerInfo(params).then(r => {
        console.log(r)
        if( r.status === 200 ){
          let res = r.data.list[0];
          if (res != null && res != "") {
            if (res.isPrincess) {
              this.$message({
                type: "error",
                message: "未分配置业顾问，请分配置业顾问！"
              });
              return;
            }
            this.form.certificateNo = res.certificateNo;
            this.form.certificateType = res.certificateType;
            this.form.certificateName = res.certificateName;
            this.form.customId = res.customId;
            this.form.customName = res.customName;
            this.form.sex = res.customSex;
            this.form.propertyConsultId = res.propertyConsultId;
            this.form.propertyConsultName = res.propertyConsultName;
            this.form.propertyConsultTel = res.propertyConsultMobile;
            this.form.nicheId = res.nicheId;
            this.cardSelected = {
              dictName: res.certificateName,
              dictType: res.certificateType
            };
          } else {
            this.$message({
              type: "error",
              message: "未找到用户数据"
            });
          }

        }
        
      });
    },
    sendcode() {
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (!reg.test(this.form.tel)) {
        this.$message({
          type: "error",
          message: "手机格式不正确"
        });
      } else {
        this.handleGetCustomerInfo();
      }
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
    addUser() {
      if (!this.form.projectId) {
					this.$message({
						type: "error",
						message: "请选择项目！"
					});
					return;
				}
				this.$refs.findCustomRef.show(this.form.projectId)
    },
    delUser() {// 清空客户
      this.form.customName = '';
      this.form.customId = '';
      this.form.tel = '';
      this.form.certificateType = '';
      this.form.certificateName = '';
      this.form.certificateNo = '';
      this.form.propertyConsultId = '';
      this.form.propertyConsultName = '';
      this.form.propertyConsultTel = '';
      this.form.nicheId = '';
      this.cardSelected = {
        dictName: '',
        dictType: ''
      };
    },
    handleChooseCustom(info) {// 得到客户信息，关闭弹框
				if( info ){
					console.log(info);
				
					this.form.tel = info.customMobile;
					this.form.certificateNo = info.certificateNo;
          this.form.certificateType = info.certificateType;
          this.form.certificateName = info.certificateName;
          this.form.customId = info.customId;
          this.form.customName = info.customName;
          this.form.sex = info.customSex;
          this.form.propertyConsultId = info.propertyConsultId;
          this.form.propertyConsultName = info.propertyConsultName;
          this.form.propertyConsultTel = info.propertyConsultMobile;
          this.form.nicheId = info.nicheId;
          this.cardSelected = {
            dictName: info.certificateName,
            dictType: info.certificateType
          };
				}
			},
  },
  created() {
    this.handleGetCityList();
    this.handleGetCustomerLabel();
  },
  watch: {
    "form.cityCompanyId": function(e) {
      this.form.projectId = "";
      if( e )
      this.handleGetPrjByCityId({ id: e });
    },
    "form.projectId": function(e) {
      this.form.batchId = "";
      if( e )
      this.handleGetBatchByPorject({ projectId: e });
    },
    "form.batchId": function(e) {
      this.form.raiseAmount = "0";
      this.form.receiptMethod = "无";
      if( e )
      this.handleGetRaiseSettingDto({ pushBathId: e });
    },
    // "form.tel": function(e) {
    //   if (this.form.customId !== "") {
    //     this.cardSelected = {};
    //     this.form.certificateNo = "";
    //     this.form.certificateType = "";
    //     this.form.certificateName = "";
    //     this.form.customId = "";
    //     this.form.customName = "";
    //     this.form.sex = "";
    //     this.form.propertyConsultId = "";
    //     this.form.propertyConsultName = "";
    //     this.form.propertyConsultTel = "";
    //   }
    //   if (e.length === 11) this.sendcode();
    // },
    cardSelected: function(e) {
      this.form.certificateType = e.dictType;
      this.form.certificateName = e.dictName;
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 14px;
  float: left;
  border-bottom: 1px solid #e5e5e5;
  width: 100%;
  margin-bottom: 20px;
}
</style>