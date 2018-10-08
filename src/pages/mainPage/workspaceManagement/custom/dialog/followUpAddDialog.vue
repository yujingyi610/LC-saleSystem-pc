<template>
  <div class="follow-up-add-dialog">
    <el-dialog
      title="添加跟进记录"
      width="700px"
      @close="handleClose"
      :visible.sync="dialogVisible"
    >
      <div>
        <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          
          <el-form-item label="客户等级：" prop="customerLevel" style="width: 275px;">
            <el-select clearable v-model="ruleForm.customerLevel" placeholder="请选择">
              <el-option label="A" value="A" ></el-option>
              <el-option label="B" value="B" ></el-option>
              <el-option label="C" value="C" ></el-option>
              <el-option label="D" value="D" ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="跟进方式：" prop="followUpMethod" style="width: 275px;">
            <el-select clearable v-model="ruleForm.followUpMethod" placeholder="请选择">
                  <el-option 
                    v-for="(item) in ruleForm.followList"
                    :key="item.id"
                    :label="item.itemValue" 
                    :value="item.itemValue" 
                  >
                  </el-option>                 
            </el-select>
          </el-form-item>

          <el-form-item label="关键行为：" prop="keyBehavior" style="width: 275px;">
            <el-select clearable v-model="ruleForm.keyBehavior" placeholder="请选择">
              <el-option 
                    v-for="(item) in ruleForm.behaviorList"
                    :key="item.id"
                    :label="item.itemValue" 
                    :value="item.itemValue" 
                  >
              </el-option> 
            </el-select>
          </el-form-item>

          <el-form-item label="下次跟进日期：" prop="nextFollowUpTime">
            <el-date-picker
              v-model="ruleForm.nextFollowUpTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="跟进内容：" prop="followUpContent">
            <el-input :maxlength="200" placeholder="内容不超过200个字" :autosize="{ minRows: 3, maxRows: 3}" type="textarea" v-model="ruleForm.followUpContent" style="width:300px;"></el-input>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

  import {
    addFollowRecord, //新增跟进记录
    getKeyBehavior//获取主要行为

  } from '@/api/pages/mainPage/customerFollowUp'

  export default {
    data() {
      return {
        dialogVisible : false,
        ruleForm : {
          // 客户等级
          customerLevel : '',
          // 跟进方式 
          followUpMethod : '',
          // 关键行为
          keyBehavior : '',
          // 下次跟进日期
          nextFollowUpTime : '',
          // 跟进内容 
          followUpContent : '',
          //客户id
          customId:'',
          //商机id
          nicheId:'',
          //关键行为list
          behaviorList:[],
          //跟进方式list
          followList:[]
        },
        rules : {},
      }     
    },
    mounted(){
      this.getKeyBehaviorFn()
    },
    methods: {
      show(data) {
         
        this.dialogVisible = true;
        this.ruleForm.customId = data.customId
        this.ruleForm.nicheId = data.nicheId
      },
      // 浮层关闭
      handleClose() {
        this.dialogVisible = false;
        this.$refs.ruleForm.resetFields();
      },
      // 浮层提交 
      handleSubmit() {
         addFollowRecord({
            nicheId:this.ruleForm.nicheId,
            customId:this.ruleForm.customId,                        
            customLevel:this.ruleForm.customerLevel,
            keyBehavior:this.ruleForm.keyBehavior,
            followMethod:this.ruleForm.followUpMethod,
            content :this.ruleForm.followUpContent,
            nextFollowDate:this.ruleForm.nextFollowUpTime
          }).then((res) => {
            if(res.status === 200){
              console.log('上传成功2',res)
              this.handleClose()
            }
          })

      },
      //获取关键行为和跟进方式
      getKeyBehaviorFn(){
        let data={
            typeCode:'KEYBEHAVIOR'          
          }          
          getKeyBehavior(data).then((res) => {
            if(res.status === 200){
              console.log('关闭成功',res) 
              this.ruleForm.behaviorList = res.data             
            }
          });

          let obj={
            typeCode : 'FOLLOWMETHOD'          
          }          
          getKeyBehavior(obj).then((res) => {
            if(res.status === 200){
              console.log('关闭成功',res) 
              this.ruleForm.followList = res.data        
            }
          });



      }
    }
  }
</script>

<style lang="scss" scoped>

.follow-up-add-dialog{

}

</style>