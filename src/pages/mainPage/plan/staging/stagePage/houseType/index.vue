<template>
	<div class="htype">
		<div class="htypeinfor" v-if="htypeinforshow">
			<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span class="title">户型列表</span>
					<div style="float: right">
						<el-button type="primary" @click="openaddhtype" v-has="'prj:group:add'">新增户型</el-button>
						<el-button type="primary" @click="closehtype" class="mainBtn_">返回</el-button>
					</div>
			  </div>
			  <!--户型表格-->
			  <div class="text item">
			    <el-table :data="tableData" border fit  style="width: 100%; font-size: 12px; text-align: center;">
					<el-table-column type="index" label="序号" width="54"   ></el-table-column>
					<el-table-column prop="layoutName" label="户型名称" min-width="200"  show-overflow-tooltip ></el-table-column>
					<el-table-column prop="buildingArea" label="建筑面积" min-width="100"  show-overflow-tooltip ></el-table-column>
					<el-table-column prop="coveredArea" label="套内面积" min-width="100"   show-overflow-tooltip></el-table-column>
					<el-table-column prop="houseStyleName" label="格局" min-width="150"  show-overflow-tooltip ></el-table-column>
					<el-table-column prop="orientation" label="朝向" min-width="90"   show-overflow-tooltip></el-table-column>
					<el-table-column label="操作" width="200"   >
						<template slot-scope="scope">
							<el-button type="text" @click="handleRedact(scope.row)" v-has="'prj:group:modify'">编辑</el-button>
							<el-button type="text" @click="handleLook(scope.row)" v-has="'prj:group:view'">查看</el-button>
							<el-button type="text" @click="handleDelect(scope.row)" v-has="'prj:group:del'">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			  </div>
			</el-card>
		</div>
		<div class="addhtype" v-if="addhtypeshow">
			<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span class="title">新增户型</span>
					<div style="float: right">
							<el-button type="primary" @click="submitForm('addForm')">保存</el-button>
							<el-button type="primary" @click="closeAddhtype" class="mainBtn_">取消</el-button>
					</div>
			  	</div>
				<!--新增户型内容-->
			    <el-form ref="addForm" :model="addForm" label-width="80px" :rules="addRule">
					<el-row :gutter="20">
						<el-col :span="8">
							<el-form-item label="户型名称:" prop="layoutName">
								<el-input v-model="addForm.layoutName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="建筑面积:" prop="buildingArea">
								<el-input v-model="addForm.buildingArea"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="套内面积:" prop="coveredArea">
								<el-input v-model="addForm.coveredArea"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="8">
							<el-form-item label="格局:" prop="houseStyleName">
									<el-select v-model="addForm.houseStyleName" placeholder="请选择">
										<el-option v-for="item in options1" :key="item.id" :label="item.itemValue" :value="item.itemValue"></el-option>
									</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="朝向:">
								<el-select v-model="addForm.orientation" placeholder="请选择">
										<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
									</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="户型图:">
						<el-upload
						class="avatar-uploader"
						action="/zuul/api/storage/files/multipart/file"
						:on-success="handleAvatarSuccess"
						:on-remove="handleRemove"
                        :before-remove="beforeRemove"
						:before-upload="beforeAvatarUpload"
						:data="upLoadData"
						name="files"
						list-type="picture-card"
						:file-list="commonResources">
						<i class="el-icon-plus"></i>
							<!-- <img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
						</el-upload>
					</el-form-item>
			     </el-form>
			</el-card>
		</div>
		<div class="lookhtype" v-show="lookhtypeshow">
			<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span class="title">查看户型</span>
					<div style="float: right">
							<el-button type="primary" @click="lookinfor">返回</el-button>
							
					</div>
			  </div>
			  <!--查看户型内容-->
			  <el-form ref="addForm" :model="addForm">
					<el-row :gutter="20">
						<el-col :span="8">
							<el-form-item label="户型名称:">{{addForm.layoutName}}</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="建筑面积:">{{addForm.buildingArea}}</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="套内面积:">{{addForm.coveredArea}}</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="8">
							<el-form-item label="格局:">{{addForm.houseStyleName}}</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="朝向:">{{addForm.orientation}}</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="户型图:">
						<el-carousel trigger="click" height="150px">
							<el-carousel-item v-for="(item, index) in addForm.commonResources" :key="index">
								<!-- <h3>{{ item }}</h3> -->
								<img :src="item.fileUrl" style="width: 100%; height: 100%"/>
							</el-carousel-item>
						</el-carousel>
					</el-form-item>
			     </el-form>
			</el-card>
		</div>

	</div>
