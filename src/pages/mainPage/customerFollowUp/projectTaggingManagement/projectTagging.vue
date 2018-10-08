<template>
  <div class="closing-business-opportunities">
    <el-dialog
      title="选择项目"
      width="500px"
      @close="handleClose"
      :visible.sync="dialogVisible"
    >
    <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
      <div class="text-center">
        <el-form-item label="城市公司：" prop="searchCityCompany">
           <el-select v-model="ruleForm.searchCityCompany" clearable>
						<el-option v-for="(item, index) in cityCompanyOption" :key="index" :label="item.name" :value="item.id"></el-option>
					</el-select>
          </el-form-item>

          <el-form-item 
            label = '选择项目：'
            prop="searchProjectValue"
          >
          	<el-select v-model="ruleForm.searchProjectValue" clearable>
						<el-option v-for="(item, index) in projectNameOption" :key="index" :label="item.name" :value="item.id"></el-option>
					</el-select>

        </el-form-item>
      </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    
    </el-dialog>
  </div>
</template>

<script>

  import {
    getProjectName,//查询项目
    getCitycompanies,//获取城市公司
    getLabelDatabase,//从标签库获取标签
  } from '@/api/pages/mainPage/customerFollowUp/projectTaggingManagement'
import {getCityList, getPrjByCityId, getBathList, getHouseList, getHouseViewByBuildId} from '@/api/pages/mainPage/transactionManagement/houseQuery'

 import Cookies from 'js-cookie'//引入cookie

  export default {
    data() {
      return {
        dialogVisible : false,       
        ruleForm : {
          // 项目城市
          searchCityCompany : '',
          //项目名称
          searchProjectValue:'',
          //项目id
          projectId : '',
          //城市公司列表
          cityCompanieslist:[],
          //项目列表
          projectOptions:[],
          //标签信息list
          labelList:[],
        },
        cityCompanyOption: [],// 选择城市公司下拉数据
				projectNameOption: [],// 选择项目名称下拉数据
        rules : {
          reasonForClosure : [
            {required : true , message : '' , trigger : 'blur'}
          ],
        },
      }
    },
     watch: {
			"ruleForm.searchCityCompany": function(e) {
				this.ruleForm.searchProjectValue = null;
				if( e ){
					this.handleGetPrjByCityId({ id: e });
				}
			}
		},
    mounted(){
      
    },
    created(){
      this.handleGetCityList()
    },
    methods : {

       handleGetCityList() {// 获取城市公司
          this.cityCompanyOption = [];
          let userInfo = JSON.parse(sessionStorage.getItem('user-info'));
          if( userInfo.cityId ){
              this.cityCompanyOption.push({
                  id: userInfo.cityId,
                  name: userInfo.cityName,
                  code: userInfo.cityCode
              })
              this.ruleForm.searchCityCompany = this.cityCompanyOption[0].id;
          }else{
              //获取城市公司列表
              getCityList().then(res => {
                  if (res.status === 200) {
                      this.cityCompanyOption = res.data;
                      this.ruleForm.searchCityCompany = this.cityCompanyOption[0].id;
                  }
              });
          }
				
			},
      handleGetPrjByCityId(params) {// 通过城市公司ID获取项目
        let userInfo = JSON.parse(sessionStorage.getItem('user-info'));
        if( userInfo.projects && userInfo.projects[0] && userInfo.cityId){
            this.projectNameOption = userInfo.projects;
            this.projectNameOption.map(item=>{
                item.name = item.projectName
            })
            this.ruleForm.searchProjectValue = this.projectNameOption[0].id;
            
        }else{
            getPrjByCityId(params).then(res => {
                if (res.status === 200) {
                    this.projectNameOption = res.data;
                    this.ruleForm.searchProjectValue = this.projectNameOption[0].id;
                   
                }
            });
        }
			},

      show(data) {
        this.dialogVisible = true;
        this.ruleForm.labelList = data
      },
      // 浮层关闭
      handleClose() {
        this.dialogVisible = false;       
        this.$refs.ruleForm.resetFields();
        this.$emit('closeS')
      },
      // 浮层提交 
      handleSubmit() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            
            let groupLabelIdsList = []
            for(let g=0;g<this.ruleForm.labelList.length;g++){
              groupLabelIdsList.push(this.ruleForm.labelList[g].id)
            }

            let groupLabelIdsListStr = groupLabelIdsList.join(',')

            let data = {
              projectId:this.ruleForm.searchProjectValue,
              groupLabelIds:groupLabelIdsListStr
            }
            getLabelDatabase(data).then((res)=>{
              if(res.status === 200){
                this.$message({
                  message: '项目标签添加成功',
                  type: 'success'
                });
                //this.$router.push({path:`/mainpage/customerFollowUp/projectTaggingManagement`})
                this.handleClose()
              }
            })

          }
        });
      },
    },
  }
</script>

