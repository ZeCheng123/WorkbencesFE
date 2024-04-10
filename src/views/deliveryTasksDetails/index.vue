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
          <span :class="currentStep >= 2 ? 'name_selected' : 'name'">-</span>
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
            <span class="value">{{ taskDetails.taskid }}</span>
            <span v-if="false" class="view">查看</span>
          </span>
          <span class="field">
            <span class="label">经销商：</span>
            <span class="value">{{ taskDetails.distributorName }}</span>
          </span>
          <span class="field">
            <span class="label">经销商负责人：</span>
            <span class="value">{{ taskDetails.followerName }}</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">客户名称：</span>
            <span class="value">{{taskDetails.accountName}}</span>
            <!-- <span v-if="taskType === 'ServiceCase'" class="value">服务工单</span>
            <span v-else-if="taskType === 'DispatchNote'" class="value">发货单</span>
            <span v-else class="value">派工单</span> -->
          </span>
          <span class="field">
            <span class="label">当前负责人：</span>
            <span class="value">XXX</span>
          </span>
          <span class="field">
            <span class="label">创建时间：</span>
            <span class="value">XXX</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">客户电话：</span>
            <span class="value">XX</span>
          </span>
          <span class="field">
            <span class="label">客户地址：</span>
            <span class="value">XXX</span>
          </span>
          <span class="field">
            <span class="label"></span>
            <span class="value"></span>
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
          <el-table-column prop="text3" label="订单流程" />
          <el-table-column prop="text4" label="交期天数" />
          <el-table-column prop="text5" label="订货日期" />
          <el-table-column prop="text6" label="计划交货日期" />
          <el-table-column prop="text7" label="创建时间" />
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
          <el-table-column prop="text2" label="发货单编号" />
          <el-table-column prop="text3" label="发货单状态" />
          <el-table-column prop="text4" label="出库方式" />
          <el-table-column prop="text5" label="供应基地" />
          <el-table-column prop="text6" label="创建时间" />
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
          <el-table-column prop="text3" label="状态" />
          <el-table-column prop="text4" label="计划开始时间" />
          <el-table-column prop="text5" label="计划结束时间" />
          <el-table-column prop="text6" label="创建时间" />
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
        <!-- <el-button
          v-if="currentStep == 2"
          type="primary"
          @click="takeGoods"
          class="primary_btn"
          >一键确认提货</el-button
        > -->
        <el-button
          v-if="currentStep == 4"
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
            <span
              :class="currentDeliveryOrderStep >= 1 ? 'name_selected' : 'name'"
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
            <span
              :class="currentDeliveryOrderStep >= 2 ? 'name_selected' : 'name'"
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
            <span
              :class="currentDeliveryOrderStep >= 3 ? 'name_selected' : 'name'"
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
            ref="deliveryOrderFormRef"
            label-width="90px"
            label-position="left"
          >
            <el-form-item label="联系方式" prop="contact_telephone">
              <el-input
                v-model="deliveryOrderForm.contact_telephone"
                placeholder="查找或输入配送司机手机号码"
              />
            </el-form-item>
            <el-form-item label="人员名称" prop="field_job_contact_name">
              <el-input
                v-model="deliveryOrderForm.field_job_contact_name"
                placeholder="查找或输入服务人员姓名"
              />
            </el-form-item>
            <el-form-item label="预约开始" prop="appointmentStartTime">
              <el-date-picker
                v-model="deliveryOrderForm.appointmentStartTime"
                type="datetime"
                placeholder="日期/时间"
                value-format="YYYY-MM-DD HH:mm:ss"
              />
            </el-form-item>
            <el-form-item label="预约结束" prop="appointmentEndTime">
              <el-date-picker
                v-model="deliveryOrderForm.appointmentEndTime"
                type="datetime"
                placeholder="日期/时间"
                value-format="YYYY-MM-DD HH:mm:ss"
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
            ref="deliveryOrderFormRef"
            label-width="90px"
            label-position="left"
          >
            <el-form-item label="优先级" prop="priority">
              <el-input
                placeholder="1-最高 2-高 3-中 4-低"
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
                :on-success="handleSuccessDelivery"
                :on-remove="handleDeleteDelivery"
                :auto-upload="true"
                :data="uploadData"
                :headers="headers"
                :before-upload="beforeUploadDelivery"
                v-model:file-list="deliveryOrderForm.fileList"
                class="avatar-uploader"
                action="https://sh.mengtian.com.cn:9595/md/api/common/file/upload"
                :show-file-list="true"
                list-type="picture-card"
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
            <span
              :class="
                currentInstallationOrderStep >= 1 ? 'name_selected' : 'name'
              "
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
            <span
              :class="
                currentInstallationOrderStep >= 2 ? 'name_selected' : 'name'
              "
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
            <span
              :class="
                currentInstallationOrderStep >= 3 ? 'name_selected' : 'name'
              "
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
                action="https://sh.mengtian.com.cn:9595/md/api/common/file/upload"
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
import { ref, computed, getCurrentInstance, reactive ,onMounted} from "vue"
import { Plus } from "@element-plus/icons-vue"
import { ElMessage, ElMessageBox,FormInstance} from "element-plus"
import { useRoute } from "vue-router"
import { addFieldJob, getFieldJob } from "../../api/common";

