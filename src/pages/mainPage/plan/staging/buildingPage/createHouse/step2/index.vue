<template>
    <div>
        <el-card class="box-card space_bottom">
            <div slot="header" class="clearfix">
                <span class="title">{{form.name}}房间<i class="el-icon-arrow-right"></i>生成房间<i class="el-icon-arrow-right"></i>设置楼层及户数</span>
                <div style="float:right">
                    <el-button type="primary" @click="lastPage">上一步</el-button>
                    <el-button type="primary" @click="nextPage">下一步</el-button>
                </div>
                <!-- <i class="el-icon-circle-close-outline" style="float: right; padding: 3px 0"  @click="closeCreate"></i> -->
            </div>
            <div class="text item">
                <div class="input-wraper">
                    <span class="step_title">单元排序:</span>
                    <el-select v-model="value" placeholder="请选择" style="margin-right: 30px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <div style="flex: 1">
                        <span class="step_title" style="float: left; height: 100%;">单元编号:</span>
                        <div>
                            <el-input v-for="(item, index) in unitList" :key="index" v-model="unitList2[index].prop" class="inline-input"></el-input>
                        </div>
                    </div>
                </div>
                <div class="input-wraper">
                    <span class="step_title">房间排序:</span>
                    <el-select v-model="value2" placeholder="请选择" style="margin-right: 30px">
                        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <div style="flex: 1">
                        <span class="step_title" style="float: left; height: 100%;">单元户数:</span>
                        <div>
                            <el-input v-for="(item, index) in unitList" :key="index" v-model="unitList2[index].num" class="inline-input"></el-input>
                        </div>
                    </div>
                </div>
                <div class="input-wraper">
                    <span class="step_title">楼层编号:</span>
                    <div style="flex: 1">
                        <el-input style="display: block; margin-bottom: 20px" v-for="(item, index) in form.floorList" :key="index" v-model="form.floorList[index]" class="inline-input"></el-input>
                    </div>
                </div>
            </div>
            
        </el-card>
    </div>
</template>

<script>
    export default {
        props: {
            formInfo: Object
        },
        computed: {
            unitList() {
                let list = [];
                if( this.form.num ){
                    if( this.value === '1-N' ){
                        for( let i = 1; i <= this.form.num-0; i++ ){
                            if( this.unitList2 ){
                                if( this.unitList2[i-1] ){
                                    list.push({prop: i, num: this.unitList2[i-1].num})
                                }else{
                                    list.push({prop: i, num: ''})
                                }
                            }else{
                                list.push({prop: i, num: ''})
                            }
                        }
                    }else if( this.value === 'N-1' ){
                        for( let i = this.form.num; i >= 1; i-- ){
                            if( this.unitList2 ){
                                if( this.unitList2[this.form.num-i].num ){
                                    list.push({prop: i, num: this.unitList2[this.form.num-i].num})
                                }else{
                                    list.push({prop: i, num: ''})
                                }
                            }else{
                                list.push({prop: i, num: ''})
                            }
                        }
                    }else if( this.value === 'A-Z' ){
                        for( let i = 1; i <= this.form.num; i++ ){
                            let a = i - 0 + 64;                           
                            let code = String.fromCharCode(a);
                            if( this.unitList2 ){
                                if( this.unitList2[i-1].num ){
                                    list.push({prop: code, num: this.unitList2[i-1].num})
                                }else{
                                    list.push({prop: code, num: ''})
                                }
                            }else{
                                list.push({prop: code, num: ''})
                            }
                        }
                    }else if( this.value === 'Z-A' ){
                        for( let i = this.form.num; i >= 1; i-- ){
                            let a = i - 0 + 64;
                            let code = String.fromCharCode(a);             
                            if( this.unitList2 ){
                                if( this.unitList2[this.form.num-i].num ){
                                    list.push({prop: code, num: this.unitList2[this.form.num-i].num})
                                }else{
                                    list.push({prop: code, num: ''})
                                }
                            }else{
                                list.push({prop: code, num: ''})
                            }
                        }
                    }
                    this.unitList2 = list;
                    this.form.unitList = list;
                    return list
                }
                
            }
        },
        methods: {
            nextPage() {
                // console.log(this.unitList2);
                // console.log(this.form.floorList);
                for( let i = 0; i < this.unitList2.length; i++ ){
                    if( !this.unitList2[i].num || !this.unitList2[i].prop || this.unitList2[i].num <= 0 || this.unitList2[i].prop <= 0 ){
                        alert('单元及户数不能为空！');
                        return;
                    }
                }
                for( let j = 0; j < this.form.floorList.length; j++ ){
                    if( !this.form.floorList[j] ){
                        alert('楼层名不能为空！');
                        return;
                    }
                }
                this.form.unitSort = this.value2;
                this.$emit('nextStep',{
                    name: 'step-three',
                    form: this.form
                });
                
            },
            lastPage() {
                this.$emit('nextStep',{
                    name: 'step-one',
                    form: this.form
                });
            },
            closeCreate() {
                this.$emit('closeCreate');
            }
        },
        data() {
            return {
                input: '',
                form:{},
                options: [{
                value: '1-N',
                label: '1-N'
                }, {
                value: 'N-1',
                label: 'N-1'
                }, {
                value: 'A-Z',
                label: 'A-Z'
                }, {
                value: 'Z-A',
                label: 'Z-A'
                }],
                options2: [{
                value: '按单元正序',
                label: '按单元正序'
                }, {
                value: '按单元倒序',
                label: '按单元倒序'
                }, {
                value: '整体正序',
                label: '整体正序'
                }, {
                value: '整体倒序',
                label: '整体倒序'
                }],
                value: '1-N',
                value2: '按单元正序',
                unitList2: []
            }
        },
        created() {
            this.form = this.formInfo;
            let list = [];
            let from = this.form.from -0;
            let to = this.form.to -0;
            for( let i = to; i >= from; i-- ){
                if( this.form.choose === '全部'){
                    list.push(i);
                }else if( this.form.choose === '单数' ){
                    if( i%2 ){
                        list.push(i);
                    }
                }else if( this.form.choose === '双数' ){
                    if( i%2 == 0 ){
                        list.push(i);
                    }
                }
            }
            this.form.floorList = list;
        }
  
    }
</script>

<style scoped>
 .text {
    color: #666666;
  }
.inline-input{
    width: 50px;
    margin-right: 10px;
    margin-bottom: 20px;
}

.inline-input2{
    width: 100px;
    display: block
}
.input-wraper{
    /* white-space: nowrap; */
    margin-bottom: 20px;
    display: flex;
}
.step_title{
    margin-right: 10px;
    width: 70px;
    display: inline-block;
    line-height: 28px;
}
</style>