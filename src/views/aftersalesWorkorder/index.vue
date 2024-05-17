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
              v-model="form.customerPhone"
            />
          </el-form-item>
        </el-form>
        <el-form
          :model="form"
          :rules="rule"
          label-width="80px"
          label-position="left"
        >
          <!-- <el-form-item label="筛选方式">
            <el-select v-model="form.filterMethod" placeholder="请选择筛选方式">
              <el-option
                v-for="item in filterMethodOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item> -->
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="form.createDate"
              type="daterange"
              range-separator="~"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item label="售后状态">
            <el-select v-model="form.orderStatus" placeholder="请选择售后状态">
              <el-option
                v-for="item in seviceTicketStatusOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
          <span style="width:336px;height:32px"></span>
        </el-form>
      </span>
      <span class="right">
        <el-button type="primary" @click="getList(false)" class="search_btn"><template #icon> <img src="@/assets/images/search.png" alt=""> </template>查询</el-button>
        <el-button type="primary" class="reset_btn"><template #icon> <img src="@/assets/images/reset.png" alt=""> </template>重置</el-button>
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
        <el-button type="primary" class="reset_btn"><template #icon> <img src="@/assets/images/download.png" alt=""> </template>下载</el-button>
      </span>
    </span>
    <span class="table" ref="mainTable">
      <el-table class="table_content" :data="tableData" :stripe="false" style="width: 100%">
        <el-table-column prop="name" label="售后工单编号" />
        <el-table-column prop="storeName" label="专卖店名称" />
        <el-table-column prop="productionOrderNo__c" label="生产单号" />
        <el-table-column prop="accountName" label="客户名称" />
        <el-table-column prop="text5" label="处理方式" />
        <el-table-column prop="createdTime" label="创建时间" />
        <el-table-column prop="status__c" label="售后状态" >
          <template #default="scope">
				  		<div style="display:flex;align-items:center;">
						{{scope.row.status__c?(seviceTicketStatusOptions.find(val=>val["code"]==scope.row.status__c)?.name):""}}
						</div>
					</template>
				</el-table-column>
        <el-table-column prop="text8" label="操作" width="80px">
          <template #default="scope">
            <div
              style="
                display: flex;
                align-items: center;
                color: #165dff;
                cursor: pointer;
              "
              @click="viewDetails(scope.row)"
            >
              查看
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="table_pagination"
        :page-size="pageConfig.pageSize"
        :pager-count="15"
        layout="total, prev, pager, next"
        :total="pageConfig.total"
        @current-change="handleCurrentChange"
      />
    </span>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, getCurrentInstance, reactive,onMounted } from "vue"
import { ElMessage } from "element-plus";
import { getServiceticketPage } from "../../api/common";
import path from "path";
import _ from "lodash"
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


const seviceTicketStatusOptions = ref([
  {
    code: "",
    name: "全部"
  },
  // },
  // {
  //   code: "1",
  //   name: "已提报问题",
  // },
  // {
  //   code: "2",
  //   name: "已定损",
  // },
  // {
  //   code: "3",
  //   name: "核实/维护问题产品中",
  // },
  // {
  //   code: "4",
  //   name: "定责发起",
  // },
  // {
  //   code: "5",
  //   name: "已提交OA审批",
  // },
  // {
  //   code: "6",
  //   name: "已定责",
  // },
  // {
  //   code: "7",
  //   name: "已追责",
  // },
  // {
  //   code: "8",
  //   name: "已财务审核",
  // },
  // {
  //   code: "9",
  //   name: "已经销商审核",
  // },
  // {
  //   code: "10",
  //   name: "已结案",
  // }
  {
    code: "1",
    name: "开始",
  },
  {
    code: "2",
    name: "已提报问题",
  },
  {
    code: "3",
    name: "售后审核",
  },
  {
    code: "4",
    name: "已定损",
  },
  {
    code: "5",
    name: "定责发起",
  },
  {
    code: "6",
    name: "已提交OA审批",
  },
  {
    code: "7",
    name: "已追责",
  },
  {
    code: "8",
    name: "已追责",
  },
  {
    code: "8",
    name: "结束",
  }
])


