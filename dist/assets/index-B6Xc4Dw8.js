import{_ as Y,a as F,b as q}from"./logoXX-KcEG4fMf.js";import{_ as O}from"./download-Dan4AgsM.js";import{d as j}from"./common-DNv9NPC-.js";import{d as A,g as P,r as g,a as G,o as K,A as Q,E as T,c as V,h as n,b as a,w as o,e as r,p as R,f as X,i as x,F as C,q as z,x as I,j as W,t as $,_ as Z}from"./index-DwwqDRnZ.js";import"./userinfo-B4NFwAcm.js";const v=k=>(R("data-v-dffd586d"),k=k(),X(),k),ee={class:"main"},te=v(()=>n("span",{class:"header"}," 派工单 ",-1)),ae={class:"search"},le={class:"left"},oe=v(()=>n("span",{style:{width:"336px",height:"32px"}},null,-1)),ne={class:"right"},se=v(()=>n("img",{src:F,alt:""},null,-1)),ie=v(()=>n("img",{src:q,alt:""},null,-1)),ce={class:"table_header"},de=v(()=>n("span",{class:"left"},[n("img",{src:Y,alt:""}),n("span",{class:"title"})],-1)),re={class:"right"},pe=v(()=>n("img",{src:O,alt:""},null,-1)),ue={style:{display:"flex","align-items":"center"}},_e={style:{display:"flex","align-items":"center"}},me=["onClick"],he=A({__name:"index",setup(k){const{proxy:H}=P(),h=g({pageIndex:1,pageSize:15,total:0}),e=G({dispatchWorkerNo:"",technicianName:"",technicianType:"",filterMethod:"",createDate:[],dispatchWorkerStatus:""});g([{value:"all",label:"全部"}]);const D=g([{code:"",name:"全部"},{code:"0",name:"配送派工单"},{code:"1",name:"安装派工单"},{code:"2",name:"维修派工单"}]),E=g([{code:"",name:"全部"},{code:"0",name:"待开始"},{code:"1",name:"进行中"},{code:"2",name:"已完成"}]),m=g(null),N=g([]),M=d=>{H.$router.push({path:"/dispatch_details",query:{id:d.id}})};K(()=>{w(!1);const d="100%"/"100%";if(window.addEventListener("resize",Q.debounce(function(){const s=document.body.clientHeight,i=document.body.clientWidth;if(i<1680){const b=s/i;let[c,y]=[0,0];if(b<d){c=s/1080;const p=1920*c,u=i-p;y=u>0?`translate(${u/2}px, 0)`:""}else{c=(i-20)/1920;const p=1080*c,u=s-p;y=u>0?`translate(0, ${u/2}px)`:""}if(b<.52){let p=document.body.clientHeight/c-242*c-10;m.value&&(m.value.style.height=`${p}px`)}else if(m.value){let p=document.body.clientHeight*c+242*c+10;m.value.style.height=`${p}px`}}else m.value&&(m.value.style.height=`calc(${document.body.clientHeight}px - 242px)`)},66)),document.createEvent){var l=document.createEvent("HTMLEvents");l.initEvent("resize",!0,!0),window.dispatchEvent(l)}else typeof Event=="function"&&window.dispatchEvent(new Event("resize"))});const w=d=>{let l={fieldJobType__c:e.technicianType==null?"":e.technicianType,appointmentEndTime:"",from:e.createDate==null||e.createDate[0]==null?"":e.createDate[0]+" 00:00:00",to:e.createDate==null||e.createDate[1]==null?"":e.createDate[1]+" 23:59:59",status:e.dispatchWorkerStatus==null?"":e.dispatchWorkerStatus,caseNo:e.dispatchWorkerNo==null?"":e.dispatchWorkerNo,artisanName:e.technicianName==null?"":e.technicianName,pageSize:h.value.pageSize,pageNo:h.value.pageIndex};j(l).then(s=>{let i=s.data.data;i.length>0?(N.value=i,d&&T({message:"查询成功",type:"success"})):(N.value=[],T({message:"暂无对应数据",type:"error"})),h.value={pageIndex:s.data.current==null?1:parseInt(s.data.current),pageSize:s.data.size,total:s.data.total}}).catch(s=>{T({message:"请求数据失败，请重试",type:"error"}),console.error("请求数据失败:",s)})},B=d=>{h.value.pageIndex=d,w(!1)},J=()=>{e.dispatchWorkerNo="",e.technicianName="",e.technicianType="",e.filterMethod="",e.createDate=[],e.dispatchWorkerStatus="",w(!1)};return(d,l)=>{const s=r("el-input"),i=r("el-form-item"),b=r("el-option"),c=r("el-select"),y=r("el-form"),p=r("el-date-picker"),u=r("el-button"),_=r("el-table-column"),U=r("el-table"),L=r("el-pagination");return x(),V("div",ee,[te,n("span",ae,[n("span",le,[a(y,{model:e,rules:d.rule,"label-width":"80px","label-position":"left"},{default:o(()=>[a(i,{label:"派工编号"},{default:o(()=>[a(s,{placeholder:"请输入派工编号",modelValue:e.dispatchWorkerNo,"onUpdate:modelValue":l[0]||(l[0]=t=>e.dispatchWorkerNo=t)},null,8,["modelValue"])]),_:1}),a(i,{label:"技工姓名"},{default:o(()=>[a(s,{placeholder:"输入技工姓名",modelValue:e.technicianName,"onUpdate:modelValue":l[1]||(l[1]=t=>e.technicianName=t)},null,8,["modelValue"])]),_:1}),a(i,{label:"技工种类"},{default:o(()=>[a(c,{modelValue:e.technicianType,"onUpdate:modelValue":l[2]||(l[2]=t=>e.technicianType=t),placeholder:"请选择派工种类"},{default:o(()=>[(x(!0),V(C,null,z(D.value,t=>(x(),I(b,{key:t.code,label:t.name,value:t.code},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model","rules"]),a(y,{model:e,rules:d.rule,"label-width":"80px","label-position":"left"},{default:o(()=>[a(i,{label:"创建时间"},{default:o(()=>[a(p,{modelValue:e.createDate,"onUpdate:modelValue":l[3]||(l[3]=t=>e.createDate=t),type:"daterange","range-separator":"~","start-placeholder":"开始时间","end-placeholder":"结束时间","value-format":"YYYY-MM-DD"},null,8,["modelValue"])]),_:1}),a(i,{label:"派工状态"},{default:o(()=>[a(c,{modelValue:e.dispatchWorkerStatus,"onUpdate:modelValue":l[4]||(l[4]=t=>e.dispatchWorkerStatus=t),placeholder:"请选择派工状态"},{default:o(()=>[(x(!0),V(C,null,z(E.value,t=>(x(),I(b,{key:t.code,label:t.name,value:t.code},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),oe]),_:1},8,["model","rules"])]),n("span",ne,[a(u,{onClick:l[5]||(l[5]=t=>w(!0)),type:"primary",class:"search_btn"},{icon:o(()=>[se]),default:o(()=>[W("查询")]),_:1}),a(u,{onClick:l[6]||(l[6]=t=>J()),type:"primary",class:"reset_btn"},{icon:o(()=>[ie]),default:o(()=>[W("重置")]),_:1})])]),n("span",ce,[de,n("span",re,[a(u,{type:"primary",class:"reset_btn"},{icon:o(()=>[pe]),default:o(()=>[W("下载")]),_:1})])]),n("span",{class:"table",ref_key:"mainTable",ref:m},[a(U,{class:"table_content",data:N.value,stripe:!1,style:{width:"100%"}},{default:o(()=>[a(_,{prop:"caseNo",label:"派工编号"}),a(_,{prop:"appointmentStartTime",label:"计划开始时间"}),a(_,{prop:"appointmentEndTime",label:"计划结束时间"}),a(_,{prop:"follower__c",label:"技工名称"}),a(_,{prop:"fieldJobType__c",label:"派工种类"},{default:o(t=>{var f;return[n("div",ue,$(t.row.fieldJobType__c?(f=D.value.find(S=>S.code==t.row.fieldJobType__c))==null?void 0:f.name:"配送派工单"),1)]}),_:1}),a(_,{prop:"createdTime",label:"创建时间"}),a(_,{prop:"stage__c",label:"派工状态"},{default:o(t=>{var f;return[n("div",_e,$(t.row.stage__c?(f=E.value.find(S=>S.code==t.row.stage__c))==null?void 0:f.name:"待开始"),1)]}),_:1}),a(_,{prop:"text8",label:"操作",width:"80px"},{default:o(t=>[n("div",{style:{display:"flex","align-items":"center",color:"#165dff",cursor:"pointer"},onClick:f=>M(t.row)}," 查看 ",8,me)]),_:1})]),_:1},8,["data"]),a(L,{class:"table_pagination","page-size":h.value.pageSize,"pager-count":15,layout:"total, prev, pager, next",total:h.value.total,onCurrentChange:B},null,8,["page-size","total"])],512)])}}}),xe=Z(he,[["__scopeId","data-v-dffd586d"]]);export{xe as default};
