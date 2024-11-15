import { defineStore } from 'pinia'

export const userInfoStore = defineStore({
  id: 'userinfo',
  state: () => ({
    userinfo:{}
  }),
  actions: {
    getUserInfo() {
      return this.userinfo;
    },
    setUserInfo(info){
      this.userinfo = info;
    },
  }
})
