import Vue from 'vue'
import Router from 'vue-router'
import {
  Message,
  MessageBox
} from 'element-ui'
import Login from '@/pages/login/index' // 登录模块
import loading from '@/pages/login/loading.vue' // 登录模块
import mainPage from '@/pages/mainPage/index' // 主页面模块
import Cookies from 'js-cookie' //引入cookie
import store from '../store/index.js'

import accredit from '@/pages/failed/accredit.vue' //401页面
import requestFailed from '@/pages/failed/requestFailed.vue' //404页面

import {
  element, //获取按钮权限
  menus, //获取权限列表
} from '@/api/pages/login/index.js';

import Plan from '@/pages/mainPage/plan' // 项目准备模块
import SystemManagement from '@/pages/mainPage/systemManagement' // 系统管理模块
import transactionManagement from '@/pages/mainPage/transactionManagement' // 交易管理模块
import workspaceManagement from '@/pages/mainPage/workspaceManagement' // 工作台模块

import ProjectInfo from '@/pages/mainPage/plan/projectInfo' // 项目信息模块
import NewProject from '@/pages/mainPage/plan/projectInfo/newProject' // 新建项目模块
import CheckProject from '@/pages/mainPage/plan/projectInfo/checkNewProject' // 查看项目模块
import EditorProject from '@/pages/mainPage/plan/projectInfo/editorProject' //编辑项目模块

import Staging from '@/pages/mainPage/plan/staging' // 房源管理模块

import Team from '@/pages/mainPage/plan/team' // 销售团队模块

import Price from '@/pages/mainPage/plan/price' // 销售团队模块

import Print from '@/pages/mainPage/plan/print' // 套打模块

import DictionaryManagement from '@/pages/mainPage/systemManagement/dictionaryManagement' // 字典管理模块
import JurisdictionManagement from '@/pages/mainPage/systemManagement/jurisdictionManagement' // 权限管理模块
import MenuManagement from '@/pages/mainPage/systemManagement/menuManagement' // 菜单管理模块
import OrganizationManagement from '@/pages/mainPage/systemManagement/organizationManagement' // 组织管理模块
import UserManagement from '@/pages/mainPage/systemManagement/userManagement' // 用户管理
import TaskManagement from '@/pages/mainPage/systemManagement/taskManagement' // 任务管理
import caseManagement from '@/pages/mainPage/systemManagement/caseManagement' // 案场管理
import SignRecord from '@/pages/mainPage/systemManagement/caseManagement/SignRecord' // 签到记录
import fieldMaintenance from '@/pages/mainPage/systemManagement/caseManagement/fieldMaintenance' // 案场维护
import evaluateList from '@/pages/mainPage/systemManagement/caseManagement/evaluateList' // 评价列表
import versionManagement from '@/pages/mainPage/systemManagement/caseManagement/versionManagement' // 版本管理

// 交易管理模块 子模块
import HouseQuery from '@/pages/mainPage/transactionManagement/houseQuery' // 房源查询
import PushplateManagement from '@/pages/mainPage/transactionManagement/pushplateManagement' // 推盘查询
import ContractManagement from '@/pages/mainPage/transactionManagement/contractManagement' // 签约管理
// import QianyueAdd from '@/pages/mainPage/transactionManagement/contractManagement/qianyueAdd' //签约新增
import FromTheManagement from '@/pages/mainPage/transactionManagement/fromTheManagement' // 认筹管理
import SubscriptionManagement from '@/pages/mainPage/transactionManagement/subscriptionManagement' // 认购管理
import changeBusiness from '@/pages/mainPage/transactionManagement/changeBusiness' // 业务变更
import AreaFillpost from '@/pages/mainPage/transactionManagement/AreaFillpost' // 面积补差
import opening from '@/pages/mainPage/transactionManagement/opening' // 电子开盘
import checked from '@/pages/mainPage/transactionManagement/opening/check' // 电子签到
import lottery from '@/pages/mainPage/transactionManagement/opening/lottery' // 电子签到
// import SmallSet from '@/pages/mainPage/transactionManagement/smallSet' // 推盘查询
// import EleopeningManagement from '@/pages/mainPage/transactionManagement/pushplateManagement/eleopeningManagement' //电子开盘
// import ChangenumManagement from '@/pages/mainPage/transactionManagement/pushplateManagement/changenumManagement' //摇号列表

