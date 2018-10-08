<template>
    <div class="noBgColor">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="title">{{formInfo.name}}房间<i class="el-icon-arrow-right"></i>生成房间<i class="el-icon-arrow-right"></i>确认房号</span>
                <i class="el-icon-circle-close-outline" style="float: right; padding: 3px 0" @click="closeCreate"></i>
            </div>
            <div class="text item">
                <el-table :data="tableData" style="width: 100%" :span-method="arraySpanMethod">
                    <el-table-column label="楼层名称" prop="name">
                        <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.name" class="noborder inline-input"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="单元">
                        <el-table-column label="号码" prop="name"></el-table-column>
                    </el-table-column>
                    <el-table-column v-for="(val, key, index) in cellList" :key="index" :label="key">
                        <el-table-column v-for="(cell, Itemindex) in val" :key="Itemindex" :prop="key + cell" :label="cell">
                            <template slot-scope="scope">
                                <el-input size="small" v-model="scope.row[key + cell].name2" class="noborder inline-input"></el-input>
                            </template>
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </div>
            <div style="float:right">
                <el-button type="primary" @click="lastPage">上一步</el-button>
                <el-button type="primary" @click="nextPage">完成</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        props: {
            'form-info': Object
        },
        methods: {
            arraySpanMethod({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 0) { return [1, 2] } 
                else if (columnIndex === 1) { return [0, 0] }
            },
            closeCreate() {
                this.$emit('closeCreate');
            },
            nextPage() {
                this.formInfo.tableData = this.tableData;
                this.$emit('nextStep',{
                    name: '',
                    form: this.formInfo
                });
            },
            lastPage() {
                this.$emit('nextStep',{
                    name: 'step-two',
                    form: this.formInfo
                });
            }
        },
        created() {
            console.log('step3', this.formInfo);
            
            for( let i = 0; i < this.formInfo.floorList.length ; i++ ){
                let obj = {
                    name: this.formInfo.floorList[i]
                }
                
                if( this.formInfo.unitSort === '按单元正序' ){
                    for( let j = 0; j < this.formInfo.unitList.length; j++ ){// 单元数
                        let arr = [];
                        for( let k = 1; k <= this.formInfo.unitList[j].num; k++ ){// 每个单元里的户数
                            let name = this.formInfo.unitList[j].prop + '0' + k;
                            obj[name] = {
                                name2: this.formInfo.floorList[i] + '0' + k,
                                isChecked: false,
                                isRadioChecked: false,
                                // houseTypeName: '户型A',
                                // sightName: '园林',
                                orientation: '朝向南'
                            };
                        }
                    }
                }else if( this.formInfo.unitSort === '按单元倒序' ){
                    for( let j = 0; j < this.formInfo.unitList.length; j++ ){// 单元数
                        let arr = [];
                        for( let k = this.formInfo.unitList[j].num; k >= 1; k-- ){// 每个单元里的户数
                            let name = this.formInfo.unitList[j].prop + '0' + k;
                            obj[name] = {
                                name2: this.formInfo.floorList[i] + '0' + k,
                                isChecked: false,
                                isRadioChecked: false,
                                // houseTypeName: '户型A',
                                // sightName: '园林',
                                orientation: '朝向南'
                            };
                        }
                    }
                }else if( this.formInfo.unitSort === '整体正序' ){
                    let a = 1;
                    for( let j = 0; j < this.formInfo.unitList.length; j++ ){// 单元数
                        let arr = [];
                        for( let k = 1; k <= this.formInfo.unitList[j].num; k++ ){// 每个单元里的户数
                            let name = this.formInfo.unitList[j].prop + '0' + a;
                            obj[name] = {
                                name2: this.formInfo.floorList[i] + '0' + a,
                                isChecked: false,
                                isRadioChecked: false,
                                // houseTypeName: '户型A',
                                // sightName: '园林',
                                orientation: '朝向南'
                            };
                            a++;
                        }
                    }
                }else if( this.formInfo.unitSort === '整体倒序' ){
                    let a = 0;
                    for( let j = 0; j < this.formInfo.unitList.length; j++ ){
                        a += parseInt(this.formInfo.unitList[j].num);
                    }
                    for( let j = 0; j < this.formInfo.unitList.length; j++ ){// 单元数
                        let arr = [];
                        for( let k = 1; k <= this.formInfo.unitList[j].num; k++ ){// 每个单元里的户数
                            let name = this.formInfo.unitList[j].prop + '0' + a;
                            obj[name] = {
                                name2: this.formInfo.floorList[i] + '0' + a,
                                isChecked: false,
                                isRadioChecked: false,
                                // houseTypeName: '户型A',
                                // sightName: '园林',
                                orientation: '朝向南'
                            };
                            a--;
                            // console.log(name);
                        }
                    }
                }
                this.tableData.push(obj);
            }
            // console.log(this.tableData);
            for( let key in this.tableData[0] ){
                if( key != 'name' ){
                    if( this.cellList[key.split('')[0]] ){
                        this.cellList[key.split('')[0]].push(key.split('')[1] + key.split('')[2]);
                    }else{
                        this.cellList[key.split('')[0]] = [];
                        this.cellList[key.split('')[0]].push(key.split('')[1] + key.split('')[2]);
                    }
                }
            }
            
                console.log("tableData");
            console.log(this.tableData);
            // console.log(this.cellList)
            for( let key in this.cellList ){
                if( this.formInfo.unitSort === '按单元倒序' || this.formInfo.unitSort === '整体倒序'){
                    this.cellList[key].reverse(); 
//                     console.log(this.cellList);
                }
            }
            console.log("cellList");
            console.log(this.cellList);
        },
        data() {
            return {
                tableData: [],
                cellList: {}
            }
        }
    }
</script>

<style scoped>

</style>