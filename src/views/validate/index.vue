<template>
  <div class="main">
  </div>
  <el-dialog v-model="dialogVisible" title="登录" :close-on-click-modal="false" :show-close="false">
    <div class="content">
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

// const phone = ref(null)

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
    // alert("1.wxcode:" + wxcode)
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
    alert("111111"+JSON.stringify(res));
    if (rtData.code == "success") {
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
        // alert("2.userInfo:" + JSON.stringify(data))
        //token存在时直接进入主界面
        if (userInfo.value.token) {
          // alert("3.userInfo.value.token:" + JSON.stringify(data))

          localStorage.setItem("token", data["token"]);
          sessionStorage.setItem("token", data["token"]);
          let newData = {
            id:data.id ? data.id : null,
            neoid:data.neoId ? data.neoId :null,
            name:data.name ? data.name : null,
            phone:data.phone? data.phone : null,
            userType:data.userType? data.userType :null,
            store:data.store?data.store:null,
            distributor:data.distributor?data.distributor:null,
          }
          localStorage.setItem("userinfo", JSON.stringify(newData));
          sessionStorage.setItem("userinfo", JSON.stringify(newData));
          proxy.$router.push({ path: "/main", query: {} });
        }
        //不存在时需要根据当前返回内容、提示用户输入手机号后再新增用户
        else {
          dialogVisible.value = true
          // alert("3.userInfo:" + JSON.stringify(data))
          // phone.value = form.phone
        }

      }else{
        console.log("错误",res?.message)
        proxy.$message.error("接口错误:",res?.message);
        // alert("token:错误"+JSON.stringify(rtData))
      }
      resolve(true)
    })
  })
}

const handleClose = () => {
  console.log('用户点击了取消按钮或者关闭按钮');
  // 在这里可以执行取消按钮点击后的逻辑
};


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
  login({ phone: form.phone, captcha: form.code, userType: 2 }).then(res => {
    let rtData = res.data;
    if (rtData.code == "success") {
      let data = rtData.data || {};
      alert("4."+JSON.stringify(data));
      addExternalUserAction(data)
      // proxy.$router.push("/main");
    }
    else {
      // alert("111111"+JSON.stringify(rtData));
      proxy.$message.error("接口错误："+res?.message);
    }
  })
}

const addExternalUserAction = async (data) => {
  let params = {
    id:data.id,
    neoId:data.neoId,
    phone: data.phone,
    name: data.name,
    corpId: userInfo.value.corpId,
    userId: userInfo.value.userId,
    userType: 2
  }
  alert("5.新增用户接口参数:" + JSON.stringify(params))
  addExternalUser(params)
    .then((res: any) => {
      alert("6-"+JSON.stringify(res.data));
      if (res?.data?.code == "success") {
        //成功之后再次调用企微登录方法
        getAuth()
      } else {
        console.log("失败")
        proxy.$message.error("新增失败1");
      }
    })
    .catch((error: any) => {
      // alert("新增失败!");
      console.error("新增失败:", error)
      proxy.$message.error("新增失败2",error);
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
