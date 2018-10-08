<template>
    <div class="background-m">
      <el-menu :default-active="activeIndex" class = "el-menu-demo" mode = "horizontal" active-text-color = "#007440" @select="handleSelect" >
        <el-menu-item index="0" ref="listPage">字典条目</el-menu-item>
        <el-menu-item index="1" ref="addPage">字典类型</el-menu-item>
      </el-menu>
      <keep-alive>
        <dictionary-list ref="list" v-if = "index == '0'" ></dictionary-list>
        <dictionary-add-type ref="listType" v-else-if="index === '1'"></dictionary-add-type>
      </keep-alive>
    </div>
</template>

<script>
  import List from "./dictionaryPages/dictionaryList"
  import AddItem from "./dictionaryPages/dictionaryAddItem"
  import AddType from "./dictionaryPages/dictionaryAddType"
  export default {
      data() {
        return{
          activeIndex: '0',
          index: 0 ,
        }
      },
      components: {
        'dictionary-list': List,
        'dictionary-add': AddItem,
        'dictionary-add-type' : AddType,
      },
     beforeUpdate:function() {
        // console.log(this.$refs.listPage);
        // //console.log(this.activeIndex);
        //  if(this.index == 1){
        //   this.$refs.addPage.itemStyle.color ="" ;
        //   this.$refs.addPage.itemStyle.borderBottomColor = "transparent";
        //   //this.$refs.addPage.active = false;
        //   this.$refs.listPage.itemStyle.color ="#007440" ;
        //   this.$refs.listPage.itemStyle.borderBottomColor = "#007440";
        //   //this.$refs.listPage.active = true;
        //
        // }
        //}else if(this.index == 2){
          //this.$refs.addPage.activeTextColor = "#007440";
       // }
     },
     watch : {
       index(index) {
         if(index === '0'){
          this.$nextTick(() => {
              let t = this.$refs.list;
              t.$options.mounted[0].call(t);
          });
         }else{
          this.$nextTick(() => {
            let t = this.$refs.listType;
            t.$options.mounted[0].call(t);
          });
         }
       },
     },
      methods: {
        handleSelect(key, keyPath){
            this.index = key;
            this.activeIndex= keyPath[0];
        }
      }
  }
</script>

<style scoped>
  .dictionaryPages{
    margin-top: 10px;
  }
</style>
