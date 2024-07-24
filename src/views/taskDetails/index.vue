<template>
  <div class="main">
    <div class="header">
      <span class="title">任务状态</span>
      <span class="step">
        <span class="item">
          <span class="num_selected">1</span>
          <span class="name">待处理</span>
        </span>
        <span class="item">
          <span class="num">2</span>
          <span class="name">提货</span>
        </span>
        <span class="item">
          <span class="num">3</span>
          <span class="name">入库</span>
        </span>
        <span class="item">
          <span class="num">4</span>
          <span class="name">配送</span>
        </span>
        <span class="item">
          <span class="num">5</span>
          <span class="name">安装</span>
        </span>
        <span class="item">
          <span class="num">6</span>
          <span class="name">完成</span>
        </span>
      </span>
    </div>
    <div class="task_details">
      <span class="title">任务详情 <el-button type="primary" class="primary_blue_btn">已派工配送</el-button><el-button type="primary" class="primary_green_btn">已派工安装</el-button></span>
      <span class="main_field">
        <span class="row_field">
          <span class="field">
            <span class="label">任务编号：</span>
            <span class="value">SO20240221-0002</span>
            <!-- <span class="view">查看</span> -->
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
            <span class="label">客户名：</span>
            <span class="value">李女士</span>
          </span>
          <span class="field">
            <span class="label">示例字段：</span>
            <span class="value">示例</span>
          </span>
          <span class="field">
            <span class="label">示例字段：</span>
            <span class="value">示例</span>
          </span>
        </span>
      </span>
    </div>
    <div class="order_status">
      <span class="title">订单状态</span>
      <span class="step">
        <span class="item">
          <span class="num"></span>
          <span class="name">...</span>
        </span>
        <span class="item">
          <span class="num"></span>
          <span class="name">已包装</span>
        </span>
        <span class="item">
          <span class="num"></span>
          <span class="name">已入成品库</span>
        </span>
        <span class="item">
          <span class="num_selected">4</span>
          <span class="name">已发货</span>
        </span>
        <span class="item">
          <span class="num"></span>
          <span class="name">已经销商收货 </span>
        </span>
        <span class="item">
          <span class="num"></span>
          <span class="name">订单完结</span>
        </span>
        <span class="item">
          <span class="num"></span>
          <span class="name">...</span>
        </span>
      </span>
    </div>
    <div class="related_items">
      <span class="title">相关项 > 订单</span>
      <span class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="text1" label="操作">
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
    </div>
    <div class="related_items">
      <span class="title">相关项 > 发货单</span>
      <span class="table">
        <el-table :data="tableData2" style="width: 100%">
          <el-table-column prop="text1" label="操作">
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
                查看&nbsp;&nbsp;&nbsp;批量提货
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="text2" label="XX编号" />
          <el-table-column prop="text3" label="发货单状态" />
          <el-table-column prop="text4" label="其他字段" />
          <el-table-column prop="text5" label="创建时间" />
          <el-table-column prop="text6" label="其他字段" />
        </el-table>
      </span>
    </div>
    <div class="related_items">
      <span class="title">相关项 > 派工单</span>
      <span class="table">
        <el-table :data="tableData3" style="width: 100%">
          <el-table-column prop="text1" label="操作">
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
          <el-table-column prop="text2" label="XX编号" />
          <el-table-column prop="text3" label="派工单状态" />
          <el-table-column prop="text4" label="其他字段" />
          <el-table-column prop="text5" label="创建时间" />
          <el-table-column prop="text6" label="其他字段" />
        </el-table>
      </span>
    </div>
    <div class="action_list">
      <div class="left">
        <img src="@/assets/images/comment.png" alt="" />
        <span>发起任务评论</span>
      </div>
      <div class="right">
        <el-button
          type="primary"
          @click="createDeliveryOrder"
          class="primary_btn"
          >创建配送派工单</el-button
        >
        <el-button
          type="primary"
          @click="createInstallationOrder"
          class="primary_btn"
          >创建安装派工单</el-button
        >
        <el-button type="primary" @click="takeGoods" class="primary_btn"
          >一键确认提货</el-button
        >
        <el-button type="primary" class="primary_btn">问题报告</el-button>
      </div>
    </div>
    <div class="comment">
      <div class="userinfo">
        <img src="@/assets/images/userinfo.png" alt="" />
        <span class="username">经销商A</span>
      </div>
      <div class="content">客户对于此单比较着急，需要加速安排交付。</div>
      <img class="tips" src="@/assets/images/tips.png" alt="" />
    </div>
    <div class="comment">
      <div class="userinfo">
        <img src="@/assets/images/userinfo.png" alt="" />
        <span class="username">配送司机-张师傅</span>
      </div>
      <div class="content">
        客户对于配送比较满意，但是仍然需要快点上门安装！
      </div>
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
            <span class="name"
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
            <span class="name"
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
            <span class="name"
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
            <el-form-item label="人员名称" prop="username">
              <el-input
                v-model="deliveryOrderForm.username"
                placeholder="查找或输入服务人员姓名"
              />
            </el-form-item>
            <el-form-item label="联系方式" prop="phone">
              <el-input
                v-model="deliveryOrderForm.phone"
                placeholder="输入联系方式"
              />
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
                placeholder="紧急/普通"
                v-model="deliveryOrderForm.priority"
              />
            </el-form-item>
            <el-form-item label="其他字段" prop="otherField">
              <el-input
                placeholder="参考数据字典"
                v-model="deliveryOrderForm.otherField"
              />
            </el-form-item>
            <el-form-item label="派工单备注" class="customLayout">
              <el-input
                v-model="deliveryOrderForm.remark"
                :rows="5"
                type="textarea"
                maxlength="500"
                placeholder="请清点货品数量，确保准确..."
                show-word-limit
              />
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
            <span class="name"
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
            <span class="name"
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
            <span class="name"
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
            label-width="90px"
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
            <!-- <el-form-item label="安装小组">
              <span style="width: 300px">
                <el-checkbox
                  v-model="installationOrderForm.installationTeam"
                ></el-checkbox>
              </span>
            </el-form-item>
            <el-form-item label="添加组员">
              <span class="custom_item">
                <img src="@/assets/images/add.png" alt="" />
              </span>
            </el-form-item> -->
          </el-form>
          <el-form
            v-if="currentInstallationOrderStep == 2"
            :model="installationOrderForm"
            :rules="installationOrderRule"
            label-width="90px"
            label-position="left"
          >
            <el-form-item label="预约安装" prop="scheduleInstallationTime">
              <el-date-picker
                v-model="installationOrderForm.scheduleInstallationTime"
                type="datetime"
                placeholder="日期/时间"
              />
            </el-form-item>
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
                placeholder="请清点货品数量，确保准确..."
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
  </div>
