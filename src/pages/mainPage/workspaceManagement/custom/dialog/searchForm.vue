<template>
  <div class="m-search-form-box">
    <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">

      <div>


        <el-form-item 
            label = '选择项目：'
            prop="selectionProject"
        >
          <el-select clearable v-model="ruleForm.selectionProject" placeholder="请选择">
            <el-option 
              v-for="(item) in ruleForm.projectOptions"
              :key="item.id"
              :label="item.projectName" 
              :value="item.projectName" 
            >
            </el-option>
            
          </el-select>
        </el-form-item>

        <el-form-item label="姓名/电话：" prop="nameAndPhone">
          <el-input placeholder="请输入手机号或姓名" v-model="ruleForm.nameAndPhone"></el-input>
        </el-form-item>

        <div class="fr">
          <el-button @click="handleSearch" type="primary">搜索</el-button>
          <el-button @click="handleSearchReset">清空</el-button>
        </div>
      </div>

      <!-- 客户级别 -->
      <div>
        <el-form-item label="客户级别：" prop="customerLevel">
          <el-checkbox-group v-model="ruleForm.customerLevel">
            <el-checkbox label="1">A</el-checkbox>
            <el-checkbox label="2">B</el-checkbox>
            <el-checkbox label="3">C</el-checkbox>
            <el-checkbox label="4">D</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>

      <!-- 购房阶段 -->
      <div>
        <el-form-item label="购房阶段：" prop="purchaseStage">
          <el-radio-group v-model="ruleForm.purchaseStage">
            <el-radio label="1">问询</el-radio>
            <el-radio label="2">来访</el-radio>
            <el-radio label="3">认筹</el-radio>
            <el-radio label="4">认购</el-radio>
            <el-radio label="5">签约</el-radio>
            <el-radio label="6">款清</el-radio>
          </el-radio-group>
        </el-form-item>


      </div>
      <div>
                <el-form-item v-show="ruleForm.purchaseStage !== '' && ruleForm.purchaseStage !== '1' && ruleForm.purchaseStage !== '2'" label="房源：">
          <div class="housing-content">
            <el-input 
            @click.native.stop="handleHousingClick" :title="ruleForm.housingResourcesText"
            v-model="ruleForm.housingResourcesText" readonly class="cursor m-input">
              <i slot="suffix" class="el-input__icon el-icon-arrow-down"></i>
            </el-input>
            <div v-show="housingDialogVisible" class="housing-dialog">
              <div class="housing-dialog-title">
                <el-input
                  v-model.trim="ruleForm.housingSearch"
                  placeholder="请选择关键字"
                >
                  <i slot="suffix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </div>
              <div class="housing-dialog-tree">
                <el-tree
                  :data="ruleForm.housingTree"
                  show-checkbox
                  node-key="id"
                  ref="tree"
                  :filter-node-method="filterNode"
                >
                </el-tree>
              </div>
              <div class="housing-dialog-footer">
                <el-button @click="handleHousingClose">取消</el-button>
                <el-button @click="handleHousingOk" type="primary" class="mr-20">确定</el-button>
              </div>
            </div>
          </div>
        </el-form-item>


      </div>

      <!-- 来访时间 -->
      <div>
        <el-form-item label="来访时间：" prop="visitTime">
          <el-radio-group v-model="ruleForm.visitTime">
            <el-radio label="1">今日</el-radio>
            <el-radio label="2">3天内</el-radio>
            <el-radio label="3">15天内</el-radio>
            <el-radio label="4">30天内</el-radio>
            <el-radio label="5">自定义</el-radio>
          </el-radio-group>
        </el-form-item>

        <template v-if="ruleForm.visitTime === '5'">
          <el-form-item label=" " prop="visitTimeStart">
            <el-date-picker
              style="width:124px;margin-left: -100px;"
              v-model="ruleForm.visitTimeStart"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <span class="ml-5">-</span>
          </el-form-item>
          <el-form-item label="" prop="visitTimeEnd">
            <el-date-picker
              style="width:124px;"
              v-model="ruleForm.visitTimeEnd"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </template>

      </div>

      <el-collapse-transition>
        <!-- 收缩框 -->
        <div v-show="isOpen">

          <!-- 创建时间 -->
          <div>
            <el-form-item label="创建时间：" prop="creationTime">
              <el-radio-group v-model="ruleForm.creationTime">
                <el-radio label="1">今日</el-radio>
                <el-radio label="2">3天内</el-radio>
                <el-radio label="3">15天内</el-radio>
                <el-radio label="4">30天内</el-radio>
                <el-radio label="5">自定义</el-radio>
              </el-radio-group>
            </el-form-item>

            <template v-if="ruleForm.creationTime === '5'">
              <el-form-item label=" " prop="creationTimeStart">
                <el-date-picker
                  style="width:124px;margin-left: -100px;"
                  v-model="ruleForm.creationTimeStart"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
                <span class="ml-5">-</span>
              </el-form-item>
              <el-form-item label="" prop="creationTimeEnd">
                <el-date-picker
                  style="width:124px;"
                  v-model="ruleForm.creationTimeEnd"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </template>
          </div>

          <!-- 跟进时间 -->
          <div>
            <el-form-item label="跟进时间：" prop="followUpTime">
              <el-radio-group v-model="ruleForm.followUpTime">
                 <el-radio label="1">今日</el-radio>
                <el-radio label="2">3天内</el-radio>
                <el-radio label="3">15天内</el-radio>
                <el-radio label="4">30天内</el-radio>
                <el-radio label="5">自定义</el-radio>
              </el-radio-group>
            </el-form-item>

            <template v-if="ruleForm.followUpTime === '5'">
              <el-form-item label=" " prop="followUpTimeStart">
                <el-date-picker
                  style="width:124px;margin-left: -100px;"
                  v-model="ruleForm.followUpTimeStart"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
                <span class="ml-5">-</span>
              </el-form-item>
              <el-form-item label="" prop="followUpTimeEnd">
                <el-date-picker
                  style="width:124px;"
                  v-model="ruleForm.followUpTimeEnd"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </template>
          </div>

          <!-- 未跟进情况 -->
          <div>
            <el-form-item label="未跟进情况：" prop="failureToFollowUp">
              <el-radio-group v-model="ruleForm.failureToFollowUp">
                <el-radio label="1">3天未跟进</el-radio>
                <el-radio label="2">7天未跟进</el-radio>
                <el-radio label="3">15天未跟进</el-radio>
                <el-radio label="4">30天未跟进</el-radio>
                <el-radio label="5">自定义</el-radio>
              </el-radio-group>
            </el-form-item>

            <template v-if="ruleForm.failureToFollowUp === '5'">
              <el-form-item label=" " prop="failureToFollowUpStart">
                <el-date-picker
                  style="width:124px;margin-left: -100px;"
                  v-model="ruleForm.failureToFollowUpStart"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
                <span class="ml-5">-</span>
              </el-form-item>
              <el-form-item label="" prop="failureToFollowUpEnd">
                <el-date-picker
                  style="width:124px;"
                  v-model="ruleForm.failureToFollowUpEnd"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </template>
          </div>

          <!-- 即将生日 -->
          <div>
            <el-form-item label="即将生日：" prop="forthcomingBirthday">
              <el-radio-group v-model="ruleForm.forthcomingBirthday">
                <el-radio label="1">今天</el-radio>
                <el-radio label="2">3天内</el-radio>
                <el-radio label="3">15天内</el-radio>
                <el-radio label="4">30天内</el-radio>
                <el-radio label="5">自定义</el-radio>
              </el-radio-group>
            </el-form-item>

            <template v-if="ruleForm.forthcomingBirthday === '5'">
              <el-form-item label=" " prop="forthcomingBirthdayStart">
                <el-date-picker
                  style="width:124px;margin-left: -100px;"
                  v-model="ruleForm.forthcomingBirthdayStart"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
                <span class="ml-5">-</span>
              </el-form-item>
              <el-form-item label="" prop="forthcomingBirthdayEnd">
                <el-date-picker
                  style="width:124px;"
                  v-model="ruleForm.forthcomingBirthdayEnd"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </template>
          </div>

          <!-- 业态 -->
          <div>
            <el-form-item label="业态：" prop="typeOfOperation">
              <el-checkbox-group v-model="ruleForm.typeOfOperation">
                <el-checkbox label="apartment">公寓</el-checkbox>
                <el-checkbox label="villa">别墅</el-checkbox>
                 <el-checkbox label="offices">写字楼</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>

          <!-- 需求面积 -->
          <div>
            <el-form-item label="需求面积：" prop="demandArea">
              <el-checkbox-group v-model="ruleForm.demandArea">
                <el-checkbox label="1">90以下</el-checkbox>
                <el-checkbox label="2">90-200</el-checkbox>
                <el-checkbox label="3">200以上</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>

          <!-- 居室数量 -->
          <div>
            <el-form-item label="居室数量：" prop="numberOfLivingRooms">
              <el-checkbox-group v-model="ruleForm.numberOfLivingRooms">
                <el-checkbox label="1">一居室</el-checkbox>
                <el-checkbox label="2">二居室</el-checkbox>
                <el-checkbox label="3">三居室</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>

          <!-- 朝向 -->
          <div>
            <el-form-item label="朝向：" prop="orientation">
              <el-checkbox-group v-model="ruleForm.orientation">
                <el-checkbox label="1">东</el-checkbox>
                <el-checkbox label="2">南</el-checkbox>
                <el-checkbox label="2">西</el-checkbox>
                <el-checkbox label="2">北</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>

          <!-- 商机形态 -->
          <div>
            <el-form-item label="商机形态：" prop="businessOpportunityState">
              <el-radio-group v-model="ruleForm.businessOpportunityState">
                <el-radio label="1">全部</el-radio>
                <el-radio label="2">正在跟进</el-radio>
                <el-radio label="3">已关闭</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>

          <!-- 置业顾问 -->
          <div>
            <el-form-item label="置业顾问：" prop="propertyConsultant">
              <el-select clearable v-model="ruleForm.propertyConsultant" placeholder="请选择" class="w-150">
                <el-option label="顾问1" value="1" ></el-option>
                <el-option label="顾问2" value="2" ></el-option>
              </el-select>
            </el-form-item>
          </div>

          <!-- 是否公客 -->
          <div>
            <el-form-item label="是否公客：" prop="isMaleGuests">
              <el-radio-group v-model="ruleForm.isMaleGuests">
                <el-radio label="1">全部</el-radio>
                <el-radio label="2">是</el-radio>
                <el-radio label="3">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
      </el-collapse-transition>

      <!-- 展开收起 -->
      <div class="text-center">
        <span @click="handleOpen" class="cursor color-green">
          <span>{{isOpen === false ? '展开' : '收起'}}</span>
          <i v-if="isOpen === false " class="el-icon-arrow-down"></i>
          <i v-else class="el-icon-arrow-up"></i>
        </span>
      </div>

    </el-form>
  </div>
