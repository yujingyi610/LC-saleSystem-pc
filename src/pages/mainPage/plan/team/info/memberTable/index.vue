<template>
  <div id="memberTable">

    <div class="table">

      <div class="tableHeader">
        <h3 class="standardTitle tableHeaderLeft">团队成员</h3>
        <div class="tableHeaderBtnBox">
          <el-button type="text" @click="AddTeamMember"  v-has="'prj:salegroup:member:add'">增加成员</el-button>
        </div>
      </div>

      <div class="tableBody">

        <el-table :data="teamMemberList" border  empty-text = "没有相应数据" max-height="480">
          <el-table-column  type="index" label="序号" width="50px" align ="center"    ></el-table-column>
          <el-table-column prop="userName" label="用户名" width="140px" align ="center"   show-overflow-tooltip></el-table-column>
          <el-table-column prop="userRealName" label="姓名" width="70px" align ="center"   show-overflow-tooltip ></el-table-column>
          <el-table-column prop="sexName" label="性别" width="60px" align ="center"   show-overflow-tooltip></el-table-column>
          <el-table-column prop="groupRoleName" label="角色"  align ="center"  show-overflow-tooltip ></el-table-column>
          <el-table-column prop="mainPositionName" label="职务(融合平台)" width="120px" align ="center"   show-overflow-tooltip></el-table-column>
          <!--<el-table-column prop="deptName" label="部门" width="120px" align ="center"></el-table-column>-->
          <el-table-column prop="action" label="操作" align ="center" width="100px"   >
            <template slot-scope="scope">
              <!--<a class="textBtn" @click.stop ="handleEditorMember(scope.$index, scope.row)">编辑</a>-->
              <el-button type="text" @click.stop ="handleDeleteMember(scope.$index, scope.row)" v-has="'prj:salegroup:member:del'">移除</el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>

      <!--新增团队成员对话框-->
      <el-dialog title="新增团队人员" :visible.sync="addTeamMemberDialogSing" width="90%" :before-close="handleCloseAddMember">
        <div class="dialogBox">
          <div class="dialogHeader">

            <el-form :model = "checkForm" :rules="addTeamMemberRules">
              <el-row :gutter="24">

                <el-col :span="7">
                  <el-form-item label="用户名:"  class="line_height28 dialogItem" label-width="70px">
                    <el-input type="text" v-model= "checkForm.userName" class="dialogInput"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="7">
                  <el-form-item label="姓名:" class="line_height28 dialogItem" label-width="70px">
                    <el-input type="text" v-model= "checkForm.realName" class="dialogInput" ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="7">
                  <el-form-item label="所属组织:" class="line_height28 dialogItem" label-width="70px">
                    <el-input type="text" v-model= "checkForm.organization" class="dialogInput"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="3">
                  <el-button type="primary" @click="checkTeamMember">查找</el-button>
                </el-col>
              </el-row>
            </el-form>

          </div>

          <div class="dialogBorder">
            <el-row :gutter="24">

              <el-col :span="5"  style="max-height: 300px" class="addUserTreeBox">
                <el-tree v-loading="loading" accordion :load="getGroupTree" lazy highlight-current :props="groupTreeProps" @node-click="handleNodeClick"></el-tree>
              </el-col>

              <el-col :span="19" >
                  <el-row :gutter="24">

                    <el-col :span="13" style="padding-left: 0px; padding-right: 0px">
                      <div class="groupOrganizationTableBox">
                        <div class="groupOrganizationTableHeader standardTitle">成员</div>
                        <div class="groupOrganizationTableBody">

                          <el-table ref="groupTable" :data="groupOrganizationList" border size="mini"
                                    max-height="260"     @select="handleGroupTableSelectionOne" @select-all="handleGroupTableSelectionAll">
                            <el-table-column type="selection" width="35" align="center"  ></el-table-column>
                            <el-table-column prop="userName" label="用户名"  align="center"   show-overflow-tooltip></el-table-column>
                            <el-table-column prop="realName" label="姓名" width="70" align="center"  show-overflow-tooltip ></el-table-column>
                            <el-table-column prop="userCode" label="工号" width="90" align="center"   show-overflow-tooltip></el-table-column>
                            <el-table-column prop="deptName" label="部门"  align="center"  show-overflow-tooltip ></el-table-column>
                          </el-table>

                        </div>
                      </div>
                    </el-col>

                    <el-col :span="3" class ="btnBox">

                      <div class="groupBtnBox">
                        <el-button size="mini" type="primary" class ="groupBtn" @click="addMemberToTeam">添加 &gt;</el-button>
                      </div>

                      <div class="groupBtnBox">
                        <el-button size="mini" type="primary" class ="groupBtn" @click = "removeMember"> &lt; 移除</el-button>
                      </div>

                    </el-col>

                    <el-col :span="8" style="padding-left: 0px; padding-right:0px">
                      <div class="groupOrganizationTableHeader standardTitle">团队成员</div>

                      <el-table ref="teamTable" :data="addTargetlist" border size="mini"
                                max-height="260" :row-class-name="tableRowClassName"   @selection-change="teamTableRowClick" >
                        <el-table-column type="selection" width="35" align="center"   ></el-table-column>
                        <el-table-column prop="userName" label="用户名"  align="center"  show-overflow-tooltip ></el-table-column>
                        <el-table-column prop="realName" label="姓名"  align="center"   show-overflow-tooltip></el-table-column>
                        <!--<el-table-column prop="userCode" label="工号" width="60" align="center"></el-table-column>-->
                        <!--<el-table-column prop="deptName" label="部门"  align="center"></el-table-column>-->
                        <!--<el-table-column prop="action" label="操作" align ="center" >-->
                          <!--<template slot-scope="scope" class="userManagement_actionBox">-->
                            <!--<el-select v-model="addTargetlist[scope.$index].groupRoleCode" size = "mini" style="width: 100px" >-->
                              <!--<el-option label="项目经理" value="0"></el-option>-->
                              <!--<el-option label="销售人员" value="1"></el-option>-->
                            <!--</el-select>-->
                          <!--</template>-->
                        <!--</el-table-column>-->
                      </el-table>
                    </el-col>

                  </el-row>
              </el-col>

            </el-row>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
            <el-button  @click="cancelAddTeamTree">取 消</el-button>
            <el-button type="primary" @click="handleAddTeamMember">确 定</el-button>
        </span>
      </el-dialog>

      <!--编辑团队成员- -->
      <el-dialog title="人员编辑"   :visible.sync="editorTeamMemberDialogSing" width="70%">

        <el-form :model = "teamMemberEditorForm" ref ="teamMemberEditorDialog" :rules ="teamMemberEditordialogRule"  label-width="80px">
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="用户ID:"  class="line_height28" >
                <el-input type="text" disabled  v-model= "teamMemberEditorForm.userId" class="dialogInput"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
            <el-form-item label="姓名:"  class="line_height28" >
              <el-input type="text" disabled v-model= "teamMemberEditorForm.name" class="dialogInput"></el-input>
            </el-form-item>
            </el-col>

            <el-col :span="8">
            <el-form-item label="工号:"  class="line_height28" >
              <el-input type="text" disabled  v-model= "teamMemberEditorForm.userCode" class="dialogInput"></el-input>
            </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="部门:" class="line_height28" >
                <el-input type="text" disabled  v-model= "teamMemberEditorForm.deptName" class="dialogInput"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="角色:" prop="groupRoleTempValue" class="line_height28" >
                <el-select v-model="teamMemberEditorForm.groupRoleTempValue" size = "mini" @change="groupRoleValueChange" >
                  <el-option label="项目经理" value="项目经理,0"></el-option>
                  <el-option label="销售人员" value="销售人员,1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="所属团队:" prop="saleGroupId" class="line_height28" >
                <el-select v-model="teamMemberEditorForm.saleGroupId" size = "mini" >
                  <el-option
                    v-for="item in teamMemberEditorOption.team"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

          </el-row>

        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="editorTeamMemberDialogSing = false">取 消</el-button>
            <el-button type="primary" @click="handleEditorMemberClick('teamMemberEditorDialog')" >确 定</el-button>
        </span>
      </el-dialog>


    </div>
  </div>
