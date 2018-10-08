<template>
  <div class="m-search-form-box">
    <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">

      <div>

       <el-form-item label="城市公司：">
					<el-select v-model="ruleForm.searchCityCompany" clearable @change="isClearTable">
						<el-option v-for="(item, index) in cityCompanyOption" :key="index" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="项目名称：">
					<el-select v-model="ruleForm.selectionProject" clearable @change="saveSession">
						<el-option v-for="(item, index) in projectNameOption" :key="index" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>



      </div>
      <template v-if="this.showf">
      <div v-if="this.filtrateLabel.nameOrTelLabel">
        <el-form-item :label="this.filtrateLabel.nameOrTelLabel.labelName+':'" prop="nameAndPhone">
          <el-input placeholder="请输入手机号或姓名" v-model="ruleForm.nameAndPhone"></el-input>
        </el-form-item>
      </div>

      <!-- 客户级别 -->
      <div v-if="this.filtrateLabel.customLevelLabel">
        <el-form-item :label="this.filtrateLabel.customLevelLabel.labelName+':'" prop="customerLevel">
          <el-checkbox-group v-model="ruleForm.customerLevel">
            <el-checkbox
             v-for="item in this.filtrateLabel.customLevelLabel.labelDictList"
             :label="item.dictName"
             :key="item.id">
             {{item.dictName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>

      <!-- 购房阶段 -->
      <div v-if="this.filtrateLabel.buyStageLabel">
        <el-form-item :label="this.filtrateLabel.buyStageLabel.labelName+':'" prop="purchaseStage">
          <el-radio-group v-model="ruleForm.purchaseStage">
            <el-radio
             v-for="item in this.filtrateLabel.buyStageLabel.labelDictList"
             :label="item.dictName"
             :key="item.id"
            >{{item.dictName}}</el-radio>

          </el-radio-group>
        </el-form-item>

      </div>


      <!-- 来访时间 -->
      <div v-if="this.filtrateLabel.visitTimeLabel">
        <el-form-item :label="this.filtrateLabel.visitTimeLabel.labelName+':'" prop="visitTime">
          <el-radio-group v-model="ruleForm.visitTime">
            <el-radio
             v-for="item in this.filtrateLabel.visitTimeLabel.labelDictList"
             :label="item.dictName"
             :key="item.id"
            >{{item.dictName}}</el-radio>
            <el-radio label="自定义">自定义</el-radio>
          </el-radio-group>
        </el-form-item>

        <template v-if="ruleForm.visitTime === '自定义'">
          <el-form-item label=" " prop="visitTimeStart">
            <el-date-picker
              style="width:124px;margin-left: -100px;"
              v-model="ruleForm.visitTimeStart"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
            <span class="ml-5">-</span>
          </el-form-item>
          <el-form-item label="" prop="visitTimeEnd">
            <el-date-picker
              style="width:124px;"
              v-model="ruleForm.visitTimeEnd"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </template>

      </div>

      <el-collapse-transition>
        <!-- 收缩框 -->
        <div v-show="isOpen">

          <!-- 创建时间 -->
          <div v-if="this.filtrateLabel.createTimeLabel">
            <el-form-item :label="this.filtrateLabel.createTimeLabel.labelName+':'" prop="creationTime">
              <el-radio-group v-model="ruleForm.creationTime">
                <el-radio
                v-for="item in this.filtrateLabel.createTimeLabel.labelDictList"
                :label="item.dictName"
                :key="item.id"
                >{{item.dictName}}</el-radio>
                <el-radio label="自定义">自定义</el-radio>
              </el-radio-group>
            </el-form-item>

            <template v-if="ruleForm.creationTime === '自定义'">
              <el-form-item label=" " prop="creationTimeStart">
                <el-date-picker
                  style="width:124px;margin-left: -100px;"
                  v-model="ruleForm.creationTimeStart"
                  type="date"
                 value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
                <span class="ml-5">-</span>
              </el-form-item>
              <el-form-item label="" prop="creationTimeEnd">
                <el-date-picker
                  style="width:124px;"
                  v-model="ruleForm.creationTimeEnd"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </template>
          </div>

          <!-- 跟进时间 -->
          <div v-if="this.filtrateLabel.followTimeLabel">
            <el-form-item :label="this.filtrateLabel.followTimeLabel.labelName+':'" prop="followUpTime">
              <el-radio-group v-model="ruleForm.followUpTime">
                <el-radio
                v-for="item in this.filtrateLabel.followTimeLabel.labelDictList"
                :label="item.dictName"
                :key="item.id"
                >{{item.dictName}}</el-radio>
                <el-radio label="自定义">自定义</el-radio>
              </el-radio-group>
            </el-form-item>

            <template v-if="ruleForm.followUpTime === '自定义'">
              <el-form-item label=" " prop="followUpTimeStart">
                <el-date-picker
                  style="width:124px;margin-left: -100px;"
                  v-model="ruleForm.followUpTimeStart"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
                <span class="ml-5">-</span>
              </el-form-item>
              <el-form-item label="" prop="followUpTimeEnd">
                <el-date-picker
                  style="width:124px;"
                  v-model="ruleForm.followUpTimeEnd"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </template>
          </div>

          <!-- 未跟进情况 -->
          <div v-if="this.filtrateLabel.noFollowTimeLabel">
            <el-form-item :label="this.filtrateLabel.noFollowTimeLabel.labelName+':'" prop="failureToFollowUp">
              <el-radio-group v-model="ruleForm.failureToFollowUp">
                <el-radio
                v-for="item in this.filtrateLabel.noFollowTimeLabel.labelDictList"
                :label="item.dictName"
                :key="item.id"
                >{{item.dictName}}</el-radio>
                <el-radio label="自定义">自定义</el-radio>
              </el-radio-group>
            </el-form-item>

            <template v-if="ruleForm.failureToFollowUp === '自定义'">
              <el-form-item label=" " prop="failureToFollowUpStart">
                <el-date-picker
                  style="width:124px;margin-left: -100px;"
                  v-model="ruleForm.failureToFollowUpStart"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
                <span class="ml-5">-</span>
              </el-form-item>
              <el-form-item label="" prop="failureToFollowUpEnd">
                <el-date-picker
                  style="width:124px;"
                  v-model="ruleForm.failureToFollowUpEnd"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </template>
          </div>

          <!-- 即将生日 -->
          <div v-if="this.filtrateLabel.birthdayTimeLabel">
            <el-form-item :label="this.filtrateLabel.birthdayTimeLabel.labelName+':'" prop="forthcomingBirthday">
              <el-radio-group v-model="ruleForm.forthcomingBirthday">

                <el-radio
                v-for="item in this.filtrateLabel.birthdayTimeLabel.labelDictList"
                :label="item.dictName"
                :key="item.id"
                >{{item.dictName}}</el-radio>
                <el-radio label="自定义">自定义</el-radio>
              </el-radio-group>
            </el-form-item>

            <template v-if="ruleForm.forthcomingBirthday === '自定义'">
              <el-form-item label=" " prop="forthcomingBirthdayStart">
                <el-date-picker
                  style="width:124px;margin-left: -100px;"
                  v-model="ruleForm.forthcomingBirthdayStart"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
                <span class="ml-5">-</span>
              </el-form-item>
              <el-form-item label="" prop="forthcomingBirthdayEnd">
                <el-date-picker
                  style="width:124px;"
                  v-model="ruleForm.forthcomingBirthdayEnd"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </template>
          </div>

          <!-- 业态 -->
          <div v-if="this.filtrateLabel.formatLabel">
            <el-form-item :label="this.filtrateLabel.formatLabel.labelName+':'" prop="typeOfOperation">
              <el-checkbox-group v-model="ruleForm.typeOfOperation">
                <el-checkbox
                v-for="item in this.filtrateLabel.formatLabel.labelDictList"
                :label="item.dictName"
                :key="item.id"
                >
                {{item.dictName}}</el-checkbox>

              </el-checkbox-group>
            </el-form-item>
          </div>

          <!-- 需求面积 -->
          <div v-if="this.filtrateLabel.needAreaLabel">
            <el-form-item :label="this.filtrateLabel.needAreaLabel.labelName+':'" prop="demandArea">
              <el-checkbox-group v-model="ruleForm.demandArea">
                <el-checkbox
                v-for="item in this.filtrateLabel.needAreaLabel.labelDictList"
                :label="item.dictName"
                :key="item.id"
                >
                {{item.dictName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>

          <!-- 居室数量 -->
          <div v-if="this.filtrateLabel.roomCountLabel">
            <el-form-item :label="this.filtrateLabel.roomCountLabel.labelName+':'" prop="numberOfLivingRooms">
              <el-checkbox-group v-model="ruleForm.numberOfLivingRooms">
                <el-checkbox
                v-for="item in this.filtrateLabel.roomCountLabel.labelDictList"
                :label="item.dictName"
                :key="item.id"
                >
                {{item.dictName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>

          <!-- 朝向 -->
          <div v-if="this.filtrateLabel.orientationLabel">
            <el-form-item :label="this.filtrateLabel.orientationLabel.labelName+':'" prop="orientation">
              <el-checkbox-group v-model="ruleForm.orientation">
                <el-checkbox
                v-for="item in this.filtrateLabel.orientationLabel.labelDictList"
                :label="item.dictName"
                :key="item.id"
                >
                {{item.dictName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>

          <!-- 置业顾问 -->
          <div v-if="this.filtrateLabel.propertyConsultIdLabel">
            <el-form-item :label="this.filtrateLabel.propertyConsultIdLabel.labelName+':'" prop="propertyConsultant">
              <el-select clearable v-model="ruleForm.propertyConsultant"  placeholder="请选择" class="w-150">
                <el-option
                 v-for="(item) in ruleForm.propertyConsultantList"
                :key="item.id"
                :label="item.userRealName"
                :value="item.userId"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>

          <!-- 是否公客 -->
          <div v-if="this.filtrateLabel.isCommonLabel">
            <el-form-item :label="this.filtrateLabel.isCommonLabel.labelName+':'" prop="isMaleGuests">
              <el-radio-group v-model="ruleForm.isMaleGuests">
                <el-radio v-for="item in this.filtrateLabel.isCommonLabel.labelDictList"
                :label="item.dictName"
                :key="item.id"
                >
                {{item.dictName}}</el-radio>

              </el-radio-group>
            </el-form-item>
          </div>
        </div>
      </el-collapse-transition>

      <!-- 展开收起 -->
      <div class="text-center heightS">
        <span @click="handleOpen" class="cursor color-green">
          <span>{{isOpen === false ? '展开' : '收起'}}</span>
          <i v-if="isOpen === false " class="el-icon-arrow-down"></i>
          <i v-else class="el-icon-arrow-up"></i>
        </span>
        <div class="fr">
            <el-button @click="handleSearch" type="primary">搜索</el-button>
            <el-button @click="handleSearchReset">清空</el-button>
          </div>
      </div>

      </template>
    </el-form>
  </div>
</template>

<script>
import Cookies from "js-cookie"; //引入cookie
import {
  /* dictionaryEntrySearchOptions,
    dictionaryEntryAddOrEdit, */
  getProjectName, //获取项目名称
  getCheckLevel, //获取校验等级以及客户标签
  getPropertyConsultant //获取项目下的置业顾问
} from "@/api/pages/mainPage/customerFollowUp";

import {
  getCityList,
  getPrjByCityId,
  getBathList,
  getHouseList,
  getHouseViewByBuildId
} from "@/api/pages/mainPage/transactionManagement/houseQuery";
import {
  getCustomFilter,
  setCustomFilter,
  removeCustomFilter
} from "@/util/auth.js";
export default {
  props: ["value", "jurisdiction"], // 获取 value 以及 权限
  watch: {
    ["ruleForm.housingSearch"](val) {
      this.$refs.tree.filter(val);
    },
    //监听城市公司变化
    "ruleForm.searchCityCompany": function(e) {
      this.ruleForm.selectionProject = null;
      if (e) {
        this.handleGetPrjByCityId({ id: e });
      }
    },

    "ruleForm.selectionProject": function(e) {
        
      // this.ruleForm.searchProjectValue = null;
      if (e) {
        console.log(e)
        this.$emit("handleSearch", this.ruleForm);
        this.getTableList(e);
        this.getPropertyConsultantList();
      }
    }
  },
  data() {
    return {
      ruleForm: {
        //城市公司
        searchCityCompany: "",
        // 选择项目
        selectionProject: "",

        projectOptions: [],
        //项目id
        projectId: "",
        // 姓名/电话
        nameAndPhone: "",
        // 客户级别
        customerLevel: [],
        // 购房阶段
        purchaseStage: "",
        // 来访时间
        visitTime: "",
        // 来访时间 开始
        visitTimeStart: "",
        // 来发时间 结束
        visitTimeEnd: "",
        // 创建时间
        creationTime: "",
        // 创建时间 开始
        creationTimeStart: "",
        // 创建时间 结束
        creationTimeEnd: "",
        // 跟进时间
        followUpTime: "",
        // 跟进时间 开始
        followUpTimeStart: "",
        // 跟进时间 结束
        followUpTimeEnd: "",
        // 未跟进情况
        failureToFollowUp: "",
        // 未跟进情况 开始
        failureToFollowUpStart: "",
        // 未跟进情况 结束
        failureToFollowUpEnd: "",
        // 即将生日
        forthcomingBirthday: "",
        // 即将生日 开始
        forthcomingBirthdayStart: "",
        // 即将生日 结束
        forthcomingBirthdayEnd: "",
        // 业态
        typeOfOperation: [],
        // 需求面积
        demandArea: [],
        // 居室数量
        numberOfLivingRooms: [],
        // 朝向
        orientation: [],
        // 商机状态
        businessOpportunityState: "",
        // 置业顾问
        propertyConsultant: "",
        // 是否公客
        isMaleGuests: "",
        //获取置业顾问list
        propertyConsultantList: []
      },
      showf: false,
      rules: {},

      /* 是否 展开 */
      isOpen: false,
      // 房源树
      housingDialogVisible: false,
      //动态标签
      filtrateLabel: {},
      //城市公司列表
      cityCompanyOption: [],
      //项目列表
      projectNameOption: []
    };
  },
  mounted() {
    //获取城市公司
    this.handleGetCityList();

    //获取置业顾问
    this.getPropertyConsultantList();

    //
    if (getCustomFilter()) {
          this.ruleForm = JSON.parse(getCustomFilter());
    }
  },
  beforeMount() {
    
  },
  created() {},
  methods: {
    /* -------------------搜索查询--------------------------- */
    saveSession(){
      setCustomFilter(JSON.stringify(this.ruleForm));
      sessionStorage.setItem('city-company',JSON.stringify(this.cityCompanyOption));
      if(this.ruleForm.selectionProject == null || this.ruleForm.selectionProject == "" || typeof(this.ruleForm.selectionProject) == 'undefined' || this.ruleForm.selectionProject == undefined){
        this.$emit("clearTableData");
      }
    },
    isClearTable(){
      if(this.ruleForm.searchCityCompany == null || this.ruleForm.searchCityCompany == "" || typeof(this.ruleForm.searchCityCompany) == 'undefined' || this.ruleForm.searchCityCompany == undefined){
        this.$emit("clearTableData");
      }
    },
    // 点击搜索
    handleSearch() {
      console.log()
      if(this.ruleForm.searchCityCompany == null ||
        this.ruleForm.searchCityCompany == undefined ||
        typeof(this.ruleForm.searchCityCompany) == 'undefined' ||
        this.ruleForm.searchCityCompany == "" ||
        this.ruleForm.selectionProject == null ||
        this.ruleForm.selectionProject == undefined ||
        typeof(this.ruleForm.selectionProject) == 'undefined' ||
        this.ruleForm.selectionProject == ""){
        this.$confirm('请先选择城市公司和项目名称！','提示',{type:'warning'}).catch(function(){

        }).catch(function(){

        })
      }else{
        setCustomFilter(JSON.stringify(this.ruleForm));
        sessionStorage.setItem('city-company',JSON.stringify(this.cityCompanyOption));
        this.$emit("handleSearch", this.ruleForm);
      }
    },
    // 点击清空
    handleSearchReset() {
      this.$refs.ruleForm.resetFields();
      // 清空 房源数据
      this.ruleForm.housingResourcesVal = [];
      this.ruleForm.housingResourcesText = "";
      this.ruleForm = {
        businessOpportunityState:"",
        creationTime:"",
        creationTimeEnd:"",
        creationTimeStart:"",
        customerLevel:[],
        demandArea:[],
        failureToFollowUp:"",
        failureToFollowUpEnd:"",
        failureToFollowUpStart:"",
        followUpTime:"",
        followUpTimeEnd:"",
        followUpTimeStart:"",
        forthcomingBirthday:"",
        forthcomingBirthdayEnd:"",
        forthcomingBirthdayStart:"",
        isMaleGuests:"",
        nameAndPhone:"",
        numberOfLivingRooms:[],
        orientation:[],
        projectId:"",
        projectOptions:[],
        propertyConsultant:"",
        propertyConsultantList:[],
        purchaseStage:"",
        searchCityCompany:null,
        selectionProject:null,
        typeOfOperation:[],
        visitTime:"",
        visitTimeEnd:"",
        visitTimeStart:""
      };
      this.$emit("clearTableData");
      //setCustomFilter(JSON.stringify(this.ruleForm));
      sessionStorage.removeItem('city-company');
      sessionStorage.removeItem('custom-filter');

    },
    /* -------------------搜索查询--------------------------- */
    //获取置业顾问
    getPropertyConsultantList() {
      if( !this.ruleForm.selectionProject ){
        return
      }
      this.ruleForm.propertyConsultantList = [];
      let data = {
        projectId: this.ruleForm.selectionProject,
        pageNum: 1,
        pageSize: 10000000
      };
      getPropertyConsultant(data).then(res => {
        if (res.status === 200) {
          this.ruleForm.propertyConsultantList = res.data;
        }
      });
    },

    //根据项目选择置业顾问
    changConsultant() {
      this.getPropertyConsultantList();
    },
    /* -------------------房源 dialog 相关--------------------------- */
    handleHousingClick() {
      this.housingDialogVisible = true;
    },
    // 过滤树
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 点击确定
    handleHousingOk() {
      let data = this.$refs.tree.getCheckedNodes();
      this.ruleForm.housingResourcesVal = data;
      this.ruleForm.housingResourcesText = data.map(v => v.label).join(",");
       
      return;

      // 保存数据后 关闭dialog
      this.handleHousingClose();
    },
    // 点击取消
    handleHousingClose() {
      this.housingDialogVisible = false;
      this.$refs.tree.setCheckedNodes(this.ruleForm.housingResourcesVal);
    },
    /* -------------------房源 dialog 相关--------------------------- */

    // 点击 展开
    handleOpen() {
      this.isOpen = !this.isOpen;
    },
    //获取项目
    getTableList(e) {
      let data = {
        projectId: e,
        groupCodes: "filtrate"
      };
      getCheckLevel(data).then(res => {
        if (res.status === 200) {
          let labeLValueStr = JSON.stringify(res.data.filtrateLabel);
          this.filtrateLabel = JSON.parse(labeLValueStr);
          if (this.filtrateLabel) {
            this.showf = true;
          }
        }
      });
    },

    handleGetCityList() {
      // 获取城市公司
      let isStorage = sessionStorage.getItem('custom-filter');
      if(isStorage != null && isStorage != undefined && typeof(isStorage) != 'undefined'){
        this.cityCompanyOption = JSON.parse(sessionStorage.getItem('city-company'));
      }else{
        this.cityCompanyOption = [];
        let userInfo = JSON.parse(sessionStorage.getItem("user-info"));
        if (userInfo.cityId) {
          this.cityCompanyOption.push({
            id: userInfo.cityId,
            name: userInfo.cityName,
            code: userInfo.cityCode
          });
          this.ruleForm.searchCityCompany = this.cityCompanyOption[0].id;
        } else {
          //获取城市公司列表
          getCityList().then(res => {
            if (res.status === 200) {
              this.cityCompanyOption = res.data;
              this.ruleForm.searchCityCompany = this.cityCompanyOption[0].id;
            }
          });
        }
      }
    },
    handleGetPrjByCityId(params) {
      // 通过城市公司ID获取项目
      let isStorage = sessionStorage.getItem('city-company');
      let flag = true;//是否给项目下拉框赋初始值
      if(isStorage == null || isStorage == undefined || typeof(isStorage) == 'undefined'){
        flag = true;
      }else{
        flag = false;
      }
      let userInfo = JSON.parse(sessionStorage.getItem("user-info"));
      if (userInfo.projects && userInfo.projects[0] && userInfo.cityId) {
        this.projectNameOption = userInfo.projects;
        this.projectNameOption.map(item => {
          item.name = item.projectName;
        });
        if(flag) {
          this.ruleForm.selectionProject = this.projectNameOption[0].id;
          setCustomFilter(JSON.stringify(this.ruleForm));
          sessionStorage.setItem('city-company',JSON.stringify(this.cityCompanyOption));
        }else{
          this.ruleForm.selectionProject = JSON.parse(sessionStorage.getItem('custom-filter')).selectionProject;
        }
        //获取置业顾问
        this.getPropertyConsultantList();
      } else {
        getPrjByCityId(params).then(res => {
          if (res.status === 200) {
            this.projectNameOption = res.data;
            if (
              this.projectNameOption &&
              this.projectNameOption.length > 0
            ) {
              if(flag) {
                this.ruleForm.selectionProject = this.projectNameOption[0].id;
              }else{
                this.ruleForm.selectionProject = JSON.parse(sessionStorage.getItem('custom-filter')).selectionProject;
              }
            } else {
              this.ruleForm.selectionProject = "";
            }
          }
        });

        //获取置业顾问
        this.getPropertyConsultantList();
      }
    }
  }
};
</script>

<style lang="scss">
.m-search-form-box {
  .cursor input {
    cursor: pointer;
  }
  .m-input input {
    overflow: hidden; /*溢出隐藏*/
    text-overflow: ellipsis; /*以省略号...显示*/
    white-space: nowrap; /*强制不换行*/
  }
  /* 房源浮层 样式 */
  .housing-content {
    position: relative;
    .housing-dialog {
      position: absolute;
      width: 200px;
      border: 1px solid #e5e5e5;
      background-color: #fff;
      z-index: 10;
      border-radius: 4px;
      top: 28px;
      .housing-dialog-title {
        padding: 7px 14px;
        border-bottom: 1px solid #e5e5e5;
      }
      .housing-dialog-tree {
        padding: 10px 0;
      }
      .housing-dialog-footer {
        padding: 10px 0;
        text-align: right;
        border-top: 1px solid #e5e5e5;
      }
    }
  }
}

.heightS {
  height: 25px;
  line-height: 25px;
}
</style>
