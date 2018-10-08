<template>
    <div>
        <!-- 折扣信息 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="title">折扣信息</span>
                <div style="float: right"><span class="title_text">折扣计价方式:<span>{{priceType}}</span></span></div>
            </div>
            <el-table ref="multipleTable" :data="DiscountInfo" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" row-key="discountId">
                <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
                <el-table-column prop="discountName" label="折扣名称"></el-table-column>
                <el-table-column prop="discountType" label="折扣类型"></el-table-column>
                <el-table-column prop="discountMethod" label="优惠方式"></el-table-column>
                <el-table-column prop="discountItem" label="折扣详情">
                    <template slot-scope="scope">
                        {{scope.row.discountItem}}{{scope.row.discountMethod === '比例优惠'?'%':'元'}}
                    </template>
                </el-table-column>
            </el-table>
            <el-form :inline="true">
                <el-form-item label="是否工抵">
                    <el-switch v-model="switchFlag" active-color="#13ce66" @change="handleChangeTable"></el-switch>
                </el-form-item>
                <!-- <el-form-item label="城市公司" v-if="switchFlag">
                    <el-select v-model="company.city" value-key="id">
                        <el-option v-for="(item, index) in cityOption" :key="index" :label="item.name" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目公司" v-if="switchFlag">
                    <el-select v-model="company.company" value-key="id">
                        <el-option v-for="(item, index) in companyOption" :key="index" :label="item.orgUnitName" :value="item"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="项目公司" v-if="switchFlag">
                    {{company.company}}
                </el-form-item>
                <el-form-item label="工抵金额" v-if="switchFlag">
                    <el-input v-model="payCreditAmount" @blur="handlePrice('payCreditAmount')"></el-input>
                </el-form-item>
            </el-form>
            <el-form :inline="true">
                <el-form-item label="是否房票">
                    <el-switch v-model="switchFlag3" active-color="#13ce66" @change="handleChangeTable"></el-switch>
                </el-form-item>
                <el-form-item label="房票金额" v-if="switchFlag3">
                    <el-input v-model="ticketPrice" @blur="handlePrice('ticketPrice')"></el-input>
                </el-form-item>
            </el-form>
            <!-- <div style="overflow: hidden">
                <span class="title_text">是否有特殊折扣:{{switchFlag2?'是':'否'}}</span>
            </div>
            <el-table :data="BuyStamps" style="width: 100%" v-if="switchFlag2">
                <el-table-column type="index" label="序号" width="55"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column label="手机号码">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.tel"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="code" label="优惠券号"></el-table-column>
                <el-table-column prop="price" label="使用金额（元）"></el-table-column>
            </el-table> -->
            <div style="overflow: hidden">
                <div style="float: left">
                    <span>总价直减:</span>
                    <el-input v-model="beautifyTotalPrice" @change="handleBeautifyPrice"></el-input> 
                </div>
                <div style="float: right; line-height: 40px">
                    <span class="title_text">总折扣:{{ChangeTotalDiscount}}元</span>
                </div>
            </div>
            <div style="overflow: hidden">
                <span class="form_bottom">签约单价:<span>{{ChangePrice}}元</span></span>
                <span class="form_bottom">签约总价:<span>{{ChangeTotalprice}}元</span></span>
                <span class="form_bottom">合同金额大写:<span>{{ChangeTotalprice | PriceInWords}}</span></span>
                <span class="form_bottom">是否破底:<span>{{ChangeIsBroken}}</span></span>
            </div>
        </el-card>
        <!-- 付款信息 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="title">付款信息</span>
            </div>
            <el-form :inline="true">
                <el-form-item label="付款方式">
                    <el-select v-model="Payment">
                        <el-option v-for="(item, index) in PaymentOption" :key="index" :label="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <!-- 一次性付款 -->
            <div v-if="Payment === '一次性付款'">
                <el-table :data="table11" border style="width: 100%; margin-bottom: 20px">
                    <el-table-column prop="name" label="款项"></el-table-column>
                    <el-table-column prop="price" label="应收金额">
                        <template slot-scope="scope">
                            <span v-if="scope.row.name === '工抵'">
                                {{scope.row.price}}
                            </span>
                            <span v-else-if="scope.row.name.indexOf('房票') !== -1">
                                {{scope.row.price}}
                            </span>
                            <span v-else>
                                {{scope.row.price}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="应收日期" width="180">
                        <template slot-scope="scope">
                            <span v-if="scope.row.name.indexOf('房票') !== -1">
                                <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px" disabled></el-date-picker>
                            </span>
                            <span v-else-if="scope.row.name === '一次性付款'">
                                <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px" @change="handleChangeTicketNum('table11')"></el-date-picker>
                            </span>
                            <span v-else>
                                <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px"></el-date-picker>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否工行">
                        <template slot-scope="scope">
                            <span>--</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="银行/单位">
                        <template slot-scope="scope">
                            <span>--</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="已收金额">
                        <template slot-scope="scope">
                            0
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" label="未收金额"></el-table-column>
                </el-table>
            </div>
            <!-- 商业贷款 -->
            <el-table v-else-if="Payment === '商业贷款'" :data="table21" border style="width: 100%; margin-bottom: 20px">
                <el-table-column prop="name" label="款项"></el-table-column>
                <el-table-column prop="price" label="应收金额">
                    <template slot-scope="scope">
                        <span v-if="scope.row.name === '工抵'">
                            {{scope.row.price}}
                        </span>
                        <span v-else-if="scope.row.name.indexOf('房票') !== -1">
                            {{scope.row.price}}
                        </span>
                        <span v-else>
                            <el-input v-model="scope.row.price" @change="handleChangeNum2(scope.row, scope.$index, 'true')"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="应收日期" width="180">
                    <template slot-scope="scope">
                        <span v-if="scope.row.name.indexOf('房票') !== -1">
                            <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px" disabled></el-date-picker>
                        </span>
                        <span v-else-if="scope.row.name === '首付款'">
                            <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px" @change="handleChangeTicketNum('table21')"></el-date-picker>
                        </span>
                        <span v-else>
                            <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px"></el-date-picker>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="是否工行">
                    <template slot-scope="scope">
                        <span v-if="scope.row.name.indexOf('房票') !== -1">--</span>
                        <span v-else-if="scope.row.name === '首付款' || scope.row.name === '工抵'">--</span>
                        <span v-else>
                            <el-switch v-model="scope.row.icbcFlag" active-color="#13ce66" @change="handleChangeIsICBC2(scope.row, scope.$index)"></el-switch>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="bank" label="银行/单位">
                    <template slot-scope="scope">
                        <span v-if="scope.row.name.indexOf('房票') !== -1">--</span>
                        <span v-else-if="scope.row.name === '首付款' || scope.row.name === '工抵'">--</span>
                        <span v-else>
                            <el-cascader :options="bankOptionUse" :show-all-levels="false" v-model="scope.row.bank" :props="bankProps"></el-cascader>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="已收金额">
                    <template slot-scope="scope">
                        0
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="未收金额"></el-table-column>
            </el-table>
            <!-- 公积金贷款 -->
            <el-table v-else-if="Payment === '公积金贷款'" :data="table31" border style="width: 100%; margin-bottom: 20px">
                <el-table-column prop="name" label="款项"></el-table-column>
                <el-table-column prop="price" label="应收金额">
                    <template slot-scope="scope">
                        <span v-if="scope.row.name === '工抵'">
                            {{scope.row.price}}
                        </span>
                        <span v-else-if="scope.row.name.indexOf('房票') !== -1">
                            {{scope.row.price}}
                        </span>
                        <span v-else>
                            <el-input v-model="scope.row.price" @change="handleChangeNum3(scope.row, scope.$index, 'true')"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="应收日期" width="180">
                    <template slot-scope="scope">
                        <span v-if="scope.row.name.indexOf('房票') !== -1">
                            <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px" disabled></el-date-picker>
                        </span>
                        <span v-else-if="scope.row.name === '首付款'">
                            <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px" @change="handleChangeTicketNum('table31')"></el-date-picker>
                        </span>
                        <span v-else>
                            <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px"></el-date-picker>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="是否工行">
                    <template slot-scope="scope">
                        <span v-if="scope.row.name.indexOf('房票') !== -1">--</span>
                        <span v-else-if="scope.row.name === '首付款' || scope.row.name === '工抵'">--</span>
                        <span v-else>
                            <el-switch v-model="scope.row.icbcFlag" active-color="#13ce66" @change="handleChangeIsICBC3(scope.row, scope.$index)"></el-switch>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="bank" label="银行/单位">
                    <template slot-scope="scope">
                        <span v-if="scope.row.name.indexOf('房票') !== -1">--</span>
                        <span v-else-if="scope.row.name === '首付款' || scope.row.name === '工抵'">--</span>
                        <span v-else>
                            <el-cascader :options="bankOptionUse" :show-all-levels="false" v-model="scope.row.bank" :props="bankProps"></el-cascader>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="已收金额">
                    <template slot-scope="scope">
                        0
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="未收金额"></el-table-column>
            </el-table>
            <!-- 组合贷款 -->
            <el-table v-else-if="Payment === '组合贷款'" :data="table51" border style="width: 100%; margin-bottom: 20px">
                <el-table-column prop="name" label="款项"></el-table-column>
                <el-table-column prop="price" label="应收金额">
                    <template slot-scope="scope">
                        <span v-if="scope.row.name === '工抵'">
                            {{scope.row.price}}
                        </span>
                        <span v-else-if="scope.row.name.indexOf('房票') !== -1">
                            {{scope.row.price}}
                        </span>
                        <span v-else>
                            <el-input v-model="scope.row.price" @change="handleChangeNum5(scope.row, scope.$index, 'true')"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="应收日期" width="180">
                    <template slot-scope="scope">
                        <span v-if="scope.row.name.indexOf('房票') !== -1">
                            <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px" disabled></el-date-picker>
                        </span>
                        <span v-else-if="scope.row.name === '首付款'">
                            <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px" @change="handleChangeTicketNum('table51')"></el-date-picker>
                        </span>
                        <span v-else>
                            <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px"></el-date-picker>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="是否工行">
                    <template slot-scope="scope">
                        <span v-if="scope.row.name.indexOf('房票') !== -1">--</span>
                        <span v-else-if="scope.row.name === '首付款' || scope.row.name === '工抵'">--</span>
                        <span v-else>
                            <el-switch v-model="scope.row.icbcFlag" active-color="#13ce66" @change="handleChangeIsICBC5(scope.row, scope.$index)"></el-switch>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="bank" label="银行/单位">
                    <template slot-scope="scope">
                        <span v-if="scope.row.name.indexOf('房票') !== -1">--</span>
                        <span v-else-if="scope.row.name === '首付款' || scope.row.name === '工抵'">--</span>
                        <span v-else-if="scope.row.name === '按揭款'">
                            <el-cascader :options="bankOptionUse" :show-all-levels="false" v-model="scope.row.bank" :props="bankProps"></el-cascader>
                        </span>
                        <span v-else-if="scope.row.name === '公积金'">
                            <el-cascader :options="bankOptionUse2" :show-all-levels="false" v-model="scope.row.bank" :props="bankProps"></el-cascader>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="已收金额">
                    <template slot-scope="scope">
                        0
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="未收金额"></el-table-column>
            </el-table>
            <!-- 分期付款 -->
            <el-table v-else-if="Payment === '分期付款'" :data="table41" border style="width: 100%; margin-bottom: 20px">
                <el-table-column prop="name" label="款项"></el-table-column>
                <el-table-column prop="price" label="应收金额">
                    <template slot-scope="scope">
                        <span v-if="scope.row.name === '工抵'">
                            {{scope.row.price}}
                        </span>
                        <span v-else>
                            <el-input v-model="scope.row.price" @change="handleChangeNum4(scope.row, scope.$index, 'true')"></el-input>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="应收日期" width="180">
                    <template slot-scope="scope">
                        <span v-if="scope.row.name.indexOf('房票') !== -1">
                            <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px" disabled></el-date-picker>
                        </span>
                        <span v-else-if="scope.row.name === '工抵'">
                            <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px"></el-date-picker>
                        </span>
                        <span v-else>
                            <el-date-picker v-model="scope.row.date" align="right" type="date" placeholder="选择日期" style="width: 140px" @change="handleChangeTicketNum('table41')"></el-date-picker>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="bank" label="是否工行">
                    <template slot-scope="scope">
                        --
                    </template>
                </el-table-column>
                <el-table-column prop="bank" label="银行/单位">
                    <template slot-scope="scope">
                        --
                    </template>
                </el-table-column>
                <el-table-column label="已收金额">
                    <template slot-scope="scope">
                        0
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="未收金额"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import {getHouse, getBank, saveAdd, sendTrdSign} from '@/api/pages/mainPage/transactionManagement/contractManagement'

    export default {
        computed: {
            ChangePrice() {// 签约单价
                if( this.houseInfo ){
                    if( this.ChangeTotalprice && this.houseInfo.priceArea ){
                        return (this.ChangeTotalprice/this.houseInfo.priceArea).toFixed(2) || 0
                    }else{
                         return 0
                    }
                    
                }else{
                    return 0
                }
            },
            ChangeTotalprice() {// 签约总价
                if( this.houseInfo ){
                    let price = 0;
                    if( this.houseInfo.preTotalPrice - this.ChangeTotalDiscount > 0 ){
                        price = Number(this.houseInfo.preTotalPrice - this.ChangeTotalDiscount).toFixed(2)
                    }else{
                        price = 0;
                    }
                    this.table11.map(item=>{
                        if( item.name === '一次性付款' ){
                            item.price = Number(price - (this.switchFlag?this.payCreditAmount:0) - (this.switchFlag3?this.ticketPrice:0)).toFixed(2) || 0;
                        }
                    })
                    
                    return price || 0
                }else{
                    // this.table11[0].price = '';
                    return 0
                }
            },
            ChangeTotalDiscount() {// 总折扣
                
                let priceList = [];// 单价优惠的列表
                let totalPricesList = [];// 总价优惠的列表
                let discountList = [];// 比例优惠的列表
                if( this.houseInfo ){
                    let totalDiscountPrice = this.houseInfo.preTotalPrice;
                    this.multipleSelection.map(item=>{// 遍历已选中的折扣方式，将三种折扣方式分别存储
                        if( item.discountMethod === '比例优惠' ){ discountList.push(item) }
                        else if( item.discountMethod === '单价优惠' ){ priceList.push(item) }
                        else if( item.discountMethod === '总价优惠' ){ totalPricesList.push(item) }
                    })
                    if( this.priceType === '先单价后总价再折扣' ){
                        priceList.map(item=>{ totalDiscountPrice -= item.discountItem*this.houseInfo.priceArea; })// 单价
                        totalPricesList.map(item=>{ totalDiscountPrice -= item.discountItem; })// 总价
                        discountList.map(item=>{ totalDiscountPrice = totalDiscountPrice*item.discountItem*0.01 })// 折扣
                    }else if( this.priceType === '先单价后折扣再总价' ){
                        priceList.map(item=>{ totalDiscountPrice -= item.discountItem*this.houseInfo.priceArea; })// 单价
                        discountList.map(item=>{ totalDiscountPrice = totalDiscountPrice*item.discountItem*0.01 })// 折扣
                        totalPricesList.map(item=>{ totalDiscountPrice -= item.discountItem; })// 总价
                    }else if( this.priceType === '先总价后折扣再单价' ){
                        totalPricesList.map(item=>{ totalDiscountPrice -= item.discountItem; })// 总价
                        discountList.map(item=>{ totalDiscountPrice = totalDiscountPrice*item.discountItem*0.01 })// 折扣
                        priceList.map(item=>{ totalDiscountPrice -= item.discountItem*this.houseInfo.priceArea; })// 单价
                    }else if( this.priceType === '先总价后单价再折扣' ){
                        totalPricesList.map(item=>{ totalDiscountPrice -= item.discountItem; })// 总价
                        priceList.map(item=>{ totalDiscountPrice -= item.discountItem*this.houseInfo.priceArea; })// 单价
                        discountList.map(item=>{ totalDiscountPrice = totalDiscountPrice*item.discountItem*0.01 })// 折扣
                    }else if( this.priceType === '先折扣后单价再总价' ){
                        discountList.map(item=>{ totalDiscountPrice = totalDiscountPrice*item.discountItem*0.01 })// 折扣
                        priceList.map(item=>{ totalDiscountPrice -= item.discountItem*this.houseInfo.priceArea; })// 单价
                        totalPricesList.map(item=>{ totalDiscountPrice -= item.discountItem; })// 总价
                    }else if( this.priceType === '先折扣后总价再单价' ){
                        discountList.map(item=>{ totalDiscountPrice = totalDiscountPrice*item.discountItem*0.01 })// 折扣
                        totalPricesList.map(item=>{ totalDiscountPrice -= item.discountItem; })// 总价
                        priceList.map(item=>{ totalDiscountPrice -= item.discountItem*this.houseInfo.priceArea; })// 单价
                    }
                    this.BuyStamps.map(item=>{// 遍历购房券
                        totalDiscountPrice -= item.price;
                    })
                    totalDiscountPrice -= this.beautifyTotalPrice;
                    return (this.houseInfo.preTotalPrice - totalDiscountPrice).toFixed(2);
                }else{
                    return 0
                }
                
            },
            ChangeIsBroken() {// 是否破底
                if( this.houseInfo ){
                    if( this.totalprice < this.houseInfo.preMinTotalPrice ){
                        return '是'
                    }else{
                        return '否'
                    }
                }else{
                    return '否'
                }
            }
        },
        watch: {
            payCreditAmount(e) {
                 
                if( e >= this.ChangeTotalprice - (this.switchFlag3?this.ticketPrice:0)){
                    e = this.ChangeTotalprice - (this.switchFlag3?this.ticketPrice:0);
                }
                if( this.switchFlag ){
                    this.table11.map(item=>{
                        if( item.name === '工抵' ){
                            item.price = e;
                        }
                    })
                    this.table21.map(item=>{
                        if( item.name === '工抵' ){
                            item.price = e;
                        }
                    })
                    this.table31.map(item=>{
                        if( item.name === '工抵' ){
                            item.price = e;
                        }
                    })
                    this.table41.map(item=>{
                        if( item.name === '工抵' ){
                            item.price = e;
                        }
                    })
                    this.table51.map(item=>{
                        if( item.name === '工抵' ){
                            item.price = e;
                        }
                    })
                }
                this.handleChangeTable()
            },
            ticketPrice(e) {
                 
                if( e >= this.ChangeTotalprice - (this.switchFlag?this.payCreditAmount:0)){
                    e = this.ChangeTotalprice - (this.switchFlag?this.payCreditAmount:0);
                }
                if( this.switchFlag3 ){
                    this.table11.map(item=>{
                        if( item.name === '房票' ){
                            item.price = e;
                        }
                    })
                    this.table21.map(item=>{
                        if( item.name === '房票' ){
                            item.price = e;
                        }
                    })
                    this.table31.map(item=>{
                        if( item.name === '房票' ){
                            item.price = e;
                        }
                    })
                    this.table51.map(item=>{
                        if( item.name === '房票' ){
                            item.price = e;
                        }
                    })
                }
                this.handleChangeTable()
            },
            ChangeTotalprice() {
                this.handleChangeTable()
            }
        },
        data() {
            return{
                code: '',// 合同编号
                signDate: '',// 签约日期
                /*********房间信息*********/
                houseInfo: null,
                /************客户信息*************/
                userTable: [],// table
                newUserTable: [],// 新
                cardTypeOpiton: [],
                sexOpiton: [{// 性别
                    value: '男'
                },{
                    value: '女'
                }],
                /************折扣信息**************/
                switchFlag: false,// 是否工抵
                company: {// 工抵项目公司
                    name: '',
                    id: '',
                    company: null
                },
                payCreditAmount: 0,// 工抵金额
                switchFlag3: true,// 是否房票
                ticketPrice: 0,// 房票金额
                priceType: '',// 折扣计价方式
                DiscountInfo: [],// 折扣信息
                payTable: [],
                Payment: '一次性付款',
                PaymentOption: [
                    {value: '一次性付款'},
                    {value: '商业贷款'},
                    {value: '公积金贷款'},
                    {value: '分期付款'},
                    {value: '组合贷款'}
                ],
                /***********购房券**************/
                switchFlag2: false,// 是否有购房券
                BuyStamps: [],// 购房券列表
                beautifyTotalPrice: '',// 美化金额

                accessoryTable: [],// 附件table,
                postData: null,// 发送给后台的数据
                remark: '',// 备注
                totalprice: '',// 签约总价
                price: '',// 签约单价
                totalDiscount: '',// 总折扣
                isBroken: '',// 是否破底
                redactFlag: null,
                multipleSelection: [],// 所选中的折扣方式
                table11: [],
                table21: [],
                table31: [],
                table41: [],
                table51: [],
                bankOption: [],// 银行数据
                bankOption1: [],// 工商银行数据
                bankOption2: [],// 非银行数据
                bankOptionUse: [],// 所用银行数据
                bankOptionUse2: [],
                bankProps: {// 银行级联配置参数
                    value: 'name',
                    label: 'name',
                },
                table1: [// 一次性付款
                    {
                        name: '工抵',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    },{
                        name: '房票',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    },{
                        name: '一次性付款',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    }
                ],
                table2: [// 商业贷款
                    {
                        name: '工抵',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    },{
                        name: '房票',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    },{
                        name: '首付款',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行
                        bank: [],// 银行/单位
                    },{// 商业贷款
                        name: '按揭款',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行                    
                        bank: [],// 银行/单位
                    }
                ],
                table3: [// 公积金贷款
                    {
                        name: '工抵',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    },{
                        name: '房票',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    },{
                        name: '首付款',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行     
                        bank: [],// 银行/单位
                    },{
                        name: '公积金',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行    
                        bank: [],// 银行/单位
                    }
                ],
                table4: [// 分期付款
                    {
                        name: '工抵',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    },{
                        name: '一期款房票',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    },{
                        name: '一期款',// 款项名称
                        price: '',// 应收金额
                        icbcFlag: false,// 是否工行 
                        date: '',// 应收日期
                        bank: [],// 银行/单位
                    },{
                        name: '二期款房票',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    },{// 分期付款
                        name: '二期款',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行    
                        bank: [],// 银行/单位
                    },{
                        name: '三期款房票',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    },{// 分期付款
                        name: '三期款',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行    
                        bank: [],// 银行/单位
                    },{
                        name: '四期款房票',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    },{// 分期付款
                        name: '四期款',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行   
                        bank: [],// 银行/单位
                    },{
                        name: '五期款房票',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    },{// 分期付款
                        name: '五期款',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行    
                        bank: [],// 银行/单位
                    }
                ],
                table5: [// 组合贷款
                    {
                        name: '工抵',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    },{
                        name: '房票',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行 
                        bank: [],// 银行/单位
                    },{
                        name: '首付款',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行    
                        bank: [],// 银行/单位
                    },{// 组合贷款
                        name: '按揭款',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行   
                        bank: [],// 银行/单位
                    },{// 组合贷款
                        name: '公积金',// 款项名称
                        price: '',// 应收金额
                        date: '',// 应收日期
                        icbcFlag: false,// 是否工行    
                        bank: [],// 银行/单位
                    }
                ],
                data: null
            }
        },
        methods: {
            handlePayInfo(data) {
                getHouse({ houseId: this.houseInfo.houseId }).then(res=>{
                     
                    if( res.status === 200 ){
                        if( res.data.relDtos ){
                            this.DiscountInfo = res.data.relDtos;
                            data.discounts.map(i=>{
                                this.$refs.multipleTable.toggleRowSelection(this.DiscountInfo.find(d=>d.discountId === i.discountId),true);
                            })
                        }
                    }
                })
            },
            handleSelectionChange(val) {// 选择折扣方式
                this.multipleSelection = val;
            },
            handleBeautifyPrice() {
                this.beautifyTotalPrice = Number(this.beautifyTotalPrice).toFixed(2);
            },
            handleChangeTable() {// 工抵、房票改变，付款table展示改变
                this.ticketPrice = this.switchFlag3?this.ticketPrice:0;
                this.payCreditAmount = this.switchFlag?this.payCreditAmount:0;
                this.table11.map(item=>{
                    if( item.name === '房票' ){
                        item.price = this.ticketPrice;
                    }else if( item.name === '工抵' ){
                        item.price = this.payCreditAmount;
                    }
                })
                this.table21.map(item=>{
                    if( item.name === '房票' ){
                        item.price = this.ticketPrice;
                    }else if( item.name === '工抵' ){
                        item.price = this.payCreditAmount;
                    }
                })
                this.table31.map(item=>{
                    if( item.name === '房票' ){
                        item.price = this.ticketPrice;
                    }else if( item.name === '工抵' ){
                        item.price = this.payCreditAmount;
                    }
                })
                this.table41.map(item=>{
                    if( item.name === '工抵' ){
                        item.price = this.payCreditAmount;
                    }
                })
                this.table51.map(item=>{
                    if( item.name === '房票' ){
                        item.price = this.ticketPrice;
                    }else if( item.name === '工抵' ){
                        item.price = this.payCreditAmount;
                    }
                })

                this.table11 = [];
                this.table21 = [];
                this.table31 = [];
                this.table41 = [];
                this.table51 = [];
                if( this.switchFlag && this.switchFlag3 ){
                    this.table11 = this.table1.map(item=>{
                        return item;
                    })
                    this.table21 = this.table2.map(item=>{
                        return item;
                    })
                    this.table31 = this.table3.map(item=>{
                        return item;
                    })
                    this.table41 = this.table4.map(item=>{
                        return item;
                    })
                    this.table51 = this.table5.map(item=>{
                        return item;
                    })
                }else if( !this.switchFlag && this.switchFlag3 ){
                    this.table1.map(item=>{
                        if( item.name !== '工抵' ){
                            this.table11.push(item)
                        }
                    })
                    this.table2.map(item=>{
                        if( item.name !== '工抵' ){
                            this.table21.push(item)
                        }
                    })
                    this.table3.map(item=>{
                        if( item.name !== '工抵' ){
                            this.table31.push(item)
                        }
                    })
                    this.table4.map(item=>{
                        if( item.name !== '工抵' ){
                            this.table41.push(item)
                        }
                    })
                    this.table5.map(item=>{
                        if( item.name !== '工抵' ){
                            this.table51.push(item)
                        }
                    })
                }else if( this.switchFlag && !this.switchFlag3 ){
                    this.table1.map(item=>{
                        if( item.name.indexOf('房票') === -1 ){
                            this.table11.push(item)
                        }
                    })
                    this.table2.map(item=>{
                        if( item.name.indexOf('房票') === -1 ){
                            this.table21.push(item)
                        }
                    })
                    this.table3.map(item=>{
                        if( item.name.indexOf('房票') === -1 ){
                            this.table31.push(item)
                        }
                    })
                    this.table4.map(item=>{
                        if( item.name.indexOf('房票') === -1 ){
                            this.table41.push(item)
                        }
                    })
                    this.table5.map(item=>{
                        if( item.name.indexOf('房票') === -1 ){
                            this.table51.push(item)
                        }
                    })
                }else{
                    this.table1.map(item=>{
                        if( item.name.indexOf('房票') === -1 && item.name !== '工抵' ){
                            this.table11.push(item)
                        }
                    })
                    this.table2.map(item=>{
                        if( item.name.indexOf('房票') === -1 && item.name !== '工抵' ){
                            this.table21.push(item)
                        }
                    })
                    this.table3.map(item=>{
                        if( item.name.indexOf('房票') === -1 && item.name !== '工抵' ){
                            this.table31.push(item)
                        }
                    })
                    this.table4.map(item=>{
                        if( item.name.indexOf('房票') === -1 && item.name !== '工抵' ){
                            this.table41.push(item)
                        }
                    })
                    this.table5.map(item=>{
                        if( item.name.indexOf('房票') === -1 && item.name !== '工抵' ){
                            this.table51.push(item)
                        }
                    })
                } 
                if( this.Payment === '一次性付款' ){
                    this.table11[this.table11.length - 1].price = Number(this.ChangeTotalprice - this.payCreditAmount - this.ticketPrice).toFixed(2);
                }else if( this.Payment === '商业贷款' ){
                    this.handleChangeNum2(this.table21[this.table21.length - 1], this.table21.length - 1)
                }else if( this.Payment === '公积金贷款' ){
                    this.handleChangeNum3(this.table31[this.table31.length - 1], this.table31.length - 1)
                }else if( this.Payment === '分期付款' ){
                    this.handleChangeNum4(this.table41[this.table41.length - 1], this.table41.length - 1)
                }
                else if( this.Payment === '组合贷款' ){
                    this.handleChangeNum5(this.table51[this.table51.length - 1], this.table51.length - 1)
                }
                
            },  
            handlePrice(priceName) {// 工抵、房票改变，判断最大值
                this[priceName] = Number(this[priceName])
                if( priceName === 'ticketPrice' ){
                    if( this[priceName] >= this.ChangeTotalprice - (this.switchFlag?this.payCreditAmount:0)){
                        this[priceName] = this.ChangeTotalprice - (this.switchFlag?this.payCreditAmount:0);
                    }
                    
                }else{
                    if( this[priceName] >= this.ChangeTotalprice - (this.switchFlag?this.ticketPrice:0)){
                        this[priceName] = this.ChangeTotalprice - (this.switchFlag?this.ticketPrice:0);
                    }
                }
                this[priceName] = this[priceName].toFixed(2)
            },
            handleChangeTicketNum(tableName) {// 改变首付款时间，房票时间动态改变
                let date = null;
                if( tableName === 'table41' ){
                    for( let i = 0; i < this[tableName].length; i++ ){
                        if( this[tableName][i].name === '一期款' ){
                            for( let j = 0; j < this[tableName].length; j++ ){
                                if( this[tableName][j].name === this[tableName][i].name + '房票' ){
                                    this[tableName][j].date = this[tableName][i].date;
                                }
                            }
                        }
                        if( this[tableName][i].name === '二期款' ){
                            for( let j = 0; j < this[tableName].length; j++ ){
                                if( this[tableName][j].name === this[tableName][i].name + '房票' ){
                                    this[tableName][j].date = this[tableName][i].date;
                                }
                            }
                        }
                        if( this[tableName][i].name === '三期款' ){
                            for( let j = 0; j < this[tableName].length; j++ ){
                                if( this[tableName][j].name === this[tableName][i].name + '房票' ){
                                    this[tableName][j].date = this[tableName][i].date;
                                }
                            }
                        }
                        if( this[tableName][i].name === '四期款' ){
                            for( let j = 0; j < this[tableName].length; j++ ){
                                if( this[tableName][j].name === this[tableName][i].name + '房票' ){
                                    this[tableName][j].date = this[tableName][i].date;
                                }
                            }
                        }
                        if( this[tableName][i].name === '五期款' ){
                            for( let j = 0; j < this[tableName].length; j++ ){
                                if( this[tableName][j].name === this[tableName][i].name + '房票' ){
                                    this[tableName][j].date = this[tableName][i].date;
                                }
                            }
                        }
                    }
                    return
                }
                this[tableName].map(item=>{
                    if( item.name === '一次性付款' || item.name === '首付款' ){
                        date = item.date; 
                    }
                })
                this[tableName].map(item=>{
                    if( item.name.indexOf('房票') !== -1 ){
                        item.date = date; 
                    }
                })
            },
            handleChangeIsICBC2(row, index) {// 改变是否工行，更换银行数据(商业贷款)
                 
                this.table21[index].bank = [];
                if( row.icbcFlag ){
                    this.bankOptionUse = this.bankOption1;
                }else{
                    this.bankOptionUse = this.bankOption2;
                }
            },
            handleChangeIsICBC3(row, index) {// 改变是否工行，更换银行数据(公积金贷款)
                 
                this.table31[index].bank = [];
                if( row.icbcFlag ){
                    this.bankOptionUse = this.bankOption1;
                }else{
                    this.bankOptionUse = this.bankOption2;
                }
            },
            handleChangeIsICBC5(row, index) {// 改变是否工行，更换银行数据(组合贷款)
                 
                this.table51[index].bank = [];
                if( row.name === '按揭款' ){
                    if( row.icbcFlag ){
                        this.bankOptionUse = this.bankOption1;
                    }else{
                        this.bankOptionUse = this.bankOption2;
                    }
                }else if( row.name === '公积金' ){
                    if( row.icbcFlag ){
                        this.bankOptionUse2 = this.bankOption1;
                    }else{
                        this.bankOptionUse2 = this.bankOption2;
                    }
                }
                
            },
            handleChangeNum2(row, index, flag) {// 改变一个价格，另一个价格随之改变(商业贷款)
                if( flag ){
                    if( row.name === '首付款' ){
                        this.table21[index+1].price = Number(this.ChangeTotalprice - this.payCreditAmount - this.ticketPrice - row.price).toFixed(2);
                    }else if( row.name === '按揭款' ){
                        this.table21[index-1].price = Number(this.ChangeTotalprice - this.payCreditAmount - this.ticketPrice - row.price).toFixed(2);
                    }
                    this.table21[index].price = Number(this.table21[index].price).toFixed(2)
                }
            },
            handleChangeNum3(row, index, flag) {// 改变一个价格，另一个价格随之改变(公积金贷款)
                if( flag ){
                    if( row.name === '首付款' ){
                        this.table31[index+1].price = Number(this.ChangeTotalprice - this.payCreditAmount - this.ticketPrice - row.price).toFixed(2);
                    }else if( row.name === '公积金' ){
                        this.table31[index-1].price = Number(this.ChangeTotalprice - this.payCreditAmount - this.ticketPrice - row.price).toFixed(2);
                    }
                    this.table31[index].price = Number(this.table31[index].price).toFixed(2)
                }
            },
            handleChangeNum4(row, index, flag) {// 改变一个价格，另一个价格随之改变(分期贷款)
                if( flag ){
                    let a = this.switchFlag3?2:1;
                    if( row.name === '一期款' ){
                        this.table41[index+a].price = Number(this.ChangeTotalprice - this.payCreditAmount - this.ticketPrice - row.price - this.table41[index+2*a].price - this.table41[index+3*a].price - this.table41[index+4*a].price).toFixed(2);
                        if( this.table41[index+a].price < 0 ){
                            this.table41[index+a].price = 0;
                            this.table41[index].price = Number(this.ChangeTotalprice - this.payCreditAmount - this.ticketPrice - this.table41[index+2*a].price - this.table41[index+3*a].price - this.table41[index+4*a].price).toFixed(2);
                        }
                    }else if( row.name === '二期款' ){
                        this.table41[index+a].price = Number(this.ChangeTotalprice - this.payCreditAmount - this.ticketPrice - row.price - this.table41[index+2*a].price - this.table41[index+3*a].price - this.table41[index-a].price).toFixed(2);
                        if( this.table41[index+a].price < 0 ){
                            this.table41[index+a].price = 0;
                            this.table41[index].price = Number(this.ChangeTotalprice - this.payCreditAmount - this.ticketPrice - this.table41[index+2*a].price - this.table41[index+3*a].price - this.table41[index-a].price).toFixed(2);
                        }
                    }
                    else if( row.name === '三期款' ){
                        this.table41[index+a].price = Number(this.ChangeTotalprice - this.payCreditAmount - this.ticketPrice - row.price - this.table41[index+2*a].price - this.table41[index-a].price - this.table41[index-2*a].price).toFixed(2);
                        if( this.table41[index+a].price < 0 ){
                            this.table41[index+a].price = 0;
                            this.table41[index].price = Number(this.ChangeTotalprice - this.payCreditAmount - this.ticketPrice - this.table41[index+2*a].price - this.table41[index-a].price - this.table41[index-2*a].price).toFixed(2);
                        }
                    }
                    else if( row.name === '四期款' ){
                        this.table41[index+a].price = Number(this.ChangeTotalprice - this.payCreditAmount - this.ticketPrice - row.price - this.table41[index-3*a].price - this.table41[index-a].price - this.table41[index-2*a].price).toFixed(2);
                        if( this.table41[index+a].price < 0 ){
                            this.table41[index+a].price = 0;
                            this.table41[index].price = Number(this.ChangeTotalprice - this.payCreditAmount - this.ticketPrice - this.table41[index-3*a].price - this.table41[index-a].price - this.table41[index-2*a].price).toFixed(2);
                        }
                    }
                    else if( row.name === '五期款' ){
                        this.table41[index-4*a].price = Number(this.ChangeTotalprice - this.payCreditAmount - this.ticketPrice - row.price - this.table41[index-3*a].price - this.table41[index-a].price - this.table41[index-2*a].price).toFixed(2);
                        if( this.table41[index+a].price < 0 ){
                            this.table41[index+a].price = 0;
                            this.table41[index].price = Number(this.ChangeTotalprice - this.payCreditAmount - this.ticketPrice - this.table41[index+2*a].price - this.table41[index-a].price - this.table41[index-2*a].price).toFixed(2);
                        }
                    }
                    this.table41[index].price = Number(this.table41[index].price).toFixed(2)
                }
            },
            handleChangeNum5(row, index, flag) {// 改变一个价格，另一个价格随之改变(组合贷款)
                if( flag ){
                    let a = 1;
                    if( row.name === '首付款' ){
                        this.table51[index+a].price = Number(this.ChangeTotalprice - this.payCreditAmount - this.ticketPrice - row.price - this.table51[index+2*a].price).toFixed(2);
                        if( this.table51[index+a].price < 0 ){
                            this.table51[index+a].price = 0;
                            this.table51[index].price = Number(this.ChangeTotalprice - this.payCreditAmount - this.ticketPrice - this.table51[index+2*a].price).toFixed(2);
                        }
                    }else if( row.name === '按揭款' ){
                        this.table51[index+a].price = Number(this.ChangeTotalprice - this.payCreditAmount - this.ticketPrice - row.price - this.table51[index-a].price).toFixed(2);
                        if( this.table51[index+a].price < 0 ){
                            this.table51[index+a].price = 0;
                            this.table51[index].price = Number(this.ChangeTotalprice - this.payCreditAmount - this.ticketPrice - this.table51[index-a].price).toFixed(2);
                        }
                    }
                    else if( row.name === '公积金' ){
                        this.table51[index-2*a].price = Number(this.ChangeTotalprice - this.payCreditAmount - this.ticketPrice - row.price - this.table51[index-a].price).toFixed(2);
                        if( this.table51[index-2*a].price < 0 ){
                            this.table51[index-2*a].price = 0;
                            this.table51[index].price = Number(this.ChangeTotalprice - this.payCreditAmount - this.ticketPrice - this.table51[index-a].price).toFixed(2);
                        }
                    }
                    this.table51[index].price = Number(this.table51[index].price).toFixed(2)
                }
            },
            handleGetBank() {// 获取银行数据
                getBank().then(res=>{
                     ;
                    if( res.status === 200 ){
                        this.bankOption = res.data;
                        res.data.map((item, index)=>{
                            if( item.name === '工商银行' ){
                                this.bankOption1 = [res.data[index]];
                                res.data.splice(index, 1);
                                this.bankOption2 = res.data;
                            }
                        })
                        this.bankOptionUse = this.bankOption2;
                        this.bankOptionUse2 = this.bankOption2;// 用于组合贷款
                        
                    }
                }).then(_=>{
                    if( this.data ){
                        this.handleInfo();
                    }
                })
            },
            handleInfo() {// 处理编辑里面的数据
                
                let newTable = this.data.payments.map(item=>{
                    return {
                        name: item.paymentItemName,// 款项名称
                        price: item.receivableAmount,// 应收金额
                        date: item.receivableDate,// 应收日期
                        bank: [item.bankName, item.bankBranchName],// 银行/单位
                        price1: 0,// 已收金额
                        price2: item.receivableAmount,// 未收金额
                        icbcFlag: item.icbcFlag?true:false
                    }
                })

                if( this.data.payMethod === '商业贷款' ){
                    this.table2.map(item=>{
                        newTable.map(item2=>{
                            if( item2.name === '按揭款' && item2.icbcFlag ){
                                this.bankOptionUse = this.bankOption1;
                            }
                            if( item.name === item2.name ){
                                item.price = item2.price;
                                item.date = item2.date;
                                item.bank = item2.bank;
                                item.price1 = item2.price1;
                                item.price2 = item2.price2;
                                item.icbcFlag = item2.icbcFlag;
                            }
                        })
                    })
                }else if( this.data.payMethod === '一次性付款' ){
                    this.table1.map(item=>{
                        newTable.map(item2=>{
                            if( item.name === item2.name ){
                                item.price = item2.price;
                                item.date = item2.date;
                                item.bank = item2.bank;
                                item.price1 = item2.price1;
                                item.price2 = item2.price2;
                                item.icbcFlag = item2.icbcFlag;
                            }
                        })
                    })
                }else if( this.data.payMethod === '公积金贷款' ){
                    this.table3.map(item=>{
                        newTable.map(item2=>{
                            if( item2.name === '公积金' && item2.icbcFlag ){
                                this.bankOptionUse = this.bankOption1;
                            }
                            if( item.name === item2.name ){
                                item.price = item2.price;
                                item.date = item2.date;
                                item.bank = item2.bank;
                                item.price1 = item2.price1;
                                item.price2 = item2.price2;
                                item.icbcFlag = item2.icbcFlag;
                            }
                        })
                    })
                }else if( this.data.payMethod === '分期付款' ){
                    this.table4.map(item=>{
                        newTable.map(item2=>{
                            if( item.name === item2.name ){
                                item.price = item2.price;
                                item.date = item2.date;
                                item.bank = item2.bank;
                                item.price1 = item2.price1;
                                item.price2 = item2.price2;
                                item.icbcFlag = item2.icbcFlag;
                            }
                        })
                    })
                }else if( this.data.payMethod === '组合贷款' ){
                    this.table5.map(item=>{
                        newTable.map(item2=>{
                            if( item2.name === '公积金' && item2.icbcFlag ){
                                this.bankOptionUse2 = this.bankOption1;
                            }else if( item2.name === '按揭款' && item2.icbcFlag ){
                                this.bankOptionUse = this.bankOption1;
                            }
                            if( item.name === item2.name ){
                                item.price = item2.price;
                                item.date = item2.date;
                                item.bank = item2.bank;
                                item.price1 = item2.price1;
                                item.price2 = item2.price2;
                                item.icbcFlag = item2.icbcFlag;
                            }
                        })
                    })
                }
                this.handleChangeTable()
            },
            show(data) {
                if( data ){
                    this.handleGetBank();
                     
                    this.code = data.signCode;// 合同单号
                    this.signDate = data.signDate;// 签约日期
                    this.houseInfo = data;// 房间信息
                    this.userTable = data.customs;// 客户table
                    this.priceType = data.discountCompMethod;// 折扣计价方式
                    
                    this.switchFlag = data.payCreditFlag?true:false;// 是否工抵
                    this.company.company = data.payCreditCompanyName;// 工抵城市
                    this.payCreditAmount = data.payCreditAmount;// 工抵金额
                    this.switchFlag3 = data.houseTicketFlag?true:false;// 是否房票
                    this.ticketPrice = data.houseTicketAmount;// 房票金额
                    this.switchFlag2 = data.ticketFlag;// 是否优惠券
                    this.BuyStamps = data.tickets;// 优惠券列表
                    this.beautifyTotalPrice = data.beautifyTotalPrice;// 美化金额
                    this.price = data.signPrice;// 签约单价
                    this.totalprice = data.signTotalAmount;// 签约总价
                    this.isBroken = data.underLowestFlag?'是':'否';// 是否破底
                    this.totalDiscount = data.discountAmount;// 总折扣
                    this.remark = data.remark;// 备注

                    this.Payment = data.payMethod;// 付款方式
                    this.handlePayInfo(data)

                    let date = new Date()
                    this.signDate = this.signDate || date;
                    this.table1.map(item=>{
                        item.date = item.date || date;
                    })
                    this.table2.map(item=>{
                        item.date = item.date || date;
                    })
                    this.table3.map(item=>{
                        item.date = item.date || date;
                    })
                    this.table4.map(item=>{
                        item.date = item.date || date;
                    })
                    this.table5.map(item=>{
                        item.date = item.date || date;
                    })
                    this.table11 = this.table1;
                    this.table21 = this.table2;
                    this.table31 = this.table3;
                    this.table41 = this.table4;
                    this.table51 = this.table5;
                    this.handleChangeTable()
                }
            }
        }
    }
</script>

<style scoped>
.units{
	position: relative;
	float: left;
}
.units sup{
	position: absolute;
	top: -3px;
	right: -6px;
	transform:scale(0.7);  
	
}
.form_bottom{
    display: inline-block;
    font-size: 14px;
    font-weight: 900;
    /* color: #4DBE61; */
    margin-right: 30px;
}
.form_bottom:last-child{
    margin: 0;
    float: right;
}
.form_bottom span{
    color: #E60012;
    margin-left: 10px;
}
</style>