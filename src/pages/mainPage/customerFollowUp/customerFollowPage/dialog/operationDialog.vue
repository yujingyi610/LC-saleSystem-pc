<template>
  <div class="operation-dialog">
    <el-dialog
      title="选择要操作的客户"
      width="1000px"
      @close="handleClose"
      :visible.sync="dialogVisible"
    >
      <div>
        <div class="search-box">
          <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
            
            <el-form-item 
                label = '选择项目：'
                prop="selectionProject"              
              >
                <el-select  @change="getInformation" clearable v-model="ruleForm.selectionProject" placeholder="请选择">
                  <el-option 
                    v-for="(item,index) in ruleForm.projectOptiones"
                    :key="index"
                    :label="item.projectName" 
                    :value="item.id" 
                  >
                  </el-option>
                  
                </el-select>
              </el-form-item>

               <el-form-item 
               v-if="this.btnText === '客户分配'"
                label = '置业顾问：'
                prop="propertyConsultant"              
              >
                <el-select  clearable v-model="ruleForm.propertyConsultant" placeholder="请选择">
                  <el-option 
                    v-for="(item,index) in this.propertyConsultantList"
                    :key="index"
                    :label="item.userRealName" 
                    :value="item.userId" 
                  >
                  </el-option>
                  
                </el-select>
              </el-form-item>

            <el-form-item label="精确查找：" prop="accurateLookup">
              <el-input placeholder="请输入客户姓名或手机号" v-model="ruleForm.accurateLookup"></el-input>
            </el-form-item>

          <div class="fr">
            <el-button @click="handleSearch" type="primary">搜索</el-button>
          </div>

          </el-form>
        </div>
        <div class="table-box">
          <el-row>
            <!-- 左侧表格 -->
            <el-col :span="14">
              <el-table
              class="m-table"
              :data="tableDataLeft"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange1"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="tel" label="电话"></el-table-column>
                <el-table-column prop="buyStage" label="购房阶段"></el-table-column>
                <el-table-column prop="cstLevel" label="客户级别"></el-table-column>
                <el-table-column prop="visitCount" label="已到访次数"></el-table-column>
                <!-- 如果是客户分配 -->
                <template v-if="this.type === 'khfp'">
                  <el-table-column prop="propertyConsultName" label="置业顾问"></el-table-column>
                </template>
                
              </el-table>
              <el-pagination
              class="mt-10"
              v-if="total > 0"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :total="total"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="prev, pager, next, jumper"
              >
              </el-pagination>
            </el-col>
            <el-col :span="2">
              <div style="height:1px;position:relative;">
                <el-button class="m-add" @click="handleAdd" type="primary">
                  添加
                  <i class="el-icon-arrow-right"></i>
                </el-button>
                <el-button class="m-all" @click="handleAll" type="primary">
                  批量添加
                  <i class="el-icon-arrow-right"></i>
                </el-button>
                <el-button class="m-delete" @click="handleDelete" type="primary">
                  移除
                  <i class="el-icon-arrow-left"></i>
                </el-button>
              </div>
            </el-col>
            <!-- 右侧表格 -->
            <el-col :span="8">
              <el-table
              class="m-table"
              :data="tableDataRight"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange2"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="tel" label="电话"></el-table-column>
                <el-table-column prop="propertyConsultName" label="置业顾问"></el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">{{btnText}}</el-button>
      </span>
    </el-dialog>
    <!-- 客户分配 -->
    <distributionAdvisorDialog  @handleCloseir = 'handleClose' ref="khfp"></distributionAdvisorDialog>
    <!-- 客户合并 -->
    <mergerOpportunities @changeRight = 'newRightList' ref="hbsj" v-show="flag"  :businessInformation='multipleSelection2'></mergerOpportunities>
  </div>
</template>