const { proxy }: any = getCurrentInstance()



const currentStep2 = ref(4)

const commentList = ref<any>([])

const route = useRoute()
const taskid = route.query.id
const serviceCaseNeoId = route.query.serviceCaseId
const orderId = route.query.orderId
// const fieldJobNeoId = route.query.fieldJobNeoId
const taskStatus= route.query.status!=null?parseInt(route.query.status.toString(),0)+1:1
const taskType = route.query.taskType

const taskDetails=ref({
  taskid:route.query.id,
  serviceCaseNeoId:route.query.serviceCaseId,
  orderId:route.query.orderId,
  taskStatus:taskStatus,
  accountName:route.query.accountName,
  distributorName:route.query.distributorName,
  followerName:route.query.follower_name
})

const currentStep = ref(taskStatus)
const currentDeliveryOrderStep = ref(1)
const currentInstallationOrderStep = ref(1)
const currentProblemReportingStep = ref(1)
const deliveryOrderFormRef = ref<FormInstance>();

let deliveryOrderForm = reactive({
  field_job_contact_name: "",
  contact_telephone: "",
  priority: "",
  type: "配送派工",
  remark: "",
  appointmentStartTime: "",
  appointmentEndTime: "",
  haveInstallConditions: false,
  field_job_order_id:route.query.orderId,
  fieldJobType__c:0,
  stage__c:0,
  name:taskDetails.value.accountName+"的配送派工单",
  fileList: [],
  filePath:[]
})

const deliveryOrderRule = reactive({
  field_job_contact_name: [
    { required: true, message: "Please input username", trigger: "blur" },
  ],
  contact_telephone: [{ required: true, message: "Please input phone", trigger: "blur" }],
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
  orderNo: "",
  customerName: "",
  customerPhone: "",
  desc: "",
  fileList: []
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

const deliveryOrderDialog = ref(false)

const installationOrderDialog = ref(false)

const showProblemReportingDialog = ref(false)


const tableDataOrder = ref([
  {
    text1: "",
    text2: "XXX",
    text3: "渠道",
    text4: "35",
    text5: "XXXX",
    text6: "xxxx",
    text7: "2024-02-21 10:30:50"
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


const headers = ref({
    Content: "application/json",
    Authorization: ``, // Here you can add your token
    isImage: "true",
    needFileId: "true",
    "Trace-Id": "",
})

const uploadData = ref({
    files: [],
    name: "files"
})



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

const finishInstallationOrder = async () => {
  installationOrderDialog.value = false
  proxy.$message.success("安装派工单创建完成!")
  currentInstallationOrderStep.value = 1
  currentStep.value = 6
}

const finishDeliveryOrder =  () => {
  let params = deliveryOrderForm;
  params["picture"] = params.filePath.join(",");
  console.log(params)
  addFieldJob(params).then((res : any) => {
			let data = res.data.data
			if (data!=undefined) {
					ElMessage({
						message: '新增派工单成功',
						type: 'success'
					})

			} else {
          ElMessage({
            message: '新增派工单失败',
            type: 'error'
  				})
				
			}
      Object.keys(deliveryOrderForm).forEach(key => {
        if(!key.includes("type")&&!key.includes("haveInstallConditions")&&key!=="field_job_order_id"&&key!=="fieldJobType__c"&&key!=="stage__c"&&key!=="name") deliveryOrderForm[key] = '';
        if(key==="haveInstallConditions") deliveryOrderForm[key] =false;
      });
		}).catch((error: any) => {
			// 显示请求失败的提示框
			ElMessage({
				message: '请求新增派工单失败，请重试',
				type: 'error'
			});
      Object.keys(deliveryOrderForm).forEach(key => {
        if(key!=="type"&&key!=="haveInstallConditions"&&key!=="field_job_order_id"&&key!=="fieldJobType__c"&&key!=="stage__c"&&key!=="name") deliveryOrderForm[key] = '';
        if(key=="haveInstallConditions") deliveryOrderForm[key] =false;
      });
			console.error('请求新增派工单失败:', error);
		});
  deliveryOrderDialog.value = false
  // proxy.$message.success("派工单创建完成!")
  currentDeliveryOrderStep.value = 1
  currentStep.value = 5
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
onMounted(()=>{
  // getFieldJobByGet(true,fieldJobNeoId)
})
const getFieldJobByGet = (showMsg: boolean,fieldJobId:any)=>{
  getFieldJob(fieldJobId).then((res : any) => {
			let data = res.data.data
			if (data!=undefined&&data.length > 0) {
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

		}).catch((error: any) => {
			// 显示请求失败的提示框
			ElMessage({
				message: '请求数据失败，请重试',
				type: 'error'
			});
			console.error('请求数据失败:', error);
		});
}

///delivery
const handleSuccessDelivery = (res) => {
  console.log(res);
  if(res.code == "success"){
    let path = res.data.map(val => val["fileUrl"]);
    deliveryOrderForm["filePath"] = deliveryOrderForm["filePath"].concat(path)
  }
}
    
const handleDeleteDelivery = (res) => {
  var resopnse = res["response"];
}

const beforeUploadDelivery = (file) => {
  uploadData.value["files"].push(file)
}


</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
