<template>
    <div class="nobgColor">
        <el-card class="box-card" v-if="!isShow">
            <div slot="header" class="clearfix">
                <span class="title">单元列表</span>
                <div style="float: right">
                    <el-button type="success" @click="createUnit" v-has="'prj:unit:add'">新增单元</el-button>
                    <el-button type="success" @click="houseView">房间视图</el-button>
                </div>
            </div>
            <div class="text item">
                  <el-table :data="tableData" border style="width: 100%">
                    <el-table-column fixed type="index" label="序号" width="150"></el-table-column>
                    <!-- <el-table-column prop="sort" label="排序" width="120"></el-table-column> -->
                    <el-table-column prop="buildName" label="所属楼栋" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="unitName" label="单元名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="remark" label="备注" width="300" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{scope.row.remark||'-----'}}
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button @click="handleEdit(scope.$index, scope.row)" type="text" v-has="'prj:unit:eidt'">编辑</el-button>
                            <el-button type="text" @click="handleDelete(scope.$index, scope.row)" v-has="'prj:unit:eidt'">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <component :is="isShow" v-on:closeCreate="closeCreate" v-bind:EditForm="EditForm" v-bind:createHouseInfo="createHouseInfo" v-bind:isEdit="isEdit" v-bind:unitList="tableData"></component>
    </div>
</template>

<script>
import {getUnitList, deleteUnit} from "@/api/pages/mainPage/plan/house"
import createUnit from './createUnit'
    export default {
        props: {
            createHouseInfo: Object
        },
        components: {
            'create-unit': createUnit
        },  
        methods: {
            handleGetUnitList(params) {
                getUnitList(params).then(res=>{
                     ;
                    this.tableData = res.data.list;
                })
            },
            createUnit() {
                this.isShow = 'create-unit';
                this.isEdit = false;
            },
            houseView() {
                this.$emit('handleShow','floor-view');
            },
            handleEdit(index, row) {
                console.log(index, row);
                this.isShow = 'create-unit';
                this.EditForm = row;
                this.isEdit = true;
            },
            handleDelete(index, row) {
                let params = new URLSearchParams();
                params.append( "id", row.id );
                deleteUnit(params).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.$emit('updataTree');
                        this.$notify({
                            title: '成功',
                            message: '删除成功',
                            type: 'success'
                        });
                        let params = new URLSearchParams();
                        params.append( "buildId",this.createHouseInfo.build.id );
                        getUnitList(params).then(res=>{
                             ;
                            this.tableData = res.data.list
                        })
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            closeCreate() {
                this.$emit('updataTree');
                this.isShow = '';
                this.isEdit = false;
                this.EditForm = {};
                let params = new URLSearchParams();
                params.append( "buildId",this.createHouseInfo.build.id );
                this.handleGetUnitList(params);
                
            }
        },
        created() {
            console.log( 111, this.createHouseInfo)
            let params = new URLSearchParams();
            params.append( "buildId",this.createHouseInfo.build.id );
            this.handleGetUnitList(params);
        },
        data() {
            return {
                tableData: [],
                isShow: '',
                EditForm: {},
                isEdit: false
            }
        }
    }
</script>

<style scoped>

</style>