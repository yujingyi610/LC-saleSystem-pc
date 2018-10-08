<template>
  <div class="customer-add-or-edit background-m">
    <div class="envelope-box">
      <div class="envelope-title">
        <span class="color-title-green">客户信息</span>
        <div class="fr">
          <i @click="handleClose" class="el-icon-circle-close-outline bold ft-18 cursor"></i>
        </div>
      </div>
      <div class="envelope-title">
        <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="106px">
          <p class="color-title-green mb-20">基本信息</p>
          <!-- 基本信息 表单元素 -->
          <div class="essential-information-box of-hidden">
            <el-col :span="16">
              <el-row>
                <!-- 姓名 -->
                <el-col :span="12" v-if="labeLValue.customInfoLabel.nameLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.nameLabel.labelName+'：'" 
                    prop="name"
                    :rules="rules.nameLabel"
                  >
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                </el-col>

                <!-- 性别 -->
                <el-col :span="12" v-if="labeLValue.customInfoLabel.sexLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.sexLabel.labelName+'：'" 
                    prop="sex"
                    :rules="rules.sexLabel"
                  >
                    <el-select clearable v-model="ruleForm.sex" placeholder="请选择">
                      <el-option
                      v-for="(item) in labeLValue.customInfoLabel.sexLabel.labelDictList"
                      :key="item.id"
                      :label="item.dictName" 
                      :value="item.dictName" 
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              
              <el-row>
                <!-- 意向等级 -->
                <el-col :span="12" v-if="labeLValue.customInfoLabel.levelLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.levelLabel.labelName+'：'" 
                    prop="customLevel"
                    :rules="rules.levelLabel"
                  >
                    <el-select @change="handleCustomLevelChange" clearable v-model="ruleForm.customLevel" placeholder="请选择">
                      <el-option
                      v-for="(item) in labeLValue.customInfoLabel.levelLabel.labelDictList"
                      :key="item.id"
                      :label="item.dictName" 
                      :value="item.dictName" 
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                
                 <el-col :span="12">
                  <el-form-item 
                    label="首次接触方式：" 
                    prop="firstTouchMethod"
                  >
                    <el-input  :disabled="true" v-model="ruleForm.firstTouchMethod"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <!-- 年龄段 -->
                <el-col :span="12" v-if="labeLValue.customInfoLabel.ageSectionLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.ageSectionLabel.labelName+'：'"
                    prop="ageSection"
                    :rules="rules.ageSectionLabel"
                  >
                    <el-select clearable v-model="ruleForm.ageSection" placeholder="请选择">
                      <el-option
                      v-for="(item) in labeLValue.customInfoLabel.ageSectionLabel.labelDictList"
                      :key="item.id"
                      :label="item.dictName" 
                      :value="item.dictName" 
                      ></el-option>
                      
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- 生日 -->
                <el-col :span="12" v-if="labeLValue.customInfoLabel.birthdayLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.birthdayLabel.labelName+'：'"
                    prop="birthday"
                    :rules="rules.birthdayLabel"
                  >
                    <el-date-picker
                      v-model="ruleForm.birthday"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <!-- 是否绿城业主 -->
                <el-col :span="12" v-if="labeLValue.customInfoLabel.isOwnerLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.isOwnerLabel.labelName+'：'"
                    prop="isOwner"
                    :rules="rules.isOwnerLabel"
                  >
                    <el-select clearable v-model="ruleForm.isOwner" placeholder="请选择">
                      <el-option
                      v-for="(item) in labeLValue.customInfoLabel.isOwnerLabel.labelDictList"
                      :key="item.id"
                      :label="item.dictName" 
                      :value="item.dictName" 
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 获知途径labelDictList -->
                <el-col :span="12" v-if="labeLValue.customInfoLabel.getwayLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.getwayLabel.labelName+'：'"
                    prop="source"
                    :rules="rules.getwayLabel"
                  >
                    <el-cascader
                      class="placeholder"
                      expand-trigger="hover"
                      :options="accessToKnowledgeOptions"
                      v-model="ruleForm.source"
                      :placeholder="ruleForm.sourceText"
                      :clearable="true"                    
                      @change="celectSourceChange"
                      
                      >
                    >
                    </el-cascader>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <!-- 工作区域 -->
                <el-col :span="12" v-if="labeLValue.customInfoLabel.workAreaLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.workAreaLabel.labelName+'：'"
                    prop="workInfoName"
                    :rules="rules.workAreaLabel"                  
                  >
                    <el-cascader                  
                    class="placeholder"
                    expand-trigger="hover" 
                    :options="cityTree"
                    :placeholder="ruleForm.workInfoText"
                    v-model="ruleForm.workInfoName"                                     
                    size = "mini"                    
                    @active-item-change="handleCityChange"
                    @change="celectCityChange_workInfo"
                    >
                    </el-cascader>
                  </el-form-item>
                </el-col>

                <!-- 现居住情况 -->
                <el-col :span="12" v-if="labeLValue.customInfoLabel.infomationLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.infomationLabel.labelName+'：'"
                    prop="dwellInfo"
                    :rules="rules.infomationLabel"
                  >
                    <el-select clearable v-model="ruleForm.dwellInfo" placeholder="请选择">
                     <el-option
                      v-for="(item) in labeLValue.customInfoLabel.infomationLabel.labelDictList"
                      :key="item.id"
                      :label="item.dictName" 
                      :value="item.dictName" 
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <!-- 居住区域 2222222222222-->
                <el-col :span="12" v-if="labeLValue.customInfoLabel.dwellAreaLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.dwellAreaLabel.labelName+'：'"
                    prop="dwellRegionName"
                    :rules="rules.dwellAreaLabel"
                  >
                    <el-cascader 
                    class="placeholder"
                    expand-trigger="hover" 
                    clearable :options="cityTree" 
                    v-model="ruleForm.dwellRegionName"
                    :placeholder="ruleForm.dwellRegionText"
                    @active-item-change="handleCityChange" 
                    @change="celectCityChange_Region" size = "mini"
                     >
                </el-cascader>
                  </el-form-item>
                </el-col>

                <!-- 现居小区 -->
                <el-col :span="12" v-if="labeLValue.customInfoLabel.dwellEstateLabel">
                  <el-form-item 
                   :label="labeLValue.customInfoLabel.dwellEstateLabel.labelName+'：'"
                    prop="dwellGarden"
                    :rules="rules.dwellEstateLabel"
                  >
                    <el-input v-model="ruleForm.dwellGarden"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <!-- 现居面积 -->
                <el-col :span="12" v-if="labeLValue.customInfoLabel.dwellInAreaLabel">
                  <el-form-item         
                    :label="labeLValue.customInfoLabel.dwellInAreaLabel.labelName+'：'" 
                    prop="dwellArea"
                    :rules="rules.dwellInAreaLabel"
                  >
                    <el-input v-model="ruleForm.dwellArea"></el-input>
                  </el-form-item>
                </el-col>

                <!-- 通讯地址 -->
                <el-col :span="12" v-if="labeLValue.customInfoLabel.comAddressLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.comAddressLabel.labelName+'：'" 
                    prop="addr"
                    :rules="rules.comAddressLabel"
                  >
                    <el-input v-model="ruleForm.addr"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <!-- 证件类型 -->
                <el-col :span="12" v-if="labeLValue.customInfoLabel.certificateTypeLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.certificateTypeLabel.labelName+'：'"
                    prop="certificateType"
                    :rules="rules.certificateTypeLabel"
                  >
                    <el-select clearable @change="addRules"   value-key="dictName" v-model="ruleForm.certificateType" placeholder="请选择" >
                      <el-option
                      v-for="(item,index) in labeLValue.customInfoLabel.certificateTypeLabel.labelDictList"
                      :key="index"                    
                      :label="item.dictName" 
                      :value="item"                       
                      >
                      </el-option>                      
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 证件号码 -->
                <el-col :span="12" v-if="labeLValue.customInfoLabel.certificateNumberLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.certificateNumberLabel.labelName+'：'"
                    prop="certificateNo"
                    :rules="rules.certificateNumberLabel"
                  >
                    <el-input v-model="ruleForm.certificateNo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <!-- 婚姻状况 -->
                <el-col :span="12" v-if="labeLValue.customInfoLabel.maritalStatusLabel">
                  <el-form-item 
                    :label="labeLValue.customInfoLabel.maritalStatusLabel.labelName+'：'"
                  >
                    <el-select @change="handleMaritalStatus" value-key="dictName" v-model="ruleForm.maritalStatusObj" placeholder="请选择" >
                      <el-option
                      v-for="(item,index) in labeLValue.customInfoLabel.maritalStatusLabel.labelDictList"
                      :key="index"                    
                      :label="item.dictName" 
                      :value="item"                       
                      >
                      </el-option>                      
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
  
            <el-col :span="8">
              <!-- 手机号码 -->
              <template v-for="(item,index) in ruleForm.tel">
              <div class="mb-20" :key="item.key">
                <!-- 收缩容器 -->
                <template v-if="item.istel === false">                                
                    <div>                                          
                      <el-col :span="24">
                          <el-form-item 
                                class="mobile-item"
                                :label="index === 0 ? ''+labeLValue.customInfoLabel.telLabel.labelName+'：'+'' : ' '" 
                                :prop="`tel[${index}].phone`"
                                :rules="rules.telLabel"                                 
                                >
                                {{item.phone}}

                                <!-- 常用 与 非常用 判断 -->
                              <!-- <span v-if="item.isCommon === false" @click="deteleTel(index)" class="inline-block va-middle color-green cursor span_11">删除</span>
                              <span @click="editTel(index)"  class="inline-block color-green cursor span_11">编辑</span> -->
                              <el-button 
                                v-if="item.isCommon === false" 
                                @click="deteleTel(index)" 
                                class="add-children-label" 
                                type="text"
                              >
                                删除
                              </el-button>

                              <el-button 
                                v-if="ruleForm.tel.length>1"
                                @click="editTel(index)" 
                                class="add-children-label" 
                                type="text"
                              >
                                编辑
                              </el-button>
                              
                              <template v-if="item.isCommon === true">
                                <span class="inline-block va-middle span_11">常用</span>
                              </template>
                              <template v-else>
                              <span 
                                @click="handSetCommon(index)" 
                                class="inline-block va-middle color-green cursor span_11"
                              >
                                设为常用
                              </span>
                            </template>
                          </el-form-item>
                    </el-col>              
                    </div>
                                 
                </template>
                <!-- 表单容器 -->
                <template v-else>
                  <div :key="item.key" :class="{'border-active' : item.active}" class="m-item-form">                 
                    <el-row>
                        <el-col :span="24">
                          <el-form-item
                          label-width="66px"
                          class="tel_1 mobile-item"
                          :label="index === 0 ? '手机号码:' : ' '" 
                          :prop="`tel[${index}].phone`"
                          :rules="[
                            { pattern: /^[1][0-9]{10}$/, message: '请输入正确的手机号码', trigger: ['blur', 'change'] }]"                    
                          >
                          <el-input  maxlength="11"  style="width:auto;" placeholder="请输入手机号码"  v-model="item.phone"></el-input>
                          <span 
                          @click="saveleMobileAdd(index)"
                          class="inline-block va-middle color-green cursor"
                          >保存</span>
                        
                          <div>                                              
                          </div>                                   
                          </el-form-item>
                        </el-col>
                    </el-row>
                  </div>
                </template>
              </div>             
             </template>   
              <template>
                 <!-- pattern : /^[1][0-9]{10}$/,
          //     message : '联系方式格式输入有误',
          //     trigger : 'blur', -->
                  <div class="m-item-form">                 
                    <el-row style="height:20px">
                        <el-col :span="24">
                          <el-form-item
                            label-width="66px"
                            class="tel_1"
                            :label="'                        '"     
                            prop="telPhone"                                 
                            :rules="[
                            { pattern: /^[1][0-9]{10}$/, message: '请输入正确的手机号码', trigger: ['blur', 'change'] }]"
                          >
                          <span v-if="ruleForm.tel.length<=0 || ruleForm.tel === []">手机号码：</span>
                            <span v-if="ruleForm.add">
                              <el-input
                              style="width:auto;"
                              placeholder="请输入手机号码"
                              v-model="ruleForm.telPhone"></el-input>
                              <span 
                              @click="saveleMobileAdd_1()"
                              class="inline-block va-middle color-green cursor mr_78"
                              >保存</span> 
                               <span 
                              @click="cancelEdit_1()"
                              class="inline-block va-middle color-green cursor mr_78"
                              >取消编辑</span>                              
                            </span> 
                            
                          <div>
                          <i 
                            @click="handleMobileAdd" 
                            class="inline-block va-middle color-green el-icon-circle-plus-outline cursor ft-20 mr-5"
                            >新增</i>                        
                          </div>                                   
                          </el-form-item>
                        </el-col>
                    </el-row>
                  </div>
                </template>         
            </el-col>
          </div>
          <p class="color-title-green mb-20">购房需求</p>
          <!-- 购房需求 表单元素 -->
          <div class="demand-for-house-purchase-box">
            <!-- 循环list -->
            <template v-for="(item,index) in ruleForm.purchaseArr">
              <div class="mb-20" :key="item.key">
                <!-- 收缩容器 -->
                <template v-if="item.isOpen === false">
                  <div class="shrink-box">
                    <div class="fl left">
                      <el-col :span="2">
                        <span class="ml-10 title">购房需求{{index + 1}}</span>
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
                        <span>{{labeLValue.customNeedLabel.habitableLabel.labelName+'：'}}{{item.bedroomType.join(' / ')}}</span>
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
                  <div 
                   @mouseenter="handleHouseListMouseenter(item,index)"
                   @mouseleave="handleHouseListMouseleave(item,index)"
                  :key="item.key" :class="{'border-active' : item.active}" class="m-item-form  border_item">
                    <el-row>
                      <!-- 需求业态 -->
                      <el-col :span="8" v-if="labeLValue.customNeedLabel.formatLabel">
                        <el-form-item 
                          :label="labeLValue.customNeedLabel.formatLabel.labelName+'：'"
                          :prop="`purchaseArr[${index}].formatName`"
                          :rules="rules.formatLabel"
                        >
                          <el-select collapse-tags clearable v-model="item.formatName" placeholder="请选择">
                            <el-option
                            v-for="(item) in labeLValue.customNeedLabel.formatLabel.labelDictList"
                            :key="item.id"
                            :label="item.dictName" 
                            :value="item.dictName"
                            ></el-option>
                            
                          </el-select>
                        </el-form-item>
                      </el-col>

                      <!-- 需求面积 -->
                      <el-col :span="8" v-if="labeLValue.customNeedLabel.needAreaLabel">
                        <el-form-item 
                          :label="labeLValue.customNeedLabel.needAreaLabel.labelName+'：'"
                          :prop="`purchaseArr[${index}].needArea`"
                          :rules="rules.needAreaLabel"
                        >
                          <el-input v-model="item.needArea"></el-input>
                        </el-form-item>
                      </el-col>

                      <!-- 总价预算 -->
                      <el-col :span="8" v-if="labeLValue.customNeedLabel.totalBudgetLabel">
                        <el-form-item 
                          :label="labeLValue.customNeedLabel.totalBudgetLabel.labelName+'：'"
                          :prop="`purchaseArr[${index}].totalBdget`"
                          :rules="rules.totalBudgetLabel"
                        >
                          <el-input v-model="item.totalBdget"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row>
                      <!-- 需求套数 -->
                      <el-col :span="8" v-if="labeLValue.customNeedLabel.needCountLabel">
                        <el-form-item 
                          :label="labeLValue.customNeedLabel.needCountLabel.labelName+'：'"
                          :prop="`purchaseArr[${index}].needCount`"
                          :rules="rules.needCountLabel"
                        >
                         

                         <el-select collapse-tags clearable v-model="item.needCount" placeholder="请选择">
                            <el-option 
                            v-for="(item) in labeLValue.customNeedLabel.needCountLabel.labelDictList"
                            :key="item.id"
                            :label="item.dictName" 
                            :value="item.dictName"                              
                            ></el-option>                           
                          </el-select> 
                        </el-form-item>
                      </el-col>
                      <!-- 购房主要用途 -->
                      <el-col :span="8" v-if="labeLValue.customNeedLabel.mainUseLabel">
                        <el-form-item 
                          :label="labeLValue.customNeedLabel.mainUseLabel.labelName+'：'"
                          :prop="`purchaseArr[${index}].mainUse`"
                          :rules="rules.mainUseLabel"
                        >
                          <el-select collapse-tags clearable v-model="item.mainUse" placeholder="请选择" value-key="id">
                            <el-option 
                            v-for="(item) in labeLValue.customNeedLabel.mainUseLabel.labelDictList"
                            :key="item.id"
                            :label="item.dictName" 
                            :value="item"                           
                            ></el-option>                           
                          </el-select>
                        </el-form-item>
                        <el-form-item 
                          v-if="item.mainUse === 'use_other'"
                          label=" "
                          class="order-item" 
                          :prop="`purchaseArr[${index}].mainUseOrder`"
                          :rules="[
                            {required : true , message : '请输入' , trigger : 'blur'}
                          ]"
                        >
                          <el-input v-model="item.mainUseOrder" />
                        </el-form-item>
                      </el-col>

                     

                      <!-- 竞品楼盘 -->
                      <el-col :span="8" v-if="labeLValue.customNeedLabel.houseProjectLabel">
                        <el-form-item 
                          :label="labeLValue.customNeedLabel.houseProjectLabel.labelName+'：'" 
                          :prop="`purchaseArr[${index}].houseProject`"
                          :rules="rules.houseProjectLabel"
                        >
                          <el-input v-model="item.houseProject"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row>
                      <!-- 车位需求 -->
                      <el-col :span="8" v-if="labeLValue.customNeedLabel.carFlagLabel">
                        <el-form-item 
                          :label="labeLValue.customNeedLabel.carFlagLabel.labelName+'：'"
                          :prop="`purchaseArr[${index}].carFlag`"
                          :rules="rules.carFlagLabel"
                        >
                          <el-radio-group v-model="item.carFlag">
                            <!-- <el-radio :label= "1">是</el-radio>
                            <el-radio :label= "0">否</el-radio> -->
                          <el-radio
                            v-for="(item) in labeLValue.customNeedLabel.carFlagLabel.labelDictList"
                            :key="item.id"
                            :label="item.dictCode"                             
                            >{{item.dictName}}</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-col>

                      <!-- 居室 -->
                      <el-col :span="8" v-if="labeLValue.customNeedLabel.habitableLabel">
                        <el-form-item 
                          :label="labeLValue.customNeedLabel.habitableLabel.labelName+'：'"
                          :prop="`purchaseArr[${index}].bedroomType`"
                          :rules="rules.habitableLabel"
                        >
                          <el-select collapse-tags multiple clearable v-model="item.bedroomType" placeholder="请选择">
                            <el-option
                            v-for="(item) in labeLValue.customNeedLabel.habitableLabel.labelDictList"
                            :key="item.id"
                            :label="item.dictName" 
                            :value="item.dictName"                            
                            ></el-option>
                            
                          </el-select>
                        </el-form-item>
                      </el-col>

                      <!-- 朝向 -->
                      <el-col :span="8" v-if="labeLValue.customNeedLabel.orientationLabel">
                        <el-form-item 
                          :label="labeLValue.customNeedLabel.orientationLabel.labelName+'：'"
                          :prop="`purchaseArr[${index}].orientation`"
                          :rules="rules.orientationLabel"
                        >
                          <el-select collapse-tags multiple clearable v-model="item.orientation" placeholder="请选择">
                            <el-option
                             v-for="(item) in labeLValue.customNeedLabel.orientationLabel.labelDictList"
                            :key="item.id"
                            :label="item.dictName" 
                            :value="item.dictName"                            
                            ></el-option>                           
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row>
                      <!-- 关注要素 -->
                      <el-col :span="8" v-if="labeLValue.customNeedLabel.focusLabel">
                        <el-form-item 
                          :label="labeLValue.customNeedLabel.focusLabel.labelName+'：'"
                          :prop="`purchaseArr[${index}].focus`"
                          :rules="rules.focusLabel"
                        >
                          <el-select collapse-tags multiple clearable v-model="item.focus" placeholder="请选择">
                            <el-option                           
                            v-for="(item) in labeLValue.customNeedLabel.focusLabel.labelDictList"
                            :key="item.id"
                            :label="item.dictName" 
                            :value="item.dictName"                             
                            ></el-option>
                           
                          </el-select>
                        </el-form-item>
                      </el-col>

                      <!-- 主要抗性 -->
                      <el-col :span="8" v-if="labeLValue.customNeedLabel.dragLabel">
                        <el-form-item 
                          :label="labeLValue.customNeedLabel.dragLabel.labelName+'：'"
                          :prop="`purchaseArr[${index}].drag`"
                          :rules="rules.dragLabel"
                        >
                          <el-select collapse-tags multiple clearable v-model="item.drag" placeholder="请选择">
                            <el-option
                            v-for="(item) in labeLValue.customNeedLabel.dragLabel.labelDictList"
                            :key="item.id"
                            :label="item.dictName" 
                            :value="item.dictName"                                                    
                            ></el-option>
                            
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row>
                       <!-- 意向户号00000000000000 -->
                      <el-col :span="8" v-if="labeLValue.customNeedLabel.intentionNoLabel">
                        <el-form-item 
                          :label="labeLValue.customNeedLabel.intentionNoLabel.labelName+'：'"
                          :prop="`purchaseArr[${index}].intentionNoPlaceholder`"
                          :rules="rules.intentionNoLabel"
                        >
                          <el-input
                            type="textarea"
                            autosize
                            placeholder="请选择"
                            v-model="item.intentionNoPlaceholder">
                          </el-input>
                        </el-form-item>
                      </el-col>
                      
                      <!-- 操作 -->
                      <div class="fr mt-10">
                        <!-- +加 -->
                        <i 
                          v-if="index === ruleForm.purchaseArr.length - 1"
                          class="color-green el-icon-circle-plus-outline cursor ft-20"
                          @click="handleHouseListAdd(item,index)"
                        >
                        </i>
                        <!-- -减 -->
                        <i 
                          v-if="ruleForm.purchaseArr.length > 1"
                          class="color-green el-icon-remove-outline cursor ft-20 mr-20"
                          @click="handleHouseListDelete(item,index)"
                        >
                        </i>
                        <!-- 收起 -->
                        <i
                          @click="handleHouseStop(item,index)"
                          class="color-green el-icon-arrow-up cursor ft-20 mr-10"
                        >
                        </i>
                      </div>
                    </el-row>
                  </div>
                </template>
              </div>
            </template>
          </div>
          <!-- 清除浮动 -->
          <div class="clear"></div>
          <p class="color-title-green mb-20">购买力</p>
          <!-- 购买力 表单元素 -->
          <div class="purchasing-power-box of-hidden">
             <el-row>
                <!-- 付款方式 -->
                <el-col :span="8" v-if="labeLValue.customPurchasingPowerLabel.payTypeLabel">
                  <el-form-item 
                    :label="labeLValue.customPurchasingPowerLabel.payTypeLabel.labelName+'：'"
                    prop="payType"
                    :rules="rules.payTypeLabel"
                  >
                    <el-select clearable v-model="ruleForm.payType" placeholder="请选择">
                      <el-option
                        v-for="(item) in labeLValue.customPurchasingPowerLabel.payTypeLabel.labelDictList"
                        :key="item.id"
                        :label="item.dictName" 
                        :value="item.dictName" 
                      ></el-option>
                      
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 现有房产 -->
                <el-col :span="8" v-if="labeLValue.customPurchasingPowerLabel.existingPropertyLabel">
                  <el-form-item 
                    :label="labeLValue.customPurchasingPowerLabel.existingPropertyLabel.labelName+'：'"
                    prop="existingProperty"
                    :rules="rules.existingPropertyLabel"
                  >
                    <el-select clearable v-model="ruleForm.existingProperty" placeholder="请选择">                      
                      <el-option
                      v-for="(item) in labeLValue.customPurchasingPowerLabel.existingPropertyLabel.labelDictList"
                        :key="item.id"
                        :label="item.dictName" 
                        :value="item.dictCode" 
                      ></el-option>
                      
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 现有贷款 -->
                <el-col :span="8" v-if="labeLValue.customPurchasingPowerLabel.existingLoan">
                  <el-form-item 
                    :label="labeLValue.customPurchasingPowerLabel.existingLoan.labelName+'：'"
                    prop="existingLoan"
                    :rules="rules.existingLoan"
                  >
                    <el-select clearable v-model="ruleForm.existingLoan" placeholder="请选择">                      
                      <el-option
                        v-for="(item) in labeLValue.customPurchasingPowerLabel.existingLoan.labelDictList"
                        :key="item.id"
                        :label="item.dictName" 
                        :value="item.dictName" 
                      ></el-option>
                      
                    </el-select>
                  </el-form-item>
                </el-col>
             </el-row>

             <el-row>
               <!-- 购房名额 -->
                <el-col :span="8" v-if="labeLValue.customPurchasingPowerLabel.quotaLabel">
                  <el-form-item 
                    :label="labeLValue.customPurchasingPowerLabel.quotaLabel.labelName+'：'"
                    prop="quotaFlag"
                    :rules="rules.quotaLabel"
                  >
                    <el-select clearable v-model="ruleForm.quotaFlag" placeholder="请选择">
                      <el-option                     
                      v-for="(item) in labeLValue.customPurchasingPowerLabel.quotaLabel.labelDictList"
                        :key="item.id"
                        :label="item.dictName" 
                        :value="item.dictCode"                       
                      ></el-option>
                      
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 家庭构成 -->
                <el-col :span="8" v-if="labeLValue.customPurchasingPowerLabel.familyLabel">
                  <el-form-item 
                    :label="labeLValue.customPurchasingPowerLabel.familyLabel.labelName+'：'"
                    prop="familyStructure"
                    :rules="rules.familyLabel"
                  >
                    <el-select clearable v-model="ruleForm.familyStructure" placeholder="请选择">
                      <el-option 
                       v-for="(item) in labeLValue.customPurchasingPowerLabel.familyLabel.labelDictList"
                        :key="item.id"
                        :label="item.dictName" 
                        :value="item.dictName"
                      ></el-option>
                      
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 子女人数 -->
                <el-col :span="8" v-if="labeLValue.customPurchasingPowerLabel.childrenNumLabel">
                  <el-form-item 
                    :label="labeLValue.customPurchasingPowerLabel.childrenNumLabel.labelName+'：'"
                    prop="childrenNum"
                    :rules="rules.childrenNumLabel"
                  >
                    <el-select clearable v-model="ruleForm.childrenNum" placeholder="请选择">
                      <el-option
                        v-for="(item) in labeLValue.customPurchasingPowerLabel.childrenNumLabel.labelDictList"
                        :key="item.id"
                        :label="item.dictName" 
                        :value="item.dictName"                      
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
             </el-row>

             <el-row>
               <!-- 家庭年收入 -->
                <el-col :span="8" v-if="labeLValue.customPurchasingPowerLabel.familyYearIncomeLabel">
                  <el-form-item 
                    :label="labeLValue.customPurchasingPowerLabel.familyYearIncomeLabel.labelName+'：'"
                    prop="familyYearlyIncome"
                    :rules="rules.familyYearIncomeLabel"
                  >
                    <el-select clearable v-model="ruleForm.familyYearlyIncome" placeholder="请选择">
                      <el-option
                        v-for="(item) in labeLValue.customPurchasingPowerLabel.familyYearIncomeLabel.labelDictList"
                        :key="item.id"
                        :label="item.dictName" 
                        :value="item.dictName"
                      ></el-option>

                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 工作行业 -->
                <el-col :span="8" v-if="labeLValue.customPurchasingPowerLabel.industryLabel">
                  <el-form-item 
                    :label="labeLValue.customPurchasingPowerLabel.industryLabel.labelName+'：'"
                    prop="industry"
                    :rules="rules.industryLabel"
                  >
                    <el-select clearable v-model="ruleForm.industry" placeholder="请选择">
                      <el-option
                        v-for="(item) in labeLValue.customPurchasingPowerLabel.industryLabel.labelDictList"
                        :key="item.id"
                        :label="item.dictName" 
                        :value="item.dictName"
                      ></el-option>

                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 工作职务 -->
                <el-col :span="8" v-if="labeLValue.customPurchasingPowerLabel.dutyLabel">
                  <el-form-item 
                    :label="labeLValue.customPurchasingPowerLabel.dutyLabel.labelName+'：'"
                    prop="duty"
                    :rules="rules.dutyLabel"
                  >
                    <el-select clearable v-model="ruleForm.duty" placeholder="请选择">
                      <el-option
                        v-for="(item) in labeLValue.customPurchasingPowerLabel.dutyLabel.labelDictList"
                        :key="item.id"
                        :label="item.dictName" 
                        :value="item.dictName"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
             </el-row>

             <el-row>
               <!-- 学历 -->
                <el-col :span="8" v-if="labeLValue.customPurchasingPowerLabel.educationalLabel">
                  <el-form-item 
                    :label="labeLValue.customPurchasingPowerLabel.educationalLabel.labelName+'：'"
                    prop="educational"
                    :rules="rules.educationalLabel"
                  >
                    <el-select clearable v-model="ruleForm.educational" placeholder="请选择">
                      <el-option
                       v-for="(item) in labeLValue.customPurchasingPowerLabel.educationalLabel.labelDictList"
                        :key="item.id"
                        :label="item.dictName" 
                        :value="item.dictName"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 出行方式 -->
                <el-col :span="8" v-if="labeLValue.customPurchasingPowerLabel.outwayLabel">
                  <el-form-item 
                    :label="labeLValue.customPurchasingPowerLabel.outwayLabel.labelName+'：'"
                    prop="outWay"
                    :rules="rules.outwayLabel"
                  >
                    <el-select clearable v-model="ruleForm.outWay" placeholder="请选择">
                      <el-option 
                        v-for="(item) in labeLValue.customPurchasingPowerLabel.outwayLabel.labelDictList"
                        :key="item.id"
                        :label="item.dictName" 
                        :value="item.dictName"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 汽车品牌 -->
                <el-col :span="8" v-if="labeLValue.customPurchasingPowerLabel.carBrandLabel">
                  <el-form-item 
                    :label="labeLValue.customPurchasingPowerLabel.carBrandLabel.labelName+'：'"
                    class="m-form-item"
                    prop= "carBrand"
                    :rules="rules.carBrandLabel"
                  >
                    <el-select clearable collapse-tags multiple v-model="ruleForm.carBrand" placeholder="请选择">
                      <el-option
                        v-for="(item) in labeLValue.customPurchasingPowerLabel.carBrandLabel.labelDictList"
                        :key="item.id"
                        :label="item.dictName" 
                        :value="item.dictName"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
             </el-row>
          </div>
          <!-- 其他信息 -->
          <p class="color-title-green mb-20">其他信息</p>
          <!-- 其他信息 表单元素 -->
          <div class="other-information-box">
            <!-- 循环 list -->
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
                      <el-col :span="6">
                        <span  v-if="labeLValue.customElseLabel.contactMethodLabel"
                          class="ellipsis"
                          :style="{
                            display : 'inline-block',
                            width : '100%',
                          }"
                        >
                          {{labeLValue.customElseLabel.contactMethodLabel.labelName+'：'}}
                          {{
                            item.contactInformation
                            .filter((v) => v.phone)
                            .map(v => v.phone).join(' / ')
                          }}
                        </span>
                      </el-col>
                      <div class="fr">
                        <!-- 展开 -->
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
                  <div 
                    @mouseenter="handleOrderMouseenter(item,index)"
                    @mouseleave="handleOrderMouseleave(item,index)"
                  :key="item.key" :class="{'border-green' : item.active}" class="order-show-box">
                    <el-row>
                      <!-- 关联客户 -->
                      <el-col :span="8" v-if="labeLValue.customElseLabel.customContactLabel">
                        <el-form-item 
                          :label="labeLValue.customElseLabel.customContactLabel.labelName+'：'"
                          :prop="`orderArr[${index}].refCustomName`"
                          :rules="rules.customContactLabel"
                        >
                          <el-input v-model="item.refCustomName" />
                        </el-form-item>
                      </el-col>

                      <!-- 与主客户关系 -->
                      <el-col :span="8" v-if="labeLValue.customElseLabel.relationshipLabel">
                        <el-form-item 
                          :label="labeLValue.customElseLabel.relationshipLabel.labelName+'：'"
                          :prop="`orderArr[${index}].relationship`"
                          :rules="rules.relationshipLabel"
                        >
                          <el-select clearable v-model="item.relationship" placeholder="请选择">
                            <el-option
                            v-for="(item) in labeLValue.customElseLabel.relationshipLabel.labelDictList"
                            :key="item.id"
                            :label="item.dictName" 
                            :value="item.dictName"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <!-- 删除关联客户 -->
                      <div class="fr">
                        <i 
                          v-if="ruleForm.orderArr.length > 1"
                          class="color-green delete-customers el-icon-remove-outline cursor ft-20"
                          @click="handleOrderListDelete(item,index)"
                        >
                        </i>
                      </div>
                    </el-row>

                    <el-row>
                      
                      <!-- 循环 联系方式 contactMethodLabel-->
                      <!-- <el-col class="span_2" :span="2">{{labeLValue.customElseLabel.contactMethodLabel.labelName+'：'}}</el-col> -->
                      <template v-for="(item2,index2) in item.contactInformation" >
                        <div :key="item2.key">
                          <el-col :span="8">
                        <template v-if="item2.isphone === false">
                          <div :key="item2.key">  
                            <el-col :span="24" style="margin-left:20px" v-if="labeLValue.customElseLabel.contactMethodLabel">
                            <el-form-item 
                                class="mobile-item"
                                :label="labeLValue.customElseLabel.contactMethodLabel.labelName+'：'"
                                :prop="`orderArr[${index}].contactInformation[${index2}].phone`"
                                :rules="rules.contactInformation" 
                                >
                                {{item2.phone}}
                              <el-button 
                                v-if="item2.isCommon === false" 
                                @click="deteleTel_1(index,index2)" 
                                class="add-children-label" 
                                type="text"
                              >
                                删除
                              </el-button>
                              <el-button 
                                @click="editTel_1(index,index2)" 
                                class="add-children-label" 
                                type="text"
                              >
                                编辑
                              </el-button>                             
                              <template v-if="item2.isCommon === true">
                                <span class="inline-block va-middle span_11">常用</span>
                              </template>
                              <template v-else>
                                <span 
                                  @click="handSetCommon_1(index,index2)" 
                                  class="inline-block va-middle color-green cursor span_11"
                                >
                                  设为常用
                                </span>
                              </template>
                              </el-form-item>
                            </el-col> 
                           </div>
                       </template> 
                      <!-- 表单容器 -->
                        <template v-else>
                          <div :key="item2.key" :class="{'border-active' : item2.active}" >                 
                            <el-row>
                                <el-col :span="24"  v-if="labeLValue.customElseLabel.contactMethodLabel">
                                  <el-form-item 
                                         
                                  :label="labeLValue.customElseLabel.contactMethodLabel.labelName+'：'"                        
                                  :prop="`orderArr[${index}].contactInformation[${index2}].phone`"
                                  :rules="[
                                     { pattern: /^[1][0-9]{10}$/, message: '请输入正确的手机号码', trigger: ['blur', 'change'] }]"
                                  >
                                  <el-input style="width:auto;" placeholder="请输入手机号码"  v-model="item2.phone"></el-input>
                                  <span 
                                  @click="saveleMobileAdd_1_1(index,index2)"
                                  class="inline-block va-middle color-green cursor"
                                  >保存</span>                                                                                                      
                                  </el-form-item>
                                </el-col>
                            </el-row>
                            </div>
                          </template>
                          </el-col>
                          </div>       
                        </template>
                         <el-col :span="8">
                        <template>                        
                         <div class="telAdd">                                  
                              <el-form-item
                                class="tel_1"
                                :prop="`telPhone_1`"
                                :label="ruleForm.orderArr[index].contactInformation.length===0?labeLValue.customElseLabel.contactMethodLabel.labelName+'：':''"                       
                                :rules="[
                                     { pattern: /^[1][0-9]{10}$/, message: '请输入正确的手机号码', trigger: ['blur', 'change'] }]"
                              >                      
                                <span v-if="ruleForm.orderArr[index].telAdd">
                                  <el-input style="width:auto;" placeholder="请输入手机号码" v-model="ruleForm.orderArr[index].telPhone_1"></el-input>
                                  <span 
                                  @click="saveleMobileAdd_1_2(index)"
                                  class="inline-block va-middle color-green cursor mr_78"
                                  >保存</span> 
                                  <span
                                  v-show="ruleForm.orderArr[index].deteleTle" 
                                  @click="cancelEdit_1_2(index)"
                                  class="inline-block va-middle color-green cursor mr_78"
                                  >取消编辑</span>
                                </span> 
                              
                                <i 
                                  @click="handleMobileAdd_1(index)" 
                                  class="inline-block va-middle color-green el-icon-circle-plus-outline cursor mr_78 "
                                >新增</i>                        
                                                                
                              </el-form-item>
                        </div>
                      
                     </template>
                     </el-col>

                                              
                      <div class="fr">
                        <!--  收起  -->
                        <i                     
                          @click="handleOrderHide(item,index)"
                          class="order-stop color-green el-icon-arrow-up cursor ft-20 mr-10"
                        >
                        </i>
                        <!-- 增加 一条关联客户 -->
                        <i 
                          v-if="index === ruleForm.orderArr.length - 1"
                          class="order-add va-middle cursor color-green el-icon-circle-plus-outline ft-20"
                          @click="handleOrderAdd(item,index)"
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
                  :prop="`interest`"
                  :rules="rules.interestLabel"
                >
                  <el-select collapse-tags multiple clearable v-model="ruleForm.interest" placeholder="请选择">
                    <el-option 
                      v-for="(item) in labeLValue.customElseLabel.interestLabel.labelDictList"
                        :key="item.id"
                        :label="item.dictName" 
                        :value="item.dictName"
                    
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

             <!-- 备注 -->
            <el-row v-if="labeLValue.customElseLabel.remarkLabel">
              <el-form-item 
                :label="labeLValue.customElseLabel.remarkLabel.labelName+'：'" 
                :prop="`remark`"
                :rules="rules.remarkLabel"
              >
                <el-input style="width:467px;" type="textarea" v-model="ruleForm.remark"></el-input>
              </el-form-item>
            </el-row>

            <!-- 客户标签2222222222222 -->

            <el-row class="cusotomMark">
              <div id="labelcss" v-if="labeLValue.customElseLabel.tagLabel">
                <el-form-item 
                  :label="labeLValue.customElseLabel.tagLabel.labelName+'：'" 
                  :prop="`tab`"
                  :rules="rules.tagLabel"
                >
                <template>
                  <div class="tabtab">
                      <el-select
                        v-model="ruleForm.tabValue"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        placeholder="请选择客户标签">
                       <el-option                     
                        v-for="(item) in this.ruleForm.tabOptions"
                        :key="item.id"
                        :label="item.itemCode"
                        :value="item.itemValue"
                      >
                      </el-option>
                      </el-select>
                  </div>
                </template>
                </el-form-item>
              </div>
            </el-row>
           
          </div>
          <!-- 清除浮动 -->
          <div class="clear"></div>
          <!-- 自定义 标签数据 -->
          <div  class="of-hidden mb-30">
            <template v-for="(item,index) in ruleForm.customerArr">
              <!-- 每三个 增加 清除浮动 -->
              <!-- <div 
                v-if="index % 3 === 0 || item.labelType === 'radioOther'"
                :key="item.id" 
                class="clear"
              >
              </div> -->
              <el-col
               
                :span="item.labelType === 'radioOther' ? 24 : 8" 
                :key="item.id">
                <el-form-item 
                  :label="item.labelName + '：'"
                  :prop="`customerArr[${index}].labelType`"
                  :rules="rules[item.labelName]"
                >
                  <!-- 根据不同类型 展示不同 表单元素 -->
                  <!-- 单选 -->
                  <template v-if="item.labelType === 'radio'">
                    <el-select v-if="item.labelLevel ===1" clearable v-model="item.textValue" placeholder="请选择">
                      <el-option 
                        :key="options.id"
                        v-for="(options) in item.labelDictList"
                        :label="options.dictName"
                        :value="options.dictName"
                      >
                      </el-option>
                    </el-select>

                    <!-- 二级选择器 -->
                    <el-cascader
                      v-else     
                      class="placeholder"
                      expand-trigger="hover"
                      :options="item.options"
                      v-model="item.textValue"                      
                      :clearable="true"                                         
                      >
                    >
                    </el-cascader>

                  </template>
                  

                  <!-- 多选 -->
                  <template v-else-if="item.labelType ==='checkbox'">

                    <el-select
                      v-model="item.checkBoxValues"
                      multiple
                      collapse-tags                     
                     placeholder="请选择">
                      <el-option
                        v-for="options in item.labelDictList"
                        :key="options.id"
                        :label="options.dictName"
                        :value="options.dictName">
                      </el-option>
                    </el-select>
                  </template>

                  <!-- 文本 -->
                  <template v-else-if="item.labelType === 'text'">
                    <el-input v-model="item.textValue" />
                  </template>

                  <!-- 数字 -->
                  <template v-else-if="item.labelType === 'number'">
                    <el-input type="number" v-model="item.textValue" />
                  </template>

                  <!-- 日期 -->
                  <template v-else-if="item.labelType === 'date'">
                    <el-date-picker
                      v-model="item.textValue"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </template>

                  <!-- 单选加补充说明 -->
                  <template v-else-if="item.labelType === 'radioOther'">
                    <el-select clearable v-model="item.textValue" placeholder="请选择">
                      <el-option 
                        :key="options.id" 
                        v-for="(options) in item.labelDictList"
                        :label="options.label"
                        :value="options.value"
                      >
                      </el-option>
                    </el-select>
                    <el-form-item 
                      v-if="item.textValue === '其他'"
                      label=" "
                      class="order-item" 
                      :prop="`labelDictList[${index}].dictType`"
                      :rules="[
                        {required : true , message : '请输入' , trigger : 'blur'}
                      ]"
                    >
                      <el-input v-model="item.order" />
                    </el-form-item>
                  </template>

                </el-form-item>
              </el-col>             
            </template>
          </div>
        </el-form>

        <div class="text-center">
          <el-button @click="handleClose" style="margin-right:40px;">取消</el-button>
          <el-button @click="handleSubmit" type="primary">保存</el-button>
        </div>
      </div>
    </div>
    <determineCustomerDialog ref="determineCustomerDialog"></determineCustomerDialog>
  </div>
