<template>
  <div class="main">
    <span class="header">
      <span class="title">售后工单状态</span>
      <span class="step">
        <span class="item" @click="changeStep(1)">
          <span :class="currentStep == 1 ? 'num_selected' : 'num'">1</span>
          <span :class="currentStep >= 1 ? 'name_selected' : 'name'">开始</span>
        </span>
        <span class="item" @click="changeStep(2)">
          <span :class="currentStep == 2 ? 'num_selected' : 'num'">2</span>
          <span :class="currentStep >= 2 ? 'name_selected' : 'name'">已提报问题</span>
        </span>
        <span class="item" @click="changeStep(3)">
          <span :class="currentStep == 3 ? 'num_selected' : 'num'">3</span>
          <span :class="currentStep >= 3 ? 'name_selected' : 'name'">售后审核</span>
        </span>
        <span class="item" @click="changeStep(4)">
          <span :class="currentStep == 4 ? 'num_selected' : 'num'">4</span>
          <span :class="currentStep >= 4 ? 'name_selected' : 'name'">已定损</span>
        </span>
        <span class="item" @click="changeStep(5)">
          <span :class="currentStep == 5 ? 'num_selected' : 'num'">5</span>
          <span :class="currentStep >= 5 ? 'name_selected' : 'name'">定责发起</span>
        </span>
        <span class="item" @click="changeStep(6)">
          <span :class="currentStep == 6 ? 'num_selected' : 'num'">6</span>
          <span :class="currentStep >= 6 ? 'name_selected' : 'name'">已提交OA审批</span>
        </span>
        <span class="item" @click="changeStep(7)">
          <span :class="currentStep == 7 ? 'num_selected' : 'num'">7</span>
          <span :class="currentStep >= 7 ? 'name_selected' : 'name'">已追责</span>
        </span>
        <span class="item" @click="changeStep(8)">
          <span :class="currentStep == 8 ? 'num_selected' : 'num'">8</span>
          <span :class="currentStep >= 8 ? 'name_selected' : 'name'">结束</span>
        </span>
      </span>
    </span>
    <span class="order_info">
      <span class="title"
        >售后工单详情 
        <!-- <el-button class="submit_btn">已提交</el-button> -->
        <!-- <el-button class="return_btn">总部已退回</el-button> -->
      </span>
      <span class="main_field">
        <span class="row_field">
          <span class="field">
            <span class="label">工单编号：</span>
            <span class="value">{{ aftersalesHeaderDetails.ticketNo__c }}</span>
            <span v-if="false" class="view">查看</span>
          </span>
          <span class="field">
            <span class="label">业务类型：</span>
            <span class="value">{{ aftersalesHeaderDetails.entityType }}</span>
          </span>
          <span class="field">
            <span class="label">售后工单来源：</span>
            <span class="value">{{ aftersalesHeaderDetails.ticketSource__c }}</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">订单编号：</span>
            <span class="value"></span>
          </span>
          <span class="field">
            <span class="label">服务工单：</span>
            <span class="value">{{ aftersalesHeaderDetails.serviceCase__c }}</span>
          </span>
          <span class="field">
            <span class="label">所有人：</span>
            <span class="value"></span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">升级备注：</span>
            <span class="value">{{ aftersalesHeaderDetails.distributorDemands__c }}</span>
          </span>
          <span class="field">
            <span class="label">专卖店名称：</span>
            <span class="value">{{aftersalesHeaderDetails.storeName}}</span>
          </span>
          <span class="field">
            <span class="label">创建时间：</span>
            <span class="value">{{ aftersalesHeaderDetails.createdTime }}</span>
          </span>
        </span>
      </span>
      <span class="title">客户信息</span>
      <span class="other_field">
        <span class="row_field">
          <span class="field">
            <span class="label">客户姓名：</span>
            <span class="value">{{aftersalesHeaderDetails.accountName}}</span>
          </span>
          <span class="field">
            <span class="label">客户电话：</span>
            <span class="value">{{ aftersalesHeaderDetails.customerPhone__c }}</span>
          </span>
          <span class="field">
            <span class="label">提报人：</span>
            <span class="value">{{ aftersalesHeaderDetails.reporter__c }}</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">客户地址：</span>
            <span class="value">{{ aftersalesHeaderDetails.customerAddress__c }}</span>
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
    <span class="order_list">
      <span class="table_title">售后工单处理记录</span>
      <span class="table_content">
        <el-table
          :data="tableDataOrderDetials"
          :stripe="false"
          style="width: 100%"
        >
          <el-table-column prop="text1" label="售后处理记录编号" />
          <el-table-column prop="text2" label="生产单号" />
          <el-table-column prop="text3" label="售后审核员" />
          <el-table-column prop="text4" label="处理方式" />
          <el-table-column prop="text5" label="状态" />
          <el-table-column prop="text6" label="退回原因" />
          <el-table-column prop="text7" label="创建时间" />
          <el-table-column prop="text8" label="操作">
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
          </el-table-column>
        </el-table>
      </span>
      <el-pagination
        class="table_pagination"
        :page-size="20"
        :pager-count="11"
        layout="total, prev, pager, next"
        :total="50"
      />
    </span>
    <span class="action_list">
      <div class="left">
        <img src="@/assets/images/comment.png" alt="" />
        <span class="initiate_comments" @click="initiateComments">发起任务评论</span>
      </div>
      <div class="right">
        <el-button type="primary" class="primary_btn" @click="openDialog2(1)">完善问题描述</el-button>
        <!-- <el-button type="primary" class="primary_btn" @click="openDialog2(2)">定义处理方式</el-button> -->
      </div>
    </span>
    <div class="comment" v-for="item in commentList" :key="item.date">
      <div class="userinfo">
        <img src="@/assets/images/userinfo.png" alt="" />
        <span class="username">{{item["userName"]}}</span>
      </div>
      <div class="content">{{item["text"]}}</div>
      <div class="date">{{item["date"]}}</div>
      <span class="reply">回复</span>
      <img class="tips" src="@/assets/images/tips.png" alt="" />
    </div>
    <div class="showMainDialog2">
      <el-dialog v-model="showMainDialog2" width="25%" :show-close="false">
        <span class="title">{{
          dialogType == 1 ? "完善问题描述" : "定义处理方式"
        }}</span>
        <span class="content" v-if="dialogType == 1">
          <span class="item">
            <span class="label">问题大类</span>
            <el-select v-model="dialog2Form.problemType" placeholder="">
              <el-option
                v-for="item in problemTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </span>
          <span class="item">
            <span class="label">售后问题</span>
            <el-select v-model="dialog2Form.afterSalesIssues" placeholder="">
              <el-option
                v-for="item in afterSalesIssuesList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </span>
          <span class="item">
            <span class="label">责任人</span>
            <el-input v-model="dialog2Form.responsiblePerson"></el-input>
          </span>
          <span class="item">
            <span class="label">问题描述</span>
            <el-input v-model="dialog2Form.problemDesc"></el-input>
          </span>
          <span class="item">
            <el-upload
              :file-list="dialog2Form.fileList"
              class="upload"
              drag
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              multiple
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">将文件拖至此处 或 点击上传</div>
              <template #tip>
                <div class="el-upload__tip">
                  jpg/png files with a size less than 500kb
                </div>
              </template>
            </el-upload>
          </span>
        </span>
        <span class="content" v-if="dialogType == 2">
          <span class="item">
            <span class="label">产品分类</span>
            <el-select v-model="dialog2Form.poductType" placeholder="">
              <el-option
                v-for="item in poductTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </span>
          <span class="item">
            <span class="label">部件分类</span>
            <el-select v-model="dialog2Form.componentType" placeholder="">
              <el-option
                v-for="item in componentTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </span>
          <span class="item">
            <span class="label">不良分类</span>
            <el-select v-model="dialog2Form.badType" placeholder="">
              <el-option
                v-for="item in badTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </span>
          <span class="item">
            <span class="label">质量指标一</span>
            <el-select v-model="dialog2Form.qualityIndicator1" placeholder="">
              <el-option
                v-for="item in qualityIndicator1List"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </span>
          <span class="item">
            <span class="label">质量指标二</span>
            <el-select v-model="dialog2Form.qualityIndicator2" placeholder="">
              <el-option
                v-for="item in qualityIndicator2List"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </span>
          <span class="item">
            <span class="label">处理方式</span>
            <el-select v-model="dialog2Form.handleWay" placeholder="">
              <el-option
                v-for="item in handleWayList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </span>
        </span>
        <template #footer>
          <div class="dialog-footer">
            <el-button
              class="cancel_btn"
              @click="
                showMainDialog2 = false
              "
              >取消</el-button
            >
            <el-button
              @click="confirmDialog"
              type="primary"
              class="primary_btn"
              style="margin-left:50px !important"
              >保存</el-button
            >
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, getCurrentInstance, reactive ,onMounted} from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { useRoute } from "vue-router";
import { getServiceticketById } from "../../api/common";

