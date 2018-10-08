<template>
  <div class="customer-intention-dialog">
    <div class="content-box">
      <div class="input-box">
        <el-input v-model="inputValue" @click.native="handleInputClick" class="w-174" readonly>
          <i slot="suffix" class="el-input__icon el-icon-arrow-down"></i>
        </el-input>
      </div>
      <div v-show="dialogVisible" @click.stop="callback" class="dialog-box">
        <div class="dialog-title text-center">
          <el-input
            class="w-174"
            v-model.trim="searchValue"
            placeholder="请选择关键字"
          >
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="dialog-tree">
           <el-tree class="filter-tree left" 
                accordion :data="data"
                :props="defaultProps" 
                node-key="id"
                show-checkbox
                :load="loadNode1" lazy
                setCheckedNodes='handCheck'
                :filter-node-method="filterNode" 
                :expand-on-click-node="false"
                ref="tree">
                </el-tree>
        </div>
        <div class="dialog-footer">
          <el-button @click.stop="handleClose">取消</el-button>
          <el-button @click.stop="handleOk" type="primary" class="mr-20">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* 
    <customerIntentionDialog style="height:300px;" placeholder="二级-1" v-model="aaaaa" />
  */


  // 获取请求接口
  import {
    /* dictionaryEntrySearchOptions,
    dictionaryEntryAddOrEdit, */
    getIntentionDoor//获取意向户号
  } from '@/api/pages/mainPage/customerFollowUp'

  import {getHouseTree, getHouseTreeChild} from "@/api/pages/mainPage/plan/house"

  export default {
    props : ['value','placeholder'],
    watch : {
      // 监听搜索
      searchValue(val) {
        this.$refs.tree.filter(val);
      },
      // 监听回显 纯文本
      placeholder(val) {
        this.inputValue = this.placeholder;
      },
    },
    // 树状控件筛选数据
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },

    data() {
      return {
        dialogVisible : false,
        // 输入框
        inputValue : '',
        // 搜索输入框
        searchValue : '',
        //复制的数据
        filterText: '',// 树状筛选数据
        data: [],// 树状控件数据
        defaultProps: {// 树状控件默认规则
          children: 'children',
          label: 'name',
          isLeaf: 'leaf'
        },
        isShow: '',// 右侧展示模块
        showVal: {},// 传递给子组件的 树状控件上所点击的节点的数据
        showNode: {},// 传递给子组件的 树状控件上所点击的节点的父节点的数据
        showNodeAll: {},// 传递给子组件的 树状控件上所点击的节点的相关属性,
        resolve: null
      }
    },
    mounted() {
      // 获取初始化数据
      this.inputValue = this.placeholder;
      // 设置禁用状态
      this.setDisabled();
      // 增加 点击事件
      document.querySelector('body').addEventListener('click',() => {
        if(this.$refs.tree){
          this.handleClose();
        }
      });
    },
    methods : {
      handCheck(node){
      },
      setDisabled() {
        /* 递归 实现树 除了最后一级 都添加 disabled 状态 */
      
        let callback = (list) => {
          let arr = [];
          for(let i = 0 ; i < list.length ; i ++ ){
            let item = list[i];
            // 如果存在 子元素 添加 disabled 状态
            if(item.children && item.children.length > 0 ){
                item.disabled = true;
                callback(item.children)
              }
                arr.push(item);
          }
          return arr;
        };
        let newData = callback(this.data);
        this.data = newData;
      },
      // input 点击事件
      handleInputClick() {
        setTimeout(() => {
          this.dialogVisible = true;
          this.$refs.tree.setCheckedKeys(this.value);
        },0);
      },
      // 过滤树
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      // 点击取消
      handleClose() {
        this.dialogVisible = false;
        // 还原数据
        this.$refs.tree.setCheckedKeys(this.value);
        this.searchValue = '';
      },
      // 点击确定
      handleOk() {
        let data = this.$refs.tree.getCheckedNodes(true);
        let ids = data.map((v) => v.id);
        let arr = []
        for(let i=0;i<data.length;i++){
          arr.push({
            id:data[i].id,
            name:data[i].name
          })
        }
        let inputValuearr = [] 
        for(let j=0;j<arr.length;j++){
          inputValuearr.push(arr[j].name)
        }
        this.inputValue = inputValuearr.join(',')
        this.$emit('input',ids);
        this.$emit('inputValue',this.inputValue);
        // 关闭浮层
        this.$nextTick(() => {
          this.handleClose();
        });
      },
      // 空函数 为停止冒泡
      callback() {
      },
      // -----------------------------------------复制的方法---------------------
      // -----------------------------------------复制的方法---------------------
      // -----------------------------------------复制的方法---------------------
      // -----------------------------------------复制的方法---------------------
      // -----------------------------------------复制的方法---------------------
      // -----------------------------------------复制的方法---------------------



        // elementui自带方法
        // filterNode(value, data) {
        //      
        //     if (!value) return true;
        //     return data.name.indexOf(value) !== -1;
        // },
        // 获取房源右侧树状控件数据
        handleGetHouseTree() {
            getHouseTree().then(res=>{
                if( res.status === 200 ) {
                    this.data = res.data;
                }
            });
        },

        // 懒加载树
        loadNode1(node, resolve) {
            this.resolve = resolve;
            if (node.level === 0) {
                return resolve([{ name: '' }]);
            }
            // if (node.level > 1) return resolve([]);
            getHouseTreeChild(node.data.treeLoadApi).then(res => {
                //  ;
                resolve(res.data);
            })
        },
        
    },

    created() {
        this.handleGetHouseTree();
    },
    

  }
</script>

<style lang="scss">
.customer-intention-dialog{
  .content-box{
    position: relative;
  }
  .input-box{
    input{
      cursor: pointer;
        overflow: hidden;  /*溢出隐藏*/
      text-overflow: ellipsis; /*以省略号...显示*/
      white-space: nowrap;  /*强制不换行*/
    }
  }
  /* 浮层样式 */
  .dialog-box{
    position: absolute;
    width: 260px;
    background-color: #fff;
    z-index: 10;
    border-radius: 4px;
    top: 27px;
    border: 1px solid #E5E5E5;
    input{
      border: 1px solid #dcdfe6!important;
    }
    .dialog-title{
      padding: 7px 14px;
      border-bottom: 1px solid #E5E5E5;
    }
    .dialog-tree{
      max-height: 350px;
      overflow: scroll;
      padding: 10px 0;
    }
    .dialog-footer{
      padding: 10px 0;
      text-align: right;
      border-top: 1px solid #E5E5E5;
    }
  }
}
</style>