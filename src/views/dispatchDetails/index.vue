<template>
  <div class="main">
    <span class="header">
      <span class="title">派工单状态</span>
      <span class="step">
        <!-- <span class="item" @click="changeStep(1)">
          <span :class="currentStep == 1 ? 'num_selected' : 'num'">1</span>
          <span :class="currentStep >= 1 ? 'name_selected' : 'name'"
            >已新建</span
          >
        </span> -->
        <span class="item" @click="changeStep(0)">
          <span :class="currentStep == 0 ? 'num_selected' : 'num'">1</span>
          <span :class="currentStep >= 0 ? 'name_selected' : 'name'"
            >待开始</span
          >
        </span>
        <span class="item" @click="changeStep(1)">
          <span :class="currentStep == 1 ? 'num_selected' : 'num'">2</span>
          <span :class="currentStep >= 1 ? 'name_selected' : 'name'"
            >进行中</span
          >
        </span>
        <span class="item" @click="changeStep(2)">
          <span :class="currentStep == 2 ? 'num_selected' : 'num'">3</span>
          <span :class="currentStep >= 2 ? 'name_selected' : 'name'"
            >已完成</span
          >
        </span>
        <span class="item" @click="changeStep(3)">
          <span :class="currentStep == 3 ? 'num_selected' : 'num'">4</span>
          <span :class="currentStep >= 3 ? 'name_selected' : 'name'"
            >已评价</span
          >
        </span>
      </span>
    </span>
    <span class="order_info">
      <span class="title">派工单详情</span>
      <span class="main_field">
        <span class="row_field">
          <span class="field">
            <span class="label">派工编号：</span>
            <span class="value">{{ fieldJobData.caseNo }}</span>
            <span v-if="false" class="view">查看</span>
          </span>
          <span class="field">
            <span class="label">派工类型：</span>
            <!-- <span v-if="fieldJobData.fieldJobType__c === '0'" class="value">配送派工单</span>
            <span v-else-if="fieldJobData.fieldJobType__c === '1'" class="value">安装派工单</span>
            <span v-else class="value">{{ fieldJobData.fieldJobType__c }}</span> -->
            <span class="value">{{fieldJobData.fieldJobType__c?(technicianTypeOption.find(val=>val["code"]==fieldJobData.fieldJobType__c)?.name):"配送派工单"}}</span>            
          </span>
          <span class="field">
            <span class="label">派工状态：</span>
            <span class="value">{{fieldJobData.stage__c?(dispatchWorkerStatusOption.find(val=>val["code"]==fieldJobData.stage__c)?.name):"待开始"}}</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">服务技工：</span>
            <span class="value">{{fieldJobData.followerId?(extralUserData.find(val=>val["id"]==fieldJobData.followerId)?.name):""}}</span>
          </span>
          <span class="field">
            <span class="label">服务技工电话：</span>
            <span class="value">{{fieldJobData.followerId?(extralUserData.find(val=>val["id"]==fieldJobData.followerId)?.phone):""}}</span>
          </span>
          <span class="field">
            <span class="label">客户地址：</span>
            <span class="value">{{fieldJobData.address}}</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">客户姓名：</span>
            <span class="value">{{fieldJobData.fieldJobContactName}}</span>
          </span>
          <span class="field">
            <span class="label">客户电话：</span>
            <span class="value">{{fieldJobData.contactTelephone}}</span>
          </span>
        </span>
      </span>
      <span class="title">派工要求</span>
      <span class="other_field">
        <span class="row_field">
          <span class="field">
            <span class="label">计划开始：</span>
            <span class="value">{{  fieldJobData.appointmentStartTime }}</span>
          </span>
          <span class="field">
            <span class="label">计划结束：</span>
            <span class="value">{{  fieldJobData.appointmentEndTime }}</span>
          </span>
          <span class="field">
            <span class="label">优先级：</span>
            <span class="value">{{fieldJobData.priority?(priorityOption.find(val=>val["code"]==fieldJobData.priority)?.name):""}}</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">是否具备安装条件：</span>
            <span class="value">{{ fieldJobData.whetherEvaluation===false?"否":"是" }}</span>
          </span>
          <!-- <span class="field">
            <span class="label">示例字段：</span>
            <span class="value">示例</span>
          </span>
          <span class="field">
            <span class="label">示例字段：</span>
            <span class="value">示例</span>
          </span> -->
        </span>
      </span>
    </span>
    <span class="service_evaluation_list">
      <span class="table_title">服务评价</span>
      <span class="table_content">
        <el-table
          :data="tableDataServiceEvaluation"
          :stripe="false"
          style="width: 100%"
          max-height="200"
        >
          <el-table-column prop="sNumber" label="序号" />
          <el-table-column prop="type" label="评价类型" />
          <el-table-column prop="satisfaction" label="满意度" />
        </el-table>
      </span>
    </span>
    <span class="dispatch_attachment_list">
      <span class="table_title">派工附件</span>
      <span class="table_content">
        <el-table
          :data="tableDataDispatchAttachment"
          :stripe="false"
          style="width: 100%"
          max-height="100"
        >
          <el-table-column prop="picNo" label="附件编号" />
          <el-table-column prop="type" label="类型" />
          <el-table-column prop="text3" label="附件链接">
            <template #default="{ row }">
              <template v-for="(image, index) in row.goodsPicture" :key="index">
                <el-image
                style="margin-right: 5px;width: 50px;"
                :src="image"
                :preview-src-list="row.goodsPicture"></el-image>
              </template>
            </template>
          </el-table-column>
          
          <!-- <el-table-column prop="text4" label="操作" width="80px">
            <template #default="scope">
              <div
                style="
                  display: flex;
                  align-items: center;
                  color: #165dff;
                  cursor: pointer;
                "
                @click="console.log(scope)"
              >
                查看
              </div>
            </template>
          </el-table-column> -->
        </el-table>
      </span>
    </span>
    <span class="action_list">
      <div class="left">
        <img src="@/assets/images/comment.png" alt="" />
        <span class="initiate_comments" @click="initiateComments"
          >发起任务评论</span
        >
      </div>
      <div class="right">
        <el-button type="primary" @click="initiateComments" class="primary_btn"
          >编辑</el-button
        >
      </div>
    </span>
    <div class="comment" v-for="item in commentList" :key="item.date">
      <div class="userinfo">
        <img src="@/assets/images/userinfo.png" alt="" />
        <span class="username">{{ item["userName"] }}</span>
      </div>
      <div class="content">{{ item["text"] }}</div>
      <div class="date">{{ item["date"] }}</div>
      <span class="reply">回复</span>
      <img class="tips" src="@/assets/images/tips.png" alt="" />
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, getCurrentInstance, reactive,onMounted } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { useRoute } from "vue-router";
import { getExternalUser, getFieldJob, getInvestigation } from "../../api/common";
import { NO } from "@vue/shared";

