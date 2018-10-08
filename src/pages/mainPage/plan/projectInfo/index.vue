<template>
  <div id="projectInfomation">
    <div class="projectInfomationCard">
      <el-form>
        <el-row>
          <el-col :span="6">
            <el-form-item label="所在城市:">
              <el-cascader  clearable :options="EssentialsMsgProjectOption" v-model="projectOption.cityId" @active-item-change="handleCityChange" @change="celectCityChange" :props="cascaderProps" size = "mini"  class = "inputControl" >
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="城市公司：">
              <el-select v-model="projectOption.projectCityCode" placeholder="请选择归属公司" :clearable="projectCityCompany.length > 1" class="inputControl">
                <el-option v-for="item in projectCityCompany" :key="item.id" :label="item.name" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目名称：">
              <el-input v-model="projectOption.projectName" class="inputControl" ></el-input>
            </el-form-item>
          </el-col> 
          <el-col :span="6">
            <el-form-item label="项目负责人：" style="float: right">
              <el-input v-model="projectOption.projectMgrName" class="inputControl"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="float: right">
          <el-button class="queryBtn mainBtn_" @click="clearCheckFrom">清除</el-button>
          <el-button class="queryBtn" type="primary" @click="boxCardStatuesControl">查询</el-button>
      </div>
      <div v-if="boxCardStatues" class="boxCardHiddenPart">
        隐藏内容
      </div>
    </div>

    <div class="projectList">
      <div class="projectListHeader">
        <h4 class = "listTitle standardTitle">项目列表</h4>
        <div class="listbtnBox">
          <el-button class = "newProjectBtn" type="primary" size="mini" @click="handleToNewPorjectPage" v-has="'prj:project:add'">新增项目</el-button>
        </div>
      </div>

      <div class="projectListBody">

        <el-table v-loading="loading" :data="tableData" border style="width: 100%;" empty-text="没有相应数据">
          <el-table-column type="index" width="110" label="序号" align ="center"></el-table-column>
          <el-table-column prop="projectName" label="项目名称"  align ="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="cityName" label="所在城市"  align ="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="projectCityName" label="城市公司"  align ="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="projectMgrName" label="项目负责人"  align ="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="action" label="操作" align ="center" width="210px">
            <template slot-scope="scope" class="userManagement_actionBox">
              <el-button type="text" class="itemBtn"  @click.stop ="handleCheckProject(scope.$index, scope.row)" v-has="'prj:project:view'">查看</el-button>
              <el-button type="text" class="itemBtn" @click.stop ="handleEditorProject(scope.$index, scope.row)" v-has="'prj:project:edit'">编辑</el-button>
              <el-button type="text" class="itemBtn" @click.stop ="handleDeleteProject(scope.$index, scope.row)" v-has="'prj:project:del'">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          class = "PaginationComponent"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20]"
          :page-size= pageSize
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalPages">
        </el-pagination>
      </div>

    </div>

  </div>
</template>