</template>

<script>
  import axios from "@/axios/api.js";
  import { removeSaleGroupUser ,editorSaleGroupUser ,getTeamTreeList ,addSaleGroupUsers ,getUserFromCompanies,
    getOrgUnitTree,searchUserFromCompanies,getSaleGroupUserList} from "@/api/pages/mainPage/plan/team/index.js";
  import regular from "@/assets/regular/regular.js";
    export default {
      props:['teamMemberList','currentTeamTreeNode','projectId'],

      data(){
        return{
          addTeamMemberDialogSing:false, //添加成员对话框标志位
          editorTeamMemberDialogSing:false,//编辑团队成员标志位
          /*********对话框搜索form***********/
          checkForm:{
            userName:"",
            realName:"",
            organization:""
          },
          /**********销售团队成员编辑form**************/
          // showUserMsg:{
          //   userId:"",
          //   name:"",
          //   userCode:"",//工号
          //   deptName:"",
          // },

          groupRoleValue:{
            groupRoleCode:"",
            groupRoleName:"",
          },

          teamMemberEditorForm:{
            userId:"",
            name:"",
            userCode:"",//工号
            deptName:"",
            groupRoleTempValue:"",
            // groupRoleCode:"",
            // groupRoleName:"",
            saleGroupId:"",
            id:""
          },
          /*********销售团队角色及所属团队选项********/
          teamMemberEditorOption:{
            role:[],
            team:[]
          },
          /**********增加团队************/
          groupTree:[],
          groupTreeProps:{
            children: 'children',
            label: 'label'
          },

          /**********穿梭框团队成员添加*************/
          //集团列表
           groupOrganizationList:[],
           SelectedMemberList:[], //被选择的人员的临时列表
           addTargetlist:[], //添加的项目团队标列表
           //selectedDeleteList:[], //
           currentWillDeleteItemList: [], //当前选中要被删除项的索引值
          /**************编辑团队成员正则*********************/
          teamMemberEditordialogRule:{
            groupRoleTempValue:[
              {required: true, message: '请选择角色',trigger: 'change'}
            ],
            saleGroupId:[
              {required: true, message: '请输所属团队',trigger: 'change'}
            ]
          },
          addTeamMemberRules:{
            userId:[
              {validator: regular.numberSix,trigger:'change' }
            ],
          },
          currentTreeNode:"", //融合平台树节点
          currentTreeNodeId:0, //融合平台树的id

          /**********加载中提示*************/
          loading:false
        }
      },

      methods:{

        /********团队成员删除*********/
        handleDeleteMember(index,row){
          let that = this;

          this.$confirm('这将会从当前团队中移除此成员，你确定移除吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            let params = new URLSearchParams();
            params.append( "id", row.id );

            removeSaleGroupUser(params)
              .then(res=>{
                if( res.status === 200 ){
                  //更新列表
                  getSaleGroupUserList(that.$props.currentTeamTreeNode.data.id)
                    .then(res=>{
                      //console.log("接收人员表更新:",res);
                      if(res.status === 200){
                        that.$emit('changeTeamMember',res.data);
                      }
                    });
                  that.$message({
                    type: 'success',
                    message: '删除成功!',
                    showClose: true
                  });
                }
              });
          }).catch(() => {
            /*this.$message({
              type: 'info',
              message: '已取消删除'
            });*/
          });
        },

        /***********编辑团队成员**************/
        //选择角色时触发 分离 name 和 value
        groupRoleValueChange(value){
          let groupRoleValue = value.split(',');
          this.groupRoleValue.groupRoleName = groupRoleValue[0];
          this.groupRoleValue.groupRoleCode = groupRoleValue[1];
        },

        handleEditorMember(index,row){
            // 
         this.teamMemberEditorForm.userId =  row.userId;
         this.teamMemberEditorForm.name = row.userName;
         this.teamMemberEditorForm.userCode = row.userCode; //工号
         this.teamMemberEditorForm.deptName = row.deptName; //部门
         this.teamMemberEditorForm.id = row.id; //获取当前被编辑用户项id

          let that = this;
          let params = new URLSearchParams();
          params.append( "projectId", this.$props.projectId );

          getTeamTreeList(params)
            .then(res=>{
              if(res.status === 200){
                that.teamMemberEditorOption.team = res.data;
                that.editorTeamMemberDialogSing = true; //获取编辑选项后弹出对话框
              }
            });
          // axios.JH_news2('/api/saleGroup/getByProjectIdNoTree?projectId='+this.$props.projectId)
          //   .then(res=>{
          //     if(res.status == "200"){
          //       this.teamMemberEditorOption.team = res.data;
          //       this.editorTeamMemberDialogSing = true; //获取编辑选项后弹出对话框
          //     }
          //   })

          // this.teamMemberEditorForm.role  //角色需要后端获取

        },



        //编辑团队成员确定键
        handleEditorMemberClick(formName){

          this.$refs[formName].validate((valid) => {
            if (valid) {
              //let data = this.teamMemberEditorForm;
              let that = this;
              let params = {
                saleGroupId:this.teamMemberEditorForm.saleGroupId,
                groupRoleCode:this.groupRoleValue.groupRoleCode,
                groupRoleName:this.groupRoleValue.groupRoleName,
                id:this.teamMemberEditorForm.id
              };
              editorSaleGroupUser(params)
                .then(res=>{
                  if(res.status == "200"){

                    if(res.data[0].repeatingList === ""){
                      that.$emit('changeTeamMember',res.data[0].data);
                      that.editorTeamMemberDialogSing=false;
                      that.clearEditorTeamUserTable();
                    }else{
                      let wanging = res.data[0].repeatingList;
                      that.$alert( wanging+"在列表中以存在", '标题名称', {
                        confirmButtonText: '确定',
                        // callback: action => {
                        //   that.$message({
                        //     type: 'massage',
                        //     message: `action: ${ action }`
                        //   });
                        // }
                      });
                    }
                  }
                });
            } else {
              return false;
            }
          });
        },

        //新增团队成员
        AddTeamMember(){
          //console.log(this.$parent);
          //判断团队树被点击
          if(this.$props.currentTeamTreeNode!=""){
            let userInfo = JSON.parse(sessionStorage.getItem('user-info'));
            //this.loading = true;
            getOrgUnitTree({parentId: userInfo.cityId})
              .then(res=>{
                //console.log("33333",res);
                 if(res.status == '200' ){
                   //this.groupTree = [];
                   // let groupTree = this.groupTree;
                   // let data = res.data;
                   // this.groupTree = [...groupTree,...data];
                   //this.groupTree = this.groupTree.concat(res.data);
                   //this.loading = false;
                   this.groupTree = res.data;
                   this.addTeamMemberDialogSing = true;
                 }
              });
          }else{
            this.$alert('请先选择团队！', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            }).then(() => {

            });
          }
        },

        //融合平台团队树懒加载方法
        getGroupTree(node, resolve){
          if (node.level === 0) {
            return resolve(this.groupTree);
          }

          getOrgUnitTree({parentId:node.data.id})
            .then(res=>{
              if(res.status === 200){
                resolve(res.data);
              }
            })
        },

        /*********点击融合平台树节点**********/
        handleNodeClick(data,node){
          this.currentTreeNode = node;
          this.currentTreeNodeId = node.data.id;
          let that = this;

          getUserFromCompanies({orgId: node.data.id})//node.data.id
            .then(res=>{
               ;
              if(res.status == "200"){
                that.groupOrganizationList = res.data;
              }
              // that.groupOrganizationList = res;
              // for( let i = 0 ; i < that.groupOrganizationList.length; i++ ){
              //
              //   that.groupOrganizationList[i].deptName = node.data.label;
              //
              //   if(node.parent.data.label!== undefined ){
              //     that.groupOrganizationList[i].deptName = node.parent.data.label + "/"+ that.groupOrganizationList[i].deptName ;
              //     if(node.parent.parent.data.label!== undefined ){
              //       that.groupOrganizationList[i].deptName = node.parent.parent.data.label+"/"+that.groupOrganizationList[i].deptName ;
              //     }
              //   }
              // }
            });

        },

        handleGroupTableSelectionOne(selection, row){
          //if(selection.length>=1)
            this.SelectedMemberList = selection;
        },

        handleGroupTableSelectionAll(selection){
          this.SelectedMemberList = selection;
        },

        tableRowClassName(val){
            val.row.index = val.rowIndex;
        },

        teamTableRowClick(rowList){
          this.currentWillDeleteItemList = rowList;
        },

        addMemberToTeam(){
          if(this.SelectedMemberList.length >= 1) {
            this.addTargetlist =  this.addTargetlist.concat(this.SelectedMemberList);
            let userID = [];
            let resualt = [];
            for(let i = 0 ; i< this.addTargetlist.length;i++){
              if(userID.indexOf(this.addTargetlist[i].id) == -1){
                userID.push(this.addTargetlist[i].id);
                resualt.push(this.addTargetlist[i]);
              }
            }
            this.addTargetlist = resualt;
          }
        },

        removeMember(){
            for( let j = this.currentWillDeleteItemList.length - 1; j >= 0; j-- ){
              this.addTargetlist.splice(this.currentWillDeleteItemList[j].index, 1)
            }
            // this.addTargetlist.splice(this.currentWillDeleteItemIndex,1);
        },

        /*************搜索团队成员***************/
        checkTeamMember(){
          if( !(this.checkForm.userName || this.checkForm.realName) ){
                    this.$message.error('搜索条件不能为空！');
                    return
                }
          let params = {
            userName: this.checkForm.userName,
            realName: this.checkForm.realName
          };

          let that = this;
          searchUserFromCompanies(params)
            .then(res=>{
                if(res.status == "200"){
                  that.groupOrganizationList = res.data;
                  this.checkForm.userName="";
                  this.checkForm.realName="";
                  this.checkForm.organization="";
                }
            });
        },
        /**************确定提交添加团队成员****************/
        cancelAddTeamTree(){
          this.addTeamMemberDialogSing = false;
          this.addTargetlist = [];
          this.groupOrganizationList = [];
        },

        handleAddTeamMember(){
          let data = this.addTargetlist;
          let that = this;
          let params = new URLSearchParams();
          params.append( "saleGroupId", this.$props.currentTeamTreeNode.data.id );
          addSaleGroupUsers(params,data)
            .then(res=>{
              if(res.status === 200){
                if(res.data.repeatingList === ""){
                  getSaleGroupUserList(this.$props.currentTeamTreeNode.data.id)
                    .then(res=>{
                      if(res.status === 200){
                        that.$emit('changeTeamMember',res.data);
                      }
                    });
                  //that.$emit('changeTeamMember',res.data[0].data);
                  that.addTeamMemberDialogSing=false;

                }else{
                  let wanging = res.data.repeatingList;
                  that.$alert( wanging+"在列表中已存在", '提示', {
                    confirmButtonText: '确定',
                  });
                }
              }else{
                this.$message.error(res.message)
              }
            });

           this.addTargetlist = [];
           this.groupOrganizationList = [];

        },

        handleCloseAddMember(){
          this.addTargetlist = [];
          this.groupOrganizationList = [];
          this.addTeamMemberDialogSing=false;
        },

        clearEditorTeamUserTable(){

          this.teamMemberEditorForm.userId="";
          this.teamMemberEditorForm.name="";
          this.teamMemberEditorForm.userCode="";//工号
          this.teamMemberEditorForm.deptName="";
          this.teamMemberEditorForm.groupRoleTempValue="";
          this.teamMemberEditorForm.groupRoleCode="";
          this.teamMemberEditorForm.saleGroupId="";
          this.teamMemberEditorForm.id="";
        }
      }
    }
