<template>
  <div class="background-m project-tagging-management-select">
    <div class="envelope-box">
      <div class="envelope-title search-box">

        <span>标签名称：</span>
        <el-input v-model="searchName" style="width:174px;" class="mr-10"></el-input>

        <span>标签类型：</span>
        <el-select clearable v-model="searchLabelType" placeholder="请选择" class="mr-10">
          <el-option label="单选" value="radio" ></el-option>
          <el-option label="多选" value="checkbox" ></el-option>
          <el-option label="文本" value="text" ></el-option>
          <el-option label="数字" value="number" ></el-option>
          <el-option label="日期" value="date" ></el-option>
          <el-option label="单选加补充说明" value="radioOther" ></el-option>
        </el-select>

        <span>标签值类型：</span>
        <el-select clearable v-model="searchLabelValue" placeholder="请选择" class="mr-10">
          <el-option label="项目不可编辑" value="readonly" ></el-option>
          <el-option label="项目可编辑二级" value="secEdit" ></el-option>
          <el-option label="项目可编辑" value="edit" ></el-option>
          
        </el-select>

        <div class="fr">
          <el-button @click="handleSearch" type="primary">搜索</el-button>
        </div>

      </div>
      <div class="envelope-title">
        <div class="mb-10 lh-28 of-hidden">
          <span class="color-title-green">选择标签</span>
          <div class="fr">
            <div class="fl">
              <el-button type="primary" @click="handleSubmit">确定</el-button>
              <el-button @click="handleClose">取消</el-button>
            </div>            
          </div>
        </div>
        <div class="table-box">
          <el-row>
            <!-- 左侧表格 -->
            <el-col :span="11">
              <el-table
              class="m-table"
              :data="tableDataLeft"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange1"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column type="index" label="序号" width="80px"></el-table-column>
                <el-table-column prop="labelName" label="标签名称"></el-table-column>
                <el-table-column prop="labelType" label="标签类型"></el-table-column>
                <el-table-column prop="labelValueType" label="标签值类型"></el-table-column>
              </el-table>
              <el-pagination
              class="mt-10"
              v-if="total > 10"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :total="total"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="prev, pager, next, jumper"
              >
              </el-pagination>
            </el-col>
            <el-col :span="2">
              <div style="height:1px;position:relative;">
                <el-button class="m-add" @click="handleAdd" type="primary">
                  添加
                  <i class="el-icon-arrow-right"></i>
                </el-button>
                <el-button class="m-delete" @click="handleDelete" type="primary">
                  移除
                  <i class="el-icon-arrow-left"></i>
                </el-button>
              </div>
            </el-col>
            <!-- 右侧表格 -->
            <el-col :span="11">
              <el-table
              class="m-table"
              :data="tableDataRight"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange2"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column type="index" label="序号" width="80px"></el-table-column>
                <el-table-column prop="labelName" label="标签名称"></el-table-column>
                <el-table-column prop="labelType" label="标签类型"></el-table-column>
                <el-table-column prop="labelValueType" label="标签值类型"></el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </div>
         <!-- 弹窗 -->
      
      </div>    
    </div>
    <projectTagging @closeS='handleClose'  ref="projectTagging"></projectTagging>
  </div>
  
</template>