const { proxy }: any = getCurrentInstance()

const currentStep = ref(4)

const route = useRoute()

const commentList = ref<any>([
])

const dialog2Form = ref<any>({
  problemType: "",
  afterSalesIssues: "",
  responsiblePerson: "",
  problemDesc: "",
  fileList: [],
  poductType: "",
  componentType: "",
  badType: "",
  qualityIndicator1: "", 
  qualityIndicator2: "", 
  handleWay: ""
})

const problemTypeList = ref<any>([
  {code:"1",name:"经销商问题"},
  {code:"2",name:"公司问题"},
  {code:"3",name:"物流问题"}
])

const afterSalesIssuesList = ref<any>([
  {code:"1",name:"店面测量师漏单"},
  {code:"2",name:"店面测量师量错"},
  {code:"3",name:"店里设计师漏分解"},
  {code:"4",name:"店里设计师分解错"},
  {code:"5",name:"店里设计不合理"},
  {code:"6",name:"店里下单员漏单"},
  {code:"7",name:"店里下单员下错"},
  {code:"8",name:"店里安装师问题"},
  {code:"9",name:"消费者补单"},
  {code:"10",name:"消费者使用不当"},
  {code:"11",name:"产品丢失"}
])

const poductTypeList = ref<any>([
  {code:"1",  name:"墙板"},
  {code:"2",  name:"线条"},
  {code:"3",  name:"五金"},
  {code:"4",  name:"门套"},
  {code:"5",  name:"门扇"},
  {code:"6",  name:"柜体"},
  {code:"7",  name:"柜门"},
  {code:"8",  name:"玻璃"},
  {code:"9",  name:"挂板"},
  {code:"10",name:"罗马柱"},
  {code:"11",name:"帽头"},
  {code:"12",name:"装饰块"},
  {code:"13",name:"雕花件"},
  {code:"14",name:"色板"},
  {code:"15",name:"整单"},
  {code:"16",name:"入户门"}
])

