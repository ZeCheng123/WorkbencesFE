import{_ as M,a as U,b as Y}from"./logoXX-Cy74BE6B.js";import{_ as $}from"./download-Dan4AgsM.js";import{d as L,g as E,a as F,r as v,k as O,n as T,G as y,c as S,b as s,e as t,w as l,f as n,p as q,h as A,o as V,F as G,x as j,B as H,i as D,_ as J}from"./index-1-lRGkZt.js";const _=g=>(q("data-v-d49d411b"),g=g(),A(),g),K={class:"main"},Q=_(()=>s("span",{class:"header"}," 订单中心 ",-1)),R={class:"search"},W={class:"left"},X=_(()=>s("span",{style:{width:"336px",height:"32px"}},null,-1)),Z={class:"right"},ee=_(()=>s("img",{src:U,alt:""},null,-1)),te=_(()=>s("img",{src:Y,alt:""},null,-1)),ae={class:"table_header"},oe=_(()=>s("span",{class:"left"},[s("img",{src:M,alt:""}),s("span",{class:"title"})],-1)),le={class:"right"},se=_(()=>s("img",{src:$,alt:""},null,-1)),ne={class:"table"},re=["onClick"],ce=L({__name:"index",setup(g){const{proxy:C}=E(),e=F({orderNo:"",customerName:"",customerPhone:"",filterMethod:"",createDate:[],orderStatus:""}),m=v({pageIndex:1,pageSize:15,total:0});v([{value:"all",label:"全部"}]);const k=v([{code:"",name:"全部"},{code:"0",name:"正在录单"},{code:"1",name:"已打单"},{code:"2",name:"已入成品库"},{code:"3",name:"已提交"},{code:"4",name:"已生产下单"},{code:"5",name:"已发货"},{code:"6",name:"已订单审核"},{code:"7",name:"已财务审核"},{code:"8",name:"已经销商确认"},{code:"9",name:"已物料产能稽核"},{code:"10",name:"已物流到货"},{code:"11",name:"已白坏稽核"},{code:"12",name:"已经销商收货"},{code:"13",name:"已油漆"},{code:"14",name:"订单完结"},{code:"15",name:"已包装"},{code:"16",name:"锁定"}]),x=v([]);O(()=>{h(!1)});const h=p=>{const a=e.orderNo,u=e.customerName,i=e.customerPhone,f=e.orderStatus;let r={pageNo:m.value.pageIndex,pageSize:m.value.pageSize};a!=""&&(r.po=a),u!=""&&(r.accountName=u),i!=""&&(r.accountPhone=i),f!=""&&(r.status__c=f),e.createDate!=null&&e.createDate[0]!=null&&e.createDate[0]!=""&&(r.from=e.createDate[0]+" 00:00:00"),e.createDate!=null&&e.createDate[1]!=null&&e.createDate[1]!=""&&(r.to=e.createDate[1]+" 23:59:59"),T(r).then(c=>{let b=c.data.data;b.length>0?(x.value=b,p&&y({message:"查询成功",type:"success"})):(x.value=[],y({message:"暂无数据",type:"error"})),m.value={pageIndex:c.data.current==null?1:parseInt(c.data.current),pageSize:c.data.size,total:c.data.total}}).catch(c=>{y({message:"请求数据失败，请重试",type:"error"}),console.error("请求数据失败:",c)})},I=p=>{C.$router.push({path:"/historical_orders_details",query:{id:p.id,po:p.po,status__c:p.status__c}})},P=p=>{m.value.pageIndex=p,h(!1)},w=()=>{e.orderNo="",e.customerName="",e.customerPhone="",e.filterMethod="",e.createDate=[],e.orderStatus="",h(!1)};return(p,a)=>{const u=n("el-input"),i=n("el-form-item"),f=n("el-form"),r=n("el-date-picker"),c=n("el-option"),b=n("el-select"),N=n("el-button"),d=n("el-table-column"),z=n("el-table"),B=n("el-pagination");return V(),S("div",K,[Q,s("span",R,[s("span",W,[t(f,{model:e,"label-width":"80px","label-position":"left"},{default:l(()=>[t(i,{label:"订单编号"},{default:l(()=>[t(u,{placeholder:"请输入任务编号",modelValue:e.orderNo,"onUpdate:modelValue":a[0]||(a[0]=o=>e.orderNo=o)},null,8,["modelValue"])]),_:1}),t(i,{label:"客户姓名"},{default:l(()=>[t(u,{placeholder:"输入客户姓名",modelValue:e.customerName,"onUpdate:modelValue":a[1]||(a[1]=o=>e.customerName=o)},null,8,["modelValue"])]),_:1}),t(i,{label:"客户电话"},{default:l(()=>[t(u,{placeholder:"请输入客户电话",modelValue:e.customerPhone,"onUpdate:modelValue":a[2]||(a[2]=o=>e.customerPhone=o)},null,8,["modelValue"])]),_:1})]),_:1},8,["model"]),t(f,{model:e,"label-width":"80px","label-position":"left"},{default:l(()=>[t(i,{label:"创建时间"},{default:l(()=>[t(r,{modelValue:e.createDate,"onUpdate:modelValue":a[3]||(a[3]=o=>e.createDate=o),type:"daterange","range-separator":"~","start-placeholder":"开始时间","end-placeholder":"结束时间","value-format":"YYYY-MM-DD"},null,8,["modelValue"])]),_:1}),t(i,{label:"订单状态"},{default:l(()=>[t(b,{modelValue:e.orderStatus,"onUpdate:modelValue":a[4]||(a[4]=o=>e.orderStatus=o),placeholder:"请选择订单状态"},{default:l(()=>[(V(!0),S(G,null,j(k.value,o=>(V(),H(c,{key:o.code,label:o.name,value:o.code},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),X]),_:1},8,["model"])]),s("span",Z,[t(N,{onClick:a[5]||(a[5]=o=>h(!0)),type:"primary",class:"search_btn"},{icon:l(()=>[ee]),default:l(()=>[D("查询")]),_:1}),t(N,{onClick:a[6]||(a[6]=o=>w()),type:"primary",class:"reset_btn"},{icon:l(()=>[te]),default:l(()=>[D("重置")]),_:1})])]),s("span",ae,[oe,s("span",le,[t(N,{type:"primary",class:"reset_btn"},{icon:l(()=>[se]),default:l(()=>[D("下载")]),_:1})])]),s("span",ne,[t(z,{class:"table_content",data:x.value,stripe:!1,style:{width:"100%"}},{default:l(()=>[t(d,{prop:"po",label:"订单编号"}),t(d,{prop:"storeName__c",label:"专卖店名称"}),t(d,{prop:"storeNo",label:"专卖店编号"}),t(d,{prop:"accountName__C",label:"客户名称"}),t(d,{prop:"customerAddress",label:"客户地址"}),t(d,{prop:"productionOrderNo__c",label:"生产单号"}),t(d,{prop:"createdTime",label:"创建时间"}),t(d,{prop:"status__c",label:"状态"}),t(d,{prop:"text8",label:"操作",width:"80px"},{default:l(o=>[s("div",{style:{display:"flex","align-items":"center",color:"#165dff",cursor:"pointer"},onClick:de=>I(o.row)}," 查看 ",8,re)]),_:1})]),_:1},8,["data"]),t(B,{class:"table_pagination","page-size":m.value.pageSize,"pager-count":15,layout:"total, prev, pager, next",total:m.value.total,onCurrentChange:P},null,8,["page-size","total"])])])}}}),ue=J(ce,[["__scopeId","data-v-d49d411b"]]);export{ue as default};
