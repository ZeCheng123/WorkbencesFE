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
               <template #append> <span class="sendCode">发送验证码</span> </template>
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

const { proxy }: any = getCurrentInstance()

const checkbox = ref(false)

const form = reactive({
  phone: "",
  code: "",
})

const clickBtn = () =>{
  if(!checkbox.value)
  {
    proxy.$message.error("请勾选自服务隐私协议")
  }
  else{
    proxy.$router.push("/main");
  }
}

</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
