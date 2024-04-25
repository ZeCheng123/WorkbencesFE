<template>
  <div class="main">
    <span class="header"> 派工单 </span>
    <span class="search">
      <span class="left">
        <el-form
          :model="form"
          :rules="rule"
          label-width="80px"
          label-position="left"
        >
          <el-form-item label="派工编号">
            <el-input placeholder="请输入派工编号" v-model="form.dispatchWorkerNo" />
          </el-form-item>
          <el-form-item label="技工姓名">
            <el-input placeholder="输入技工姓名" v-model="form.technicianName" />
          </el-form-item>
          <el-form-item label="技工种类">
            <el-select v-model="form.technicianType" placeholder="请选择派工种类">
              <el-option
                v-for="item in technicianTypeOption"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
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
            />
          </el-form-item>
          <el-form-item label="派工状态">
            <el-select v-model="form.dispatchWorkerStatus" placeholder="请选择派工状态">
              <el-option
                v-for="item in dispatchWorkerStatusOption"
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
        <el-button @click="getList(true)" type="primary" class="search_btn"><template #icon> <img src="@/assets/images/search.png" alt=""> </template>查询</el-button>
        <el-button @click="resetting()" type="primary" class="reset_btn"><template #icon> <img src="@/assets/images/reset.png" alt=""> </template>重置</el-button>
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
    <span class="table">
      <el-table class="table_content" :data="tableData" :stripe="false" style="width: 100%">
        <el-table-column prop="caseNo" label="派工编号" />
        <el-table-column prop="appointmentStartTime" label="计划开始时间" />
        <el-table-column prop="appointmentEndTime" label="计划结束时间" />
        <el-table-column prop="follower__c" label="技工名称" />
        <el-table-column prop="fieldJobType__c" label="派工种类" >
          <template #default="scope">
            <div style="display:flex;align-items:center;">
						{{scope.row.fieldJobType__c?(technicianTypeOption.find(val=>val["code"]==scope.row.fieldJobType__c)?.name):"配送派工单"}}
						</div>
					</template>
        </el-table-column>
        <el-table-column prop="createdTime" label="创建时间" />
        <el-table-column prop="stage__c" label="派工状态" >
          <template #default="scope">
				  		<div style="display:flex;align-items:center;">
						{{scope.row.stage__c?(dispatchWorkerStatusOption.find(val=>val["code"]==scope.row.stage__c)?.name):"待开始"}}
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
import { getFieldJobByPage } from "../../api/common";
import { ElMessage } from "element-plus";
//import { Row } from "element-plus/es/components/table-v2/src/components";

const { proxy }: any = getCurrentInstance()

const pageConfig = ref({
		  pageIndex: 1,
		  pageSize: 15,
		  total: 0
		});

const form = reactive({
  dispatchWorkerNo: "",
  technicianName: "",
  technicianType: "",
  filterMethod: "",
  createDate: [],
  dispatchWorkerStatus: "",
})

const filterMethodOptions = ref([
  {
    value: "all",
    label: "全部",
  },
])

const technicianTypeOption = ref([
    {
			code: "",
			name: "全部",
		},
		{
			code: "0",
			name: "配送派工单",
		},
		{
			code: "1",
			name: "安装派工单",
		},
		{
			code: "2",
			name: "维修派工单",
		},
])

const dispatchWorkerStatusOption = ref([
    {
			code: "",
			name: "全部",
		},
		{
			code: "0",
			name: "待开始",
		},
		{
			code: "1",
			name: "进行中",
		},
		{
			code: "2",
			name: "已完成",
		},
])

const tableData = ref([
  // {
  //   text1: "CS0011-06665-01",
  //   text2: "梦天慈溪经销商-专卖店A",
  //   text3: "H404304",
  //   text4: "李女士",
  //   text5: "安装派工",
  //   text6: "2021-02-28 10:30",
  //   text7: "已派工",
  //   text8: "",
  // },
  // {
  //   text1: "CS0011-06665-01",
  //   text2: "梦天慈溪经销商-专卖店A",
  //   text3: "H404304",
  //   text4: "李女士",
  //   text5: "安装派工",
  //   text6: "2021-02-28 10:30",
  //   text7: "已派工",
  //   text8: "",
  // },
  // {
  //   text1: "CS0011-06665-01",
  //   text2: "梦天慈溪经销商-专卖店A",
  //   text3: "H404304",
  //   text4: "李女士",
  //   text5: "安装派工",
  //   text6: "2021-02-28 10:30",
  //   text7: "已派工",
  //   text8: "",
  // },
  // {
  //   text1: "CS0011-06665-01",
  //   text2: "梦天慈溪经销商-专卖店A",
  //   text3: "H404304",
  //   text4: "李女士",
  //   text5: "安装派工",
  //   text6: "2021-02-28 10:30",
  //   text7: "已派工",
  //   text8: "",
  // },
  // {
  //   text1: "CS0011-06665-01",
  //   text2: "梦天慈溪经销商-专卖店A",
  //   text3: "H404304",
  //   text4: "李女士",
  //   text5: "安装派工",
  //   text6: "2021-02-28 10:30",
  //   text7: "已派工",
  //   text8: "",
  // },
  // {
  //   text1: "CS0011-06665-01",
  //   text2: "梦天慈溪经销商-专卖店A",
  //   text3: "H404304",
  //   text4: "李女士",
  //   text5: "安装派工",
  //   text6: "2021-02-28 10:30",
  //   text7: "已派工",
  //   text8: "",
  // },
  // {
  //   text1: "CS0011-06665-01",
  //   text2: "梦天慈溪经销商-专卖店A",
  //   text3: "H404304",
  //   text4: "李女士",
  //   text5: "安装派工",
  //   text6: "2021-02-28 10:30",
  //   text7: "已派工",
  //   text8: "",
  // },
])

const viewDetails = (row) =>{
  proxy.$router.push({path:"/dispatch_details", query:{
    id:row.id
  }});
}

onMounted(() => {
		getList(false);
	});
const getList = (isTure: boolean) => {

		let param = {"fieldJobType__c": form.technicianType==undefined?"":form.technicianType,  "appointmentEndTime": "",  "createdTime": "",  "status": form.dispatchWorkerStatus==undefined?"":form.dispatchWorkerStatus,  "caseNo": form.dispatchWorkerNo==undefined?"":form.dispatchWorkerNo,  "artisanName": form.technicianName==undefined?"":form.technicianName,  "pageSize":pageConfig.value.pageSize,"pageNo":pageConfig.value.pageIndex}
		getFieldJobByPage(param).then((res : any) => {
			let data = res.data.data
			if (data.length > 0) {
				tableData.value = data
				if(isTure)
				{
					ElMessage({
						message: '查询成功',
						type: 'success'
					})
				}
			} else {
        tableData.value=[]
				ElMessage({
					message: '暂无对应数据',
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
const handleCurrentChange = (val: number) => {
		pageConfig.value.pageIndex=val;
		getList(false);
}
//重置按钮
const resetting = () => {
		form.dispatchWorkerNo = ''
		form.technicianName = ''
		form.technicianType = ''
		form.filterMethod = ''
		form.createDate = []
		form.dispatchWorkerStatus = ''
    getList(false);
	}
</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
