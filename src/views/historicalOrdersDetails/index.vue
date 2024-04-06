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
      <span class="title">订单详情</span>
      <span class="main_field">
        <span class="row_field">
          <span class="field">
            <span class="label">订单编号：</span>
            <span class="value">CS0011-06665-01</span>
            <span v-if="false" class="view">查看</span>
          </span>
          <span class="field">
            <span class="label">订单流程：</span>
            <span class="value">渠道</span>
          </span>
          <span class="field">
            <span class="label">生产单号：</span>
            <span class="value">XXX</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">经销商编号：</span>
            <span class="value">XXX</span>
          </span>
          <span class="field">
            <span class="label">专卖店编号：</span>
            <span class="value">XXX</span>
          </span>
          <span class="field">
            <span class="label">出库方式：</span>
            <span class="value">直发出库</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">供应基地：</span>
            <span class="value">庆元基地</span>
          </span>
          <span class="field">
            <span class="label">预订单编号：</span>
            <span class="value">3CS0011-24012630295</span>
          </span>
          <span class="field">
            <span class="label">创建时间：</span>
            <span class="value">XX</span>
          </span>
        </span>
      </span>
      <span class="title">其他字段</span>
      <span class="other_field">
        <span class="row_field" style="justify-content: space-around;">
          <span class="field" style="width: 400px;">
            <span class="label">客户姓名：</span>
            <span class="value">张三</span>
          </span>
          <span class="field" style="width: 400px;">
            <span class="label">客户电话：</span>
            <span class="value">15356789570</span>
          </span>
          <span class="field" style="width: 400px;">
            <span class="label">客户地址：</span>
            <span class="value">XXX</span>
          </span>
        </span>
        <span class="row_field" style="justify-content: space-around;">
          <span class="field" style="width: 400px;display: flex; align-items: center;">
            <span class="label">是否具备安装条件：</span>
            <span class="value" style="display:flex">
              <el-checkbox v-model="otherField.haveInstallationConditions"></el-checkbox>
            </span>
          </span>
          <span class="field" style="width: 400px;">
            <span class="label">预计配送时间：</span>
            <span class="value">
              <el-date-picker
                v-model="otherField.scheduleDeliveryTime"
                type="datetime"
                placeholder="日期/时间"
              />
            </span>
          </span>
          <span class="field" style="width: 400px;">
            <span class="label">预计安装时间：</span>
            <span class="value">
              <el-date-picker
                v-model="otherField.scheduleInstallationTime"
                type="datetime"
                placeholder="日期/时间"
              />
            </span>
          </span>
        </span>
      </span>
    </span>
    <span class="related_task">
      <span class="table_title">相关任务</span>
      <span class="table_content">
        <el-table
          :data="tableDataRelatedTask"
          :stripe="false"
          style="width: 100%"
        >
          <el-table-column prop="text1" label="任务编号" />
          <el-table-column prop="text2" label="类别" />
          <el-table-column prop="text3" label="经销商负责人" />
          <el-table-column prop="text3" label="状态">
            <template #default="scope">
              <el-button class="statusing" @click="console.log(scope)">进行中</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="text5" label="创建时间" />
          <el-table-column prop="text7" label="操作" width="80px">
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
    </span>
    <span class="related_documents">
      <span class="title">相关单据</span>
      <el-button class="btn">2个问题提报</el-button>
      <el-button class="btn">1个售后工单</el-button>
      <el-button class="btn">1个派工单</el-button>
      <span class="view" @click="showRelatedDocumentsDialog = true"
        >点击查看</span
      >
    </span>
    <span class="order_details_list">
      <span class="table_title">订单明细</span>
      <span class="table_content">
        <el-table
          :data="tableDataOrderDetailsList"
          :stripe="false"
          style="width: 100%"
        >
          <el-table-column prop="text1" label="订单明细编号" />
          <el-table-column prop="text2" label="部件名称" />
          <el-table-column prop="text3" label="部件尺寸" />
          <el-table-column prop="text4" label="型号">
             <template #default="scope">
              <div class="custom_cell">
                {{scope.row.text4}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="text5" label="数量" />
          <el-table-column prop="text6" label="创建时间" />
          <el-table-column prop="text7" label="操作" width="80px">
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
    <div class="action_list">
      <div class="left">
        <img src="@/assets/images/comment.png" alt="" />
        <span class="initiate_comments" @click="initiateComments">发起任务评论</span>
      </div>
      <div class="right">
        <el-button
          type="primary"
          @click="OpenProblemReportingDialog"
          class="primary_btn"
          >问题提报</el-button
        >
      </div>
    </div>
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
    <div class="problemReportingDialog">
      <el-dialog
        v-model="showProblemReportingDialog"
        title="问题提报"
        width="80%"
        :show-close="false"
      >
                <span class="step">
          <span class="item">
            <span
              :class="currentProblemReportingStep == 1 ? 'num_selected' : 'num'"
              >1</span
            >
            <span class="name"
              >完善提报信息
              <span class="remark">完善问题提报的信息</span>
            </span>
          </span>
          <span class="item">
            <span
              :class="currentProblemReportingStep == 2 ? 'num_selected' : 'num'"
              >2</span
            >
            <span class="name"
              >完成创建
              <span class="remark">等待售服部处理</span>
            </span>
          </span>
        </span>
        <div class="content">
          <el-form
            :model="problemReportingForm"
            :rules="problemReportingRule"
            label-width="90px"
            label-position="left"
          >
            <el-form-item label="订单编号" prop="orderNo">
              <el-input
                placeholder="请选择订单编号"
                v-model="problemReportingForm.orderNo"
              />
            </el-form-item>
            <el-form-item label="客户姓名" prop="customerName">
              <el-input
                placeholder="请输入客户姓名"
                v-model="problemReportingForm.customerName"
              />
            </el-form-item>
            <el-form-item label="客户电话" prop="customerPhone">
              <el-input
                placeholder="请输入客户电话"
                v-model="problemReportingForm.customerPhone"
              />
            </el-form-item>
             <el-form-item label="问题描述" class="customLayout" prop="desc">
              <el-input
                v-model="problemReportingForm.desc"
                :rows="5"
                type="textarea"
                maxlength="500"
                placeholder="请输入问题描述"
                show-word-limit
              />
            </el-form-item>
             <el-form-item label="上传图片" class="custom_upload">
              <el-upload
                class="avatar-uploader"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :show-file-list="false"
                v-model:file-list="problemReportingForm.fileList"
              >
                <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <!-- <el-form-item label="姓名" prop="userName">
              <el-input
                placeholder="请输入姓名"
                v-model="problemReportingForm.userName"
              />
            </el-form-item>
            <el-form-item label="省" prop="province">
              <el-input
                placeholder="请输入省"
                v-model="problemReportingForm.province"
              />
            </el-form-item>
            <el-form-item label="市" prop="city">
              <el-input
                placeholder="请输入市"
                v-model="problemReportingForm.city"
              />
            </el-form-item>
            <el-form-item label="详细地址" prop="address">
              <el-input
                placeholder="请输入详细地址"
                v-model="problemReportingForm.address"
              />
            </el-form-item>
            <el-form-item label="问题类别" prop="type">
              <el-radio-group
                style="width: 300px"
                v-model="problemReportingForm.type"
              >
                <el-radio value="1">售后报修</el-radio>
                <el-radio value="2">投诉建议</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="选择订单" prop="orderNo">
              <el-input
                placeholder="请输入订单"
                v-model="problemReportingForm.orderNo"
              />
            </el-form-item>
            <el-form-item label="问题描述" class="customLayout">
              <el-input
                v-model="problemReportingForm.desc"
                :rows="5"
                type="textarea"
                maxlength="500"
                placeholder="请输入问题描述"
                show-word-limit
              />
            </el-form-item>
            <el-form-item label="上传图片" class="custom_upload">
              <el-upload
                class="avatar-uploader"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :show-file-list="false"
                v-model:file-list="problemReportingForm.fileList"
              >
                <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item> -->
          </el-form>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button
              class="cancel_btn"
              @click="showProblemReportingDialog = false"
              >取消</el-button
            >
            <el-button
              type="primary"
              class="primary_btn"
              @click="submitProblemReporting"
              >提交</el-button
            >
          </div>
        </template>
      </el-dialog>
    </div>
    <div class="relatedDocumentsDialog">
      <el-dialog
        v-model="showRelatedDocumentsDialog"
        title="相关单据"
        width="80%"
        :show-close="false"
      >
        <div class="content">
          <span class="tableItem">
            <span class="tableTitle"> 1. 问题提报 </span>
            <span class="tableContent">
              <el-table :data="relatedDocumentsProblemReportingList" :stripe="false" style="width: 100%">
                <el-table-column prop="text1" label="问题提报编号" />
                <el-table-column prop="text2" label="类别" />
                <el-table-column prop="text3" label="负责人" />
                <el-table-column prop="text4" label="状态" />
                <el-table-column prop="text5" label="修改时间" />
                <el-table-column prop="text6" label="操作" width="80px">
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
          </span>
          <span class="tableItem">
            <span class="tableTitle"> 3. 派工单 </span>
            <span class="tableContent">
              <el-table :data="relatedDocumentsDispatchList" :stripe="false" style="width: 100%">
                <el-table-column prop="text1" label="派工单编号" />
                <el-table-column prop="text2" label="类别" />
                <el-table-column prop="text3" label="负责人" />
                <el-table-column prop="text4" label="状态" />
                <el-table-column prop="text5" label="修改时间" />
                <el-table-column prop="text7" label="操作" width="80px">
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
          </span>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button
              type="primary"
              class="primary_btn"
              @click="showRelatedDocumentsDialog = false"
              >返回</el-button
            >
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, getCurrentInstance, reactive } from "vue"
import { Plus } from "@element-plus/icons-vue"
import { ElMessage, ElMessageBox } from "element-plus"

