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
import { userInfo } from "os";
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
