import{_ as Q,a as X,b as Y}from"./tips-DfmWQaVF.js";import{d as Z,g as U,r as p,B as ss,o as es,E as J,c as C,h as s,y as f,t as l,u as c,v as ts,b as h,w as S,F as L,q,C as as,e as j,p as os,f as ns,i as x,x as cs,j as ls,_ as is}from"./index-CYx_7u_I.js";import{A as ds,B as _s,k as ps}from"./common-DvLzv8E6.js";import"./userinfo-CGvVdpj9.js";const a=E=>(os("data-v-d2722a9f"),E=E(),ns(),E),rs={class:"main"},us={class:"header"},hs=a(()=>s("span",{class:"title"},"派工单状态",-1)),ms={class:"step"},fs={class:"order_info"},vs=a(()=>s("span",{class:"title"},"派工单详情",-1)),gs={class:"main_field"},bs={class:"row_field"},ys={class:"field"},Ps=a(()=>s("span",{class:"label"},"派工编号：",-1)),Is={class:"value"},ws={class:"field"},xs=a(()=>s("span",{class:"label"},"派工类型：",-1)),Es={class:"value"},Ns={class:"field"},ks=a(()=>s("span",{class:"label"},"派工状态：",-1)),Cs={class:"value"},Ss={class:"row_field"},js={class:"field"},Bs=a(()=>s("span",{class:"label"},"服务技工：",-1)),Ts={class:"value"},Ds={class:"field"},Js=a(()=>s("span",{class:"label"},"服务技工电话：",-1)),Fs={class:"value"},Ms={class:"field"},Os=a(()=>s("span",{class:"label"},"客户地址：",-1)),Vs={class:"value"},$s={class:"row_field"},Ls={class:"field"},qs=a(()=>s("span",{class:"label"},"客户姓名：",-1)),As={class:"value"},Rs={class:"field"},zs=a(()=>s("span",{class:"label"},"客户电话：",-1)),Gs={class:"value"},Ws=a(()=>s("span",{class:"title"},"派工要求",-1)),Hs={class:"other_field"},Ks={class:"row_field"},Qs={class:"field"},Xs=a(()=>s("span",{class:"label"},"计划开始：",-1)),Ys={class:"value"},Zs={class:"field"},Us=a(()=>s("span",{class:"label"},"计划结束：",-1)),se={class:"value"},ee={class:"field"},te=a(()=>s("span",{class:"label"},"优先级：",-1)),ae={class:"value"},oe={class:"row_field"},ne={class:"field"},ce=a(()=>s("span",{class:"label"},"是否具备安装条件：",-1)),le={class:"value"},ie={class:"service_evaluation_list"},de=a(()=>s("span",{class:"table_title"},"服务评价",-1)),_e={class:"table_content"},pe={class:"dispatch_attachment_list"},re=a(()=>s("span",{class:"table_title"},"派工附件",-1)),ue={class:"table_content"},he={class:"action_list"},me=a(()=>s("img",{src:Q,alt:""},null,-1)),fe={class:"right"},ve={class:"userinfo"},ge=a(()=>s("img",{src:X,alt:""},null,-1)),be={class:"username"},ye={class:"content"},Pe={class:"date"},Ie=a(()=>s("span",{class:"reply"},"回复",-1)),we=a(()=>s("img",{class:"tips",src:Y,alt:""},null,-1)),xe=Z({__name:"index",setup(E){U();const r=p(3),F=p([]),A=ss();let o=p({});const B=p([]),R=p([{code:"1",name:"最高"},{code:"2",name:"高"},{code:"3",name:"中"},{code:"4",name:"低"}]),z=p([{code:"all",name:"全部"},{code:"0",name:"配送派工单"},{code:"1",name:"安装派工单"},{code:"2",name:"维修派工单"}]),G=p([{code:"all",name:"全部"},{code:"0",name:"待开始"},{code:"1",name:"进行中"},{code:"2",name:"已完成"}]);p([]);const M=p([]),u=p([]),v=m=>{r.value=m},O=()=>{as.prompt("请填写评论内容","发起评论",{inputPattern:/\S/,inputErrorMessage:"评论内容不能为空!",confirmButtonText:"确认",cancelButtonText:"取消"}).then(({value:m})=>{F.value.push({userName:"经销商",text:m,date:new Date().toLocaleString()})}).catch(()=>{})};es(()=>{W(!0,A.query.id),H(!1)});const W=(m,d)=>{ds(d).then(i=>{let e=i.data.data;if(e!=null){o.value=e,v(e.stage__c);var _="https://sh.mengtian.com.cn:9595/md/api/common/file/direct-download?fileId=";if(e.goodsPicture!=null&&e.goodsPicture.length>0){var N=[];e.goodsPicture.forEach(n=>{N.push(_+n)}),u.value.push({picNo:e.goodsPicture.join(","),type:"货物图片",goodsPicture:N})}if(e.docPicture!=null&&e.docPicture.length>0){var g=[];e.docPicture.forEach(n=>{g.push(_+n)}),u.value.push({picNo:e.docPicture.join(","),type:"安装图片",goodsPicture:g})}if(e.checkInPicture!=null&&e.checkInPicture.length>0){var b=[];e.checkInPicture.forEach(n=>{b.push(_+n)}),u.value.push({picNo:e.checkInPicture.join(","),type:"打卡签到",goodsPicture:b})}if(e.scenePicture!=null&&e.scenePicture.length>0){var y=[];e.scenePicture.forEach(n=>{y.push(_+n)}),u.value.push({picNo:e.scenePicture.join(","),type:"现场墙面保护",goodsPicture:y})}if(e.beforeInstallPicture!=null&&e.beforeInstallPicture.length>0){var P=[];e.beforeInstallPicture.forEach(n=>{P.push(_+n)}),u.value.push({picNo:e.beforeInstallPicture.join(","),type:"安装前图片",goodsPicture:P})}if(e.afterInstallPicture!=null&&e.afterInstallPicture.length>0){var I=[];e.afterInstallPicture.forEach(n=>{I.push(_+n)}),u.value.push({picNo:e.afterInstallPicture.join(","),type:"安装后图片",goodsPicture:I})}if(e.afterInstallScenePicture!=null&&e.afterInstallScenePicture.length>0){var t=[];e.afterInstallScenePicture.forEach(n=>{t.push(_+n)}),u.value.push({picNo:e.afterInstallScenePicture.join(","),type:"安装后现场环境图片",goodsPicture:t})}if(e.completePicture!=null&&e.completePicture.length>0){var k=[];e.completePicture.forEach(n=>{k.push(_+n)}),u.value.push({picNo:e.completePicture.join(","),type:"完工证明",goodsPicture:k})}let T={type:"field_job",recordId:o.value.neoId};_s(T).then(n=>{let w=n.data;if(w.code=="success"&&w.data&&w.data.length>0){let V=w.data[w.data.length-1],D=1;Object.keys(V).forEach($=>{let K={sNumber:D,type:$,satisfaction:V[$]};M.value.push(K),D=D+1}),v(3)}})}}).catch(i=>{J({message:"请求数据失败，请重试",type:"error"}),console.error("请求数据失败:",i)})},H=m=>{ps({userType:1,name:"",phone:""}).then(i=>{let e=i.data.data;e!=null&&e.length>0?(B.value=e,m&&J({message:"查询成功",type:"success"})):m&&J({message:"获取数据失败",type:"error"})})};return(m,d)=>{var g,b,y,P,I;const i=j("el-table-column"),e=j("el-table"),_=j("el-image"),N=j("el-button");return x(),C("div",rs,[s("span",us,[hs,s("span",ms,[s("span",{class:"item",onClick:d[0]||(d[0]=t=>v(0))},[s("span",{class:f(r.value==0?"num_selected":"num")},"1",2),s("span",{class:f(r.value>=0?"name_selected":"name")},"待开始",2)]),s("span",{class:"item",onClick:d[1]||(d[1]=t=>v(1))},[s("span",{class:f(r.value==1?"num_selected":"num")},"2",2),s("span",{class:f(r.value>=1?"name_selected":"name")},"进行中",2)]),s("span",{class:"item",onClick:d[2]||(d[2]=t=>v(2))},[s("span",{class:f(r.value==2?"num_selected":"num")},"3",2),s("span",{class:f(r.value>=2?"name_selected":"name")},"已完成",2)]),s("span",{class:"item",onClick:d[3]||(d[3]=t=>v(3))},[s("span",{class:f(r.value==3?"num_selected":"num")},"4",2),s("span",{class:f(r.value>=3?"name_selected":"name")},"已评价",2)])])]),s("span",fs,[vs,s("span",gs,[s("span",bs,[s("span",ys,[Ps,s("span",Is,l(c(o).caseNo),1),ts("",!0)]),s("span",ws,[xs,s("span",Es,l(c(o).fieldJobType__c?(g=z.value.find(t=>t.code==c(o).fieldJobType__c))==null?void 0:g.name:"配送派工单"),1)]),s("span",Ns,[ks,s("span",Cs,l(c(o).stage__c?(b=G.value.find(t=>t.code==c(o).stage__c))==null?void 0:b.name:"待开始"),1)])]),s("span",Ss,[s("span",js,[Bs,s("span",Ts,l(c(o).followerId?(y=B.value.find(t=>t.id==c(o).followerId))==null?void 0:y.name:""),1)]),s("span",Ds,[Js,s("span",Fs,l(c(o).followerId?(P=B.value.find(t=>t.id==c(o).followerId))==null?void 0:P.phone:""),1)]),s("span",Ms,[Os,s("span",Vs,l(c(o).address),1)])]),s("span",$s,[s("span",Ls,[qs,s("span",As,l(c(o).fieldJobContactName),1)]),s("span",Rs,[zs,s("span",Gs,l(c(o).contactTelephone),1)])])]),Ws,s("span",Hs,[s("span",Ks,[s("span",Qs,[Xs,s("span",Ys,l(c(o).appointmentStartTime),1)]),s("span",Zs,[Us,s("span",se,l(c(o).appointmentEndTime),1)]),s("span",ee,[te,s("span",ae,l(c(o).priority?(I=R.value.find(t=>t.code==c(o).priority))==null?void 0:I.name:""),1)])]),s("span",oe,[s("span",ne,[ce,s("span",le,l(c(o).whetherEvaluation===!1?"否":"是"),1)])])])]),s("span",ie,[de,s("span",_e,[h(e,{data:M.value,stripe:!1,style:{width:"100%"},"max-height":"100"},{default:S(()=>[h(i,{prop:"sNumber",label:"序号"}),h(i,{prop:"type",label:"评价类型"}),h(i,{prop:"satisfaction",label:"满意度"})]),_:1},8,["data"])])]),s("span",pe,[re,s("span",ue,[h(e,{data:u.value,stripe:!1,style:{width:"100%"},"max-height":"100"},{default:S(()=>[h(i,{prop:"picNo",label:"附件编号"}),h(i,{prop:"type",label:"类型"}),h(i,{prop:"text3",label:"附件链接"},{default:S(({row:t})=>[(x(!0),C(L,null,q(t.goodsPicture,(k,T)=>(x(),cs(_,{key:T,style:{"margin-right":"5px",width:"50px"},src:k,"preview-src-list":t.goodsPicture},null,8,["src","preview-src-list"]))),128))]),_:1})]),_:1},8,["data"])])]),s("span",he,[s("div",{class:"left"},[me,s("span",{class:"initiate_comments",onClick:O},"发起任务评论")]),s("div",fe,[h(N,{type:"primary",onClick:O,class:"primary_btn"},{default:S(()=>[ls("编辑")]),_:1})])]),(x(!0),C(L,null,q(F.value,t=>(x(),C("div",{class:"comment",key:t.date},[s("div",ve,[ge,s("span",be,l(t.userName),1)]),s("div",ye,l(t.text),1),s("div",Pe,l(t.date),1),Ie,we]))),128))])}}}),Se=is(xe,[["__scopeId","data-v-d2722a9f"]]);export{Se as default};