const { proxy }: any = getCurrentInstance()

const currentStep = ref(4)

const commentList = ref<any>([
])


const otherField = ref<any>({
  haveInstallationConditions: false,
  scheduleDeliveryTime: null,
  scheduleInstallationTime: null,
})


const currentProblemReportingStep = ref(1)


const problemReportingForm = reactive({
  // userName: "",
  // province: "",
  // city: "",
  // address: "",
  // type: "1",
  // desc: "",
  // orderNo: "",
  // fileList: "",
  orderNo: "",
  customerName: "",
  customerPhone: "",
  desc: "",
  fileList: []
})

const problemReportingRule = reactive({
  // userName: [
  //   { required: true, message: "Please input userName", trigger: "blur" },
  // ],
  // province: [
  //   { required: true, message: "Please input province", trigger: "blur" },
  // ],
  // city: [{ required: true, message: "Please input city", trigger: "blur" }],
  // address: [
  //   { required: true, message: "Please input address", trigger: "blur" },
  // ],
  // type: [
  //   { required: true, message: "Please input problem type", trigger: "blur" },
  // ],
  // orderNo: [
  //   {
  //     required: true,
  //     message: "Please input problem order no",
  //     trigger: "blur",
  //   },
  // ],
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

const tableDataRelatedTask = ref([
  {
    text1: "Task-00023-1",
    text2: "交付任务",
    text3: "XXX",
    text4: "进行中",
    text5: "2021-02-28 10:30:50",
    text6: "",
  },
])

const tableDataOrderDetailsList = ref([
  {
    text1: "CS015-00023-0-1-1",
    text2: "A横主板",
    text3: "844*150*24",
    text4: "QKMT24档条",
    text5: "1",
    text6: "2021-02-28 10:30:50",
    text7: "",
  },
  {
    text1: "CS015-00023-0-1-1",
    text2: "A横主板",
    text3: "844*150*24",
    text4: "QKMT24档条",
    text5: "1",
    text6: "2021-02-28 10:30:50",
    text7: "",
  },
  {
    text1: "CS015-00023-0-1-1",
    text2: "A横主板",
    text3: "844*150*24",
    text4: "QKMT24档条",
    text5: "1",
    text6: "2021-02-28 10:30:50",
    text7: "",
  },
  {
    text1: "CS015-00023-0-1-1",
    text2: "A横主板",
    text3: "844*150*24",
    text4: "QKMT24档条",
    text5: "1",
    text6: "2021-02-28 10:30:50",
    text7: "",
  },
])


const relatedDocumentsProblemReportingList = ref([
  {
    text1: "XXX(服务工单编号)",
    text2: "交付任务",
    text3: "XXX",
    text4: "进行中",
    text5: "2021-02-28 10:30:50",
    text6: "",
  },
   {
    text1: "XXX(服务工单编号)",
    text2: "交付任务",
    text3: "XXX",
    text4: "进行中",
    text5: "2021-02-28 10:30:50",
    text6: "",
  }
])

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
  {
    text1: "XXX",
    text2: "交付任务",
    text3: "XXX",
    text4: "进行中",
    text5: "2021-02-28 10:30:50",
    text6: "",
  }
])


const changeStep = (step) => {
  currentStep.value = step
}

const OpenProblemReportingDialog = () => {
  showProblemReportingDialog.value = true
}

const submitProblemReporting = () => {
  showProblemReportingDialog.value = false
  proxy.$message.success("提交成功!")
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


</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