const { proxy }: any = getCurrentInstance()

const currentStep = ref(3)

const commentList = ref<any>([])

const route = useRoute()

let fieldJobData=ref<any>({})

const extralUserData=ref<any>([])

const priorityOption = ref([
    {
			code: "1",
			name: "最高",
		},
		{
			code: "2",
			name: "高",
		},
		{
			code: "3",
			name: "中",
		},
		{
			code: "4",
			name: "低",
		},
])

const technicianTypeOption = ref([
    {
			code: "all",
			name: "全部",
		},
		{
			code: "0",
			name: "配送派工单",
		},
		{
			code: "1",
			name: "安装派工单",
		},
		{
			code: "2",
			name: "维修派工单",
		},
])

const dispatchWorkerStatusOption = ref([
    {
			code: "all",
			name: "全部",
		},
		{
			code: "0",
			name: "待开始",
		},
		{
			code: "1",
			name: "进行中",
		},
		{
			code: "2",
			name: "已完成",
		},
])

const tableDataOrderDetials = ref([
  // {
  //   text1: "CS0011-06665-01",
  //   text2: "门套",
  //   text3: "示例字段...",
  //   text4: "混油米灰1#",
  //   text5: "2021-02-28 10:30:50",
  //   text6: "",
  // },
  // {
  //   text1: "CS0011-06665-01",
  //   text2: "门套",
  //   text3: "示例字段...",
  //   text4: "混油米灰1#",
  //   text5: "2021-02-28 10:30:50",
  //   text6: "",
  // },
  // {
  //   text1: "CS0011-06665-01",
  //   text2: "门套",
  //   text3: "示例字段...",
  //   text4: "混油米灰1#",
  //   text5: "2021-02-28 10:30:50",
  //   text6: "",
  // },
])

const tableDataServiceEvaluation = ref<any>([
  // {
  //   text1: "SU2024030101",
  //   text2: "未评价",
  //   text3: "待填写",
  //   text4: "李工",
  //   text5: "2021-02-28 10:30:50",
  //   text6: "",
  // },
])

const tableDataDispatchAttachment = ref([
  // {
  //   text1: "SU2024030101",
  //   text2: "已上传",
  //   text3: "image.com...",
  //   text4: "李工",
  //   text5: "",
  // },
] as any)

const changeStep = (step) => {
  currentStep.value = step
}

const initiateComments = () => {
  ElMessageBox.prompt("请填写评论内容", "发起评论", {
    inputPattern: /\S/,
    inputErrorMessage: "评论内容不能为空!",
    confirmButtonText: "确认",
    cancelButtonText: "取消",
  })
    .then(({ value }) => {
      commentList.value.push({
        userName: "经销商",
        text: value,
        date: new Date().toLocaleString(),
      })
    })
    .catch(() => {})
}
onMounted(()=>{
  getFieldJobByGet(true,route.query.id)
  getExtralUserData(false)
})

