<template>
  <div id="pushPlate">
    <!-- 头部搜索form -->
    <div class="searchForm">
      <el-form :inline="true" :model="formInline">
        <el-form-item label="城市公司">
          <el-select :clearable="cityCompanyOption.length > 1" v-model="formInline.cityCompany">
            <el-option v-for="(item, index) in cityCompanyOption" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-select  :clearable="projectNameOption.length > 1" v-model="formInline.projectName">
            <el-option v-for="(item, index) in projectNameOption" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 推盘列表 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">推盘列表</span>
        <div style="float: right">
          <el-button v-has="'trd:batch:add'" type="primary" @click="addReleases">新增推盘</el-button>
        </div>
      </div>
      <div class="text item">
        <el-table :data="releasesList" border style="width: 100%">
          <el-table-column type="index" label="序号" width="50"  ></el-table-column>
          <el-table-column prop="projectCityName" label="城市公司"   show-overflow-tooltip></el-table-column>
          <el-table-column prop="projectName" label="项目名称"   show-overflow-tooltip></el-table-column>
          <el-table-column prop="batchCode" label="推盘批次"  show-overflow-tooltip ></el-table-column>
          <el-table-column prop="batchName" label="推盘批次名称"   show-overflow-tooltip></el-table-column>
          <el-table-column prop="raiseStatusText" label="是否开启认筹" width="100" :formatter="fmtNull"  ></el-table-column>
          <!-- <el-table-column prop="isOpenIdentification" label="是否开盘" width="100"></el-table-column> -->
          <el-table-column label="操作" width="350"  >
            <template slot-scope="scope">
              <el-row>
                <!-- <el-col :span="8"> -->
                  <el-button @click.stop.prevent="handleLook(scope.row)" type="text" size="small" v-has="'trd:batch:view'">查看</el-button>
                  <el-button @click.stop.prevent="handleRedact(scope.row)" type="text" size="small" v-has="'trd:batch:modify'">编辑</el-button>
                <!-- </el-col> -->
                <!-- <el-col :span="8"> -->
                  <el-button @click.stop.prevent="handleDelect(scope.row)" type="text" size="small" v-has="'trd:batch:del'">作废</el-button>
                <!-- </el-col> -->
                <!-- <el-col :span="8"> -->
                  
                <!-- </el-col> -->
              </el-row>
              <el-row>
                <el-button @click.stop.prevent="IdentificationSetting(scope.row)" type="text" size="small" v-has="'trd:rc:set'">认筹设置</el-button>
                <!-- <el-col :span="8"> -->
                  <el-button @click.stop.prevent="SubscribeSetting(scope.row)" type="text" size="small" v-has="'trd:rg:dj:set'">认购设置</el-button>
                <!-- </el-col> -->
                <!-- <el-col :span="8"> -->
                  <el-button @click.stop.prevent="MarketingControl(scope.row)" type="text" size="small" v-has="'trd:xk:view'">房源销控</el-button>
                <!-- </el-col> -->
                <!-- <el-col :span="8"> -->
                  <el-button @click.stop.prevent="ElectronicTrading(scope.row)" type="text" size="small">电子开盘设置</el-button>
                <!-- </el-col> -->
              </el-row>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="total>0"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
    <!-- 查看推盘弹框 -->
    <el-dialog title="查看推盘" :visible.sync="lookReleasesFlag" width="70%" v-if="lookReleasesFlag">
      <look-releases :row="row"></look-releases>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="lookReleasesFlag = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增推盘弹框 -->
    <el-dialog title="新增推盘" :visible.sync="addReleasesFlag" width="70%" v-if="addReleasesFlag">
      <add-releases ref="addReleasesRef" :row="row"></add-releases>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addReleasesFlag = false">取 消</el-button>
        <el-button type="primary" @click="handleAddReleases">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑推盘弹框 -->
    <el-dialog title="编辑推盘" :visible.sync="redactReleasesFlag" width="70%" v-if="redactReleasesFlag">
      <redact-releases ref="redactReleasesRef" :row="row"></redact-releases>
      <span slot="footer" class="dialog-footer">
        <el-button @click="redactReleasesFlag = false">取 消</el-button>
        <el-button type="primary" @click="handleRedactReleases">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 认筹设置弹框 -->
    <el-dialog title="设置认筹" :visible.sync="identificationSettingFlag" width="500px" v-if="identificationSettingFlag">
      <identification-setting ref="identificationSettingRef" :row="row"></identification-setting>
      <span slot="footer" class="dialog-footer">
        <el-button @click="identificationSettingFlag = false">取 消</el-button>
        <el-button type="primary" @click="handleIdentificationSetting">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 认购设置弹框 -->
    <el-dialog title="设置认购" :visible.sync="subscribeSettingFlag" width="500px" v-if="subscribeSettingFlag">
      <subscribe-setting ref="subscribeSettingRef" :row="row"></subscribe-setting>
      <span slot="footer" class="dialog-footer">
        <el-button @click="subscribeSettingFlag = false">取 消</el-button>
        <el-button type="primary" @click="handleSubscribeSetting">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 房源销控弹框 -->
    <el-dialog title="房源销控" :visible.sync="smarketingControlFlag" width="900px" v-if="smarketingControlFlag">
      <marketing-control :row="row" ref="smarketingControlRef"></marketing-control>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleMarketingControl('FORSALE')">设为可售</el-button>
        <el-button type="primary" @click="handleMarketingControl('SALESCONTROL')">设为不可售</el-button>
      </span>
    </el-dialog>
    <!-- 电子开盘弹框 -->
    <el-dialog :visible.sync="electronicTradingFlag" width="1100px" v-if="electronicTradingFlag">
      <span slot="title" class="dialog-footer">
        <span class="standardTitle" style="margin-right: 20px">电子开盘设置</span>
        <span>推盘批次名称:{{row.projectCityName+'->'+row.projectName+'->'+row.devstagesName+'->'+row.batchName}}</span>
      </span>
      <electronic-trading :row="row"></electronic-trading>
    </el-dialog>
  </div>
