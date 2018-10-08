<template>
    <div>
        <el-card class="box-card" v-if="!isShow">
			<div slot="header" class="clearfix">
				<span class="title">停车区/储藏室</span>
				<div style="float: right">
					<el-button type="primary" @click="copyFrom">从其他房间复制</el-button>
					<el-button type="primary" @click="finish">完成</el-button>
				</div>
			</div>
			<div v-if="partList">
				<el-card class="box-card partItem_card" style="margin-bottom: 40px" v-for="(item, index) in partList" :key="index">
					<div slot="header" class="clearfix">
						<span>{{item.unitName}}</span>
					</div>
					<div class="text item">
						<span v-for="(item2, index2) in item.list" :key="index2" class="partItem-wrap" >
							<span class="partItem">
								<el-checkbox v-model="item2.isChecked" class="checkbox"></el-checkbox>
                                <span class="partItem_name" @click="allInfo(item2)">{{item2.houseName}}</span>
                            </span>
						</span>
					</div>
				</el-card>
			</div>
		</el-card>
        <component :is="isShow" :createHouseInfo="createHouseInfo" :data="data" @closeChild="handleCloseChild"></component>
    </div>
</template>

<script>
import copyFrom from './copyFrom'
import AllInfo from './allInfo'
import {getHouseView, upDateHouse} from "@/api/pages/mainPage/plan/house"
    export default {
        props: {
            createHouseInfo: Object
        },
		data(){
			return{
				data: {},
				isShow: '',
				partList: null,// 停车区视图数据
				buildingInfo: {}// 停车区信息，用于传递给子组件
			}
		},
		components: {
			copyFrom,
			AllInfo
	    },
		methods:{
			// 获取房间视图
            handleGetHouseView(params) {
                getHouseView(params).then(res=>{
					 ;
					if( res.status === 200 ){
						this.buildingInfo = res.data;
						if( res.data.unitArray ){
							this.partList = [];
							res.data.unitArray.map(item2=>{
								this.partList.push({
									unitName: item2.unitName,
									list: []
								})
							})
							res.data.floorHouseArray[0].houseDtos.map(item=>{
								this.partList.map(item2=>{
									if( item.unitName === item2.unitName ){
										item2.list.push(item)
									}
								})
							})
						}
						
						console.log(this.partList)
					}
                })
            },
            finish() {// 完成
                this.$emit('closeChild')
            },
            copyFrom() {// 从其他房间复制
                this.isShow = 'copy-from'
            },
			handleCloseChild(chooseHouseName) {// 关闭所有子组件
				if( chooseHouseName ){
					console.log(chooseHouseName);
					console.log(this.partList)
					let unitName = chooseHouseName.split('|-分隔符-|')[0];
					let houseName = chooseHouseName.split('|-分隔符-|')[1];
					let chooseForm = {};
					this.partList.map(item=>{
						if( item.unitName === unitName ){
							item.list.map(item2=>{
								if( item2.houseName === houseName ){
									chooseForm = item2
								}
							})
						}
					})
					this.partList.map(item=>{
						item.list.map(item2=>{
							if( item2.isChecked ){
								item2.preSaleGetDate = chooseForm.preSaleGetDate;
								// item2.houseLayoutName = chooseForm.houseLayoutName;// 户型
								item2.format = chooseForm.format;
								item2.floorSpace = chooseForm.floorSpace;
								item2.apportionArea = chooseForm.apportionArea;
								item2.basementArea = chooseForm.basementArea;
								item2.giftArea = chooseForm.giftArea;
								item2.preTotalPrice = chooseForm.preTotalPrice;
								item2.prePrice = chooseForm.prePrice;
								item2.sightName = chooseForm.sightName;
								item2.doupBeginDate = chooseForm.doupBeginDate;
								item2.doupEndDate = chooseForm.doupEndDate;
								item2.houseKindName = chooseForm.houseKindName;
								item2.priceMethod = chooseForm.priceMethod;
								item2.buildingArea = chooseForm.buildingArea;
								item2.gardenArea = chooseForm.gardenArea;
								item2.roofArea = chooseForm.roofArea;
								item2.carTypeText = chooseForm.carTypeText;
								// item2.orientation = chooseForm.orientation;// 朝向
								item2.houseStatusName = chooseForm.houseStatusName;
								item2.isInit = chooseForm.isInit;
								item2.preSaleNo = chooseForm.preSaleNo;
								item2.preMinPrice = chooseForm.preMinPrice;
								item2.preMinTotalPrice = chooseForm.preMinTotalPrice;
								item2.isPresent = chooseForm.isPresent;
								item2.baseFormatName = chooseForm.baseFormatName;
								item2.baseFormatCode = chooseForm.baseFormatCode;
								item2.formatId = chooseForm.formatId;
							}
						})
					})
					let list = [];
                    this.partList.map(item=>{
                        item.list.map(item2=>{
							list.push(item2)
						})
					})
					console.log(list)
                    upDateHouse(list).then(res=>{
                         
                        if( res.status === 200 ){
                            this.$message({
                                type: 'success',
                                message: '批量更新成功！'
                            })
                            let params = new URLSearchParams();
                            params.append( "buildId",this.createHouseInfo.val.id );
                            this.handleGetHouseView(params)
                            this.isShow = '';
                        }
                    })
                    return
				}
                this.isShow = ''; 
			},
			allInfo(info, unit) {// 查看该停车区的详细信息
				this.data.info = info;
                this.data.unit = unit;
                this.isShow = 'all-info';
			}
	       
		},
		created() {
			let params = new URLSearchParams();
            params.append( "buildId",this.createHouseInfo.val.id );
            // params.append( "buildId", '6e0f690d2cd811e8af88005056b44833' );
            console.log(this.createHouseInfo.val.id)
            this.handleGetHouseView(params);
		},
    }
</script>

<style scoped>
.partItem-wrap{
	float: left;
	width: 110px;
	height: 70px;
	border-right: 1px solid #e9e9e9;
	text-align: center;
}
.partItem{
	width: 80px;
	height: 40px;
	display: inline-block;
	border: 1px solid #666;
	border-radius: 3px; 
	margin-top: 15px;
	line-height: 40px;
	color: #666666;
	position: relative;
}
.partItem_name{
    line-height: 28px;
	text-decoration: underline;
	text-decoration-color: #4DBE61;
    color: #4DBE61;	
	cursor: pointer;
}
.checkbox{
	position: absolute;
    left: 0;
    top: -13px;
}
</style>