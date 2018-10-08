<template>
    <div class="teamManage">

        <div class="teamManageHeader">
          <h3 class = "standardTitle">项目团队</h3>
        </div>

        <el-row :gutter="24" class="teamManageBody" style="margin: 0">


              <el-col :span="6" class="teamManageBodyLeft" style="padding-left: 0 ;padding-right: 0">
              <!---团队管理左侧头部-->
              <div class="teamManageBodyLeftHeader">
                 <h3 class="standardTitle teamNameTitel">团队名称</h3>
                 <div class="teamManageBodyLeftBtnBox" id="teamManageBodyLeftBtnBox">
                   <el-button type="text" @click="editorTeamTree" v-has="'prj:salegroup:edit'">编辑</el-button>
                   <el-button type="text" @click="deleteTeamTreeNode" v-has="'prj:salegroup:del'">删除</el-button>
                   <el-button type="text" @click="addTeamTreeNode" v-has="'prj:salegroup:add'">新增</el-button>
                 </div>
              </div>

              <div class="teamTreebox">
                <el-tree :data="teamList" accordion class="teamTree" :default-expand-all =teamTreeSign highlight-current :props="defaultProps" @node-click="handleNodeClick" ></el-tree>
              </div>

              </el-col>

              <el-col :span="18" class="teamManageBodyRight" style="padding-left: 0 ;padding-right: 0">
                <v-memberTable :teamMemberList="teamMemberList" :currentTeamTreeNode="currentTeamTreeNode" :projectId="projectId" @changeTeamMember="changeTeamMember"></v-memberTable>
              </el-col>

        </el-row>

        <!--编辑团队树对话框 -->
        <el-dialog :title="dialogTitle" :visible.sync="editorTeamTreeSign" width="30%">
          <div class="dialogBox">
            <el-form :model="editorTeamTreeNode" ref="editorTeamTreeDialog" :rules="editorTeamTreeNodeRules" label-width="80px">

              <el-form-item label="团队名称:" class="line_height28" prop="name">
                <el-input type="text" v-model= "editorTeamTreeNode.name" ></el-input>
              </el-form-item>

              <el-form-item label="上级组织:" class="line_height28">
                <span>{{currentTeamTreeNodeParentName}}</span>
              </el-form-item>

              <!--<el-form-item label="备注:" >-->
                <!--<el-input type="textarea" v-model= "editorTeamTreeNode.note" class="deloagTexarea" ></el-input>-->
              <!--</el-form-item>-->

            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="caneleubnitTeamNode">取 消</el-button>
            <el-button type="primary" @click="submitTeamEditorNode('editorTeamTreeDialog')">确 定</el-button>
          </span>
        </el-dialog>

    </div>
</template>

