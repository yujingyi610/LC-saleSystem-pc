<template>
    <div class="copyForm">
        <el-card class="box-card noBgColor">
            <div slot="header" class="clearfix">
                <span class="title">{{createHouseInfo.buildName}}的房间</span>
                <div style="float: right">
                    <el-button type="success" @click="handleFinish">完成</el-button>
                </div>
            </div>
            <div class="text item table_header_bgColor">
                <el-table v-if="tableData && cellList" :data="tableData" style="width: 100%" border>
                    <el-table-column label="楼层名称:" prop="name" fixed width="80"></el-table-column>
                    <el-table-column v-for="(item, index) in cellList" :key="index" :label="item.unitName" :prop="item.id" :width="86*item.maxNum + 20">
                        <template slot-scope="scope">
                            <span v-if="scope.row[item.id]" v-for="(item2, index2) in scope.row[item.id]" :key="index2" class="cellItem">
                                <el-radio v-model="chooseOne" :label="item.unitName + item2.houseName">
                                    <span class="cell_name cell_con">{{item2.houseName}}</span>
                                    <!-- <div>
                                        <span class="cell_houseType cell_con">
                                            <span v-if="item2.houseLayoutName">{{item2.houseLayoutName}}</span>
                                            <span v-else>未设置</span>
                                        </span>
                                        <span class="cell_orientation cell_con">
                                            <span v-if="item2.orientation">{{item2.orientation}}</span>
                                            <span v-else>未设置</span>
                                        </span>
                                    </div> -->
                                </el-radio>
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        props: {
            cellList: Array,
            tableData: Array,
            createHouseInfo: Object
        },
        methods: {
            arraySpanMethod({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 0) { return [1, 2] }
                else if (columnIndex === 1) { return [0, 0] }
            },
            handleFinish() {
                // console.log( typeof this.chooseOne)
                this.$emit('closeChild',this.chooseOne)
            }
        },
        data() {
            return {
                chooseOne: ''
            }
        },
        created() {
            console.log(this.createHouseInfo)
        }
    }
</script>

<style scoped>

</style>
