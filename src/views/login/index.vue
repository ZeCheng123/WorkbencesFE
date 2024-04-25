<template>
  <div class="main">
     <div class="login_box">
        <div class="desc">欢迎进入客户端系统</div>
        <div class="content">
            <span class="title">登录</span>
            <el-input class="phone" placeholder="请输入手机号" v-model="form.phone">
              <template #prepend> <img src="@/assets/images/phone.png" alt=""> </template>
            </el-input>
            <el-input class="code" placeholder="请输入验证码" v-model="form.code">
               <template #prepend> <img src="@/assets/images/code.png" alt=""> </template>
               <template #append> 
                  <span v-if="time_down_count > 0" class="sendCode">{{time_down_count}}s</span> 
                  <span v-else class="sendCode" @click="getSendCode">发送验证码</span>
                </template>
            </el-input>
            <el-button class="login_btn" @click="clickBtn">登录</el-button>
            <span class="checkbox_btn">
                <el-checkbox v-model="checkbox">已通知并阅读<span class="protocol">《自助服务隐私协议》</span></el-checkbox>
            </span>
        </div>
     </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, getCurrentInstance, reactive } from "vue"
import { sendCode,login } from '../../api/common.js'
import { userInfoStore } from '../../store/userinfo'
const { proxy }: any = getCurrentInstance()

const checkbox = ref(false);

const userinfoStore = userInfoStore();

const form = reactive({
  phone: "",
  code: "",
})

const time_down_count = ref(0);

const timer = ref(null)

const getSendCode = () =>{
  if(!form.phone){
    proxy.$message.error("手机号不能为空!");
    return;
  }
  const reg = /^1[3-9]\d{9}$/;
  if(!reg.test(form.phone)){
    proxy.$message.error("手机号不合法!");
    return;
  }
  sendCode({phone:form.phone}).then(res =>{
    let rtData = res.data;
    if(rtData.code == "success"){
      form.code = rtData.data?.captcha;
      time_down_count.value = 60;
      setTimer();
    }
  })
}



const clickBtn = () =>{


    // // 企业微信授权接口地址
    // var appid = "wx3c93310d99a3becf";
    // var agentid = "1000056";
    // var redirect_uri = encodeURIComponent("http://hkhwedi.kwesz.com.cn");
    // var authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=STATE&agentid=${agentid}#wechat_redirect`;
    // window.open(authUrl);


  ////////////////////////////////////////////////////////
  if(!form.phone){
    proxy.$message.error("手机号不能为空!");
    return;
  }
  const reg = /^1[3-9]\d{9}$/;
  if(!reg.test(form.phone)){
    proxy.$message.error("手机号不合法!");
    return;
  }
  if(!form.code){
    proxy.$message.error("验证码不能为空!");
    return;
  }
  if(!checkbox.value)
  {
    proxy.$message.error("请勾选自服务隐私协议");
    return;
  }
  login({phone: form.phone, captcha: form.code, userType: 1}).then(res =>{
    let rtData = res.data;
    if(rtData.code == "success"){
      let data = rtData.data || {};
      userinfoStore.setUserInfo(data);
      proxy.$router.push("/main");
    }
    else{
      proxy.$message.error(res?.message);
    }
  })
}

const setTimer = () =>{
  timer.value = setInterval(() =>{
    if(time_down_count.value>0){
      time_down_count.value -= 1;
    }
    else{
      clearInterval(timer.value);
    }
  },1000)
}

</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
