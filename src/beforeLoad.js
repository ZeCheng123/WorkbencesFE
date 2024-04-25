import { wecom } from './api/common.js'
// import { userInfoStore } from './store/userinfo'
// const userinfoStore = userInfoStore();
export default {
	install(app) {
        const index = window.location.href.indexOf("?");
        const paramsStr = index >= 0 ? window.location.href.substring(index + 1) : window.location.href;
        const searchParams = new URLSearchParams(paramsStr);
        const code = searchParams.get('code');
        if(code){
            //加载环境变量
		    this.getAuth(code);
        }
	},

	async getAuth(code) {
		return new Promise(function (resolve) {
            wecom({code: code, userType: 2}).then(res =>{
                let rtData = res.data;
                if(rtData.code == "success"){
                    let data = rtData.data || {};
                    console.log(data);
                    // userinfoStore.setUserInfo(data);
                }
                resolve(true)
            })
		})
	},
}


