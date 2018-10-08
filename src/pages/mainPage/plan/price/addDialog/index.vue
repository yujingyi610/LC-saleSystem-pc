<template>
    <div>
        <el-dialog :visible.sync="addFlag" width="80%" :close-on-click-modal="false" :close-on-press-escape="false">
            <div slot="title">
                <span >新增调价方案</span>
            </div>
            <el-form :model="DataInfo" :rules="rule" ref="DataInfo">
                <el-row :gutter="24">
                    <el-col :span="8">
                        <el-form-item label="方案名称:">
                            <el-input v-model="DataInfo.schemeName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="是否首开:" label-width="100px">
                          <el-select v-model="DataInfo.isFirstOpen">
                            <el-option v-for="(item, index) in isFirstOpenOption" :key="index" :label="item.label" :value="item.value"></el-option>
                          </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <!-- <el-form-item v-model="DataInfo.projectName" label="项目:">
                            <el-cascader :options="selectedOptions" @active-item-change="handleItemChange" @change="selectChange" :props="props" :show-all-levels="false"></el-cascader>  
                        </el-form-item> -->
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="8">
                        <el-form-item label="城市公司:">
                            <el-select v-model="form.cityCompany" value-key="id">
                                <el-option v-for="(item, index) in cityCompanyOption" :key="index" :label="item.name" :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="项目名称:" label-width="100px">
                            <el-select v-model="form.projectName" value-key="id">
                                <el-option v-for="(item, index) in projectNameOption" :key="index" :label="item.name" :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="分期:">
                            <el-select v-model="form.devstagesId" value-key="id" @focus="handleMessage">
                                <el-option v-for="(item, index) in stageOption" :key="index" :label="item.name" :value="item" :disabled="DataInfo.schemeName?false:'disabled'"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="调价说明:">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="DataInfo.schemeRemark"></el-input>
                </el-form-item>
            </el-form>
            <el-card>
                <div slot="header" class="clearfix" >
                    <span class="title">折扣方案</span>
                    <span style="margin-left: 20px; font-size: 12px;color: #808080">折扣计算方式：
                        <el-select v-model="DataInfo.discountCompMethod" placeholder="请选择">
                            <el-option v-for="(item, index) in options" :key="index" :value="item.itemValue" :label="item.itemValue"></el-option>
                        </el-select>
                    </span>
                    <span style="font-size: 12px; margin-left: 20px; margin-right: 5px; color: #808080">是否覆盖之前折扣:</span>
                    <el-radio-group v-model="DataInfo.isCover" >
                      <el-radio :label="1" size="min">是</el-radio>
                      <el-radio :label="0" size="min">否</el-radio>
                    </el-radio-group>
                    <div style="float: right">
                        <el-button type="success" v-if="priceschemeId" @click="handleAddDiscountWay">新增折扣方案</el-button>
                    </div>
                </div>
                <div class="text item">
                    <el-table :data="DataInfo.discountSchemeDtos" border style="width: 100%">
                        <el-table-column type="index" label="序号" width="50"></el-table-column>
                        <el-table-column prop="discountName" label="折扣名称" width="180"></el-table-column>
                        <el-table-column prop="discountType" label="折扣类型"></el-table-column>
                        <el-table-column prop="discountMethod" label="优惠方式"></el-table-column>
                        <el-table-column prop="discountItem" label="折扣明细"></el-table-column>
                        <el-table-column fixed="right" label="操作" width="120">
                            <template slot-scope="scope">
                                <el-button @click.native.prevent="deleteRow(scope.$index, scope.row)" type="text">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
            <el-card class="box-card" >
                <div slot="header" class="clearfix">
                    <span class="title">调价楼栋列表</span>
                    <div style="float: right">
                        <el-button type="success" v-if="priceschemeId" class="upLoadBtn" @click="addpricebuilding ('DataInfo')" >新增</el-button>
                    </div>
                </div>
                <div class="text item">
                    <el-table :data="DataInfo.priceBuildDtos" border style="width: 100%">
                        <el-table-column type="index" label="序号" width="50"></el-table-column>
                        <el-table-column prop="devstagesName" label="分期" ></el-table-column>
                        <el-table-column prop="areaName" label="区域/组团"></el-table-column>
                        <el-table-column prop="priceMethod" label="计价方式"></el-table-column>
                        <el-table-column prop="panoramicPlanPrice" label="全景计划价格（元）"></el-table-column>
                        <el-table-column prop="kickoffPrice" label="启动会单价（元）"></el-table-column>
                        <el-table-column prop="buildNameStr" label="楼栋名称" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="totalCount" label="套数" ></el-table-column>
                        <el-table-column fixed="right" label="操作" width="320" >
                            <template slot-scope="scope">
                                <el-button  type="text" @click="editBuildinfor (scope.$index, DataInfo.priceBuildDtos)">编辑</el-button>
                                <el-button  type="text" @click.native.prevent="uploadBuildinfor(scope.$index, DataInfo.priceBuildDtos)">下载</el-button>
                                <el-upload
                                    style="display: inline-block"
                                    action="/api/project/priceScheme/house/exprot"
                                    multiple
                                    :show-file-list=false
                                    :on-success="handleAvatarSuccess"
                                    :data="exportdata">
                                    <el-button  type="text"  @click.native.prevent="exportBuildlist(scope.$index, DataInfo.priceBuildDtos)">导入</el-button>                     
                                </el-upload>
                                <el-button @click.native.prevent="deleteBuildlist(scope.$index, DataInfo.priceBuildDtos)" type="text">删除</el-button>
                            	<el-button type="text" @click.native.prevent="lookdeleteBuildlist(scope.$index, DataInfo.priceBuildDtos)">查看</el-button>
                            </template>
                        </el-table-column>
                        
                    </el-table>
                </div>
            </el-card>
            <el-card class="box-card"
                v-loading="loading"
                element-loading-text="上传中，请稍后..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)">
                <div slot="header" class="clearfix">
                    <span class="title">添加附件</span>
                </div>
                <div>
                  <span class="uploadTitel">请上传需导入的文件</span>
                    <el-upload
                    action="/zuul/api/storage/files/multipart/file"
                    :on-success="updateAnnexSuccess"
                    :on-error="handleUpDateError"
                    :on-progress="handleProgress"
                    :before-upload="beforeAvatarUpload"
                    :on-remove="handleRemove"
                    :data="updateLoadAnnex"
                    name="files"
                    :limit="90"
                    :file-list="idArr">
                    <el-button size="small" class="upLoadBtn" type="primary">上传</el-button>
                    </el-upload>
                </div>
            </el-card>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleSave" v-has="'prj:price:add'">保存</el-button>
                <el-button type="primary" @click="handleSaveAndUp" v-has="'prj:price:submit'">保存并提交审批</el-button>
            </div>
        </el-dialog>
        <!-- 新增折扣方案 -->
        <el-dialog :visible.sync="addDiscountFlag" width="50%">
            <div slot="title">
                <span >新增折扣方案</span>
            </div>
            <el-form :model="addDiscountForm" ref="addDiscountForm" :rules="rules" label-width="100px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="折扣方案名称:">
                            <el-input v-model="addDiscountForm.discountName"></el-input>
                        </el-form-item>
                        <el-form-item label="优惠方式:">
                            <el-select v-model="addDiscountForm.discountMethod">
                                <el-option value="比例优惠"></el-option>
                                <el-option value="总价优惠"></el-option>
                                <el-option value="单价优惠"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="折扣类型:">
                            <el-select v-model="addDiscountForm.discountType">
                                <el-option value="公开优惠"></el-option>
                                <el-option value="非公开优惠"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="discountItem" label="折扣明细:">
                            <el-input v-model="addDiscountForm.discountItem" type="number" @change="handleChangeDiscount"><i slot="suffix" style="font-style: normal; font-weight: 900">{{UnitsofAccount}}</i></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleSaveDiscountWay('addDiscountForm')">完成</el-button>
            </div>
        </el-dialog>
        <build-dialog ref="buildDialogRef" :DataInfo="DataInfo" :priceschemeId="priceschemeId" @closeChild="handleCloseChild"></build-dialog>
        <house-table ref="HouseDialogRef" ></house-table>
    </div>
