<template>
    <div>
        <el-card class="box-card" v-show="!isShow">
            <div slot="header" class="clearfix">
                <span class="title">{{form?form.houseFullName:''}}</span>
                <div style="float: right">
                    <el-button type="success" @click="editHouse" v-has="'prj:house:edit'">编辑</el-button>
                </div>
            </div>
            <div class="text item">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="所属单元:">{{form.unitName}}</el-form-item>
                            <el-form-item label="房间名称:">{{form.houseName}}</el-form-item>
                            <el-form-item label="预售证领取日期:">{{form.preSaleGetDate}}</el-form-item>
                            <el-form-item label="所属户型:">{{form.houseLayoutName}}</el-form-item>
                            <el-form-item label="业态:">{{form.baseFormatName}}</el-form-item>
                            <el-form-item label="建筑面积:"><span class="units">{{form.floorSpace || 0}}m<sup>2</sup></span></el-form-item>
                            <el-form-item label="分摊面积:"><span class="units">{{form.apportionArea || 0}}m<sup>2</sup></span></el-form-item>
                            <el-form-item label="地下室面积:"><span class="units">{{form.basementArea || 0}}m<sup>2</sup></span></el-form-item>
                            <el-form-item label="赠送面积:"><span class="units">{{form.giftArea || 0}}m<sup>2</sup></span></el-form-item>
                            <el-form-item label="预售表总价:">{{form.preTotalPrice || 0}}元</el-form-item>
                            <el-form-item label="预售表单价:">{{form.prePrice || 0}}元</el-form-item>
                            <!-- <el-form-item label="景观:">{{form.sightName}}</el-form-item> -->
                            <el-form-item label="维保期限:">
                                <el-col class="line" :span="2">从</el-col>
                                <el-col :span="10"><el-date-picker type="date" v-model="form.doupBeginDate" style="width: 100%;" disabled></el-date-picker>
                                    <!-- {{form.doupBeginDate}} -->
                                    </el-col>
                                <el-col class="line" :span="2">到</el-col>
                                <el-col :span="10"><el-date-picker type="date" v-model="form.doupEndDate" style="width: 100%;" disabled></el-date-picker>
                                    <!-- {{form.doupEndDate}} -->
                                    </el-col>
                            </el-form-item>
                            <el-form-item label="是否现房:">{{form.isPresent?'是':'否'}}</el-form-item>
                            <!-- <el-form-item label="关联房号:">{{form.houseRelationCode}}</el-form-item> -->
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="房间编号:">{{form.houseCode}}</el-form-item>
                            <el-form-item label="预售证编号:">{{form.preSaleNo}}</el-form-item>
                            <el-form-item label="所处楼层:">{{form.floorName}}
                            </el-form-item>
                            <el-form-item label="房产性质:">{{form.houseKindName}}</el-form-item>
                            <el-form-item label="计价方式:">{{form.priceMethod}}</el-form-item>
                            <el-form-item label="套内面积:"><span class="units">{{form.buildingArea || 0}}m<sup>2</sup></span></el-form-item>
                            <el-form-item label="花园面积:"><span class="units">{{form.gardenArea || 0}}m<sup>2</sup></span></el-form-item>
                            <el-form-item label="天台面积:"><span class="units">{{form.roofArea || 0}}m<sup>2</sup></span></el-form-item>
                            <el-form-item label="预售底单价:">{{form.preMinPrice || 0}}元</el-form-item>
                            <el-form-item label="预售底总价:">{{form.preMinTotalPrice || 0}}元</el-form-item>
                            <el-form-item label="车位属性:">{{form.carTypeText}}</el-form-item>
                            <el-form-item label="朝向:">{{form.orientation}}</el-form-item>
                            <el-form-item label="销售状态:">{{form.houseStatusName}}</el-form-item>
                            <!-- <el-form-item label="是否初始化:">{{form.isInit?'是':'否'}}</el-form-item> -->
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="是否完成竣工或者办理完成初始登记:" >{{form.isCompleteRegistration?'是':'否'}}</el-form-item>
                        </el-col>
                        <el-col :span="12" v-if="form.isCompleteRegistration">
                            <el-form-item label="竣工日期:">
                                <el-date-picker type="date" v-model="form.registrationDate" style="width: 100%;" disabled></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="按揭是否结顶才放款:">{{form.isTopOff?'是':'否'}}</el-form-item>
                        </el-col>
                        <el-col :span="12" v-if="form.isTopOff">
                            <el-form-item label="结顶日期:">
                                <el-date-picker type="date" v-model="form.topOffDate" style="width: 100%;" disabled></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="是否抵押:">{{form.isMortgage?'是':'否'}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row v-if="form.isMortgage">
                        <el-col :span="12">
                            <el-form-item label="抵押日期:">
                                <el-date-picker type="date" v-model="form.mortgageDate" style="width: 100%;" disabled></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="解押日期:">
                                <el-date-picker type="date" v-model="form.releasedMortgageDate" style="width: 100%;" disabled></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-card>
        <component :is="isShow" v-bind:editHouse="form" :format="format" @cloesChild="handleCloesChild"></component>
    </div>
</template>

<script>
import {getHouseInfo} from "@/api/pages/mainPage/plan/house"
import editHouse from './editHouse'
    export default {
        props: {
            val: Object,
            nodeAll: Object
        },
        watch: {
            val() {
                this.handleGetHouseInfo()
            }
        },
        components: {
            'edit-house': editHouse
        },
        methods: {
            // 获取房间详情数据
            handleGetHouseInfo() {
                let params = new URLSearchParams();
                params.append( "id", this.val.id );
                getHouseInfo(params).then(res=>{
                     
                    if( res.status === 200 ){
                        this.form = res.data.house;
                        this.format = res.data.area.formatCode
                    }else{
                        this.$message.error(res.message)
                    }
                    
                })
            },
            editHouse() {
                this.isShow = 'edit-house'
                console.log(this.isShow)
            },
            handleCloesChild() {
                console.log(this.nodeAll)
                this.isShow = '';
                console.log('房间更新树触发了')
                this.$emit('updataTree', this.nodeAll);
                let params2 = new URLSearchParams();
                params2.append( "id", this.val.id );
                this.handleGetHouseInfo(params2);
            }
        },
        created() {
            this.handleGetHouseInfo();
        },
        data() {
            return {
                form: {},
                isShow: '',
                format: ''
            }
        }
    }
</script>

<style scoped>
.units{
	position: relative;
	float: left;
	text-align: center;
}
.units sup{
	position: absolute;
	top: -3px;
	right: -6px;
	transform:scale(0.7);  
}
</style>
