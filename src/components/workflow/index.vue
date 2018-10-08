<template>
    <div id="workflow">
        <div class="workflow_con">
            <el-container>
                <el-aside width="200px" id="workflow1">
                    <div class="title">流程步骤</div>
                    <div>
                        <el-steps v-if="workFlowList" direction="vertical" :active="workFlowList.length - 1" :space="67" process-status="finish" finish-status="process">
                            
                            <el-step v-for="(item,index) in workFlowList" :key="index"
                             :id="index === workFlowList.length-1?'step1':''" :title="item.taskName" :description="item.assigneeName"></el-step>

                        </el-steps>
                    </div>
                </el-aside>
                <el-main>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>基本信息</span>
                        </div>
                        <div class="text item">
                            <el-form ref="form" :model="form">
                                <el-row :gutter="20">
                                    <el-col :span="12">
                                        <el-form-item label="所属组织">{{form.aaa}}</el-form-item>
                                        <el-form-item label="表单编号">{{form.bbb}}</el-form-item>
                                        <el-form-item label="申请人">{{form.ccc}}</el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="申请人职位">{{form.ddd}}</el-form-item>
                                        <el-form-item label="申请时间">{{form.eee}}</el-form-item>
                                        <el-form-item label="流程主题">{{form.fff}}</el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>
                       
                    </el-card>
                    <div id="workflow2">
                        <div class="title">审批记录</div>
                        <div>
                            <el-steps direction="vertical" :active="workFlowList.length - 1"  :space="77" process-status="finish" finish-status="process">
                                <el-step v-for="(item, index) in workFlowList" :key="index" :title="item.taskName" :description="item.assigneeName"></el-step>
                            </el-steps>
                        </div>
                        <div class="btn_wrap">
                            <div>
                                <el-button type="success" @click="handleAgree1">同意原文意见</el-button>
                                <el-button type="success" @click="handleAgree2">同意修改意见</el-button>
                                <el-button type="success" @click="handleAgree3">退回修改</el-button>
                                <el-button type="success" @click="handleAgree4">我有修改意见</el-button>
                                <el-button type="success" @click="handlePass">忽略</el-button>
                                <el-button type="success" @click="handleAgree5">委托</el-button>
                                <el-button type="success" @click="handleAgree6">意见征询</el-button>
                            </div>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </div>
        <!-- 同意原文意见 -->
        <el-dialog title="审批意见" :visible.sync="handleAgreeFlag1" width="30%">
            <el-input type="textarea" :rows="2" placeholder="请输入审批意见" v-model="textarea"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleAgreeFlag1 = false">取 消</el-button>
                <el-button type="primary" @click="AgreeOpinion">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 同意修改意见 -->
        <el-dialog title="审批意见" :visible.sync="handleAgreeFlag2" width="30%">
            <el-table ref="multipleTable" :data="workFlowList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="姓名" property="assigneeName" width="120"></el-table-column>
                <el-table-column label="意见" property="comment" width="120"></el-table-column>
            </el-table>
            <el-input type="textarea" :rows="2" placeholder="请输入审批意见" v-model="textarea"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleAgreeFlag2 = false">取 消</el-button>
                <el-button type="primary" @click="AgreeOpinion">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 退回修改 -->
        <el-dialog title="审批意见" :visible.sync="handleAgreeFlag3" width="30%">
            <el-table ref="multipleTable" :data="workFlowList2" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
                
                <el-table-column label="姓名" property="assigneeName" width="120"></el-table-column>
                <el-table-column label="意见" property="comment" width="120"></el-table-column>
                
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleAgreeFlag3 = false">取 消</el-button>
                <el-button type="primary" @click="AgreeOpinion2">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 委托 -->
        <el-dialog title="委托" :visible.sync="handleAgreeFlag4" width="70%">
            <organization-tree v-bind:isRadio="true" ref="RadioTree"></organization-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleAgreeFlag4 = false">取 消</el-button>
                <el-button type="primary" @click="AgreeOpinion3">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 意见征询 -->
        <el-dialog title="意见征询" :visible.sync="handleAgreeFlag5" width="70%">
            <organization-tree v-bind:isRadio="false" ref="CheckedTree"></organization-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleAgreeFlag5 = false">取 消</el-button>
                <el-button type="primary" @click="AgreeOpinion4">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

