<template>
  <div class="main">
    <span class="header">
      <span class="title"><span>问题提报状态</span><el-button class="btn" @click="upgradeToHeadquarters">升级到总部
          (售后)</el-button></span>
      <span class="step">
        <span class="item">
          <span :class="currentItem['caseStatus'] == 1 ? 'num_selected' : 'num'">1</span>
          <span :class="currentItem['caseStatus'] >= 1 ? 'name_selected' : 'name'">待处理</span>
        </span>
        <span class="item">
          <span :class="currentItem['caseStatus'] == 2 ? 'num_selected' : 'num'">2</span>
          <span :class="currentItem['caseStatus'] >= 2 ? 'name_selected' : 'name'">已受理</span>
        </span>
        <span class="item">
          <span :class="currentItem['caseStatus'] == 3 ? 'num_selected' : 'num'">3</span>
          <span :class="currentItem['caseStatus'] >= 3 ? 'name_selected' : 'name'">处理中</span>
        </span>
        <span class="item">
          <span @click="completeServiceCase" :class="currentItem['caseStatus'] == 4 ? 'num_selected' : 'num'">4</span>
          <span :class="currentItem['caseStatus'] >= 4 ? 'name_selected' : 'name'">已完成</span>
        </span>
      </span>
    </span>
    <span class="problem_report_info">
      <span class="title">问题提报详情<span class="titleDateTime">{{
          caseStatus <= 2 && caseStatus> 0 ? formatTime(remainingSeconds) : ""
            }}</span></span>
      <span class="main_field">
        <span class="row_field">
          <span class="field">
            <span class="label">问题编号：</span>
            <span class="value">{{ currentItem["caseNo"] }}</span>
            <span v-if="false" class="view">查看</span>
          </span>
          <span class="field">
            <span class="label">专卖店名称：</span>
            <span class="value">{{ currentItem["storeName"] }}</span>
          </span>
          <span class="field">
            <span class="label">问题类别：</span>
            <span class="value">{{
              currentItem["questionType"] == "1" ? "售后报修" : "投诉建议"
              }}</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">订单编号：</span>
            <span class="value">{{ orderDetails["po"] }}</span>
          </span>
          <span class="field">
            <span class="label">负责人：</span>
            <span class="value">{{ currentItem["followerName"] }}</span>
          </span>
          <span class="field">
            <span class="label">创建时间：</span>
            <span class="value">{{ currentItem["createdTime"] }}</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">问题描述：</span>
            <span class="value">{{ currentItem["problemDescription"] }}</span>
          </span>
          <span class="field">
            <span class="label">来源：</span>
            <span class="value">{{
              currentItem["complaintSourceC"]
              ? complaintSource.find(
              (val) => val["code"] == currentItem["complaintSourceC"]
              )?.name
              : ""
              }}</span>
          </span>
          <span class="field">
            <span class="label">提报人：</span>
            <span class="value">{{ currentItem["externalUserName"] }}</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">提报人电话：</span>
            <span class="value">{{ currentItem["externalUserPhone"] }}</span>
          </span>
          <span class="field">
            <span class="label">购买门店名称：</span>
            <span class="value">{{ currentItem["purchaseStoreName"] }}</span>
          </span>
        </span>
      </span>
      <span class="title">其他字段</span>
      <span class="other_field">
        <span class="row_field">
          <span class="field">
            <span class="label">客户姓名：</span>
            <span class="value">{{ currentItem["customerName"] }}</span>
          </span>
          <span class="field">
            <span class="label">客户手机号：</span>
            <span class="value">{{ currentItem["phone"] }}</span>
          </span>
          <span class="field">
            <span class="label">经销商处理结论：</span>
            <span class="value">{{ currentItem["processingProcessAndResults"] }}</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">省份：</span>
            <span class="value">{{
              convertProvince(currentItem["province"])
              }}</span>
          </span>
          <span class="field">
            <span class="label">城市：</span>
            <span class="value">{{ convertCity(currentItem["city"]) }}</span>
          </span>
          <span class="field">
            <span class="label">区：</span>
            <span class="value">{{
              convertDistrict(currentItem["district"])
              }}</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">经销商内部提报：</span>
            <el-checkbox v-model="checkedForJXSTiBao" disabled></el-checkbox>
          </span>
          <span class="field" v-if="currentItem['complaintSourceC'].toString()=='2'">
            <span class="label">是否现场处理：</span>
            <el-checkbox v-model="checkedwhetherProcess" disabled></el-checkbox>
          </span>
          <span class="field">
            <span class="label"></span>
            <span class="value"></span>
          </span>
        </span>
      </span>
    </span>
    <span class="related_documents">
      <span class="title">相关单据</span>
      <el-button class="btn">{{
        relatedDocumentsAftersalesWorkorderList.length
        }}个售后工单</el-button>
      <el-button class="btn">{{ relatedDocumentsDispatchList.length }}个派工单</el-button>
      <el-button class="btn">{{ serviceCaseAttachment.length }}个附件</el-button>
      <span class="view" @click="showRelatedDocumentsDialogClick">点击查看</span>
    </span>
    <span class="action_list">
      <div class="left">
        <img src="@/assets/images/comment.png" alt="" />
        <span class="initiate_comments" @click="initiateComments">发起评论</span>
      </div>
      <div class="right">
        <el-button type="primary" @click="editServiceCase" class="primary_btn">编辑</el-button>
        <el-button type="primary" @click="createDeliveryOrder" class="primary_btn">创建派工单</el-button>
      </div>
    </span>
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
    <div class="showMainDialog">
      <el-dialog v-model="showMainDialog" title="升级到总部 (售后)" width="80% " :show-close="false">
        <div class="step">
          <span class="item">
            <span @click="changeDialogStep(1)" :class="currentDialogStep == 1 ? 'num_selected' : 'num'">1</span>
            <span class="name">确认问题订单
              <span class="remark">选择或确认问题订单</span>
            </span>
          </span>
          <span class="item">
            <span @click="changeDialogStep(2)" :class="currentDialogStep == 2 ? 'num_selected' : 'num'">2</span>
            <span class="name">完善必填信息
              <span class="remark">完善问题描述与处理方式</span>
            </span>
          </span>
          <span class="item">
            <span @click="changeDialogStep(3)" :class="currentDialogStep == 3 ? 'num_selected' : 'num'">3</span>
            <span class="name">提交升级
              <span class="remark">提交售后至总部</span>
            </span>
          </span>
        </div>
        <template v-if="currentDialogStep == 1">
          <span class="form_row_shengji">
            <span class="label required">订单编号:</span>
            <el-input disabled v-model="formDialog.orderNo" placeholder="订单编号" style="width: auto"></el-input>
          </span>
          <span class="form_row_shengji">
            <span class="label required">生产单号:</span>
            <el-input disabled v-model="formDialog.productionOrderNo__c" placeholder="生产单号" style="width: auto"></el-input>
          </span>
          <div class="form_row_shengji">
            <span class="label required">经销商需求描述:</span>
            <el-input v-model="formDialog.remark" placeholder="输入升级描述" style="width: auto"></el-input>
          </div>
          <div class="search">
            <span class="label required">客户已有{{ serviceTicket.length ? serviceTicket.length : 0 }}个历史售后工单</span>
          </div>
          <div class="table">
            <el-table ref="multipleTableRef" :selection-change="handleSelectionChange" :data="serviceTicket"
              :stripe="false" style="width: 100%; overflow: auto" max-height="400">
              <el-table-column prop="checked" label="全选" width="80px">
                <template #default="scope">
                  <el-checkbox v-if="scope.row.operate == false" disabled v-model="scope.row.checked" />
                  <el-checkbox v-if="scope.row.operate == true" v-model="scope.row.checked" />
                </template>
              </el-table-column>
              <el-table-column prop="name" label="售后工单编号">
                <template #default="scope">
                  <div style="
                      display: flex;
                      align-items: center;
                      color: #165dff;
                      cursor: pointer;
                    " @click="handleView(scope.row)">
                    {{ scope.row.name }}
                  </div>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="distributorNo" label="经销商名称" /> -->
              <el-table-column prop="status__c" label="审批状态">
                <template #default="scope">
                  <div style="display: flex; align-items: center">
                    {{
                    scope.row.approvalStatus
                    ? seviceTicketapprovalStatus.find(
                    (val) => val["code"] == scope.row.approvalStatus
                    )?.name
                    : ""
                    }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="storeName" label="专卖店名称" />
              <el-table-column prop="status__c" label="状态">
                <template #default="scope">
                  <div style="display: flex; align-items: center">
                    {{
                    scope.row.status__c
                    ? seviceTicketStatusOptions.find(
                    (val) => val["code"] == scope.row.status__c
                    )?.name
                    : ""
                    }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column width="150" prop="serviceCase__c" label="问题编号" />
              <el-table-column prop="reporter__c" label="提报人" />
              <el-table-column prop="problemDescription__c" label="问题描述 " />
              <el-table-column prop="noteSummary" label="售后回复 " />
              <el-table-column prop="solutionSummary" label="处理方式汇总 " />
              <el-table-column prop="distributorDemands__c" label="经销商需求描述 " />
              <el-table-column prop="createdTime" label="创建时间 " />
              
              <!-- <el-table-column prop="operate" label="操作">
                <template #default="scope">
                  <el-checkbox disabled v-if="scope.row.operate" v-model="scope.row.operate" :value="scope.row.operate"
                    style="
                      --el-disabled-text-color: #ff8127;
                      --el-checkbox-disabled-checked-icon-color: white;
                      --el-checkbox-disabled-checked-input-fill: #ff8127;
                      --el-checkbox-text-color: #ff8127;
                    ">已绑定</el-checkbox>
                  <div v-else style="
                      display: flex;
                      align-items: center;
                      color: #165dff;
                      cursor: pointer;
                    " @click="bindServiceTicket(scope.row, false)">
                    点击绑定
                  </div>
                </template>
              </el-table-column> -->
            </el-table>
          </div>

          <!-- <span class="form_row">
            <span class="label required">订单编号</span>
            <el-select style="width:368px ;" v-model="formDialog.orderNo" filterable @change="" placeholder="请选择订单编号">
              <el-option v-for="item in orderList" :key="item.po" :label="item.po" :value="item.po" />
            </el-select>
          </span>
          <span class="form_row">
            <span class="label">升级备注</span>
            <el-input v-model="formDialog.remark" placeholder="输入自定义备注"></el-input>
          </span> -->
        </template>
        <template v-if="currentDialogStep == 2">
          <div class="desc_action">
            <span class="desc">搜索和选择/批量编辑问题产品</span>
            <span class="action">
              <el-button style="display: none" class="btn" @click="openDialog2(1)">完善问题描述</el-button>
              <el-button style="display: none" class="btn" @click="openDialog2(2)">定义处理方式</el-button>
            </span>
          </div>
          <!-- <div class="search">
            <el-input v-model="formDialog.searchValue" placeholder="搜索"></el-input>
          </div> -->
          <div class="filter_list">
            <el-select v-model="formDialog.orderType" placeholder="清除筛选" @change="clearFilterChange">
              <el-option v-for="item in filterList2Clear" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-model="formDialog.productType" placeholder="产品大类" @change="categoryFilterChange">
              <el-option v-for="item in filterList2Category" :key="item.value" :label="item.label"
                :value="item.value" />
            </el-select>
            <el-select v-model="formDialog.productModel" placeholder="产品型号" @change="fscProductModelFilterChange">
              <el-option v-for="item in filterList2fscProductModel" :key="item.value" :label="item.label"
                :value="item.value" />
            </el-select>
            <el-select v-model="formDialog.treeSpecies" placeholder="树种" @change="treeSpeciesCFilterChange">
              <el-option v-for="item in filterList2treeSpecies__c" :key="item.value" :label="item.label"
                :value="item.value" />
            </el-select>
            <el-select v-model="formDialog.paintColor" placeholder="油漆颜色" @change="paintColorCFilterChange">
              <el-option v-for="item in filterList2paintColor__c" :key="item.value" :label="item.label"
                :value="item.value" />
            </el-select>
            <el-select v-model="formDialog.size" placeholder="尺寸" @change="fscProductSpecFilterChange">
              <el-option v-for="item in filterList2fscProductSpec" :key="item.value" :label="item.label"
                :value="item.value" />
            </el-select>
          </div>
          <div class="table">
            <!-- style="width: 100%;max-height: 200px;overflow: auto; -->
            <el-table ref="multipleTableRef" :selection-change="handleSelectionChange" :data="tableData2Filter"
              :stripe="false" style="width: 100%; overflow: auto" max-height="200">
              <el-table-column prop="checked" label="全选" width="80px">
                <template #header>
                  <el-checkbox @change="selectAll">全选</el-checkbox>
                </template>
                <template #default="scope">
                  <el-checkbox v-model="scope.row.checked" />
                </template>
              </el-table-column>
              <!-- <el-table-column type="selection" width="55" /> -->
              <el-table-column prop="orderPo" label="订单编号" />
              <el-table-column prop="sku" label="详单编号" />
              <el-table-column prop="category1" label="产品大类" />
              <el-table-column prop="fscProductModel" label="产品型号" />
              <el-table-column prop="treeSpecies__c" label="树种" />
              <el-table-column prop="paintColor__c" label="油漆颜色 " />
              <el-table-column prop="fscProductSpec" label="尺寸 " />
              <el-table-column prop="solution" label="处理方式 ">
                <template #default="scope">
                  <div style="display: flex; align-items: center">
                    {{
                    scope.row.solution
                    ? solutionTypeList.find(
                    (val) =>
                    val["code"] == scope.row.solution
                    )?.name
                    : ""
                    }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="subtotalLossAmount" label="损失金额 " />
              <el-table-column prop="note" label="售后回复 " />
              <el-table-column prop="ticketClassification" label="问题大类">
                <template #default="scope">
                  <div style="display: flex; align-items: center">
                    {{
                    scope.row.ticketClassification
                    ? problemTypeList.find(
                    (val) =>
                    val["code"] == scope.row.ticketClassification
                    )?.name
                    : ""
                    }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="ticketProblem" label="售后问题 ">
                <!-- <template #default="scope">
                  <div style="display: flex; align-items: center">
                    {{
                      scope.row.ticketProblem
                      ? afterSalesIssuesList.find(
                        (val) => val["code"] == scope.row.ticketProblem
                      )?.name
                      : ""
                    }}
                  </div>
                </template> -->
              </el-table-column>
              <!-- <el-table-column prop="" label="责任人 " /> -->
              <el-table-column prop="descriptionOfTicketProblem" label="问题描述 " />
            </el-table>
          </div>
          <div class="responsibilityPerson">
            <span class="label required">问题大类</span>
            <el-select v-model="dialog2Form.problemType" placeholder="" @change="handleProblemTypeChange">
              <el-option v-for="item in problemTypeList" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
            <span class="label required">售后问题</span>
            <el-select multiple collapse-tags v-model="dialog2Form.afterSalesIssues" placeholder="">
              <el-option v-for="item in afterSalesIssuesListForSelect" :key="item.code" :label="item.name"
                :value="item.code" />
            </el-select>
            <!-- <span class="label required">责任人</span>
            <el-input v-model="dialog2Form.responsiblePerson" style="width: 240px" placeholder="请输入责任人" /> -->
          </div>
          <div class="responsibilityPerson">
            <span class="label required">问题描述</span>
            <el-input v-model="dialog2Form.problemDesc" style="width: 440px" :rows="2" type="textarea"
              placeholder="请输入问题描述" />
          </div>
          <div class="responsibilityPerson">
            <span class="label">上传文件</span>
          </div>
          <div class="containerUpload">
            <span class="item">
              <!-- <el-upload
                name="files"
                :on-success="handleUploaded"
                class="upload"
                drag
                action="https://sh.mengtian.com.cn:9595/md/api/common/file/upload"
                multiple
              >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">将文件拖至此处 或 点击上传</div>
                <template #tip>
                  <div class="el-upload__tip">
                    jpg/png files with a size less than 500kb
                  </div>
                </template>
              </el-upload> -->
              <el-upload :on-success="handleSuccess" :on-remove="handleDelete" :auto-upload="true" :data="uploadDatas"
                :headers="headers" :before-upload="beforeUpload" list-type="picture-card" class="avatar-uploader"
                :action= apiuploadUrl :show-file-list="true"
                v-model:file-list="dialog2Form.fileList">
                <el-icon>
                  <Plus />
                </el-icon>
              </el-upload>
            </span>
          </div>
        </template>
        <template #footer>
          <div class="dialog-footer">
            <el-button class="cancel_btn" @click="showMainDialog = false">取消</el-button>
            <el-button v-if="currentDialogStep == 1" @click="currentDialogStepBut" type="primary" class="primary_btn"
              style="margin-left: 50px !important">新建售后工单</el-button>
            <el-button v-if="currentDialogStep == 2" @click="submitDialog" type="primary" class="primary_btn"
              style="margin-left: 50px !important">提交</el-button>
          </div>
        </template>
      </el-dialog>
    </div>

    <!-- 创建派工单--维修-->
    <div class="deliveryOrderDialog">
      <el-dialog v-model="deliveryOrderDialog" title="新建配送派工单" width="80%" :show-close="false">
        <div class="step">
          <span class="item">
            <span @click="changeDeliveryOrderStep(1)"
              :class="currentDeliveryOrderStep == 1 ? 'num_selected' : 'num'">1</span>
            <span :class="currentDeliveryOrderStep >= 1 ? 'name_selected' : 'name'">选择维修工程师
              <span class="remark">选择维修工程师</span>
            </span>
          </span>
          <span class="item">
            <span @click="changeDeliveryOrderStep(2)"
              :class="currentDeliveryOrderStep == 2 ? 'num_selected' : 'num'">2</span>
            <span :class="currentDeliveryOrderStep >= 2 ? 'name_selected' : 'name'">输入派工单注意事项
              <span class="remark">如有,请填写关键备注</span>
            </span>
          </span>
          <span class="item">
            <span @click="changeDeliveryOrderStep(3)"
              :class="currentDeliveryOrderStep == 3 ? 'num_selected' : 'num'">3</span>
            <span :class="currentDeliveryOrderStep >= 3 ? 'name_selected' : 'name'">完成创建
              <span class="remark">等待司机配送</span>
            </span>
          </span>
        </div>
        <div class="content">
          <el-form v-if="currentDeliveryOrderStep == 1" :model="deliveryOrderForm" :rules="deliveryOrderRule"
            ref="deliveryOrderFormRef" label-width="90px" label-position="left">
            <el-form-item label="人员名称" prop="followerId">
              <el-select v-model="deliveryOrderForm.followerId" @change="onCahngeUserSelectForDelivery"
                placeholder="查找或输入服务人员姓名">
                <el-option v-for="item in extralUserData" :key="item.name" :label="item.name" :value="item.id" />
              </el-select>
              <span class="custom_item" @click="changeToMyPerson"><img src="@/assets/images/add.png" alt="" /></span>
            </el-form-item>
            <el-form-item label="联系方式" prop="contactTelephone">
              <el-input v-model="deliveryOrderForm.contactTelephone" placeholder="查找或输入服务人员手机号码" />
            </el-form-item>

            <el-form-item label="预约开始" prop="appointmentStartTime">
              <el-date-picker v-model="deliveryOrderForm.appointmentStartTime" type="datetime" placeholder="日期/时间"
                value-format="YYYY-MM-DD HH:mm:ss" :default-time="defaultStartTime" :disabled-date="disabledPastDate" />
            </el-form-item>
            <el-form-item label="预约结束" prop="appointmentEndTime">
              <el-date-picker v-model="deliveryOrderForm.appointmentEndTime" type="datetime" placeholder="日期/时间"
                value-format="YYYY-MM-DD HH:mm:ss" :default-time="defaultStartTime" :disabled-date="disabledPastDate" />
            </el-form-item>
            <!-- <el-form-item label="是否具备安装条件" class="check_item">
              <span>
                <el-checkbox v-model="deliveryOrderForm.haveInstallConditions"></el-checkbox>
              </span>
            </el-form-item> -->
          </el-form>
          <el-form v-if="currentDeliveryOrderStep == 2" :model="deliveryOrderForm" :rules="deliveryOrderRule"
            ref="deliveryOrderFormRef" label-width="90px" label-position="left">
            <el-form-item label="优先级" prop="priority">
              <el-select v-model="deliveryOrderForm.priority" placeholder="选择优先级">
                <el-option v-for="item in priority" :key="item.code" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
            <el-form-item label="派工类型" prop="fieldJobType__c">
              <el-select v-model="deliveryOrderForm.fieldJobType__c" placeholder="选择派工类型">
                <el-option v-for="item in dispatchType" :key="item.code" :label="item.name" :value="item.code" />
              </el-select>
              <!-- <el-input
                disabled
                placeholder="配送派工"
                v-model="deliveryOrderForm.type"
              /> -->
            </el-form-item>
            <el-form-item label="派工单备注" class="customLayout">
              <el-input v-model="deliveryOrderForm.remark" :rows="5" type="textarea" maxlength="500"
                placeholder="请填写派工单备注" show-word-limit />
            </el-form-item>
            <el-form-item label="上传图片" class="custom_upload">
              <el-upload :on-success="handleSuccessDelivery" :on-remove="handleDeleteDelivery" :auto-upload="true"
                :data="uploadDataDelivery" :headers="headers" :before-upload="beforeUploadDelivery"
                v-model:file-list="deliveryOrderForm.fileList" class="avatar-uploader"
                :action= apiuploadUrl :show-file-list="true"
                list-type="picture-card">
                <el-icon class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button class="cancel_btn" @click="deliveryOrderDialog = false">取消</el-button>
            <el-button v-if="currentDeliveryOrderStep == 1" type="primary" class="primary_btn"
              @click="deliveryOrderNextStep">下一步</el-button>
            <el-button v-if="currentDeliveryOrderStep == 2" type="primary" class="primary_btn"
              @click="finishDeliveryOrder">完成</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
    <!-- 创建派工单 -->
    <!-- 编辑问题描述及负责人按钮 -->
    <div class="editcontentDialog">
      <el-dialog v-model="editServerCasecontentDialog" title="编辑" width="40%" :show-close="false">
        <div class="content">
          <el-form :model="editFollowerAndPDescriptForm" :rules="editFollowerAndPDescriptFormRule"
            ref="deditFollowerAndPDescriptFormRef" label-width="90px" label-position="left">
            <el-form-item label="订单编号" prop="orderNeoId">
              <!-- <el-select filterable v-model="editFollowerAndPDescriptForm.orderNeoId" @change="onChangeOrderSelect"
                placeholder="请选择订单编号" remote reserve-keyword remote-show-suffix :remote-method="remoteMethod"
                :loading="loadingForSecrchOrder">
                <el-option v-for="item in orderList" :key="item.po" :label="item.po" :value="item.neoid">
                  <span style="float: left">{{ item.po }}</span>
                  <span style="float: right;color: var(--el-text-color-secondary);font-size: 13px;">
                    {{ item.accountName__C }}--{{ item.contactTel }}--{{ item.productsAmount }}
                  </span>
                </el-option>
              </el-select> -->
              <!-- <el-select
                  v-model="editFollowerAndPDescriptForm.orderNeoId"
                  multiple
                  filterable
                  allow-create
                  default-first-option
                  :reserve-keyword="false"
                  @change="onChangeOrderSelect"
                  remote
                  remote-show-suffix 
                  :remote-method="remoteMethod"
                  placeholder="请选择订单编号"
                  :loading="loadingForSecrchOrder"
                >
                  <el-option
                    v-for="item in orderList"
                    :key="item.po"
                    :label="item.po"
                    :value="item.neoid"
                  ></el-option>
              </el-select> -->
                <el-select
                  v-model="editFollowerAndPDescriptForm.orderNeoId"
                  filterable
                  allow-create
                  remote-show-suffix
                  default-first-option
                  remote
                  placeholder="请选择订单编号"
                  @change="onChangeOrderSelect"
                  :remote-method="remoteMethod"
                  reserve-keyword
                  :loading="loadingForSecrchOrder"
                  >
                <el-option
                  v-for="item in orderList"
                  :key="item.po"
                  :label="item.po"
                  :value="item.neoid"
                  >
                  <span style="float: left">{{ item.po }}</span>
                  <span style="float: right;color: var(--el-text-color-secondary);font-size: 13px;">
                    {{ item.accountName__C }}--{{ item.contactTel }}--{{ item.productsAmount }}
                  </span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客户名称" prop="customerName">
              <el-input v-model="editFollowerAndPDescriptForm.customerName
                " placeholder="请输入客户名称" />
            </el-form-item>
            <el-form-item label="客户电话" prop="phone">
              <el-input v-model="editFollowerAndPDescriptForm.phone
                " placeholder="请输入客户电话" />
            </el-form-item>
            <el-form-item label="问题描述" prop="problemDescription">
              <el-input type="textarea" v-model="editFollowerAndPDescriptForm.problemDescription
                " placeholder="请输入问题描述" />
            </el-form-item>
            <el-form-item label="负责人" prop="followerId">
              <el-select filterable v-model="editFollowerAndPDescriptForm.followerId"
                @change="onCahngeUserSelectForEditServiceCase" placeholder="请选择负责人">
                <el-option v-for="item in extralUserData" :key="item.name" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="经销商处理结论" prop="processingProcessAndResults">
              <el-input type="textarea" v-model="editFollowerAndPDescriptForm.processingProcessAndResults
                " placeholder="请输入经销商处理结论" />
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button class="cancel_btn" @click="editServerCasecontentDialog = false">取消</el-button>
            <el-button type="primary" class="primary_btn" @click="SaveServiceData">保存</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
    <!-- 相关单据数据table -->
    <div class="relatedDocumentsDialog">
      <el-dialog v-model="showRelatedDocumentsDialog" title="相关单据" width="80%" :show-close="false">
        <div class="content">
          <span class="tableItem">
            <span class="tableTitle"> 1. 售后工单 </span>
            <span class="tableContent">
              <el-table :data="relatedDocumentsAftersalesWorkorderList" :stripe="false" style="width: 100%;height:200px;">
                <el-table-column prop="name" label="售后工单编号" />
                <el-table-column prop="serviceTicketType__c" label="类别" />
                <el-table-column prop="text3" label="负责人" />
                <el-table-column prop="status__c" label="状态">
                  <template #default="scope">
                    <div style="display: flex; align-items: center">
                      {{
                      scope.row.status__c
                      ? seviceTicketStatusOptions.find(
                      (val) => val["code"] == scope.row.status__c
                      )?.name
                      : ""
                      }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="updatedTime" label="修改时间" />
                <el-table-column label="操作" width="80px">
                  <template #default="scope">
                    <div style="
                        display: flex;
                        align-items: center;
                        color: #165dff;
                        cursor: pointer;
                      " @click="handleView(scope.row)">
                      查看
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </span>
          </span>
          <span class="tableItem">
            <span class="tableTitle"> 2. 派工单 </span>
            <span class="tableContent">
              <el-table :data="relatedDocumentsDispatchList" :stripe="false" style="width: 100%">
                <el-table-column prop="caseNo" label="派工单编号" />
                <el-table-column prop="fieldJobType__c" label="类别">
                  <template #default="scope">
                    <div style="display: flex; align-items: center">
                      {{
                      scope.row.fieldJobType__c
                      ? technicianTypeOption.find(
                      (val) => val["code"] == scope.row.fieldJobType__c
                      )?.name
                      : "配送派工单"
                      }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="followerName" label="负责人" />
                <el-table-column prop="status" label="状态">
                  <template #default="scope">
                    <div style="display: flex; align-items: center; color: blue">
                      {{
                      scope.row.stage__c
                      ? dispatchWorkerStatusOption.find(
                      (val) => val["code"] == scope.row.stage__c
                      )?.name
                      : "待开始"
                      }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="updatedTime" label="修改时间" />
                <el-table-column label="操作" width="80px">
                  <template #default="scope">
                    <div style="
                        display: flex;
                        align-items: center;
                        color: #165dff;
                        cursor: pointer;
                      " @click="dispatch(scope.row)">
                      查看
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </span>
          </span>
          <span class="tableItem">
            <span class="tableTitle"> 3. 问题提报附件 </span>
            <span class="tableContent">
              <el-table :data="serviceCaseAttachment" :stripe="false" style="width: 100%" max-height="150">
                <el-table-column prop="picNo" label="附件编号" />
                <el-table-column prop="type" label="类型" />
                <el-table-column prop="text3" label="附件链接">
                  <template #default="{ row }">
                    <template v-for="(image, index) in row.picture" :key="index">
                      <el-image style="margin-right: 5px; width: 50px" :src="image" :preview-src-list="row.picture">
                      </el-image>
                    </template>
                  </template>
                </el-table-column>
              </el-table>
            </span>
          </span>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" class="primary_btn" @click="showRelatedDocumentsDialog = false">返回</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, getCurrentInstance, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox, ElLoading } from "element-plus";
import { useRoute } from "vue-router";
import { Plus } from "@element-plus/icons-vue";
import {
  getServiceCaseItem,
  getPickList,
  getOrderList,
  addFieldJob,
  getticketsolution,
  getOrderListById,
  getServiceticketList,
  getExternalUser,
  getFeildJobList,
  getOrderListByNeoId,
  updateOrCreateServiceticket,
  getTicketSolutionByTicketId,
  createServiceCase,
  getServiceticketById,
} from "../../api/common.js";
import moment from "moment";
import { BASE_URL } from "../../api/config"

const apiuploadUrl = `${BASE_URL}/md/api/common/file/upload`;

const { proxy }: any = getCurrentInstance();
const defaultStartTime = new Date();
const commentList = ref<any>([]);
const currentDeliveryOrderStep = ref(1);
const route = useRoute();
const id = ref(route.query.id);
const neoid = ref<any>(route.query.neoid);
let caseneoId = null;
const taskStatus =
  route.query.status != null
    ? parseInt(route.query.status.toString(), 0) + 1
    : 1;
const showRelatedDocumentsDialog = ref(false);
const orderList = ref([]);
const extralUserData = ref<any>([]);
const tableDataDispatch = ref([]);
const deliveryOrderDialog = ref(false);
const editcontentDialog = ref(false);
const editServerCasecontentDialog = ref(false);
const tableData = ref([]);
const tableData2Filter = ref([]);
const serviceTicket = ref([]);
const selectedRows = ref([]);
const currentItem = ref<any>({});
const provinceList = ref([]);
const cityList = ref([]);
const districtList = ref([]);
const checkedForJXSTiBao=ref(false);
const checkedwhetherProcess=ref(false);
let solutionId = "";
let remainingSeconds = ref<number>();
let caseStatus = 0;
let timeout = "";
const serviceCaseAttachment = ref([] as any);
const curOrderForSelect=ref({} as any);
// 显示遮罩层
// const loadingInstance = ElLoading.service({ fullscreen: true,lock: true,
//     text: '等待数据同步完成',
//     background: 'rgba(0, 0, 0, 0.7)',
//   });
let loadingInstance = null;
//新增售后工单被销售易同步标识
let isSynced = false;

const formDialog = ref<any>({
  orderNo: "",
  productionOrderNo__c:"",
  remark: "",
  searchValue: "",
  orderType: "",
  productType: "",
  productModel: "",
  treeSpecies: "",
  paintColor: "",
  size: "",
});

const dialog2Form = ref<any>({
  serviceTicketId: 0,
  problemType: "",
  afterSalesIssues: [],
  // responsiblePerson: "",
  problemDesc: "",
  fileList: [],
  filePath: [],
  poductType: "",
  componentType: "",
  badType: "",
  qualityIndicator1: "",
  qualityIndicator2: "",
  handleWay: "",
});

const filterList2Clear = ref([{ label: "清除", value: "1" }]);

const filterList2Category = ref([{ label: "全部产品大类", value: "1" }]);

const filterList2fscProductModel = ref([{ label: "全部产品型号", value: "1" }]);

const filterList2treeSpecies__c = ref([{ label: "全部树种", value: "1" }]);

const filterList2paintColor__c = ref([{ label: "全部油漆颜色", value: "1" }]);

const filterList2fscProductSpec = ref([{ label: "全部尺寸", value: "1" }]);

///图片上传组合数组
const fileIdList = ref<any>([]);
const handleUploaded = (rep) => {
  fileIdList.value = fileIdList.value.concat(
    rep.data.map((item) => item.fileId)
  );
};


const handleSuccess = (res) => {
  console.log(res);
  if (res.code == "success") {
    fileIdList.value = fileIdList.value.concat(
    res.data.map((item) => item.fileId)
  );
    // let path = res.data.map(val => val["fileUrl"]);
    // dialog2Form.value["filePath"] = dialog2Form.value["filePath"].concat(path)
    // console.log("dialog2Form.value",dialog2Form.value["filePath"]);
  }
}

const handleDelete = (res) => {
  var resopnse = res["response"];
  if(resopnse.code == "success"){
    const fileIdToDelete = resopnse.data[0].fileId;
    const indexToDelete = fileIdList.value.findIndex(fileId => fileId === fileIdToDelete);
    if (indexToDelete !== -1) {
      fileIdList.value.splice(indexToDelete, 1);
    }
  }
}

const multipleTableRef = ref();
const multipleSelection = ref([]);

const handleSelectionChange = (val) => {
  console.info("选择的数据：", val);
  multipleSelection.value = val;
};

const tableDataOrderDetials = ref([
  // {
  //   text1: "CS0011-06665-01",
  //   text2: "门套",
  //   text3: "示例字段...",
  //   text4: "混油米灰1#",
  //   text5: "2021-02-28 10:30:50",
  //   text6: "",
  // },
  // {
  //   text1: "CS0011-06665-01",
  //   text2: "门套",
  //   text3: "示例字段...",
  //   text4: "混油米灰1#",
  //   text5: "2021-02-28 10:30:50",
  //   text6: "",
  // },
  // {
  //   text1: "CS0011-06665-01",
  //   text2: "门套",
  //   text3: "示例字段...",
  //   text4: "混油米灰1#",
  //   text5: "2021-02-28 10:30:50",
  //   text6: "",
  // },
  // {
  //   text1: "CS0011-06665-01",
  //   text2: "门套",
  //   text3: "示例字段...",
  //   text4: "混油米灰1#",
  //   text5: "2021-02-28 10:30:50",
  //   text6: "",
  // },
]);

const tableDataServiceEvaluation = ref([
  {
    text1: "SU2024030101",
    text2: "已评价",
    text3: "其他",
    text4: "满意",
    text5: "2021-02-28 10:30:50",
    text6: "",
  },
]);

const problemTypeList = ref<any>([
  { code: "1", name: "经销商问题" },
  { code: "2", name: "公司问题" },
  { code: "3", name: "物流问题" },
]);

const solutionTypeList = ref<any>([
  { code: "1", name: "补偿处理" },
  { code: "2", name: "现场处理" },
  { code: "3", name: "售后重做" },
  { code: "4", name: "公司售后(收费)" },
  { code: "5", name: "公司售后返修" },
  { code: "6", name: "加盟商售后返修" },
  { code: "7", name: "售后补单(家装)" },
  { code: "8", name: "现场维修(公司)" },
])

const afterSalesIssuesList = ref<any>([
  { code: "1", name: "店面测量师漏单" },
  { code: "2", name: "店面测量师量错" },
  { code: "3", name: "店里设计师漏分解" },
  { code: "4", name: "店里设计师分解错" },
  { code: "5", name: "店里设计不合理" },
  { code: "6", name: "店里下单员漏单" },
  { code: "7", name: "店里下单员下错" },
  { code: "8", name: "店里安装师问题" },
  { code: "9", name: "消费者补单" },
  { code: "10", name: "消费者使用不当" },
  { code: "11", name: "产品丢失" },
  { code: "12", name: "公司问题" },
  { code: "13", name: "物流问题" },
]);

const afterSalesIssuesListForSelect = ref([] as any);
const afterSalesIssuesListWithType = ref<any>({
  "1": [
    { code: "1", name: "店面测量师漏单" },
    { code: "2", name: "店面测量师量错" },
    { code: "3", name: "店里设计师漏分解" },
    { code: "4", name: "店里设计师分解错" },
    { code: "5", name: "店里设计不合理" },
    { code: "6", name: "店里下单员漏单" },
    { code: "7", name: "店里下单员下错" },
    { code: "8", name: "店里安装师问题" },
    { code: "9", name: "消费者补单" },
    { code: "10", name: "消费者使用不当" },
    { code: "11", name: "产品丢失" }
  ],
  "2": [{ code: "12", name: "公司问题" }],
  "3": [{ code: "13", name: "物流问题" }]
});

const poductTypeList = ref<any>([
  { code: "1", name: "墙板" },
  { code: "2", name: "线条" },
  { code: "3", name: "五金" },
  { code: "4", name: "门套" },
  { code: "5", name: "门扇" },
  { code: "6", name: "柜体" },
  { code: "7", name: "柜门" },
  { code: "8", name: "玻璃" },
  { code: "9", name: "挂板" },
  { code: "10", name: "罗马柱" },
  { code: "11", name: "帽头" },
  { code: "12", name: "装饰块" },
  { code: "13", name: "雕花件" },
  { code: "14", name: "色板" },
  { code: "15", name: "整单" },
  { code: "16", name: "入户门" },
]);

const componentTypeList = ref<any>([
  { code: "1", name: "边梃" },
  { code: "2", name: "挂线条" },
  { code: "3", name: "芯板" },
  { code: "4", name: "金属条" },
  { code: "5", name: "码头" },
  { code: "6", name: "封边" },
  { code: "7", name: "L边" },
  { code: "8", name: "整体" },
  { code: "9", name: "面板执手" },
  { code: "10", name: "锁体" },
  { code: "11", name: "铰链" },
  { code: "12", name: "铰链底座" },
  { code: "13", name: "灯带" },
  { code: "14", name: "抽屉轨道" },
  { code: "15", name: "三合一" },
  { code: "16", name: "其他五金" },
  { code: "17", name: "档条" },
  { code: "18", name: "密封条" },
  { code: "19", name: "套板" },
  { code: "20", name: "门套" },
  { code: "21", name: "玻璃" },
  { code: "22", name: "门标" },
  { code: "23", name: "门芯板" },
  { code: "24", name: "配件" },
  { code: "25", name: "五金配件" },
  { code: "26", name: "8属边" },
  { code: "27", name: "背板" },
  { code: "28", name: "层板" },
  { code: "29", name: "抽屉板" },
  { code: "30", name: "底板" },
  { code: "31", name: "顶板" },
  { code: "32", name: "台面板" },
  { code: "33", name: "立板" },
  { code: "34", name: "侧板" },
  { code: "35", name: "踢脚板" },
  { code: "36", name: "五金件" },
  { code: "37", name: "挂板" },
  { code: "38", name: "罗马柱" },
  { code: "39", name: "帽头" },
  { code: "40", name: "装饰块" },
  { code: "41", name: "雕花件" },
  { code: "42", name: "色板" },
  { code: "43", name: "整单" },
  { code: "44", name: "修补漆" },
  { code: "45", name: "入户门扇" },
]);

const badTypeList = ref<any>([
  { code: "1", name: "消费者" },
  { code: "2", name: "经销商" },
  { code: "3", name: "订单分解" },
  { code: "4", name: "备料" },
  { code: "5", name: "加工" },
  { code: "6", name: "免漆加工" },
  { code: "7", name: "油漆" },
  { code: "8", name: "少货" },
  { code: "9", name: "包装问题" },
  { code: "10", name: "五金问题" },
  { code: "11", name: "辅料问题" },
  { code: "12", name: "仓库发货" },
  { code: "13", name: "物流送达" },
  { code: "14", name: "系统问题" },
  { code: "15", name: "新品设计问题" },
  { code: "16", name: "隔音等级" },
  { code: "17", name: "受潮" },
  { code: "18", name: "无法提供证明的少货" },
  { code: "19", name: "交期延误" },
  { code: "20", name: "霉变" },
  { code: "21", name: "气味" },
  { code: "22", name: "长虫" },
  { code: "23", name: "过质保期" },
  { code: "24", name: "变色" },
  { code: "25", name: "入户门问题" },
]);

const aftersalesHeaderDetails = ref<any>({});
const qualityIndicator1List = ref<any>([
  { code: "1", name: "订单分解错" },
  { code: "2", name: "订单漏分解" },
  { code: "3", name: "变形" },
]);

const qualityIndicator2List = ref<any>([
  { code: "1", name: "漏备注" },
  { code: "2", name: "产品漏分解" },
  { code: "3", name: "配件漏分解" },
  { code: "4", name: "五金漏分解" },
  { code: "5", name: "孔位漏分解" },
]);

const handleWayList = ref<any>([
  {
    label: "处理方式",
    value: "1",
  },
]);

const relatedDocumentsDispatchList = ref([]);

const complaintSource = ref([
  { code: "1", name: "配送技工" },
  { code: "2", name: "安装技工" },
  { code: "3", name: "客户" },
  { code: "4", name: "经销商" },
]);

const dispatchType = ref([
  { code: "0", name: "配送派工" },
  { code: "1", name: "安装派工" },
  { code: "2", name: "维修" },
]);

const priority = ref([
  { code: "1", name: "最高" },
  { code: "2", name: "高" },
  { code: "3", name: "中" },
  { code: "4", name: "低" },
]);

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
]);

const dispatchWorkerStatusOption = ref([
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
]);

const seviceTicketapprovalStatus = ref([
  {
    code: "0",
    name: "待提交",
  },
  {
    code: "1",
    name: "审批中",
  },
  {
    code: "2",
    name: "审批拒绝",
  },
  {
    code: "3",
    name: "审批通过",
  },
  {
    code: "4",
    name: "撤回",
  }
])

const seviceTicketStatusOptions = ref([
  {
    code: "",
    name: "全部",
  },
  {
    code: "1",
    name: "已提报问题",
  },
  {
    code: "3",
    name: "售后审核",
  },
  {
    code: "2",
    name: "已定损",
  },
  {
    code: "4",
    name: "定责发起",
  },
  {
    code: "5",
    name: "已提交OA审批",
  },
  {
    code: "7",
    name: "已追责",
  },
  {
    code: "10",
    name: "已结案",
  }
]);

const currentDialogStep = ref(1);

const showMainDialog = ref(false);

const showMainDialog2 = ref(false);

//远程搜索订单模糊查询加载
const loadingForSecrchOrder = ref(false)

const dialogType = ref(1);

const createDeliveryOrder = () => {
  deliveryOrderDialog.value = true;
};

const uploadDataDelivery = ref({
  files: [],
  name: "files",
});

const uploadDatas = ref({
  files: [],
  name: "files",
});

const beforeUpload = (file) => {
  if (file.size / 1024 / 1024 > 20) {
    ElMessage.error('上传图片大小不能超过20MB!')
    return false
  }
  uploadDatas.value["files"] = [file];
};

const beforeUploadDelivery = (file) => {
  if (file.size / 1024 / 1024 > 20) {
    ElMessage.error('上传图片大小不能超过20MB!')
    return false
  }
  uploadDataDelivery.value["files"] = [file];
};

const filterList = ref({
  value1: "1",
  value2: "1",
  value3: "1",
  value4: "1",
  value5: "1",
  value6: "1",
});

const deliveryOrderNextStep = () => {
  currentDeliveryOrderStep.value = 2;
};

const taskDetails = ref({
  taskid: route.query.id,
  serviceCaseNeoId: route.query.serviceCaseId,
  orderId: route.query.orderId,
  taskStatus: taskStatus,
  accountName: route.query.accountName,
  distributorName: route.query.distributorName,
  followerName: route.query.followerName,
  createdTime: route.query.createdTime,
  createdBy: route.query.createdBy,
});

let deliveryOrderForm = reactive({
  fieldJobContactName: "",
  contactTelephone: "",
  priority: "",
  type: "2",
  remark: "",
  appointmentStartTime: "",
  appointmentEndTime: "",
  haveInstallConditions: false,
  fieldJobOrderId: route.query.orderId,
  fieldJobType__c: "2",
  stage__c: 0,
  name: taskDetails.value.accountName + "的配送派工单",
  fileList: [] as any,
  filePath: [] as any,
  followerId: null,
  address: "",
  source__c: 1,
});

const deliveryOrderRule = reactive({
  followerId: [
    { required: true, message: "Please input username", trigger: "blur" },
  ],
  fieldJobContactName: [
    { required: true, message: "Please input username", trigger: "blur" },
  ],
  contactTelephone: [
    { required: true, message: "Please input phone", trigger: "blur" },
  ],
  priority: [
    { required: true, message: "Please input priority", trigger: "blur" },
  ],
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
});

const handleDeleteDelivery = (res) => {
  var resopnse = res["response"];
};

const handleSuccessDelivery = (res) => {
  if (res.code == "success") {
    let path = res.data.map((val) => val["fileId"]);
    if (path[0]) {
      deliveryOrderForm["filePath"].push(path[0]);
    }
  }
};

let editFollowerAndPDescriptForm = reactive({
  processingProcessAndResults: "",
  followerId: null,
  customerName:"",
  phone:"",
  orderNeoId:"",
  problemDescription:""
});

const editFollowerAndPDescriptFormRule = reactive({
  followerId: [{ required: true, message: "请选择负责人", trigger: "blur" }],
  processingProcessAndResults: [
    { required: true, message: "请输入经销商处理结论", trigger: "blur" },
  ],
  orderNeoId: [
    { required: true, message: "请选择订单", trigger: "blur" },
  ],
});

const uploadData = ref({
  files: [],
  name: "files",
});

const token = localStorage.getItem('token') || sessionStorage.getItem('token');

const headers = ref({
    Content: "application/json",
    Authorization: `${token}`, // Here you can add your token
    isImage: "true",
    needFileId: "true",
    "Trace-Id": "",
})

const getExtralUserData = (showMsg: boolean) => {
  let params = { userType: 2, name: "", phone: "" };
  getExternalUser(params).then((res: any) => {
    let data = res.data.data;
    if (data != undefined && data.length > 0) {
      extralUserData.value = data;
      if (showMsg) {
        ElMessage({
          message: "查询成功",
          type: "success",
        });
      }
    } else {
      if (showMsg) {
        ElMessage({
          message: "获取数据失败",
          type: "error",
        });
      }
    }
  });
};

const onCahngeUserSelectForEditServiceCase = (event) => {
  let item = extralUserData.value.find((val) => val["id"] == event);
  if (item) {
    // editFollowerAndPDescriptForm["followerId"] = item["id"];
    editFollowerAndPDescriptForm["follower"] = item["neoId"];
    editFollowerAndPDescriptForm["followerName"] = item["name"];
    //installationOrderForm.value["customerPhone"] = item["phone"];
  }
};

const onCahngeUserSelectForDelivery = (event) => {
  let item = extralUserData.value.find((val) => val["id"] == event);
  if (item) {
    deliveryOrderForm["fieldJobContactName"] = item["name"];
    deliveryOrderForm["contactTelephone"] = item["phone"];
    //installationOrderForm.value["customerPhone"] = item["phone"];
  }
};

const onChangeOrderSelect = (event) => {
  let item = orderList.value.find((val) => val["neoid"] == event);
  if (item) {
    editFollowerAndPDescriptForm["customerName"] = item["accountName__C"];
    editFollowerAndPDescriptForm["phone"] = item["contactTel"];
    //installationOrderForm.value["customerPhone"] = item["phone"];
    curOrderForSelect.value=item
  }
};

const SaveServiceData = () => {
  let params = {
    followerId: editFollowerAndPDescriptForm["followerId"]==undefined?currentItem.value["followerId"]:editFollowerAndPDescriptForm["followerId"],
    follower: editFollowerAndPDescriptForm["follower"]==undefined?currentItem.value["follower"]:editFollowerAndPDescriptForm["follower"],
    followerName: editFollowerAndPDescriptForm["followerName"]==undefined?currentItem.value["followerName"]:editFollowerAndPDescriptForm["followerName"],
    processingProcessAndResults: editFollowerAndPDescriptForm["processingProcessAndResults"]==undefined?currentItem.value["processingProcessAndResults"]:editFollowerAndPDescriptForm["processingProcessAndResults"],
    id: id.value,
    questionType: currentItem.value["questionType"],
    name: currentItem.value["name"],
    caseStatus:currentItem.value["caseStatus"],
    customerName:editFollowerAndPDescriptForm["customerName"],
    phone:editFollowerAndPDescriptForm["phone"],
    problemDescription:editFollowerAndPDescriptForm["problemDescription"],
    orderNeoId:editFollowerAndPDescriptForm["orderNeoId"]
  };
  createServiceCase(params).then((res) => {
    let resData = res.data;
    if (resData.code == "success" && resData.data != undefined) {
      currentItem.value["followerName"] =
        editFollowerAndPDescriptForm["followerName"];
      currentItem.value["processingProcessAndResults"] =
        editFollowerAndPDescriptForm["processingProcessAndResults"];
      currentItem.value["customerName"] =
        editFollowerAndPDescriptForm["customerName"];
      currentItem.value["phone"] =
        editFollowerAndPDescriptForm["phone"];
      currentItem.value["problemDescription"] =
        editFollowerAndPDescriptForm["problemDescription"];
      currentItem.value["orderNeoId"] =
        editFollowerAndPDescriptForm["orderNeoId"];
      orderDetails.value=curOrderForSelect.value
      // Object.keys(editFollowerAndPDescriptForm).forEach((key) => {
      //   if (key !== "followerId") editFollowerAndPDescriptForm[key] = "";
      //   if (key == "followerId") editFollowerAndPDescriptForm[key] = null;
      // });
      proxy.$message.success("保存成功");
      editServerCasecontentDialog.value = false;
    } else {
      proxy.$message.warning("保存失败");
    }
  });
};



const relatedDocumentsProblemReportingList = ref([]);

const relatedDocumentsAftersalesWorkorderList = ref([]);

onMounted(() => {
  getDetailsData();
  getProvinceList();
  getCityList();
  getDistrictList();
  getExtralUserData(false);
  postfieldjobeList(); //相关派工单记录
  postserviceticketList(); //相关售后工单记录
});

const otherMethod = () => {
  getDetailsData();
  getProvinceList();
  getCityList();
  getDistrictList();
  getExtralUserData(false);
  postfieldjobeList(); //相关派工单记录
  postserviceticketList(); //相关售后工单记录
};

//问题提报详情
const getDetailsData = () => {
  getServiceCaseItem({
    id: id.value,
    neoid: neoid.value == undefined ? "" : neoid.value,
  }).then((res) => {
    let rtData = res.data;
    if (rtData.code == "success") {
      currentItem.value = rtData.data;
      formDialog.value["orderNo"] = currentItem.value["caseNo"];
      caseStatus = currentItem.value["caseStatus"];
      editFollowerAndPDescriptForm["processingProcessAndResults"] =
        currentItem.value["processingProcessAndResults"];
      checkedForJXSTiBao.value = currentItem.value["complaintSourceC"].toString()=="4"
      checkedwhetherProcess.value = currentItem.value["complaintSourceC"].toString()=="2"
      editFollowerAndPDescriptForm["followerName"] =
        currentItem.value["followerName"];
      editFollowerAndPDescriptForm["processingProcessAndResults"] =
        currentItem.value["processingProcessAndResults"];
      editFollowerAndPDescriptForm["customerName"] =
        currentItem.value["customerName"];
      editFollowerAndPDescriptForm["phone"] =
        currentItem.value["phone"];
      editFollowerAndPDescriptForm["problemDescription"] =
        currentItem.value["problemDescription"];
      editFollowerAndPDescriptForm["orderNeoId"] =
        currentItem.value["orderNeoId"];
      editFollowerAndPDescriptForm["followerId"]=currentItem.value["followerId"]
      var baseUrl =
        "https://sh.mengtian.com.cn:9595/md/api/common/file/direct-download?fileId=";
      if (
        currentItem.value["picture"] != undefined &&
        currentItem.value["picture"].length > 0
      ) {
        var picture = [] as any;
        currentItem.value["picture"].forEach((item) => {
          picture.push(baseUrl + item);
        });
        serviceCaseAttachment.value.push({
          picNo: currentItem.value["picture"].join(","),
          type: "问题提报图片",
          picture: picture,
        });
      }
      if (caseStatus === 2) {
        let dealerAcceptanceTime = currentItem.value["dealerAcceptanceTime"]; //初始时间
        let initialTime = new Date(dealerAcceptanceTime).getTime();
        let endTime = initialTime + 24 * 60 * 60 * 1000; // 结束时间（24小时后）
        remainingSeconds = ref(Math.floor((endTime - Date.now()) / 1000)); // 剩余秒数
        startTimer(remainingSeconds, endTime);
      }
      getSearchOrderOneList(rtData.data["orderNeoId"]);
    } else {
      proxy.$message.error(rtData?.message);
    }
  });
};

const startTimer = (remainingSeconds, endTime) => {
  const interval = setInterval(() => {
    remainingSeconds.value = Math.floor((endTime - Date.now()) / 1000);
    if (remainingSeconds.value <= 0) {
      clearInterval(interval);
      timeout = "已受理阶段大于24小时";
    }
  }, 1000);
};

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return timeout
    ? timeout
    : `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const changeDeliveryOrderStep = (step) => {
  currentDeliveryOrderStep.value = step;
};

//获取订单列表
const getSearchOrderList = (po:string) => {
  let params = {
    po:po
  };
  getOrderList(params).then((res) => {
    let rtData = res.data;
    if (rtData.code == "success") {
      orderList.value = rtData.data;
    } else {      
      proxy.$message.error(rtData?.message);
    }
  });
};

const upgradeToHeadquarters = () => {
  tableData.value.forEach((item) => {
    item["checked"] = false;
  });
  if (
    currentItem.value["orderNeoId"] == undefined ||
    currentItem.value["orderNeoId"].toString().length <= 0
  ) {
    proxy.$message.warning("此问题提报未绑定订单，无法升级售后!");
    return;
  }
  dialog2Form.value = ref([]);
  showMainDialog.value = true;

  let params = { orderNoeId: currentItem.value["orderNeoId"] };
  getServiceticketList(params).then((res) => {
    let rtData = res.data;
    if (rtData.code == "success") {
      rtData.data.forEach((item) => {
        if (item["serviceCaseNeoId"] == currentItem.value["neoid"]) {
          item["operate"] = true;
        } else {
          item["operate"] = false;
        }
      });
      serviceTicket.value = rtData.data;
      serviceTicket.value.forEach((item) => {
        item["checked"] = false;
      });
    } else {
      proxy.$message.error(rtData?.message);
    }
  });
};

const changeDialogStep = (step) => {
  currentDialogStep.value = step;
};

const openDialog2 = (type) => {
  dialogType.value = type;
  showMainDialog.value = false;
  showMainDialog2.value = true;
};

//升级售后的时候有没有选订单号
const currentDialogStepBut = () => {
  const selectData = serviceTicket.value.filter(
    (item) => item.checked && item.operate
  );
  let msgBoxText = "是否新建售后工单?";
  let msgBoxTitle = "新建售后工单";
  if (selectData.length > 1) {
    proxy.$message.warning("只能勾选一条已绑定的售后工单");
    return;
  }
  if (selectData.length == 1) {
    msgBoxText = "是否对所选售后工单进行编辑?";
    msgBoxTitle = "编辑售后工单";
  }
  ElMessageBox.confirm(msgBoxText, msgBoxTitle, {
    confirmButtonText: "是",
    cancelButtonText: "否",
    type: "warning",
  })
    .then(() => {
      if (!formDialog.value.remark && selectData.length <= 0) {
        proxy.$message.error("经销商需求描述不能为空!");
      } else if (selectData.length == 1) {
        bindServiceTicket(selectData[0], true);
      } else {
        bindServiceTicket(null, false);
      }
    })
    .catch(() => {
      // ElMessage({
      //   type: 'info',
      //   message: 'Delete canceled',
      // })
    });
};

//升级到总部售后提交按钮
const submitDialog = () => {
  console.info("fileIdfileId", fileIdList.value);
  const selectData = tableData2Filter.value.filter((item) => item.checked);

  // console.info("过滤：", selectData["id"])
  if (selectData.length <= 0) {
    proxy.$message.error("必须勾选数据!");
    return;
  }
  if (!fileIdList.value || fileIdList.value.length === 0) {
    proxy.$message.warning("请上传问题图片");
    return;
  }  
  let selectDataClone = JSON.parse(JSON.stringify(selectData));
  selectDataClone.forEach((item) => {
    item["picture"] = fileIdList.value; //图片id fileIdList.value
    item["orderProductId"] = item["neoid"]; //订单明细
    item["treeSpecies"] = item["treeSpecies__c"]; //树种
    item["category"] = item["category1"]; //产品大类
    item["paintColor"] = item["paintColor__c"]; //油漆颜色
    item["ticketClassification"] = dialog2Form.value.problemType; //问题大类
    item["ticketProblem"] = dialog2Form.value.afterSalesIssues; //售后问题
    // item["personLiable"] = dialog2Form.value.responsiblePerson; //责任主体
    item["descriptionOfTicketProblem"] = dialog2Form.value.problemDesc; //问题描述
    item["id"] = solutionId != "" ? item["solutionDetailsId"] : null;
  });
  let params = {
    orderId:orderDetails.value["neoid"],
    serviceTicket: curItemServiceTicket.value["id"],
    serviceTicketId: curItemServiceTicket.value["neoId"],
    serviceCaseId: parseInt(currentItem.value["neoid"]),
    details: selectDataClone,
  };
  if (solutionId != "") {
    params["id"] = solutionId;
  }
  console.info("selectDataselectData", selectData);

  // dialog2Form.value["details"] = selectData
  if (
    !dialog2Form.value.problemType ||
    !dialog2Form.value.afterSalesIssues ||
    // !dialog2Form.value.responsiblePerson ||
    !dialog2Form.value.problemDesc
  ) {
    proxy.$message.error("必填选项不能为空!");
  } else {
    proxy.$message.success("提交成功!");
    setTimeout(() => {
      showMainDialog.value = false;
      currentDialogStep.value = 1;
      // params["caseVo"] = "234234234"
      //提交方法
      getticketsolution(params).then((res: any) => {
        console.log(res);
        let data = res.data.data;
        if (data != undefined) {
          solutionId = data["id"];
          // selectData.forEach((item) => {
          //   item["picture"] = fileIdList.value; //图片id
          //   item["ticketClassification"] = dialog2Form.value.problemType; //问题大类
          //   item["ticketProblem"] = dialog2Form.value.afterSalesIssues; //售后问题
          //   item["personLiable"] = dialog2Form.value.responsiblePerson; //责任主体
          //   item["descriptionOfTicketProblem"] = dialog2Form.value.problemDesc; //问题描述
          // });
          let tsDetails = data.details;
          if (tsDetails && tsDetails.length > 0) {
            selectData.forEach((val) => {
              let item = tsDetails.find(
                (val2) => val["neoid"] == val2["orderProductId"]
              );
              if (item) {
                val["descriptionOfTicketProblem"] =
                  item["descriptionOfTicketProblem"];
                val["ticketClassification"] = item["ticketClassification"];
                let ticketProblemNames="";
                  item["ticketProblem"].forEach((problem)=>{
                    ticketProblemNames=ticketProblemNames+
                    afterSalesIssuesList.value.find(
                        (aSItem) => aSItem["code"] == problem
                      ).name+","
                  })
                  //console.log(ticketProblemNames.substring(0,ticketProblemNames.length-1))
                val["ticketProblem"] = ticketProblemNames.substring(0,ticketProblemNames.length-1);
                val["responsibleSubject"] = item["responsibleSubject"];
                val["solutionDetailsId"] = item["id"]
              }
            });
            
          }
        }
      });
    }, 500);
  }
};

const initiateComments = () => {
  editcontentDialog.value = true;
  // ElMessageBox.prompt("请填写评论内容", "发起评论", {
  //   inputPattern: /\S/,
  //   inputErrorMessage: '评论内容不能为空!',
  //   confirmButtonText: "确认",
  //   cancelButtonText: "取消",
  // })
  //   .then(({ value }) => {
  //     commentList.value.push({
  //       userName: "经销商",
  //       text: value,
  //       date: new Date().toLocaleString(),
  //     })
  //   })
  //   .catch(() => { })
};

const editServiceCase = () => {
  if (currentItem.value["caseStatus"] == "4") {
    proxy.$message.warning("问题提报已完成，无法修改");
    return;
  }
  //找出是否存在状态>=问题提报的售后工单，如果存在不允许编辑
  let matchAfterSalesData =
    relatedDocumentsAftersalesWorkorderList.value.filter(
      (item) => parseInt(item["status__c"]) >= 2
    );
  if (matchAfterSalesData.length > 0) {
    proxy.$message.warning("存在处理中的售后工单,不允许修改");
    return;
  }
  editServerCasecontentDialog.value = true;
};

const getProvinceList = () => {
  getPickList("province").then((res) => {
    let rtData = res.data;
    if (rtData.code == "success") {
      provinceList.value = rtData.data;
    }
  });
};

const getCityList = () => {
  getPickList("city").then((res) => {
    let rtData = res.data;
    if (rtData.code == "success") {
      cityList.value = rtData.data;
    }
  });
};

const getDistrictList = () => {
  getPickList("district").then((res) => {
    let rtData = res.data;
    if (rtData.code == "success") {
      districtList.value = rtData.data;
    }
  });
};

//升级到总部售后点击下一步加载订单里面的items数据
const loadingOrderList = (row) => {
  let params = {
    po: row,
  };
  getOrderList(params).then((res: any) => {
    if (res.data.code == "success") {
      let orderid = res.data.data[0].id; //订单id
      let orderPo = res.data.data[0].po; //订单po
      caseneoId = parseInt(curItemServiceTicket.value["neoId"]);
      getOrderListById(orderid).then((res: any) => {
        let getOrderItems = res.data.data.items;
        tableData.value = getOrderItems;
        tableData.value.forEach((item) => {
          item["checked"] = false;
          item["orderPo"] = orderPo;
        });
        getTicketSolutionByTicketId(caseneoId).then((res: any) => {
          if (res.data.code == "success" && res.data.data != undefined) {
            solutionId = res.data.data["id"];
            let tsDetails = res.data.data.details;
            if (tsDetails && tsDetails.length > 0) {
              tableData.value.forEach((val) => {
                let item = tsDetails.find(
                  (val2) => val["neoid"] == val2["orderProductId"]
                );
                if (item) {
                  val["descriptionOfTicketProblem"] =
                    item["descriptionOfTicketProblem"];
                  val["ticketClassification"] = item["ticketClassification"];
                  let ticketProblemNames="";
                  item["ticketProblem"].forEach((problem)=>{
                    ticketProblemNames=ticketProblemNames+
                    afterSalesIssuesList.value.find(
                        (aSItem) => aSItem["code"] == problem
                      ).name+","
                  })
                  //console.log(ticketProblemNames.substring(0,ticketProblemNames.length-1))
                  val["ticketProblem"] = ticketProblemNames.substring(0,ticketProblemNames.length-1);
                  val["responsibleSubject"] = item["responsibleSubject"];
                  val["solutionDetailsId"] = item["id"]
                  val["note"] = item["note"]
                  val["solution"] = item["solution"]
                  val["subtotalLossAmount"] = item["subtotalLossAmount"]
                }
              });
            } else {
              console.info("details没数据");
            }            
          }
        });
        tableData2Filter.value=tableData.value
        filterList2Category.value=[[{ label: "全部产品大类", value: "1" }],[...new Set(tableData.value.map(item => item.category1))]
        .map(category1 => ({ "label":category1, "value": category1}))].reduce((acc, val) => acc.concat(val), []).filter(item => item.label!="");
              filterList2fscProductModel.value=[[{ label: "全部产品型号", value: "1" }],[...new Set(tableData.value.map(item => item.fscProductModel))]
        .map(fscProductModel => ({ "label":fscProductModel, "value": fscProductModel}))].reduce((acc, val) => acc.concat(val), []).filter(item => item.label!="");
              filterList2fscProductSpec.value=[[{ label: "全部尺寸", value: "1" }],[...new Set(tableData.value.map(item => item.fscProductSpec))]
        .map(fscProductSpec => ({ "label":fscProductSpec, "value": fscProductSpec}))].reduce((acc, val) => acc.concat(val), []).filter(item => item.label!="");
              filterList2paintColor__c.value=[[{ label: "全部油漆颜色", value: "1" }],[...new Set(tableData.value.map(item => item.paintColor__c))]
        .map(paintColor__c => ({ "label":paintColor__c, "value": paintColor__c}))].reduce((acc, val) => acc.concat(val), []).filter(item => item.label!="");
              filterList2treeSpecies__c.value=[[{ label: "全部树种", value: "1" }],[...new Set(tableData.value.map(item => item.treeSpecies__c))]
        .map(treeSpecies__c => ({ "label":treeSpecies__c, "value": treeSpecies__c}))].reduce((acc, val) => acc.concat(val), []).filter(item => item.label!="")

      });
    } else {
      proxy.$message.error("数据异常!");
    }
  });
};

const curItemServiceTicket = ref({} as any);
const bindServiceTicket = (row, editOrNot) => {
  if (!formDialog.value.remark && !editOrNot) {
    proxy.$message.error("经销商需求备注不能为空!");
    return;
  }
  let params = {};
  let createOrNot = true;
  if (row != undefined) {
    //绑定选择的售后工单
    params = {
      id: row.id,
      neoId: row.neoId,
      serviceCase__c: currentItem.value["neoid"],
      serviceCaseNeoId: currentItem.value["neoid"],
      distributorDemands__c: editOrNot==true?row.distributorDemands__c:formDialog.value.remark,
      orderNeoId: orderDetails.value["neoid"],
    };
    createOrNot = false;
  } else {
    const userInfoJsonStr =sessionStorage.getItem("userinfo");
    let userInfo =null;
    if(userInfoJsonStr){
      userInfo = JSON.parse(userInfoJsonStr);
    }
    //创建新的售后工单
    params = {
      serviceCase__c: currentItem.value["neoid"],
      serviceCaseNeoId: currentItem.value["neoid"],
      distributorDemands__c: formDialog.value.remark,
      problemDescription__c: currentItem.value["problemDescription"],
      customerPhone__c: currentItem.value["phone"],
      accountName: currentItem.value["caseAccountName"],
      customerAddress__c: currentItem.value["address"],
      accountNeoId: currentItem.value["caseAccountId"],
      distributorNeoId: currentItem.value["distributorNeoId"],
      distributorName: currentItem.value["distributorName"],
      distributorNo: orderDetails.value["distributorNo"],
      storeNeoId: currentItem.value["storeNeoId"],
      storeName: currentItem.value["storeName"],
      storeNo: orderDetails.value["storeNo"],
      status__c: "1",
      reporter__c: userInfo?userInfo["name"]:"",
      reporterPhone__c: userInfo?userInfo["phone"]:"",
      ticketSource__c: "1",
      orderNeoId: orderDetails.value["neoid"],
      orderType__c: orderDetails.value["orderType__c"],
      productionOrderNo__c: orderDetails.value["productionOrderNo__c"],
      region__c: orderDetails.value["region__c"],
    };
    // console.info("params",params)
  }
  updateOrCreateServiceticket(params)
    .then((res) => {
      let serviceTicketRes = res.data;
      if (
        serviceTicketRes.code == "success" &&
        serviceTicketRes.data != undefined &&
        serviceTicketRes.data["id"] != undefined
      ) {
        if (createOrNot) {
          checkSyncStatusForServiceTicket(serviceTicketRes.data["id"]);
        } else {
          row["operate"] = true;
          curItemServiceTicket.value = row;
          currentDialogStep.value = 2;
          loadingOrderList(formDialog.value.orderNo);
          if (currentItem.value["caseStatus"] !== 3  || currentItem.value["caseStatus"] !== 4) {
            let paramsTime = {
              id: currentItem.value["id"],
              questionType: currentItem.value["questionType"],
              name: currentItem.value["name"],
              caseStatus: 3,
              dealerProcessingTime: moment().format("YYYY-MM-DD HH:mm:ss"),
              processingProcessAndResults: formDialog.value.remark
            };
            processingTime(paramsTime);
            setTimeout(() => {
              otherMethod();
            }, 100);
          }
        }
        if (!editOrNot) {
          ElMessage({
            message: "新建售后工单成功",
            type: "success",
          });
        }

      } else {
        ElMessage({
          message: "新建售后工单失败,请重试",
          type: "error",
        });
      }
    })
    .catch((error: any) => {
      ElMessage({
        message: "新建售后工单失败,请重试",
        type: "error",
      });
    });
};

//在创建售后工单后需要检查创建的售后工单是否被销售易同步只有同步后才有neoid
const checkSyncStatusForServiceTicket = (id) => {
  // 显示loading遮罩层
  // 这里可以使用Element Plus的loading组件或者自定义loading效果
  showLoading();

  // 发起查询请求
  getServiceticketById(id)
    .then((response) => {
      if (
        response.data.code == "success" &&
        response.data.data.neoId != undefined
      ) {
        // 数据已被同步成功
        isSynced = true;
        curItemServiceTicket.value = response.data.data;
        curItemServiceTicket.value["operate"] = true;
        serviceTicket.value.push(curItemServiceTicket.value);
        // 隐藏loading遮罩层
        loadingInstance.close();
        currentDialogStep.value = 2;
        loadingOrderList(formDialog.value.orderNo);
        if (currentItem.value["caseStatus"] !== 3  || currentItem.value["caseStatus"] !== 4) {
            let paramsTime = {
              id: currentItem.value["id"],
              questionType: currentItem.value["questionType"],
              name: currentItem.value["name"],
              caseStatus: 3,
              dealerProcessingTime: moment().format("YYYY-MM-DD HH:mm:ss"),
              processingProcessAndResults: formDialog.value.remark
            };
            processingTime(paramsTime);
            setTimeout(() => {
              otherMethod();
            }, 100);
          }
      } else {
        // 数据未被同步成功，继续间隔1秒查询
        setTimeout(() => {
          checkSyncStatusForServiceTicket(id);
        }, 1000);
      }
    })
    .catch((error) => {
      console.error("Error checking sync status:", error);
      // 隐藏loading遮罩层
      // hideLoading();
    });
};

const showLoading = () => {
  if (loadingInstance == null) {
    loadingInstance = ElLoading.service({
      fullscreen: true,
      lock: true,
      text: "等待数据同步完成",
      background: "rgba(0, 0, 0, 0.7)",
    });
  }
};
//相关单据售后工单
const postserviceticketList = () => {
  let params = {
    serviceCaseNeoId: neoid.value,
  };
  getServiceticketList(params)
    .then((res: any) => {
      let JobList = res.data.data;
      if (res.data.code == "success") {
        relatedDocumentsAftersalesWorkorderList.value = JobList;
      }
    })
    .catch((error: any) => {
      ElMessage({
        message: "请求数据失败，请重试",
        type: "error",
      });
    });
};

//跳转售后工单详情
const handleView = (row) => {
  proxy.$router.push({
    path: "/aftersales_workorder_details",
    query: {
      id: row.id,
    },
  });
};

//相关单据派工单
const postfieldjobeList = () => {
  let params = {
    serviceCaseNeoId: neoid.value,
  };
  getFeildJobList(params)
    .then((res: any) => {
      let JobList = res.data.data;
      if (res.data.code == "success") {
        relatedDocumentsDispatchList.value = JobList;
      }
    })
    .catch((error: any) => {
      ElMessage({
        message: "请求数据失败，请重试",
        type: "error",
      });
    });
};

//跳转派工单详情
const dispatch = (row) => {
  proxy.$router.push({
    path: "/dispatch_details",
    query: {
      id: row.id,
    },
  });
};

//相关单据点击查看
const showRelatedDocumentsDialogClick = () => {
  showRelatedDocumentsDialog.value = true;
  postfieldjobeList(); //相关派工单记录
  postserviceticketList(); //相关售后工单记录
};

const finishDeliveryOrder = () => {
  let params = deliveryOrderForm;
  params["fieldJobContactName"] =
    taskDetails.value.accountName == undefined
      ? ""
      : taskDetails.value.accountName.toString();
  // params["contactTelephone"]=orderData.value.contactTel==undefined?"":orderData.value.contactTel.toString();
  // params["address"]=orderData.value.customerAddress==undefined?"":orderData.value.customerAddress;
  params["serviceCaseName"] = parseInt(neoid.value);
  params["fieldJobOrderId"] = orderDetails.value["neoid"];
  params["contactTelephone"] = orderDetails.value["contactTel"];
  params["fieldJobContactName"] = orderDetails.value["accountName__C"];
  params["name"] = orderDetails.value["accountName__C"] + "的维修派工单";
  params["orderNo__c"] = orderDetails.value["po"];
  params["picture"] = params.filePath;
  params["goodsPicture"] = params.filePath;
  params["status"] = 1;
  params["address"]=orderDetails.value["customerAddress"];
  addFieldJob(params)
    .then((res: any) => {
      let data = res.data.data;
      tableDataDispatch.value.push(data);
      if (data != undefined) {
        if (currentItem.value["caseStatus"] !== 3 || currentItem.value["caseStatus"] !== 4) {
          let paramsTime = {
            id: currentItem.value["id"],
            questionType: currentItem.value["questionType"],
            name: currentItem.value["name"],
            caseStatus: 3,
            dealerProcessingTime: moment().format("YYYY-MM-DD HH:mm:ss"),
          };
          processingTime(paramsTime);
          setTimeout(() => {
            otherMethod();
          }, 500);
        }
        ElMessage({
          message: "新增派工单成功",
          type: "success",
        });
      } else {
        ElMessage({
          message: "新增派工单失败",
          type: "error",
        });
      }
      Object.keys(deliveryOrderForm).forEach((key) => {
        if (
          !key.includes("type") &&
          !key.includes("haveInstallConditions") &&
          key !== "fieldJobOrderId" &&
          key !== "fieldJobType__c" &&
          key !== "stage__c" &&
          key !== "name"
        )
          deliveryOrderForm[key] = "";
        if (key === "haveInstallConditions") deliveryOrderForm[key] = false;
        if (key == "fileList" || key == "filePath") deliveryOrderForm[key] = [];
      });
    })
    .catch((error: any) => {
      // 显示请求失败的提示框
      ElMessage({
        message: "请求新增派工单失败，请重试",
        type: "error",
      });
      Object.keys(deliveryOrderForm).forEach((key) => {
        if (
          key !== "type" &&
          key !== "haveInstallConditions" &&
          key !== "fieldJobOrderId" &&
          key !== "fieldJobType__c" &&
          key !== "stage__c" &&
          key !== "name"
        )
          deliveryOrderForm[key] = "";
        if (key == "haveInstallConditions") deliveryOrderForm[key] = false;
        if (key == "fileList" || key == "filePath") deliveryOrderForm[key] = [];
      });
      console.error("请求新增派工单失败:", error);
    });
  deliveryOrderDialog.value = false;
  // proxy.$message.success("派工单创建完成!")
  currentDeliveryOrderStep.value = 1;
  // currentStep.value = 5
};

//问题提报时间处理
const processingTime = (params) => {
  createServiceCase(params).then((res) => {
    let resData = res.data;
    if (resData.code == "success" && resData.data != undefined) {
      console.info("更新成功");
    } else {
      console.info("更新失败");
    }
  });
};

const convertProvince = (code) => {
  let item = provinceList.value.find((val) => val["optionCode"] == code);
  if (code && item) {
    return item["optionLabel"];
  } else {
    return "";
  }
};

const convertCity = (code) => {
  let item = cityList.value.find((val) => val["optionCode"] == code);
  if (code && item) {
    return item["optionLabel"];
  } else {
    return "";
  }
};

const convertDistrict = (code) => {
  let item = districtList.value.find((val) => val["optionCode"] == code);
  if (code && item) {
    return item["optionLabel"];
  } else {
    return "";
  }
};

const orderDetails = ref({} as any);
//获取订单列表
const getSearchOrderOneList = (orderneoId) => {
  if (orderneoId == undefined) {
    return;
  }
  getOrderListByNeoId(orderneoId).then((res) => {
    let rtData = res.data;
    if (rtData.code == "success") {
      orderDetails.value = rtData.data;
      deliveryOrderForm["fieldJobOrderId"] = rtData.data["id"];
      // deliveryOrderForm["contactTelephone"] = rtData.data["contactTel"]
      deliveryOrderForm["fieldJobContactName"] = rtData.data["accountName__C"];
      deliveryOrderForm["name"] =
        rtData.data["accountName__C"] + "的维修派工单";
      formDialog.value["orderNo"] = orderDetails.value["po"];
      formDialog.value["productionOrderNo__c"] = orderDetails.value["productionOrderNo__c"];

      orderList.value.push(orderDetails.value)
    } else {
      proxy.$message.error(rtData?.message);
    }
  });
};

//日期控件不能选择小于当前日期的时间
const disabledPastDate = (time: any) => {
  return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
};

const completeServiceCase = () => {
  if (currentItem.value["caseStatus"] == 4) {
    proxy.$message.warning("当前服务工单已完成!");
    return;
  }
  if (
    currentItem.value["processingProcessAndResults"] == undefined ||
    currentItem.value["processingProcessAndResults"] == ""
  ) {
    proxy.$message.warning("处理结论不能为空，请先编辑处理结论");
    return;
  }
  let params = {
    caseStatus: 4,
    id: id.value,
    questionType: currentItem.value["questionType"],
    name: currentItem.value["name"],
    dealerCompletionTime:moment().format("YYYY-MM-DD HH:mm:ss")
  };
  createServiceCase(params)
    .then((res) => {
      let resData = res.data;
      if (resData.code == "success" && resData.data != undefined) {
        currentItem.value["caseStatus"] = 4;
        proxy.$message.success("服务工单完成");
      } else {
        proxy.$message.warning("服务工单完成失败,请重试");
      }
    })
    .catch((error: any) => {
      proxy.$message.error("服务工单完成失败,系统异常");
      console.log("服务工单完成状态更新:", error);
    });
};
const handleProblemTypeChange = (problemType) => {
  afterSalesIssuesListForSelect.value =
    afterSalesIssuesListWithType.value[problemType];
    dialog2Form.value.afterSalesIssues=[];
};
const selectAll=(event)=>{
  tableData.value.forEach(item=>{
    item["checked"]=event
  })
}
// {
//   orderNo: "",
//   remark: "",
//   searchValue: "",
//   orderType: "",
//   productType: "",
//   productModel: "",
//   treeSpecies: "",
//   paintColor: "",
//   size: "",
// }
const clearFilterChange=(event)=>{
  formDialog.value.productType = "";
  formDialog.value.productType = "";
  formDialog.value.productModel = "";
  formDialog.value.treeSpecies = "";
  formDialog.value.paintColor = "";
  formDialog.value.size = "";
  formDialog.value.orderType="";
  // filterByFormDialog();
  tableData2Filter.value=tableData.value
}
const categoryFilterChange=(event)=>{
  filterByFormDialog();
}
const fscProductModelFilterChange=(event)=>{
  filterByFormDialog();
}
const treeSpeciesCFilterChange=(event)=>{
  filterByFormDialog();
}
const paintColorCFilterChange=(event)=>{
  filterByFormDialog();
}
const fscProductSpecFilterChange=(event)=>{
  filterByFormDialog();
}

const filterByFormDialog=()=>{
  tableData2Filter.value=tableData.value.filter(item=>{
    let sizeFlags=true;
    if(formDialog.value.size!="" && formDialog.value.size!="1"){
      sizeFlags=item.fscProductSpec==formDialog.value.size
    }
    let productTypeFlags=true;
    if(formDialog.value.productType!="" && formDialog.value.productType!="1"){
      productTypeFlags=item.category1==formDialog.value.productType
    }
    let productModelFlags=true;
    if(formDialog.value.productModel!="" && formDialog.value.productModel!="1"){
      productModelFlags=item.fscProductModel==formDialog.value.productModel
    }
    let treeSpeciesFlags=true;
    if(formDialog.value.treeSpecies!="" && formDialog.value.treeSpecies!="1"){
      treeSpeciesFlags=item.treeSpecies__c==formDialog.value.treeSpecies
    }
    let paintColorFlags=true;
    if(formDialog.value.paintColor!="" && formDialog.value.paintColor!="1"){
      paintColorFlags=item.paintColor__c==formDialog.value.paintColor
    }
    return sizeFlags&&productModelFlags&&productTypeFlags&&treeSpeciesFlags&&paintColorFlags
  })
  console.log(tableData2Filter)
}
const changeToMyPerson=(()=>{
  proxy.$router.push('my_personnel')
})

const remoteMethod=(query: string)=>{
  if(query && query.length>=4){
    getSearchOrderList(query)
  }
}
</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