<script>
  //import axios from "@/axios/api.js";
  import {getProjectInfoList,getCityCompanyList,projectInfoDelete,getCityListForCascader} from "@/api/pages/mainPage/plan/projectInfo/index.js"
    export default {
      name: "project-information",
      data(){
          return{
            boxCardStatues : false,
            projectOption:{
              projectName:"",
              cityId:[],
              projectCityId:"",
              projectCityCode: '',
              projectMgrName:""
            },
            tableData:[],//表格渲染匹配字

            //checkOption:{},//查询匹配字

            currentPage:1, //标记当前分页在第几页
            pageSize:10,    //每页默认20条
            totalPages:0,  //目前总页数
            //地址选择三级联动菜单
            EssentialsMsgProjectOption:[],
            cityIdValueForSearch:[], //查询时使用此数组中的内容
            /*********城市公司列表**********/
            projectCityCompany:[],
            /**********级联选择器规则*************/
            cascaderProps:{
              label:'label',
              value: 'value',
              children: 'children'
            },
            /***************加载标志*****************/
            loading:false
          }
      },

      created(){
        this.projectCityCompany = [];
        let that = this;
        //获取项目信息列表
        let userInfo = JSON.parse(sessionStorage.getItem('user-info'));
        if( userInfo.cityId ){
          this.projectCityCompany.push({
            id: userInfo.cityId,
            name: userInfo.cityName,
            code: userInfo.cityCode
          })
          this.projectOption.projectCityId = this.projectCityCompany[0].id;
          this.projectOption.projectCityCode = this.projectCityCompany[0].code;
          this.boxCardStatuesControl()
        }else{
          //获取城市公司列表
          getCityCompanyList().then(res=>{
            if(res.status === 200)
              this.projectCityCompany = res.data;
              this.projectOption.projectCityCode = this.projectCityCompany[0].code;
              this.projectOption.projectCityId = this.projectCityCompany[0].id;
              this.boxCardStatuesControl()
          });
        }

        //获取地区菜单
        getCityListForCascader()
          .then(res=>{
            if(res.status === 200){
              this.EssentialsMsgProjectOption = res.data;
            }
          })
      },

      methods: {
        //清空查询信息
        clearCheckFrom(){
          this.projectOption.projectName="";
          this.projectOption.cityId = [];
          this.cityIdValueForSearch = [];
          this.projectOption.projectCityId = this.projectCityCompany[0].id;
          this.projectOption.projectCityCode = this.projectCityCompany[0].code;
          this.projectOption.projectMgrName="";
        },

        //发送查询信息
        boxCardStatuesControl(){
          this.currentPage = 1; //将当前页至1
          let data = this.projectOption;
          let that = this;
          let cityId_="";

          if( this.cityIdValueForSearch.length === 3 ){
            cityId_ = this.cityIdValueForSearch[0]+"->"+this.cityIdValueForSearch[1]+"->"+this.cityIdValueForSearch[2];
          }

          let params = new URLSearchParams();
          params.append( "projectName",data.projectName );
          params.append( "cityName", cityId_);
          params.append( "projectCityCode",data.projectCityCode );
          params.append( "projectMgrName",data.projectMgrName );
          params.append( "pageNum",this.currentPage );
          params.append( "pageSize",this.pageSize );
          getProjectInfoList(params)
            .then(res=>{
              this.loading = true;
              if( res.status == "200" ){
                this.loading = false;
                that.tableData = res.data.list;
                that.totalPages = res.data.total;
                that.currentPage = res.data.pageNum;
              }
            });
        },

        //跳转到新建项目页面
        handleToNewPorjectPage(){
          this.$router.push('newProject');
        },

        //跳转到查看项目页面
        handleCheckProject(index,row){
           
          this.$router.push({ name: 'checkProject', params: { id: row.id }});
        },

        //跳转到项目编辑页面
        handleEditorProject(index,row){
          this.$router.push({ name: 'editorProject', params: { id: row.id }});
        },

        //点击删除按钮时触发
        handleDeleteProject(index,row){
          if(row.isHasChildrenNode == 'Y'){
            this.$confirm('该项目下有子项内容，无法删除！','提示',{
                type:'warning'
            })
          }else{
            this.$confirm('确定要删除该条数据吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              //删除项目
              let that = this;
              let params = new URLSearchParams();
              params.append( "id",row.id );
              //发起删除请求
              projectInfoDelete(params)
                .then(res=>{
                  if(res.status=="200"){
                    this.currentPage = 1; //将当前页至1
                    let data = this.projectOption;
                    let that = this;
                    let cityId_="";

                    if( this.cityIdValueForSearch.length === 3 ){
                      cityId_ = this.cityIdValueForSearch[0]+"->"+this.cityIdValueForSearch[1]+"->"+this.cityIdValueForSearch[2];
                    }
                    let params_ = new URLSearchParams();
                    params_.append( "projectName",data.projectName );
                    params_.append( "cityName", cityId_);
                    params_.append( "projectCityCode",data.projectCityCode );
                    params_.append( "projectMgrName",data.projectMgrName );
                    params_.append( "pageNum",this.currentPage );
                    params_.append( "pageSize",this.pageSize );
                    //更新当前列表
                    getProjectInfoList(params_)
                      .then(res=>{
                        console.log("删除列表项");
                        if(res.status == "200"){
                          that.tableData = res.data.list;
                          that.totalPages = res.data.total;
                          that.currentPage = res.data.pageNum;
                        }
                      });

                    this.$message({
                      type: 'success',
                      message: '删除成功!'
                    });
                  }
                });
            })
          }
        },
        //点击表中的每行时触发
        handleRowClick(row){
          this.$router.push({ name: 'checkProject', params: { id: row.id }});
        },
        /************分页组件方法***************/
        //页面最大行数改变
        handleSizeChange(val) {
          this.pageSize =val;
          this.currentPage = 1;
          //let data = this.projectOption;
          let that = this;
          let data = this.projectOption;
          let cityId_="";
          if( this.cityIdValueForSearch.length === 3 ){
            cityId_ = this.cityIdValueForSearch[0]+"->"+this.cityIdValueForSearch[1]+"->"+this.cityIdValueForSearch[2];
          }
          let params = new URLSearchParams();
          params.append("projectName",data.projectName);
          params.append( "cityName",data.cityId );
          params.append( "projectCityCode",data.projectCityCode );
         params.append( "projectMgrName",data.projectMgrName );
          params.append( "pageNum",this.currentPage );
          params.append( "pageSize",this.pageSize );

          getProjectInfoList(params)
            .then(res=>{
              that.tableData = res.data.list;
            });
        },
        //当前页改变
        handleCurrentChange(val) {
          this.currentPage = val;
          let data = this.projectOption;
          let that = this;
          let cityId_="";

          if(data.cityId.length === 3){
             cityId_ = data.cityId[0]+"->"+data.cityId[1]+"->"+data.cityId[2];
          }

          let params = new URLSearchParams();

          params.append( "projectName",data.projectName );
          params.append( "cityName",cityId_);
          params.append( "projectCityCode",data.projectCityCode );
          params.append( "projectMgrName",data.projectMgrName );
          params.append( "pageNum",this.currentPage );
          params.append( "pageSize",this.pageSize );

          getProjectInfoList(params)
            .then(res=>{
              that.tableData = res.data.list;
            });
        },
        /***********级联选择器选择时触发*************/
        handleCityChange(val){

          let length = this.EssentialsMsgProjectOption.length;
          let index = 0;
          for(let i = 0; i < length; i++){
            if(this.EssentialsMsgProjectOption[i].value == val[0]){
              index = i;
              break;
            }
          }

          if(val.length === 1){
            //发送请求加载
            if (!this.EssentialsMsgProjectOption[index].children.length) {
              let provinceCode = {
                parentCode:val[0]
              };
              getCityListForCascader(provinceCode)
                .then(res=>{
                  if(res.status === 200){
                    this.EssentialsMsgProjectOption[index].children = res.data;
                  }
                });
            }
          } else if(val.length === 2) {

            let cityValue = val[1];
            let city = this.EssentialsMsgProjectOption[index].children;
            let cityIndex = 0;
            for (let j = 0; j < city.length; j++) {
              if (city[j].value == cityValue) {
                cityIndex = j;
                break;
              }
            }
            //发送请求加载
            if (!city[cityIndex].children.length) {
              let cityCode = {
                parentCode: cityValue
              };
              getCityListForCascader(cityCode)
                .then(res => {
                  if (res.status === 200) {
                    city[cityIndex].children = res.data;
                  }
                });
            }
          }
        },

        celectCityChange(val){
          if( !val[0] ){
            this.cityIdValueForSearch = [];
            return
          }
          let length = this.EssentialsMsgProjectOption.length;
          let index = 0;

          for( let i = 0; i < length; i++ ){
            if( this.EssentialsMsgProjectOption[i].value === val[0] ){
              index = i;

              this.cityIdValueForSearch[0] = this.EssentialsMsgProjectOption[i].label; //赋值省份
              let city = this.EssentialsMsgProjectOption[i].children;

              for(let j = 0; j < city.length; j++ ){
                if( city[j].value === val[1] ){

                  this.cityIdValueForSearch[1] = city[j].label; //赋值城市
                  let ear = city[j].children;
                  for(let k =0; k < ear.length ; k++ ){
                     if(ear[k].value === val[2] ){
                       this.cityIdValueForSearch[2] = ear[k].label;//赋值区县
                     }
                  }
                }
              }
            }
          }
        }
      }
    }