<script>
    //import axios from "@/axios/api.js";
    import MemberTable from "./memberTable"
    import regular from "@/assets/regular/regular.js";
    import { addProjectTeam ,updateProjectTeam ,removeProjectTeam,getSaleGroupUserList} from "@/api/pages/mainPage/plan/team/index.js";
    export default {
        props: ['teamList'],

        components:{
          'v-memberTable':MemberTable
        },

        data() {
          return {
            /**********团队信息列表从父组件获取***********/
            defaultProps: {
              children: 'children',
              label: 'name'
            },
            /*********团队成员信息列表后端获取**************/
            teamMemberList: [],
            /************编辑对话框标志************/
            editorTeamTreeSign: false,
            /*******对话框上级组织********/
            higherLevelOrganizationOption: [],
            /*************记录团队树节点编辑和增加时传给后端***********/
            editorTeamTreeNode:{
              name:"",
              //higherLevelOrganization:"",
              note:"",
              id:"",
            },
            //当前操作团队树节点的Id
            currentTeamTreeNodeId:"",
            //当前操作的团队树节点
            currentTeamTreeNode:"",
            //父节点名称
            currentTeamTreeNodeParentName:"",
            //父节点id包在 data中的
            currentTeamTreeNodeParentId:null,
            //当前对话框模式
            currentDialogMode:"",
            //对话框标题需要随模式转换
            dialogTitle:"",
            //项目id
            projectId:"",
            /**************对话框正则******************/
            editorTeamTreeNodeRules:{
              name:[
                {required: true, message: '请输入团队名称',trigger: 'change'}
              ],
              // higherLevelOrganization:[
              //   {required: true , message: '请选择上级组织',trigger: 'blur'}
              // ]
            },
            /***************团队树****************/
            teamTreeSign:true
          }
        },
        watch:{
          teamList:function () {
            this.currentTeamTreeNode = "";
            this.currentTeamTreeNodeId="";
            this.currentTeamTreeNodeParentName = "";
            this.currentTeamTreeNodeParentId = null;
           }
        },
        methods: {
            //天加团队树节点
            // append(data) {
            //     const newChild = { id: id++, label: 'testtest', children: [] };
            //     if (!data.children) {
            //     this.$set(data, 'children', []);
            //     }
            //     data.children.push(newChild);
            // },

            handleNodeClick(data,node) {
              this.currentTeamTreeNodeId = node.data.id;//每次点击获取id值 saleGroupId
              this.currentTeamTreeNode = node; //获取当前节点
              this.projectId =  node.data.projectId; //存入项目id
              if ( node.level != 1 ) { //顶级点击不予相应
                //获取团队成员表

                let that = this;
                getSaleGroupUserList(node.data.id)
                  .then(res=>{
                    if(res.status === 200){
                      that.teamMemberList = res.data;
                    }
                  });
              }
            },

            //团队树节点删除
            deleteTeamTreeNode(){
              if( this.currentTeamTreeNode != "" ){ // && this.currentTeamTreeNode.level !=1
                if( this.currentTeamTreeNode.level !=1 ){
                  let that = this;
                  this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                  }).then(() => {

                    let params = new URLSearchParams();
                    params.append( "id",this.currentTeamTreeNodeId );

                    removeProjectTeam(params)
                      .then(res=>{
                        //判断此节点是否可被删除
                         ;
                        if(res.status === 200){
                          if(res.data[0].nodeAllowDel != true){
                            that.$emit('changeTeamTree',res.data[0].data);
                            that.currentTeamTreeNode = ""; //操作成功列表刷新需要重新获取节点所以清空当前节点
                            that.currentTeamTreeNodeId = ""; //清除当前选中的节点id
                          }else{
                            that.$notify({
                              title: '警告',
                              message: '此节点不为空不可被删除!',
                              type: 'warning'
                            });
                          }
                        }
                      });
                  }).catch(() => {
                    // this.$message({
                    //   type: 'info',
                    //   message: '已取消删除'
                    // });
                  });
                }else{
                  this.$message("项目不能被删除!");
                }

              }else{
                this.$message( '请选择要删除的团队!');
              }
            },

            //团队树节点编辑
            editorTeamTree(){
              //点击项目名和什么也不点时候是不能是不能编辑分组的

              if( this.currentTeamTreeNode.level !=1 ){//&& this.currentTeamTreeNode != ""
                if( this.currentTeamTreeNode != "" ){
                  this.editorTeamTreeNode.id = this.currentTeamTreeNodeId;//将ID写入发送缓存
                  this.currentDialogMode = "EDITOR";//设置当前对话框模式为编辑
                  this.dialogTitle = "编辑当前团队";//改变对话框标题
                  this.currentTeamTreeNodeParentId = this.currentTeamTreeNode.data.parentId;

                  this.currentTeamTreeNodeParentName = this.currentTeamTreeNode.parent.data.name;//获取当前节点的父节点名称
                  //在这儿得先获取上级组织
                  //axios.JH_news2('/mainpage/plan/team/getHeighterLeveOrganization')
                    //.then(data=>{
                      //this.higherLevelOrganizationOption = data.higherLevelOrganizationOption;
                      this.editorTeamTreeSign = true;//接到上级组织数据后显示对话框
                    //})
                }else {
                  this.$message( '请选择要编辑的团队!' );
                }
              }else{
                this.$message( '项目不可被编辑!' );
              }
            },

            //增加团队树节点
            addTeamTreeNode(){
              //什么也不点是不能天加分组的
              if( this.currentTeamTreeNode != "" ){

                this.editorTeamTreeNode.id = this.currentTeamTreeNodeId;//将ID写入发送缓存
                this.currentDialogMode = "ADD";//设置当前对话框模式为增加团队
                this.dialogTitle = "新增团队";//改变对话框标题
                if(this.currentTeamTreeNode.level !=1){
                  this.currentTeamTreeNodeParentId = this.currentTeamTreeNode.data.id;
                }
                //this.currentTeamTreeNodeParentId = this.currentTeamTreeNode.data.id;
                this.currentTeamTreeNodeParentName = this.currentTeamTreeNode.data.name;
                //axios.JH_news2('/mainpage/plan/team/getHeighterLeveOrganization')//获取上级组织树
                  //.then(data=>{
                    //this.higherLevelOrganizationOption = data.higherLevelOrganizationOption;
                    this.editorTeamTreeSign = true;//接到上级组织数据后显示对话框
                  //})
              }else{
                this.$message( '请选择要添加团队的节点!' );
              }
            },

            //提交团队树编辑内容
            submitTeamEditorNode(formName){

              this.currentTeamTreeNodeId = "";
              if(this.currentDialogMode === "EDITOR" ){

                this.$refs[formName].validate((valid) => {
                  if (valid) {
                    this.editorTeamTreeSign = false;

                    let param = {
                      projectId: this.projectId,
                      name: this.editorTeamTreeNode.name,
                      parentId: this.currentTeamTreeNodeParentId,
                      yn: 1,
                      id:this.editorTeamTreeNode.id
                    };

                    updateProjectTeam(param)
                      .then(res=>{
                        if(res.status === 200){
                          this.$emit('changeTeamTree',res.data.data);
                          this.currentTeamTreeNode = ""; //操作成功列表刷新需要重新获取节点所以清空当前节点
                          this.clearEditorTeamTreeNode();
                        }
                      });
                    // axios.JH_news('/api/saleGroup/update', param)
                    //   .then(res => {
                    //     // ;
                    //     if(res.status == "200"){
                    //       this.$emit('changeTeamTree',res.data.data);
                    //       this.currentTeamTreeNode = ""; //操作成功列表刷新需要重新获取节点所以清空当前节点
                    //       this.clearEditorTeamTreeNode();
                    //     }
                    //   })

                  }else {
                    return false;
                  }
                });

              }else if(this.currentDialogMode === "ADD" ){

                this.$refs[formName].validate((valid) => {
                  if (valid) {
                    this.editorTeamTreeSign = false;

                    // let param = new URLSearchParams();
                    // param.append("projectId",this.projectId);
                    // param.append("name", this.editorTeamTreeNode.name);
                    // param.append("parentId", this.currentTeamTreeNodeParentId);
                    // param.append("yn", "1");
                    let param = {
                      projectId: this.projectId,
                      name: this.editorTeamTreeNode.name,
                      parentId: this.currentTeamTreeNodeParentId,
                      yn: 1
                    };
                    addProjectTeam(param)
                      .then(res=>{
                        if( res.status === 200 ){
                          this.$emit('changeTeamTree',res.data.data);
                          this.currentTeamTreeNode = ""; //操作成功列表刷新需要重新获取节点所以清空当前节点
                          this.clearEditorTeamTreeNode();
                        }
                      });
                    // axios.JH_news('/api/saleGroup/save', param)
                    //   .then(res => {
                    //       
                    //     if(res.status=="200"){
                    //       this.$emit('changeTeamTree',res.data.data);
                    //       this.currentTeamTreeNode = ""; //操作成功列表刷新需要重新获取节点所以清空当前节点
                    //       this.clearEditorTeamTreeNode();
                    //     }
                    //   })

                  } else {
                    return false;
                  }
                });
              }
            },

          changeTeamMember(list){
            this.teamMemberList = list;
          },

          clearEditorTeamTreeNode(){
            this.editorTeamTreeNode.name="";
            this.editorTeamTreeNode.higherLevelOrganization="";
            this.editorTeamTreeNode.note="";
            this.editorTeamTreeNode.id="";
          },
          /***********取消提交编辑/新增团队树节点************/
          caneleubnitTeamNode(){
              this.editorTeamTreeSign=false;
              this.clearEditorTeamTreeNode();
          }
        }
    }
