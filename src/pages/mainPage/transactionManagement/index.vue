<template>
	<div class="page transactionManagement-box" id="transaction">

		<el-menu :default-active="activeIndex" class="el-menu-vertical-demo" router>

			<template v-for=" (list , index) in $store.state.menuList[2].children ">
				<template v-if="list.children.length > 0">
					<el-submenu :key = "list.label + index" :index = "list.href" >

						<template slot="title" >{{ list.label}}</template>

						<el-menu-item  v-for="(item,itemIndex)  in list.children "  :index="item.href" :key="item.id + itemIndex">
							<i :class="item.icon"></i>
							<span slot="title">{{ item.label }}</span>
						</el-menu-item>

					</el-submenu>
				</template>

				<template v-else>
					<el-menu-item :key = "list.label + index" :index = "list.href">
						<template slot="title" >{{ list.label }}</template>
					</el-menu-item>
				</template>
			</template>

		</el-menu>

		<router-view></router-view>
	</div>
</template>

<script>
import Vue from 'vue'
Vue.filter('formatMoney', function (num) {
  num = num === null ? "" : (num += "");
  num = +num.split(",").join("");
  return (num || "").toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
})
export default {
   data() {
      return {
        activeIndex: 'subscriptionManagement',
      };
    },
    mounted() {
      // 默认选中
      this.activeIndex = this.$route.path.split('/').pop();
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      }
    }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo {
    width:149px;
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    border-right: #007440 1px solid;
    background: url("/static/images/common/left_bg.png");
    // background-size:100% 100%;
}
.el-menu-item {
	text-align: center;
    border-bottom:1px solid #ccc;
}
.el-menu-vertical-demo span {
    font-size:12px;
    font-weight:900;
}
</style>

<style lang="scss">
  /* 交易管理公共样式 */
  .transactionManagement-box{
    font-size: 14px;
    color: #666;
    .mt-10{
      margin-top: 10px;
    }
    .mr-10{
      margin-right: 10px;
    }
    .mr-20{
      margin-right: 20px;
    }
    .mr-30{
      margin-right: 30px;
    }
    .ml-10{
      margin-left: 10px;
    }
    .mb-20{
      margin-bottom: 20px;
    }
		.mb-10{
			margin-bottom: 10px;
		}
    .fr{
      float: right;
    }
    .fl{
      float: left;
    }
    /*#titleNav{
    	float: left;
    }*/
    .transaction-management-page{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0px;
      right: 0;
      background: white;
      padding: 20px;
      overflow: auto;
      background-color: #F0F0F2;
    }
    .color-green{
      color: #007440;
    }
    .color-title{
      font-size: 14px;
      font-weight: bold;
    }
    .color-title-green{
      font-size: 14px;
      color: #007440;
      font-weight: bold;
    }
		.hide{
			display: none;
		}
		.cursor{
			cursor: pointer;
		}
    /* 信封样式 */
    .envelope-box{
      border: 1px solid #E5E5E5;
      border-radius: 5px;
      background-color: #fff;
			-webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    	box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
    .envelope-title{
      overflow: hidden;
      padding: 10px 25px;
      border-bottom: 1px solid #E5E5E5;
    }
    .envelope-content{
      padding: 20px 25px 17px 25px;
		}
		/* element ui 样式 */
		.el-table tbody tr{
			text-align: center;
		}
		.el-button{
			width: auto!important;
			padding: 5px 10px!important;
			line-height: initial!important;
			height: auto!important;
		}
		.el-form-item__label{
			line-height: 28px!important;
		}
		.el-form-item__content{
			line-height: 28px!important;
		}
		.el-cascader{
			line-height: 28px;
		}
  }

</style>