const componentTypeList = ref<any>([
  {code:"1",name:"边梃"},
  {code:"2",name:"挂线条"},
  {code:"3",name:"芯板"},
  {code:"4",name:"金属条"},
  {code:"5",name:"码头"},
  {code:"6",name:"封边"},
  {code:"7",name:"L边"},
  {code:"8",name:"整体"},
  {code:"9",name:"面板执手"},
  {code:"10",name:"锁体"},
  {code:"11",name:"铰链"},
  {code:"12",name:"铰链底座"},
  {code:"13",name:"灯带"},
  {code:"14",name:"抽屉轨道"},
  {code:"15",name:"三合一"},
  {code:"16",name:"其他五金"},
  {code:"17",name:"档条"},
  {code:"18",name:"密封条"},
  {code:"19",name:"套板"},
  {code:"20",name:"门套"},
  {code:"21",name:"玻璃"},
  {code:"22",name:"门标"},
  {code:"23",name:"门芯板"},
  {code:"24",name:"配件"},
  {code:"25",name:"五金配件"},
  {code:"26",name:"8属边"},
  {code:"27",name:"背板"},
  {code:"28",name:"层板"},
  {code:"29",name:"抽屉板"},
  {code:"30",name:"底板"},
  {code:"31",name:"顶板"},
  {code:"32",name:"台面板"},
  {code:"33",name:"立板"},
  {code:"34",name:"侧板"},
  {code:"35",name:"踢脚板"},
  {code:"36",name:"五金件"},
  {code:"37",name:"挂板"},
  {code:"38",name:"罗马柱"},
  {code:"39",name:"帽头"},
  {code:"40",name:"装饰块"},
  {code:"41",name:"雕花件"},
  {code:"42",name:"色板"},
  {code:"43",name:"整单"},
  {code:"44",name:"修补漆"},
  {code:"45",name:"入户门扇"}
])

const badTypeList = ref<any>([
  {code:"1",name:"消费者"},
  {code:"2",name:"经销商"},
  {code:"3",name:"订单分解"},
  {code:"4",name:"备料"},
  {code:"5",name:"加工"},
  {code:"6",name:"免漆加工"},
  {code:"7",name:"油漆"},
  {code:"8",name:"少货"},
  {code:"9",name:"包装问题"},
  {code:"10",name:"五金问题"},
  {code:"11",name:"辅料问题"},
  {code:"12",name:"仓库发货"},
  {code:"13",name:"物流送达"},
  {code:"14",name:"系统问题"},
  {code:"15",name:"新品设计问题"},
  {code:"16",name:"隔音等级"},
  {code:"17",name:"受潮"},
  {code:"18",name:"无法提供证明的少货"},
  {code:"19",name:"交期延误"},
  {code:"20",name:"霉变"},
  {code:"21",name:"气味"},
  {code:"22",name:"长虫"},
  {code:"23",name:"过质保期"},
  {code:"24",name:"变色"},
  {code:"25",name:"入户门问题"}
])