</template>

<script>
import Cookies from "js-cookie"; //引入cookie
// <customerIntentionDialog style="height:300px;" placeholder="二级-1" v-model="aaaaa" />
// 获取请求接口
import {
  getCityListForCascader, //城市树
  getCustomerDetails, //获取页面详细信息
  getLearnWayOne, //获取途径
  uploadCustomerDetails, //上传客户详细信息
  getTagListForCascader, //获取客户标签
  getCheckLevel, //获取校验等级以及客户标签
  upDataCostom, //更新客户详情
  determineCustomer, //判客
  getRoomNumber, //查询房间的详细信息
  getCouter, //获取客户现有标签（备注上面的客户标签）
  telIsMain //设置手机号码常用
} from "@/api/pages/mainPage/customerFollowUp";

// 单选_其他 组件
import otherFrames from "@/components/otherFrames";
// 意向户号 组件
//import customerIntentionDialog from './dialog/customerIntentionDialog.vue'
//判客
import determineCustomerDialog from "./dialog/determineCustomerDialog.vue";

export default {
  components: {
    determineCustomerDialog,
    otherFrames
  },
  watch: {
    //  "projectId": function(e) {
    //   this.ruleForm.searchProjectValue = null;
    //     if( e ){
    //       this.initRules()
    //     }
    //   }
  },
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
        // 是否到访
        visitFlag: "",
        //首次接触方式
        firstTouchMethod: "",
        // 意向等级
        customLevel: "",
        // 是否绿城业主
        isOwner: "",
        // 获知途径
        source: [],
        //获知途径文本显示
        sourceText: "",
        // 工作区域id
        workInfo: "",
        //工作区域名称
        workInfoName: [],
        //工作区域文本显示
        workInfoText: "",
        // 现居住情况
        dwellInfo: "",
        // 居住区域
        dwellRegion: "",
        //居住区域名称
        dwellRegionName: [],
        //居住小区文本显示
        dwellRegionText: "",
        // 现居小区
        dwellGarden: "",
        // 现居面积
        dwellArea: "",
        // 通讯地址
        addr: "",
        // 证件类型列表
        certificateTypeList: "",
        //证件类型
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

        maritalStatusObj: {}, // 婚姻状况

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
            bedroomType: [],
            // 朝向
            orientation: [],
            // 需求面积
            needArea: "",
            // 总价预算
            totalBdget: "",
            //需求id
            needId: null,
            // 需求套数
            needCount: [],
            // 意向户号文本显示00000000000
            intentionNoPlaceholder: "",
            // 竞品楼盘
            houseProject: "",
            //竞品楼盘编码
            houseProjectCode: "",
            // 车位需求
            carFlag: "",
            // 关注要素
            focus: [],
            // 主要抗性
            drag: [],
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
        carBrand: [],

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
            contactInformationArray: [],
            //新增的其他联系人的手机号码
            telPhone_1: "",
            //判断是否出现取消编辑
            deteleTle: false,
            //判断手机号码是否出现
            telAdd: true
          }
        ],
        // 兴趣爱好
        interest: [],
        // 客户标签
        tab: [],
        // 客户标签 select value
        tabValue: [],
        // 客户标签 select options22222222222222
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
        focusArr_2: [],
        //编辑手机号码的过度
        editTeltel: ""
      },

      //---------------------------客户标签实例化----------------------------
      //标签值以及是否必填33333333333333
      labeLValue: {},

      // 初始化 所有需要校验的字段
      rules: {
        /* 基本信息 校验字段 */
        nameLabel: [{}],
        sexLabel: [{}],
        ageSectionLabel: [{}],
        birthdayLabel: [{}],
        levelLabel: [{}],
        isOwnerLabel: [{}],
        getwayLabel: [{}],
        workAreaLabel: [{}],
        infomationLabel: [{}],
        dwellAreaLabel: [{}],
        dwellEstateLabel: [{}],
        dwellInAreaLabel: [{}],
        comAddressLabel: [{}],
        certificateTypeLabel: [{}],
        certificateNumberLabel: [{}],
        // telLabel : [{}],
        /* 购房需求 校验字段 */
        mainUseLabel: [{}],
        formatLabel: [{}],
        habitableLabel: [{}],
        orientationLabel: [{}],
        needAreaLabel: [{}],
        totalBudgetLabel: [{}],
        needCountLabel: [{}],
        intentionNoLabel: [{}],
        houseProjectLabel: [{}],
        carFlagLabel: [{}],
        focusLabel: [{}],
        dragLabel: [{}],
        /* 购买力 校验字段 */
        payTypeLabel: [{}],
        existingPropertyLabel: [{}],
        existingLoan: [{}],
        quotaLabel: [{}],
        familyLabel: [{}],
        childrenNumLabel: [{}],
        familyYearIncomeLabel: [{}],
        industryLabel: [{}],
        dutyLabel: [{}],
        educationalLabel: [{}],
        outwayLabel: [{}],
        carBrandLabel: [{}],
        /* 其他信息 校验字段 */
        customContactLabel: [{}],
        contactMethodLabel: [{}],
        relationshipLabel: [{}],
        interestLabel: [{}],
        tagLabel: [{}],
        remarkLabel: [{}]
      },
      // 保存后台返回的 所有校验规则
      ajaxRules: {},
      // 保存后台返回的 自定义标签数据6666666666666
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
      ],

      //测试111
      value111: null,
      options111: [
        { dictName: "1111", dictCode: "2222", id: "11111" },
        { dictName: "222", dictCode: "2222", id: "2222" },
        { dictName: "333", dictCode: "2222", id: "111311" },
        { dictName: "4444", dictCode: "2222", id: "3333" }
      ]
    };
  },
  mounted() {

    this.getCityList();
    //获取客户现有标签
    this.getCouterList();
    getCityListForCascader().then(res => {
       ;
      if (res.status === 200) {
        this.cityTree = res.data;
      }
    });
  },
  beforeMount() {
    // 设置校验逻辑
    this.initRules().then(() => {
      return this.initData();
    });
  },
  methods: {
    handleMaritalStatus() {
      // 婚姻状况改变，maritalStatusText一起改变
    },
    //获取客户现有标签2222222222222
    getCouterList() {
      getCouter().then(res => {
        if (res.status === 200) {
          this.ruleForm.tabOptions = res.data;
        }
      });
    },

    //选择居民身份证时添加校验
    addRules() {
      if (this.ruleForm.certificateType.dictName === "居民身份证") {
        let ruleCer = {
          pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
          message: "请输入正确的身份证号码",
          trigger: ["blur", "change"]
        };
        this.rules.certificateNumberLabel = [
          { message: "请输入证件号码", required: false, trigger: "blur" },
          ruleCer
        ];
      } else {
        this.rules.certificateNumberLabel = [
          { message: "请输入证件号码", required: false, trigger: "blur" }
        ];
      }
    },
    /* ---------------------页面初始化 数据处理----------------------------- */
    //删除手机号码
    deteleTel(index) {
      let isCommon = this.ruleForm.tel[index].isCommon;
      this.ruleForm.tel.splice(index, 1);
      // 如果当前删除的是 常用状态
      if (isCommon === true) {
        this.$nextTick(() => {
          this.$set(this.ruleForm.tel[0], "isCommon", true);
        });
      }
    },
    //删除其他联系人的手机号码
    deteleTel_1(index, index2) {
      let isCommon = this.ruleForm.orderArr[index].contactInformation[index2]
        .isCommon;
      this.ruleForm.orderArr[index].contactInformation.splice(index2, 1);
      if (isCommon === true) {
        this.$nextTick(() => {
          this.$set(
            this.ruleForm.orderArr[index].contactInformation[0],
            "isCommon",
            true
          );
        });
      }
    },
    //编辑手机号码555555555555555
    editTel(index) {
      this.ruleForm.tel[index].istel = !this.ruleForm.tel[index].istel;
      this.editTeltel = this.ruleForm.tel[index].phone;
    },

    //编辑其他联系人的手机号码
    editTel_1(index, index2) {
      this.ruleForm.orderArr[index].contactInformation[index2].isphone = !this
        .ruleForm.orderArr[index].contactInformation[index2].isphone;
      this.editTeltel = this.ruleForm.orderArr[index].contactInformation[
        index2
      ].phone;
    },

    //弹窗
    tanChuang(content) {
      const h = this.$createElement;
      this.$msgbox({
        title: "添加失败",
        message: h("p", null, [h("span", null, `${content}`)]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",

        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 300);
          } else {
            done();
          }
        }
      }).then(action => {
        this.editTeltel = "";
        this.$message({
          type: "info",
          message: "请重新添加"
        });
      });
    },

    //保存手机号码（判客）
    saveleMobileAdd(index) {
      let tel_1 = /^[1][0-9]{10}$/;
      if (tel_1.test(this.ruleForm.tel[index].phone)) {
        if (this.editTeltel === this.ruleForm.tel[index].phone) {
          this.ruleForm.tel[index].istel = !this.ruleForm.tel[index].istel;
          this.editTeltel = "";
        } else {

          let arrayA = [];
          for (let i = 0; i < this.ruleForm.tel.length; i++) {
            arrayA.push(this.ruleForm.tel[i].phone);
          }
          // arrayA.splice(index,1)
          // orderArr[${index}].contactInformation[${index2}].phone
          let arrayB = [];
          let nameC = "";

          for (let j = 0; j < this.ruleForm.orderArr.length; j++) {
            for (
              let k = 0;
              k < this.ruleForm.orderArr[j].contactInformation.length;
              k++
            ) {
              arrayB.push(
                this.ruleForm.orderArr[j].contactInformation[k].phone
              );
              if (
                this.ruleForm.tel[index].phone ===
                this.ruleForm.orderArr[j].contactInformation[k].phone
              ) {
                nameC = this.ruleForm.orderArr[j].refCustomName;
              }
            }
          }

          let lengthA = arrayA.toString().split(this.ruleForm.tel[index].phone)
            .length;
          let lengthB = arrayB.toString().split(this.ruleForm.tel[index].phone)
            .length;

          if (lengthA > 2) {
            this.ruleForm.content = `客户联系方式中已存在此手机号`;
            this.tanChuang(this.ruleForm.content);
          } else if (lengthB >= 2) {
            this.ruleForm.content = `关联客户${nameC}中已存在此手机号码`;
            this.tanChuang(this.ruleForm.content);
          } else {
            //页面中不存在时进行其他判客
            let data = {
              projectId: this.ruleForm.projectId,
              mobile: this.ruleForm.tel[index].phone
            };
            determineCustomer(data).then(res => {
              if (res.status === 200) {
                //获取登录人id
                let userId = Cookies.set("session");
                //判断是否添加
                if (res.data.flag) {
                  //不能添加
                  if (userId === res.data.propertyConsultId) {
                    //置业顾问是自己
                    this.ruleForm.content = `您的客户${
                      res.data.customName
                    }的联系方式中已存在此手机号码`;
                  } else {
                    //置业顾问不是自己
                    this.ruleForm.content = `其他客户中已存在此手机号,归属置业顾问：${
                      res.data.propertyConsultName
                    }`;
                  }

                  this.tanChuang(this.ruleForm.content);
                } else {
                  //可添加
                  //this.ruleForm.content = `归属置业顾问：${res.data.propertyConsultName}`
                  this.ruleForm.tel[index].istel = !this.ruleForm.tel[index]
                    .istel;
                  this.editTeltel = "";
                }
              }
            });
          }
        }
      } else {
        this.$message.error("手机号码输入不正确，请重新输入！");
      }
    },

    //取消编辑手机号码
    cancelEdit(index) {
      this.ruleForm.tel[index].istel = !this.ruleForm.tel[index].istel;
    },

    //编辑客户手机号码时进行判客
    saveleMobileAdd_1_1(index, index2) {
      let tel_1 = /^[1][0-9]{10}$/;
      if (
        tel_1.test(
          this.ruleForm.orderArr[index].contactInformation[index2].phone
        )
      ) {
        if (
          this.editTeltel ===
          this.ruleForm.orderArr[index].contactInformation[index2].phone
        ) {
          this.ruleForm.orderArr[index].contactInformation[
            index2
          ].isphone = false;
          this.ruleForm.orderArr[index].telAdd = false;
          this.editTeltel = "";
        } else {
          let arrayA = [];
          for (let i = 0; i < this.ruleForm.tel.length; i++) {
            arrayA.push(this.ruleForm.tel[i].phone);
          }
          let arrayB = [];
          let nameC = "";
          for (let j = 0; j < this.ruleForm.orderArr.length; j++) {
            for (
              let k = 0;
              k < this.ruleForm.orderArr[j].contactInformation.length;
              k++
            ) {
              arrayB.push(
                this.ruleForm.orderArr[j].contactInformation[k].phone
              );
              if (
                this.ruleForm.orderArr[index].contactInformation[index2]
                  .phone ===
                this.ruleForm.orderArr[j].contactInformation[k].phone
              ) {
                nameC = this.ruleForm.orderArr[j].refCustomName;
              }
            }
          }
          let lengthA = arrayA
            .toString()
            .split(
              this.ruleForm.orderArr[index].contactInformation[index2].phone
            ).length;
          let lengthB = arrayB
            .toString()
            .split(
              this.ruleForm.orderArr[index].contactInformation[index2].phone
            ).length;

          if (lengthA >= 2) {
            this.ruleForm.content = "客户联系方式中已存在此手机号";
            this.tanChuang(this.ruleForm.content);
          } else if (lengthB > 2) {
            this.ruleForm.content = `关联客户${nameC}中已存在此手机号码`;
            this.tanChuang(this.ruleForm.content);
          } else {
            //页面中不存在时进行其他判客
            let data = {
              projectId: this.ruleForm.projectId,
              mobile: this.ruleForm.orderArr[index].contactInformation[index2]
                .phone
            };
            determineCustomer(data).then(res => {
              if (res.status === 200) {
                //获取登录人id
                let userId = Cookies.set("session");
                //判断是否添加
                if (res.data.flag) {
                  //不能添加
                  if (userId === res.data.propertyConsultId) {
                    //置业顾问是自己
                    this.ruleForm.content = `您的客户${
                      res.data.customName
                    }的联系方式中已存在此手机号码`;
                  } else {
                    //置业顾问不是自己
                    this.ruleForm.content = `其他客户中已存在此手机号,归属置业顾问：${
                      res.data.propertyConsultName
                    }`;
                  }

                  this.tanChuang(this.ruleForm.content);
                } else {
                  //可添加
                  //this.ruleForm.content = `归属置业顾问：${res.data.propertyConsultName}`
                  this.ruleForm.orderArr[index].contactInformation[
                    index2
                  ].isphone = false;
                  this.ruleForm.orderArr[index].telAdd = false;
                  this.editTeltel = "";
                }
              }
            });
          }
        }
      } else {
        this.$message.error("手机号码输入不正确，请重新输入！");
      }
    },

    cancelEdit_1_1(index, index2) {
      this.ruleForm.orderArr[index].contactInformation[index2].isphone = false;
    },

    //新增客户电话号码并判客
    saveleMobileAdd_1(row) {
      let tel_1 = /^[1][0-9]{10}$/;
      if (tel_1.test(this.ruleForm.telPhone)) {
        let arrayA = [];
        for (let i = 0; i < this.ruleForm.tel.length; i++) {
          arrayA.push(this.ruleForm.tel[i].phone);
        }
        let arrayB = [];
        let nameC = "";
        for (let j = 0; j < this.ruleForm.orderArr.length; j++) {
          for (
            let k = 0;
            k < this.ruleForm.orderArr[j].contactInformation.length;
            k++
          ) {
            arrayB.push(this.ruleForm.orderArr[j].contactInformation[k].phone);
            if (
              this.ruleForm.telPhone ===
              this.ruleForm.orderArr[j].contactInformation[k].phone
            ) {
              nameC = this.ruleForm.orderArr[j].refCustomName;
            }
          }
        }

        let arrayAStr = arrayA.toString();
        let arrayBStr = arrayB.toString();
        if (arrayAStr.indexOf(this.ruleForm.telPhone) !== -1) {
          this.ruleForm.content = "客户联系方式中已存在此手机号";
          this.tanChuang(this.ruleForm.content);
        } else if (arrayBStr.indexOf(this.ruleForm.telPhone) !== -1) {
          this.ruleForm.content = `关联客户${nameC}中已存在此手机号码`;
          this.tanChuang(this.ruleForm.content);
        } else {
          //页面中不存在时进行其他判客
          let data = {
            projectId: this.ruleForm.projectId,
            mobile: this.ruleForm.telPhone
          };
          determineCustomer(data).then(res => {
            if (res.status === 200) {
              //获取登录人id
              let userId = Cookies.set("session");
              //判断是否添加
              if (res.data.flag) {
                //不能添加
                if (userId === res.data.propertyConsultId) {
                  //置业顾问是自己
                  this.ruleForm.content = `您的客户${
                    res.data.customName
                  }的联系方式中已存在此手机号码`;
                } else {
                  //置业顾问不是自己
                  this.ruleForm.content = `其他客户中已存在此手机号,归属置业顾问：${
                    res.data.propertyConsultName
                  }`;
                }

                this.tanChuang(this.ruleForm.content);
              } else {
                //可添加
                this.ruleForm.tel.push({
                  key: Math.random(),
                  isCommon: false,
                  istel: false,
                  phone: this.ruleForm.telPhone
                });
                //清空新增数据
                this.ruleForm.telPhone = "";
                this.ruleForm.add = false;
              }
            }
          });
        }
      } else {
        this.$message.error("手机号码输入不正确，请重新输入");
      }
    },

    //取消编辑
    cancelEdit_1() {
      this.ruleForm.telPhone = "";
      let that = this;
      setTimeout(function() {
        that.ruleForm.add = false;
      }, 30);
    },

    //新增其他联系人号码并判客determineCustomer
    saveleMobileAdd_1_2(index) {
      let tel_1 = /^[1][0-9]{10}$/;
      if (tel_1.test(this.ruleForm.orderArr[index].telPhone_1)) {
        let arrayA = [];
        for (let i = 0; i < this.ruleForm.tel.length; i++) {
          arrayA.push(this.ruleForm.tel[i].phone);
        }
        let arrayB = [];
        let nameC = "";
        for (let j = 0; j < this.ruleForm.orderArr.length; j++) {
          for (
            let k = 0;
            k < this.ruleForm.orderArr[j].contactInformation.length;
            k++
          ) {
            arrayB.push(this.ruleForm.orderArr[j].contactInformation[k].phone);
            if (
              this.ruleForm.orderArr[index].telPhone_1 ===
              this.ruleForm.orderArr[j].contactInformation[k].phone
            ) {
              nameC = this.ruleForm.orderArr[j].refCustomName;
            }
          }
        }

        let arrayAStr = arrayA.toString();
        let arrayBStr = arrayB.toString();
        if (
          arrayAStr.indexOf(this.ruleForm.orderArr[index].telPhone_1) !== -1
        ) {
          this.ruleForm.content = "客户联系方式中已存在此手机号";
          this.tanChuang(this.ruleForm.content);
        } else if (
          arrayBStr.indexOf(this.ruleForm.orderArr[index].telPhone_1) !== -1
        ) {
          this.ruleForm.content = `关联客户${nameC}中已存在此手机号码`;
          this.tanChuang(this.ruleForm.content);
        } else {
          //页面中不存在时进行其他判客
          let data = {
            projectId: this.ruleForm.projectId,
            mobile: this.ruleForm.orderArr[index].telPhone_1
          };
          determineCustomer(data).then(res => {
            if (res.status === 200) {
              //获取登录人id
              let userId = Cookies.set("session");
              //判断是否添加
              if (res.data.flag) {
                //不能添加
                if (userId === res.data.propertyConsultId) {
                  //置业顾问是自己
                  this.ruleForm.content = `您的客户${
                    res.data.customName
                  }的联系方式中已存在此手机号码`;
                } else {
                  //置业顾问不是自己
                  this.ruleForm.content = `其他客户中已存在此手机号,归属置业顾问：${
                    res.data.propertyConsultName
                  }`;
                }

                this.tanChuang(this.ruleForm.content);
              } else {
                //可添加
                this.ruleForm.orderArr[index].contactInformation.push({
                  isCommon: false,
                  isphone: false,
                  phone: this.ruleForm.orderArr[index].telPhone_1
                });
                //清空新增数据
                this.ruleForm.orderArr[index].telPhone_1 = "";
                this.ruleForm.orderArr[index].telAdd = false;
                this.ruleForm.orderArr[index].deteleTle = true;
                this.ruleForm.orderArr[
                  index
                ].contactInformation[0].isCommon = true;
              }
            }
          });
        }
      } else {
        this.$message.error("手机号码输入不正确，请重新输入！");
      }
    },
    //其他联系人手机号码取消编辑
    cancelEdit_1_2(index) {
      this.ruleForm.orderArr[index].telPhone_1 = "";
      let that = this;
      setTimeout(function() {
        that.ruleForm.phoneAdd = false;
        that.ruleForm.orderArr[index].telAdd = false;
      }, 30);
    },

    // 获取页面数据
    initData() {
      return new Promise((resove, reject) => {
        this.$nextTick(() => {
          resove(console.log("获取页面信息"));
        });
      }).then(this.initTableList());
    },

    //获取页面信息//
    initTableList() {
      let data = {
        id: this.$route.query.id
      };
      getCustomerDetails(data).then(res => {
        if (res.status === 200) {
            
          //赋值
          this.transferdata(res.data);
        }
      });
    },

    //获知途径一级
    getLearnWay() {
      //this.labeLValue.customInfoLabel.getwayLabel.labelDictList
      // let obj = this.labeLValue.customInfoLabel.getwayLabel.labelDictList
      //  for(let i = 0;i<res.data.length;i++){
      //       this.accessToKnowledgeOptions.push({label:res.data[i].itemValue,type:res.data[i].itemValue,value:res.data[i].itemCode,children:[]})
      //     }
      let obj = {
        typeCode: this.learnWay
      };
      getLearnWayOne(obj).then(res => {
        if (res.status === 200) {
          for (let i = 0; i < res.data.length; i++) {
            this.accessToKnowledgeOptions.push({
              label: res.data[i].itemValue,
              type: res.data[i].itemValue,
              value: res.data[i].itemCode,
              children: []
            });
          }
        }
      });
    },

    //获取省份
    getCityList() {
      getCityListForCascader().then(res => {
        if (res.status === 200) {
          this.cityTree = res.data;
        }
      });
    },
    //获取省份

    /*********三级联动的菜单***********/

    //获知途径一级

    handleSourceChange(val) {
      this.postSourceName = [];
      let length = this.accessToKnowledgeOptions.length;
      let index = 0;

      for (let i = 0; i < length; i++) {
        if (this.accessToKnowledgeOptions[i].value == val[0]) {
          index = i;
          break;
        }
      }

      if (!this.cityTree[index].children.length) {
        let arr = [];
        let obj = {
          typeCode: val[0]
        };
        getLearnWayOne(obj).then(res => {
          if (res.status === 200) {
            this.accessToKnowledgeOptions[index].children = [];
            for (let i = 0; i < res.data.length; i++) {
              this.accessToKnowledgeOptions[index].children.push({
                label: res.data[i].itemValue,
                value: res.data[i].itemValue
              });
            }
            this.postSourceName.push(
              this.accessToKnowledgeOptions[index].label
            );
          }
        });
      }
    },

    //赋值获知途径2222222222
    celectSourceChange(val) {
      //this.ruleForm.source = []
      this.postSourceName.push(val[1]);
    },

    //地址选择三级联动菜单
    handleCityChange(val) {
      let length = this.cityTree.length;
      let index = 0;

      //let cityIndex = 0;
      for (let i = 0; i < length; i++) {
        if (this.cityTree[i].value == val[0]) {
          index = i;
          break;
        }
      }

      if (val.length === 1) {
        //发送请求加载
        if (!this.cityTree[index].children.length) {
          let provinceCode = {
            parentCode: val[0]
          };
          getCityListForCascader(provinceCode).then(res => {
            if (res.status === 200) {
              this.cityTree[index].children = res.data;
            }
          });
        }
      } else if (val.length === 2) {
        let cityValue = val[1];
        let city = this.cityTree[index].children;
        let cityIndex = 0;
        for (let j = 0; j < city.length; j++) {
          if (city[j].value == cityValue) {
            cityIndex = j;
            break;
          }
        }
        //发送请求加载
        if (!city[cityIndex].children.length) {
          let cityCode = {
            parentCode: cityValue
          };
          getCityListForCascader(cityCode).then(res => {
            if (res.status === 200) {
              city[cityIndex].children = res.data;
            }
          });
        }
      }
    },

    //赋值获知途径
    celectCityChange(val) {
      let length = this.cityTree.length;
      let index = 0;

      for (let i = 0; i < length; i++) {
        if (this.cityTree[i].value === val[0]) {
          index = i;
          this.postSourceName[0] = this.cityTree[i].label; //赋值省份
          let city = this.cityTree[i].children;

          for (let j = 0; j < city.length; j++) {
            if (city[j].value === val[1]) {
              this.postSourceName[1] = city[j].label; //赋值城市
              let ear = city[j].children;
              for (let k = 0; k < ear.length; k++) {
                if (ear[k].value === val[2]) {
                  this.postSourceName[2] = ear[k].label; //赋值区县
                }
              }
            }
          }
        }
      }
    },

    //赋值居住区域
    celectCityChange_Region(val) {
      let length = this.cityTree.length;
      let index = 0;

      for (let i = 0; i < length; i++) {
        if (this.cityTree[i].value === val[0]) {
          index = i;
          this.postRegionName[0] = this.cityTree[i].label; //赋值省份
          let city = this.cityTree[i].children;

          for (let j = 0; j < city.length; j++) {
            if (city[j].value === val[1]) {
              this.postRegionName[1] = city[j].label; //赋值城市
              let ear = city[j].children;
              for (let k = 0; k < ear.length; k++) {
                if (ear[k].value === val[2]) {
                  this.postRegionName[2] = ear[k].label; //赋值区县
                }
              }
            }
          }
        }
      }
    },

    //赋值工作区域
    celectCityChange_workInfo(val) {
      let length = this.cityTree.length;
      let index = 0;

      for (let i = 0; i < length; i++) {
        if (this.cityTree[i].value === val[0]) {
          index = i;
          this.postWorkInfoName[0] = this.cityTree[i].label; //赋值省份
          let city = this.cityTree[i].children;

          for (let j = 0; j < city.length; j++) {
            if (city[j].value === val[1]) {
              this.postWorkInfoName[1] = city[j].label; //赋值城市
              let ear = city[j].children;
              for (let k = 0; k < ear.length; k++) {
                if (ear[k].value === val[2]) {
                  this.postWorkInfoName[2] = ear[k].label; //赋值区县
                }
              }
            }
          }
        }
      }
    },

    //数据赋值到ruleForm
    transferdata(data) {
       
      if (data.projectId) {
        this.projectId = data.projectId;
      }
      /* -------------------------基本信息------------------------- */
      //项目id
      this.projectId = data.projectId;
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
      this.ruleForm.visitFlag = data.isVisit;
      if (data.isVisit == "是") {
        this.ruleForm.visitFlag = "已到访";
      } else {
        this.ruleForm.visitFlag = "未到访";
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
      if (data.source) {
        this.ruleForm.source.push(data.sourceFullPath);
        if (data.sourceFullPath) {
          this.postSourceName = data.sourceFullPath.split("/");
        }

        this.ruleForm.sourceText = data.sourceFullPath;
      }
      // //工作区域99999999999
      //工作区域id
      if (data.workInfoName) {
        this.ruleForm.workInfo = data.workInfo;
        this.ruleForm.workInfoName = data.workInfo.split(",");
        this.postWorkInfoName = data.workInfoName.split("/");
        this.ruleForm.workInfoText =
          this.postWorkInfoName[0] +
          "/" +
          this.postWorkInfoName[1] +
          "/" +
          this.postWorkInfoName[2];
      }

      //现居住情况
      this.ruleForm.dwellInfo = data.dwellInfo;
      //居住区域2222222222222
      if (data.dwellRegionName) {
        this.ruleForm.dwellRegion = data.dwellRegion;
        this.ruleForm.dwellRegionName = data.dwellRegion.split(",");
        this.postRegionName = data.dwellRegionName.split("/");
        this.ruleForm.dwellRegionText =
          this.postRegionName[0] +
          "/" +
          this.postRegionName[1] +
          "/" +
          this.postRegionName[2];
      }
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

      //客户元素列表
      this.ruleForm.customItemList = data.customItemList;

      this.ruleForm.maritalStatus = data.maritalStatus;// 婚姻
      this.ruleForm.maritalStatusText = data.maritalStatusText;
      this.ruleForm.maritalStatusObj = {
        dictCode: data.maritalStatus,
        dictName: data.maritalStatusText,
      };
        /* -------------------------购房需求------------------------- */
      if (data.nicheNeedList.length > 0) {
        this.purchaseArr = [];
        let purchaseArray = [];
        for (let i = 0; i < data.nicheNeedList.length; i++) {
          let focusArray = [];
          let dragArray = [];

          purchaseArray.push({
            // 增加key 解决校验问题
            key: Math.random(),
            // 当前是否展开
            isOpen: true,
            // 购房主要用途2323232323
            mainUse: data.nicheNeedList[i].mainUseText,
            // 购房主要用途_其他文本框
            mainUseOrder: data.nicheNeedList[i].mainUseText,
            // 需求业态
            formatName: data.nicheNeedList[i].formatName,
            // 居室
            bedroomType: data.nicheNeedList[i].bedroomTypeList
              ? data.nicheNeedList[i].bedroomTypeList
              : [],
            // 朝向
            orientation: data.nicheNeedList[i].orientationList
              ? data.nicheNeedList[i].orientationList
              : [],
            // 需求面积
            needArea: data.nicheNeedList[i].needArea,
            // 总价预算
            totalBdget: data.nicheNeedList[i].totalBudget,
            // 需求套数
            needCount: data.nicheNeedList[i].needCount,
            // 意向户号文本显示
            intentionNoPlaceholder: data.nicheNeedList[i].intentionNames,
            // 竞品楼盘
            houseProject: data.nicheNeedList[i].houseProject,
            // 车位需求
            carFlag: data.nicheNeedList[i].carFlag
              ? data.nicheNeedList[i].carFlag.toString()
              : null,
            // 关注要素
            focus: focusArray,
            // 主要抗性
            drag: dragArray
          });

          if (data.nicheNeedList[i].customItemList) {
            for (
              let j = 0;
              j < data.nicheNeedList[i].customItemList.length;
              j++
            ) {
              //取出关注要素
              if (
                data.nicheNeedList[i].customItemList[j].itemType === "FOCUS"
              ) {
                focusArray.push(
                  data.nicheNeedList[i].customItemList[j].itemValue
                );
              }
              //取出主要抗性
              if (data.nicheNeedList[i].customItemList[j].itemType === "DRAG") {
                dragArray.push(
                  data.nicheNeedList[i].customItemList[j].itemValue
                );
              }
            }
          } else {
            focusArray = null;
            dragArray = null;
          }
        }

        this.ruleForm.purchaseArr = purchaseArray;
      }
      if (this.ruleForm.purchaseArr.length === 1) {
        this.ruleForm.purchaseArr[0].isOpen = true;
      } else {
        for (let i = 0; i < this.ruleForm.purchaseArr.length; i++) {
          this.ruleForm.purchaseArr[i].isOpen = false;
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
      //汽车品牌343434
      for (let i = 0; i < data.customItemList.length; i++) {
        if (data.customItemList[i].itemType === "CAR_BRAND") {
          this.ruleForm.carBrand.push(data.customItemList[i].itemValue);
        }

        if (data.customItemList[i].itemType === "INTEREST") {
          this.ruleForm.interest.push(data.customItemList[i].itemValue);
        }

        if (data.customItemList[i].itemType === "TAG") {
          this.ruleForm.tabValue.push(data.customItemList[i].itemValue);
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
            //取消编辑按钮
            deteleTle: false,
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
                isCommon: data.customContactList[i].contactMethodList[kk].isMain
                  ? 1
                  : 0,
                //备注
                remark: data.customContactList[i].contactMethodList[kk].remark
              });
            }
          }
        }
        //客户需求this.ruleForm.orderArr[0].contactInformation[index2].isphone =
        this.ruleForm.orderArr = orderArray;
        if (this.ruleForm.orderArr) {
          for (let i = 0; i < this.ruleForm.orderArr.length; i++) {
            if (
              this.ruleForm.orderArr[i].contactInformation &&
              this.ruleForm.orderArr[i].contactInformation.length > 0
            ) {
              this.ruleForm.orderArr[i].contactInformation[0].isCommon = true;
              this.ruleForm.phoneAdd = true;
              this.ruleForm.orderArr[i].telAdd = false;
            } else {
              this.ruleForm.orderArr[i].deteleTle = false;
              this.ruleForm.orderArr[i].telAdd = true;
            }
          }
        }

        if (this.ruleForm.orderArr.length === 1) {
          this.ruleForm.orderArr[0].isOpen = true;
        } else {
          for (let i = 0; i < this.ruleForm.orderArr.length; i++) {
            this.ruleForm.orderArr[i].isOpen = false;
          }
        }
      }

      //兴趣爱好
      // if(data.interest){
      //   this.ruleForm.interest = data.interest.split(',')
      // }

      //客户标签
      //this.ruleForm.tab = data.tab
      /*-----------------------------需求数组--------------------------*/

      this.ruleForm.customItemList = data.customItemList;
      //备注
      this.ruleForm.remark = data.remark;

      //}

      /*-------------------------------自定义标签6666-------------------------------*/
      if (data.userDefinedLabel) {
        this.initCustomer = JSON.stringify(data.userDefinedLabel);
        this.initCustomer = JSON.parse(this.initCustomer);
        this.initCustomer.forEach(v => {
          if (v.labelType === "checkbox") {
            if (v.checkBoxValues === null) {
              v.checkBoxValues = [];
            }
          }
        });
      }
    },

    /* ---------------------获取客户标签----------------------------- */

    // 获取其他数据
    initOrderData() {
      return new Promise((resove, reject) => {
        this.$nextTick(() => {
          resove();
        });
      });
    },
    // 获取所有客户标签
    initRules() {
      return new Promise((resove, reject) => {
        this.$nextTick(() => {
          resove();
        });
      }).then(() => {
        console.log(this.$route.query)
        let data = {
          projectId: this.$route.query.projectId,
          groupCodes: "customInfo,customNeed,customPurchasingPower,customElse"
        };
        getCheckLevel(data).then(res => {
          if (res.status === 200) {
            this.labeLValue = JSON.stringify(res.data);
            this.labeLValue = JSON.parse(this.labeLValue);
            let accessArray = this.labeLValue.customInfoLabel.getwayLabel
              .labelDictList;
            for (let i = 0; i < accessArray.length; i++) {
              let arr = [];
              this.accessToKnowledgeOptions.push({
                label: accessArray[i].dictName,
                value: accessArray[i].dictName,
                children: arr
              });

              if (accessArray[i].secLabelDictList) {
                for (
                  let k = 0;
                  k < accessArray[i].secLabelDictList.length;
                  k++
                ) {
                  arr.push({
                    label: accessArray[i].secLabelDictList[k].dictName,
                    value: accessArray[i].secLabelDictList[k].dictName
                  });
                }
              }
            }


            this.setRules_1(res.data);
          }
        });
      });
    },

    // 处理页面 校验逻辑
    setRules(data) {
      // 区分校验类型
      // blur 校验 ： 针对 文本框
      let obj1 = {
        nameLabel: "姓名",
        dwellGarden: "现居小区",
        dwellArea: "现居面积",
        comAddressLabel: "通讯地址",
        certificateNumberLabel: "证件号码",
        telLabel: "手机号码",
        needAreaLabel: "需求面积",
        totalBudgetLabel: "总价预算",
        houseProjectLabel: "竞品楼盘",
        customContactLabel: "关联客户",
        contactInformation: "联系方式",
        remark: "备注",
        intentionNoLabel: "意向户号"
      };
      // change 校验 ： 针对 单选框，时间
      let obj2 = {
        sexLabel: "性别",
        levelLabel: "意向等级",
        ageSectionLabel: "年龄段",
        birthdayLabel: "生日",
        isOwnerLabel: "是否绿城业主",
        getwayLabel: "获知途径",
        workAreaLabel: "工作区域",
        infomationLabel: "现居住情况",
        dwellAreaLabel: "居住区域",
        certificateTypeLabel: "证件类型",
        dwellInAreaLabel: "现居面积",
        formatLabel: "需求业态",
        carFlagLabel: "车位需求",
        mainUseLabel: "购房主要用途",
        payTypeLabel: "付款方式",
        existingPropertyLabel: "现有房产",
        existingLoan: "现有贷款",
        quotaLabel: "购房名额",
        familyLabel: "家庭构成",
        childrenNumLabel: "子女人数",
        familyYearIncomeLabel: "家庭年收入",
        industryLabel: "工作行业",
        dutyLabel: "工作职务",
        educationalLabel: "学历",
        outwayLabel: "出行方式",
        relationshipLabel: "与主客户关系",
        needCountLabel: "需求套数",
        contactMethodLabel: "联系方式"
      };
      // change 校验 ： 针对 多选框 树
      let obj3 = {
        habitableLabel: "居室",
        orientationLabel: "朝向",
        focusLabel: "关注要素",
        drag: "主要抗性",
        carBrandLabel: "汽车品牌",
        interestLabel: "兴趣爱好",
        tagLabel: "客户标签标签"
      };

      /*-------------------自定义校验规则------------------*/
      //this.labeLValue

      // 设置 校验规则
      for (let key in this.rules) {
        let rule = [];
        let required = this.ajaxRules[key] ? true : false;
        if (obj1[key]) {
          rule = [
            {
              required: required,
              message: `请输入${obj1[key]}`,
              trigger: "blur"
            }
          ];
        } else if (obj2[key]) {
          rule = [
            {
              required: required,
              message: `请选择${obj2[key]}`,
              trigger: "change"
            }
          ];
        } else if (obj3[key]) {
          rule = [
            {
              type: "array",
              required: required,
              message: `请选择${obj3[key]}`,
              trigger: "change"
            }
          ];
        }
        // 增加特殊校验
        // 手机号码
        if (key === "telLabel") {
          rule.push({
            pattern: /^[1][0-9]{10}$/,
            message: "手机号格式输入有误",
            trigger: "blur"
          });
        } else if (key === "needAreaLabel") {
          // // 联系方式
          // else if(key === 'contactInformation'){
          //   rule.push({
          //     pattern : /^[1][0-9]{10}$/,
          //     message : '联系方式格式输入有误',
          //     trigger : 'blur',
          //   });
          // 客户标签
          rule.push({
            pattern: /^([1-9]\d*|[0]{1,1})$/,
            message: "面积格式输入有误",
            trigger: ["blur", "change"]
          });
        } else if (key === "totalBudgetLabel") {
          // else if(key === 'needAreaLabel'){
          //   rule.push({
          //     pattern : /^([1-9]\d*|[0]{1,1})$/,
          //     message : '面积格式输入有误',
          //     trigger : 'blur',
          //   });
          // // 需求面积

          // }
          rule.push({
            pattern: /^([1-9]\d*|[0]{1,1})$/,
            message: "预算格式输入有误",
            trigger: ["blur", "change"]
          });
          // 总价预算
        } else if (key === "tagLabel") {
          rule.push({
            type: "array",
            required: required,
            message: `请选择客户标签`
          });
        }

        this.rules[key] = rule;

        //判断居民身份证号码的校验
        if (this.ruleForm.certificateType === "居民身份证") {
          let ruleCer = {
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message: "请输入正确的身份证号码",
            trigger: ["blur", "change"]
          };
          this.rules.certificateNumberLabel = [
            { message: "请输入证件号码", required: false, trigger: "blur" },
            ruleCer
          ];
        }
        //---------------------------------设置标签的校验规则------------------

        // 设置 自定义标签校验规则 (先设置 规则 ， 再设置数据)

        this.initCustomer.map((v, k) => {
          // 根据类型 设置校验类型
          let rule = [];
          let required = this.ajaxRules[v.labelName] ? true : false;

          if (v.labelType === "radio") {
            rule = [
              {
                required: required,
                message: `请输入${v.labelName}`,
                trigger: "change"
              }
            ];
          } else if (v.labelType === "checkbox") {
            rule = [
              {
                required: required,
                message: `请输入${v.labelName}`,
                trigger: "change"
              }
            ];
          } else if (v.labelType === "text") {
            rule = [
              {
                required: required,
                message: `请输入${v.labelName}`,
                trigger: "blur"
              }
            ];
          } else if (v.labelType === "number") {
            rule = [
              {
                required: required,
                message: `请输入${v.labelName}`,
                trigger: "blur"
              }
            ];
          } else if (v.labelType === "date") {
            rule = [
              {
                required: required,
                message: `请输入${v.labelName}`,
                trigger: "change"
              }
            ];
          } else if (v.labelType === "radioOther") {
            rule = [
              {
                required: required,
                message: `请输入${v.labelName}`,
                trigger: "change"
              }
            ];
          }
          this.rules[v.labelName] = rule;
        });
      }
      // 设置 标签数据
      this.ruleForm.customerArr = this.initCustomer;

      for (let i = 0; i < this.ruleForm.customerArr.length; i++) {
        let options = [];
        if (
          this.ruleForm.customerArr[i].labelType === "radio" &&
          this.ruleForm.customerArr[i].labelLevel === 2
        ) {

          for (
            let k = 0;
            k < this.ruleForm.customerArr[i].labelDictList.length;
            k++
          ) {
            let jsArr = this.ruleForm.customerArr[i].labelDictList[k];
            let opChild = [];

            let chil = jsArr.secLabelDictList;
            if (chil) {
              for (let gg = 0; gg < chil.length; gg++) {
                opChild.push({
                  label: chil[gg].dictName,
                  value: chil[gg].dictName
                });
              }
            }

            // this.ruleForm.customerArr[i].labelDictList = []
            options.push({
              label: jsArr.dictName,
              value: jsArr.dictName,
              children: opChild
            });
          }
          this.ruleForm.customerArr[i].options = options;
          if (this.ruleForm.customerArr[i].textValue) {
            if (
              this.ruleForm.customerArr[i].textValue instanceof Array !=
              true
            ) {
              this.ruleForm.customerArr[
                i
              ].textValue = this.ruleForm.customerArr[i].textValue.split("/");
            }
          }
        }
      }
    },

    //处理页面客户标签的校验逻辑（33333333333）
    setRules_1(item) {
      //customLevel(意向等级)
      let custom = this.ruleForm.customLevel ? this.ruleForm.customLevel : "C";
      //--------------------------客户基本信息
      //判断客户基础信息
      for (let key in item.customInfoLabel) {

        if (
          item.customInfoLabel[key] && item.customInfoLabel[key].requiredLevelStr &&
          item.customInfoLabel[key].isRequired === "是"
        ) {

          if (
            item.customInfoLabel[key].requiredLevelStr.indexOf(custom) !== -1
          ) {
            this.ajaxRules[key] = true;
          } else {
            this.ajaxRules[key] = false;
          }
        } else {
          this.ajaxRules[key] = false;
        }
      }
      //-------------------------------判断客户购买需求

      //判断购买需求
      for (let key in item.customNeedLabel) {

        if (
          item.customInfoLabel[key] && item.customNeedLabel[key].requiredLevelStr &&
          item.customNeedLabel[key].isRequired === "是"
        ) {
          if (
            item.customNeedLabel[key].requiredLevelStr.indexOf(custom) !== -1
          ) {
            this.ajaxRules[key] = true;
          } else {
            this.ajaxRules[key] = false;
          }
        } else {
          this.ajaxRules[key] = false;
        }
      }
      //-----------------------------判断客户购买力customPurchasingPowerLabel

      for (let key in item.customPurchasingPowerLabel) {

        if (
          item.customInfoLabel[key] && item.customPurchasingPowerLabel[key].requiredLevelStr &&
          item.customPurchasingPowerLabel[key].isRequired === "是"
        ) {
          if (
            item.customPurchasingPowerLabel[key].requiredLevelStr.indexOf(
              custom
            ) !== -1
          ) {
            this.ajaxRules[key] = true;
          } else {
            this.ajaxRules[key] = false;
          }
        } else {
          this.ajaxRules[key] = false;
        }
      }
      //---------------------------判断其他信息
      //判断其他信息
      for (let key in item.customElseLabel) {

        if (
          item.customInfoLabel[key] && item.customElseLabel[key].requiredLevelStr &&
          item.customElseLabel[key].isRequired === "是"
        ) {
          if (
            item.customElseLabel[key].requiredLevelStr.indexOf(custom) !== -1
          ) {
            this.ajaxRules[key] = true;
          } else {
            this.ajaxRules[key] = false;
          }
        } else {
          this.ajaxRules[key] = false;
        }
      }

      if (this.initCustomer) {
        for (let i = 0; i < this.initCustomer.length; i++) {
          if (this.initCustomer[i].requiredLevelStr) {
            if (this.initCustomer[i].requiredLevelStr.indexOf(custom) !== -1) {
              this.ajaxRules[this.initCustomer[i].labelName] = true;
              console.log("2222222设置校验", this.initCustomer[i].labelName);
            } else {
              this.ajaxRules[this.initCustomer[i].labelName] = false;
            }
          } else {
            this.ajaxRules[this.initCustomer[i].labelName] = false;
          }
        }
      }
      this.setRules(this.ajaxRules);
    },
    /* ---------------------页面初始化 数据处理----------------------------- */

    /* ---------------------保存以及关闭----------------------------- */
    // 点击提交
    handleSubmit() {
      // 打开所有 购房需求
      this.ruleForm.purchaseArr = this.ruleForm.purchaseArr.map((v, k) => {
        v.isOpen = true;
        return v;
      });
      // 打开所有 其他信息
      this.ruleForm.orderArr = this.ruleForm.orderArr.map((v, k) => {
        v.isOpen = true;
        return v;
      });
      this.$nextTick(() => {
        // 校验数据
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            let certificateTypeStr = "";
            let certificatCodeStr = "";
            if (this.ruleForm.certificateType) {
              certificateTypeStr = this.ruleForm.certificateType.dictName;
              certificatCodeStr = this.ruleForm.certificateType.dictCode;
            }
            let sourceOneStr = this.ruleForm.source[0];
            //获知途径二级
            let sourceStr = this.ruleForm.source[1];
            //获知途径全路径
            let sourceFullPathStr = this.ruleForm.source.join("/");
            // //工作区域转化为字符串
            let postCityNameStr = this.postCityName.join("/");
            // //居住区域转化字符串
            let postRegionNameStr = this.postRegionName.join("/");
            let telStr = this.ruleForm.tel.join(",");

            //客户联系方式列表过度数组
            let customContactMethodListArr = [];

            //客户联系方式列表上传
            if (this.ruleForm.tel.length > 0) {
              for (let kkk = 0; kkk < this.ruleForm.tel.length; kkk++) {
                customContactMethodListArr.push({
                  // customId: this.ruleForm.tel[kkk].customId,
                  //——客户id
                  id: this.ruleForm.tel[kkk].id,
                  //——客户联系方式id
                  isMain: this.ruleForm.tel[kkk].isCommon ? 1 : 0,
                  //——是否为常用 1：是 0：否
                  no: this.ruleForm.tel[kkk].phone,
                  //——号码
                  remark: this.ruleForm.remark,
                  //——备注
                  type: "TEL"
                  //——号码类型 TEL：电话
                });
              }
            }

            /*************************************其他联系人************************************ */
            //其他联系人数组上传

            //其他联系人列表过度数组
            let customContactListArr = [];
            //其他联系人联系方式过度数组
            let contactInformationArr = [];

            if (this.ruleForm.orderArr) {
              for (let i = 0; i < this.ruleForm.orderArr.length; i++) {
                //与主客户关系过度数组
                let newArray = [];
                for (
                  let g = 0;
                  g < this.ruleForm.orderArr[i].contactInformation.length;
                  g++
                ) {
                  if (
                    newArray.indexOf(
                      this.ruleForm.orderArr[i].contactInformation[g].phone
                    ) === -1
                  ) {
                    newArray.push({
                      // customId: this.ruleForm.customId,
                      id: this.ruleForm.orderArr[i].contactInformation[g]
                        .otherId,
                      isMain: this.ruleForm.orderArr[i].contactInformation[g]
                        .isCommon
                        ? 1
                        : 0,
                      no: this.ruleForm.orderArr[i].contactInformation[g].phone,
                      remark: this.ruleForm.orderArr[i].contactInformation[g]
                        .remark,
                      type: "TEL"
                    });
                  }
                }
                customContactListArr.push({
                  id: this.ruleForm.orderArr[i].otherId,
                  //——其他联系人id
                  name: this.ruleForm.orderArr[i].refCustomName,
                  //	——其他联系人姓名
                  relationship: this.ruleForm.orderArr[i].relationship,
                  //——与主客户关系  7777777777777
                  contactMethodList: newArray
                });
              }
            }

            //性别转化
            if (this.ruleForm.sex === "1") {
              this.ruleForm.sex = "男";
            } else if (this.ruleForm.sex === "0") {
              this.ruleForm.sex = "女";
            }

            /****************************购房需求***********************************/
            //客户需求过度数组
            let nicheNeedListArr = [];

            if (this.ruleForm.purchaseArr != null) {
              for (let i = 0; i < this.ruleForm.purchaseArr.length; i++) {
                //客户元素上传
                let customItemListArr = [];
                //居室转换
                let bedroomTypeStr = this.ruleForm.purchaseArr[
                  i
                ].bedroomType.join(",");
                //朝向转字符
                let orientationStr = this.ruleForm.purchaseArr[
                  i
                ].orientation.join(",");
                //车位需求
                //电话号码转化
                let telArr = [];
                for (let i = 0; i < this.ruleForm.tel.length; i++) {
                  telArr.push(this.ruleForm.tel[i].phone);
                }
                this.ruleForm.telString = telArr.join(",");

                //主要抗性
                let focusListArr = [];
                if (this.ruleForm.purchaseArr[i].focus.length > 0) {
                  for (
                    let j = 0;
                    j < this.ruleForm.purchaseArr[i].focus.length;
                    j++
                  ) {
                    focusListArr.push({
                      itemType: "FOCUS",
                      itemValue: this.ruleForm.purchaseArr[i].focus[j]
                    });
                  }
                }
                //关注s要素
                let dragListArr = [];
                if (this.ruleForm.purchaseArr[i].drag.length > 0) {
                  for (
                    let j = 0;
                    j < this.ruleForm.purchaseArr[i].drag.length;
                    j++
                  ) {
                    dragListArr.push({
                      itemType: "DRAG",
                      itemValue: this.ruleForm.purchaseArr[i].drag[j]
                    });
                  }
                }

                //主要用途33333333333333
                let mainUseStr = "";
                let mainUseTextStr = "";
                if (this.ruleForm.purchaseArr[i].mainUse) {
                  mainUseStr = this.ruleForm.purchaseArr[i].mainUse.dictCode;
                  mainUseTextStr = this.ruleForm.purchaseArr[i].mainUse
                    .dictName;
                  this.labeLValue.customNeedLabel.mainUseLabel.labelDictList.forEach(
                    v => {
                      if (v.dictName === this.ruleForm.purchaseArr[i].mainUse) {
                        mainUseStr = v.dictCode;
                        mainUseTextStr = v.dictName;
                      }
                    }
                  );
                }

                nicheNeedListArr.push({
                  //主要跟抗性
                  dragList: dragListArr,
                  //关注要素
                  focusList: focusListArr,
                  bedroomType: bedroomTypeStr,
                  //——居室类型 逗号分隔 如：一居室,二居室
                  carFlag: this.ruleForm.purchaseArr[i].carFlag,
                  //——车位需求 1：有 0：无
                  customId: this.$route.query.id,
                  //——客户id
                  formatCode: this.ruleForm.purchaseArr[i].formatCode,
                  //——业态编码
                  formatName: this.ruleForm.purchaseArr[i].formatName,
                  //——业态名称
                  houseProject: this.ruleForm.purchaseArr[i].houseProject,
                  //——竟品楼盘
                  houseProjectCode: this.ruleForm.purchaseArr[i]
                    .houseProjectCode,
                  //——竟品楼盘编码
                  id: this.ruleForm.needId,
                  //意向户号名称6666666
                  intentionNames: this.ruleForm.purchaseArr[i]
                    .intentionNoPlaceholder,
                  mainUse: mainUseStr,
                  //——主要用途 use_yjs:第一居所，use_xq:学区，use_gsjz:改善居住条件，use_fmzy:为父母置业，use_znzy:为子女置业
                  //use_hf:结婚用房(婚房)，use_tz:投资(增值保值)，use_dj:度假，use_zzyn:自住养老(养老)
                  //，use_other其他，并填写
                  mainUseText: mainUseTextStr,
                  //——主要用途文本 use_yjs:第一居所，use_xq:学区，use_gsjz:改善居住条件，use_fmzy:为父母置业，use_znzy:为子女置业
                  //use_hf:结婚用房(婚房)，use_tz:投资(增值保值)，use_dj:度假，use_zzyn:自住养老(养老)
                  // ，use_other其他，并填写
                  needArea: this.ruleForm.purchaseArr[i].needArea,
                  //——需求面积
                  needCount: this.ruleForm.purchaseArr[i].needCount,
                  //——需求套数
                  nicheId: this.ruleForm.purchaseArr[i].nicheId,
                  //——客户商机id
                  orientation: orientationStr,
                  //——朝向 东/西/南/北/东南/西南/东北/西北 多个选项时，逗号分隔
                  remark: this.ruleForm.purchaseArr[i].remark,
                  //——备注
                  totalBudget: this.ruleForm.purchaseArr[i].totalBdget
                  //——总预算
                });
              }
            } else {
              nicheNeedListArr = [];
            }

            if (this.ruleForm.visitFlag === "已到访") {
              this.ruleForm.visitFlag = "是";
            } else {
              this.ruleForm.visitFlag = "否";
            }

            if (this.ruleForm.quotaFlag == "是") {
              this.ruleForm.quotaFlag = "1";
            } else if (this.ruleForm.quotaFlag == "否") {
              this.ruleForm.quotaFlag = "0";
            }

            if (this.ruleForm.isOwner == "是") {
              this.ruleForm.isOwner = "1";
            } else if (this.ruleForm.isOwner == "否") {
              this.ruleForm.isOwner = "0";
            }

            //汽车品牌
            let carBrandArr = [];
            if (this.ruleForm.carBrand) {
              for (let i = 0; i < this.ruleForm.carBrand.length; i++) {
                carBrandArr.push({
                  itemValue: this.ruleForm.carBrand[i]
                });
              }
            }

            //兴趣爱好
            let interestArr = [];
            if (this.ruleForm.interest) {
              for (let i = 0; i < this.ruleForm.interest.length; i++) {
                interestArr.push({
                  itemValue: this.ruleForm.interest[i]
                });
              }
            }
            //客户标签222222222222
            let arr = [];
            if (this.ruleForm.tabOptions) {
              this.ruleForm.tabValue.map((v, k) => {
                this.ruleForm.tabOptions.map((v1, k1) => {
                  if (v === v1.itemValue) {
                    arr.push({
                      itemValue: v1.itemValue,
                      id: v1.id,
                      itemCode: v1.itemCode
                    });
                  }
                });
              });
            }

            for (let i = 0; i < this.ruleForm.tabValue.length; i++) {
              let val = this.ruleForm.tabValue[i];
              let len = arr.filter((v, k) => {
                return v.itemValue === val;
              }).length;
              len === 0 && arr.push({ itemValue: val });
            }

            //居住区域7777777777777
            let dwellRegionStr = null;
            let dwellRegionNameStr = null;
            if (this.ruleForm.dwellRegionName.length === 3) {
              dwellRegionStr =
                this.ruleForm.dwellRegionName[0] +
                "/" +
                this.ruleForm.dwellRegionName[1] +
                "/" +
                this.ruleForm.dwellRegionName[2]; //workInfo存的是工作区域的id
              this.ruleForm.dwellRegion = dwellRegionStr;
            }
            if (this.postRegionName.length === 3) {
              dwellRegionNameStr =
                this.postRegionName[0] +
                "/" +
                this.postRegionName[1] +
                "/" +
                this.postRegionName[2];
            }

            //工作区域
            let workInfoStr = null;
            let workInfoNameStr = null;
            if (this.ruleForm.workInfoName.length === 3) {
              workInfoStr =
                this.ruleForm.workInfoName[0] +
                "/" +
                this.ruleForm.workInfoName[1] +
                "/" +
                this.ruleForm.workInfoName[2]; //workInfo存的是工作区域的id
              this.ruleForm.workInfo = workInfoStr;
            }
            if (this.postWorkInfoName.length === 3) {
              workInfoNameStr =
                this.postWorkInfoName[0] +
                "/" +
                this.postWorkInfoName[1] +
                "/" +
                this.postWorkInfoName[2];
            }
            if (
              customContactListArr[0].id === null &&
              customContactListArr[0].name === "" &&
              customContactListArr[0].relationship === "" &&
              customContactListArr[0].contactMethodList.length <= 0
            ) {
              customContactListArr = null;
            }

            //自定义标签的传值6666666666666
            let labelDataList = [];
            if (this.ruleForm.customerArr) {
              for (let i = 0; i < this.ruleForm.customerArr.length; i++) {
                if (this.ruleForm.customerArr[i].labelType === "checkbox") {
                  if (this.ruleForm.customerArr[i].checkBoxValues) {
                    for (
                      let k = 0;
                      k < this.ruleForm.customerArr[i].checkBoxValues.length;
                      k++
                    ) {
                      labelDataList.push({
                        dictName: this.ruleForm.customerArr[i].checkBoxValues[
                          k
                        ],
                        labelId: this.ruleForm.customerArr[i].id
                      });
                    }
                  }
                } else if (
                  this.ruleForm.customerArr[i].labelType === "radio" &&
                  this.ruleForm.customerArr[i].labelLevel === 1
                ) {
                  if (this.ruleForm.customerArr[i].textValue) {
                    labelDataList.push({
                      dictName: this.ruleForm.customerArr[i].textValue,
                      labelId: this.ruleForm.customerArr[i].id
                    });
                  }
                } else if (
                  this.ruleForm.customerArr[i].labelType === "radio" &&
                  this.ruleForm.customerArr[i].labelLevel === 2
                ) {
                  if (this.ruleForm.customerArr[i].textValue) {
                    let str =
                      this.ruleForm.customerArr[i].textValue[0] +
                      "/" +
                      this.ruleForm.customerArr[i].textValue[1];
                    labelDataList.push({
                      dictName: str,
                      labelId: this.ruleForm.customerArr[i].id
                    });
                  }
                } else {
                  if (this.ruleForm.customerArr[i].textValue) {
                    labelDataList.push({
                      labelId: this.ruleForm.customerArr[i].id,
                      value: this.ruleForm.customerArr[i].textValue
                    });
                  }
                }
              }
            }
            if (
              this.ruleForm.certificateNo === "居民身份证" &&
              !this.idCard(certificatCodeStr)
            ) {
              this.$message.error("居民身份证格式错误！");
              return;
            }

            let dataS = {
              id: this.ruleForm.id,
              //客户id
              addr: this.ruleForm.addr,
              //,	——客户地址
              ageSection: this.ruleForm.ageSection,
              //,		——客户年龄段
              birthday: this.ruleForm.birthday,
              //,	——客户生日
              certificateName: certificateTypeStr,
              //		——客户证件名称
              certificateNo: this.ruleForm.certificateNo,
              //	——客户证件号码
              certificateType: certificatCodeStr,
              //	——客户证件类型
              childrenNum: this.ruleForm.childrenNum,
              //	——客户子女数量
              cstLevel: this.ruleForm.customLevel,
              //	——客户等级
              customContactList: customContactListArr,
              //其他联系人列表
              customContactMethodList: customContactMethodListArr,
              //客户联系方式列表
              // customItemList:this.ruleForm.customItemList,
              //客户元素列表
              duty: this.ruleForm.duty,
              //——客户职务
              dwellArea: this.ruleForm.dwellArea,
              //——客户居住面积 (平方米)
              dwellGarden: this.ruleForm.dwellGarden,
              //——客户现住小区99999999999
              dwellInfo: this.ruleForm.dwellInfo,
              //——客户居住情况
              dwellRegion: this.ruleForm.dwellRegion,
              //——客户居住区域
              dwellRegionName: dwellRegionNameStr,
              //客户居住区域名字
              educational: this.ruleForm.educational,
              //——客户学历
              existingLoan: this.ruleForm.existingLoan,
              //——客户存在贷款
              existingProperty: this.ruleForm.existingProperty,
              //——客户现有房产
              familyStructure: this.ruleForm.familyStructure,
              //——客户家庭构成
              familyYearlyIncome: this.ruleForm.familyYearlyIncome,
              //——客户家庭年收入
              id: this.$route.query.id,
              //——客户id
              industry: this.ruleForm.industry,
              //——客户行业
              isOwner: this.ruleForm.isOwner,
              //——是否绿城业主 1：是 0：否
              name: this.ruleForm.name,
              //——客户姓名
              nicheId: this.ruleForm.nicheId,
              //——客户商机id
              nicheNeedList: nicheNeedListArr,
              //购买需求（修改）
              outWay: this.ruleForm.outWay,
              //——客户出行方式
              payType: this.ruleForm.payType,
              //——客户付款方式
              projectId: this.ruleForm.projectId,
              //——项目id
              quotaFlag: this.ruleForm.quotaFlag,
              //——客户有购房名额 1：是 0：否
              remark: this.ruleForm.remark,
              //——备注
              sex: this.ruleForm.sex,
              //——客户性别 1-男；0-女
              source: sourceStr,
              //——客户获知途径
              sourceOne: sourceOneStr,
              //——客户获知途径
              sourceFullPath: sourceFullPathStr,
              tel: this.ruleForm.telString,
              //——客户电话
              workInfo: this.ruleForm.workInfo,
              //——客户工作区域
              workInfoName: workInfoNameStr,
              //工作区域名称
              isVisit: this.ruleForm.visitFlag,
              //汽车品牌
              carBrandList: carBrandArr,
              //兴趣爱好
              interestList: interestArr,
              //客户标签
              tagList: arr,
              //备注信息
              remark: this.ruleForm.remark,
              //自定义信息的传值
              labelDataList: labelDataList
              // maritalStatus:  this.ruleForm.maritalStatus,
            };
            if (this.ruleForm.maritalStatusObj.dictName) {
              // 婚姻状态
              dataS.maritalStatus = this.ruleForm.maritalStatusObj.dictCode;
              dataS.maritalStatusText = this.ruleForm.maritalStatusObj.dictName;
            }
            upDataCostom(dataS).then(res => {
              if (res.status === 200) {
                let types = this.$route.query.type;
                this.$router.push({
                  path: `/mainPage/customerFollowUp/customerManagementView?id=${
                    this.ruleForm.id
                  }&type=${types}&projectId=${this.$route.query.projectId}`
                });
              }
            });
          }
        });
      });
    },
    // 点击关闭
    handleClose() {
      // 判断 如果上个页面是 客户管理查看页面 则返回 查看页面
      let url = this.$route.query.url
        ? decodeURIComponent(this.$route.query.url)
        : "/mainpage/customerFollowUp/customerFollowPage";
      this.$router.push({
        path: url
      });
    },
    /* ---------------------保存以及关闭----------------------------- */

    /* ---------------------基本信息 手机号相关逻辑----------------------------- */
    // 点击 +
    handleMobileAdd() {
      this.ruleForm.add = true;
    },
    handleMobileAdd_1(index) {
      this.ruleForm.orderArr[index].telAdd = true;
    },

    // 点击 -
    handleMobileDelete(index) {
      let isCommon = this.ruleForm.tel[index].isCommon;
      this.ruleForm.tel.splice(index, 1);
      // 如果当前删除的是 常用状态
      if (isCommon === true) {
        this.$nextTick(() => {
          this.$set(this.ruleForm.tel[0], "isCommon", true);
        });
      }
    },
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
          console.log("上传成功");
        }
      });
    },

    // 其他联系人手机号码设为常用
    handSetCommon_1(index, index2) {
      for (
        let i = 0;
        i < this.ruleForm.orderArr[index].contactInformation.length;
        i++
      ) {
        if (i === index2) {
          this.ruleForm.orderArr[index].contactInformation[i].isCommon = true;
        } else {
          this.ruleForm.orderArr[index].contactInformation[i].isCommon = false;
        }
      }
    },
    // 意向等级 change
    handleCustomLevelChange() {
      this.initRules();
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
      //console.log('移入');
      this.$set(item, "active", true);
    },
    // 鼠标移出
    handleHouseListMouseleave(item, index) {
      //console.log('移出');
      this.$set(item, "active", false);
    },
    // 点击 +
    handleHouseListAdd(item, index) {
      // 校验 数据11111111111111111111111
      let verifyArr = [
        "mainUse",
        "formatName",
        "bedroomType",
        "orientation",
        "needCount",
        "houseProject",
        "carFlag",
        "focus",
        "drag"
      ];
      // 如果购房需求选择其他 增加其他输入框的校验
      if (item.mainUse === "useOther") {
        verifyArr.push("mainUseOrder");
      }
      let verifySuccessLength = 0;
      // 循环校验
      if (
        item.bedroomType.length === 0 &&
        item.carFlag === null &&
        item.drag.length === 0 &&
        item.focus.length === 0 &&
        item.formatName === "" &&
        item.houseProject === "" &&
        item.intentionNoPlaceholder === "" &&
        item.mainUse == "" &&
        item.needArea === "" &&
        item.needCount === "" &&
        item.orientation.length === 0 &&
        item.totalBdget === ""
      ) {
        this.$message.error("购房需求不能为空");
      } else {
        verifyArr.map((v, k) => {
          this.$refs.ruleForm.validateField(
            `purchaseArr[${index}].${v}`,
            valid => {
              if (!valid) {
                verifySuccessLength++;
              }
            }
          );
        });
      }

      // 如果没有通过 退出
      if (verifySuccessLength !== verifyArr.length) {
        return;
      }
      // 收起当前
      this.ruleForm.purchaseArr[index].isOpen = false;
      // 增加数据
      let length = this.ruleForm.purchaseArr.length;
      let houseListDefault = {
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
        // 居室
        bedroomType: [],
        // 朝向
        orientation: [],
        // 需求面积
        needArea: "",
        // 总价预算
        totalBdget: "",
        // 需求套数
        needCount: "",
        // 意向户号文本显示
        intentionNoPlaceholder: "",
        // 竞品楼盘
        houseProjectCode: "",
        // 车位需求
        carFlag: "",
        // 关注要素
        focus: [],
        // 主要抗性
        drag: []
      };
      this.ruleForm.purchaseArr.push(houseListDefault);
      // 移出当前 选中状态
      this.handleHouseListMouseleave(item);
    },
    // 点击 -
    handleHouseListDelete(item, index) {
      this.ruleForm.purchaseArr.splice(index, 1);
    },
    /* ---------------------购房需求 相关逻辑----------------------------- */

    /* ---------------------其他信息 相关逻辑----------------------------- */
    // 联系方式 增加
    handleOrderPhoneAdd(item2, index2, index) {
      this.ruleForm.orderArr[index].contactInformation.push({
        key: Math.random(),
        // 联系方式 手机号
        phone: "",
        // 是否常用
        isCommon: false
      });
    },
    // 联系方式 删除
    handleOrderPhoneDelete(item2, index2, index) {
      this.ruleForm.orderArr[index].contactInformation.splice(index2, 1);
      /* 如果删除当前的是 常用状态的 默认设置第一个为常用状态 */
      if (item2.isCommon === true) {
        this.ruleForm.orderArr[index].contactInformation[0].isCommon = true;
      }
    },
    // 联系方式 设为常用
    handleOrderCommon(item2, index2, index) {
      let arr = this.ruleForm.orderArr[index].contactInformation.map((v, k) => {
        v.isCommon = index2 === k ? true : false;
        return v;
      });
      this.ruleForm.orderArr[index].contactInformation = arr;
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

    //删除66666666666
    handleOrderListDelete(item, index) {
      this.ruleForm.orderArr.splice(index, 1);
    },
    // 其他信息 新增
    handleOrderAdd(item, index) {
      // 校验
      // 校验 数据
      let verifyArr = [
        `orderArr[${index}].refCustomName`,
        `orderArr[${index}].relationship`
      ];
      // 增加 联系方式手机号 校验数据
      item.contactInformation.map((v, k) => {
        verifyArr.push(`orderArr[${index}].contactInformation[${k}].phone`);
      });
      let verifySuccessLength = 0;

      if (
        item.refCustomName === "" &&
        item.relationship === "" &&
        item.contactInformation.length === 0
      ) {
        this.$message.error("其他信息不能为空");
      } else {
        // 循环校验
        verifyArr.map((v, k) => {
          this.$refs.ruleForm.validateField(v, valid => {
            if (!valid) {
              verifySuccessLength++;
            }
          });
        });
      }
      // 如果没有通过 退出
      if (verifySuccessLength !== verifyArr.length) {
        return;
      }
      // 收起当前
      this.ruleForm.orderArr[index].isOpen = false;
      let orderDefault = {
        // 增加key 解决校验问题
        key: Math.random(),
        // 当前是否展开
        isOpen: true,
        // 当前是否选中
        active: false,
        // 关联客户
        refCustomName: "",
        // 联系方式
        contactInformation: [], // ??
        // 与主客户关系
        relationship: ""
      };
      this.ruleForm.orderArr.push(orderDefault);
      this.handleOrderMouseleave(item, index);
    },

    // 其他信息 删除
    handleOrderDelete(item, index) {
      this.ruleForm.orderArr.splice(index, 1);
    },
    // 其他信息 移入
    handleOrderMouseenter(item, index) {
      this.ruleForm.orderArr[index].active = true;
    },
    // 其他信息 移出
    handleOrderMouseleave(item, index) {
      this.ruleForm.orderArr[index].active = false;
    },
    // 客户标签 select change
    handleCustomerSelectChange(val) {
      // 当前选中的数据
      let arr = [];
      this.ruleForm.tabValue.map((v, k) => {
        this.ruleForm.tabOptions.map((v1, k1) => {
          if (v === v1.itemValue) {
            arr.push({
              itemValue: v1.itemValue,
              id: v1.id,
              itemCode: v1.itemCode
            });
          }
        });
      });
      // 去重
      let allArr = [];
      this.ruleForm.tab.map((v, k) => {
        if (!v.id) {
          allArr.push(v);
        }
      });
      allArr = allArr.concat(arr);
      let newArr = [];
      let obj = {};
      allArr.map((v, k) => {
        if (!obj[`${v.labelName}${v.id}`]) {
          newArr.push(v);
          obj[`${v.labelName}${v.id}`] = true;
        }
      });
      this.ruleForm.tab = newArr;
    },
    // 客户标签 add
    handleCustomerLabelAdd() {
      let val = this.ruleForm.customerLabelInputValue;
      if (val) {
        this.ruleForm.customerLabelInputValue = "";
        this.ruleForm.customerLabelInputVisible = false;
        let len = this.ruleForm.tab.filter((v, k) => {
          return v.itemValue === val;
        }).length;
        len === 0 && this.ruleForm.tab.push({ itemValue: val });
      }
      //itemValue
    },
    // 客户标签 delete
    handleCustomerLabelDelete(item, index) {
      this.ruleForm.tab.splice(index, 1);
      /* 删除 客户标签select 选中的数据 */
      if (item.id) {
        let arr = [];
        this.ruleForm.tabValue.map((v, k) => {
          if (item.id !== v) {
            arr.push(v);
          }
        });
        this.ruleForm.tabValue = arr;
      }
    }
    /* ---------------------其他信息 相关逻辑----------------------------- */
  }
};
</script>

