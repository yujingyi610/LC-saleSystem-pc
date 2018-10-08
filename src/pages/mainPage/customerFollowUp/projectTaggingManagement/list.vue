<template>
  <div class="background-m project-tagging-management-list">
    <div class="envelope-box">
      <div class="envelope-title search-box">
        <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">

          <el-form-item label="标签名称：" prop="searchLabelName">
            <el-input v-model="ruleForm.searchLabelName"></el-input>
          </el-form-item>

          <el-form-item label="城市公司">
					<el-select v-model="ruleForm.searchCityCompany" clearable>
						<el-option
            v-for="(item, index) in cityCompanyOption"
            :key="index"
            :label="item.name"
            :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="项目名称">
					<el-select v-model="ruleForm.searchProjectValue" clearable>
						<el-option v-for="(item, index) in projectNameOption" :key="index" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>

          <div class="fr">
            <el-button @click="handleSearch" type="primary">搜索</el-button>
          </div>

        </el-form>

      </div>
      <div class="envelope-title">
        <div class="mb-10 lh-28 of-hidden">
          <span class="color-title-green">项目标签管理</span>
          <div class="fr">
            <el-button v-has="'cst:label:project:select'" @click="handleSelection">从标签库中选取</el-button>
          </div>
        </div>
        <el-table v-if="tableData"
        :data="tableData"
        border
        style="width: 100%"
        >
          <el-table-column type="index" label="序号" width="80px"></el-table-column>
          <el-table-column prop="projectCityName" label="城市公司"></el-table-column>
          <el-table-column prop="projectName" label="项目名称"></el-table-column>
          <el-table-column prop="labelName" label="标签名称"></el-table-column>
          <el-table-column prop="labelType" label="标签类型"></el-table-column>
          <el-table-column prop="labelValueType" label="标签值类型"></el-table-column>
          <el-table-column  prop="isMustEnable" label="是否启用">
            <template  slot-scope="scope">
              <el-switch
                v-if="scope.row.isMustEnable ==='0'"
                @change="handleSwitch(scope.row)"
                v-model="scope.row.value2"
                active-color="#13ce66"
                inactive-color="#E5E5E5">
              </el-switch>
              <span v-else>
                  是
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="orderVal" label="排序"></el-table-column>
          <el-table-column prop="roleName" label="操作">
            <template slot-scope="scope">
              <el-button v-has="'cst:label:project:edit'" @click="handleEdit(scope.row)" type="text">编辑</el-button>
              <!-- <el-button v-has="'cst:label:project:del'" @click="handleDelete(scope.row)" type="text">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
        class="mt-10"
        v-if="total > 0"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :total="total"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
        <labelDialog @closeChild = 'initTableList' ref="labelDialog" ></labelDialog>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/styles/reset.scss";
// 获取请求接口
import {
  getProjectList, //获取项目标签分页列表
  deteleGroupLabel, //删除项目标签
  getProjectName, //查询项目
  getCitycompanies, //获取城市公司
  editLabel, //跟新项目标签
  editProjectLabelDetails //获取项目标签详情
} from "@/api/pages/mainPage/customerFollowUp/projectTaggingManagement";

import {
  getCityList,
  getPrjByCityId,
  getBathList,
  getHouseList,
  getHouseViewByBuildId
} from "@/api/pages/mainPage/transactionManagement/houseQuery";
import labelDialog from "./labelDialog.vue";

import Cookies from "js-cookie"; //引入cookie

