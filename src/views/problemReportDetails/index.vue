<template>
  <div class="main">
    <span class="header">
      <span class="title"><span>问题提报状态</span><el-button class="btn" @click="upgradeToHeadquarters">升级到总部
          (售后)</el-button></span>
      <span class="step">
        <span class="item">
          <span :class="currentItem['clientCaseStatusC'] == 1 ? 'num_selected' : 'num'">1</span>
          <span :class="currentItem['clientCaseStatusC'] >= 1 ? 'name_selected' : 'name'">待处理</span>
        </span>
        <span class="item">
          <span :class="currentItem['clientCaseStatusC'] == 2 ? 'num_selected' : 'num'">2</span>
          <span :class="currentItem['clientCaseStatusC'] >= 2 ? 'name_selected' : 'name'">处理中</span>
        </span>
        <span class="item">
          <span :class="currentItem['clientCaseStatusC'] == 3 ? 'num_selected' : 'num'">3</span>
          <span :class="currentItem['clientCaseStatusC'] >= 3 ? 'name_selected' : 'name'">已完成</span>
        </span>
      </span>
    </span>
    <span class="problem_report_info">
      <span class="title">问题提报详情</span>
      <span class="main_field">
        <span class="row_field">
          <span class="field">
            <span class="label">问题编号：</span>
            <span class="value">{{ currentItem["caseNo"] }}</span>
            <span v-if="false" class="view">查看</span>
          </span>
          <span class="field">
            <span class="label">专卖店名称：</span>
            <span class="value">{{ currentItem["storeName"] }}</span>
          </span>
          <span class="field">
            <span class="label">问题类别：</span>
            <span class="value">{{ currentItem["questionType"] == "1" ? "售后保修" : "投诉建议" }}</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">订单编号：</span>
            <span class="value">{{ currentItem["orderNeoId"] }}</span>
          </span>
          <span class="field">
            <span class="label">负责人：</span>
            <span class="value">{{ currentItem["responsibleSubject"] }}</span>
          </span>
          <span class="field">
            <span class="label">创建时间：</span>
            <span class="value">{{ currentItem["createdTime"] }}</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">问题描述：</span>
            <span class="value">{{ currentItem["problemDescription"] }}</span>
          </span>
        </span>
      </span>
      <span class="title">其他字段</span>
      <span class="other_field">
        <span class="row_field">
          <span class="field">
            <span class="label">客户姓名：</span>
            <span class="value">{{ currentItem["caseAccountName"] }}</span>
          </span>
          <span class="field">
            <span class="label">客户手机号：</span>
            <span class="value">{{ currentItem["caseAccountPhone"] }}</span>
          </span>
          <span class="field">
            <span class="label">来源：</span>
            <span class="value">{{ currentItem["complaintSourceC"] ? (complaintSource.find(val => val["code"] ==
              currentItem["complaintSourceC"])?.name) : "" }}</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">省份：</span>
            <span class="value">{{ convertProvince(currentItem["province"]) }}</span>
          </span>
          <span class="field">
            <span class="label">城市：</span>
            <span class="value">{{ convertCity(currentItem["city"]) }}</span>
          </span>
          <span class="field">
            <span class="label">区：</span>
            <span class="value">{{ convertDistrict(currentItem["district"]) }}</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">经销商内部提报：</span>
            <el-checkbox v-model="checked1" disabled></el-checkbox>
          </span>
          <span class="field">
            <span class="label">提报人：</span>
            <span class="value">{{ currentItem["externalUserName"] }}</span>
          </span>
          <span class="field">
            <span class="label">提报人电话：</span>
            <span class="value">{{ currentItem["externalUserPhone"] }}</span>
          </span>
        </span>
      </span>
    </span>
    <span class="related_documents">
      <span class="title">相关单据</span>
      <el-button class="btn">1个售后工单</el-button>
      <el-button class="btn">1个派工单</el-button>
      <span class="view" @click="showRelatedDocumentsDialogClick">点击查看</span>
    </span>
    <span class="action_list">
      <div class="left">
        <img src="@/assets/images/comment.png" alt="" />
        <span class="initiate_comments" @click="initiateComments">发起评论</span>
      </div>
      <div class="right">
        <el-button type="primary" @click="initiateComments" class="primary_btn">编辑</el-button>
        <el-button type="primary" @click="createDeliveryOrder" class="primary_btn">创建派工单</el-button>
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
    <div class="showMainDialog">
      <el-dialog v-model="showMainDialog" title="升级到总部 (售后)" width="80% " :show-close="false">
        <div class="step">
          <span class="item">
            <span @click="changeDialogStep(1)" :class="currentDialogStep == 1 ? 'num_selected' : 'num'">1</span>
            <span class="name">确认问题订单
              <span class="remark">选择或确认问题订单</span>
            </span>
          </span>
          <span class="item">
            <span @click="changeDialogStep(2)" :class="currentDialogStep == 2 ? 'num_selected' : 'num'">2</span>
            <span class="name">完善必填信息
              <span class="remark">完善问题描述与处理方式</span>
            </span>
          </span>
          <span class="item">
            <span @click="changeDialogStep(3)" :class="currentDialogStep == 3 ? 'num_selected' : 'num'">3</span>
            <span class="name">提交升级
              <span class="remark">提交售后至总部</span>
            </span>
          </span>
        </div>
        <template v-if="currentDialogStep == 1">
          <span class="form_row">
            <span class="label required">订单编号</span>
            <!-- <el-input v-model="formDialog.orderNo" placeholder="订单编号"></el-input> -->
            <el-select style="width:368px ;" v-model="formDialog.orderNo" filterable @change="" placeholder="请选择订单编号">
              <el-option v-for="item in orderList" :key="item.po" :label="item.po" :value="item.po" />
            </el-select>
          </span>
          <span class="form_row">
            <span class="label">升级备注</span>
            <el-input v-model="formDialog.remark" placeholder="输入自定义备注"></el-input>
          </span>
        </template>
        <template v-if="currentDialogStep == 2">
          <div class="desc_action">
            <span class="desc">搜索和选择/批量编辑问题产品</span>
            <span class="action">
              <el-button style="display:none;" class="btn" @click="openDialog2(1)">完善问题描述</el-button>
              <el-button style="display:none;" class="btn" @click="openDialog2(2)">定义处理方式</el-button>
            </span>
          </div>
          <div class="search">
            <el-input v-model="formDialog.searchValue" placeholder="搜索"></el-input>
          </div>
          <div class="filter_list">
            <el-select v-model="formDialog.orderType">
              <el-option v-for="item in filterList1" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-model="formDialog.productType">
              <el-option v-for="item in filterList2" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-model="formDialog.productModel">
              <el-option v-for="item in filterList3" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-model="formDialog.treeSpecies">
              <el-option v-for="item in filterList4" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-model="formDialog.paintColor">
              <el-option v-for="item in filterList5" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-model="formDialog.size">
              <el-option v-for="item in filterList6" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="table">
            <el-table ref="multipleTableRef" :selection-change="handleSelectionChange" :data="tableData" :stripe="false"
              style="width: 100%;max-height: 200px;overflow: auto;">
              <el-table-column prop="checked" label="全选" width="80px">
                <template #default="scope">
                  <el-checkbox v-model="scope.row.checked" />
                </template>
              </el-table-column>
              <!-- <el-table-column type="selection" width="55" /> -->
              <el-table-column prop="orderId" label="订单编号" />
              <el-table-column prop="sku" label="详单编号" />
              <el-table-column prop="category1" label="产品大类" />
              <el-table-column prop="fscProductModel" label="产品型号" />
              <el-table-column prop="treeSpecies__c" label="树种" />
              <el-table-column prop="paintColor__c" label="油漆颜色 " />
              <el-table-column prop="fscProductSpec" label="尺寸 " />
              <el-table-column prop="ticketClassification" label="问题大类">
                <template #default="scope">
                  <div style="display:flex;align-items:center;">
                    {{ scope.row.ticketClassification ? (problemTypeList.find(val => val["code"] ==
                      scope.row.ticketClassification)?.name) : "" }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="ticketProblem" label="售后问题 ">
                <template #default="scope">
                  <div style="display:flex;align-items:center;">
                    {{ scope.row.ticketProblem ? (afterSalesIssuesList.find(val => val["code"] ==
                      scope.row.ticketProblem)?.name) : "" }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="" label="责任人 " />
              <el-table-column prop="descriptionOfTicketProblem" label="问题描述 " />
            </el-table>
          </div>
          <div class="responsibilityPerson">
            <span class="label required">问题大类</span>
            <el-select v-model="dialog2Form.problemType" placeholder="">
              <el-option v-for="item in problemTypeList" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
            <span class="label required">售后问题</span>
            <el-select multiple collapse-tags v-model="dialog2Form.afterSalesIssues" placeholder="">
              <el-option v-for="item in afterSalesIssuesList" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
            <span class="label required">责任人</span>
            <el-input v-model="dialog2Form.responsiblePerson" style="width: 240px" placeholder="请输入责任人" />
          </div>
          <div class="responsibilityPerson">
            <span class="label required">问题描述</span>
            <el-input v-model="dialog2Form.problemDesc" style="width: 440px" :rows="2" type="textarea"
              placeholder="请输入问题描述" />
          </div>
          <div class="responsibilityPerson">
            <span class="label">上传文件</span>
          </div>
          <div class="containerUpload">
            <span class="item">
              <el-upload name="files" :on-success="handleUploaded" class="upload" drag
                action="https://sh.mengtian.com.cn:9595/md/api/common/file/upload" multiple>
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">将文件拖至此处 或 点击上传</div>
                <template #tip>
                  <div class="el-upload__tip">
                    jpg/png files with a size less than 500kb
                  </div>
                </template>
              </el-upload>
            </span>
          </div>
        </template>
        <template #footer>
          <div class="dialog-footer">
            <el-button class="cancel_btn" @click="showMainDialog = false">取消</el-button>
            <el-button v-if="currentDialogStep == 1" @click="currentDialogStepBut" type="primary" class="primary_btn"
              style="margin-left：50px !important">下一步</el-button>
            <el-button v-if="currentDialogStep == 2" @click="submitDialog" type="primary" class="primary_btn"
              style="margin-left：50px !important">提交</el-button>
          </div>
        </template>
      </el-dialog>
    </div>

    <!-- 创建派工单 -->
    <div class="deliveryOrderDialog">
      <el-dialog v-model="deliveryOrderDialog" title="新建配送派工单" width="80%" :show-close="false">
        <div class="step">
          <span class="item">
            <span @click="changeDeliveryOrderStep(1)"
              :class="currentDeliveryOrderStep == 1 ? 'num_selected' : 'num'">1</span>
            <span :class="currentDeliveryOrderStep >= 1 ? 'name_selected' : 'name'">选择配送司机
              <span class="remark">选择配送货品的司机</span>
            </span>
          </span>
          <span class="item">
            <span @click="changeDeliveryOrderStep(2)"
              :class="currentDeliveryOrderStep == 2 ? 'num_selected' : 'num'">2</span>
            <span :class="currentDeliveryOrderStep >= 2 ? 'name_selected' : 'name'">输入派工单注意事项
              <span class="remark">如有,请填写关键备注</span>
            </span>
          </span>
          <span class="item">
            <span @click="changeDeliveryOrderStep(3)"
              :class="currentDeliveryOrderStep == 3 ? 'num_selected' : 'num'">3</span>
            <span :class="currentDeliveryOrderStep >= 3 ? 'name_selected' : 'name'">完成创建
              <span class="remark">等待司机配送</span>
            </span>
          </span>
        </div>
        <div class="content">
          <el-form v-if="currentDeliveryOrderStep == 1" :model="deliveryOrderForm" :rules="deliveryOrderRule"
            ref="deliveryOrderFormRef" label-width="90px" label-position="left">
            <el-form-item label="人员名称" prop="followerId">
              <el-select v-model="deliveryOrderForm.followerId" @change="onCahngeUserSelectForDelivery"
                placeholder="查找或输入服务人员姓名">
                <el-option v-for="item in extralUserData" :key="item.name" :label="item.name" :value="item.id" />
              </el-select>
              <span class="custom_item"><img src="@/assets/images/add.png" alt="" /></span>
            </el-form-item>
            <el-form-item label="联系方式" prop="contactTelephone">
              <el-input v-model="deliveryOrderForm.contactTelephone" placeholder="查找或输入配送司机手机号码" />
            </el-form-item>

            <el-form-item label="预约开始" prop="appointmentStartTime">
              <el-date-picker v-model="deliveryOrderForm.appointmentStartTime" type="datetime" placeholder="日期/时间"
                value-format="YYYY-MM-DD HH:mm:ss" />
            </el-form-item>
            <el-form-item label="预约结束" prop="appointmentEndTime">
              <el-date-picker v-model="deliveryOrderForm.appointmentEndTime" type="datetime" placeholder="日期/时间"
                value-format="YYYY-MM-DD HH:mm:ss" />
            </el-form-item>
            <el-form-item label="是否具备安装条件" class="check_item">
              <span>
                <el-checkbox v-model="deliveryOrderForm.haveInstallConditions"></el-checkbox>
              </span>
            </el-form-item>
          </el-form>
          <el-form v-if="currentDeliveryOrderStep == 2" :model="deliveryOrderForm" :rules="deliveryOrderRule"
            ref="deliveryOrderFormRef" label-width="90px" label-position="left">
            <el-form-item label="优先级" prop="priority">
              <el-select v-model="deliveryOrderForm.priority" placeholder="选择优先级">
                <el-option v-for="item in priority" :key="item.code" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
            <el-form-item label="派工类型" prop="type">
              <el-select v-model="deliveryOrderForm.type" placeholder="选择派工类型">
                <el-option v-for="item in dispatchType" :key="item.code" :label="item.name" :value="item.code" />
              </el-select>
              <!-- <el-input
                disabled
                placeholder="配送派工"
                v-model="deliveryOrderForm.type"
              /> -->
            </el-form-item>
            <el-form-item label="派工单备注" class="customLayout">
              <el-input v-model="deliveryOrderForm.remark" :rows="5" type="textarea" maxlength="500"
                placeholder="请填写派工单备注" show-word-limit />
            </el-form-item>
            <el-form-item label="上传图片" class="custom_upload">
              <el-upload :on-success="handleSuccessDelivery" :on-remove="handleDeleteDelivery" :auto-upload="true"
                :data="uploadDataDelivery" :headers="headers" :before-upload="beforeUploadDelivery"
                v-model:file-list="deliveryOrderForm.fileList" class="avatar-uploader"
                action="https://sh.mengtian.com.cn:9595/md/api/common/file/upload" :show-file-list="true"
                list-type="picture-card">
                <el-icon class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button class="cancel_btn" @click="deliveryOrderDialog = false">取消</el-button>
            <el-button v-if="currentDeliveryOrderStep == 1" type="primary" class="primary_btn"
              @click="deliveryOrderNextStep">下一步</el-button>
            <el-button v-if="currentDeliveryOrderStep == 2" type="primary" class="primary_btn"
              @click="finishDeliveryOrder">完成</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
    <!-- 创建派工单 -->
    <div class="relatedDocumentsDialog">
      <el-dialog v-model="showRelatedDocumentsDialog" title="相关单据" width="80%" :show-close="false">
        <div class="content">
          <span class="tableItem">
            <span class="tableTitle"> 1. 售后工单 </span>
            <span class="tableContent">
              <el-table :data="relatedDocumentsAftersalesWorkorderList" :stripe="false" style="width: 100%">
                <el-table-column prop="serviceTicketId" label="售后工单编号" />
                <el-table-column prop="text2" label="类别" />
                <el-table-column prop="text3" label="负责人" />
                <el-table-column prop="text3" label="状态">
                  <template #default="scope">
                    <el-button class="statusing" @click="console.log(scope)">进行中</el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="updatedTime" label="修改时间" />
                <el-table-column label="操作" width="80px">
                  <template #default="scope">
                    <div style="
                        display: flex;
                        align-items: center;
                        color: #165dff;
                        cursor: pointer;
                      " @click="handleView(scope.row)">
                      查看
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </span>
          </span>
          <span class="tableItem">
            <span class="tableTitle"> 2. 派工单 </span>
            <span class="tableContent">
              <el-table :data="relatedDocumentsDispatchList" :stripe="false" style="width: 100%">
                <el-table-column prop="text1" label="派工单编号" />
                <el-table-column prop="text2" label="类别" />
                <el-table-column prop="text3" label="负责人" />
                <el-table-column prop="text3" label="状态">
                  <template #default="scope">
                    <el-button class="statusing" @click="console.log(scope)">进行中</el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="text5" label="修改时间" />
                <el-table-column prop="text7" label="操作" width="80px">
                  <template #default="scope">
                    <div style="
                        display: flex;
                        align-items: center;
                        color: #165dff;
                        cursor: pointer;
                      " @click="dispatch(scope.row)">
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
  </div>
</template>


<script setup lang="ts">
import { ref, computed, getCurrentInstance, reactive, onMounted } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { useRoute } from "vue-router"
import { Plus } from "@element-plus/icons-vue"
import { getServiceCaseItem, getPickList, getOrderList, addFieldJob, getticketsolution, getOrderListById, getTicketSolutionBycaseId, getTicketSolutionByneoID, getExternalUser, getFieldJob } from '../../api/common.js'

const { proxy }: any = getCurrentInstance()

const commentList = ref<any>([])
const currentDeliveryOrderStep = ref(1)
const route = useRoute()
const id = ref(route.query.id)
const neoid = ref<any>(route.query.neoid)
let caseneoId = ""
const taskStatus = route.query.status != null ? parseInt(route.query.status.toString(), 0) + 1 : 1
const showRelatedDocumentsDialog = ref(false)
const orderList = ref([]);
const extralUserData = ref<any>([])
const tableDataDispatch = ref([])
const deliveryOrderDialog = ref(false)
const tableData = ref([])
const selectedRows = ref([])
const currentItem = ref<any>({});
const provinceList = ref([]);
const cityList = ref([]);
const districtList = ref([]);
let solutionId="";



const formDialog = ref<any>({
  orderNo: "",
  remark: "",
  searchValue: "",
  orderType: "1",
  productType: "1",
  productModel: "1",
  treeSpecies: "1",
  paintColor: "1",
  size: "1",
})


const dialog2Form = ref<any>({
  serviceTicketId: 0,
  problemType: "",
  afterSalesIssues: [],
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

const filterList1 = ref([{ label: "全部订单", value: "1" }])

const filterList2 = ref([{ label: "产品大类", value: "1" }])

const filterList3 = ref([{ label: "产品型号", value: "1" }])

const filterList4 = ref([{ label: "树种", value: "1" }])

const filterList5 = ref([{ label: "油漆颜色", value: "1" }])

const filterList6 = ref([{ label: "尺寸", value: "1" }])


///图片上传组合数组
const fileIdList = ref<any>([])
const handleUploaded = (rep) => {
  fileIdList.value = fileIdList.value.concat(rep.data.map(item => item.fileId))
}


const multipleTableRef = ref()
const multipleSelection = ref([])

const handleSelectionChange = (val) => {
  console.info("选择的数据：", val)
  multipleSelection.value = val

}

const tableDataOrderDetials = ref([
  {
    text1: "CS0011-06665-01",
    text2: "门套",
    text3: "示例字段...",
    text4: "混油米灰1#",
    text5: "2021-02-28 10:30:50",
    text6: "",
  },
  {
    text1: "CS0011-06665-01",
    text2: "门套",
    text3: "示例字段...",
    text4: "混油米灰1#",
    text5: "2021-02-28 10:30:50",
    text6: "",
  },
  {
    text1: "CS0011-06665-01",
    text2: "门套",
    text3: "示例字段...",
    text4: "混油米灰1#",
    text5: "2021-02-28 10:30:50",
    text6: "",
  },
  {
    text1: "CS0011-06665-01",
    text2: "门套",
    text3: "示例字段...",
    text4: "混油米灰1#",
    text5: "2021-02-28 10:30:50",
    text6: "",
  },
])

const tableDataServiceEvaluation = ref([
  {
    text1: "SU2024030101",
    text2: "已评价",
    text3: "其他",
    text4: "满意",
    text5: "2021-02-28 10:30:50",
    text6: "",
  },
])

const problemTypeList = ref<any>([
  { code: "1", name: "经销商问题" },
  { code: "2", name: "公司问题" },
  { code: "3", name: "物流问题" }
])

const afterSalesIssuesList = ref<any>([
  { code: "1", name: "店面测量师漏单" },
  { code: "2", name: "店面测量师量错" },
  { code: "3", name: "店里设计师漏分解" },
  { code: "4", name: "店里设计师分解错" },
  { code: "5", name: "店里设计不合理" },
  { code: "6", name: "店里下单员漏单" },
  { code: "7", name: "店里下单员下错" },
  { code: "8", name: "店里安装师问题" },
  { code: "9", name: "消费者补单" },
  { code: "10", name: "消费者使用不当" },
  { code: "11", name: "产品丢失" }
])

const poductTypeList = ref<any>([
  { code: "1", name: "墙板" },
  { code: "2", name: "线条" },
  { code: "3", name: "五金" },
  { code: "4", name: "门套" },
  { code: "5", name: "门扇" },
  { code: "6", name: "柜体" },
  { code: "7", name: "柜门" },
  { code: "8", name: "玻璃" },
  { code: "9", name: "挂板" },
  { code: "10", name: "罗马柱" },
  { code: "11", name: "帽头" },
  { code: "12", name: "装饰块" },
  { code: "13", name: "雕花件" },
  { code: "14", name: "色板" },
  { code: "15", name: "整单" },
  { code: "16", name: "入户门" }
])

const componentTypeList = ref<any>([
  { code: "1", name: "边梃" },
  { code: "2", name: "挂线条" },
  { code: "3", name: "芯板" },
  { code: "4", name: "金属条" },
  { code: "5", name: "码头" },
  { code: "6", name: "封边" },
  { code: "7", name: "L边" },
  { code: "8", name: "整体" },
  { code: "9", name: "面板执手" },
  { code: "10", name: "锁体" },
  { code: "11", name: "铰链" },
  { code: "12", name: "铰链底座" },
  { code: "13", name: "灯带" },
  { code: "14", name: "抽屉轨道" },
  { code: "15", name: "三合一" },
  { code: "16", name: "其他五金" },
  { code: "17", name: "档条" },
  { code: "18", name: "密封条" },
  { code: "19", name: "套板" },
  { code: "20", name: "门套" },
  { code: "21", name: "玻璃" },
  { code: "22", name: "门标" },
  { code: "23", name: "门芯板" },
  { code: "24", name: "配件" },
  { code: "25", name: "五金配件" },
  { code: "26", name: "8属边" },
  { code: "27", name: "背板" },
  { code: "28", name: "层板" },
  { code: "29", name: "抽屉板" },
  { code: "30", name: "底板" },
  { code: "31", name: "顶板" },
  { code: "32", name: "台面板" },
  { code: "33", name: "立板" },
  { code: "34", name: "侧板" },
  { code: "35", name: "踢脚板" },
  { code: "36", name: "五金件" },
  { code: "37", name: "挂板" },
  { code: "38", name: "罗马柱" },
  { code: "39", name: "帽头" },
  { code: "40", name: "装饰块" },
  { code: "41", name: "雕花件" },
  { code: "42", name: "色板" },
  { code: "43", name: "整单" },
  { code: "44", name: "修补漆" },
  { code: "45", name: "入户门扇" }
])

const badTypeList = ref<any>([
  { code: "1", name: "消费者" },
  { code: "2", name: "经销商" },
  { code: "3", name: "订单分解" },
  { code: "4", name: "备料" },
  { code: "5", name: "加工" },
  { code: "6", name: "免漆加工" },
  { code: "7", name: "油漆" },
  { code: "8", name: "少货" },
  { code: "9", name: "包装问题" },
  { code: "10", name: "五金问题" },
  { code: "11", name: "辅料问题" },
  { code: "12", name: "仓库发货" },
  { code: "13", name: "物流送达" },
  { code: "14", name: "系统问题" },
  { code: "15", name: "新品设计问题" },
  { code: "16", name: "隔音等级" },
  { code: "17", name: "受潮" },
  { code: "18", name: "无法提供证明的少货" },
  { code: "19", name: "交期延误" },
  { code: "20", name: "霉变" },
  { code: "21", name: "气味" },
  { code: "22", name: "长虫" },
  { code: "23", name: "过质保期" },
  { code: "24", name: "变色" },
  { code: "25", name: "入户门问题" }
])

const aftersalesHeaderDetails = ref<any>({})
const qualityIndicator1List = ref<any>([
  { code: "1", name: "订单分解错" },
  { code: "2", name: "订单漏分解" },
  { code: "3", name: "变形" }
])

const qualityIndicator2List = ref<any>([
  { code: "1", name: "漏备注" },
  { code: "2", name: "产品漏分解" },
  { code: "3", name: "配件漏分解" },
  { code: "4", name: "五金漏分解" },
  { code: "5", name: "孔位漏分解" },

])

const handleWayList = ref<any>([{
  label: "处理方式",
  value: "1"
}])

const relatedDocumentsDispatchList = ref([])

const complaintSource = ref([
  { code: "1", name: "配送技工" },
  { code: "2", name: "安装技工" },
  { code: "3", name: "终端用户" },
  { code: "4", name: "经销商" },
])

const dispatchType = ref([
  { code: "0", name: "配送派工" },
  { code: "1", name: "安装派工" },
  { code: "2", name: "维修" },
])

const priority = ref([
  { code: "1", name: "最高" },
  { code: "2", name: "高" },
  { code: "3", name: "中" },
  { code: "4", name: "低" },
])

const currentDialogStep = ref(1)

const showMainDialog = ref(false)

const showMainDialog2 = ref(false)

const dialogType = ref(1)



const createDeliveryOrder = () => {
  deliveryOrderDialog.value = true
}

const uploadDataDelivery = ref({
  files: [],
  name: "files"
})

const beforeUploadDelivery = (file) => {
  uploadDataDelivery.value["files"] = [file]
}

const filterList = ref({
  value1: "1",
  value2: "1",
  value3: "1",
  value4: "1",
  value5: "1",
  value6: "1"
})


const deliveryOrderNextStep = () => {
  currentDeliveryOrderStep.value = 2
}

const taskDetails = ref({
  taskid: route.query.id,
  serviceCaseNeoId: route.query.serviceCaseId,
  orderId: route.query.orderId,
  taskStatus: taskStatus,
  accountName: route.query.accountName,
  distributorName: route.query.distributorName,
  followerName: route.query.followerName,
  createdTime: route.query.createdTime,
  createdBy: route.query.createdBy
})

let deliveryOrderForm = reactive({
  fieldJobContactName: "",
  contactTelephone: "",
  priority: "",
  type: "2",
  remark: "",
  appointmentStartTime: "",
  appointmentEndTime: "",
  haveInstallConditions: false,
  fieldJobOrderId: route.query.orderId,
  fieldJobType__c: 0,
  stage__c: 0,
  name: taskDetails.value.accountName + "的配送派工单",
  fileList: [] as any,
  filePath: [] as any,
  followerId: null,
  address: ""
})

const deliveryOrderRule = reactive({
  followerId: [
    { required: true, message: "Please input username", trigger: "blur" },
  ],
  fieldJobContactName: [
    { required: true, message: "Please input username", trigger: "blur" },
  ],
  contactTelephone: [{ required: true, message: "Please input phone", trigger: "blur" }],
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

const handleDeleteDelivery = (res) => {
  var resopnse = res["response"];
}

const handleSuccessDelivery = (res) => {
  if (res.code == "success") {
    let path = res.data.map(val => val["fileId"]);
    if (path[0]) {
      deliveryOrderForm["filePath"].push(path[0])
    }
  }
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

const getExtralUserData = (showMsg: boolean) => {

  let params = { "userType": 1, "name": "", "phone": "" };
  getExternalUser(params).then((res: any) => {
    let data = res.data.data
    if (data != undefined && data.length > 0) {
      extralUserData.value = data
      if (showMsg) {
        ElMessage({
          message: '查询成功',
          type: 'success'
        })
      }
    } else {
      if (showMsg) {
        ElMessage({
          message: '获取数据失败',
          type: 'error'
        })
      }

    }
  })
}

const onCahngeUserSelectForDelivery = (event) => {
  let item = extralUserData.value.find(val => val["id"] == event);
  if (item) {
    deliveryOrderForm["fieldJobContactName"] = item["name"];
    deliveryOrderForm["contactTelephone"] = item["phone"];
    //installationOrderForm.value["customerPhone"] = item["phone"];
  }
}



const relatedDocumentsProblemReportingList = ref([

])

const relatedDocumentsAftersalesWorkorderList = ref([])


onMounted(() => {
  getDetailsData();
  getProvinceList();
  getCityList();
  getDistrictList();
  getSearchOrderList();
  getExtralUserData(false)
})



const getDetailsData = () => {
  getServiceCaseItem({ id: id.value, neoid: neoid.value == undefined ? "" : neoid.value }).then(res => {
    let rtData = res.data;
    if (rtData.code == "success") {
      currentItem.value = rtData.data;
      formDialog.value["orderNo"] = currentItem.value["caseNo"]
      console.log("wenti:")
      console.log(rtData.data["caseNo"])
      getSearchOrderOneList(rtData.data["caseNo"])
    }
    else {
      proxy.$message.error(rtData?.message);
    }
  })
}

const changeDeliveryOrderStep = (step) => {
  currentDeliveryOrderStep.value = step
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

const upgradeToHeadquarters = () => {
  showMainDialog.value = true

}

const changeDialogStep = (step) => {
  currentDialogStep.value = step
}

const openDialog2 = (type) => {
  dialogType.value = type
  showMainDialog.value = false
  showMainDialog2.value = true
}

//升级售后的时候有没有选订单号
const currentDialogStepBut = () => {
  if (!formDialog.value.orderNo) {
    proxy.$message.error("订单号不能为空!");
  } else {
    currentDialogStep.value = 2
    loadingOrderList(formDialog.value.orderNo)
  }
}

const submitDialog = () => {
  console.info("fileIdfileId", fileIdList)
  const selectData = tableData.value.filter(item => item.checked)

  console.info("过滤：", selectData["id"])
  if (selectData.length <= 0) {
    proxy.$message.error("必须勾选数据!");
    return;
  }
  selectData.forEach(item => {
    item["picture"] = fileIdList.value //图片id
    item["orderProductId"] = item["id"] //订单明细
    item["treeSpecies"] = item["treeSpecies__c"] //树种
    item["category"] = item["category1"] //产品大类
    item["paintColor"] = item["paintColor__c"] //油漆颜色
    item["ticketClassification"] = dialog2Form.value.problemType //问题大类
    item["ticketProblem"] = dialog2Form.value.afterSalesIssues //售后问题
    item["personLiable"] = dialog2Form.value.responsiblePerson //责任主体
    item["descriptionOfTicketProblem"] = dialog2Form.value.problemDesc //问题描述
    item["id"]=""
  })

  let params = {
    serviceCaseId: parseInt(caseneoId),
    details: selectData
  }
  if(solutionId!=""){
    params["id"]=solutionId
  }
  console.info("selectDataselectData", selectData)

  // dialog2Form.value["details"] = selectData
  if (!dialog2Form.value.problemType || !dialog2Form.value.afterSalesIssues || !dialog2Form.value.responsiblePerson || !dialog2Form.value.problemDesc) {
    proxy.$message.error("必填选项不能为空!");
  } else {
    proxy.$message.success("提交成功!");
    setTimeout(() => {
      showMainDialog.value = false
      // params["caseVo"] = "234234234"
      //提交方法
      getticketsolution(params).then((res: any) => {
        console.log(res)
        let data=res.data.data;
        if(data!=undefined){
          solutionId=data["id"]
        }
      })
    }, 500);
  }
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


const getProvinceList = () => {
  getPickList("province").then(res => {
    let rtData = res.data;
    if (rtData.code == "success") {
      provinceList.value = rtData.data;
    }
  })
}

const getCityList = () => {
  getPickList("city").then(res => {
    let rtData = res.data;
    if (rtData.code == "success") {
      cityList.value = rtData.data;
    }
  })
}

const getDistrictList = () => {
  getPickList("district").then(res => {
    let rtData = res.data;
    if (rtData.code == "success") {
      districtList.value = rtData.data;
    }
  })
}


//升级到总部售后点击下一步加载订单里面的items数据
const loadingOrderList = (row) => {
  //let caseid = "";
  let params = {
    po: row
  }
  getOrderList(params).then((res: any) => {
    if (res.data.code == "success") {
      getOrderListById(res.data.data[0].id).then((res: any) => {
        tableData.value = res.data.data.items
        caseneoId = parseInt(neoid.value)//res.data.data.neoid
        // caseid = res.data.data.neoid
        tableData.value.forEach(item => {
          item['checked'] = false
          item["orderId"] = formDialog.value.orderNo
        })
        getTicketSolutionBycaseId(caseneoId).then((res: any) => {
          if (res.data.code == "success") {
            console.info("getTicketSolutionBycaseId",res)
            console.info("caseneoId",caseneoId)
            let rtData = res.data.details;
            if(rtData==undefined){
              rtData= res.data.data.details;
            }
            if(res.data.data!=undefined){
              solutionId=res.data.data["id"]
            }
            if (rtData && rtData.length > 0) {
              tableData.value.forEach(val => {
                let item = rtData.find(val2 => val["id"] == val2["orderProductId"]);
                if (item) {
                  val["descriptionOfTicketProblem"] = item["descriptionOfTicketProblem"];
                  val["ticketClassification"] = item["ticketClassification"];
                  val["ticketProblem"] = item["ticketProblem"];
                  val["responsibleSubject"] = item["responsibleSubject"];
                }
              })
              console.log("new Date", tableData)
            } else {
              console.info("details没数据")
            }
          } else {
            console.info("接口请求失败")
            proxy.$message.error("接口请求失败!");
          }
        });
      })
    } else {
      proxy.$message.error("数据异常!");
    }
  })
}


// const handleSelectionChange = (selection) => {
//   selectedRows.value = selection;
//   console.log("selectedRows", selection)

// }


//跳转售后工单详情
const handleView = (row) => {
  proxy.$router.push({
    path: "/aftersales_workorder_details", query: {
      id: 1
    }
  });

}

//跳转派工单详情
const dispatch = (row) => {
  proxy.$router.push({
    path: "/dispatch_details", query: {
      id: 69
    }
  });
}

//相关单据点击查看
const showRelatedDocumentsDialogClick = () => {
  showRelatedDocumentsDialog.value = true
  //获取售后工单记录接口数据
  getTicketSolutionByneoID(neoid.value).then((res: any) => {
    let dataList = res.data;
    if (dataList.code == "success") {
      if (dataList.data && typeof dataList.data === 'object') {
        let dataArray = [{
          serviceTicketId: dataList.data.serviceTicketId,
          status: dataList.data.status
        }]
        relatedDocumentsAftersalesWorkorderList.value = dataArray
      }
    } else {
      ElMessage({
        message: '请求失败，请重试;',
        type: 'error'
      });
    }
  }).catch((error: any) => {
    ElMessage({
      message: '请求失败，请重试!',
      type: 'error'
    });
  });

  //获取售后派工单详情
  getFieldJob(id.value).then((res: any) => {
    let dataList = res.data;
    if (dataList.data && typeof dataList.data === 'object') {
      let dataArray = [{

      }]
      relatedDocumentsDispatchList.value = dataArray
    } else {
      ElMessage({
        message: '请求失败，请重试',
        type: 'error'
      });
    }
  }).catch((error: any) => {
    ElMessage({
      message: '请求失败，请重试!!',
      type: 'error'
    });
  });
}


const finishDeliveryOrder = () => {
  let params = deliveryOrderForm;
  params["fieldJobContactName"] = taskDetails.value.accountName == undefined ? "" : taskDetails.value.accountName.toString();
  // params["contactTelephone"]=orderData.value.contactTel==undefined?"":orderData.value.contactTel.toString();
  // params["address"]=orderData.value.customerAddress==undefined?"":orderData.value.customerAddress;
  console.log(orderDetails)
  params["fieldJobOrderId"]=orderDetails.value[0]["id"]
  params["contactTelephone"]=orderDetails.value[0]["contactTel"]
  params["fieldJobContactName"]=orderDetails.value[0]["accountName__C"]
  params["name"]=orderDetails.value[0]["accountName__C"]+"的维修派工单"
  params["picture"] = params.filePath;
  params["goodsPicture"] = params.filePath;
  addFieldJob(params).then((res: any) => {
    let data = res.data.data;
    tableDataDispatch.value.push(data);
    if (data != undefined) {
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
      if (!key.includes("type") && !key.includes("haveInstallConditions") && key !== "fieldJobOrderId" && key !== "fieldJobType__c" && key !== "stage__c" && key !== "name") deliveryOrderForm[key] = '';
      if (key === "haveInstallConditions") deliveryOrderForm[key] = false;
      if (key == "fileList" || key == "filePath") deliveryOrderForm[key] = [];
    });
  }).catch((error: any) => {
    // 显示请求失败的提示框
    ElMessage({
      message: '请求新增派工单失败，请重试',
      type: 'error'
    });
    Object.keys(deliveryOrderForm).forEach(key => {
      if (key !== "type" && key !== "haveInstallConditions" && key !== "fieldJobOrderId" && key !== "fieldJobType__c" && key !== "stage__c" && key !== "name") deliveryOrderForm[key] = '';
      if (key == "haveInstallConditions") deliveryOrderForm[key] = false;
      if (key == "fileList" || key == "filePath") deliveryOrderForm[key] = [];
    });
    console.error('请求新增派工单失败:', error);
  });
  deliveryOrderDialog.value = false
  // proxy.$message.success("派工单创建完成!")
  currentDeliveryOrderStep.value = 1
  // currentStep.value = 5
}


const convertProvince = (code) => {
  let item = provinceList.value.find(val => val["optionCode"] == code);
  if (code && item) {
    return item["optionLabel"];

  }
  else {
    return "";
  }
}

const convertCity = (code) => {
  let item = cityList.value.find(val => val["optionCode"] == code);
  if (code && item) {
    return item["optionLabel"];
  }
  else {
    return "";
  }
}

const convertDistrict = (code) => {
  let item = districtList.value.find(val => val["optionCode"] == code)
  if (code && item) {
    return item["optionLabel"];
  }
  else {
    return "";
  }
}

const orderDetails=ref({} as any)
//获取订单列表
const getSearchOrderOneList = (po) => {
  let params = {
    "deliveryDate": "",
    "status__c": "",
    "orderType__c": "",
    "transactionDate": "",
    "po": po,
    "accountName": "",
    "accountPhone": ""
  }
  getOrderList(params).then(res => {
    let rtData = res.data;
    if (rtData.code == "success") {
      orderDetails.value=rtData.data
      deliveryOrderForm["fieldJobOrderId"]=rtData.data["id"]
      deliveryOrderForm["contactTelephone"]=rtData.data["contactTel"]
      deliveryOrderForm["fieldJobContactName"]=rtData.data["accountName__C"]
      deliveryOrderForm["name"]=rtData.data["accountName__C"]+"的维修派工单"
    }
    else {
      proxy.$message.error(rtData?.message);
    }
  })
}
</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
