<template>
  <!-- <div class="main">登录</div> -->
</template>

<script setup lang="ts">
import { ref, computed, getCurrentInstance, reactive, onMounted } from "vue"
import { userInfoStore } from '../../store/userinfo'
import { useRoute } from 'vue-router'
const { proxy }: any = getCurrentInstance()


const userinfoStore = userInfoStore();

const route = useRoute()
onMounted(() =>{
  if (route.redirectedFrom.fullPath.includes('problem_report_details?id')){
    sessionStorage.setItem("problem_report_details", route.redirectedFrom.fullPath);
    localStorage.setItem("problem_report_details", route.redirectedFrom.fullPath);
  }
    // 企业微信授权接口地址
    setTimeout(() => {
      var appid = "wwa53fff1bab51c954";
      var agentid = "1000052";
      var redirect_uri = encodeURIComponent("https://sh.mengtian.com.cn:9595/#/validate");
      var authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=STATE&agentid=${agentid}#wechat_redirect`;
      // window.open(authUrl);
      window.location.href = authUrl
    }, 66);

})

</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>