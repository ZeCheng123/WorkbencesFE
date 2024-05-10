<template>
  <div class="main">
    <div class="main_left">
      <img class="main_header_image" src="@/assets/images/main_header_image.png" alt="Logo" />
      <div class="function_guide">
        <div class="header">
          <label class="label">功能指引</label>
          <img class="logo" src="@/assets/images/logo.png" alt="" />
        </div>
        <div class="function_item">
          <div class="item">
            <div class="menu" @click="clickMenu('qualification_information')">
              <img class="icon" src="@/assets/images/menu_icon.png" alt="" />
              <label class="name">资质信息</label>
            </div>
            <div class="menu" @click="clickMenu('my_personnel')">
              <img class="icon" src="@/assets/images/menu_icon.png" alt="" />
              <label class="name">我的人员</label>
            </div>
            <div class="line"></div>
          </div>
          <div class="item">
            <div class="menu" @click="clickMenu('delivery_tasks')">
              <img class="icon" src="@/assets/images/menu_icon.png" alt="" />
              <label class="name">交付任务</label>
              <span class="tips">1</span>
            </div>
            <div class="menu" @click="clickMenu('historical_orders')">
              <img class="icon" src="@/assets/images/menu_icon.png" alt="" />
              <label class="name">历史订单</label>
              <span class="tips">5</span>
            </div>
            <div class="line"></div>
          </div>
          <div class="item">
            <div class="menu" @click="clickMenu('dispatch_list')">
              <img class="icon" src="@/assets/images/menu_icon.png" alt="" />
              <label class="name">派工单</label>
              <span class="tips">1</span>
            </div>
            <div class="menu">
              <!-- @click="clickMenu('service_workorder')" -->
              <!-- <img class="icon" src="@/assets/images/menu_icon.png" alt="" />
              <label class="name">服务评价</label> -->
            </div>
            <div class="line"></div>
          </div>
          <div class="item">
            <div class="menu" @click="clickMenu('problem_report_list')">
              <img class="icon" src="@/assets/images/menu_icon.png" alt="" />
              <label class="name">问题提报</label>
            </div>
            <div class="menu"></div>
            <div class="line2"></div>
          </div>
          <div class="item">
            <div class="menu" @click="clickMenu('aftersales_workorder')">
              <img class="icon" src="@/assets/images/menu_icon.png" alt="" />
              <label class="name">售后工单</label>
              <span class="tips">2</span>
            </div>
            <div class="menu"></div>
            <div class="line2"></div>
          </div>
          <div class="item"></div>
        </div>
        <div class="function_direction">
          <div class="item">
            <div class="end"></div>
          </div>
        </div>
        <div class="function_category">
          <div class="item">管理我的组织</div>
          <div class="item">交付执行</div>
          <div class="item">技工服务</div>
          <div class="item">售后无忧</div>
          <div class="item">售后进度</div>
          <div class="item"></div>
        </div>
      </div>
      <div class="notification_message">
        <div class="header">
          <label class="label">通知中心</label>
          <label class="more">查看更多</label>
        </div>

        <div class="list">
          <div class="list_item" v-for="(item, index) in filteredData" :key="index" @click="goTaskDetail(item)">
            <span class="type message">消息</span>
            <span class="tips">{{ item.text }}</span>
            <span class="important" v-if="item.important == 1">重要</span>
            <span class="important" v-else="item.important == 0"></span>
          </div>
        </div>

      </div>
    </div>
    <div class="main_right">
      <div class="top">
        <div class="other_function">
          <div class="title">其他功能</div>
          <div class="menu">
            <!-- <div class="item">
              <img class="icon" src="@/assets/images/menu_icon.png" alt="" />
              <span class="name">用户信息</span>
            </div> -->
            <div class="item">
              <img class="icon" src="@/assets/images/data_report.png" alt="" />
              <span class="name">数据报表</span>
            </div>
          </div>
        </div>
        <div class="total_order_amount">
          <span class="title">当前订单</span>
          <span class="content">
            <div class="left">
              <span class="num">¥{{ currenAmount.toFixed(2) }}</span>
              <span class="desc">
                <span class="text1">较上月</span>
                <span class="text2">{{ percentage }}%</span>
                <span v-if="percentage > 0" class="text3"><img src="@/assets/images/up.png" alt="" /></span>
                <span v-else class="text3"><img src="@/assets/images/fall.png" alt="" /></span>
              </span>
            </div>
            <div class="right">
              <e-charts ref="chart1" class="chart" :option="option1" />
            </div>
          </span>
        </div>
        <div class="aftersales_workorder">
          <span class="title">任务分布</span>
          <span class="content">
            <div class="left">
              <span class="num">{{ currentMonthTask }}</span>
              <span class="desc">
                <span class="text1">较上月</span>
                <span class="text2">{{ taskNumber }}</span>
                <span v-if="taskNumber > 0" class="text3"><img src="@/assets/images/up.png" alt="" /></span>
                <span v-else class="text3"><img src="@/assets/images/fall.png" alt="" /></span>
              </span>
            </div>
            <div class="right">
              <e-charts ref="chart2" class="chart" :option="option2" />
            </div>
          </span>
        </div>
      </div>
      <div class="dispatch_distribution">
        <span class="title">派工分布</span>
        <span class="content">
          <div class="left">
            <span class="num">{{ currentMonthlen }}</span>
            <span class="desc">
              <span class="text1">较上月</span>
              <span class="text2">{{ JobBynumber }}</span>
              <span v-if="JobBynumber > 0" class="text3"><img src="@/assets/images/up.png" alt="" /></span>
              <span v-else class="text3"><img src="@/assets/images/fall.png" alt="" /></span>
            </span>
          </div>
          <div class="right">
            <e-charts ref="chart3" class="chart" :option="option3" />
          </div>
        </span>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, getCurrentInstance, onMounted, onBeforeUnmount, onUnmounted } from "vue"
