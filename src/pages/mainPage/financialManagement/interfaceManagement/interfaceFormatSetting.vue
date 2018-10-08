<template>
    <div id="interfaceFormat">
      <div class="container-header">
        <el-form :model="formInline">
          <el-row>
            <el-col :span="6">
              <el-form-item label="城市公司">
              <el-select v-model="formInline.cityCompany" clearable>
                <el-option v-for="(item, index) in cityCompanyOption" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目名称">
              <el-select v-model="formInline.projectName" clearable value-key="id">
                <el-option v-for="(item, index) in projectNameOption" :key="index" :label="item.name" :value="item"></el-option>
              </el-select>
            </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="分期">
              <el-select v-model="formInline.devstagesName" clearable value-key="devstagesId">
                <el-option v-for="(item, index) in devstagesOption" :key="index" :label="item.devstagesName" :value="item"></el-option>
              </el-select>
            </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目公司">
              {{formInline.projectCompanyName}}
            </el-form-item>
            </el-col>
            <el-form-item style="float: right">
              <el-button type="primary"  @click="handlesaveConfiguration">保存</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <el-card class="box-card borderCard">
        <div slot="header" class="clearfix">
          <span>凭证/单据头设置</span>
        </div>
        <div>
          <el-form :model="headForm" label-width="175px" label-position="left">
            <el-row>
              <el-col :span="12">
                <el-form-item label="公司主键">
                  <el-input v-model="headForm.projectCompanyNcCode"></el-input>
                </el-form-item>
                <el-form-item label="(company)">
                  <span class="tipsText">取值：公司编码</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="制单人账号">
                  <el-input v-model="headForm.preparedNcUserName"></el-input>
                </el-form-item>
                <el-form-item label="制单人姓名">
                  <el-input v-model="headForm.preparedRealName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="财务凭证发送方编码">
                  <el-input v-model="headForm.sender"></el-input>
                </el-form-item>
                <el-form-item label="(sender)">
                  <span class="tipsText">取值: 财务凭证的外系统编号，如果用友系统中没有此对应项，则可以为空</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="项目综合档案发送方编码">
                  <el-input v-model="headForm.xmzhdaSender"></el-input>
                </el-form-item>
                <el-form-item label="(xmzhda_sender)">
                  <span class="tipsText">取值:项目综合档案的外系统编号</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="财务凭证接收方地址">
                  <el-input v-model="headForm.receiver"></el-input>
                </el-form-item>
                <el-form-item label="(receiver)">
                  <span class="tipsText">格式:08008@08008-0001，其中08008为公司主键的取值 </span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="财务凭证接收方地址">
                  <el-input v-model="headForm.xmzhdaReceiver"></el-input>
                </el-form-item>
                <el-form-item label="(xmzhda_receiver)">
                  <span class="tipsText">默认值:0001 </span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="凭证类别">
                  <el-input v-model="headForm.voucherType"></el-input>
                </el-form-item>
                <el-form-item label="(voucher_type)">
                  <span class="tipsText">默认值:记账凭证</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="来源系统">
                  <el-input v-model="headForm.voucherMakingSystem"></el-input>
                </el-form-item>
                <el-form-item label="(voucher_making_system)">
                  <span class="tipsText">默认值:外部系统交换平台</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="凭证目标URL地址">
                  <el-input v-model="headForm.url"></el-input>
                </el-form-item>
                <el-form-item label="(url)">
                  <span class="tipsText">格式:<br />http://nc.gtcloud.cn/service/XChangeServlet?account=001&groupcode=001 </span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="项目综合档案目标URL地址">
                  <el-input v-model="headForm.xmzhdaUrl"></el-input>
                </el-form-item>
                <el-form-item label="(xmzhda_url)">
                  <span class="tipsText">默认值:<br />http://nc.gtcloud.cn/service/XChangeServlet?account=001&groupcode=001 </span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="门牌号">
                  <el-input v-model="headForm.mphItemtype"></el-input>
                </el-form-item>
                <el-form-item label="(mph_itemtype)">
                  <span class="tipsText">默认值:31</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="购房客户">
                  <el-input v-model="headForm.gfkhItemtype"></el-input>
                </el-form-item>
                <el-form-item label="(gfkh_itemtype)">
                  <span class="tipsText">默认值:32</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card noborderCard">
        <div slot="header" class="clearfix">
          <span>项目对照收支项目字设置</span>
        </div>
        <el-form :model="headForm" label-width="175px" label-position="left">
          <el-row>
            <el-col :span="12">
              <el-form-item label="收支项目_值">
                <el-input v-model="headForm.szxmValue"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="tipsText">默认值:10101 </span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="收支项目_值含义">
                <el-input v-model="headForm.szxmValueText"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="tipsText">默认值:房屋销售收入（含商铺、车位等） </span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card class="box-card noborderCard">
        <div slot="header" class="clearfix">
          <span>项目意向金对照收支项目字设置</span>
        </div>
        <el-form :model="headForm" label-width="175px" label-position="left">
          <el-row>
            <el-col :span="12">
              <el-form-item label="意向金收支项目_值">
                <el-input v-model="headForm.recognitionSzxmValue"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="tipsText">默认值:198 </span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="意向金收支项目_值含义">
                <el-input v-model="headForm.recognitionSzxmValueText"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="tipsText">默认值:其他收入</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card class="box-card noborderCard">
        <div slot="header" class="clearfix">
          <span>POS手续费对照收支项目字设置</span>
        </div>
        <el-form :model="headForm" label-width="175px" label-position="left">
          <el-row>
            <el-col :span="12">
              <el-form-item label="POS手续费收支项目_值">
                <el-input v-model="headForm.posSzxmValue"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="tipsText">默认值:298  </span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="POS手续费收支项目_值含义">
                <el-input v-model="headForm.posSzxmValueText"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="tipsText">默认值:其他支出</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card class="box-card noborderCard">
        <div slot="header" class="clearfix">
          <span>项目对照现金流量项目字设置</span>
        </div>
        <el-form :model="headForm" label-width="175px" label-position="left">
          <el-row>
            <el-col :span="12">
              <el-form-item label="现金流量_值">
                <el-input v-model="headForm.xjllValue"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="tipsText">默认值:1111  </span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="现金流量_值含义">
                <el-input v-model="headForm.xjllValueText"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="tipsText">默认值:销售商品、提供劳务收到的现金</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card class="box-card noborderCard">
        <div slot="header" class="clearfix">
          <span>项目意向金对照现金流量项目字设置</span>
        </div>
        <el-form :model="headForm" label-width="175px" label-position="left">
          <el-row>
            <el-col :span="12">
              <el-form-item label="意向金现金流量_值">
                <el-input v-model="headForm.recognitionXjllValue"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="tipsText">默认值:1113  </span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="意向金现金流量_值含义">
                <el-input v-model="headForm.recognitionXjllValueText"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="tipsText">默认值:收到的其他与经营活动有关的现金</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card class="box-card noborderCard">
        <div slot="header" class="clearfix">
          <span>POS手续费对照现金流量项目字设置</span>
        </div>
        <el-form :model="headForm" label-width="175px" label-position="left">
          <el-row>
            <el-col :span="12">
              <el-form-item label="POS手续费现金流量_值">
                <el-input v-model="headForm.posXjllValue"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="tipsText">默认值:1124  </span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="POS手续费现金流量_值含义">
                <el-input v-model="headForm.posXjllValueText"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="tipsText">默认值:支付的其他与经营活动有关的现金</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card class="box-card noborderCard">
        <div slot="header" class="clearfix">
          <span>部门对照现金流量项目字设置（支出）</span>
        </div>
        <el-form :model="headForm" label-width="175px" label-position="left">
          <el-row>
            <el-col :span="12">
              <el-form-item label="现金流量_值">
                <el-input v-model="headForm.departXjllValue"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="tipsText">默认值:10101</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="现金流量_值含义">
                <el-input v-model="headForm.departXjllValueText"></el-input>
              </el-form-item>
              <el-form-item>
                <span class="tipsText">默认值:购买商品、接受劳务支付的现金</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>
