<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="title">新增单元</span>
                <div style="float: right">
                    <el-button type="success" @click="closeCreate" class="mainBtn_">取消</el-button>
                    <el-button type="success" @click="handleFinish('form')">完成</el-button>
                </div>
            </div>
            <div class="text item">
                <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="所属楼栋:">{{form.buildName}}
                            </el-form-item>
                            <el-form-item v-if="!isEdit" label="请选择单元:" prop="orderStr">
                                <el-select v-model="form.orderStr">
                                    <el-option v-for="(item, index) in unitList" :key="index" :label="item.unitName" :value="item.unitName"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="单元名称:" prop="unitName">
                                <el-input v-model="form.unitName"></el-input>
                            </el-form-item>
                            <el-form-item v-if="!isEdit" label="新增规则:">
                                <el-select v-model="form.about">
                                    <el-option v-for="(item, index) in ruleOption" :key="index" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="备注:">
                        <el-input v-model="form.remark"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import {saveUnit, updataUnit} from "@/api/pages/mainPage/plan/house"
    export default {
        props: {
            EditForm: Object,
            buildInfo: Object,
            isEdit: Boolean,
            unitList: Array,
            val: Object
        },
        methods: {
            handleSaveUnit(data) {
                if( this.isEdit ){
                    updataUnit(data).then(res=>{
                         
                        if( res.status === 200){
                            this.$emit('updataTree');
                            this.$notify({
                                title: '成功',
                                message: '修改成功',
                                type: 'success'
                            });
                            this.$emit('closeCreate');
                        }
                    })
                }else{
                    saveUnit(data).then(res=>{
                         
                        if( res.status === 200){
                            this.$emit('updataTree');
                            this.$notify({
                                title: '成功',
                                message: '新增成功',
                                type: 'success'
                            });
                            this.$emit('closeCreate');
                        }
                    })
                }

            },
            closeCreate() {
                this.$emit('closeCreate');
            },
            handleFinish(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.form.buildId = this.buildInfo.build.id;
                        this.form.projectId = this.buildInfo.build.projectId;
                        // this.form.id = this.form.id;

                        if( !this.isEdit ){
                            this.form.paramMap = {
                                id: this.buildInfo.build.id,
                                areaId: this.buildInfo.build.areaId,
                                areaName: this.buildInfo.build.areaName,
                                areaCode: this.buildInfo.build.areaCode,
                            };
                            let data = {
                                unitDto: this.form,
                                about: this.form.about
                            }
                            this.unitList.map(item=>{
                                if( item.unitName === this.form.orderStr ){
                                     
                                    data.unitId = item.id;
                                }
                            })

                             
                            this.handleSaveUnit(data);
                        }else{
                            console.log(this.form)

                            this.handleSaveUnit(this.form);
                        }

                        
                    } else {
                        alert('请完善信息！！！');
                        return false;
                    }
                });
            }
        },
        created() {
            console.log(this.buildInfo);
            console.log(this.unitList);
            console.log(this.val);

            if( this.EditForm ){
                this.form = this.EditForm;
            }
            this.form.buildName = this.buildInfo.buildName;
        },
        data() {
            return {
                form: {
                    buildName: '',
                    orderStr: '',
                    unitName: '',
                    about: 'right',
                    remark: '',
                },
                rules: {
                    orderStr: [
                        { required: true, message: '请输入单元序号', trigger: 'blur' }
                    ],
                    unitName: [
                        { required: true, message: '请输入单元名称', trigger: 'blur' }
                    ]
                },
                ruleOption:[{
                    label: '所选单元左侧',
                    value: 'left'
                },{
                    label: '所选单元右侧',
                    value: 'right'
                }]
            }
        }
    }
</script>

<style scoped>

</style>
