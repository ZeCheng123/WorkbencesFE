<template>
	<div class="main">
		<span class="header"> 交付任务 </span>
		<span class="search">
			<span class="left">
				<el-form :model="form"  label-width="80px" label-position="left">
					<el-form-item label="任务编号">
						<el-input placeholder="请输入任务编号" v-model="form.orderNo" />
					</el-form-item>
					<el-form-item label="客户名称">
						<el-input placeholder="输入客户名称" v-model="form.customerName" />
					</el-form-item>
					<el-form-item label="客户电话">
						<el-input placeholder="请输入客户电话" v-model="form.customerPhone" />
					</el-form-item>
				</el-form>
				<el-form :model="form"  label-width="80px" label-position="left">
					<!-- <el-form-item label="筛选方式">
						<el-select v-model="form.filterMethod" placeholder="请选择筛选方式">
							<el-option v-for="item in filterMethodPtions" :key="item.value" :label="item.label"
								:value="item.value" />
						</el-select>
					</el-form-item> -->
					<el-form-item label="创建时间">
						<el-date-picker v-model="form.createDate" type="daterange" range-separator="~"
							start-placeholder="开始时间" end-placeholder="结束时间" value-format="YYYY-MM-DD" />
					</el-form-item>
					<el-form-item label="订单状态">
						<el-select v-model="form.orderStatus" placeholder="请选择订单状态">
							<el-option v-for="item in orderStatusPtions" :key="item.code" :label="item.name"
								:value="item.code" />
						</el-select>
					</el-form-item>
					<span style="width:336px;height:32px"></span>
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
				<el-table-column prop="id" label="任务编号" />
				<el-table-column prop="distributorName" label="经销商" />
				<el-table-column prop="followerName" label="经销商负责人" />
				<el-table-column prop="accountName" label="关联客户" />
				<!-- <el-table-column prop="serviceCaseNeoId" label="剩余时间" /> -->
				<!-- <el-table-column prop="serviceCaseId" label="关联的服务工单id" :visible="true"/> -->
				<!-- <el-table-column prop="fieldJobNeoId" label="任务结束时间" />  -->
				<el-table-column prop="taskType" label="任务类型" >
				  	<!-- <template #default="scope">
				  		<div style="display:flex;align-items:center;">
						{{scope.row.taskType?(taskTypeOptions.find(val=>val["code"]==scope.row.taskType)?.name):""}}
						</div>
					</template> -->
				</el-table-column>
				<el-table-column prop="createdTime" label="创建时间" />
				<el-table-column prop="status" label="状态" >
					<template #default="scope">
				  		<div style="display:flex;align-items:center;">
						{{scope.row.status?(orderStatusPtions.find(val=>val["code"]==scope.row.status)?.name):"待开始"}}
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="url" label="操作" width="80px">
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
	</div>
</template>


<script setup lang="ts">
	import { ref, computed, getCurrentInstance, reactive, onMounted } from "vue";
	import { getLoginInfo, getTaskByPage } from '../../api/common.js'
	import { ElMessage } from "element-plus";

	const { proxy } : any = getCurrentInstance()

	const pageConfig = ref({
		  pageIndex: 1,
		  pageSize: 15,
		  total: 0
		});

	const form = reactive({
		orderNo: "",
		customerName: "",
		customerPhone: "",
		filterMethod: "",
		createDate: [],
		orderStatus: "",
	})
	
	const tableData = ref([])
	
	onMounted(() => {
		getList(false);
	});

	const taskTypeOptions = ref([
		{
			code: "all",
			name: "全部",
		},
		{
			code: "ServiceCase",
			name: "服务工单",
		},
		{
			code: "DispatchNote",
			name: "发货单",
		},
		{
			code: "FieldJob",
			name: "派工单",
		},
	])

	const orderStatusPtions = ref([
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
			name: "提货",
		},
		{
			code: "2",
			name: "入库",
		},
		{
			code: "3",
			name: "配送",
		},
		{
			code: "4",
			name: "安装",
		},
		{
			code: "5",
			name: "完成",
		}
	])

	const viewDetails = (row: any) => {
		console.log(row)
		// proxy.$router.push("/delivery_tasks_details?id="+id)
		proxy.$router.push({ path: "/delivery_tasks_details", query: {
			id:row.id,
			serviceCaseNeoId:row.serviceCaseId,
			orderId:row.orderId,
			taskType:row.taskType,
			status:row.status,
			distributorName:row.distributorName,
			followerName:row.followerName,
			accountName:row.accountName,
			createdTime:row.createdTime,
			createdBy:row.createdBy
			} ,
		});
	}

	const getList = (isTure: boolean) => {
		const orderNo = form.orderNo==undefined?"":form.orderNo;
		const customerName = form.customerName==undefined?"":form.customerName;
		const customerPhone = form.customerPhone==undefined?"":form.customerPhone;
		const status = form.orderStatus==undefined?"":form.orderStatus;
		let param = { "status": status, "createdTimeStart": form.createDate==undefined?"":form.createDate[0],
		"createdTimeEnd":form.createDate==undefined?"":form.createDate[1],"pageSize":pageConfig.value.pageSize,"pageNo":pageConfig.value.pageIndex,
		"accountName":customerName,"accountPhone":customerPhone,"taskNumber":orderNo
		}
		console.log(param)
		getTaskByPage(param).then((res : any) => {
			let data = res.data.data
			if (data.length > 0) {
				data.forEach(item => {
					item["taskType"]="交付"
				});
				tableData.value = data
				if(isTure)
				{
					ElMessage({
						message: '查询成功',
						type: 'success'
					})
				}
			} else {
				tableData.value =[];
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
		form.orderNo = ''
		form.customerName = ''
		form.customerPhone = ''
		form.filterMethod = ''
		form.createDate = []
		form.orderStatus = ''
		getList(false)
	}
</script>

<style lang="scss" scoped>
	@import "./components/index.scss";
</style>