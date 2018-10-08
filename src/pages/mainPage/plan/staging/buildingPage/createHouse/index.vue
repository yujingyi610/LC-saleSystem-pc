<template>
    <div>
        <component :is="isShow" v-on:nextStep="handleNextStep" v-on:closeCreate="handleClose" v-bind:formInfo="form" :buildingInfo="buildingInfo"></component>
    </div>
</template>

<script>
import StepOne from './step1'
import StepTwo from './step2'
import StepThree from './step3'
import {saveBathHouse} from "@/api/pages/mainPage/plan/house"
    export default {
        components: {
            'step-one': StepOne,
            'step-two': StepTwo,
            'step-three': StepThree,
        },
        props: {
            createHouseInfo: Object,
            buildingInfo: Object
        },
        data() {
            return {
                isShow: 'step-one',
                form:{}
            }
        },
        methods: {
            handleNextStep(val) {
                this.form = val.form;
                console.log('新建房间模块父组件接收到的数据', this.form)
                if( !val.name ){
                    this.handleHouseInfo(this.form.tableData);
                    // this.$emit('createHouse',this.form);
                }
                this.isShow = val.name;
            },
            handleClose() {
                this.$emit('handleShow','floor-view');
            },
            handleHouseInfo(info) {
                let houseDtos = [];
                let paramMap = {};
                for( let key in this.createHouseInfo ){
                    if( key === 'id' ){
                        paramMap.buildId = this.createHouseInfo.id
                    }else{
                        paramMap[key] = this.createHouseInfo[key]
                    }
                }
                paramMap.buildId = paramMap.build.id;
                paramMap.areaId = paramMap.build.areaId;
                paramMap.buildItemId = paramMap.build.itemRefId;
                info.map((floorItem, index)=>{
                    for( let key in floorItem ){
                        if( key !== 'name' ){
                            let houseItem = {
                                houseName: floorItem[key].name2,
                                unitName: key.split('')[0],
                                floorName: floorItem.name,
                                projectId: this.createHouseInfo.build.projectId,
                                houseTypeName: floorItem[key].houseType,
                                paramMap: paramMap,
                                floor: info.length - index
                            }
                            houseDtos.push(houseItem);
                        }
                    }
                })
                console.log(houseDtos);
                saveBathHouse(houseDtos).then(res=>{
                     
                    if( res.status === 200 ){
                        this.$emit('handleShow','floor-view');
                    }else{
                        this.$message.error(res.message)
                    }
                })
            }
        },
        created() {
            console.log("createHouseInfo");
            console.log(this.createHouseInfo);
            this.form.name = this.createHouseInfo.name;
            this.form.nature = this.createHouseInfo.nature;
        }
    }
</script>

<style scoped>

</style>