const aftersalesHeaderDetails=ref<any>({})
const qualityIndicator1List = ref<any>([
  {code:"1",name:"订单分解错"},
  {code:"2",name:"订单漏分解"},
  {code:"3",name:"变形"}
])

const qualityIndicator2List = ref<any>([
  {code:"1",name:"漏备注"},
  {code:"2",name:"产品漏分解"},
  {code:"3",name:"配件漏分解"},
  {code:"4",name:"五金漏分解"},
  {code:"5",name:"孔位漏分解"},

])

const handleWayList = ref<any>([{
  label: "处理方式",
  value: "1"
}])


const showMainDialog2 = ref(false)

const dialogType = ref(1)

const filterList = ref({
  value1: "1",
  value2: "1",
  value3: "1",
  value4: "1",
  value5: "1",
  value6: "1",
})

const tableData = ref([
  // {
  //   text1: "",
  //   text2: "CS015-00023-0-1-1",
  //   text3: "门套 (自动赋值)",
  //   text4: "示例字段...",
  //   text5: "示例字段...",
  //   text6: "示例字段...",
  //   text7: "示例字段...",
  //   text8: "2021-02-28 10:30:50",
  // },
  // {
  //   text1: "",
  //   text2: "CS015-00023-0-1-1",
  //   text3: "门套 (自动赋值)",
  //   text4: "示例字段...",
  //   text5: "示例字段...",
  //   text6: "示例字段...",
  //   text7: "示例字段...",
  //   text8: "2021-02-28 10:30:50",
  // },
  // {
  //   text1: "",
  //   text2: "CS015-00023-0-1-1",
  //   text3: "门套 (自动赋值)",
  //   text4: "示例字段...",
  //   text5: "示例字段...",
  //   text6: "示例字段...",
  //   text7: "示例字段...",
  //   text8: "2021-02-28 10:30:50",
  // },
])

const filterList1 = ref([{ label: "全部订单", value: "1" }])

const filterList2 = ref([{ label: "产品大类", value: "1" }])

const filterList3 = ref([{ label: "产品型号", value: "1" }])

const filterList4 = ref([{ label: "树种", value: "1" }])

const filterList5 = ref([{ label: "油漆颜色", value: "1" }])

const filterList6 = ref([{ label: "尺寸", value: "1" }])


const tableDataOrderDetials = ref([
  // {
  //   text1: "CS0011-06665-01",
  //   text2: "XX",
  //   text3: "示例字段...",
  //   text4: "示例字段...",
  //   text5: "2021-02-28 10:30:50",
  //   text6: "",
  // },
  // {
  //   text1: "CS0011-06665-01",
  //   text2: "XX",
  //   text3: "示例字段...",
  //   text4: "示例字段...",
  //   text5: "2021-02-28 10:30:50",
  //   text6: "",
  // },
  // {
  //   text1: "CS0011-06665-01",
  //   text2: "XX",
  //   text3: "示例字段...",
  //   text4: "示例字段...",
  //   text5: "2021-02-28 10:30:50",
  //   text6: "",
  // },
])

const changeStep = (step) => {
  currentStep.value = step
}

const openDialog2 = (type) =>{
  dialogType.value = type;
  showMainDialog2.value = true
}

const initiateComments = () => {
  ElMessageBox.prompt("请填写评论内容", "发起评论", {
    inputPattern: /\S/,
    inputErrorMessage: '评论内容不能为空!',
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

const confirmDialog = () =>{
  proxy.$message.success("保存成功!");
  setTimeout(() => {
      showMainDialog2.value = false;
  }, 500);
}

onMounted(() => {
		getDetail(false);
});
const getDetail = (isTure: boolean) => {
		getServiceticketById(route.query.id).then((res : any) => {
			let data = res.data.data
			if (data!=undefined) {
				aftersalesHeaderDetails.value = data
				if(isTure)
				{
					ElMessage({
						message: '查询成功',
						type: 'success'
					})
				}
			} else {
				ElMessage({
					message: '获取数据失败',
					type: 'error'
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
</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