// 客户跟进 模块
import customerFollowUp from '@/pages/mainPage/customerFollowUp' // 主模块
import careerAdvisorProtectionPeriod from '@/pages/mainPage/customerFollowUp/careerAdvisorProtectionPeriod' // 职业顾问保护期
import customerManagementView from '@/pages/mainPage/customerFollowUp/customerManagementView' // 客户管理-查看
import customerFollowPage from '@/pages/mainPage/customerFollowUp/customerFollowPage' // 客户管理
import customerAddOrEdit from '@/pages/mainPage/customerFollowUp/customerFollowPage/customerAddOrEdit' // 客户管理 新增 or 修改
import groupLabelManagement from '@/pages/mainPage/customerFollowUp/groupLabelManagement' // 集团标签管理
import projectTaggingManagement from '@/pages/mainPage/customerFollowUp/projectTaggingManagement' // 项目标签管理

// 财务管理模块
import FinancialManagement from '@/pages/mainPage/financialManagement' //财务管理主模块
import BalancePayManagement from '@/pages/mainPage/financialManagement/houseMoneyManagement/balancePayManagement' //收支管理
import FnCheckAmount from '@/pages/mainPage/financialManagement/houseMoneyManagement/fnCheckAmount' //财务复核
import BuildVoucher from '@/pages/mainPage/financialManagement/voucherManagement/buildVoucher' //生成凭证
import QueryVoucher from '@/pages/mainPage/financialManagement/voucherManagement/queryVoucher' //发送凭证
import SubjectSetting from '@/pages/mainPage/financialManagement/interfaceManagement/subjectSetting' //会计科目设置
import SubjectCompare from '@/pages/mainPage/financialManagement/interfaceManagement/subjectCompare' //收付科目对照
import InterfaceFormatSetting from '@/pages/mainPage/financialManagement/interfaceManagement/interfaceFormatSetting' //接口格式设置
import GroupControlPeriod from '@/pages/mainPage/financialManagement/interfaceManagement/GroupControlPeriod' //组团对照期数
import MortgageBank from '@/pages/mainPage/financialManagement/mortgageManagement' //按揭银行
import receivable from '@/pages/mainPage/financialManagement/receivable' //应收款管理
//优惠券
import CountManagement from '@/pages/mainPage/financialManagement/couponManagement/countManagement' //结算管理
import GrantManagement from '@/pages/mainPage/financialManagement/couponManagement/grantManagement' //发放管理
import TransferManagement from '@/pages/mainPage/financialManagement/couponManagement/transferManagement' //转让管理
import UseManagement from '@/pages/mainPage/financialManagement/couponManagement/useManagement' //使用管理
import Remaining from '@/pages/mainPage/financialManagement/voucherQuery/remaining' //优惠券余额查询

// 工作台模块
import spaceIndex from '@/pages/mainPage/workspaceManagement/spaceIndex' // 工作台首页
import notice from '@/pages/mainPage/workspaceManagement/notice' // 公告
import addNotice from '@/pages/mainPage/workspaceManagement/notice/addNotice.vue' // 添加公告
import viewNotice from '@/pages/mainPage/workspaceManagement/notice/viewNotice.vue' // 查看公告
import myActiviti from '@/pages/mainPage/workspaceManagement/myActiviti' // 我的流程
import viewActiviti from '@/pages/mainPage/workspaceManagement/myActiviti/view' // 我的流程
import custom from '@/pages/mainPage/workspaceManagement/custom' // 客户待办
import staySign from '@/pages/mainPage/workspaceManagement/custom/staySign' // 待签约
import stayPay from '@/pages/mainPage/workspaceManagement/custom/stayPay' // 待付款
import stayFollow from '@/pages/mainPage/workspaceManagement/custom/stayFollow' // 待跟进
import stayAllot from '@/pages/mainPage/workspaceManagement/custom/stayAllot' // 待分配
import willBeLost from '@/pages/mainPage/workspaceManagement/custom/willBeLost' // 将流失



