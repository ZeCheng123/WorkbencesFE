<template>
  <div class="main">
    <span class="header"><span class="title">售后工单</span> <el-button type="primary" class="tips_btn"><template #icon> <img src="@/assets/images/clock.png" alt=""> </template>售后工单草稿箱</el-button></span>
    <span class="search">
      <span class="left">
        <el-form
          :model="form"
          :rules="rule"
          label-width="80px"
          label-position="left"
        >
          <el-form-item label="工单编号">
            <el-input placeholder="请输入工单编号" v-model="form.workNo" />
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
                v-for="item in filterMethodOptions"
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
                v-for="item in orderStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </span>
      <span class="right">
        <el-button type="primary" class="search_btn"><template #icon> <img src="@/assets/images/search.png" alt=""> </template>查询</el-button>
        <el-button type="primary" class="reset_btn"><template #icon> <img src="@/assets/images/reset.png" alt=""> </template>重置</el-button>
      </span>
    </span>
    <span class="table_header">
      <span class="left">
        <img src="@/assets/images/logoXX.png" alt="" />
        <span class="title">经销商名称：梦天慈溪经销商</span>
      </span>
      <span class="right">
        <el-button type="primary" class="reset_btn"><template #icon> <img src="@/assets/images/download.png" alt=""> </template>下载</el-button>
      </span>
    </span>
    <span class="table">
      <el-table class="table_content" :data="tableData" :stripe="false" style="width: 100%">
        <el-table-column prop="text1" label="售后工单编号" />
        <el-table-column prop="text2" label="专卖店名称" />
        <el-table-column prop="text3" label="生产单号" />
        <el-table-column prop="text4" label="客户名称" />
        <el-table-column prop="text5" label="处理方式" />
        <el-table-column prop="text6" label="创建时间" />
        <el-table-column prop="text7" label="售后状态" />
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
  workNo: "",
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

const tableData = ref([
  {
    text1: "CS0011-06665-01",
    text2: "梦天慈溪经销商-专卖店A",
    text3: "H404304",
    text4: "李女士",
    text5: "售后重做",
    text6: "2021-02-28 10:30",
    text7: "已提报",
    text8: "",
  },
  {
    text1: "CS0011-06665-01",
    text2: "梦天慈溪经销商-专卖店A",
    text3: "H404304",
    text4: "李女士",
    text5: "售后重做",
    text6: "2021-02-28 10:30",
    text7: "已提报",
    text8: "",
  },
  {
    text1: "CS0011-06665-01",
    text2: "梦天慈溪经销商-专卖店A",
    text3: "H404304",
    text4: "李女士",
    text5: "售后重做",
    text6: "2021-02-28 10:30",
    text7: "已提报",
    text8: "",
  },
  {
    text1: "CS0011-06665-01",
    text2: "梦天慈溪经销商-专卖店A",
    text3: "H404304",
    text4: "李女士",
    text5: "售后重做",
    text6: "2021-02-28 10:30",
    text7: "已提报",
    text8: "",
  },
  {
    text1: "CS0011-06665-01",
    text2: "梦天慈溪经销商-专卖店A",
    text3: "H404304",
    text4: "李女士",
    text5: "售后重做",
    text6: "2021-02-28 10:30",
    text7: "已提报",
    text8: "",
  },
  {
    text1: "CS0011-06665-01",
    text2: "梦天慈溪经销商-专卖店A",
    text3: "H404304",
    text4: "李女士",
    text5: "售后重做",
    text6: "2021-02-28 10:30",
    text7: "已提报",
    text8: "",
  },
  {
    text1: "CS0011-06665-01",
    text2: "梦天慈溪经销商-专卖店A",
    text3: "H404304",
    text4: "李女士",
    text5: "售后重做",
    text6: "2021-02-28 10:30",
    text7: "已提报",
    text8: "",
  },
])

const viewDetails = () =>{
  proxy.$router.push("/aftersales_workorder_details");
}

</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
