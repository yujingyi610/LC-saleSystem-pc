<template>
    <div>
        <!-- 顶部form搜索 -->
        <el-form ref="form" :model="form">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="城市公司名称：">{{row.projectCityName}}</el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="项目名称">{{row.projectName}}</el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="分期名称">{{row.devstagesName}}</el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="推盘批次编号:">{{row.batchCode}}</el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="推盘批次名称:">{{row.batchName}}</el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="备注:">{{row.remark}}</el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!-- 底部table -->
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="devstagesName" label="分期" width="180"></el-table-column>
            <el-table-column prop="areaName" label="区域/组团" width="180"></el-table-column>
            <el-table-column label="楼栋" class-name="canWrapCell">
                <template slot-scope="scope">
                    <el-checkbox-group v-model="scope.row.checkedBuildList">
                        <el-checkbox v-for="item in scope.row.buildViewList" :label="item.build.id" :key="item.build.id" :disabled="'disabled'">{{item.build.buildName}}</el-checkbox>
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
      form: {},
      tableData: [],
      arr: []
    };
  },
  methods: {
    handleGetPushPlateViewsDto() {
      let params = {
        pushBathId: this.row.id,
        projectId: this.row.projectId,
        devstagesId: this.row.devstagesId
      };
      getPushPlateViewsDto(params).then(res => {
        if (res.status === 200) {
          this.tableData = res.data;
          this.tableData.map(item => {
            let bathBuildList = [];
            item.buildViewList.map(bv => {
              if (bv.batchBuild !== null)
                bathBuildList.push(bv.batchBuild.buildId);
            });
            this.$set(item, "checkedBuildList", bathBuildList);
          });
        }
      });
    }
  },
  created() {
    this.handleGetPushPlateViewsDto();
    console.log(this.row)
  }
};
</script>

<style scoped>
</style>