import { getServiceCasePage, createServiceCase, getOrderListByPage, getFieldJobByPage, getTaskByPage } from '../../api/common.js'
import * as echarts from "echarts"
import moment from 'moment';
const { proxy }: any = getCurrentInstance()
const timer = ref(null)

const chart1 = ref(null)

const chart2 = ref(null)

const chart3 = ref(null)

//消息列表
const messageList = ref([]);
const filteredData = ref([]); // getServiceCasePage返回数据
const intervalId = ref(null);
let lastAmount = ref(0);//上一个月总金额
let currenAmount = ref(0) //本月总金额
let retailCount = ref(0); // 零售订单数量
let distributionCount = ref(0); // 分配订单数量
let otherCount = ref(0); // 其他订单数量
let percentage = ref<number>(0)
let pendingCount = ref(0);//派工待处理
let progressCount = ref(0);//派工处理中
let completeCount = ref(0);//派工已完成
let lastMonthlen = ref(0);//派工上月单数
let currentMonthlen = ref(0);//派工本月单数
let JobBynumber = ref(0);//派工差
let taskPending = ref(0);//任务分布待处理
let taskExtract = ref(0);//任务分布提货
let taskWarehousing = ref(0);//任务分布入库
let taskDelivery = ref(0);//任务分布配送
let taskInstall = ref(0);//任务分布安装
let taskComplete = ref(0);//任务分布完成
let lastMonthTask = ref(0)
let currentMonthTask = ref(0)
let taskNumber = ref<number>(0)
const currentTooltips = ref(1)

const option1 = computed(() => {
  return {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "10",
      left: "50%",
      orient: "vertical", // 设置图例垂直显示
      data: [
        { name: "总部分配", icon: "circle" },
        { name: "零售订单", icon: "circle" },
        { name: "其他", icon: "circle" },
      ],
    },
    series: [
      {
        name: "当前订单",
        type: "pie",
        radius: ["50%", "80%"],
        center: ["20%", "55%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 1,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        color: ["#8D4EDA", "#165DFF", "#00B2FF"],
        data: [
          { value: distributionCount.value, name: "总部分配" },
          { value: retailCount.value, name: "零售订单" },
          { value: otherCount.value, name: "其他" },
        ],
      },
    ],
  }
})

