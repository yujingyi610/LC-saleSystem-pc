<template>
    <div class="editHouse">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{form?form.houseFullName:''}}</span>
                <div style="float: right">
                    <el-button @click="handleClose">取消</el-button>
                    <el-button type="success" @click="handleFinish">完成</el-button>
                </div>
            </div>
            <div class="text item">
                <el-form ref="form" :model="form" label-width="140px">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="所属单元:">{{form.unitName}}
                            </el-form-item>
                            <el-form-item label="房间名称:">
                                <el-input v-model="form.houseName"></el-input>
                            </el-form-item>
                            <el-form-item label="预售证领取日期:">
                                <el-date-picker type="date" v-model="form.preSaleGetDate" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="所属户型:">
                                <el-select v-model="form.houseLayoutName">
                                    <el-option v-for="item in options3" :key="item.layoutName" :label="item.layoutName" :value="item.layoutName"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="业态:">
                                <el-select v-model="form.baseFormatName">
                                    <el-option v-for="item in formatOption" :key="item.id" :label="item.formatName" :value="item.formatName"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="建筑面积:">
                                <span v-if="form.preTotalPrice || form.prePrice || form.preMinPrice || form.preMinTotalPrice" ><span class="units">{{form.floorSpace || 0}}m<sup>2</sup></span></span>
                                <el-input v-else v-model="form.floorSpace"></el-input>
                            </el-form-item>
                            <el-form-item label="分摊面积:">
                                <span v-if="form.preTotalPrice || form.prePrice || form.preMinPrice || form.preMinTotalPrice" ><span class="units">{{form.apportionArea || 0}}m<sup>2</sup></span></span>
                                <el-input v-else v-model="form.apportionArea"></el-input>
                            </el-form-item>
                            <el-form-item label="地下室面积:">
                                <span v-if="form.preTotalPrice || form.prePrice || form.preMinPrice || form.preMinTotalPrice" ><span class="units">{{form.basementArea || 0}}m<sup>2</sup></span></span>
                                <el-input v-else v-model="form.basementArea"></el-input>
                            </el-form-item>
                            <el-form-item label="赠送面积:">
                                <span v-if="form.preTotalPrice || form.prePrice || form.preMinPrice || form.preMinTotalPrice" ><span class="units">{{form.giftArea || 0}}m<sup>2</sup></span></span>
                                <el-input v-else v-model="form.giftArea"></el-input>
                            </el-form-item>
                            <el-form-item label="预售表总价:">{{form.preTotalPrice || 0}}元</el-form-item>
                            <el-form-item label="预售表单价:">{{form.prePrice || 0}}元</el-form-item>
                            <!-- <el-form-item label="景观:">
                                <el-select v-model="form.sightName">
                                        <el-option label="园林景" value="园林景"></el-option>
                                        <el-option label="海景" value="海景"></el-option>
                                </el-select>
                            </el-form-item> -->
                            <el-form-item label="维保期限:">
                                <el-col class="line" :span="2">从</el-col>
                                <el-col :span="10">
                                <el-date-picker type="date" v-model="form.doupBeginDate" style="width: 100%;"></el-date-picker>
                                </el-col>
                                <el-col class="line" :span="2">到</el-col>
                                <el-col :span="10">
                                <el-date-picker type="date" v-model="form.doupEndDate" style="width: 100%;"></el-date-picker>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="是否现房:">
                                <el-select v-model="form.isPresent">
                                    <el-option v-for="(item, index) in isPresentOption" :key="index" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <!-- <el-form-item label="关联房号:">
                                <el-input v-model="form.houseRelationCode"></el-input>
                            </el-form-item> -->
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="房间编号:">{{form.houseCode}}</el-form-item>
                            <el-form-item label="预售证编号:">
                                <el-input v-model="form.preSaleNo"></el-input>
                            </el-form-item>
                            <el-form-item label="所处楼层:">{{form.floorName}}</el-form-item>
                            <el-form-item label="房产性质:">
                                <el-select v-model="form.houseKindName">
                                        <el-option label="商品房" value="商品房"></el-option>
                                        <el-option label="经济适用房" value="经济适用房"></el-option>
                                        <el-option label="房改房" value="房改房"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="计价方式:">{{form.priceMethod}}</el-form-item>
                            <el-form-item label="套内面积:">
                                <span v-if="form.preTotalPrice || form.prePrice || form.preMinPrice || form.preMinTotalPrice" ><span class="units">{{form.buildingArea || 0}}m<sup>2</sup></span></span>
                                <el-input v-else v-model="form.buildingArea"></el-input>
                            </el-form-item>
                            <el-form-item label="花园面积:">
                                <span v-if="form.preTotalPrice || form.prePrice || form.preMinPrice || form.preMinTotalPrice" ><span class="units">{{form.gardenArea || 0}}m<sup>2</sup></span></span>
                                <el-input v-else v-model="form.gardenArea"></el-input>
                            </el-form-item>
                            <el-form-item label="天台面积:">
                                <span v-if="form.preTotalPrice || form.prePrice || form.preMinPrice || form.preMinTotalPrice" ><span class="units">{{form.roofArea || 0}}m<sup>2</sup></span></span>
                                <el-input v-else v-model="form.roofArea"></el-input>
                            </el-form-item>
                            <el-form-item label="预售底单价:">{{form.preMinPrice || 0}}元</el-form-item>
                            <el-form-item label="预售底总价:">{{form.preMinTotalPrice || 0}}元</el-form-item>
                            <el-form-item label="车位属性:">
                                <el-select v-model="form.carTypeText">
                                        <el-option label="无障碍车位" value="无障碍车位"></el-option>
                                        <el-option label="子母车位" value="子母车位"></el-option>
                                        <el-option label="普通车位" value="普通车位"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="朝向:">
                                <el-select v-model="form.orientation">
                                    <el-option label="朝向东" value="朝向东"></el-option>
                                    <el-option label="朝向南" value="朝向南"></el-option>
                                    <el-option label="朝向西" value="朝向西"></el-option>
                                    <el-option label="朝向北" value="朝向北"></el-option>
                                    <el-option label="朝向东南" value="朝向东南"></el-option>
                                    <el-option label="朝向西南" value="朝向西南"></el-option>
                                    <el-option label="朝向东北" value="朝向东北"></el-option>
                                    <el-option label="朝向西北" value="朝向西北"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="销售状态:">{{form.houseStatusName}}</el-form-item>
                            <!-- <el-form-item label="是否初始化:">
                                <el-select v-model="form.isInit">
                                    <el-option v-for="(item, index) in isInitOption" :key="index" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item> -->
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="是否完成竣工或者办理完成初始登记:" >
                                <el-select v-model="form.isCompleteRegistration">
                                    <el-option v-for="(item, index) in isPresentOption" :key="index" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" v-if="form.isCompleteRegistration">
                            <el-form-item label="竣工日期:">
                                <el-date-picker type="date" v-model="form.registrationDate" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="按揭是否结顶才放款:">
                                <el-select v-model="form.isTopOff">
                                   <el-option v-for="(item, index) in isPresentOption" :key="index" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" v-if="form.isTopOff">
                            <el-form-item label="结顶日期:">
                                <el-date-picker type="date" v-model="form.topOffDate" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="是否抵押:">
                                <el-select v-model="form.isMortgage">
                                    <el-option v-for="(item, index) in isPresentOption" :key="index" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row v-if="form.isMortgage">
                        <el-col :span="12">
                            <el-form-item label="抵押日期:">
                                <el-date-picker type="date" v-model="form.mortgageDate" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="解押日期:">
                                <el-date-picker type="date" v-model="form.releasedMortgageDate" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import {upDateHouse, getHouseType, getLevel3} from "@/api/pages/mainPage/plan/house"
    export default {
        props: {
            editHouse: Object,
            format: String
        },
        created() {
            this.form = this.editHouse;
            console.log(this.form);
            console.log(this.format)
            this.handleGetHouseType()
            this.handlegetLevel3()
        },
        methods: {
            handleGetHouseType() {// 获取下拉户型数据
                let params = new URLSearchParams();
                params.append( "areaId", this.form.areaId );
                getHouseType(params).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.options3 = res.data;
                    }
                })
            },
            handlegetLevel3() {
                let params = new URLSearchParams();
                params.append( "parentCode", this.format );
                getLevel3({parentCode: this.format}).then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.formatOption = res.data;
                    }
                })
            },
            handleClose() {
                this.$emit('cloesChild');
            },
            handleFinish() {
                if( !this.form.houseName ){
                    this.$message.error('房间名称不能为空！');
                    return
                }
                let dataList = [];
                this.formatOption.map(item=>{
                    if( item.formatName === this.form.baseFormatName ){
                         
                        this.form.baseFormatCode = item.formatCode;
                        this.form.formatId = item.id;
                    }
                })
                console.log(this.form)
                dataList.push(this.form)
                upDateHouse(dataList).then(res=>{
                     
                    if( res.status === 200 ){
                        this.$message({
                            type: 'success',
                            message: '保存成功！'
                        })
                        this.$emit('cloesChild');
                    }else{
                        this.$message.error(res.message)
                    }
                    
                })

            }
        },
        data() {
            return {
                form: {},
                isInitOption: [{
                    label: '是',
                    value: 0
                },{
                    label: '否',
                    value: 1
                }],
                isPresentOption: [{
                    label: '是',
                    value: 1
                },{
                    label: '否',
                    value: 0
                }],
                options3: [],
                formatOption: []
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
