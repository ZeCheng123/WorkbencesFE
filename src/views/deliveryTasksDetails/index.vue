<template>
  <div class="main">
    <span class="header">
      <span class="title">任务状态</span>
      <span class="step">
        <span class="item">
          <span :class="currentStep == 1 ? 'num_selected' : 'num'">1</span>
          <span :class="currentStep >= 1 ? 'name_selected' : 'name'"
            >待处理</span
          >
        </span>
        <span class="item">
          <span :class="currentStep == 2 ? 'num_selected' : 'num'">2</span>
          <span :class="currentStep >= 2 ? 'name_selected' : 'name'">提货</span>
        </span>
        <span class="item">
          <span :class="currentStep == 3 ? 'num_selected' : 'num'">3</span>
          <span :class="currentStep >= 3 ? 'name_selected' : 'name'">入库</span>
        </span>
        <span class="item">
          <span
            @click="currentStep = 4"
            :class="currentStep == 4 ? 'num_selected' : 'num'"
            >4</span
          >
          <span :class="currentStep >= 4 ? 'name_selected' : 'name'">配送</span>
        </span>
        <span class="item">
          <span :class="currentStep == 5 ? 'num_selected' : 'num'">5</span>
          <span :class="currentStep >= 5 ? 'name_selected' : 'name'">安装</span>
        </span>
        <span class="item">
          <span :class="currentStep == 6 ? 'num_selected' : 'num'">6</span>
          <span :class="currentStep >= 6 ? 'name_selected' : 'name'">完成</span>
        </span>
      </span>
    </span>
    <span class="task_info">
      <span class="title"
        >任务详情
        <el-button
          v-if="currentStep >= 5"
          type="primary"
          class="primary_blue_btn"
          >已派工配送</el-button
        ><el-button
          v-if="currentStep == 6"
          type="primary"
          class="primary_green_btn"
          >已派工安装</el-button
        ></span
      >
      <span class="main_field">
        <span class="row_field">
          <span class="field">
            <span class="label">任务编号：</span>
            <span class="value">CS0011-06665-01</span>
            <span v-if="false" class="view">查看</span>
          </span>
          <span class="field">
            <span class="label">经销商负责人：</span>
            <span class="value">零售</span>
          </span>
          <span class="field">
            <span class="label">任务开始时间：</span>
            <span class="value">示例</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">任务类型：</span>
            <span class="value">交付</span>
          </span>
          <span class="field">
            <span class="label">提货司机：</span>
            <span class="value">默认</span>
          </span>
          <span class="field">
            <span class="label">预计结束时间：</span>
            <span class="value">示例</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">示例字段：</span>
            <span class="value">示例</span>
          </span>
          <span class="field">
            <span class="label">示例字段：</span>
            <span class="value">示例</span>
          </span>
          <span class="field">
            <span class="label">剩余时间：</span>
            <span class="value">XX</span>
          </span>
        </span>
      </span>
    </span>
    <span class="order_status">
      <span class="title">订单状态</span>
      <span class="step">
        <span class="item">
          <span :class="currentStep2 == 1 ? 'num_selected' : 'num'">1</span>
          <span :class="currentStep2 >= 1 ? 'name_selected' : 'name'">...</span>
        </span>
        <span class="item">
          <span :class="currentStep2 == 2 ? 'num_selected' : 'num'">2</span>
          <span :class="currentStep2 >= 2 ? 'name_selected' : 'name'"
            >已包装</span
          >
        </span>
        <span class="item">
          <span :class="currentStep2 == 3 ? 'num_selected' : 'num'">3</span>
          <span :class="currentStep2 >= 3 ? 'name_selected' : 'name'"
            >已成品入库</span
          >
        </span>
        <span class="item">
          <span :class="currentStep2 == 4 ? 'num_selected' : 'num'">4</span>
          <span :class="currentStep2 >= 4 ? 'name_selected' : 'name'"
            >已发货</span
          >
        </span>
        <span class="item">
          <span :class="currentStep2 == 5 ? 'num_selected' : 'num'">5</span>
          <span :class="currentStep2 >= 5 ? 'name_selected' : 'name'"
            >已经销商收货</span
          >
        </span>
        <span class="item">
          <span :class="currentStep2 == 6 ? 'num_selected' : 'num'">6</span>
          <span :class="currentStep >= 6 ? 'name_selected' : 'name'"
            >订单完结</span
          >
        </span>
        <span class="item">
          <span :class="currentStep2 == 7 ? 'num_selected' : 'num'">7</span>
          <span :class="currentStep >= 7 ? 'name_selected' : 'name'">...</span>
        </span>
      </span>
    </span>
    <span class="related_item_order">
      <span class="table_title">相关项>订单</span>
      <span class="table_content">
        <el-table :data="tableDataOrder" :stripe="false" style="width: 100%">
          <el-table-column prop="text1" label="操作" width="80px">
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
          <el-table-column prop="text2" label="订单编号" />
          <el-table-column prop="text3" label="其他字段" />
          <el-table-column prop="text4" label="其他字段" />
          <el-table-column prop="text5" label="创建时间" />
          <el-table-column prop="text6" label="其他字段" />
        </el-table>
      </span>
    </span>
    <span class="related_item_invoice">
      <span class="table_title">相关项>发货单</span>
      <span class="table_content">
        <el-table :data="tableDataInvoice" :stripe="false" style="width: 100%">
          <el-table-column prop="text1" label="操作" width="160px">
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
                <span>查看</span>&nbsp;&nbsp;<span>批量提货</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="text2" label="XX编号" />
          <el-table-column prop="text3" label="发货单状态" />
          <el-table-column prop="text4" label="其它字段" />
          <el-table-column prop="text5" label="创建时间" />
          <el-table-column prop="text6" label="其它字段" />
        </el-table>
      </span>
    </span>
    <span class="related_item_invoice">
      <span class="table_title">相关项>派工单</span>
      <span class="table_content">
        <el-table :data="tableDataDispatch" :stripe="false" style="width: 100%">
          <el-table-column prop="text1" label="操作" width="160px">
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
                <span>查看</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="text2" label="派工单编号" />
          <el-table-column prop="text3" label="派工单状态" />
          <el-table-column prop="text4" label="评价状态" />
          <el-table-column prop="text5" label="创建时间" />
          <el-table-column prop="text6" label="计划完成时间" />
        </el-table>
      </span>
    </span>
    <div class="action_list">
      <div class="left">
        <img src="@/assets/images/comment.png" alt="" />
        <span class="initiate_comments" @click="initiateComments"
          >发起任务评论</span
        >
      </div>
      <div class="right">
        <el-button
          v-if="currentStep == 2"
          type="primary"
          @click="takeGoods"
          class="primary_btn"
          >一键确认提货</el-button
        >
        <el-button
          v-if="currentStep == 3"
          type="primary"
          @click="createDeliveryOrder"
          class="primary_btn"
          >创建配送派工单</el-button
        >
        <el-button
          v-if="currentStep == 4"
          type="primary"
          @click="currentStep = 5;currentStep2 = 5"
          class="primary_btn"
          >一键跳过配送</el-button
        >
        <el-button
          v-if="currentStep == 5"
          type="primary"
          @click="createInstallationOrder"
          class="primary_btn"
          >创建安装派工单</el-button
        >
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
        <span class="username">{{ item["userName"] }}</span>
      </div>
      <div class="content">{{ item["text"] }}</div>
      <div class="date">{{ item["date"] }}</div>
      <span class="reply">回复</span>
      <img class="tips" src="@/assets/images/tips.png" alt="" />
    </div>
    <div class="deliveryOrderDialog">
      <el-dialog
        v-model="deliveryOrderDialog"
        title="新建配送派工单"
        width="80%"
        :show-close="false"
      >
        <div class="step">
          <span class="item">
            <span
              @click="changeDeliveryOrderStep(1)"
              :class="currentDeliveryOrderStep == 1 ? 'num_selected' : 'num'"
              >1</span
            >
            <span :class="currentDeliveryOrderStep >= 1 ? 'name_selected' : 'name'"
              >选择配送司机
              <span class="remark">选择配送货品的司机</span>
            </span>
          </span>
          <span class="item">
            <span
              @click="changeDeliveryOrderStep(2)"
              :class="currentDeliveryOrderStep == 2 ? 'num_selected' : 'num'"
              >2</span
            >
            <span :class="currentDeliveryOrderStep >= 2 ? 'name_selected' : 'name'"
              >输入派工单注意事项
              <span class="remark">如有,请填写关键备注</span>
            </span>
          </span>
          <span class="item">
            <span
              @click="changeDeliveryOrderStep(3)"
              :class="currentDeliveryOrderStep == 3 ? 'num_selected' : 'num'"
              >3</span
            >
            <span :class="currentDeliveryOrderStep >= 3 ? 'name_selected' : 'name'"
              >完成创建
              <span class="remark">等待司机配送</span>
            </span>
          </span>
        </div>
        <div class="content">
          <el-form
            v-if="currentDeliveryOrderStep == 1"
            :model="deliveryOrderForm"
            :rules="deliveryOrderRule"
            label-width="90px"
            label-position="left"
          >
            <el-form-item label="联系方式" prop="phone">
              <el-input
                v-model="deliveryOrderForm.phone"
                placeholder="查找或输入配送司机手机号码"
              />
            </el-form-item>
            <el-form-item label="人员名称" prop="username">
              <el-input
                v-model="deliveryOrderForm.username"
                placeholder="查找或输入服务人员姓名"
              />
            </el-form-item>
            <el-form-item label="预约开始" prop="appointmentStartTime">
              <el-date-picker
                v-model="deliveryOrderForm.appointmentStartTime"
                type="datetime"
                placeholder="日期/时间"
              />
            </el-form-item>
            <el-form-item label="预约结束" prop="appointmentEndTime">
              <el-date-picker
                v-model="deliveryOrderForm.appointmentEndTime"
                type="datetime"
                placeholder="日期/时间"
              />
            </el-form-item>
            <el-form-item label="是否具备安装条件" class="check_item">
              <span>
                <el-checkbox
                  v-model="deliveryOrderForm.haveInstallConditions"
                ></el-checkbox>
              </span>
            </el-form-item>
          </el-form>
          <el-form
            v-if="currentDeliveryOrderStep == 2"
            :model="deliveryOrderForm"
            :rules="deliveryOrderRule"
            label-width="90px"
            label-position="left"
          >
            <el-form-item label="优先级" prop="priority">
              <el-input
                placeholder="高/中/低"
                v-model="deliveryOrderForm.priority"
              />
            </el-form-item>
            <el-form-item label="派工类型" prop="type">
              <el-input
                disabled
                placeholder="配送派工"
                v-model="deliveryOrderForm.type"
              />
            </el-form-item>
            <el-form-item label="派工单备注" class="customLayout">
              <el-input
                v-model="deliveryOrderForm.remark"
                :rows="5"
                type="textarea"
                maxlength="500"
                placeholder="请填写派工单备注"
                show-word-limit
              />
            </el-form-item>
            <el-form-item label="上传图片" class="custom_upload">
              <el-upload
                class="avatar-uploader"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :show-file-list="false"
              >
                <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button class="cancel_btn" @click="deliveryOrderDialog = false"
              >取消</el-button
            >
            <el-button
              v-if="currentDeliveryOrderStep == 1"
              type="primary"
              class="primary_btn"
              @click="deliveryOrderNextStep"
              >下一步</el-button
            >
            <el-button
              v-if="currentDeliveryOrderStep == 2"
              type="primary"
              class="primary_btn"
              @click="finishDeliveryOrder"
              >完成</el-button
            >
          </div>
        </template>
      </el-dialog>
    </div>
    <div class="installationOrderDialog">
      <el-dialog
        v-model="installationOrderDialog"
        title="新建安装派工单"
        width="80%"
        :show-close="false"
      >
        <div class="step">
          <span class="item">
            <span
              @click="changeInstallationOrderStep(1)"
              :class="
                currentInstallationOrderStep == 1 ? 'num_selected' : 'num'
              "
              >1</span
            >
            <span :class="currentInstallationOrderStep >= 1 ? 'name_selected' : 'name'"
              >选择安装技工
              <span class="remark">选择负责安装的技工</span>
            </span>
          </span>
          <span class="item">
            <span
              @click="changeInstallationOrderStep(2)"
              :class="
                currentInstallationOrderStep == 2 ? 'num_selected' : 'num'
              "
              >2</span
            >
            <span :class="currentInstallationOrderStep >= 2 ? 'name_selected' : 'name'"
              >输入安装派工单注意事项
              <span class="remark">如有,请填写关键备注</span>
            </span>
          </span>
          <span class="item">
            <span
              @click="changeInstallationOrderStep(3)"
              :class="
                currentInstallationOrderStep == 3 ? 'num_selected' : 'num'
              "
              >3</span
            >
            <span :class="currentInstallationOrderStep >= 3 ? 'name_selected' : 'name'"
              >完成创建
              <span class="remark">等待现场服务</span>
            </span>
          </span>
        </div>
        <div class="content">
          <el-form
            v-if="currentInstallationOrderStep == 1"
            :model="installationOrderForm"
            :rules="installationOrderRule"
            label-width="80px"
            label-position="left"
          >
            <el-form-item label="人员名称" prop="username">
              <el-input
                placeholder="查找或输入服务人员姓名"
                v-model="installationOrderForm.username"
              />
            </el-form-item>
            <el-form-item label="联系方式" prop="phone">
              <el-input
                placeholder="输入联系方式"
                v-model="installationOrderForm.phone"
              />
            </el-form-item>
            <el-form-item label="人员备注">
              <el-input
                placeholder="若该人员不存在，则显示该字段进行新增备注"
                v-model="installationOrderForm.userRemark"
              />
            </el-form-item>
            <el-form-item label="安装小组">
              <span style="width: 300px">
                <el-checkbox
                  v-model="installationOrderForm.installationTeam"
                ></el-checkbox>
              </span>
            </el-form-item>
            <el-form-item
              v-if="installationOrderForm.installationTeam"
              label="添加组员"
            >
              <span class="custom_item">
                <img src="@/assets/images/add.png" alt="" />
              </span>
            </el-form-item>
          </el-form>
          <el-form
            v-if="currentInstallationOrderStep == 2"
            :model="installationOrderForm"
            :rules="installationOrderRule"
            label-width="90px"
            label-position="left"
          >
            <el-form-item label="优先级" prop="priority">
              <el-input
                v-model="installationOrderForm.priority"
                placeholder="高/中/低"
              />
            </el-form-item>
            <el-form-item label="派工单备注" class="customLayout">
              <el-input
                v-model="installationOrderForm.remark"
                :rows="5"
                type="textarea"
                maxlength="500"
                placeholder="请填写派工单备注"
                show-word-limit
              />
            </el-form-item>
            <el-form-item label="上传图片" class="custom_upload">
              <el-upload
                class="avatar-uploader"
                :file-list="installationOrderForm.fileList"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :show-file-list="false"
              >
                <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button
              class="cancel_btn"
              @click="installationOrderDialog = false"
              >取消</el-button
            >
            <el-button
              v-if="currentInstallationOrderStep == 1"
              type="primary"
              class="primary_btn"
              @click="installationOrderNextStep"
              >下一步</el-button
            >
            <el-button
              v-if="currentInstallationOrderStep == 2"
              type="primary"
              class="primary_btn"
              @click="finishInstallationOrder"
              >完成</el-button
            >
          </div>
        </template>
      </el-dialog>
    </div>
    <div class="problemReportingDialog">
      <el-dialog
        v-model="showProblemReportingDialog"
        title="问题提报"
        width="80%"
        :show-close="false"
      >
        <div class="content">
          <el-form
            :model="problemReportingForm"
            :rules="problemReportingRule"
            label-width="90px"
            label-position="left"
          >
            <el-form-item label="姓名" prop="userName">
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
            </el-form-item>
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
  </div>
