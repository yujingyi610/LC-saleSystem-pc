<template>
  <div id="compare" v-loading="loading">
    <div class="container-lee">
      <div class="headPart">
        <el-form :inline="true" :model="headForm" class="demo-form-inline">
          <el-form-item label="项目公司：">
            <el-input v-model="headForm.projectCompany" readonly="readonly" @focus="companyVisible = true"></el-input>
            <input type="hidden" v-model="headForm.companyId">
          </el-form-item>
          <el-form-item label="收费项目：" style="margin-left:50px;">
            <el-select v-model="headForm.project" placeholder="请选择收费项目" @change="exchangeProjectHandle">
              <el-option
                v-for="item in chargeOption"
                :key="item.itemType"
                :label="item.itemTypeName"
                :value="item.itemType"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="container-lee" style="border-bottom:solid thin #dcdfe6;padding-bottom:10px;">
      <table>
        <thead>
          <tr>
            <td colspan="3" rowspan="2" style="width:45%">{{companyName}}</td>
            <td colspan="2">财务软件科目</td>
            <td rowspan="2" style="width:8%">操作</td>
          </tr>
          <tr>
            <td>借方科目</td>
            <td>贷方科目</td>
          </tr>
        </thead>
        <tbody v-for="(levelOne, index) in compareTable" :key="index">
        <template v-for="(levelTwo,index2) in levelOne.subjectRelationPayMethodList">
          <template v-for="(levelThree,oindex) in levelTwo.subjectRelationList">
            <tr :key="oindex">
              <td v-if="index2 == 0 && oindex == 0" :rowspan="parseInt(levelOne.subjectRelationPayMethodList.length)*parseInt(levelTwo.subjectRelationList.length)" v-text="levelOne.itemTypeName"></td>
              <td v-if="oindex == 0" :rowspan="levelTwo.subjectRelationList.length" v-text="levelTwo.payMethodTypeName"></td>
              <td v-text="levelThree.subjectName"></td>
              <td>
                {{levelThree.debitSubjectName}}
                <el-button type="text" style="float:right" @click="borrowClearAndAdd(levelThree)">{{levelThree.debitSubjectName==null||''?'添加':'清除'}}</el-button>
              </td>
              <td>
                {{levelThree.creditSubjectName}}
                <el-button style="float:right" type="text" @click="lendClearAndAdd(levelThree)">{{levelThree.creditSubjectName==null||''?'添加':'清除'}}</el-button>
              </td>
              <td>
                <el-button type="text" v-show="(levelThree.debitSubjectName!=null && levelThree.debitSubjectName!='') || (levelThree.creditSubjectName!=null && levelThree.creditSubjectName!='')" @click="clearAll(levelThree)">清除</el-button>
                <el-button type="text" v-show="(levelThree.debitSubjectName==null || levelThree.debitSubjectName=='') && (levelThree.creditSubjectName==null || levelThree.creditSubjectName=='')">--</el-button>
              </td>
            </tr>
          </template>
        </template>
        </tbody>
      </table>
      <span style="margin-top:10px;display:inline-block;">同时将此设置应用于以下收费项目</span>
    </div>
    <div class="container-lee">
      <el-form :model="ruleForm" ref="ruleForm" label-width="0px" class="demo-ruleForm">

        <el-form-item label="" prop="type">
          <el-checkbox-group v-model="ruleForm.type" v-for="item in othersGroup" :key="item.itemType">
            <el-checkbox :label="item.itemType">{{item.itemTypeName}}</el-checkbox>
          </el-checkbox-group>
          <el-button v-show="othersGroup.length > 0" type="success" style="float:right" @click="saveOtherUse">保存</el-button>
        </el-form-item>

      </el-form>
    </div>
    <el-dialog title="科目选择" :visible.sync="choiceVisible" width="40%">
      <div style="width:100%;height:350px;overflow:scroll">
        <choosepage @getTreeNode="getTreeNode"></choosepage>
      </div>
      <div style="text-align:right;margin-top:20px;"><el-button type="success" @click="insertSubject">确定</el-button></div>
    </el-dialog>
    <!--项目公司选择弹框-->
    <el-dialog title="项目公司选择" :visible.sync="companyVisible">
      <div style="width:100%;height:350px;overflow:scroll">
        <companypage @getCompany="getCompany"></companypage>
      </div>
      <div style="text-align:right;margin-top:20px;"><el-button type="success" @click="insertCompany">确定</el-button></div>
    </el-dialog>
  </div>
