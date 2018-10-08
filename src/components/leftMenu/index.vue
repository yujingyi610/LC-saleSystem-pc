<template>
    <div class="page leftMenu">

        <el-menu  class="el-menu-vertical-demo leftNav" router :default-active="this.$route.path" text-color="#fff" :unique-opened="true" active-text-color="#FFF58D">

          <template v-for=" (list) in leftMenuData">
            <template v-if="list.children.length > 0">
              <el-submenu :key="list.id" :index="list.id + ''">
                <template slot="title" >
                  <i :class="list.icon"></i>
                <!-- <span :key="list.id" class="icon_img" :style="{backgroundImage: list.icon || 'url(static/images/common/home.png)'}"></span> -->
                {{ list.label }}
                </template>
                <el-menu-item  v-for="(item) in list.children" :index="item.href" :key="item.id"  @click="changeActive">
                  <i :class="item.icon"></i>
                  <span slot="title">{{ item.label }}</span>
                </el-menu-item>
              </el-submenu>

            </template>

            <template v-else>
                <el-menu-item :key = "list.id" :index = "list.href">
                  <template slot="title" >

                    <!-- <span :key="list.id" class="icon_img" :style="{backgroundImage: list.icon || 'url(static/images/common/home.png)'}"></span> -->
                    <span style="margin-left: -7px"><i :class="list.icon"></i>{{ list.label }}</span>
                  </template>
                </el-menu-item>
            </template>
          </template>

        </el-menu>
        <div class="page_2">
          <router-view></router-view>
        </div>
    </div>
</template>

<script>

export default {
    props : ['leftMenuData'],
   data() {
      return {
        clientWidth: '1440',
        clientHeight: '768'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        
      },
      changeActive() {
        
      }
    },
    mounted() {
      // 宽度-17：减去纵向滚动条的宽度，否则mainPage页面宽度与plan页面宽度不相等
      this.clientWidth = document.documentElement.clientWidth >= 1024?document.documentElement.clientWidth:1024;
      this.clientHeight = document.documentElement.clientHeight >= 500?document.documentElement.clientHeight:500;


      document.querySelector('.page').style.height = (825*this.clientHeight)/900 + 'px';
      document.querySelector('.page').style.width = this.clientWidth + 'px';
      document.querySelector('.page').style.top = (75*this.clientWidth)/1440 + 'px';
      document.querySelector('.el-menu-vertical-demo').style.width = (200*(825*this.clientHeight)/900-3)/825 + 'px';
      document.querySelector('.page_2').style.left = (200*(825*this.clientHeight)/900)/825 + 'px';

    }
}
</script>

<style scoped lang="scss">

.leftMenu{
  .el-menu-item{
    border-left: 4px solid transparent;
  }
  .leftNav{
    padding-top: 20px;
  }
}
.el-menu-item i {
    color: inherit;
}
</style>
