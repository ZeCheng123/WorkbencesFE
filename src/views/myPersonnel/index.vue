<template>
  <div class="main">
    <span class="header"> 我的人员 </span>
    <span class="search">
      <span class="left">
        <el-form
          :model="form"
          :rules="rule"
          label-width="80px"
          label-position="left"
        >
          <el-form-item label="人员类型">
            <el-select v-model="form.userType" placeholder="请选择人员类型" clearable>
              <el-option
                v-for="item in userTypeOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="人员姓名">
            <el-input placeholder="输入人员姓名" v-model="form.name" />
          </el-form-item>
          <el-form-item label="人员电话">
            <el-input placeholder="输入人员电话" v-model="form.phone" />
          </el-form-item>
        </el-form>
        <el-form
          :model="form"
          :rules="rule"
          label-width="80px"
          label-position="left"
        >
          <span style="width: 336px; height: 32px"></span>
        </el-form>
      </span>
      <span class="right">
        <el-button @click="getDataTable()" type="primary" class="search_btn"
          ><template #icon>
            <img src="@/assets/images/search.png" alt="" /> </template
          >查询</el-button
        >
        <el-button type="primary" @click="resetForm()" class="reset_btn"
          ><template #icon>
            <img src="@/assets/images/reset.png" alt="" /> </template
          >重置</el-button
        >
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
        <el-button @click="addMember()" type="primary" class="search_btn"
          ><template #icon>
            <img src="@/assets/images/plus.png" alt="" /> </template
          >新建</el-button
        >
      </span>
    </span>
    <span class="table" ref="mainTable">
      <el-table
        class="table_content"
        :data="tableData"
        :stripe="false"
        style="width: 100%"
      >
        <el-table-column prop="id" label="人员编号" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="phone" label="电话" />
        <el-table-column prop="userType" label="人员类型">
          <template #default="scope">
            <div>
              {{
                scope.row.userType == 1
                  ? "安装工程师"
                  : scope.row.userType == 2
                  ? "售后人员"
                  : scope.row.userType == 3
                  ? "配送司机"
                  : scope.row.userType == 4
                  ? "美容工程师"
                  : scope.row.userType == 5
                  ? "仓管员"
                  : "售后管理员"
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="skillNames" label="技能">
          <!-- <template #default="scope">
            <div>
              {{
                scope.row.skill == 1
                  ? "门"
                  : scope.row.skill == 2
                  ? "墙"
                  : "柜"
              }}
            </div>
          </template> -->
        </el-table-column>        
        <el-table-column prop="status" label="人员状态">
          <template #default="scope">
            <div>
              {{ (!scope.row.hasOwnProperty('status') || scope.row.status == 1) ? "在职" : "离职" }}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="storeNo" label="门店编号" />
        <el-table-column prop="storeName" label="门店名称"> </el-table-column>
        <el-table-column prop="distributorNo" label="经销商编号" /> -->
        <el-table-column prop="distributorName" label="经销商名称" />
        <el-table-column prop="createdTime" label="创建时间" />
        <el-table-column prop="userType" label="操作" width="80px">
          <template #default="scope">
            <div style="display: flex; align-items: center; color: #165dff; cursor: pointer;" @click="editPersonel(scope.row)">
              编辑
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :pager-count-format="pagerCountFormat"
        @current-change="handleCurrentChange"
        class="table_pagination"
        :page-size="pageConfig.pageSize"
        layout="total, prev, pager, next"
        :total="pageConfig.total"
      >
      </el-pagination>
    </span>
  </div>
  <div class="showDialog">
      <el-dialog
        v-model="showDialog"
        :title="operationType == 'add' ? '新增人员' : '编辑人员'"
        width="60%"
        :show-close="false"
      >
        <div class="content">
          <el-form
            :model="dialogForm"
            :rules="dialogFormRule"
            ref="formRef"
            label-width="90px"
            label-position="right"
          >
            <div class="custom-row">
              <el-form-item label="姓名" prop="name">              
                  <el-input placeholder="请输入姓名" v-model="dialogForm.name"/>
              </el-form-item>
              <el-form-item label="电话" prop="phone">              
                  <el-input placeholder="请输入电话" v-model="dialogForm.phone"/>
              </el-form-item>
            </div>
            <div class="custom-row">
              <el-form-item label="人员类型" prop="userType">              
                <el-select v-model="dialogForm.userType"  placeholder="请选择人员类型">
                  <el-option
                    v-for="item in userTypeOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="人员状态" prop="status">              
                <el-select v-model="dialogForm.status"  placeholder="请选择人员状态">
                  <el-option
                    v-for="item in userStatusOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div class="custom-row">
              <el-form-item label="人员技能" prop="skill">              
                <el-select multiple collapse-tags v-model="dialogForm.skill"  placeholder="请选择人员类型">
                  <el-option
                    v-for="item in skillOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
              <el-form-item v-if="false" label="人员技能" prop="skill">              
                <el-select v-model="dialogForm.skill"  placeholder="请选择人员类型">
                  <el-option
                    v-for="item in skillOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div class="custom-row">
              <el-form-item label="门店编码">              
                <el-input placeholder="请输入门店编码" v-model="dialogForm.storeNo"/>
              </el-form-item>
              <el-form-item label="门店名称">              
                <el-input placeholder="请输入门店名称" v-model="dialogForm.storeName"/>
              </el-form-item>
            </div>
            <div class="custom-row">
              <el-form-item label="经销商编码">              
                <el-input placeholder="请输入经销商编码" v-model="dialogForm.distributorNo"/>
              </el-form-item>
              <el-form-item label="经销商名称">              
                <el-input placeholder="请输入经销商名称" v-model="dialogForm.distributorName"/>
              </el-form-item>
            </div>
            <!-- <div class="custom-row">
              <el-form-item label="总代编码">              
                <el-input placeholder="请输入总代编码" v-model="dialogForm.generalAgentNo"/>
              </el-form-item>
              <el-form-item label="总代名称">              
                <el-input placeholder="请输入总代名称" v-model="dialogForm.generalAgentName"/>
              </el-form-item>
            </div> -->

          </el-form>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button class="cancel_btn" @click="cacnelAdd()"
              >取消</el-button
            >
            <el-button
              @click="comfirmAdd()"
              type="primary"
              class="primary_btn"
              >确认</el-button
            >
          </div>
        </template>
      </el-dialog>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, getCurrentInstance, reactive, onMounted } from "vue"
import { getExternalUserList, addExternalUser } from "../../api/common.js"
import { ElMessage, ElMessageBox } from "element-plus"
	import _ from "lodash"

const { proxy }: any = getCurrentInstance()

const pageConfig = ref({
  pageIndex: 1,
  pageSize: 15,
  total: 0
})

const formRef = ref();

const showDialog = ref(false);

const form = ref({
  userType: "",
  name: "",
  phone: "",
})

const dialogForm = ref({
    userType: 1,
    name: "",
    phone: "",
    status: 1,
    storeNo: "HY0011",
    storeName: "梦天木门集团有限公司",
    distributorNo: "HY01",
    distributorName: "梦天集团",
    generalAgentNo: "GD01",
    generalAgentName: "梦天",
    skill:[]
})

const dialogFormRule = ref({
  name: [
    { required: true, message: "姓名不能为空", trigger: "blur" },
  ],
  phone: [
    { required: true, message: "电话不能为空", trigger: "blur" },
    {
        validator: (rule, value) => {
          const reg = /^1\d{10}$/; // 手机号正则表达式
          if (!reg.test(value)) {
            return Promise.reject('电话格式不正确');
          }
          return Promise.resolve();
        },
        trigger: 'blur'
    }
  ],
  userType: [
    { required: true, message: "人员类型不能为空", trigger: "blur" },
  ],
  status: [
    { required: true, message: "状态不能为空", trigger: "blur" },
  ]
})


const userTypeOptions = ref([
  {
    code: 1,
    name: "安装工程师",
  },
  {
    code: 2,
    name: "售后人员",
  },
  {
    code: 3,
    name: "配送司机",
  },
  {
    code: 4,
    name: "美容工程师",
  },
  {
    code: 5,
    name: "仓管员",
  },
  {
    code: 6,
    name: "售后管理员",
  }
])

const skillOptions = ref([
  {
    code: 1,
    name: "门",
  },
  {
    code: 2,
    name: "墙",
  },
  {
    code: 3,
    name: "柜",
  },
])

const userStatusOptions = ref([
  {
    code: 1,
    name: "在职",
  },
  {
    code: 2,
    name: "离职",
  }
])

const tableData = ref([])

const operationType = ref("add");

const mainTable = ref(null);

onMounted(() => {
  console.log(proxy.$router.options.routes);
  getDataTable()
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
  })

const getDataTable = () => {
  let params = {
    userType: form.value.userType,
    name: form.value.name,
    phone: form.value.phone,
    pageNo: pageConfig.value.pageIndex,
    pageSize: pageConfig.value.pageSize
  }
  getExternalUserList(params)
    .then((res: any) => {
      let dataList = res.data
      if (dataList.code == "success") {
        // pageConfig.value.total = dataList.total;
        tableData.value = dataList.data
        tableData.value.forEach((item)=>{
          let skillNames = "";
          console.log()
          item["skill"].forEach((skill) => {
            skillNames = skillNames +
            skillOptions.value.find(
                (aSItem) => aSItem["code"] == skill
              ).name + ","
          })
          item["skillNames"]=skillNames.substring(0,skillNames.length-1);
        })
        pageConfig.value = {
          pageIndex:
            res.data.current == undefined ? 1 : parseInt(res.data.current),
          pageSize: res.data.size,
          total: res.data.total,
        } as any;
        // ElMessage({
        //   message: "查询成功!",
        //   type: "success",
        // })
      } else {
        tableData.value = [];
        pageConfig.value = {
          pageIndex: 1,
          pageSize: 15,
          total: 0,
        } as any;
        console.log("失败")
      }
    })
    .catch((error: any) => {
      // 显示请求失败的提示框
      ElMessage({
        message: "请求数据失败，请重试",
        type: "error",
      })
      console.error("请求数据失败:", error)
    })
}

const resetForm = () => {
  form.value = {
    userType: "",
    name: "",
    phone: "",
  } as any
}

const addMember = () =>{
  operationType.value = "add";
  showDialog.value = true
}

const cacnelAdd = () =>{
  dialogForm.value = {
      userType: 1,
      name: "",
      phone: "",
      status: 1,
      storeNo: "HY0011",
      storeName: "梦天木门集团有限公司",
      distributorNo: "HY01",
      distributorName: "梦天集团",
      generalAgentNo: "GD01",
      generalAgentName: "梦天",
      skill:[]
  } as any;
  formRef.value.clearValidate();
  showDialog.value = false
}

const comfirmAdd = () =>{
  formRef.value.validate(valid => {
    if (valid) {
      let params = dialogForm.value;
      if(operationType.value == "edit"){
        delete params["createdTime"]
      }
      if((params.userType==1 || params.userType==4)&&(Array.isArray(params.skill)&&params.skill.length<=0)){
        const warnMassge="人员类型为安装工程师或美容工程师时，人员技能不能为空,"+(operationType.value == "add" ? "新增失败!" : "编辑失败!")
        ElMessage({
          message: warnMassge,
          type: "warning",
        })
        return;
      }
      // params["createdTime"] = new Date().toLocaleString();
      addExternalUser(params)
      .then((res: any) => {
        if (res?.data?.code == "success") {
          // form.value.userType = params["userType"];
          dialogForm.value = {
            userType: 1,
            name: "",
            phone: "",
            status: 1,
            storeNo: "HY0011",
            storeName: "梦天木门集团有限公司",
            distributorNo: "HY01",
            distributorName: "梦天集团",
            generalAgentNo: "GD01",
            generalAgentName: "梦天",
            skill:[]
          } as any;
          showDialog.value = false;
          ElMessage({
            message: operationType.value == "add" ? "新增成功!" : "编辑成功!",
            type: "success",
          })
          setTimeout(() => {
            getDataTable();
          }, 500);
        } else {
          console.log("失败")
          let warnMessage=res?.data?.message
          if(warnMessage=="user phone existed"){
            warnMessage="用户已存在，新增失败!"
          }
          warnMessage=warnMessage?warnMessage:"编辑失败!"         
          ElMessage({
            message: operationType.value == "add" ? warnMessage : "编辑失败!",
            type: "warning",
          })
        }
      })
      .catch((error: any) => {
        // 显示请求失败的提示框
        ElMessage({
          message: operationType.value == "add" ? "新增失败!" : "编辑失败!",
          type: "error",
        })
        console.error("新增失败:", error)
      })
    }
  });
}

const editPersonel = (item) =>{
  let newItem = JSON.parse(JSON.stringify(item));
  dialogForm.value = newItem;
  operationType.value = "edit";
  showDialog.value = true
}

const handleCurrentChange = (pageIndex) =>{
  pageConfig.value.pageIndex = pageIndex;
  getDataTable();
}

</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
