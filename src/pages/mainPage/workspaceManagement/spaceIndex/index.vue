<template>
 <div class="background-m career-advisor-protection-period">
    <div class="envelope-box" style="margin-bottom:10px">
      <div v-has="'wb:process:tjfx'" class="envelope-title search-box">
        <el-form :inline="true" :model="ruleForm" ref="ruleForm" label-width="80px">
          	<el-form-item label="实时动态" :rules="{ required: true, message: '请输入活动名称', trigger: 'blur' }">
				      <el-select  @change="getprojectId" placeholder="请选择城市公司" v-model="ruleForm.searchCityCompany" clearable>
						    <el-option v-for="(item, index) in cityCompanyOption" :key="index" :label="item.name" :value="item.id"></el-option>
				      </el-select>
              &nbsp;&nbsp;&nbsp;
              <el-select @change="getMessages" placeholder="请选择项目" class="ipt" v-model="ruleForm.searchProjectValue" clearable>
					     <el-option v-for="(item, index) in projectNameOption" :key="index" :label="item.name" :value="item.id"></el-option>
				     </el-select>
			     </el-form-item>
			<!--<el-form-item label="">

			</el-form-item>-->
        </el-form>
      </div>
	  <div>
		  <el-form :inline="true" :model="ruleForm" ref="ruleForm" label-width="80px" style="height:72px">
			<el-form-item>
				<el-row>
					<el-col :span="9">
						<el-select @change="getMessages" style="width:110px" v-model="ruleForm.dynamic" placeholder="请选择" class="top_1">
							<el-option
								v-for="item in ruleForm.dynamicList"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="24">
						<ul class="top_list">
							<li>{{ruleForm.dynamicInfo.newCustomCount}}<div>新增客户</div></li>
							<li>{{ruleForm.dynamicInfo.receptionCustomCount}}<div>接待客户</div></li>
							<li>{{ruleForm.dynamicInfo.raiseCount}}<div>认筹</div></li>
							<li>{{ruleForm.dynamicInfo.subscribeCount}}<div>认购</div></li>
							<li>{{ruleForm.dynamicInfo.signCount}}<div>签约</div></li>
							<li class="top_lsit_li">{{ruleForm.dynamicInfo.returnMoneyCount}}<div>回款</div></li>
						</ul>
					</el-col>

				</el-row>
			</el-form-item>
        </el-form>
	  </div>
    </div>
		<template>
		<div class="center">
			<div class="cen_left" style="width:572px">
					<template>
						<div>
							 <el-button class="btn" type="text"  @click="handleDblc">待办流程<i class="el-icon-arrow-right"></i></el-button>
           					 <!-- <i @click="handleClose" class="m-close el-icon-circle-close-outline bold ft-18 cursor"></i> -->
						</div>
						<el-table :data="ruleForm.tableData" style="width: 100%;cursor: pointer; border:none" empty-text = "当前没有任务" @row-click="handleRowClick">
							<el-table-column label="流程主题" prop="title" > </el-table-column>
							<el-table-column label="申请人" prop="drafterName" ></el-table-column>
							<el-table-column label="申请时间" prop="drafterTime" > </el-table-column>
						</el-table>
					</template>
				</div>
				<div class="cen_topright" style="width:572px">
					<!-- willLoseCustomCount bpmActivitiCount -->
					<template>
						<ul class="cen_topright_ul"
						    v-if="ruleForm.clientFlow.nonpaymentCount>0
							||ruleForm.clientFlow.unsignCount>0
							||ruleForm.clientFlow.willLoseCustomCount>0
							||ruleForm.clientFlow.waitFollowCustomCount>0
							||ruleForm.clientFlow.waitAllocationCount>0
							">
							<li>
						<div class="margin">

							 <el-button class="btn" type="text"  @click="handleKhdb">客户待办<i class="el-icon-arrow-right"></i></el-button>
           					 <el-button v-has="'wb:custom:add'" class="btn fr btnXzkh" type="text"  @click="handleXzkh">新增客户</el-button>
								<!-- <i @click="handleClose" class="m-close el-icon-circle-close-outline bold ft-18 cursor"></i> -->
						</div>
							</li>
							<li v-if="ruleForm.clientFlow.unsignCount>0" @click="goSign">
								待签约<span>{{ruleForm.clientFlow.unsignCount}}</span>套
							</li>
							<li v-if="ruleForm.clientFlow.nonpaymentCount>0" @click="goObligation">
								待付款<span>{{ruleForm.clientFlow.nonpaymentCount}}</span>套
							</li>
							<li v-if="ruleForm.clientFlow.waitFollowCustomCount>0" @click="goStayTollow">
								今日待跟进客户<span>{{ruleForm.clientFlow.waitFollowCustomCount}}</span>人
							</li>
							<li v-if="ruleForm.clientFlow.willLoseCustomCount>0" @click="goWashed">
								将流失客户<span>{{ruleForm.clientFlow.willLoseCustomCount}}</span>人
							</li>

							<li v-if="ruleForm.clientFlow.waitAllocationCount>0" @click="goDistribution">
								待分配客户<span>{{ruleForm.clientFlow.waitAllocationCount}}</span>人
							</li>
						</ul>
						<ul v-else class="cen_topright_ul">
							<li>
								<div class="margin">

									<el-button class="btn" type="text"  @click="handleKhdb">客户待办<i class="el-icon-arrow-right"></i></el-button>
									<el-button v-has="'wb:custom:add'" class="btn fr btnXzkh" type="text"  @click="handleXzkh">新增客户</el-button>
										<!-- <i @click="handleClose" class="m-close el-icon-circle-close-outline bold ft-18 cursor"></i> -->
								</div>
							</li>
							<li>
								当前没有任务
							</li>
						</ul>
					</template>

					<template>
						<div class="cen_space"></div>
						<div class="cen_btmright">
						    <div>
								<el-button class="btn" type="text"  @click="handleGao">公告<i class="el-icon-arrow-right"></i></el-button>
							</div>
							<el-table  :data="ruleForm.announcementList" style="width: 100%;cursor: pointer; border:none" empty-text = "没有相应数据" @row-click="handactClick">
								<el-table-column label="公告名称" prop="noticeName" > </el-table-column>
								<el-table-column label="发布时间" prop="updateTime" ></el-table-column>
							</el-table>
						</div>
					</template>
				</div>

				</div>
		</template>

		<template>
			<div>
				<statistics v-has="'wb:process:tjfx'" :obtainCustomerEdit ='ruleForm.searchProjectValue'></statistics>
			</div>
		</template>
		<newCustomers   ref="newCustomers"></newCustomers>
  </div>
