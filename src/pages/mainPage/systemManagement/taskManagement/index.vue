<template>
  <div class="task-management background-m">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span style="font-size:14px">系统中的任务</span>
        </div>
        <div  class="text item">
            <el-table
                :data="scheduleJobVoList"
                border
                style="width: 100%"
                    >
                    <el-table-column type="index" width="80" label="序号" align ="center"></el-table-column>
                    <el-table-column prop="jobName" label="任务名称"></el-table-column>
                    <el-table-column prop="status" width="150" label="任务状态">
                        <template  slot-scope="scope">
                            <span v-if="scope.row.status=== 'NORMAL' || scope.row.status=== 'COMPLETE'" >正常执行</span>
                            <span v-else-if="scope.row.status=== 'BLOCKED'" style="color: red">阻塞</span>
                            <span v-else-if="scope.row.status=== 'ERROR'" style="color: red">错误</span>
                            <span v-else-if="scope.row.status=== 'PAUSED'" style="color: red">暂停</span>
                            <span v-else-if="scope.row.status=== ''" ></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="cronExpression" label="时间表达式"></el-table-column>
                    <el-table-column prop="description" width="200" label="任务描述"></el-table-column>
                    <el-table-column width="320" label="操作">
                        <template slot-scope="scope" >
                            <el-button  type="text" @click="handleEdit(scope.row)">编辑</el-button>
                            <el-button  type="text" @click="handlesuspend(scope.row)">暂停</el-button>
                            <el-button @click="handleRecovery(scope.row)" type="text">恢复</el-button>
                            <el-button  type="text" @click="handleDelete(scope.row)">删除</el-button>
                            <el-button  type="text" @click="handleRunonce(scope.row)">运行一次</el-button>
                        </template>
                    </el-table-column>
            </el-table>
        </div>
    </el-card>
    <el-card class="box-card" style="margin-top:20px">
        <div slot="header" class="clearfix">
            <span style="font-size:14px">运行中的任务</span>
        </div>
        <div  class="text item">
            <el-table
            :data="executingJobVoList"
            border
            style="width: 100%"
                >
                <el-table-column type="index" width="80" label="序号" align ="center"></el-table-column>
                <el-table-column prop="jobName" label="任务名称"></el-table-column>
                <el-table-column prop="runjobitem" label="运行者"></el-table-column>
                <el-table-column prop="status"  label="任务状态">
                     <template slot-scope="scope">
                        <span v-if="scope.row.status=== 'NORMAL' || scope.row.status=== 'COMPLETE'" >正常执行</span>
                        <span v-else-if="scope.row.status=== 'BLOCKED'" style="color: red">阻塞</span>
                        <span v-else-if="scope.row.status=== 'ERROR'" style="color: red">错误</span>
                        <span v-else-if="scope.row.status=== 'PAUSED'" >暂停</span>
                        <span v-else-if="scope.row.status=== ''" ></span>
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="任务描述"></el-table-column>
            </el-table>
        </div>
    </el-card>

    <el-dialog title="编辑列表信息" :visible.sync="innerVisible" class="inner_dialog line_height28" width="50%">

        <el-form :model = "editForm" :rules="rules" ref="editForm">
            <el-row type="flex" justify="space-between">
                <el-col :span = "9">
                    <el-form-item prop="jobName" label="任务名称:">
                        <el-input v-model="editForm.jobName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span = "9">
                    <el-form-item prop="jobGroup" label=" 任务分组:" >
                        <el-input v-model="editForm.jobGroup" ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
                <el-col :span = "9">
                    <el-form-item prop="description" label="任务描述:">
                        <el-input v-model="editForm.description"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span = "9">
                    <el-form-item prop="cronExpression" label="时间表达式:">
                        <el-input v-model="editForm.cronExpression"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

       <div slot="footer" class="dialog-footer">
            <el-button type="success" @click="keepeditEdit('editForm')">保存</el-button>
            <el-button type="button" @click="canceleEdit('editForm')">取消</el-button>
       </div>  
    </el-dialog>

</div>
</template>

<script>
import api from '@/axios/api.js'
import '@/assets/styles/reset.scss'
import { getscheduleJobVoList,getPausejob,getresumejob,getdelete,getrunoncejob,getKeepedit} from '@/api/pages/mainPage/systemManagement'
export default {
   
    data() {
      return {
          editList:{},
        scheduleJobVoList:[],
        executingJobVoList:[],
        fontColor:'red',
        innerVisible:false,
        editForm:{
            jobName:'',
            cronExpression:'',
            description:'',
            jobGroup:'',
        },
         rules: {
            jobName: [
                { required: true, message: '请填写任务名称', trigger: 'blur' }
            ],
            cronExpression: [
                { required: true, message: '请填写时间表达式', trigger: 'blur' }
            ],
            description: [
                { required: true, message: '请填写任务描述', trigger: 'blur' }
            ],
            jobGroup: [
                { required: true, message: '请填写任务分组', trigger: 'blur' }
            ],
         },
        
      }
    },
    mounted(){
        this.getschedulejobvo();
        
     },
     methods:{
         getschedulejobvo() {
            getscheduleJobVoList().then(res=>{
                if(res.status === 200){
                    this.scheduleJobVoList = res.data.scheduleJobVoList;
                    // console.log(this.scheduleJobVoList)
                    this.executingJobVoList = res.data.executingJobList;
                }
            })
         },
         //暂停操作
         handlesuspend(item){
                let data={
                    scheduleJobId:item.scheduleJobId
                }
            getPausejob(data).then(res=>{
                if(res.status === 200){
                    location.reload()
                }
            })
         },
         //恢复操作
         handleRecovery(item){
            let data={
                    scheduleJobId:item.scheduleJobId
                }
            getresumejob(data).then(res=>{
                if(res.status === 200){
                    location.reload()
                }
            })
         },
         //删除操作
         handleDelete(item){
            let data={
                    scheduleJobId:item.scheduleJobId
                }
            getdelete(data).then(res=>{
                if(res.status === 200){
                    location.reload()
                }
            })
         },
         //运行一次操作
         handleRunonce(item){
            let data={
                    scheduleJobId:item.scheduleJobId
                }
            getrunoncejob(data).then(res=>{
                if(res.status === 200){
                    location.reload()
                }
            })
         },
         //编辑操作
         handleEdit(item){
            this.innerVisible = true;
            this.editList = item;
         },
         //取消按钮
         canceleEdit(formName){
            this.innerVisible = false;
            this.$refs[formName].resetFields();
         },
         //保存按钮
         keepeditEdit(formName){
             this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.editList.keywords='delUpdate'; 
                    this.editList.jobName = this.editForm.jobName;
                    this.editList.cronExpression = this.editForm.cronExpression;
                    this.editList.description = this.editForm.description;
                    this.editList.jobGroup = this.editForm.jobGroup;
                    getKeepedit(this.editList).then(res=>{
                        if(res.status === 200){
                            this.innerVisible = false;
                            this.editForm.jobName ='';
                            this.editForm.cronExpression ='';
                            this.editForm.description ='';
                            this.editForm.jobGroup ='';
                        }
                    })

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
         }
     }
   
  }
</script>

<style lang="scss" scoped>
.task-management{

}


</style>