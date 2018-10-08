<template>
    <div>
        <el-form :model = "checkForm" :rules="addTeamMemberRules">
              <el-row :gutter="24">

                <el-col :span="10">
                  <el-form-item label="用户名:"  class="line_height28 dialogItem" label-width="70px">
                    <el-input type="text" v-model= "checkForm.userName" class="dialogInput"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="10">
                  <el-form-item label="姓名:" class="line_height28 dialogItem" label-width="70px">
                    <el-input type="text" v-model= "checkForm.realName" class="dialogInput" ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="4">
                  <el-button type="primary" @click="checkTeamMember">查找</el-button>
                </el-col>
              </el-row>
            </el-form>
        <el-row :gutter="24">
            <el-col :span="8"  style="max-height: 300px" class="addUserTreeBox">
                <el-tree :data="groupTree" v-loading="loading" :load="getGroupTree" lazy highlight-current :props="groupTreeProps" @node-click="handleNodeClick"></el-tree>
            </el-col>
            <el-col :span="16" >
                <div class="groupOrganizationTableBox">
                    <div class="groupOrganizationTableHeader standardTitle">集团成员</div>
                    <div class="groupOrganizationTableBody">

                        <el-table v-if="isRadio" ref="groupTable" :data="groupOrganizationList" border size="mini"
                        max-height="260"   highlight-current-row @current-change="handleCurrentChange">
                            <el-table-column prop="userName" label="用户名"  align="center"></el-table-column>
                            <el-table-column prop="realName" label="姓名" width="70" align="center"></el-table-column>
                            <!-- <el-table-column prop="userCode" label="工号" width="90" align="center"></el-table-column> -->
                            <el-table-column prop="orgNamePath" label="部门"  align="center"></el-table-column>
                        </el-table>

                        <el-table v-else ref="groupTable" :data="groupOrganizationList" border size="mini" row-key="id" @selection-change="changed"
                                    max-height="260">
                            <el-table-column type="selection" width="35" align="center" reserve-selection	></el-table-column>
                            <el-table-column prop="userName" label="用户名"  align="center"></el-table-column>
                            <el-table-column prop="realName" label="姓名" width="70" align="center"></el-table-column>
                            <!-- <el-table-column prop="userCode" label="工号" width="90" align="center"></el-table-column> -->
                            <el-table-column prop="orgNamePath" label="部门"  align="center"></el-table-column>
                        </el-table>

                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import regular from "@/assets/regular/regular.js";
import {getUserFromCompanies, getOrgUnitTree, searchUserFromCompanies} from "@/api/pages/mainPage/plan/team/index.js";
    export default {
        props: {
            isRadio: Boolean
        },
        data() {
            return {
                checkForm:{
                    userName:"",
                    realName:"",
                    organization:""
                },
                addTeamMemberRules:{
                    userId:[
                    {validator: regular.numberSix,trigger:'change' }
                    ],
                },
                groupTree:[],
                groupTreeProps:{
                    children: 'children',
                    label: 'label'
                },
                groupOrganizationList:[],
                loading:false,
                currentTreeNode: '',
                currentTreeNodeId: 0,
                currentRow: [],
                SelectedMemberList: []
            }
        },
        methods: {
            handleGetOrgUnitTree() {
                let userInfo = JSON.parse(sessionStorage.getItem('user-info'));
                getOrgUnitTree({parentId: userInfo.cityId}).then(res=>{
                 if(res.status == '200' ){
                   this.groupTree = res.data;
                   this.addTeamMemberDialogSing = true;
                 }
              });
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
                    if(res.status =="200"){
                        that.groupOrganizationList = res.data;
                    // this.checkForm.userName="";
                    // this.checkForm.realName="";
                    // this.checkForm.organization="";
                    }
                });
            },
            //融合平台团队树懒加载方法
            getGroupTree(node, resolve){
            if (node.level === 0) {
                return resolve(this.groupTree);
            }

                getOrgUnitTree({parentId:node.data.id}).then(res=>{
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

                getUserFromCompanies({orgId: node.data.id}).then(res=>{
                    if(res.status == "200"){
                        that.groupOrganizationList = res.data;
                    }
                });

            },
            changed(selection) {
                this.SelectedMemberList = selection;
            },
            handleCurrentChange(val) {// 单选
                this.currentRow = val;
            }
        },
        created() {
            this.handleGetOrgUnitTree();
        }
    }
</script>

<style scoped>
.el-tree{
    height: 300px;
    overflow: auto;
}
</style>