</template>

<script>
import statistics from "./statistics.vue";
import Cookies from "js-cookie";

import customDialog from "./dialog/customDialog.vue";
import marketDialog from "./dialog/marketDialog.vue";
import propertyDialog from "./dialog/propertyDialog.vue";
import topDialog from "./dialog/topDialog.vue";

import {
  customerBacklog, //获取客户待办数量
  announcementList, //获取公告列表
  getWorkList, //获取客户待办列表
  currentMes //动态信息数据
} from "@/api/pages/workflow";

import {
  getCityList,
  getPrjByCityId,
  getBathList,
  getHouseList,
  getHouseViewByBuildId
} from "@/api/pages/mainPage/transactionManagement/houseQuery";
//D:\Greentown\src\pages\mainPage\customerFollowUp\customerFollowPage\dialog\newCustomers.vue
import newCustomers from "@/pages/mainPage/customerFollowUp/customerFollowPage/dialog/newCustomers.vue";
export default {
  components: {
    statistics,
    newCustomers
  },
  watch: {
    "ruleForm.searchProjectValue": function() {
      this.ruleForm.dynamic = "DAY";

      this.getMessages();
    }
  },
  data() {
    return {
      ruleForm: {
        //项目id
        projectId: "",
        //城市公司
        searchCityCompany: "",
        //城市公司文本回显
        searchCityCompanyText: "",
        //项目分期
        searchProjectValue: "",
        //项目分期文本回显
        searchProjectValueText: "",
        //城市公司列表
        cityCompanieslist: [],
        //项目分期列表
        projectOptions: [],
        //动态
        dynamic: "DAY",
        //动态列表
        dynamicList: [
          { value: "DAY", label: "今日动态" },
          { value: "WEEK", label: "本周动态" },
          { value: "MONTH", label: "本月动态" },
          { value: "YEAR", label: "本年动态" }
        ],
        //动态数据
        dynamicInfo: {},
        tableData: [],
        //客户待办数据
        clientFlow: {
          //带付款
          obligation: "8",
          //待签约
          sign: "12",
          //将流失客户
          washed: "7",
          //待跟进
          stayTollow: "9",
          //待分配
          distribution: "10"
        },
        //公告数据
        announcementList: []
      },
      //城市公司列表
      cityCompanyOption: [],
      //项目公司list
      projectNameOption: [],
      //用户名
      userName: "",
      //登录人id
      userId: "",
      //登录信息
      userInfo: ""
    };
  },

  mounted() {
    // this.handleGetCityList()
  },
  methods: {
    initTable() {
      //待办数量
      customerBacklog().then(res => {
        if (res.status === 200) {
          this.ruleForm.clientFlow = res.data;
        }
      });

      //获取公告列表
      let obj = {
        pageNum: 1,
        pageSize: 4
      };
      announcementList(obj).then(res => {
        if (res.status === 200) {
          this.ruleForm.announcementList = res.data.list;
        }
      });
    },

    //获取实时动态
    getMessages() {
      //获取实时动态数据
      let bObj = {
        projectId: this.ruleForm.searchProjectValue,
        timeType: this.ruleForm.dynamic,
        propertyConsultId: this.userId
      };
      currentMes(bObj).then(res => {
        let dataA = res.split("(")[1];
        dataA = dataA.split(")")[0];
        let dataS = JSON.parse(dataA);
        this.ruleForm.dynamicInfo = dataS;
      });
    },
    //获取待办流程
    getWorkTable(userName) {
      //待办流程
      if (userName) {
        let data = {
          pageNum: 1,
          pageSize: 10,
          assigneeId: userName
        };

        getWorkList(data).then(res => {
          if (res.status === 200) {
            this.ruleForm.tableData = res.data.list;
            //this.initTable()
          }
        });
      }
    },
    getprojectId() {
      (this.ruleForm.searchProjectValue = ""), (this.projectNameOption = []);
      this.handleGetPrjByCityId();
    },

    //获取城市公司
    handleGetCityList() {
      // 获取城市公司1111111111
      getCityList().then(res => {
        if (res.status === 200) {
          this.cityCompanyOption = res.data;
          //默认回显第一个的城市公司
          this.ruleForm.searchCityCompanyText = this.cityCompanyOption[0].name;
          this.ruleForm.searchCityCompany = this.cityCompanyOption[0].id;

          this.handleGetPrjByCityId();
        }
      });
    },
    handleGetPrjByCityId() {
      // 通过城市公司ID获取项目
      if (this.ruleForm.searchCityCompany) {
        let params = {
          id: this.ruleForm.searchCityCompany
        };
        getPrjByCityId(params).then(res => {
          if (res.status === 200) {
            if (res.data.length > 0) {
              this.projectNameOption = res.data;
              //默认回显第一个项目
              this.ruleForm.searchProjectValueText = this.projectNameOption[0].name;
              //默认的项目id
              this.ruleForm.searchProjectValue = this.projectNameOption[0].id;
            } else {
              this.ruleForm.searchProjectValueText = "该城市公司没有项目";
              this.ruleForm.searchProjectValue = "";
            }
          }
        });
      }
    },
    //获取动态
    getdynamic(val) {
      //this.$router.push({path : '/mainPage/workspaceManagement/myActiviti'});
    },
    handleDblc() {
      //去往待办流程
      this.$router.push({ path: "/mainPage/workspaceManagement/myActiviti" });
    },

    //客户待办
    handleKhdb() {
      this.$router.push({
        path: "/mainPage/workspaceManagement/custom/staySign"
      });
    },
    //新增客户
    handleXzkh() {
      //this.$router.push({ name: "addNotice"});
      this.$refs.newCustomers.show();
    },
    //待付款页面
    goObligation() {
      this.$router.push({
        path: "/mainPage/workspaceManagement/custom/stayPay"
      });
    },
    //待签约页面
    goSign() {
      this.$router.push({
        path: "/mainPage/workspaceManagement/custom/staySign"
      });
    },
    //将流失页面
    goWashed() {
      this.$router.push({
        path: "/mainPage/workspaceManagement/custom/willBeLost"
      });
    },
    //待跟进页面
    goStayTollow() {
      this.$router.push({
        path: "/mainPage/workspaceManagement/custom/stayFollow"
      });
    },
    //待分配页面
    goDistribution() {
      this.$router.push({
        path: "/mainPage/workspaceManagement/custom/stayAllot"
      });
    },
    //待办流程
    handleRowClick(row) {
      // this.$router.push({path : '/mainPage/workspaceManagement/myActiviti'});
      this.$router.push({
        name: "view",
        params: {
          id: row.id,
          formType: row.formType,
          businessKey: row.businessKey
        }
      });
    },
    //公告详情
    handactClick(row) {
      this.$router.push({ name: "viewNotice", params: { id: row.id } });
      //this.$router.push({path : '/mainPage/workspaceManagement/notice'});
    },
    //公告列表
    handleGao() {
      this.$router.push({ path: "/mainPage/workspaceManagement/notice" });
    }
  },
  beforeUpdate() {
    this.userName = Cookies.get("userRealPy");
  },
  created() {
    let that = this;
    let times = setInterval(function() {
      //数据权限控制
      let userInfo = JSON.parse(sessionStorage.getItem("user-info"));
      // console.log('use',userInfo)
      if (userInfo) {
        //获取数据
        that.initTable();
        //获取客户待办列表
        that.getWorkTable(userInfo.userName);
        //清楚定时器
        clearInterval(times);
        //权限控制
        that.userId = userInfo.id;
        if (!userInfo.cityId) {
          that.handleGetCityList();
        } else if (userInfo.cityId && userInfo.projects.length <= 0) {
          that.cityCompanyOption.push({
            id: userInfo.cityId,
            name: userInfo.cityName,
            code: userInfo.cityCode
          });
          that.ruleForm.searchCityCompany = that.cityCompanyOption[0].id;

          that.handleGetPrjByCityId();
        } else if (
          userInfo.projects &&
          userInfo.projects[0] &&
          userInfo.cityId
        ) {
          if (userInfo.cityId) {
            that.cityCompanyOption.push({
              id: userInfo.cityId,
              name: userInfo.cityName,
              code: userInfo.cityCode
            });

            that.ruleForm.searchCityCompany = that.cityCompanyOption[0].id;
          }

          //this.ruleForm.searchCityCompanyText = userInfo.cityName
          that.projectNameOption = userInfo.projects;
          that.projectNameOption.map(v => {
            v.name = v.projectName;
          });
          //默认回显第一个项目
          //this.ruleForm.searchProjectValueText = '请选择'
          //默认的项目id
          that.ruleForm.searchProjectValue = that.projectNameOption[0].id;
          that.getMessages();
        }
      }
    }, 30);
  }
};
</script>
<style lang="scss" scoped>
.top_1 {
  width: 95px;
  margin-top: 20px;
  margin-left: 15px;
  .el-input .el-input--suffix {
    .el-input__inner {
      border: 0 !important;
    }
  }
}

