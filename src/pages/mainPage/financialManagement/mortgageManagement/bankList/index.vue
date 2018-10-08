<template>
  <div id="bankList">
    <div class="container-lee" style="text-align:right;width:97%;">
      <el-button type="success" v-has="'fin:bank:add'" @click="addBank">新增</el-button>
    </div>
    <div class="container-lee">
      <el-table :data="bankListData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="bankAccountName" label="账户名称" width="380" show-overflow-tooltip></el-table-column>
        <el-table-column prop="bankAccount" label="银联号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="rootBankName" label="总行" show-overflow-tooltip></el-table-column>
        <el-table-column label="该行常用选项">
          <template slot-scope="scope">
            {{scope.row.defaultFlag==0?'不常用':'常用'}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-show="scope.row.defaultFlag == 0" v-has="'fin:bank:set'" @click="setDefault(scope.row)">设为常用</el-button>
            <el-button type="text" size="small" v-has="'fin:bank:del'" @click="deleteBank(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="height:35px;" class="pagingBox">
      <el-pagination
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
        :current-page="pageNum1"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total1">
      </el-pagination>
      </div>
    </div>
    <el-dialog width="70%" title="新增按揭银行" :visible.sync="addBankVisible">
      <div class="headShowPart bottomContainer-lee" style="margin-bottom:5px;padding-bottom:25px;">
        <div class="inputBox-lee">
          <span class="inputLable">请选择按揭银行:</span>
          <el-select v-model="searchForm.pid" placeholder="请选择按揭银行" @change="changeBank">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.accountName"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="inputBox-lee" style="margin-left:30px;width:280px;">
          <span class="inputLable">请输入账户名称:</span>
          <el-input class = "inputControl" placeholder="请输入账户名称查询" v-model="searchForm.bankName"></el-input>
        </div>
        <el-button type="success" style="float:right;" size="small" @click="searchData">查询</el-button>
      </div>
      <div>
        <el-button type="success" style="float:right;margin-bottom:5px;" size="small" @click="sureAdd">添加</el-button>
      </div>
      <el-table
        :data="addBankList"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="headBank" label="总行"></el-table-column>
        <el-table-column prop="accountCode" label="银联号"></el-table-column>
        <el-table-column prop="accountName" label="账户名称" width="360"></el-table-column>
      </el-table>
      <div style="height:35px;" class="pagingBox">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import "@/assets/styles/style-lee.css"
  import {getAllBankList,getBankList,addSaveBank,deleteBank,getDevstByid,setDefaultUse} from "@/api/pages/mainPage/financialManagement/mortgageBank";

  export default {
        name: "bankList",
        props:['val'],
        data(){
          return{
            title:'bankList',
            pageNum:1,
            pageSize:10,
            total:0,
            pageNum1:1,
            pageSize1:10,
            total1:0,
            bankListData:[],
            addBankList:[],
            addBankVisible:false,//添加银行弹框
            options: [],
            searchForm:{
              pid:null,
              bankName:'',
            },
            multipleSelection:[],//添加银行复选框数据控制
            devstagesId:null,
            devstagesDetail:{},
          }
        },
      watch:{
        val:function(){
          this.devstagesId = this.val.id;
          this.getAllBankList();
        }
      },
      methods:{
        getAddBankList:function(){
          let that = this;
          let params = {
            level:1,
            devstagesId:this.devstagesId,
            pageNum:this.pageNum,
            pageSize:this.pageSize,
          }
          getBankList(params).then(function(res){
             ;
            if(res.status == 200){
              that.options = res.data.list
              that.searchForm.pid = that.options[0].id;
              that.getAddBankChildList(that.searchForm.pid);
            }else{
              that.$message({
                type:'error',
                message:res.message
              })
            }
          });
        },
        changeBank:function(parentId){
          this.getAddBankChildList(parentId);
        },
        searchData:function(){
          if(this.searchForm.pid == '' || this.searchForm.pid == null){
            this.$message({
              type:'warning',
              message:'请先选择按揭银行进行筛选！'
            })
          }else{
            this.getAddBankChildList(this.searchForm.pid);
          }
        },
        getAddBankChildList:function(parentId){
          let that = this;
          let params = {
            level:2,
            pid:parentId,
            devstagesId:this.devstagesId,
            bankName:this.searchForm.bankName,
            pageNum:this.pageNum,
            pageSize:this.pageSize,
          }
          getBankList(params).then(function(res){
             ;
            if(res.status == 200){
              that.addBankList = res.data.list;
              that.total = res.data.total;
              for(let i=0;i<that.options.length;i++){
                if(that.options[i].id == that.searchForm.pid){
                  for(let n=0;n<that.addBankList.length;n++){
                    that.addBankList[n].headBank = that.options[i].accountName;
                  }
                }
              }
            }else{
              that.$message({
                type:'error',
                message:res.message
              })
            }
          });
        },
        getAllBankList:function(){
          let that = this;
          let params = {
            devstagesId:this.devstagesId,
            pageNum:this.pageNum1,
            pageSize:this.pageSize1
          }
          getAllBankList(params).then(function(res){
             ;
            if(res.status == 200){
              that.bankListData = res.data.list;
              that.total1 = res.data.total;
            }else{
              that.$message({
                type:'error',
                message:res.message
              })
            }
          })
        },
        setDefault:function(row){
          // 
          let that = this;
          let params = {
            id:row.id
          }
          this.$confirm('确定将该账户设置成常用账户吗?','提示').then(function(){
            setDefaultUse(params).then(function(res){
              if(res.status == 200){
                that.$message({
                  type:'success',
                  message:'设置常用账户成功！'
                })
                that.getAllBankList();
              }else{
                that.$message({
                  type:'error',
                  message:res.message
                })
              }
            })
          }).catch(function(){

          })
        },
        deleteBank:function(row){
          let that = this;
           
          this.$confirm('您确定要删除此银行吗？').then(function(){
            let params = {
              id:row.id
            }
            deleteBank(params).then(function(res){
              if(res.status == 200){
                that.$message({
                  message: '删除成功！',
                  type: 'success'
                });
                that.getAllBankList();
              }
            })
          }).catch(function(){

          });
        },
        addBank:function(){
          this.addBankVisible = true;
          this.getAddBankList();
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        handleSizeChange(val) {
           
          this.pageSize = val;
          this.pageNum = 1;
          this.getAddBankChildList(this.searchForm.pid);
        },
        handleCurrentChange(val) {
          this.pageNum = val;
          this.getAddBankChildList(this.searchForm.pid);
        },
        handleSizeChange1(val) {
           
          this.pageSize1 = val;
          this.pageNum1 = 1;
          this.getAllBankList();
        },
        handleCurrentChange1(val) {
          this.pageNum1 = val;
          this.getAllBankList();
        },
        sureAdd:function(){
          if(this.multipleSelection.length == 0){
            this.$message({
              type:'warning',
              message:'请先勾选分行，再进行添加操作！'
            })
          }else{
            let that = this;
            let params = {
              id:this.devstagesId
            }
            let postArray = new Array();
            getDevstByid(params).then(function(res){
              for(let i=0;i<that.multipleSelection.length;i++){
                let obj = new Object();
                obj.bankAccount = that.multipleSelection[i].accountCode;
                obj.bankAccountName = that.multipleSelection[i].accountName;
                obj.headOfficeId = that.multipleSelection[i].parentId;
                obj.devstagesCode = res.data.devstagesCode;
                obj.devstagesId = res.data.id;
                obj.devstagesName = res.data.devstagesName;
                obj.projectCode = res.data.projectCode;
                obj.projectId = res.data.projectId;
                obj.projectName = res.data.projectName;
                postArray.push(obj);
              }
            })
            let data = postArray;
            this.$confirm('确定添加已勾选项并进行保存？','提示').then(function(){
              addSaveBank(data).then(function(res){
                if(res.status == 200){
                  that.$message({
                    type:'success',
                    message:'保存成功！'
                  })
                  that.getAllBankList();
                  that.addBankVisible = false;
                  that.multipleSelection = [];
                  that.getAddBankChildList(that.searchForm.pid);
                }else{
                  that.$message({
                    type:'error',
                    message:res.message
                  })
                }
              })
            }).catch(function(){

            })
            //addSaveBank
            //this.multipleSelection[i].id
            //finBankRelationList
          }
        }
      },
      created:function(){
        this.devstagesId = this.val.id;
        this.getAllBankList();
      },
      mounted:function(){
        let container = document.getElementById('bankList');
        let outer = container.parentElement;
        let minHeight = outer.offsetHeight * 0.97;
        container.style = "min-height:"+minHeight+"px";
      }
    }
</script>

<style scoped>
#bankList{
  background-color: #fff;
  border-radius: 5px;
  padding-bottom: 10px;
}
.inputControl{
  max-width:173px!important;
}
</style>