<script>
  // 获取请求接口
  import {
    getGroupLabel//获取集团标签
  } from '@/api/pages/mainPage/customerFollowUp/projectTaggingManagement'

  import projectTagging from './projectTagging.vue'

  export default {

    components : {projectTagging},
    data() {
      return {
        searchName : '',
        searchLabelType : '',
        searchLabelValue : '',
        //项目id
        projectId:'',
        projectCityId:'',
        // 左侧表格数据
        tableDataLeft : [],
        // 右侧表格数据
        tableDataRight : [],
        // 数据总数
        total : 0,
        // 当前页数
        currentPage : 1,
        // 每页数量
        pageSize : 10,
        // table 选中数据
        multipleSelection1 : [], // 左边
        multipleSelection2 : [], // 右边
      }
    },
    props:['proData'],
    mounted(){
      if(this.proData){
        this.projectId = this.proData.projectId
        this.projectCityId = this.proData.projectCityId

        this.initTableList()
      }
    },

    methods : {
      // 更新表格 数据
      initTableList() {
         let data={
          pageNum:this.currentPage,   
          pageSize:this.pageSize,
          labelName:this.searchName,
          labelType:this.searchLabelType,
          labelValueType:this.searchLabelValue,
          projectId:this.projectId,
          projectCityId:this.projectCityId
        }          
        getGroupLabel(data).then((res) => {
            if(res.status === 200){ 
                this.total = res.data.total   
                this.function_1(res.data.list)             
            }
          });
      },

      function_1(data){
        for(let i=0;i<data.length;i++){

                if(data[i].labelType ==='radio'){
                  data[i].labelType = '单选'
                }else if(data[i].labelType ==='checkbox'){
                  data[i].labelType = '多选'
                }else if(data[i].labelType === 'text'){
                  data[i].labelType = '文本'
                }else if(data[i].labelType === 'number'){
                  data[i].labelType = '数字'
                }else if(data[i].labelType === 'date'){
                  data[i].labelType = '日期'
                }else if(data[i].labelType === 'radioOther'){
                  data[i].labelType = '单选&其他'
                }else if(data[i].labelType === 'dict'){
                  data[i].labelType = '字典'
                } 
                
                if(data[i].labelValueType === 'readonly'){
                  data[i].labelValueType = '项目不可编辑'
                }else if(data[i].labelValueType === 'edit'){
                  data[i].labelValueType = '项目可编辑'
                }else if(data[i].labelValueType === 'secEdit'){
                  data[i].labelValueType = '项目只可编辑二级'
                }

        }
        this.tableDataLeft = data

      },
      // 表格页数 初始化
      tableInitChange() {
        if(this.currentPage === 1){
          this.initTableList();
        }else{
          this.currentPage = 1;
        }
      },
      // 表格 size change
      handleSizeChange(val) {
        this.pageSize = val;
        this.tableInitChange();
      },
      // 表格 点击分页
      handleCurrentChange(val) {
        this.currentPage = val;
        this.initTableList();
      },
      // 点击搜索
      handleSearch() {
        this.tableInitChange();
      },
      // 点击提交
      handleSubmit() {
        if(this.tableDataRight.length === 0){
          this.$message.warning('请至少选择一个标签');
          return;
        }

         this.$refs.projectTagging.show(this.tableDataRight);


      },
      // 点击取消
      handleClose() {
        this.$emit('checkPage','listPage');
      },
      // 点击 添加
      handleAdd() {
        let arr = [];
        arr = arr.concat(this.tableDataRight,this.multipleSelection1);
        let newArr = [];
        // 去重
        (() => {
          let obj = {};
          arr.map((v,k) => {
            if(!obj[v.id]){
              newArr.push(v);
              obj[v.id] = true;
            }
          });
        })();
        this.tableDataRight = newArr;
      },
      // 点击 移除
      handleDelete() {
        this.multipleSelection2.map((v1,k1) => {
          this.tableDataRight.map((v2,k2) => {
            if(v1.id === v2.id){
              this.tableDataRight.splice(k2,1);
            }
          });
        });
      },
      // 左侧选中数据
      handleSelectionChange1(val) {
        this.multipleSelection1 = val;
      },
      // 右侧选中数据
      handleSelectionChange2(val) {
        this.multipleSelection2 = val;
      },
    },
  }
</script>

<style lang="scss" scoped>

.project-tagging-management-select{
  .table-box{
    min-height: 500px;
    .m-add{
      position: absolute;
      left: calc(100% / 2 - 31px);
      top: 160px;
    }
    .m-delete{
      position: absolute;
      left: calc(100% / 2 - 31px);
      margin-left: 0;
      top: 300px;
    }
  }
}

</style>