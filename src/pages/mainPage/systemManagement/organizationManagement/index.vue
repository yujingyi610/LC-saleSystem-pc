<template>
    <div id="organization">
        <el-row :gutter="20">
            <el-col :span="6" class="left">
                <el-tree 
                :load="loadTree"
                :lazy="true"
                :data="newsListShow" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </el-col>
            <el-col :span="18">
                <h3>用户列表</h3>
                <el-table :data="tableData"  border  style="width: 100%">
                    <el-table-column prop="name" label="用户名" width="180" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="userName" label="账户" width="180" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="statusText" label="状态" show-overflow-tooltip> </el-table-column>
                </el-table>
                <el-pagination
                style="margin-top:10px;"
                v-if="total > 0"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :total="total"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                >
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {
    organizationAndMnagementOneTree,
    organizationAndMnagementloadingTree,
    organizationAndMnagementList,
} from '@/api/pages/mainPage/systemManagement'
import api from '@/axios/api.js'
import Vue from 'vue'

export default {
    data() {
        return {
                defaultProps: {
                children: 'children',
                label: 'label',
                isLeaf: 'isLeaf'
                },
                tableData: [],
                newsListShow: [],
                total : 0,
                currentPage : 1,
                pageSize : 10,
                nodeData : '',
            };
        },
    methods: {
        initTableList() {
            organizationAndMnagementList({
                orgId : this.nodeData.id,
                pageNum : this.currentPage,
                pageSize : this.pageSize,
            }).then((res) => {
                if(res.status === 200){
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                }
            });
        },
        tableInitChange() {
            if(this.currentPage === 1){
                this.initTableList();
            }else{
                this.currentPage = 1;
            }
        },
        handleNodeClick(data,node) {
            console.log(node.data.id);
            this.nodeData = node.data;
            this.tableInitChange();
        },
        setNewsApi: function() {
            organizationAndMnagementOneTree().then((res) => {
                this.newsListShow = res.data;
            });
        },
        loadTree(node, resolve) {
            organizationAndMnagementloadingTree({
                parentId : node.data.id,
            }).then((res) => {
                resolve(res.data);
            });
            
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.initTableList();
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.tableInitChange();
        },
    },
    mounted() {
        this.setNewsApi();
    }
}
</script>

<style lang="scss" scoped>
#organization {
    height: 400px;
    border-bottom: 1px solid #e1e1e1;
}
h3 {
    color: #606266;
    text-align: center;
    font-weight: 100;
    font-size: 16px;
    height: 50px;
    line-height: 50px;
}
.left {
    height: 400px;
    overflow: auto;
}
</style>