const option2 = computed(() => {
  return {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "10",
      left: "40%",
      orient: "vertical", // 设置图例垂直显示
      data: [
        { name: "待处理", icon: "circle" },
        { name: "提货", icon: "circle" },
        { name: "入库", icon: "circle" },
        { name: "配送", icon: "circle" },
        { name: "安装", icon: "circle" },
        { name: "完成", icon: "circle" },
      ],
    },
    series: [
      {
        name: "任务分布",
        type: "pie",
        radius: ["50%", "80%"],
        center: ["20%", "55%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 1,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        color: ["#8D4EDA", "#165DFF", "#00B2FF", "rgb(238 102 102)", "rgb(250 200 88)", "rgb(145 204 117)"],
        data: [
          { value: taskPending.value, name: "待处理" },
          { value: taskExtract.value, name: "提货" },
          { value: taskWarehousing.value, name: "入库" },
          { value: taskDelivery.value, name: "配送" },
          { value: taskInstall.value, name: "安装" },
          { value: taskComplete.value, name: "完成" },
        ],
      },
    ],
  }
})

const option3 = computed(() => {
  return {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "10",
      left: "50%",
      orient: "vertical", // 设置图例垂直显示
      data: [
        { name: "待处理", icon: "circle" },
        { name: "进行中", icon: "circle" },
        { name: "已完成", icon: "circle" },
      ],
    },
    series: [
      {
        name: "派工分布",
        type: "pie",
        radius: ["50%", "80%"],
        center: ["20%", "55%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 1,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        color: ["#8D4EDA", "#165DFF", "#00B2FF"],
        data: [
          { value: pendingCount.value, name: "待处理" },
          { value: progressCount.value, name: "进行中" },
          { value: completeCount.value, name: "已完成" },
        ],
      },
    ],
  }
})

onMounted(() => {
  proxy.$nextTick(() => {
    initEchart();
  })
  messageDataList();
  statisticalData();
  intervalId.value = setInterval(executeMessageDataList, 60000); // 60000 毫秒等于一分钟
})


const initEchart = () => {
  timer.value = setInterval(() => {
    chart1.value.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: currentTooltips.value,
    })
    chart2.value.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: currentTooltips.value,
    })
    chart3.value.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: currentTooltips.value,
    })
    currentTooltips.value++
    if (currentTooltips.value >= 3) {
      currentTooltips.value = 0
    }
  }, 3000)
}

const goTaskDetail = (item) => {
  let getParams = "id=" + item.id + "&neoid=" + item.neoid;
  let params = {
    id: item.id,
    questionType: item.questionType ? item.questionType : 0,
    name: item.name,
    caseStatus: 2,
    dealerAcceptanceTime: moment().format('YYYY-MM-DD HH:mm:ss')
  }
  if (item.caseStatus === 1) {
    processingTime(params, getParams)
  } else {
    proxy.$router.push(`/problem_report_details?${getParams}`);
  }
}

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
  } else {
    proxy.$router.push(`/problem_report_details?${getParams}`);
  }
}

const clickMenu = (url) => {
  proxy.$router.push(url)
}

onBeforeUnmount(() => {
  clearInterval(timer.value)
})


function padZero(num, length = 2) {
  return String(num).padStart(length, '0');
}

function executeMessageDataList() {
  // 调用 messageDataList 方法
  messageDataList();
  statisticalData();
}


function formatDate(date) {
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1); // 月份从0开始
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function formatDateTask(date) {
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1); // 月份从0开始
  const day = padZero(date.getDate());

  return `${year}-${month}-${day}`;
}

// 获取上个月开始时间
const currentDate = new Date();
const firstDayOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1, 0, 0, 0, 0);

// 获取本月开始时间
const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0, 0);

// 获取本月最后一天结束时间
const firstDayOfNextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1, 0, 0, 0, 0);
const lastDayOfMonth = new Date(firstDayOfNextMonth.getTime() - 1);


