<template>
  <div class="main">
    <span class="header"> 交付任务 </span>
    <span class="search">
      <span class="left">
        <el-form
          :model="form"
          :rules="rule"
          label-width="80px"
          label-position="left"
        >
          <el-form-item label="任务编号">
            <el-input placeholder="请输入任务编号" v-model="form.orderNo" />
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
                v-for="item in filterMethodPtions"
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
                v-for="item in orderStatusPtions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </span>
      <span class="right">
        <el-button type="primary" class="search_btn"
          ><template #icon>
            <img src="@/assets/images/search.png" alt="" /> </template
          >查询</el-button
        >
        <el-button type="primary" class="reset_btn"
          ><template #icon>
            <img src="@/assets/images/reset.png" alt="" /> </template
          >重置</el-button
        >
      </span>
    </span>
    <span class="table_header">
      <span class="left">
        <img src="@/assets/images/logoXX.png" alt="" />
        <span class="title">经销商名称：梦天慈溪经销商</span>
      </span>
      <span class="right">
        <el-button type="primary" class="reset_btn"
          ><template #icon>
            <img src="@/assets/images/download.png" alt="" /> </template
          >下载</el-button
        >
      </span>
    </span>
    <span class="table">
      <el-table
        class="table_content"
        :data="tableData"
        :stripe="false"
        style="width: 100%"
      >
        <el-table-column prop="text1" label="任务编号" />
        <el-table-column prop="text2" label="经销商负责人" />
        <el-table-column prop="text3" label="客户姓名" />
        <el-table-column prop="text4" label="剩余时间" />
        <el-table-column prop="text5" label="任务开始时间" />
        <el-table-column prop="text6" label="任务结束时间" />
        <el-table-column prop="text7" label="状态" />
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
  </div>
</template>


<script setup lang="ts">
import { ref, computed, getCurrentInstance, reactive } from "vue"

const { proxy }: any = getCurrentInstance()

const form = reactive({
  orderNo: "",
  customerName: "",
  customerPhone: "",
  filterMethod: "",
  createDate: [],
  orderStatus: "",
})

const filterMethodPtions = ref([
  {
    value: "all",
    label: "全部",
  },
])

const orderStatusPtions = ref([
  {
    value: "all",
    label: "全部",
  },
])

const tableData = ref([
  {
    text1: "TASK-20230301",
    text2: "李成敏",
    text3: "XXX",
    text4: "XX",
    text5: "2021-02-28 10:30",
    text6: "2021-02-29 10:30",
    text7: "提货",
    text8: "",
  },
  {
    text1: "TASK-20230301",
    text2: "李成敏",
    text3: "XXX",
    text4: "XX",
    text5: "2021-02-28 10:30",
    text6: "2021-02-29 10:30",
    text7: "提货",
    text8: "",
  },
  {
    text1: "TASK-20230301",
    text2: "李成敏",
    text3: "XXX",
    text4: "XX",
    text5: "2021-02-28 10:30",
    text6: "2021-02-29 10:30",
    text7: "提货",
    text8: "",
  },
  {
    text1: "TASK-20230301",
    text2: "李成敏",
    text3: "XXX",
    text4: "XX",
    text5: "2021-02-28 10:30",
    text6: "2021-02-29 10:30",
    text7: "提货",
    text8: "",
  },
  {
    text1: "TASK-20230301",
    text2: "李成敏",
    text3: "XXX",
    text4: "XX",
    text5: "2021-02-28 10:30",
    text6: "2021-02-29 10:30",
    text7: "提货",
    text8: "",
  },
  {
    text1: "TASK-20230301",
    text2: "李成敏",
    text3: "XXX",
    text4: "XX",
    text5: "2021-02-28 10:30",
    text6: "2021-02-29 10:30",
    text7: "提货",
    text8: "",
  },
  {
    text1: "TASK-20230301",
    text2: "李成敏",
    text3: "XXX",
    text4: "XX",
    text5: "2021-02-28 10:30",
    text6: "2021-02-29 10:30",
    text7: "提货",
    text8: "",
  },
])

const viewDetails = () => {
  proxy.$router.push("/delivery_tasks_details")
}
</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
