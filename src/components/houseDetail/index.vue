<template>
  <div id="house-detail">
    <el-dialog title="查找房间" :visible.sync="Flag" width="500px" v-if="Flag">
        <div style="width:100%;height:420px;overflow-y:scroll;">
          <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>

          <el-tree class="filter-tree" :data="data" :props="defaultProps" :filter-node-method="filterNode" ref="tree" @node-click="handleClick"
                  :load="handleGetChildNode" lazy>
          </el-tree>
        </div>
        <!-- <div style="height:30px;line-height:30px;margin-top:15px;text-align:right;">
          <el-button type="success" :disabled="isDisabled" @click="selecHandle">确定</el-button>
        </div> -->
      <span slot="footer" class="dialog-footer">
				<el-button type="success" :disabled="isDisabled" @click="selecHandle">确定</el-button>
			</span>
    </el-dialog>
  </div>
</template>

<script>
  import {getHouseTree, getHouseTreeChild} from "@/api/pages/mainPage/plan/house"
  import {getHouseFullName} from "@/api/pages/mainPage/financialManagement/housingFund";
    export default {
      watch: {
        filterText(val) {
          this.$refs.tree.filter(val);
        }
      },
      data(){
        return{
          Flag: false,
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
        show() {
          this.Flag = true;
          this.handleGetHouseTree();
        },
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
            
            let params = {
              itemId: node.data.id
            }
            getHouseFullName(params).then(res=>{
              if( res.status === 200 ){
                this.houseInfo = res.data;
              }else{
                this.$message.error(res.message)
              }
            })
          }
        },
        selecHandle(){
          this.$emit('chooseHouse', this.houseInfo);
          this.Flag = false;
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
        // this.handleGetHouseTree();
      },
    }
</script>

<style scoped>

</style>