//数据分析
import dataAnalysis from '@/pages/mainPage/dataAnalysis' //数据分析主模块
//指标录入
import indexEntry from '@/pages/mainPage/dataAnalysis/indexEntry' // 指标录入
import individualIndicators from '@/pages/mainPage/dataAnalysis/indexEntry/individualIndicators' //个人指标
import projectIndicators from '@/pages/mainPage/dataAnalysis/indexEntry/projectIndicators' //项目指标
import zIndicators from '@/pages/mainPage/dataAnalysis/indexEntry/zIndicators' //综合指标比重
//D:\Greentown\src\pages\mainPage\dataAnalysis\indexEntry\zIndicators\zIndicatorsEdit.vue
import zIndicatorsEdit from '@/pages/mainPage/dataAnalysis/indexEntry/zIndicators/zIndicatorsEdit.vue' //综合指标比重编辑

//营销报表
import marketingReport from '@/pages/mainPage/dataAnalysis/marketingReport' // 营销报表
import annualSalesStatistics from '@/pages/mainPage/dataAnalysis/marketingReport/annualSalesStatistics' //历年销售情况统计表
import deconstructedStructureTable from '@/pages/mainPage/dataAnalysis/marketingReport/deconstructedStructureTable' //去化结构表
import economicPerformanceRanking from '@/pages/mainPage/dataAnalysis/marketingReport/economicPerformanceRanking' //经纪人业绩排名
import inventoryAnalysisTable from '@/pages/mainPage/dataAnalysis/marketingReport/inventoryAnalysisTable' //存量房源分析表
import projectDailySheet from '@/pages/mainPage/dataAnalysis/marketingReport/projectDailySheet' //项目销售日报简表
import projectSalesDaily from '@/pages/mainPage/dataAnalysis/marketingReport/projectSalesDaily' //项目销售日报详表
import projectSalesStructureTable from '@/pages/mainPage/dataAnalysis/marketingReport/projectSalesStructureTable' //项目销售结构表
import returnStructureTable from '@/pages/mainPage/dataAnalysis/marketingReport/returnStructureTable' //回款结构表

//财务报表
import FinanciaReport from '@/pages/mainPage/dataAnalysis/financiaReport'//财务报表首页
import DebitDetailTable from '@/pages/mainPage/dataAnalysis/financiaReport/debitDetailTable'//收款明细
import DebitCountTable from '@/pages/mainPage/dataAnalysis/financiaReport/debitCountTable'//收款统计
import ContactDebitDetail from '@/pages/mainPage/dataAnalysis/financiaReport/contactDebitDetail'//合同收款明细表
import ContactDebitCount from '@/pages/mainPage/dataAnalysis/financiaReport/contactDebitCount'//合同收款统计表
import ShoudDebitAmountDetail from '@/pages/mainPage/dataAnalysis/financiaReport/shoudDebitAmountDetail'//应收款余额明细表


import dataAnalysisEvaluate from '@/pages/mainPage/dataAnalysis/evaluate'//短信评价表首页
import evaluateSign from '@/pages/mainPage/dataAnalysis/evaluate/sign'//签约短信评价表


import workflow from '@/components/workflow' // 工作流

Vue.use(Router);

