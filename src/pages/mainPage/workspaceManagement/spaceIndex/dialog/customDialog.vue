<template>
    <div class="baobiao" style="height:1500px">
        <div v-if="show" id="iframeS">
                <i class="icon  el-icon-loading"></i>
                <span>正在计算中 · · ·</span>
        </div>
        <div style="margin-top:20px;">
            <el-radio-group v-model="type" @change="getFrame">
                <el-radio-button label="1">今日</el-radio-button>
                <el-radio-button label="2">本周</el-radio-button>
                <el-radio-button label="3">本月</el-radio-button>
                <el-radio-button label="4">本年</el-radio-button>
            </el-radio-group>            
        </div>
        <div id="iframeBox">
            
            <iframe id="iframeId" class="iframe mt-20" height="1500" width="100%" ref="iframe" :src="this.url"></iframe>
        </div>
    </div>
</template>

<script>
import CRM_GLOBAL from "@/api/pages/common/CRM_GLOBAL.js";
export default {
  data() {
    return {
      name: "数据统计",
      //选择页面
      activeName: "",
      //选择时间
      type: "1",
      //开始时间
      stateTime: "",
      //结束时间
      endTime: "",
      //报表地址
      url: "",
      //项目id
      projectId: "",
      //登录人id
      userId: "",
      //loading模板的显示
      show: true
    };
  },
  props: {
    projectAA: String
  },
  watch: {
    projectAA(e) {
      console.log("监听11111", e);
      this.projectId = e;
      this.getUrl();
    }
  },

  methods: {
    //获取时间参数
    getFrame() {
      //loding模板
      this.show = true;
      //获取时间
      let datas = new Date();
      let dataTimeOue = datas.getTime();
      let dataT = dataTimeOue + 24 * 60 * 60 * 1000;
      let data = new Date(dataT);
      //let data = new Data(dataTimeOue)
      if (this.type === "1") {
        this.stateTime = datas.toLocaleDateString().replace(/\//g, "-");
        this.endTime = data.toLocaleDateString().replace(/\//g, "-");
        this.getUrl();
      } else if (this.type === "2") {
        let week = datas.getDay();
        week = week === 0 ? 7 : week;
        let Nowdate = new Date();
        let WeekFirstDay = new Date(Nowdate - (week - 1) * 86400000);
        let M = Number(WeekFirstDay.getMonth()) + 1;
        this.stateTime =
          Nowdate.getFullYear() + "-" + M + "-" + WeekFirstDay.getDate();
        this.endTime = data.toLocaleDateString().replace(/\//g, "-");
        function getWeekStartDate() {
          var weekStartDate = new Date(
            nowYear,
            nowMonth,
            nowDay - nowDayOfWeek
          );
          return formatDate(weekStartDate);
        }
        this.getUrl();
      } else if (this.type === "3") {
        let Nowdate = new Date();
        let MonthFirstDay = new Date(Nowdate.getYear(), Nowdate.getMonth(), 1);
        let M = Number(MonthFirstDay.getMonth()) + 1;
        this.stateTime =
          Nowdate.getFullYear() + "-" + M + "-" + MonthFirstDay.getDate();
        this.endTime = data.toLocaleDateString().replace(/\//g, "-");
        this.getUrl();
      } else {
        let nowYear = data.getFullYear();
        this.stateTime = nowYear + "-1-1";
        this.endTime = data.toLocaleDateString().replace(/\//g, "-");
        this.getUrl();
      }
    },
    //更改url
    getUrl() {
      this.url = `${CRM_GLOBAL.HOME_KHFX}&START_DATE=
               ${this.stateTime}&END_DATE=${this.endTime}&project_id=${
        this.projectId
      }&property_consult_id=${this.userId}`;
    }
  },
  created() {
    let that = this;
    let timeE = setInterval(function() {
      let userInfo = JSON.parse(sessionStorage.getItem("user-info"));
      if (userInfo) {
        clearInterval(timeE);
        that.userId = userInfo.id;
        that.getFrame();
      }
    }, 30);
  },
  mounted() {
    let that = this;
    document.querySelector("iframe").addEventListener("load", function() {
      that.show = false;
    });
  }
};
</script>

<style lang="scss" scoped>
.baobiao {
  position: relative;
  #iframeS {
    position: absolute;
    background: black;
    opacity: 0.7;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 1400px;
    z-index: 100;
    color: #2effb8;
    .icon {
      margin-top: 140px;
      display: block;
      font-size: 40px;
      color: #2effb8;
    }
  }
}

#iframeBox {
  .iframe {
    border: none !important;
    height: 1400px;
    overflow: scroll;
  }
}
</style>
>

