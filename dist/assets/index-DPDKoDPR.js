import{_ as ce,a as de,b as ie}from"./logoXX-KcEG4fMf.js";import{_ as me}from"./plus-B8sn_dc4.js";import{_ as pe}from"./download-Dan4AgsM.js";import{d as _e,g as fe,r as d,a as ve,o as ge,c as P,h as n,b as t,w as o,e as i,p as he,f as be,i as b,F as $,m as z,s as L,j as g,t as q,v as F,u as Ne,x as Se,_ as ye}from"./index-B0nIteLi.js";import{h as Ve}from"./moment-Cl4UOzQZ.js";import{g as xe,h as Ce,k as De,e as O}from"./common-DlZ3PTDo.js";import"./userinfo-DAH5zaze.js";const p=D=>(he("data-v-4f9f8ff9"),D=D(),be(),D),Pe={class:"main"},ke=p(()=>n("span",{class:"header"},[n("span",{class:"title"},"问题提报")],-1)),Ue={class:"search"},we={class:"left"},Ie=p(()=>n("span",{style:{width:"336px",height:"32px"}},null,-1)),Te={class:"right"},$e=p(()=>n("img",{src:de,alt:""},null,-1)),ze=p(()=>n("img",{src:ie,alt:""},null,-1)),Le={class:"table_header"},Ye=p(()=>n("span",{class:"left"},[n("img",{src:ce,alt:""}),n("span",{class:"title"})],-1)),Re={class:"right"},Me=p(()=>n("img",{src:me,alt:""},null,-1)),qe=p(()=>n("img",{src:pe,alt:""},null,-1)),Fe={class:"table"},Oe={style:{display:"flex","align-items":"center"}},Be={style:{display:"flex","align-items":"center"}},Ae=["onClick"],Ee={class:"problemReportingDialog"},je={class:"step"},He={class:"item"},Ge=p(()=>n("span",{class:"name"},[g("完善提报信息 "),n("span",{class:"remark"},"完善问题提报的信息")],-1)),Je={class:"item"},Ke=p(()=>n("span",{class:"name"},[g("完成创建 "),n("span",{class:"remark"},"等待售服部处理")],-1)),Qe={class:"content"},We={class:"dialog-footer"},Xe=_e({__name:"index",setup(D){const{proxy:_}=fe(),f=d({pageIndex:1,pageSize:15,total:0}),B=d({Content:"application/json",Authorization:"",isImage:"true",needFileId:"true","Trace-Id":""}),Y=d({files:[],name:"files"}),s=ve({problemNo:"",customerName:"",customerPhone:"",filterMethod:"",createDate:[],tableData:[],orderStatus:""});d([{value:"all",label:"全部"}]),d([{value:"all",label:"全部"}]);const A=d([{name:"配送技工",code:"1"},{name:"安装技工",code:"2"},{name:"客户",code:"3"},{name:"经销商",code:"4"}]),R=d([{name:"全部",code:""},{name:"待处理",code:"1"},{name:"已受理",code:"2"},{name:"处理中",code:"3"},{name:"已完成",code:"4"}]),y=d(!1),M=d(1),u=d({orderNo:"",customerName:"",customerPhone:"",desc:"",fileList:[],filePath:[]}),E=d({customerName:[{required:!0,message:"客户姓名不能为空！",trigger:"blur"}],customerPhone:[{required:!0,message:"客户电话不能为空！",trigger:"blur"}],desc:[{required:!0,message:"问题描述不能为空！",trigger:"blur"}]}),k=d([]),U=d([]),w=d([]),V=d({});ge(()=>{setTimeout(()=>{x(),K(),Q()},500)});const j=r=>{let e=r.id,l=r.neoid,c=r.caseStatus,C=r.createdTime,I=r.name,N=r.questionType,h="id="+e,m={};l!=null&&(h=h+"&neoid="+l,c===1&&C!=null&&(m={id:e,questionType:N||0,name:I,caseStatus:2,dealerAcceptanceTime:Ve().format("YYYY-MM-DD HH:mm:ss")},console.info("params",m)),H(m,h))},H=(r,e)=>{r.id!=null?O(r).then(l=>{let c=l.data;c.code=="success"&&c.data!=null?(_.$router.push(`/problem_report_details?${e}`),console.info("更新成功")):console.info("更新失败")}):_.$router.push(`/problem_report_details?${e}`)},G=()=>{y.value=!0},J=()=>{console.log("problemReportingForm",u.value);for(let e in u.value)if(e!="orderNo"&&e!="fileList"&&e!="filePath"&&u.value[e]==""){_.$message.error("必填字段不能为空!");return}let r={orderNeoId:u.value.orderNo,name:V.value.accountName__C+"的服务工单",externalUserName:u.value.customerName,externalUserPhone:u.value.customerPhone,problemDescription:u.value.desc,picture:u.value.filePath,caseStatus:"1",questionType:1,caseSource:11,clientCaseStatusC:1,complaintSourceC:4,phone:V.value.contactTel,customerName:V.value.accountName__C,address:V.value.customerAddress};O(r).then(e=>{let l=e.data;l.code=="success"?(u.value={orderNo:"",customerName:"",customerPhone:"",desc:"",fileList:[],filePath:[]},y.value=!1,_.$message.success("提交成功!"),x()):_.$message.error(l==null?void 0:l.message)})},x=()=>{let r={caseStatus:s.orderStatus==null?"":s.orderStatus,caseNo:s.problemNo==null?"":s.problemNo,accountName:s.customerName==null?"":s.customerName,accountPhone:s.customerPhone==null?"":s.customerPhone,from:s.createDate==null||s.createDate[0]==null?"":s.createDate[0]+" 00:00:00",to:s.createDate==null||s.createDate[1]==null?"":s.createDate[1]+" 23:59:59",pageSize:f.value.pageSize,pageNo:f.value.pageIndex};xe(r).then(e=>{let l=e.data;l.code=="success"?(k.value=l.data,f.value={pageIndex:e.data.current==null?1:parseInt(e.data.current),pageSize:e.data.size,total:e.data.total}):(_.$message.error(l==null?void 0:l.message),k.value=[],f.value={pageIndex:1,pageSize:15,total:0})})},K=()=>{Ce({deliveryDate:"",status__c:"",orderType__c:"",transactionDate:"",po:"",accountName:"",accountPhone:""}).then(e=>{let l=e.data;l.code=="success"?U.value=l.data:_.$message.error(l==null?void 0:l.message)})},Q=()=>{De({userType:1,name:"",phone:""}).then(e=>{let l=e.data.data;l!=null&&l.length>0?w.value=l:_.$message.warning("未获取到人员数据")})},W=r=>{let e=w.value.find(l=>l.neoId==r);e&&(u.value.customerName=e.name,u.value.customerPhone=e.phone)},X=r=>{let e=U.value.find(l=>l.neoid==r);e&&(V.value=e)},Z=r=>{if(console.log(r),r.code=="success"){let e=r.data.map(l=>l.fileId);u.value.filePath=u.value.filePath.concat(e),console.log(u.value.filePath)}},ee=r=>{var e=r.response;console.log(e)},ae=r=>{Y.value.files=[r]},te=()=>{console.log("aaaa"),s.problemNo="",s.customerName="",s.customerPhone="",s.filterMethod="",s.createDate=[],s.orderStatus="",x()},le=r=>{f.value.pageIndex=r,x()};return(r,e)=>{const l=i("el-input"),c=i("el-form-item"),C=i("el-form"),I=i("el-date-picker"),N=i("el-option"),h=i("el-select"),m=i("el-button"),v=i("el-table-column"),oe=i("el-table"),se=i("el-pagination"),ne=i("el-icon"),re=i("el-upload"),ue=i("el-dialog");return b(),P("div",Pe,[ke,n("span",Ue,[n("span",we,[t(C,{model:s,"label-width":"80px","label-position":"left"},{default:o(()=>[t(c,{label:"问题编号"},{default:o(()=>[t(l,{placeholder:"请输入问题编号",modelValue:s.problemNo,"onUpdate:modelValue":e[0]||(e[0]=a=>s.problemNo=a)},null,8,["modelValue"])]),_:1}),t(c,{label:"客户名称"},{default:o(()=>[t(l,{placeholder:"输入客户名称",modelValue:s.customerName,"onUpdate:modelValue":e[1]||(e[1]=a=>s.customerName=a)},null,8,["modelValue"])]),_:1}),t(c,{label:"客户电话"},{default:o(()=>[t(l,{placeholder:"请输入客户电话",modelValue:s.customerPhone,"onUpdate:modelValue":e[2]||(e[2]=a=>s.customerPhone=a)},null,8,["modelValue"])]),_:1})]),_:1},8,["model"]),t(C,{model:s,"label-width":"80px","label-position":"left"},{default:o(()=>[t(c,{label:"创建时间"},{default:o(()=>[t(I,{modelValue:s.createDate,"onUpdate:modelValue":e[3]||(e[3]=a=>s.createDate=a),type:"daterange","range-separator":"~","start-placeholder":"开始时间","end-placeholder":"结束时间",format:"YYYY-MM-DD","value-format":"YYYY-MM-DD"},null,8,["modelValue"])]),_:1}),t(c,{label:"问题状态"},{default:o(()=>[t(h,{modelValue:s.orderStatus,"onUpdate:modelValue":e[4]||(e[4]=a=>s.orderStatus=a),placeholder:"请选择问题状态"},{default:o(()=>[(b(!0),P($,null,z(R.value,a=>(b(),L(N,{key:a.code,label:a.name,value:a.code},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),Ie]),_:1},8,["model"])]),n("span",Te,[t(m,{type:"primary",onClick:x,class:"search_btn"},{icon:o(()=>[$e]),default:o(()=>[g("查询")]),_:1}),t(m,{type:"primary",onClick:e[5]||(e[5]=a=>te()),class:"reset_btn"},{icon:o(()=>[ze]),default:o(()=>[g("重置")]),_:1})])]),n("span",Le,[Ye,n("span",Re,[t(m,{onClick:G,type:"primary",class:"search_btn"},{icon:o(()=>[Me]),default:o(()=>[g("新建")]),_:1}),t(m,{type:"primary",class:"reset_btn"},{icon:o(()=>[qe]),default:o(()=>[g("下载")]),_:1})])]),n("span",Fe,[t(oe,{class:"table_content",data:k.value,stripe:!1,style:{width:"100%"}},{default:o(()=>[t(v,{prop:"caseNo",label:"问题编号"}),t(v,{prop:"name",label:"客户姓名"}),t(v,{prop:"problemDescription",label:"问题描述"}),t(v,{prop:"complaintSourceC",label:"来源"},{default:o(a=>{var S;return[n("div",Oe,q(a.row.complaintSourceC?(S=A.value.find(T=>T.code==a.row.complaintSourceC))==null?void 0:S.name:""),1)]}),_:1}),t(v,{prop:"externalUserName",label:"提报人"}),t(v,{prop:"createdTime",label:"创建时间"}),t(v,{prop:"caseStatus",label:"问题状态"},{default:o(a=>{var S;return[n("div",Be,q(a.row.caseStatus?(S=R.value.find(T=>T.code==a.row.caseStatus))==null?void 0:S.name:""),1)]}),_:1}),t(v,{prop:"",label:"操作",width:"80px"},{default:o(a=>[n("div",{style:{display:"flex","align-items":"center",color:"#165dff",cursor:"pointer"},onClick:S=>j(a.row)}," 查看 ",8,Ae)]),_:1})]),_:1},8,["data"]),t(se,{class:"table_pagination","page-size":f.value.pageSize,"pager-count":f.value.pageSize,layout:"total, prev, pager, next",total:f.value.total,onCurrentChange:le},null,8,["page-size","pager-count","total"])]),n("div",Ee,[t(ue,{modelValue:y.value,"onUpdate:modelValue":e[12]||(e[12]=a=>y.value=a),title:"问题提报",width:"80%","show-close":!1},{footer:o(()=>[n("div",We,[t(m,{class:"cancel_btn",onClick:e[11]||(e[11]=a=>y.value=!1)},{default:o(()=>[g("取消")]),_:1}),t(m,{type:"primary",class:"primary_btn",onClick:J},{default:o(()=>[g("提交")]),_:1})])]),default:o(()=>[n("span",je,[n("span",He,[n("span",{class:F(M.value==1?"num_selected":"num")},"1",2),Ge]),n("span",Je,[n("span",{class:F(M.value==2?"num_selected":"num")},"2",2),Ke])]),n("div",Qe,[t(C,{model:u.value,rules:E.value,"label-width":"90px","label-position":"left"},{default:o(()=>[t(c,{label:"订单编号",prop:"orderNo"},{default:o(()=>[t(h,{modelValue:u.value.orderNo,"onUpdate:modelValue":e[6]||(e[6]=a=>u.value.orderNo=a),filterable:"",onChange:X,placeholder:"请选择订单编号"},{default:o(()=>[(b(!0),P($,null,z(U.value,a=>(b(),L(N,{key:a.po,label:a.po,value:a.neoid},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),t(c,{label:"提报人姓名",prop:"customerName"},{default:o(()=>[t(h,{modelValue:u.value.customerName,"onUpdate:modelValue":e[7]||(e[7]=a=>u.value.customerName=a),onChange:W,placeholder:"请选择提报人人员"},{default:o(()=>[(b(!0),P($,null,z(w.value,a=>(b(),L(N,{key:a.name,label:a.name,value:a.neoId},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),t(c,{label:"提报人电话",prop:"customerPhone"},{default:o(()=>[t(l,{placeholder:"请输入提报人电话",modelValue:u.value.customerPhone,"onUpdate:modelValue":e[8]||(e[8]=a=>u.value.customerPhone=a)},null,8,["modelValue"])]),_:1}),t(c,{label:"问题描述",class:"customLayout",prop:"desc"},{default:o(()=>[t(l,{modelValue:u.value.desc,"onUpdate:modelValue":e[9]||(e[9]=a=>u.value.desc=a),rows:5,type:"textarea",maxlength:"500",placeholder:"请输入问题描述","show-word-limit":""},null,8,["modelValue"])]),_:1}),t(c,{label:"上传图片",class:"custom_upload"},{default:o(()=>[t(re,{"on-success":Z,"on-remove":ee,"auto-upload":!0,data:Y.value,headers:B.value,"before-upload":ae,"list-type":"picture-card",class:"avatar-uploader",action:"https://sh.mengtian.com.cn:9595/md/api/common/file/upload","show-file-list":!0,"file-list":u.value.fileList,"onUpdate:fileList":e[10]||(e[10]=a=>u.value.fileList=a)},{default:o(()=>[t(ne,null,{default:o(()=>[t(Ne(Se))]),_:1})]),_:1},8,["data","headers","file-list"])]),_:1})]),_:1},8,["model","rules"])])]),_:1},8,["modelValue"])])])}}}),na=ye(Xe,[["__scopeId","data-v-4f9f8ff9"]]);export{na as default};
