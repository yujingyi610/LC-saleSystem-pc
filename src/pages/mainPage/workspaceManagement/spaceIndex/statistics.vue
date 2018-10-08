<template>
    <div  class="out">
        <div class="our_top"><span>分析统计</span></div>
        <div class="our_cen">
            <template>
                <el-tabs class="our_tab" v-model="activeName" @tab-click="handleClick" >
                    <el-tab-pane class="our_tab_pane" label="客户分析" name="1" ><customDialog :projectAA='projectId'></customDialog></el-tab-pane>
                    <!-- <el-tab-pane label="销售分析" name="2"><marketDialog></marketDialog></el-tab-pane>
                    <el-tab-pane label="房源分析" name="3"><propertyDialog></propertyDialog></el-tab-pane> -->
                    <el-tab-pane label="排行榜" name="4"><topDialog :projectAA='projectId'></topDialog></el-tab-pane>
                </el-tabs>
            </template>
        </div>       
    </div>
</template>

<script>
import customDialog from './dialog/customDialog.vue'
import marketDialog from './dialog/marketDialog.vue'
import propertyDialog from './dialog/propertyDialog.vue'
import topDialog from './dialog/topDialog.vue'

    export default {
        components : {
            customDialog,
            marketDialog,
            propertyDialog,
            topDialog
        },
        data(){
            return {
                name:'数据统计',              
                //选择页面
                activeName:'1',
                //项目id
                projectId:'',                  
            }
        },
        props:{
            obtainCustomerEdit: String
        },
        watch:{            

            obtainCustomerEdit(e) {
                console.log('监听',e)
                this.projectId = e
            }
        },
        methods:{

            handleClick(tab, event) {
                console.log('切换',tab, event);
                console.log('页面',this.projectId)
                console.log('项目id',this.searchProjectValue)
                
            }

        },
        created(){
            // this.projectId = this.obtainCustomerEdit
            // console.log('777777',this.projectId);
        },
        mounted(){
             
            
        }
    }
</script>

<style lang="scss" scoped>
.out{
    margin-top: 20px;
    background: #ffffff;
    .our_top{
        height: 40px;
        border-bottom: 1px solid #E9E9E9;
        span{
            display: inline;
            line-height: 40px;
            padding-left: 20px;
            font-size:14px;
            font-family:PingFang-SC-Medium;
            color:rgba(64,64,64,1);
        }
    }

    .our_cen{
        height: 1500px;
        padding: 20px;
        .our_tab{  
            text-align: center;         
            .el-tabs__nav{
                background: red!important;
                transform: translateX(100%)!important;
            }
            .our_tab_pane{
                
            }
        }

        
    }
}
#reportContainer .easyui-layout .layout .easyui-fluid{
    overflow: hidden!important;
}
</style>
>

