<template>
    <div class="dialogInput1">
        <span class="el-input__prefix">
            <i class="el-input__icon el-icon-search"></i>
        </span>
        <input v-model="value" class="input" readonly/>
        <!-- 用来实现删除，目前该组件太多地方使用，不建议加删除操作 -->
        <!-- <span class="el-input__suffix" @click.prevent.stop="handleClear">
            <i class="el-input__icon el-icon-circle-close"></i>
        </span> -->
    </div>
</template>

<script>
    export default {
        props: {
            val: String
        },
        watch: {
            val(e) {
                this.value = e;
            }
        },
        data() {
            return{
                value: ''
            }
        },
        methods: {
            handleClear() {
                this.value = '';
            }
        },
        created() {
            this.value = this.val;
        },
    }
</script>

<style scoped>
.dialogInput1{
    position: relative;
    font-size: 12px;
    display: inline-block;
    width: 284px;
    height: 28px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
}
.dialogInput1 .input{
    background: transparent;
    border: 0;
    height: 28px;
    outline: none;
    /* padding: 30px; */
    padding-left: 30px;
    width: 253px;
    position: absolute;
    left: 0;
    /* top: -30px; */
    color: #666;
    font-size: 12px;
}
.el-input__suffix{
    cursor: pointer;
    pointer-events: initial;
}
</style>