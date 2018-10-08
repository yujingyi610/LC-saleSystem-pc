<template>
	<div class="parkinfor" >
		<el-card class="box-card" v-if="!isShow">
			<div slot="header" class="clearfix">
				<span class="title">停车区/储藏室</span>
				<div style="float: right">
					<el-button type="primary" @click="redactHouseInfo" v-has="'prj:house:edit'">编辑房间资料</el-button>
					<el-button type="primary" @click="importRoom" v-has="'prj:house:import'">导入车位/储藏室</el-button>
					<el-button type="primary" @click="unitView">分区视图</el-button>
				</div>
			</div>
			<div v-if="partList">
				<el-card class="box-card partItem_card" style="margin-bottom: 40px" v-for="(item, index) in partList" :key="index">
					<div slot="header" class="clearfix">
						<span>{{item.unitName}}</span>
					</div>
					<div class="text item">
						<span v-for="(item2, index2) in item.list" :key="index2" class="partItem-wrap" >
							<span class="partItem">{{item2.houseName}}</span>
						</span>
					</div>
				</el-card>
			</div>
			<div v-else>请先导入车位/储藏室！</div>
		</el-card>

		<component :is="isShow" @closeChild="handleCloseChild" :createHouseInfo="createHouseInfo" :buildingInfo="buildingInfo" @upDataTree="handleUpDataTree"></component>
	</div>
</template>

<script>
	import {getHouseView} from "@/api/pages/mainPage/plan/house"
	
	import importpart from './importpart' 
	import partitionview from './partitionview'
	import redactHouseInfo from './redactHouseInfo'
	export default {
		props: {
            createHouseInfo: Object
        },
		data(){
			return{
				isShow: '',
				partList: null,// 停车区视图数据
				buildingInfo: {}// 停车区信息，用于传递给子组件
			}
		},
		components: {
	        'importpart': importpart,
	        'partition-view':partitionview,
	        'redact-houseinfo':redactHouseInfo,
	    },
		methods:{
			importRoom() {// 导入车位
				this.isShow = 'importpart';
			},
			unitView() {// 分区视图
				this.isShow = 'partition-view';
			},
			redactHouseInfo() {// 编辑房间资料
				if( this.partList ){
					this.isShow = 'redact-houseinfo'					
				}else{
					// alert('请先导入停车位！')
					this.$message.error('请先导入停车位/储藏室！')
				}
			},
			handleCloseChild() {// 切换为主页面车位视图
				this.handleGetHouseView();
				this.isShow = '';
			},
			// 获取房间视图
            handleGetHouseView() {
				this.partList = null;
				let params = new URLSearchParams();
            	params.append( "buildId",this.createHouseInfo.val.id );
                getHouseView(params).then(res=>{
					 ;
					if( res.status === 200 ){
						this.buildingInfo = res.data;
						if( res.data.unitArray && res.data.unitArray[0] ){
							this.partList = [];
							res.data.unitArray.map(item2=>{
								this.partList.push({
									unitName: item2.unitName,
									list: []
								})
							})
							if( res.data.floorHouseArray[0] ){
								res.data.floorHouseArray[0].houseDtos.map(item=>{
									this.partList.map(item2=>{
										if( item.unitName === item2.unitName ){
											item2.list.push(item)
										}
									})
								})
							}
							
						}
						
						console.log(this.partList)
					}
				})
				
			},
			handleUpDataTree() {// 更新右侧树
				this.$emit('updataTree');
			}
	       
		},
		created() {
			
            // params.append( "buildId", '6e0f690d2cd811e8af88005056b44833' );
            console.log(this.createHouseInfo.val.id)
            this.handleGetHouseView();
		},
		mounted() {
			// let that = this;  
	        //         getDevstList()
		    //             .then(res=>{
		    //                 this.tableData = res.data.list;
		    //             })
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
}
 
</style>