</template>


<script setup lang="ts">
import { ref, computed, getCurrentInstance, reactive } from "vue"
import { Plus } from "@element-plus/icons-vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { useRoute } from 'vue-router';

const { proxy }: any = getCurrentInstance()

const currentStep = ref(2)

const currentStep2 = ref(4)

const commentList = ref<any>([])

const route = useRoute()
const id = route.query.id
const serviceCaseNeoId = route.query.serviceCaseNeoId
const dispatchNoteNeoId = route.query.dispatchNoteNeoId
const fieldJobNeoId = route.query.fieldJobNeoId

const currentDeliveryOrderStep = ref(1)
const currentInstallationOrderStep = ref(1)
const deliveryOrderForm = reactive({
  username: "",
  phone: "",
  priority: "",
  type: "",
  remark: "",
  userRemark: "",
  appointmentStartTime: "",
  appointmentEndTime: "",
  haveInstallConditions: false,
})

const deliveryOrderRule = reactive({
  username: [
    { required: true, message: "Please input username", trigger: "blur" },
  ],
  phone: [{ required: true, message: "Please input phone", trigger: "blur" }],
  priority: [
    { required: true, message: "Please input priority", trigger: "blur" },
  ],
  appointmentStartTime: [
    {
      required: true,
      message: "Please input appointment start time",
      trigger: "blur",
    },
  ],
  appointmentEndTime: [
    {
      required: true,
      message: "Please input appointment end time",
      trigger: "blur",
    },
  ],
})

