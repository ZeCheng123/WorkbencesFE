import{d as q,g as w,r as U,b as N,c as S,i as t,v as V,q as p,w as r,s as c,f,p as A,h as I,j as m,a as d,e as s,_ as B}from"./index-BciW1GB7.js";const g=i=>(A("data-v-e634615e"),i=i(),I(),i),D={class:"main"},$=g(()=>t("span",{class:"header"}," 新建问题提报 ",-1)),j={class:"step"},z={class:"item"},E=g(()=>t("span",{class:"name"},[m("选择订单信息 "),t("span",{class:"remark"},"选择需要提报的订单")],-1)),T={class:"item"},F=g(()=>t("span",{class:"name"},[m("输入提报问题 "),t("span",{class:"remark"},"输入详细的问题描述")],-1)),G={class:"item"},H=g(()=>t("span",{class:"name"},[m("输入提报问题 "),t("span",{class:"remark"},"等待售服部处理")],-1)),J={class:"content"},K={class:"action_list"},L=q({__name:"index",setup(i){const{proxy:y}=w(),a=U(1),l=N({orderNo:"",proNo:"",customerName:"",customerPhone:"",creater:"",createrPhone:"",customerAddress:"",pronlemDesc:""}),v=N({orderNo:[{required:!0,message:"请输入订单编号",trigger:"blur"}],proNo:[{required:!0,message:"请输入生产单号",trigger:"blur"}],customerName:[{required:!0,message:"请输入客户名称",trigger:"blur"}],customerPhone:[{required:!0,message:"请输入客户电话",trigger:"blur"}],creater:[{required:!0,message:"请输入提报人",trigger:"blur"}],createrPhone:[{required:!0,message:"请输入提报人电话",trigger:"blur"}],customerAddress:[{required:!0,message:"请输入客户地址",trigger:"blur"}],pronlemDesc:[{required:!0,message:"请输入问题描述",trigger:"blur"}]}),b=h=>{a.value=h},x=()=>{a.value=1},C=()=>{a.value=2},P=()=>{y.$message.success("新建问题提报完成!")};return(h,e)=>{const n=f("el-input"),u=f("el-form-item"),k=f("el-form"),_=f("el-button");return d(),S("div",D,[$,t("span",j,[t("span",z,[t("span",{onClick:e[0]||(e[0]=o=>b(1)),class:V(a.value==1?"num_selected":"num")},"1",2),E]),t("span",T,[t("span",{onClick:e[1]||(e[1]=o=>b(2)),class:V(a.value==2?"num_selected":"num")},"2",2),F]),t("span",G,[t("span",{onClick:e[2]||(e[2]=o=>b(3)),class:V(a.value==3?"num_selected":"num")},"3",2),H])]),t("span",J,[a.value==1?(d(),p(k,{key:0,model:l,rules:v,"label-width":"100px","label-position":"left"},{default:r(()=>[s(u,{label:"订单编号",prop:"orderNo"},{default:r(()=>[s(n,{placeholder:"请输入订单编号",modelValue:l.orderNo,"onUpdate:modelValue":e[3]||(e[3]=o=>l.orderNo=o)},null,8,["modelValue"])]),_:1}),s(u,{label:"生产单号",prop:"proNo"},{default:r(()=>[s(n,{placeholder:"输入生产单号",modelValue:l.proNo,"onUpdate:modelValue":e[4]||(e[4]=o=>l.proNo=o)},null,8,["modelValue"])]),_:1}),s(u,{label:"客户名称",prop:"customerName"},{default:r(()=>[s(n,{placeholder:"输入客户名称",modelValue:l.customerName,"onUpdate:modelValue":e[5]||(e[5]=o=>l.customerName=o)},null,8,["modelValue"])]),_:1}),s(u,{label:"客户电话",prop:"customerPhone"},{default:r(()=>[s(n,{placeholder:"输入客户电话",modelValue:l.customerPhone,"onUpdate:modelValue":e[6]||(e[6]=o=>l.customerPhone=o)},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])):c("",!0),a.value==2?(d(),p(k,{key:1,model:l,rules:v,"label-width":"100px","label-position":"left"},{default:r(()=>[s(u,{label:"提报人",prop:"creater"},{default:r(()=>[s(n,{modelValue:l.creater,"onUpdate:modelValue":e[7]||(e[7]=o=>l.creater=o),placeholder:"默认订单编号"},null,8,["modelValue"])]),_:1}),s(u,{label:"提报人电话",prop:"createrPhone"},{default:r(()=>[s(n,{modelValue:l.createrPhone,"onUpdate:modelValue":e[8]||(e[8]=o=>l.createrPhone=o),placeholder:"默认生产单号"},null,8,["modelValue"])]),_:1}),s(u,{label:"客户地址",prop:"customerAddress"},{default:r(()=>[s(n,{modelValue:l.customerAddress,"onUpdate:modelValue":e[9]||(e[9]=o=>l.customerAddress=o),placeholder:"默认客户姓名"},null,8,["modelValue"])]),_:1}),s(u,{label:"问题描述"},{default:r(()=>[s(n,{modelValue:l.pronlemDesc,"onUpdate:modelValue":e[10]||(e[10]=o=>l.pronlemDesc=o),rows:5,type:"textarea",maxlength:"500",placeholder:"请输入具体的售后问题描述","show-word-limit":""},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])):c("",!0)]),t("span",K,[a.value==1?(d(),p(_,{key:0,class:"cancel_btn"},{default:r(()=>[m("取消")]),_:1})):c("",!0),a.value==2?(d(),p(_,{key:1,class:"cancel_btn",onClick:x},{default:r(()=>[m("上一步")]),_:1})):c("",!0),a.value==1?(d(),p(_,{key:2,type:"primary",class:"primary_btn",onClick:C},{default:r(()=>[m("下一步")]),_:1})):c("",!0),a.value==2?(d(),p(_,{key:3,type:"primary",class:"primary_btn",onClick:P},{default:r(()=>[m("完成")]),_:1})):c("",!0)])])}}}),O=B(L,[["__scopeId","data-v-e634615e"]]);export{O as default};
