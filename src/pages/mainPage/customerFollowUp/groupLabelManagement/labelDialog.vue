<template>
  <div class="customerFollowUp-label-dialog">
    <el-dialog
      :title="title"
      width="700px"
      @close="handleClose"
      :visible.sync="dialogVisible"
    >
      <div>
        <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">

          <el-row>
            <!-- 左侧 -->
            <el-col :span="12">

              <el-form-item label="标签名称:" prop="labelName">
                <el-input
                  :disabled="allDisabled.aggregate"
                  :maxlength=6
                  v-model.trim="ruleForm.labelName"
                >
                </el-input>
              </el-form-item>

              <el-form-item
                label="是否必须启用:" prop="isEnable" style="width: 275px;">
                <el-radio-group
                  :disabled="allDisabled.aggregate"
                  v-model="ruleForm.isEnable"
                  style="width: 170px;"
                >
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="标签类型:" prop="labelType">
                <el-select
                  :disabled="allDisabled.aggregate"
                  @change="handleLabelType"
                  v-model="ruleForm.labelType"
                  placeholder="请选择"
                >
                  <el-option label="单选" value="radio" ></el-option>
                  <el-option label="多选" value="checkbox" ></el-option>
                  <el-option label="文本" value="text" ></el-option>
                  <el-option label="数字" value="number" ></el-option>
                  <el-option label="日期" value="date" ></el-option>
                  <!--<el-option label="单选加补充说明" value="radioOther" ></el-option>-->

                </el-select>
              </el-form-item>

              <el-form-item
                v-show="ruleForm.labelType === 'radio' ||
                  ruleForm.labelType === 'checkbox' ||
                  ruleForm.labelType === 'radioOther'"
                label="标签值类型:"
                prop="labelValueType"
                
              >
                <el-select
                  :disabled="allDisabled.disabledValue"
                  v-model="ruleForm.labelValueType"
                  placeholder="请选择"
                  
                >
                  <el-option label="项目可编辑全部" value="edit" ></el-option>
                  <el-option label="项目只可编辑二级" value="secEdit" ></el-option>
                  <el-option label="项目不可编辑" value="readonly" ></el-option>
                </el-select>
              </el-form-item>

            </el-col>
            <!-- 右侧 -->
            <el-col :span="12">

              <el-form-item
              label="排序:"
              prop="sort"
              :rules="[
                    { type: 'number', message: '排序不能为空且只能为数字'},
                  ]"
              >
                <el-input :disabled="allDisabled.sortYes" v-model.number="ruleForm.sort" auto-complete="off"></el-input>
              </el-form-item>

              <el-form-item label="是否必填:" prop="isRequired">
                <el-radio-group :disabled="allDisabled.sortYes" v-model="ruleForm.isRequired">
                  <el-radio label="是">是</el-radio>
                  <el-radio label="否">否</el-radio>
                </el-radio-group>
              </el-form-item>


              <el-form-item
                v-if="ruleForm.isRequired === '是'"
                label=" "
                prop="isRequiredValue"
              >
                <el-select :disabled="allDisabled.aggregate" v-model="ruleForm.isRequiredValue" placeholder="请选择">
                  <el-option label="A级必填" value="A" ></el-option>
                  <el-option label="B级必填" value="B" ></el-option>
                  <el-option label="C级必填" value="C" ></el-option>
                  <el-option label="D级必填" value="D" ></el-option>
                </el-select>
              </el-form-item>

               <el-form-item
                v-if="ruleForm.labelType === 'radio'||
                ruleForm.labelType === 'checkbox'"
                label="数据字典项"
                prop="dataDictionaryItem"
              >
                <el-select @change="getDataTree" clearable v-model="ruleForm.dataDictionaryItem" placeholder="请选择">
                  <el-option
                    v-for="item in ruleForm.divtionaryList"
                    :key="item.id"
                    :label="item.typeName"
                    :value="item.typeCode"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                v-if="ruleForm.labelType === 'radio' ||                
                ruleForm.labelType === 'radioOther'"
                label="标签值层级:"
                prop="labelValueHierarchy"
              >
                <el-radio-group
                  :disabled="allDisabled.disabledValue"
                  @change="handleLabelHierarchy"
                  v-model="ruleForm.labelValueHierarchy"
                >
                  <el-radio label="1">一级</el-radio>
                  <el-radio label="2">两级</el-radio>
                </el-radio-group>
              </el-form-item>

            </el-col>
            <!-- 标签值 框 -->
            <div
              v-show="ruleForm.labelType === 'radio' ||
                ruleForm.labelType === 'checkbox' ||
                ruleForm.labelType === 'radioOther'"
              class="label-value-box"
            >
              <template v-for="(item , index) in ruleForm.labelValue">

                <!-- 一级标签 -->
                <el-form-item :key="item.id" :label=" index === 0 ? '标签值:' : ' ' "
                  :rules= rules.labelLevel
                  :prop="'labelValue['+index+'].wwww'"
                >

                  <el-input
                    :disabled="allDisabled.firstLevel"
                    placeholder="一级标签值"
                    style="width:174px;"
                    v-model.trim="item.wwww"
                  >
                  </el-input>
                  <template v-if="ruleForm.labelValue.length === 1">
                    <!-- +加 -->
                    <i
                      :class="{isDisabled : allDisabled.firstLevel}"
                      @click="handleInputAdd"
                      class="el-icon-circle-plus-outline cursor ft-18 mr-10"
                    >
                    </i>
                  </template>
                  <template v-else>
                    <!-- +加 -->
                    <i
                      :class="{isDisabled : allDisabled.firstLevel}"
                      @click="handleInputAdd"
                      v-if="index === ruleForm.labelValue.length - 1"
                      class="el-icon-circle-plus-outline cursor ft-18 mr-10"
                    >
                    </i>
                    <!-- -减 -->
                    <i
                      :class="{isDisabled : allDisabled.firstLevel}"
                      @click="handleInputDelete(index)"
                      class="el-icon-remove-outline cursor ft-18"
                    >
                    </i>
                  </template>
                  <!-- 新增子标签值 -->
                  <el-button
                    :class="{isDisabled : allDisabled.twoLevel}"
                    v-if="ruleForm.labelValueHierarchy === '2'&&ruleForm.labelValue[index].children.length<=0"
                    @click="handleInputTwoAdd(index)"
                    class="add-children-label"
                    type="text"
                  >
                    新增二级标签值
                  </el-button>

                </el-form-item>
                <!-- 二级标签 -->
                <template v-for="(itemTwo , indexTwo) in item.children">
                  <el-form-item :key="itemTwo.id" label=" "
                    :rules="rules.labelValue"
                    :prop="`labelValue[${index}].children[${indexTwo}].tttt`"
                  >
                    <el-input
                      :disabled="allDisabled.twoLevel"
                      placeholder="二级标签值"
                      style="width:100px;"
                      v-model.trim="itemTwo.tttt"
                    >
                    </el-input>
                    <template
                      v-if="ruleForm.labelValue[index].children.length === 1"
                    >
                      <!-- -减 -->
                      <i
                        :class="{isDisabled : allDisabled.twoLevel}"
                        @click="handleInputTwoDelete(index,indexTwo)"
                        class="el-icon-remove-outline cursor ft-18"
                      >
                      </i>
                      <el-button
                        :class="{isDisabled : allDisabled.twoLevel}"
                        v-if="indexTwo ===ruleForm.labelValue[index].children.length-1"
                        @click="handleInputTwoAdd(index)"
                        class="add-children-label"
                        type="text"
                      >
                        新增二级标签值
                      </el-button>
                    </template>
                    <template v-else>
                      <!-- -减 -->
                      <i
                        :class="{isDisabled : allDisabled.twoLevel}"
                        @click="handleInputTwoDelete(index,indexTwo)"
                        class="el-icon-remove-outline cursor ft-18"
                      >
                      </i>
                      <el-button
                        :class="{isDisabled : allDisabled.twoLevel}"
                        v-if="indexTwo ===ruleForm.labelValue[index].children.length-1"
                        @click="handleInputTwoAdd(index)"
                        class="add-children-label"
                        type="text"
                      >
                        新增二级标签值
                      </el-button>
                      
                    </template>
                  </el-form-item>
                </template>

              </template>
            </div>
          </el-row>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

  import {
    getLabel,//上传集团标签信息
    getDictionary,//获取数据字典类型
    getDictionaryEntry,//根据数据类型获取字典条目
  } from '@/api/pages/mainPage/customerFollowUp/customerManagementView'

   import {
    editProjectLabelDetails,//获取项目标签详情
    editLabel//保存项目标签
  } from '@/api/pages/mainPage/customerFollowUp/projectTaggingManagement'

  export default {
    data() {
      return {
        dialogVisible : false,
        dialogType : '',
        title : '',
        ruleForm : {
          //标签id
          id:'',
          // 标签名称
          labelName : '',
          // 排序
          sort : '',
          // 是否必须启用
          isEnable : '',
          // 数据字典项
          dataDictionaryItem : '',
          //数据字典类型
          divtionaryList:[],
          // 是否必填
          isRequired : '',
          // 是否必填 a b c d 值
          isRequiredValue : '',
          // 标签类型
          labelType : '',
          //单选与多选的校验
          ajaxD:true,
          // 标签值层级
          labelValueHierarchy : '', // biaoqianerji
          // 标签值类型
          labelValueType : '',
          // 标签值
          labelValue : [
            {wwww : '' , children : []}
          ],
          //项目城市公司
          projectCityName:'',
          //项目id
          projectId:'',
          //项目名称
          projectName:'',
        },
        rules : {
          labelName : [
            { required: true, message: '请输入标签名称' , trigger : 'blur'},
          ],
            labelType: [
            { required: true, message: '请输入标签值类型' , trigger : 'blur'},
          ],
          labelLevel:[{ required: true , message: '请输入一级标签值' , trigger : 'blur'},],
          labelValue:[{ required: true , message: '请输入二级标签值' , trigger : 'blur'}],
          isEnable: [
            { required: true, message: "请选择是否必须启用", trigger: "blur" }
          ],
          isRequired: [
            { required: true, message: "请选择是否必填", trigger: "blur" }
          ],
          isRequiredValue: [
            { required: true, message: "请选择哪个等级必填", trigger: "change" }
          ]
        },

        // 各个标签 禁用状态集合
        allDisabled : {
          // 控制 标签名称、是否必须启用、标签类型、标签值层级 禁用状态
          aggregate : false,
          // 控制 一级标签值 禁用状态
          firstLevel : false,
          // 控制 二级标签值 禁用状态
          twoLevel : false,
          // 控制标签值类型 和 标签值层级
          disabledValue : false,
          //控制排序和是否必填
          sortYes:false
        },
      }
    },
    methods: {
      show(type,row,labelType) {
        this.dialogType = type;
        if(type === 'add'){
          this.title = '新增标签';
        // 编辑 可能是 集团编辑 ， 项目编辑
        }else{
          this.title = '编辑标签';
          // 回显数据
          this.row = row;
          console.log('数值',this.row)
          console.log('ididi',this.row.id)

          // 根据状态 增加禁用状态
          console.log('禁用状态',labelType)
          this.setDisabled(row.labelValueType);
          //赋值数据
          this.getDisable(this.row.id)

        }
        this.dialogVisible = true;
      },
      //获取数据
      getDisable(id){
        console.log('11111',id)
        let data={
            id:id
        }
        editProjectLabelDetails(data).then((res) => {
              if(res.status === 200){
                console.log('请求成功LA',res.data)
                //判断标签类型
                this.ruleForm.id = res.data.id
                //标签名称
                this.ruleForm.labelName = res.data.labelName
                //排序
                this.ruleForm.sort = res.data.orderVal
                //是否必须选用
                this.ruleForm.isEnable = res.data.isMustEnable
                //数据字典项
                //this.ruleForm.dataDictionaryItem = res.data
                //项目城市公司
                this.ruleForm.projectCityName = res.data.projectCityName
                //项目id
                this.ruleForm.projectId = res.data.projectId
                //项目名称
                this.ruleForm.projectName = res.data.projectName
                //是否必填ABCD值
                this.ruleForm.isRequiredValue = res.data.requiredLevel
                //标签类型
                this.ruleForm.labelType = res.data.labelType
                //标签层级
                this.ruleForm.labelValueHierarchy = res.data.labelLevel.toString()
                console.log('标签层级',res.data.labelLevel)
                console.log('标签层级1',res.data.labelLevel ==='1')
                console.log('标签层级2',res.data.labelLevel==='2')

                //标签值类型
                this.ruleForm.labelValueType = res.data.labelValueType
                //标签值类型过度数组
                this.ruleForm.labelValueArr = res.data.labelDictList
                //标签类型
                if(res.data.labelDictList ){
                let dataValue = res.data.labelDictList
                let labelDictListArr = []
                for(let i=0;i<dataValue.length;i++){
                    let childrenArr = []
                    labelDictListArr.push({
                        wwww:dataValue[i].dictName,
                        id:dataValue[i].id,
                        children:childrenArr
                    })
                    if(dataValue[i].secLabelDictList){
                        for(let j=0;j<dataValue[i].secLabelDictList.length;j++){
                            childrenArr.push({
                                tttt:dataValue[i].secLabelDictList[j].dictName,
                                id:dataValue[i].secLabelDictList[j].id
                            })
                        }
                    }
                }
                this.ruleForm.labelValue = labelDictListArr
                console.log(this.ruleForm.labelValue)
                }

              }
        });

        },

      setDisabled(labelType) {
        let type = labelType;
        // 注 所有状态 排序 和 是否必填都可以编辑

        // 集团标签禁用状态 分为三种
        // 1 全部都可以编辑
        // 2 全部不可编辑
        // 3 只可编辑 标签值类型  和 标签值层级 和 标签值

        // 注 项目标签禁用状态 是根据 集团标签管理新建时的 标签值类型 定义的
        // 项目标签禁用状态 分为三种 （标签项目只可编辑 标签值）
        // 4 标签不可编辑
        // 5 标签都可编辑
        // 6 标签只可编辑二级

        // this.allDisabled.aggregate = true; 控制 标签名称、是否必须启用、标签类型、标签值层级 禁用状态
        // this.allDisabled.firstLevel = true; 控制 一级标签值 禁用状态
        // this.allDisabled.twoLevel = true; 控制 二级标签值 禁用状态
        // this.allDisabled.disabledValue = true; 控制标签值类型 和 标签值层级

      if(type ==='项目不可编辑'){
            this.allDisabled.aggregate = true;
            this.allDisabled.firstLevel = true;
            this.allDisabled.twoLevel = true;
            this.allDisabled.disabledValue = true;
            this.allDisabled.sortYes = true
        }else if(type ==='项目只可编辑二级'){
            this.allDisabled.aggregate = true;
        }else if(type ==='项目可编辑'){

        }
      },

      /* ------------------------change事件 相关----------------------------- */
      // 标签类型 change
      handleLabelType(val) {

        console.log('leibie',val)
         if(val === 'radio' || val ==='checkbox'){
           getDictionary().then((res)=>{
             if(res.status === 200){
               console.log('成功',res)
               this.ruleForm.divtionaryList = res.data
               console.log('字典',this.ruleForm.divtionaryList)
             }
           })
        }

         // 重置标签值
        this.clearLabel();
        // 重置 标签层级
        this.ruleForm.labelValueHierarchy = '1';
        //对单选或多选是否校验
        if(this.ruleForm.labelType != 'radio' && this.ruleForm.labelType !='checkbox'){
          this.rules.labelLevel = [{ required: false , message: '请输入二级标签值' , trigger : 'blur'},]
        }
        //getDictionary

      },

      //数据字典
      getDataTree(val){
          console.log('变化',val)
          this.ruleForm.labelValueType = 'readonly'
          // let data = {
          //   typeCode:val
          // }
          // data = this.Qs.stringify(data)
          // getDictionaryEntry(data).then((res)=>{
          //   if(res.status === 200){
          //     console.log('成功1231',res)
          //     this.ruleForm.labelValue = []
          //     for(let i=0;i<res.data.length;i++){
          //       this.ruleForm.labelValue.push({
          //         wwww:res.data[i].itemValue,
          //         children:[]
          //       })
          //     }
          //     console.log('列表',this.ruleForm.labelValue)
          //   }
          // })

          this.rules.labelLevel=[{ required: false , message: '请输入一级标签值' , trigger : 'blur'},]
          this.rules.labelValue=[{ required: false , message: '请输入二级标签值' , trigger : 'blur'}]
          this.allDisabled.firstLevel = true;// 控制 一级标签值 禁用状态
          this.allDisabled.twoLevel = true; //控制 二级标签值 禁用状态
          this.allDisabled.disabledValue = true; //控制标签值类型 和 标签值层级

          if(val ===''){
            this.ruleForm.labelValueType = ''
            this.ruleForm.labelType = ''
            this.allDisabled.firstLevel = false;// 控制 一级标签值 禁用状态
            this.allDisabled.twoLevel = false; //控制 二级标签值 禁用状态
            this.allDisabled.disabledValue = false; //控制标签值类型 和 标签值层级

          }

      },
      // 标签层级 change
      handleLabelHierarchy(val) {
        this.clearLabel();
      },
      /* ------------------------change事件 相关----------------------------- */

      /* --------------------标签值----------------------- */
      // 清空 标签 方法
      clearLabel() {
        this.ruleForm.labelValue = [
          {wwww : '', id : + new Date() , oneSwitch : '' ,children : []}
        ];
      },
      // 标签值 新增
      handleInputAdd() {
        let obj = {
          wwww : '',
          children : [],
        }
        this.ruleForm.labelValue.push(obj);
      },
      // 标签值 删除
      handleInputDelete(index) {
        this.ruleForm.labelValue.splice(index,1);
      },
      // 标签值 二级新增
      handleInputTwoAdd(oneindex) {
        this.ruleForm.labelValue[oneindex].children.push({tttt : ''});
      },
      // 标签值 二级删除
      handleInputTwoDelete(oneindex,twoindex) {
        this.ruleForm.labelValue[oneindex].children.splice(twoindex,1);
      },
      /* --------------------标签值----------------------- */

      /* ---------------------浮层相关------------------------------ */
      // 浮层关闭 callback
      handleClose() {
        this.dialogVisible = false;
        this.ruleForm.labelValue = [{wwww : '',children : []}];
        this.$nextTick(() => {
          this.$refs.ruleForm.resetFields();
        });
        // 清空禁用状态
        this.allDisabled.aggregate = false;
        this.allDisabled.firstLevel = false;
        this.allDisabled.twoLevel = false;
        this.allDisabled.disabledValue = false;

        //更新index的数据
        this.$emit('closeChild')
        this.$emit('close')
      },
      // 浮层提交
      handleSubmit() {
        console.log('开始提交')
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            console.log(this.ruleForm);
            //上传标签信息
            //判断标签层级
             this.ruleForm.labelValueHierarchy=this.ruleForm.labelValueHierarchy?this.ruleForm.labelValueHierarchy:0
            //判断排序
            if(this.ruleForm.orderVal === ''){
                  this.ruleForm.orderVal=0
            }
            // //标签值（当为单选或多选时传值）
            if(this.ruleForm.labelValue){
              console.log('数组',this.ruleForm.labelValue)
              //标准值过度数组
              let labelValueArr=[]

              for(let i=0;i<this.ruleForm.labelValue.length;i++){
                let secLabelDictListArr = []
                labelValueArr.push({
                dictCode: this.ruleForm.labelValue[i].wwww,
                //——标签值编码（传参时，为dictName的值）
                dictName:this.ruleForm.labelValue[i].wwww,
                //——标签值名称
                dictType: this.ruleForm.labelName,
                //——标签值类型（传参时，为labelCode的值）
                isEnable:this.ruleForm.isEnable,
                //——是否启用 1:启用 0:停用
                level: 1,
                //——标签值层级一级
                secLabelDictList:secLabelDictListArr
                })
                console.log('children',this.ruleForm.labelValue)
                if(this.ruleForm.labelValue[i].children.length>0){
                  for(let k=0;k<this.ruleForm.labelValue[i].children.length;k++){
                      secLabelDictListArr.push({
                        dictCode:this.ruleForm.labelValue[i].children[k].tttt,
                        //——二级标签值编码（传参时，为二级标签值dictName的值）
                        dictName: this.ruleForm.labelValue[i].children[k].tttt,
                        //——二级标签值名称
                        dictType:this.ruleForm.labelName,
                        //——二级标签值类型（传参时，为labelCode的值）
                        isEnable: this.ruleForm.isEnable,
                        //——是否启用 1:启用 0:停用
                        level: 2,
                        //——标签值层级二级
                      })
                  }
                }
            }
              console.log('value11',labelValueArr)
              this.ruleForm.labelValue = labelValueArr
            }else{
              this.ruleForm.labelValue = null
            }

            // console.log('改变后',this.ruleForm)
            console.log('URL',this.$route)
            let URL = this.$route.path
            if(URL === '/mainPage/customerFollowUp/projectTaggingManagement'){
                  console.log('项目标签')
                editLabel({
                  id:this.ruleForm.id,
                  isEnable:this.ruleForm.isEnable,
                  isMustEnable:this.ruleForm.isEnable,
                  labelCode:this.ruleForm.labelName,
                  isRequired:this.ruleForm.isRequired,
                  labelLevel:this.ruleForm.labelValueHierarchy,
                  labelName:this.ruleForm.labelName,
                  labelType:this.ruleForm.labelType,
                  labelValueType:this.ruleForm.labelValueType,
                  orderVal:this.ruleForm.sort,
                  requiredLevel:this.ruleForm.isRequiredValue,
                  labelDictList:this.ruleForm.labelValue,
                  projectId:this.ruleForm.projectId,
                  projectCityName:this.ruleForm.projectCityName,
                  projectName:this.ruleForm.projectName
                }).then((res)=>{
                    //console.log('上传成功',res)
                    this.$message({
                      message: '更新成功',
                      type: 'success'
                    });
                    this.handleClose()
                })
            }
            if(URL === '/mainPage/customerFollowUp/groupLabelManagement'){
              console.log("项目标签",this.ruleForm.labelValueType)
              getLabel({
                isEnable:this.ruleForm.isEnable,
                isMustEnable:this.ruleForm.isEnable,
                labelCode:this.ruleForm.labelName,
                isRequired:this.ruleForm.isRequired,
                labelLevel:this.ruleForm.labelValueHierarchy,
                //数据字典项
                sysDictTypeCode:this.ruleForm.dataDictionaryItem,
                labelName:this.ruleForm.labelName,
                labelType:this.ruleForm.labelType,
                labelValueType:this.ruleForm.labelValueType,
                orderVal:this.ruleForm.sort,
                requiredLevel:this.ruleForm.isRequiredValue,
                labelDictList:this.ruleForm.labelValue

              }).then((res)=>{
                  //console.log('上传成功',res)
                   this.$message({
                      message: '上传成功',
                      type: 'success'
                    });
                  this.handleClose()
              })
            }



          }
        });
      },
      /* ---------------------浮层相关------------------------------ */

    }
  }
</script>

<style lang="scss">

.customerFollowUp-label-dialog{
  input{
    height: 28px!important;
  }
  .label-value-box{
    .el-form-item{
      width: 100%!important;
    }
    .add-children-label{
      vertical-align: top;
      margin-top: -3px;
    }
  }
  .isDisabled{
    display: none;
  }
}

</style>
