<template>
  <!-- <div class="main">登录</div> -->
</template>

<script setup lang="ts">
import { ref, computed, getCurrentInstance, reactive, onMounted } from "vue"
import { userInfoStore } from '../../store/userinfo'
import { useRoute } from 'vue-router'
import { BASE_URL } from "../../api/config"
import  vconsole  from "vconsole"
const { proxy }: any = getCurrentInstance()


const userinfoStore = userInfoStore();

const route = useRoute()
onMounted(() =>{
  new vconsole();
  if (route.redirectedFrom&&route.redirectedFrom.fullPath.includes('problem_report_details?id')){
    //服务工单
    sessionStorage.setItem("problem_report_details", route.redirectedFrom.fullPath);
    localStorage.setItem("problem_report_details", route.redirectedFrom.fullPath);
  }else if(route.redirectedFrom&&route.redirectedFrom.fullPath.includes('aftersales_workorder_details?id')){
    //售后工单
    sessionStorage.setItem("aftersales_workorder_details", route.redirectedFrom.fullPath);
    localStorage.setItem("aftersales_workorder_details", route.redirectedFrom.fullPath);
  }
    // 企业微信授权接口地址
    setTimeout(() => {
      var appid = "wwa53fff1bab51c954";
      var agentid = "1000057";
      var redirect_uri = encodeURIComponent(BASE_URL+"/#/validate");
      var authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=STATE&agentid=${agentid}#wechat_redirect`;
      // window.open(authUrl);
      window.location.href = authUrl
    }, 66);

})

</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>