</script>

<style scoped>
  .projectInfomationCard{
    border-bottom: 1px solid #E5E5E5;
    overflow: hidden;
    padding: 20px;
  }

  .headShowPart{
    overflow: hidden;
    height: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 25px;
  }
  .inputBox{
    height: 28px;
    line-height: 28px;
  }
 #projectInfomation .queryBtn{
    width: 54px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    padding: 0;
  }

  .inputControl{
    width: 130px;
    padding: 0;
    height: 28px;
  }
  .inputLable{
    font-size: 12px;
    color: #666;
  }
  .icon{
    display: inline-block;
    margin-left: 10px;
    cursor: pointer;
    height: 40px;
    line-height: 40px;
  }
  .boxCardHiddenPart{
    padding: 0 20px;
  }


  .projectList{
    margin-top: 6px;
    border-radius: 5px;
    padding: 0 25px;
  }
  .projectListHeader{
    overflow: hidden;
    border-bottom: 1px solid #E5E5E5;
    height: 35px;
    margin: 0 0 23px 0;
  }

  .listTitle{
    height:30px;
    line-height: 30px;
    float: left;
    color: #007440;
  }

  .listbtnBox{
    float: right;
  }

  .itemBtn{
    display: inline-block;
    width: 40px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    cursor: pointer;
    font-size: 12px;
    color: #4DBE61;
  }

  .newProjectBtn{
    width: 78px;
    height: 28px;
  }
  .tableTextBtn{
    font-size: 12px;
    color:#4DBE61;
  }

  .firstBtn{
    border-right: 1px solid #99a9bf;
  }
  .PaginationComponent{
    margin: 10px 0;
    text-align: center
  }

  #projectInfomation{
    background-color: #fff;
    border-radius: 5px;
    padding-bottom: 10px;
  }



  /***********可抽离部分************/
  .standardTitle{
    font-size: 14px;
    color: #404040;
  }


</style>
