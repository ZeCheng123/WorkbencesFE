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
              value-format="YYYY-MM-DD"
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
    <span class="table" ref="mainTable">
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
import _ from "lodash"
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

const mainTable = ref(null);

const tableData = ref([])

const viewDetails = (row) =>{
  proxy.$router.push({path:"/dispatch_details", query:{
    id:row.id
  }});
}

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

		let param = {"fieldJobType__c": form.technicianType==undefined?"":form.technicianType,  "appointmentEndTime": "",  "from": form.createDate==undefined||form.createDate[0]==undefined?"":form.createDate[0]+" 00:00:00",
		"to":form.createDate==undefined||form.createDate[1]==undefined?"":form.createDate[1]+" 23:59:59",  "status": form.dispatchWorkerStatus==undefined?"":form.dispatchWorkerStatus,  "caseNo": form.dispatchWorkerNo==undefined?"":form.dispatchWorkerNo,  "artisanName": form.technicianName==undefined?"":form.technicianName,  "pageSize":pageConfig.value.pageSize,"pageNo":pageConfig.value.pageIndex}
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
