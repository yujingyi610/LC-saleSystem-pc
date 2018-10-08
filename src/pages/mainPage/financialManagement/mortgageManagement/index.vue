<template>
  <div id="mortgage">
    <el-container class="container">
      <el-aside width="200px" style="border-radius: 5px">
        <div class="padding">
          <el-input placeholder="请输入搜索关键字" v-model="filterText" suffix-icon="el-icon-search"></el-input>
        </div>
        <el-tree class="filter-tree left" accordion :data="data" :props="defaultProps" node-key="id"
                 :load="loadNode1" lazy
                 :filter-node-method="filterNode" @node-click="handleClick" :expand-on-click-node="false" ref="tree">
        </el-tree>
      </el-aside>
      <el-main class="right" :style="{backgroundColor: isShow?'transparent':'#fff'}">
        <img v-if="isShow == 'img'" src="static/images/common/pic_housing_unselected_bg.png" class="pic_bg"/>
        <component v-else :is="isShow" :val="showVal" :node="showNode" :nodeAll="showNodeAll"></component><!--@updataTree="handleUpdataAll"-->
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import {getHouseTree, getHouseTreeChild} from "@/api/pages/mainPage/plan/house"
  import "@/assets/styles/staging.css"

  import api from '@/axios/api.js'
  import bankListPage from './bankList'
  export default {
    watch: {// 树状控件筛选数据
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    components : {
      'bankList': bankListPage,
    },
    methods: {
      // elementui自带方法
      filterNode(value, data) {
         
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      // 获取房源右侧树状控件数据
      handleGetHouseTree() {
        getHouseTree().then(res=>{
          //  
          if( res.status === 200 ) {
            this.data = res.data;
          }
        });
      },
      // 处理树状控件点击后展示右侧各模块
      handleClick(val, node) {
        if( val.treeLevel == "TREE_DEVSTAGES"){
          this.isShow = 'bankList';
        }else{
          this.isShow = 'img';
        }
        if( val.treeLevel !== 'TREE_CITY' ){
          this.showVal = val;// 传递给子组件的 树状控件上所点击的节点的数据
          this.showNodeAll = node;// 传递给子组件的 树状控件上所点击的节点的相关属性
          this.showNode = node.parent.data;// 传递给子组件的 树状控件上所点击的节点的父节点的数据
        }
      },
      // 懒加载树
      loadNode1(node, resolve) {
        this.resolve = resolve;
        if (node.level === 0) {
          return resolve([{ name: '' }]);
        }
        if (node.level > 2) return resolve([]);
        getHouseTreeChild(node.data.treeLoadApi).then(res => {
          //  ;
          resolve(res.data);
        })
      },
      handleUpdataAll(node) {
        let resolve = this.resolve;
        if (node.level === 0) {
          return resolve([{ name: '' }]);
        }
        if (node.level > 2) return resolve([]);
        getHouseTreeChild(node.data.treeLoadApi).then(res => {
          resolve(res.data);
        })
      }
    },
    created() {
      this.handleGetHouseTree();
    },
    data() {
      return {
        filterText: '',// 树状筛选数据
        data: [],// 树状控件数据
        defaultProps: {// 树状控件默认规则
          children: 'children',
          label: 'name',
          isLeaf: 'leaf'
        },
        isShow: 'img',// 右侧展示模块
        showVal: {},// 传递给子组件的 树状控件上所点击的节点的数据
        showNode: {},// 传递给子组件的 树状控件上所点击的节点的父节点的数据
        showNodeAll: {},// 传递给子组件的 树状控件上所点击的节点的相关属性,
        resolve: null
      };
    }
  };
</script>

<style scoped>
  .pic_bg{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 485px;
  }

  .right{
    border-radius: 5px;
  }
</style>
