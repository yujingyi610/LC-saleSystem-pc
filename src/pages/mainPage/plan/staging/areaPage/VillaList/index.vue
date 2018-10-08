<template>
    <div>
        <component :is="isShow"  :val="val" :node="node" :nodeAll="nodeAll" :areaInfo="areaInfo" :isImport="isImport" @changeChild="handleChangeChild" @updataTree="handleUpDataTree"></component>
    </div>
</template>

<script>
import {getDevstInfo} from "@/api/pages/mainPage/plan/house"// 获取所在分期的类型是引入的还是自己生成的
import buildList from './list'
import buildView from './view'
    export default {
        props:{
            val: Object,
            node: Object,
            nodeAll: Object,
            areaInfo: Object
        },
        components: {
            buildList,
            buildView
        },
        data() {
            return {
                isShow: 'build-list',
                isImport: false// 判断是引入的分期还是自己生成的分期,true是引入的，false是自己生成的                
            }
        },
        methods: {
            handleChangeChild(show) {
                this.isShow = show;
            },
            handleGetDevsInfo() {// 获取所在分期的类型是引入的还是自己生成的
                let params = new URLSearchParams();
                params.append( "id",this.areaInfo.devstagesId );
                getDevstInfo(params).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.isImport = res.data.type===1?true:false;
                        console.log(this.isImport)
                    }
                })
            },
            handleUpDataTree() {
                console.log('别墅区更新树触发了')
                this.$emit('upDataTree')
            }
        },
        created() {
            this.handleGetDevsInfo();
        }
    }
</script>

<style scoped>

</style>