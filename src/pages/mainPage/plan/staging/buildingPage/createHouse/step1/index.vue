<template>
    <div>
        <el-card class="box-card space_bottom">
            <div slot="header" class="clearfix">
                <span class="title">{{buildingInfo.name}}房间<i class="el-icon-arrow-right"></i>生成房间<i class="el-icon-arrow-right"></i>设置楼层单元</span>
                <div style="float: right" class="card_button">
                    <el-button @click="closeCreate">取消</el-button>
                    <el-button type="success" @click="nextStep('form')">下一步</el-button>
                </div>
            </div>
            <div class="text item">
                <el-form ref="form" :model="form" status-icon :rules="rules" label-width="80px" class="line_height26">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="楼栋名称:">{{form.name}}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="房产性质:">{{form.nature}}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="单元数目:" prop="num" required>
                                <el-input v-model.number="form.num"  auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="楼层编号:" required style="margin-top: 8px">
                        <el-col :span="5">
                            <el-form-item prop="from">
                                <el-input v-model.number="form.from"  auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="text-align: center; width: 32px">-</el-col>                        
                        <el-col :span="5">
                            <el-form-item prop="to">
                                <el-input v-model.number="form.to"  auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" style="margin-left: 32px">
                            <el-select v-model="form.choose">
                                <el-option label="全部" value="全部"></el-option>
                                <el-option label="单数" value="单数"></el-option>
                                <el-option label="双数" value="双数"></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        props:{
            formInfo: Object,
            buildingInfo: Object
        },
        data() {
            var checkFrom = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        callback();
                    }
                }, 1000);
            };
            var checkTo = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('不能为空'));
                }
                if (value <= this.form.from){
                    return callback(new Error('必须大于第一个数'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        callback();
                    }
                }, 300);
            };
            var checkNum = (rule, value, callback) => {
                if (!value) {
                return callback(new Error('单元数不能为空'));
                }
                setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    if (value < 1) {
                    callback(new Error('单元数不能为负数'));
                    } else {
                    callback();
                    }
                }
                }, 1000);
            };
            return {
                form: {
                    name: '',
                    nature: '',
                    num: '',
                    from: '',
                    to: '',
                    choose: '全部'
                },
                rules: {
                    num: [
                        { validator: checkNum, trigger: 'blur' }
                    ],
                    from: [
                        { validator: checkFrom, trigger: 'blur' }
                    ],
                    to: [
                        { validator: checkTo, trigger: 'blur' }
                    ]
                },
            }
        },
        methods: {
            nextStep(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit('nextStep',{
                            name: 'step-two',
                            form: this.form
                        });
                    } else {
                        alert('error submit!!');
                        return false;
                    }
                });   
            },
            closeCreate() {
                this.$emit('closeCreate');
            }
        },
        created() {
            console.log(this.buildingInfo)
            this.form.name = this.buildingInfo.buildName;
            this.form.nature = this.buildingInfo.houseKindName;
        }
  
    }
</script>

<style scoped>
 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
</style>