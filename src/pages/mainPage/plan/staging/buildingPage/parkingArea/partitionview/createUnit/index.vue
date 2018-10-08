<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="title">新增子分区</span>
                <div style="float: right">
                    <el-button @click="closeCreate">取消</el-button>
                </div>
            </div>
            <div class="text item">
                <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="所属分区:">{{form.buildName}}
                            </el-form-item>
                            <el-form-item v-if="!isEdit" label="请选择子分区:" prop="orderStr">
                                <el-select v-model="form.orderStr">
                                    <el-option v-for="(item, index) in unitList" :key="index" :label="item.unitName" :value="item.unitName"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="子分区名称:" prop="unitName">
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
                    <el-button type="success" @click="handleFinish('form')">完成</el-button>
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
            createHouseInfo: Object,
            isEdit: Boolean,
            unitList: Array
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
                        }else{
                            this.$message.error(res.message)
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
                        }else{
                            this.$message.error(res.message)
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
                        this.form.buildId = this.createHouseInfo.build.id;
                        this.form.projectId = this.createHouseInfo.build.projectId;
                        // this.form.id = this.form.id;

                        if( !this.isEdit ){
                            this.form.paramMap = this.createHouseInfo.val;
                            this.form.paramMap.areaId = this.createHouseInfo.build.areaId;
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
            console.log(this.createHouseInfo);
            console.log(this.unitList);

            if( this.EditForm ){
                this.form = this.EditForm;
            }
            this.form.buildName = this.createHouseInfo.buildName;
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