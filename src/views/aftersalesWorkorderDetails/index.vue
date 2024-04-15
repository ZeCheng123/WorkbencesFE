<template>
  <div class="main">
    <span class="header">
      <span class="title">售后工单状态</span>
      <span class="step">
        <span class="item" @click="changeStep(1)">
          <span :class="currentStep == 1 ? 'num_selected' : 'num'">1</span>
          <span :class="currentStep >= 1 ? 'name_selected' : 'name'">...</span>
        </span>
        <span class="item" @click="changeStep(2)">
          <span :class="currentStep == 2 ? 'num_selected' : 'num'">2</span>
          <span :class="currentStep >= 2 ? 'name_selected' : 'name'">已定损</span>
        </span>
        <span class="item" @click="changeStep(3)">
          <span :class="currentStep == 3 ? 'num_selected' : 'num'">3</span>
          <span :class="currentStep >= 3 ? 'name_selected' : 'name'">核实/维护问题产品中</span>
        </span>
        <span class="item" @click="changeStep(4)">
          <span :class="currentStep == 4 ? 'num_selected' : 'num'">4</span>
          <span :class="currentStep >= 4 ? 'name_selected' : 'name'">定责发起</span>
        </span>
        <span class="item" @click="changeStep(5)">
          <span :class="currentStep == 5 ? 'num_selected' : 'num'">5</span>
          <span :class="currentStep >= 5 ? 'name_selected' : 'name'">已提交OA审批</span>
        </span>
        <span class="item" @click="changeStep(6)">
          <span :class="currentStep == 6 ? 'num_selected' : 'num'">6</span>
          <span :class="currentStep >= 6 ? 'name_selected' : 'name'">已定责</span>
        </span>
        <span class="item" @click="changeStep(7)">
          <span :class="currentStep == 7 ? 'num_selected' : 'num'">7</span>
          <span :class="currentStep >= 7 ? 'name_selected' : 'name'">...</span>
        </span>
      </span>
    </span>
    <span class="order_info">
      <span class="title"
        >售后工单详情 <el-button class="submit_btn">已提交</el-button>
        <el-button class="return_btn">总部已退回</el-button>
      </span>
      <span class="main_field">
        <span class="row_field">
          <span class="field">
            <span class="label">工单编号：</span>
            <span class="value">SH202460007</span>
            <span v-if="false" class="view">查看</span>
          </span>
          <span class="field">
            <span class="label">专卖店名称：</span>
            <span class="value">梦天慈溪专卖店A</span>
          </span>
          <span class="field">
            <span class="label">售后状态：</span>
            <span class="value">已追责</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">信息来源：</span>
            <span class="value">经销商提报</span>
          </span>
          <span class="field">
            <span class="label">订单编号：</span>
            <span class="value">SH202260007</span>
          </span>
          <span class="field">
            <span class="label">客户姓名：</span>
            <span class="value">李女士</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">供应基地：</span>
            <span class="value">嘉善基地</span>
          </span>
          <span class="field">
            <span class="label">订单类型：</span>
            <span class="value">子单</span>
          </span>
          <span class="field">
            <span class="label">客户电话：</span>
            <span class="value">13566778899</span>
          </span>
        </span>
      </span>
      <span class="title">其他字段</span>
      <span class="other_field">
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
            <span class="label">示例字段：</span>
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
            <span class="label">示例字段：</span>
            <span class="value">示例</span>
          </span>
        </span>
      </span>
    </span>
    <span class="order_list">
      <span class="table_title">售后工单明细</span>
      <span class="table_content">
        <el-table
          :data="tableDataOrderDetials"
          :stripe="false"
          style="width: 100%"
        >
          <el-table-column prop="text1" label="订单明细编号" />
          <el-table-column prop="text2" label="产品大类" />
          <el-table-column prop="text3" label="其它字段" />
          <el-table-column prop="text4" label="其它字段" />
          <el-table-column prop="text5" label="修改时间" />
          <el-table-column prop="text6" label="操作">
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
        <el-button type="primary" class="primary_btn" @click="openDialog2(2)">定义处理方式</el-button>
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
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </span>
          <span class="item">
            <span class="label">售后问题</span>
            <el-select v-model="dialog2Form.afterSalesIssues" placeholder="">
              <el-option
                v-for="item in afterSalesIssuesList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </span>
          <span class="item">
            <span class="label">部件分类</span>
            <el-select v-model="dialog2Form.componentType" placeholder="">
              <el-option
                v-for="item in componentTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </span>
          <span class="item">
            <span class="label">不良分类</span>
            <el-select v-model="dialog2Form.badType" placeholder="">
              <el-option
                v-for="item in badTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </span>
          <span class="item">
            <span class="label">质量指标一</span>
            <el-select v-model="dialog2Form.qualityIndicator1" placeholder="">
              <el-option
                v-for="item in qualityIndicator1List"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </span>
          <span class="item">
            <span class="label">质量指标二</span>
            <el-select v-model="dialog2Form.qualityIndicator2" placeholder="">
              <el-option
                v-for="item in qualityIndicator2List"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </span>
          <span class="item">
            <span class="label">处理方式</span>
            <el-select v-model="dialog2Form.handleWay" placeholder="">
              <el-option
                v-for="item in handleWayList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
