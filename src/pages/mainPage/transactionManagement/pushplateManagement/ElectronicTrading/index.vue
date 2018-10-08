<template>
    <div class="electronicTrading">
        <el-tabs type="card" class="height100">
            <el-tab-pane label="电子签到设置">  
                <check-setting :row="row"></check-setting>
            </el-tab-pane>
            <el-tab-pane label="电子摇号设置">
                <lottery-seting :row="row"></lottery-seting>
            </el-tab-pane>
            <!-- <el-tab-pane label="电子签到">
                <check :row="row"></check>
            </el-tab-pane>
            <el-tab-pane label="电子摇号">
                <lottery :row="row"></lottery>
            </el-tab-pane> -->
        </el-tabs>
    </div>
</template>

<script>
import checkSetting from './checkSetting'// 电子签到设置
import lotterySeting from './lotterySeting'// 电子摇号设置
import check from './check'// 电子签到
import lottery from './lottery'// 电子摇号
    export default {
        props: {
            row: Object
        },
        components: {
            checkSetting,
            lotterySeting,
            check,
            lottery
        }
    }
</script>

<style scoped>
.electronicTrading{
    height: 500px;
}
</style>