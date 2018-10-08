<template>
    <div>
        <el-dialog title="房间价格详情" :visible.sync="flag" width="90%" >
            <el-table v-if="tableData" :data="tableData" border style="width: 100%" height="500">
                <el-table-column prop="houseName" label="房间名称" width="350"></el-table-column>
                <el-table-column prop="priceMethod" label="计价方式"></el-table-column>
                <el-table-column prop="priceArea" label="计价面积"></el-table-column>
                <el-table-column prop="originalMinPrice" label="原底单价"></el-table-column>
                <el-table-column prop="originalMinTotalPrice" label="原底总价"></el-table-column>
                <el-table-column prop="originalPrice" label="原表单价"></el-table-column>
                <el-table-column prop="originalTotalPrice" label="原表总价"></el-table-column>
                <el-table-column prop="currentMinPrice" label="现底单价"></el-table-column>
                <el-table-column prop="currentMinTotalPrice" label="现底总价"></el-table-column>
                <el-table-column prop="currentPrice" label="现表单价"></el-table-column>
                <el-table-column prop="currentTotalPrice" label="现表总价"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                tableData: null,
                flag: false
            }
        },
        methods: {
            handleOpenDialog(tableData) {
                this.tableData = tableData;
                this.flag = true
            }
        }
    }
</script>

<style scoped>

</style>