<template>
    <div id="login">
        <div class="login-container">
        <div class="logo_box">
          <img src="/static/images/common/bg_login_logo.png" />
        </div>
        
      </div>
        <div class="bg" v-loading="loading2" element-loading-text="登录中..." element-loading-background="rgba(0, 0, 0, 0.6)">
            <!-- <div>正在登陆，请稍后...</div>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="progress" status="success"></el-progress> -->
        </div>
        
    </div>
</template>

<script>
import Cookies from 'js-cookie' //引入cookie
import {login} from '@/api/pages/login'
    export default {
        data() {
            return{
                progress: 0,
                loading2: true
            }
        },
        mounted() {
            // let timer = setInterval(()=>{
            //     this.progress += 2;
            //     if( this.progress >= 100 ){
            //         window.clearInterval(timer)
            //     }
            // },100)
            if(Cookies.get('crm-token')){
                this.$router.push({
                path: '/mainpage'
                });
            }else{
                if(this.$route.path === '/'){
                this.$store.dispatch('CasLogin',{url:window.location.origin+"/#/mainPage"})
                }
            }
            
        }
    }
</script>

<style scoped>
.bg{
    /* background: #fff; */
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.progress{
    position: absolute;
    height: 18px;
    width: 50%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
</style>