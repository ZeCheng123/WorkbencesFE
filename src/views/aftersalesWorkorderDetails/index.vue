<template>
  <div class="main">
    <span class="header">
      <span class="title">售后工单状态</span>
      <span class="step">
        <span class="item" @click="changeStep(1)">
          <span :class="currentStep == 1 ? 'num_selected' : 'num'">1</span>
          <span class="name">...</span>
        </span>
        <span class="item" @click="changeStep(2)">
          <span :class="currentStep == 2 ? 'num_selected' : 'num'">2</span>
          <span class="name">已包装</span>
        </span>
        <span class="item" @click="changeStep(3)">
          <span :class="currentStep == 3 ? 'num_selected' : 'num'">3</span>
          <span class="name">已定损</span>
        </span>
        <span class="item" @click="changeStep(4)">
          <span :class="currentStep == 4 ? 'num_selected' : 'num'">4</span>
          <span class="name">已追责</span>
        </span>
        <span class="item" @click="changeStep(5)">
          <span :class="currentStep == 5 ? 'num_selected' : 'num'">5</span>
          <span class="name">已财务审核</span>
        </span>
        <span class="item" @click="changeStep(6)">
          <span :class="currentStep == 6 ? 'num_selected' : 'num'">6</span>
          <span class="name">已经销商审核</span>
        </span>
        <span class="item" @click="changeStep(7)">
          <span :class="currentStep == 7 ? 'num_selected' : 'num'">7</span>
          <span class="name">...</span>
        </span>
      </span>
    </span>
    <span class="order_info">
      <span class="title">售后工单详情</span>
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
            <span class="value">SH202260007</span>
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
    <span class="order_list">
      <span class="table_title">售后工单明细</span>
      <span class="table_content">
        <el-table
          :data="tableDataOrderDetials"
          :stripe="true"
          style="width: 100%"
        >
          <el-table-column prop="text1" label="订单明细编号" />
          <el-table-column prop="text2" label="大类" />
          <el-table-column prop="text3" label="其他字段" />
          <el-table-column prop="text4" label="油漆颜色" />
          <el-table-column prop="text5" label="修改时间" />
          <el-table-column prop="text6" label="创建时间" />
          <el-table-column prop="text7" label="操作" width="80px">
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
          <el-table-column prop="text7" label="定责与定损" width="80px">
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
      <el-pagination
        class="table_pagination"
        :page-size="20"
        :pager-count="11"
        layout="total, prev, pager, next"
        :total="50"
      />
    </span>
    <span class="service_evaluation_list">
      <span class="table_title">服务评价</span>
      <span class="table_content">
        <el-table
          :data="tableDataServiceEvaluation"
          :stripe="true"
          style="width: 100%"
        >
          <el-table-column prop="text1" label="服务评价号" />
          <el-table-column prop="text2" label="状态" />
          <el-table-column prop="text3" label="其它字段" />
          <el-table-column prop="text4" label="整体满意度" />
          <el-table-column prop="text5" label="创建时间" />
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
      <el-pagination
        class="table_pagination"
        :page-size="20"
        :pager-count="11"
        layout="total, prev, pager, next"
        :total="50"
      />
    </span>
    <span class="message_notes_list">
      <span class="table_title">留言备注</span>
      <span class="table_content">
        <el-table
          :data="tableDataMessageNotes"
          :stripe="true"
          style="width: 100%"
        >
          <el-table-column prop="text1" label="留言描述" width="300" />
          <el-table-column prop="text2" label="状态" width="200" />
          <el-table-column prop="text3" label="其它字段" width="200" />
          <el-table-column prop="" label="" />
        </el-table>
      </span>
    </span>
    <span class="aciton_list">
      <el-button type="primary" class="cancel_btn">一键评价</el-button>
      <el-button type="primary" class="primary_btn">留言备注</el-button>
    </span>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, getCurrentInstance, reactive } from "vue"

const { proxy }: any = getCurrentInstance()

const currentStep = ref(4)

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
  {
    text1: "SU2024030101",
    text2: "已评价",
    text3: "示例字段...",
    text4: "满意",
    text5: "2021-02-28 10:30:50",
    text6: "",
  },
  {
    text1: "SU2024030101",
    text2: "已评价",
    text3: "示例字段...",
    text4: "满意",
    text5: "2021-02-28 10:30:50",
    text6: "",
  },
  {
    text1: "SU2024030101",
    text2: "已评价",
    text3: "示例字段...",
    text4: "满意",
    text5: "2021-02-28 10:30:50",
    text6: "",
  },
])

const tableDataMessageNotes = ref([
  {
    text1: "售后工单非常紧急，请尽快...",
    text2: "已留言",
    text3: "示例字段...",
  }
])

const changeStep = (step) => {
  currentStep.value = step
}
</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