</template>

<script>
  import "@/assets/styles/style-lee.css"
  import {getChargeProject,getSubjectTableList,buildRelation,useToOtherProject,deleteRelation,deleteBorrowSubject,deleteLendSubject} from "@/api/pages/mainPage/financialManagement/interface";
  import nodeTree from "./nodeTree"
  import companyTree from "../projectCompany"
    export default {
        components:{
          choosepage:nodeTree,
          companypage:companyTree,
        },
        data(){
          return{
            name:'收付科目对照组件',
            headForm:{},//头部表单
            ruleForm:{
              type:[],
            },
            chargeOption:[],//头部筛选表单收费项目
            othersGroup:[],
            companyVisible:false,
            companyName:null,
            companyId:null,
            compareTable:[],
            choiceFlag:null,
            subjectType:null,
            subjectNodeData:null,
            tableData:[],//表格数据
            choiceVisible:false,//选择弹框
            loading: false
          }
        },
      methods:{
        borrowClearAndAdd:function (row) {
          let that = this;
           
          if(row.debitSubjectName == '' || row.debitSubjectName== null){
            this.choiceVisible = true;
            this.choiceFlag = row;
            this.subjectType = 'debit';
          }else{
            this.$confirm('确定要清除吗？','提示',{type:'warning'}).then(function(){
              let params = {
                subjectRelationId:row.id
              }
              deleteBorrowSubject(params).then(function(res){
                if(res.status == 200){
                  row.debitSubjectName = null;
                  row.debitSubjectId = null;
                  that.getCompareTable();
                }else{
                  that.$message({
                    message:res.message,
                    type:'error'
                  })
                }
              })
            });
          }
        },
        lendClearAndAdd:function(row){
          let that = this;
          if(row.creditSubjectName == '' || row.creditSubjectName == null){
            this.choiceVisible = true;
            this.choiceFlag = row;
            this.subjectType = 'credit';
          }else{
            this.$confirm('确定要清除吗？','提示',{type:'warning'}).then(function(){
              let params = {
                subjectRelationId:row.id
              }
              deleteLendSubject(params).then(function(res){
                if(res.status == 200){
                  row.creditSubjectName = null;
                  row.creditSubjectId = null;
                  that.getCompareTable();
                }else{
                  that.$message({
                    message:res.message,
                    type:'error'
                  })
                }
              })

            });
          }
        },
        clearAll:function(val){
          let that = this
          this.$confirm('确定要同时清除借方科目和贷方科目吗？','提示',{type:'warning'}).then(function(){
            let params = {
              subjectRelationId:val.id
            }
            deleteRelation(params).then(function(res){
              if(res.status == 200){
                that.$message({
                  message:'已成功清除！',
                  type:'success'
                })
                val.debitSubjectName = null;
                val.debitSubjectId = null;
                val.creditSubjectName = null;
                val.creditSubjectId = null;
                that.getCompareTable();
              }else{
                that.$message({
                  message:res.message,
                  type:'error'
                })
              }
            })

          });
        },
        saveOtherUse:function(){
          let that = this;
          let listArray = [];
          for(let i=0;i<this.ruleForm.type.length;i++){
            let obj = new Object();
            for(let j=0;j<this.chargeOption.length;j++){
              if(this.ruleForm.type[i] == this.chargeOption[j].itemType){
                obj.itemType = this.chargeOption[j].itemType;
                obj.itemTypeName = this.chargeOption[j].itemTypeName;
                listArray.push(obj);
              }
            }
          }
          let data = {
            projectCompanyId:this.headForm.companyId,
            subjectRelationItem:{
              itemType:this.compareTable[0].itemType,
              itemTypeName:this.compareTable[0].itemTypeName,
              subjectRelationPayMethodList:this.compareTable[0].subjectRelationPayMethodList
            },
            subjectRelationItemList:listArray
          }
          if(data.subjectRelationItemList.length == 0){
            this.$message({
              message:'请先勾选其他收费项目！',
              type:'warning'
            })
          }else{
            this.$confirm('确认勾选用于其他收费项目无误并保存？','提示').then(function(){
              useToOtherProject(data).then(function(res){
                if(res.status == 200){
                  that.$message({
                    message:'保存成功！',
                    type:'success'
                  })
                }else{
                  that.$message({
                    message:res.message,
                    type:'error'
                  })
                }
              })
            })
          }
        },
        getTreeNode:function(data){
           
          this.subjectNodeData = data;
        },
        getCompany(data){
          this.companyName = data.label;
          this.companyId = data.id;
        },
        insertCompany(){
          this.headForm.projectCompany = this.companyName;
          this.headForm.companyId = this.companyId;
          this.companyVisible = false;
          this.getCompareTable();
        },
        getCompareTable(){
          let that = this;
          if(typeof(this.headForm.companyId) == 'undefined' || this.headForm.companyId == null || this.headForm.companyId == ''){
            that.$message({
              message:'请先选择项目公司！',
              type:'warning'
            })
          }else{
            this.loading = true;
            let params = {
              projectCompanyId:this.headForm.companyId,
              itemType:this.headForm.project
            }
            getSubjectTableList(params).then(function(res){
              that.loading = false;
              if(res.status == 200){
                that.compareTable = res.data.subjectRelationItemList;
              }else{
                that.$message({
                  message:res.message,
                  type:'error'
                })
              }
            })
          }
        },
        insertSubject:function(){
          if(this.subjectType == 'credit'){
            this.choiceFlag.creditSubjectName = this.subjectNodeData.name;
            this.choiceFlag.creditSubjectId = this.subjectNodeData.id;
          }else if(this.subjectType == 'debit'){
            this.choiceFlag.debitSubjectName = this.subjectNodeData.name;
            this.choiceFlag.debitSubjectId = this.subjectNodeData.id;
          }
          this.choiceVisible = false;
          this.saveBuildRelation(this.choiceFlag);
        },
        saveBuildRelation:function(data){
          let that = this;
          buildRelation(data).then(function(res){
            if(res.status == 200){
              that.$message({
                message:'已成功保存！',
                type:'success'
              });
              that.getCompareTable();
            }else{
              that.$message({
                message:res.message,
                type:'error'
              })
            }
          });
        },
        exchangeProjectHandle(val){
          this.othersGroup = [];
          this.getCompareTable();
          for(let i=0;i<this.chargeOption.length;i++){
            if(this.chargeOption[i].itemType != val){
              this.othersGroup.push(this.chargeOption[i]);
            }
          }
        }
      },
      created:function(){
        let that = this;
        getChargeProject().then(function(res){
          that.chargeOption = res.data;
          let obj = {
            itemTypeName:'全部',
            itemType:''
          }
          that.chargeOption.unshift(obj);
          that.headForm.project = that.chargeOption[1].itemType
          //that.othersGroup = res.data;
        })
      },
      mounted:function(){
        let container = document.getElementById('compare');
        let outer = container.parentElement;
        let minHeight = outer.offsetHeight * 0.93;
        container.style = "min-height:"+minHeight+"px";
      }
    }
</script>

<style scoped>
#compare{
  background-color: #fff;
  border-radius: 5px;
  padding-bottom: 10px;
}
.inputLable{
  display:inline-block;
}
  .inputBox{
    display:inline-block;
  }
table,table tr th, table tr td {
  border:1px solid rgb(220, 223, 230);
  line-height:36px;
}
table {
  text-align: center;
  border-collapse: collapse;
  padding:2px;
  width:100%;
}
</style>
