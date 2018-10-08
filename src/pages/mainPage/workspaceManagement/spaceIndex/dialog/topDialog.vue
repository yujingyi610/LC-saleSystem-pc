<template>
    <div style="height:400px">
        <div style="margin-top:20px;">
            <el-radio-group @change="changeType" v-model="type">
                <el-radio-button label="DAY">今日</el-radio-button>
                <el-radio-button label="WEEK">本周</el-radio-button>
                <el-radio-button label="MONTH">本月</el-radio-button>
                <el-radio-button label="YEAR">本年</el-radio-button>
            </el-radio-group>            
        </div>
        <div class="mt-20">
            <el-row>
                <el-col :span="8">
                    <div class="grid-content bg-purple pd-10">
                        
                        <div class="envelope-title f-6w deteBor">
                                销售金额排行
                        </div>
                        <div class="d mt-10 ">
                            <div v-if="this.tableDataSMe" class="envelope-box height_82">
                                <template>
                                 <el-row>
                                    <el-col :span="5" class="lh-82">
                                        <span class="f-6w fs-14">{{this.tableDataSMe.sort}}</span>
                                        <img :src="this.tableDataSMe.sort===1?top1Url:this.tableDataSMe.sort===2?top2Url:this.tableDataSMe.sort===3?top3Url:''">
                                    </el-col>
                                    <el-col :span="19">
                                        <el-row class="view fs-14">
                                            <el-col :span="8" class="f-6w">我</el-col>
                                            <el-col :span="16" >销售额<span class="c-r fs-17">{{this.tableDataSMe.signTotalAmount}}</span>元</el-col>                                           
                                        </el-row>
                                        <el-row class="view fs-12">                                        
                                            <el-col :span="12">{{this.tableDataSMe.houseArea}}m²</el-col>
                                            <el-col :span="12" >{{this.tableDataSMe.houseNum}}套</el-col>                                           
                                        </el-row>
                                        <el-row class="view fs-12">
                                            <el-col :span="12">应收{{this.tableDataSMe.unreceiveAmount}}元</el-col>
                                            <el-col :span="12">回款{{this.tableDataSMe.receivedAmount}}元</el-col>  
                                        </el-row>
                                    </el-col>
                                </el-row>
                                </template>
                            </div>
                            <div v-on:scroll.passive="onScrollS" class="height_82 bor-btm box Stop">
                                <template v-for="(item,index) in this.tableDataS">
                                 <el-row class="bor" :key="index">
                                    <el-col :span="5" class="lh-82">
                                        <span class="f-6w fs-14">{{item.sort}}</span>
                                        <img :src="item.sort===1?top1Url:item.sort===2?top2Url:item.sort===3?top3Url:''">
                                    </el-col>
                                    <el-col :span="19">
                                        <el-row class="view fs-14">
                                            <el-col :span="8" class="f-6w">{{item.userName}}</el-col>                                           
                                            <el-col :span="16" >销售额<span class="c-r fs-17">{{item.signTotalAmount}}</span>元</el-col>                                           
                                        </el-row>
                                        <el-row class="view fs-12">
                                            <el-col :span="12">{{item.houseArea}}m²</el-col>
                                            <el-col :span="12" >{{item.houseNum}}套</el-col>
                                           
                                        </el-row>
                                        <el-row class="view fs-12">
                                            <el-col :span="12">应收{{item.unreceiveAmount}}元</el-col>
                                            <el-col :span="12">回款{{item.receivedAmount}}元</el-col>  
                                        </el-row>
                                    </el-col>
                                </el-row>
                                </template>
                            </div>                            
                        </div>                    
                    </div>
                </el-col>
                <el-col :span="8">
                      <div class="grid-content bg-purple pd-10">
                        
                        <div class="envelope-title f-6w deteBor">
                                成交套数排行
                        </div>
                        <div class="d mt-10 ">
                            <div v-if="this.tableDataMe" class="envelope-box height_82">
                                <template>
                                 <el-row>
                                    <el-col :span="5" class="lh-82">
                                        <span class="f-6w fs-14">{{this.tableDataMe.sort}}</span>
                                        <img :src="this.tableDataMe.sort===1?top1Url:this.tableDataMe.sort===2?top2Url:this.tableDataMe.sort===3?top3Url:''">
                                    </el-col>
                                    <el-col :span="19">
                                        <el-row class="view fs-14">
                                            <el-col :span="8" class="f-6w">我</el-col>                                            
                                            <el-col :span="16" ><span class="c-r fs-17">{{this.tableDataMe.houseNum}}</span>套</el-col>                                           
                                        </el-row>
                                        <el-row class="view fs-12">
                                            <el-col :span="12">{{this.tableDataMe.houseArea}}m²</el-col>
                                            <el-col :span="12" >销售额{{this.tableDataMe.signTotalAmount}}元</el-col>
                                            
                                        </el-row>
                                        <el-row class="view fs-12">
                                            <el-col :span="12">应收{{this.tableDataMe.unreceiveAmount}}元</el-col>
                                            <el-col :span="12">回款{{this.tableDataMe.receivedAmount}}元</el-col>  
                                        </el-row>
                                    </el-col>
                                </el-row>
                                </template>
                            </div>
                            <div v-on:scroll.passive="onScroll" class="height_82 bor-btm box top">
                                <template v-for="(item,index) in this.tableData">
                                 <el-row class="bor" :key="index">
                                    <el-col :span="5" class="lh-82">
                                        <span class="f-6w fs-14">{{item.sort}}</span>
                                        <img :src="item.sort===1?top1Url:item.sort===2?top2Url:item.sort===3?top3Url:''">
                                    </el-col>
                                    <el-col :span="19">
                                        <el-row class="view fs-14">
                                            <el-col :span="8" class="f-6w">{{item.userName}}</el-col>
                                            <el-col :span="16" ><span class="c-r fs-17">{{item.houseNum}}</span>套</el-col>
                                        </el-row>
                                        <el-row class="view fs-12">
                                            <el-col :span="12">{{item.houseArea}}m²</el-col>
                                            <el-col :span="12" >销售额{{item.signTotalAmount}}元</el-col>
                                            
                                        </el-row>
                                         <el-row class="view fs-12">
                                            <el-col :span="12">应收{{item.unreceiveAmount}}元</el-col>
                                            <el-col :span="12">回款{{item.receivedAmount}}元</el-col>  
                                         </el-row>
                                    </el-col>
                                </el-row>
                                </template>
                            </div>                            
                        </div>                    
                    </div>  
                   
                </el-col>
                <el-col :span="8">
                     <div class="grid-content bg-purple pd-10">
                        
                        <div class="envelope-title f-6w deteBor">
                                回款金额排行
                        </div>
                        <div class="d mt-10 ">
                            <div v-if="this.tableDataRMe" class="envelope-box height_82">
                                <template>
                                 <el-row>
                                    <el-col :span="5" class="lh-82">
                                        <span class="f-6w fs-14">{{this.tableDataRMe.sort}}</span>
                                        <img :src="this.tableDataRMe.sort===1?top1Url:this.tableDataRMe.sort===2?top2Url:this.tableDataRMe.sort===3?top3Url:''">
                                    </el-col>
                                    <el-col :span="19">
                                        <el-row class="view fs-14">
                                            <el-col :span="8" class="f-6w">我</el-col>                                           
                                            <el-col :span="16" >回款<span class="c-r fs-17">{{this.tableDataRMe.receivedAmount}}</span>元</el-col>                                           
                                        </el-row>
                                        <el-row class="view fs-12">
                                            <el-col :span="12">{{this.tableDataRMe.houseArea}}m²</el-col>
                                            <el-col :span="12" >{{this.tableDataRMe.houseNum}}套</el-col>
                                        </el-row>
                                        <el-row class="view fs-12">
                                            <el-col :span="12">应收{{this.tableDataRMe.unreceiveAmount}}元</el-col>
                                            <el-col :span="12">销售额{{this.tableDataRMe.signTotalAmount}}元</el-col> 
                                        </el-row>
                                    </el-col>
                                </el-row>
                                </template>
                            </div>
                            <div v-on:scroll.passive="onScrollR"  class="height_82 bor-btm box Rtop">
                                <template v-for="(item,index) in this.tableDataR">
                                 <el-row class="bor" :key="index">
                                    <el-col :span="5" class="lh-82">
                                        <span class="f-6w fs-14">{{item.sort}}</span>
                                        <img :src="item.sort===1?top1Url:item.sort===2?top2Url:item.sort===3?top3Url:''">
                                    </el-col>
                                    <el-col :span="19">
                                        <el-row class="view fs-14">
                                            <el-col :span="8" class="f-6w">{{item.userName}}</el-col>                                            
                                            <el-col :span="16" >回款<span class="c-r fs-17">{{item.receivedAmount}}</span>元</el-col>                                           
                                        </el-row>
                                        <el-row class="view fs-12">
                                            <el-col :span="12">{{item.houseArea}}m²</el-col>
                                            <el-col :span="12" >{{item.houseNum}}套</el-col>                                                                        
                                        </el-row>
                                        <el-row class="view fs-12">
                                            <el-col :span="12">应收{{item.unreceiveAmount}}元</el-col> 
                                            <el-col :span="12">销售额{{item.signTotalAmount}}元</el-col>  
                                        </el-row>
                                    </el-col>
                                </el-row>
                                </template>
                            </div>                            
                        </div>                    
                    </div>
                    
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
//gerTopPage
import {
  gerTop,//获取排行榜
  gerTopPage,//排行榜二级翻页
  } from '@/api/pages/workflow'
