<template>
  <div>
    <!-- 顶部form搜索 -->
    <el-form ref="form" :model="form" label-width="150px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="城市公司名称：">{{form.projectCityName}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称">{{form.projectName}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分期名称">{{form.devstagesName}}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="推盘批次编号：" v-if="form.raiseStatus == 'on'">
            {{form.batchCode}}
          </el-form-item>
          <el-form-item label="推盘批次编号：" v-if="form.raiseStatus != 'on'">
            <el-input v-model="form.batchShortCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="推盘批次名称">
            <el-input v-model="form.batchName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注">
            <el-input v-model="form.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 底部table -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="devstagesName" label="分期" width="180"></el-table-column>
      <el-table-column prop="areaName" label="区域/组团" width="180"></el-table-column>
      <el-table-column label="全选" width="80">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.checkAll" @change="handleCheckAll(scope.$index, scope.row.checkAll)">全选</el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="楼栋" class-name="canWrapCell">
        <template slot-scope="scope">
          <el-checkbox-group v-model="scope.row.checkedBuildList">
            <el-checkbox @change="handleCheckChange" v-for="item in scope.row.buildViewList" :label="item.build.id" :key="item.build.id">{{item.build.buildName}}</el-checkbox>
          </el-checkbox-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getPushPlateViewsDto } from "@/api/pages/mainPage/transactionManagement/pushplateManagement/index.js";

export default {
  props: {
    row: Object
  },
  data() {
    return {
      form: {
        // 顶部form表单字段
        projectCityId: "", // 城市公司名称
        projectId: "", // 项目名称
        batchName: "", // 推盘批次名称
        batchShortCode: "", //推盘短编号
        remark: "", // 备注
        bathBuildList: [] //房源列表
      },
      /*********table数据*******/
      tableData: [],
      arr: []
    };
  },
  methods: {
    handleCheckChange() {
      this.arr = [];
      this.tableData.map(item => {
        item.checkedBuildList.map(id => {
          this.arr.push({ buildId: id });
        });
        if( item.buildViewList.length === item.checkedBuildList.length ){
          this.$set(item, 'checkAll', true)
        }else{
          this.$set(item, 'checkAll', false)
        }
      });
    },
    handleCheckAll(index, checkFlag) {
      
      if( checkFlag ){
        this.tableData[index].checkedBuildList = []
        this.tableData[index].buildViewList.map(item=>{
          this.tableData[index].checkedBuildList.push(item.build.id)
        })
      }else{
        this.tableData[index].checkedBuildList = []
      }
      this.handleCheckChange()
    },
    handleGetPushPlateViewsDto() {
      let params = {
        pushBathId: this.row.id,
        projectId: this.form.projectId,
        devstagesId: this.form.devstagesId
      };
      getPushPlateViewsDto(params)
        .then(res => {
          if (res.status === 200) {
            
            this.tableData = res.data;
            this.tableData.map(item => {
              let bathBuildList = [];
              item.buildViewList.map(bv => {
                if (bv.batchBuild !== null)
                  bathBuildList.push(bv.batchBuild.buildId);
              });
              this.$set(item, "checkedBuildList", bathBuildList);
              if( item.buildViewList.length === item.checkedBuildList.length ){
                this.$set(item, 'checkAll', true)
              }
            });
          }
        })
        .then(_ => {
          this.handleCheckChange();
        });
    }
  },
  created() {
    this.form = this.row;
    this.handleGetPushPlateViewsDto();
  }
};
</script>

<style scoped>
</style>