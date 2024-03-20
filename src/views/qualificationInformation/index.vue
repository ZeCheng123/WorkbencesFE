<template>
  <div class="main">
    <span class="header">
      <span class="title">资质阶段</span>
      <span class="step">
        <span class="item" @click="changeStep(1)">
          <span :class="currentStep == 1 ? 'num_selected' : 'num'">1</span>
          <span class="name">待准入</span>
        </span>
        <span class="item" @click="changeStep(2)">
          <span :class="currentStep == 2 ? 'num_selected' : 'num'">2</span>
          <span class="name">已准入</span>
        </span>
        <span class="item" @click="changeStep(3)">
          <span :class="currentStep == 3 ? 'num_selected' : 'num'">3</span>
          <span class="name">已退出</span>
        </span>
      </span>
    </span>
    <span class="base_info">
      <span class="title">基本信息</span>
      <span class="main_field">
        <span class="row_field">
          <span class="field">
            <span class="label">经销商名称：</span>
            <span class="value">慈溪市梦天经销商A</span>
            <span v-if="false" class="view">查看</span>
          </span>
          <span class="field">
            <span class="label">经销商区域：</span>
            <span class="value">华东</span>
          </span>
          <span class="field">
            <span class="label">资质信息：</span>
            <span class="value">示例</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">经销商评级：</span>
            <span class="value">大商A级</span>
          </span>
          <span class="field">
            <span class="label">经销商地址：</span>
            <span class="value">示例</span>
          </span>
          <span class="field">
            <span class="label">资质信息：</span>
            <span class="value">示例</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">资质信息：</span>
            <span class="value">示例</span>
          </span>
          <span class="field">
            <span class="label">资质信息：</span>
            <span class="value">示例</span>
          </span>
          <span class="field">
            <span class="label">资质信息：</span>
            <span class="value">示例</span>
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
      <span class="title" style="margin-top: 18px">管理人员</span>
      <span class="table">
        <el-table
          :data="tableData"
          :stripe="true"
          style="width: 100%"
        >
          <el-table-column prop="text1" label="人员编号" />
          <el-table-column prop="text2" label="专卖店名称" />
          <el-table-column prop="text3" label="资质认证" />
          <el-table-column prop="text4" label="客户姓名" />
          <el-table-column prop="text5" label="职位" />
          <el-table-column prop="text6" label="创建时间" />
          <el-table-column prop="text7" label="人员状态" />
          <el-table-column prop="text8" label="操作" width="80px">
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
  </div>
</template>


<script setup lang="ts">
import { ref, computed, getCurrentInstance, reactive } from "vue"

const { proxy }: any = getCurrentInstance()

const currentStep = ref(1)

const tableData = ref([
  {
    text1: "CS0011-06665-01",
    text2: "梦天慈溪经销商-专卖店A",
    text3: "已完成",
    text4: "李女士",
    text5: "管理人员",
    text6: "2021-02-28 10:30",
    text7: "在岗",
    text8: "",
  },
  {
    text1: "CS0011-06665-01",
    text2: "梦天慈溪经销商-专卖店A",
    text3: "已完成",
    text4: "李女士",
    text5: "安装派工",
    text6: "2021-02-28 10:30",
    text7: "在岗",
    text8: "",
  },
  {
    text1: "CS0011-06665-01",
    text2: "梦天慈溪经销商-专卖店A",
    text3: "已完成",
    text4: "李女士",
    text5: "安装派工",
    text6: "2021-02-28 10:30",
    text7: "在岗",
    text8: "",
  },
  {
    text1: "CS0011-06665-01",
    text2: "梦天慈溪经销商-专卖店A",
    text3: "已完成",
    text4: "李女士",
    text5: "安装派工",
    text6: "2021-02-28 10:30",
    text7: "在岗",
    text8: "",
  },
  {
    text1: "CS0011-06665-01",
    text2: "梦天慈溪经销商-专卖店A",
    text3: "已完成",
    text4: "李女士",
    text5: "安装派工",
    text6: "2021-02-28 10:30",
    text7: "在岗",
    text8: "",
  },
  {
    text1: "CS0011-06665-01",
    text2: "梦天慈溪经销商-专卖店A",
    text3: "已完成",
    text4: "李女士",
    text5: "安装派工",
    text6: "2021-02-28 10:30",
    text7: "在岗",
    text8: "",
  },
  {
    text1: "CS0011-06665-01",
    text2: "梦天慈溪经销商-专卖店A",
    text3: "已完成",
    text4: "李女士",
    text5: "安装派工",
    text6: "2021-02-28 10:30",
    text7: "在岗",
    text8: "",
  },
])

const changeStep = (step) => {
  currentStep.value = step
}
</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
