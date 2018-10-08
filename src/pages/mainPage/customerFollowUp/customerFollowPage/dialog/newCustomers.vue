<template>
  <div class="new-customers">
    <el-dialog
      title="新增客户"
      width="800px"
      @close="handleClose"
      :visible.sync="dialogVisible"
    >
      <div>
        <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          
          <el-row>
            <!-- 左侧 -->
            <el-col :span="12">

              <el-form-item 
                label = '选择项目：'
                prop="project"
              >
                <el-select clearable v-model="ruleForm.project" placeholder="请选择">
                  <el-option 
                    v-for="(item) in ruleForm.projectOptions"
                    :key="item.id"
                    :label="item.projectName" 
                    :value="item.id" 
                  >
                  </el-option>
                  
                </el-select>
              </el-form-item>

              <el-form-item label="姓名：" prop="userName">
                <el-input placeholder="请输入姓名" v-model.trim="ruleForm.userName"></el-input>
              </el-form-item>

             <el-form-item label="首次接触方式：" prop="followUpMethod" :rules="rules.followUpMethod" style="width: 275px;">
              <el-select clearable v-model="ruleForm.followUpMethod" placeholder="请选择">
                    <el-option 
                      v-for="(item) in this.followList"
                      :key="item.id"
                      :label="item.itemValue" 
                      :value="item.itemValue" 
                    >
                    </el-option>                 
              </el-select>
            </el-form-item>

              <el-form-item label="跟进信息：" prop="followUpInformation">
                <el-input placeholder="请输入跟进信息" style="width:220px;" :autosize="{ minRows: 3, maxRows: 3}" type="textarea" v-model.trim="ruleForm.followUpInformation"></el-input>
              </el-form-item>

            </el-col>
            <!-- 右侧 -->
            <el-col :span="12">

              <el-form-item label="电话：" prop="phone" >
                <el-input placeholder="请输入手机号码" v-model.trim="ruleForm.phone"></el-input>
              </el-form-item>

              <el-form-item label="性别：" prop="gender" style="width: 275px;">
                <el-radio-group v-model="ruleForm.gender">
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
        <el-button type="primary" @click="handleSubmit_1">保存并完善更多信息</el-button>
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
  followCustom, //跟进客户
  saveCustomerInformation,
  getProjectName,
  determineCustomer, //判客
  getKeyBehavior //获取关键行为
} from "@/api/pages/mainPage/customerFollowUp";