<script>

 import Cookies from 'js-cookie'//引入cookie
  // 获取请求接口
  import {
    saveCustomerInformation,
    getProjectName,
    getCustomerPaging,
    getCustomerInformation,
    getPropertyConsultant,//获取置业顾问
  } from '@/api/pages/mainPage/customerFollowUp'

  // 获取浮层
  import distributionAdvisorDialog from './distributionAdvisorDialog.vue'
  import mergerOpportunities from './mergerOpportunities.vue'

  export default {
    components : {
      distributionAdvisorDialog,
      mergerOpportunities,
    },
    data() {
      return {
        flag:false,
        dialogVisible : false,
        btnText : '',
        type : 'kbhb',
        byValue:false,

        ruleForm : {
          // 选择项目
          selectionProject : '',
          // 置业顾问
          propertyConsultant : '',
          // 精确查找
          accurateLookup : '',
          //项目列表
          projectOptiones:[],
          //项目id
           projectID : '',
        },
        rules : {},

        // 左侧表格数据
        tableDataLeft : [],
        // 右侧表格数据
        tableDataRight : [],
        // table 选中数据
        multipleSelection1 : [], // 左边
        multipleSelection2 : [], // 右边
        // 数据总数
        total : 0,
        // 当前页数
        currentPage : 1,
        // 每页数量
        pageSize : 10,
        //置业顾问过度数组
        propertyConsultantList:[]

      }
    },
      mounted() {
       this.getTableLists()
     
      },
      created(){
        //获取置业顾问
        this.getConsultant()
      },
    methods : {
        //获取项目项目
         getTableLists(){
          let userId = Cookies.set('session');
          let data={
            userId:userId,
          }             
          getProjectName(data).then((res) => {
              if(res.status === 200){
                  this.ruleForm.projectOptiones=res.data
                                        
              }
            });              
        },

        getInformation(){            
            //获取项目列表
            this.handleSearch()
            //获取置业顾问
             let data = {
              projectId:this.ruleForm.selectionProject,
              pageNum : this.currentPage,
              pageSize :this.pageSize,
            }
            getPropertyConsultant(data).then((res)=>{
              if(res.status === 200){
                this.propertyConsultantList = res.data
                this.propertyConsultantList.push({
                  userRealName:'全部',
                  userId:''
                })

              }
          })



        },
        initTableList(){
          saveCustomerInformation({                        
                tel:this.ruleForm.phone,
                isVisit: this.ruleForm.whetherToVisit                     
          }).then((res) => {
            if(res.status === 200){
              this.handleClose()
            }
          })
      },

        getProjectId(){
           for(let i=0;i<this.ruleForm.projectOptiones.length;i++){
              if(this.ruleForm.selectionProject==this.ruleForm.projectOptiones[i].projectName){
                this.ruleForm.projectID=this.ruleForm.projectOptiones[i].id
              }
          }   
        },

      /* ---------------------------show 方法----------------------------- */
      show(type,isDetail,data) {
        this.dialogVisible = true;
        this.flag=true;
        this.type = type;
        if(type === 'hbsj'){
          this.btnText = '客户合并';
        }else if(type === 'khfp'){
          this.btnText = '客户分配';
        }
        // 如果存在 表示当前是  查看的 合并商机 需要回显右侧表格
        if(isDetail){
          
        }
      },
      /* ---------------------------show 方法----------------------------- */

      /* ---------------------------搜索相关9999--------------allocation------mergeNiche--------- */
      handleSearch() {
        let listtypeStr = ''
        if(this.type === 'khfp'){
          listtypeStr = 'allocation'
        }else if(this.type === 'hbsj'){
          listtypeStr = 'mergeNiche'
        }

        let data = {
          pageNum : this.currentPage,
          pageSize :this.pageSize,                       
          nameOrTel : this.ruleForm.accurateLookup,
          projectId : this.ruleForm.selectionProject,
          propertyConsultId:this.ruleForm.propertyConsultant,
          listType : listtypeStr 
        }
        if(this.type ==='hbsj'){
          delete data.propertyConsultId
        }
         getCustomerPaging(data).then((res) => {
              if(res.status === 200){        
                this.tableDataLeft =  res.data.list
                  
                this.total = res.data.total
              }
            })         
      },
      /* ---------------------------搜索相关----------------------------- */

      /* ---------------------------浮层相关----------------------------- */
      // 浮层关闭
      handleClose() {
        this.dialogVisible = false;
        this.$refs.ruleForm.resetFields();
        // 清空右侧表格数据
        this.tableDataRight = [];      
        this.multipleSelection2 = [];
        this.tableDataLeft=[]
        //清空置业顾问数据
        this.propertyConsultantList = []
        //更新页面
        this.total=0
        this.ruleForm.selectionProject = null
        this.$emit('closeChild')
      },
      // 浮层提交 
      handleSubmit() {
        this.$refs[this.type].show(this.tableDataRight);
        
      },
      //更新右侧列表
      newRightList(){
        this.tableDataRight = [];   
        this.multipleSelection1 = [];   
        this.multipleSelection2 = [];
         this.getInformation()
      },
      /* ---------------------------浮层相关----------------------------- */

      /* ---------------------------表格相关----------------------------- */

      // 更新表格 数据
      //获取置业顾问
      getConsultant(){
          let data = {
              projectId:this.ruleForm.selectionProject,
              pageNum : 1,
              pageSize :1000000,
            }
            getPropertyConsultant(data).then((res)=>{
              if(res.status === 200){
                this.propertyConsultantList = res.data
              }
          })
      },

      // 表格页数 初始化
      tableInitChange() {
        if(this.currentPage === 1){
          this.handleSearch();
        }else{
          this.currentPage = 1;
        }
      },
      // 表格 size change
      handleSizeChange(val) {
        this.pageSize = val;
        this.tableInitChange();
      },
      // 表格 点击分页
      handleCurrentChange(val) {
        this.currentPage = val;
        this.handleSearch();
      },
      // 点击 添加
      handleAdd() {
        let arr = [];
        arr = arr.concat(this.tableDataRight,this.multipleSelection1);
        let newArr = [];
        // 去重
        (() => {
          let obj = {};
          arr.map((v,k) => {
            if(!obj[v.id]){
              newArr.push(v);
              obj[v.id] = true;
            }
          });
        })();
        this.tableDataRight = newArr;
      },
      //批量添加
      handleAll(){
        this.tableDataRight = this.tableDataLeft
      },
      // 点击 移除
      handleDelete() {
        this.multipleSelection2.map((v1,k1) => {
          this.tableDataRight.map((v2,k2) => {
            if(v1.id === v2.id){
              this.tableDataRight.splice(k2,1);
            }
          });
        });
      },
      // 左侧选中数据
      handleSelectionChange1(val) {
        this.multipleSelection1 = val;
      },
      // 右侧选中数据
      handleSelectionChange2(val) {
        this.multipleSelection2 = val;
      },

      /* ---------------------------表格相关----------------------------- */

      /* ---------------------------浮层相关----------------------------- */

    },
  }
</script>

<style lang="scss">

.operation-dialog{
  .w-150{
    width: 150px;
  }
  .table-box{
    min-height: 300px;
    .m-table{
      max-height: 450px;
      overflow-y: auto;
      margin-left: 13px;
    }
    .m-add{
      position: absolute;
      left: calc(100% / 2 - 31px);
      top: 160px;
    }
    .m-all{
       position: absolute;
      left: calc(100% / 2 - 42px);
      top: 230px;
    }
    .m-delete{
      position: absolute;
      left: calc(100% / 2 - 31px);
      margin-left: 0;
      top: 300px;
    }
  }
}

</style>