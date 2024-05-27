<template>
  <div class="main">
    <span class="header"><span class="title">服务评价</span></span>
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
          <span style="width:336px;height:32px"></span>
        </el-form>
      </span>
      <span class="right">
        <el-button type="primary" @click="getTableDataList" class="search_btn"><template #icon> <img src="@/assets/images/search.png" alt=""> </template>查询</el-button>
        <el-button type="primary" class="reset_btn"><template #icon> <img src="@/assets/images/reset.png" alt=""> </template>重置</el-button>
      </span>
    </span>
    <span class="table_header">
      <span class="left">
        <img src="@/assets/images/logoXX.png" alt="" />
        <span class="title">
          <!-- 经销商名称：梦天慈溪经销商 -->
        </span>
      </span>
      <span class="right">
        <el-button @click="OpenProblemReportingDialog" type="primary" class="search_btn"><template #icon> <img src="@/assets/images/plus.png" alt=""> </template>新建</el-button>
        <el-button type="primary" class="reset_btn"><template #icon> <img src="@/assets/images/download.png" alt=""> </template>下载</el-button>
      </span>
    </span>
    <span class="table">
      <el-table class="table_content" :data="tableData" :stripe="false" style="width: 100%">
        <el-table-column prop="caseNo" label="问题编号" />
        <el-table-column prop="caseAccountId" label="客户姓名" />
        <el-table-column prop="problemDescription" label="问题描述" />
        <el-table-column prop="sourceOfProblem" label="来源">
           <template #default="scope">
            <div style="display: flex; align-items: center;">
              {{scope.row.sourceOfProblem ? (caseSource.find(val => val["code"] == scope.row.sourceOfProblem)?.name) : ""}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="distributorName" label="提报人" />
        <el-table-column prop="actualResolutionDate" label="创建时间" />
        <el-table-column prop="caseStatus" label="问题状态">
          <template #default="scope">
            <div style="display: flex; align-items: center;">
              {{scope.row.caseStatus ? (caseStatus.find(val => val["code"] == scope.row.caseStatus)?.name) : ""}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" width="80px">
          <template #default="scope">
            <div
              style="
                display: flex;
                align-items: center;
                color: #165dff;
                cursor: pointer;
              "
              @click="viewDetails(scope.row)"
            >
              查看
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="table_pagination"
        :page-size="pageConfig.pageSize"
        :pager-count="5"
        layout="total, prev, pager, next"
        :total="pageConfig.total"
      />
    </span>
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
              <el-select v-model="problemReportingForm.orderNo" filterable @change="onCahngeOrderNo" placeholder="请选择订单编号">
                <el-option
                  v-for="item in orderList"
                  :key="item.po"
                  :label="item.po"
                  :value="item.po"
                />
              </el-select>
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
                :on-success="handleSuccess"
                :on-remove="handleDelete"
                :auto-upload="true"
                :data="uploadData"
                :headers="headers"
                :before-upload="beforeUpload"
                list-type="picture-card"
                class="avatar-uploader"
                action="https://sh.mengtian.com.cn:9595/md/api/common/file/upload"
                :show-file-list="true"
                v-model:file-list="problemReportingForm.fileList"
              >
              <el-icon><Plus /></el-icon>
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
import { ref, computed, getCurrentInstance, reactive, onMounted } from "vue"
import { Plus } from "@element-plus/icons-vue"
import {getServiceCaseList, getOrderList,createServiceCase } from '../../api/common.js'

const { proxy }: any = getCurrentInstance();

const pageConfig = ref({
  pageIndex: 0,
  pageSize: 100,
  total: 0
});

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

const caseSource = ref([
  {
    name:"品质",code:"1"
  },
  {
    name:"交期",code:"2"
  },
  {
    name:"服务",code:"3"
  },
  {
    name:"销售",code:"4"
  }
])

const caseStatus = ref([
  {
    name:"待分配",code:"1"
  },
  {
    name:"待处理",code:"2"
  },
  {
    name:"处理中",code:"3"
  },
  {
    name:"待回复",code:"4"
  },
  {
    name:"已完成",code:"4"
  }
])

const showProblemReportingDialog = ref(false)


const currentProblemReportingStep = ref(1)


const problemReportingForm = ref({
  orderNo: "",
  customerName: "",
  customerPhone: "",
  desc: "",
  fileList: [],
  filePath: [],
})

const problemReportingRule = ref({
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

const tableData = ref([]);

const orderList = ref([]);


onMounted(() =>{
  setTimeout(() => {
      getTableDataList();
      getSearchOrderList();
  }, 500);
})


const viewDetails = (row) =>{
  let id = row["id"];
  let neoid = row["neoid"];
  proxy.$router.push(`/problem_report_details?id=${id}&neoid=${neoid}`);
}

const OpenProblemReportingDialog = () => {
  showProblemReportingDialog.value = true
}

const submitProblemReporting = () => {
  for(let key in problemReportingForm.value){
    if(key != "fileList" && key != "orderNo" && problemReportingForm.value[key] == ""){
      proxy.$message.error("必填字段不能为空!");
      return;
    }
  }
  let params = {
    caseNo: problemReportingForm.value["orderNo"],
    // orderNeoId: problemReportingForm.value["orderNo"],
    // caseAccountId: problemReportingForm.value["customerName"],
    name: problemReportingForm.value["customerName"],
    phone: problemReportingForm.value["customerPhone"],
    problemDescription: problemReportingForm.value["desc"],
    picture: problemReportingForm.value["filePath"].join(";"),
    caseStatus: "1"
  }
  createServiceCase(params).then(res =>{
    let rtData = res.data;
    if(rtData.code == "success"){
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
      getTableDataList();
    }
    else{
      proxy.$message.error(rtData?.message)
    }
  })
}

const getTableDataList = () =>{
  let params = {
    caseStatus: "",
    caseNo: "",
    name: ""
  }
  getServiceCaseList(params).then(res =>{
    let rtData = res.data;
    if(rtData.code == "success"){
      tableData.value = rtData.data;
      pageConfig.value = {
        pageIndex: 0,
        pageSize: 100,
        total: rtData.data.length
      } as any;
    }
    else{
      proxy.$message.error(rtData?.message);
      tableData.value = [];
      pageConfig.value = {
        pageIndex: 0,
        pageSize: 100,
        total: 0
      } as any;
    }
  })
}

const getSearchOrderList = () =>{
  let params = {
    "deliveryDate": "",
    "status__c": "",
    "orderType__c": "",
    "transactionDate": "",
    "accountName": ""
  }
  getOrderList(params).then(res =>{
    let rtData = res.data;
    if(rtData.code == "success"){
      orderList.value = rtData.data;
    }
    else{
      proxy.$message.error(rtData?.message);
    }
  })
}

const onCahngeOrderNo = (event) => {
  let item = orderList.value.find(val => val["po"] == event);
  if(item){
    problemReportingForm.value["customerName"] = item["accountName"];
    problemReportingForm.value["customerPhone"] = item["accountPhone"];
  }
}

const handleSuccess = (res) => {
  console.log(res);
  if(res.code == "success"){
    let path = res.data.map(val => val["fileUrl"]);
    problemReportingForm.value["filePath"] = problemReportingForm.value["filePath"].concat(path)
  }
}
    
const handleDelete = (res) => {
  var resopnse = res["response"];
  console.log(resopnse);
}

const beforeUpload = (file) => {
  uploadData.value["files"].push(file)
}



</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
