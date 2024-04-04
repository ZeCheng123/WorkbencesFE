<template>
  <div class="main">
    <span class="header">
      <span class="title">派工单状态</span>
      <span class="step">
        <span class="item" @click="changeStep(1)">
          <span :class="currentStep == 1 ? 'num_selected' : 'num'">1</span>
          <span :class="currentStep >= 1 ? 'name_selected' : 'name'"
            >已新建</span
          >
        </span>
        <span class="item" @click="changeStep(2)">
          <span :class="currentStep == 2 ? 'num_selected' : 'num'">2</span>
          <span :class="currentStep >= 2 ? 'name_selected' : 'name'"
            >待开始</span
          >
        </span>
        <span class="item" @click="changeStep(3)">
          <span :class="currentStep == 3 ? 'num_selected' : 'num'">3</span>
          <span :class="currentStep >= 3 ? 'name_selected' : 'name'"
            >进行中</span
          >
        </span>
        <span class="item" @click="changeStep(4)">
          <span :class="currentStep == 4 ? 'num_selected' : 'num'">4</span>
          <span :class="currentStep >= 4 ? 'name_selected' : 'name'"
            >已完成</span
          >
        </span>
        <span class="item" @click="changeStep(5)">
          <span :class="currentStep == 5 ? 'num_selected' : 'num'">5</span>
          <span :class="currentStep >= 5 ? 'name_selected' : 'name'"
            >已评价</span
          >
        </span>
      </span>
    </span>
    <span class="order_info">
      <span class="title">派工单详情</span>
      <span class="main_field">
        <span class="row_field">
          <span class="field">
            <span class="label">派工编号：</span>
            <span class="value">PG202460007</span>
            <span v-if="false" class="view">查看</span>
          </span>
          <span class="field">
            <span class="label">派工类型：</span>
            <span class="value">安装派工</span>
          </span>
          <span class="field">
            <span class="label">派工状态：</span>
            <span class="value">进行中</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">服务技工：</span>
            <span class="value">李工</span>
          </span>
          <span class="field">
            <span class="label">服务技工电话：</span>
            <span class="value">18563234123</span>
          </span>
          <span class="field">
            <span class="label">客户地址：</span>
            <span class="value">xxx</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">客户姓名：</span>
            <span class="value">李女士</span>
          </span>
          <span class="field">
            <span class="label">客户电话：</span>
            <span class="value">185632326688</span>
          </span>
        </span>
      </span>
      <span class="title">派工要求</span>
      <span class="other_field">
        <span class="row_field">
          <span class="field">
            <span class="label">计划开始：</span>
            <span class="value">日期/时间</span>
          </span>
          <span class="field">
            <span class="label">计划开始：</span>
            <span class="value">日期/时间</span>
          </span>
          <span class="field">
            <span class="label">优先级：</span>
            <span class="value">高/中/低</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">是否具备安装条件：</span>
            <span class="value">是</span>
          </span>
          <!-- <span class="field">
            <span class="label">示例字段：</span>
            <span class="value">示例</span>
          </span>
          <span class="field">
            <span class="label">示例字段：</span>
            <span class="value">示例</span>
          </span> -->
        </span>
      </span>
    </span>
    <span class="service_evaluation_list">
      <span class="table_title">服务评价</span>
      <span class="table_content">
        <el-table
          :data="tableDataServiceEvaluation"
          :stripe="false"
          style="width: 100%"
        >
          <el-table-column prop="text1" label="服务评价号" />
          <el-table-column prop="text2" label="状态" />
          <el-table-column prop="text3" label="其它字段" />
          <el-table-column prop="text4" label="服务技工" />
          <!-- <el-table-column prop="text5" label="创建时间" /> -->
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
    <span class="dispatch_attachment_list">
      <span class="table_title">派工附件</span>
      <span class="table_content">
        <el-table
          :data="tableDataDispatchAttachment"
          :stripe="false"
          style="width: 100%"
        >
          <el-table-column prop="text1" label="附件编号" />
          <el-table-column prop="text2" label="状态" />
          <el-table-column prop="text3" label="附件链接" />
          <el-table-column prop="text4" label="操作" width="80px">
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
    <span class="action_list">
      <div class="left">
        <img src="@/assets/images/comment.png" alt="" />
        <span class="initiate_comments" @click="initiateComments"
          >发起任务评论</span
        >
      </div>
      <div class="right">
        <el-button type="primary" @click="initiateComments" class="primary_btn"
          >编辑</el-button
        >
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
  </div>
</template>


<script setup lang="ts">
import { ref, computed, getCurrentInstance, reactive } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"

const { proxy }: any = getCurrentInstance()

const currentStep = ref(3)

const commentList = ref<any>([])

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
])

const tableDataServiceEvaluation = ref([
  {
    text1: "SU2024030101",
    text2: "已评价",
    text3: "示例字段...",
    text4: "李工",
    text5: "2021-02-28 10:30:50",
    text6: "",
  },
])

const tableDataDispatchAttachment = ref([
  {
    text1: "SU2024030101",
    text2: "已上传",
    text3: "image.com...",
    text4: "李工",
    text5: "",
  },
])

const changeStep = (step) => {
  currentStep.value = step
}

const initiateComments = () => {
  ElMessageBox.prompt("请填写评论内容", "发起评论", {
    inputPattern: /\S/,
    inputErrorMessage: "评论内容不能为空!",
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
