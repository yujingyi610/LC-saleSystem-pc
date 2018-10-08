<template >
  <div class="customer-information">
    <div class="follow">            
        <div class="right">           
           <el-form :inline="true" class="mm_1" label-width="100px">
             <el-row class="mf_1"> 
                <template v-for="item in this.ruleForm.tableData">
                  <div :key="item.id" class="mk_1">
                  <el-col class="mf_3" > 
                  </el-col>
                  <el-col class="mf_4">  
                  </el-col>
                  <el-col class="mf_2" :span="2">
                    {{item.event}}  
                  </el-col>               
                  <el-col :span="20">
                    <el-form-item
                      class="mf_5" 
                      label="事件内容："
                     
                      >
                      {{item.content}}
                      </el-form-item>
                  </el-col>
                  <el-col class="mf_2" :span="2">
                    {{item.eventTime}}  
                  </el-col>
                  </div>
                </template>
              </el-row>
               
           </el-form>
        </div> 
      
        <el-pagination
            v-if="ruleForm.total>9"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="ruleForm.currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="ruleForm.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="100">
        </el-pagination> 
    </div>  
  </div>
</template>

<script>
//
  // 获取请求接口
  import {
    getCustomerDetails,
    getImportantList//获取关键事件
  } from '@/api/pages/mainPage/customerFollowUp'

  export default {
    data() {
      return {
        ruleForm : {           
            // table list
            tableData : [{
                //事件名称  
                eventName:'客户创建',
                //事件内容
                eventContent:'由置业顾问张三创建',
                //事件创建时间
                eventTime:'2016.2.12'
            }],
            // 数据总数
            total : 0,
            // 当前页数
            currentPage : 1,
            // 每页数量
            pageSize : 10,
            //商机id
            nicheId :'',
        }
      }
    }, 

    mounted(){
      //获取页面信息
      this.initTableList(this.$route.query.id)
    } ,  
    methods : {

      initTableList(id){       
        let data={
          id:id,
        }          
        getCustomerDetails(data).then((res) => {
          if(res.status === 200){
                  
             this.nicheId = res.data.nicheId   
             this.initTableData(res.data.nicheId)             
          }
        });
              
      },

      //获取页面详情
        initTableData(nicheId){
          let data ={
            pageNum:this.ruleForm.currentPage,
            pageSize:this.ruleForm.pageSize,
            nicheId:nicheId
          }
            getImportantList(data).then((res)=>{
              if(res.status === 200){
                this.ruleForm.tableData = res.data.list
              }
            })
        },

    handleSizeChange(val) {
        this.pageSize = val;
        // this.tableInitChange();
    },
      // 表格 点击分页
    handleCurrentChange(val) {
        this.currentPage = val;
      },
    }
  }
</script>

<style lang="scss" scoped>
.mm_1{
    .mf_1:last-child{
        .mf_4{
            display: none;
        }
    }
    .mf_1{
        position: relative;
        margin-top: 12px;
        .mf_2{
        color: #1A1A1A;
        font-family: PingFang-SC;
        font-size: 13px;
        height: 28px;
        line-height: 28px;
        }
        .mf_3{
            display: block;
            width: 900px;
            height: 1px;
            background: #E5E5E5;
            position: absolute;
            left: 117px;
            bottom: 1px;
        }
        .mf_4{
            display: block;
            width: 1px;
            height: 28px;
            background: #E5E5E5;
            position: absolute;
            left: 20px;
            bottom: -12px;
        }
        .mf_5{
                     
            margin: 0!important;   
            margin-top: -5px;        
            height: 28px;
            line-height: 28px;

            .el-form-item__content{
              line-height: 40px!important;
            }
        }
    }
    .mk_1{
      height: 28px;
      border-bottom: 1px solid #E5E5E5
    }
}
#mainPage .el-form-item__content{
line-height: 40px!important;
}
</style>