<template>
	<div >
		<el-card class="box-card" v-if="!isShow">
			<div slot="header" class="clearfix">
				<span class="title">单元列表</span>
				<div style="float: right">
					<el-button type="primary" @click="createUnit"  v-has="'prj:unit:add'">新增单元</el-button>						
					<el-button type="primary" @click="keepClose">楼栋视图</el-button>
				</div>
			</div>
				  <!--导入列表-->
			<div class="text item normal">
                  <el-table :data="tableData" border style="width: 100%">
                    <el-table-column fixed type="index" label="序号" width="150"  ></el-table-column>
                    <!-- <el-table-column prop="sort" label="排序" width="120"></el-table-column> -->
                    <el-table-column prop="buildName" label="楼栋"  ></el-table-column>
                    <el-table-column prop="unitName" label="单元"  ></el-table-column>
                    <el-table-column prop="remark" label="备注" width="300"  >
                        <template slot-scope="scope">
                            {{scope.row.remark||'-----'}}
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="200"  >
                        <template slot-scope="scope">
                            <el-button @click="handleEdit(scope.$index, scope.row)" type="text" v-has="'prj:unit:eidt'">编辑</el-button>
                            <el-button type="text" @click="handleDelete(scope.$index, scope.row)" v-has="'prj:unit:eidt'">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
		</el-card>
        <component :is="isShow" v-on:closeCreate="closeCreate" @updataTree="handleUpdataTree" :buildInfo="buildInfo" :val="val" v-bind:EditForm="EditForm" v-bind:isEdit="isEdit" v-bind:unitList="tableData"></component>		
	</div>
</template>

<script>
import {getUnitList, deleteUnit} from "@/api/pages/mainPage/plan/house"
import createUnit from './createUnit'
	export default{
		props: {
            buildInfo: Object,
            val: Object
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
			keepClose(){// 切换楼栋视图
				this.$emit('showClick');
			},


			handleGetUnitList(params) {// 获取单元分页数据
                getUnitList(params).then(res=>{
                     ;
                    this.tableData = res.data.list;
                    
                })
            },
            createUnit() {// 新增单元
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
                        this.$emit('updataTree');
                        this.$notify({
                            title: '成功',
                            message: '删除成功',
                            type: 'success'
                        });
                        let params = new URLSearchParams();
                        params.append( "buildId",this.buildInfo.build.id );
                        getUnitList(params).then(res=>{
                             ;
                            this.tableData = res.data.list
                        })
                    }
                })
            },
            closeCreate() {// 关闭新增单元页面，刷新单元列表数据
                this.$emit('updataTree');
                let params = new URLSearchParams();
                params.append( "buildId",this.buildInfo.build.id );
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
            console.log( 111, this.buildInfo)
            let params = new URLSearchParams();
			params.append( "buildId",this.buildInfo.build.id );
            this.handleGetUnitList(params);
        },
	}
</script>

<style>
	
</style>