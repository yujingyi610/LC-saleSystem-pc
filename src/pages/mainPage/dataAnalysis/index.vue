<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>

export default {

   data() {
      return {
        activeIndex: '0',
        clientWidth: '1440',
        clientHeight: '768',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      },
      changeActive() {
        // this.activeIndex = index.toString();
        // console.log(rest)
      }
    },
    mounted() {
      // // 宽度-17：减去纵向滚动条的宽度，否则mainPage页面宽度与plan页面宽度不相等
      // this.clientWidth = document.documentElement.clientWidth-17 >= 1024?document.documentElement.clientWidth-17:1024;
      // this.clientHeight = document.documentElement.clientHeight >= 500?document.documentElement.clientHeight:500;

      // // console.log('plan:' + this.clientWidth)

      //document.querySelector('.page').style.height = (825*this.clientHeight)/900 + 'px';
      //document.querySelector('.page').style.width = this.clientWidth + 'px';
      //document.querySelector('.page').style.top = (75*this.clientWidth)/1440 + 'px';
      //document.querySelector('.el-menu-vertical-demo').style.width = (200*(825*this.clientHeight)/900)/825 + 'px';
      //document.querySelector('.page_2').style.left = (200*(825*this.clientHeight)/900)/825 + 'px';

    }
}
</script>

<style lang="scss">

.leftMenu{
  .el-menu-item{
    border-left: 4px solid transparent;
  }
}

</style>