.top_list {
  position: relative;
  top: -32px;
  left: 160px;
  > li {
    width: 29px;
    height: 45px;
    font-size: 24px;
    font-family: PingFang-SC-Medium;
    color: rgba(64, 64, 64, 1);
    line-height: 33px;
    float: left;
    list-style: none;
    line-height: 25px;
    width: 150px;
    text-align: center;
    border-right: 1px solid rgba(229, 229, 229, 1);
    > div {
      font-size: 12px;
      font-family: PingFang-SC-Medium;
      color: rgba(128, 128, 128, 1);
      //line-height:17px;
    }
  }
  .top_lsit_li {
    border-right: none;
  }
}

.center {
  box-sizing: border-box;
  display: flex;
  .cen_left {
    background: #ffffff;
    flex: 7;
    margin-right: 20px;
    width: 572px !important;
    border-radius: 6px;
    margin-top: 20px;
    min-height: 400px;
    .cen_left_top {
      position: relative;
      top: 23px;
      left: 20px;
      z-index: 1000;
      font-size: 14px;
      font-family: PingFang-SC-Medium;
      color: rgba(26, 26, 26, 1);
      line-height: 20px;
    }

    .el-table_2_column_7 {
      .cell {
        text-align: left !important;
        margin-left: 9px;
      }
    }
  }

  .cen_topright {
    background: #ffffff;
    border-radius: 6px;
    flex: 5;
    border-radius: 6px;

    margin-top: 20px;
    .cen_topright_ul {
      > li {
        cursor: pointer;
        padding-left: 20px;
        list-style: none;
        height: 41px;
        line-height: 41px;
        border-bottom: 1px solid #e9e9e9;
        font-size: 12px;
        font-family: PingFang-SC-Regular;
        color: rgba(64, 64, 64, 1);
        > span {
          color: #dd0011;
        }

        .cen_left_top {
          font-size: 14px;
          font-family: PingFang-SC-Medium;
          color: rgba(26, 26, 26, 1);
        }
        .cen_topleft_span {
          font-size: 12px;
          font-family: PingFang-SC-Medium;
          color: rgba(77, 190, 97, 1);
          display: inline;
          float: right;
          margin-right: 20px;
        }
      }
    }
    .cen_topright_ul li:first-child {
      padding-left: none !important;
    }
    .cen_space {
      height: 20px;
      background: #f3f3f3;
    }
    .cen_btmright {
      border-radius: 6px;
      .cen_left_top {
        position: relative;
        top: 23px;
        left: 20px;
        z-index: 1000;
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        color: rgba(26, 26, 26, 1);
        line-height: 20px;
      }
      .cen_topleft_span {
        position: relative;
        top: 23px;
        font-size: 12px;
        font-family: PingFang-SC-Medium;
        color: rgba(77, 190, 97, 1);
        // display: inline;
        float: right;
        z-index: 1000;
        margin-right: 20px;
      }
    }
  }
}
body .el-table .cell {
  text-align: left !important;
  margin-left: 9px;
}

.btn {
  span {
    //color: black;
    font-size: 14px;
  }
}

#mainPage .el-button--text.el-button {
  margin-top: 10px;
  font-size: 14px !important;
}
#mainPage .btnXzkh .el-button--text.el-button {
  margin-top: 10px;
  color: rgba(77, 190, 97, 1);
  font-size: 14px;
}
#mainPage .ipt.el-input__inner {
  border: none !important;
}
#mainPage .el-button {
  padding-left: none !important;
}
.margin {
  margin-left: -20px;
}
</style>
