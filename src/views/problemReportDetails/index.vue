<template>
  <div class="main">
    <span class="header">
      <span class="title"
        ><span>问题提报状态</span
        ><el-button class="btn" @click="upgradeToHeadquarters"
          >升级到总部 (售后)</el-button
        ></span
      >
      <span class="step">
        <span class="item" @click="changeStep(1)">
          <span :class="currentStep == 1 ? 'num_selected' : 'num'">1</span>
          <span :class="currentStep >= 1 ? 'name_selected' : 'name'">待处理</span>
        </span>
        <span class="item" @click="changeStep(2)">
          <span :class="currentStep == 2 ? 'num_selected' : 'num'">2</span>
          <span :class="currentStep >= 2 ? 'name_selected' : 'name'">处理中</span>
        </span>
        <span class="item" @click="changeStep(3)">
          <span :class="currentStep == 3 ? 'num_selected' : 'num'">3</span>
          <span :class="currentStep >= 3 ? 'name_selected' : 'name'">已完成</span>
        </span>
      </span>
    </span>
    <span class="problem_report_info">
      <span class="title">问题提报详情</span>
      <span class="main_field">
        <span class="row_field">
          <span class="field">
            <span class="label">问题编号：</span>
            <span class="value">SH202460007</span>
            <span v-if="false" class="view">查看</span>
          </span>
          <span class="field">
            <span class="label">专卖店名称：</span>
            <span class="value">梦天慈溪专卖店A</span>
          </span>
          <span class="field">
            <span class="label">问题类别：</span>
            <span class="value">售后报修</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">订单编号：</span>
            <span class="value">XXXXXXXXXXX</span>
          </span>
          <span class="field">
            <span class="label">负责人：</span>
            <span class="value">XXX</span>
          </span>
          <span class="field">
            <span class="label">创建时间：</span>
            <span class="value">2021-02-28 10:30:50</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">问题描述：</span>
            <span class="value">嘉善基地</span>
          </span>
          <!-- <span class="field">
            <span class="label"></span>
            <span class="value"></span>
          </span>
          <span class="field">
            <span class="label"></span>
            <span class="value"></span>
          </span> -->
        </span>
      </span>
      <span class="title">其他字段</span>
      <span class="other_field">
        <span class="row_field">
          <span class="field">
            <span class="label">客户姓名：</span>
            <span class="value">XXX</span>
          </span>
          <span class="field">
            <span class="label">客户手机号：</span>
            <span class="value">18568689595</span>
          </span>
          <span class="field">
            <span class="label">来源：</span>
            <span class="value">终端客户</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">省份：</span>
            <span class="value">江苏省</span>
          </span>
          <span class="field">
            <span class="label">城市：</span>
            <span class="value">南京市</span>
          </span>
          <span class="field">
            <span class="label">提报人电话：</span>
            <span class="value">16822822288</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">经销商内部提报：</span>
            <span class="value">复选框</span>
          </span>
          <span class="field">
            <span class="label">提报人：</span>
            <span class="value">王工</span>
          </span>
          <span class="field">
            <span class="label">提报人电话：</span>
            <span class="value">16822822288</span>
          </span>
        </span>
      </span>
    </span>
    <span class="related_documents">
      <span class="title">相关单据</span>
      <el-button class="btn">1个售后工单</el-button>
      <el-button class="btn">1个派工单</el-button>
      <span class="view" @click="showRelatedDocumentsDialog = true">点击查看</span>
    </span>
    <span class="action_list">
      <div class="left">
        <img src="@/assets/images/comment.png" alt="" />
        <span class="initiate_comments" @click="initiateComments">发起任务评论</span>
      </div>
      <div class="right">
        <el-button type="primary" @click="initiateComments" class="primary_btn">编辑</el-button>
        <el-button type="primary" class="primary_btn">创建派工单</el-button>
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
    <div class="showMainDialog">
      <el-dialog
        v-model="showMainDialog"
        title="升级到总部 (售后)"
        width="80%"
        :show-close="false"
      >
        <div class="step">
          <span class="item">
            <span
              @click="changeDialogStep(1)"
              :class="currentDialogStep == 1 ? 'num_selected' : 'num'"
              >1</span
            >
            <span class="name"
              >确认问题订单
              <span class="remark">选择或确认问题订单</span>
            </span>
          </span>
          <span class="item">
            <span
              @click="changeDialogStep(2)"
              :class="currentDialogStep == 2 ? 'num_selected' : 'num'"
              >2</span
            >
            <span class="name"
              >完善必填信息
              <span class="remark">完善问题描述与处理方式</span>
            </span>
          </span>
          <span class="item">
            <span
              @click="changeDialogStep(3)"
              :class="currentDialogStep == 3 ? 'num_selected' : 'num'"
              >3</span
            >
            <span class="name"
              >提交升级
              <span class="remark">提交售后至总部</span>
            </span>
          </span>
        </div>
        <template v-if="currentDialogStep == 1">
            <span class="form_row">
              <span class="label required">订单编号</span>
              <el-input v-model="formDialog.orderNo" placeholder="订单编号"></el-input>
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
              <el-button class="btn" @click="openDialog2(1)"
                >完善问题描述</el-button
              >
              <el-button class="btn" @click="openDialog2(2)"
                >定义处理方式</el-button
              >
            </span>
          </div>
          <div class="search">
            <el-input v-model="formDialog.searchValue" :prefix-icon="Search"  placeholder="搜索"></el-input>
          </div>
          <div class="filter_list">
            <el-select v-model="formDialog.orderType">
              <el-option
                v-for="item in filterList1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="formDialog.productType">
              <el-option
                v-for="item in filterList2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="formDialog.productModel">
              <el-option
                v-for="item in filterList3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="formDialog.treeSpecies">
              <el-option
                v-for="item in filterList4"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="formDialog.paintColor">
              <el-option
                v-for="item in filterList5"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="formDialog.size">
              <el-option
                v-for="item in filterList6"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="table">
            <el-table :data="tableData" :stripe="false" style="width: 100%">
              <el-table-column prop="text1" label="全选" width="80px">
                <template #default="scope">
                  <el-checkbox v-model="scope.text1" />
                </template>
              </el-table-column>
              <el-table-column prop="text2" label="订单明细编号" />
              <el-table-column prop="text3" label="产品大类" />
              <el-table-column prop="text4" label="产品型号" />
              <el-table-column prop="text5" label="树种" />
              <el-table-column prop="text6" label="油漆颜色" />
              <el-table-column prop="text7" label="尺寸" />
              <el-table-column prop="text8" label="修改时间 " />
            </el-table>
          </div>
        </template>
        <template #footer>
          <div class="dialog-footer">
            <el-button class="cancel_btn" @click="showMainDialog = false" >取消</el-button>
            <el-button v-if="currentDialogStep==1" @click="currentDialogStep = 2"  type="primary" class="primary_btn"  style="margin-left：50px !important" >下一步</el-button>
            <el-button v-if="currentDialogStep==2" @click="submitDialog"  type="primary" class="primary_btn"  style="margin-left：50px !important" >提交</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
    <div class="showMainDialog2">
      <el-dialog v-model="showMainDialog2" width="25%" :show-close="false">
        <span class="title">{{
          dialogType == "1" ? "完善问题描述" : "定义处理方式"
        }}</span>
        <span class="content" v-if="dialogType == '1'">
          <span class="item">
            <span class="label">问题大类</span>
            <el-select placeholder="">
              <el-option
                v-for="item in []"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </span>
          <span class="item">
            <span class="label">售后问题</span>
            <el-select placeholder="">
              <el-option
                v-for="item in []"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </span>
          <span class="item">
            <span class="label">责任人</span>
            <el-input></el-input>
          </span>
          <span class="item">
            <span class="label">问题描述</span>
            <el-input></el-input>
          </span>
          <span class="item">
            <el-upload
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
        <span class="content" v-if="dialogType == '2'">
          <span class="item">
            <span class="label">产品分类</span>
            <el-select placeholder="">
              <el-option
                v-for="item in []"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </span>
          <span class="item">
            <span class="label">部件分类</span>
            <el-select placeholder="">
              <el-option
                v-for="item in []"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </span>
          <span class="item">
            <span class="label">不良分类</span>
            <el-select placeholder="">
              <el-option
                v-for="item in []"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </span>
          <span class="item">
            <span class="label">质量指标一</span>
            <el-select placeholder="">
              <el-option
                v-for="item in []"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </span>
          <span class="item">
            <span class="label">质量指标二</span>
            <el-select placeholder="">
              <el-option
                v-for="item in []"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </span>
          <span class="item">
            <span class="label">处理方式</span>
            <el-select placeholder="">
              <el-option
                v-for="item in []"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </span>
        </span>
        <template #footer>
          <div class="dialog-footer">
            <el-button class="cancel_btn" @click="showMainDialog2 = false;showMainDialog = true"
              >取消</el-button
            >
            <el-button
              @click="showMainDialog2 = false;showMainDialog = true"
              type="primary"
              class="primary_btn"
              style="margin-left：50px !important"
              >确认</el-button
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
          <!-- <span class="tableItem">
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
          </span> -->
          <span class="tableItem">
            <span class="tableTitle"> 1. 售后工单 </span>
            <span class="tableContent">
              <el-table :data="relatedDocumentsAftersalesWorkorderList" :stripe="false" style="width: 100%">
                <el-table-column prop="text1" label="售后工单编号" />
                <el-table-column prop="text2" label="类别" />
                <el-table-column prop="text3" label="负责人" />
                <el-table-column prop="text3" label="状态">
                  <template #default="scope">
                    <el-button class="statusing" @click="console.log(scope)">进行中</el-button>
                  </template>
                </el-table-column>
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
import { ElMessage, ElMessageBox } from "element-plus"

