<template>
  <div>

      <script id="editor" type="text/plain" ></script>
      <!-- 编辑模态框 -->
      <el-dialog id="uedVisible" :modal=false append-to-body title="列表信息" :visible.sync="uedVisible" class="inner_dialog line_height28" width="30%">
          <span style="position:absolute;top:55px;color:#4DBE61;">请使用鼠标左键双击信息行添加</span>
          <el-table :data="printTemplate" @row-dblclick="handleLookRow"  border style="width: 100%" height="250">
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column prop="name" label="字段编码"></el-table-column>
              <el-table-column prop="code" label="打印编码"></el-table-column>
          </el-table>
      </el-dialog>
  </div>
</template>

<script>
  import axios from "@/axios/api.js";
  import '../../../../../../../static/ueditor.config.js'
  import '../../../../../../../static/ueditor.all.js'
  import '../../../../../../../static/lang/zh-cn/zh-cn.js'
  import {getEditorDialog} from "@/api/pages/mainPage/plan/print";
  //引入样式
  import ueditor from "../../../../../../../static/themes/default/css/ueditor.css"
  import  "../../../../../../../static/themes/default/css/ueditor.min.css"
  export default {
    name: "UEditor",
    props: {
      id: {
          type: String
      },
      config: {
          type: Object
      },
      typeId:{
          type: String
      },
      editView:{
          type: String
      }
    },
    data() {
      return {
        editor: null,
        val:null, //编辑文本值
        clear:null,
        uedVisible:false,
        printTemplate:[
          /*{
              projectName:'测试项目名' ,
              typeName:'测试套打名',
              code:'测试模板名',
              value:'123456'
          },
          {
              projectName:'测试项目名' ,
              typeName:'测试套打名1',
              code:'测试模板名1',
              value:'147258'
          }*/
      ],
      }
    },

    mounted() {
      //初始化UE
      const _this = this;
       this.editor = UE.getEditor('editor',this.config);
       UE.commands['variable'] = {
          execCommand: function(cmdName){
              _this.uedVisible = true;
          }
      };

      setTimeout(function () {
        UE.getEditor('editor').execCommand('cleardoc');
        UE.getEditor('editor').execCommand('insertHtml', _this.editView);//insertHtml
      },500)
      //UE.getEditor('editor').execCommand('cleardoc');
      //UE.getEditor('editor').execCommand('insertHtml', this.editView);//insertHtml

      let that = this;
      let params = {
        type:this.typeId
      }
      getEditorDialog(params).then(function(res){
         ;
        that.printTemplate = res.data;
      });

    },
    watch:{
      typeId:function(){
      //console.log(this.typeId);
        let that = this;
        let params = {
          type:this.typeId
        }
        getEditorDialog(params).then(function(res){
           ;
          that.printTemplate = res.data;
        });
      },
      editView:function(){
        UE.getEditor('editor').execCommand('cleardoc');
        UE.getEditor('editor').execCommand('insertHtml', this.editView);//insertHtml
        //console.log(this.editView);
      }
    },
    destoryed() {
      this.editor.destory();
    },
    methods:{
      //获取所需信息  ue.+方法名
      getUEContent: function(){
        let ue = UE.getEditor('editor');//定义了一个UEditor编辑器
        this.val = ue.getContent();//获取编辑的Html格式文本
        ue.setContent('');//清空

       return this.editor.getContent();
      },
      //列表选择设置
      handleLookRow(val){
        console.log(val.value);
        this.uedVisible = false;
        var value = val.value;
        UE.getEditor('editor').execCommand('insertHtml', '$'+'{'+value+'}')
      }
    },
  }
</script>

<style scoped>

.el-dialog__wrapper {
    z-index:9999!important;
}

</style>
