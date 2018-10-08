<template>
  <div id="companyTree">
    <el-tree :data="treeData" v-loading="loading" :load="getGroupTree" lazy highlight-current :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
  import { getCompanyTree } from "@/api/pages/mainPage/financialManagement/interface/index.js";
  import { getOrgUnitTree,getUserFromCompanies,searchUserFromCompanies} from "@/api/pages/mainPage/plan/team/index.js";
  export default {
    props: ['isChange'],
    data(){
      return{
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        loading:false,
      }
    },
    watch:{
      isChange:function(){
        console.log(this.isChange);
      }
    },
    methods:{
      handleNodeClick(data,node) {//树节点点击事件执行方法
        this.currentTreeNode = node;
        this.currentTreeNodeId = node.data.id;
        let that = this;

        getUserFromCompanies({orgId: node.data.id})//node.data.id
          .then(res=>{
             ;
            if(res.status == "200"){
              that.groupOrganizationList = res.data;
            }
          });
        let treeNode = data;
        this.$emit('getCompany',treeNode);//向父组件传递当前点击节点参数
      },
      handleGetOrgUnitTree() {
        getOrgUnitTree().then(res=>{
          if(res.status == '200' ){
            this.treeData = res.data;
            //this.addTeamMemberDialogSing = true;
          }
        });
      },
      getGroupTree(node, resolve){
        if (node.level === 0) {
          return resolve(this.treeData);
        }

        getOrgUnitTree({parentId:node.data.id}).then(res=>{
          if(res.status === 200){
            resolve(res.data);
          }
        })
      },
    },
    created:function(){
      /*let that = this;
      getOrgUnitTree().then(function(res){
          
        that.treeData = res.data;
      });*/
      this.handleGetOrgUnitTree();
    },
  }
</script>

<style scoped>

</style>
