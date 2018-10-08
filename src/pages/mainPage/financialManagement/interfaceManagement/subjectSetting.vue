<template>
  <div id="subMain">
    <mainpage></mainpage>
  </div>
</template>

<script>
  import mainpage from './subjectSetPage'
  export default {
    components: {mainpage},
    data(){
      return{


      }
    },
    mounted:function(){
      let container = document.getElementById('subMain');
      let outer = container.parentElement;
      let minHeight = outer.offsetHeight * 0.93;
      let oDiv = document.getElementById('subject');
      container.style = "min-height:"+minHeight+"px";
      oDiv.style = "min-height:"+minHeight+"px";
    }
  }
</script>

<style scoped>
  #subMain{
    background-color: #fff;
    border-radius: 5px;
    padding-bottom: 10px;
  }
</style>
