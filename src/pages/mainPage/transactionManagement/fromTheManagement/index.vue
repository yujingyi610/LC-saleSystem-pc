<template>
  <!--    认筹管理       -->
  <div>
   
    <div class="main">
      <div class="main-header">
        <el-radio-group v-model="radio" style="float: left" @change="handleChangeTab">
          <el-radio-button label="DRAFT">草稿</el-radio-button>
          <el-radio-button label="SUBMIT">已提交</el-radio-button>
          <el-radio-button label="EFFECT">已生效</el-radio-button>
          <el-radio-button label="USED">已认购</el-radio-button>
          <el-radio-button label="RETURN">已退筹</el-radio-button>
          <el-radio-button label="CANCEL">已失效</el-radio-button>
        </el-radio-group>
        <el-button type="success" style="float: right" @click="hadnleAdd" v-has="'trd:rc:add'">新增认筹单</el-button>
      </div>
       <!-- 头部搜索form -->
    <div class="searchForm">
      <el-form :inline="true" :model="formInline">
        <el-form-item label="城市公司">
          <el-select v-model="formInline.cityCompanyId" :clearable="cityCompanyOption.length > 1">
            <el-option v-for="(item, index) in cityCompanyOption" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-select v-model="formInline.projectId" :clearable="projectOption.length > 1">
            <el-option v-for="(item, index) in projectOption" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推盘批次">
          <el-select v-model="formInline.batchId" clearable>
            <el-option v-for="(item, index) in batchOption" :key="index" :label="item.batchName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="formInline.customName"></el-input>
        </el-form-item>
        <el-form-item label="客户手机">
          <el-input v-model="formInline.tel"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
      <!-- 列表 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号"   width="50"></el-table-column>
        <el-table-column prop="batchCode" label="推盘批次"   min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="raiseCode" label="认筹号"   min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="customName" label="客户姓名"  ></el-table-column>
        <el-table-column prop="receiptMethod" label="收款方式"   show-overflow-tooltip></el-table-column>
        <el-table-column prop="sex" label="性别"   width="50"></el-table-column>
        <el-table-column prop="tel" label="手机号"   min-width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="certificateNo" label="证件号码"   min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="raiseAmount" label="认筹金额(￥)"   show-overflow-tooltip></el-table-column>
        <el-table-column prop="propertyConsultName" label="置业顾问" min-width="100"  show-overflow-tooltip ></el-table-column>
        <el-table-column label="操作" width="200"  >
          <template slot-scope="scope">
            <div v-show="scope.row.statusText === '草稿'">
              <el-button @click.stop.prevent="handleLookRow(scope.row)" type="text">查看</el-button>
              <el-button @click.stop.prevent="handleRedact(scope.row)" type="text" v-has="'trd:rc:edit'">编辑</el-button>
              <el-button @click.stop.prevent="handleDelect(scope.row)" type="text" v-has="'trd:rc:edit'">作废</el-button>
            </div>
            <div v-show="scope.row.statusText === '已提交'">
              <el-button @click.stop.prevent="handleLookRow(scope.row)" type="text">查看</el-button>
              <el-button v-show="scope.row.receiptMethod !== '本公司收款'" @click.stop.prevent="handleBusinessOperation(scope.row.id,'EFFECT','生效')" type="text" v-has="'trd:rc:active'">生效</el-button>
              <el-button @click.stop.prevent="handleBusinessOperation(scope.row.id,'CANCEL','作废')" type="text" v-has="'trd:rc:active'">作废</el-button>
            </div>
            <div v-show="scope.row.statusText === '已生效'">
              <el-button @click.stop.prevent="handleLookRow(scope.row)" type="text">查看</el-button>
              <el-button v-show="scope.row.receiptMethod !== '本公司收款'" @click.stop.prevent="handleBusinessOperation(scope.row.id,'RETURN','退认筹')" type="text" v-has="'trd:rc:back'">退认筹</el-button>
            </div>
            <div v-show="scope.row.statusText === '已认购'">
              <el-button @click.stop.prevent="handleLookRow(scope.row)" type="text">查看</el-button>
            </div>
            <div v-show="scope.row.statusText === '已退筹'">
              <el-button @click.stop.prevent="handleLookRow(scope.row)" type="text">查看</el-button>
            </div>
            <div v-show="scope.row.statusText === '已失效'">
              <el-button @click.stop.prevent="handleLookRow(scope.row)" type="text">查看</el-button>
              <el-button @click.stop.prevent="handleDelectYn(scope.row)" type="text" v-has="'trd:rc:back'">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-if="total > 0"
      @size-change="handleSizeChange" 
      @current-change="handleCurrentChange" 
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]" 
      :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
      <!-- <table-list ref="tableList"></table-list> -->
    </div>
    <!-- 新建认筹单弹框 -->
    <el-dialog title="新增认筹" :visible.sync="addRaiseFlag" width="70%" v-if="addRaiseFlag">
      <add-raise ref="addRaiseRef"></add-raise>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="submitForm('form')" v-has="'trd:rc:edit'">保存</el-button>
        <el-button type="success" @click="submitForm2('form')" v-has="'trd:rc:submit'">提交</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改认筹" :visible.sync="editRaiseFlag" width="70%" v-if="editRaiseFlag">
      <edit-raise ref="editRaiseRef" :row="row"></edit-raise>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="handleEditRaise" v-has="'trd:rc:edit'">保存</el-button>
        <el-button type="success" @click="handleUp" v-has="'trd:rc:submit'">提交</el-button>
      </span>
    </el-dialog>
    <el-dialog title="查看认筹" :visible.sync="raiseDialogFlag" width="70%" v-if="raiseDialogFlag">
      <raise-dialog :row="row"></raise-dialog>
      <span slot="footer" class="dialog-footer" v-if="row.statusText === '已提交'">
        <el-button type="success" @click="handleBusinessOperation(row.id,'CANCEL','作废')" v-has="'trd:rc:active'">作废</el-button>
        <el-button v-show="row.receiptMethod !== '本公司收款'" type="success" @click="handleBusinessOperation(row.id,'EFFECT','生效')" v-has="'trd:rc:active'">生效</el-button>
      </span>
      <span slot="footer" class="dialog-footer" v-if="row.statusText === '已生效'">
        <el-button v-show="row.receiptMethod !== '本公司收款'" type="success" @click="handleBusinessOperation(row.id,'RETURN','退认筹')" v-has="'trd:rc:back'">退认筹</el-button>
      </span>
      <span slot="footer" class="dialog-footer" v-else-if="row.statusText === '已失效'">
        <el-button type="success" @click="handleDelectYn(row)" v-has="'trd:rc:back'">删除</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import addRaise from "./addRaise";
