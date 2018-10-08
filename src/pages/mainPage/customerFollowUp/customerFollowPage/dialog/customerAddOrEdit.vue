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
                <el-col :span="12">
                  <el-form-item 
                    label="姓名：" 
                    prop="name"
                    :rules="rules.nameLabel"
                  >
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                </el-col>

                <!-- 性别 -->
                <el-col :span="12">
                  <el-form-item 
                    label="性别：" 
                    prop="sex"
                    :rules="rules.sexLabel"
                  >
                    <el-select clearable v-model="ruleForm.sex" placeholder="请选择">
                      <el-option label="男" value="男" ></el-option>
                      <el-option label="女" value="女" ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              
              <el-row>
                <!-- 意向等级 -->
                <el-col :span="12">
                  <el-form-item 
                    label="意向等级：" 
                    prop="customLevel"
                    :rules="rules.levelLabel"
                  >
                    <el-select @change="handleCustomLevelChange" clearable v-model="ruleForm.customLevel" placeholder="请选择">
                      <el-option label="A" value="A" ></el-option>
                      <el-option label="B" value="B" ></el-option>
                      <el-option label="C" value="C" ></el-option>
                      <el-option label="D" value="D" ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 是否到访 -->
                <el-col :span="12">
                  <el-form-item 
                    label="是否到访：" 
                    prop="visitFlag"
                    :rules="rules.isVisitLabel"
                  >
                    <el-select clearable v-model="ruleForm.visitFlag" placeholder="请选择">
                      <el-option label="已到访" value="是" ></el-option>
                      <el-option label="未到访" value="否" ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <!-- 年龄段 -->
                <el-col :span="12">
                  <el-form-item 
                    label="年龄段：" 
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
                <el-col :span="12">
                  <el-form-item 
                    label="生日：" 
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
                <el-col :span="12">
                  <el-form-item 
                    label="是否绿城业主:" 
                    prop="isOwner"
                    :rules="rules.isOwnerLabel"
                  >
                    <el-select clearable v-model="ruleForm.isOwner" placeholder="请选择">
                      <el-option label="是" value="是" ></el-option>
                      <el-option label="否" value="否" ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 获知途径 -->
                <el-col :span="12">
                  <el-form-item 
                    label="获知途径：" 
                    prop="source"
                    :rules="rules.getwayLabel"
                  >
                    <el-cascader
                      class="placeholder"
                      :options="accessToKnowledgeOptions"
                      v-model="ruleForm.source"
                      :placeholder="ruleForm.sourceText"
                      :clearable="true"
                      @active-item-change="handleSourceChange"
                      @change="celectSourceChange"
                    >
                    </el-cascader>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <!-- 工作区域 -->
                <el-col :span="12">
                  <el-form-item 
                    label="工作区域：" 
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
                <el-col :span="12">
                  <el-form-item 
                    label="现居住情况：" 
                    prop="dwellInfo"
                    :rules="rules.infomationLabel"
                  >
                    <el-select clearable v-model="ruleForm.dwellInfo" placeholder="请选择">
                      <el-option label="出租屋" value="出租屋" ></el-option>
                      <el-option label="自建房" value="自建房" ></el-option>
                      <el-option label="商品房" value="商品房" ></el-option>
                      <el-option label="单位宿舍" value="单位宿舍" ></el-option>
                      <el-option label="其他" value="其他" ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <!-- 居住区域 2222222222222-->
                <el-col :span="12">
                  <el-form-item 
                    label="居住区域：" 
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
                <el-col :span="12">
                  <el-form-item 
                    label="现居小区：" 
                    prop="dwellGarden"
                    :rules="rules.dwellEstateLabel"
                  >
                    <el-input v-model="ruleForm.dwellGarden"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <!-- 现居面积 -->
                <el-col :span="12">
                  <el-form-item         
                    label="现居面积(m²)：" 
                    prop="dwellArea"
                    :rules="rules.dwellInAreaLabel"
                  >
                    <el-input v-model="ruleForm.dwellArea"></el-input>
                  </el-form-item>
                </el-col>

                <!-- 通讯地址 -->
                <el-col :span="12">
                  <el-form-item 
                    label="通讯地址：" 
                    prop="addr"
                    :rules="rules.comAddressLabel"
                  >
                    <el-input v-model="ruleForm.addr"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <!-- 证件类型 -->
                <el-col :span="12">
                  <el-form-item 
                    label="证件类型：" 
                    prop="certificateType"
                    :rules="rules.certificateTypeLabel"
                  >
                    <el-select clearable   value-key="id" v-model="ruleForm.certificateType" placeholder="请选择" >
                      <el-option
                      v-for="(item) in labeLValue.customInfoLabel.certificateTypeLabel.labelDictList"
                      :key="item.id"                    
                      :label="item.dictName" 
                      :value="item"                       
                      >
                      </el-option>                      
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 证件号码 -->
                <el-col :span="12">
                  <el-form-item 
                    label="证件号码：" 
                    prop="certificateNo"
                    :rules="rules.certificateNumberLabel"
                  >
                    <el-input v-model="ruleForm.certificateNo"></el-input>
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
                                :label="index === 0 ? '手机号码:' : ' '" 
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
                          :rules="rules.telLabel" 
                          >
                          <el-input style="width:auto;" placeholder="请输入手机号码"  v-model="item.phone"></el-input>
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
                  <div class="m-item-form">                 
                    <el-row style="height:20px">
                        <el-col :span="24">
                          <el-form-item
                            label-width="66px"
                            class="tel_1"
                            :label="'                        '"                       
                            :rules="rules.telLabel" 
                          >
                          <span v-if="ruleForm.tel.length<=0 || ruleForm.tel === []">手机号码：</span>
                            <span v-if="ruleForm.add">
                              <el-input style="width:auto;" placeholder="请输入手机号码" v-model="ruleForm.telPhone"></el-input>
                              <span 
                              @click="saveleMobileAdd_1"
                              class="inline-block va-middle color-green cursor mr_78"
                              >保存</span> 
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
                      <el-col :span="5">
                        <span>需求业态：{{item.formatName}}</span>
                      </el-col>
                      <el-col :span="5">
                        <span>需求面积：
                          <template v-if="item.needArea">
                            {{item.needArea}}m<sup class="m-sup">2</sup>
                          </template>
                        </span>
                      </el-col>
                      <el-col :span="5">
                        <span>居室：{{item.bedroomType.join(' / ')}}</span>
                      </el-col>
                      <el-col :span="5">
                        <span>总价预算/万元：
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
                      <!-- 需求业态 -->
                      <el-col :span="8">
                        <el-form-item 
                          label="需求业态："
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
                      <el-col :span="8">
                        <el-form-item 
                          label="需求面积(m²)：" 
                          :prop="`purchaseArr[${index}].needArea`"
                          :rules="rules.needAreaLabel"
                        >
                          <el-input v-model="item.needArea"></el-input>
                        </el-form-item>
                      </el-col>

                      <!-- 总价预算 -->
                      <el-col :span="8">
                        <el-form-item 
                          label="总价预算/万元：" 
                          :prop="`purchaseArr[${index}].totalBdget`"
                          :rules="rules.totalBudgetLabel"
                        >
                          <el-input v-model="item.totalBdget"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row>
                      <!-- 需求套数 -->
                      <el-col :span="8">
                        <el-form-item 
                          label="需求套数："
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

                      <!-- 意向户号 -->
                      <el-col :span="8">
                        <el-form-item 
                          label="意向户号：" 
                          :prop="`purchaseArr[${index}].intentionNo`"
                          :rules="rules.intentionNoLabel"
                        >
                          <customerIntentionDialog :placeholder="item.intentionNoPlaceholder" v-model="item.intentionNo" />
                        </el-form-item>
                      </el-col>

                      <!-- 竞品楼盘 -->
                      <el-col :span="8">
                        <el-form-item 
                          label="竞品楼盘：" 
                          :prop="`purchaseArr[${index}].houseProject`"
                          :rules="rules.houseProjectLabel"
                        >
                          <el-input v-model="item.houseProject"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row>
                      <!-- 车位需求 -->
                      <el-col :span="8">
                        <el-form-item 
                          label="车位需求：" 
                          :prop="`purchaseArr[${index}].carFlag`"
                          :rules="rules.carFlagLabel"
                        >
                          <el-radio-group v-model="item.carFlag">
                          <el-radio  label="1">有</el-radio>
                          <el-radio  label="0">无</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-col>

                      <!-- 居室 -->
                      <el-col :span="8">
                        <el-form-item 
                          label="居室："
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
                      <el-col :span="8">
                        <el-form-item 
                          label="朝向："
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
                      <el-col :span="8">
                        <el-form-item 
                          label="关注要素：" 
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
                      <el-col :span="8">
                        <el-form-item 
                          label="主要抗性：" 
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
                      <!-- 购房主要用途 -->
                      <el-col :span="12">
                        <el-form-item 
                          label="购房主要用途:" 
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
                      <!-- 操作 -->
                      <div class="fr mt-10">
                        <!-- +加 -->
                        <i 
                          v-if="index === ruleForm.purchaseArr.length - 1"
                          class="color-green el-icon-circle-plus-outline cursor ft-20"
                          @mouseenter="handleHouseListMouseenter(item,index)"
                          @mouseleave="handleHouseListMouseleave(item,index)"
                          @click="handleHouseListAdd(item,index)"
                        >
                        </i>
                        <!-- -减 -->
                        <i 
                          v-if="ruleForm.purchaseArr.length > 1"
                          class="color-green el-icon-remove-outline cursor ft-20 mr-20"
                          @mouseenter="handleHouseListMouseenter(item,index)"
                          @mouseleave="handleHouseListMouseleave(item,index)"
                          @click="handleHouseListDelete(item,index)"
                        >
                        </i>
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
                <el-col :span="8">
                  <el-form-item 
                    label="付款方式：" 
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
                <el-col :span="8">
                  <el-form-item 
                    label="现有房产：" 
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
                <el-col :span="8">
                  <el-form-item 
                    label="现有贷款：" 
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
                <el-col :span="8">
                  <el-form-item 
                    label="购房名额：" 
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
                <el-col :span="8">
                  <el-form-item 
                    label="家庭构成：" 
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
                <el-col :span="8">
                  <el-form-item 
                    label="子女人数：" 
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
                <el-col :span="8">
                  <el-form-item 
                    label="家庭年收入：" 
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
                <el-col :span="8">
                  <el-form-item 
                    label="工作行业：" 
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
                <el-col :span="8">
                  <el-form-item 
                    label="工作职务：" 
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
                <el-col :span="8">
                  <el-form-item 
                    label="学历：" 
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
                <el-col :span="8">
                  <el-form-item 
                    label="出行方式：" 
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
                <el-col :span="8">
                  <el-form-item 
                    label="汽车品牌：" 
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
                      <el-col class="ml-10" :span="6">
                        关联客户：{{item.refCustomName}}
                      </el-col>
                      <el-col :span="6">
                        与主客户关系：{{item.relationship}}
                      </el-col>
                      <el-col :span="6">
                        <span 
                          class="ellipsis"
                          :style="{
                            display : 'inline-block',
                            width : '100%',
                          }"
                        >
                          联系方式：
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
                  <div :key="item.key" :class="{'border-green' : item.active}" class="order-show-box">
                    <el-row>
                      <!-- 关联客户 -->
                      <el-col :span="8">
                        <el-form-item 
                          label="关联客户："
                          :prop="`orderArr[${index}].refCustomName`"
                          :rules="rules.customContactLabel"
                        >
                          <el-input v-model="item.refCustomName" />
                        </el-form-item>
                      </el-col>

                      <!-- 与主客户关系 -->
                      <el-col :span="8">
                        <el-form-item 
                          label="与主客户关系:"
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
                          @mouseenter="handleOrderMouseenter(item,index)"
                          @mouseleave="handleOrderMouseleave(item,index)"
                          @click="handleOrderListDelete(item,index)"
                        >
                        </i>
                      </div>
                    </el-row>

                    <el-row>
                      
                      <!-- 循环 联系方式 -->
                      <el-col class="span_2" :span="2">联系方式:</el-col>
                      <template v-for="(item2,index2) in item.contactInformation" >
                        <div :key="item2.key">
                          <el-col :span="7">
                        <template v-if="item2.isphone === false">
                          <div :key="item2.key">  
                            <el-col :span="24" style="margin-left:20px">
                            <el-form-item 
                                class="mobile-item"
                                
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
                                <el-col :span="24" style="margin-left:20px">
                                  <el-form-item 
                                  label-width="0px"                                
                                  :prop="`orderArr[${index}].contactInformation[${index2}].phone`"
                                  :rules="rules.contactMethodLabel" 
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
                         <div >                                  
                              <el-form-item
                                label-width="66px"
                                class="tel_1"
                                :label="'                        '"                       
                                :rules="rules.contactMethodLabel" 
                              >
                              
                                <span v-if="ruleForm.telAdd">
                                  <el-input style="width:auto;" placeholder="请输入手机号码" v-model="ruleForm.telPhone_1"></el-input>
                                  <span 
                                  @click="saveleMobileAdd_1_2(index)"
                                  class="inline-block va-middle color-green cursor mr_78"
                                  >保存</span> 
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
                          @mouseenter="handleOrderMouseenter(item,index)"
                          @mouseleave="handleOrderMouseleave(item,index)"
                          @click="handleOrderHide(item,index)"
                          class="order-stop color-green el-icon-arrow-up cursor ft-20 mr-10"
                        >
                        </i>
                        <!-- 增加 一条关联客户 -->
                        <i 
                          v-if="index === ruleForm.orderArr.length - 1"
                          class="order-add va-middle cursor color-green el-icon-circle-plus-outline ft-20"
                          @mouseenter="handleOrderMouseenter(item,index)"
                          @mouseleave="handleOrderMouseleave(item,index)"
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
              <el-col :span="8">
                <el-form-item 
                  label="兴趣爱好：" 
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

            <!-- 客户标签 -->
            <el-row>
              <div>
                <el-form-item 
                  label="客户标签：" 
                  :prop="`tab`"
                  :rules="rules.tagLabel"
                >
                  <div>
                    <el-select @change="handleCustomerSelectChange" collapse-tags multiple clearable v-model="ruleForm.tabValue" placeholder="请选择">
                      <el-option
                        v-for="(item,index) in labeLValue.customElseLabel.tagLabel.labelDictList"
                        :key="index"
                        :label="item.dictName"
                        :value="item.dictName"
                      >
                      </el-option>
                    </el-select>
                    <!-- 新增 客户标签 -->
                    <el-input
                      v-if="ruleForm.customerLabelInputVisible"
                      v-model="ruleForm.customerLabelInputValue"
                      ref="saveTagInput"
                      @keyup.enter.native="handleCustomerLabelAdd"
                      @blur="handleCustomerLabelAdd"
                      style="width:70px;"
                    >
                    </el-input>
                    <el-button 
                      v-else 
                      @click="ruleForm.customerLabelInputVisible = true" 
                      type="text" 
                    >
                      新增标签
                    </el-button>
                  </div>

                  <!-- 标签显示 tag -->
                  <div>
                    <el-tag
                      class="mr-10 mt-10"
                      type="success"
                      :key="item.id"
                      v-for="(item,index) in ruleForm.tab"
                      closable
                      :disable-transitions="false"
                      @close="handleCustomerLabelDelete(item,index)">
                      {{item.labelName}}
                    </el-tag>
                  </div>
                </el-form-item>
              </div>
            </el-row>

            <!-- 备注 -->
            <el-row>
              <el-form-item 
                label="备注：" 
                :prop="`remark`"
                :rules="rules.remark"
              >
                <el-input style="width:467px;" type="textarea" v-model="ruleForm.remark"></el-input>
              </el-form-item>
            </el-row>
          </div>
          <!-- 清除浮动 -->
          <div class="clear"></div>
          <!-- 自定义 标签数据 -->
          <div class="of-hidden mb-30">
            <template v-for="(item,index) in ruleForm.customerArr">
              <!-- 每三个 增加 清除浮动 -->
              <div 
                v-if="index % 3 === 0 || item.customerMype === '单选加补充说明'"
                :key="item.id" 
                class="clear"
              >
              </div>
              <el-col
                v-if="false"
                :span="item.customerMype === '单选加补充说明' ? 24 : 8" 
                :key="item.id">
                <el-form-item 
                  :label="item.customerMame + ':'"
                  :prop="`customerArr[${index}].customerMalue`"
                  :rules="rules[item.customerMame]"
                >
                  <!-- 根据不同类型 展示不同 表单元素 -->
                  <!-- 单选 -->
                  <template v-if="item.customerMype === '单选'">
                    <el-select clearable v-model="item.customerMalue" placeholder="请选择">
                      <el-option 
                        :key="options.id" 
                        v-for="(options) in item.customerMata"
                        :label="options.label"
                        :value="options.value"
                      >
                      </el-option>
                    </el-select>
                  </template>

                  <!-- 多选 -->
                  <template v-else-if="item.customerMype === '多选'">
                    <el-select collapse-tags multiple clearable v-model="item.customerMalue" placeholder="请选择">
                      <el-option 
                        :key="options.id" 
                        v-for="(options) in item.customerMata"
                        :label="options.label"
                        :value="options.value"
                      >
                      </el-option>
                    </el-select>
                  </template>

                  <!-- 文本 -->
                  <template v-else-if="item.customerMype === '文本'">
                    <el-input v-model="item.customerMalue" />
                  </template>

                  <!-- 数字 -->
                  <template v-else-if="item.customerMype === '数字'">
                    <el-input type="number" v-model="item.customerMalue" />
                  </template>

                  <!-- 日期 -->
                  <template v-else-if="item.customerMype === '日期'">
                    <el-date-picker
                      v-model="item.customerMalue"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </template>

                  <!-- 单选加补充说明 -->
                  <template v-else-if="item.customerMype === '单选加补充说明'">
                    <el-select clearable v-model="item.customerMalue" placeholder="请选择">
                      <el-option 
                        :key="options.id" 
                        v-for="(options) in item.customerMata"
                        :label="options.label"
                        :value="options.value"
                      >
                      </el-option>
                    </el-select>
                    <el-form-item 
                      v-if="item.customerMalue === '其他'"
                      label=" "
                      class="order-item" 
                      :prop="`customerArr[${index}].order`"
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
  </div>
