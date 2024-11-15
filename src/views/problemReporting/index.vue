<template>
  <div class="main">
    <span class="header"> 新建问题提报 </span>
    <span class="step">
      <span class="item">
        <span
          @click="changeStep(1)"
          :class="currentStep == 1 ? 'num_selected' : 'num'"
          >1</span
        >
        <span class="name"
          >选择订单信息
          <span class="remark">选择需要提报的订单</span>
        </span>
      </span>
      <span class="item">
        <span
          @click="changeStep(2)"
          :class="currentStep == 2 ? 'num_selected' : 'num'"
          >2</span
        >
        <span class="name"
          >输入提报问题
          <span class="remark">输入详细的问题描述</span>
        </span>
      </span>
      <span class="item">
        <span
          @click="changeStep(3)"
          :class="currentStep == 3 ? 'num_selected' : 'num'"
          >3</span
        >
        <span class="name"
          >输入提报问题
          <span class="remark">等待售服部处理</span>
        </span>
      </span>
    </span>
    <span class="content">
      <el-form
        v-if="currentStep == 1"
        :model="form"
        :rules="rule"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="订单编号" prop="orderNo">
          <el-input placeholder="请输入订单编号" v-model="form.orderNo" />
        </el-form-item>
        <el-form-item label="生产单号" prop="proNo">
          <el-input placeholder="输入生产单号" v-model="form.proNo" />
        </el-form-item>
        <el-form-item label="客户名称" prop="customerName">
          <el-input placeholder="输入客户名称" v-model="form.customerName" />
        </el-form-item>
        <el-form-item label="客户电话" prop="customerPhone">
          <el-input placeholder="输入客户电话" v-model="form.customerPhone" />
        </el-form-item>
      </el-form>
      <el-form
        v-if="currentStep == 2"
        :model="form"
        :rules="rule"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="提报人" prop="creater">
          <el-input v-model="form.creater" placeholder="默认订单编号" />
        </el-form-item>
        <el-form-item label="提报人电话" prop="createrPhone">
          <el-input v-model="form.createrPhone" placeholder="默认生产单号" />
        </el-form-item>
        <el-form-item label="客户地址" prop="customerAddress">
          <el-input v-model="form.customerAddress" placeholder="默认客户姓名" />
        </el-form-item>
        <el-form-item label="问题描述">
          <el-input
            v-model="form.pronlemDesc"
            :rows="5"
            type="textarea"
            maxlength="500"
            placeholder="请输入具体的售后问题描述"
            show-word-limit
          />
        </el-form-item>
      </el-form>
    </span>
    <span class="action_list">
      <el-button class="cancel_btn" v-if="currentStep == 1">取消</el-button>
      <el-button class="cancel_btn" v-if="currentStep == 2" @click="backStep">上一步</el-button>
      <el-button
        v-if="currentStep == 1"
        type="primary"
        class="primary_btn"
        @click="nextStep"
        >下一步</el-button
      >
      <el-button
        v-if="currentStep == 2"
        type="primary"
        class="primary_btn"
        @click="finish"
        >完成</el-button
      >
    </span>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, getCurrentInstance, reactive } from "vue"

const { proxy }: any = getCurrentInstance()

const currentStep = ref(1)

const form = reactive({
  orderNo: "",
  proNo: "",
  customerName: "",
  customerPhone: "",
  creater: "",
  createrPhone: "",
  customerAddress: "",
  pronlemDesc: "",
})

const rule = reactive({
  orderNo: [{ required: true, message: "请输入订单编号", trigger: "blur" }],
  proNo: [{ required: true, message: "请输入生产单号", trigger: "blur" }],
  customerName: [
    { required: true, message: "请输入客户名称", trigger: "blur" },
  ],
  customerPhone: [
    { required: true, message: "请输入客户电话", trigger: "blur" },
  ],
  creater: [{ required: true, message: "请输入提报人", trigger: "blur" }],
  createrPhone: [
    { required: true, message: "请输入提报人电话", trigger: "blur" },
  ],
  customerAddress: [
    { required: true, message: "请输入客户地址", trigger: "blur" },
  ],
  pronlemDesc: [{ required: true, message: "请输入问题描述", trigger: "blur" }],
})

const changeStep = (step) => {
  currentStep.value = step
}

const backStep = () =>{
  currentStep.value = 1
}

const nextStep = () => {
  currentStep.value = 2
}

const finish = () => {
  proxy.$message.success("新建问题提报完成!")
}
</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