import top1Url from '@/assets/images/top1.png'  
import top2Url from '@/assets/images/top2.png'              
import top3Url from '@/assets/images/top3.png' 
                
                
    export default {
        data(){
            return {
                name:'数据统计',               
                //选择页面
                activeName:'',
                //日期
                type : 'DAY',  
                //项目id
                projectId:'',
                //销售金额
                tableDataS:[],
                 //销售金额me
                tableDataSMe:{},
                //销售套数
                tableData:[],
                //销售套数me
                tableDataMe:{},
                //回款
                tableDataR:[],
                 //回款me
                tableDataRMe:{},
                //页数销售金额
                pageNumS:'1',
                 //页数套数
                pageNum:'1',
                 //页数回款
                pageNumR:'1',
                //siex
                pageSize:'10',
                top1Url:top1Url,
                top2Url:top2Url,
                top3Url:top3Url,

            }
        },

        props:{
            projectAA: String
        },
        watch:{            

            projectAA(e) {
                console.log('监听t2222222222222optotp',e)
                this.projectId = e
                this.tableDataS=[]
                this.tableData = []
                this.tableDataR = []
                this.initTable(e)
                
            }
        },

        methods:{
            //获取数据
            initTable(e){
                //
                //获取排行榜
                gerTop({
                    projectId:e
                }).then((res)=>{
                    if(res.status===200){
                        console.log('获取排行榜成功',res)
                        this.getHouseNum()
                        this.getSalesAmount()
                        this.getRetuenAmount()
                    }
                })
            },
        //排行榜翻页(成交套数)
        getHouseNum(){
            let data = {
                projectId:this.projectId,
                type:'houseNum',
                timeType:this.type,
                pageNum:this.pageNumS,
                pageSize:this.pageSize
            }
            console.log('data',data)
            gerTopPage(data).then((res)=>{
                console.log('翻页排行',res)
               if(res.status===200){
                   let arr = []
                   arr = res.data.pageInfo.list
                    console.log('获取排行榜成功',res.data.pageInfo.list)
                    this.tableData = this.tableData.concat(arr)
                    this.tableDataMe = res.data.me?res.data.me:null
                    console.log('tableData',this.tableData)
                }
            })
        },

        //排行榜翻页(销售金额排行)

        getSalesAmount(){
            let data = {
                projectId:this.projectId,
                type:'signTotalAmount',
                timeType:this.type,
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }
            console.log('data',data)
            gerTopPage(data).then((res)=>{
                console.log('翻页排行',res)
               if(res.status===200){
                    let arr = []
                    console.log('获取排行榜成功',res.data.pageInfo.list)
                    arr = res.data.pageInfo.list
                    this.tableDataS = this.tableDataS.concat(arr)
                    this.tableDataSMe = res.data.me?res.data.me:null
                    console.log('tableDataS',this.tableDataS)
                    
                }
            })
        },

        //排行榜翻页(回款金额排行)

        getRetuenAmount(){
            let data = {
                projectId:this.projectId,
                type:'receivedAmount',
                timeType:this.type,
                pageNum:this.pageNumR,
                pageSize:this.pageSize
            }
            console.log('data',data)
            gerTopPage(data).then((res)=>{
                console.log('翻页排行',res)
               if(res.status===200){
                    console.log('获取排行榜成功',res.data.pageInfo.list)
                    let arr = []
                    arr = res.data.pageInfo.list
                    this.tableDataRMe = res.data.me?res.data.me:null
                    this.tableDataR = this.tableDataR.concat(arr);
                }
            })
        },
        //滚动监听销售金额
         onScrollS(){
            this.$nextTick(() => {
                const el = document.querySelector('.Stop');
                const offsetHeight = el.offsetHeight;
                console.log('翻动',offsetHeight)
                el.onscroll = () => {
                    const scrollTop = el.scrollTop;
                    const scrollHeight = el.scrollHeight;
                    if ((offsetHeight + scrollTop)>scrollHeight) {
                    // 需要执行的代码
                        console.log('1231') 
                        //this.pageNumS++
                        //this.getSalesAmount()             
                    }
                };
                });
            },
            //滚动监听 套数
             onScroll(){
            this.$nextTick(() => {
                const el = document.querySelector('.top');
                const offsetHeight = el.offsetHeight;
                console.log('翻动',offsetHeight)
                el.onscroll = () => {
                    const scrollTop = el.scrollTop;
                    const scrollHeight = el.scrollHeight;
                    if ((offsetHeight + scrollTop)>scrollHeight) {
                    // 需要执行的代码
                        console.log('1231') 
                        //this.pageNum++
                        //this.getHouseNum()             
                    }
                };
                });
            },
            //滚动监听 回款
            onScrollR(){
            this.$nextTick(() => {
                const el = document.querySelector('.Rtop');
                const offsetHeight = el.offsetHeight;
                console.log('翻动',offsetHeight)
                el.onscroll = () => {
                    const scrollTop = el.scrollTop;
                    const scrollHeight = el.scrollHeight;
                    if ((offsetHeight + scrollTop)>scrollHeight) {
                    // 需要执行的代码
                        console.log('1231') 
                        //this.pageNumR++
                        //this.getRetuenAmount()             
                    }
                };
                });
            },

            changeType(){
                 //销售金额
                this.tableDataS=[]
                //销售套数
                this.tableData=[]
                //回款
                this.tableDataR=[]
                this.getHouseNum()
                this.getSalesAmount()
                this.getRetuenAmount()
                
            },

           
        },
        created(){
            
        },
        mounted:function(){
           
        }
    }
</script>

<style lang="scss" scoped>
.col_con{
    border-left: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
}
.height_82{
    height: 64px;
}
.deteBor{
    border: none!important;
}
.lh-82{
    line-height: 64px;
}
.view{
    height:20px;
    line-height:20px;
    text-align: left;
}
.c-r{
    color: #DD0011
}
.bor-btm{
    border-bottom: 1px solid #e5e5e5
}
.box{
    // height: 640px;
    // overflow-y: auto;
}
.bor{
    border-bottom: 1px solid #f5f5f5
}
</style>
>