</template>

<script>
  import {
    getProjectName
  } from '@/api/pages/mainPage/customerFollowUp'

  export default {
    props : ['value','jurisdiction'], // 获取 value 以及 权限
    watch : {
      ['ruleForm.housingSearch'](val) {
        this.$refs.tree.filter(val);
      },
    },
    data() {
      return {
        ruleForm : {
          
          // 选择项目
          selectionProject : '',
          projectOptions : [],
          //项目id
          projectId:'',
          // 姓名/电话
          nameAndPhone : '',
          // 客户级别
          customerLevel : [],
          // 购房阶段
          purchaseStage : '',
          // 房源 回显文案
          housingResourcesText : '',
          // 房源搜素框
          housingSearch : '',
          // 房源树
          housingTree : [
            {label : '一级' , id : 1 , children : [
              {label : '二级-1' , id : 2},
              {label : '二级-2' , id : 3},
              {label : '二级-3' , id : 4},
            ]}
          ],
          // 房源树 数据
          housingResourcesVal : [],
          // 来访时间
          visitTime : '',
          // 来访时间 开始
          visitTimeStart : '',
          // 来发时间 结束
          visitTimeEnd : '',
          // 创建时间
          creationTime : '',
          // 创建时间 开始
          creationTimeStart : '',
          // 创建时间 结束
          creationTimeEnd : '',
          // 跟进时间
          followUpTime : '',
          // 跟进时间 开始
          followUpTimeStart : '',
          // 跟进时间 结束
          followUpTimeEnd : '',
          // 未跟进情况
          failureToFollowUp : '',
          // 未跟进情况 开始
          failureToFollowUpStart : '',
          // 未跟进情况 结束
          failureToFollowUpEnd : '',
          // 即将生日
          forthcomingBirthday : '',
          // 即将生日 开始
          forthcomingBirthdayStart : '',
          // 即将生日 结束
          forthcomingBirthdayEnd : '',
          // 业态
          typeOfOperation : [],
          // 需求面积
          demandArea : [],
          // 居室数量
          numberOfLivingRooms : [],
          // 朝向
          orientation : [],
          // 商机状态
          businessOpportunityState : '',
          // 置业顾问
          propertyConsultant : '',
          // 是否公客
          isMaleGuests : '',
        },
        rules : {},

        /* 是否 展开 */
        isOpen : false,
        // 房源树 
        housingDialogVisible : false,
      }
    },
    mounted() {
      document.querySelector('.housing-dialog-footer').addEventListener('click',() => {
        if(this.$refs.tree){
          this.handleHousingClose();
        }
      });
      this.getTableList()

    },
    methods : {
      /* -------------------搜索查询--------------------------- */
      // 点击搜索
      handleSearch() {
        this.$emit('handleSearch',this.ruleForm);
      },
      // 点击清空
      handleSearchReset() {
        this.$refs.ruleForm.resetFields();
        // 清空 房源数据
        this.ruleForm.housingResourcesVal = [];
        this.ruleForm.housingResourcesText = '';
      },
      /* -------------------搜索查询--------------------------- */

      /* -------------------房源 dialog 相关--------------------------- */
      handleHousingClick() {
        this.housingDialogVisible = true;
      },
      // 过滤树
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      // 点击确定
      handleHousingOk() {
        let data = this.$refs.tree.getCheckedNodes();
        this.ruleForm.housingResourcesVal = data;
        this.ruleForm.housingResourcesText = data.map((v) => v.label).join(',');
         return;
        
        // 保存数据后 关闭dialog
        this.handleHousingClose();
      },
      // 点击取消
      handleHousingClose() {
        this.housingDialogVisible = false;
        this.$refs.tree.setCheckedNodes(this.ruleForm.housingResourcesVal);
      },
      /* -------------------房源 dialog 相关--------------------------- */

      // 点击 展开
      handleOpen() {
        this.isOpen = !this.isOpen;
      },
      //获取项目
      getTableList(){
        let data={
          userId:"ceed74302d0211e8af88005056b44833",
          }          
            getProjectName(data).then((res) => {
                if(res.status === 200){
                  console.log('项目',res.data)
                    this.ruleForm.projectOptions=res.data                     
                }
              });
            
        },
    },
  }
</script>

<style lang="scss">

.m-search-form-box{
  .cursor input{
    cursor: pointer;
  }
  .m-input input{
    overflow: hidden;  /*溢出隐藏*/
    text-overflow: ellipsis; /*以省略号...显示*/
    white-space: nowrap;  /*强制不换行*/
  }
  /* 房源浮层 样式 */
  .housing-content{
    position: relative;
    .housing-dialog{
      position: absolute;
      width: 200px;
      border: 1px solid #E5E5E5;
      background-color: #fff;
      z-index: 10;
      border-radius: 4px;
      top: 28px;
      .housing-dialog-title{
        padding: 7px 14px;
        border-bottom: 1px solid #E5E5E5;
      }
      .housing-dialog-tree{
        padding: 10px 0;
      }
      .housing-dialog-footer{
        padding: 10px 0;
        text-align: right;
        border-top: 1px solid #E5E5E5;
      }
    }
  }
}

</style>