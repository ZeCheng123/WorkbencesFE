<template>
	<div class="main">
		<span class="header"> 交付任务 </span>
		<span class="search">
			<span class="left">
				<el-form :model="form" label-width="80px" label-position="left">
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
				<el-form :model="form" label-width="80px" label-position="left">
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
					<el-form-item label="交付状态">
						<el-select v-model="form.orderStatus" placeholder="请选择交付状态">
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
				<el-button plain @click="combineTask()" type="primary" class="search_btn">合并交付</el-button>
				<el-button type="primary" class="reset_btn"><template #icon>
						<img src="@/assets/images/download.png" alt="" /> </template>下载</el-button>
				
			</span>
		</span>
		<span ref="mainTable" class="table" >
			<el-table class="table_content" :data="tableData" :stripe="false" style="width: 100%">
				<el-table-column prop="checked" label="全选" width="80px">
					<template #header>
						<el-checkbox @change="selectAll">全选</el-checkbox>
					</template>
					<template #default="scope">
						<el-checkbox v-model="scope.row.checked" />
					</template>
				</el-table-column>
				<el-table-column prop="id" label="任务编号" />
				<el-table-column prop="distributorName" label="经销商" />
				<el-table-column prop="followerName" label="经销商负责人" />
				<el-table-column prop="accountNameLabel" label="关联客户" />
				<!-- <el-table-column prop="serviceCaseNeoId" label="剩余时间" /> -->
				<!-- <el-table-column prop="serviceCaseId" label="关联的服务工单id" :visible="true"/> -->
				<!-- <el-table-column prop="fieldJobNeoId" label="任务结束时间" />  -->
				<el-table-column prop="taskType" label="任务类型">
					<!-- <template #default="scope">
				  		<div style="display:flex;align-items:center;">
						{{scope.row.taskType?(taskTypeOptions.find(val=>val["code"]==scope.row.taskType)?.name):""}}
						</div>
					</template> -->
				</el-table-column>
				<el-table-column prop="createdTime" label="创建时间" />
				<el-table-column prop="status" label="状态">
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
			<el-pagination class="table_pagination" :page-size="pageConfig.pageSize" :pager-count="15"
				layout="total, prev, pager, next" :total="pageConfig.total" @current-change="handleCurrentChange" />
		</span>
	</div>
</template>


<script setup lang="ts">
	import { ref, computed, getCurrentInstance, reactive, onMounted } from "vue";
	import { getLoginInfo, getTaskByPage, mergeTask } from '../../api/common.js'
	import { ElMessage,ElMessageBox } from "element-plus";
	import _ from "lodash"

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

	const mainTable = ref<any>(null);
	
	const tableData = ref<any>([])
	
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
			code: "1",
			name: "待处理",
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
		// console.log(row)
		// proxy.$router.push("/delivery_tasks_details?id="+id)
		proxy.$router.push({ path: "/delivery_tasks_details", query: {
			id:row.id,
			serviceCaseNeoId:row.serviceCaseId,
			orderId:row.orderId,
			taskType:row.taskType,
			status:row.status,
			distributorName:row.distributorName,
			followerName:row.followerName,
			accountName:row.accountNameLabel,
			createdTime:row.createdTime,
			createdBy:row.createdBy,
			mergedOrderNo:row.mergedOrderNo,
			subStatus:row.subStatus
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
		// console.log(param)
		getTaskByPage(param).then((res : any) => {
			let data = res.data.data
			if (data.length > 0) {
				data.forEach(item => {
					item["checked"]=false
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
	const selectAll = (event) => {
		tableData.value.forEach(item => {
			item["checked"] = event
		})
	};
	const combineTask = () => {
		ElMessageBox.confirm(
			'是否确认,合并同一客户的经销商订单?',
			'是否确认',
			{
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}
		)
		.then(() => {
			combineTaskmethod();
		})
		.catch(() => {
			ElMessage({
				type: 'info',
				message: '合并交付取消',
			})
		})
	}

	function combineTaskmethod(){
		const selectData = tableData.value.filter(item => item.checked)
		if (selectData.length <= 0) {
			proxy.$message.error("必须勾选数据!");
			return;
		}
		let hasDiffAccoutOrder=false
		for(let i=0;i<selectData.length-1;i++){
			if(selectData[i]["accountName"]!=selectData[i+1]["accountName"] ||selectData[i]["distributorName"]!=selectData[i+1]["distributorName"]){
				hasDiffAccoutOrder=true
			}
		}
		if(hasDiffAccoutOrder){
			proxy.$message.error("所选数据并非同一客户同一经销商订单，无法合并!");
			return;
		}
		let params={
			taskIds:selectData.map(item=>{return item["id"]})
		}
		mergeTask(params).then(res=>{
			if(res.data.code=='success'){
				proxy.$message.success("合并成功!");
				// console.log("mergeTask",res.data)
				let newTask=res.data.data
				getList(false)
				proxy.$router.push({
					path: "/delivery_tasks_details", query: {
						id: newTask.id,
						orderId: newTask.orderId,
						taskType: newTask.taskType,
						status: newTask.status,
						distributorName: newTask.distributorName,
						followerName: newTask.followerName,
						accountName: selectData[0]["accountNameLabel"],
						createdTime: formatDate(new Date()),
						createdBy: newTask.createdBy,
						mergedOrderNo: newTask.mergedOrderNo
					},
				});
			}else{
				proxy.$message.error("合并失败:"+res.data.message);
			}
		}).catch((error: any) => {
			// 显示请求失败的提示框
			ElMessage({
				message: '合并失败，请重试',
				type: 'error'
			});
			console.error('合并交付失败:', error);
		})
	}

	function formatDate(date) {
		const year = date.getFullYear();
		const month = padZero(date.getMonth() + 1); // 月份从0开始
		const day = padZero(date.getDate());
		const hours = padZero(date.getHours());
		const minutes = padZero(date.getMinutes());
		const seconds = padZero(date.getSeconds());

		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	}
	function padZero(num, length = 2) {
		return String(num).padStart(length, '0');
	}
</script>

<style lang="scss" scoped>
	@import "./components/index.scss";
</style>