<template>
    <div id="marketingControl">
		<el-form :inline="true">
			<el-form-item label="选择楼栋:">
				<el-select v-model="build">
					<el-option v-for="(item, index) in buildOption" :key="index" :label="item.buildFullName" :value="item.buildId"></el-option>
				</el-select>
			</el-form-item>
			<span style="color: red">注意:在设置房源销控前，请确保已经完成认购设置</span>
		</el-form>
        <el-container v-if="buildInfo" class="main" ref="aaa">
			<el-container class="main_con" style="width:100%;">
				<el-main class="main_con_main" style="height:100%;">
					<el-card class="box-card">
						<div slot="header" class="clearfix">
							<el-breadcrumb separator="/" style="float: left">
								<el-breadcrumb-item>{{buildInfo.build.projectName}}</el-breadcrumb-item>
								<el-breadcrumb-item>{{buildInfo.build.devstagesName}}</el-breadcrumb-item>
								<el-breadcrumb-item>{{buildInfo.build.areaName}}</el-breadcrumb-item>
								<el-breadcrumb-item>{{buildInfo.build.buildName}}</el-breadcrumb-item>
							</el-breadcrumb>
                            <el-checkbox label="全选" style="float: right" v-model="buildInfo.isAllChecked" @change="handleBuildCheck"></el-checkbox>
						</div>
						<div class="text item table_header_bgColor" style="padding-bottom:50px;">
							<el-table :data="buildInfo.buildView" border>
								<el-table-column label="楼层" prop="floorName" fixed width="80"></el-table-column>
								<el-table-column :render-header="renderHeader" v-for="(item, index) in buildInfo.cellList" :key="index" :label="item.unitName" v-if="item.maxNum" :prop="item.id" :width="101*item.maxNum + 20">
									<template slot-scope="scope">
										<span v-if="scope.row[item.id]" v-for="(item2, index2) in scope.row[item.id]" :key="index2" class="cellItem">
											<img src="static/images/common/lock.png" class="lock_img" v-if="item2.lockType === '1' && (salesStatus.length !== 2 || (salesStatus.length === 2 && item2.houseStatus === 'FORSALE')) "/>
											<span v-if="salesStatus.length === 2" class="cell_name" v-bind:style="{color: item2.houseStatus === 'FORSALE'?'#359345':'#808080'}">
												<el-checkbox v-model="item2.isChecked" @change="handlehouseCheck(item2.isChecked)" :disabled="(item2.lockType === '1' || !item2.preTotalPrice) || (item2.houseStatus !== 'FORSALE' && item2.houseStatus !== 'SALESCONTROL')?'disabled':false"></el-checkbox>
												<i class="el-icon-nav-xiaofangzi" style="left:auto"></i>
												<span class="houseName">{{item2.houseName}}</span>
											</span>
											<span v-else-if="salesStatus.length === 5" class="cell_name"  v-bind:style="{color: item2.statusColor}">
												<el-checkbox v-model="item2.isChecked" @change="handlehouseCheck(item2.isChecked)" :disabled="(item2.lockType === '1' || !item2.preTotalPrice) || (item2.houseStatus !== 'FORSALE' && item2.houseStatus !== 'SALESCONTROL')?'disabled':false"></el-checkbox>
												<i class="el-icon-nav-xiaofangzi" style="left:auto"></i>
												<span class="houseName">{{item2.houseName}}</span>
											</span>
										</span>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</el-card>
				</el-main>
				<!-- 底部五个状态 -->
				<el-footer>
					<el-row type="flex" class="row-bg" justify="space-around" style="text-align: center">
						<el-col :span="4" v-for="(item, index) in salesStatus" :key="index" style="text-align: center">
							<i class="el-icon-nav-xiaofangzi bottom_icon" :style="{color: item.color}"></i>
							<div style="float: left">
								<span class="tap">{{item.name}}</span><br />
								<span class="text">{{item.count}}套/{{item.per}}%</span>
							</div>
						</el-col>
					</el-row>
				</el-footer>
			</el-container>
        </el-container>
    </div>
</template>

