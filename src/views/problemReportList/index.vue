<template>
  <div class="main">
    <span class="header"><span class="title">问题提报</span></span>
    <span class="search">
      <span class="left">
        <el-form :model="form" :rules="rule" label-width="80px" label-position="left">
          <el-form-item label="问题编号">
            <el-input placeholder="请输入问题编号" v-model="form.problemNo" />
          </el-form-item>
          <el-form-item label="客户名称">
            <el-input placeholder="输入客户名称" v-model="form.customerName" />
          </el-form-item>
          <el-form-item label="客户电话">
            <el-input placeholder="请输入客户电话" v-model="form.customerPhone" />
          </el-form-item>
        </el-form>
        <el-form :model="form" :rules="rule" label-width="80px" label-position="left">
          <el-form-item label="创建时间">
            <el-date-picker v-model="form.createDate" type="daterange" range-separator="~" start-placeholder="开始时间"
              end-placeholder="结束时间" format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select v-model="form.orderStatus" placeholder="请选择订单状态">
              <el-option v-for="item in caseStatus" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
          </el-form-item>
          <span style="width: 336px; height: 32px"></span>
        </el-form>
      </span>
      <span class="right">
        <el-button type="primary" @click="getTableDataList" class="search_btn"><template #icon>
            <img src="@/assets/images/search.png" alt="" /> </template>查询</el-button>
        <el-button type="primary" @click="resetting()" class="reset_btn"><template #icon>
            <img src="@/assets/images/reset.png" alt="" /> </template>重置</el-button>
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
        <el-button @click="OpenProblemReportingDialog" type="primary" class="search_btn"><template #icon>
            <img src="@/assets/images/plus.png" alt="" /> </template>新建</el-button>
        <el-button type="primary" class="reset_btn"><template #icon>
            <img src="@/assets/images/download.png" alt="" /> </template>下载</el-button>
      </span>
    </span>
    <span class="table">
      <el-table class="table_content" :data="tableData" :stripe="false" style="width: 100%">
        <el-table-column prop="caseNo" label="问题编号" />
        <el-table-column prop="name" label="客户姓名" />
        <el-table-column prop="problemDescription" label="问题描述" />
        <el-table-column prop="complaintSourceC" label="来源">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              {{
                scope.row.complaintSourceC
                ? caseSource.find(
                  (val) => val["code"] == scope.row.complaintSourceC
                )?.name
                : ""
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="externalUserName" label="提报人" />
        <el-table-column prop="createdTime" label="创建时间" />
        <el-table-column prop="caseStatus" label="问题状态">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              {{
                scope.row.caseStatus
                ? caseStatus.find(
                  (val) => val["code"] == scope.row.caseStatus
                )?.name
                : ""
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" width="80px">
          <template #default="scope">
            <div style="
                display: flex;
                align-items: center;
                color: #165dff;
                cursor: pointer;
              " @click="viewDetails(scope.row)">
              查看
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="table_pagination" :page-size="pageConfig.pageSize" :pager-count="pageConfig.pageSize"
        layout="total, prev, pager, next" :total="pageConfig.total" @current-change="handleCurrentChange" />
    </span>
    <div class="problemReportingDialog">
      <el-dialog v-model="showProblemReportingDialog" title="问题提报" width="80%" :show-close="false">
        <span class="step">
          <span class="item">
            <span :class="currentProblemReportingStep == 1 ? 'num_selected' : 'num'">1</span>
            <span class="name">完善提报信息
              <span class="remark">完善问题提报的信息</span>
            </span>
          </span>
          <span class="item">
            <span :class="currentProblemReportingStep == 2 ? 'num_selected' : 'num'">2</span>
            <span class="name">完成创建
              <span class="remark">等待售服部处理</span>
            </span>
          </span>
        </span>
        <div class="content">
          <el-form :model="problemReportingForm" :rules="problemReportingRule" label-width="90px" label-position="left">
            <el-form-item label="订单编号" prop="orderNo">
              <el-select v-model="problemReportingForm.orderNo" filterable @change="onCahngeOrderNo"
                placeholder="请选择订单编号">
                <el-option v-for="item in orderList" :key="item.po" :label="item.po" :value="item.po" />
              </el-select>
            </el-form-item>
            <el-form-item label="提报人姓名" prop="customerName">
              <el-input placeholder="请输入提报人姓名" v-model="problemReportingForm.customerName" />
            </el-form-item>
            <el-form-item label="提报人电话" prop="customerPhone">
              <el-input placeholder="请输入提报人电话" v-model="problemReportingForm.customerPhone" />
            </el-form-item>
            <el-form-item label="问题描述" class="customLayout" prop="desc">
              <el-input v-model="problemReportingForm.desc" :rows="5" type="textarea" maxlength="500"
                placeholder="请输入问题描述" show-word-limit />
            </el-form-item>
            <el-form-item label="上传图片" class="custom_upload">
              <el-upload :on-success="handleSuccess" :on-remove="handleDelete" :auto-upload="true" :data="uploadData"
                :headers="headers" :before-upload="beforeUpload" list-type="picture-card" class="avatar-uploader"
                action="https://sh.mengtian.com.cn:9595/md/api/common/file/upload" :show-file-list="true"
                v-model:file-list="problemReportingForm.fileList">
                <el-icon>
                  <Plus />
                </el-icon>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button class="cancel_btn" @click="showProblemReportingDialog = false">取消</el-button>
            <el-button type="primary" class="primary_btn" @click="submitProblemReporting">提交</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, getCurrentInstance, reactive, onMounted } from "vue";
import { Plus } from "@element-plus/icons-vue";
import moment from 'moment';
import {
  getServiceCaseList,
  getOrderList,
  createServiceCase,
  getServiceCasePage,
} from "../../api/common.js";

const { proxy }: any = getCurrentInstance();

const pageConfig = ref({
  pageIndex: 1,
  pageSize: 15,
  total: 0,
});

const headers = ref({
  Content: "application/json",
  Authorization: ``, // Here you can add your token
  isImage: "true",
  needFileId: "true",
  "Trace-Id": "",
});

const uploadData = ref({
  files: [],
  name: "files",
});

const form = reactive({
  problemNo: "",
  customerName: "",
  customerPhone: "",
  filterMethod: "",
  createDate: [],
  tableData: [],
  orderStatus: "",
});

const filterMethodOptions = ref([
  {
    value: "all",
    label: "全部",
  },
]);

const orderStatusOptions = ref([
  {
    value: "all",
    label: "全部",
  },
]);

const caseSource = ref([
  {
    name: "配送技工",
    code: "1",
  },
  {
    name: "安装技工",
    code: "2",
  },
  {
    name: "终端用户",
    code: "3",
  },
  {
    name: "经销商",
    code: "4",
  },
]);

const caseStatus = ref([
  {
    name: "全部",
    code: "",
  },
  {
    name: "待处理",
    code: "1",
  },
  {
    name: "已受理",
    code: "2",
  },
  {
    name: "处理中",
    code: "3",
  },
  {
    name: "已完成",
    code: "4",
  },
]);

const showProblemReportingDialog = ref(false);

const currentProblemReportingStep = ref(1);

const problemReportingForm = ref({
  orderNo: "",
  customerName: "",
  customerPhone: "",
  desc: "",
  fileList: [],
  filePath: [],
});

const problemReportingRule = ref({
  customerName: [
    { required: true, message: "客户姓名不能为空！", trigger: "blur" },
  ],
  customerPhone: [
    { required: true, message: "客户电话不能为空！", trigger: "blur" },
  ],
  desc: [{ required: true, message: "问题描述不能为空！", trigger: "blur" }],
});

const tableData = ref([]);

const orderList = ref([]);

onMounted(() => {
  setTimeout(() => {
    getTableDataList();
    getSearchOrderList();
  }, 500);
});

const viewDetails = (row) => {
  let id = row["id"];
  let neoid = row["neoid"];
  let caseStatus = row["caseStatus"]
  let createdTime = row["createdTime"]
  let name = row["name"]
  let questionType = row["questionType"]
  let getParams = "id=" + id;
  let params = {}
  if (neoid != undefined) {
    getParams = getParams + "&neoid=" + neoid;
    if (caseStatus === 1 && createdTime != null) {
      params = {
        id: id,
        questionType: questionType ? questionType : 0,
        name: name,
        caseStatus: 2,
        dealerAcceptanceTime: moment().format('YYYY-MM-DD HH:mm:ss')
      }
      console.info("params", params)
    }
    processingTime(params, getParams)
  }
};

//问题提报时间处理
const processingTime = (params, getParams) => {
  if (params.id != null) {
    createServiceCase(params).then((res) => {
      let resData = res.data;
      if (resData.code == 'success' && resData.data != undefined) {
        proxy.$router.push(`/problem_report_details?${getParams}`);
        console.info("更新成功")
      } else {
        console.info("更新失败")
      }
    })
  }else{
    proxy.$router.push(`/problem_report_details?${getParams}`);
  }
}

const OpenProblemReportingDialog = () => {
  showProblemReportingDialog.value = true;
};

const submitProblemReporting = () => {
  console.log("problemReportingForm", problemReportingForm.value);
  for (let key in problemReportingForm.value) {
    if (
      key != "orderNo" &&
      key != "fileList" &&
      key != "filePath" &&
      problemReportingForm.value[key] == ""
    ) {
      proxy.$message.error("必填字段不能为空!");
      return;
    }
  }
  let params = {
    caseNo: problemReportingForm.value["orderNo"],
    // orderNeoId: problemReportingForm.value["orderNo"],
    name: problemReportingForm.value["customerName"],
    // caseAccountId: problemReportingForm.value["customerName"],
    phone: problemReportingForm.value["customerPhone"],
    problemDescription: problemReportingForm.value["desc"],
    picture: problemReportingForm.value["filePath"],
    caseStatus: "1",
    questionType: 1,
  };
  createServiceCase(params).then((res) => {
    let rtData = res.data;
    if (rtData.code == "success") {
      problemReportingForm.value = {
        orderNo: "",
        customerName: "",
        customerPhone: "",
        desc: "",
        fileList: [],
        filePath: [],
      } as any;
      showProblemReportingDialog.value = false;
      proxy.$message.success("提交成功!");
      getTableDataList();
    } else {
      proxy.$message.error(rtData?.message);
    }
  });
};

//查询按钮方法
const getTableDataList = () => {
  let params = {
    "caseStatus": form.orderStatus == undefined ? "" : form.orderStatus,
    "caseNo": form.problemNo == undefined ? "" : form.problemNo,
    "accountName": form.customerName == undefined ? "" : form.customerName,
    "accountPhone": form.customerPhone == undefined ? "" : form.customerPhone,
    "from": form.createDate == undefined ? "" : form.createDate[0],
    "to": form.createDate == undefined ? "" : form.createDate[1],
    "pageSize": pageConfig.value.pageSize,
    "pageNo": pageConfig.value.pageIndex,
  };
  getServiceCasePage(params).then((res) => {
    let rtData = res.data;
    if (rtData.code == "success") {
      tableData.value = rtData.data;
      pageConfig.value = {
        pageIndex: res.data.current == undefined ? 1 : parseInt(res.data.current),
        pageSize: res.data.size,
        total: res.data.total,
      } as any;
    } else {
      proxy.$message.error(rtData?.message);
      tableData.value = [];
      pageConfig.value = {
        pageIndex: 1,
        pageSize: 15,
        total: 0,
      } as any;
    }
  });
};

const getSearchOrderList = () => {
  let params = {
    deliveryDate: "",
    status__c: "",
    orderType__c: "",
    transactionDate: "",
    po: "",
    accountName: "",
    accountPhone: "",
  };
  getOrderList(params).then((res) => {
    let rtData = res.data;
    if (rtData.code == "success") {
      orderList.value = rtData.data;
    } else {
      proxy.$message.error(rtData?.message);
    }
  });
};

const onCahngeOrderNo = (event) => {
  let item = orderList.value.find((val) => val["po"] == event);
  if (item) {
    problemReportingForm.value["customerName"] = item["accountName"];
    problemReportingForm.value["customerPhone"] = item["accountPhone"];
  }
};

const handleSuccess = (res) => {
  console.log(res);
  if (res.code == "success") {
    let path = res.data.map((val) => val["fileId"]);
    problemReportingForm.value["filePath"] =
      problemReportingForm.value["filePath"].concat(path);

    console.log(problemReportingForm.value["filePath"]);
  }
};

const handleDelete = (res) => {
  var resopnse = res["response"];
  console.log(resopnse);
};

const beforeUpload = (file) => {
  uploadData.value["files"] = [file];
};
//重置按钮
const resetting = () => {
  console.log("aaaa");
  form.problemNo = null;
  form.customerName = null;
  form.customerPhone = null;
  form.filterMethod = null;
  form.createDate = [];
  form.orderStatus = null;
  getTableDataList();
};
const handleCurrentChange = (val: number) => {
  pageConfig.value.pageIndex = val;
  getTableDataList();
}
</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
