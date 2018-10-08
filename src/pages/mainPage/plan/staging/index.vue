<template>
    <div id="staging">
        <el-container class="container">
            <el-aside width="200px" style="border-radius: 5px">
                <div class="padding">
                    <el-input placeholder="请输入搜索关键字" v-model="filterText" suffix-icon="el-icon-search"></el-input>
                </div>
                <el-tree class="filter-tree left"
                accordion :data="data"
                :props="defaultProps"
                node-key="id"
                :load="loadNode"
                lazy
                :filter-node-method="filterNode"
                @node-click="handleClick"
                :expand-on-click-node="false"
                ref="tree"
                :default-expanded-keys="currentNode" 
                v-loading="loading">
                
                </el-tree>
            </el-aside>
            <el-main class="right" :style="{backgroundColor: isShow?'transparent':'#fff'}">
                <img v-if="!isShow" src="static/images/common/pic_house_bg.png" class="pic_bg"/>
                <component v-else :is="isShow" :val="showVal" :node="showNode" :nodeAll="showNodeAll" @updataTree="handleUpdataAll"></component>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import {getHouseTree, getHouseTreeChild, getHouseTreeAll} from "@/api/pages/mainPage/plan/house"
import "@/assets/styles/staging.css"

import api from '@/axios/api.js'
import stagePage from './stagePage'
import projectPage from './projectPage'
import areaPage from './areaPage'
import buildingPage from './buildingPage'
import unitPage from './unitPage'
import housePage from './housePage'
export default {
    watch: {// 树状控件筛选数据
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    components : {
        'stage-page': stagePage,
        'project-page': projectPage,
        'area-page': areaPage,
        'building-page': buildingPage,
        'unit-page': unitPage,
        'house-page': housePage
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
                 ;
                if( res.status === 200 ){
                    this.data = res.data;
                    this.loading = false;
                }
            })
        },
        // 处理树状控件点击后展示右侧各模块
        handleClick(val, node) {
            console.log(val, node)
            this.currentNode = [val.id];
            if( val.treeLevel == 'TREE_PROJECT'){
                this.isShow = 'project-page';
            }else if( val.treeLevel == 'TREE_DEVSTAGES' ){
                this.isShow = 'stage-page';
            }else if( val.treeLevel == 'TREE_AREA' ){
                this.isShow = 'area-page';
            }else if( val.treeLevel == 'B' ){
                this.isShow = 'building-page';
            }else if( val.treeLevel == 'U' ){
                this.isShow = 'unit-page';
            }else if( val.treeLevel == 'H' ){
                this.isShow = 'house-page';
            }
            if( val.treeLevel !== 'TREE_CITY' ){
                this.showVal = val;// 传递给子组件的 树状控件上所点击的节点的数据
                this.showNodeAll = node;// 传递给子组件的 树状控件上所点击的节点的相关属性
                this.showNode = node.parent.data;// 传递给子组件的 树状控件上所点击的节点的父节点的数据
            }
        },
        handleUpdataAll(node) {
            if( node.data.treeLevel === 'H' ){
                node = node.parent;
            }
            this.currentNode = [node.data.id];
            this.$refs.tree.store.nodesMap[node.data.id].childNodes = [];
            getHouseTreeChild(node.data.treeLoadApi).then(res=>{
                if( res.status === 200 ){
                    this.$set(node.data, 'children', res.data)
                }
            })
        },
        loadNode(node, resolve) {
            this.resolve = resolve;
            console.log(node)
            if (node.level === 0) {
                return resolve([{ name: '' }]);
            }
            getHouseTreeChild(node.data.treeLoadApi).then(res=>{
                if( res.status === 200 ){
                    resolve(res.data);
                }
            })
        }
    },
    created() {
        this.handleGetHouseTree();
        // console.log('data',data)
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
        isShow: '',// 右侧展示模块
        showVal: {},// 传递给子组件的 树状控件上所点击的节点的数据
        showNode: {},// 传递给子组件的 树状控件上所点击的节点的父节点的数据
        showNodeAll: {},// 传递给子组件的 树状控件上所点击的节点的相关属性,
        resolve: null,
        currentNode:[],//当前选中树的节点Id
        loading: true
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
