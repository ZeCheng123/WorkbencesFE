<template>
  <div class="main">
    验证
  </div>
</template>


<script setup lang="ts">
import { ref, computed, getCurrentInstance, reactive, onMounted } from "vue"
import { userInfoStore } from '../../store/userinfo'
import { wecom, addExternalUser} from '../../api/common.js'

//此界面处理登录逻辑
const { proxy }: any = getCurrentInstance()

const userinfoStore = userInfoStore();

const phone = ref(null)

const code = ref(null)

const userInfo = ref({
  userId: "",
  corpId: "",
  token: ""
});

onMounted(() =>{
    const index = window.location.href.indexOf("?");
    const paramsStr = index >= 0 ? window.location.href.substring(index + 1) : window.location.href;
    const searchParams = new URLSearchParams(paramsStr);
    const wxcode = searchParams.get('code');
    if(wxcode){
      alert("wxcode:"+ wxcode)
      code.value = wxcode
      //调用企微登录接口
      getAuth();
    }
})

const getAuth = async () => {
  return new Promise(function (resolve) {
      wecom({code: code.value, userType: 2}).then(res =>{
          let rtData = res.data;
          if(rtData.code == "success"){
              let data = rtData.data || {};
              userInfo.value = data;
              //token存在时直接进入主界面
              if(userInfo.value.token)
              {
                localStorage.setItem("token",data["token"]);
                sessionStorage.setItem("token",data["token"]);
                proxy.$router.push({path:"/main", query:{}});
              }
              //不存在时需要根据当前返回内容、提示用户输入手机号后再新增用户
              else{
                proxy.$prompt('请输入用户手机号', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  showCancelButton: false, // 将取消按钮隐藏
                  showClose: false,
                  inputPlaceholder: '请输入手机号',
                  inputPattern: /^1[3456789]\d{9}$/, // 手机号格式的正则表达式
                  inputErrorMessage: '手机号格式不正确!', // 输入格式错误时的提示信息
                }).then(({ value }) => {
                  // 用户点击了确定按钮，value 为用户输入的值
                  phone.value = value;
                  addExternalUserAction();
                }).catch(() => {
                  // 用户点击了取消按钮，或者点击遮罩层关闭了弹窗
                });
              }

          }
          resolve(true)
      })
  })
}

const addExternalUserAction = async() =>{
  let params = {
    phone: phone.value,
    name: phone.value,
    corpId: userInfo.value.corpId,
    userId: userInfo.value.userId,
    userType: 2
  }
  alert("新增用户接口参数:"+ JSON.stringify(params))
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




</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
