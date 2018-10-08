<template>
	<div id="price">
		<el-card class="box-card">
			<div>
				<el-form :model="searchForm" :inline="true">
					<el-form-item label="公告名称">
						<el-input v-model="searchForm.schemeName" auto-complete="off" placeholder="请输入搜索关键字"></el-input>
					</el-form-item>
					<el-form-item 
            label = '信息来源'
            prop="searchProjectValue"
          >
          <el-select clearable v-model="searchForm.massageSouser" placeholder="请选择">
            <el-option 
              v-for="(item,index) in this.massageOptions"
              :key="index"
              :label="item.deptName" 
              :value="item.deptName" 
            >
            </el-option>         
          </el-select>
        </el-form-item>
					<div style="float: right">
						<el-button type="success" @click="searchScheme">搜索</el-button>
					</div>
				</el-form>
			</div>
		</el-card>
		<el-card>
			<div>
        <div class="projectListHeader">
          <h4 class = "listTitle standardTitle">公告列表</h4>
          <div class="listbtnBox">
            <el-button v-has="'wb:notice:save'" class = "newProjectBtn" type="primary" size = "mini" @click="addNotice">发布公告</el-button>
          </div>
        </div>
				<el-table :data="tableData" border style="width: 100%" >
					<el-table-column type="index" width="110" label="序号" align="center"></el-table-column>
					<el-table-column prop="noticeName" label="公告名称" align="center" show-overflow-tooltip></el-table-column>					
					<el-table-column prop="deptName" label="信息来源" align="center" show-overflow-tooltip></el-table-column>
					<el-table-column prop="updateTime" label="发布时间" align="center" show-overflow-tooltip></el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button v-has="'wb:notice:view'" @click="handSee(scope.row)" type="text">查看</el-button>
              <el-button v-has="'wb:notice:del'" @click="handleDelete(scope.row)" type="text">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
        v-if="this.total>9"
         @size-change="handleSizeChange"
          @current-change="handleCurrentChange" 
          :current-page="currentPage" 
          :page-sizes="[10, 20]"         
           :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper" 
            :total="total">
				</el-pagination>
			</div>
		</el-card>
	</div>
</template>

<script>
import {
   getAnnouncement,//获取公告列表
   getSource,//获取信息来源
   deteleAnnouncement,//删除公告
  } from '@/api/pages/workflow'

export default {
  data() {
    return {
      /*******头部搜索*****/
      searchForm: {
        cityCompany: "", //  城市公司
        projectName: "", // 项目名称
        createTime: [], // 制定时间
        schemeName: "" ,// 标题
        massageSouser:'',//信息来源
      },
      cityCompanyOption: [], // 选择城市公司下拉数据
      projectNameOption: [], // 选择项目名称下拉数据
      massageOptions:[],
      tableData: [
        {
          title: "测试"
        }
      ], // table数据
      /*******分页*****/
      pageSize: 10, // 每页数量
      currentPage: 1, // 当前页
      total:0,//总页数
      tabPosition: "DRAFT"
    };
  },
  //D:\Greentown\src\pages\mainPage\workspaceManagement\notice\addNotice.vue
  methods: {
    addNotice(){
      //addNotice
    //  this.$router.push({ path:'/mainPage/workspaceManagement/notice/addNotice'});
     this.$router.push({ name: "addNotice"});
    },
    /************ajax请求************/
    handlegetPriceSchemeList() {
      //获取信息来源
      getSource().then((res)=>{
        if(res.status === 200){
          console.log('获取信息来源',res)
          if(res.data){
            this.massageOptions = res.data
            console.log('liebiao',this.massageOptions)
          }
          
        }
      })

      // 请求table数据
      let params = {
        noticeName:this.searchForm.schemeName?this.searchForm.schemeName:null,
        deptName:this.searchForm.massageSouser?this.searchForm.massageSouser:null,
        pageNum: this.currentPage,
        pageSize: this.pageSize,      
      };
        getAnnouncement(params).then(res => {
          if (res.status === 200) {
          console.log('获取客户列表1231',res)
          this.total = res.data.total
            this.tableData = res.data.list;
            console.log('获取客户列表',this.tableData)
          }
        });
    },
    /*********searchForm按钮*********/
    searchScheme() {
      // 搜索
      this.handlegetPriceSchemeList();
    },
    /**********************分页方法***************************/
    handleSizeChange(val) {
      this.pageSize = val;
      this.handlegetPriceSchemeList();
    },

    //当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.handlegetPriceSchemeList();
    },
    /***************/
    handSee(row) {
      this.$router.push({ name: "viewNotice", params: { id: row.id } });
    },
      // 删除标签
      handleDelete(row) {
        console.log('删除',row);
        this.$confirm('确认删除该标签?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('确定',row.id);
            let data={
              id:row.id
              } 
              console.log('data',data);    
              data = this.Qs.stringify(data)
              deteleAnnouncement(data).then((res) => {
                  if(res.status === 200){ 
                      console.log('请求成功') 
                      this.handlegetPriceSchemeList();             
                  }
            });
        })
      },
  },
  created() {
    this.handlegetPriceSchemeList();
  }
};
</script>

<style scoped>

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
</style>
