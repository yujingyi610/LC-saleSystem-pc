<template>
    <div>
        <el-card class="box-card">
			<div slot="header" class="clearfix">
				<span class="title">停车区/储藏室</span>
				<div style="float: right">
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
								<el-radio v-model="chooseOne" :label="item.unitName + '|-分隔符-|' +item2.houseName">
                                	<span class="partItem_name">{{item2.houseName}}</span>
								</el-radio>
                            </span>
						</span>
					</div>
				</el-card>
			</div>
		</el-card>
    </div>
</template>

<script>
    import {getHouseView} from "@/api/pages/mainPage/plan/house"
    export default {
        props: {
            createHouseInfo: Object
        },
		data(){
			return{
				isShow: '',
				partList: null,// 停车区视图数据
				buildingInfo: {},// 停车区信息，用于传递给子组件
				chooseOne: ''
			}
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
                this.$emit('closeChild', this.chooseOne)
            }
	       
		},
		created() {
			let params = new URLSearchParams();
            params.append( "buildId",this.createHouseInfo.val.id );
            // params.append( "buildId", '6e0f690d2cd811e8af88005056b44833' );
            console.log(this.createHouseInfo.val.id)
            this.handleGetHouseView(params);
        }
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
    width: 32px;
    height: 28px;
    border: 1px solid #e5e5e5;
    border-radius: 4px; 
    margin: 6px 4px;
    line-height: 28px;
    /* float: left; */
	display: inline-block;
}
.partItem_more{
    color: #4DBE61;
}
</style>