const messageDataList = () => {
  const currentTimeTimestamp = new Date().getTime();//当前时间
  let params = {
    "caseStatus": "1;2",
    "from": formatDate(firstDayOfMonth),
    "to": formatDate(lastDayOfMonth),
    "pageNo": 1,
    "pageSize": 100000
  };
  getServiceCasePage(params).then((res) => {
    let rtData = res.data;
    if (rtData.code == "success") {
      //将状态为待处理处理事件超3小时、已处理超24小时数据提取出来
      const CasePageList = rtData.data
      filteredData.value = CasePageList.map(item => {
        let text = '';
        let important = 0;

        // 判断 caseStatus 并设置 text 和 important
        if (item.caseStatus === 1 && item.createdTime) {
          const createTimeTimestamp = Date.parse(item.createdTime);
          let timeDifference = (currentTimeTimestamp - createTimeTimestamp) / (1000 * 60 * 60)
          if (timeDifference > 3) {
            text = `服务工单${item.caseNo}【创建时间】大于3小时，未处理`;
            important = 1;
            return {
              ...item,
              text,
              important
            };
          }
        }
        if (item.caseStatus === 2 && item.dealerAcceptanceTime) {
          const dealerAcceptanceTimeTimestamp = Date.parse(item.dealerAcceptanceTime);
          let timeDifference = (currentTimeTimestamp - dealerAcceptanceTimeTimestamp) / (1000 * 60 * 60)
          if (timeDifference > 24) {
            text = `服务工单${item.caseNo}【已受理时间】大于24小时，未处理`;
            important = 1;
            return {
              ...item,
              text,
              important
            };
          }
        }
        return undefined;
      }).filter(item => item !== undefined); // 过滤掉未定义的元素;
      return {
        filteredData
      };
    }
  });
};

