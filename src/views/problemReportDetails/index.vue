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
            <span class="value">{{ currentItem["estimatedResolutionDate"] }}</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">问题描述：</span>
            <span class="value">{{ currentItem["problemDescription"] }}</span>
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
            <span class="value">{{ currentItem["caseAccountId"] }}</span>
          </span>
          <span class="field">
            <span class="label">客户手机号：</span>
            <span class="value">{{ currentItem["phone"] }}</span>
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
        <span class="initiate_comments" @click="initiateComments">发起评论</span>
      </div>
      <div class="right">
        <el-button type="primary" @click="initiateComments" class="primary_btn">编辑</el-button>
        <el-button type="primary" @click="" class="primary_btn">创建派工单</el-button>
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
      <el-dialog v-model="showMainDialog" title="升级到总部 (售后)" width="80%" :show-close="false">
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
            <el-input v-model="formDialog.searchValue" :prefix-icon="Search" placeholder="搜索"></el-input>
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
            <el-table :data="tableData" :stripe="false" style="width: 100%">
              <el-table-column prop="text1" label="全选" width="80px">
                <template #default="scope">
                  <el-checkbox v-model="scope.text1" />
                </template>
              </el-table-column>
              <el-table-column prop="text2" label="订单编号" />
              <el-table-column prop="text3" label="详单编号" />
              <el-table-column prop="text4" label="详单条码" />
              <el-table-column prop="text5" label="产品大类" />
              <el-table-column prop="text6" label="产品型号" />
              <el-table-column prop="text7" label="树种" />
              <el-table-column prop="text8" label="油漆颜色 " />
              <el-table-column prop="text9" label="尺寸 " />
            </el-table>
          </div>
          <div class="responsibilityPerson">
            <span class="label required">问题大类</span>
            <el-select v-model="dialog2Form.problemType" placeholder="">
              <el-option
                v-for="item in problemTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
            <span class="label required">售后问题</span>
            <el-select v-model="dialog2Form.afterSalesIssues" placeholder="">
              <el-option
                v-for="item in afterSalesIssuesList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
            <span class="label required">责任人</span>
            <el-input v-model="dialog2Form.responsiblePerson" style="width: 240px" placeholder="请输入责任人" />
          </div>
          <div class="responsibilityPerson">
            <span class="label required">问题描述</span>
            <el-input v-model="dialog2Form.problemDesc" style="width: 440px" :rows="2" type="textarea" placeholder="请输入问题描述" />
          </div>
          <div class="responsibilityPerson">
            <span class="label">上传文件</span>
          </div>
          <div class="containerUpload">
            <span class="item">
              <el-upload class="upload" drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                multiple>
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
            <el-button v-if="currentDialogStep == 1" @click="currentDialogStep = 2" type="primary" class="primary_btn"
              style="margin-left：50px !important">下一步</el-button>
            <el-button v-if="currentDialogStep == 2" @click="submitDialog" type="primary" class="primary_btn"
              style="margin-left：50px !important">提交</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
    <div class="relatedDocumentsDialog">
      <el-dialog v-model="showRelatedDocumentsDialog" title="相关单据" width="80%" :show-close="false">
        <div class="content">
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
                    <div style="
                        display: flex;
                        align-items: center;
                        color: #165dff;
                        cursor: pointer;
                      " @click="console.log(scope)">
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
                      " @click="console.log(scope)">
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
import { getServiceCaseItem, getPickList, getOrderList } from '../../api/common.js'

const { proxy }: any = getCurrentInstance()

const commentList = ref<any>([])

const route = useRoute()
const id = ref(route.query.id)
const neoid = ref(route.query.neoid)

const showRelatedDocumentsDialog = ref(false)
const orderList = ref([]);

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

const problemTypeList = ref<any>([
  {code:"1",name:"经销商问题"},
  {code:"2",name:"公司问题"},
  {code:"3",name:"物流问题"}
])

const afterSalesIssuesList = ref<any>([
  {code:"1",name:"店面测量师漏单"},
  {code:"2",name:"店面测量师量错"},
  {code:"3",name:"店里设计师漏分解"},
  {code:"4",name:"店里设计师分解错"},
  {code:"5",name:"店里设计不合理"},
  {code:"6",name:"店里下单员漏单"},
  {code:"7",name:"店里下单员下错"},
  {code:"8",name:"店里安装师问题"},
  {code:"9",name:"消费者补单"},
  {code:"10",name:"消费者使用不当"},
  {code:"11",name:"产品丢失"}
])

const poductTypeList = ref<any>([
  {code:"1",  name:"墙板"},
  {code:"2",  name:"线条"},
  {code:"3",  name:"五金"},
  {code:"4",  name:"门套"},
  {code:"5",  name:"门扇"},
  {code:"6",  name:"柜体"},
  {code:"7",  name:"柜门"},
  {code:"8",  name:"玻璃"},
  {code:"9",  name:"挂板"},
  {code:"10",name:"罗马柱"},
  {code:"11",name:"帽头"},
  {code:"12",name:"装饰块"},
  {code:"13",name:"雕花件"},
  {code:"14",name:"色板"},
  {code:"15",name:"整单"},
  {code:"16",name:"入户门"}
])

