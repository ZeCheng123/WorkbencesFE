import{d as S,g as k,r as i,u as V,a as x,c as h,b as s,e as A,w as l,f as u,p as B,h as C,o as _,t as U,i as b,s as D,_ as F}from"./index-1-lRGkZt.js";const R="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAYdJREFUSEu1lDFLA0EQhWcuCIIgin9AQSRBLAQbbbRNp4KFegfaaCEIlskmGNAkloIiKILh7gTRIjaKlbWNxELInljkF9gG0exIEhJNvE2yC7lyb+fbN483g9ClD7vEBS3wuJkeLRkiDEIMVYShUeAOy/wVqQyeWEkPfgXEh0+nz9xhU7VzZXDQ3EsAGrt+FgrChTc3eltpQtXjkJm8J4SwpG69ZokyOGglSSomYIzwTKSgpVgGJoQXz2aT+h5b+y4ArjarJsBDz4nuaIPLhSErdU1ASw3xEjSdv4w9aYMlqbjiDlvWzrEsakQi7Lnxh5bganFgFoDmyheJ4MRz2ZZf+1UQHnAnGmn2vB634bXEQG+p5w4AZv5fwptmT6tMyHKbLfrFrw4eM1PzBlJWZWC4w6RzUP/RalTb7YWWihXAZ9xhm+06+1VsJTcA4FRegI+I4jhvxzqyq8Ejn3EtAkCOSJx7bvyinUpp3GoLHAGKhEbuu7/v9f1o+1MFqD15nT6ivDY7Bf8ADkOHFwvZKY0AAAAASUVORK5CYII=",y="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAihJREFUSEvN1E9o01AcB/Dv7yVZb0MFFQ/zMmbrpidXsEykguBBFCtOxBlF9KzCDqJdMWDrQBTBu0VMnSD4BwVRT70JdijI6hqVXRQsTLzMS9fk/ST749o1aSJSMMe87/vk9977vRA69FCHXISCtx7P7mZBoxA0SJJvb/xWv1ksGna7otrC245lexyVRplwvglhlARw42Mh/dAPb4Fjem4fWCZAYieABIBu38oIFZKYlMQlEBWte+kPy9kmOKpnhwnkW0XQeSgs+sqFS1/cXBMcO3HVAIkrQYDvOMs9lUKm+L/CVIagU2DeBObnC6v494qprEgcXd83/6k6oz0A48jfwHcrZvp0TM89A3BgZV8XUTuifCXbdtH9f8b8Ko7q2QsEurUUnFJYpFCrVZ2I9hKEIWARrXVhVrUxAfDexoN0IPs/m5nplsPbMjIeF0K+bQi/qaN+SCFVEyxeuSh1yTnHpgkGdq3qjncVM73Ds4+TSUP93qPNErBmZXn82l7bfTDy81ev1NQ6O/Z9gOMeLXe5YqbHPWH3Zexk7jEYqVUTH4HlFIRyGMzbvfqYwXHLHJv0hQfOGOucee09gM1hLwqD71jm2NnGvOdPaGDkWr8juBwOpjJrSsLKX5wLhN1AVM8OEqgUgP8Ay+HlaxwKdkO9urFBIy3f1KtLswnIS5bXrULG8vp44I8+aRhqdUY9R4wUAzEATwj8dNrMvGi3mkA43D63pjoG/waphdwXWEUOPAAAAABJRU5ErkJggg==",d=r=>(B("data-v-c7f8d6d4"),r=r(),C(),r),M={class:"main"},G={class:"login_box"},T=d(()=>s("div",{class:"desc"},"欢迎进入客户端系统",-1)),X={class:"content"},q=d(()=>s("span",{class:"title"},"登录",-1)),J=d(()=>s("img",{src:R,alt:""},null,-1)),Q=d(()=>s("img",{src:y,alt:""},null,-1)),O={key:0,class:"sendCode"},K={class:"checkbox_btn"},N=d(()=>s("span",{class:"protocol"},"《自助服务隐私协议》",-1)),Y=S({__name:"index",setup(r){const{proxy:m}=k(),g=i(!1);V();const o=x({phone:"",code:""}),a=i(0),v=i(null),w=()=>{if(!o.phone){m.$message.error("手机号不能为空!");return}if(!/^1[3-9]\d{9}$/.test(o.phone)){m.$message.error("手机号不合法!");return}D({phone:o.phone}).then(e=>{var n;let t=e.data;t.code=="success"&&(o.code=(n=t.data)==null?void 0:n.captcha,a.value=60,I())})},E=()=>{var p="wwa53fff1bab51c954",e="1000052",t=encodeURIComponent("https://sh.mengtian.com.cn:9595/#/main"),n=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${p}&redirect_uri=${t}&response_type=code&scope=snsapi_base&state=STATE&agentid=${e}#wechat_redirect`;window.open(n)},I=()=>{v.value=setInterval(()=>{a.value>0?a.value-=1:clearInterval(v.value)},1e3)};return(p,e)=>{const t=u("el-input"),n=u("el-button"),f=u("el-checkbox");return _(),h("div",M,[s("div",G,[T,s("div",X,[q,A(t,{class:"phone",placeholder:"请输入手机号",modelValue:o.phone,"onUpdate:modelValue":e[0]||(e[0]=c=>o.phone=c)},{prepend:l(()=>[J]),_:1},8,["modelValue"]),A(t,{class:"code",placeholder:"请输入验证码",modelValue:o.code,"onUpdate:modelValue":e[1]||(e[1]=c=>o.code=c)},{prepend:l(()=>[Q]),append:l(()=>[a.value>0?(_(),h("span",O,U(a.value)+"s",1)):(_(),h("span",{key:1,class:"sendCode",onClick:w},"发送验证码"))]),_:1},8,["modelValue"]),A(n,{class:"login_btn",onClick:E},{default:l(()=>[b("登录")]),_:1}),s("span",K,[A(f,{modelValue:g.value,"onUpdate:modelValue":e[2]||(e[2]=c=>g.value=c)},{default:l(()=>[b("已通知并阅读"),N]),_:1},8,["modelValue"])])])])])}}}),W=F(Y,[["__scopeId","data-v-c7f8d6d4"]]);export{W as default};