const pageConfig = ref({
		  pageIndex: 1,
		  pageSize: 15,
		  total: 0
		});

const tableData = ref([
  // {
  //   text1: "CS0011-06665-01",
  //   text2: "梦天慈溪经销商-专卖店A",
  //   text3: "H404304",
  //   text4: "李女士",
  //   text5: "售后重做",
  //   text6: "2021-02-28 10:30",
  //   text7: "已提报",
  //   text8: "",
  // },
  // {
  //   text1: "CS0011-06665-01",
  //   text2: "梦天慈溪经销商-专卖店A",
  //   text3: "H404304",
  //   text4: "李女士",
  //   text5: "售后重做",
  //   text6: "2021-02-28 10:30",
  //   text7: "已提报",
  //   text8: "",
  // },
  // {
  //   text1: "CS0011-06665-01",
  //   text2: "梦天慈溪经销商-专卖店A",
  //   text3: "H404304",
  //   text4: "李女士",
  //   text5: "售后重做",
  //   text6: "2021-02-28 10:30",
  //   text7: "已提报",
  //   text8: "",
  // },
  // {
  //   text1: "CS0011-06665-01",
  //   text2: "梦天慈溪经销商-专卖店A",
  //   text3: "H404304",
  //   text4: "李女士",
  //   text5: "售后重做",
  //   text6: "2021-02-28 10:30",
  //   text7: "已提报",
  //   text8: "",
  // },
  // {
  //   text1: "CS0011-06665-01",
  //   text2: "梦天慈溪经销商-专卖店A",
  //   text3: "H404304",
  //   text4: "李女士",
  //   text5: "售后重做",
  //   text6: "2021-02-28 10:30",
  //   text7: "已提报",
  //   text8: "",
  // },
  // {
  //   text1: "CS0011-06665-01",
  //   text2: "梦天慈溪经销商-专卖店A",
  //   text3: "H404304",
  //   text4: "李女士",
  //   text5: "售后重做",
  //   text6: "2021-02-28 10:30",
  //   text7: "已提报",
  //   text8: "",
  // },
  // {
  //   text1: "CS0011-06665-01",
  //   text2: "梦天慈溪经销商-专卖店A",
  //   text3: "H404304",
  //   text4: "李女士",
  //   text5: "售后重做",
  //   text6: "2021-02-28 10:30",
  //   text7: "已提报",
  //   text8: "",
  // },
])

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
  console.log(form)
  const customerName = form.customerName==undefined?"":form.customerName;
  const customerPhone = form.customerPhone==undefined?"":form.customerPhone;
  const workNo = form.workNo==undefined?"":form.workNo;
  let param = {"ticketNo":workNo,"customerName": customerName,  "customerPhone": customerPhone,  "status": form.orderStatus,  "from": form.createDate==undefined||form.createDate[0]==undefined?"":form.createDate[0]+" 00:00:00",
		"to":form.createDate==undefined||form.createDate[1]==undefined?"":form.createDate[1]+" 23:59:59",  "pageSize":pageConfig.value.pageSize,"pageNo":pageConfig.value.pageIndex}
		getServiceticketPage(param).then((res : any) => {
			let data = res.data.data
			if (data&&data.length > 0) {
				tableData.value = data
				if(isTure)
				{
					ElMessage({
						message: '查询成功',
						type: 'success'
					})
				}
			} else {
				ElMessage({
					message: '暂无数据',
					type: 'warning'
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
const viewDetails = (rowData) =>{
  proxy.$router.push({path:"/aftersales_workorder_details",query:{
    id:rowData.id
  }});
}
const handleCurrentChange = (val: number) => {
  pageConfig.value.pageIndex=val;
  getList(true);
}
</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