const { proxy }: any = getCurrentInstance()

const currentStep = ref(2)

const commentList = ref<any>([
])

const showRelatedDocumentsDialog = ref(false)

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


const currentDialogStep = ref(1)

const showMainDialog = ref(false)

const showMainDialog2 = ref(false)

const dialogType = ref(1)

const filterList = ref({
  value1: "1",
  value2: "1",
  value3: "1",
  value4: "1",
  value5: "1",
  value6: "1"
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
    text8: "2021-02-28 10:30:50"
  },
  {
    text1: "",
    text2: "CS015-00023-0-1-1",
    text3: "门套 (自动赋值)",
    text4: "示例字段...",
    text5: "示例字段...",
    text6: "示例字段...",
    text7: "示例字段...",
    text8: "2021-02-28 10:30:50"
  },
  {
    text1: "",
    text2: "CS015-00023-0-1-1",
    text3: "门套 (自动赋值)",
    text4: "示例字段...",
    text5: "示例字段...",
    text6: "示例字段...",
    text7: "示例字段...",
    text8: "2021-02-28 10:30:50"
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
    text3: "示例字段...",
    text4: "满意",
    text5: "2021-02-28 10:30:50",
    text6: "",
  },
])


const relatedDocumentsProblemReportingList = ref([
  
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

const submitDialog = () =>{
  proxy.$message.success("提交成功!");
  setTimeout(() => {
    showMainDialog.value = false
    proxy.$router.push("/aftersales_workorder_details")
  }, 500);
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
