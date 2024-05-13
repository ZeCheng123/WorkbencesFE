<template>
  <div class="main">
    验证
  </div>
  <button @click="showDialog">打开模态框</button>
  <el-dialog :visible.sync="dialogVisible" title="登录" :close-on-click-modal="false">
    <div class="content">
      <span class="title">登录</span>
      <el-input class="phone" placeholder="请输入手机号" v-model="form.phone">
        <template #prepend> <img src="@/assets/images/phone.png" alt=""> </template>
      </el-input>
      <el-input class="code" placeholder="请输入验证码" v-model="form.code">
        <template #prepend> <img src="@/assets/images/code.png" alt=""> </template>
        <template #append>
          <span v-if="time_down_count > 0" class="sendCode">{{ time_down_count }}s</span>
          <span v-else class="sendCode" @click="getSendCode">发送验证码</span>
        </template>
      </el-input>
      <el-button class="login_btn" @click="clickBtn">登录</el-button>
      <!-- <span class="checkbox_btn">
      <el-checkbox v-model="checkbox">已通知并阅读<span class="protocol">《自助服务隐私协议》</span></el-checkbox>
    </span> -->
    </div>
  </el-dialog>
</template>


<script setup lang="ts">
import { ref, computed, getCurrentInstance, reactive, onMounted } from "vue"
import { userInfoStore } from '../../store/userinfo'
import { wecom, addExternalUser, sendCode, login } from '../../api/common.js'

//此界面处理登录逻辑
const { proxy }: any = getCurrentInstance()

const time_down_count = ref(0);

const userinfoStore = userInfoStore();

const phone = ref(null)

const code = ref(null)

const timer = ref(null)

const dialogVisible = ref(false)

const userInfo = ref({
  userId: "",
  corpId: "",
  token: ""
});

const form = reactive({
  phone: "",
  code: "",
})

onMounted(() => {
  const index = window.location.href.indexOf("?");
  const paramsStr = index >= 0 ? window.location.href.substring(index + 1) : window.location.href;
  const searchParams = new URLSearchParams(paramsStr);
  const wxcode = searchParams.get('code');
  if (wxcode) {
    alert("wxcode:" + wxcode)
    code.value = wxcode
    //调用企微登录接口
    getAuth();
  }
})

const showDialog = () => {
      dialogVisible.value = true;
    };



const getSendCode = () => {
  if (!form.phone) {
    proxy.$message.error("手机号不能为空!");
    return;
  }
  const reg = /^1[3-9]\d{9}$/;
  if (!reg.test(form.phone)) {
    proxy.$message.error("手机号不合法!");
    return;
  }
  sendCode({ phone: form.phone }).then(res => {
    let rtData = res.data;
    if (rtData.code == "success") {
      form.code = rtData.data?.captcha;
      time_down_count.value = 60;
      setTimer();
    }
  })
}

const getAuth = async () => {
  return new Promise(function (resolve) {
    wecom({ code: code.value, userType: 2 }).then(res => {
      let rtData = res.data;
      if (rtData.code == "success") {
        let data = rtData.data || {};
        userInfo.value = data;
        //token存在时直接进入主界面
        if (userInfo.value.token) {
          localStorage.setItem("token", data["token"]);
          sessionStorage.setItem("token", data["token"]);
          proxy.$router.push({ path: "/main", query: {} });
        }
        //不存在时需要根据当前返回内容、提示用户输入手机号后再新增用户
        else {
          dialogVisible.value = true
          phone.value = form.phone
          addExternalUserAction();
          const handleClose = () => {
            console.log('用户点击了取消按钮或者关闭按钮');
            // 在这里可以执行取消按钮点击后的逻辑
          };



          // proxy.$prompt('请输入用户手机号', '提示', {
          //   confirmButtonText: '确定',
          //   cancelButtonText: '取消',
          //   showCancelButton: false, // 将取消按钮隐藏
          //   showClose: false,
          //   inputPlaceholder: '请输入手机号',
          //   inputPattern: /^1[3456789]\d{9}$/, // 手机号格式的正则表达式
          //   inputErrorMessage: '手机号格式不正确!', // 输入格式错误时的提示信息
          // }).then(({ value }) => {
          //   // 用户点击了确定按钮，value 为用户输入的值
          //   phone.value = value;
          //   addExternalUserAction();
          // }).catch(() => {
          //   // 用户点击了取消按钮，或者点击遮罩层关闭了弹窗
          // });
        }

      }
      resolve(true)
    })
  })
}


const clickBtn = () => {
  if (!form.phone) {
    proxy.$message.error("手机号不能为空!");
    return;
  }
  const reg = /^1[3-9]\d{9}$/;
  if (!reg.test(form.phone)) {
    proxy.$message.error("手机号不合法!");
    return;
  }
  if (!form.code) {
    proxy.$message.error("验证码不能为空!");
    return;
  }
  // if(!checkbox.value)
  // {
  //   proxy.$message.error("请勾选自服务隐私协议");
  //   return;
  // }
  login({ phone: form.phone, captcha: form.code, userType: 1 }).then(res => {
    let rtData = res.data;
    if (rtData.code == "success") {
      let data = rtData.data || {};
      userinfoStore.setUserInfo(data);
      proxy.$router.push("/main");
    }
    else {
      proxy.$message.error(res?.message);
    }
  })
}

const addExternalUserAction = async () => {
  let params = {
    phone: phone.value,
    name: phone.value,
    corpId: userInfo.value.corpId,
    userId: userInfo.value.userId,
    userType: 2
  }
  alert("新增用户接口参数:" + JSON.stringify(params))
  addExternalUser(params)
    .then((res: any) => {
      alert(JSON.stringify(res.data));
      if (res?.data?.code == "success") {
        //成功之后再次调用企微登录方法
        getAuth()
      } else {
        console.log("失败")
      }
    })
    .catch((error: any) => {
      alert("新增失败!");
      console.error("新增失败:", error)
    })
}

const setTimer = () => {
  timer.value = setInterval(() => {
    if (time_down_count.value > 0) {
      time_down_count.value -= 1;
    }
    else {
      clearInterval(timer.value);
    }
  }, 1000)
}


</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