</script>

<style scoped>

  .tableHeader{
    height: 40px;
    background-color: #F0F0F0 ;
    overflow: hidden;
    line-height: 40px;
    padding: 0 25px;
  }

  .tableHeaderLeft{
    /* display: inline-block; */
    float: left;
  }

  .tableHeaderBtnBox{
    /* display: inline-block; */
    float: right;
  }

  .textBtn{
    font-size: 12px;
    color: #4DBE61;
    cursor: pointer;
  }

  .dialogItem{
    display: inline-block;
    width: 100px;
  }

  #memberTable .dialogItem{
    margin-bottom: 5px;
  }

  .dialogHeader{
    border-bottom: 1px solid #E5E5E5;
    margin-bottom: 10px;
    padding-bottom: 15px;
  }

  .dialogBorder{
    min-height: 200px;
    max-height: 300px;
  }

 /* .groupBtn{ */
    /*float: left;*/
    /*margin: 0 auto;*/
  /* } */
 .groupBtnBox{
   text-align: center;
   margin: 45% 0 ;
 }

  .groupOrganizationTableHeader{
    height: 40px;
    line-height: 40px;
    background-color: #E5E5E5;
    padding-left: 20px;
  }

  .addUserTreeBox{
    overflow: auto;
  }
  h3{
    margin-top: 0;
    border: none;
  }
  /*.groupOrganizationTableBox{*/
    /*max-height: 260px;*/
    /*overflow: auto;*/
  /*}*/
</style>