</template>

<script>
import lookReleases from "./lookReleases"; // 查看推盘
import addReleases from "./addReleases"; // 新增推盘
import redactReleases from "./redactReleases"; // 编辑推盘
import identificationSetting from "./IdentificationSetting"; // 认筹设置
import subscribeSetting from "./subscribeSetting"; // 认购设置
import marketingControl from "./MarketingControl"; // 房源销控
import electronicTrading from "./ElectronicTrading"; // 电子开盘
import {
  getCityList,
  getPrjByCityId,
  getPushPlates,
  getPushPlateViewsDto,
  savePushPlate,
  upatePushPlate,
  deletePlushPlate,
  saveRaiseSetting,
  saveSubscripeSetting,
  setHouseStatus
} from "@/api/pages/mainPage/transactionManagement/pushplateManagement/index.js";

export default {
  components: {
    lookReleases,
    addReleases,
    redactReleases,
    identificationSetting,
    subscribeSetting,
    marketingControl,
    electronicTrading
  },
  data() {
    return {
      /*********顶部搜索form数据***********/
      cityCompanyOption: [],
      projectNameOption: [],
      formInline: {
        // 头部搜索Form表单
        cityCompany: null, // 城市公司
        projectName: null // 项目名称
      },
      /*************推盘列表************/
      releasesList: [],
      /*********控制弹框打开关闭********/
      lookReleasesFlag: false, // 查看推盘
      addReleasesFlag: false, // 新增推盘
      redactReleasesFlag: false, // 编辑推盘
      identificationSettingFlag: false, // 认筹设置
      subscribeSettingFlag: false, // 认购设置
      smarketingControlFlag: false, // 房源销控
      electronicTradingFlag: false, // 电子开盘
      /*********传递给子组件的数据***********/
      row: {}, // table该行的数据
      currentPage: 1,// 分页当前页数
      total: 0,
      pageSize: 10, // 分页数量
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
            this.formInline.cityCompany = this.cityCompanyOption[0].id;
        }else{
            //获取城市公司列表
            getCityList().then(res => {
                if (res.status === 200) {
                    this.cityCompanyOption = res.data;
                    this.formInline.cityCompany = this.cityCompanyOption[0].id;
                }
            });
        }
    },
    handleGetPrjByCityId(params) {// 通过城市公司ID获取项目
        let userInfo = JSON.parse(sessionStorage.getItem('user-info'));
        if( userInfo.projects && userInfo.projects[0] && userInfo.cityId ){
            this.projectNameOption= userInfo.projects;
            this.projectNameOption.map(item=>{
                item.name = item.projectName
            })
            if( this.projectNameOption[0] ){
              this.formInline.projectName = this.projectNameOption[0].id;
              this.handleSearch()
            }
        }else{
            getPrjByCityId(params).then(res => {
                if (res.status === 200) {
                    this.projectNameOption = res.data;
                    if( this.projectNameOption[0] ){
                      this.formInline.projectName = this.projectNameOption[0].id;
                      this.handleSearch()
                    }
                }
            });
        }
    },
    handleSearch() {
      // 点击顶部搜索按钮
      let params = {
        projectCityId: this.formInline.cityCompany,
        projectId: this.formInline.projectName,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      };
      getPushPlates(params).then(res => {
        if (res.status == 200) {
          this.releasesList = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    fmtNull(row, column) {
      const arr = row[column.property];
      if (arr === undefined || arr === null || arr === "") {
        return "未开启";
      } else {
        return arr;
      }
    },
    addReleases() {
      // 打开新增推盘弹框
      this.addReleasesFlag = true;
    },
    handleLook(row) {
      // 打开查看推盘详情弹框
       
      this.row = row;
      this.lookReleasesFlag = true;
    },
    /**********分页相关************/
    handleSizeChange(val) {
      this.pageSize = val;
      this.handleSearch();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.handleSearch();
    },
    /***********推盘列表操作按钮*****************/
    handleRedact(row) {
      // 编辑
      this.row = row; // 将该行数据传递给子组件
      this.redactReleasesFlag = true;
    },
    handleDelect(row) {
      // 作废
      this.$confirm("此操作将永久作废该批次, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = { id: row.id };
          deletePlushPlate(this.Qs.stringify(data)).then(res => {
            if (res.status == 200) {
              this.$message({
                type: "success",
                message: "作废成功!",
                showClose: true
              });
              this.handleSearch();
            }else{
              this.$message.error(res.message)
            }
          });
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消作废"
          // });
        });
    },
    IdentificationSetting(row) {
      // 认筹设置
      this.row = row; // 将该行数据传递给子组件
      this.identificationSettingFlag = true;
    },
    SubscribeSetting(row) {
      // 认购设置
      this.row = row; // 将该行数据传递给子组件
      this.subscribeSettingFlag = true;
    },
    MarketingControl(row) {
      // 房源销控
      this.row = row; // 将该行数据传递给子组件
      this.smarketingControlFlag = true;
    },
    ElectronicTrading(row) {
      // 电子开盘

       
      this.row = row; // 将该行数据传递给子组件
      this.electronicTradingFlag = true;
    },
    /**********弹框中的完成按钮***********/
    handleAddReleases() {
      // 新增推盘
      let data = this.$refs.addReleasesRef.form;
       
      if( !data.projectId ){
        this.$message.error('请选择项目');
        return
      }
      if( !data.devstagesId ){
        this.$message.error('请选择分期');
        return
      }
      if( !data.batchShortCode ){
        this.$message.error('请输入推盘批次编号');
        return
      }
      if( !data.batchName ){
        this.$message.error('请输入推盘批次名称');
        return
      }
      
      data.bathBuildList = this.$refs.addReleasesRef.arr;
      savePushPlate(data).then(res => {
        if (res.status == 200) {
          this.addReleasesFlag = false;
          this.handleSearch();
          this.$message({
            type: "success",
            message: "添加成功!",
            showClose: true
          });
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    handleRedactReleases() {
      // 编辑推盘
      let data = this.$refs.redactReleasesRef.form;
       
      if( !data.projectId ){
        this.$message.error('请选择项目');
        return
      }
      if( !data.batchShortCode ){
        this.$message.error('请输入推盘批次编号');
        return
      }
      if( !data.batchName ){
        this.$message.error('请输入推盘批次名称');
        return
      }
      data.bathBuildList = this.$refs.redactReleasesRef.arr;
      upatePushPlate(data).then(res => {
        if (res.status != 200) {
          this.$message({
            type: "error",
            message: res.message
          });
          return;
        }
        this.redactReleasesFlag = false;
        this.handleSearch();
        this.$message({
          type: "success",
          message: "修改成功!",
          showClose: true
        });
      });
    },
    handleIdentificationSetting() {
      // 认筹
      saveRaiseSetting(this.$refs.identificationSettingRef.form).then(res => {
        if (res.status != 200) {
          this.$message({
            type: "error",
            message: res.message
          });
          return;
        }
        this.identificationSettingFlag = false;
        this.handleSearch();
        this.$message({
          type: "success",
          message: "添加成功!",
          showClose: true
        });
      });
    },
    handleSubscribeSetting() {
      // 认购
      saveSubscripeSetting(this.$refs.subscribeSettingRef.form).then(res => {
        if (res.status != 200) {
          this.$message({
            type: "error",
            message: res.message
          });
          return;
        }
        this.subscribeSettingFlag = false;
        this.handleSearch();
        this.$message({
          type: "success",
          message: "添加成功!",
          showClose: true
        });
      });
    },
    handleMarketingControl(value) {
      // 房源销控
      // this.smarketingControlFlag = false;
      console.log(this.$refs.smarketingControlRef.buildInfo)
      
      let floorList = this.$refs.smarketingControlRef.buildInfo.buildView;
      let houseIdList = [];
      floorList.map(item=>{
        for( let key in item ){
          if( key !== 'floorName' && item[key] ){
            let list = item[key].map(item2=>{
              if( item2.isChecked ){
                return item2.id
              }
            })
            houseIdList.push(...list)
          }
        }
      })
      console.log(houseIdList);
      let str = '';
      houseIdList.map((item, index)=>{
        if( index !== houseIdList.length - 1 ){
          str = str + item + ',';
        }else{
          str = str + item;
        }
       
      })
      let data = {houseIds: str, houseStatus: value};
      data = this.Qs.stringify(data)
      setHouseStatus(data).then(res=>{
         ;
        if( res.status === 200 ){
          this.$message({
            type: "success",
            message: "添加成功!",
            showClose: true
          });
          this.$refs.smarketingControlRef.handlegetHouseViewByBuildId({ buildId: this.$refs.smarketingControlRef.build })
        }else{
          this.$message.error(res.message);
        }
      })
    },
    handleElectronicTradingFlag() {
      // 电子开盘
      this.electronicTradingFlag = false;
    }
  },
  created() {
    this.handleGetCityList();
    // this.handleSearch();
  },
  watch: {
    "formInline.cityCompany": function(e) {
      this.formInline.projectName = null;
      this.handleGetPrjByCityId({ id: e });
    }
  }
};
</script>

<style scoped>
.searchForm {
  height: 68px;
  background: rgba(255, 255, 255, 1);
  border-radius: 6px;
  box-sizing: border-box;
  padding: 20px 25px;
  margin-bottom: 20px;
}
</style>