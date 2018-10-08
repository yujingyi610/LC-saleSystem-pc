<template>
  <div id="tree">
    <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" :default-expanded-keys="currentNode" node-key="id">
    </el-tree>
  </div>
</template>

<script>
  import { getNodeTree } from "@/api/pages/mainPage/financialManagement/interface/index.js";
    export default {
        props: ['isChange'],
        data(){
          return{
            treeData: [],
            currentNode:[],
            defaultProps: {
              children: 'children',
              label: 'name'
            }
          }
        },
      watch:{
        isChange:function(){
          this.getNodeData();
        }
      },
      methods:{
        handleNodeClick(data) {//树节点点击事件执行方法
          let treeNode = data;
          this.$emit('getTreeNode',treeNode);//向父组件传递当前点击节点参数
          this.currentNode = [data.id];
          /*let that = this;
          let params = {
            parentId:data.id
          }
          getNodeTree(params).then(function(res){
             ;
          });*/
        },
        getNodeData:function(){
          let that = this;
          getNodeTree().then(function(res){
              
            that.treeData = res.data;
          });
        },
      },
      created:function(){
        this.getNodeData();
      },
    }
</script>

<style scoped>

</style>