import { ref, computed, getCurrentInstance, reactive } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"

const { proxy }: any = getCurrentInstance()

const currentStep = ref(4)

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

const problemTypeList = ref<any>([{
  label: "问题大类",
  value: "1"
}])

const afterSalesIssuesList = ref<any>([{
  label: "售后问题",
  value: "1"
}])

const poductTypeList = ref<any>([{
  label: "产品分类",
  value: "1"
}])

const componentTypeList = ref<any>([{
  label: "部件分类",
  value: "1"
}])

const badTypeList = ref<any>([{
  label: "不良分类",
  value: "1"
}])

const qualityIndicator1List = ref<any>([{
  label: "质量指标一",
  value: "1"
}])

const qualityIndicator2List = ref<any>([{
  label: "质量指标二",
  value: "1"
}])

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
  {
    text1: "",
    text2: "CS015-00023-0-1-1",
    text3: "门套 (自动赋值)",
    text4: "示例字段...",
    text5: "示例字段...",
    text6: "示例字段...",
    text7: "示例字段...",
    text8: "2021-02-28 10:30:50",
  },
  {
    text1: "",
    text2: "CS015-00023-0-1-1",
    text3: "门套 (自动赋值)",
    text4: "示例字段...",
    text5: "示例字段...",
    text6: "示例字段...",
    text7: "示例字段...",
    text8: "2021-02-28 10:30:50",
  },
  {
    text1: "",
    text2: "CS015-00023-0-1-1",
    text3: "门套 (自动赋值)",
    text4: "示例字段...",
    text5: "示例字段...",
    text6: "示例字段...",
    text7: "示例字段...",
    text8: "2021-02-28 10:30:50",
  },
])

const filterList1 = ref([{ label: "全部订单", value: "1" }])

const filterList2 = ref([{ label: "产品大类", value: "1" }])

const filterList3 = ref([{ label: "产品型号", value: "1" }])

const filterList4 = ref([{ label: "树种", value: "1" }])

const filterList5 = ref([{ label: "油漆颜色", value: "1" }])

const filterList6 = ref([{ label: "尺寸", value: "1" }])


const tableDataOrderDetials = ref([
  {
    text1: "CS0011-06665-01",
    text2: "XX",
    text3: "示例字段...",
    text4: "示例字段...",
    text5: "2021-02-28 10:30:50",
    text6: "",
  },
  {
    text1: "CS0011-06665-01",
    text2: "XX",
    text3: "示例字段...",
    text4: "示例字段...",
    text5: "2021-02-28 10:30:50",
    text6: "",
  },
  {
    text1: "CS0011-06665-01",
    text2: "XX",
    text3: "示例字段...",
    text4: "示例字段...",
    text5: "2021-02-28 10:30:50",
    text6: "",
  },
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


</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