</template>

<script>
import {
  modifyPrice, // 保存新增的数据
  getPricecity, // 获取城市公司下拉数据
  getHouseTreeChild, // 获取城市公司下的项目下拉数据
  completeDiscounts, // 保存新增折扣方案
  getDiscountslist, // 获取折扣方案数据
  deleteDiscount, // 删除折扣方案
  getPriceproject, // 获取项目
  getpriceSchemeAreaList, // 获取调价楼栋列表数据
  uploadBuildInfor, // 下载楼栋信息
  savePriceScheme, // 保存调价方案
  submitExamination, //保存并提交调价方案
  deleteBuildList, // 删除调价楼栋
  exportBuildList, // 导入调价楼栋
  lookBuildInfor, // 查看调价楼栋房间
  getOption, // 获取折扣方式下拉数据
  getCityList, // 获取城市公司
  getPrjByCityId, // 通过城市公司ID获取项目
  getProstages // 通过项目ID获取分期
} from "@/api/pages/mainPage/plan/price/index.js";
import buildDialog from "./BuildDialog"; // 调价楼栋弹框
import houseTable from "./houseTable"; // 调价楼栋房间弹框
import { mapGetters } from "vuex";
export default {
  components: {
    buildDialog,
    houseTable
  },
  watch: {
    "form.cityCompany": function(e) {
      this.DataInfo.projectName = null;
      this.DataInfo.projectId = null;
      this.DataInfo.projectCode = null;
      if (e && e.id) {
        this.DataInfo.projectCityId = e.id;
        this.DataInfo.projectCityName = e.name;
        this.DataInfo.projectCityCode = e.code;
        this.handleGetPrjByCityId({ id: e.id });
      }
    },
    "form.projectName": function(e) {
      this.DataInfo.devstagesId = null;
      this.DataInfo.devstagesName = null;
      this.DataInfo.devstagesCode = null;
      if (e && e.id) {
        this.DataInfo.projectId = e.id;
        this.DataInfo.projectName = e.name;
        this.DataInfo.projectCode = e.code;
        this.handleGetProStages({ id: e.id });
      }
    },
    "form.devstagesId": function(e) {
      // this.DataInfo.stage = null;
      if (e && e.id) {
        this.DataInfo.devstagesId = e.id;
        this.DataInfo.devstagesName = e.name;
        this.DataInfo.devstagesCode = e.code;
        this.DataInfo.id = this.priceschemeId;
        let data = {
          dto: this.DataInfo
        };
        console.log(this.DataInfo);
        modifyPrice(this.DataInfo).then(res => {
          // 选择了项目后先保存id，相当于做了保存操作
          if (res.status === 200) {
            if (!this.priceschemeId) {
              this.priceschemeId = res.data;
            }
          }
        });
      }
    },
    "addDiscountForm.discountMethod"(e) {
      this.handleChangeDiscount();
    }
  },
  computed: {
    UnitsofAccount() {
      return this.addDiscountForm.discountMethod === "比例优惠" ? "%" : "元";
    },
    ...mapGetters(["topMenus"])
  },
  data() {
    return {
      isFirstOpenOption: [
        {
          label: '是',
          value: 1
        },
        {
          label: '否',
          value: 0
        }
      ],
      addFlag: false, // 新增调价方案
      addDiscountFlag: false, // 新增折扣方案
      priceschemeId: null, // 全局保存新增需要的id
      cityCompanyOption: [], // 选择城市公司下拉数据
      projectNameOption: [], // 选择项目名称下拉数据
      stageOption: [], // 选择分期名称下拉数据
      form: {
        cityCompany: null, // 城市公司
        projectName: null, // 项目名称
        devstagesId: null // 推盘批次
      },
      DataInfo: {
        projectName: null, // 项目名称
        isFirstOpen: null,// 是否首开
        devstagesId: null, // 分期
        devstagesName: null, // 分期
        devstagesCode: null, // 分期
        projectCityId: null, // 城市公司ID
        projectCityName: null, //
        projectCityCode: null, //
        schemeName: "", //方案名称
        //createTimeStart:"",//制定时间
        kickoffPrice: undefined, //启动会价格
        schemeRemark: "", //调价说明
        discountCompMethod: "", //折扣计算方式
        projectId: null, //项目id
        projectCode: null, //项目编码
        discountSchemeDtos: [], //新增折扣方案表
        priceBuildDtos: [], //调价楼栋列表
        priceSchemeResourceDto: {},
        isCover: 0 // 是否覆盖当前折扣
        // object:"",
      },
      // 项目验证
      rule: {
        projectName: [
          { required: true, message: "请选择项目", trigger: "change" }
        ]
      },
      selectedOptions: [], // 项目下拉选择数据
      props: {
        //项目添加子项
        value: "name",
        label: "name",
        children: "children"
      },
      options: [], // 折扣计价方式下拉数据
      /**********新增调价方案************/
      radio: 3,
      testUrl: "",
      /*******上传附件的参数***********/
      exportdata: {}, // 调价楼栋列表中的附件参数
      updateLoadAnnex: {
        bussinessType: "project"
      },
      fileList: [],
      /*******新增折扣方案*********/
      addDiscountForm: {
        discountName: "",
        discountType: "非公开优惠",
        discountMethod: "单价优惠",
        discountItem: ""
      },
      rules: {
        //折扣验证
        discountName: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        discountItem: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      idArr: [],
      loading: false
    };
  },
  methods: {
    handleMessage() {
      if (!this.DataInfo.schemeName) {
        this.$message.error("请先输入方案名称！");
      }
    },
    show(data) {
      // 打开新增弹框
      this.DataInfo = {
        projectName: null, // 项目名称
        isFirstOpen: null,// 是否首开
        devstagesId: null, // 分期
        devstagesName: null, // 分期
        devstagesCode: null, // 分期
        projectCityId: null, // 城市公司ID
        projectCityName: null, //
        projectCityCode: null, //
        schemeName: "", //方案名称
        //createTimeStart:"",//制定时间
        kickoffPrice: undefined, //启动会价格
        schemeRemark: "", //调价说明
        discountCompMethod: "", //折扣计算方式
        projectId: null, //项目id
        projectCode: null, //项目编码
        discountSchemeDtos: [], //新增折扣方案表
        priceBuildDtos: [], //调价楼栋列表
        priceSchemeResourceDto: {},
        isCover: 0 // 是否覆盖当前折扣
        // object:"",
      };
      this.form = {
        cityCompany: null, // 城市公司
        projectName: null, // 项目名称
        devstagesId: null // 推盘批次
      };
      this.priceschemeId = null;
      this.idArr = [];
      this.handleGetOption();
      if (data) {
        this.DataInfo.schemeName = data.schemeName;
        this.DataInfo.isFirstOpen = data.isFirstOpen;
        this.DataInfo.kickoffPrice = data.kickoffPrice;
        this.DataInfo.schemeRemark = data.schemeRemark;
        this.DataInfo.discountCompMethod = data.discountCompMethod;

        this.DataInfo.projectCityId = data.projectCityId;
        this.DataInfo.projectCityName = data.projectCityName;

        this.form.cityCompany = {
          name: data.projectCityName,
          id: data.projectCityId
        };

        this.DataInfo.projectId = data.projectId;
        this.DataInfo.projectName = data.projectName;
        this.DataInfo.projectCode = data.projectCode;
        this.form.projectName = {
          name: data.projectName,
          id: data.projectId
        };
        this.DataInfo.devstagesName = data.devstagesName;
        this.DataInfo.devstagesId = data.devstagesId;
        this.DataInfo.devstagesCode = data.devstagesCode;
        this.form.devstagesId = {
          name: data.devstagesName,
          id: data.devstagesId
        };
        this.DataInfo.isCover = data.isCover;

        this.DataInfo.id = data.id;
        this.priceschemeId = data.id;
        if (data.resourceMaps && data.resourceMaps[0]) {
          data.resourceMaps.map(item => {
            item.name = item.fileRealName;
            item.resourceId = item.id;
            this.idArr.push(item);
          });
        }

        getDiscountslist({ pId: this.DataInfo.id }).then(res => {
          // 获取折扣方案数据列表
          if (res.status === 200) this.DataInfo.discountSchemeDtos = res.data;
        });
        this.handleCloseChild(); // 获取调价区域楼栋列表数据
      }
      this.addFlag = true;
    },
    handleGetOption() {
      // 获取折扣方式下拉数据
      let data = {
        typeCode: "DISCOUNT_CALCULATION_METHOD"
      };
      data = this.Qs.stringify(data);
      getOption(data).then(res => {
        if (res.status === 200) {
          this.options = res.data;
          this.DataInfo.discountCompMethod = this.options[0].itemValue;
        } else {
          this.$message.error("获取折扣计价方式数据失败！");
        }
      });
    },
    handleChangeDiscount() {
      // 新增折扣方案价格校验
      if (this.addDiscountForm.discountMethod === "比例优惠") {
        if (this.addDiscountForm.discountItem >= 100) {
          this.addDiscountForm.discountItem = 100;
        } else if (this.addDiscountForm.discountItem <= 0) {
          this.addDiscountForm.discountItem = 1;
        }
      } else {
        if (this.addDiscountForm.discountItem <= 0) {
          this.addDiscountForm.discountItem = 0;
        }
      }
    },
    handleGetCityList() {
      // 获取城市公司
      let userInfo = JSON.parse(sessionStorage.getItem("user-info"));
      if (userInfo.cityId) {
        this.cityCompanyOption.push({
          id: userInfo.cityId,
          name: userInfo.cityName,
          code: userInfo.cityCode
        });
        this.form.cityCompany = this.cityCompanyOption[0];
      } else {
        //获取城市公司列表
        getCityList().then(res => {
          if (res.status === 200) {
            this.cityCompanyOption = res.data;
            this.form.cityCompany = this.cityCompanyOption[0];
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
      } else {
        getPrjByCityId(params).then(res => {
          if (res.status === 200) {
            this.projectNameOption = res.data;
          }
        });
      }
    },
    handleGetProStages(params) {
      // 通过项目ID获取分期
      getProstages(params).then(res => {
        if (res.status === 200) {
          this.stageOption = res.data;
        }
      });
    },

    // 新增折扣方案按钮，打开新增折扣方案dialog
    handleAddDiscountWay() {
      this.addDiscountForm = {
        discountName: "",
        discountType: "非公开优惠",
        discountMethod: "单价优惠",
        discountItem: ""
      };
      this.addDiscountFlag = true;
    },
    // 新增折扣方案dialog，完成按钮
    handleSaveDiscountWay(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.innerVisible = false;
          let data = {
            priceSchemeId: this.priceschemeId,
            discountName: this.addDiscountForm.discountName,
            discountType: this.addDiscountForm.discountType,
            discountMethod: this.addDiscountForm.discountMethod,
            discountItem: this.addDiscountForm.discountItem
          };
          completeDiscounts(data).then(res => {
            if (res.status === 200) {
              let params = {
                pId: this.priceschemeId
              };
              getDiscountslist(params).then(res => {
                if (res.status === 200) {
                  this.DataInfo.discountSchemeDtos = res.data;
                }
              });
              this.addDiscountFlag = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    // 折扣table删除
    deleteRow(index, row) {
      let data = {
        id: row.id
      };
      data = this.Qs.stringify(data);
      deleteDiscount(data).then(res => {
        if (res.status === 200) {
          this.$message({
            message: "删除成功！",
            type: "success"
          });
          // 更新折扣列表
          let params = {
            pId: this.priceschemeId
          };
          getDiscountslist(params).then(res => {
            if (res.status === 200) {
              this.DataInfo.discountSchemeDtos = res.data;
            }
          });
        }
      });
    },
    // 打开新增调价楼栋
    addpricebuilding(formName) {
      this.$refs.buildDialogRef.show();
    },
    handleCloseChild() {
      // 关闭新增调价楼栋弹框，重新请求调价楼栋列表数据
      let params = {
        pId: this.priceschemeId
      };
      getpriceSchemeAreaList(params).then(res => {
        if (res.status === 200) {
          this.DataInfo.priceBuildDtos = res.data;
          // this.DataInfo.priceBuildDtos.map(item => {
          //   item.buildStr = "";
          //   item.priceBuildDtos.map((item2, index2) => {
          //     if (index2 !== item.priceBuildDtos.length - 1) {
          //       item.buildStr = item.buildStr + item2.buildName + "、";
          //     } else {
          //       item.buildStr = item.buildStr + item2.buildName;
          //     }
          //   });
          // });
        }
      });
    },
    //编辑调价楼栋信息
    editBuildinfor(index, item) {
      this.$refs.buildDialogRef.show(item[index]);
    },
    //调价楼栋下载
    uploadBuildinfor(index, item) {
      let id = item[index].id;
      window.location.href =
        "/api/project/priceScheme/house/downlond?priceAreaId=" + id;
    },
    //导入调价楼栋
    exportBuildlist(index, item) {
      let id = item[index].id;
      this.exportdata = {
        priceAreaId: id
      };
    },
    // 调价楼栋table删除
    deleteBuildlist(index, rows) {
      var ind = rows[index].id;
      let data = {
        id: ind
      };
      data = this.Qs.stringify(data);
      deleteBuildList(data).then(res => {
        if (res.status === 200) {
          //  更新列表
          this.$message({
            type: "success",
            message: res.message
          });
          let params = {
            pId: this.priceschemeId
          };
          getpriceSchemeAreaList(params).then(res => {
            if (res.status === 200) {
              this.DataInfo.priceBuildDtos = res.data;
            }
          });
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    //调价楼栋查看
    lookdeleteBuildlist(index, item) {
      let id = item[index].id;
      let params = {
        priceAreaId: id
      };
      lookBuildInfor(params).then(res => {
        if (res.status === 200) {
          this.$refs.HouseDialogRef.handleOpenDialog(res.data);
        }
      });
    },
    /*********上传****/
    handleAvatarSuccess(res, file) {
      if (res.status === 200) {
        this.$message({
          type: "success",
          message: "导入成功！"
        });
      } else {
        this.$message.error(res.message);
      }
    },
    updateAnnexSuccess(response) {
      // 上传成功的回调
      this.loading = false;
      if (response.status === 200) {
        this.$message({
          type: "success",
          message: "上传成功！"
        });
        response.data.map(item => {
          this.idArr.push({
            fileUrl: item.fileUrl,
            resourceId: item.id,
            url: item.fileUrl,
            name: item.fileRealName
          });
        });
      } else {
        this.$message.error(res.message);
      }
    },
    handleUpDateError(err) {
      // 上传失败
      this.$alert(JSON.parse(err.message).message, "提示", {
        confirmButtonText: "确定",
        showClose: false,
        callback: action => {
          this.loading = false;
        }
      });
    },
    handleProgress(file, fileList) {
      // 上传中
      if (!this.loading) {
        this.loading = true;
      }
    },
    beforeAvatarUpload(file) {
      // 上传前判断文件大小
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 10MB!");
      }
      return isLt2M;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.idArr = fileList;
      console.log(this.idArr)
    },
    // 保存
    handleSave() {
      if( this.DataInfo.isFirstOpen !== 0 && this.DataInfo.isFirstOpen !== 1 ){
        this.$message.error('请选择是否首开！')
        return
      }
      this.DataInfo.id = this.priceschemeId;
      this.DataInfo.priceSchemeResources = this.idArr;
      console.log(this.idArr)
      savePriceScheme(this.DataInfo).then(res => {
        if (res.status === 200) {
          this.$message({
            message: "保存成功!",
            type: "success",
            showClose: true
          });
          this.addFlag = false;
          this.$emit("upDate");
        }
      });
    },
    // 保存并提交审核
    handleSaveAndUp() {
      if( this.DataInfo.isFirstOpen !== 0 && this.DataInfo.isFirstOpen !== 1 ){
        this.$message.error('请选择是否首开！')
        return
      }
      this.DataInfo.id = this.priceschemeId;
      this.DataInfo.priceSchemeResources = this.idArr;
      savePriceScheme(this.DataInfo).then(res => {
        if (res.status === 200) {
          if (res.status === 200) {
            submitExamination({ id: res.data }).then(res => {
              if (res.status === 200) {
                this.$message({
                  message: "保存成功!",
                  type: "success",
                  showClose: true
                });
              } else {
                this.$message({
                  message: res.message,
                  type: "error"
                });
              }
              this.addFlag = false;
              this.$emit("upDate");
            });
          } else {
            this.$message.error(res.message);
          }
        }
      });
    }
  },
  created() {
    this.handleGetCityList();
  },
  mounted() {}
};
</script>

<style scoped>
</style>