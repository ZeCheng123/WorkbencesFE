import{_ as ae,a as te,b as oe,c as se}from"./download-B3fRz18S.js";import{d as ne,g as re,r as u,a as ue,k as ce,c as P,b as o,e as l,w as t,f as c,p as de,h as ie,o as v,F as D,v as L,n as R,i as _,y as z,s as O,u as pe,t as me,_ as _e}from"./index-B3Y2_pOi.js";import{b as fe,c as ge,d as be}from"./common-BvTCi7nM.js";const he="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAACySURBVCiRnZI9DoJAEEY/iKUlBYew8Ajam0hBr3eBe6hHsLD2CJBwEArsHwUTsiazYnjJZGZns/O3IwUAOVABHTCYNObL5QGUQE+cHii9R/9ShOV5mW4mXuZcQB2JfDDxqFJJZ7fp35wSYJC0Ncdd0sPs1vTe9EXS1ezPxhvwwlmSlACdpJ1zdzT9du7aVNLTi7jAa+13ZFMTaxZgngAUkcxhpsKrW0DGtBAN30tez+UZI8iFlEI0TWJpAAAAAElFTkSuQmCC",p=A=>(de("data-v-2f5276ab"),A=A(),ie(),A),ve={class:"main"},Ae=p(()=>o("span",{class:"header"},[o("span",{class:"title"},"问题提报")],-1)),Ne={class:"search"},Ve={class:"left"},ye=p(()=>o("span",{style:{width:"336px",height:"32px"}},null,-1)),Se={class:"right"},we=p(()=>o("img",{src:te,alt:""},null,-1)),Ce=p(()=>o("img",{src:oe,alt:""},null,-1)),Pe={class:"table_header"},xe=p(()=>o("span",{class:"left"},[o("img",{src:ae,alt:""}),o("span",{class:"title"})],-1)),Ue={class:"right"},Ie=p(()=>o("img",{src:he,alt:""},null,-1)),ke=p(()=>o("img",{src:se,alt:""},null,-1)),De={class:"table"},Le={style:{display:"flex","align-items":"center"}},Re={style:{display:"flex","align-items":"center"}},ze=["onClick"],Oe={class:"problemReportingDialog"},Be={class:"step"},Te={class:"item"},$e=p(()=>o("span",{class:"name"},[_("完善提报信息 "),o("span",{class:"remark"},"完善问题提报的信息")],-1)),Ee={class:"item"},Je=p(()=>o("span",{class:"name"},[_("完成创建 "),o("span",{class:"remark"},"等待售服部处理")],-1)),Ze={class:"content"},Fe={class:"dialog-footer"},Qe=ne({__name:"index",setup(A){const{proxy:f}=re(),N=u({pageIndex:0,pageSize:100,total:0}),B=u({Content:"application/json",Authorization:"",isImage:"true",needFileId:"true","Trace-Id":""}),x=u({files:[],name:"files"}),d=ue({problemNo:"",customerName:"",customerPhone:"",filterMethod:"",createDate:[],orderStatus:""});u([{value:"all",label:"全部"}]);const T=u([{value:"all",label:"全部"}]),$=u([{name:"品质",code:"1"},{name:"交期",code:"2"},{name:"服务",code:"3"},{name:"销售",code:"4"}]),E=u([{name:"待分配",code:"1"},{name:"待处理",code:"2"},{name:"处理中",code:"3"},{name:"待回复",code:"4"},{name:"已完成",code:"4"}]),h=u(!1),U=u(1),n=u({orderNo:"",customerName:"",customerPhone:"",desc:"",fileList:[],filePath:[]}),J=u({customerName:[{required:!0,message:"Please input customer name",trigger:"blur"}],customerPhone:[{required:!0,message:"Please input customer phone",trigger:"blur"}],desc:[{required:!0,message:"Please input problem description",trigger:"blur"}]}),V=u([]),y=u([]);ce(()=>{setTimeout(()=>{S(),Y()},500)});const Z=r=>{let e=r.id,s=r.neoid;f.$router.push(`/problem_report_details?id=${e}&neoid=${s}`)},F=()=>{h.value=!0},Q=()=>{for(let e in n.value)if(e!="fileList"&&e!="orderNo"&&n.value[e]==""){f.$message.error("必填字段不能为空!");return}let r={caseNo:n.value.orderNo,caseAccountId:n.value.customerName,phone:n.value.customerPhone,problemDescription:n.value.desc,picture:n.value.filePath.join(";"),caseStatus:"1"};be(r).then(e=>{let s=e.data;s.code=="success"?(n.value={orderNo:"",customerName:"",customerPhone:"",desc:"",fileList:[],filePath:[]},h.value=!1,f.$message.success("提交成功!"),S()):f.$message.error(s==null?void 0:s.message)})},S=()=>{fe({caseStatus:"",caseNo:"",name:""}).then(e=>{let s=e.data;s.code=="success"?(V.value=s.data,N.value={pageIndex:0,pageSize:100,total:s.data.length}):(f.$message.error(s==null?void 0:s.message),V.value=[],N.value={pageIndex:0,pageSize:100,total:0})})},Y=()=>{ge({deliveryDate:"",status__c:"",orderType__c:"",transactionDate:"",po:"",accountName:"",accountPhone:""}).then(e=>{let s=e.data;s.code=="success"?y.value=s.data:f.$message.error(s==null?void 0:s.message)})},j=r=>{let e=y.value.find(s=>s.po==r);e&&(n.value.customerName=e.accountName,n.value.customerPhone=e.accountPhone)},H=r=>{if(console.log(r),r.code=="success"){let e=r.data.map(s=>s.fileUrl);n.value.filePath=n.value.filePath.concat(e)}},q=r=>{var e=r.response;console.log(e)},G=r=>{x.value.files.push(r)};return(r,e)=>{const s=c("el-input"),i=c("el-form-item"),w=c("el-form"),K=c("el-date-picker"),I=c("el-option"),k=c("el-select"),g=c("el-button"),m=c("el-table-column"),M=c("el-table"),W=c("el-pagination"),X=c("el-icon"),ee=c("el-upload"),le=c("el-dialog");return v(),P("div",ve,[Ae,o("span",Ne,[o("span",Ve,[l(w,{model:d,rules:r.rule,"label-width":"80px","label-position":"left"},{default:t(()=>[l(i,{label:"问题编号"},{default:t(()=>[l(s,{placeholder:"请输入问题编号",modelValue:d.problemNo,"onUpdate:modelValue":e[0]||(e[0]=a=>d.problemNo=a)},null,8,["modelValue"])]),_:1}),l(i,{label:"客户名称"},{default:t(()=>[l(s,{placeholder:"输入客户名称",modelValue:d.customerName,"onUpdate:modelValue":e[1]||(e[1]=a=>d.customerName=a)},null,8,["modelValue"])]),_:1}),l(i,{label:"客户电话"},{default:t(()=>[l(s,{placeholder:"请输入客户电话",modelValue:d.customerName,"onUpdate:modelValue":e[2]||(e[2]=a=>d.customerName=a)},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"]),l(w,{model:d,rules:r.rule,"label-width":"80px","label-position":"left"},{default:t(()=>[l(i,{label:"创建时间"},{default:t(()=>[l(K,{modelValue:d.createDate,"onUpdate:modelValue":e[3]||(e[3]=a=>d.createDate=a),type:"daterange","range-separator":"~","start-placeholder":"开始时间","end-placeholder":"结束时间"},null,8,["modelValue"])]),_:1}),l(i,{label:"订单状态"},{default:t(()=>[l(k,{modelValue:d.orderStatus,"onUpdate:modelValue":e[4]||(e[4]=a=>d.orderStatus=a),placeholder:"请选择订单状态"},{default:t(()=>[(v(!0),P(D,null,L(T.value,a=>(v(),R(I,{key:a.value,label:a.label,value:a.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),ye]),_:1},8,["model","rules"])]),o("span",Se,[l(g,{type:"primary",onClick:S,class:"search_btn"},{icon:t(()=>[we]),default:t(()=>[_("查询")]),_:1}),l(g,{type:"primary",class:"reset_btn"},{icon:t(()=>[Ce]),default:t(()=>[_("重置")]),_:1})])]),o("span",Pe,[xe,o("span",Ue,[l(g,{onClick:F,type:"primary",class:"search_btn"},{icon:t(()=>[Ie]),default:t(()=>[_("新建")]),_:1}),l(g,{type:"primary",class:"reset_btn"},{icon:t(()=>[ke]),default:t(()=>[_("下载")]),_:1})])]),o("span",De,[l(M,{class:"table_content",data:V.value,stripe:!1,style:{width:"100%"}},{default:t(()=>[l(m,{prop:"caseNo",label:"问题编号"}),l(m,{prop:"caseAccountId",label:"客户姓名"}),l(m,{prop:"problemDescription",label:"问题描述"}),l(m,{prop:"sourceOfProblem",label:"来源"},{default:t(a=>{var b;return[o("div",Le,z(a.row.sourceOfProblem?(b=$.value.find(C=>C.code==a.row.sourceOfProblem))==null?void 0:b.name:""),1)]}),_:1}),l(m,{prop:"distributorName",label:"提报人"}),l(m,{prop:"actualResolutionDate",label:"创建时间"}),l(m,{prop:"caseStatus",label:"问题状态"},{default:t(a=>{var b;return[o("div",Re,z(a.row.caseStatus?(b=E.value.find(C=>C.code==a.row.caseStatus))==null?void 0:b.name:""),1)]}),_:1}),l(m,{prop:"",label:"操作",width:"80px"},{default:t(a=>[o("div",{style:{display:"flex","align-items":"center",color:"#165dff",cursor:"pointer"},onClick:b=>Z(a.row)}," 查看 ",8,ze)]),_:1})]),_:1},8,["data"]),l(W,{class:"table_pagination","page-size":N.value.pageSize,"pager-count":5,layout:"total, prev, pager, next",total:N.value.total},null,8,["page-size","total"])]),o("div",Oe,[l(le,{modelValue:h.value,"onUpdate:modelValue":e[11]||(e[11]=a=>h.value=a),title:"问题提报",width:"80%","show-close":!1},{footer:t(()=>[o("div",Fe,[l(g,{class:"cancel_btn",onClick:e[10]||(e[10]=a=>h.value=!1)},{default:t(()=>[_("取消")]),_:1}),l(g,{type:"primary",class:"primary_btn",onClick:Q},{default:t(()=>[_("提交")]),_:1})])]),default:t(()=>[o("span",Be,[o("span",Te,[o("span",{class:O(U.value==1?"num_selected":"num")},"1",2),$e]),o("span",Ee,[o("span",{class:O(U.value==2?"num_selected":"num")},"2",2),Je])]),o("div",Ze,[l(w,{model:n.value,rules:J.value,"label-width":"90px","label-position":"left"},{default:t(()=>[l(i,{label:"订单编号",prop:"orderNo"},{default:t(()=>[l(k,{modelValue:n.value.orderNo,"onUpdate:modelValue":e[5]||(e[5]=a=>n.value.orderNo=a),filterable:"",onChange:j,placeholder:"请选择订单编号"},{default:t(()=>[(v(!0),P(D,null,L(y.value,a=>(v(),R(I,{key:a.po,label:a.po,value:a.po},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),l(i,{label:"客户姓名",prop:"customerName"},{default:t(()=>[l(s,{placeholder:"请输入客户姓名",modelValue:n.value.customerName,"onUpdate:modelValue":e[6]||(e[6]=a=>n.value.customerName=a)},null,8,["modelValue"])]),_:1}),l(i,{label:"客户电话",prop:"customerPhone"},{default:t(()=>[l(s,{placeholder:"请输入客户电话",modelValue:n.value.customerPhone,"onUpdate:modelValue":e[7]||(e[7]=a=>n.value.customerPhone=a)},null,8,["modelValue"])]),_:1}),l(i,{label:"问题描述",class:"customLayout",prop:"desc"},{default:t(()=>[l(s,{modelValue:n.value.desc,"onUpdate:modelValue":e[8]||(e[8]=a=>n.value.desc=a),rows:5,type:"textarea",maxlength:"500",placeholder:"请输入问题描述","show-word-limit":""},null,8,["modelValue"])]),_:1}),l(i,{label:"上传图片",class:"custom_upload"},{default:t(()=>[l(ee,{"on-success":H,"on-remove":q,"auto-upload":!0,data:x.value,headers:B.value,"before-upload":G,"list-type":"picture-card",class:"avatar-uploader",action:"https://sh.mengtian.com.cn:9595/md/api/common/file/upload","show-file-list":!0,"file-list":n.value.fileList,"onUpdate:fileList":e[9]||(e[9]=a=>n.value.fileList=a)},{default:t(()=>[l(X,null,{default:t(()=>[l(pe(me))]),_:1})]),_:1},8,["data","headers","file-list"])]),_:1})]),_:1},8,["model","rules"])])]),_:1},8,["modelValue"])])])}}}),qe=_e(Qe,[["__scopeId","data-v-2f5276ab"]]);export{qe as default};
