<template>
    <div>
        <el-card class="box-card" v-if="buildInfo">
            <div slot="header" class="clearfix">
                <el-breadcrumb separator="/" style="float: left">
                    <el-breadcrumb-item>{{buildInfo.build.projectName}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{buildInfo.build.devstagesName}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{buildInfo.build.buildName}}</el-breadcrumb-item>
                </el-breadcrumb>
                <el-checkbox label="全选" style="float: right" v-model="buildInfo.isAllChecked" @change="handleBuildCheck"></el-checkbox>
            </div>
            <div class="text item table_header_bgColor">
                <el-table :data="buildInfo.buildView" border height="300">
                    <el-table-column label="楼层" prop="floorName" fixed width="80"></el-table-column>
                    <el-table-column :render-header="renderHeader" v-for="(item, index) in buildInfo.cellList" :key="index" :label="item.unitName" v-if="item.maxNum" :prop="item.id" :width="91*item.maxNum + 20">
                        <template slot-scope="scope">
                            <span v-if="scope.row[item.id]" v-for="(item2, index2) in scope.row[item.id]" :key="index2" class="cellItem">
                                <span class="cell_name">
                                    <el-checkbox v-model="item2.isChecked" @change="handlehouseCheck(item2.isChecked)" ></el-checkbox>
                                    <span>{{item2.houseName}}</span>
                                </span>
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<script>
import { 
    getProhouse,// 获取楼栋视图数据
} from "@/api/pages/mainPage/plan/price/index.js";
    export default {
        props: {
            build: Object,
            way: String
        },
        watch: {
            way(e) {
                this.valuation = e;
                console.log(this.valuation)
            }
        },
        data() {
            return{
                buildInfo: null,
                valuation: null,// 计价方式
            }
        },
        methods: {
            handleGetBuildInfo(data) {// 获取楼栋视图数据
                let houseList = [];
                 
                if( data ){
                     
                    
                    data.map(buildItem=>{
                        buildItem.priceHouseDtos.map(houseItem=>{
                            houseList.push(houseItem.houseId)
                        })
                    })
                    console.log(houseList);
                }
                
                getProhouse({ buildId: this.build.id }).then(res =>{
                     
                    if( res.status === 200 ){
						this.buildInfo = {}
						let data = res.data;
						this.buildInfo.build = data.build;
						this.buildInfo.cellList = data.unitArray;
						this.buildInfo.buildView = [];
						this.$set(this.buildInfo, 'isAllChecked', false);

						if( data.floorHouseArray ){
							data.floorHouseArray.map(floorItem=>{
								let floorObj = {
									floorName: floorItem.floorName
								}
								floorItem.unitHouseViewDtos.map(unitItem=>{
									floorObj[unitItem.unitId] = unitItem.houseDtos
								})
								this.buildInfo.buildView.push(floorObj)
							})
						}
                    }
					this.buildInfo.buildView.map(item=>{
						for( let key in item ){
							if( key !== 'floorName' ){
								if( item[key] ){
									item[key].map((item2, index)=>{
                                        for( let i = 0; i < houseList.length; i++ ){
                                            if( item2.id === houseList[i] ){
                                                this.$set(item2, 'isChecked', true);
                                                console.log(item2)
                                                return
                                            }
                                            this.$set(item2, 'isChecked', false)
                                        }
									})
								}
							}
						}
                    })
                })
            },
            handleunitchenck(flag, property) {// 单元全选
                console.log(flag, property);
				this.buildInfo.buildView.map(floorItem=>{
					for( let key in floorItem ){
						if( key === property ){
                            console.log(floorItem[key])
                            if( floorItem[key] ){
                                floorItem[key].map(houseItem=>{
                                    this.$set(houseItem, 'isChecked', flag);
                                })
                            }
							
						}
					}
				})
            },
            handleBuildCheck() {// 楼栋全选
                this.buildInfo.buildView.map(floorItem=>{
                    for( let key in floorItem ){
                        if( key !== 'floorName' ){
							if( floorItem[key] ){
								floorItem[key].map(houseItem=>{
									this.$set(houseItem, 'isChecked', this.buildInfo.isAllChecked)
								})
							}
                        }
                    }
				})
				console.log(this.buildInfo.isAllChecked)
            },
            handlehouseCheck(flag) {// 房间选择
                console.log(flag)
                let buildView = this.buildInfo.buildView;
                for( let i = 0; i < buildView.length; i++ ){
                    for( let key in buildView[i] ){
                        if( key !== 'floorName' && buildView[i][key].length !== 0){
                            for( let j = 0; j < buildView[i][key].length; j++ ){
                                if( buildView[i][key][j].isChecked != flag ){
                                    this.$set(this.buildInfo, 'isAllChecked', false);
                                    return false;
                                }else{
                                    this.$set(this.buildInfo, 'isAllChecked', flag);
                                }
                            }
                        }
                    }
                }
                
            },
            renderHeader(createElement, { _self, column }) {// table表头添加全选按钮
                // console.log(column)
                let unitName = column.label;
                let property = column.property;
                return createElement(
                    'div',
                    {
                        'class': 'renderTableHead'
                    },
                    [
                        createElement('span', {
                            attrs: { type: 'text'}
                        }, [unitName]),
                        createElement('el-checkbox', {
                            attrs: { label: '全选', style: "position: absolute; top: -10px; right: 0"},
                            on: {
                                change: (flag)=>{
                                    this.handleunitchenck(flag, property)
                                }
                            }
                        })
                    ]
                );
            }
        },
        created() {
            this.valuation = this.way;
            console.log(this.valuation)
        }
    }
</script>

<style scoped>
 .el-breadcrumb {
    line-height: 40px;
}
.el-card{
	/* border: none!important; */
	box-shadow: none!important;
}
.cell_name{
	border-right: 1px solid #E9E9E9;
	width: 90px;
	display: inline-block;
}
.cellItem:last-child .cell_name{
	border-right: none;
}
.tap{
	display: inline-block;
	color: #fff;
	border-radius: 3px; 
    padding: 0px 8px;
}
.unit_checkbox{
    position: absolute;
}
</style>