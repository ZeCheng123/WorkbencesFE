<template>
  <div class="main">
    <span class="header"> 订单中心 </span>
    <span class="search">
      <span class="left">
        <el-form :model="form" :rules="rule" label-width="80px" label-position="left">
          <el-form-item label="订单编号">
            <el-input placeholder="请输入任务编号" v-model="form.orderNo" />
          </el-form-item>
          <el-form-item label="客户姓名">
            <el-input placeholder="输入客户姓名" v-model="form.customerName" />
          </el-form-item>
          <el-form-item label="客户电话">
            <el-input placeholder="请输入客户电话" v-model="form.customerName" />
          </el-form-item>
        </el-form>
        <el-form :model="form" :rules="rule" label-width="80px" label-position="left">
          <el-form-item label="创建时间">
            <el-date-picker v-model="form.createDate" type="daterange" range-separator="~" start-placeholder="开始时间"
              end-placeholder="结束时间" />
          </el-form-item>
					<el-form-item label="订单状态">
						<el-select v-model="form.orderStatus" placeholder="请选择订单状态">
							<el-option v-for="item in orderStatusPtions" :key="item.code" :label="item.name"
								:value="item.code" />
						</el-select>
					</el-form-item>
          <span style="width:336px;height:32px"></span>
          <!-- <el-form-item label="筛选方式">
            <el-select v-model="form.filterMethod" placeholder="请选择筛选方式">
              <el-option
                v-for="item in filterMethodPtions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item> -->
        </el-form>
      </span>
      <span class="right">
        <el-button @click="getList(true)" type="primary" class="search_btn"><template #icon>
            <img src="@/assets/images/search.png" alt="" /> </template>查询</el-button>
        <el-button @click="resetting()" type="primary" class="reset_btn"><template #icon>
            <img src="@/assets/images/reset.png" alt="" /> </template>重置</el-button>
      </span>
    </span>
    <span class="table_header">
      <span class="left">
        <img src="@/assets/images/logoXX.png" alt="" />
        <span class="title">
          <!-- 经销商名称：梦天慈溪经销商 -->
        </span>
      </span>
      <span class="right">
        <el-button type="primary" class="reset_btn"><template #icon>
            <img src="@/assets/images/download.png" alt="" /> </template>下载</el-button>
      </span>
    </span>
    <span class="table">
      <el-table class="table_content" :data="tableData" :stripe="false" style="width: 100%">
        <el-table-column prop="po" label="订单编号" />
        <el-table-column prop="storeName__c" label="专卖店名称" />
        <el-table-column prop="distributorId__c" label="专卖店编号" />
        <el-table-column prop="account_name__c" label="客户名称" />
        <el-table-column prop="productionOrderNo__c" label="生产单号" />
        <el-table-column prop="created_time" label="创建时间" />
				<el-table-column prop="status" label="状态" >
					<template #default="scope">
				  		<div style="display:flex;align-items:center;">
						{{scope.row.status_c?(orderStatusPtions.find(val=>val["code"]==scope.row.status_c)?.name):"待开始"}}
						</div>
					</template>
				</el-table-column>
      <el-table-column prop="text8" label="操作" width="80px">
        <template #default="scope">
          <div style="
                display: flex;
                align-items: center;
                color: #165dff;
                cursor: pointer;
              " @click="viewDetails(scope.row)">
            查看
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="table_pagination" :page-size="20" :pager-count="11" layout="total, prev, pager, next"
      :total="1000" />
  </span>
</div></template>


<script setup lang="ts">
import { ref, computed, getCurrentInstance, reactive, onMounted } from "vue"
import { getOrderList } from '../../api/common.js'
import { ElMessage } from "element-plus";

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
    code: "all",
    name: "全部",
  },
  {
    code: "0",
    name: "正在录单",
  },
  {
    code: "1",
    name: "已打单",
  },
  {
    code: "2",
    name: "已入成品库",
  },
  {
    code: "3",
    name: "已提交",
  },
  {
    code: "4",
    name: "已生产下单",
  },
  {
    code: "5",
    name: "已发货",
  },
  {
    code: "6",
    name: "已订单审核",
  },
  {
    code: "7",
    name: "已财务审核",
  },
  {
    code: "8",
    name: "已经销商确认",
  },
  {
    code: "9",
    name: "已物料产能稽核",
  },
  {
    code: "10",
    name: "已物流到货",
  },
  {
    code: "11",
    name: "已白坏稽核",
  },
  {
    code: "12",
    name: "已经销商收货",
  },
  {
    code: "13",
    name: "已油漆",
  },
  {
    code: "14",
    name: "订单完结",
  },
  {
    code: "15",
    name: "已包装",
  },
  {
    code: "16",
    name: "锁定",
  }
])

const tableData = ref([])

onMounted(() => {
  getList(false);
});

const getList = (isTure: boolean) => {
  const orderNo = form.orderNo;
  const customerName = form.customerName
  const customerPhone = form.customerPhone

  let param = { "po": orderNo, "account_name__c": customerName }
  getOrderList(param).then((res: any) => {
    let data = res.data.data
    if (data.length > 0) {
      tableData.value = data
      if (isTure) {
        ElMessage({
          message: '查询成功',
          type: 'success'
        })
      }
    } else {
      ElMessage({
        message: '获取数据失败',
        type: 'error'
      })
    }

  }).catch((error: any) => {
    // 显示请求失败的提示框
    ElMessage({
      message: '请求数据失败，请重试',
      type: 'error'
    });
    console.error('请求数据失败:', error);
  });
}


const viewDetails = (row: any) => {
  // proxy.$router.push("/historical_orders_details")
  proxy.$router.push({
    path: "/historical_orders_details", query: {
      id: row.id,
      po: row.po,
      status_c:row.status_c
    },
  });
}

//重置按钮
const resetting = () => {
  form.orderNo = null
  form.customerName = null
  form.customerPhone = null
  form.filterMethod = null
  form.createDate = []
  form.orderStatus = null
  getList(false)
}
</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