</template>

<script>

 import {
    dictionaryEntryList
  } from '@/api/pages/mainPage/systemManagement'
	import {getLayoutList, saveLayout, updateLayout, deleteLayout, getLayoutInfo} from "@/api/pages/mainPage/plan/house"
	 const cityOptions = ['客厅', '餐厅', '玄关', '厨房', '主卧', '次卧', '主卫', '次卫', '阳台', '设备阳台', '书房', '储藏室', '衣帽间'];
	export default {
		props: {
			val: Object,
			node: Object,
			nodeAll: Object,
			areaInfo: Object
		},
		data(){
			return{
				tableData:[],
				isAdd: false,// 判断是新增户型还是修改户型
				addForm: {
					layoutName: '',// 户型名称
					buildingArea: '',// 建筑面积
					coveredArea: '',// 套内面积
					houseStyleName: '',// 格局
					orientation: '',// 朝向
					resourceMaps: []// 户型图附件
				},
				addRule: {
                    layoutName: [
                        { required: true, message: '请输入户型名称', trigger: 'blur' }
                    ],
                    buildingArea: [
                        { required: true, message: '请输入建筑面积', trigger: 'blur' }
                    ],
					coveredArea: [
                        { required: true, message: '请输入套内面积', trigger: 'blur' }
                    ],
					houseStyleName: [
                        { required: true, message: '请输入格局', trigger: 'blur' }
                    ]
                },
				options1: [],// 格局
				options2: [
					{
						value: '东',
						label: '东'
					},{
						value: '南',
						label: '南'
					},{
						value: '西',
						label: '西'
					},{
						value: '北',
						label: '北'
					},{
						value: '东北',
						label: '东北'
					},{
						value: '东南',
						label: '东南'
					},{
						value: '西北',
						label: '西北'
					},{
						value: '西南',
						label: '西南'
					}
				],
				htypeinforshow:true,
				addhtypeshow:false,
				lookhtypeshow:false,
				houTypeshow:false,
				optionnam: [{
		          value: '选项1',
		          label: '三室一厅'
		        }],
		        value6:'',
		        checkAll: false,
		        checkedCities: ['上海', '北京'],
		        cities: cityOptions,
				isIndeterminate: true,
				imageUrl: '',// 上传图片的url
				commonResources: [],// 上传图片的list
				upLoadData: {
                    bussinessType: 'project'
                },
			}
		},
		methods:{
			handleGetStructureList() {// 获取格局下拉数据
				dictionaryEntryList({typeCode: 'LAYOUT_PATTERN'}).then(res=>{
					 ;
					if( res.status === 200 ){
						this.options1 = res.data.list;
					}
				})
			},
			handleGetLayoutList() {
				let params = new URLSearchParams();
				params.append( "areaId",this.areaInfo.info.id );
				params.append( "pageNum", 1 );
				params.append( "pageSize", 20 );

				getLayoutList(params).then(res=>{
					 ;
					if( res.status === 200 ){
						this.tableData = res.data.list;
					}
				})
			},
			closeAddhtype(){
				this.htypeinforshow=!this.htypeinforshow;
				this.addhtypeshow=!this.addhtypeshow;
			},
			closehtype(){

				this.$emit('child');
			},
			submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.keepinfor()
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
			keepinfor(){// 新增户型页面点击确定按钮
				let that = this;
				if( this.isAdd ){
					this.addForm.projectId = this.areaInfo.info.projectId;
					this.addForm.areaId  = this.areaInfo.info.id;
					this.addForm.areaCode  = this.areaInfo.info.areaCode;
					this.addForm.areaName  = this.areaInfo.info.areaName;
					this.addForm.projectName  = this.areaInfo.info.projectName;
					this.addForm.projectCode  = this.areaInfo.info.projectCode;
					this.addForm.commonResources  = this.commonResources;
					console.log(this.addForm)
					saveLayout(this.addForm).then(res=>{
						 
						if( res.status === 200 ){
							this.$message({
								type: 'success',
								message: '保存成功！'
							})
							that.htypeinforshow=!that.htypeinforshow;
							that.addhtypeshow=!that.addhtypeshow;
							this.handleGetLayoutList()
						}else{
							this.$message.error(res.message)
						}
					})
				}else{
					console.log(this.addForm);
					updateLayout(this.addForm).then(res=>{
						 
						if( res.status === 200 ){
							this.$message({
								type: 'success',
								message: '保存成功！'
							})
							that.htypeinforshow=!that.htypeinforshow;
							that.addhtypeshow=!that.addhtypeshow;
							this.handleGetLayoutList()
						}else{
							this.$message.error(res.message)
						}
					})
				}
			},
			handleDelect(row) {// 删除户型
				 
				let params = new URLSearchParams();
				params.append('id', row.id)
				deleteLayout(params).then(res=>{
					 
					if( res.status === 200 ){
						this.$message({
							type: 'success',
							message: ' 删除成功！'
						})
					}else{
                        this.$message.error(res.message);
                    }
				}).then(res=>{
					this.handleGetLayoutList()
				})
			},
			handleLook(row){// 户型分页列表，查看户型详情
				 
				// let params = new URLSearchParams();
				// params.append('id', row.id)
				// getLayoutInfo(params).then(res=>{
				// 	 ;
				// 	if( res.status === 200 ){
				// 		this.addForm = row;
				// 	}
				// })
				this.addForm = row;
				this.htypeinforshow=!this.htypeinforshow;
	  			this.lookhtypeshow=!this.lookhtypeshow;
			},
			handleRedact(row) {// 打开编辑户型页面按钮
				 
				this.addForm = row;
				this.commonResources = row.commonResources
				this.addhtypeshow = true;
				this.htypeinforshow = false;
				this.isAdd = false;

			},
			lookinfor(){
				this.htypeinforshow=!this.htypeinforshow;
	  			this.lookhtypeshow=!this.lookhtypeshow;
			},
			handleCheckAllChange(val) {
		        this.checkedCities = val ? cityOptions : [];
		        this.isIndeterminate = false;
		    },
		    handleCheckedCitiesChange(value) {
		        let checkedCount = value.length;
		        this.checkAll = checkedCount === this.cities.length;
		        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
		    },
			openaddhtype(){// 打开新增户型
			 	this.addForm = {}
						 this.isAdd = true;//
	         	this.htypeinforshow=!this.htypeinforshow;
	  				this.addhtypeshow=!this.addhtypeshow;
			},
			handleAvatarSuccess(res, file) {
				// this.imageUrl = URL.createObjectURL(file.raw);
				res.data.map(item=>{
                    this.commonResources.push({
						fileUrl: item.fileUrl,
						url: item.fileUrl
                    })
				})
				 
			},
			handleRemove(file, fileList) {
                console.log(file, fileList);
                this.commonResources = fileList;
			},
			beforeRemove(file, fileList) {
                return this.$confirm(`确定移除该图片？`);
            },
			beforeAvatarUpload(file) {
				console.log(file)
				const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';

				if (!isJPG) {
				this.$message.error('上传图片只能是 JPG 或 png格式!');
				}
				return isJPG;
			}

		},
		created() {
			console.log(this.val)
			console.log(this.nodeAll)
			console.log(this.areaInfo)
			this.handleGetLayoutList();
			this.handleGetStructureList()
		},
		mounted() {

		}

	}
</script>

<style>

	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 150px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}
    .avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
