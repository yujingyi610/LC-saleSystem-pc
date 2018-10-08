<template>
  <div class="project-tagging-management">
    <!-- <component @checkPage="handleCheckPage" :is="page"></component> -->
    <listPage @checkPage="handleCheckPage" :is="page"></listPage>
    <selectPage @checkPage="handleCheckPage" :is="page" :proData="mess"></selectPage>
  </div>
</template>

<script>
  import listPage from './list.vue'
  import selectPage from './select.vue'
  export default {
    components : {listPage,selectPage},
    data() {
      return {
        page : 'listPage',  
        mess:{}
      }
    },
    methods : {
      handleCheckPage(val,data) {
        this.page = val;
        this.mess = data
      },
    },
  }
</script>

<style lang="scss" scoped>

.project-tagging-management{

}

</style>