const installationOrderForm = reactive({
  username: "",
  phone: "",
  remark: "",
  userRemark: "",
  installationTeam: false,
  priority: "",
  fileList: [],
})

const installationOrderRule = reactive({
  username: [
    { required: true, message: "Please input username", trigger: "blur" },
  ],
  phone: [{ required: true, message: "Please input phone", trigger: "blur" }],
  priority: [
    { required: true, message: "Please input priority", trigger: "blur" },
  ],
})

const problemReportingForm = reactive({
  userName: "",
  province: "",
  city: "",
  address: "",
  type: "1",
  desc: "",
  orderNo: "",
  fileList: "",
})

const problemReportingRule = reactive({
  userName: [
    { required: true, message: "Please input userName", trigger: "blur" },
  ],
  province: [
    { required: true, message: "Please input province", trigger: "blur" },
  ],
  city: [{ required: true, message: "Please input city", trigger: "blur" }],
  address: [
    { required: true, message: "Please input address", trigger: "blur" },
  ],
  type: [
    { required: true, message: "Please input problem type", trigger: "blur" },
  ],
  orderNo: [
    {
      required: true,
      message: "Please input problem order no",
      trigger: "blur",
    },
  ],
})

const deliveryOrderDialog = ref(false)

const installationOrderDialog = ref(false)

