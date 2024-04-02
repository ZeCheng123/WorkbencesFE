<template>
  <div class="main">
    <span class="header"><span class="title">问题提报</span></span>
    <span class="search">
      <span class="left">
        <el-form
          :model="form"
          :rules="rule"
          label-width="80px"
          label-position="left"
        >
          <el-form-item label="问题编号">
            <el-input placeholder="请输入问题编号" v-model="form.problemNo" />
          </el-form-item>
          <el-form-item label="客户名称">
            <el-input placeholder="输入客户名称" v-model="form.customerName" />
          </el-form-item>
          <el-form-item label="客户电话">
            <el-input
              placeholder="请输入客户电话"
              v-model="form.customerName"
            />
          </el-form-item>
        </el-form>
        <el-form
          :model="form"
          :rules="rule"
          label-width="80px"
          label-position="left"
        >
          <el-form-item label="筛选方式">
            <el-select v-model="form.filterMethod" placeholder="请选择筛选方式">
              <el-option
                v-for="item in filterMethodOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="form.createDate"
              type="daterange"
              range-separator="~"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select v-model="form.orderStatus" placeholder="请选择订单状态">
              <el-option
                v-for="item in orderStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </span>
      <span class="right">
        <el-button type="primary" class="search_btn"><template #icon> <img src="@/assets/images/search.png" alt=""> </template>查询</el-button>
        <el-button type="primary" class="reset_btn"><template #icon> <img src="@/assets/images/reset.png" alt=""> </template>重置</el-button>
      </span>
    </span>
    <span class="table_header">
      <span class="left">
        <img src="@/assets/images/logoXX.png" alt="" />
        <span class="title">经销商名称：梦天慈溪经销商</span>
      </span>
      <span class="right">
        <el-button @click="OpenProblemReportingDialog" type="primary" class="search_btn"><template #icon> <img src="@/assets/images/plus.png" alt=""> </template>新建</el-button>
        <el-button type="primary" class="reset_btn"><template #icon> <img src="@/assets/images/download.png" alt=""> </template>下载</el-button>
      </span>
    </span>
    <span class="table">
      <el-table class="table_content" :data="tableData" :stripe="false" style="width: 100%">
        <el-table-column prop="text1" label="问题编号" />
        <el-table-column prop="text2" label="专卖店名称" />
        <el-table-column prop="text3" label="生产单号" />
        <el-table-column prop="text4" label="客户名称" />
        <el-table-column prop="text5" label="处理方式" />
        <el-table-column prop="text6" label="创建时间" />
        <el-table-column prop="text7" label="问题状态" />
        <el-table-column prop="text8" label="操作" width="80px">
          <template #default="scope">
            <div
              style="
                display: flex;
                align-items: center;
                color: #165dff;
                cursor: pointer;
              "
              @click="viewDetails(scope)"
            >
              查看
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="table_pagination"
        :page-size="20"
        :pager-count="11"
        layout="total, prev, pager, next"
        :total="1000"
      />
    </span>
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
const { proxy }: any = getCurrentInstance()

const form = reactive({
  problemNo: "",
  customerName: "",
  customerPhone: "",
  filterMethod: "",
  createDate: [],
  orderStatus: "",
})

const filterMethodOptions = ref([
  {
    value: "all",
    label: "全部",
  },
])

const orderStatusOptions = ref([
  {
    value: "all",
    label: "全部",
  },
])

const showProblemReportingDialog = ref(false)

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


const tableData = ref([
  {
    text1: "CS0011-06665-01",
    text2: "梦天慈溪经销商-专卖店A",
    text3: "H404304",
    text4: "李女士",
    text5: "售后重做",
    text6: "2021-02-28 10:30",
    text7: "已提报",
    text8: "",
  },
  {
    text1: "CS0011-06665-01",
    text2: "梦天慈溪经销商-专卖店A",
    text3: "H404304",
    text4: "李女士",
    text5: "售后重做",
    text6: "2021-02-28 10:30",
    text7: "已提报",
    text8: "",
  },
  {
    text1: "CS0011-06665-01",
    text2: "梦天慈溪经销商-专卖店A",
    text3: "H404304",
    text4: "李女士",
    text5: "售后重做",
    text6: "2021-02-28 10:30",
    text7: "已提报",
    text8: "",
  },
  {
    text1: "CS0011-06665-01",
    text2: "梦天慈溪经销商-专卖店A",
    text3: "H404304",
    text4: "李女士",
    text5: "售后重做",
    text6: "2021-02-28 10:30",
    text7: "已提报",
    text8: "",
  },
  {
    text1: "CS0011-06665-01",
    text2: "梦天慈溪经销商-专卖店A",
    text3: "H404304",
    text4: "李女士",
    text5: "售后重做",
    text6: "2021-02-28 10:30",
    text7: "已提报",
    text8: "",
  },
  {
    text1: "CS0011-06665-01",
    text2: "梦天慈溪经销商-专卖店A",
    text3: "H404304",
    text4: "李女士",
    text5: "售后重做",
    text6: "2021-02-28 10:30",
    text7: "已提报",
    text8: "",
  },
  {
    text1: "CS0011-06665-01",
    text2: "梦天慈溪经销商-专卖店A",
    text3: "H404304",
    text4: "李女士",
    text5: "售后重做",
    text6: "2021-02-28 10:30",
    text7: "已提报",
    text8: "",
  },
])

const viewDetails = () =>{
  proxy.$router.push("/problem_report_details");
}

const OpenProblemReportingDialog = () => {
  showProblemReportingDialog.value = true
}

const submitProblemReporting = () => {
  showProblemReportingDialog.value = false
  proxy.$message.success("提交成功!")
}


</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
