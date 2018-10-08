<template>
  <div>

    <!-------------------项目概要部分-------------------->
    <div class="projectEssentials messageBox">
      <div class="messageBoxHeader">
        <h4 class="messageBoxTitle standardTitle">项目概要</h4>
        <div class="headRight">
          <el-button type="text" class ="editorBtn"  @click="handleCallBackClick">返回</el-button>
          <el-button type="text" class ="editorBtn"  @click="editorProject" v-has="'prj:project:edit'">编辑</el-button>
        </div>
      </div>

      <div class = "boxBody">

        <!---第一行 -->
        <div class="formLine"  >
          <div class = "itemBox" >
            <label class = "itemLabel lineFirstItem" >项目名称:</label>
            <span class="itemMsg">{{EssentialsMsg.projectName}}</span>
          </div>

          <div class = "itemBox" >
            <label class = "itemLabel" >归属公司:</label>
            <span class="itemMsg">{{EssentialsMsg.projectCityName}}</span>
          </div>
          <div class = "itemBox" >
            <label class = "itemLabel lineFirstItem" >管控方式:</label>
            <span class="itemMsg">{{EssentialsMsg.escrowType}}</span>
          </div>
          
        </div>
        <!---第二行-->
        <div class="formLine"  >
          

          <div class = "itemBox" >
            <label class = "itemLabel" >项目等级:</label>
            <span class="itemMsg">{{EssentialsMsg.projectGrade}}</span>
          </div>

          <div class = "itemBox" >
            <label class = "itemLabel" >项目负责人:</label>
            <span class="itemMsg">{{EssentialsMsg.projectMgrName}}</span>
          </div>
          <div class = "itemBox" >
            <label class = "itemLabel  lineFirstItem" >营销负责人:</label>
            <span class="itemMsg">{{EssentialsMsg.marketMgrName}}</span>
          </div>
        </div>
        <!--第三行 -->
        <div class="formLine"  >
          

          <div class = "itemBox" >
            <label class = "itemLabel" >项目地址:</label>
            <span class="itemMsg">{{EssentialsMsg.cityName}}</span>
          </div>

          <div class = "itemBox" >
            <label class = "itemLabel" >邮政编码:</label>
            <span class="itemMsg">{{EssentialsMsg.postCode}}</span>
          </div>
          <div class = "itemBox" >
            <label class = "itemLabel lineFirstItem" >启动会日期:</label>
            <span class="itemMsg">{{EssentialsMsg.kickOffDate}}</span>
          </div>
        </div>
        <!---第四行-->
        <div class="formLine"  >
          
          <div class = "itemBox" >
            <label class = "itemLabel" >所属项目公司:</label>
            <span class="itemMsg" style="width: initial">{{EssentialsMsg.projectCompanyNames}}</span>
          </div>
        </div>
        <!--第五行 -->
        <div class="formLine"  >
          <div class = "itemBox" >
            <label class = "itemLabel lineFirstItem itemTextAreaLabel" >备注:</label>
            <span class="itemMsg itemTextAreaMsg">{{EssentialsMsg.remark}}</span>
          </div>
        </div>
      </div>
    </div>


    <!---项目信息部分-->
    <div class="messageBox">

      <div class="messageBoxHeader">
        <h4 class="messageBoxTitle standardTitle">项目基本信息</h4>
      </div>

      <div class = "boxBody">
        <!---第一行-->
        <div class="formLine"  >

          <div class = "itemBox" >
            <label class = "itemLabel " >占地面积(m²):</label>
            <span class="itemMsg">{{projectInformationMsg.landArea}}</span>
          </div>

          <div class = "itemBox" >
            <label class = "itemLabel" >总建筑面积(m²):</label>
            <span class="itemMsg">{{projectInformationMsg.buildingAreaAmount}}</span>
          </div>

          <div class = "itemBox" >
            <label class = "itemLabel " >容积率(%):</label>
            <span class="itemMsg">{{projectInformationMsg.floorAreaRate}}</span>
          </div>

        </div>

        <!--第二行-->
        <div class="formLine"  >

          <div class = "itemBox" >
            <label class = "itemLabel " >地上面积(m²):</label>
            <span class="itemMsg">{{projectInformationMsg.overgroundArea}}</span>
          </div>

          <div class = "itemBox" >
            <label class = "itemLabel " >地下面积(m²):</label>
            <span class="itemMsg">{{projectInformationMsg.undergroundArea}}</span>
          </div>

          <div class = "itemBox" >
            <label class = "itemLabel" >绿化面积(m²):</label>
            <span class="itemMsg">{{projectInformationMsg.greenArea}}</span>
          </div>

        </div>

        <!--第三行-->
        <div class="formLine"  >

          <div class = "itemBox" >
            <label class = "itemLabel" >绿化率(%):</label>
            <span class="itemMsg">{{projectInformationMsg.greenRate}}</span>
          </div>

          <div class = "itemBox" >
            <label class = "itemLabel" >自用面积(m²):</label>
            <span class="itemMsg">{{projectInformationMsg.ownUseArea}}</span>
          </div>

          <div class = "itemBox" >
            <label class = "itemLabel" >可出租面积(m²):</label>
            <span class="itemMsg">{{projectInformationMsg.canRentArea}}</span>
          </div>

        </div>
        <!---第四行-->
        <div class="formLine"  >

          <div class = "itemBox" >
            <label class = "itemLabel" >总户数:</label>
            <span class="itemMsg">{{projectInformationMsg.totalHouseHolder}}</span>
          </div>

          <div class = "itemBox" >
            <label class = "itemLabel" >车位数:</label>
            <span class="itemMsg">{{projectInformationMsg.carNum}}</span>
          </div>

          <div class = "itemBox" >
            <label class = "itemLabel" >车位配比:</label>
            <span class="itemMsg">{{projectInformationMsg.carRate}}</span>
          </div>

        </div>

        <div class="formLine"  >

          <div class = "itemBox" >
            <label class = "itemLabel" >售楼地址:</label>
            <span class="itemMsg">{{otherMsgList.salsAddress}}</span>
          </div>

          <div class = "itemBox" >
            <label class = "itemLabel" >销售热线:</label>
            <span class="itemMsg">{{otherMsgList.salesTelePhone}}</span>
          </div>

          <div class = "itemBox" >
            <label class = "itemLabel" >物业公司:</label>
            <span class="itemMsg">{{otherMsgList.propertyCompany}}</span>
          </div>

        </div>
      </div>
    </div>

    <!---业态信息-->
    <div class="messageBox">
      <div class="messageBoxHeader">
        <h4 class="messageBoxTitle standardTitle">业态</h4>
      </div>
      <div class = "boxBody">
        <el-table :data="prjFormatList" border tooltip-effect="dark" >
          <el-table-column prop="formatName" label="业态" align ="center" ></el-table-column>
          <el-table-column prop="coveredArea" label="建筑面积(m²)" align ="center" ></el-table-column>
          <el-table-column prop="num" label="套数" align ="center" ></el-table-column>
          <el-table-column prop="propertyYearNum" label="产权年限" align ="center"></el-table-column>
        </el-table>
      </div>
    </div>

    <!---效果图部分-->

    <div class="messageBox">
      <div class="messageBoxHeader">
        <h4 class="messageBoxTitle standardTitle">图片</h4>
      </div>
      <div class = "boxBody carouselFigureBox">

        <div class= "carouselFigureItem">
          <div class= "carouselFigureItemHead">
            <h4 class= "carouselFigureItemHeadLeft">区位图</h4>
            <h4 class= "carouselFigureItemHeadRight">{{surroundingEnvironmentPicture.length +"张"}}</h4>
          </div>
          <div class="imageBox">
            <img :src="surroundingEnvironmentPicture[0]"   @click="handleShowCarouselFigure(index = 0)">
          </div>
        </div>

        <div class= "carouselFigureItem">
          <div class= "carouselFigureItemHead">
            <h4 class= "carouselFigureItemHeadLeft">鸟瞰图</h4>
            <h4 class= "carouselFigureItemHeadRight">{{trafficMap.length +"张"}}</h4>
          </div>
          <div class="imageBox">
            <img :src="trafficMap[0]"   @click="handleShowCarouselFigure(index = 2)">
          </div>
        </div>

        <div class= "carouselFigureItem">
          <div class= "carouselFigureItemHead">
            <h4 class= "carouselFigureItemHeadLeft">效果图</h4>
            <h4 class= "carouselFigureItemHeadRight">{{effectPicture.length +"张"}}</h4>
          </div>
          <div class="imageBox">
            <img :src="effectPicture[0]"   @click="handleShowCarouselFigure(index = 1)">
          </div>
        </div>
      </div>

      <div class = "boxBody carouselFigureBox">
        <div class= "carouselFigureItem">
          <div class= "carouselFigureItemHead">
            <h4 class= "carouselFigureItemHeadLeft">实景图</h4>
            <h4 class= "carouselFigureItemHeadRight">{{RealPicture.length +"张"}}</h4>
          </div>
          <div class="imageBox">
            <img :src="RealPicture[0]"   @click="handleShowCarouselFigure(index = 3)">
          </div>
        </div>

        <div class= "carouselFigureItem">
          <div class= "carouselFigureItemHead">
            <h4 class= "carouselFigureItemHeadLeft">样板间</h4>
            <h4 class= "carouselFigureItemHeadRight">{{ModelPicture.length +"张"}}</h4>
          </div>
          <div class="imageBox">
            <img :src="ModelPicture[0]"   @click="handleShowCarouselFigure(index = 4)">
          </div>
        </div>

        <div class= "carouselFigureItem">
          <div class= "carouselFigureItemHead">
            <h4 class= "carouselFigureItemHeadLeft">小区配套</h4>
            <h4 class= "carouselFigureItemHeadRight">{{MatchingPicture.length +"张"}}</h4>
          </div>
          <div class="imageBox">
            <img :src="MatchingPicture[0]"   @click="handleShowCarouselFigure(index = 5)">
          </div>
        </div>
      </div>
    </div>

    <!---其他信息部分-->
    <!--<div class="messageBox">
      <div class="messageBoxHeader">
        <h4 class="messageBoxTitle standardTitle">其他信息</h4>
      </div>
      <div class = "boxBody">
        <div class="formLine">
          <div class = "itemBox" >
            <label class = "itemLabel" >销售状况:</label>
            <span class="itemMsg">{{otherMsgList.salesStatus}}</span>
          </div>
        </div>
      </div>
    </div>-->


    <!---莫泰窗口 -->
    <!---周边配套图展示莫泰窗口-->
    <!--<el-dialog title="周边配套图展示" :visible.sync="carouselFigureShow">-->
      <!--<el-carousel >-->
        <!--<el-carousel-item v-for="item in pictureList" :key="item" >-->
          <!--<img :src="item"  class="pictureItem">-->
        <!--</el-carousel-item>-->
      <!--</el-carousel>-->

      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click="carouselFigureShow = false" type="primary">关闭</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->

    <el-dialog :title= pictureTitle :visible.sync="carouselFigureShow" width="680px">
      <el-carousel @change = "carouselFigureChange" height="480px">
        <el-carousel-item v-for="(item ,index) in pictureList" :key="item+index" >
          <img :src="item"  class="pictureItem">
        </el-carousel-item>
      </el-carousel>

      <div slot="footer" class="dialog-footer">
        <el-button @click="carouselFigureShow = false" type="primary">关闭</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
  import { getProjectInfoById } from "@/api/pages/mainPage/plan/projectInfo/index.js"
  export default {
    name: "check-new-project",
    data(){
      return{
        /***************概要部分****************/
        EssentialsMsg:{
          projectName: "",
          projectCityName: "",
          projectCompanyNames: "",
          escrowType: "",
          projectGrade: "",
          projectMgrName:"",
          marketMgrName:"",
          cityName:[],
          postCode:"",
          kickOffDate:"",
          remark:""
        },
        /**************基本信息******************/
        projectInformationMsg:{
          buildingAreaAmount:"",
          undergroundArea:"",
          overgroundArea:"",
          greenArea:"",
          landArea:"",
          greenRate:"",
          canRentArea:"",
          floorAreaRate:"",
          ownUseArea:"",
          carRate:"",
          totalHouseHolder:""
        },
        prjFormatList:[
          {
            formatName:"别墅",
            coveredArea: "",
            num:"",
            propertyYearNum:""
          },
          {
            formatName:"公寓",
            coveredArea: "",
            num:"",
            propertyYearNum:""
          },
          {
            formatName:"酒店式公寓",
            coveredArea: "",
            num:"",
            propertyYearNum:""
          },
          {
            formatName:"写字楼",
            coveredArea: "",
            num:"",
            propertyYearNum:""
          },
          {
            formatName:"商铺",
            coveredArea: "",
            num:"",
            propertyYearNum:""
          },
          {
            formatName:"车位",
            coveredArea: "",
            num:"",
            propertyYearNum:""
          },
          {
            formatName:"储藏室",
            coveredArea: "",
            num:"",
            propertyYearNum:""
          }],
        /*******************图片展示*********************/
        carouselFigureShow:false, //轮播图莫泰控制窗口
        surroundingEnvironmentPicture:[],//周边配套图
        surroundingEnvironmentPictureTitle:"区位图", //周边配套图标题
        effectPicture:[],//效果图
        effectPictureTitle:"效果图", //效果图标题
        trafficMap:[],//交通图
        trafficMapTitle:"鸟瞰图",//交通图标题
        RealPicture:[],//实景图
        RealPictureTitle:"实景图",//实景图标题
        ModelPicture:[], // 样板图
        ModelPictureTitle:"样板图",//样板图标题
        MatchingPicture:[], // 样板图
        MatchingPictureTitle:"样板图",//样板图标题
        pictureList:[],//轮播图暂时图片库
        pictureTitle:"",
        /*******************其他信息部分****************/
        otherMsgList:{
          salesTelePhone:"",
          salsAddress:"",
          salesStatus:"",
          propertyCompany:""
        },
        /********页面基本信息*********/
        //pageMsg:null
        currentProjectId:0 //当前查看页面id
      }
    },

    created(){
        this.currentProjectId = this.$route.params.id;
        let that = this;

        let params = new URLSearchParams();
        params.append("id",this.currentProjectId);

        getProjectInfoById(params)
          .then(data=>{
            if(data.status == "200"){
              //项目概要
              that.EssentialsMsg.projectName = data.data.projectName;
              that.EssentialsMsg.projectCityName = data.data.projectCityName;         //
              that.EssentialsMsg.projectCompanyNames = data.data.projectCompanyNames; //这里需要公司名称

              if(data.data.escrowType =="1"){
                that.EssentialsMsg.escrowType = "代建";
              }else if(data.data.escrowType =="0"){
                that.EssentialsMsg.escrowType = "投资";
              }

              that.EssentialsMsg.projectGrade = data.data.projectGrade;
              that.EssentialsMsg.projectMgrName = data.data.projectMgrName;
              that.EssentialsMsg.marketMgrName = data.data.marketMgrName;
              that.EssentialsMsg.cityName = data.data.cityName;
              that.EssentialsMsg.postCode = data.data.postCode;
              that.EssentialsMsg.kickOffDate = data.data.kickOffDate;
              that.EssentialsMsg.remark = data.data.remark;
              //项目信息
              that.projectInformationMsg.buildingAreaAmount = data.data.buildingAreaAmount;//总建筑面积
              that.projectInformationMsg.undergroundArea = data.data.undergroundArea;//地下面积
              that.projectInformationMsg.overgroundArea = data.data.overgroundArea;//地上面积
              that.projectInformationMsg.greenArea = data.data.greenArea;//绿化面积
              that.projectInformationMsg.landArea = data.data.landArea;//占地面积
              that.projectInformationMsg.greenRate = data.data.greenRate;//绿化率
              that.projectInformationMsg.canRentArea = data.data.canRentArea;//可出租面积
              that.projectInformationMsg.floorAreaRate = data.data.floorAreaRate;//容积率
              that.projectInformationMsg.ownUseArea = data.data.ownUseArea;//自用面积
              that.projectInformationMsg.carRate = data.data.carRate;//车位配比
              that.projectInformationMsg.carNum = data.data.carNum;//车位数
              that.projectInformationMsg.totalHouseHolder = data.data.totalHouseHolder;//总户数
              //业态信息
              that.prjFormatList = data.data.prjFormatList;
              //其他信息
              that.otherMsgList.salesTelePhone = data.data.salesTelePhone;//销售热线
              that.otherMsgList.salsAddress = data.data.salsAddress;//销售地址
              if(data.data.salesStatus == 1){
                that.otherMsgList.salesStatus = "在售";
              }else if(data.data.salesStatus == 2){
                that.otherMsgList.salesStatus = "已售";
              }
              //that.otherMsgList.salesStatus = data.data.salesStatus;//销售状态
              that.otherMsgList.propertyCompany = data.data.propertyCompany;//物业公司

              /*************图片获取***************/
              if(data.data.resourcesMap){
                if( data.data.resourcesMap.re_location){
                  data.data.resourcesMap.re_location.map((item,index)=>{

                    this.surroundingEnvironmentPicture.push(item.fileUrl);
                  });
                }

                if(data.data.resourcesMap.re_effect){
                  data.data.resourcesMap.re_effect.map((item,index)=>{

                    this.effectPicture.push(item.fileUrl);
                  });
                }

                if(data.data.resourcesMap.re_airscape ){
                  data.data.resourcesMap.re_airscape.map((item,index)=>{

                    this.trafficMap.push(item.fileUrl);
                  });
                }

                if(data.data.resourcesMap.re_real ){
                  data.data.resourcesMap.re_real.map((item,index)=>{

                    this.RealPicture.push(item.fileUrl);
                  });
                }

                if( data.data.resourcesMap.re_template){
                  data.data.resourcesMap.re_template.map((item,index)=>{

                    this.ModelPicture.push(item.fileUrl);
                  });
                }

                if( data.data.resourcesMap.re_support){
                  data.data.resourcesMap.re_support.map((item,index)=>{

                    this.MatchingPicture.push(item.fileUrl);
                  });
                }
              }
            }
          });
    },

    methods:{
      //返回按键触发事件
      handleCallBackClick(){
        this.$router.push('/mainPage/plan/projectInfo');
      },
      editorProject(){
        this.$router.push({ name: 'editorProject', params: { id: this.currentProjectId }});
      },
      /**********************图片展示部分的方法**************************/
      //点击图片显示轮播图
      handleShowCarouselFigure(index){
        this.currentPictureListIndex = index;
        if(index ===0){
          this.pictureList = this.surroundingEnvironmentPicture;
          this.pictureTitle = this.surroundingEnvironmentPictureTitle + " "+ (this.pictureList.length!==0? 1:0) +"/"+this.pictureList.length;
        }else if( index === 1){
          this.pictureList = this.effectPicture;
          this.pictureTitle = this.effectPictureTitle + " "+ (this.pictureList.length!==0? 1:0) +"/"+this.pictureList.length;
        }else if(index === 2){
          this.pictureList = this.trafficMap;
          this.pictureTitle = this.trafficMapTitle + " "+ (this.pictureList.length!==0? 1:0) +"/"+this.pictureList.length;
        }else if(index === 3){
          this.pictureList = this.RealPicture;
          this.pictureTitle = this.RealPictureTitle + " "+ (this.pictureList.length!==0? 1:0) +"/"+this.pictureList.length;
        }else if(index === 4){
          this.pictureList = this.ModelPicture;
          this.pictureTitle = this.ModelPictureTitle + " "+ (this.pictureList.length!==0? 1:0) +"/"+this.pictureList.length;
        }
        this.carouselFigureShow = true;
      },

      carouselFigureChange(index){
        this.pictureTitle = "";
        if(this.currentPictureListIndex === 0){
          this.pictureTitle = this.surroundingEnvironmentPictureTitle +" "+( index + 1 )+"/"+this.pictureList.length;
        }else if( this.currentPictureListIndex === 1 ){
          this.pictureTitle = this.effectPictureTitle +" "+( index + 1 )+"/"+this.pictureList.length;
        }else if(this.currentPictureListIndex === 2){
          this.pictureTitle = this.trafficMapTitle +" "+( index + 1 )+"/"+this.pictureList.length;
        }else if( this.currentPictureListIndex === 3 ){
          this.pictureTitle = this.RealPictureTitle+" "+( index + 1 )+"/"+this.pictureList.length;
        }else if( this.currentPictureListIndex === 4 ){
          this.pictureTitle = this.ModelPictureTitle+" "+( index + 1 )+"/"+this.pictureList.length;
        }
      },
    }

  }
