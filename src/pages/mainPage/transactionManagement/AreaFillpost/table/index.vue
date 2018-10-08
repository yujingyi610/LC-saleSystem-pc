<template>
    <div>
        <el-table :data="tableData" border style="width: 100%" @row-click="handleLookRow">
            <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="title" label="流程标题" width="300" show-overflow-tooltip></el-table-column>
            <el-table-column prop="type1" label="业务类型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="type2" label="单据类型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="status" label="流程状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="personName" label="当前处理人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="date" label="发起时间/批准时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="code" label="流水号" show-overflow-tooltip></el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
                <div v-if="title === '草稿'">
                    <el-button @click.stop.prevent="handleRedact(scope.row)" type="text">编辑</el-button>
                    <el-button @click.stop.prevent="handleDelect(scope.row)" type="text">删除</el-button>
                </div>
                <div v-else>
                    <el-button @click.stop.prevent="handleBack(scope.row)" type="text">撤回</el-button>                    
                </div>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
     export default {
        data() {
            return{
                tableData: [{
                    title: '退房审批 房号：绿城·杭州蘭园绿城 一期 住宅区 01栋 1单元 房间 客户：张三',// 流程标题
                    type1: '认购',// 业务类型
                    type2: '退房审批流程',// 单据类型
                    status: '草稿',// 流程状态
                    personName: '张三',// 当前处理人
                    date: ' ——/——',// 发起时间/批准时间
                    code: '——',// 流水号
                }],
                title: '草稿',// 判断是草稿table还是我提交的table
            }
        },
        methods: {
            handleGetList(title) {// 请求table数据
                this.title = title;

                // 这里请求后台数据
            },
            handleLookRow(row) {// 点击table某行触发，查看详细信息
                //  
                // console.log(this.title)
                
            },
            handleRedact(row) {// 编辑
                // this.redactFlag = true;
            },
            handleDelect(row) {// 删除
            // 判断是因为，table中可以进行操作，弹框内的按钮也可以进行操作，row是table内的操作
                if( row ){

                }else{
                    console.log(this.LookForm)// 使用的数据是this.LookForm
                }
            },
            handleBack(row) {// 撤回

            }
        }
    }
</script>

<style scoped>

</style>