<template>
    <div class="dictionaryPages">
      <div class="addItem">
        <span class="lable">键值：</span>
        <el-input v-model="inputValue.key" class="addInput"></el-input>
      </div>
      <div class="addItem">
        <span class="lable">标签：</span>
        <el-input v-model="inputValue.lable" class="addInput"></el-input>
      </div>
      <div class="addItem">
        <span class="lable">类型：</span>
        <el-input v-model="inputValue.kind" class="addInput"></el-input>
      </div>
      <div class="addItem">
        <span class="lable">描述：</span>
        <el-input v-model="inputValue.dsc" class="addInput"></el-input>
      </div>
      <div class="addItem">
        <span class="lable">排序：</span>
        <el-input v-model="inputValue.sort" class="addInput"></el-input>
      </div>
      <div class="addItem">
        <span class="lable">备注：</span>
        <el-input type="textarea" v-model="inputValue.note" class="addInput"></el-input>
      </div>
      <div class="footer">
        <el-button type="primary" class = "saveBtn"  @click = "handleSaveDictionary">保存</el-button>
        <el-button @click = "handleback">返回</el-button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "dictionary-add-item",
        data(){
          return{
            inputValue:{
              key:"",
              lable:"",
              kind:"",
              dsc:"",
              sort:"",
              note:""
            }
          }
        },
      methods: {
          handleback(){
            this.$parent.handleSelect(0,['0']);
             //this.$parent.activeIndex='0'
          },

          handleSaveDictionary(){
            var dictionaryItem = {
              key: this.inputValue.key,
              lable: this.inputValue.lable,
              kind: this.inputValue.kind,
              dsc: this.inputValue.dsc,
              sort: this.inputValue.sort,
              note: this.inputValue.note
            };
            this.clearForm();
            this.$store.commit('dictionaryAddItem',dictionaryItem);
            this.$parent.handleSelect(0,['0']);
          },

          clearForm(){
              this.inputValue.key = "";
              this.inputValue.lable = "";
              this.inputValue.kind = "";
              this.inputValue.dsc = "";
              this.inputValue.sort = "";
              this.inputValue.note = "";
          }
      }
    }
</script>

<style scoped>
  .addItem{
    padding-bottom: 8px;
    border-bottom: 1px dotted #ddd ;
    margin-bottom: 8px;
  }
  .addInput{
    width: 330px;
    vert-align: top;
  }
  .lable{
    display: block;
    margin-left: 160px;
    float: left;
    padding-top: 7px;
  }
  .saveBtn{
    background-color: #007440;
    border-color: #007440;
    margin-right: 20px;
  }
  .footer{
    padding: 20px 100px 20px 215px;
    margin-top: 20px;
  }
</style>
