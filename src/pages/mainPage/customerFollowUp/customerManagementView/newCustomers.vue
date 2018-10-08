<template>
  <div class="new-customers">
    <el-dialog title="客户复制" width="800px" @close="handleClose" :visible.sync="dialogVisible">
      <div>
        <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-row>
            <!-- 左侧 -->
            <el-col :span="12">
              <el-form-item label = '选择项目：' prop="project">
                <el-select clearable v-model="ruleForm.project" placeholder="请选择">
                  <el-option  v-for="(item) in ruleForm.projectOptions" :key="item.id" :label="item.projectName" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="姓名：" prop="userName">
                <el-input placeholder="请输入姓名" v-model.trim="ruleForm.userName" disabled></el-input>
              </el-form-item>
             <el-form-item label="首次接触方式：" prop="followUpMethod" :rules="rules.followUpMethod" style="width: 275px;">
              <el-select clearable v-model="ruleForm.followUpMethod" placeholder="请选择">
                <el-option  v-for="(item) in this.followList" :key="item.id" :label="item.itemValue" :value="item.itemValue"></el-option>                 
              </el-select>
            </el-form-item>
              <el-form-item label="跟进信息：" prop="followUpInformation">
                <el-input placeholder="请输入跟进信息" style="width:220px;" :autosize="{ minRows: 3, maxRows: 3}" type="textarea" v-model.trim="ruleForm.followUpInformation"></el-input>
              </el-form-item>
            </el-col>
            <!-- 右侧 -->
            <el-col :span="12">
              <el-form-item label="电话：" prop="phone" >
                <el-input placeholder="请输入手机号码" v-model.trim="ruleForm.phone" disabled></el-input>
              </el-form-item>
              <el-form-item label="性别：" prop="gender" style="width: 275px;">
                <el-radio-group v-model="ruleForm.gender" disabled>
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSave">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Cookies from "js-cookie"; //引入cookie

// 获取请求接口
import {
  /* dictionaryEntrySearchOptions,
    dictionaryEntryAddOrEdit, */
  getCustomerDetails, //获取页面详细信息
  followCustom, //跟进客户
  saveCustomerInformation,
  getProjectName,
  determineCustomer, //判客
  getKeyBehavior, //获取关键行为
  saveCopiedCustom // 客户复制
} from "@/api/pages/mainPage/customerFollowUp";

export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        id: "",//客户id
        projectId: "",// 选择 项目
        project: "",
        projectOptions: [],
        userName: "",// 姓名
        gender: "",// 性别
        followUpMethod: "",// 接触方式
        phone: "",// 电话
        followUpInformation: "",// 跟进信息
        /* -------------------------自定义 标签数据------------------------- */
        customerArr: []
      },
      followList: [], //跟进方式列表
      
      userId: "",//登录人id
      rules: {
        project: [{ required: true, message: "请选择项目", trigger: "change" }],
        phone: [
          {
            required: true,
            pattern: /^[1][0-9]{10}$/,
            message: "手机号码输入不正确",
            trigger: ["blur", "change"]
          }
        ],
        gender: [
          { required: true, message: "请选择性别", trigger: "change" }
        ],
        whetherToVisit: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        followUpMethod: [
          { required: true, message: "请选择接触方式", trigger: "change" }
        ],
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      }
    };
  },
  methods: {
    show() {
      this.dialogVisible = true;
      this.handlegetCustomerDetails();
    },
    //获取项目列表
    getTableList() {
      let that = this;
      let timeCover = setInterval(function() {
        that.userId = Cookies.set("session");
        if (that.userId) {
          //取到信息后关闭定时器
          clearInterval(timeCover);
          //请求项目信息
          let data = {
            userId: that.userId
          };
          getProjectName(data).then(res => {
            if (res.status === 200) {
              that.ruleForm.projectOptions = res.data;
            }
          });
        }
      }, 30);
    },
    handlegetCustomerDetails() {
      // 获取客户信息
      getCustomerDetails({ id: this.$route.query.id }).then(res => {
        if (res.status === 200) {
          this.ruleForm.userName = res.data.name;
          this.ruleForm.gender = res.data.sex;
          this.ruleForm.phone = res.data.tel;
          this.ruleForm.customId = res.data.id;
        }
      });
    },
    /* ---------------------------浮层相关----------------------------- */
    // 浮层关闭
    handleClose() {
      this.dialogVisible = false;
      this.$nextTick(() => {
        this.$refs.ruleForm.resetFields();
        this.$emit("closeChild");
      });
    },
    handleSave() {
      this.verifyRuleForm().then(_ => {
        //上传表单数据
        this.getinitTableList();
      });
    },
    getKeyBehaviorFn() {
      let obj = {
        typeCode: "FOLLOWMETHOD"
      };
      getKeyBehavior(obj).then(res => {
        if (res.status === 200) {
          this.followList = res.data;
        }
      });
    },

    // 校验表格
    verifyRuleForm() {
      return new Promise((resove, reject) => {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            resove();
          }
        });
      });
    },
    //提交表单数据
    getinitTableList() {
      let data = {
        followContent: this.ruleForm.followUpInformation,
        name: this.ruleForm.userName,
        projectId: this.ruleForm.project,
        sex: this.ruleForm.gender,
        tel: this.ruleForm.phone,
        firstTouchMethod: this.ruleForm.followUpMethod,
        id: this.ruleForm.customId
      };
      data = this.Qs.stringify(data);
      saveCopiedCustom(data).then(res => {
        if (res.status === 200) {
          this.$message.success("保存成功！");
          //关闭弹窗
          this.handleClose();
        } else {
          this.$message.error(res.message);
        }
      });
    }
  },
  created() {
    this.getTableList();
  },
  mounted() {
    this.getKeyBehaviorFn();
  },
};
</script>

<style lang="scss">
.new-customers {
  .el-input {
    width: 174px;
  }
  .btn-phone {
    vertical-align: middle;
    margin-top: -8px;
  }
}
.dialog-footer {
  .el-button:hover {
    span {
      color: white;
    }
  }
}
</style>