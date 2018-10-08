<template>
  <div class="dictionary-add-type">
    <div class="title-box">
      <span>类型名称：</span>
      <el-input class="mr-10" style="width:180px;" v-model="searchTypeName"></el-input>
      <span>类型编码：</span>
      <el-input class="mr-10" style="width:180px;" v-model="searchTypeCode"></el-input>
      <el-button @click="handleSearch" type="primary">搜索</el-button>
      <div class="fr">
        <el-button @click="handleAddType" type="primary">新增类型</el-button>
      </div>
    </div>
    <div class="table-box">
      <el-table
      :data="tableData"
      border
      style="width: 100%">
        <el-table-column
          prop="typeName"
          label="类型名称"
        >
        </el-table-column>
        <el-table-column
          prop="typeCode"
          label="类型编码"
        >
        </el-table-column>
        <el-table-column
          prop="orderVal"
          label="排序值"
        >
        </el-table-column>
        <el-table-column
          prop="typeDesc"
          label="类型说明"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
        >
          <template slot-scope="scope">
            <!--{{scope.row.createTime | TimeMoment}}-->
            {{isIE ? scope.row.createTime.replace(new RegExp(/-/gm) ,"/") : scope.row.createTime}}
          </template>
        </el-table-column>
        <el-table-column
          prop="createUser"
          label="创建人"
        >
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button @click="handleEditType(scope.row)" type="text">编辑</el-button>
            <el-button class="color-red" @click="handleDelete(scope.row)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      class="m"
      v-if="total > 0"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :total="total"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
    <!-- 新增类型 dialog -->
    <el-dialog
      :title="title"
      width="400px"
      @close="handleDialogClose"
      :visible.sync="dialogVisible"
    >
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="类型名称" prop="typeName">
            <el-input v-model="ruleForm.typeName"></el-input>
          </el-form-item>
          <el-form-item label="类型编码" prop="typeCode">
            <el-input :disabled="addType === 'edit' ? true : false" v-model="ruleForm.typeCode"></el-input>
          </el-form-item>
          <el-form-item label="排序值">
            <el-input type="number" v-model="ruleForm.orderVal"></el-input>
          </el-form-item>
          <el-form-item label="类型说明">
            <el-input :autosize="{ minRows: 2, maxRows: 4}" type="textarea" v-model="ruleForm.typeDesc"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDialogClose">取 消</el-button>
        <el-button type="primary" @click="handleDialogSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    dictionaryTypeList,
    dictionaryTypeAddOrEdit,
    dictionaryTypeDelete,
  } from '@/api/pages/mainPage/systemManagement'
  import api from '@/axios/api.js'
  import '@/assets/styles/reset.scss';
  export default {
    data() {
      return ({
        dialogVisible : false,
        searchTypeName : '',
        searchTypeCode : '',
        // table 数据
        tableData : [],
        // 当前页数
        currentPage : 1,
        // 每页展示数量
        pageSize : 10,
        // 总页数
        total : 0,
        ruleForm : {
          // 类型名称
          typeName : '',
          // 类型编码
          typeCode : '',
          // 排序值
          orderVal : '',
          // 类型说明
          typeDesc : '',
        },
        isIE:false,
        rules : {
          typeName : [
            { required: true, message: '请输入类型名称' , trigger : 'blur'},
          ],
          typeCode : [
            { required: true, message: '请输入类型编码' , trigger : 'blur'},
          ],
        },
        title : '',
        addType : '',
      })
    },
    created(){
      if(this.IEVersion() == '-1' || this.IEVersion() == 'edge'){
        this.isIE = false;
      }else{
        this.isIE = true;
      }
    },
    mounted() {
      this.initTableList();
    },
    methods: {
      initTableList() {
        dictionaryTypeList({
          pageNum : this.currentPage,
          pageSize : this.pageSize,
          typeName : this.searchTypeName,
          typeCode : this.searchTypeCode,
        }).then((res) => {
          if(res.status === 200){
            this.tableData = res.data.list;
            this.total = res.data.total;
          }
        });
      },
      IEVersion() {
            var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
            var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
            var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
            var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
            if(isIE) {
                var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                var fIEVersion = parseFloat(RegExp["$1"]);
                if(fIEVersion == 7) {
                    return 7;
                } else if(fIEVersion == 8) {
                    return 8;
                } else if(fIEVersion == 9) {
                    return 9;
                } else if(fIEVersion == 10) {
                    return 10;
                } else {
                    return 6;//IE版本<=7
                }
            } else if(isEdge) {
                return 'edge';//edge
            } else if(isIE11) {
                return 11; //IE11
            }else{
                return -1;//不是ie浏览器
            }
        },
      handleSizeChange(val) {
        this.pageSize = val;
        this.currentPage = 1;
        this.initTableList();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.initTableList();
      },
      handleAddType() {
        this.dialogVisible = true;
        this.title = '类型新增';
        this.addType = 'add';
      },
      handleEditType(row) {
        this.dialogVisible = true;
        this.title = '类型编辑';
        this.addType = 'edit';
        this.editData = row;
        // 回显数据
        let {typeName , typeCode , orderVal , typeDesc} = row;
        this.ruleForm = {typeName , typeCode , orderVal , typeDesc};
      },
      handleDialogClose() {
        this.dialogVisible = false;
        this.$refs.ruleForm.resetFields();
        this.ruleForm.typeName = '';
        this.ruleForm.typeCode = '';
        this.ruleForm.orderVal = '';
        this.ruleForm.typeDesc = '';
      },
      handleDialogSubmit() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let form = {...this.ruleForm}
            if(this.addType === 'edit'){
              form.id = this.editData.id;
            }
            dictionaryTypeAddOrEdit(form).then((res) => {
              if(res.status === 200){
                this.$message.success('保存成功');
                this.handleDialogClose();
                this.currentPage = 1;
                this.initTableList();
              }
            });
          } else {

          }
        });
      },
      handleDelete(row) {
        this.$confirm('确定删除改类型?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          dictionaryTypeDelete(row).then((res) => {
            if(res.status === 200){
              this.$message.success('删除成功');
              this.currentPage = 1;
              this.initTableList();
            }
          });
        }).catch(() => {
        });
      },
      handleSearch() {
        this.currentPage = 1;
        this.initTableList();
      },
    }
  }
</script>

<style lang="scss" scoped>

.dictionary-add-type{
  .title-box{
    margin: 15px 0;
  }
  .m{
    margin: 15px 0;
  }
}

</style>
