<template>
  <div class="main">
    <div class="main_left">
      <img
        class="main_header_image"
        src="@/assets/images/main_header_image.png"
        alt="Logo"
      />
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
            <div class="menu" @click="clickMenu('service_workorder')">
              <img class="icon" src="@/assets/images/menu_icon.png" alt="" />
              <label class="name">服务评价</label>
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
          <div class="item"><div class="end"></div></div>
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
          <div class="list_item" @click="goTaskDetail">
            <span class="type task">任务</span>
            <span class="tips"
              >您的李女士订单SO20240221-0002已到上海物流中心，请点击执行提货...</span
            >
            <span class="important">重要</span>
          </div>
          <div class="list_item" @click="goTaskDetail">
            <span class="type activity">活动</span>
            <span class="tips"
              >您的郭女士订单SO20240221-0002已到上海物流中心，请点击执行提货...</span
            >
            <span hidden class="important">重要</span>
          </div>
          <div class="list_item" @click="goTaskDetail">
            <span class="type message">消息</span>
            <span class="tips"
              >您的刘女士订单SO20240221-0002已到上海物流中心，请点击执行提货...</span
            >
            <span hidden class="important">重要</span>
          </div>
          <div class="list_item" @click="goTaskDetail">
            <span class="type message">消息</span>
            <span class="tips"
              >您的黄先生订单SO20240221-0002已到上海物流中心，请点击执行提货...</span
            >
            <span hidden class="important">重要</span>
          </div>
        </div>
      </div>
    </div>
    <div class="main_right">
      <div class="top">
        <div class="other_function">
          <div class="title">其他功能</div>
          <div class="menu">
            <div class="item">
              <img class="icon" src="@/assets/images/menu_icon.png" alt="" />
              <span class="name">用户信息</span>
            </div>
            <div class="item" style="margin-left: 30px">
              <img class="icon" src="@/assets/images/data_report.png" alt="" />
              <span class="name">数据报表</span>
            </div>
          </div>
        </div>
        <div class="total_order_amount">
          <span class="title">当前订单</span>
          <span class="content">
            <div class="left">
              <span class="num">¥233,000</span>
              <span class="desc">
                <span class="text1">较上月</span>
                <span class="text2">20%</span>
                <span class="text3"
                  ><img src="@/assets/images/up.png" alt=""
                /></span>
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
                <span class="text3"
                  ><img src="@/assets/images/up.png" alt=""
                /></span>
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
              <span class="text3"
                ><img src="@/assets/images/up.png" alt=""
              /></span>
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
import { ref, computed, getCurrentInstance, onMounted, onBeforeUnmount } from "vue"
import * as echarts from "echarts"
const { proxy }: any = getCurrentInstance()

const timer = ref(null)

const chart1 = ref(null)

const chart2 = ref(null)

const chart3 = ref(null)

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
          { value: 1048, name: "总部分配" },
          { value: 735, name: "零售订单" },
          { value: 580, name: "其他" },
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
  proxy.$nextTick(() =>{
    initEchart();
  })
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

const goTaskDetail = () => {
  proxy.$router.push("task_details")
}

const clickMenu = (url) => {
  console.log(url)
  proxy.$router.push(url)
}

onBeforeUnmount(() =>{
  clearInterval(timer.value)
})

</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