export default {
  data() {
    return {
      dialogVisible: false,

      ruleForm: {
        //客户id
        id: "",
        // 选择 项目
        projectId: "",
        project: "",
        projectOptions: [],
        // 姓名
        userName: "",
        // 性别
        gender: "",
        // 接触方式
        followUpMethod: "",
        // 电话
        phone: "",
        // 跟进信息
        followUpInformation: "",
        /* -------------------------自定义 标签数据------------------------- */
        customerArr: [],
        //弹窗信息c
        content: ""
      },
      followList: [], //跟进方式列表
      //登录人的姓名
      userId: "",
      //登录人的姓名
      userName: "",
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
          { required: true, message: "请选择性别", trigger: "change  " }
        ],
        whetherToVisit: [
          { required: true, message: "请选择", trigger: "change  " }
        ],
        followUpMethod: [
          { required: true, message: "请选择接触方式", trigger: "change  " }
        ],
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      }
    };
  },

  mounted() {
    this.getKeyBehaviorFn();
  },
  created() {
    this.getTableList();
  },
  methods: {
    //获取项目列表
    getTableList() {
      let that = this;
      
      let timeCover = setInterval(function() {
        that.userId = Cookies.set("session");
        that.userName = unescape(
          // document.cookie.split("userRealName=")[1].split(";")[0]
          Cookies.get("userRealName")
        );
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
    show() {
      this.dialogVisible = true;
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
      const h = this.$createElement;

      //判客处理
      this.verifyRuleForm().then(_ => {
        let data = {
          projectId: this.ruleForm.project,
          mobile: this.ruleForm.phone
        };
        determineCustomer(data).then(res => {
          //this.ruleForm.projectOptiones=res.data
           ;
          if (res.data.flag) {
            //判断客户的置业顾问
            if (res.data.propertyConsultName) {
              this.ruleForm.content = `归属置业顾问：${
                res.data.propertyConsultName
              }`;
            } else {
              this.ruleForm.content = "客户暂无置业顾问，是否立即跟进？";
            }

            this.$msgbox({
              title: "客户已存在",
              message: h("p", null, [
                h("span", null, `${this.ruleForm.content}`)
              ]),
              showCancelButton: true,
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              beforeClose: (action, instance, done) => {
                if (action === "confirm") {
                  instance.confirmButtonLoading = true;
                  instance.confirmButtonText = "执行中...";
                  setTimeout(() => {
                    done();
                    setTimeout(() => {
                      instance.confirmButtonLoading = false;
                    }, 300);
                  }, 300);
                } else {
                  done();
                }
              }
            }).then(action => {
              //用户无法添加
              if (res.data.flag === true) {
                if (res.data.propertyConsultName) {
                  //有置业顾问
                  if (this.userId === res.data.propertyConsultId) {
                    this.$router.push({
                      path: "/mainPage/customerFollowUp/customerManagementView",
                      query: {
                        id: res.data.customId,
                        projectId: this.ruleForm.project
                      }
                    });
                  } else {
                    this.$message({
                      type: "info",
                      message: "电话号码已存在，请重新添加"
                    });
                  }
                } else {
                  //无置业顾问
                  let id = res.data.customId;
                  let data = {
                    customId: res.data.customId,
                    propertyConsultId: this.userId,
                    propertyConsultName: this.userName
                  };
                  followCustom(data).then(res => {
                    if (res.status === 200) {
                      this.$router.push({
                        path:
                          "/mainPage/customerFollowUp/customerManagementView",
                        query: {
                          id: id,
                          projectId: this.ruleForm.project
                        }
                      });
                    }
                  });
                }
              }
            });
          } else {
            //
            this.verifyRuleForm().then(_ => {
              //上传表单数据
              this.getinitTableList();
              //关闭弹窗
              this.handleClose();
            });
            this.$message({
              message: "添加成功",
              type: "success"
            });
          }
        });
      });
    },

    handleSubmit() {
      this.verifyRuleForm()
        .then(() => {
          return this.handleSubmit_1();
        })
        .then(data => {
          this.handleClose();
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
    handleSubmit_1() {
      const h = this.$createElement;
      //判客处理
      this.verifyRuleForm().then(_ => {
        let data = {
          projectId: this.ruleForm.project,
          mobile: this.ruleForm.phone
        };
        determineCustomer(data).then(res => {
          //this.ruleForm.projectOptiones=res.data
          if (res.data.flag) {
            //判断客户的置业顾问
            if (res.data.propertyConsultName) {
              this.ruleForm.content = `归属置业顾问：${
                res.data.propertyConsultName
              }`;
            } else {
              this.ruleForm.content = "客户暂无置业顾问，是否立即跟进？";
            }

            this.$msgbox({
              title: "客户已存在",
              message: h("p", null, [
                h("span", null, `${this.ruleForm.content}`)
              ]),
              showCancelButton: true,
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              beforeClose: (action, instance, done) => {
                if (action === "confirm") {
                  instance.confirmButtonLoading = true;
                  instance.confirmButtonText = "执行中...";
                  setTimeout(() => {
                    done();
                    setTimeout(() => {
                      instance.confirmButtonLoading = false;
                    }, 300);
                  }, 1000);
                } else {
                  done();
                }
              }
            }).then(action => {
              //用户无法添加
              if (res.data.flag === true) {
                if (res.data.propertyConsultName) {
                  //有置业顾问
                  if (this.userId === res.data.propertyConsultId) {
                    this.$router.push({
                      path: "/mainPage/customerFollowUp/customerManagementView",
                      query: {
                        id: res.data.customId,
                        projectId: this.ruleForm.project
                      }
                    });
                  } else {
                    this.$message({
                      type: "info",
                      message: "电话号码已存在，请重新添加"
                    });
                  }
                } else {
                  //无置业顾问
                  let data = {
                    customId: res.data.customId,
                    propertyConsultId: this.userId,
                    propertyConsultName: this.userName
                  };
                  let id = res.data.customId;
                  followCustom(data).then(res => {
                    if (res.status === 200) {
                      this.$router.push({
                        path:
                          "/mainPage/customerFollowUp/customerManagementView",
                        query: {
                          id: id,
                          projectId: this.ruleForm.project
                        }
                      });
                    }
                  });
                }
              }
            });
          } else {
            this.verifyRuleForm().then(_ => {
              //上传表单数据
              //this.getinitTableList()
              //关闭弹窗
              //this.handleClose()
              //上传表单数据
              let data = {
                firstTouchMethod: this.ruleForm.followUpMethod,
                name: this.ruleForm.userName,
                projectId: this.ruleForm.project,
                sex: this.ruleForm.gender,
                tel: this.ruleForm.phone,
                followContent: this.ruleForm.followUpInformation
              };
              data = this.Qs.stringify(data);
              saveCustomerInformation(data).then(res => {
                if (res.status === 200) {
                  this.ruleForm.id = res.data.id;
                  this.$router.push({
                    path: "/mainPage/customerFollowUp/customerEdit",
                    query: {
                      id: this.ruleForm.id,
                      projectId: this.ruleForm.project
                    }
                  });
                }
              });
            });
            this.$message({
              type: "info",
              message: "客户已添加"
            });
          }
        });
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
    // 提交表格数据
    formSubmit() {
      return new Promise((resove, reject) => {
        setTimeout(() => {
          resove(this.ruleForm);
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
        firstTouchMethod: this.ruleForm.followUpMethod
      };
      data = this.Qs.stringify(data);
      saveCustomerInformation(data).then(res => {
        if (res.status === 200) {
          this.handleClose();
        }
      });
    }

    /* ---------------------------浮层相关----------------------------- */
  }
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