const router = new Router({
  routes: [{
      path: '/',
      name: 'loading',
      component: loading
    },{
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/mainPage',
      name: 'mainPage',
      component: mainPage,
      children: [{
        path: 'plan',
        component: workspaceManagement,
        children: [{
          path: 'projectInfo',
          component: ProjectInfo
        }, {
          path: 'newProject',
          // name:'newProject',
          component: NewProject
        }, {
          path: 'checkProject/:id',
          name: 'checkProject',
          component: CheckProject
        }, {
          path: 'editorProject/:id',
          name: 'editorProject',
          component: EditorProject
        }, {
          path: 'staging',
          component: Staging
        }, {
          path: 'team',
          component: Team
        }, {
          path: 'price',
          component: Price
        }, {
          path: 'print',
          component: Print
        }]
      }, {
        path: 'systemManagement',
        component: workspaceManagement,
        children: [{
            path: 'dictionaryManagement',
            component: DictionaryManagement
          },
          {
            path: 'jurisdictionManagement',
            component: JurisdictionManagement
          }, {
            path: 'menuManagement',
            component: MenuManagement
          }, {
            path: 'organizationManagement',
            component: OrganizationManagement
          }, {
            path: 'userManagement',
            component: UserManagement
          }, {
            path: 'taskManagement',
            component: TaskManagement
          }, {
            path: 'caseManagement',// 案场管理
            component: caseManagement,
            children: [{
              path: 'SignRecord',// 签到记录
              component: SignRecord
            },{
              path: 'fieldMaintenance',// 案场维护
              component: fieldMaintenance
            },{
              path: 'evaluateList',// 评价列表
              component: evaluateList
            },{
              path: 'versionManagement',// 版本管理
              component: versionManagement
            }]
          }, {
            path: '/',
            redirect: 'dictionaryManagement'
          }
        ]
      }, {
        path: 'transactionManagement',
        component: workspaceManagement,
        children: [{
            path: '/',
            redirect: 'houseQuery'
          },
          {
            path: 'houseQuery', // 房源查询
            component: HouseQuery
          }, {
            path: 'pushplateManagement', // 推盘管理
            component: PushplateManagement
          },
          // {
          //   path: 'eleopeningManagement',//电子开盘
          //   component: EleopeningManagement
          // },{
          //   path: 'changenumManagement',//摇号列表
          //   component: ChangenumManagement
          // },
          {
            path: 'contractManagement', // 签约管理
            component: ContractManagement
          },
          // {
          //   path: 'qianyueAdd', // 签约新增
          //   component: QianyueAdd
          // },
          {
            path: 'fromTheManagement', // 认筹管理
            component: FromTheManagement
          },
          {
            path: 'subscriptionManagement', // 认购管理
            component: SubscriptionManagement
          },
          {
            path: 'opening', // 电子开盘
            component: opening
          },
          {
            path: 'checked', // 电子签到
            component: checked
          }, {
            path: 'lottery', // 电子摇号
            component: lottery
          },
          {
            path: 'changeBusiness', // 业务变更
            component: changeBusiness
          },
          {
            path: 'AreaFillpost', // 面积补差
            component: AreaFillpost
          },
          {
            path: '/',
            redirect: 'houseQuery'
          }
        ],
      }, {
        path: 'workspaceManagement',
        component: workspaceManagement,
        children: [{
            path: '/',
            redirect: 'spaceIndex'
          },
          {
            path: 'spaceIndex', // 工作台首页
            component: spaceIndex
          },
          {
            path: 'myActiviti', // 我的流程
            component: myActiviti
          }, {
            name: 'view',
            path: 'view/:id/:formType/:businessKey', // 待签约
            component: viewActiviti
          },
          {
            path: 'custom', // 客户待办
            component: custom,
            children: [{
                path: 'staySign', // 待签约
                component: staySign
              },
              {
                path: 'stayPay', // 待付款
                component: stayPay
              },
              {
                path: 'stayFollow', // 待跟进
                component: stayFollow,
              },
              {
                path: 'stayAllot', // 待分配
                component: stayAllot
              },
              {
                path: 'willBeLost', // 将流失
                component: willBeLost
              }, {
                path: 'customerManagementView',
                component: customerManagementView
              },
                {
                  path: 'customerAdd',
                  component: customerAddOrEdit
                },
                {
                  path: 'customerEdit',
                  component: customerAddOrEdit
                },
              {
                path: '/',
                redirect: 'staySign'
              }
            ]
          },
          {
            path: 'notice', // 公告
            component: notice
          },
          {
            name: 'addNotice',// 添加公告
            path: 'addNotice',
            component: addNotice
          },
          {
            name: 'viewNotice',// 公告
            path: 'viewNotice/:id',
            component: viewNotice
          },
        ],
      }, {
        path: 'customerFollowUp',
        component: workspaceManagement,
        children: [{
            path: '/',
            redirect: 'customerFollowPage'
          },
          {
            path: 'careerAdvisorProtectionPeriod',
            component: careerAdvisorProtectionPeriod
          },
          {
            path: 'customerManagementView',
            component: customerManagementView
          },
          {
            path: 'customerFollowPage',
            component: customerFollowPage
          },
          {
            path: 'customerAdd',
            component: customerAddOrEdit
          },
          {
            path: 'customerEdit',
            component: customerAddOrEdit
          },
          {
            path: 'groupLabelManagement',
            component: groupLabelManagement
          },
          {
            path: 'projectTaggingManagement',
            component: projectTaggingManagement
          },
        ],
      }, {
        path: 'financialManagement',
        component: FinancialManagement,
        children: [{
            path: '/',
            redirect: 'balancePayManagement'
          },
          {
            path: 'balancePayManagement',
            component: BalancePayManagement
          },
          {
            path: 'fnCheckAmount',
            component: FnCheckAmount
          },
          {
            path: 'buildVoucher',
            component: BuildVoucher
          },
          {
            path: 'queryVoucher',
            component: QueryVoucher
          },
          {
            path: 'subjectSetting',
            component: SubjectSetting
          },
          {
            path: 'subjectCompare',
            component: SubjectCompare
          },
          {
            path: 'interfaceFormatSetting',
            component: InterfaceFormatSetting
          },
          {
            path: 'GroupControlPeriod',
            component: GroupControlPeriod
          },
          {
            path: 'mortgageBank',
            component: MortgageBank
          },
          {
            path: 'countManagement',
            component: CountManagement
          },
          {
            path: 'transferManagement',
            component: TransferManagement
          },
          {
            path: 'grantManagement',
            component: GrantManagement
          },
          {
            path: 'useManagement',
            component: UseManagement
          },
          {
            path: 'remaining',
            component: Remaining
          },
          {
            path: 'receivable',
            component: receivable
          }
        ],
      }, {
        path: 'dataAnalysis',
        component: dataAnalysis,
        children: [{
          path: 'indexEntry',
          component: indexEntry,
          children: [{
            path: 'individualIndicators',
            component: individualIndicators
          }, {
            path: 'projectIndicators',
            component: projectIndicators
          },{
            path: 'zIndicators',
            component: zIndicators
          }
          ,{
            path: 'zIndicatorsEdit',
            component: zIndicatorsEdit
          }, {
            path: '/',
            redirect: 'zIndicators'
          }]
        }, {
          path: 'marketingReport',
          component: marketingReport,
          children: [{
              path: 'annualSalesStatistics',
              component: annualSalesStatistics,
            },
            {
              path: 'deconstructedStructureTable',
              component: deconstructedStructureTable,
            },
            {
              path: 'economicPerformanceRanking',
              component: economicPerformanceRanking,
            },
            {
              path: 'inventoryAnalysisTable',
              component: inventoryAnalysisTable,
            },
            {
              path: 'projectDailySheet',
              component: projectDailySheet,
            },
            {
              path: 'projectSalesDaily',
              component: projectSalesDaily,
            },
            {
              path: 'projectSalesStructureTable',
              component: projectSalesStructureTable,
            },
            {
              path: 'returnStructureTable',
              component: returnStructureTable,
            },
            {
              path: '/',
              redirect: 'projectDailySheet'
            }
          ]
        },{
          path:'financiaReport',
          component:FinanciaReport,
          children:[
            {
              path:'debitDetailTable',
              component:DebitDetailTable,
            },
            {
              path:'debitCountTable',
              component:DebitCountTable,
            },
            {
              path:'contactDebitDetail',
              component:ContactDebitDetail,
            },
            {
              path:'contactDebitCount',
              component:ContactDebitCount,
            },
            {
              path:'shoudDebitAmountDetail',
              component:ShoudDebitAmountDetail,
            }
          ]
        },{
          path:'dataAnalysisEvaluate',// 短信评价报表
          component:dataAnalysisEvaluate,
          children:[
            {
              path:'evaluateSign',// 签约短信
              component:evaluateSign,
            }
          ]
        }, {
          path: '/',
          redirect: 'indexEntry',

        }]



      }, {
        path: '/',
        redirect: 'workspaceManagement'

      }]
    }, {
      path: '/workflow',
      name: 'workflow',
      component: workflow
    }, {
      path: '/accredit',
      name: 'accredit',
      component: accredit
    }, {
      path: '/requestFailed',
      name: 'requestFailed',
      component: requestFailed
    }, {
      path: '/ssologin',
      name: 'spaceIndex',
    }

  ]
})


