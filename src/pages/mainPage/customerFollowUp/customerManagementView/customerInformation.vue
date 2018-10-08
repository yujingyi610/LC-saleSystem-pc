<template>
  <div class="customer-information">
    <div class="m-form" v-if="labeLValue.customInfoLabel">
      <el-form :inline="true" label-width="100px">
        <p class="color-title-green mb-20">基本信息</p>
        <!-- 基本信息 -->
        <div class="of-hidden">
          <el-row>
            <el-col :span="16">
              <el-row>
                <el-col :span="12" v-if="labeLValue.customInfoLabel.nameLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.nameLabel.labelName+'：'" 
                  >
                    {{ruleForm.name}}
                  </el-form-item>
                </el-col>

                <el-col :span="12" v-if="labeLValue.customInfoLabel.sexLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.sexLabel.labelName+'：'"  
                  >
                    {{ruleForm.sex}}
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12" v-if="labeLValue.customInfoLabel.levelLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.levelLabel.labelName+'：'"  
                  >
                    {{ruleForm.customLevel}}
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item 
                    label="首次接触方式：" 
                  >
                    {{ruleForm.firstTouchMethod}}
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12" v-if="labeLValue.customInfoLabel.ageSectionLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.ageSectionLabel.labelName+'：'"
                  >
                    {{ruleForm.ageSection}}
                  </el-form-item>
                </el-col>

                <el-col :span="12" v-if="labeLValue.customInfoLabel.birthdayLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.birthdayLabel.labelName+'：'"
                  >
                    {{ruleForm.birthday}}
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12" v-if="labeLValue.customInfoLabel.isOwnerLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.isOwnerLabel.labelName+'：'"
                  >
                    {{ruleForm.isOwner}}
                  </el-form-item>
                </el-col>

                <el-col :span="12" v-if="labeLValue.customInfoLabel.getwayLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.getwayLabel.labelName+'：'"
                  >
                    {{ruleForm.source}}
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12" v-if="labeLValue.customInfoLabel.workAreaLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.workAreaLabel.labelName+'：'"
                  >
                    {{ruleForm.workInfoName}}
                  </el-form-item>
                </el-col>

                <el-col :span="12" v-if="labeLValue.customInfoLabel.infomationLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.infomationLabel.labelName+'：'"
                  >
                    {{ruleForm.dwellInfo}}
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12" v-if="labeLValue.customInfoLabel.dwellAreaLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.dwellAreaLabel.labelName+'：'"
                  >
                    {{ruleForm.dwellRegionName}}
                  </el-form-item>
                </el-col>

                <el-col :span="12" v-if="labeLValue.customInfoLabel.dwellEstateLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.dwellEstateLabel.labelName+'：'"
                  >
                    {{ruleForm.dwellGarden}}
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12" v-if="labeLValue.customInfoLabel.dwellInAreaLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.dwellInAreaLabel.labelName+'：'" 
                  >
                    {{ruleForm.dwellArea}}
                  </el-form-item>
                </el-col>

                <el-col :span="12" v-if="labeLValue.customInfoLabel.comAddressLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.comAddressLabel.labelName+'：'" 
                  >
                    {{ruleForm.addr}}
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12" v-if="labeLValue.customInfoLabel.certificateTypeLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.certificateTypeLabel.labelName+'：'"
                  >
                    {{ruleForm.certificateType}}
                  </el-form-item>
                </el-col>

                <el-col :span="12" v-if="labeLValue.customInfoLabel.certificateNumberLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.certificateNumberLabel.labelName+'：'"
                  >
                    {{ruleForm.certificateNo}}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" v-if="labeLValue.customInfoLabel.maritalStatusLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.maritalStatusLabel.labelName+'：'"
                  >
                    {{ruleForm.maritalStatus}}
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <!-- 手机号码 -->
            <el-col :span="8">
              <template v-for="(item,index) in ruleForm.tel" >
                <el-col :span="24" :key="item.id" >
                  <el-form-item 
                    class="mobile-item"
                    :label="index === 0 ? ''+labeLValue.customInfoLabel.telLabel.labelName+'' : ' '" 
                  >
                    <span class="inline-block">
                      {{item.phone}}
                    </span>
                    <!-- 常用 与 非常用 判断 -->
                    <template v-if="item.isCommon === true">
                      <span class="inline-block">常用</span>
                    </template>
                    <template v-else>
                      <span 
                        @click="handSetCommon(index)" 
                        class="inline-block color-green cursor"
                      >
                        设为常用
                      </span>
                    </template>
                  </el-form-item>
                </el-col>
              </template>
            </el-col>
          </el-row>
        </div>
        <p class="color-title-green mb-20">购房需求</p>
        <!-- 购房需求 -->
        <div class="of-hidden">
          <template v-for="(item,index) in ruleForm.purchaseArr">
            <!-- 收缩容器 -->
            <template v-if="item.isOpen === false">
              <div :key="item.id" class="shrink-box">
                <div class="fl left">
                  <el-col :span="2">
                    <span class="ml-10 titles">购房需求{{index + 1}}</span>
                  </el-col>
                  <el-col :span="5" v-if="labeLValue.customNeedLabel.formatLabel">
                    <span>{{labeLValue.customNeedLabel.formatLabel.labelName+'：'}}{{item.formatName}}</span>
                  </el-col>
                  <el-col :span="5" v-if="labeLValue.customNeedLabel.needAreaLabel">
                    <span>{{labeLValue.customNeedLabel.needAreaLabel.labelName+'：'}}
                      <template v-if="item.needArea">
                        {{item.needArea}}m<sup class="m-sup">2</sup>
                      </template>
                    </span>
                  </el-col>
                  <el-col :span="5" v-if="labeLValue.customNeedLabel.habitableLabel">
                    <span>{{labeLValue.customNeedLabel.habitableLabel.labelName+'：'}}{{item.bedroomType}}</span>
                  </el-col>
                  <el-col :span="5" v-if="labeLValue.customNeedLabel.totalBudgetLabel">
                    <span>{{labeLValue.customNeedLabel.totalBudgetLabel.labelName+'：'}}
                      {{item.totalBdget && item.totalBdget + '万元'}}
                    </span>
                  </el-col>
                </div>
                <div class="fr">
                  <!-- 展开 -->
                  <i 
                    @click="handleHouseOpen(index)"
                    class="el-icon-arrow-down ft-20 cursor mr-10"
                  >
                  </i>
                </div>
              </div>
            </template>
            <!-- 表单容器 -->
            <template v-else>
              <div :key="item.key" :class="{'border-active' : item.active}" class="m-item-form">
                <el-row>
                  <el-col :span="8" v-if="labeLValue.customNeedLabel.formatLabel">
                    <el-form-item 
                      :label="labeLValue.customNeedLabel.formatLabel.labelName+'：'"
                    >
                      {{item.formatName}}
                    </el-form-item>
                  </el-col>

                  <el-col :span="8" v-if="labeLValue.customNeedLabel.needAreaLabel">
                    <el-form-item 
                      :label="labeLValue.customNeedLabel.needAreaLabel.labelName+'：'"
                    >
                      {{item.needArea}}
                    </el-form-item>
                  </el-col>

                  <el-col :span="8" v-if="labeLValue.customNeedLabel.totalBudgetLabel">
                    <el-form-item 
                      label-width="104"
                      :label="labeLValue.customNeedLabel.totalBudgetLabel.labelName+'：'"
                    >
                      {{item.totalBdget}}
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8" v-if="labeLValue.customNeedLabel.needCountLabel">
                    <el-form-item 
                      :label="labeLValue.customNeedLabel.needCountLabel.labelName+'：'"
                    >
                      {{item.needCount}}
                    </el-form-item>
                  </el-col>

                  

                  <el-col :span="8" v-if="labeLValue.customNeedLabel.mainUseLabel">
                    <el-form-item 
                      :label="labeLValue.customNeedLabel.mainUseLabel.labelName+'：'"
                    >
                      {{item.mainUse}}
                    </el-form-item>
                  </el-col>

                  <el-col :span="8" v-if="labeLValue.customNeedLabel.houseProjectLabel">
                    <el-form-item 
                      :label="labeLValue.customNeedLabel.houseProjectLabel.labelName+'：'" 
                    >
                      {{item.houseProject}}
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8" v-if="labeLValue.customNeedLabel.carFlagLabel">
                    <el-form-item 
                      :label="labeLValue.customNeedLabel.carFlagLabel.labelName+'：'"
                    >
                      {{item.carFlag}}
                    </el-form-item>
                  </el-col>

                  <el-col :span="8" v-if="labeLValue.customNeedLabel.habitableLabel">
                    <el-form-item 
                      :label="labeLValue.customNeedLabel.habitableLabel.labelName+'：'"
                    >
                      {{item.bedroomType}}
                    </el-form-item>
                  </el-col>

                  <el-col :span="8" v-if="labeLValue.customNeedLabel.orientationLabel">
                    <el-form-item 
                      :label="labeLValue.customNeedLabel.orientationLabel.labelName+'：'"
                    >
                      {{item.orientation}}
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8" v-if="labeLValue.customNeedLabel.focusLabel">
                    <el-form-item 
                       :label="labeLValue.customNeedLabel.focusLabel.labelName+'：'"
                    >
                      {{item.focus}}
                    </el-form-item>
                  </el-col>

                  <el-col :span="8" v-if="labeLValue.customNeedLabel.dragLabel">
                    <el-form-item 
                      :label="labeLValue.customNeedLabel.dragLabel.labelName+'：'"
                    >
                      {{item.drag}}
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>

                  <el-col :span="12" v-if="labeLValue.customNeedLabel.intentionNoLabel">
                    <el-form-item 
                      :label="labeLValue.customNeedLabel.intentionNoLabel.labelName+'：'"
                    >
                      {{item.intentionNo}}
                    </el-form-item>
                  </el-col>

                  <!-- 操作 -->
                  <div class="fr mt-10">
                    <!-- 收起 -->
                    <i
                      @mouseenter="handleHouseListMouseenter(item,index)"
                      @mouseleave="handleHouseListMouseleave(item,index)"
                      @click="handleHouseStop(item,index)"
                      class="color-green el-icon-arrow-up cursor ft-20 mr-10"
                    >
                    </i>
                  </div>
                </el-row>
              </div>
            </template>
          </template>
        </div>
        <p class="color-title-green mb-20">购买力</p>
        <!-- 购买力 -->
        <div class="of-hidden">
          <el-row>
            <el-col :span="8" v-if="labeLValue.customPurchasingPowerLabel.payTypeLabel">
              <el-form-item :label="labeLValue.customPurchasingPowerLabel.payTypeLabel.labelName+'：'">
                {{ruleForm.payType}}
              </el-form-item>
            </el-col>

            <el-col :span="8" v-if="labeLValue.customPurchasingPowerLabel.existingPropertyLabel">
              <el-form-item :label="labeLValue.customPurchasingPowerLabel.existingPropertyLabel.labelName+'：'">
                {{ruleForm.existingProperty}}
              </el-form-item>
            </el-col>

            <el-col :span="8" v-if="labeLValue.customPurchasingPowerLabel.existingLoan">
              <el-form-item :label="labeLValue.customPurchasingPowerLabel.existingLoan.labelName+'：'">
                {{ruleForm.existingLoan}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8" v-if="labeLValue.customPurchasingPowerLabel.quotaLabel">
              <el-form-item :label="labeLValue.customPurchasingPowerLabel.quotaLabel.labelName+'：'">
                {{ruleForm.quotaFlag}}
              </el-form-item>
            </el-col>

            <el-col :span="8" v-if="labeLValue.customPurchasingPowerLabel.familyLabel">
              <el-form-item :label="labeLValue.customPurchasingPowerLabel.familyLabel.labelName+'：'">
                {{ruleForm.familyStructure}}
              </el-form-item>
            </el-col>

            <el-col :span="8" v-if="labeLValue.customPurchasingPowerLabel.childrenNumLabel">
              <el-form-item :label="labeLValue.customPurchasingPowerLabel.childrenNumLabel.labelName+'：'">
                {{ruleForm.childrenNum}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8" v-if="labeLValue.customPurchasingPowerLabel.familyYearIncomeLabel">
              <el-form-item :label="labeLValue.customPurchasingPowerLabel.familyYearIncomeLabel.labelName+'：'">
                {{ruleForm.familyYearlyIncome}}
              </el-form-item>
            </el-col>

            <el-col :span="8" v-if="labeLValue.customPurchasingPowerLabel.industryLabel">
              <el-form-item :label="labeLValue.customPurchasingPowerLabel.industryLabel.labelName+'：'">
                {{ruleForm.industry}}
              </el-form-item>
            </el-col>

            <el-col :span="8" v-if="labeLValue.customPurchasingPowerLabel.dutyLabel">
              <el-form-item :label="labeLValue.customPurchasingPowerLabel.dutyLabel.labelName+'：'">
                {{ruleForm.duty}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8" v-if="labeLValue.customPurchasingPowerLabel.educationalLabel">
              <el-form-item :label="labeLValue.customPurchasingPowerLabel.educationalLabel.labelName+'：'">
                {{ruleForm.educational}}
              </el-form-item>
            </el-col>

            <el-col :span="8" v-if="labeLValue.customPurchasingPowerLabel.outwayLabel">
              <el-form-item :label="labeLValue.customPurchasingPowerLabel.outwayLabel.labelName+'：'">
                {{ruleForm.outWay}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row v-if="labeLValue.customPurchasingPowerLabel.carBrandLabel">
            <el-form-item :label="labeLValue.customPurchasingPowerLabel.carBrandLabel.labelName+'：'">
              {{ruleForm.carBrand}}
            </el-form-item>
          </el-row>
        </div>
        <p class="color-title-green mb-20">其他信息</p>
        <!-- 其他信息 -->
        <div class="of-hidden">
          <template v-for="(item,index) in ruleForm.orderArr">
            <div :key="item.id">
              <!-- 收缩容器 -->
                <template v-if="item.isOpen === false">
                  <div class="order-hide-box">
                    <el-row>
                      <el-col class="ml-10" :span="6" v-if="labeLValue.customElseLabel.customContactLabel">
                        {{labeLValue.customElseLabel.customContactLabel.labelName+'：'}}{{item.refCustomName}}
                      </el-col>
                      <el-col :span="6" v-if="labeLValue.customElseLabel.relationshipLabel">
                        {{labeLValue.customElseLabel.relationshipLabel.labelName+'：'}}{{item.relationship}}
                      </el-col>
                      <el-col :span="6" v-if="labeLValue.customElseLabel.contactMethodLabel">
                        <span 

                          class="ellipsis"
                          :style="{
                            display : 'inline-block',
                            width : '100%',
                          }"
                        >
                          {{labeLValue.customElseLabel.contactMethodLabel.labelName+'：'}}
                          {{
                            item.contactInformation[0].phone
                          }}
                        </span>
                      </el-col>
                      <div class="fr">
                        <!-- 展开8888888888 -->
                        <i 
                          class="ft-20 cursor el-icon-arrow-down mr-10 mt-10"
                          @click="handleOrderShow(item,index)"
                        >
                        </i>
                      </div>
                    </el-row>
                  </div>
                </template>
                <!-- 表单容器 -->
                <template v-else>
                  <div :key="item.key" :class="{'border-green' : item.active}" class="order-show-box">
                    <el-row>
                      <!-- 关联客户 -->
                      <el-col :span="8" v-if="labeLValue.customElseLabel.customContactLabel">
                        <el-form-item 
                          :label="labeLValue.customElseLabel.customContactLabel.labelName+'：'"
                        >
                          {{item.refCustomName}}
                        </el-form-item>
                      </el-col>

                      <!-- 与主客户关系 -->
                      <el-col :span="8" v-if="labeLValue.customElseLabel.relationshipLabel">
                        <el-form-item 
                          :label="labeLValue.customElseLabel.relationshipLabel.labelName+'：'"
                        >
                          {{item.relationship}}
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row>
                      <!-- 循环 联系方式 -->
                      <template v-for="(item2,index2) in item.contactInformation">
                        <!-- 增加 换行 -->
                        <div :key="item2.id" class="clear" v-if="(index % 3 === 0) && (index !== 0)"></div>
                        <!-- 联系方式 -->
                        <div 
                          :key="item2.key" 
                          class="inline-block va-middle"
                          :class="{'order-next' : !(index2 === 0 || index2 % 3 === 0)}"
                        >
                          <el-form-item 
                            :label="index2 === 0 ? '联系方式：' : ' '"
                          >
                            {{item2.phone}}
                            <!-- 常用 or 设为常用 -->
                            <span v-if="item2.phone">
                            <span class="w-50" v-if="item2.isCommon === true">常用</span>
                            <span 
                              v-else 
                              class="color-green cursor w-50"
                              @click="handleOrderCommon(item2,index2,index)"
                            >
                              设为常用
                            </span>
                            </span>
                          </el-form-item>
                        </div>
                  
                      </template>
                      
                      <div class="fr">
                        <!--  收起  -->
                        <i
                          @mouseenter="handleOrderMouseenter(item,index)"
                          @mouseleave="handleOrderMouseleave(item,index)"
                          @click="handleOrderHide(item,index)"
                          class="order-stop color-green el-icon-arrow-up cursor ft-20 mr-10"
                        >
                        </i>
                      </div>

                    </el-row>
                  </div>
                </template>
            </div>
          </template>

          <!-- 兴趣爱好 -->
          <el-row>
            <el-col :span="8" v-if="labeLValue.customElseLabel.interestLabel">
              <el-form-item 
                :label="labeLValue.customElseLabel.interestLabel.labelName+'：'" 
              >
                {{ruleForm.interest}}
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 客户标签 -->
          <el-row v-if="labeLValue.customElseLabel.tagLabel">
            <div>
              <el-form-item 
                :label="labeLValue.customElseLabel.tagLabel.labelName+'：'" 
              >
                <!-- 标签显示 tag -->
                <div>
                  <el-tag
                    class="mr-10"
                    type="success"
                    :key="item.id"
                    v-for="(item) in ruleForm.tab"
                    :disable-transitions="false"
                  >
                    {{item.itemValue}}
                  </el-tag>
                </div>
              </el-form-item>
            </div>
          </el-row>

          <!-- 备注 -->
          <el-row v-if="labeLValue.customElseLabel.remarkLabel">
            <el-form-item 
              :label="labeLValue.customElseLabel.remarkLabel.labelName+'：'" 
            >
              {{ruleForm.remark}}
            </el-form-item>
          </el-row>
        </div>
        <!-- 自定义 标签数据 -->
        <div class="of-hidden mb-30">
          <template v-for="(item) in ruleForm.customerArr">
            <el-col :key="item.id" :span="8">
              <el-form-item 
                :label="item.labelName + '：'"
              >
                {{item.textValue}}
              </el-form-item>
            </el-col>
          </template>
        </div>
      </el-form>
    </div>
    
    <!-- <div class="btn-box text-center">
      <el-button v-has="'cst:niche:edit'" @click="handleEdit" type="primary">编辑资料</el-button>
    </div> -->
  </div>
</template>

<script>
// 获取请求接口
import {
  getCustomerDetails, //获取页面详细信息
  getTagListForCascader, //获取客户标签
  getCheckLevel, //获取校验等级
  upDataCostom, //更新客户详情
  telIsMain, //设置手机号码常用
  orderTelIsMain //设置其他联系人手机号码常用
} from "@/api/pages/mainPage/customerFollowUp";

export default {
  data() {
    return {
      informationList: {},
      learnWay: "GETWAY",

      //项目id
      projectId: "",
      ruleForm: {
        /* -------------------------基本信息------------------------- */
        //客户id
        id: "",
        // 姓名
        name: "",
        // 性别
        sex: "",
        // 年龄段
        ageSection: "",
        // 生日
        birthday: "",
        //首次接触方式
        firstTouchMethod: "",
        // 是否到访
        visitFlag: "",
        // 意向等级
        customLevel: "",
        // 是否绿城业主
        isOwner: "",
        // 获知途径
        source: "",
        // 工作区域id
        workInfo: "",
        //工作区域名称
        workInfoName: "",
        // 现居住情况
        dwellInfo: "",
        // 居住区域
        dwellRegion: "",
        //居住区域名称
        dwellRegionName: "",
        // 现居小区
        dwellGarden: "",
        // 现居面积
        dwellArea: "",
        // 通讯地址
        addr: "",
        // 证件类型
        certificateType: "",
        //证件类型code
        getCertificateType: "",
        // 证件号码
        certificateNo: "",
        //手机号码
        telString: "",
        // 手机号码 list
        tel: [],
        //客户元素列表
        customItemList: [],
        //项目名称
        projectOptions: [],

        maritalStatus: "", // 婚姻

        /* -------------------------购房需求------------------------- */
        // 购房需求 list
        purchaseArr: [
          {
            // 增加key 解决校验问题
            key: Math.random(),
            // 当前是否展开
            isOpen: true,
            // 购房主要用途
            mainUse: "",
            // 购房主要用途_其他文本框
            mainUseOrder: "",
            // 需求业态
            formatName: "",
            //业态编码
            formatCode: "",
            //备注
            remark: "",
            //商机id
            nicheId: "",
            // 居室
            bedroomType: "",
            // 朝向
            orientation: "",
            // 需求面积
            needArea: "",
            // 总价预算
            totalBdget: "",
            //需求id
            needId: null,
            // 需求套数
            needCount: "",
            // 意向户号
            intentionNo: "",
            // 意向户号文本显示
            intentionNoPlaceholder: "",
            // 竞品楼盘
            houseProject: "",
            //竞品楼盘编码
            houseProjectCode: "",
            // 车位需求
            carFlag: "",
            // 关注要素
            focus: "",
            // 主要抗性
            drag: "",
            //过度数组
            customItemList: []
          }
        ],

        /* -------------------------购买力------------------------- */
        // 付款方式
        payType: "",
        //商机id
        nicheId: "",
        // 现有房产
        existingProperty: "",
        // 现有贷款
        existingLoan: "",
        // 购房名额
        quotaFlag: "",
        // 家庭构成
        familyStructure: "",
        // 子女人数
        childrenNum: "",
        // 家庭年收入
        familyYearlyIncome: "",
        // 工作行业
        industry: "",
        // 工作职务
        duty: "",
        // 学历
        educational: "",
        // 出行方式
        outWay: "",
        // 汽车品牌
        carBrand: "",

        /* -------------------------其他信息------------------------- */
        /* 其他信息 list */
        orderArr: [
          {
            // 增加key 解决校验问题
            key: Math.random(),
            // 当前是否展开
            isOpen: true,
            // 当前是否选中
            active: false,
            //其他联系人id
            otherId: null,

            // 关联客户
            refCustomName: "",
            // 联系方式
            contactInformation: [], // ??
            // 与主客户关系
            relationship: "",
            //项目id
            projectId: "",

            //联系方式过度
            contactInformationArray: []
          }
        ],
        // 兴趣爱好
        interest: "",
        // 客户标签
        tab: [],
        // 客户标签 select value
        tabValue: "",
        // 客户标签 select options
        tabOptions: [
          { label: "张三", value: "张三id" },
          { label: "李四", value: "李四id" }
        ],
        // 客户标签 输入框 值
        customerLabelInputValue: "",
        // 客户标签 输入框 显示影藏
        customerLabelInputVisible: false,
        // 备注
        remark: "",
        /* -------------------------自定义 标签数据------------------------- */
        customerArr: [],
        //判客表现内容
        content: "",
        //新增的手机号码
        telPhone: "",
        //判断手机号码是否出现
        add: false,
        //判断客户联系人的手机号码是否出现
        phoneAdd: false,
        //判断客户联系人的手机号码是否出现
        telPhonetel: false,
        //判断手机号码是否出现
        telAdd: false,
        //新增的其他联系人的手机号码
        telPhone_1: "",
        /*--------------------------------客户元素数据保存--------------------------*/
        //客户元素数组
        customItemList: [],
        //——元素id
        elementId: null,
        //校验控制-1
        required_1: true,
        //校验控制-2
        required_2: true,
        //客户需求抗性等过度数组
        focusArr_2: []
      },
      //上传数据
      obj: {},
      //购房阶段
      buyStage: "",
      //标签值以及是否必填
      labeLValue: {},
      // 初始化 所有需要校验的字段
      rules: {
        /* 基本信息 校验字段 */
        name: [{}],
        sex: [{}],
        ageSection: [{}],
        birthday: [{}],
        visitFlag: [{}],
        customLevel: [{}],
        isOwner: [{}],
        source: [{}],
        workInfoName: [{}],
        dwellInfo: [{}],
        dwellRegionName: [{}],
        dwellGarden: [{}],
        dwellArea: [{}],
        addr: [{}],
        certificateType: [{}],
        certificateNo: [{}],
        telRules: [{}],
        /* 购房需求 校验字段 */
        mainUse: [{}],
        formatName: [{}],
        bedroomType: [{}],
        orientation: [{}],
        needArea: [{}],
        totalBdget: [{}],
        needCount: [{}],
        intentionNo: [{}],
        houseProject: [{}],
        carFlag: [{}],
        focus: [{}],
        drag: [{}],
        /* 购买力 校验字段 */
        payType: [{}],
        existingProperty: [{}],
        existingLoan: [{}],
        quotaFlag: [{}],
        familyStructure: [{}],
        childrenNum: [{}],
        familyYearlyIncome: [{}],
        industry: [{}],
        duty: [{}],
        educational: [{}],
        outWay: [{}],
        carBrand: [{}],
        /* 其他信息 校验字段 */
        refCustomName: [{}],
        contactInformation: [{}],
        relationship: [{}],
        interest: [{}],
        tab: [{}],
        remark: [{}]
      },
      // 保存后台返回的 所有校验规则
      ajaxRules: {},
      // 保存后台返回的 自定义标签数据
      initCustomer: [
        /* 
            // 标签类型 一共6种
            1 单选
            2 多选
            3 文本
            4 数字
            5 日期
            6 单选加补充说明
          */
        // 单选
        {
          // 定义标签类型
          customerMype: "单选", // ??
          // 标签名称
          customerMame: "我是单选", // ??
          // 标签值
          customerMalue: "", // ??
          // 标签数据
          customerMata: [
            // ??
            { label: "要想生活", value: "要想生活" },
            { label: "过得去", value: "过得去" },
            { label: "头上", value: "头上" },
            { label: "就要", value: "就要" },
            { label: "带点绿", value: "带点绿" },
            { label: "其他", value: "其他" }
          ]
        },
        // 多选
        {
          // 定义标签类型
          customerMype: "多选", // ??
          // 标签名称
          customerMame: "我是多选", // ??
          // 标签值
          customerMalue: "", // ??
          // 标签数据
          customerMata: [
            // ??
            { label: "要想生活", value: "要想生活" },
            { label: "过得去", value: "过得去" },
            { label: "头上", value: "头上" },
            { label: "就要", value: "就要" },
            { label: "带点绿", value: "带点绿" },
            { label: "其他", value: "其他" }
          ]
        },
        // 文本
        {
          customerMype: "文本",
          customerMame: "我是文本",
          customerMalue: "啦啦啦"
        },
        // 数字
        {
          customerMype: "数字",
          customerMame: "我是数字",
          customerMalue: "1234"
        },
        // 日期
        {
          customerMype: "日期",
          customerMame: "我是日期",
          customerMalue: "2012-12-13"
        },
        // 单选加补充说明
        {
          // 定义标签类型
          customerMype: "单选加补充说明", // ??
          // 标签名称
          customerMame: "单选加补充", // ??
          // 标签值
          customerMalue: "", // ??
          // 标签数据
          customerMata: [
            // ??
            { label: "要想生活", value: "要想生活" },
            { label: "过得去", value: "过得去" },
            { label: "头上", value: "头上" },
            { label: "就要", value: "就要" },
            { label: "带点绿", value: "带点绿" },
            { label: "其他", value: "其他" }
          ]
        }
      ],

      // 城市tree 四级列表
      cityTree: [
        {
          label: "浙江省",
          value: "zjs",
          children: [{ label: "杭州市", value: "hzs" }]
        }
      ],

      postCityName: [], //发送地址信息过度数组
      postSourceName: [], //发送获取途径信息过度数组
      postRegionName: [], //发送居住区域信息过度地址
      postWorkInfoName: [], //发送居住区域信息过度地址
      // 获知途径 options
      accessToKnowledgeOptions: [],
      // 客户标签 options
      customerOptions: [
        { label: "客户a", id: "aa" },
        { label: "客户b", id: "bb" }
      ]
    };
  },
  props: ["obtainCustomerDetails"],
  watch: {
    obtainCustomerDetails(curVal, oldVal) {
      if (curVal) {
        this.customerDetails = curVal;
      }
    }
  },
  created() {
    this.getLabel();
  },
  beforeMount() {
    
  },
  mounted() {},
  methods: {
    //获取页面信息//
    initTableList() {
      let data = {
        id: this.$route.query.id
      };
      getCustomerDetails(data).then(res => {
        if (res.status === 200) {
          //赋值
          this.determineOutput(res.data);
          //更新手机号码
          this.obj = res.data;
        }
      });
    },
    //判断规则函数赋值到
    determineOutput(data) {
      if (data.projectId) {
        this.projectId = data.projectId;
      }
      /* -------------------------基本信息------------------------- */
      //客户id
      this.ruleForm.id = data.id;
      //项目id
      this.ruleForm.projectId = data.projectId;
      //项目id
      this.ruleForm.nicheId = data.nicheId;
      //姓名
      this.ruleForm.name = data.name;
      //首次接触方式
      this.ruleForm.firstTouchMethod = data.firstTouchMethod;
      //性别
      this.ruleForm.sex = data.sex;
      if (data.sex === "1") {
        this.ruleForm.sex = "男";
      } else if (data.sex === "0") {
        this.ruleForm.sex = "女";
      }
      //年龄段
      this.ruleForm.ageSection = data.ageSection;
      //生日
      this.ruleForm.birthday = null ? "" : data.birthday;
      // //是否到访
      this.ruleForm.isVisit = data.isVisit;
      if (data.isVisit == "是") {
        this.ruleForm.isVisit = "已到访";
      } else {
        this.ruleForm.isVisit = "未到访";
      }

      // //意向等级
      this.ruleForm.customLevel = data.cstLevel;
      // //是否绿城业主
      if (data.isOwner == "1") {
        this.ruleForm.isOwner = "是";
      } else if (data.isOwner == "0") {
        this.ruleForm.isOwner = "否";
      }

      // //获知途径

      this.ruleForm.source = data.sourceFullPath;

      // //工作区域
      if (data.workInfoName != null) {
        this.ruleForm.workInfoName = data.workInfoName;
      }
      //现居住情况
      this.ruleForm.dwellInfo = data.dwellInfo;
      //居住区域
      this.ruleForm.dwellRegionName = data.dwellRegionName;
      //居住小区
      this.ruleForm.dwellGarden = data.dwellGarden;
      //居住面积
      this.ruleForm.dwellArea = data.dwellArea;
      //通讯地址
      this.ruleForm.addr = data.addr;
      //证件类型
      this.ruleForm.certificateType = data.certificateName;
      this.ruleForm.getCertificateType = data.certificateType;
      //证件号码
      this.ruleForm.certificateNo = data.certificateNo;
      //手机号码list

      if (
        data.customContactMethodList &&
        data.customContactMethodList.length > 0
      ) {
        if (data.customContactMethodList.length === 1) {
          this.ruleForm.tel.push({
            istel: false,
            phone: data.customContactMethodList[0].no,
            isCommon: true,
            customId: data.customContactMethodList[0].customId,
            id: data.customContactMethodList[0].id
          });
        } else {
          for (let i = 0; i < data.customContactMethodList.length; i++) {
            this.ruleForm.tel.push({
              istel: false,
              phone: data.customContactMethodList[i].no,
              isCommon:
                data.customContactMethodList[i].isMain == 1 ? true : false,
              customId: data.customContactMethodList[i].customId,
              id: data.customContactMethodList[i].id
            });
          }
        }
      }
      //默认第一个手机号码为常用
      //this.ruleForm.tel[0].isCommon = true

      //客户元素列表
      this.ruleForm.customItemList = data.customItemList;

      this.ruleForm.maritalStatus = data.maritalStatusText; // 婚姻

      /* -------------------------购房需求------------------------- */

      if (data.nicheNeedList.length > 0) {
        this.purchaseArr = [];
        let purchaseArray = [];
        for (let i = 0; i < data.nicheNeedList.length; i++) {
          let dragStr = "";
          let focusStr = "";
          if (data.nicheNeedList[i].customItemList != null) {
            for (
              let j = 0;
              j < data.nicheNeedList[i].customItemList.length;
              j++
            ) {
              //取出关注要素
              if (
                data.nicheNeedList[i].customItemList[j].itemType === "FOCUS"
              ) {
                focusStr +=
                  data.nicheNeedList[i].customItemList[j].itemValue + " ";
              }
              //取出主要抗性
              if (data.nicheNeedList[i].customItemList[j].itemType === "DRAG") {
                dragStr +=
                  data.nicheNeedList[i].customItemList[j].itemValue + " ";
              }
            }
          }

          //获取意向户号
          let intentionNoPlaceholder = "";
          if (data.nicheNeedList[i].intentionNoList) {
            for (
              let kkkk = 0;
              kkkk < data.nicheNeedList[i].intentionNoList.length;
              kkkk++
            ) {
              intentionNoPlaceholder +=
                "," + data.nicheNeedList[i].intentionNoList[kkkk].intentionName;
            }
            intentionNoPlaceholder = intentionNoPlaceholder.substring(1);
          }
          //车位需求
          if (data.nicheNeedList[i].carFlag === 1) {
            data.nicheNeedList[i].carFlag = "有";
          } else if (data.nicheNeedList[i].carFlag === 0) {
            data.nicheNeedList[i].carFlag = "无";
          }
          purchaseArray.push({
            // 增加key 解决校验问题
            key: Math.random(),
            // 当前是否展开
            isOpen: true,
            // 购房主要用途
            mainUse: data.nicheNeedList[i].mainUseText,
            // 购房主要用途_其他文本框
            mainUseOrder: data.nicheNeedList[i].mainUseOrde,
            // 需求业态
            formatName: data.nicheNeedList[i].formatName,
            // 居室
            bedroomType: data.nicheNeedList[i].bedroomType,
            // 朝向
            orientation: data.nicheNeedList[i].orientation,
            // 需求面积
            needArea: data.nicheNeedList[i].needArea,
            // 总价预算
            totalBdget: data.nicheNeedList[i].totalBudget,
            // 需求套数
            needCount: data.nicheNeedList[i].needCount,
            // 意向户号
            intentionNo: data.nicheNeedList[i].intentionNames,
            // 竞品楼盘
            houseProject: data.nicheNeedList[i].houseProject,
            // 车位需求
            carFlag: data.nicheNeedList[i].carFlag,
            // 关注要素
            focus: focusStr,
            // 主要抗性
            drag: dragStr
          });
        }

        this.ruleForm.purchaseArr = purchaseArray;

        if (this.ruleForm.purchaseArr.length === 1) {
          this.ruleForm.purchaseArr[0].isOpen = true;
        } else {
          for (let i = 0; i < this.ruleForm.purchaseArr.length; i++) {
            this.ruleForm.purchaseArr[i].isOpen = false;
          }
        }
      }
      //关注要素（多选框）

      /* -------------------------购买力------------------------- */
      //付款方式
      this.ruleForm.payType = data.payType;
      //现有房产
      this.ruleForm.existingProperty = data.existingProperty;
      //现有贷款
      this.ruleForm.existingLoan = data.existingLoan;
      //购房名额
      if (data.quotaFlag == "1") {
        this.ruleForm.quotaFlag = "是";
      } else if (data.quotaFlag == "0") {
        this.ruleForm.quotaFlag = "否";
      }

      //家庭构成
      this.ruleForm.familyStructure = data.familyStructure;
      //子女人数
      this.ruleForm.childrenNum = data.childrenNum;
      //家庭年收入
      this.ruleForm.familyYearlyIncome = data.familyYearlyIncome;
      //工作行业
      this.ruleForm.industry = data.industry;
      //工作职务
      this.ruleForm.duty = data.duty;
      //学历
      this.ruleForm.educational = data.educational;
      //出行方式
      this.ruleForm.outWay = data.outWay;
      //汽车品牌
      for (let i = 0; i < data.customItemList.length; i++) {
        if (data.customItemList[i].itemType === "CAR_BRAND") {
          this.ruleForm.carBrand += data.customItemList[i].itemValue + "  ";
        }
      }
      //兴趣爱好ruleForm.interest
      for (let i = 0; i < data.customItemList.length; i++) {
        if (data.customItemList[i].itemType === "INTEREST") {
          this.ruleForm.interest += data.customItemList[i].itemValue + "  ";
        }

        if (data.customItemList[i].itemType === "TAG") {
          this.ruleForm.tab.push(data.customItemList[i]);
        }
      }

      /* -------------------------其他信息------------------------- */

      if (data.customContactList.length > 0) {
        this.orderArr = [];
        let orderArray = [];
        for (let i = 0; i < data.customContactList.length; i++) {
          //过度数组
          let contactInformationArray_1 = [];
          orderArray.push({
            // 增加key 解决校验问题
            key: Math.random(),
            // 当前是否展开
            isOpen: true,
            // 当前是否选中
            active: false,
            //其他联系人id
            otherId: data.customContactList[i].id,
            // 关联客户
            refCustomName: data.customContactList[i].name,
            // 联系方式
            contactInformation: contactInformationArray_1, // ??
            // 与主客户关系
            relationship: data.customContactList[i].relationship,
            //项目id
            projectId: data.customContactList[i].projectId,
            //商机id
            nicheId: data.customContactList[i].nicheId,
            //联系方式过度数组
            contactInformationArray: data.customContactList[i].contactMethodList
          });
          if (data.customContactList[i].contactMethodList) {
            for (
              let kk = 0;
              kk < data.customContactList[i].contactMethodList.length;
              kk++
            ) {
              contactInformationArray_1.push({
                key: Math.random(),
                // 联系方式 手机号
                isphone: false,
                phone: data.customContactList[i].contactMethodList[kk].no,
                //其他联系人id:
                otherId: data.customContactList[i].contactMethodList[kk].id,
                // 是否常用
                isCommon:
                  data.customContactList[i].contactMethodList[kk].isMain === 1
                    ? true
                    : false,
                //备注
                remark: data.customContactList[i].contactMethodList[kk].remark
              });
            }
          } else {
            contactInformationArray_1.push({
              key: Math.random(),
              // 联系方式 手机号
              isphone: false,
              phone: null,
              //其他联系人id:
              otherId: null,
              // 是否常用
              isCommon: null,
              //备注
              remark: null
            });
          }
        }
        //客户需求
        this.ruleForm.orderArr = orderArray;
        if (this.ruleForm.orderArr.length === 1) {
          this.ruleForm.orderArr[0].isOpen = true;
        } else {
          for (let i = 0; i < this.ruleForm.orderArr.length; i++) {
            this.ruleForm.orderArr[i].isOpen = false;
          }
        }
      }
      //备注信息
      this.ruleForm.remark = data.remark;
      //兴趣爱好
      // if(data.interest){
      //   this.ruleForm.interest = data.interest.split(',')
      // }

      //客户标签
      //this.ruleForm.tab = data.tab
      /*-----------------------------需求数组--------------------------*/

      this.ruleForm.customItemList = data.customItemList;

      this.ruleForm.customerArr = data.userDefinedLabel;

      //购房阶段
      this.buyStage = data.buyStage;
      //}
    },
    /* ---------------------基本信息 手机号相关逻辑----------------------------- */
    // 设为常用
    handSetCommon(index) {
      this.ruleForm.tel = this.ruleForm.tel.map((v, k) => {
        v.isCommon = index === k ? true : false;
        return v;
      });
      let data = {
        customId: this.ruleForm.id,
        contactMethodId: this.ruleForm.tel[index].id
      };

      telIsMain(data).then(res => {
        if (res.status === 200) {
        }
      });
    },
    /* ---------------------基本信息 手机号相关逻辑----------------------------- */

    /* ---------------------购房需求 相关逻辑----------------------------- */
    // 点击展开
    handleHouseOpen(index) {
      this.ruleForm.purchaseArr[index].isOpen = true;
    },
    // 点击收起
    handleHouseStop(item, index) {
      this.ruleForm.purchaseArr[index].isOpen = false;
      this.handleHouseListMouseleave(item, index);
    },
    // 鼠标移入
    handleHouseListMouseenter(item, index) {
      this.$set(item, "active", true);
    },
    // 鼠标移出
    handleHouseListMouseleave(item, index) {
      this.$set(item, "active", false);
    },
    /* ---------------------购房需求 相关逻辑----------------------------- */

    /* ---------------------其他信息 相关逻辑----------------------------- */
    // 联系方式 设为常用11111111111111111111otherId
    handleOrderCommon(item2, index2, index) {
      let arr = this.ruleForm.orderArr[index].contactInformation.map((v, k) => {
        v.isCommon = index2 === k ? true : false;
        return v;
      });
      this.ruleForm.orderArr[index].contactInformation = arr;

      let data = {
        contactId: this.ruleForm.orderArr[index].otherId,
        contactMethodId: this.ruleForm.orderArr[index].contactInformation[
          index2
        ].otherId
      };

      orderTelIsMain(data).then(res => {
        if (res.status === 200) {
          console.log("上传成功");
        }
      });
    },
    // 其他信息 收起
    handleOrderHide(item, index) {
      this.ruleForm.orderArr[index].isOpen = false;
      this.handleOrderMouseleave(item, index);
    },
    // 其他信息 展开
    handleOrderShow(item, index) {
      this.ruleForm.orderArr[index].isOpen = true;
    },
    // 其他信息 移入
    handleOrderMouseenter(item, index) {
      this.ruleForm.orderArr[index].active = true;
    },
    // 其他信息 移出
    handleOrderMouseleave(item, index) {
      this.ruleForm.orderArr[index].active = false;
    },
    /* ---------------------其他信息 相关逻辑----------------------------- */

    //获取客户标签
    getLabel() {
      let data = {
        projectId: this.$route.query.projectId,
        groupCodes: "customInfo,customNeed,customPurchasingPower,customElse"
      };
      getCheckLevel(data)
        .then(res => {
          if (res.status === 200) {
            //标签深拷贝
            this.labeLValue = JSON.stringify(res.data);
            this.labeLValue = JSON.parse(this.labeLValue);
          }
        })
        .then(_ => {
          this.initTableList();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.customer-information {
  .bold {
    font-weight: bold;
  }
  .w-150 {
    width: 150px;
  }
  .border-active {
    border: 1px solid #4dbe61 !important;
  }
  .mobile-item {
    .el-form-item__label {
      width: 74px !important;
    }
  }
  .order-item {
    .el-form-item__label {
      width: 0 !important;
    }
  }
  .order-item.el-form-item.is-error input {
    border-color: #f56c6c !important;
  }
  /* 购房需求 style */
  .m-sup {
    display: inline-block;
    vertical-align: middle;
    margin-top: -10px;
  }
  .shrink-box {
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    height: 38px;
    .left {
      width: calc(100% - 30px);
      .titles {
        font-weight: bold;
        font-size: 14px;
      }
    }
    > div {
      line-height: 38px;
    }
    i {
      margin-top: 9px;
    }
  }
  .el-select__tags {
    max-width: initial !important;
  }
  .m-item-form {
    margin-right: 20px;
    padding-top: 18px;
    border: 1px solid transparent;
    border-radius: 4px;
    position: relative;
    .el-icon-circle-plus-outline {
      position: absolute;
      right: -30px;
    }
  }
  /* 其他信息 表单元素  */
  .order-hide-box {
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    height: 38px;
    line-height: 38px;
    margin-bottom: 20px;
  }
  .order-show-box {
    margin-right: 20px;
    padding-top: 18px;
    border: 1px solid transparent;
    border-radius: 4px;
    position: relative;
    .inline-block {
      display: inline-block;
    }
    .w-50 {
      width: 50px;
      display: inline-block;
    }
    /* 关联客户 删除 */
    .delete-customers {
      position: absolute;
      right: 10px;
      top: -10px;
    }
    .order-next {
      margin-left: -100px;
      .el-form-item.is-required .el-form-item__label:before {
        color: transparent;
      }
    }
    /* 关联客户 收起 */
    .order-stop {
      position: absolute;
      bottom: 15px;
      right: 0;
    }
    /* 关联客户 增加 */
    .order-add {
      position: absolute;
      bottom: 15px;
      right: -30px;
    }
  }
}
</style>