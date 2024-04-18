<template>
  <div class="main">
    <span class="header">
      <span class="title">订单状态</span>
      <span class="step">
        <span class="item" @click="changeStep(1)">
          <span :class="currentStep == 1 ? 'num_selected' : 'num'">1</span>
          <span :class="currentStep >= 1 ? 'name_selected' : 'name'">...</span>
        </span>
        <span class="item" @click="changeStep(2)">
          <span :class="currentStep == 2 ? 'num_selected' : 'num'">2</span>
          <span :class="currentStep >= 2 ? 'name_selected' : 'name'">已包装</span>
        </span>
        <span class="item" @click="changeStep(3)">
          <span :class="currentStep == 3 ? 'num_selected' : 'num'">3</span>
          <span :class="currentStep >= 3 ? 'name_selected' : 'name'">已成品入库</span>
        </span>
        <span class="item" @click="changeStep(4)">
          <span :class="currentStep == 4 ? 'num_selected' : 'num'">4</span>
          <span :class="currentStep >= 4 ? 'name_selected' : 'name'">已发货</span>
        </span>
        <span class="item" @click="changeStep(5)">
          <span :class="currentStep == 5 ? 'num_selected' : 'num'">5</span>
          <span :class="currentStep >= 5 ? 'name_selected' : 'name'">已经销商收货</span>
        </span>
        <span class="item" @click="changeStep(6)">
          <span :class="currentStep == 6 ? 'num_selected' : 'num'">6</span>
          <span :class="currentStep >= 6 ? 'name_selected' : 'name'">订单完结</span>
        </span>
        <span class="item" @click="changeStep(7)">
          <span :class="currentStep == 7 ? 'num_selected' : 'num'">7</span>
          <span :class="currentStep >= 7 ? 'name_selected' : 'name'">...</span>
        </span>
      </span>
    </span>
    <span class="order_info">
      <span class="title">
        主要信息
        <span class="but" @click="ShowRelatedFieldDialogs = true">查看其他信息</span>
      </span>
      <span class="main_field">
        <span class="row_field">
          <span class="field">
            <span class="label">订单编号：</span>
            <span class="value">{{ tableData["po"] }}</span>
            <span v-if="false" class="view">查看</span>
          </span>
          <span class="field">
            <span class="label">渠道分类：</span>
            <span class="value">{{tableData["orderFlow"]}}</span>
          </span>
          <span class="field">
            <span class="label">交期天数：</span>
            <span class="value">{{tableData["estimatedDeliveryDays"]}}</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">经销商编号：</span>
            <span class="value">{{ tableData["distributorId__c"] }}</span>
          </span>
          <span class="field">
            <span class="label">专卖店编号：</span>
            <span class="value">{{tableData["storeNo"]}}</span>
          </span>
          <span class="field">
            <span class="label">计划出货日期：</span>
            <span class="value">{{tableData["planedDeliveryDate"]}}</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">供应基地：</span>
            <span class="value">{{ tableData["supplyBase__c"] }}</span>
          </span>
          <span class="field">
            <span class="label">预订单编号：</span>
            <span class="value"></span>
          </span>
          <span class="field">
            <span class="label">创建时间：</span>
            <span class="value">{{ tableData["createdTime"] }}</span>
          </span>
        </span>
      </span>
      <span class="title">客户信息</span>
      <span class="other_field">
        <span class="row_field" style="justify-content: space-around;">
          <span class="field" style="width: 400px;">
            <span class="label">客户姓名：</span>
            <span class="value">{{ tableData["accountName__C"] }}</span>
          </span>
          <span class="field" style="width: 400px;">
            <span class="label">客户电话：</span>
            <span class="value">{{ tableData["customerPhone"] }}</span>
          </span>
          <span class="field" style="width: 400px;">
            <span class="label">客户地址：</span>
            <span class="value">{{ tableData["customerAddress"] }}</span>
          </span>
        </span>
        <span class="row_field" style="justify-content: space-around;">
          <span class="field" style="width: 400px;display: flex; align-items: center;">
            <span class="label">是否具备安装条件：</span>
            <span class="value" style="display:flex">
              <el-checkbox disabled v-model="tableData['ifConinsall__C']"></el-checkbox>
            </span>
          </span>
          <span class="field" style="width: 400px;">
            <span class="label">预计配送时间：</span>
            <span class="value">
              <el-date-picker readonly v-model="otherField.scheduleDeliveryTime" type="datetime" placeholder="日期/时间" />
            </span>
          </span>
          <span class="field" style="width: 400px;">
            <span class="label">预计安装时间：</span>
            <span class="value">
              <el-date-picker readonly v-model="otherField.scheduleInstallationTime" type="datetime"
                placeholder="日期/时间" />
            </span>
          </span>
        </span>
      </span>
    </span>
    <span class="related_task">
      <span class="table_title">相关任务</span>
      <span class="table_content">
        <el-table :data="tableDataRelatedTask" :stripe="false" style="width: 100%" max-height="100">
          <el-table-column prop="id" label="任务编号" />
          <el-table-column prop="taskType" label="类别" />
          <el-table-column prop="followerName" label="经销商负责人" />
          <!-- <el-table-column prop="status" label="状态" /> -->
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <div style="display:flex;align-items:center;">
                {{ scope.row.status ? (RelatedTaskOptions.find(val => val["code"] == scope.row.status)?.name) : "待开始" }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="createdTime" label="创建时间" />
          <el-table-column label="操作" width="80px">
            <template #default="scope">
              <div style="
                  display: flex;
                  align-items: center;
                  color: #165dff;
                  cursor: pointer;
                " @click="console.log(scope)">
                查看
              </div>
            </template>
          </el-table-column>
        </el-table>
      </span>
    </span>
    <span class="related_documents">
      <span class="title">相关单据</span>
      <el-button class="btn">{{relatedDocumentsProblemReportingList.length}}个问题提报</el-button>
      <el-button class="btn">1个售后工单</el-button>
      <el-button class="btn">{{relatedDocumentsDispatchList.length }}个派工单</el-button>
      <span class="view" @click="showRelatedDocumentsDialog = true">点击查看</span>
    </span>
    <span class="order_details_list">
      <span class="table_title">订单明细</span>
      <span class="table_content">
        <el-table :data="tableDataOrderDetailsList" :stripe="false" style="width: 100%">
          <el-table-column prop="id" label="订单明细编号" />
          <el-table-column prop="text2" label="组号" />
          <el-table-column prop="fscProductModel" label="型号" />
          <el-table-column prop="treeSpecies__c" label="树种">
            <!-- <template #default="scope">
              <div class="custom_cell">
                {{ scope.row.text4 }}
              </div>
            </template> -->
          </el-table-column>
          <el-table-column prop="quantity" label="数量" />
          <el-table-column prop="text9" label="商品编码" />
          <el-table-column prop="createdTime" label="创建时间" />
          <el-table-column prop="text7" label="操作" width="80px">
            <template #default="scope">
              <div style="
                  display: flex;
                  align-items: center;
                  color: #165dff;
                  cursor: pointer;
                " @click="console.log(scope)">
                查看
              </div>
            </template>
          </el-table-column>
        </el-table>
      </span>
      <el-pagination class="table_pagination" :page-size="20" :pager-count="11" layout="total, prev, pager, next"
        :total="50" />
    </span>
    <div class="action_list">
      <div class="left">
        <img src="@/assets/images/comment.png" alt="" />
        <span class="initiate_comments" @click="initiateComments">发起任务评论</span>
      </div>
      <div class="right">
        <el-button type="primary" @click="OpenProblemReportingDialog" class="primary_btn">问题提报</el-button>
      </div>
    </div>
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
    <div class="problemReportingDialog">
      <el-dialog v-model="showProblemReportingDialog" title="问题提报" width="80%" :show-close="false">
        <span class="step">
          <span class="item">
            <span :class="currentProblemReportingStep == 1 ? 'num_selected' : 'num'">1</span>
            <span class="name">完善提报信息
              <span class="remark">完善问题提报的信息</span>
            </span>
          </span>
          <span class="item">
            <span :class="currentProblemReportingStep == 2 ? 'num_selected' : 'num'">2</span>
            <span class="name">完成创建
              <span class="remark">等待售服部处理</span>
            </span>
          </span>
        </span>
        <div class="content">
          <el-form :model="problemReportingForm" :rules="problemReportingRule" label-width="90px" label-position="left">
            <el-form-item label="订单编号" prop="orderNo">
              <el-select v-model="problemReportingForm.orderNo" filterable @change="onCahngeOrderNo"
                placeholder="请选择订单编号">
                <el-option v-for="item in orderList" :key="item.po" :label="item.po" :value="item.po" />
              </el-select>
            </el-form-item>
            <el-form-item label="客户姓名" prop="customerName">
              <el-input placeholder="请输入客户姓名" v-model="problemReportingForm.customerName" />
            </el-form-item>
            <el-form-item label="客户电话" prop="customerPhone">
              <el-input placeholder="请输入客户电话" v-model="problemReportingForm.customerPhone" />
            </el-form-item>
            <el-form-item label="问题描述" class="customLayout" prop="desc">
              <el-input v-model="problemReportingForm.desc" :rows="5" type="textarea" maxlength="500"
                placeholder="请输入问题描述" show-word-limit />
            </el-form-item>
            <el-form-item label="上传图片" class="custom_upload">
              <el-upload :on-success="handleSuccess" :on-remove="handleDelete" :auto-upload="true" :data="uploadData"
                :headers="headers" :before-upload="beforeUpload" list-type="picture-card" class="avatar-uploader"
                action="https://sh.mengtian.com.cn:9595/md/api/common/file/upload" :show-file-list="true"
                v-model:file-list="problemReportingForm.fileList">
                <el-icon>
                  <Plus />
                </el-icon>
              </el-upload>
            </el-form-item>
            <!-- <el-form-item label="上传图片" class="custom_upload">
              <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :show-file-list="false" v-model:file-list="problemReportingForm.fileList">
                <el-icon class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </el-upload>
            </el-form-item> -->
          </el-form>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button class="cancel_btn" @click="showProblemReportingDialog = false">取消</el-button>
            <el-button type="primary" class="primary_btn" @click="submitProblemReporting">提交</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
    <div class="relatedDocumentsDialog">
      <el-dialog v-model="showRelatedDocumentsDialog" title="相关单据" width="80%" :show-close="false">
        <div class="content">
          <span class="tableItem">
            <span class="tableTitle"> 1. 问题提报 </span>
            <span class="tableContent">
              <el-table :data="relatedDocumentsProblemReportingList" :stripe="false" style="width: 100%">
                <el-table-column prop="text1" label="问题提报编号" />
                <el-table-column prop="questionType" label="类别" />
                <el-table-column prop="text3" label="负责人" />
                <el-table-column prop="text4" label="状态" />
                <el-table-column prop="text5" label="修改时间" />
                <el-table-column prop="text6" label="操作" width="80px">
                  <template #default="scope">
                    <div style="
                        display: flex;
                        align-items: center;
                        color: #165dff;
                        cursor: pointer;
                      " @click="console.log(scope)">
                      查看
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </span>
          </span>
          <span class="tableItem">
            <span class="tableTitle"> 2. 售后工单 </span>
            <span class="tableContent">
              <el-table :data="relatedDocumentsAftersalesWorkorderList" :stripe="false" style="width: 100%">
                <el-table-column prop="text1" label="售后工单编号" />
                <el-table-column prop="text2" label="类别" />
                <el-table-column prop="text3" label="负责人" />
                <el-table-column prop="text4" label="状态" />
                <el-table-column prop="text5" label="修改时间" />
                <el-table-column prop="text6" label="操作" width="80px">
                  <template #default="scope">
                    <div style="
                        display: flex;
                        align-items: center;
                        color: #165dff;
                        cursor: pointer;
                      " @click="console.log(scope)">
                      查看
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </span>
          </span>
          <span class="tableItem">
            <span class="tableTitle"> 3. 派工单 </span>
            <span class="tableContent">
              <el-table :data="relatedDocumentsDispatchList" :stripe="false" style="width: 100%">
                <el-table-column prop="caseNo" label="派工单编号" />
                <el-table-column prop="fieldJobType__c" label="类别">
                  <template #default="scope">
                    <div style="display:flex;align-items:center;">
                      {{scope.row.fieldJobType__c?(technicianTypeOption.find(val=>val["code"]==scope.row.fieldJobType__c)?.name):"配送派工单"}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="followerName" label="负责人" />
                <el-table-column prop="stage__c" label="状态">
                  <template #default="scope">
                    <div style="display:flex;align-items:center;">
                      {{scope.row.stage__c?(dispatchWorkerStatusOption.find(val=>val["code"]==scope.row.stage__c)?.name):"待开始"}}                    
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="updatedTime" label="修改时间" />
                <el-table-column prop="id" label="操作" width="80px">
                  <template #default="scope">
                    <div style="
                        display: flex;
                        align-items: center;
                        color: #165dff;
                        cursor: pointer;
                      " @click="console.log(scope)">
                      查看
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </span>
          </span>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" class="primary_btn" @click="showRelatedDocumentsDialog = false">返回</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
    <!-- 查看其他信息 -->
    <div class="relatedDocumentsDialog">
      <el-dialog v-model="ShowRelatedFieldDialogs" title="订单其他主要信息" width="95%" :show-close="false">
        <div class="content">
          <!-- <el-form label-width="80px" label-position="left">
            <el-form-item label="订单编号">
              <el-input placeholder="请输入任务编号" v-model="ShowRelatedFieldDialogs" />
            </el-form-item>
            <el-form-item label="订单编号">
              <el-input placeholder="请输入任务编号" v-model="ShowRelatedFieldDialogs" />
            </el-form-item>
            <el-form-item label="订单编号">
              <el-input placeholder="请输入任务编号" v-model="ShowRelatedFieldDialogs" />
            </el-form-item>
          </el-form> -->
          <el-descriptions direction="vertical" :column="12" :size="size" border>
            <el-descriptions-item label="渠道分类">渠道</el-descriptions-item>
            <el-descriptions-item label="产品分类">渠道五金</el-descriptions-item>
            <el-descriptions-item label="订单编号">GZ0111-03528-0</el-descriptions-item>
            <el-descriptions-item label="订单流程">渠道</el-descriptions-item>
            <el-descriptions-item label="应收款">18100000000</el-descriptions-item>
            <el-descriptions-item label="订货日期">2024-04-02</el-descriptions-item>
            <el-descriptions-item label="提货日期"></el-descriptions-item>
            <el-descriptions-item label="交期类型">标准产品类</el-descriptions-item>
            <el-descriptions-item label="交期天数">35</el-descriptions-item>
            <el-descriptions-item label="计划出货日期">2024-05-17</el-descriptions-item>
            <el-descriptions-item label="总订单号"></el-descriptions-item>
            <el-descriptions-item label="分订单号"></el-descriptions-item>
            <el-descriptions-item label="订货分站"></el-descriptions-item>
            <el-descriptions-item label="中心仓"></el-descriptions-item>
            <el-descriptions-item label="货运部代号">A03</el-descriptions-item>
            <el-descriptions-item label="货运部">恒凯</el-descriptions-item>
            <el-descriptions-item label="销售类型">零售</el-descriptions-item>
            <el-descriptions-item label="加急类型">正常交期</el-descriptions-item>
            <el-descriptions-item label="包装方式">标准包装</el-descriptions-item>
            <el-descriptions-item label="客户姓名">石昌权</el-descriptions-item>
            <el-descriptions-item label="客户电话">18286710051</el-descriptions-item>
            <el-descriptions-item label="客户地址" :spen="3">贵州省/毕节市/七星关区/碧阳街道/南山御景</el-descriptions-item>
            <el-descriptions-item label="专卖店编号">GZ0111</el-descriptions-item>
            <el-descriptions-item label="专卖店录单员">毕节录单员</el-descriptions-item>
            <el-descriptions-item label="专卖店名">贵州毕节</el-descriptions-item>
            <el-descriptions-item label="专卖店电话">18508575546</el-descriptions-item>
            <el-descriptions-item label="专卖店地址">贵州省毕节市居然之家远航店二楼</el-descriptions-item>
            <el-descriptions-item label="经销商编号">GZ0111</el-descriptions-item>
            <el-descriptions-item label="测量人"></el-descriptions-item>
            <el-descriptions-item label="备注"></el-descriptions-item>
            <el-descriptions-item label="生产单号">CH027787</el-descriptions-item>
            <el-descriptions-item label="计划下单日期"></el-descriptions-item>
            <el-descriptions-item label="计划入库日期"></el-descriptions-item>
            <el-descriptions-item label="实际下单日期"></el-descriptions-item>
            <el-descriptions-item label="订单验证码">6797612100</el-descriptions-item>
            <el-descriptions-item label="订单创建人">6205</el-descriptions-item>
          </el-descriptions>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" class="primary_btn" @click="ShowRelatedFieldDialogs = false">返回</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, getCurrentInstance, reactive, onMounted } from "vue"
import { Plus } from "@element-plus/icons-vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { useRoute } from "vue-router"
import { getOrderListById, getLoginInfo, getServiceCaseItem, getFieldJob, getOrderList, createServiceCase } from '../../api/common.js'


const { proxy }: any = getCurrentInstance()
const size = ref('default')

//主界面传参 
const route = useRoute()
const taskStatus_c = route.query.status_c != null ? parseInt(route.query.status_c.toString(), 0) + 1 : 1

const currentStep = ref(taskStatus_c)

const tableData = ref({})

const orderList = ref([]);

const commentList = ref<any>([
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

const otherField = ref<any>({
  haveInstallationConditions: false,
  scheduleDeliveryTime: null,
  scheduleInstallationTime: null,
})


const currentProblemReportingStep = ref(1)


const problemReportingForm = ref({
  orderNo: "",
  customerName: "",
  customerPhone: "",
  desc: "",
  fileList: [],
  filePath: [],
})

const problemReportingRule = reactive({

  customerName: [
    { required: true, message: "Please input customer name", trigger: "blur" },
  ],
  customerPhone: [
    { required: true, message: "Please input customer phone", trigger: "blur" },
  ],
  desc: [
    { required: true, message: "Please input problem description", trigger: "blur" },
  ]
})

const showProblemReportingDialog = ref(false)

const showRelatedDocumentsDialog = ref(false)

const ShowRelatedFieldDialogs = ref(false)

const tableDataRelatedTask = ref([])

const RelatedTaskOptions = ref([
  {
    code: "0",
    name: "未开始",
  },
  {
    code: "1",
    name: "进行中",
  },
  {
    code: "2",
    name: "已完成",
  }
])

const tableDataOrderDetailsList = ref([])


const relatedDocumentsProblemReportingList = ref([])

const relatedDocumentsAftersalesWorkorderList = ref([
  {
    text1: "XXX",
    text2: "交付任务",
    text3: "XXX",
    text4: "进行中",
    text5: "2021-02-28 10:30:50",
    text6: "",
  }
])

const relatedDocumentsDispatchList = ref([
  // {
  //   text1: "XXX",
  //   text2: "交付任务",
  //   text3: "XXX",
  //   text4: "进行中",
  //   text5: "2021-02-28 10:30:50",
  //   text6: "",
  // }
] as any)


onMounted(() => {
  setTimeout(() => {
    getList();
    postRelateList();
    postServiceCaseList();
    //getSearchOrderList();
    postfieldjobeList();
  }, 1000);
})


// 获取ID查询详情接口
const getList = () => {
  getOrderListById(route.query.id).then((res: any) => {
    let dataList = res.data
    if (dataList.code == "success") {
      tableData.value = dataList.data
      otherField.value.scheduleDeliveryTime=tableData["estimatedDeliveryDate"]
      otherField.value.scheduleInstallationTime=tableData["estimatedInstallDate"]
      tableDataOrderDetailsList.value = dataList.data.items
    } else {
      console.log("失败")
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

//相关任务接口请求
const postRelateList = () => {
  let param = {
    "status": "",
    "accountName": "",
    "createdTime": ""
  }
  getLoginInfo(param).then((res: any) => {
    let dataList = res.data
    if (dataList.code == "success") {
      tableDataRelatedTask.value = dataList.data
    } else {
      console.log("失败")
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


//问题提报接口请求
const postServiceCaseList = () => {
  getServiceCaseItem(route.query.id).then((res: any) => {
    let dataList = res.data
    if (dataList.code == "success") {
      // relatedDocumentsProblemReportingList.value = dataList.data
      if (dataList.data && typeof dataList.data === 'object') {
        let dataArray = [{
          id: dataList.data.id,
          questionType: dataList.data.questionType,
          problemDescription: dataList.data.problemDescription,
          name: dataList.data.name,
          entityType: dataList.data.entityType,
          caseNo: dataList.data.caseNo,
          province: dataList.data.province,
          city: dataList.data.city,
          district: dataList.data.district,
          caseStatus: dataList.data.caseStatus,
          picture: dataList.data.picture,
          video: dataList.data.video,
          lockStatus: dataList.data.lockStatus
        }]
        // 赋值给 relatedDocumentsProblemReportingList
        relatedDocumentsProblemReportingList.value = dataArray
        console.log("dataArray", dataArray)
      }


    } else {
      console.log("失败")
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


//售后工单


//派工单
const postfieldjobeList = () => {
  getFieldJob(route.query.id).then((res: any) => {
    let dataList = res.data
    if (dataList.code == "success") {
      // relatedDocumentsProblemReportingList.value = dataList.data
      if (dataList.data && typeof dataList.data === 'object') {
        let dataArray = [{
          id: dataList.data.id,
          stage__c: dataList.data.stage__c,
          fieldJobType__c: dataList.data.fieldJobType__c,
          updatedTime: dataList.data.updatedTime,
          entityType: dataList.data.entityType,
          followerName: dataList.data.followerName,
          caseNo:dataList.data.caseNo
        }]
        // 赋值给 relatedDocumentsProblemReportingList
        relatedDocumentsDispatchList.value = dataArray
        console.log("dataArray", dataArray)
      }


    } else {
      console.log("失败")
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

//获取订单列表
const getSearchOrderList = () => {
  let params = {
    "deliveryDate": "",
    "status__c": "",
    "orderType__c": "",
    "transactionDate": "",
    "po": "",
    "accountName": "",
    "accountPhone": ""
  }
  getOrderList(params).then(res => {
    let rtData = res.data;
    if (rtData.code == "success") {
      orderList.value = rtData.data;
    }
    else {
      proxy.$message.error(rtData?.message);
    }
  })
}

//问题提报提交
const submitProblemReporting = () => {
  console.log("problemReportingForm.value",problemReportingForm.value["fileId"])
  for (let key in problemReportingForm.value) {
    if (key != "fileList" && key != "orderNo" && key != "fileList" && key != "filePath" && problemReportingForm.value[key] == "") {
      proxy.$message.error("必填字段不能为空!");
      return;
    }
  }
  let params = {
    caseNo: problemReportingForm.value["orderNo"],
    caseAccountName: problemReportingForm.value["customerName"],
    caseAccountPhone: problemReportingForm.value["customerPhone"],
    problemDescription: problemReportingForm.value["desc"],
    picture: problemReportingForm.value["fileId"],
    name:problemReportingForm.value["customerName"]+"订单",
    caseStatus: "1",
    questionType:"1"
  }
  createServiceCase(params).then(res => {
    let rtData = res.data;
    if (rtData.code == "success") {
      problemReportingForm.value = {
        orderNo: "",
        customerName: "",
        customerPhone: "",
        desc: "",
        fileList: [],
        filePath: [],
      } as any;
      showProblemReportingDialog.value = false
      proxy.$message.success("提交成功!");
      // getTableDataList();
    }
    else {
      proxy.$message.error(rtData?.message)
    }
  })
}



const changeStep = (step) => {
  currentStep.value = step
}

const OpenProblemReportingDialog = () => {
  showProblemReportingDialog.value = true
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
    .catch(() => { })
}

const onCahngeOrderNo = (event) => {
  let item = orderList.value.find(val => val["po"] == event);
  if (item) {
    problemReportingForm.value["customerName"] = item["accountName"];
    problemReportingForm.value["customerPhone"] = item["accountPhone"];
  }
}

const handleSuccess = (res) => {
  console.log(res);
  if (res.code == "success") {
    let path = res.data.map(val => val["fileUrl"]);
    problemReportingForm.value["filePath"] = problemReportingForm.value["filePath"].concat(path)
  }
}

const handleDelete = (res) => {
  var resopnse = res["response"];
  console.log(resopnse);
}

const uploadData = ref({
  files: [],
  name: "files"
})

const headers = ref({
  Content: "application/json",
  Authorization: ``, // Here you can add your token
  isImage: "true",
  needFileId: "true",
  "Trace-Id": "",
})

const beforeUpload = (file) => {
  uploadData.value["files"].push(file)
}


</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
