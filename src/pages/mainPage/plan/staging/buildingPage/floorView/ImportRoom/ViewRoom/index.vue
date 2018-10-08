<template>
    <div class="viewRoom">
        <el-card class="box-card noBgColor">
            <div slot="header" class="clearfix">
                <span class="title">{{createHouseInfo.buildName}}房间<i class="el-icon-arrow-right"></i>导入房间<i class="el-icon-arrow-right"></i>浏览导入房间</span>
                <div style="float: right">
                    <el-button type="success" @click="goBack">返回</el-button>
                </div>
            </div>
            <div class="text item table_header_bgColor">
                <el-table v-if="tableData && cellList" :data="tableData" style="width: 100%" border>
                    <el-table-column label="楼层名称:" prop="name" fixed width="80"></el-table-column>
                    <el-table-column v-for="(item, index) in cellList" :key="index" :label="item.key+'单元房间'" :prop="item.key" :min-width="145*item.num">
                        <template slot-scope="scope">
                            <span v-if="scope.row[item.key]" v-for="(item2, index2) in scope.row[item.key]" :key="index2" class="cellItem">
                                <el-row :gutter="20">
                                    <el-col :span="12"><span class="cell_name cell_con">{{item2.name2}}</span></el-col>
                                    <el-col :span="12"><span class="cell_houseType cell_con">户型{{item2.houseType}}</span></el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="12"><span class="cell_orientation cell_con">朝向{{item2.orientation}}</span></el-col>
                                    <el-col :span="12"><span class="cell_landscape cell_con">{{item2.landscape}}</span></el-col>
                                </el-row>
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
                <div v-else>请生成房间</div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        props: {
            createHouseInfo: Object
        },
        methods: {
            goBack() {
                this.$emit('goBack');
            }
        },
        created() {

        },
        data() {
            return{
                tableData: null,
                cellList: null
            }
        }
    }
</script>

<style scoped>
.viewRoom{
    position: absolute;
    top: 0;
    background: #fff;
    left: 0;
    width: 100%;
}
</style>