import '@/assets/styles/workflow.scss'
import {getApprovalHistory, agree, moveBack, findMoveBackTask, transfer, additionTask} from '@/api/pages/workflow'
import OrganizationTree from '@/components/OrganizationTree'
// import '@/assets/styles/iframe.css'
    export default {
        components: {
            OrganizationTree
        },
        methods: {
            handleGetApprovalHistory(params) {
                getApprovalHistory(params).then(res=>{
                     
                    if( res.status === 200 ){
                        this.workFlowList = res.data;
                    }
                })
            },
            handleFindMoveBackTask(params) {
                findMoveBackTask(params).then(res=>{
                     ;
                    this.workFlowList2 = res.data;
                })
            },
            handlePass() {// 忽略
                this.$router.go(-1);
            },
            handleAgree1() {
                this.textarea = '同意原文意见'
                this.handleAgreeFlag1 = true;// 同意原文意见和我有修改意见两个按钮公用同一套dialog
            },
            handleAgree2() {
                this.textarea = '同意意见';
                this.handleAgreeFlag2 = true;
            },
            handleAgree3() {
                this.handleAgreeFlag3 = true;
            },
            handleAgree4() {
                this.textarea = '我有修改意见';
                this.handleAgreeFlag1 = true;// 同意原文意见和我有修改意见两个按钮公用同一套dialog
            },
            handleAgree5() {
                this.handleAgreeFlag4 = true;
            },
            handleAgree6() {
                this.handleAgreeFlag5 = true;
            },
            AgreeOpinion() {// 同意弹框中的确定按钮
                let data= {
                    taskId: this.taskId,
                    comment: this.textarea
                }
                data = this.Qs.stringify(data);
                agree(data).then(res=>{
                     ;
                    if( res.status === 200 ){
                        alert('审批成功')
                    }
                })
                this.handleAgreeFlag1 = false;
                this.handleAgreeFlag2 = false;
                // this.handleAgreeFlag3 = false;
                // this.handleAgreeFlag4 = false;
                // this.handleAgreeFlag5 = false;
            },
            AgreeOpinion2() {// 退回修改弹框中的确定按钮
                let data= {
                    currentTaskId: this.taskId,
                    historyTaskId: this.currentRow.taskId
                }
                data = this.Qs.stringify(data);
                moveBack(data).then(res=>{
                     ;
                    if( res.status === 200 ){
                        alert('审批成功')
                    }
                })
                this.handleAgreeFlag3 = false;
            },
            AgreeOpinion3() {// 委托弹框中的确定按钮          
                let data= {
                    taskId: this.taskId,
                    newUserName: this.$refs.RadioTree.currentRow.userName
                }
                data = this.Qs.stringify(data);
                transfer(data).then(res=>{
                     ;
                    if( res.status === 200 ){
                        alert('委托成功')
                    }
                })
                this.handleAgreeFlag4 = false;
            },
            AgreeOpinion4() {// 意见征询弹框中的确定按钮  
                let additionTaskAssignee = '';
                this.$refs.CheckedTree.SelectedMemberList.map((item, index)=>{
                    if( index !== this.$refs.CheckedTree.SelectedMemberList.length -1 ){
                        additionTaskAssignee += item.userName + ',';
                    }else{
                        additionTaskAssignee += item.userName;
                    }
                })
                let data= {
                    taskId: this.taskId,
                    additionTaskAssignee
                }
                data = this.Qs.stringify(data);
                additionTask(data).then(res=>{
                     ;
                    if( res.status === 200 ){
                        alert('委托成功')
                    }
                })
                this.handleAgreeFlag5 = false;
            },
            handleSelectionChange(val) {// 同意审批意见选择人员时触发的函数，将所选中的人员保存起来
                this.multipleSelection = val;
                let nameStr = '';
                let nameList = [];
                for( var i = 0;i < this.multipleSelection.length; i++ ){
                    if( i !== this.multipleSelection.length - 1 ){
                        nameList[i] = this.multipleSelection[i].assigneeName + '、';
                    }else{
                        nameList[i] = this.multipleSelection[i].assigneeName;
                    }
                    nameStr += nameList[i];
                }
                this.textarea = '同意'+ nameStr +'意见';
            },
            handleCurrentChange(val) {// 退回修改选择人员时触发的函数，将所选中的人员保存起来
                this.currentRow = val;
            }
        },
        data() {
            return {
                form: {
                    aaa: 'aaa',
                    bbb: 'bbb',
                    ccc: 'ccc',
                    ddd: 'ddd',
                    eee: 'eee',
                    fff: 'fff',
                },
                textarea: '',
                
                multipleSelection: [],// 保存所选中的同意审批意见人员列表
                currentRow: null,// 保存所选中的退回修改人员列表
                handleAgreeFlag1: false,
                handleAgreeFlag2: false,
                handleAgreeFlag3: false,
                handleAgreeFlag4: false,
                handleAgreeFlag5: false,
                workFlowList: [],
                workFlowList2: [],
                taskId: ''
            }
        },
        created() {
            this.taskId = this.$route.params.taskId;
            this.handleGetApprovalHistory({
                businessKey: '146'
            });
            let params = new URLSearchParams();
            params.append('taskId', this.taskId)
            this.handleFindMoveBackTask(params);
        },
        mounted() {
            setTimeout(()=>{
                var finish = document.getElementById('step1');
                var finish2 = finish.querySelector('.el-step__description');
                var time = document.createElement('span');
                time.innerHTML = '进行' + this.workFlowList[this.workFlowList.length - 1].duration;
                time.className = 'time';
                finish2.appendChild(time);
            },1000)
            var step2 = document.getElementById('workflow2');
            var finish3 = step2.getElementsByClassName('el-step__description');
            setTimeout(()=>{
                for( var i = 0; i < this.workFlowList.length - 1; i++ ){
                    finish3[i].className += ' finish'
                    finish3[i].setAttribute('data-attr', this.workFlowList[i].assigneeDeptTree || '')
                    var time = document.createElement('span');
                    if( this.workFlowList[i].comment ){
                        time.innerHTML = '审批意见：' + this.workFlowList[i].comment;
                    }
                    time.className = 'time';
                    finish3[i].appendChild(time);
                }
            },1000)
            
        }
    }
</script>

<style scoped>
.workflow{
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
}
.workflow_con{
    margin: 0 auto;
    width: 800px;
    height: 100%;
    border: 1px solid #ccc;
}
.iframe-wrap{
    width: 100%;
    height: 100%;
}
.el-container{
    height: 100%;
}
</style>