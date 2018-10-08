<template>
    <div>
        <el-table :data="list" border height="275" style="width: 100%">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="customName" label="客户姓名" width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sex" label="性别" width="50" show-overflow-tooltip></el-table-column>
            <el-table-column prop="tel" label="手机号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="raiseCode" label="认筹号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="signTime" label="签到时间" show-overflow-tooltip></el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        props: {
            data: Array
        },
        watch: {
            data() {
                this.list = this.data;
                console.log(this.list)
            }
        },
        data() {
            return{
                list: []
            }
        },
        created() {
            console.log(this.data)
        }
    }
</script>

<style scoped>

</style>