export default {
  components: { labelDialog },
  data() {
    return {
      ruleForm: {
        // 标签名称
        searchLabelName: "",
        // 城市公司
        searchCityCompany: null,
        // 选择项目
        searchProjectValue: null
      },
      cityCompanyOption: [], // 选择城市公司下拉数据
      projectNameOption: [], // 选择项目名称下拉数据
      rules: {},

      // table list
      tableData: [],
      // 数据总数
      total: 0,
      // 当前页数
      currentPage: 1,
      // 每页数量
      pageSize: 10
    };
  },
  watch: {
    "ruleForm.searchCityCompany": function(e) {
      this.ruleForm.searchProjectValue = null;
      if (this.ruleForm.searchCityCompany) {
        if (e) {
          this.handleGetPrjByCityId({ id: e });
        }
      } else {
        this.projectNameOption = [];
      }
    }
  },
  mounted() {
    //this.initTableList()
  },
  created() {
    this.handleGetCityList();
  },
  methods: {
    // 更新表格 数据
    initTableList() {
      // this.tableData = null;
      let data = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        labelName: this.ruleForm.searchLabelName
          ? this.ruleForm.searchLabelName
          : null,
        projectCityId: this.ruleForm.searchCityCompany,
        projectId: this.ruleForm.searchProjectValue
      };
      console.log("data", data);
      getProjectList(data).then(res => {
        if (res.status === 200) {
          console.log("成功", res);

          this.function_1(res.data.list);
          this.total = res.data.total;
        }
      });
    },

    handleGetCityList() {
      // 获取城市公司
      this.cityCompanyOption = [];
      let userInfo = JSON.parse(sessionStorage.getItem("user-info"));
      if (userInfo.cityId) {
        this.cityCompanyOption.push({
          id: userInfo.cityId,
          name: userInfo.cityName,
          code: userInfo.cityCode
        });
        this.ruleForm.searchCityCompany = this.cityCompanyOption[0].id;
      } else {
        //获取城市公司列表
        getCityList().then(res => {
          if (res.status === 200) {
            this.cityCompanyOption = res.data;
            this.ruleForm.searchCityCompany = this.cityCompanyOption[0].id;
          }
        });
      }
    },
    handleGetPrjByCityId(params) {
      // 通过城市公司ID获取项目
      let userInfo = JSON.parse(sessionStorage.getItem("user-info"));
      if (userInfo.projects && userInfo.projects[0] && userInfo.cityId) {
        this.projectNameOption = userInfo.projects;
        this.projectNameOption.map(item => {
          item.name = item.projectName;
          item.id = item.id;
        });
        this.ruleForm.searchProjectValue = this.projectNameOption[0].id;
        this.initTableList();
      } else {
        getPrjByCityId(params).then(res => {
          if (res.status === 200) {
            this.projectNameOption = res.data;
            if(this.projectNameOption.length >0){
              this.ruleForm.searchProjectValue = this.projectNameOption[0].id;
              this.initTableList();
            }
          }
        });
      }
    },

    //赋值
    function_1(data) {
      for (let i = 0; i < data.length; i++) {
        console.log("类型", data[i].labelValueType);
        if (data[i].labelType === "radio") {
          data[i].labelType = "单选";
        } else if (data[i].labelType === "checkbox") {
          data[i].labelType = "多选";
        } else if (data[i].labelType === "text") {
          data[i].labelType = "文本";
        } else if (data[i].labelType === "number") {
          data[i].labelType = "数字";
        } else if (data[i].labelType === "date") {
          data[i].labelType = "日期";
        } else if (data[i].labelType === "radioOther") {
          data[i].labelType = "单选&其他";
        } else if (data[i].labelType === "dict") {
          data[i].labelType = "字典";
        }

        if (data[i].labelValueType === "readonly") {
          data[i].labelValueType = "项目不可编辑";
        } else if (data[i].labelValueType === "edit") {
          data[i].labelValueType = "项目可编辑";
        } else if (data[i].labelValueType === "secEdit") {
          data[i].labelValueType = "项目只可编辑二级";
        }

        if (data[i].isEnable === "1") {
          this.$set(data[i], "value2", true);
        } else {
          this.$set(data[i], "value2", false);
        }
      }
      this.tableData = data;
    },

    // 表格页数 初始化
    tableInitChange() {
      if (this.currentPage === 1) {
        this.initTableList();
      } else {
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
      console.log("搜索");
      this.tableInitChange();
    },
    // 编辑标签
    handleEdit(row) {
      console.log("编辑");
      this.$refs.labelDialog.show("edit2", row);
    },
    // 删除标签
    handleDelete(row) {
      console.log("删除");
      this.$confirm("确认删除该标签?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        console.log("确定", row);
        let data = {
          id: row.id
        };
        deteleGroupLabel(data).then(res => {
          if (res.status === 200) {
            console.log("成功1231231");
            this.initTableList();
          }
        });
      });
    },
    // 开关 change
    handleSwitch(row) {
      console.log("开关", row);

      editProjectLabelDetails({ id: row.id }).then(res => {
        if (res.status === 200) {
          console.log("获取的详情", res);
          let obj = res.data;
          if (row.value2 === true) {
            obj.isEnable = "1";
          } else {
            obj.isEnable = "0";
          }

          console.log("ddd", obj);
          editLabel(obj).then(res => {
            if (res.status === 200) {
              console.log("更新成功");
              this.initTableList();
            }
          });
        }
      });
    },
    // 点击 从标签库选取
    handleSelection() {
      let data = {
        projectId: this.ruleForm.searchProjectValue,
        projectCityId: this.ruleForm.searchCityCompany
      };
      this.$emit("checkPage", "selectPage", data);
      this.$emit("getMessage", "111");
    }
  }
};
</script>

<style lang="scss">
</style>
