<template>
    <div id = "team" >
        <div class="left">
          <el-input placeholder="搜索关键字" v-model="filterText" class = "searchKyWord"></el-input>
          <div class="companyProjectTreeBox">
            <el-tree class="filter-tree" highlight-current accordion :data="companyProject" :props="defaultProps"
                     :filter-node-method="filterNode" ref="teamTree" @node-click="handleNodeClick" >
            </el-tree>
          </div>
        </div>
        <div class="right" >
          <v-info :teamList="teamList" v-on:changeTeamTree="changeTeamTree" ></v-info>
        </div>
    </div>
</template>

<script>
  import axios from "@/axios/api.js";
  import { getProjectTree ,getProjectTeam } from "@/api/pages/mainPage/plan/team/index.js";
  import Info from './info';

  export default {
    components: {
       'v-info': Info
    },

    watch: {
      filterText(val) {
        this.$refs.teamTree.filter(val);
      }
    },

    created(){
      this.companyProject = [];
      let userInfo = JSON.parse(sessionStorage.getItem('user-info'));
      if( userInfo.cityId ){// 
          this.companyProject.push({// 如果有城市公司，将该城市公司push进城市公司下拉数据
              id: userInfo.cityId,
              name: userInfo.cityName,
              code: userInfo.cityCode,
              children: []
          })
          if( userInfo.projects && userInfo.projects[0] && userInfo.cityId ){// 如果有项目，将这些项目放进城市公司下
            this.companyProject[0].children = userInfo.projects;
            this.companyProject[0].children.map(item=>{
              item.name = item.projectName
            })
          }else{
            getProjectTree().then(res=>{// 如果没有项目，请求所有城市公司数据，将该城市公司下的所有项目放进下拉数据中
              if(res.status === 200){
                res.data.map(item=>{
                  if( item.name === userInfo.cityName ){
                    this.companyProject[0].children = item.children
                  }
                })
                // this.companyProject = res.data;
              }
            });
          }
      }else{
          getProjectTree().then(res=>{
            if(res.status === 200){
              this.companyProject = res.data;
            }
          });
      }
      
    },

    methods: {
      /**********树的方法***************/
      //树的输入框过滤
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },

      //树的节点被点击时触发
      handleNodeClick(data,node){
        //console.log(node);
        let that = this;
        if(node.childNodes.length === 0 && node.level!==1){
          let params = new URLSearchParams();
          params.append( "projectId",node.data.id );//node.data.id
          getProjectTeam(params)
            .then(res=>{
               ;
              if(res.status == '200'){
                that.teamList = res.data;
              }
            });
        }
      },

      //响应子组件编辑团队树
      changeTeamTree(data){
        //console.log("data11111111",data.data);
        this.teamList = data;
        this.$message({
          type: 'info',
          message: '操作成功!',
          showClose: true
        });
      }
    },

    data() {
      return {
        filterText: '',//过滤字
        /**********加载的团队信息*************/
        /**********公司项目信息**************/
        companyProject: [],
        /**********团队信息**********/
        teamList: [],
        /************树本身的属性配置**************/
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      };
    }
  };

</script>

<style  scoped>
  .teamManage{
    height: 100%;
    overflow:hidden;
  }

  .teamManageRight{
    height: 745px;
    background-color: #fff;
  }

  .teamManageLeft{
    min-height: 100%;
    overflow:hidden;
    background-color: #fff;
    /*border-right: 1px solid #E5E5E5;*/
    /*box-shadow: 1px 0 1px;*/
    /*border-radius: 5px;*/
  }

  .companyProjectTreeBox{
    flex: 1;
    /*height: 100%;*/
    overflow: auto;
  }

  .searchKyWord{
    margin-bottom: 10px;
    padding-bottom: 12px;
    border-bottom: 1px solid #E5E5E5;
  }

  #team{
    position: absolute;
    top: 20px;
    left: 20px;
    bottom: 0;
    right: 20px;
    background-color: #fff;
    padding: 10px 13px;
    border-radius: 5px;
    overflow: paged-y;

    display: flex;
    flex-direction: row;
  }

  .filter-tree{
    height: 100%;
    /*border: 1px solid #E5E5E5;*/
    border-bottom: none;
    border-top: none;
  }

  /*.container{*/
    /*position: absolute;*/
    /*left:20px;*/
    /*top:65px;*/
    /*bottom: 20px;*/
    /*right: 20px;*/
    /*overflow: hidden;*/
  /*}*/
  .left{
    /*float: left;*/
    width: 200px;
    margin-right: 20px;
    text-align: center;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .right{
    /*float: left;*/
    flex: 1;
    height: 100%;
  }

</style>
