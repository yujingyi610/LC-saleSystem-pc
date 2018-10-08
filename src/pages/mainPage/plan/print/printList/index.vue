<template>
  <div id="printList">
    <div class="main" v-show="listShow" >
        <div class="main-header" style="margin:20px;height:30px">
            <el-radio-group v-model="radio" style="float: left;" @change="handleChangeTab">
                <el-radio-button label="打印模板设置" ></el-radio-button>
                <el-radio-button label="打印字段编码" ></el-radio-button>
            </el-radio-group>
            <el-button v-show="this.tableshow" type="success" v-has="'prj:print:add'" @click="addNewinfor" style="float:right;">新增</el-button>
        </div>
        <div v-show="this.tableshow" class="main-table1" style="margin:0 20px;">
            <el-table :data="printTemplate" border style="width: 100%">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="projectName" label="项目名称"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="typeName" label="套打类型" show-overflow-tooltip></el-table-column>
                <el-table-column prop="name" label="模板名称"  show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="320">
                    <template slot-scope="scope">
                        <el-button  type="text" v-has="'prj:print:edit'" @click="editprintinfor(scope.row)">编辑</el-button>
                        <el-button  type="text" v-has="'prj:print:view'" @click="looklist(scope.row)">预览</el-button>
                        <el-button  type="text" @click="deleteModel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-show="!this.tableshow" class="main-table2" style="margin:0 20px;">
            <el-table :data="printTemplateFiled" border style="width: 100%">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="typeName" label="套打类型"></el-table-column>
                <el-table-column  label="操作" width="320" >
                    <template slot-scope="scope">
                        <el-button  type="text" @click="lookprintlist(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>

    <!-- 编辑新增模态框 -->
    <el-dialog :title="this.addbtn+'列表信息'" :visible.sync="innerVisible" class="inner_dialog line_height28" width="80%">
        <el-form :model = "editForm" >
            <el-row type="flex" justify="space-between">
                <el-col :span = "9">
                    <el-form-item prop="projectName" label="项目名称:">
                        <span>{{projrctName}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span = "9">
                    <el-form-item prop="typeName" label="套打类型:" >
                        <!--<el-input v-model="editForm.typeName" ></el-input>-->
                        <el-select v-model="editForm.typeName" placeholder="请选择套打类型" value-key="id" @change="changePrintType">
                          <el-option
                            v-for="item in modelTypeList"
                            :key="item.id"
                            :label="item.itemDesc"
                            :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
                <el-col :span = "9">
                    <el-form-item prop="code" label="模板名称:" >
                        <el-input v-model="editForm.code"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!-- 富文本编辑器  -->
        <div class="ueditor" style="margin-top:20px">
            <UEditor :config=config :typeId="postTypeId" :editView="editDisplay" ref="ueditor"></UEditor>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="success" @click="keepeditEdit">保存</el-button>
            <el-button type="button" @click="canceleEdit">取消</el-button>
        </div>
    </el-dialog>
    <el-card v-show="printlistshow" class="box-card" style="height:100%">
        <div slot="header" class="clearfix" style="font-size : 14px">
            <span>认筹单字段对照表</span>
            <el-button @click="printBack" style="float: right; padding: 3px 0;font-size : 14px" type="text">返回</el-button>
        </div>
        <div  class="text item">
            <el-table :data="FiledList" border style="width: 100%" height="700">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="name" label="字段名称"></el-table-column>
                <el-table-column prop="code" label="打印编码"></el-table-column>
            </el-table>
        </div>
    </el-card>

    <el-dialog
      title="提示"
      :visible.sync="modelDialog"
      width="30%">
      <span>{{dialogMessage}}</span>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="reFreshList">确 定</el-button>
  </span>
    </el-dialog>

    <!--预览弹框-->
    <el-dialog title="预览模板" :visible.sync="viewVisible" class="inner_dialog print-demo" width="60%">
      <div style="width:100%;overflow-y:scroll;height:650px;border:solid thin #dcdfe6;">
        <div style="margin:0 auto;padding:10px;" v-html="viewHtml"></div>
      </div>
    </el-dialog>
  </div>

</template>

<script>

  import axios from "@/axios/api.js";
  import regular from "@/assets/regular/regular.js";
  import {addAndEdit,getModelList,getModelViewList,getFieldSeting,deleteList,getModel} from "@/api/pages/mainPage/plan/print";
//引入组件
  import Ueditor from './ueditor';
    export default {
        props: ['teamList'],
        components: {
            'UEditor': Ueditor
        },
        data() {
            return {
                radio:'打印模板设置',
                tableshow:true,
                //富文本编辑器
                config: {
                    /*可以在此处定义工具栏的内容 ，确定使用内容后可删除此注释
                    toolbars: [[
                        'fullscreen', 'source', '|', 'undo', 'redo', '|',
                        'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                        'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                        'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                        'directionalityltr', 'directionalityrtl', 'indent', '|',
                        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                        'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                        'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
                        'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
                        'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
                        'print', 'preview', 'searchreplace', 'drafts', 'help'
                    ]],*/
                    //实际使用工具栏的内容
                    toolbars: [
                    ['fullscreen', 'source','|', 'undo', 'redo','|','bold', 'italic', 'underline', 'fontborder', 'strikethrough',
                     '|','superscript','subscript','|', 'forecolor','backcolor','|', 'removeformat','formatmatch','|', 'insertorderedlist',
                     'insertunorderedlist', '|','selectall', 'cleardoc','fontfamily','fontsize','justifyleft','justifyright',
                     'justifycenter','justifyjustify','|','inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells',
                      'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts','print','preview','variable'
                     ]
                    ],
                    autoHeightEnabled: false,
                    autoFloatEnabled: true,　　//是否工具栏可浮动
                    initialContent:'请输入内容',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
                    autoClearinitialContent:true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
                    initialFrameWidth: null,
                    initialFrameHeight: 280,
                    BaseUrl: '',
                    UEDITOR_HOME_URL: 'static/'
                },
                activeName2: 'first',
                printTemplate:[],
                printTemplateFiled:[],
                innerVisible:false,//编辑模态框
                editForm:{},//新增/编辑输入框
                listShow:true,
                printlistshow:false,
                addbtn:'编辑',//标题
                modelDialog:false,//新增编辑弹框提示
                modelTypeList:[],//模板类型列表
                dialogMessage:'',
                editId:'',
                projrctName:'',
                thisTreeNode:'',
                FiledList:[],//字段对照表数据
                postTypeId:'',//传递给富文本组件的类型参数
                viewVisible:false, //预览模板弹框
                viewHtml:'',//预览内容
                editDisplay:'请输入内容',//富文本编辑器回显内容
            };
        },
        // mounted(){
        //   console.log(this.$parent.teamList);
        // },
        //监听树中所选项目
        watch:{
         teamList :function () {
              console.log(this.$parent.teamList);//获取所选项目信息
              this.thisTreeNode = this.$parent.teamList[0];
              let projectId = {
                projectId:this.thisTreeNode.id
              }
              this.getThisModelList(projectId);
           }
        },
        methods: {
            handleChangeTab(val){
                if(val === '打印模板设置'){
                    this.tableshow = true;
                }else{
                     this.tableshow = false;
                }
            },
            //编辑列表信息
            editprintinfor(val){
                this.innerVisible = true;
                this.addbtn = '编辑';//修改标题
                 
                this.editId = val.id;
                //this.editForm.typeName = val.type;
                this.editForm.code = val.name;
                //this.config.initialContent = val.content;
                this.editDisplay = val.content;
            },
            //预览打印模板信息
            looklist(val){
              this.viewVisible = true;
              let that = this;
              var params = {
                id:val.id
              }
              getModel(params).then(function(res){
                that.viewHtml = res.data.content;
              });
            },
            //预览打印字段信息
            lookprintlist(val){
                let that = this;
                this.listShow = false;
                this.printlistshow = true;
                console.log(val.type);
                let params = {
                  type:val.type
                }
                getFieldSeting(params).then(function(res){
                   ;
                  that.FiledList = res.data.list;
                })
            },
            printBack(){
                this.listShow = true;
                this.printlistshow = false;
            },
            //取消编辑信息
            canceleEdit(){
                this.innerVisible = false;
                this.editForm.typeName = '';
                this.editForm.code = '';
            },
            //保存编辑信息
            keepeditEdit(){
                let that = this;
                this.innerVisible = false;
                this.$refs.ueditor.getUEContent();
                let content = this.$refs.ueditor.val;
                let projectId = this.$parent.teamList[0].id;

                //判断窗口为新增或编辑
                if(this.addbtn === '新增'){
                  let data = {
                    content: content,
                    name: this.editForm.code,
                    projectId: projectId,
                    type: this.editForm.typeName.itemCode,
                    typeName: this.editForm.typeName.itemDesc,
                  };
                  addAndEdit(data).then(function(res){
                     ;
                      if(res.message == '成功'){
                        that.modelDialog = true;
                        that.dialogMessage='新增模板保存成功！';
                      }
                  }).catch(function(erro){
                      that.modelDialog = true;
                      that.dialogMessage='模板类型名称重复，请重新输入！';
                  });
                }else{
                  let data = {
                    content: content,
                    id:this.editId,
                    name: this.editForm.code,
                    projectId: projectId,
                    type: this.editForm.typeName.itemCode,
                    typeName: this.editForm.typeName.itemDesc,
                  };
                  console.log(this.editForm.typeName)
                  addAndEdit(data).then(function(res){
                    if(res.message == '成功'){
                      that.modelDialog = true;
                      that.dialogMessage = '编辑模板保存成功！';
                    }
                  });

                }
            },
            //新增打印模板信息
            addNewinfor(){
                this.innerVisible = true;
                this.addbtn = '新增';//修改标题
            },
            reFreshList(){//刷新当前模板列表数据
              let projectId = {
                projectId:this.thisTreeNode.id
              }
              this.modelDialog = false;
              this.getThisModelList(projectId);
            },
            getThisModelList(params){
              let that = this;
              that.projrctName = this.thisTreeNode.name;
              getModelViewList(params).then(function(res){
                if(res.data.length>0){
                  that.printTemplate = res.data;
                  that.printTemplateFiled = res.data;
                }else{
                  that.printTemplate = [];
                  that.printTemplateFiled = [];
                }
              });
            },
          changePrintType(){
              //console.log(this.editForm.typeName.itemCode);
              this.postTypeId = this.editForm.typeName.itemCode;
          },
          deleteModel(val){//删除模板
            let that = this;
            let params = {
              id:val.id
            }
            deleteList(params).then(function(res){
               ;
              that.modelDialog = true;
              if(res.message == '成功'){
                that.dialogMessage = '删除模板成功！';
              }else{
                that.dialogMessage = '删除模板失败！';
              }
            })
          }
        },
      mounted:function(){
          //'TEMPLATE_TYPE'
        let that = this;
        let params = {
          typeCode:'TEMPLATE_TYPE'
        }
        getModelList(params).then(function(res){
           ;
          if(res.status == 200){
            that.modelTypeList = res.data
          }
        });
      }
    }

</script>

<style scoped>

#printList{
    border: 1px solid #E5E5E5;
    border-radius: 5px;
    height: 100%;
}
.printListcard{
    margin-top:20px;
    margin-left:20px
}

</style>
