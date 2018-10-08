<template>
    <div>
        <el-card class="box-card margin_bottom20">
            <div slot="header" class="clearfix">
                <span class="title">单元详情</span>
            </div>
            <div class="text item">
                <el-form ref="form" :model="form">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="所属楼栋:">{{form.buildName}}</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="单元名称：">{{form.unitName}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="备注：">{{form.remark}}</el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-card class="box-card margin_bottom20" v-if="!isShow">
            <div slot="header" class="clearfix">
                <span class="title">房间列表</span>
                <div style="float: right">
                    <el-button type="success" @click="createHouse" v-has="'prj:house:add'">新增房间</el-button>
                </div>
            </div>
            <div class="text item">
                  <el-table :data="tableData" border style="width: 100%">
                    <el-table-column type="index" label="序号" width="50"  ></el-table-column>
                    <el-table-column prop="floorName" label="所属楼层" width="120"   show-overflow-tooltip></el-table-column>
                    <el-table-column prop="houseName" label="房间名称" min-width="120"   show-overflow-tooltip></el-table-column>
                    <!-- <el-table-column prop="sightName" label="景观" width="120"></el-table-column> -->
                    <!-- <el-table-column prop="orientation" label="朝向" width="120"  ></el-table-column> -->
                    <!-- <el-table-column prop="houseLayoutName" label="户型" width="120"  ></el-table-column> -->
                    <el-table-column prop="houseStatusName" label="销售状态" width="120"  show-overflow-tooltip ></el-table-column>
                    <el-table-column prop="preSaleNo" label="预售证编号" width="120"  show-overflow-tooltip ></el-table-column>
                    <el-table-column label="操作" width="200"  >
                        <template slot-scope="scope">
                            <el-button @click="handleEdit(scope.$index, scope.row)" type="text" v-has="'prj:house:edit'">编辑</el-button>
                            <el-button type="text" @click="handleDelete(scope.$index, scope.row)" v-has="'prj:house:edit'">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>
        </el-card>
        <component :is="isShow" v-on:close="handleClose" v-bind:chooseChild="chooseChild" v-bind:unitInfo="form" v-bind:val="val" :areaId="areaId" :format="format"></component>
    </div>
</template>

<script>
import {getUnitInfo, getHouseList, deleteHouse} from "@/api/pages/mainPage/plan/house"
import createHouse from './createHouse'
    export default {
        props: {
            val: Object,
            node: Object,
            nodeAll: Object
        },
        components: {
            'create-house': createHouse
        },
        watch: {
            val() {
                this.haneleGetUnitInfo();
            },
            node() {
                this.haneleGetUnitInfo();
            }
        },
        methods: {
            haneleGetUnitInfo() {
                let params = new URLSearchParams();
                params.append( "id",this.val.id );
                getUnitInfo(params).then(res=>{
                     
                    if( res.status === 200 ){
                        this.areaId = res.data.areaId
                        this.format = res.data.area.formatCode
                        this.form = res.data.unit;
                        console.log(this.form);
                    }
                    
                }).then(()=>{
                    let params2 = new URLSearchParams();
                    params2.append( "unitId", this.form.id );
                    params2.append('pageNum', this.currentPage);
                    params2.append('pageSize', this.pageSize);
                    getHouseList(params2).then(res=>{
                         ;
                        if( res.status === 200 ){
                            if( res.data ){
                                this.tableData = res.data.list;
                                this.total = res.data.total;
                            }else{
                                this.tableData = [];
                                this.total = 0;
                            }
                        }else{
                            this.$message.error(res.message);
                        }
                    })
                })
            },
            handleEdit(index, row) {
                console.log(index, row);
                this.chooseChild = row;
                this.isShow = 'create-house';
                // this.EditForm = row;
                this.isEdit = true;
            },
            handleDelete(index, row) {
                 
                if(row.houseStatus !== 'FORSALE' && row.houseStatus !== 'SALESCONTROL') {
                    this.$message.error('只有待售及销控状态的房源才可以删除！');
                    return
                }
                let params = new URLSearchParams();
                params.append( "id", row.id );
                deleteHouse(params).then(res=>{
                     
                    if( res.status === 200 ){
                        this.$message.success('删除成功！');
                        this.$emit('updataTree', this.nodeAll);
                        let params2 = new URLSearchParams();
                        params2.append( "unitId", this.form.id );
                        getHouseList(params2).then(res=>{
                             ;
                            if( res.status === 200 ){
                                if( res.data ){
                                    this.tableData = res.data.list;
                                    this.total = res.data.total;
                                }else{
                                    this.tableData = [];
                                    this.total = 0;
                                }
                                
                            }else{
                                this.$message.error(res.message);
                            }
                        })
                    }else{
                        this.$message.error(res.message);
                    }
                })
                // this.tableData.splice(index, 1)
            },
            handleClose() {
                let params2 = new URLSearchParams();
                params2.append( "unitId", this.form.id );
                getHouseList(params2).then(res=>{
                     ;
                    if( res.status === 200 ){
                        if( res.data ){
                            this.tableData = res.data.list;
                            this.total = res.data.total;
                        }else{
                            this.tableData = [];
                            this.total = 0;
                        }
                        this.$emit('updataTree', this.nodeAll);
                    }else{
                        this.$message.error(res.message);
                    }
                    
                })
                // if( !this.isEdit ){
                //     // form.num = this.tableData.length + 1;
                //     // this.tableData.push(form)

                // }
                this.isShow = '';
                this.isEdit = false;
                this.chooseChild = {};
            },
            createHouse() {

                this.isShow = 'create-house';
            },
            handleSizeChange(val) {
                 
                this.pageSize = val;
                this.haneleGetUnitInfo()
            },
            handleCurrentChange(val) {
                 
                this.currentPage = val;
                this.haneleGetUnitInfo()                
            },
        },
        created() {
            this.haneleGetUnitInfo();
            console.log(this.node)
        },
        data() {
            return {
                tableData: [],
                isShow: '',
                chooseChild: {},
                isEdit: false,
                form: {},
                currentPage: 1,// 分页当前页数
                pageSize: 10, // 分页数量
                total: 0,// 总数
                areaId: null,
                format: null
            }
        }
    }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
</style>
