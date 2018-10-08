<template>
	<div >
		<el-card class="box-card" v-if="!isShow">
			<div slot="header" class="clearfix">
				<span class="title">子分区/子储藏室列表</span>
				<div style="float: right">
					<el-button type="primary" @click="createUnit"  v-has="'prj:unit:add'">新增子分区/子储藏室</el-button>						
					<el-button type="primary" @click="keepCloce">车位/储藏室视图</el-button>
				</div>
			</div>
				  <!--导入列表-->
			<div class="text item normal">
                  <el-table :data="tableData" border style="width: 100%">
                    <el-table-column fixed type="index" label="序号" width="150"></el-table-column>
                    <!-- <el-table-column prop="sort" label="排序" width="120"></el-table-column> -->
                    <el-table-column prop="buildName" label="停车分区/储藏室" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="unitName" label="停车子分区/子储藏室" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="remark" label="备注" width="300" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{scope.row.remark||'-----'}}
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button @click="handleEdit(scope.$index, scope.row)" type="text" v-has="'prj:unit:eidt'">编辑</el-button>
                            <el-button type="text" @click="handleDelete(scope.$index, scope.row)" v-has="'prj:unit:eidt'">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
		</el-card>
        <component :is="isShow" v-on:closeCreate="closeCreate" @updataTree="handleUpdataTree" v-bind:EditForm="EditForm" v-bind:createHouseInfo="createHouseInfo" v-bind:isEdit="isEdit" v-bind:unitList="tableData"></component>		
	</div>
</template>

<script>
import {getUnitList, deleteUnit} from "@/api/pages/mainPage/plan/house"
import createUnit from './createUnit'
	export default{
		props: {
            createHouseInfo: Object
		},
		components: {
            'create-unit': createUnit
        }, 
		data() {
			return{
				tableData: [],
                isShow: '',
                EditForm: {},
                isEdit: false
			}
		},
		methods:{
			keepCloce(){// 切换车位视图
				this.$emit('closeChild');
			},


			handleGetUnitList(params) {// 获取子分区分页数据
                getUnitList(params).then(res=>{
                     ;
                    if( res.status === 200 ){
                        if( res.data ){
                            this.tableData = res.data.list;
                            this.total = res.data.total;
                        }else{
                            this.tableData = [];
                            this.total = 0;
                        }
                    }
                })
                
            },
            createUnit() {// 新增子分区
                this.isShow = 'create-unit'
            },
            handleEdit(index, row) {// 修改
                console.log(index, row);
                this.isShow = 'create-unit';
                this.EditForm = row;
                this.isEdit = true;
            },
            handleDelete(index, row) {// 删除
                let params = new URLSearchParams();
                params.append( "id", row.id );
                deleteUnit(params).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.$emit('upDataTree');
                        this.$message.success('删除成功！')
                        let params = new URLSearchParams();
                        params.append( "buildId",this.createHouseInfo.build.id );
                        getUnitList(params).then(res=>{
                             ;
                            if( res.status === 200 ){
                                if( res.data ){
                                    this.tableData = res.data.list;
                                    this.total = res.data.total;
                                }else{
                                    this.tableData = [];
                                    this.total = 0;
                                }
                            }
                        })
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            closeCreate() {// 关闭新增子分区页面，刷新子分区列表数据
                this.$emit('upDataTree')
                let params = new URLSearchParams();
                params.append( "buildId",this.createHouseInfo.build.id );
                this.handleGetUnitList(params);
                this.isShow = '';
                this.isEdit = false;
                this.EditForm = {};
            },
            handleUpdataTree() {// 刷新左侧树
                this.$emit('updataTree');
            }
		},
		created() {
            console.log( 111, this.createHouseInfo)
            let params = new URLSearchParams();
			params.append( "buildId",this.createHouseInfo.build.id );
            // params.append( "buildId", '6e10563f2cd811e8af88005056b44833' );
			
            this.handleGetUnitList(params);
        },
	}
</script>

<style>
	
</style>