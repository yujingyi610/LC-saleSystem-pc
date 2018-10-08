<template>
  <div>
    <div class="menuManageHeader">
      <el-button type="primary" icon="el-icon-circle-plus" class = "menuMangBtn"  @click = "addMenu" >添加</el-button>
      <el-button type="primary" icon="el-icon-edit" class = "menuMangBtn" @click = "editorMenu">编辑</el-button>
      <el-button type="primary" icon="el-icon-delete" class = "menuMangBtn" @click = "deleteMenu" >删除</el-button>
    </div>

    <div class="menuManageContent">
      <el-row :gutter="24">

        <el-col :span="8">
          <div class="menuList">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
            <el-tree :expand-on-click-node="false" class="filter-tree" :data="menuList" :props="defaultProps" :filter-node-method="filterNode"
              ref="tree" accordion  @node-click = "handleNodeClick" >
            </el-tree>
          </div>
        </el-col>

        <el-col :span="16" v-show="showCard">
          <div class="operationArea" >
            <el-form ref="form" :model="form" :rules="formRules">

              <el-form-item label="菜单编码" prop="code" :label-width="formLabelWidth">
                <el-input v-model="form.code" auto-complete="off" class = "modlaIput" ></el-input>
              </el-form-item>

              <el-form-item label="菜单名称" prop="name" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off" class = "modlaIput" ></el-input>
              </el-form-item>

              <el-form-item prop="parentId" label="父ID" :label-width="formLabelWidth">
                <el-input :disabled="true" v-model="form.parentId" auto-complete="off" class = "modlaIput" ></el-input>
              </el-form-item>

              <el-form-item prop="href" label="链接" :label-width="formLabelWidth">
                <el-input v-model="form.href" auto-complete="off" class = "modlaIput" ></el-input>
              </el-form-item>

              <el-form-item prop="icon" label="图标" :label-width="formLabelWidth">
                <el-input v-model="form.icon" auto-complete="off" class = "modlaIput" ></el-input>
              </el-form-item>

              <el-form-item prop="orderVal" label="排序值" :label-width="formLabelWidth">
                <el-input v-model="form.orderVal" auto-complete="off" class = "modlaIput" ></el-input>
              </el-form-item>

              <el-form-item prop="type" label="类型" :label-width="formLabelWidth">
                <el-input v-model="form.type" auto-complete="off" class = "modlaIput" ></el-input>
              </el-form-item>

              <el-form-item label="平台" :label-wedth="formLabelWidth" class="ml-100">
                <el-checkbox true-label="1" false-label="0" id="select-app" v-model="form.appFlag">APP</el-checkbox>
                <el-checkbox true-label="1" false-label="0" id="select-pc" v-model="form.pcFlag">PC</el-checkbox>
              </el-form-item>

              <el-form-item prop="remark" label="说明" :label-width="formLabelWidth">
                <el-input v-model="form.remark" auto-complete="off" class = "modlaIput" ></el-input>
              </el-form-item>
            </el-form>

            <div class = "operationAreaFooter" >
              <el-button type="primary" class = "menuMangBtn" @click="handleSaveMenuMsg">保存</el-button>
              <el-button class="cancelBtn" @click = "closeEditor">取消</el-button>
            </div>
          </div>

          <div class="menuBtnManage">
            <h3>按钮或资源</h3>
            <el-button type="primary" icon="el-icon-edit"  class = "menuMangBtn"  @click = "handleBtnAdd">添加</el-button>
            <el-table :data="btnResourcesTableData" border style="overflow:auto" class="btnManagementTable" >
              <el-table-column prop="code" label ="资源编码" align ="center"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="name" label="资源名称"  align ="center"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="action" label="操作" align ="center" >
                <template slot-scope="scope" class="userManagement_actionBox">
                  <el-button type="text" size="mini" @click = "handleEditorBtn(scope.$index, scope.row)">编辑</el-button>
                  <el-button size="mini" type="text" @click = "handleDeleteBtn(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

        </el-col>
      </el-row>
    </div>

    <!--按钮编辑和添加莫泰窗口-->
    <el-dialog @close="resetModelForm" :title="btnEditor === 'btnEditor' ? '编辑' : '新增'" :visible.sync="dialogFormVisible">
      <el-form ref="modelForm" :rules="modelFormRules" :model="modelForm">
        <el-form-item prop="code" label="资源编码" :label-width="formLabelWidth">
          <el-input v-model="modelForm.code" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item prop="name" label="资源名称" :label-width="formLabelWidth">
          <el-input v-model="modelForm.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item prop="type" label="资源类型" :label-width="formLabelWidth">
          <el-input v-model="modelForm.type" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item prop="url" label="链接" :label-width="formLabelWidth">
          <el-input v-model="modelForm.url" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item prop="comment" label="菜单ID" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="modelForm.comment" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item prop="method" label="资源请求类型" :label-width="formLabelWidth">
          <el-input v-model="modelForm.method" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="平台" :label-wedth="formLabelWidth" class="ml-100">
          <el-checkbox true-label="1" false-label="0" id="check-app" v-model="modelForm.appFlag">APP</el-checkbox>
          <el-checkbox true-label="1" false-label="0" id="check-pc" v-model="modelForm.pcFlag">PC</el-checkbox>
        </el-form-item>

        <el-form-item prop="orderVal" label="排序值" :label-width="formLabelWidth">
          <el-input v-model="modelForm.orderVal" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item prop="remark" label="说明" :label-width="formLabelWidth">
          <el-input v-model="modelForm.remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click = "handleChangeBtn" >确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    menuManagementTree,
    menuManagementAddMenu,
    menuManagementEditMenu,
    menuManagementDeletemenu,
    menuManagementBtnOrResourcesList,
    menuManagementBtnOrResourcesAdd,
    menuManagementBtnOrResourcesEdit,
    menuManagementBtnOrResourcesDelete,
  } from '@/api/pages/mainPage/systemManagement'
  import axios from "@/axios/api.js";
  export default {

    mounted() {
      console.log(this.$parent)
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      form:function(){//通过监听form变化控制平台回显
        this.displayHandle('select-app','select-pc');
      },
      modelForm:function(){
        this.displayHandle('check-app','check-pc');
      }
    },

    created(){

    },
    mounted() {
      this.initTree();
    },
    methods: {
      initTree() {
        menuManagementTree().then((res) => {
          this.menuList= res;
        });
      },
      initTable() {
        let id = this.currentTreeNodeDom.data.id || this.addData.id;
        menuManagementBtnOrResourcesList({
          menuId : id,
        }).then((res) => {
          if(res.status === 200){
            this.btnResourcesTableData = res.data;
          }
        });
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },

      addMenu(){
        this.showCard = true;
        this.currentOperationType = "ADD";
        this.resetForm();

        //this.currentTreeNodeDom = null;
        this.btnResourcesTableData = [];
        this.addData = null;
        this.form.parentId = this.currentTreeNodeDom ? this.currentTreeNodeDom.data.id : '';
      },
      editorMenu(){
        if(!this.currentTreeNodeDom){
          return;
        }
        this.showCard = true;
        this.currentOperationType = "EDITOR";
        // 回显数据
        this.echoMenu();
        // table数据
        this.initTable();
      },
      // 回显 菜单数据
      echoMenu() {
        let data = this.currentTreeNodeDom.data;
        let {code , name , parentId , href , icon , orderVal , type , appFlag , pcFlag , remark, id} = data;
        this.form = {code , name , parentId , href , icon , orderVal , type , appFlag , pcFlag , remark};
        this.addData = null;
      },
      deleteMenu(){
        if(this.currentTreeNodeDom){
          this.$confirm('确认删除该菜单?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let id = this.currentTreeNodeDom.data.id;
            menuManagementDeletemenu({
              id : id,
            }).then((res) => {
              if(res.status === 200){
                this.$message.success('删除成功');
                this.initTree();
                this.closeEditor();
              }
            });
          }).catch(() => {
          });
        }
      },
      /************处理树的点击事件*****************/
      handleNodeClick(data,node) {
        this.currentTreeNode = data; //获取树的data节点
        this.currentTreeLevel = node.level;
        this.currentTreeNodeDom = node;// 获取树的dom节点
        if(this.currentOperationType === "EDITOR"){
          // 回显数据
          this.echoMenu();
          // table数据
          this.initTable();
        }
         
        //console.log(node);
      },
      /**************保存按钮点击事件****************/
      handleSaveMenuMsg() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            let sendUrl , message;
            let form = {...this.form};
            if( this.currentOperationType === "ADD" ){
              sendUrl = '/api/sys/menu/save';
              message = '新增成功';

            }else if (this.currentOperationType === "EDITOR"){
              let id = this.currentTreeNodeDom.data.id;
              sendUrl = `/api/sys/menu/update/${id}`;
              message = '修改成功';
              form.id = id;
            }

            let callback = (res) => {
              if(res.status === 200){
                this.$message.success(message);
                this.addData = res.data;
                this.initTree();
                this.closeEditor();
              }
            }
            if(this.currentOperationType === 'ADD'){
              menuManagementAddMenu(form).then(callback.bind(this));
            }else{
              menuManagementEditMenu(form).then(callback.bind(this));
            }
          }
        });
      },
      resetForm() {
        this.$refs.form.resetFields();
      },
      /**************取消按钮点击事件****************/
      closeEditor() {
        this.showCard = false;
        this.resetForm();
        this.currentTreeNodeDom = null;
      },
      /**************清除表单缓存实例***************/
      clearForm(){
        this.form.code =  "";
        this.form.label = "";
        this.form.parentId = "";
        this.form.icon =  "";
        this.form.href =  "";
        this.form.type =  "";
        this.form.appFlag = "";
        this.form.pcFlag = "";
        this.form.sort =  "";
        this.form.desc =  "";
        this.form.component =  "";
      },
      /***********编辑页面按钮***************/
      handleEditorBtn(index,row){
        this.dialogFormVisible = true;
        this.btnEditor = "btnEditor";
        this.currentBtnChangeIndex = index;
        this.modelForm = {...row};
        let id = this.currentTreeNodeDom.data.id || this.addData.id;
        this.modelForm.comment = id;
        this.tableRow = row;
      },
      handleBtnAdd(){
        if(!this.addData && !this.currentTreeNodeDom){
          return;
        }

        this.dialogFormVisible = true;
        this.btnEditor = "btnAdd";
        let id = this.currentTreeNodeDom.data.id || this.addData.id;
        this.modelForm.comment = id;
      },
      handleDeleteBtn(index,row){
        this.$confirm('确认删除该按钮或资源?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          menuManagementBtnOrResourcesDelete({
            id : row.id,
          }).then((res) => {
            if(res.status === 200){
              this.$message.success('删除成功');
              this.initTable();
            }
          });
        }).catch(() => {

        });
      },
      handleChangeBtn(){
        this.$refs.modelForm.validate((valid) => {
          if (valid) {
            let sendUrl , message;
            let form = {...this.modelForm};
            if(this.btnEditor === "btnAdd"){
              sendUrl = '/api/sys/element/save';
              message = '新增成功';
            }else if( this.btnEditor === "btnEditor"){
              sendUrl = `/api/sys/element/update/${id}`;
              message = '修改成功';
              let id = this.tableRow.id;
              form.id = id;
            }
            let menuId = this.currentTreeNodeDom.data.id || this.addData.id
            form.menuId = menuId;

            let callback = (res) => {
              if(res.status === 200){
                this.$message.success(message);
                this.resetModelForm();
                this.dialogFormVisible = false;
                this.initTable();
              }
            }
            if(this.btnEditor === "btnAdd"){
              menuManagementBtnOrResourcesAdd(form).then(callback.bind(this));
            }else{
              menuManagementBtnOrResourcesEdit(form).then(callback.bind(this));
            }


          }
        });
      },
      resetModelForm() {
        this.$refs.modelForm.resetFields();
      },
      /*****************************平台回显控制***********************************/
      displayHandle:function(appid,pcid){
        let app = document.getElementById(appid);
        let pc = document.getElementById(pcid);
        if(this.form.appFlag == 1){
          app.className += 'is-checked';
          app.setAttribute('aria-checked',true);
          app.getElementsByClassName('el-checkbox__input')[0].className +=' is-checked';
        }else{
          app.classList.remove('is-checked');
          app.removeAttribute('aria-checked');
          app.getElementsByClassName('el-checkbox__input')[0].classList.remove('is-checked');
        }
        if(this.form.pcFlag == 1){
          pc.className += ' is-checked';
          pc.setAttribute('aria-checked',true);
          pc.getElementsByClassName('el-checkbox__input')[0].className +=' is-checked'
        }else{
          pc.removeAttribute('aria-checked');
          pc.classList.remove('is-checked');
          pc.getElementsByClassName('el-checkbox__input')[0].classList.remove('is-checked');
        }
      }
    },
    data() {
      return {
        filterText: '',
         menuList: [],

        defaultProps: {
          children: 'children',
          label: 'label'
        },

        form: { //编辑区填写的内容
          code : '',
          name : '',
          parentId : '',
          href : '',
          icon : '',
          orderVal : '',
          type : '',
          pcFlag : '',
          appFlag : '',
          remark : '',
        },
        formLabelWidth: '100px',
        kindOptions: [
          {
            value: 'APP',
            label: 'APP'
          },
          {
            value: 'console',
            label: 'console'
          }
        ],
        showCard:false ,//编辑卡的显隐标识
        currentOperationType:"",
        currentTreeLevel:undefined, //点击的树节点的层级 1,2,3
        currentTreeNode:null,//记录被点击的树的节点
        currentTreeNodeDom:null,
        preNodeID:30,
        btnResources: '', //按钮资源搜索
        btnResourcesTableData:[ //按钮资源信息
        ],
        dialogFormVisible: false,
        modelForm:{
          code : '',
          name : '',
          type : '',
          parentId : '',
          url : '',
          comment : '',
          method : '',
          orderVal : '',
          remark : '',
        },
        btnChangeState: "", //按钮改变时的状态编辑和删除（btnEditor，btnDelete）
        currentBtnChangeIndex:undefined,

        btnEditor : '',
        formRules : {
          code : [
            { required: true, message: '请输入菜单编码' , trigger : 'blur'},
          ],
          name : [
            { required: true, message: '请输入菜单名称' , trigger : 'blur'},
          ],
        },
        modelFormRules : {
          code : [
            { required: true, message: '请输入资源编码' , trigger : 'blur'},
          ],
          name : [
            { required: true, message: '请输入资源名称' , trigger : 'blur'},
          ],
        },

      };
    }
  };
</script>

<style scoped>
  .menuManageHeader{
    height: 40px;
    margin-bottom: 10px;
  }
  .menuList{
    padding: 10px;
    border-radius: 5px;
  }
  .operationArea{
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #bfcbd9;
  }
  .menuMangBtn{
     background-color: #007440;
     border-color: #007440;
   }

  .menuList{
    border: 1px solid #bfcbd9;
  }

  .operationAreaFooter{
    padding: 10px 0 10px 80px;
  }

  .cancelBtn{
    margin-left: 40px;
  }

  .menuBtnManage{
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #bfcbd9;
  }

  .menuBtnManage>h3{
    font-weight: 100;
    font-size: 18px;
    margin-bottom: 10px;
  }

  .btnResourceInput{
    width: 200px;
  }

  .btnManagementTable{
    margin-top: 10px;
  }
  .ml-100 .el-form-item__label{
    width:100px;
  }
  .ml-100 .el-form-item__content{
    margin-left:100px;
  }

</style>
