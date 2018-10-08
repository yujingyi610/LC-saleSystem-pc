<template>
  <div id="subject">
    <div class="container left">
      <div class="min-head">
        <h3>会计科目</h3>
        <div style="float:right;margin-right:5px;">
          <el-button type="success" size="min" v-has="'fin:subject:add'" @click="addSubject">新增</el-button>
          <el-button type="success" size="min" v-has="'fin:subject:del'" @click="deleteNode">删除</el-button>
        </div>
      </div>
      <div style="padding:30px 15px;">
        <nodepage @getTreeNode="getTreeNode" :isChange="isChange"></nodepage>
      </div>
    </div>
    <div class="container right">
      <div class="min-head">
        <h3>科目详情</h3>
        <div style="float:right;margin-right:5px;">
          <el-button type="success" size="min" v-has="'fin:subject:edit'" @click="editSubject">编辑</el-button>
        </div>
      </div>
      <div style="padding:30px 15px;">
        <el-form :model="detailForm" label-width="80px">
          <el-form-item label="*科目代码">
            <el-input v-model="detailForm.subjectCode" readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="*科目名称">
            <el-input v-model="detailForm.subjectName" readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="辅助核算">
            <el-input v-model="detailForm.auxiliaryItem" readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="项目公司" v-show="isShowDetailCompany">
            <el-input v-model="detailForm.projectCompanyName" suffix-icon="el-icon-search" readonly="readonly"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!--新增科目设置弹框-->
    <el-dialog title="新增会计科目" :visible.sync="addVisible" width="40%">
      <el-form :model="addForm" label-width="80px">
        <el-form-item label="*科目代码">
          <!--<el-input v-model="addForm.subCode"></el-input>-->
          <div style="width:172px;height:26px;display:inline-block;border-radius:4px;border:solid thin #dcdfe6;">
            <span style="display:inline-block;text-indent:1em;">{{scode}}</span>
            <input type="text" style="border:none;height:95%;outline:none;width:50px;" minlength="2" maxlength="2" v-model="addForm.subCode" @blur="checkNumLength">
          </div>
        </el-form-item>
        <el-form-item label="*科目名称">
          <el-input v-model="addForm.subName"></el-input>
        </el-form-item>
        <el-form-item label="辅助核算">
          <el-input v-model="addForm.adjust"></el-input>
        </el-form-item>
        <el-form-item label="项目公司" v-show="isShowCompany">
          <el-input v-model="addForm.subCompany" suffix-icon="el-icon-search" @focus="showCompany"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:right;padding:30px 15px 0px 15px">
        <el-button type="success" size="mini" @click="addSave">保存</el-button>
      </div>
    </el-dialog>
    <!--编辑科目设置弹框-->
    <el-dialog title="编辑科目详情" :visible.sync="editVisible" width="40%">
      <el-form :model="rightForm" label-width="80px">
        <el-form-item label="*科目代码">
          <!--<el-input v-model="rightForm.subjectCode"></el-input>-->
          <div style="width:172px;height:26px;display:inline-block;border-radius:4px;border:solid thin #dcdfe6;">
            <span style="display:inline-block;text-indent:1em;">{{scode}}</span>
            <input type="text" style="border:none;height:95%;outline:none;width:50px;" minlength="2" maxlength="2" v-model="rightForm.shortCode" @blur="checkNumLength">
          </div>
        </el-form-item>
        <el-form-item label="*科目名称">
          <el-input v-model="rightForm.subjectName"></el-input>
        </el-form-item>
        <el-form-item label="辅助核算">
          <el-input v-model="rightForm.auxiliaryItem"></el-input>
        </el-form-item>
        <el-form-item label="项目公司" v-show="isShowDetailCompany">
          <el-input v-model="rightForm.projectCompanyName" suffix-icon="el-icon-search" @focus="showCompany"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:right;padding:30px 15px 0px 15px">
        <el-button type="success" size="mini" @click="saveEdit">保存</el-button>
      </div>
    </el-dialog>
    <!--项目公司选择弹框-->
    <el-dialog title="项目公司选择" :visible.sync="companyVisible">
      <div style="width:100%;height:350px;overflow:scroll">
        <companypage @getCompany="getCompany"></companypage>
      </div>
      <div style="text-align:right;margin-top:20px;"><el-button type="success" @click="insertCompany">确定</el-button></div>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>{{dialogMessage}}</span>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false,addVisible = false,editVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import { addNodeTree,deleteNodeTree,getSubjectDtail,saveSubjectEdit } from "@/api/pages/mainPage/financialManagement/interface/index.js";
  import "@/assets/styles/style-lee.css"
  import nodeTree from "../nodeTree"
  import companyTree from "../../projectCompany"
  export default {
    components:{
      nodepage:nodeTree,
      companypage:companyTree,
    },
    data(){
      return{
        isChange:false,
        addVisible:false,//新增科目弹框
        editVisible:false,//编辑科目详情弹框
        companyVisible:false,//项目公司选择弹框
        dialogVisible:false,
        dialogMessage:'',
        rightForm:{},//右侧表单数据
        detailForm:{},
        addForm:{},//新增科目表单数据
        nodeData:{},
        scode:null,
        detailCode:null,
        isShowCompany:false,
        isShowDetailCompany:false,
      }
    },
    methods:{
      addSubject:function(){//新增会计科目
        if(typeof(this.nodeData.id) == 'undefined'){
          this.$message({
            type:'warning',
            message:'请先选择新增节点！'
          })
        }else if(this.nodeData.code.length >= 10){
          this.$message({
            type:'warning',
            message:'当前节点已达最大层级无法新增节点！'
          })
        }else{
          this.addVisible = true;
          this.scode = this.nodeData.code;
        }
      },
      editSubject:function(){//编辑科目详情
        if(typeof(this.nodeData.id) == 'undefined'){
          this.$message({
            type:'warning',
            message:'请先选择需要编辑的节点！'
          })
        }else if(this.nodeData.parentId == null){
          this.$message({
            type:'warning',
            message:'当前节点无法进行编辑！'
          })
        }else{
          this.rightForm.shortCode = this.nodeData.shortCode;
          this.editVisible = true;
          let thatCode = this.nodeData.code;
          thatCode = thatCode.substring(0,thatCode.length - 2);
          this.scode = thatCode;
        }


      },
      getTreeNode:function(data){//获取左侧树形列表的参数
         
        if(data.code.length == 8){
          this.isShowCompany = true;
        }else{
          this.isShowCompany = false;
        }
        if(data.code.length == 10){
          this.isShowDetailCompany = true;
        }else{
          this.isShowDetailCompany = false;
        }
        let that = this;
        this.nodeData = data;
        if(data.parentId != null){
          let params = {
            id:data.id
          }
          getSubjectDtail(params).then(function(res){
            if(res.status == 200){
              that.detailForm = res.data;
              that.rightForm = res.data;
            }else{
              that.$message({
                type:'error',
                message:res.message
              })
            }
          });
        }else{
            that.detailForm = {};
            that.rightForm = {};
        }
      },
      getCompany:function(data){//获取项目公司并写入
         
        if(this.addVisible == true){//当弹出新增弹框时
          this.addForm.subCompany = data.label;
          this.addForm.subCompanyCode = data.id;
        }else if(this.editVisible == true){//当弹出编辑弹框时
          this.rightForm.projectCompanyName = data.label;
          this.rightForm.projectCompanyId = data.id;
        }
      },
      insertCompany:function(){
        this.companyVisible = false;
      },
      saveEdit:function(){//编辑保存
        //debugger
        let that = this;
        let thatCode = this.nodeData.code;
        thatCode = thatCode.substring(0,thatCode.length - 2);
        let params = {
          id:this.rightForm.id,
          parentId:this.rightForm.parentId,
          projectCompanyName:this.rightForm.projectCompanyName,
          subjectCode:thatCode + this.rightForm.shortCode,
          subjectShortCode:this.rightForm.shortCode,
          subjectName:this.rightForm.subjectName,
          auxiliaryItem:this.rightForm.auxiliaryItem,
          projectCompanyId:this.rightForm.projectCompanyId,
        }
        that.detailCode = params.subjectCode;
        if(this.nodeData.code.length > 8){

          if(params.projectCompanyName == undefined || params.subjectShortCode == undefined || params.subjectName == undefined){//params.auxiliaryItem == undefined ||
            this.$message({
              message: '信息未填写完整，请完善填写信息！',
              type: 'warning'
            });
          }else{
            this.$confirm('确定信息无误并保存？','提示').then(function(){
              saveSubjectEdit(params).then(function(res){
                if(res.status != 200){
                  that.$message({
                    type:'error',
                    message:res.message
                  })
                }else{
                  //that.rightForm = {};
                  that.$message({
                    type:'success',
                    message:'保存成功！'
                  })
                  that.editVisible = false
                  that.detailForm.subjectCode = that.detailCode;
                  that.nodeData.id = undefined;
                  that.isChange = !that.isChange;
                }
              });
            }).catch(function(){

            })
          }
        }else{
          if(params.subjectShortCode == undefined || params.subjectName == undefined){//params.auxiliaryItem == undefined ||
            this.$message({
              message: '信息未填写完整，请完善填写信息！',
              type: 'warning'
            });
          }else{
            saveSubjectEdit(params).then(function(res){
              if(res.status != 200){
                that.$message({
                  type:'error',
                  message:res.message
                })
              }else{
                that.$message({
                  type:'success',
                  message:'保存成功！'
                })
                that.editVisible = false
                //that.rightForm = {};
                that.detailForm.subjectCode = that.detailCode;
                that.nodeData.id = undefined;
                that.isChange = !that.isChange;
              }
            });
          }
        }



      },
      addSave:function(){
        let that = this;
        let params = {
          parentId:this.nodeData.id,
          projectCompanyName:this.addForm.subCompany,
          subjectCode:this.nodeData.code + this.addForm.subCode,
          subjectShortCode:this.addForm.subCode,
          subjectName:this.addForm.subName,
          auxiliaryItem:this.addForm.adjust,
          projectCompanyId:this.addForm.subCompanyCode,
        }
        if(this.nodeData.code.length >= 8){
          params.isLeaf = 1;
          if(params.projectCompanyName == undefined || params.subjectShortCode == undefined || params.subjectName == undefined ){//params.auxiliaryItem == undefined ||
            this.$message({
              message: '信息未填写完整，请完善填写信息！',
              type: 'warning'
            });
          }else{
            this.$confirm('确定信息无误并保存？','提示').then(function(){
              addNodeTree(params).then(function(res){
                 ;
                if(res.status!=200){
                  that.$message({
                    type:'error',
                    message:res.message
                  })
                }else{
                  that.$message({
                    type:'success',
                    message:'保存成功！'
                  })
                  that.addVisible = false
                  that.addForm = {};
                  that.isChange = !that.isChange;
                  that.nodeData = {};
                }

              })
            }).catch(function(){

            });
          }
        }else{
          params.isLeaf = 0;
          if(params.subjectShortCode == undefined || params.subjectName == undefined ){// params.auxiliaryItem == undefined ||
            this.$message({
              message: '信息未填写完整，请完善填写信息！',
              type: 'warning'
            });
          }else{
            this.$confirm('确定信息无误并保存？','提示').then(function(){
              addNodeTree(params).then(function(res){
                 ;
                if(res.status!=200){
                  that.$message({
                    type:'error',
                    message:res.message
                  })
                }else{
                  that.addForm = {};
                  that.$message({
                    type:'success',
                    message:'保存成功！'
                  })
                  that.addVisible = false
                  that.isChange = !that.isChange;
                  that.nodeData = {};
                }

              })
            }).catch(function(){

            })
          }
        }

      },
      deleteNode:function(){
        let that = this;
        if(typeof(this.nodeData.id) == 'undefined'){
          this.$message({
            type:'warning',
            message:'请先选择需要删除的节点'
          })
        }else if(this.nodeData.parentId == null){
          this.$message({
            type:'warning',
            message:'顶层节点不允许删除！'
          })
        }else{
          let data = {
            id:that.nodeData.id
          }
          this.$confirm('确定删除该节点？','提示').then(function(){
            deleteNodeTree(data).then(function(res){
              if(res.status !=200){
                that.$message({
                  type:'error',
                  message:res.message
                })
              }else{
                that.$message({
                  type:'success',
                  message:'删除成功！'
                })
                that.isChange = !that.isChange;
                that.nodeData = {};
              }
            });
          }).catch(function(){

          })
        }
      },
      checkNumLength:function(val){
        let reg = /^[a-zA-Z\d]+$/;
        if(this.addVisible == true){
          if(reg.test(this.addForm.subCode) && this.addForm.subCode != ''){
            if(this.addForm.subCode.length < 2){
              this.addForm.subCode = "0"+this.addForm.subCode;
            }
          }else{
            this.addForm.subCode = '';
            this.$message({
              message: '输入格式有误，请输入1-2位数字或字母！',
              type: 'warning'
            });
          }

        }else if(this.editVisible == true){
          if(reg.test(this.rightForm.subjectCode) && this.rightForm.subjectCode != ''){
            if(this.rightForm.subjectCode.length < 2){
              this.rightForm.subjectCode = "0"+this.rightForm.subjectCode;
            }
          }else{
            this.rightForm.subjectCode = '';
            this.$message({
              message: '输入格式有误，请输入1-2位数字或字母！',
              type: 'warning'
            });
          }

        }
      },
      showCompany:function(){
        this.companyVisible = true;
      },
    },
    mounted:function(){
      let container = document.getElementById('subject');
      let outer = container.parentElement;
      let minHeight = outer.offsetHeight;
      container.style = "min-height:"+minHeight+"px";
    }
  }
</script>

<style scoped>
  #subject{
    background-color: #fff;
    border-radius: 5px;
    height:100%;
    padding-bottom: 10px;
    position:relative;
    min-height:660px;
  }
  .container{
    width:49.8%;
    border:solid thin #dcdfe6;
    float:left;
    position:absolute;
    height:auto;
    top:1px;
    bottom:0;
    border-radius:2px;
  }
  .left{
    left:1px;
  }
  .right{
    right:1px;
  }
</style>
