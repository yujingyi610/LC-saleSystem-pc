<template>
  <div class="merger-opportunities">
    <el-dialog
      title="客户合并"
      width="700px"
      @close="handleClose"
      :visible.sync="dialogVisible"
    >
      <div>
        <h3 class="mb-20 text-center">将合并以下客户，请选择主客户并填写被合并客户与主客户的关系</h3>

         <div class="table-box"> 
          <el-table
          :data="tableData"
          border
          style="width: 100%"
          highlight-current-row
          @current-change="handleCurrentChange"
          ref="table"
          >
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="tel" label="手机号"></el-table-column>
            <el-table-column prop="cstLevel" label="客户级别"></el-table-column>
            <el-table-column prop="buyStage" label="购房阶段"></el-table-column>
            <el-table-column prop="value" label="与主客户关系">
              <template slot-scope="scope">
                <template>
                  <el-select  v-model="tableData[scope.$index].value" @change="getReltions(scope)"  placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>
       
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//
 // 获取请求接口
  import {
    mergerOpportunities,//合并商机
  } from '@/api/pages/mainPage/customerFollowUp'
  export default {
    data() {
      return {
        radio:'',
        dialogVisible : false,
        // 表格数据
        tableData : [],
        // 选中数据
        currentRow : null,
        // 下拉 列表
        options : [],
        //获取父组件传的值
        value:'',
        //是否是主商机
        isMain:'0'
      }
    },
    props:["businessInformation"],
    watch:{
      businessInformation(curVal,oldVal){
        if(curVal){
        }
        },
    },
    created() {
    },
    mounted() {
      this.getOptions();
    },
    methods : {

      //关系数据
      getReltions(row){
          event.cancelBubble = true;
          this.tableData[row.$index].relationship = row.row.value
         
      },
      show(main,com) {
        this.dialogVisible = true;
        // 获取数据
        this.main = main;
        this.com = com;
        
        this.com.forEach((v)=>{
            if(v.id!==this.main.id){
                this.tableData.push({
                    id:v.id,
                    customId:null,
                    nicheId:v.nicheId,
                    name:v.name,
                    tel:v.tel.split(',')[0],
                    cstLevel:v.cstLevel,
                    buyStage:v.buyStage,
                    minorNicheContactList:v.customContactList
                })
                if(v.customContactList){
                    v.customContactList.forEach((k)=>{
                        this.tableData.push({
                            customId:k.customId,
                            id:k.id,
                            name:k.name,
                            tel:k.contactMethodList?k.contactMethodList[0].no:null,                           
                        })
                    })
                }
            }

        })
        //  this.tableData.map((v,k) => {
        //   v.value = this.options[0].value;
        //   return v;
        // });
      },
      //　设置表格数据
      setData(data) {
        this.tableData = data
        for(let i=0; i<this.tableData.length;i++){
             this.$set(this.tableData[i], 'value', true)
             this.tableData[i].value = ' '
        }
        //默认选择第一个
        this.currentRow = this.tableData[0];
        // 设置默认第一个为主商机
        this.tableData[0].isMain = true;
        //设置 关系options 默认选中
        this.tableData.map((v,k) => {
          v.value = this.options[0].value;
          return v;
        });
      },
      // 获取下拉框数据
      getOptions() {
        this.options = [
          {label : '自己' , value : '自己'},
          {label : '夫妻' , value : '夫妻'},
          {label : '父母' , value : '父母'},
          {label : '子女' , value : '子女'},
          {label : '亲属' , value : '亲属'},
          {label : '朋友' , value : '朋友'},
          {label : '其他' , value : '其他'},
        ];
      },
      /* ---------------------------浮层 相关----------------------------- */
      
      // 浮层关闭
      handleClose() {
        this.dialogVisible = false;
        // 清空 选中数据  
        this.$refs.table.setCurrentRow([]);
        //情况主商机
        this.tableData.forEach((v)=>{
          if(v.isMain === true){
            v.isMain = false
          }
        })
        this.tableData = []
        this.$emit('closetable')
      },
      // 浮层提交 
      handleSubmit() {
          //主商机id
          let mainNicheId = ''
          //被合并商机
          let minorNicheList = []
        
        this.tableData.forEach((v,s)=>{
            this.com.forEach((k)=>{
                if(v.id === k.id){
                    //let minorNicheContactListA = []
                    minorNicheList.push({
                        minorNicheId:v.nicheId,
                        relationship:v.relationship,
                        minorNicheContactList:v.minorNicheContactList
                    })                   
                }
                           
            })

        })


        this.tableData.forEach((g)=>{
            minorNicheList.forEach((b)=>{
                for(let f=0;f<b.minorNicheContactList.length;f++){
                  if(g.customId === b.minorNicheContactList[f].customId){
                    b.minorNicheContactList[f] = {}
                    b.minorNicheContactList[f] = {
                        contactId:g.id,
                        relationship:g.relationship
                    }
                  }
                }
                
            })
        })

          mergerOpportunities({
            mainNicheId:this.main.nicheId,
            minorNicheList:minorNicheList,
          }).then((res)=>{
            if(res.status === 200){
                this.$message({
                  message: '合并成功',
                  type: 'success'
                });
                
                this.handleClose()
            }
          })
        
      },
      /* ---------------------------浮层 相关----------------------------- */

      /* ---------------------------表格 相关----------------------------- */
      // 保存当前点击的数据
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      /* ---------------------------表格 相关----------------------------- */
    },
  }
</script>

<style lang="scss" scoped>

// .merger-opportunities{

// }

</style>