<script>
import {getHouseList, getHouseViewByBuildId} from '@/api/pages/mainPage/transactionManagement/houseQuery'
    export default {
        props: {
            row: Object
		},
		watch: {
			build: function(e) {
				// this.formInline.projectName = null;
				if( e )
				this.handlegetHouseViewByBuildId({ buildId: e });
			}
		},
        data() {
            return{
				build: '',// 所选中的楼栋
				buildOption: [],//  选择楼栋下拉数据
                buildInfo: null,
                /************底部销售状态数据*****************/
				salesStatus: [],
            }
        },
        methods: {
			handlegetHouseList(params) {// 获取楼栋列表
				getHouseList(params).then(res=>{
					 ;
					if( res.status === 200 ){
						this.buildOption = res.data;
					}
				})
			},
			handlegetHouseViewByBuildId(params) {// 通过楼栋ID获取楼栋
				getHouseViewByBuildId(params).then(res=>{
					 
					if( res.status === 200 ){
						this.buildInfo = {}
						let data = res.data[0];
						if( data.statistics.length === 2 ){
							this.salesStatus = [{
								color: '#359345',
								name: '可售'
							},{
								color: '#808080',
								name: '不可售'
							}]
							data.statistics.map(item=>{
								if( item.name === '可售' ){
									this.salesStatus[0].count = item.count;
									this.salesStatus[0].per = item.per;
								}else{
									this.salesStatus[1].count = item.count;
									this.salesStatus[1].per = item.per;
								}
							})
						}else{
							this.salesStatus = [{
								color: '#359345',
                                code: 'FORSALE'// 待售
                            },{
                                color: '#E23333',
                                code: 'SIGNING'// 签约
                            },{
                                color: '#EF8D3A',
                                code: 'SUBSCRIPTION'// 预定
                            },{
                                color: '#9A6AC3',
                                code: 'DELIVER'// 交付
                            },{
                                color: '#808080',
                                code: 'SALESCONTROL'// 销控
                            }]
							data.statistics.map(item=>{
								this.salesStatus.map(item2=>{
									if( item.code === item2.code ){
										item2.count = item.count;
										item2.name = item.name;
										item2.per = item.per;
									}
								})
							})
						}
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
									item[key].map(item2=>{
										this.$set(item2, 'isChecked', false)
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
							if( floorItem[key] ){
								floorItem[key].map(houseItem=>{
									if( houseItem.lockType !== '1' && houseItem.preTotalPrice && (houseItem.houseStatus === 'FORSALE' || houseItem.houseStatus === 'SALESCONTROL') )
									this.$set(houseItem, 'isChecked', flag)
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
									if( houseItem.lockType !== '1' && houseItem.preTotalPrice && (houseItem.houseStatus === 'FORSALE' || houseItem.houseStatus === 'SALESCONTROL') )
									houseItem.isChecked = this.buildInfo.isAllChecked;
									// this.$set(houseItem, 'isChecked', this.buildInfo.isAllChecked)
								})
							}
                        }
                    }
				})
				console.log(this.buildInfo.isAllChecked)
            },
            handlehouseCheck(flag) {// 房间选择
                let buildView = this.buildInfo.buildView;
                for( let i = 0; i < buildView.length; i++ ){
                    for( let key in buildView[i] ){
                        if( key !== 'floorName' || buildView[i][key].length !== 0){
                            for( let j = 0; j < buildView[i][key].length; j++ ){
                                if( buildView[i][key][j].isChecked !== flag ){
                                    this.$set(this.buildInfo, 'isAllChecked', false);
                                    return false;
                                }else{
                                    this.$set(this.buildInfo, 'isAllChecked', true);
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
			console.log(this.row);
			this.handlegetHouseList({ batchId: this.row.id })
		}
    }
</script>

<style scoped>
.main{
    height: 500px;
}
.main_con{
	position: relative;
}
.main_con_main{
	margin-bottom: 20px;
}
  .el-aside {
    /* background-color: #ffffff; */
    color: #333;
    text-align: center;
	margin-left: 20px;
  }

  .el-main {
    background-color: #ffffff;
    color: #333;
    text-align: center;
  }
    .el-header, .el-footer {
    background-color: #fff;
	color: #333;
	box-shadow: 0px -2px 10px #e6e6e6;
	position: absolute;
	bottom: 0;
	left: 0;
    right: 16px;
	z-index: 4;
	height: 60px;
	box-sizing: border-box;
	padding: 20px 25px;
  }
  .el-breadcrumb {
    line-height: 40px;
}
.el-card{
	/* border: none!important; */
	box-shadow: none!important;
}
.cell_name{
	border-right: 1px solid #E9E9E9;
	width: 100px;
	display: inline-block;
}
.cellItem:last-child .cell_name{
	border-right: none;
}
.tap{
	display: inline-block;
	/* color: #fff; */
	/* border-radius: 3px;  */
    padding: 0px 8px;
	font-size: 12px;
}
.text{
	font-size: 12px;
}
.unit_checkbox{
    position: absolute;
}
.houseName{
	margin-left: 24px;
	font-size: 14px;
}
.lock_img{
	position: absolute;
	top: -5px;
}
</style>