<style lang="scss">
.customer-add-or-edit {
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
    // margin-left: 30px!important;
    .el-form-item__label {
      width: 74px !important;
    }
    .el-col-12 {
      .el-form-item__label {
        width: 112px !important;
      }
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
      .title {
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
      right: 30px;
    }
  }
}

.span_11 {
  display: inline;
  margin-left: 10px;
}
.mr-5 {
  margin-top: 10px;
  font-size: 14px !important;
  right: 150px !important;
}
.customer-add-or-edit .m-item-form .el-icon-circle-plus-outline {
  position: static !important;
}

.el-form-item .mobile-item .is-success {
  margin-left: 30px !important;
}
.span_2 {
  position: relative;
  left: 33px;
  top: 5px;
  padding-right: 20px;
  margin-right: 12px;
}
.placeholder input::-webkit-input-placeholder {
  color: #404040;
}

.placeholder input::-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #404040;
}

.placeholder input:-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #404040;
}

.placeholder input:-ms-input-placeholder {
  color: #404040;
}

#mainPage .telAdd .el-form-item .tel_1 {
  margin: none;
  line-height: 50px;
}
#mainPage .tabtab {
  width: 480px;
  .el-select {
    display: inline-block;
    position: relative;
    
  }
  .el-input {
    max-width: 480px;
  }
}

#mainPage .tabtab .el-input input {
  max-width: 467px;
  width: 500px;
}
.cusotomMark {
  .el-form-item__content {
    position: static !important;
  }
}
.telAdd {
  .el-form-item .tel_1 {
    height: 28px;
    margin-bottom: none !important;
  }
}
#labelcss {
  .el-select {
    display: inline-block;
    position: relative;
    .el-select__tags {
      position: absolute;
      line-height: normal;
      white-space: normal;
      z-index: 1;

      transform: translateY(-18%);
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .el-select__input {
        border: none;
        outline: none;
        padding: 0;
        margin-left: 15px;
        color: #666;
        font-size: 14px;
        appearance: none;
        height: 28px;
        background-color: transparent;
      }
    }
    .el-input {
      position: relative;
      font-size: 14px;
      display: inline-block;
      width: 100%;
    }
  }
  .el-select > .el-input {
    display: block;
  }
}

#mainPage .el-cascader {
  height: 28px !important;
}
</style>