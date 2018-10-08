<template>
    <div style="height:400px">
        <div style="margin-top:20px;">
            <el-radio-group v-model="type">
                <el-radio-button label="1">今日</el-radio-button>
                <el-radio-button label="2">本周</el-radio-button>
                <el-radio-button label="3">本月</el-radio-button>
                <el-radio-button label="4">本年</el-radio-button>
            </el-radio-group>            
        </div>
        <div>
            <ul>
                <li></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                name:'数据统计',               
                    //选择页面
                    activeName:'',
                    type : '1'                
            }
        },

        methods:{
        },
        created(){

        },
    }
</script>

<style lang="scss" scoped>

</style>
>