</script>

<style scoped>
  .messageBox{
    border: 1px solid #E5E5E5;
    border-radius: 5px;
    margin-bottom: 20px;
    background-color: #fff;
    box-shadow: 0px 2px 2px #e5e5e5;
  }

  .messageBoxHeader{
    height: 19px;
    line-height: 19px;
    overflow: hidden;
    padding: 5px 25px;
    text-align: center;
    border-bottom: 1px solid #E5E5E5;
  }

  .messageBoxTitle{
    float: left;
    color: #007440;
  }
  .headRight{
    float: right;
    line-height: 19px;
  }

  .boxBody{
    padding: 20px 25px 17px 25px;
  }

  .EssentialsInputItem{
    width: 174px;
    height: 29px;
    overflow: hidden;
    line-height: 29px;
  }

  .essentialsItem{
    display: inline-block;
    margin-bottom: 19px;
  }

  .carouselFigureItem{
    width: 200px;
    padding: 10px;
  }

  .carouselFigureItemHead{
    width: 100%;
    overflow: hidden;
    margin-bottom: 5px;
    color: #666;
  }

  .carouselFigureItemHeadLeft{
    float: left;
    font-size: 12px;
    font-weight: 100;
  }
  .carouselFigureItemHeadRight{
    float: right;
    font-size: 12px;
    font-weight: 100;
  }
  .imageBox{
    width: 100%;
    height: 140px;
    margin-bottom: 5px;
    background-color: #99a9bf;
  }

  .imageBox>img{
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .pictureItem{
    height: 100%;
    width: 100%;
  }

  .otherMsgItem{
    display: inline-block;
    margin-bottom: 15px;
  }

  .otherMsgInputItem{
    width: 190px;
    height: 28px;
  }
  .formLine{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .carouselFigureBox{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .hideItem{
    visibility: hidden;
  }

  .btnLine{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  }
  .mainBtn
  {
    width: 95px;
    height: 32px;
    text-align: center;
    margin-left: 30px;
  }

  .saveBtn{
    color: white;
    background-color: #4dbe61 ;
    border-color: #4dbe61;
  }
  .btn{
    color: white;
    background-color: #4dbe61 ;
    border-color: #4dbe61;
  }
  .itemBox{
    height: 28px;
    margin-bottom: 15px;
    font-size: 12px;
    color: #666;
    line-height: 28px;
  }
  .itemLabel{
    display: inline-block;
    margin-right: 8px;
    height: 28px;
    /* width: 100px; */
    text-align: right;
    line-height: 28px;
  }

  .itemMsg{
    display: inline-block;
    min-height: 28px;
    max-height: 58px;
    width: 250px;
    text-align: left;
    line-height: 28px;
    vertical-align: top;
    overflow: auto;
  }

  /* .lineFirstItem{
    width: 70px;
  } */
  .projectLineFirstItem{
    width: 90px;
  }
  .editorBtn{
    display: inline-block;
    width: 28px;
    height: 19px;
    line-height: 19px;
    font-size: 14px;
    color:#4DBE61 ;
    text-align: center;
    margin-left: 10px;
    cursor: pointer;
  }
  .itemTextAreaLabel{
    vertical-align: top;
  }
  .itemTextAreaMsg{
    width: 560px;
    height: 50px;
    overflow: auto;
  }

  /***********可抽离部分************/
  .standardTitle{
    font-size: 14px;
    color: #404040;
  }
</style>
