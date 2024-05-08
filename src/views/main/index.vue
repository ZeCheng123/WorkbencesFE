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
              <span class="num">¥{{ currenAmount }}</span>
              <span class="desc">
                <span class="text1">较上月</span>
                <span class="text2">20%</span>
                <span class="text3"><img src="@/assets/images/up.png" alt="" /></span>
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
              <span class="num">12</span>
              <span class="desc">
                <span class="text1">较上月</span>
                <span class="text2">6</span>
                <span class="text3"><img src="@/assets/images/up.png" alt="" /></span>
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
            <span class="num">12</span>
            <span class="desc">
              <span class="text1">较上月</span>
              <span class="text2">2</span>
              <span class="text3"><img src="@/assets/images/up.png" alt="" /></span>
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
import { getServiceCasePage, createServiceCase, getOrderListByPage } from '../../api/common.js'
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
        color: ["#8D4EDA", "#165DFF", "#00B2FF"],
        data: [
          { value: 1048, name: "待处理" },
          { value: 735, name: "进行中" },
          { value: 580, name: "已完成" },
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
          { value: 1048, name: "待处理" },
          { value: 735, name: "进行中" },
          { value: 580, name: "已完成" },
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
  console.log("item", item.id)
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
  getOrderListByPage(params).then((res) => {
    let rtData = res.data;
    let lastMonth = ref([])//上月数据
    let currentMonth = ref([])//当前月数据
    if (rtData.code == "success") {
      const orders = rtData.data;
      // 遍历订单列表
      orders.forEach((order) => {
        if (order.createdTime && order.createdTime !== '' && typeof order.productsAmount === 'number' && !isNaN(order.productsAmount)) {
          const orderDate = new Date(order.createdTime); // 转换成日期对象
          // 判断订单是否属于上个月
          if (orderDate >= firstDayOfLastMonth && orderDate < firstDayOfMonth) {
            lastMonth.value.push(order); // 属于上个月
            lastAmount.value += order.productsAmount; // 将订单金额累加到上个月总额
          }
          if (orderDate >= firstDayOfMonth && orderDate <= lastDayOfMonth) {
            currentMonth.value.push(order); // 属于本月
            currenAmount.value += order.productsAmount; // 将订单金额累加到本月总额
            // 根据 typeOfSale__c 属性统计订单数量
            switch (order.typeOfSale__c) {
              case '零售':
                retailCount.value++;
                break;
              case '分配':
                distributionCount.value++;
                break;
              default:
                otherCount.value++;
                break;
            }
          }
        }
      });

      // 现在 lastMonth 和 currentMonth 已经被分类
      console.log('上月订单:', lastMonth.value);
      console.log('本月订单:', currentMonth.value);
      console.log('上个月总额:', lastAmount.value);
      console.log('本月总额:', currenAmount.value);
      console.log('零售订单数量:', retailCount.value);
      console.log('分配订单数量:', distributionCount.value);
      console.log('其他订单数量:', otherCount.value);

      console.info("重新设置：：", chart1.value)
      console.info("重新设置：：", retailCount.value, distributionCount.value, otherCount.value)
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
};


</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
