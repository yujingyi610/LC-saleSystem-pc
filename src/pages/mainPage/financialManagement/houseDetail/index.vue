<template>
  <div id="house-detail">
    <div style="width:100%;height:420px;overflow-y:scroll;">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>

      <el-tree class="filter-tree" :data="data" :props="defaultProps" :filter-node-method="filterNode" ref="tree" @node-click="handleClick"
               :load="handleGetChildNode" lazy>
      </el-tree>
    </div>
    <div style="height:30px;line-height:30px;margin-top:15px;text-align:right;">
      <el-button type="success" :disabled="isDisabled" @click="selecHandle">确定</el-button>
    </div>
  </div>
</template>

<script>
  import {getHouseTree, getHouseTreeChild} from "@/api/pages/mainPage/plan/house"
    export default {
      watch: {
        filterText(val) {
          this.$refs.tree.filter(val);
        }
      },
      data(){
        return{
          filterText: '',
          data:[],
          resolve:null,
          isDisabled:true,
          houseInfo:null,
          defaultProps: {
            children: 'children',
            label: 'name',
            isLeaf: 'leaf'
          }
        }
      },
      methods: {
        filterNode(value, data) {
          if (!value) return true;
          return data.label.indexOf(value) !== -1;
        },
        filterNode(value, data) {
           
          if (!value) return true;
          return data.name.indexOf(value) !== -1;
        },
        handleGetHouseTree(){
          let that = this;
          getHouseTree().then(function(res){
            that.data = res.data;

          });
        },
        handleClick(val,node){
          this.currentNode = val.id;
          if(val.treeLevel == 'H'){
            this.isDisabled = false;
            this.houseInfo = node;
          }
        },
        selecHandle(){
          let data = {
            houseInfo:this.houseInfo.data
          };
          this.$emit('ievent',data);
        },
        handleGetChildNode(node, resolve){
          this.resolve = resolve;
          if (node.level === 0) {
            return resolve([{ name: '' }]);
          }
          getHouseTreeChild(node.data.treeLoadApi).then(function(res){
            resolve(res.data);
          })
        },
      },
      created(){
        this.handleGetHouseTree();
      },
    }
</script>

<style scoped>

</style>
