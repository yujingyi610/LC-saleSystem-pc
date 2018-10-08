<template>
    <div id="price">
        <el-card class="box-card">
            <div class="tab_wrap">
                <el-radio-group v-model="tabPosition"  @change="handleChoose">
                    <el-radio-button label="DRAFT" >草稿</el-radio-button>
                    <el-radio-button label="SUBMIT" >已提交</el-radio-button>
                    <el-radio-button label="APPROVED" >已审批</el-radio-button>
                    <el-radio-button label="EFFECT" >已生效</el-radio-button>
                </el-radio-group>
                <div style="float: right">
                    <el-button type="primary" @click="handleAdd" v-has="'prj:price:add'">新增</el-button>
                </div>
            </div>
            <component :is="isShow" ref="tableRef"></component>
        </el-card>
        <add-dialog ref="addDialogRef" @upDate="handleUpdate"></add-dialog>
    </div>
</template>

<script>
import draftTable from './draftTable'// 草稿table
import submitTable from './submitTable'// 已提交table
import approvedTable from './approvedTable'// 已提交table
import effectTable from './effectTable'// 已提交table
import addDialog from './addDialog'// 新增弹框
    export default {
        components: {
            draftTable,
            submitTable,
            approvedTable,
            effectTable,
            addDialog
        },
        data() {
            return{
                tabPosition: 'DRAFT',// tab切换
                /*******头部搜索*****/
                isShow: 'draft-table',// 显示的table
            }
        },
        methods: {
            //选项卡切换
            handleChoose(val) {
                if( val === 'DRAFT' ){
                    this.isShow = 'draft-table'
                }else if( val === 'SUBMIT' ) {
                    this.isShow = 'submit-table'
                }else if( val === 'APPROVED' ) {
                    this.isShow = 'approved-table'
                }else if( val === 'EFFECT' ) {
                    this.isShow = 'effect-table'
                }
            },
            handleAdd() {// 新增
                this.$refs.addDialogRef.show()
            },
            handleUpdate() {// 更新列表数据
                this.$refs.tableRef.handlegetPriceSchemeList();
            }
        },
        created() {
        }   
    }
</script>

<style scoped>
.tab_wrap{
    overflow: hidden;
    margin-bottom: 20px;
}
</style>