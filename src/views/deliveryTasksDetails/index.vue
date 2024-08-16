<template>
  <div ref="mainRef" class="main">
    <span class="header">
      <span class="title">任务状态</span>
      <span class="step">
        <span class="item">
          <span :class="currentStep == 2 ? 'num_selected' : 'num'">1</span>
          <span :class="currentStep >= 2 ? 'name_selected' : 'name'"
            >待处理</span
          >
        </span>
        <!-- <span class="item">
          <span :class="currentStep == 2 ? 'num_selected' : 'num'">2</span>
          <span :class="currentStep >= 2 ? 'name_selected' : 'name'">-</span>
        </span> -->
        <span class="item">
          <span :class="currentStep == 3 ? 'num_selected' : 'num'">2</span>
          <span :class="currentStep >= 3 ? 'name_selected' : 'name'">入库</span>
        </span>
        <span class="item">
          <span
            @click="currentStepToPeiSong"
            :class="currentStep == 4 ? 'num_selected' : 'num'"
            >3</span
          >
          <span :class="currentStep >= 4 ? 'name_selected' : 'name'">配送</span>
        </span>
        <span class="item">
          <span :class="currentStep == 5 ? 'num_selected' : 'num'">4</span>
          <span :class="currentStep >= 5 ? 'name_selected' : 'name'">安装</span>
        </span>
        <span class="item">
          <span :class="currentStep == 6 ? 'num_selected' : 'num'">5</span>
          <span :class="currentStep >= 6 ? 'name_selected' : 'name'">已交付</span>
        </span>
      </span>
    </span>
    <span v-if="currentStep >= 4" class="order_status">
      <span class="title">交付子状态：{{getSubStatusName(subStatus)}}</span>
      <!-- <span class="item">
          <span :class="currentStep == 1 ? 'num_selected' : 'num'">1</span>
          
      </span> -->
      <!-- <span class="step">
        <span class="item">
          <span :class="Number(subStatus) == 1 ? 'num_selected' : 'num'">1</span>
          <span :class="Number(subStatus) >= 1 ? 'name_selected' : 'name'">待配送</span>
        </span>
        <span class="item">
          <span :class="Number(subStatus) == 2 ? 'num_selected' : 'num'">2</span>
          <span :class="Number(subStatus) >= 2 ? 'name_selected' : 'name'">配送中</span>
        </span>
        <span class="item">
          <span :class="Number(subStatus) == 3 ? 'num_selected' : 'num'">2</span>
          <span :class="Number(subStatus) >= 3 ? 'name_selected' : 'name'">待安装</span>
        </span>
        <span class="item">
          <span :class="Number(subStatus) == 4 ? 'num_selected' : 'num'">4</span>
          <span :class="Number(subStatus) >= 4 ? 'name_selected' : 'name'">安装中</span>
        </span>
        <span class="item">
          <span :class="Number(subStatus) == 5 ? 'num_selected' : 'num'">5</span>
          <span :class="Number(subStatus) >= 5 ? 'name_selected' : 'name'">待评价</span>
        </span>
        <span class="item">
          <span :class="Number(subStatus) == 6 ? 'num_selected' : 'num'">5</span>
          <span :class="Number(subStatus) >= 6 ? 'name_selected' : 'name'">已评价</span>
        </span>
      </span> -->
      <!-- <span class="step">

      </span> -->
    </span>
    <span class="task_info">
      <span class="title"
        >任务详情
        <el-button
          v-if="currentStep >= 5"
          type="primary"
          class="primary_blue_btn"
          >已派工配送</el-button
        ><el-button
          v-if="currentStep == 6"
          type="primary"
          class="primary_green_btn"
          >已派工安装</el-button
        ></span
      >
      <span class="main_field">
        <span class="row_field">
          <span class="field">
            <span class="label">任务编号：</span>
            <span class="value">{{ taskDetails.taskid }}</span>
            <span v-if="false" class="view">查看</span>
          </span>
          <span class="field">
            <span class="label">经销商：</span>
            <span class="value">{{ taskDetails.distributorName }}</span>
          </span>
          <span class="field">
            <span class="label">经销商负责人：</span>
            <span class="value">{{ taskDetails.followerName }}</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">客户名称：</span>
            <span class="value">{{orderData.accountName__C}}</span>
            <!-- <span v-if="taskType === 'ServiceCase'" class="value">服务工单</span>
            <span v-else-if="taskType === 'DispatchNote'" class="value">发货单</span>
            <span v-else class="value">派工单</span> -->
          </span>
          <span class="field">
            <span class="label">当前负责人：</span>
            <span class="value">{{taskDetails.createdBy}}</span>
          </span>
          <span class="field">
            <span class="label">创建时间：</span>
            <span class="value">{{taskDetails.createdTime}}</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">客户电话：</span>
            <span class="value">{{ orderData.contactTel }}</span>
          </span>
          <span class="field">
            <span class="label">客户地址：</span>
            <span class="value">{{ orderData.customerAddress }}</span>
          </span>
          <span class="field">
            <span class="label"></span>
            <span class="value"></span>
          </span>
        </span>
      </span>
    </span>
    <span class="order_status">
      <span class="title">订单状态</span>
      <span class="step">
        <span class="item">
          <span :class="currentStep2 == 1 ? 'num_selected' : 'num'">1</span>
          <span :class="currentStep2 >= 1 ? 'name_selected' : 'name'">{{orderData.status__c}}</span>
        </span>
        <!-- <span class="item">
          <span :class="currentStep2 == 2 ? 'num_selected' : 'num'">2</span>
          <span :class="currentStep2 >= 2 ? 'name_selected' : 'name'"
            >已包装</span
          >
        </span>
        <span class="item">
          <span :class="currentStep2 == 3 ? 'num_selected' : 'num'">3</span>
          <span :class="currentStep2 >= 3 ? 'name_selected' : 'name'"
            >已成品入库</span
          >
        </span>
        <span class="item">
          <span :class="currentStep2 == 4 ? 'num_selected' : 'num'">4</span>
          <span :class="currentStep2 >= 4 ? 'name_selected' : 'name'"
            >已发货</span
          >
        </span>
        <span class="item">
          <span :class="currentStep2 == 5 ? 'num_selected' : 'num'">5</span>
          <span :class="currentStep2 >= 5 ? 'name_selected' : 'name'"
            >已经销商收货</span
          >
        </span>
        <span class="item">
          <span :class="currentStep2 == 6 ? 'num_selected' : 'num'">6</span>
          <span :class="currentStep >= 6 ? 'name_selected' : 'name'"
            >订单完结</span
          >
        </span>
        <span class="item">
          <span :class="currentStep2 == 7 ? 'num_selected' : 'num'">7</span>
          <span :class="currentStep >= 7 ? 'name_selected' : 'name'">...</span>
        </span> -->
      </span>
    </span>
    <span class="related_item_order" v-if="tableDataTaskList && tableDataTaskList.length > 0">
      <span class="table_title">相关项>子任务</span>
      <span class="table_content">
        <el-table :data="tableDataTaskList" :stripe="false" style="width: 100%" max-height="115">
          <!-- <el-table-column prop="id" label="操作" width="80px">
            <template #default="scope">
              <div
                style="
                  display: flex;
                  align-items: center;
                  color: #165dff;
                  cursor: pointer;
                "
                @click="viewOrderDetails(scope.row)"
              >
                查看
              </div>
            </template>
          </el-table-column> -->
          <el-table-column prop="id" label="任务编号" />
          <el-table-column prop="status" label="状态">
					  <template #default="scope">
						  <div style="display:flex;align-items:center;">
							  {{scope.row.status?(orderStatusPtions.find(val=>val["code"]==scope.row.status)?.name):"待处理"}}
						  </div>
					  </template>
				  </el-table-column>
        </el-table>
      </span>
    </span>
    <span class="related_item_order" >
      <span class="table_title">相关项>订单</span>
      <span class="table_content">
        <el-table :data="tableDataOrder" :stripe="false" style="width: 100%" max-height="115">
          <el-table-column prop="id" label="操作" width="80px">
            <template #default="scope">
              <div
                style="
                  display: flex;
                  align-items: center;
                  color: #165dff;
                  cursor: pointer;
                "
                @click="viewOrderDetails(scope.row)"
              >
                查看
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="po" label="订单编号" />
          <el-table-column prop="orderFlow" label="订单流程" />
          <el-table-column prop="estimatedDeliveryDays" label="交期天数" />
          <el-table-column prop="orderDate" label="订货日期" />
          <el-table-column prop="planedDeliveryDate" label="计划交货日期" />
          <el-table-column prop="createdTime" label="创建时间" />
        </el-table>
      </span>
    </span>
    <span class="related_item_invoice">
      <span class="table_title">相关项>包装清单</span>
      <span class="table_content">
        <el-table :data="tableDataInvoice" :stripe="false" style="width: 100%" max-height="115">
          <el-table-column prop="id" label="操作" width="160px">
            <template #default="scope">
              <div
                style="
                  display: flex;
                  align-items: center;
                  color: #165dff;
                  cursor: pointer;
                "
                @click="dispatchNoteDetails(scope.row)"
              >
                <span>查看</span>
                <!-- &nbsp;&nbsp;<span>批量提货</span> -->
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="发货单编号" />
          <el-table-column prop="productionOrderNo" label="生产单号" />
          <el-table-column prop="packageCnt" label="包装数量" />
          <el-table-column prop="actualPkgCnt" label="实际包装数量">
            <template #default="scope">
              <div
                style="
                  display: flex;
                  align-items: center;
                  color: #165dff;
                  cursor: pointer;
                "
                @click="actualPkgCntRow(scope.row)"
              >
                <span>{{ scope.row.actualPkgCnt == null ? 0 : scope.row.actualPkgCnt}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="deliveryStatus" label="发货单状态" />
          <el-table-column prop="shippingMethod" label="出库方式" />
          <el-table-column prop="supplyBase" label="供应基地" />
          <el-table-column prop="createdTime" label="创建时间" />
        </el-table>
      </span>
    </span>
    <span class="related_item_invoice">
      <span class="table_title">相关项>派工单</span>
      <span class="table_content">
        <el-table :data="tableDataDispatch" :stripe="false" style="width: 100%" max-height="115">
          <el-table-column prop="view" label="操作" width="160px">
            <template #default="scope">
              <div style="display: flex; align-items: center; color: #165dff; cursor: pointer;">
                <span style="margin-right: 10px;" @click="viewDispatchDetails(scope.row)">查看</span>
                <span @click="viewDispatchWorkers(scope.row)">编辑</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="caseNo" label="派工单编号" />
          <el-table-column prop="followerName" label="派工单负责人" />
          <el-table-column prop="stage__c" label="状态">
             <template #default="scope">
               <span style="color: blue;">{{scope.row["stage__c"] == "0" ? "待开始" : scope.row["stage__c"] == "1" ? "进行中" : "已完成"}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="fieldJobType__c" label="派工种类" >
          <template #default="scope">
            <div style="display:flex;align-items:center;">
						{{scope.row.fieldJobType__c?(technicianTypeOption.find(val=>val["code"]==scope.row.fieldJobType__c)?.name):"配送派工单"}}
						</div>
					</template>
        </el-table-column>
        <el-table-column prop="appointmentStartTime" label="计划开始时间" />
        <el-table-column prop="appointmentEndTime" label="计划结束时间" />
        <el-table-column prop="createdTime" label="创建时间" />
        </el-table>
      </span>
    </span>
    <div class="action_list">
      <div class="left">
        <img src="@/assets/images/comment.png" alt="" />
        <span class="initiate_comments" @click="initiateComments"
          >发起评论</span
        >
      </div>
      <div class="right">
        <!-- <el-button
          v-if="currentStep == 2"
          type="primary"
          @click="takeGoods"
          class="primary_btn"
          >一键确认提货</el-button
        > -->
        <el-button
          v-if="currentStep == 4"
          type="primary"
          @click="createDeliveryOrder"
          class="primary_btn"
          >创建配送派工单</el-button
        >
        <!-- <el-button
          v-if="currentStep == 4"
          type="primary"
          @click="currentStep = 5;currentStep2 = 5"
          class="primary_btn"
          >一键跳过配送</el-button
        > -->
        <el-button
          v-if="currentStep == 5"
          type="primary"
          @click="createInstallationOrder"
          class="primary_btn"
          >创建安装派工单</el-button
        >
        <el-button
          type="primary"
          @click="OpenProblemReportingDialog"
          class="primary_btn"
          >问题提报</el-button
        >
      </div>
    </div>
    <div class="comment" v-for="item in commentList" :key="item.date">
      <div class="userinfo">
        <img src="@/assets/images/userinfo.png" alt="" />
        <span class="username">{{ item["userName"] }}</span>
      </div>
      <div class="content">{{ item["text"] }}</div>
      <div class="date">{{ item["date"] }}</div>
      <span class="reply">回复</span>
      <img class="tips" src="@/assets/images/tips.png" alt="" />
    </div>
    <div class="deliveryOrderDialog">
      <el-dialog
        v-model="deliveryOrderDialog"
        title="新建配送派工单"
        width="80%"
        :show-close="false"
      >
        <div class="step">
          <span class="item">
            <span
              @click="changeDeliveryOrderStep(1)"
              :class="currentDeliveryOrderStep == 1 ? 'num_selected' : 'num'"
              >1</span
            >
            <span
              :class="currentDeliveryOrderStep >= 1 ? 'name_selected' : 'name'"
              >选择配送司机
              <span class="remark">选择配送货品的司机</span>
            </span>
          </span>
          <span class="item">
            <span
              @click="changeDeliveryOrderStep(2)"
              :class="currentDeliveryOrderStep == 2 ? 'num_selected' : 'num'"
              >2</span
            >
            <span
              :class="currentDeliveryOrderStep >= 2 ? 'name_selected' : 'name'"
              >输入派工单注意事项
              <span class="remark">如有,请填写关键备注</span>
            </span>
          </span>
          <span class="item">
            <span
              @click="changeDeliveryOrderStep(3)"
              :class="currentDeliveryOrderStep == 3 ? 'num_selected' : 'num'"
              >3</span
            >
            <span
              :class="currentDeliveryOrderStep >= 3 ? 'name_selected' : 'name'"
              >完成创建
              <span class="remark">等待司机配送</span>
            </span>
          </span>
        </div>
        <div class="content">
          <el-form
            v-if="currentDeliveryOrderStep == 1"
            :model="deliveryOrderForm"
            :rules="deliveryOrderRule"
            ref="deliveryOrderFormRef"
            label-width="90px"
            label-position="left"
          >
          <el-form-item label="人员名称" prop="followerId">              
              <el-select v-model="deliveryOrderForm.followerId" @change="onCahngeUserSelectForDelivery" placeholder="查找或输入服务人员姓名">
                <el-option
                  v-for="item in extralUserData"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
              <span class="custom_item" @click="changeToMyPerson"><img src="@/assets/images/add.png" alt="" /></span>
            </el-form-item>
            <el-form-item label="联系方式" prop="contactTelephone">
              <el-input
                v-model="deliveryOrderForm.contactTelephone"
                placeholder="查找或输入配送司机手机号码"
              />
            </el-form-item>
            
            <el-form-item label="预约开始" prop="appointmentStartTime">
              <el-date-picker
                v-model="deliveryOrderForm.appointmentStartTime"
                type="datetime"
                placeholder="日期/时间"
                value-format="YYYY-MM-DD HH:mm:ss"
                :default-time="defaultStartTime"
                :disabled-date="disabledPastDate"
              />
            </el-form-item>
            <el-form-item label="预约结束" prop="appointmentEndTime">
              <el-date-picker
                v-model="deliveryOrderForm.appointmentEndTime"
                type="datetime"
                placeholder="日期/时间"
                value-format="YYYY-MM-DD HH:mm:ss"
                :default-time="defaultStartTime"
                :disabled-date="disabledPastDate"
              />
            </el-form-item>
            <!-- <el-form-item label="是否具备安装条件" class="check_item">
              <span>
                <el-checkbox
                  v-model="deliveryOrderForm.haveInstallConditions"
                ></el-checkbox>
              </span>
            </el-form-item> -->
          </el-form>
          <el-form
            v-if="currentDeliveryOrderStep == 2"
            :model="deliveryOrderForm"
            :rules="deliveryOrderRule"
            ref="deliveryOrderFormRef"
            label-width="90px"
            label-position="left"
          >
            <!-- <el-form-item label="优先级" prop="priority">
              <el-select v-model="deliveryOrderForm.priority" placeholder="请选择优先级">
                <el-option
                  v-for="item in priorityOption"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </el-form-item> -->
            <el-form-item label="派工类型" prop="type">
              <el-input
                disabled
                placeholder="配送派工"
                v-model="deliveryOrderForm.type"
              />
            </el-form-item>
            <el-form-item label="派工单备注" class="customLayout">
              <el-input
                v-model="deliveryOrderForm.remark"
                :rows="5"
                type="textarea"
                maxlength="500"
                placeholder="请填写派工单备注"
                show-word-limit
              />
            </el-form-item>
            <el-form-item label="上传图片" class="custom_upload">
              <el-upload
                :on-success="handleSuccessDelivery"
                :on-remove="handleDeleteDelivery"
                :auto-upload="true"
                :data="uploadDataDelivery"
                :headers="headers"
                :before-upload="beforeUploadDelivery"
                v-model:file-list="deliveryOrderForm.fileList"
                class="avatar-uploader"
                :action= apiuploadUrl
                :show-file-list="true"
                list-type="picture-card"
              >
                <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button class="cancel_btn" @click="deliveryOrderDialog = false"
              >取消</el-button
            >
            <el-button
              v-if="currentDeliveryOrderStep == 1"
              type="primary"
              class="primary_btn"
              @click="deliveryOrderNextStep"
              >下一步</el-button
            >
            <el-button
              v-if="currentDeliveryOrderStep == 2"
              type="primary"
              class="primary_btn"
              @click="finishDeliveryOrder"
              >完成</el-button
            >
          </div>
        </template>
      </el-dialog>
    </div>
    <div class="installationOrderDialog">
      <el-dialog
        v-model="installationOrderDialog"
        title="新建安装派工单"
        width="80%"
        :show-close="false"
      >
        <div class="step">
          <span class="item">
            <span
              @click="changeInstallationOrderStep(1)"
              :class="
                currentInstallationOrderStep == 1 ? 'num_selected' : 'num'
              "
              >1</span
            >
            <span
              :class="
                currentInstallationOrderStep >= 1 ? 'name_selected' : 'name'
              "
              >选择安装技工
              <span class="remark">选择负责安装的技工</span>
            </span>
          </span>
          <span class="item">
            <span
              @click="changeInstallationOrderStep(2)"
              :class="
                currentInstallationOrderStep == 2 ? 'num_selected' : 'num'
              "
              >2</span
            >
            <span
              :class="
                currentInstallationOrderStep >= 2 ? 'name_selected' : 'name'
              "
              >输入安装派工单注意事项
              <span class="remark">如有,请填写关键备注</span>
            </span>
          </span>
          <span class="item">
            <span
              @click="changeInstallationOrderStep(3)"
              :class="
                currentInstallationOrderStep == 3 ? 'num_selected' : 'num'
              "
              >3</span
            >
            <span
              :class="
                currentInstallationOrderStep >= 3 ? 'name_selected' : 'name'
              "
              >完成创建
              <span class="remark">等待现场服务</span>
            </span>
          </span>
        </div>
        <div class="content">
          <el-form
            v-if="currentInstallationOrderStep == 1"
            :model="installationOrderForm"
            :rules="installationOrderRule"
            label-width="80px"
            label-position="left"
          >            
            <el-form-item label="人员名称" prop="username">
              <!-- <el-input
                placeholder="查找或输入服务人员姓名"
                v-model="installationOrderForm.username"
              /> -->
              <el-select v-model="installationOrderForm.username" @change="onCahngeUserSelectForInstallion" placeholder="查找或输入服务人员姓名">
                <el-option
                  v-for="item in extralUserData"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
              <span class="custom_item1"  @click="changeToMyPerson">
                <img src="@/assets/images/add.png" alt="" />
              </span>
            </el-form-item>
            <el-form-item label="联系方式" prop="phone">
              <el-input
                placeholder="输入联系方式"
                v-model="installationOrderForm.phone"
              />
            </el-form-item>
            <el-form-item label="预约开始" prop="appointmentStartTime">
              <el-date-picker
                v-model="installationOrderForm.appointmentStartTime"
                type="datetime"
                placeholder="日期/时间"
                value-format="YYYY-MM-DD HH:mm:ss"
                ::default-time="defaultStartTime"
                :disabled-date="disabledPastDate"
              />
            </el-form-item>
            <el-form-item label="预约结束" prop="appointmentEndTime">
              <el-date-picker
                v-model="installationOrderForm.appointmentEndTime"
                type="datetime"
                placeholder="日期/时间"
                value-format="YYYY-MM-DD HH:mm:ss"
                :default-time="defaultStartTime"
                :disabled-date="disabledPastDate"
              />
            </el-form-item>
            <el-form-item label="安装小组">
              <span style="width: 300px">
                <el-checkbox
                  v-model="installationOrderForm.installationTeam"
                ></el-checkbox>
              </span>
            </el-form-item>
            <el-form-item label="添加组员" prop="installationTeam" v-if="installationOrderForm.installationTeam">              
                <el-select multiple collapse-tags v-model="installationOrderForm.memberList"  placeholder="请选择组员">
                  <el-option
                    v-for="item in extralUserData"
                    :key="item.name"
                    :label="item.name"
                    :value="item.phone"
                  />
                </el-select>
            </el-form-item>
          </el-form>
          <el-form
            v-if="currentInstallationOrderStep == 2"
            :model="installationOrderForm"
            :rules="installationOrderRule"
            label-width="90px"
            label-position="left"
          >
            <!-- <el-form-item label="优先级" prop="priority">
              <el-select v-model="installationOrderForm.priority" placeholder="请选择优先级">
                <el-option
                  v-for="item in priorityOption"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </el-form-item> -->
            <el-form-item label="派工单备注" class="customLayout">
              <el-input
                v-model="installationOrderForm.remark"
                :rows="5"
                type="textarea"
                maxlength="500"
                placeholder="请填写派工单备注"
                show-word-limit
              />
            </el-form-item>
            <el-form-item label="上传图片" class="custom_upload">
              <el-upload
                :on-success="handleSuccessInstall"
                :on-remove="handleDeleteInstall"
                :auto-upload="true"
                :data="uploadDataInstall"
                :headers="headers"
                :before-upload="beforeUploadInstall"
                :file-list="installationOrderForm.fileList"
                list-type="picture-card"
                class="avatar-uploader"
                :action= apiuploadUrl
                :show-file-list="true"
              >
                <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button
              class="cancel_btn"
              @click="installationOrderDialog = false"
              >取消</el-button
            >
            <el-button
              v-if="currentInstallationOrderStep == 1"
              type="primary"
              class="primary_btn"
              @click="installationOrderNextStep"
              >下一步</el-button
            >
            <el-button
              v-if="currentInstallationOrderStep == 2"
              type="primary"
              class="primary_btn"
              @click="finishInstallationOrder"
              >完成</el-button
            >
          </div>
        </template>
      </el-dialog>
    </div>

    <div class="deliveryOrderDialog">
      <el-dialog
        v-model="editdeliveryOrderDialog"
        title="编辑配送派工单"
        width="80%"
        :show-close="false"
      >
        <div class="step">
          <span class="item">
            <span
              @click="changeDeliveryOrderStep(1)"
              :class="currentDeliveryOrderStep == 1 ? 'num_selected' : 'num'"
              >1</span
            >
            <span
              :class="currentDeliveryOrderStep >= 1 ? 'name_selected' : 'name'"
              >选择配送司机
              <span class="remark">选择配送货品的司机</span>
            </span>
          </span>
        </div>
        <div class="content">
          <el-form
            v-if="currentDeliveryOrderStep == 1"
            :model="editdeliveryOrderForm"
            :rules="deliveryOrderRule"
            ref="deliveryOrderFormRef"
            label-width="90px"
            label-position="left"
          >
          <el-form-item label="人员名称" prop="followerId">              
              <el-select v-model="editdeliveryOrderForm.followerId" @change="onCahngeUserSelectForDelivery" placeholder="查找或输入服务人员姓名">
                <el-option
                  v-for="item in extralUserData"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
              <span class="custom_item" @click="changeToMyPerson"><img src="@/assets/images/add.png" alt="" /></span>
            </el-form-item>
            <el-form-item label="联系方式" prop="contactTelephone">
              <el-input
                v-model="editdeliveryOrderForm.followerPhone"
                placeholder="查找或输入配送司机手机号码"
              />
            </el-form-item>
            
            <el-form-item label="预约开始" prop="appointmentStartTime">
              <el-date-picker
                v-model="editdeliveryOrderForm.appointmentStartTime"
                type="datetime"
                placeholder="日期/时间"
                value-format="YYYY-MM-DD HH:mm:ss"
                :default-time="defaultStartTime"
                :disabled-date="editdisabledPastDate"
              />
            </el-form-item>
            <el-form-item label="预约结束" prop="appointmentEndTime">
              <el-date-picker
                v-model="editdeliveryOrderForm.appointmentEndTime"
                type="datetime"
                placeholder="日期/时间"
                value-format="YYYY-MM-DD HH:mm:ss"
                :default-time="defaultStartTime"
                :disabled-date="editdisabledPastDate"
              />
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button class="cancel_btn" @click="editdeliveryOrderDialog = false"
              >取消</el-button
            >
            <el-button
              v-if="currentDeliveryOrderStep == 1"
              type="primary"
              class="primary_btn"
              @click="editdeliveryOrderNextStep"
              >提交</el-button
            >
          </div>
        </template>
      </el-dialog>
    </div>
    <div class="installationOrderDialog">
      <el-dialog
        v-model="editinstallationOrderDialog"
        title="编辑安装派工单"
        width="80%"
        :show-close="false"
      >
        <div class="step">
          <span class="item">
            <span
              @click="changeInstallationOrderStep(1)"
              :class="
                currentInstallationOrderStep == 1 ? 'num_selected' : 'num'
              "
              >1</span
            >
            <span
              :class="
                currentInstallationOrderStep >= 1 ? 'name_selected' : 'name'
              "
              >选择安装技工
              <span class="remark">选择负责安装的技工</span>
            </span>
          </span>
        </div>
        <div class="content">
          <el-form
            v-if="currentInstallationOrderStep == 1"
            :model="editdeliveryOrderForm"
            :rules="installationOrderRule"
            label-width="80px"
            label-position="left"
          >            
            <el-form-item label="人员名称" prop="followerId">
              <el-select v-model="editdeliveryOrderForm.followerId" @change="onCahngeUserSelectForDelivery" placeholder="查找或输入服务人员姓名">
                <el-option
                  v-for="item in extralUserData"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
              <span class="custom_item1"  @click="changeToMyPerson">
                <img src="@/assets/images/add.png" alt="" />
              </span>
            </el-form-item>
            <el-form-item label="联系方式" prop="followerPhone">
              <el-input
                placeholder="输入联系方式"
                v-model="editdeliveryOrderForm.followerPhone"
              />
            </el-form-item>
            <el-form-item label="预约开始" prop="appointmentStartTime">
              <el-date-picker
                v-model="editdeliveryOrderForm.appointmentStartTime"
                type="datetime"
                placeholder="日期/时间"
                value-format="YYYY-MM-DD HH:mm:ss"
                ::default-time="defaultStartTime"
                :disabled-date="editdisabledPastDate"
              />
            </el-form-item>
            <el-form-item label="预约结束" prop="appointmentEndTime">
              <el-date-picker
                v-model="editdeliveryOrderForm.appointmentEndTime"
                type="datetime"
                placeholder="日期/时间"
                value-format="YYYY-MM-DD HH:mm:ss"
                :default-time="defaultStartTime"
                :disabled-date="editdisabledPastDate"
              />
            </el-form-item>
            <!-- <el-form-item label="安装小组">
              <span style="width: 300px">
                <el-checkbox
                  v-model="editdeliveryOrderForm.installationTeam"
                ></el-checkbox>
              </span>
            </el-form-item>
            <el-form-item
              v-if="editdeliveryOrderForm.installationTeam"
              label="添加组员"
            >
              <span class="custom_item">
                <img src="@/assets/images/add.png" alt="" />
              </span>
            </el-form-item> -->
          </el-form>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button
              class="cancel_btn"
              @click="editinstallationOrderDialog = false"
              >取消</el-button
            >
            <el-button
              v-if="currentInstallationOrderStep == 1"
              type="primary"
              class="primary_btn"
              @click="editdeliveryOrderNextStep"
              >提交</el-button
            >
            <!-- <el-button
              v-if="currentInstallationOrderStep == 2"
              type="primary"
              class="primary_btn"
              @click="finishInstallationOrder"
              >完成</el-button
            > -->
          </div>
        </template>
      </el-dialog>
    </div>


    <div class="problemReportingDialog">
      <el-dialog
        v-model="showProblemReportingDialog"
        title="问题提报"
        width="80%"
        :show-close="false"
      >
        <span class="step">
          <span class="item">
            <span
              :class="currentProblemReportingStep == 1 ? 'num_selected' : 'num'"
              >1</span
            >
            <span class="name"
              >完善提报信息
              <span class="remark">完善问题提报的信息</span>
            </span>
          </span>
          <span class="item">
            <span
              :class="currentProblemReportingStep == 2 ? 'num_selected' : 'num'"
              >2</span
            >
            <span class="name"
              >完成创建
              <span class="remark">等待售服部处理</span>
            </span>
          </span>
        </span>
        <div class="content">
          <el-form
            :model="problemReportingForm"
            :rules="problemReportingRule"
            label-width="90px"
            label-position="left"
          >
            <el-form-item label="订单编号" prop="orderNo">
              <el-input
                placeholder="请选择订单编号"
                v-model="problemReportingForm.orderNo"
              />
            </el-form-item>
            <el-form-item label="客户姓名" prop="customerName">
              <el-select v-model="problemReportingForm.customerName" @change="onCahngeUserSelectForProblemReport" placeholder="查找或选择服务人员姓名">
                <el-option
                  v-for="item in extralUserData"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="客户电话" prop="customerPhone">
              <el-input
                placeholder="请输入客户电话"
                v-model="problemReportingForm.customerPhone"
              />
            </el-form-item>
             <el-form-item label="问题描述" class="customLayout" prop="desc">
              <el-input
                v-model="problemReportingForm.desc"
                :rows="5"
                type="textarea"
                maxlength="500"
                placeholder="请输入问题描述"
                show-word-limit
              />
            </el-form-item>
             <el-form-item label="上传图片" class="custom_upload">
                <el-upload
                :on-success="handleSuccessProblemReport"
                :on-remove="handleDeleteProblemReport"
                :auto-upload="true"
                :data="uploadDataProblemReport"
                :headers="headers"
                :before-upload="beforeUploadProblemReport"
                :file-list="problemReportingForm.fileList"
                list-type="picture-card"
                class="avatar-uploader"
                :action= apiuploadUrl
                :show-file-list="true"
              >
                <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button
              class="cancel_btn"
              @click="showProblemReportingDialog = false"
              >取消</el-button
            >
            <el-button
              type="primary"
              class="primary_btn"
              @click="submitProblemReporting"
              >提交</el-button
            >
          </div>
        </template>
      </el-dialog>
    </div>
    <!-- 查看其他信息 -->
    <div class="relatedDocumentsDialog">
      <el-dialog v-model="ShowRelatedFieldDialogs" title="包装清单明细" width="95%" :show-close="false">
        <div class="content">
          <el-table :data="screenTableDataInvoice" :stripe="false" style="width: 100%" max-height="500">
            <el-table-column prop="name" label="编号" />
            <el-table-column prop="quantity" label="数量" />
            <el-table-column prop="packageNo" label="包装编号" />
            <el-table-column prop="moduleName" label="部件名称" />
            <el-table-column prop="moduleSpec" label="部件尺寸" />
            <el-table-column prop="moduleModel" label="型号" />
            <el-table-column prop="unit" label="单位" />
            <el-table-column prop="installationSite" label="安装位置" />
            <el-table-column prop="openCloseWay" label="开启方式" />
            <el-table-column prop="room" label="房间名" />
            <el-table-column prop="comments" label="备注" />
          </el-table>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" class="primary_btn" @click="ShowRelatedFieldDialogs = false">返回</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
    <!-- 实际包装数量修改 -->
    <div class="relatedDocumentsDialog">
      <el-dialog
        v-model="actualPkgCntDialogs"
        title="修改实际包装数量"
        width="500"
      >
      <el-input v-model="actualPkgCnt" min = "0" type="number" style="width: 240px" placeholder="输入修改数量" />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="actualPkgCntDialogs = false">取消</el-button>
          <el-button type="primary" @click="updateactualPkgCnt()">
            确认
          </el-button>
      </div>
    </template>
  </el-dialog>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, getCurrentInstance, reactive ,onMounted} from "vue"
import { Plus } from "@element-plus/icons-vue"
import { ElMessage, ElMessageBox,FormInstance} from "element-plus"
import { useRoute } from "vue-router"
import { addFieldJob, getExternalUser, getFieldJob ,updateDispatchNote,getOrderListById,getFeildJobList,getDispatchNoteByGet,getLoginInfo, createServiceCase, updateTask, getOrderList, getDispatchNoteList} from "../../api/common";
import { AnyARecord } from "dns";
import { update } from "lodash";
import _ from "lodash"
import { BASE_URL } from "../../api/config"

const apiuploadUrl = `${BASE_URL}/md/api/common/file/upload`;

const { proxy }: any = getCurrentInstance()


const size = ref('default')
const currentStep2 = ref(4)
const actualPkgCnt = ref(0)
const dialogVisible = ref(false)
const commentList = ref<any>([])

const defaultStartTime  = new Date();

const route = useRoute()
const taskid = route.query.id
const orderId = route.query.orderId
// const fieldJobNeoId = route.query.fieldJobNeoId
const taskStatus= route.query.status!=null?parseInt(route.query.status.toString(),0)+1:1
const taskType = route.query.taskType
const mergedOrderNo = route.query.mergedOrderNo
let subStatus = route.query.subStatus
const ShowRelatedFieldDialogs = ref(false)
const actualPkgCntDialogs = ref(false)

const taskDetails=ref({
  taskid:route.query.id,
  orderId:route.query.orderId,
  taskStatus:taskStatus,
  accountName:route.query.accountName,
  distributorName:route.query.distributorName,
  followerName:route.query.followerName,
  createdTime:route.query.createdTime,
  createdBy:route.query.createdBy
})
const technicianTypeOption = ref([
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
const currentStep = ref(taskStatus)
const currentDeliveryOrderStep = ref(1)
const currentInstallationOrderStep = ref(1)
const currentProblemReportingStep = ref(1)
const deliveryOrderFormRef = ref<FormInstance>();

const priorityOption = ref([
    {
			code: "1",
			name: "最高级",
		},
		{
			code: "2",
			name: "高",
		},
		{
			code: "3",
			name: "中",
		},
		{
			code: "4",
			name: "低",
		},
])

let deliveryOrderForm = reactive({
  fieldJobContactName: "",
  contactTelephone: "",
  type: "配送派工",
  remark: "",
  appointmentStartTime: "",
  appointmentEndTime: "",
  haveInstallConditions: false,
  fieldJobOrderId:route.query.orderId,
  fieldJobType__c:0,
  stage__c:0,
  name:taskDetails.value.accountName+"的配送派工单",
  fileList: [] as any,
  filePath:[] as any,
  followerId:null,
  address:""
})

const editdeliveryOrderForm = ref({
  id:"",
  neoId:"",
  // fieldJobContactName: "",
  followerPhone: "",
  appointmentStartTime:"",
  appointmentEndTime:"",
  followerId:null,
  installationTeam:false
})

const deliveryOrderRule = reactive({
  followerId: [
    { required: true, message: "Please input username", trigger: "blur" },
  ],
  fieldJobContactName: [
    { required: true, message: "Please input username", trigger: "blur" },
  ],
  contactTelephone: [{ required: true, message: "Please input phone", trigger: "blur" }],
  appointmentStartTime: [
    {
      required: true,
      message: "Please input appointment start time",
      trigger: "blur",
    },
  ],
  appointmentEndTime: [
    {
      required: true,
      message: "Please input appointment end time",
      trigger: "blur",
    },
  ],
})

const installationOrderForm = reactive<any>({
  username: "",
  phone: "",
  remark: "",
  installationTeam: false,
  appointmentStartTime: "",
  appointmentEndTime: "",
  fileList: [],
  filePath: [],
  fieldJobContactName:"",
  memberList:[]
})

const editinstallationOrderForm = reactive<any>({
  username: "",
  phone: "",
  remark: "",
  appointmentStartTime: "",
  appointmentEndTime: "",
  fieldJobContactName:""
})

const installationOrderRule = reactive({
  username: [
    { required: true, message: "Please input username", trigger: "blur" },
  ],
  phone: [{ required: true, message: "Please input phone", trigger: "blur" }],
  appointmentStartTime: [
    { required: true, message: "Please input appointment start time", trigger: "blur" },
  ],
  appointmentEndTime: [
    { required: true, message: "Please input appointment end time", trigger: "blur" },
  ]
})
const orderData=ref<any>({})
const problemReportingForm = reactive({
  orderNo: "",
  customerName: "",
  customerPhone: "",
  desc: "",
  fileList: [] as any,
  filePath:[] as any
})

const problemReportingRule = reactive({
  customerName: [
    { required: true, message: "Please input customer name", trigger: "blur" },
  ],
  customerPhone: [
    { required: true, message: "Please input customer phone", trigger: "blur" },
  ],
  desc: [
     { required: true, message: "Please input problem description", trigger: "blur" },
  ]
})

const deliveryOrderDialog = ref(false)

const editdeliveryOrderDialog = ref(false)

const editinstallationOrderDialog = ref(false)

const installationOrderDialog = ref(false)

const showProblemReportingDialog = ref(false)

const tableDataTaskList = ref([])

const tableDataOrder = ref([
  // {
  //   text1: "",
  //   text2: "GZ0111-03528-01",
  //   text3: "渠道",
  //   text4: "35",
  //   text5: "2024-02-01",
  //   text6: "2024-03-15",
  //   text7: "2024-02-01 10:30:50"
  // },
] as any)

const tableDataInvoice = ref([
  // {
  //   text1: "",
  //   text2: "FH0111-03010-01",
  //   text3: "待发货",
  //   text4: "快递",
  //   text5: "",
  //   text6: "2024-02-21 10:30:50",
  // },
] as any)

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

const screenTableDataInvoice = ref([])

const tableDataDispatch = ref([] as any)

const mainRef = ref<any>(null);

const token = localStorage.getItem('token') || sessionStorage.getItem('token');

const headers = ref({
    Content: "application/json",
    Authorization: `${token}`, // Here you can add your token
    isImage: "true",
    needFileId: "true",
    "Trace-Id": "",
})

const uploadDataDelivery = ref({
    files: [] as any,
    name: "files"
})

const uploadDataInstall = ref({
    files: [] as any,
    name: "files"
})

const uploadDataProblemReport = ref({
    files: [] as any,
    name: "files"
})

const changeStep = (step) => {
  currentStep.value = step
}

const changeStep2 = (step) => {
  currentStep2.value = step
}

const changeDeliveryOrderStep = (step) => {
  currentDeliveryOrderStep.value = step
}

const changeInstallationOrderStep = (step) => {
  currentInstallationOrderStep.value = step
}

//创建配送派工单
const createDeliveryOrder = () => {
  deliveryOrderDialog.value = true
  getExtralUserData(false,3)
}

const createInstallationOrder = () => {
  installationOrderDialog.value = true
  getExtralUserData(false,1)
}

const deliveryOrderNextStep = () => {
  if(deliveryOrderForm.appointmentStartTime <= deliveryOrderForm.appointmentEndTime){
    currentDeliveryOrderStep.value = 2
  }else{
    ElMessage({
				message: '预约时间有误!',
				type: 'error'
		});
  }
  
}

//编辑修改负责人
const editdeliveryOrderNextStep = () =>{
  if (editdeliveryOrderForm.value.appointmentStartTime <= editdeliveryOrderForm.value.appointmentEndTime) {
    let params = {
      id: editdeliveryOrderForm.value.id,
      neoId: editdeliveryOrderForm.value.neoId,
      followerId: editdeliveryOrderForm.value.followerId,
      appointmentEndTime: editdeliveryOrderForm.value.appointmentEndTime,
      appointmentStartTime: editdeliveryOrderForm.value.appointmentStartTime,
      // fieldJobContactName:editdeliveryOrderForm.fieldJobContactName,
      // contactTelephone:editdeliveryOrderForm.contactTelephone
    }
    addFieldJob(params).then((res: any) => {
      // console.info("res.data.code",res.data.code)
      // console.info("res.data",res.data)
      if (res.data.code == "success") {
        editdeliveryOrderDialog.value = false
        editinstallationOrderDialog.value = false
        otherMethod()
      }
    })
  }else{
    ElMessage({
      message: '计划日期有误!',
      type: 'error'
  	})
  }


}

const installationOrderNextStep = () => {
  currentInstallationOrderStep.value = 2
}

const extralUserData=ref<any>([])

const editinstallationOrderNextStep = async () => {

}

const finishInstallationOrder = async () => {
  let result = ""
  if(Object.keys(installationOrderForm.memberList).length != 0){
    result = Object.values(installationOrderForm.memberList).join(';');
  }
  
  let params = {
    fieldJobContactName: orderData.value.accountName__C==undefined?"":orderData.value.accountName__C,
    contactTelephone: orderData.value.contactTel==undefined?"":orderData.value.contactTel,
    remark: installationOrderForm.remark,
    haveInstallConditions: false,
    fieldJobOrderId: orderData.value.neoid,
    orderNo__c:orderData.value.po,
    mergedOrderNo:mergedOrderNo==undefined?"":mergedOrderNo,
    name:orderData.value.accountName__C+"的安装派工单",
    type: "安装派工",
    fieldJobType__c:1,
    stage__c:0,
    docPicture: installationOrderForm.filePath,
    appointmentStartTime: installationOrderForm.appointmentStartTime,
    appointmentEndTime: installationOrderForm.appointmentEndTime,
    followerId:installationOrderForm.username,
    address:orderData.value.customerAddress==undefined?"":orderData.value.customerAddress,
    status:1,
    source__c:1,
    groupMember__c:result
  }
    addFieldJob(params).then((res : any) => {
			let data = res.data.data;
      tableDataDispatch.value.push(data);
			if (data!=undefined) {
					ElMessage({
						message: '新增派工单成功',
						type: 'success'
					})
          installationOrderDialog.value = false;
          currentInstallationOrderStep.value = 1
          currentStep.value = 5
          installationOrderForm.username = "";
          installationOrderForm.phone = "";
          installationOrderForm.remark = "";
          installationOrderForm.appointmentStartTime = "";
          installationOrderForm.appointmentEndTime = "";
          installationOrderForm.fileList = [];
          installationOrderForm.filePath = [];
          installationOrderForm.fieldJobContactName="";
          installationOrderForm.contactTelephone="";
          let paramsTask = {
            id:taskDetails.value.taskid,
            subStatus:4
          }
          updateTaskData(paramsTask)
			} else {
          ElMessage({
            message: '新增派工单失败',
            type: 'error'
  				})
				
			}
		}).catch((error: any) => {
			// 显示请求失败的提示框
			ElMessage({
				message: '请求新增派工单失败，请重试',
				type: 'error'
			});
		});

}


const viewDispatchDetails = (row:any) =>{
    proxy.$router.push({ path: "/dispatch_details", 
      query: {id:row.id} 
		});
}

//编辑派工人员
const viewDispatchWorkers = (row:any)=>{
  if(currentStep.value == 4){
    editdeliveryOrderDialog.value = true
    getExtralUserData(false,3)
  }else if(currentStep.value == 5){
    editinstallationOrderDialog.value = true
    getExtralUserData(false,1)
  }else{
    ElMessage({
				message: '无法修改派工单!',
				type: 'error'
		});
  }
  // editdeliveryOrderForm.value = row
  editdeliveryOrderForm.value.id = row.id
  editdeliveryOrderForm.value.neoId = row.neoId
  editdeliveryOrderForm.value.followerPhone = row.followerPhone
  editdeliveryOrderForm.value.appointmentStartTime = row.appointmentStartTime
  editdeliveryOrderForm.value.appointmentEndTime = row.appointmentEndTime
  editdeliveryOrderForm.value.followerId = row.followerId
  editdeliveryOrderForm.value.installationTeam = row.installationTeam
}

const viewOrderDetails = (row:any) =>{
  proxy.$router.push({
    path: "/historical_orders_details", query: {
      id: row.id,
      po: row.po,
      status_c:row.status_c
    },
  });
}

//包装清单详情
const dispatchNoteDetails = (row:any) =>{
  const matched = tableDataInvoice.value.find(item => item.name === row.name);
  screenTableDataInvoice.value = matched ? matched.items : null;
  ShowRelatedFieldDialogs.value = true
}

//修改实际包装数量
let rowList = ref(null)
const actualPkgCntRow = (row:any) =>{
  rowList.value = row
  actualPkgCntDialogs.value = true
  actualPkgCnt.value = row.actualPkgCnt
}

const updateactualPkgCnt = () =>{
  if(actualPkgCnt.value < 0){
    ElMessage({
      message: '实际包装数量不能小于0',
      type: 'error'
    })
    return "";
  }
  let params = {
    id:rowList.value.id,
    neoId:rowList.value.neoId,
    actualPkgCnt:actualPkgCnt.value
  }
  // console.info("paramsinfo",params)
  updateDispatchNote(params).then((res : any) => {
    console.info("resinfo",res)
    ElMessage({
      message: '修改成功',
      type: 'success'
    })
    otherMethod()
	}).catch((error: any) => {
    ElMessage({
      message: '实际包装数量修改失败：'+ error.message,
      type: 'error'
    })
	});
  actualPkgCntDialogs.value = false
}

const finishDeliveryOrder =  () => {
  let params = deliveryOrderForm;
  params["fieldJobContactName"]=orderData.value.accountName__C==undefined?"":orderData.value.accountName__C.toString();
  params["contactTelephone"]=orderData.value.contactTel==undefined?"":orderData.value.contactTel.toString();
  params["address"]=orderData.value.customerAddress==undefined?"":orderData.value.customerAddress;
  params["picture"] = params.filePath;
  params["goodsPicture"] = params.filePath;
  params["name"] = orderData.value.accountName__C+"的配送派工单";
  params["status"]=1;
  params["orderNo__c"] = orderData.value["po"];
  params["source__c"]=1;
  params["fieldJobOrderId"]=orderData.value.neoid;
  params["mergedOrderNo"]=mergedOrderNo==undefined?"":mergedOrderNo;
  addFieldJob(params).then((res : any) => {
			let data = res.data.data;
      tableDataDispatch.value.push(data);
			if (data!=undefined) {
					ElMessage({
						message: '新增派工单成功',
						type: 'success'
					})
          let paramsTask = {
            id:taskDetails.value.taskid,
            subStatus:2
          }
          updateTaskData(paramsTask)

			} else {
          ElMessage({
            message: '新增派工单失败',
            type: 'error'
  				})
				
			}
      Object.keys(deliveryOrderForm).forEach(key => {
        if(!key.includes("type")&&!key.includes("haveInstallConditions")&&key!=="fieldJobOrderId"&&key!=="fieldJobType__c"&&key!=="stage__c"&&key!=="name") deliveryOrderForm[key] = '';
        if(key==="haveInstallConditions") deliveryOrderForm[key] =false;
        if(key=="fileList" || key=="filePath") deliveryOrderForm[key] = [];
      });
		}).catch((error: any) => {
			// 显示请求失败的提示框
			ElMessage({
				message: '请求新增派工单失败，请重试',
				type: 'error'
			});
      Object.keys(deliveryOrderForm).forEach(key => {
        if(key!=="type"&&key!=="haveInstallConditions"&&key!=="fieldJobOrderId"&&key!=="fieldJobType__c"&&key!=="stage__c"&&key!=="name") deliveryOrderForm[key] = '';
        if(key=="haveInstallConditions") deliveryOrderForm[key] =false;
        if(key=="fileList" || key=="filePath") deliveryOrderForm[key] = [];
      });
			console.error('请求新增派工单失败:', error);
		});
  deliveryOrderDialog.value = false
  // proxy.$message.success("派工单创建完成!")
  currentDeliveryOrderStep.value = 1
  // currentStep.value = 5
}

const OpenProblemReportingDialog = () => {
  showProblemReportingDialog.value = true
}

const submitProblemReporting = () => {
  // console.log("problemReportingForm",problemReportingForm)
  for(let key in problemReportingForm){
    if(key != "orderNo" && key != "fileList" && key != "filePath" && problemReportingForm[key] == ""){
      proxy.$message.error("必填字段不能为空!");
      return;
    }
  }
  let params = {
    orderNeoId: orderData.value.neoid,
    // orderNeoId: problemReportingForm.value["orderNo"],
    customerName: problemReportingForm["customerName"],
    // caseAccountId: problemReportingForm.value["customerName"],
    phone: problemReportingForm["customerPhone"],
    problemDescription: problemReportingForm["desc"],
    picture: problemReportingForm["filePath"],
    caseStatus: "1",
    questionType:1,
    complaintSourceC:4,
    caseSource:11,
    clientCaseStatusC:1,
  }
  createServiceCase(params).then(res =>{
    let rtData = res.data;
    if(rtData.code == "success"){
      problemReportingForm["orderNo"] ="";
      problemReportingForm["customerName"] ="";
      problemReportingForm["customerPhone"] ="";
      problemReportingForm["desc"] ="";
      problemReportingForm["fileList"] =[];
      problemReportingForm["filePath"] =[];
      showProblemReportingDialog.value = false
      proxy.$message.success("提交成功!");;
    }
    else{
      proxy.$message.error(rtData?.message)
    }
  })
}

const takeGoods = () => {
  proxy.$message.success("提货任务完成!")
  currentStep.value = 3
}

const initiateComments = () => {
  ElMessageBox.prompt("请填写评论内容", "发起评论", {
    inputPattern: /\S/,
    inputErrorMessage: "评论内容不能为空!",
    confirmButtonText: "确认",
    cancelButtonText: "取消",
  })
    .then(({ value }) => {
      commentList.value.push({
        userName: "经销商",
        text: value,
        date: new Date().toLocaleString(),
      })
    })
    .catch(() => {})
}

const otherMethod = () => {
  getOrderByOne(false,orderId)
};

onMounted(()=>{
  // getFieldJobByGet(true,fieldJobNeoId)
  getOrderByOne(false,orderId)
  // getExtralUserData(false,0)
  subtaskList()
  // getFieldList(false,orderId)
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
        if(mainRef.value){
          mainRef.value.style.height = `calc(${document.body.clientHeight / scale}px - ${40 * scale}px - 10px)`;
        }
      }
      else{
        if(mainRef.value){
          mainRef.value.style.height = `calc(${document.body.clientHeight}px - 40px)`;
        }

      }
  },0));
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

// {{scope.row.status?(subStatusCode.find(val=>val["code"]==scope.row.status)?.name):"待开始"}}

const getSubStatusName = (statusCode) => {
  const status = subStatusCode.value.find(val => val.code === statusCode);
  return status ? status.name : " "; // 默认返回 "待开始" 如果没有匹配的状态
}

const subStatusCode = ref([
		{
			code: "1",
			name: "待配送",
		},
		{
			code: "2",
			name: "配送中",
		},
		{
			code: "3",
			name: "待安装",
		},
		{
			code: "4",
			name: "安装中",
		},
		{
			code: "5",
			name: "待评价",
		},
    {
			code: "6",
			name: "已评价",
		}
	])


///delivery
const handleSuccessDelivery = (res) => {
  // console.log(res);
  if(res.code == "success"){
    let path = res.data.map(val => val["fileId"]);
    if(path[0]){
      deliveryOrderForm["filePath"].push(path[0])
    }    
  }
}
    
const handleDeleteDelivery = (res) => {
  var resopnse = res["response"];
}

const beforeUploadDelivery = (file) => {
  if (file.size / 1024 / 1024 > 20) {
    ElMessage.error('上传图片大小不能超过20MB!')
    return false
  }
  uploadDataDelivery.value["files"] = [file]
}

const getOrderByOne = (showMsg: boolean,orderId:any)=>{
  
  getOrderListById(orderId).then((res : any) => {
			let data = res.data.data
			if (data!=undefined) {
        orderData.value = data
        problemReportingForm.orderNo=orderData.value.po
        // tableDataOrder.value.push(data)
        getFieldList(false,orderData.value.neoid)
        if(mergedOrderNo&&mergedOrderNo!=""){
          getDispatchNoteByOrder(false,mergedOrderNo) 
        }else{
          getDispatchNoteByOrder(false,orderData.value.po)
          tableDataOrder.value.push(data)
        }               
				if(showMsg)
				{
					ElMessage({
						message: '查询成功',
						type: 'success'
					})
				}
			} else {
        if(showMsg){
          ElMessage({
            message: '获取数据失败',
            type: 'error'
  				})
        }
				
			}
  })
  if(mergedOrderNo && mergedOrderNo!=""){
    let params={
      orderNo:mergedOrderNo.toString().split(";")
    }
    getOrderList(params).then((res : any) => {
			let data = res.data.data
			if (data!=undefined) {
        tableDataOrder.value=data     
			}
  })
  }
}

const getFieldList = (showMsg: boolean,orderId:any)=>{
  if(orderId==undefined){
    return;
  }
  let params={"fieldJobOrderId":orderId}  
  getFeildJobList(params).then((res : any) => {
			let data = res.data.data
			if (data!=undefined) {
        tableDataDispatch.value=data
				if(showMsg)
				{
					ElMessage({
						message: '查询成功',
						type: 'success'
					})
				}
			} else {
        if(showMsg){
          ElMessage({
            message: '获取数据失败',
            type: 'error'
  				})
        }
				
			}
  })
}

const getDispatchNoteByOrder = (showMsg: boolean,orderNo:any)=>{
  if(orderNo==undefined){
    return;
  }
  let params={
    orderNo:orderNo.split(";")
  }
  getDispatchNoteList(params).then((res : any) => {
			let data = res.data.data
			if (data!=undefined) {
        tableDataInvoice.value=data
				if(showMsg)
				{
					ElMessage({
						message: '查询成功',
						type: 'success'
					})
				}
			} else {
        if(showMsg){
          ElMessage({
            message: '获取数据失败',
            type: 'error'
  				})
        }
				
			}
  })
}

const getExtralUserData = (showMsg: boolean,userType)=>{
  let params= {"userType": userType,"name": "","phone": ""} ;
  getExternalUser(params).then((res : any) => {
			let data = res.data.data
			if (data!=undefined&&data.length>0) {
        extralUserData.value = data
				if(showMsg)
				{
					ElMessage({
						message: '查询成功',
						type: 'success'
					})
				}
			} else {
        if(showMsg){
          ElMessage({
            message: '获取数据失败',
            type: 'error'
  				})
        }
				
			}
  })
}

///install
const handleSuccessInstall = (res) => {
  // console.log(res);
  if(res.code == "success"){
    let path = res.data.map(val => val["fileId"]);
    if(path[0]){
      installationOrderForm["filePath"].push(path[0])
    }
    // installationOrderForm["filePath"] = installationOrderForm["filePath"].concat(path)
  }
}
    
const handleDeleteProblemReport = (res) => {
  var resopnse = res["response"];
}

const beforeUploadProblemReport = (file) => {
  uploadDataProblemReport.value["files"] = [file];
}

const handleSuccessProblemReport = (res) => {
  // console.log(res);
  if(res.code == "success"){
    let path = res.data.map(val => val["fileId"]);
    if(path[0]){
      problemReportingForm["filePath"].push(path[0])
    }
    // installationOrderForm["filePath"] = installationOrderForm["filePath"].concat(path)
  }
}
    
const handleDeleteInstall = (res) => {
  var resopnse = res["response"];
}

const beforeUploadInstall = (file) => {
  if (file.size / 1024 / 1024 > 20) {
    ElMessage.error('上传图片大小不能超过20MB!')
    return false
  }
  uploadDataProblemReport.value["files"] = [file];
}

const onCahngeUserSelectForInstallion = (event) => {
  let item = extralUserData.value.find(val => val["id"] == event);
  if(item){
    installationOrderForm["fieldJobContactName"] = item["name"];
    installationOrderForm["phone"]=item["phone"];
    editinstallationOrderForm["fieldJobContactName"] = item["name"];
    editinstallationOrderForm["phone"]=item["phone"];
    //installationOrderForm.value["customerPhone"] = item["phone"];
  }
}

const onCahngeUserSelectForDelivery = (event) => {
  let item = extralUserData.value.find(val => val["id"] == event);
  if(item){
    deliveryOrderForm["fieldJobContactName"] = item["name"];
    deliveryOrderForm["contactTelephone"] = item["phone"];
    editdeliveryOrderForm.value.followerPhone = item["phone"];
    // editdeliveryOrderForm.value.fieldJobContactName = item["name"];
    // editdeliveryOrderForm["contactTelephone"] = item["phone"];
    //installationOrderForm.value["customerPhone"] = item["phone"];
  }
}

const onCahngeUserSelectForProblemReport = (event) => {
  let item = extralUserData.value.find(val => val["id"] == event);
  if(item){
    problemReportingForm["customerName"] = item["name"];
    problemReportingForm["customerPhone"] = item["phone"];    
    //installationOrderForm.value["customerPhone"] = item["phone"];
  }
}

const currentStepToPeiSong=()=>{
  if(currentStep.value>=4){
    proxy.$message.warning("配送已完成，无法点击配送")
    return;
  }
  ElMessageBox.confirm(
    '确认到货后，再进行派单?',
    '配送',
    {
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning',
    }
  )
    .then(() => {
      let params={
        id:taskDetails.value.taskid,
        status:3,
        subStatus:1
      }
      updateTask(params).then((res:any)=>{
        if(res.data.code="success"){
          currentStep.value=4
          subStatus = "1"
        }
      })
    })
    .catch(() => {
      // ElMessage({
      //   type: 'info',
      //   message: 'Delete canceled',
      // })
    })
}

//更新子任务状态方法
const updateTaskData = (params) => {
  updateTask(params).then((res:any)=>{
    if(res.data.code="success"){
      subStatus = params.subStatus
    }
  })
}

const subtaskList =()=>{
  let params={
    mergeTaskId:taskDetails.value.taskid
  }
  getLoginInfo(params).then((res:any)=>{
    if(res?.data?.code == "success"){
      tableDataTaskList.value = res.data.data
    }
  })
}

//日期控件不能选择小于当前日期的时间
const disabledPastDate=(time:any)=>{
  return time.getTime()< Date.now()-24*60*60*1000
}

const editdisabledPastDate=(time:any)=>{
  return time.getTime() < Date.now();
}
const changeToMyPerson=(()=>{
  proxy.$router.push('my_personnel')
})
</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
