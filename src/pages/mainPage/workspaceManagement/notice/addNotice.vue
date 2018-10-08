<template>
	<div id="viewNotice">
		<div class="m-form">
		<div class="projectListHeader">
			<h4 class="listTitle standardTitle">新增公告</h4>
			<div class="listbtnBox">

				<i @click="routerBack" class="m-close el-icon-circle-close-outline bold ft-18 cursor"></i>
			</div>
		</div>

		<div class="boxBody">
			<el-form :model="formData">
				<el-form-item label="公告名称">
					<el-input v-model="formData.title"></el-input>
				</el-form-item>
				<el-form-item label="公告内容">
					<div style="margin-left: 60px;">
						<UE :defaultMsg=editDisplay :config=config ref="ue"></UE>
					</div>
				</el-form-item>
				<el-form-item label="上传附件">
					<el-upload
						action="/zuul/api/storage/files/multipart/file"
						:data="updateLoadAnnex"
						name="files"
            :on-success = "uploadSuccess"
            :on-change="filesChange"
						:limit="90"
						:file-list="fileList">
					<el-button size="small" class="upLoadBtn" type="primary">选择文件</el-button>
					</el-upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="notice_footer">
				<span @click="handleAddNotice">发 布</span>
      </div>
		</div>
		</div>
	</div>
</template>

<script>
import UE from '@/components/ueditor'
//saveAnnouncement
import {
   saveAnnouncement,//保存公告列表
    updateFormId,
  } from '@/api/pages/workflow'
export default {
  components: {UE},
  data() {
    return {
	  formData: {
			title:''
		},
	  editDisplay:'请填写公告内容',
	  //富文本编辑器
	  config: {
		/*可以在此处定义工具栏的内容 ，确定使用内容后可删除此注释
		toolbars: [[
			'fullscreen', 'source', '|', 'undo', 'redo', '|',
			'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
			'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
			'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
			'directionalityltr', 'directionalityrtl', 'indent', '|',
			'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
			'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
			'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
			'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
			'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
			'print', 'preview', 'searchreplace', 'drafts', 'help'
		]],*/
		//实际使用工具栏的内容
		toolbars: [
		['fullscreen', 'source','|', 'undo', 'redo','|','bold', 'italic', 'underline', 'fontborder', 'strikethrough',
			'|','superscript','subscript','|', 'forecolor','backcolor','|', 'removeformat','formatmatch','|', 'insertorderedlist',
			'insertunorderedlist', '|','selectall', 'cleardoc','fontfamily','fontsize','justifyleft','justifyright',
			'justifycenter','justifyjustify','|','inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells',
			'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts','preview'
			]
		],
		autoHeightEnabled: false,
		autoFloatEnabled: true,　　//是否工具栏可浮动
		initialContent:'请输入内容',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
		autoClearinitialContent:true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
		initialFrameWidth: null,
		initialFrameHeight: 280,
		BaseUrl: '',
		UEDITOR_HOME_URL: 'static/'
	  },
	  updateLoadAnnex:{
      bussinessType:'notice',
      formId:null
    },
	  fileList:[],
    };
  },
  methods: {
    routerBack() {
      this.$router.back(-1);
    },
    uploadSuccess(res){
      if(res.status == 200){
        this.$message({
          message:'上传成功！',
          type:'success'
        })
      }
    },
    updateFormId(nid){
      let that = this;
      let params = {
        formId:this.updateLoadAnnex.formId,
        newFormId:nid
      }
      updateFormId(params).then(function(res){
        if(res.status != 200){
          that.$message({
            message:res.message,
            type:'error'
          })
        }
      })
    },
    filesChange(res){
       ;
    },
    handleAddNotice() {
      let that = this;
      let content = this.$refs.ue.getUEContent();
      console.log('data',content);
      saveAnnouncement({
          content:content,
          noticeName:this.formData.title,
          yn:1
        }).then((res)=>{
          if(res.status === 200){
            console.log('成功')
            this.updateFormId(res.data);
            this.routerBack();
          }
        })
      }
  },
  created() {
    this.$route.params.id;
    this.updateLoadAnnex.formId = new Date().valueOf();
  }
};
</script>

<style scoped>
#viewNotice {
  background-color: #fff;
  position: absolute;
  top: 20px;
  bottom: 20px;
  left: 20px;
  right: 20px;
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

.notice_footer{
  margin-top: 60px;
  width: 100%;
  text-align: center;
}
.notice_footer span{
  width: 100px;
  display: inline-block;
  line-height: 30px;
  background-color: #4DBE61!important;
  border-color: #4DBE61!important;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
}
</style>