</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .teamManage{
    border: 1px solid #E5E5E5;
    border-radius: 5px;
    height: 100%;
  }
  .teamManageHeader{
    height: 30px;
    padding: 5px 13px;
    line-height: 30px;
    /* background-color: #F0F0F0; */
    border-bottom: 1px solid #E5E5E5;
  }

 .teamManageBody{
    padding: 10px 13px;
    width: 100%;
    height: 100%;
  }
  .teamManageBodyBox{
    border: 1px solid #E5E5E5;
    border-radius: 5px;
    overflow: hidden;
  }
  .teamManageBodyLeft{
    border-right: 1px solid #E5E5E5 ;
    height: 100%;
  }
  .teamManageBodyLeftHeader{
    background-color: #F0F0F0 ;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
  }

  .teamNameTitel{
    /* display: inline-block; */
    float: left;
    margin-left: 10px;
  }

  .teamManageBodyLeftBtnBox{
    /* display: inline-block; */
    float: right;
    margin-right: 0px;
  }
  h3{
    margin-top: 0;
    border: none;
  }
  #teamManageBodyLeftBtnBox button.el-button{
    padding: 0!important;
  }
  .textBtn{
    font-size: 12px;
    color: #4DBE61;
    cursor: pointer;
  }

  .deloagTexarea{
    min-height: 80px;
  }

  .dialogBox{
    width: 100%;
    height: auto;
  }

  .teamTreebox{
    /*min-height: 480px;*/
    /*max-height: 480px;*/
    height: 100%;
    overflow: auto;
  }

  .teamTree{
    flex: 1;
  }

</style>