</template>


<script setup lang="ts">
import { ref, computed, getCurrentInstance, reactive } from "vue"
import { Plus } from "@element-plus/icons-vue";
const { proxy }: any = getCurrentInstance()

const currentDeliveryOrderStep = ref(1)
const currentInstallationOrderStep = ref(1)
const deliveryOrderForm = reactive({
  username: "",
  phone: "",
  priority: "",
  otherField: "",
  remark: "",
  userRemark: "",
})

const deliveryOrderRule = reactive({
  username: [
    { required: true, message: "Please input username", trigger: "blur" },
  ],
  phone: [{ required: true, message: "Please input phone", trigger: "blur" }],
  priority: [
    { required: true, message: "Please input priority", trigger: "blur" },
  ],
  otherField: [
    { required: true, message: "Please input other field", trigger: "blur" },
  ],
})

const installationOrderForm = reactive({
  username: "",
  phone: "",
  installationTeam: false,
  remark: "",
  scheduleInstallationTime: "",
})

const installationOrderRule = reactive({
  username: [
    { required: true, message: "Please input username", trigger: "blur" },
  ],
  phone: [{ required: true, message: "Please input phone", trigger: "blur" }],
  scheduleInstallationTime: [
    {
      required: true,
      message: "Please input schedule installation time",
      trigger: "blur",
    },
  ],
  priority: [
    { required: true, message: "Please input priority", trigger: "blur" },
  ],
})

const deliveryOrderDialog = ref(false)

const installationOrderDialog = ref(false)

const tableData = ref([
  {
    text1: "查看",
    text2: "XXX",
    text3: "示例字段...",
    text4: "XXXX",
    text5: "2024-02-21 10:30:50",
    text6: "XXX",
  },
])

const tableData2 = ref([
  {
    text1: "查看",
    text2: "XXX",
    text3: "示例字段...",
    text4: "XXXX",
    text5: "2024-02-21 10:30:50",
    text6: "XXX",
  },
])

const tableData3 = ref([
  {
    text1: "查看",
    text2: "XXX",
    text3: "示例字段...",
    text4: "XXXX",
    text5: "2024-02-21 10:30:50",
    text6: "XXX",
  },
])

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
}

const finishDeliveryOrder = () => {
  deliveryOrderDialog.value = false
  proxy.$message.success("派工单创建完成!")
  currentDeliveryOrderStep.value = 1
}

const takeGoods = () => {
  proxy.$message.success("提货任务完成!")
}

const inBound = () => {
  proxy.$message.success("已全部入库!")
}
</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
