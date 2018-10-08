<template>
  <div class="background-m group-label-management">
    <div class="envelope-box">
      <div class="envelope-title search-box">

        <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px">

          <el-form-item label="标签名称：" prop="searchLabelName">
            <el-input v-model="ruleForm.searchLabelName"></el-input>
          </el-form-item>

          <el-form-item label="标签类型：" prop="searchLabelType">
            <el-select clearable v-model="ruleForm.searchLabelType" placeholder="请选择">
              <el-option label="单选" value="radio" ></el-option>
              <el-option label="多选" value="checkbox" ></el-option>
              <el-option label="文本" value="text" ></el-option>
              <el-option label="数字" value="number" ></el-option>
              <el-option label="日期" value="date" ></el-option>
              <!--<el-option label="单选加补充说明" value="radioOther" ></el-option>-->
            </el-select>
          </el-form-item>

          <el-form-item label="标签值层级：" prop="searchLabelHierarchy">
            <el-select clearable v-model="ruleForm.searchLabelHierarchy" placeholder="请选择">
              <el-option label="一级" value="1" ></el-option>
              <el-option label="两级" value="2" ></el-option>
            </el-select>
          </el-form-item>

          <div class="fr">
            <el-button @click="handleSearch" type="primary">搜索</el-button>
          </div>

          <br />

          <el-form-item label="标签值类型：" prop="searchLabelValueType">
            <el-select clearable v-model="ruleForm.searchLabelValueType" placeholder="请选择">
              <el-option label="项目不可编辑" value="readonly" ></el-option>
              <el-option label="项目可编辑" value="edit" ></el-option>
              <el-option label="项目只可编辑二级" value="secEdit" ></el-option>
            </el-select>
          </el-form-item>

        </el-form>

      </div>
      <div class="envelope-title">
        <div class="mb-10 lh-28 of-hidden">
          <span class="color-title-green">集团标签管理</span>
          <div class="fr">
            <el-button v-has="'cst:label:group:add'" @click="handleClick">新增标签</el-button>
          </div>
        </div>
        <el-table
        :data="tableData"
        border
        style="width: 100%"
        >
          <el-table-column type="index" label="序号" width="80px"></el-table-column>
          <el-table-column prop="labelName" label="标签名称"></el-table-column>
          <el-table-column prop="labelType" label="标签类型"></el-table-column>
          <el-table-column prop="labelValueType" label="标签值类型"></el-table-column>
          <el-table-column v-has="'cst:label:group:onflag'" prop="isMustEnable" label="是否必须启用">
            <template slot-scope="scope">
              <el-switch
                @change="handleSwitch(scope.row)"
                v-model="scope.row.value2"
                active-color="#13ce66"
                inactive-color="#E5E5E5">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="orderVal" label="排序"></el-table-column>
          <el-table-column prop="roleName" label="操作">
            <template slot-scope="scope">
              <el-button v-has="'cst:label:group:edit'" @click="handleEdit(scope.row)" type="text">编辑</el-button>
              <el-button v-has="'cst:label:group:del'" @click="handleDelete(scope.row)" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
        class="mt-10"
        v-if="total > 0"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
        <labelDialog @close= 'initTableList' ref="labelDialog"></labelDialog>
        <editDialog  @close= 'initTableList' ref="editDialog"></editDialog>
      </div>
    </div>
  </div>
</template>

<script>
  import '@/assets/styles/reset.scss';
  // 获取请求接口
  import {
    getGroupLabel,//获取集团标签分页列表
    deteleGroupLabel,//删除集团标签
    getLabel,//跟新集团标签
    editGroupLabel,//获取标签信息
  } from '@/api/pages/mainPage/customerFollowUp/customerManagementView'

  import labelDialog from './labelDialog.vue'
  import editDialog from './editDialog.vue'
  import { mapGetters } from 'vuex';

  export default {
    components : {labelDialog,editDialog},
    data() {
      return {

        ruleForm : {
          // 标签名称
          searchLabelName : '',
          // 标签类型
          searchLabelType : '',
          // 标签值层级
          searchLabelHierarchy : '',
          // 标签值类型
          searchLabelValueType : '',
        },
        rules : {},

        // 表格数据
        tableData : [],
        // 数据总数
        total : 0,
        // 当前页数
        currentPage : 1,
        // 每页数量
        pageSize : 10,
      }
    },
    mounted() {
      this.initTableList()
    },
    computed:{
      ...mapGetters([
      'permission'
      ])
    },
    methods : {
      // 更新表格 数据
      initTableList() {
        let data={
          pageNum:this.currentPage,
          pageSize:this.pageSize,
          labelName:this.ruleForm.searchLabelName,
          labelType:this.ruleForm.searchLabelType,
          labelLevel:this.ruleForm.searchLabelHierarchy,
          labelValueType:this.ruleForm.searchLabelValueType
        }
        getGroupLabel(data).then((res) => {
            if(res.status === 200){
                console.log('请求成功',res.data.list)
                //判断标签类型
                this.function_1(res.data.list)
                this.total = res.data.total
            }
          });
      },
      //赋值
      function_1(data){
        for(let i=0;i<data.length;i++){

          console.log('类型',data[i].labelValueType)
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

                if(data[i].isMustEnable === '1'){
                  this.$set(data[i], 'value2', true)
                }else{
                  this.$set(data[i], 'value2', false)
                }

        }
        this.tableData = data

         for(let i =0;i<this.tableData.length;i++){
              for(let k in this.tableData[i]){
                if(this.tableData[i][k] ===''||this.tableData[i][k]===null){
                    this.tableData[i][k] = '--'
                }
              }
            }

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
        console.log('搜索');
        this.tableInitChange();
      },
      // 新增标签
      handleClick() {
        //console.log('调过来的数据',this.permission)
        console.log('新增');
        this.$refs.labelDialog.show('add');
      },
      // 编辑标签
      handleEdit(row) {
        console.log('我是状态:',row.labelType);
        this.$refs.editDialog.show('edit',row,row.labelValueType);
      },
      // 删除标签
      handleDelete(row) {
        console.log('删除');
      
          this.$confirm('确认删除该标签?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log('确定',row);
              let data={
                id:row.id
                }
                deteleGroupLabel(data).then((res) => {
                    if(res.status === 200){
                        console.log('请求成功')
                        this.initTableList()
                    }else{
                       this.$message.error(res.message);
                    }
              });
          })
        

        
      },
      // 开关 change
      handleSwitch(row) {
        console.log('开关',row);
        let data = {
          id:row.id
        }
        console.log('rewe',data)
        editGroupLabel({id:row.id}).then((res)=>{
          if(res.status===200){
            console.log('获取成功',res)
            let obj = res.data

            if(row.value2 === true){
              obj.isMustEnable = '1'
            }else{
              obj.isMustEnable = '0'
            }

            console.log('obj',obj)
              getLabel(obj).then((res)=>{
              if(res.status === 200){
                    console.log('更新成功')
                    this.initTableList()
                  }
              })

          }
        })


      },
    },
  }
</script>

<style lang="scss">

.group-label-management{
  .search-box{
    .el-input input{

    }
  }
}

</style>
