<template>
    <div class="page">

        <el-menu  class="el-menu-vertical-demo" router>

          <el-submenu v-for=" (list , index) in $store.state.menuList[4].children " :key = "list.label + index" :index = "list.href" >

            <template slot="title" >{{ list.label }}</template>

             <el-menu-item  v-for="(item,itemIndex)  in list.children "  :index="item.href" :key="item.id + itemIndex">
               <i :class="item.icon"></i>
               <span slot="title">{{ item.label }}</span>
             </el-menu-item>

          </el-submenu>

        </el-menu>

        <router-view></router-view>
    </div>
</template>

<script>
export default {
   data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      }
    }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo {
    width:149px;
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    border-right: #007440 1px solid;
    overflow: hidden;
}
.el-menu-item {
    border-bottom:1px solid #ccc;
}
.el-menu-vertical-demo span {
    font-size:12px;
    font-weight:900;
}
</style>