const componentTypeList = ref<any>([
  {code:"1",name:"边梃"},
  {code:"2",name:"挂线条"},
  {code:"3",name:"芯板"},
  {code:"4",name:"金属条"},
  {code:"5",name:"码头"},
  {code:"6",name:"封边"},
  {code:"7",name:"L边"},
  {code:"8",name:"整体"},
  {code:"9",name:"面板执手"},
  {code:"10",name:"锁体"},
  {code:"11",name:"铰链"},
  {code:"12",name:"铰链底座"},
  {code:"13",name:"灯带"},
  {code:"14",name:"抽屉轨道"},
  {code:"15",name:"三合一"},
  {code:"16",name:"其他五金"},
  {code:"17",name:"档条"},
  {code:"18",name:"密封条"},
  {code:"19",name:"套板"},
  {code:"20",name:"门套"},
  {code:"21",name:"玻璃"},
  {code:"22",name:"门标"},
  {code:"23",name:"门芯板"},
  {code:"24",name:"配件"},
  {code:"25",name:"五金配件"},
  {code:"26",name:"8属边"},
  {code:"27",name:"背板"},
  {code:"28",name:"层板"},
  {code:"29",name:"抽屉板"},
  {code:"30",name:"底板"},
  {code:"31",name:"顶板"},
  {code:"32",name:"台面板"},
  {code:"33",name:"立板"},
  {code:"34",name:"侧板"},
  {code:"35",name:"踢脚板"},
  {code:"36",name:"五金件"},
  {code:"37",name:"挂板"},
  {code:"38",name:"罗马柱"},
  {code:"39",name:"帽头"},
  {code:"40",name:"装饰块"},
  {code:"41",name:"雕花件"},
  {code:"42",name:"色板"},
  {code:"43",name:"整单"},
  {code:"44",name:"修补漆"},
  {code:"45",name:"入户门扇"}
])

const badTypeList = ref<any>([
  {code:"1",name:"消费者"},
  {code:"2",name:"经销商"},
  {code:"3",name:"订单分解"},
  {code:"4",name:"备料"},
  {code:"5",name:"加工"},
  {code:"6",name:"免漆加工"},
  {code:"7",name:"油漆"},
  {code:"8",name:"少货"},
  {code:"9",name:"包装问题"},
  {code:"10",name:"五金问题"},
  {code:"11",name:"辅料问题"},
  {code:"12",name:"仓库发货"},
  {code:"13",name:"物流送达"},
  {code:"14",name:"系统问题"},
  {code:"15",name:"新品设计问题"},
  {code:"16",name:"隔音等级"},
  {code:"17",name:"受潮"},
  {code:"18",name:"无法提供证明的少货"},
  {code:"19",name:"交期延误"},
  {code:"20",name:"霉变"},
  {code:"21",name:"气味"},
  {code:"22",name:"长虫"},
  {code:"23",name:"过质保期"},
  {code:"24",name:"变色"},
  {code:"25",name:"入户门问题"}
])

const aftersalesHeaderDetails=ref<any>({})
const qualityIndicator1List = ref<any>([
  {code:"1",name:"订单分解错"},
  {code:"2",name:"订单漏分解"},
  {code:"3",name:"变形"}
])

const qualityIndicator2List = ref<any>([
  {code:"1",name:"漏备注"},
  {code:"2",name:"产品漏分解"},
  {code:"3",name:"配件漏分解"},
  {code:"4",name:"五金漏分解"},
  {code:"5",name:"孔位漏分解"},

])

const handleWayList = ref<any>([{
  label: "处理方式",
  value: "1"
}])


const currentDialogStep = ref(1)

const showMainDialog = ref(false)

const showMainDialog2 = ref(false)

const dialogType = ref(1)

onMounted(() => {
  getSearchOrderList();
});

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
    text2: "Order123456789",
    text3: "CS015-00023-0-1-1",
    text4: "23002906450001011",
    text5: "门套",
    text6: "FSGS123456",
    text7: "黑胡桃直纹",
    text8: "2380 * 220"
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
    text3: "其他",
    text4: "满意",
    text5: "2021-02-28 10:30:50",
    text6: "",
  },
])


const relatedDocumentsProblemReportingList = ref([

])

const relatedDocumentsAftersalesWorkorderList = ref([
  {
    text1: "456",
    text2: "交付任务",
    text3: "2222",
    text4: "进行中",
    text5: "2021-02-28 10:30:50",
    text6: "",
  }
])

const relatedDocumentsDispatchList = ref([
  {
    text1: "123",
    text2: "交付任务",
    text3: "1111",
    text4: "进行中",
    text5: "2021-02-28 10:30:50",
    text6: "",
  }
])

const complaintSource = ref([
  { code: "1", name: "配送技工" },
  { code: "2", name: "安装技工" },
  { code: "3", name: "终端用户" },
  { code: "4", name: "经销商" },
])

const currentItem = ref<any>({});

const provinceList = ref([]);
const cityList = ref([]);
const districtList = ref([]);

onMounted(() => {
  getDetailsData();
  getProvinceList();
  getCityList();
  getDistrictList();
})

const getDetailsData = () => {
  getServiceCaseItem({ id: id.value, neoid: neoid.value == undefined ? "" : neoid.value }).then(res => {
    let rtData = res.data;
    if (rtData.code == "success") {
      currentItem.value = rtData.data;
      formDialog.value["orderNo"] = currentItem.value["orderNeoId"]
    }
    else {
      proxy.$message.error(rtData?.message);
    }
  })
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

const submitDialog = () => {
  
  proxy.$message.success("提交成功!");
  setTimeout(() => {
    showMainDialog.value = false
    // proxy.$router.push("/aftersales_workorder_details")
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

const convertProvince = (code) => {
  if (code) {
    return provinceList.value.find(val => val["optionCode"] == code)["optionLabel"];
  }
  else {
    return "";
  }
}

const convertCity = (code) => {
  if (code) {
    return cityList.value.find(val => val["optionCode"] == code)["optionLabel"];
  }
  else {
    return "";
  }
}

const convertDistrict = (code) => {
  if (code) {
    return districtList.value.find(val => val["optionCode"] == code)["optionLabel"];
  }
  else {
    return "";
  }
}


</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