</template>

<script>
  // <customerIntentionDialog style="height:300px;" placeholder="二级-1" v-model="aaaaa" />
  // 获取请求接口
  import {
    getCityListForCascader,//城市树
    getCustomerDetails,//获取页面详细信息
    getLearnWayOne,//获取途径
    uploadCustomerDetails,//上传客户详细信息
    getTagListForCascader,//获取客户标签
    getCheckLevel,//获取校验等级以及客户标签
    upDataCostom,//更新客户详情
    determineCustomer//判客
  } from '@/api/pages/mainPage/customerFollowUp'

  // 单选_其他 组件
  import otherFrames from '@/components/otherFrames'
  // 意向户号 组件
  import customerIntentionDialog from './dialog/customerIntentionDialog.vue'
  
  export default {
    components : {
      otherFrames,
      customerIntentionDialog,      
    },
    data() {

       return {

        informationList:{},
        learnWay:'GETWAY',
        ruleForm : {
          /* -------------------------基本信息------------------------- */
          //客户id
          id:'',
          // 姓名
          name : '',
          // 性别
          sex : '',
          // 年龄段
          ageSection : '',
          // 生日
          birthday : '',
          // 是否到访
          visitFlag : '',
          // 意向等级
          customLevel : '',
          // 是否绿城业主
          isOwner : '',
          // 获知途径
          source : [],
          //获知途径文本显示
          sourceText:'',
          // 工作区域id
          workInfo : '',
          //工作区域名称
          workInfoName:[],
          //工作区域文本显示
          workInfoText:'',
          // 现居住情况
          dwellInfo : '',
          // 居住区域
          dwellRegion : '',
          //居住区域名称
          dwellRegionName:[],
          //居住小区文本显示22222222222
          dwellRegionText:'',
          // 现居小区
          dwellGarden : '',
          // 现居面积
          dwellArea : '',
          // 通讯地址
          addr : '',
          // 证件类型
          certificateType : '',
          //证件类型code
          getCertificateType:'',
          // 证件号码
          certificateNo : '',
          //手机号码
          telString :'',
          // 手机号码 list
          tel : [
          ],
          //客户元素列表
          customItemList:[],
          //项目名称
          projectOptions:[],

          /* -------------------------购房需求------------------------- */
          // 购房需求 list
          purchaseArr : [
            {
              // 增加key 解决校验问题
              key : Math.random(),
              // 当前是否展开
              isOpen : true,
              // 购房主要用途
              mainUse : '',
              // 购房主要用途_其他文本框
              mainUseOrder : '',
              // 需求业态
              formatName : '',
              //业态编码
              formatCode:'',
              //备注
              remark:'',
              //商机id
              nicheId:'',
              // 居室
              bedroomType : [],
              // 朝向
              orientation : [],
              // 需求面积
              needArea : '',
              // 总价预算
              totalBdget : '',
              //需求id
              needId:null,
              // 需求套数
              needCount : [],
              // 意向户号
              intentionNo : [],
              // 意向户号文本显示
              intentionNoPlaceholder : '',
              // 竞品楼盘
              houseProject : '',
              //竞品楼盘编码
              houseProjectCode:'',
              // 车位需求
              carFlag : '',
              // 关注要素
              focus : [],
              // 主要抗性
              drag : [],
              //过度数组
              customItemList:[]
            }
          ],

          /* -------------------------购买力------------------------- */
          // 付款方式
          payType : '',
          //商机id
          nicheId:'',
          // 现有房产
          existingProperty : '',
          // 现有贷款
          existingLoan : '',
          // 购房名额
          quotaFlag : '',
          // 家庭构成
          familyStructure : '',
          // 子女人数
          childrenNum : '',
          // 家庭年收入
          familyYearlyIncome : '',
          // 工作行业
          industry : '',
          // 工作职务
          duty : '',
          // 学历
          educational : '',
          // 出行方式
          outWay : '',
          // 汽车品牌
          carBrand : [],

          /* -------------------------其他信息------------------------- */
          /* 其他信息 list */
          orderArr : [
            {
              // 增加key 解决校验问题
              key : Math.random(),
              // 当前是否展开
              isOpen : true,
              // 当前是否选中
              active : false,
               //其他联系人id
              otherId:null,
                   
              // 关联客户
              refCustomName : '',
              // 联系方式
              contactInformation : [],  // ??
              // 与主客户关系
              relationship : '',
              //项目id
              projectId:'',

              //联系方式过度
              contactInformationArray:[]
            }
          ],
          // 兴趣爱好
          interest : [],
          // 客户标签
          tab : [],
          // 客户标签 select value
          tabValue : '',
          // 客户标签 select options
          tabOptions : [
            {label : '张三' , value : '张三id'},
            {label : '李四' , value : '李四id'},
          ],
          // 客户标签 输入框 值
          customerLabelInputValue : '',
          // 客户标签 输入框 显示影藏
          customerLabelInputVisible : false,
          // 备注
          remark : '',
          /* -------------------------自定义 标签数据------------------------- */
          customerArr : [],
          //判客表现内容
          content:'',
          //新增的手机号码
          telPhone:'',
          //判断手机号码是否出现
          add:false,
          //判断客户联系人的手机号码是否出现
          phoneAdd:false,
          //判断客户联系人的手机号码是否出现
          telPhonetel:false,
           //判断手机号码是否出现
          telAdd:false,
          //新增的其他联系人的手机号码
          telPhone_1:'',
          /*--------------------------------客户元素数据保存--------------------------*/
          //客户元素数组
          customItemList:[],
           //——元素id 
          elementId: null,
          //校验控制-1
          required_1:true,
          //校验控制-2
          required_2:true,
          //客户需求抗性等过度数组
          focusArr_2:[]
        },
        
        //---------------------------客户标签实例化----------------------------
        //标签值以及是否必填33333333333333
        labeLValue : {},

        // 初始化 所有需要校验的字段
        rules : {
          /* 基本信息 校验字段 */
          nameLabel : [{}],
          sexLabel : [{}],
          ageSectionLabel : [{}],
          birthdayLabel : [{}],
          isVisitLabel : [{}],
          levelLabel : [{}],
          isOwnerLabel : [{}],
          getwayLabel : [{}],
          workAreaLabel : [{}],
          infomationLabel : [{}],
          dwellAreaLabel : [{}],
          dwellEstateLabel : [{}],
          dwellInAreaLabel : [{}],
          comAddressLabel : [{}],
          certificateTypeLabel : [{}],
          certificateNumberLabel : [{}],
          telLabel : [{}],
          /* 购房需求 校验字段 */
          mainUseLabel : [{}],
          formatLabel : [{}],
          habitableLabel : [{}],
          orientationLabel : [{}],
          needAreaLabel : [{}],
          totalBudgetLabel : [{}],
          needCountLabel : [{}],
          intentionNoLabel : [{}],
          houseProjectLabel : [{}],
          carFlagLabel : [{}],
          focusLabel : [{}],
          dragLabel : [{}],
          /* 购买力 校验字段 */
          payTypeLabel : [{}],
          existingPropertyLabel : [{}],
          existingLoan : [{}],
          quotaLabel : [{}],
          familyLabel : [{}],
          childrenNumLabel : [{}],
          familyYearIncomeLabel : [{}],
          industryLabel : [{}],
          dutyLabel : [{}],
          educationalLabel : [{}],
          outwayLabel : [{}],
          carBrandLabel : [{}],
          /* 其他信息 校验字段 */
          customContactLabel : [{}],
          contactMethodLabel : [{}],
          relationshipLabel : [{}],
          interestLabel : [{}],
          tagLabel : [{}],
          remarkLabel : [{}],
          
        },
        // 保存后台返回的 所有校验规则
        ajaxRules : {},
        // 保存后台返回的 自定义标签数据
        initCustomer : [
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
            customerMype : '单选', // ??
            // 标签名称
            customerMame : '我是单选', // ??
            // 标签值
            customerMalue : '', // ??
            // 标签数据
            customerMata : [ // ??
              {label : '要想生活' , value : '要想生活'},
              {label : '过得去' , value : '过得去'},
              {label : '头上' , value : '头上'},
              {label : '就要' , value : '就要'},
              {label : '带点绿' , value : '带点绿'},
              {label : '其他' , value : '其他'}
            ],
          },
          // 多选
          {
            // 定义标签类型
            customerMype : '多选', // ??
            // 标签名称
            customerMame : '我是多选', // ??
            // 标签值
            customerMalue : '', // ??
            // 标签数据
            customerMata : [ // ??
              {label : '要想生活' , value : '要想生活'},
              {label : '过得去' , value : '过得去'},
              {label : '头上' , value : '头上'},
              {label : '就要' , value : '就要'},
              {label : '带点绿' , value : '带点绿'},
              {label : '其他' , value : '其他'}
            ],
          },
          // 文本
          {
            customerMype : '文本',
            customerMame : '我是文本', 
            customerMalue : '啦啦啦',
          },
          // 数字
          {
            customerMype : '数字',
            customerMame : '我是数字', 
            customerMalue : '1234',
          },
          // 日期
          {
            customerMype : '日期',
            customerMame : '我是日期', 
            customerMalue : '2012-12-13',
          },
          // 单选加补充说明
          {
            // 定义标签类型
            customerMype : '单选加补充说明', // ??
            // 标签名称
            customerMame : '单选加补充', // ??
            // 标签值
            customerMalue : '', // ??
            // 标签数据
            customerMata : [ // ??
              {label : '要想生活' , value : '要想生活'},
              {label : '过得去' , value : '过得去'},
              {label : '头上' , value : '头上'},
              {label : '就要' , value : '就要'},
              {label : '带点绿' , value : '带点绿'},
              {label : '其他' , value : '其他'}
            ],
          },
        ],

        // 城市tree 四级列表
        cityTree : [
          {label : '浙江省' , value : 'zjs' , children : [
            {label : '杭州市' , value : 'hzs'}
          ]}
        ],

        postCityName:[],//发送地址信息过度数组
        postSourceName:[],//发送获取途径信息过度数组
        postRegionName:[],//发送居住区域信息过度地址
        postWorkInfoName:[],//发送居住区域信息过度地址
        // 获知途径 options
        accessToKnowledgeOptions : [
          
        ],
        // 客户标签 options
        customerOptions : [
          {label : '客户a' , id : 'aa'},
          {label : '客户b' , id : 'bb'},
        ],

      }
    },
    mounted() {
      // 获取页面数据
      // 获取其他数据（城市树,获知途径，自定义标签）
      // 获取所有校验规则
      
      //获取客户标签
       this.initRules()
      // 设置校验逻辑
      this.initData().then(() => {
        return this.initOrderData();
      }).then(() => {
        return this.initRules();
      }).then(() => {
        return this.setRules_1();
      });
      
      this.getCityList()
      this.getLearnWay()

      getCityListForCascader()
        .then(res=>{
           ;
          if(res.status === 200){
            this.cityTree = res.data;
          }
        })

    },
    methods : {
      /* ---------------------页面初始化 数据处理----------------------------- */
    //删除手机号码
    deteleTel(index){
       let isCommon = this.ruleForm.tel[index].isCommon;
        this.ruleForm.tel.splice(index,1);
        // 如果当前删除的是 常用状态 
        if(isCommon === true){
          this.$nextTick(() => {
            this.$set(this.ruleForm.tel[0],'isCommon',true);
          });
        }
    },
    //删除其他联系人的手机号码
    deteleTel_1(index,index2){
        let isCommon = this.ruleForm.orderArr[index].contactInformation[index2].isCommon
        this.ruleForm.orderArr[index].contactInformation.splice(index2,1)
        if(isCommon === true){
          this.$nextTick(() => {
            this.$set(this.ruleForm.orderArr[index].contactInformation[0],'isCommon',true);
          });
        }
      
      
    },
    //编辑手机号码
    editTel(index){
      this.ruleForm.tel[index].istel = !this.ruleForm.tel[index].istel
    },

      //编辑其他联系人的手机号码
    editTel_1(index,index2){
         this.ruleForm.orderArr[index].contactInformation[index2].isphone = !this.ruleForm.orderArr[index].contactInformation[index2].isphone
      
    },


    //保存手机号码（判客）
    saveleMobileAdd(index){
        const h = this.$createElement;
            let data={
              projectId:this.ruleForm.projectId,
              mobile:this.ruleForm.tel[index].phone
            }          
          determineCustomer(data).then((res) => {               
              //this.ruleForm.projectOptiones=res.data
                                   
              if(res.data.flag){
                this.ruleForm.content = '该用户已存在'
              }else{
                this.ruleForm.content = '客户可添加'
              }
              this.$msgbox({
                  title: '客户是否存在',
                  message: h('p', null, [
                    h('span', null, `${this.ruleForm.content}`)
                  ]),
                  showCancelButton: true,
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  
                   beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                          instance.confirmButtonLoading = true;
                          instance.confirmButtonText = '执行中...';
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
                     this.ruleForm.tel[index].istel = !this.ruleForm.tel[index].istel
                });                                                             
        }); 

    },

  //编辑客户手机号码时进行判客
saveleMobileAdd_1_1(index,index2){
   
         const h = this.$createElement;
            let data={
              projectId:this.ruleForm.projectId,
              mobile:this.ruleForm.orderArr[index].contactInformation[index2].phone
            }          
          determineCustomer(data).then((res) => {               
              //this.ruleForm.projectOptiones=res.data
                                   
              if(res.data.flag){
                this.ruleForm.content = '该用户已存在'
              }else{
                this.ruleForm.content = '客户可添加'
              }
              this.$msgbox({
                  title: '客户是否存在',
                  message: h('p', null, [
                    h('span', null, `${this.ruleForm.content}`)
                  ]),
                  showCancelButton: true,
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  
                   beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                          instance.confirmButtonLoading = true;
                          instance.confirmButtonText = '执行中...';
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
                     this.ruleForm.orderArr[index].contactInformation[index2].isphone = !this.ruleForm.orderArr[index].contactInformation[index2].isphone
                });                                                             
        }); 
    
  },


    //新增客户电话号码并判客
    saveleMobileAdd_1(){
        const h = this.$createElement;
      
          let data={
            projectId:this.ruleForm.projectId,
            mobile:this.ruleForm.telPhone
          }          
          determineCustomer(data).then((res) => {               
              //this.ruleForm.projectOptiones=res.data
                                   
              if(res.data.flag){
                this.ruleForm.content = '该用户已存在'
              }else{
                this.ruleForm.content = '客户可添加'
              }
              this.$msgbox({
                  title: '客户是否存在',
                  message: h('p', null, [
                    h('span', null, `${this.ruleForm.content}`)
                  ]),
                  showCancelButton: true,
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  
                   beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                          instance.confirmButtonLoading = true;
                          instance.confirmButtonText = '执行中...';
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
                  this.ruleForm.tel.push({
                    key : Math.random(),
                    isCommon:false,
                    istel:false,
                    phone : this.ruleForm.telPhone,
                  });
                  //清空新增数据
                  this.ruleForm.telPhone = ''
                  this.ruleForm.add = false
              });                                                             
        }); 
    },

    //新增其他联系人号码并判客
    saveleMobileAdd_1_2(index){  
        const h = this.$createElement;     
          let data={
            projectId:this.ruleForm.projectId,
            mobile:this.ruleForm.telPhone_1
          }          
          determineCustomer(data).then((res) => {               
              //this.ruleForm.projectOptiones=res.data
                                   
              if(res.data.flag){
                this.ruleForm.content = '该用户已存在'
              }else{
                this.ruleForm.content = '客户可添加'
              }
              this.$msgbox({
                  title: '客户是否存在',
                  message: h('p', null, [
                    h('span', null, `${this.ruleForm.content}`)
                  ]),
                  showCancelButton: true,
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  
                   beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                          instance.confirmButtonLoading = true;
                          instance.confirmButtonText = '执行中...';
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
                  this.ruleForm.orderArr[index].contactInformation.push({
                    isCommon:false,
                    isphone:false,
                    phone : this.ruleForm.telPhone_1,
                  });
                  //清空新增数据
                  this.ruleForm.telPhone_1 = ''
                  this.ruleForm.telAdd = false
              });                                                             
        }); 
      
    },

    //获取证件类型code
      getCertificateType(type){   
        this.ruleForm.getCertificateType = type
      },

      // 获取页面数据
      initData() {
        return new Promise((resove,reject) => {
          this.$nextTick(() => {
            resove(
              console.log('获取页面信息')
            );
          });
        }).then(
          this.initTableList(),
        );
      },

      //获取页面信息//
      initTableList(){       
        let data={
          id:this.$route.query.id,
        }          
        getCustomerDetails(data).then((res) => {
          if(res.status === 200){
                
            //赋值 
             this.transferdata(res.data)
            }
          }); 
      },

      //获知途径一级
      getLearnWay(){
        let obj ={
          typeCode : this.learnWay
        }
        getLearnWayOne(obj).then((res) => {
          if(res.status === 200){

            for(let i = 0;i<res.data.length;i++){
              this.accessToKnowledgeOptions.push({label:res.data[i].itemValue,type:res.data[i].itemValue,value:res.data[i].itemCode,children:[]})
            }

          }
        })

      },

      //获取省份
      getCityList(){
           getCityListForCascader().then((res)=>{
            if(res.status === 200){
              this.cityTree=res.data
            }
          }) 

      },
            //获取省份


     /*********三级联动的菜单***********/

     //获知途径一级

     handleSourceChange(val){
        let length = this.accessToKnowledgeOptions.length;
        let index = 0;

        for(let i = 0; i < length; i++){
          if(this.accessToKnowledgeOptions[i].value == val[0]){
            index = i;
            break;
          }
        }

         if (!this.cityTree[index].children.length) {
           let arr = []
              let obj ={
              typeCode : val[0]
            }
              getLearnWayOne(obj).then((res) => {
                if(res.status === 200){               
                  for(let i=0;i<res.data.length;i++){
                    this.accessToKnowledgeOptions[index].children.push({label:res.data[i].itemValue,value:res.data[i].itemValue,})
                  }
                }
              })
          }
      },



      //赋值省市区
      celectSourceChange(val){
      },

      //地址选择三级联动菜单
      handleCityChange(val){
        let length = this.cityTree.length;
        let index = 0;

        //let cityIndex = 0;
        for(let i = 0; i < length; i++){
          if(this.cityTree[i].value == val[0]){
            index = i;
            break;
          }
        }

        if(val.length === 1){
          //发送请求加载
          if (!this.cityTree[index].children.length) {
            let provinceCode = {
              parentCode:val[0]
            };
            getCityListForCascader(provinceCode)
              .then(res=>{
                if(res.status === 200){
                  this.cityTree[index].children = res.data;
                }
              });
          }
        } else if(val.length === 2) {

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
            getCityListForCascader(cityCode)
              .then(res => {
                if (res.status === 200) {
                  city[cityIndex].children = res.data;
                }
              });
          }
        }
      },



      //赋值获知途径
      celectCityChange(val){
        let length = this.cityTree.length;
        let index = 0;

        for( let i = 0; i < length; i++ ){
          if( this.cityTree[i].value === val[0] ){
            index = i;
            this.postSourceName[0] = this.cityTree[i].label; //赋值省份            
            let city = this.cityTree[i].children;

            for(let j = 0; j < city.length; j++ ){
              if( city[j].value === val[1] ){

                this.postSourceName[1] = city[j].label; //赋值城市
                let ear = city[j].children;
                for(let k =0; k < ear.length ; k++ ){
                  if(ear[k].value === val[2] ){
                    this.postSourceName[2] = ear[k].label;//赋值区县
                    
                  }
                }
              }
            }
          }
        }
      },

       //赋值居住区域
      celectCityChange_Region(val){
        let length = this.cityTree.length;
        let index = 0;

        for( let i = 0; i < length; i++ ){
          if( this.cityTree[i].value === val[0] ){
            index = i;
            this.postRegionName[0] = this.cityTree[i].label; //赋值省份            
            let city = this.cityTree[i].children;

            for(let j = 0; j < city.length; j++ ){
              if( city[j].value === val[1] ){

                this.postRegionName[1] = city[j].label; //赋值城市
                let ear = city[j].children;
                for(let k =0; k < ear.length ; k++ ){
                  if(ear[k].value === val[2] ){
                    this.postRegionName[2] = ear[k].label;//赋值区县
                  }
                }
              }
            }
          }
        }
      },
      
      //赋值工作区域
      celectCityChange_workInfo(val){
        let length = this.cityTree.length;
        let index = 0;

        for( let i = 0; i < length; i++ ){
          if( this.cityTree[i].value === val[0] ){
            index = i;
            this.postWorkInfoName[0] = this.cityTree[i].label; //赋值省份            
            let city = this.cityTree[i].children;

            for(let j = 0; j < city.length; j++ ){
              if( city[j].value === val[1] ){

                this.postWorkInfoName[1] = city[j].label; //赋值城市
                let ear = city[j].children;
                for(let k =0; k < ear.length ; k++ ){
                  if(ear[k].value === val[2] ){
                    this.postWorkInfoName[2] = ear[k].label;//赋值区县
                  }
                }
              }
            }
          }
        }
      },

  //数据赋值到ruleForm
  transferdata(data){
         
/* -------------------------基本信息------------------------- */
        //客户id
        this.ruleForm.id = data.id
        //项目id
        this.ruleForm.projectId = data.projectId
         //项目id
        this.ruleForm.nicheId = data.nicheId
        //姓名
        this.ruleForm.name = data.name;
        //性别
        this.ruleForm.sex = data.sex;
        if(data.sex ==='1'){
          this.ruleForm.sex = '男'
        }else if(data.sex ==='0'){
          this.ruleForm.sex = '女'
        }
        //年龄段
        this.ruleForm.ageSection  = data.ageSection ;
        //生日
        this.ruleForm.birthday  = null?'':data.birthday ;
        // //是否到访
        this.ruleForm.visitFlag = data.isVisit;
        if(data.isVisit == "是"){
          this.ruleForm.visitFlag = '已到访'
        }else{
          this.ruleForm.visitFlag = '未到访'
        }

        // //意向等级
        this.ruleForm.customLevel = data.cstLevel;
        // //是否绿城业主
        if(data.isOwner == '1'){
          this.ruleForm.isOwner = '是'
        }else if(data.isOwner == '0'){
          this.ruleForm.isOwner  = '否';
        }
       
        
        // //获知途径
        
          this.ruleForm.source  = data.source.split('/')
          this.ruleForm.sourceText = this.ruleForm.source     
        // //工作区域
          //工作区域id
          this.ruleForm.dwellInfo = data.workInfo
          this.ruleForm.workInfoName  = data.workInfoName.split('/');
          this.postWorkInfoName = data.workInfoName.split('/');
          this.ruleForm.workInfoText = this.postWorkInfoName[0]+"/"+this.postWorkInfoName[1]+"/"+this.postWorkInfoName[2]

        
        //现居住情况
        this.ruleForm.dwellInfo   = data.dwellInfo;
        //居住区域2222222222222
          
          this.ruleForm.dwellRegion  = data.dwellRegion.split('/');        
          this.postRegionName  = data.dwellRegionName.split('/');
          this.ruleForm.dwellRegionText = this.postRegionName[0]+"/"+this.postRegionName[1]+"/"+this.postRegionName[2]
        //居住小区
        this.ruleForm.dwellGarden = data.dwellGarden;
        //居住面积
        this.ruleForm.dwellArea = data.dwellArea;
        //通讯地址
        this.ruleForm.addr = data.addr;
        //证件类型
        this.ruleForm.certificateType = data.certificateName;
        this.ruleForm.getCertificateType = data.certificateType
        //证件号码
        this.ruleForm.certificateNo = data.certificateNo ;
        //手机号码list
        for(let i=0;i<data.customContactMethodList.length;i++){
          this.ruleForm.tel.push({
            istel:false,
            phone:data.customContactMethodList[i].no,
            isCommon:data.customContactMethodList[i] == '1'?true:false,
            customId:data.customContactMethodList[i].customId,
            id:data.customContactMethodList[i].id
          }) 
        }

        //客户元素列表
        this.ruleForm.customItemList = data.customItemList


        /* -------------------------购房需求------------------------- */

    if(data.nicheNeedList.length>0){
        this.purchaseArr = []
        let purchaseArray = []
        let dragArray = []
        for(let i=0;i<data.nicheNeedList.length;i++){ 
          let focusArray =[]
          purchaseArray.push({
            // 增加key 解决校验问题
              key : Math.random(),
              // 当前是否展开
              isOpen : true,
              // 购房主要用途
              mainUse : data.nicheNeedList[i].mainUse,
              // 购房主要用途_其他文本框
              mainUse : data.nicheNeedList[i].mainUseText,
              // 需求业态
              formatName : data.nicheNeedList[i].formatName,
              // 居室
              bedroomType : data.nicheNeedList[i].bedroomType.split(','),
              // 朝向
              orientation :data.nicheNeedList[i].orientation.split(','),
              // 需求面积
              needArea : data.nicheNeedList[i].needArea,
              // 总价预算
              totalBdget :data.nicheNeedList[i].houseProject,
              // 需求套数
              needCount : data.nicheNeedList[i].needCount,
              // 意向户号
              //intentionNo :  data.nicheNeedList[i].intentionNo.split(','),
              // 意向户号文本显示
              intentionNoPlaceholder :data.nicheNeedList[i].intentionNoPlaceholder,
              // 竞品楼盘
              houseProject : data.nicheNeedList[i].houseProject,
              // 车位需求              
              carFlag : data.nicheNeedList[i].carFlag,           
              // 关注要素
              focus :focusArray,
              // 主要抗性
              drag : dragArray,
            
          })
            for(let j=0;j<data.nicheNeedList[i].customItemList.length;j++){
             
              //取出关注要素
              if(data.nicheNeedList[i].customItemList[j].itemType === 'FOCUS'){
                  focusArray.push(
                    data.nicheNeedList[i].customItemList[j].itemValue
                  )
              }
              //取出主要抗性
              if(data.nicheNeedList[i].customItemList[j].itemType === 'DRAG'){
                  dragArray.push(
                    data.nicheNeedList[i].customItemList[j].itemValue
                  )
              }

          }         
        }
      
      this.ruleForm.purchaseArr = purchaseArray
       
    }
        //关注要素（多选框）
       
/* -------------------------购买力------------------------- */
          //付款方式
          this.ruleForm.payType = data.payType;
          //现有房产
          this.ruleForm.existingProperty = data.existingProperty
          //现有贷款
          this.ruleForm.existingLoan = data.existingLoan
          //购房名额
          if(data.quotaFlag =='1' ){
            this.ruleForm.quotaFlag = '有'

          }else if(data.quotaFlag =='0'){
            this.ruleForm.quotaFlag = '无'
          }

          //家庭构成
          this.ruleForm.familyStructure = data.familyStructure
          //子女人数
          this.ruleForm.childrenNum = data.childrenNum
          //家庭年收入
          this.ruleForm.familyYearlyIncome = data.familyYearlyIncome
          //工作行业
          this.ruleForm.industry = data.industry
          //工作职务
          this.ruleForm.duty = data.duty
          //学历
          this.ruleForm.educational = data.educational
          //出行方式
          this.ruleForm.outWay = data.outWay
          //汽车品牌
          for(let i=0;i<data.customItemList.length;i++){
            if(data.customItemList[i].itemType ==='CAR_BRAND'){
              this.ruleForm.carBrand.push(
                data.customItemList[i].itemValue
              )
            }
          }
          

          
/* -------------------------其他信息------------------------- */

      
    if(data.customContactList !=null){ 
        this.orderArr = []     
        let orderArray = []
        for(let i=0;i<data.customContactList.length;i++){
          //过度数组
          let contactInformationArray_1 = []
           orderArray.push({            
              // 增加key 解决校验问题
              key : Math.random(),
              // 当前是否展开
              isOpen : true,
              // 当前是否选中
              active : false,
               //其他联系人id
              otherId:data.customContactList[i].id,                  
              // 关联客户
              refCustomName : data.customContactList[i].name,
              // 联系方式
              contactInformation :contactInformationArray_1,  // ??
              // 与主客户关系
              relationship :data.customContactList[i].relationship,
              //项目id
              projectId:data.customContactList[i].projectId,
              //商机id
              nicheId:data.customContactList[i].nicheId,
              //联系方式过度数组
              contactInformationArray:data.customContactList[i].contactMethodList
            
           })  
           if(data.customContactList[i].contactMethodList){
            for(let kk = 0;kk<data.customContactList[i].contactMethodList.length;kk++){
                  contactInformationArray_1.push({
                    key : Math.random(),
                    // 联系方式 手机号
                    isphone:false,
                    phone : data.customContactList[i].contactMethodList[kk].no,
                    //其他联系人id:
                    otherId:data.customContactList[i].contactMethodList[kk].id,
                    // 是否常用 
                    isCommon :data.customContactList[i].contactMethodList[kk].isMain?1:0,
                    //备注
                    remark:data.customContactList[i].contactMethodList[kk].remark
                  })
            }
           }              
        }
        //客户需求
        this.ruleForm.orderArr = orderArray
    }
        //兴趣爱好
        if(data.interest){
          this.ruleForm.interest = data.interest.split(',')
        }
        
        //客户标签
        this.ruleForm.tab = data.tab
        /*-----------------------------需求数组--------------------------*/

        this.ruleForm.customItemList = data.customItemList


    //}      
  },

       /* ---------------------获取客户标签----------------------------- */

      // 获取其他数据
      initOrderData() {
        return new Promise((resove,reject) => {
          this.$nextTick(() => {
            resove();
          });
        });
      },
      // 获取所有校验规则
      initRules() {
        return new Promise((resove,reject) => {
          this.$nextTick(() => {
            resove();
          });
        }).then(()=>{         
           let data={
            data:"customInfo,customNeed,customPurchasingPower,customElse",
           }          
        getCheckLevel(data).then((res) => {
          if(res.status === 200){
              let labeLValueStr =  JSON.stringify(res.data)
              this.labeLValue = JSON.parse(labeLValueStr)
              this.setRules_1(res.data)
            }
          }); 
        });
      },

      // 处理页面 校验逻辑
      setRules(data) {
        // 区分校验类型 
        // blur 校验 ： 针对 文本框
        let obj1 = {
          nameLabel  : '姓名',
          dwellGarden : '现居小区',
          dwellArea : '现居面积',
          comAddressLabel : '通讯地址',
          certificateNumberLabel  : '证件号码',
          telLabel  : '手机号码',
          needArea : '需求面积',
          totalBudgetLabel : '总价预算',
          houseProjectLabel  : '竞品楼盘',
          customContactLabel : '关联客户',
          contactInformation : '联系方式',
          remark : '备注',
        };
        // change 校验 ： 针对 单选框，时间
        let obj2 = {
          sexLabel  : '性别',
          levelLabel  : '意向等级',
          isVisitLabel  : '是否到访',
          ageSectionLabel  : '年龄段',
          birthdayLabel  : '生日',
          isOwnerLabel  : '是否绿城业主',
          getwayLabel  : '获知途径',
          workAreaLabel  : '工作区域',
          infomationLabel : '现居住情况',
          dwellAreaLabel  : '居住区域',
          certificateTypeLabel : '证件类型',
          dwellInAreaLabel:'现居面积',
          formatLabel : '需求业态',
          carFlagLabel  : '车位需求',
          mainUseLabel : '购房主要用途',
          payTypeLabel : '付款方式',
          existingPropertyLabel : '现有房产',
          existingLoan : '现有贷款',
          quotaLabel : '购房名额',
          familyLabel  : '家庭构成',
          childrenNumLabel  : '子女人数',
          familyYearIncomeLabel : '家庭年收入',
          industryLabel  : '工作行业',
          dutyLabel : '工作职务',
          educationalLabel : '学历',
          outwayLabel  : '出行方式',
          relationshipLabel : '与主客户关系',
          needCountLabel : '需求套数',
          contactMethodLabel :'联系方式'
        };
        // change 校验 ： 针对 多选框 树
        let obj3 = {
          intentionNoLabel : '意向户号',
          habitableLabel : '居室',
          orientationLabel : '朝向',
          focusLabel  : '关注要素',
          drag : '主要抗性',         
          carBrandLabel  : '汽车品牌',
          interestLabel  : '兴趣爱好',
          tagLabel : '客户标签标签'
        };
        
        /*-------------------自定义校验规则------------------*/
        //this.labeLValue
        

        // 设置 校验规则
        for(let key in this.rules) {
          let rule = [];
          let required = this.ajaxRules[key] ? true : false;
          if(obj1[key]){
            rule = [{required : required , message : `请输入${obj1[key]}` , trigger : 'blur'}];
          }else if(obj2[key]){
            rule = [{required : required , message : `请选择${obj2[key]}` , trigger : 'change'}];
          }else if(obj3[key]){
            rule = [{type : 'array' , required : required , message : `请选择${obj3[key]}` , trigger : 'change'}];
          }
          // 增加特殊校验
          // 手机号码
          if(key === 'telRules'){
            rule.push({
              pattern : /^[1][3,4,5,7,8][0-9]{9}$/,
              message : '手机号格式输入有误',
              trigger : 'blur',
            });
          // 联系方式
          }else if(key === 'contactInformation'){
            rule.push({
              pattern : /^[1][3,4,5,7,8][0-9]{9}$/,
              message : '联系方式格式输入有误',
              trigger : 'blur',
            });
          // 客户标签
          }else if(key === 'needArea'){
            rule.push({
              pattern : /^([1-9]\d*|[0]{1,1})$/,
              message : '面积格式输入有误',
              trigger : 'blur',
            });
          // 需求面积
          
          }else if(key === 'totalBdget'){
            rule.push({
              pattern : /^([1-9]\d*|[0]{1,1})$/,
              message : '预算格式输入有误',
              trigger : 'blur',
            });
          // 总价预算
          
          }else if(key === 'tab'){
            rule.push({
              type : 'array' , 
              required : required ,
              message : `请选择客户标签` ,
            });
          }

          this.rules[key] = rule
        }

        // 设置 自定义标签校验规则 (先设置 规则 ， 再设置数据)
        this.initCustomer.map((v,k) => {
          // 根据类型 设置校验类型
          let rule = [];
          let required = this.ajaxRules[key] ? true : false; 
          if(v.customerMype === '单选'){
            rule = [{required : required , message : `请输入${v.customerMame}` , trigger : 'change'}];
          }else if(v.customerMype === '多选'){
            rule = [{type : 'array' , required : required , message : `请输入${v.customerMame}` , trigger : 'change'}];
          }else if(v.customerMype === '文本'){
            rule = [{required : required , message : `请输入${v.customerMame}` , trigger : 'blur'}];
          }else if(v.customerMype === '数字'){
            rule = [{required : required , message : `请输入${v.customerMame}` , trigger : 'blur'}];
          }else if(v.customerMype === '日期'){
            rule = [{required : required , message : `请输入${v.customerMame}` , trigger : 'change'}];
          }else if(v.customerMype === '单选加补充说明'){
            rule = [{required : required , message : `请输入${v.customerMame}` , trigger : 'change'}];
          }
          this.rules[v.customerMame] = rule;
        });
        // 设置 标签数据
        this.ruleForm.customerArr = this.initCustomer;
      },

      //处理页面客户标签的校验逻辑（33333333333）
        setRules_1(item){
            //customLevel(意向等级)  
             let custom = this.ruleForm.customLevel?this.ruleForm.customLevel:'C'
             
            //--------------------------客户基本信息           
            //判断客户基础信息
           for(let key in item.customInfoLabel){
             if(item.customInfoLabel[key].requiredLevelStr === null){
               item.customInfoLabel[key].requiredLevelStr = ''
             }
              if(item.customInfoLabel[key].requiredLevelStr.indexOf(custom) !== -1){
                this.ajaxRules[key] = true
              }else{
                this.ajaxRules[key] = false
              }

           }
          //-------------------------------判断客户购买需求
          
            //判断购买需求
          for(let key in item.customNeedLabel){
             if(item.customNeedLabel[key].requiredLevelStr === null){
               item.customNeedLabel[key].requiredLevelStr = ''
             }
              if(item.customNeedLabel[key].requiredLevelStr.indexOf(custom) !== -1){
                this.ajaxRules[key] = true
              }else{
                this.ajaxRules[key] = false
              }
           }
          //-----------------------------判断客户购买力customPurchasingPowerLabel
          
          for(let key in item.customPurchasingPowerLabel){
             if(item.customPurchasingPowerLabel[key].requiredLevelStr === null){
               item.customPurchasingPowerLabel[key].requiredLevelStr = ''
             }
              if(item.customPurchasingPowerLabel[key].requiredLevelStr.indexOf(custom) !== -1){
                this.ajaxRules[key] = true
              }else{
                this.ajaxRules[key] = false
              }
           }
          //---------------------------判断其他信息
          //判断其他信息           
           for(let key in item.contactMethodLabelData){
             if(item.contactMethodLabelData[key].requiredLevelStr === null){
               item.contactMethodLabelData[key].requiredLevelStr = ''
             }
              if(item.contactMethodLabelData[key].requiredLevelStr.indexOf(custom) !== -1){
                this.ajaxRules[key] = true
              }else{
                this.ajaxRules[key] = false
              }
           }
          this.setRules(this.ajaxRules)
          
        },
      /* ---------------------页面初始化 数据处理----------------------------- */

      /* ---------------------保存以及关闭----------------------------- */
      // 点击提交
      handleSubmit() {
        // 打开所有 购房需求
        this.ruleForm.purchaseArr = this.ruleForm.purchaseArr.map((v,k) => {
          v.isOpen = true;
          return v;
        });
        // 打开所有 其他信息
        this.ruleForm.orderArr = this.ruleForm.orderArr.map((v,k) => {
          v.isOpen = true;
          return v;
        });
        this.$nextTick(() => {
          // 校验数据
          this.$refs.ruleForm.validate((valid) => {
            if(valid){
              //获取途径转化为字符串
              let sourceStr = this.ruleForm.source.join('/')
              // //工作区域转化为字符串
              let postCityNameStr = this.postCityName.join('/')
              // //居住区域转化字符串
               let postRegionNameStr = this.postRegionName.join('/')
              let telStr = this.ruleForm.tel.join(',')
              
              //客户联系方式列表过度数组
              let customContactMethodListArr = []

              //客户联系方式列表上传
              if(this.ruleForm.tel.length>0){
                for(let kkk=0;kkk<this.ruleForm.tel.length;kkk++){
                  customContactMethodListArr.push({
                    // customId: this.ruleForm.tel[kkk].customId,
                    //——客户id
                    id: this.ruleForm.tel[kkk].id,
                    //——客户联系方式id
                    isMain: this.ruleForm.tel[kkk].isCommon?1:0,
                    //——是否为常用 1：是 0：否
                    no:this.ruleForm.tel[kkk].phone ,
                    //——号码
                    remark: this.ruleForm.remark,
                    //——备注
                    type: "TEL"
                    //——号码类型 TEL：电话

                  })
                }

              }

/*************************************其他联系人************************************ */
            //其他联系人数组上传

              //其他联系人列表过度数组
             let customContactListArr = []
              //其他联系人联系方式过度数组
              let contactInformationArr = []

            if(this.ruleForm.orderArr){
               
              
              for(let i=0;i<this.ruleForm.orderArr.length;i++){
                //与主客户关系过度数组
                let newArray = []
                 for(let g=0;g<this.ruleForm.orderArr[i].contactInformation.length;g++){                      
                    if(newArray.indexOf(this.ruleForm.orderArr[i].contactInformation[g].phone) == -1){                        
                        newArray.push({
                          // customId: this.ruleForm.customId,
                          id:this.ruleForm.orderArr[i].contactInformation[g].otherId,
                          isMain: this.ruleForm.orderArr[i].contactInformation[g].isCommon?1:0,
                          no: this.ruleForm.orderArr[i].contactInformation[g].phone,
                          remark:this.ruleForm.orderArr[i].contactInformation[g].remark,
                          type:'TEL'
                      })                    
                    }else{
                      newArray.push(this.ruleForm.orderArr[i].contactInformation[g]) 
                    }
                  }
                    customContactListArr.push({
                        id: this.ruleForm.orderArr[i].otherId, 
                        //——其他联系人id
                        name: this.ruleForm.orderArr[i].refCustomName,
                        //	——其他联系人姓名
                        relationship: this.ruleForm.orderArr[i].relationship,
                        //——与主客户关系                      
                        contactMethodList:newArray
                    }) 
                  }
            }

             //性别转化
              if(this.ruleForm.sex==='1'){
                this.ruleForm.sex = '男'
              }else if(this.ruleForm.sex ==='0'){
                this.ruleForm.sex = '女'
              }


/****************************购房需求***********************************/
               //客户需求过度数组
            let nicheNeedListArr = [] 
                                      
            if(this.ruleForm.purchaseArr!=null){
              for(let i=0;i<this.ruleForm.purchaseArr.length;i++){

                //客户元素上传
              let customItemListArr = []
                //居室转换
              let bedroomTypeStr = this.ruleForm.purchaseArr[i].bedroomType.join(',')
                //朝向转字符
              let orientationStr = this.ruleForm.purchaseArr[i].orientation.join(',')
                //车位需求


            //电话号码转化
              let telArr = []
              for(let i =0;i<this.ruleForm.tel.length;i++){
                  telArr.push(
                    this.ruleForm.tel[i].phone
                  )
                }                
                this.ruleForm.telString = telArr.join(',') 
                
                
                                   //主要抗性 
                   let focusListArr = []
                   if(this.ruleForm.purchaseArr[i].focus.length>0){
                     
                      for(let j=0;j<this.ruleForm.purchaseArr[i].focus.length;j++){
                        focusListArr.push({
                          itemType:'FOCUS',
                          itemValue:this.ruleForm.purchaseArr[i].focus[j]
                        })
                      }
                   }  
                   //关注s要素
                   let dragListArr = []
                   if(this.ruleForm.purchaseArr[i].drag.length>0){
                      for(let j=0;j<this.ruleForm.purchaseArr[i].drag.length;j++){
                        
                        dragListArr.push({
                          itemType:'DRAG',
                          itemValue:this.ruleForm.purchaseArr[i].drag[j]
                        })
                      } 
                   }
                              
                  nicheNeedListArr.push({ 
                     //主要跟抗性
                    dragList:dragListArr,
                    //关注要素
                    focusList:focusListArr ,                                       
                    bedroomType: bedroomTypeStr,
                    //——居室类型 逗号分隔 如：一居室,二居室
                    carFlag: this.ruleForm.purchaseArr[i].carFlag,
                    //——车位需求 1：有 0：无
                    customId:this.$route.query.id,
                    //——客户id
                    formatCode:this.ruleForm.purchaseArr[i].formatCode,
                    //——业态编码
                    formatName: this.ruleForm.purchaseArr[i].formatName,
                    //——业态名称
                    houseProject: this.ruleForm.purchaseArr[i].houseProject,
                    //——竟品楼盘
                    houseProjectCode:this.ruleForm.purchaseArr[i].houseProjectCode,
                    //——竟品楼盘编码
                    id: this.ruleForm.needId,
                    //——需求id
                    intentionNo: '',
                    //——意向户号111
                    mainUse: this.ruleForm.purchaseArr[i].mainUse.dictCode,
                    //——主要用途 use_yjs:第一居所，use_xq:学区，use_gsjz:改善居住条件，use_fmzy:为父母置业，use_znzy:为子女置业
                                //use_hf:结婚用房(婚房)，use_tz:投资(增值保值)，use_dj:度假，use_zzyn:自住养老(养老)
                                //，use_other其他，并填写
                    mainUseText: this.ruleForm.purchaseArr[i].mainUse.dictName,
                    //——主要用途文本 use_yjs:第一居所，use_xq:学区，use_gsjz:改善居住条件，use_fmzy:为父母置业，use_znzy:为子女置业
                                //use_hf:结婚用房(婚房)，use_tz:投资(增值保值)，use_dj:度假，use_zzyn:自住养老(养老)
                               // ，use_other其他，并填写
                    needArea: this.ruleForm.purchaseArr[i].needArea,
                    //——需求面积
                    needCount:this.ruleForm.purchaseArr[i].needCount,
                    //——需求套数
                    nicheId: this.ruleForm.purchaseArr[i].nicheId,
                    //——客户商机id
                    orientation:orientationStr,
                    //——朝向 东/西/南/北/东南/西南/东北/西北 多个选项时，逗号分隔
                    remark:this.ruleForm.purchaseArr[i].remark,
                    //——备注
                    totalBudget: this.ruleForm.purchaseArr[i].totalBudget,
                    //——总预算  
                                     
                   })

                }
              
            }else{
              nicheNeedListArr = []
            };

              if(this.ruleForm.visitFlag ==='已到访' ){
                this.ruleForm.visitFlag = '是'
              }else{
                this.ruleForm.visitFlag = '否'
              };

              if(this.ruleForm.quotaFlag == '有'){
                this.ruleForm.quotaFlag = '1'
              }else if(this.ruleForm.quotaFlag == '无'){
                 this.ruleForm.quotaFlag = '0'
              }
             
             if(this.ruleForm.isOwner == '是'){
                this.ruleForm.isOwner = '1'
              }else if(this.ruleForm.isOwner == '否'){
                 this.ruleForm.isOwner = '0'
              }

              //汽车品牌
               let carBrandArr = []   
               if(this.ruleForm.carBrand){
                  for(let i=0;i<this.ruleForm.carBrand.length;i++){                
                    carBrandArr.push({
                      itemValue:this.ruleForm.carBrand[i]
                    })
                  }
               }
              //兴趣爱好
              let interestArr = []
              if(this.ruleForm.interest){
                for(let i=0;i<this.ruleForm.interest.length;i++){                 
                  interestArr.push({
                    itemValue:this.ruleForm.interest[i]
                  })
                }
              }
              //客户标签
             let tabArr = []
             if(this.ruleForm.tab){
                for(let i=0;i<this.ruleForm.tab.length;i++){
                    tabArr.push({
                      itemValue:this.ruleForm.tab[i]
                    })
                }
             }

              upDataCostom({
                id:this.ruleForm.id,
                //客户id                        
                addr: this.ruleForm.addr,
                //,	——客户地址
                ageSection: this.ruleForm.ageSection,
                //,		——客户年龄段
                birthday: this.ruleForm.birthday,
                //,	——客户生日
                certificateName: this.ruleForm.certificateType.dictName,
                //		——客户证件名称
                certificateNo: this.ruleForm.certificateNo,
                //	——客户证件号码
                certificateType:this.ruleForm.certificateType.dictType,
                //	——客户证件类型
                childrenNum: this.ruleForm.childrenNum,	
                //	——客户子女数量
                cstLevel: this.ruleForm.customLevel,
                //	——客户等级                              
                customContactList:customContactListArr,
                //其他联系人列表                 
                customContactMethodList:customContactMethodListArr,
                //客户联系方式列表                               
                // customItemList:this.ruleForm.customItemList,
                 //客户元素列表
                duty: this.ruleForm.duty,
                //——客户职务
                dwellArea: this.ruleForm.dwellArea,
                //——客户居住面积 (平方米)
                dwellGarden: this.ruleForm.dwellGarden,
                //——客户现住小区
                dwellInfo: this.ruleForm.dwellInfo,
                //——客户居住情况
                dwellRegion:this.ruleForm.dwellRegionName[0]+"/"+this.ruleForm.dwellRegionName[1]+"/"+this.ruleForm.dwellRegionName[2], //workInfo存的是工作区域的id
                //——客户居住区域
                dwellRegionName:this.postRegionName[0]+"/"+this.postRegionName[1]+"/"+this.postRegionName[2],
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
                nicheNeedList:nicheNeedListArr,
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
                tel: this.ruleForm.telString,
                //——客户电话
                workInfo:this.ruleForm.workInfoName[0]+"/"+this.ruleForm.workInfoName[1]+"/"+this.ruleForm.workInfoName[2], //workInfo存的是工作区域的id
                //——客户工作区域
                workInfoName:this.postWorkInfoName[0]+"/"+this.postWorkInfoName[1]+"/"+this.postWorkInfoName[2],
                //工作区域名称
                isVisit:this.ruleForm.visitFlag,
                //汽车品牌
                carBrandList:carBrandArr,
                //兴趣爱好
                interestList:interestArr,
                //客户标签
                tagList:tabArr,
             
                }).then((res) => {
                  if(res.status === 200){
                    this.$route.push({path:`/mainpage/customerFollowUp/customerManagementView?id=${this.ruleForm.id}`})
                  }
                })
              
            }
          });
        });
      },
      // 点击关闭
      handleClose() {
        // 判断 如果上个页面是 客户管理查看页面 则返回 查看页面
        let url = this.$route.query.url ? 
          decodeURIComponent(this.$route.query.url) : 
          '/mainpage/customerFollowUp/customerFollowPage';
        this.$router.push({
          path : url,
        });
      },
      /* ---------------------保存以及关闭----------------------------- */

      /* ---------------------基本信息 手机号相关逻辑----------------------------- */
      // 点击 +
      handleMobileAdd() {
        this.ruleForm.add = true
      },
      handleMobileAdd_1(){
        this.ruleForm.telAdd = true
      },

       handleMobileTelAdd_1() {
        this.ruleForm.telAdd = true
      },
      // 点击 -
      handleMobileDelete(index) {
        let isCommon = this.ruleForm.tel[index].isCommon;
        this.ruleForm.tel.splice(index,1);
        // 如果当前删除的是 常用状态 
        if(isCommon === true){
          this.$nextTick(() => {
            this.$set(this.ruleForm.tel[0],'isCommon',true);
          });
        }
      },
      // 设为常用
      handSetCommon(index) {
        this.ruleForm.tel = this.ruleForm.tel.map((v,k) => {
          v.isCommon = index === k ? true : false;
          return v;
        });
      },

     // 其他联系人手机号码设为常用
      handSetCommon_1(index,index2) {
            for(let i=0;i<this.ruleForm.orderArr[index].contactInformation.length;i++){
              if(i === index2){
                  this.ruleForm.orderArr[index].contactInformation[i].isCommon = true
              }else{
                  this.ruleForm.orderArr[index].contactInformation[i].isCommon = false
              }
            }
        
      },
      // 意向等级 change
      handleCustomLevelChange() {

      },
      /* ---------------------基本信息 手机号相关逻辑----------------------------- */

      /* ---------------------购房需求 相关逻辑----------------------------- */
      // 点击展开
      handleHouseOpen(index) {
        this.ruleForm.purchaseArr[index].isOpen = true;
      },
      // 点击收起
      handleHouseStop(item,index) {
        this.ruleForm.purchaseArr[index].isOpen = false;
        this.handleHouseListMouseleave(item,index);
      },
      // 鼠标移入 
      handleHouseListMouseenter(item,index) {
        this.$set(item,'active',true);
      },
      // 鼠标移出
      handleHouseListMouseleave(item,index) {
        this.$set(item,'active',false);
      },
      // 点击 +
      handleHouseListAdd(item,index) {
        // 校验 数据
        let verifyArr = [
          'mainUse','formatName','bedroomType','orientation',
          'needCount','intentionNo','houseProject','carFlag','focus','drag'
        ];
        // 如果购房需求选择其他 增加其他输入框的校验
        if(item.mainUse === 'useOther'){
          verifyArr.push('mainUseOrder');
        }
        let verifySuccessLength = 0;
        // 循环校验
        verifyArr.map((v,k) => {
          this.$refs.ruleForm.validateField(`purchaseArr[${index}].${v}`,(valid) => {
            if(!valid){
              verifySuccessLength ++;
            }
          });
        });
        // 如果没有通过 退出
        if(verifySuccessLength !== verifyArr.length){
          return;
        }
        // 收起当前
        this.ruleForm.purchaseArr[index].isOpen = false;
        // 增加数据
        let length = this.ruleForm.purchaseArr.length;
        let houseListDefault = {
          // 增加key 解决校验问题
          key : Math.random(),
          // 当前是否展开
          isOpen : true,
          // 购房主要用途
          mainUse : '',
          // 购房主要用途_其他文本框
          mainUseOrder : '',
          // 需求业态
          formatName : '',
          // 居室
          bedroomType : [],
          // 朝向
          orientation : [],
          // 需求面积
          needArea : '',
          // 总价预算
          totalBdget : '',
          // 需求套数
          needCount : '',
          // 意向户号
          intentionNo : [],
          // 意向户号文本显示
          intentionNoPlaceholder : '',
          // 竞品楼盘
          houseProjectCode:'',
          // 车位需求
          carFlag : '',
          // 关注要素
          focus : [],
          // 主要抗性
          drag : [],
        }
        this.ruleForm.purchaseArr.push(houseListDefault);
        // 移出当前 选中状态
        this.handleHouseListMouseleave(item);
      },
      // 点击 -
      handleHouseListDelete(item,index) {
        this.ruleForm.purchaseArr.splice(index,1);
      },
      /* ---------------------购房需求 相关逻辑----------------------------- */

      /* ---------------------其他信息 相关逻辑----------------------------- */
      // 联系方式 增加
      handleOrderPhoneAdd(item2,index2,index) {
        this.ruleForm.orderArr[index].contactInformation.push({
          key : Math.random(),
          // 联系方式 手机号
          phone : '',
          // 是否常用 
          isCommon : false,
        });
      },
      // 联系方式 删除
      handleOrderPhoneDelete(item2,index2,index) {
        this.ruleForm.orderArr[index].contactInformation.splice(index2,1);
        /* 如果删除当前的是 常用状态的 默认设置第一个为常用状态 */
        if(item2.isCommon === true){
          this.ruleForm.orderArr[index].contactInformation[0].isCommon = true;
        }
      },
      // 联系方式 设为常用
      handleOrderCommon(item2,index2,index) {
        let arr = this.ruleForm.orderArr[index].contactInformation.map((v,k) => {
          v.isCommon = index2 === k ? true : false;
          return v;
        });
        this.ruleForm.orderArr[index].contactInformation = arr;
      },
      // 其他信息 收起
      handleOrderHide(item,index) {
        this.ruleForm.orderArr[index].isOpen = false;
        this.handleOrderMouseleave(item,index);
      },
      // 其他信息 展开
      handleOrderShow(item,index) {
        this.ruleForm.orderArr[index].isOpen = true;
      },

      //删除
        handleOrderListDelete(item,index) {
        this.ruleForm.orderArr.splice(index,1);
      },
      // 其他信息 新增
      handleOrderAdd(item,index) {
        // 校验
        // 校验 数据
        let verifyArr = [
          `orderArr[${index}].refCustomName`,
          `orderArr[${index}].relationship`,
        ];
        // 增加 联系方式手机号 校验数据
        item.contactInformation.map((v,k) => {
          verifyArr.push(`orderArr[${index}].contactInformation[${k}].phone`);
        });
        let verifySuccessLength = 0;
        // 循环校验
        verifyArr.map((v,k) => {
          this.$refs.ruleForm.validateField(v,(valid) => {
            if(!valid){
              verifySuccessLength ++;
            }
          });
        });
        // 如果没有通过 退出
        if(verifySuccessLength !== verifyArr.length){
          return;
        }
        // 收起当前
        this.ruleForm.orderArr[index].isOpen = false;
        let orderDefault = {
          // 增加key 解决校验问题
          key : Math.random(),
          // 当前是否展开
          isOpen : true,
          // 当前是否选中
          active : false,
          // 关联客户
          refCustomName : '',
          // 联系方式
          contactInformation : [],  // ??
          // 与主客户关系
          relationship : '',
        }
        this.ruleForm.orderArr.push(orderDefault);
        this.handleOrderMouseleave(item,index);
      },


      // 其他信息 删除
      handleOrderDelete(item,index) {
        this.ruleForm.orderArr.splice(index,1);
      },
      // 其他信息 移入
      handleOrderMouseenter(item,index) {
        this.ruleForm.orderArr[index].active = true;
      },
      // 其他信息 移出
      handleOrderMouseleave(item,index) {
        this.ruleForm.orderArr[index].active = false;
      },
      // 客户标签 select change
      handleCustomerSelectChange(val) {
        // 当前选中的数据
        let arr = [];
        this.ruleForm.tabValue.map((v,k) => {
          this.ruleForm.tabOptions.map((v1,k1) => {
            if(v === v1.value){
              arr.push({labelName : v1.label , id : v1.value});
            }
          });
        });
        // 去重
        let allArr = [];
        this.ruleForm.tab.map((v,k) => {
          if(!v.id){
            allArr.push(v);
          }
        });
        allArr = allArr.concat(arr);
        let newArr = [];
        let obj = {};
        allArr.map((v,k) => {
          if(!obj[`${v.labelName}${v.id}`]){
            newArr.push(v);
            obj[`${v.labelName}${v.id}`] = true;
          }
        });
        this.ruleForm.tab = newArr;
      },
      // 客户标签 add
      handleCustomerLabelAdd() {
        let val = this.ruleForm.customerLabelInputValue;
        if(val){
          this.ruleForm.customerLabelInputValue = '';
          this.ruleForm.customerLabelInputVisible = false;
          let len = this.ruleForm.tab.filter((v,k) => {
            return v.labelName === val;
          }).length;
          len === 0 && this.ruleForm.tab.push({labelName : val});
        }
      },
      // 客户标签 delete
      handleCustomerLabelDelete(item,index) {
        this.ruleForm.tab.splice(index,1);
        /* 删除 客户标签select 选中的数据 */
        if(item.id){
          let arr = [];
          this.ruleForm.tabValue.map((v,k) => {
            if(item.id !== v){
              arr.push(v);
            }
          });
          this.ruleForm.tabValue = arr;
        }
      },
      /* ---------------------其他信息 相关逻辑----------------------------- */
    },
  }
