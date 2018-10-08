<template>
	<div id="viewNotice">
		<div class="projectListHeader">
			<h4 class="listTitle standardTitle">查看公告</h4>
			<div class="listbtnBox">
				<!-- <el-button class="newProjectBtn" type="primary" size="mini" @click="routerBack">退出</el-button> -->
        	<i @click="routerBack" class="m-close el-icon-circle-close-outline bold ft-18 cursor"></i>
			</div>
		</div>
		<div class="notice">
			<h1 class="notice_title">{{notice.noticeName}}</h1>
			<hr style="border:1px solid #E5E5E5">
			<div class="notice_content" v-html="notice.content"></div>
      <div class="notice_files" style="margin:0 auto;width:50%;text-align:left;">
        <span>附件：</span>
        <template v-for="item in files">
          <a style="margin:0 5px;" :href="item.fileUrl">{{item.fileRealName}}</a>
        </template>
      </div>
			<div class="notice_fj">
				<a :href="notice.url">{{notice.updateUser}}</a>
			</div>
		</div>
	</div>
</template>

<script>
//getMessages
import {
   getMessages,//获取公告详情
  getNoticeFiles,//获取公告附件
  } from '@/api/pages/workflow'
export default {
  watch: {},
  data() {
    return {
      notice: {
        title: "",
        content:
          "",
        url: "",
        urlName: ""
      },
      files:[],

    };
  },
  created(){

  },
  mounted(){
    this.getMessage()
  },
  methods: {
    routerBack() {
      this.$router.back(-1);
    },
     getMessage(){
    let id = this.$route.params.id
    console.log('3er',this.$route)
    let data = {
      id:id
    }
    //data = this.Qs.stringfy(data)
       getMessages(data).then((res)=>{
         if(res.status === 200){
           console.log('获取的详细信息',res)
           this.notice = res.data
         }
       })
       getNoticeFiles(data).then((res)=>{
         if(res.status == 200){
           console.log('附件信息：',res);
           this.files = res.data;
         }
       })
  },
  },

  created() {
    this.$route.params.id;
  }
};
</script>

<style scoped>
#viewNotice {
  background-color: #fff;

  box-sizing: border-box;
  padding: 20px;
}

.projectListHeader {
  overflow: hidden;
  border-bottom: 1px solid #e5e5e5;
  height: 35px;
  margin: 0 0 23px 0;
}

.listTitle {
  height: 30px;
  line-height: 30px;
  float: left;
  color: #007440;
}

.listbtnBox {
  float: right;
}

.notice {
  margin-top: 17px;
  text-align: center;
}

.notice_title {
  margin: 10px auto;
  line-height: 33px;
  font-size: 24px;
  color: #1a1a1a;
}

.notice_content {
  width: 50%;
  margin: 67px auto;
  text-align: left;
  line-height: 40px;
  font-size: 14px;
  color: #1a1a1a;
}
.notice_fj {
  width: 50%;
  margin: 67px auto;
  text-align: left;
}
</style>
