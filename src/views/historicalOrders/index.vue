<template>
  <div class="main">
    <span class="header"> 订单中心 </span>
    <span class="search">
      <span class="left">
        <el-form :model="form"  label-width="80px" label-position="left">
          <el-form-item label="订单编号">
            <el-input placeholder="请输入任务编号" v-model="form.orderNo" />
          </el-form-item>
          <el-form-item label="客户姓名">
            <el-input placeholder="输入客户姓名" v-model="form.customerName" />
          </el-form-item>
          <el-form-item label="客户电话">
            <el-input placeholder="请输入客户电话" v-model="form.customerPhone" />
          </el-form-item>
        </el-form>
        <el-form :model="form"  label-width="80px" label-position="left">
          <el-form-item label="创建时间">
            <el-date-picker v-model="form.createDate" type="daterange" range-separator="~" start-placeholder="开始时间"
              end-placeholder="结束时间" value-format="YYYY-MM-DD"/>
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
    <span class="table" ref="mainTable">
      <el-table class="table_content" :data="tableData" :stripe="false" style="width: 100%">
        <el-table-column prop="po" label="订单编号" />
        <el-table-column prop="storeName__c" label="专卖店名称" />
        <el-table-column prop="storeNo" label="专卖店编号" />
        <el-table-column prop="accountName__C" label="客户名称" />
        <el-table-column prop="customerAddress" label="客户地址" />
        <el-table-column prop="productionOrderNo__c" label="生产单号" />
        <el-table-column prop="createdTime" label="创建时间" />
				<el-table-column prop="status__c" label="状态" >
					<!-- <template #default="scope">
				  		<div style="display:flex;align-items:center;">
						{{scope.row.status_c?(orderStatusPtions.find(val=>val["code"]==scope.row.status_c)?.name):"待开始"}}
						</div>
					</template> -->
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
    <el-pagination class="table_pagination" 
			:page-size="pageConfig.pageSize"
			:pager-count="15"
			layout="total, prev, pager, next"
			:total="pageConfig.total"
			@current-change="handleCurrentChange" />
  </span>
</div></template>


<script setup lang="ts">
import { ref, computed, getCurrentInstance, reactive, onMounted } from "vue"
import { getOrderList,getOrderListByPage } from '../../api/common.js'
import { ElMessage } from "element-plus";
import _ from "lodash"

const { proxy }: any = getCurrentInstance()

const form = reactive({
  orderNo: "",
  customerName: "",
  customerPhone: "",
  filterMethod: "",
  createDate: [],
  orderStatus: "",
})

const pageConfig = ref({
		  pageIndex: 1,
		  pageSize: 15,
		  total: 0
		});

const filterMethodPtions = ref([
  {
    value: "all",
    label: "全部",
  },
])

const orderStatusPtions = ref([
  {
    code: "",
    name: "全部",
  },
  {
    code: "已发货",
    name: "已发货",
  },
  {
    code: "已财务审批",
    name: "已财务审批",
  },
  {
    code: "已废弃",
    name: "已废弃",
  }
])

const tableData = ref([])

const mainTable = ref(null);

onMounted(() => {
  getList(false);
  const standardScale = (("100%") as any) / (("100%") as any);
  window.addEventListener("resize", _.debounce(function (){
    const docHeight = document.body.clientHeight;
    const docWidth = document.body.clientWidth;
    if(docWidth < 1680)
    {
      const currentSacle = docHeight / docWidth;
      let [scale, translate]:any = [0,0];
      if(currentSacle < standardScale){
        // 以高度计算
        scale = docHeight / 1080;
        const shouleWidth = 1920 * scale;
        const offsetWidth = docWidth - shouleWidth;
        translate = offsetWidth > 0 ? `translate(${offsetWidth / 2}px, 0)` : "";
      }
      else{
        // 以宽度计算
        scale = (docWidth-20) / 1920;
        const shouleHeight = 1080 * scale;
        const offsetHeight = docHeight - shouleHeight;
        translate =  offsetHeight > 0 ? `translate(0, ${offsetHeight / 2}px)` : "";
      }
      if(currentSacle < 0.52){
        let height = (document.body.clientHeight / scale) - (242 * scale) - 10;
        if(mainTable.value){
          mainTable.value.style.height = `${height}px`;
        }
      }
      else{
        if(mainTable.value){
          let height = (document.body.clientHeight * scale) + (242 * scale) + 10;
        //   mainTable.value.style.height = `unset`;
          mainTable.value.style.height = `${height}px`;
        }
      }

    }
    else{
      if(mainTable.value){
        mainTable.value.style.height = `calc(${document.body.clientHeight}px - 242px)`;
      }
    }
  },66));
  if(document.createEvent){
    var event = document.createEvent("HTMLEvents");
    event.initEvent("resize",true,true);
    window.dispatchEvent(event);
  }
  else if(typeof Event === 'function')
  {
    window.dispatchEvent(new Event('resize'));
  }
});

const getList = (isTure: boolean) => {
  const orderNo = form.orderNo;
  const customerName = form.customerName
  const customerPhone = form.customerPhone
  const customerStatus= form.orderStatus
  const orderStatus = form.orderStatus
  // let param = { "po": orderNo, "account_name__c": customerName }
  let param = { "pageNo": pageConfig.value.pageIndex, "pageSize": pageConfig.value.pageSize }
  if(orderNo!=""){
    param["po"]=orderNo
  }
  if(customerName!=""){
    param["accountName"]=customerName
  }
  if(customerPhone!=""){
    param["accountPhone"]=customerPhone
  }
  if(orderStatus!=""){
    param["status__c"]=orderStatus
  }
  if(customerStatus!=""){
    param["status__c"]=customerStatus
  }
  if(form.createDate!=undefined&&form.createDate[0]!=undefined&&form.createDate[0]!=""){
    param["from"]=form.createDate[0]+" 00:00:00"
  }
  if(form.createDate!=undefined&&form.createDate[1]!=undefined && form.createDate[1]!="" ){
    param["to"]=form.createDate[1]+" 23:59:59"
  }
  getOrderListByPage(param).then((res: any) => {
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
      tableData.value = []
      ElMessage({
        message: '暂无数据',
        type: 'error'
      })
    }
    pageConfig.value = {
					pageIndex: res.data.current==undefined?1:parseInt(res.data.current),
					pageSize: res.data.size,
					total: res.data.total
				} as any;
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
      status__c:row.status__c
    },
  });
}

const handleCurrentChange = (val: number) => {
		pageConfig.value.pageIndex=val;
		getList(false);
	}

//重置按钮
const resetting = () => {
  form.orderNo = ""
  form.customerName = ""
  form.customerPhone = ""
  form.filterMethod = ""
  form.createDate = []
  form.orderStatus = ""
  getList(false)
}
</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
