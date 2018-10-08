<template>
  <div class="other-frames">
    <!-- 如果当前是初始值 则不做逻辑处理 -->
    <template v-if="labelData">

      <!-- 单选项 元素 -->
      <el-form-item 
        class="m-other-form-item"
        :label="labelData.generalLabelInfo.labelName"
        :rules="labelData.generalLabelInfo.rules"
        :prop="`${labelData.name}.generalLabelInfo.labelValue`"
      >
        <el-radio-group @change="handleRadioChange" v-model="labelData.generalLabelInfo.labelValue">
          <template v-for="(item) in labelData.generalLabelInfo.labelList">
            <el-radio :key="item.id" :label="item.value">{{item.text}}</el-radio>
          </template>

          <!-- 单选项 其他_输入框 -->
          <!-- 如果选择其他选择框 则出现输入框 -->
          <template v-if="labelData.generalLabelInfo.labelValue === labelData.orderLabelInfo.value">
            <el-form-item
              class="m-other-item"
              :rules="labelData.orderLabelInfo.rules"
              :prop="`${labelData.name}.orderLabelInfo.labelOrderValue`"
            >
              <el-input v-model.trim="labelData.orderLabelInfo.labelOrderValue"></el-input>
            </el-form-item>
          </template>

        </el-radio-group>
      </el-form-item>

      <!-- 单选项 其他_输入框 -->
        <!-- 如果选择其他选择框 则出现输入框 -->
      <!-- <template v-if="labelData.generalLabelInfo.labelValue === labelData.orderLabelInfo.value">
        <el-form-item
          :rules="labelData.orderLabelInfo.rules"
          :prop="`${labelData.name}.orderLabelInfo.labelOrderValue`"
        >
          <el-input v-model.trim="labelData.orderLabelInfo.labelOrderValue"></el-input>
        </el-form-item>
      </template> -->

    </template>
  </div>
</template>

<script>

/* 

// 参数参考
  // 注意 labelData 需要放在父组价你的 ruleForm中
  <otherFrames :labelData="ruleForm.labelData"></otherFrames>
labelData : {
  // 需要和传入的对象名称 相同, 不然无法校验数据
  name : 'labelData',
  // 一般标签信息
  generalLabelInfo : {
    // 标签名称
    labelName : '辅导费',
    // 校验
    rules : [
      { required: true , message: '请输入辅导费' , trigger : 'change'},
    ],
    // 标签值 list
    labelList : [
      {text : '单选a' , value : '1',id : 1,type : 1},
      {text : '单选b' , value : '2' , id : 2,type : 2},
      {text : '其他' , value : '3' ,type : 'order' , id : 3},
    ],
    // 当前选择标签的值
    labelValue : '',
  },
  // 其他_选项信息
  orderLabelInfo : {
    // 校验
    rules : [
      { required: true , message: '请输入其他' , trigger : 'blur'},
    ],
    // 根据对应的值 显示input框
    value : '3',
    // 当前input的值
    labelOrderValue : '',
  },
},

*/

  export default {
    props : ['labelData'],
    methods : {
      handleRadioChange(val) {
        // 切换时 清空input数据
        this.labelData.orderLabelInfo.labelOrderValue = '';
      },
    },
  }
</script>

<style lang="scss">

.other-frames{
  .m-other-form-item{
    .el-form-item__label{
      float: left;
    }
    .el-form-item__content{
      float: left;
      width: calc(100% - 100px);
    }
    .m-other-item{
      margin-left: 15px;
      margin-bottom: 0!important;
      .el-input{
        width: 174px;
      }
      &.is-error{
        input{
          border-color: #f56c6c;
        }
      }
    }
    .el-radio-group{
      line-height: 30px;
      margin-top: 5px;
    }
    .el-radio{
      line-height: 30px;
    }
  }
}

</style>