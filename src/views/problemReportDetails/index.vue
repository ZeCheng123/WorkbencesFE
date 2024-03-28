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
          <span class="name">待处理</span>
        </span>
        <span class="item" @click="changeStep(2)">
          <span :class="currentStep == 2 ? 'num_selected' : 'num'">2</span>
          <span class="name">处理中</span>
        </span>
        <span class="item" @click="changeStep(3)">
          <span :class="currentStep == 3 ? 'num_selected' : 'num'">3</span>
          <span class="name">已完成</span>
        </span>
      </span>
    </span>
    <span class="problem_report_info">
      <span class="title">问题提报详情</span>
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
            <span class="status1">SH202260007</span>
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
    <span class="related_documents">
      <span class="title">相关单据</span>
      <el-button class="btn">1个售后工单</el-button>
      <el-button class="btn">1个派工单</el-button>
      <span class="view">点击查看</span>
    </span>
    <span class="action_list">
      <div class="left">
        <img src="@/assets/images/comment.png" alt="" />
        <span>发起任务评论</span>
      </div>
      <div class="right">
        <el-button type="primary" class="primary_btn">编辑</el-button>
      </div>
    </span>
    <div class="comment">
      <div class="userinfo">
        <img src="@/assets/images/userinfo.png" alt="" />
        <span class="username">经销商A</span>
      </div>
      <div class="content">客户对于此单比较着急，需要加速安排交付。</div>
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
              <el-input></el-input>
            </span>
            <span class="form_row">
              <span class="label">升级备注</span>
              <el-input></el-input>
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
            <el-input :prefix-icon="Search" placeholder="搜索"></el-input>
          </div>
          <div class="filter_list">
            <el-select v-model="filterList.value1">
              <el-option
                v-for="item in filterList1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="filterList.value2">
              <el-option
                v-for="item in filterList2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="filterList.value3">
              <el-option
                v-for="item in filterList3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="filterList.value4">
              <el-option
                v-for="item in filterList4"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="filterList.value5">
              <el-option
                v-for="item in filterList5"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="filterList.value6">
              <el-option
                v-for="item in filterList6"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="table">
            <el-table :data="tableData" :stripe="true" style="width: 100%">
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
  </div>
</template>


<script setup lang="ts">
import { ref, computed, getCurrentInstance, reactive } from "vue"
import { Search, UploadFilled } from "@element-plus/icons-vue"

const { proxy }: any = getCurrentInstance()

const currentStep = ref(2)

const currentDialogStep = ref(2)

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
  showMainDialog.value = false
  proxy.$router.push("/aftersales_workorder_details")
}

</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