//数据统计
const statisticalData = () => {
  let params = {
    "from": formatDate(firstDayOfLastMonth),
    "to": formatDate(lastDayOfMonth),
    "pageNo": 1,
    "pageSize": 10000
  };
  //当前订单
  getOrderListByPage(params).then((res) => {
    let rtData = res.data;
    let lastMonth = ref([])//上月数据
    let currentMonth = ref([])//当前月数据
    let lastMoney = 0;
    let currenMoney = 0;
    let retail = ref(0);
    let distribution = ref(0);
    let other = ref(0);
    if (rtData.code == "success") {
      const orders = rtData.data;
      // 遍历订单列表
      orders.forEach((order) => {
        if (order.createdTime && order.createdTime !== '' && typeof order.productsAmount === 'number' && !isNaN(order.productsAmount)) {
          const orderDate = new Date(order.createdTime); // 转换成日期对象
          // 判断订单是否属于上个月
          if (orderDate >= firstDayOfLastMonth && orderDate < firstDayOfMonth) {
            lastMonth.value.push(order); // 属于上个月
            lastMoney += order.productsAmount; // 将订单金额累加到上个月总额
          }
          if (orderDate >= firstDayOfMonth && orderDate <= lastDayOfMonth) {
            currentMonth.value.push(order); // 属于本月
            currenMoney += order.productsAmount; // 将订单金额累加到本月总额
            // 根据 typeOfSale__c 属性统计订单数量
            switch (order.typeOfSale__c) {
              case '零售':
                retail.value++;
                break;
              case '分配':
                distribution.value++;
                break;
              default:
                other.value++;
                break;
            }
          }
        }
      });
      currenAmount.value = currenMoney
      retailCount.value = retail.value
      distributionCount.value = distribution.value
      otherCount.value = other.value
      let difference: number = currenMoney - lastMoney
      let percentageChange = (difference / lastMoney) * 100;
      percentage.value = Number(percentageChange.toFixed(4))
      chart1.value.setOption(
        {
          series: [{
            data: [
              { value: distributionCount.value, name: "总部分配" },
              { value: retailCount.value, name: "零售订单" },
              { value: otherCount.value, name: "其他" },
            ]
          }]
        }
      )
    }
  });

  //任务分布
  let paramsTask = {
    "createdTimeStart": formatDateTask(firstDayOfLastMonth),
    "createdTimeEnd": formatDateTask(lastDayOfMonth),
    "pageNo": 1,
    "pageSize": 10000
  };
  getTaskByPage(paramsTask).then((res) => {
    let rtData = res.data;
    let lastMonth = ref([])//上月数据
    let currentMonth = ref([])//当前月数据
    let Pending = ref(0);
    let Extract = ref(0);
    let Warehousing = ref(0);
    let Delivery = ref(0);
    let Install = ref(0);
    let Complete = ref(0)
    if (rtData.code == "success") {
      const orders = rtData.data;
      // 遍历订单列表
      orders.forEach((order) => {
        if (order.createdTime && order.createdTime !== '') {
          const orderDate = new Date(order.createdTime); // 转换成日期对象
          // 判断订单是否属于上个月
          if (orderDate >= firstDayOfLastMonth && orderDate < firstDayOfMonth) {
            lastMonth.value.push(order); // 属于上个月
          }
          if (orderDate >= firstDayOfMonth && orderDate <= lastDayOfMonth) {
            currentMonth.value.push(order); // 属于本月
            // 根据 status 属性统计订单数量
            switch (order.status) {
              case 0:
                Pending.value++;//待处理
                break;
              case 2:
                Extract.value++;//提货
                break;
              case 3:
                Warehousing.value++;//入库
                break;
              case 4:
                Delivery.value++;//配送
                break;
              case 5:
                Install.value++;//安装
                break;
              default:
                Complete.value++;//完成
                break;
            }
          }
        }
      });

      taskPending.value = Pending.value
      taskExtract.value = Extract.value
      taskWarehousing.value = Warehousing.value
      taskDelivery.value = Delivery.value
      taskInstall.value = Install.value
      taskComplete.value = Complete.value
      lastMonthTask.value = lastMonth.value.length
      currentMonthTask.value = currentMonth.value.length
      taskNumber.value = Number(currentMonthTask.value) - Number(lastMonthTask.value)
      chart2.value.setOption(
        {
          series: [{
            data: [
              { value: taskPending.value, name: "待处理" },
              { value: taskExtract.value, name: "提货" },
              { value: taskWarehousing.value, name: "入库" },
              { value: taskDelivery.value, name: "配送" },
              { value: taskInstall.value, name: "安装" },
              { value: taskComplete.value, name: "完成" }
            ]
          }]
        }
      )
    }

  })

  //派工分布
  getFieldJobByPage(params).then((res) => {
    let rtData = res.data;
    let lastMonth = ref([])//上月数据
    let currentMonth = ref([])//当前月数据
    let pending = ref(0);
    let progress = ref(0);
    let complete = ref(0);
    if (rtData.code == "success") {
      const orders = rtData.data;
      // 遍历订单列表
      orders.forEach((order) => {
        if (order.createdTime && order.createdTime !== '') {
          const orderDate = new Date(order.createdTime); // 转换成日期对象
          // 判断订单是否属于上个月
          if (orderDate >= firstDayOfLastMonth && orderDate < firstDayOfMonth) {
            lastMonth.value.push(order); // 属于上个月
          }
          if (orderDate >= firstDayOfMonth && orderDate <= lastDayOfMonth) {
            currentMonth.value.push(order); // 属于本月
            // 根据 stage__c 属性统计派工类型数量
            switch (order.stage__c) {
              case 0:
                pending.value++;
                break;
              case 1:
                progress.value++;
                break;
              default:
                complete.value++;
                break;
            }
          }
        }
      });
      pendingCount.value = pending.value
      progressCount.value = progress.value
      completeCount.value = complete.value
      lastMonthlen.value = lastMonth.value.length
      currentMonthlen.value = currentMonth.value.length
      JobBynumber.value = Number(currentMonthlen.value) - Number(lastMonthlen.value)
      chart3.value.setOption(
        {
          series: [{
            data: [
              { value: pendingCount.value, name: "待处理" },
              { value: progressCount.value, name: "进行中" },
              { value: completeCount.value, name: "已完成" },
            ]
          }]
        }
      )
    }
  })

};


</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
