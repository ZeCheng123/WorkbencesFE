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
            <div class="menu" @click="clickMenu('order_center')">
              <img class="icon" src="@/assets/images/menu_icon.png" alt="" />
              <label class="name">交付任务</label>
              <span class="tips">1</span>
            </div>
            <div class="menu" @click="clickMenu('problem_reporting')">
              <!-- <img class="icon" src="@/assets/images/menu_icon.png" alt="" />
              <label class="name">问题提报</label> -->
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
              <img class="icon" src="@/assets/images/menu_icon.png" alt="" />
              <label class="name">服务评价</label>
            </div>
            <div class="line"></div>
          </div>
          <div class="item">
            <div class="menu" @click="clickMenu('problem_reporting')">
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
              >您的李女士订单SO20240221-0002已到上海物流中心，请点击执行提货...</span
            >
            <span hidden class="important">重要</span>
          </div>
          <div class="list_item" @click="goTaskDetail">
            <span class="type message">消息</span>
            <span class="tips"
              >您的李女士订单SO20240221-0002已到上海物流中心，请点击执行提货...</span
            >
            <span hidden class="important">重要</span>
          </div>
          <div class="list_item" @click="goTaskDetail">
            <span class="type message">消息</span>
            <span class="tips"
              >您的李女士订单SO20240221-0002已到上海物流中心，请点击执行提货...</span
            >
            <span hidden class="important">重要</span>
          </div>
          <div class="list_item" @click="goTaskDetail">
            <span class="type message">消息</span>
            <span class="tips"
              >您的李女士订单SO20240221-0002已到上海物流中心，请点击执行提货...</span
            >
            <span hidden class="important">重要</span>
          </div>
          <div class="list_item" @click="goTaskDetail">
            <span class="type message">消息</span>
            <span class="tips"
              >您的李女士订单SO20240221-0002已到上海物流中心，请点击执行提货...</span
            >
            <span hidden class="important">重要</span>
          </div>
          <div class="list_item" @click="goTaskDetail">
            <span class="type message">消息</span>
            <span class="tips"
              >您的李女士订单SO20240221-0002已到上海物流中心，请点击执行提货...</span
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
          <span class="title">订单总额</span>
          <span class="content">
            <div class="left">
               <span class="num">¥233,000</span>
               <span class="desc">
                 <span class="text1">较上月</span>
                 <span class="text2">20%</span>
                 <span class="text3"><img src="@/assets/images/up.png" alt=""></span>
               </span>
            </div>
            <div class="right">
              <e-charts class="chart" :option="option1" />
            </div>
          </span>
        </div>
        <div class="aftersales_workorder">
           <span class="title">本月售后订单</span>
           <span class="content">
              <div class="left">
                <span class="num">12</span>
                <span class="desc">
                  <span class="text1">较上月</span>
                  <span class="text2">6</span>
                  <span class="text3"><img src="@/assets/images/up.png" alt=""></span>
                </span>
              </div>
              <div class="right">
                <e-charts class="chart" :option="option2" />
              </div>
           </span>
        </div>
      </div>
      <div class="bottom">
        <div class="header">
          <label class="label">帮助文档 (跳转)</label>
          <label class="more">查看更多</label>
        </div>
        <div class="list">
          <label class="list_item">梦天产品</label>
          <label class="list_item">使用指南</label>
        </div>
        <div class="list">
          <label class="list_item">培训手册</label>
          <label class="list_item">活动指南</label>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, getCurrentInstance } from "vue"
const { proxy }: any = getCurrentInstance();

const option1 = computed(() => {
  return {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "10",
      left: "50%",
      orient: 'vertical', // 设置图例垂直显示
      data: [
        { name: '总部分配', icon: 'circle'},
        { name: '零售订单', icon: 'circle'},
        { name: '其他', icon: 'circle'}
      ],
    },
    series: [
      {
        name: "订单总额",
        type: "pie",
        radius: ["50%", "80%"],
        center: ["20%","55%"],
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
        color: ["#8D4EDA","#165DFF","#00B2FF"],
        data: [
          { value: 1048, name: "总部分配" },
          { value: 735, name: "零售订单" },
          { value: 580, name: "其他" }
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
      orient: 'vertical', // 设置图例垂直显示
      data: [
            { name: '待处理', icon: 'circle'},
            { name: '进行中', icon: 'circle'},
            { name: '已完成', icon: 'circle'}
      ],
    },
    series: [
      {
        name: "本月售后工单",
        type: "pie",
        radius: ["50%", "80%"],
        center: ["20%","55%"],
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
        color: ["#8D4EDA","#165DFF","#00B2FF"],
        data: [
          { value: 1048, name: "待处理" },
          { value: 735, name: "进行中" },
          { value: 580, name: "已完成" }
        ],
      },
    ],
  }
})

const goTaskDetail = () =>{
  proxy.$router.push("/task_details");
}

const clickMenu = (url) =>{
  proxy.$router.push(url);
}


</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