</template>

<script>
import {
  getCityList,
  getPrjByCityId
} from "@/api/pages/mainPage/transactionManagement/houseQuery";

import { getProjectDevstagesByProjectId, getCompanyInfoByDevstagesId, saveConfiguration, configuration } from "@/api/pages/mainPage/financialManagement/GroupControlPeriod.js";
export default {
  watch: {
    "formInline.cityCompany": function(e) {
      this.formInline.projectName = null;
      if (e) {
        this.handleGetPrjByCityId({ id: e });
      }
    },
    "formInline.projectName": function(e) {
      this.formInline.devstagesName = null;
      console.log(e)
      if (e && e.id) {
        this.handlegetProjectDevstagesByProjectId({ projectId: e.id });
      }
    },
    "formInline.devstagesName": function(e) {
      this.formInline.projectCompanyName = null;
      this.formInline.projectCompanyId = null;
      this.formInline.projectCompanyCode = null;
      this.headForm = {}
      if (e && e.devstagesId) {
        console.log(e)
        this.handlegetCompanyInfoByDevstagesId({ devstagesId: e.devstagesId });
        this.handleconfiguration({ devstagesId: e.devstagesId  })
      }
    }
  },
  data() {
    return {
      cityCompanyOption: [], // 选择城市公司下拉数据
      projectNameOption: [], // 选择项目名称下拉数据
      devstagesOption: [], // 分期下拉数据
      formInline: {
        cityCompany: null,
        projectName: null,
        devstagesName: null,
        projectCompanyName: "",
        projectCompanyId: "",
        projectCompanyCode: "",
      },
      headForm: {}
    };
  },
  methods: {
    handleGetCityList() {
      // 获取城市公司
      let userInfo = JSON.parse(sessionStorage.getItem("user-info"));
      if (userInfo.cityId) {
        this.cityCompanyOption.push({
          id: userInfo.cityId,
          name: userInfo.cityName,
          code: userInfo.cityCode
        });
        this.formInline.cityCompany = this.cityCompanyOption[0].id;
      } else {
        //获取城市公司列表
        getCityList().then(res => {
          if (res.status === 200) {
            this.cityCompanyOption = res.data;
            this.formInline.cityCompany = this.cityCompanyOption[0].id;
          }
        });
      }
    },
    handleGetPrjByCityId(params) {
      // 通过城市公司ID获取项目
      let userInfo = JSON.parse(sessionStorage.getItem("user-info"));
      if (userInfo.projects && userInfo.projects[0] && userInfo.cityId) {
        this.projectNameOption = userInfo.projects;
        this.projectNameOption.map(item => {
          item.name = item.projectName;
        });
        if (this.projectNameOption[0]) {
          this.formInline.projectName = this.projectNameOption[0];
        }
      } else {
        getPrjByCityId(params).then(res => {
          if (res.status === 200) {
            this.projectNameOption = res.data;
            if (this.projectNameOption[0]) {
              this.formInline.projectName = this.projectNameOption[0];
            }
          }
        });
      }
    },
    handlegetProjectDevstagesByProjectId(params) {
      // 根据项目id获取分期
      this.devstagesOption = [];
      getProjectDevstagesByProjectId(params).then(res => {
        console.log(res);
        if (res.status === 200 && res.data) {
          this.devstagesOption = res.data;
        } else {
          this.devstagesOption = [];
        }
      });
    },
    handlegetCompanyInfoByDevstagesId(params) {// 根据分期id获取项目公司
      getCompanyInfoByDevstagesId(params).then(res=>{
        if( res.status === 200 && res.data ){
          this.formInline.projectCompanyName = res.data.projectCompanyName;
          this.formInline.projectCompanyId = res.data.projectCompanyId;
          this.formInline.projectCompanyCode = res.data.projectCompanyCode;
        }else{
          this.formInline.projectCompanyName = null;
          this.formInline.projectCompanyId = null;
          this.formInline.projectCompanyCode = null;
        }
      })
    },
    handleconfiguration(params) {// 获取
      configuration(params).then(res=>{
        if( res.status === 200 ){
          this.headForm = res.data;
        }
      })
    },
    handlesaveConfiguration() {// 保存
      this.headForm.devstagesName = this.formInline.devstagesName.devstagesName;
      this.headForm.devstagesId = this.formInline.devstagesName.devstagesId;
      this.headForm.devstagesCode = this.formInline.devstagesName.devstagesCode;
      this.headForm.projectId = this.formInline.projectName.id;
      this.headForm.projectName = this.formInline.projectName.name;
      this.headForm.projectCode = this.formInline.projectName.code;
      this.headForm.projectCompanyCode = this.formInline.projectCompanyCode;
      this.headForm.projectCompanyName = this.formInline.projectCompanyName;
      this.headForm.projectCompanyId = this.formInline.projectCompanyId;
      saveConfiguration(this.headForm).then(res=>{
        if( res.status === 200 ){
          this.$message.success('保存成功！')
          this.handleconfiguration({ devstagesId: this.formInline.devstagesName.devstagesId  })
        }else{
          this.$message.error(res.message)
        }
      })
    }
  },
  created() {
			this.handleGetCityList();
		}
};
</script>

<style scoped>
#interfaceFormat {
  background-color: #fff;
  border-radius: 5px;
  padding-bottom: 10px;
}
.container-header {
  padding: 20px 20px 0 20px;
  border-bottom: solid thin rgb(220, 223, 230);
}
.tipsText {
  color: #4dbe61;
}
</style>