import editRaise from "./editRaise";
import raiseDialog from "./dialog";
import {
  getCityList,
  getPrjByCityId,
  getBatchByPorject,
  getRaise,
  getRaiseByBatch,
  getRaiseByUser,
  getRaiseList,
  businessOperation,
  deleteRaise,
  deleteRaiseYn,
  saveRaise
} from "@/api/pages/mainPage/transactionManagement/fromTheManagement/index.js";

export default {
  components: {
    addRaise,
    editRaise,
    raiseDialog
  },
  data() {
    return {
      /*********顶部搜索form数据***********/
      cityCompanyOption: [],
      projectOption: [],
      batchOption: [],
      formInline: {
        // 头部搜索Form表单
        cityCompanyId: "", // 城市公司ID
        projectId: "", // 项目ID
        batchId: "", // 推盘批次
        customName: "", // 客户名称
        tel: "", // 客户手机
        status: "DRAFT"
      },
      tableData: [],
      radio: "DRAFT", // tap当前选中
      /**********页面展示控制*************/
      addRaiseFlag: false, // 新增认筹单弹框
      editRaiseFlag: false,
      raiseDialogFlag: false,
      row: {},
      currentPage: 1, // 分页当前页数
      total: 0,
      pageSize: 10 // 分页数量
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
          this.formInline.cityCompanyId = this.cityCompanyOption[0].id;
      }else{
          //获取城市公司列表
          getCityList().then(res => {
              if (res.status === 200) {
                  this.cityCompanyOption = res.data;
                  this.formInline.cityCompanyId = this.cityCompanyOption[0].id;
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
                this.formInline.projectId = this.projectOption[0].id;
            }
            
            this.handleSearch()
        }else{
            getPrjByCityId(params).then(res => {
                if (res.status === 200) {
                    this.projectOption = res.data;
                    if( this.projectOption[0] ){
                        this.formInline.projectId = this.projectOption[0].id;
                    }
                    this.handleSearch()
                }
            });
        }
    },
    handleGetBatchByPorject(params) {
      getBatchByPorject(params).then(res => {
        if (res.status == 200) this.batchOption = res.data;
      });
    },
    handleSearch() {
      // 点击顶部搜索按钮
      let data = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        projectCityId: this.formInline.cityCompanyId,
        projectId: this.formInline.projectId,
        batchId: this.formInline.batchId,
        customName: this.formInline.customName,
        tel: this.formInline.tel,
        status: this.formInline.status
      }
      getRaiseList(data).then(res => {
        if (res.status === 200) {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    handleChangeTab(value) {
      // 切换tab
      this.currentPage = 1;
      this.formInline.status = value;
      this.handleSearch();
    },
    handleLookRow(row) {
      //行点击11111111111111111111getRaise
      console.log('2222222222222222',row)
      getRaise({
        id:row.id
      }).then((res)=>{
        if(res.status === 200){
          console.log('获取详情',res)
          this.row = res.data;
          this.raiseDialogFlag = true;
        }
      })
     
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
    /*******新增认筹单弹框内按钮******/
    hadnleAdd() {
      this.addRaiseFlag = true;
    },
    submitForm(formName) {
      if( !this.$refs.addRaiseRef.form.customName ){
        this.$message.error('客户姓名不能为空');
        return
      }
      if( !this.$refs.addRaiseRef.form.certificateName ){
        this.$message.error('证件类型不能为空');
        return
      }
      if( !this.$refs.addRaiseRef.form.certificateNo ){
        this.$message.error('证件号码不能为空');
        return
      }
      if( this.$refs.addRaiseRef.form.certificateName === '居民身份证' && !this.idCard(this.$refs.addRaiseRef.form.certificateNo) ){
        this.$message.error('证件号码格式错误！');
        return
      }
      this.handleSaveRaise();
    },
    submitForm2(formName) {
      if( !this.$refs.addRaiseRef.form.customName ){
        this.$message.error('客户姓名不能为空');
        return
      }
      if( !this.$refs.addRaiseRef.form.certificateName ){
        this.$message.error('证件类型不能为空');
        return
      }
      if( !this.$refs.addRaiseRef.form.certificateNo ){
        this.$message.error('证件号码不能为空');
        return
      }
      if( this.$refs.addRaiseRef.form.certificateName === '居民身份证' && !this.idCard(this.$refs.addRaiseRef.form.certificateNo) ){
        this.$message.error('证件号码格式错误！');
        return
      }
      this.handleUp();
    },
    handleSaveRaise() {
      // 保存
      if( !this.$refs.addRaiseRef.form.customName ){
        this.$message.error('客户姓名不能为空');
        return
      }
      if( !this.$refs.addRaiseRef.form.certificateName ){
        this.$message.error('证件类型不能为空');
        return
      }
      if( !this.$refs.addRaiseRef.form.certificateNo ){
        this.$message.error('证件号码不能为空');
        return
      }
      if( this.$refs.addRaiseRef.form.certificateName === '居民身份证' && !this.idCard(this.$refs.addRaiseRef.form.certificateNo) ){
        this.$message.error('证件号码格式错误！');
        return
      }
      saveRaise(this.$refs.addRaiseRef.form).then(res => {
        if (res.status != 200) {
          this.$message({
            type: "error",
            message: res.message
          });
          return;
        }
        this.addRaiseFlag = false;
        this.handleSearch();
        this.$message({
          type: "success",
          message: "添加成功!",
          showClose: true
        });
      });
    },
    handleUp() {
      let data = {};
      if (this.addRaiseFlag) data = this.$refs.addRaiseRef.form;
      if (this.editRaiseFlag) data = this.$refs.editRaiseRef.form;
      if( data.certificateName === '居民身份证' && !this.idCard(data.certificateNo) ){
        this.$message.error('证件号码格式错误！');
        return
      }
      saveRaise(data).then(res => {
        if (res.status != 200) {
          this.$message({
            type: "error",
            message: res.message
          });
          return;
        }
        let d2 = { id: res.data };
        d2.operation = "SUBMIT";
        businessOperation(this.Qs.stringify(d2)).then(res => {
          if (res.status != 200) {
            this.$message({
              type: "error",
              message: res.message
            });
            return;
          }
          if (this.addRaiseFlag) this.addRaiseFlag = false;
          if (this.editRaiseFlag) this.editRaiseFlag = false;
          this.handleSearch();
          this.$message({
            type: "success",
            message: "提交成功!",
            showClose: true
          });
        });
      });
    },
    /**************草稿**********/
    handleRedact(row) {
      // 编辑
       
      getRaise({
        id:row.id
      }).then((res)=>{
        if(res.status === 200){
          console.log('获取详情',res)
          this.row = res.data;
          this.editRaiseFlag = true;
        }
      })
      
    },
    handleEditRaise() {
      if( this.$refs.editRaiseRef.form.certificateName === '居民身份证' && !this.idCard(this.$refs.editRaiseRef.form.certificateNo) ){
        this.$message.error('证件号码格式错误！');
        return
      }
      saveRaise(this.$refs.editRaiseRef.form).then(res => {
        if (res.status != 200) {
          this.$message({
            type: "error",
            message: res.message
          });
          return;
        }
        this.editRaiseFlag = false;
        this.handleSearch();
        this.$message({
          type: "success",
          message: "修改成功!",
          showClose: true
        });
      });
    },
    handleDelect(row) {
      this.$confirm("此操作将永久作废该认筹, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = { id: row.id };
          deleteRaise(this.Qs.stringify(data)).then(res => {
            if (res.status != 200) {
              this.$message({
                type: "error",
                message: res.message
              });
              return;
            }
            this.$message({
              type: "success",
              message: "作废成功!",
              showClose: true
            });
            this.handleSearch();
          });
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消作废"
          // });
        });
    },
    handleDelectYn(row) {
      this.$confirm("此操作将删除该认筹, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = { id: row.id };
          deleteRaiseYn(this.Qs.stringify(data)).then(res => {
            if (res.status != 200) {
              this.$message({
                type: "error",
                message: res.message
              });
              return;
            }
            this.$message({
              type: "success",
              message: "删除成功!",
              showClose: true
            });
            this.handleSearch();
          });
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除"
          // });
        });
    },
    /************ 业务操作 ***********/
    handleBusinessOperation(id, status, operations) {
      let data = {
        id: id,
        operation: status
      };
      this.$confirm("是否确认执行" + operations + "操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(_ => {
        businessOperation(this.Qs.stringify(data)).then(res => {
          if (res.status != 200) {
            this.$message({
              type: "error",
              message: res.message
            });
            return;
          }
          this.$message({
            type: "success",
            message: "操作成功!",
            showClose: true
          });
          this.raiseDialogFlag = false;
          this.handleSearch();
        });
      });
    }
  },
  created() {
    this.handleGetCityList();
    // this.handleSearch();

  },
  watch: {
    "formInline.cityCompanyId": function(e) {
      this.formInline.projectId = "";
      if( e )
      this.handleGetPrjByCityId({ id: e });
    },
    "formInline.projectId": function(e) {
      this.formInline.batchId = "";
      if( e )
      this.handleGetBatchByPorject({ projectId: e });
    }
  }
};
</script>

<style scoped>
.searchForm {
  /* height: 68px; */
  background: rgba(255, 255, 255, 1);
  border-radius: 6px;
  box-sizing: border-box;
  padding: 20px 25px;
}
.main {
  position: absolute;
  top: 0px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 20px;
  background: #fff;
  box-sizing: border-box;
  padding: 20px 25px;
  overflow: auto;
}
.main-header {
  overflow: hidden;
  margin-bottom: 20px;
}
</style>