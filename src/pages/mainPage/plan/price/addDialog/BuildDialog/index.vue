<template>
    <div>
        <el-dialog title="新增调价区域楼栋" :visible.sync="addBuildDialog" width="80%">           
            <el-form :inline="true" :model="addPriceForm">
                <!-- <el-form-item label="分期:">
                    <el-select v-model="addPriceForm.stages" @change="stagesChange">
                        <el-option v-for="item in stagesOption" :key="item.id" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="区域/组团:">
                    <el-select v-model="addPriceForm.region" @change="regChange">
                        <el-option v-for="item in regionOption" :key="item.id" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="计价方式:">
                    <el-select v-model="addPriceForm.valuation">
                        <el-option value="建筑面积"></el-option>
                        <el-option value="套内面积"></el-option>
                        
                        <el-option value="套/个"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="全景计划价格:" label-width="100px">
                    <el-input v-model="addPriceForm.panoramicPlanPrice"  @change="changePanoramicPlanPrice"><i slot="suffix" style="font-style: normal; font-weight: 900">元</i></el-input>
                </el-form-item>
                <el-form-item label="启动会单价:" label-width="100px">
                    <el-input v-model="addPriceForm.kickoffPrice" ><i slot="suffix" style="font-style: normal; font-weight: 900">元</i></el-input>
                </el-form-item>
			</el-form>
            <el-tabs v-if="buildList" type="border-card" tab-position="left" @tab-click="handleChangeTab" style="height: 400px;">
                <el-tab-pane v-for="(item, index) in buildList" :key="index" :label="item.name">
                    <keep-alive>
                        <build-view :build="item" :ref="item.name" :way="valuation"></build-view>
                    </keep-alive>
                </el-tab-pane>
            </el-tabs>
            <div slot="footer" class="dialog-footer">
                <el-button type="success" @click="keepeditBuild">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { 
    getProstages,// 获取分期下拉数据
    getProarea,// 获取区域下拉数据
    getProbuild,// 获取楼栋列表数据
    getKeepbuild,// 保存调价楼栋
    geteditBuildInfor,// 获取编辑楼栋的信息
} from "@/api/pages/mainPage/plan/price/index.js";
import buildView from './buildView'
    export default {
        props: {
            DataInfo: Object,
            priceschemeId: String
        },
        components: {
            buildView
        },
        watch: {
            priceschemeId() {
                this.priceschemeId2 = this.priceschemeId;
            }
        }, 
        computed: {
            valuation() {
                if( this.addPriceForm.valuation === '套内面积' ){
                    return 'buildingArea'
                }else{
                    return 'floorSpace'
                }
            }
        },
        data() {
            return{
                addBuildDialog: false,// 编辑调价区域楼栋弹框
                addPriceForm:{      //新增调价楼栋条件
                    stages: '',   //分期
                    region: '',   //区域
                    valuation: '套内面积',
                    panoramicPlanPrice: '',// 全景计划价格
                    kickoffPrice: '',// 启动会单价
                },
                stagesOption: [],// 分期下拉数据
                regionOption: [],// 区域/组团下拉数据
                buildList: null,// 楼栋数据
                tabChoose: '',// 当前tab
                priceschemeId2: '',// 父组件传进来的ID
                houseIdList: [],// 保存选中的房间ID
                id: null,// 调价区域楼栋ID
                data: null
            }
        },
        methods: {
            show(info) {
                this.buildList = null;
                this.id = null;
                this.houseIdList = [];
                this.tabChoose = '';
                this.addPriceForm.stages = '';
                this.addPriceForm.stagesId = '';
                this.addPriceForm.region = '';
                this.addPriceForm.regionId = '';
                this.addPriceForm.panoramicPlanPrice = '';
                this.addPriceForm.kickoffPrice = '';
                if( info ){
                    
                    this.id = info.id;
                    console.log(info);
                    this.addPriceForm.stages = info.devstagesName;
                    this.addPriceForm.stagesId = info.devstagesId;
                    this.addPriceForm.region = info.areaName;
                    this.addPriceForm.regionId = info.areaId;
                    this.addPriceForm.valuation = info.priceMethod;
                    this.addPriceForm.panoramicPlanPrice = info.panoramicPlanPrice;
                    this.addPriceForm.kickoffPrice = info.kickoffPrice;
                    let id = {
                        id: this.addPriceForm.regionId
                    }
                    getProbuild(id).then(res=>{
                        if(res.status === 200){
                              
                            this.buildList = res.data;
                            this.tabChoose = this.buildList[0].name;
                        }
                    }).then(_=>{
                        geteditBuildInfor({ priceAreaId: info.id }).then(res=>{
                             ;
                            if( res.status === 200 ){
                                console.log(this.$refs[this.tabChoose])
                                this.data = res.data;
                                this.$refs[this.tabChoose][0].handleGetBuildInfo(this.data);
                            }
                        })
                    })
                    
                }
                this.addBuildDialog = true;
                let data = {
                    id: this.DataInfo.devstagesId
                }
                getProarea(data).then(res=>{
                    if(res.status === 200){
                          
                        this.regionOption = res.data;
                    }
                });
            },
            regChange() { // 点击区域同时获取楼栋选项信息
                let length = this.regionOption.length;
                for( let i = 0; i < length; i++ ){
                    if( this.regionOption[i].name === this.addPriceForm.region ){
                    // console.log(this.SelectData.regdata[i].id);
                        let id = {
                            id: this.regionOption[i].id
                        }
                        getProbuild(id).then(res=>{
                            if(res.status === 200){
                                  
                                this.buildList = res.data;
                                if( !this.buildList[0] ){
                                    this.$message.error('该区域无楼栋，请重新选择！')
                                    return
                                }
                                this.tabChoose = this.buildList[0].name;
                                geteditBuildInfor({ priceAreaId: this.priceschemeId2 }).then(res=>{
                                     ;
                                    if( res.status === 200 ){
                                        setTimeout(()=>{
                                            this.$refs[this.tabChoose][0].handleGetBuildInfo(this.data);
                                        }, 500)
                                    }
                                })
                            }
                        })
                    }
                }
            },
            handleChangeTab(tab) {// 切换tab
                if( this.houseIdList.length === 0 ){
                    let idList = [];
                    let buildView = this.$refs[this.tabChoose][0].buildInfo.buildView;
                    buildView.map(floorItem=>{
                        for( let key in floorItem ){
                            if( key !== 'floorName' ){
                                if( floorItem[key] ){
                                    floorItem[key].map(houseItem=>{
                                        if( houseItem.isChecked ){
                                            idList.push({ houseId: houseItem.id })
                                        }
                                    })
                                }
                                
                            }
                        }
                    })
                    this.houseIdList.push({
                        buildName: this.tabChoose,
                        idList
                    })
                }
                let str = JSON.stringify(this.houseIdList);
                let regName = '"buildName":"'+ this.tabChoose + '"';
                if( str.indexOf(regName) === -1 ){
                    let idList = [];
                    let buildView = this.$refs[this.tabChoose][0].buildInfo.buildView;
                    buildView.map(floorItem=>{
                        for( let key in floorItem ){
                            if( key !== 'floorName' ){
                                if( floorItem[key] ){
                                    floorItem[key].map(houseItem=>{
                                        if( houseItem.isChecked ){
                                            idList.push({ houseId: houseItem.id })
                                        }
                                    })
                                }
                                
                            }
                        }
                    })
                    this.houseIdList.push({
                        buildName: this.tabChoose,
                        idList
                    })
                }else{
                    let idList = [];
                    let buildView = this.$refs[this.tabChoose][0].buildInfo.buildView;
                    buildView.map(floorItem=>{
                        for( let key in floorItem ){
                            if( key !== 'floorName' ){
                                if( floorItem[key] ){
                                    floorItem[key].map(houseItem=>{
                                        if( houseItem.isChecked ){
                                            idList.push({ houseId: houseItem.id })
                                        }
                                    })
                                }
                            }
                        }
                    })
                    this.houseIdList.map((item, index)=>{
                        if( item.buildName === this.tabChoose ){
                            let obj = {
                                buildName: this.tabChoose,
                                idList
                            }
                            this.houseIdList.splice(index, 1, obj)
                        }
                    })
                }
                this.tabChoose = tab.label;
                let regName2 = '"buildName":"'+ this.tabChoose + '"';
                if( str.indexOf(regName2) === -1 ){
                    this.$refs[tab.label][0].handleGetBuildInfo(this.data);
                }
                
            },
            keepeditBuild() {//保存
                if( !this.addPriceForm.panoramicPlanPrice ){
                    this.$message.error('请输入全景计划价格！')
                    return
                }
                // this.houseIdList = [];
                let str = JSON.stringify(this.houseIdList);
                let regName = '"buildName":"'+ this.tabChoose + '"';
                if( str.indexOf(regName) === -1 ){
                    let idList = [];
                    let buildView = this.$refs[this.tabChoose][0].buildInfo.buildView;
                    buildView.map(floorItem=>{
                        for( let key in floorItem ){
                            if( key !== 'floorName' ){
                                if( floorItem[key] ){
                                    floorItem[key].map(houseItem=>{
                                        if( houseItem.isChecked ){
                                            idList.push({ houseId: houseItem.id })
                                        }
                                    })
                                }
                                
                            }
                        }
                    })
                    this.houseIdList.push({
                        buildName: this.tabChoose,
                        idList
                    })
                }
                console.log(this.houseIdList)
                console.log(this.buildList)
                // return
                let houseIdArr = [];
                this.houseIdList.map(item=>{
                    let obj = {

                    }
                    this.buildList.map(item2=>{
                        if( item.buildName === item2.name && item.idList.length > 0 ){
                            obj.buildId = item2.buildId;
                            obj.priceHouseDtos = item.idList
                        }
                    })
                    if( obj.buildId ){
                        houseIdArr.push(obj)
                    }
                    
                })
                let areaId = this.$refs[this.tabChoose][0].buildInfo.build.areaId;
                let buildId = this.$refs[this.tabChoose][0].buildInfo.build.id;
                let data = {
                    areaId: areaId,
                    priceSchemeId: this.priceschemeId2,
                    priceMethod: this.addPriceForm.valuation,
                    panoramicPlanPrice: this.addPriceForm.panoramicPlanPrice,
                    kickoffPrice: this.addPriceForm.kickoffPrice,
                    // priceBuildDtos:[{
                    //     buildId: buildId,
                    //     priceHouseDtos: houseIdArr
                    // }],
                    priceBuildDtos: houseIdArr,
                    id: this.id
                    // id: this.priceschemeId2
                }
                getKeepbuild(data).then(res=>{
                     
                    if(res.status === 200){
                        
                        this.$message({
                            type: 'success',
                            message: '保存成功！',
                            showClose: true
                        })
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        })
                    }
                    this.$emit('closeChild');
                    this.addBuildDialog = false;
                })
            },
            changePanoramicPlanPrice() {// 全景价格验证保留两位
                this.addPriceForm.panoramicPlanPrice = parseInt(this.addPriceForm.panoramicPlanPrice)
                

                if( isNaN(this.addPriceForm.panoramicPlanPrice) ){
                    this.$message.error('请输入数字！')
                    this.addPriceForm.panoramicPlanPrice = ''
                    return
                }
                if( this.addPriceForm.panoramicPlanPrice <= 0 ){
                    this.$message.error('全景计划价格必须大于0！')
                    this.addPriceForm.panoramicPlanPrice = ''
                    return
                }
                this.addPriceForm.panoramicPlanPrice = (this.addPriceForm.panoramicPlanPrice).toFixed(2)
            }
        },
        created() {
            this.priceschemeId2 = this.priceschemeId;
            
        }
    }
</script>

<style scoped>

</style>