const getFieldJobByGet = (showMsg: boolean,fieldJobId:any)=>{
  getFieldJob(fieldJobId).then((res : any) => {
			let data = res.data.data
			if (data!=undefined) {
        fieldJobData.value=data
        changeStep(data["stage__c"])
        var baseUrl="https://sh.mengtian.com.cn:9595/md/api/common/file/direct-download?fileId=";
        if(data["goodsPicture"]!=undefined && data["goodsPicture"].length>0){
          var goodsPicture=[] as any;
          data["goodsPicture"].forEach(item => {
            goodsPicture.push(baseUrl+item)
          });
          tableDataDispatchAttachment.value.push({picNo:data["goodsPicture"].join(","),type:'货物图片',goodsPicture:goodsPicture})
        }
        if(data["docPicture"]!=undefined && data["docPicture"].length>0){
          var docPicture=[] as any;
          data["docPicture"].forEach(item => {
            docPicture.push(baseUrl+item)
          });
          tableDataDispatchAttachment.value.push({picNo:data["docPicture"].join(","),type:'安装图片',goodsPicture:docPicture})
        }
        if(data["checkInPicture"]!=undefined && data["checkInPicture"].length>0){
          var checkInPicture=[] as any;
          data["checkInPicture"].forEach(item => {
            checkInPicture.push(baseUrl+item)
          });
          tableDataDispatchAttachment.value.push({picNo:data["checkInPicture"].join(","),type:'打卡签到',goodsPicture:checkInPicture})
        }
        if(data["scenePicture"]!=undefined && data["scenePicture"].length>0){
          var scenePicture=[] as any;
          data["scenePicture"].forEach(item => {
            scenePicture.push(baseUrl+item)
          });
          tableDataDispatchAttachment.value.push({picNo:data["scenePicture"].join(","),type:'现场墙面保护',goodsPicture:scenePicture})
        }
        if(data["beforeInstallPicture"]!=undefined && data["beforeInstallPicture"].length>0){
          var beforeInstallPicture=[] as any;
          data["beforeInstallPicture"].forEach(item => {
            beforeInstallPicture.push(baseUrl+item)
          });
          tableDataDispatchAttachment.value.push({picNo:data["beforeInstallPicture"].join(","),type:'安装前图片',goodsPicture:beforeInstallPicture})
        }
        if(data["afterInstallPicture"]!=undefined && data["afterInstallPicture"].length>0){
          var afterInstallPicture=[] as any;
          data["afterInstallPicture"].forEach(item => {
            afterInstallPicture.push(baseUrl+item)
          });
          tableDataDispatchAttachment.value.push({picNo:data["afterInstallPicture"].join(","),type:'安装后图片',goodsPicture:afterInstallPicture})
        }
        if(data["afterInstallScenePicture"]!=undefined && data["afterInstallScenePicture"].length>0){
          var afterInstallScenePicture=[] as any;
          data["afterInstallScenePicture"].forEach(item => {
            afterInstallScenePicture.push(baseUrl+item)
          });
          tableDataDispatchAttachment.value.push({picNo:data["afterInstallScenePicture"].join(","),type:'安装后现场环境图片',goodsPicture:afterInstallScenePicture})
        }
        if(data["completePicture"]!=undefined && data["completePicture"].length>0){
          var completePicture=[] as any;
          data["completePicture"].forEach(item => {
            completePicture.push(baseUrl+item)
          });
          tableDataDispatchAttachment.value.push({picNo:data["completePicture"].join(","),type:'完工证明',goodsPicture:completePicture})
        }
        let invesParams={
          "type": "field_job",
          "recordId": fieldJobData.value["neoId"]
        }
        getInvestigation(invesParams).then(res=>{
          let data=res.data;
          if(data.code=="success"&&data.data&&data.data.length>0){
            let details=data.data[data.data.length-1]
            // console.log(Object.keys(details))
            let i=1
            Object.keys(details).forEach(keyItem=>{
              let newRow={"sNumber":i,"type":keyItem,"satisfaction":details[keyItem]}
              tableDataServiceEvaluation.value.push(newRow)
              i=i+1
            })
            changeStep(3);
          }
        })
			} 

		}).catch((error: any) => {
			// 显示请求失败的提示框
			ElMessage({
				message: '请求数据失败，请重试',
				type: 'error'
			});
			console.error('请求数据失败:', error);
		});
}

const getExtralUserData = (showMsg: boolean)=>{

let params={"userType": 1,"name": "","phone": ""};
getExternalUser(params).then((res : any) => {
    let data = res.data.data
    if (data!=undefined&&data.length>0) {
      extralUserData.value = data
      if(showMsg)
      {
        ElMessage({
          message: '查询成功',
          type: 'success'
        })
      }
    } else {
      if(showMsg){
        ElMessage({
          message: '获取数据失败',
          type: 'error'
        })
      }
      
    }
})
}
</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