const showProblemReportingDialog = ref(false)

const tableDataOrder = ref([
  {
    text1: "",
    text2: "XXX",
    text3: "示例字段...",
    text4: "XXXX",
    text5: "2021-02-28 10:30:50",
    text6: "xxxx",
  },
])

const tableDataInvoice = ref([
  {
    text1: "",
    text2: "XXX",
    text3: "示例字段...",
    text4: "XXXX",
    text5: "2024-02-21 10:30:50",
    text6: "XXX",
  },
])

const tableDataDispatch = ref([
  {
    text1: "",
    text2: "PG0001",
    text3: "已完成",
    text4: "已评价",
    text5: "2024-02-21 10:30:50",
    text6: "2024-02-21 10:30:50",
  },
])

const changeStep = (step) => {
  currentStep.value = step
}

const changeStep2 = (step) => {
  currentStep2.value = step
}

const changeDeliveryOrderStep = (step) => {
  currentDeliveryOrderStep.value = step
}

const changeInstallationOrderStep = (step) => {
  currentInstallationOrderStep.value = step
}

const createDeliveryOrder = () => {
  deliveryOrderDialog.value = true
}

const createInstallationOrder = () => {
  installationOrderDialog.value = true
}

const deliveryOrderNextStep = () => {
  currentDeliveryOrderStep.value = 2
}

const installationOrderNextStep = () => {
  currentInstallationOrderStep.value = 2
}

const finishInstallationOrder = () => {
  installationOrderDialog.value = false
  proxy.$message.success("安装派工单创建完成!")
  currentInstallationOrderStep.value = 1
  currentStep.value = 6
}

const finishDeliveryOrder = () => {
  deliveryOrderDialog.value = false
  proxy.$message.success("派工单创建完成!")
  currentDeliveryOrderStep.value = 1
  currentStep.value = 4
}

const OpenProblemReportingDialog = () => {
  showProblemReportingDialog.value = true
}

const submitProblemReporting = () => {
  showProblemReportingDialog.value = false
  proxy.$message.success("提交成功!")
}

const takeGoods = () => {
  proxy.$message.success("提货任务完成!")
  currentStep.value = 3
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
</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
