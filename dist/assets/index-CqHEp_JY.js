import{_ as se,a as ne,b as re}from"./logoXX-Cy74BE6B.js";import{_ as ue}from"./plus-B8sn_dc4.js";import{_ as ce}from"./download-Dan4AgsM.js";import{d as de,g as ie,r as d,a as pe,k as me,Y as _e,X as fe,c as I,b as s,e as a,w as t,f as i,p as ve,h as ge,o as P,F as Y,B as L,q as $,i as v,t as M,x as R,y as he,z as be,K as q,_ as Ne}from"./index-CXdlkYQW.js";import{h as ye}from"./moment-Cl4UOzQZ.js";const m=D=>(ve("data-v-46a3a86d"),D=D(),ge(),D),Se={class:"main"},Ve=m(()=>s("span",{class:"header"},[s("span",{class:"title"},"问题提报")],-1)),Pe={class:"search"},De={class:"left"},xe=m(()=>s("span",{style:{width:"336px",height:"32px"}},null,-1)),Ce={class:"right"},ke=m(()=>s("img",{src:ne,alt:""},null,-1)),we=m(()=>s("img",{src:re,alt:""},null,-1)),Ie={class:"table_header"},Te=m(()=>s("span",{class:"left"},[s("img",{src:se,alt:""}),s("span",{class:"title"})],-1)),ze={class:"right"},Ue=m(()=>s("img",{src:ue,alt:""},null,-1)),Ye=m(()=>s("img",{src:ce,alt:""},null,-1)),Le={class:"table"},$e={style:{display:"flex","align-items":"center"}},Me={style:{display:"flex","align-items":"center"}},Re=["onClick"],qe={class:"problemReportingDialog"},Oe={class:"step"},Be={class:"item"},Fe=m(()=>s("span",{class:"name"},[v("完善提报信息 "),s("span",{class:"remark"},"完善问题提报的信息")],-1)),Ae={class:"item"},He=m(()=>s("span",{class:"name"},[v("完成创建 "),s("span",{class:"remark"},"等待售服部处理")],-1)),je={class:"content"},Ee={class:"dialog-footer"},Ke=de({__name:"index",setup(D){const{proxy:g}=ie(),_=d({pageIndex:1,pageSize:15,total:0}),O=d({Content:"application/json",Authorization:"",isImage:"true",needFileId:"true","Trace-Id":""}),T=d({files:[],name:"files"}),n=pe({problemNo:"",customerName:"",customerPhone:"",filterMethod:"",createDate:[],tableData:[],orderStatus:""});d([{value:"all",label:"全部"}]),d([{value:"all",label:"全部"}]);const B=d([{name:"配送技工",code:"1"},{name:"安装技工",code:"2"},{name:"终端用户",code:"3"},{name:"经销商",code:"4"}]),z=d([{name:"全部",code:""},{name:"待处理",code:"1"},{name:"已受理",code:"2"},{name:"处理中",code:"3"},{name:"已完成",code:"4"}]),N=d(!1),U=d(1),u=d({orderNo:"",customerName:"",customerPhone:"",desc:"",fileList:[],filePath:[]}),F=d({customerName:[{required:!0,message:"客户姓名不能为空！",trigger:"blur"}],customerPhone:[{required:!0,message:"客户电话不能为空！",trigger:"blur"}],desc:[{required:!0,message:"问题描述不能为空！",trigger:"blur"}]}),x=d([]),C=d([]);me(()=>{setTimeout(()=>{y(),K()},500)});const A=r=>{let e=r.id,o=r.neoid,c=r.caseStatus,S=r.createdTime,k=r.name,V=r.questionType,h="id="+e,p={};o!=null&&(h=h+"&neoid="+o,c===1&&S!=null&&(p={id:e,questionType:V||0,name:k,caseStatus:2,dealerAcceptanceTime:ye().format("YYYY-MM-DD HH:mm:ss")},console.info("params",p)),H(p,h))},H=(r,e)=>{r.id!=null?q(r).then(o=>{let c=o.data;c.code=="success"&&c.data!=null?(g.$router.push(`/problem_report_details?${e}`),console.info("更新成功")):console.info("更新失败")}):g.$router.push(`/problem_report_details?${e}`)},j=()=>{N.value=!0},E=()=>{console.log("problemReportingForm",u.value);for(let e in u.value)if(e!="orderNo"&&e!="fileList"&&e!="filePath"&&u.value[e]==""){g.$message.error("必填字段不能为空!");return}let r={caseNo:u.value.orderNo,name:u.value.customerName,phone:u.value.customerPhone,problemDescription:u.value.desc,picture:u.value.filePath,caseStatus:"1",questionType:1};q(r).then(e=>{let o=e.data;o.code=="success"?(u.value={orderNo:"",customerName:"",customerPhone:"",desc:"",fileList:[],filePath:[]},N.value=!1,g.$message.success("提交成功!"),y()):g.$message.error(o==null?void 0:o.message)})},y=()=>{let r={caseStatus:n.orderStatus==null?"":n.orderStatus,caseNo:n.problemNo==null?"":n.problemNo,accountName:n.customerName==null?"":n.customerName,accountPhone:n.customerPhone==null?"":n.customerPhone,from:n.createDate==null?"":n.createDate[0],to:n.createDate==null?"":n.createDate[1],pageSize:_.value.pageSize,pageNo:_.value.pageIndex};_e(r).then(e=>{let o=e.data;o.code=="success"?(x.value=o.data,_.value={pageIndex:e.data.current==null?1:parseInt(e.data.current),pageSize:e.data.size,total:e.data.total}):(g.$message.error(o==null?void 0:o.message),x.value=[],_.value={pageIndex:1,pageSize:15,total:0})})},K=()=>{fe({deliveryDate:"",status__c:"",orderType__c:"",transactionDate:"",po:"",accountName:"",accountPhone:""}).then(e=>{let o=e.data;o.code=="success"?C.value=o.data:g.$message.error(o==null?void 0:o.message)})},X=r=>{let e=C.value.find(o=>o.po==r);e&&(u.value.customerName=e.accountName,u.value.customerPhone=e.accountPhone)},G=r=>{if(console.log(r),r.code=="success"){let e=r.data.map(o=>o.fileId);u.value.filePath=u.value.filePath.concat(e),console.log(u.value.filePath)}},J=r=>{var e=r.response;console.log(e)},Q=r=>{T.value.files=[r]},W=()=>{console.log("aaaa"),n.problemNo=null,n.customerName=null,n.customerPhone=null,n.filterMethod=null,n.createDate=[],n.orderStatus=null,y()},Z=r=>{_.value.pageIndex=r,y()};return(r,e)=>{const o=i("el-input"),c=i("el-form-item"),S=i("el-form"),k=i("el-date-picker"),V=i("el-option"),h=i("el-select"),p=i("el-button"),f=i("el-table-column"),ee=i("el-table"),ae=i("el-pagination"),le=i("el-icon"),te=i("el-upload"),oe=i("el-dialog");return P(),I("div",Se,[Ve,s("span",Pe,[s("span",De,[a(S,{model:n,rules:r.rule,"label-width":"80px","label-position":"left"},{default:t(()=>[a(c,{label:"问题编号"},{default:t(()=>[a(o,{placeholder:"请输入问题编号",modelValue:n.problemNo,"onUpdate:modelValue":e[0]||(e[0]=l=>n.problemNo=l)},null,8,["modelValue"])]),_:1}),a(c,{label:"客户名称"},{default:t(()=>[a(o,{placeholder:"输入客户名称",modelValue:n.customerName,"onUpdate:modelValue":e[1]||(e[1]=l=>n.customerName=l)},null,8,["modelValue"])]),_:1}),a(c,{label:"客户电话"},{default:t(()=>[a(o,{placeholder:"请输入客户电话",modelValue:n.customerPhone,"onUpdate:modelValue":e[2]||(e[2]=l=>n.customerPhone=l)},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"]),a(S,{model:n,rules:r.rule,"label-width":"80px","label-position":"left"},{default:t(()=>[a(c,{label:"创建时间"},{default:t(()=>[a(k,{modelValue:n.createDate,"onUpdate:modelValue":e[3]||(e[3]=l=>n.createDate=l),type:"daterange","range-separator":"~","start-placeholder":"开始时间","end-placeholder":"结束时间",format:"YYYY/MM/DD","value-format":"YYYY-MM-DD"},null,8,["modelValue"])]),_:1}),a(c,{label:"订单状态"},{default:t(()=>[a(h,{modelValue:n.orderStatus,"onUpdate:modelValue":e[4]||(e[4]=l=>n.orderStatus=l),placeholder:"请选择订单状态"},{default:t(()=>[(P(!0),I(Y,null,L(z.value,l=>(P(),$(V,{key:l.code,label:l.name,value:l.code},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),xe]),_:1},8,["model","rules"])]),s("span",Ce,[a(p,{type:"primary",onClick:y,class:"search_btn"},{icon:t(()=>[ke]),default:t(()=>[v("查询")]),_:1}),a(p,{type:"primary",onClick:e[5]||(e[5]=l=>W()),class:"reset_btn"},{icon:t(()=>[we]),default:t(()=>[v("重置")]),_:1})])]),s("span",Ie,[Te,s("span",ze,[a(p,{onClick:j,type:"primary",class:"search_btn"},{icon:t(()=>[Ue]),default:t(()=>[v("新建")]),_:1}),a(p,{type:"primary",class:"reset_btn"},{icon:t(()=>[Ye]),default:t(()=>[v("下载")]),_:1})])]),s("span",Le,[a(ee,{class:"table_content",data:x.value,stripe:!1,style:{width:"100%"}},{default:t(()=>[a(f,{prop:"caseNo",label:"问题编号"}),a(f,{prop:"name",label:"客户姓名"}),a(f,{prop:"problemDescription",label:"问题描述"}),a(f,{prop:"complaintSourceC",label:"来源"},{default:t(l=>{var b;return[s("div",$e,M(l.row.sourceOfProblem?(b=B.value.find(w=>w.code==l.row.sourceOfProblem))==null?void 0:b.name:""),1)]}),_:1}),a(f,{prop:"externalUserName",label:"提报人"}),a(f,{prop:"createdTime",label:"创建时间"}),a(f,{prop:"caseStatus",label:"问题状态"},{default:t(l=>{var b;return[s("div",Me,M(l.row.caseStatus?(b=z.value.find(w=>w.code==l.row.caseStatus))==null?void 0:b.name:""),1)]}),_:1}),a(f,{prop:"",label:"操作",width:"80px"},{default:t(l=>[s("div",{style:{display:"flex","align-items":"center",color:"#165dff",cursor:"pointer"},onClick:b=>A(l.row)}," 查看 ",8,Re)]),_:1})]),_:1},8,["data"]),a(ae,{class:"table_pagination","page-size":_.value.pageSize,"pager-count":_.value.pageSize,layout:"total, prev, pager, next",total:_.value.total,onCurrentChange:Z},null,8,["page-size","pager-count","total"])]),s("div",qe,[a(oe,{modelValue:N.value,"onUpdate:modelValue":e[12]||(e[12]=l=>N.value=l),title:"问题提报",width:"80%","show-close":!1},{footer:t(()=>[s("div",Ee,[a(p,{class:"cancel_btn",onClick:e[11]||(e[11]=l=>N.value=!1)},{default:t(()=>[v("取消")]),_:1}),a(p,{type:"primary",class:"primary_btn",onClick:E},{default:t(()=>[v("提交")]),_:1})])]),default:t(()=>[s("span",Oe,[s("span",Be,[s("span",{class:R(U.value==1?"num_selected":"num")},"1",2),Fe]),s("span",Ae,[s("span",{class:R(U.value==2?"num_selected":"num")},"2",2),He])]),s("div",je,[a(S,{model:u.value,rules:F.value,"label-width":"90px","label-position":"left"},{default:t(()=>[a(c,{label:"订单编号",prop:"orderNo"},{default:t(()=>[a(h,{modelValue:u.value.orderNo,"onUpdate:modelValue":e[6]||(e[6]=l=>u.value.orderNo=l),filterable:"",onChange:X,placeholder:"请选择订单编号"},{default:t(()=>[(P(!0),I(Y,null,L(C.value,l=>(P(),$(V,{key:l.po,label:l.po,value:l.po},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),a(c,{label:"提报人姓名",prop:"customerName"},{default:t(()=>[a(o,{placeholder:"请输入提报人姓名",modelValue:u.value.customerName,"onUpdate:modelValue":e[7]||(e[7]=l=>u.value.customerName=l)},null,8,["modelValue"])]),_:1}),a(c,{label:"提报人电话",prop:"customerPhone"},{default:t(()=>[a(o,{placeholder:"请输入提报人电话",modelValue:u.value.customerPhone,"onUpdate:modelValue":e[8]||(e[8]=l=>u.value.customerPhone=l)},null,8,["modelValue"])]),_:1}),a(c,{label:"问题描述",class:"customLayout",prop:"desc"},{default:t(()=>[a(o,{modelValue:u.value.desc,"onUpdate:modelValue":e[9]||(e[9]=l=>u.value.desc=l),rows:5,type:"textarea",maxlength:"500",placeholder:"请输入问题描述","show-word-limit":""},null,8,["modelValue"])]),_:1}),a(c,{label:"上传图片",class:"custom_upload"},{default:t(()=>[a(te,{"on-success":G,"on-remove":J,"auto-upload":!0,data:T.value,headers:O.value,"before-upload":Q,"list-type":"picture-card",class:"avatar-uploader",action:"https://sh.mengtian.com.cn:9595/md/api/common/file/upload","show-file-list":!0,"file-list":u.value.fileList,"onUpdate:fileList":e[10]||(e[10]=l=>u.value.fileList=l)},{default:t(()=>[a(le,null,{default:t(()=>[a(he(be))]),_:1})]),_:1},8,["data","headers","file-list"])]),_:1})]),_:1},8,["model","rules"])])]),_:1},8,["modelValue"])])])}}}),Ze=Ne(Ke,[["__scopeId","data-v-46a3a86d"]]);export{Ze as default};