export default router

//router为vue-router路由对象

router.beforeEach((to, from, next) => {
  if (to.fullPath.indexOf('/mainPage') === -1) {
    next();
    return;
  }

  if(!Cookies.get('crm-token')){
    store.dispatch('CasLogin',{url:window.location.origin+"/#"+to.fullPath}).then(res =>{
      sessionMap(to, from, next);
    });
    return;
  }
  sessionMap(to, from, next);
})

export function sessionMap(to, from, next){
  let p = sessionStorage.getItem("permission-list");
  if(!p){
    element().then((res)=>{
      if(res){
        sessionStorage.setItem("permission-list", JSON.stringify(res))
      }
    });
  }

  let m = sessionStorage.getItem("menus");
  let topMenuList = [];
  if (m) {
    topMenuList = JSON.parse(m);
  }
  if (topMenuList == null || topMenuList.length === 0) {
    menus().then(res => {
      topMenuList = res;
      if (topMenuList.length === 0 || res.status === 40101) {
        MessageBox.confirm('当前用户无权限信息或登录信息过期', '无权限信息', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          Cookies.remove('crm-token');
          next({
            path: "/",
            replace: true
          });
        });
      } else {
        sessionStorage.setItem("menus", JSON.stringify(topMenuList));
        setTimeout(() => {
          nextRole(topMenuList, to, from, next);
        }, 30);
      }
    });
    return;
  }

  nextRole(topMenuList, to, from, next);
}