</script>

<style lang="scss">

.customer-add-or-edit{
  .bold{
    font-weight: bold;
  }
  .w-150{
    width: 150px;
  }
  .border-active{
    border: 1px solid #4DBE61!important;
  }
  .mobile-item{
    // margin-left: 30px!important;
    .el-form-item__label{
      width: 74px!important;
    }
    .el-col-12{
       .el-form-item__label{
          width: 112px!important;
       }
    }
    
  }
  .order-item{
    .el-form-item__label{
      width: 0!important;
    }
  }
  .order-item.el-form-item.is-error input{
    border-color: #f56c6c!important;
  }
  /* 购房需求 style */
  .m-sup{
    display: inline-block;
    vertical-align: middle;
    margin-top: -10px;
  }
  .shrink-box{
    border: 1px solid #E5E5E5;
    border-radius: 4px;
    height: 38px;
    .left{
      width: calc(100% - 30px);
      .title{
        font-weight: bold;
        font-size: 14px;
      }
    }
    >div{
      line-height: 38px;
    }
    i{
      margin-top: 9px;
    }
  }
  .el-select__tags{
    max-width: initial!important;
  }
  .m-item-form{
    margin-right: 20px;
    padding-top: 18px;
    border: 1px solid transparent;
    border-radius: 4px;
    position: relative;
    .el-icon-circle-plus-outline{
      position: absolute;
      right: -30px;
    }
    .el-form-item__label{
     
    }
  }
  /* 其他信息 表单元素  */
  .order-hide-box{
    border: 1px solid #E5E5E5;
    border-radius: 4px;
    height: 38px;
    line-height: 38px;
    margin-bottom: 20px;
  }
  .order-show-box{
    margin-right: 20px;
    padding-top: 18px;
    border: 1px solid transparent;
    border-radius: 4px;
    position: relative;
    .inline-block{
      display: inline-block;
    }
    .w-50{
      width: 50px;
      display: inline-block;
    }
    /* 关联客户 删除 */
    .delete-customers{
      position: absolute;
      right: 10px;
      top: -10px;
    }
    .order-next{
      margin-left: -100px;
      .el-form-item.is-required .el-form-item__label:before{
        color: transparent;
      }
    }
    /* 关联客户 收起 */
    .order-stop{
      position: absolute;
      bottom: 15px;
      right: 0;
    }
    /* 关联客户 增加 */
    .order-add{
      position: absolute;
      bottom: 15px;
      right: 30px;
    }
  }
}

.span_11{
  display: inline;
  margin-left: 10px;
}
.tel_1{
  
}
.mr-5{
  margin-top: 10px;
  font-size: 14px!important;
  right: 150px!important;
}
.el-form-item__label{

}
.m-item-form{
  padding-top: 0!important;
}
.mr_78{
 

}
.customer-add-or-edit .m-item-form .el-icon-circle-plus-outline{
 position: static!important;
}

.el-form-item .mobile-item .is-success{
margin-left: 30px!important;
}
.span_2{
  position: relative;
  left: 33px;
  top: 5px;
  padding-right: 20px;
}
.placeholder input::-webkit-input-placeholder{
  color: #404040;
}


.placeholder input::-moz-placeholder { /* Mozilla Firefox 4 to 18 */      
    color: #404040;  
}

.placeholder input:-moz-placeholder{ /* Mozilla Firefox 19+ */
    color:#404040;
}

.placeholder input:-ms-input-placeholder{
    color: #404040;
}


</style>