export function nextRole(m, to, from, next) {
  // debugger;
  let flg = true;
  //判断权限里是否包含该路由
  let p = sessionStorage.getItem("permission-list");
  m.map((v,k) => {
    if(v.children != null && v.children.length > 0){
      p += "," + JSON.stringify(v.children);
    }
  })
  //debugger;
  //获取的当前要去的路由（剔除参数）
  let toPath = to.path;
  to.matched.map((tv,tk) =>{
    if(tv.path.split("/").length > 3){
      if (tv.path.split("/:").length > 1) {
        toPath = tv.path.split("/:")[0]
      };
    }
    if(toPath != '/mainPage/customerFollowUp/customerManagementView' && toPath != '/mainPage/customerFollowUp/customerEdit' && toPath != '/mainPage/customerFollowUp/customerFollowPage'){
      sessionStorage.removeItem('custom-filter');
      sessionStorage.removeItem('city-company');
    }
  });

  if(p.indexOf(toPath) !== -1){
    flg = false;
  }

  //不包含处理方式：取当前一级目录下第一个子菜单》 当前一级菜单也没有时，取第一个一级菜单；
  if (flg) {
    let href;
    m.map((v,k) => {
      if(v.children != null && v.children.length > 0 && v.href.indexOf(toPath.split("/")[2]) !== -1){
        let c = v.children;
        while (true) {
          if (c[0].children == null || c[0].children.length == 0) {
            href = c[0].href;
            break;
          }
          c = c[0].children;
        }
      }
    })
    m.map((v,k) => {
      if(href == undefined && v.children != null && v.children.length > 0){
        let c = v.children;
        while (true) {
          if (c[0].children == null || c[0].children.length == 0) {
            href = c[0].href;
            break;
          }
          c = c[0].children;
        }
      }
    })
    if (href == undefined) {
      MessageBox.confirm('当前用户无权限信息，请联系管理员添加权限', '无权限信息', {
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        Cookies.remove('crm-token');
        next({
          path: "/",
          replace: true
        });
        return;
      });
    }
    next({
      path: href,
      replace: true
    });
    return;
  }
  next();
}
