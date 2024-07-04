<template>
  <div class="main">
    <span class="header">
      <span class="title">售后工单状态</span>
      <span class="step">
        <span class="item" >
          <span :class="currentStep == 1 ? 'num_selected' : 'num'">1</span>
          <span :class="currentStep >= 1 ? 'name_selected' : 'name'">已提报问题</span>
        </span>
        <span class="item">
          <span :class="currentStep == 3 ? 'num_selected' : 'num'">2</span>
          <span :class="currentStep >= 3 ? 'name_selected' : 'name'">售后审核</span>
        </span>
        <span class="item">
          <span :class="currentStep == 2 ? 'num_selected' : 'num'">3</span>
          <span :class="currentStep >= 2 ? 'name_selected' : 'name'">已定损</span>
        </span>
        <span class="item">
          <span :class="currentStep == 4 ? 'num_selected' : 'num'">4</span>
          <span :class="currentStep >= 4 ? 'name_selected' : 'name'">定责发起</span>
        </span>
        <span class="item">
          <span :class="currentStep == 5 ? 'num_selected' : 'num'">5</span>
          <span :class="currentStep >= 5 ? 'name_selected' : 'name'">已提交OA审批</span>
        </span>
        <span class="item">
          <span :class="currentStep == 7 ? 'num_selected' : 'num'">7</span>
          <span :class="currentStep >= 7 ? 'name_selected' : 'name'">已追责</span>
        </span>
        <span class="item">
          <span :class="currentStep == 10 ? 'num_selected' : 'num'">10</span>
          <span :class="currentStep >= 10 ? 'name_selected' : 'name'">已结案</span>
        </span>
        <!-- <span class="item" >
          <span :class="currentStep == 8 ? 'num_selected' : 'num'">8</span>
          <span :class="currentStep >= 8 ? 'name_selected' : 'name'">结束</span>
        </span> -->
      </span>
    </span>
    <span class="order_info">
      <span class="title"
        >售后工单详情 
        <!-- <el-button class="submit_btn">已提交</el-button> -->
        <el-button v-if="aftersalesHeaderDetails['reasonReturn']!=undefined&&aftersalesHeaderDetails['reasonReturn']!=''" class="return_btn">退回原因:{{ aftersalesHeaderDetails.reasonReturn }}</el-button>
        <el-button type="primary" @click="reSubmitApproval" class="primary_btn">重新提交审批</el-button>      
      </span>
      <span class="main_field">
        <span class="row_field">
          <span class="field">
            <span class="label">工单编号：</span>
            <span class="value">{{ aftersalesHeaderDetails.name }}</span>
            <span v-if="false" class="view">查看</span>
          </span>
          <span class="field">
            <span class="label">业务类型：</span>
            <span class="value">{{ aftersalesHeaderDetails.entityType }}</span>
          </span>
          <span class="field">
            <span class="label">售后工单来源：</span>
            <span class="value">{{ aftersalesHeaderDetails.ticketSource__c }}</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">订单编号：</span>
            <span class="value">{{orderDetails.po}}</span>
          </span>
          <span class="field" @click="caseNoJump()">
            <span class="label">服务工单：</span>
            <span class="value" style="color: #165dff;cursor: pointer;">{{ problemDetails.caseNo}}</span>
          </span>
          <span class="field">
            <span class="label">总部售后专员：</span>
            <span class="value">{{aftersalesHeaderDetails.hqAfterSaleOwner}}</span>
          </span>
        </span>
        <span class="row_field">
        <el-tooltip
          class="box-item"
          effect="dark"
          :content='aftersalesHeaderDetails.distributorDemands__c'
          placement="top"
          >
          <span class="field">
            <span class="label">升级备注：</span>
            <span class="value">{{ aftersalesHeaderDetails.distributorDemands__c }}</span>
          </span>
        </el-tooltip>
          <span class="field">
            <span class="label">专卖店名称：</span>
            <span class="value">{{orderDetails.storeName__c}}</span>
          </span>
          <span class="field">
            <span class="label">创建时间：</span>
            <span class="value">{{ aftersalesHeaderDetails.createdTime }}</span>
          </span>
        </span>
        <span class="row_field">
          <span class="field">
            <span class="label">冲款金额汇总:</span>
            <span class="value">{{ aftersalesHeaderDetails.chargeAmtSum }}</span>
          </span>
          <span class="field">
            <span class="label">处理方式汇总:</span>
            <span class="value">{{ aftersalesHeaderDetails.solutionSummary }}</span>
          </span>
          <span class="field">
            <span class="label">审批状态:</span>
            <span class="value">{{ approvalList(aftersalesHeaderDetails.approvalStatus) }}</span>
          </span>
        </span>
        <span class="row_field">
          <el-tooltip
          class="box-item"
          effect="dark"
          :content='aftersalesHeaderDetails.noteSummary'
          placement="top"
          >
          <span class="field">
            <span class="label">售后回复:</span>
            <span class="value">{{ aftersalesHeaderDetails.noteSummary }}</span>
          </span>
          </el-tooltip>

          <span class="field">
            <span class="label"></span>
            <span class="value"></span>
          </span>
          <span class="field">
            <span class="label"></span>
            <span class="value"></span>
          </span>
          <span class="field">
            <span class="label"></span>
            <span class="value"></span>
          </span>
        </span>
      </span>
      <span class="title">客户信息</span>
      <span class="other_field">
        <span class="row_field">
          <span class="field">
            <span class="label">客户姓名：</span>
            <span class="value">{{orderDetails.accountName__C}}</span>
          </span>
          <span class="field">
            <span class="label">客户电话：</span>
            <span class="value">{{ aftersalesHeaderDetails.customerPhone__c }}</span>
          </span>
          <span class="field">
            <span class="label">提报人：</span>
            <span class="value">{{ aftersalesHeaderDetails.reporter__c }}</span>
          </span>
        </span>
        <span class="row_field">
        <el-tooltip
          class="box-item"
          effect="dark"
          :content='aftersalesHeaderDetails.customerAddress__c'
          placement="top"
          >
          <span class="field">
            <span class="label">客户地址：</span>
            <span class="value">{{ aftersalesHeaderDetails.customerAddress__c }}</span>
          </span>
        </el-tooltip>
        </span>
      </span>
    </span>
    <span class="order_list">
      <span class="table_title">售后工单处理记录</span>
      <span class="table_content">
        <el-table
          :data="ticketSolutionTable"
          :stripe="false"
          style="width: 100%"
        >
          <el-table-column prop="name" label="售后处理记录编号" />
          <el-table-column prop="text2" label="生产单号" />
          <el-table-column prop="text3" label="售后审核员" />
          <!-- <el-table-column prop="text4" label="处理方式" /> -->
          <!-- <el-table-column prop="chargeAmtSum" label="冲款金额" /> -->
          <el-table-column prop="text5" label="状态" />
          <el-table-column prop="text6" label="退回原因" />
          <el-table-column prop="text7" label="创建时间" />
          <el-table-column prop="text8" label="操作">
            <template #default="scope">
              <div style="display: flex; align-items: center; color: #165dff; cursor: pointer;"  @click="viewDetails(scope.row)">
                查看
              </div>
            </template>
          </el-table-column>
        </el-table>
      </span>
      <!-- <el-pagination
        class="table_pagination"
        :page-size="20"
        :pager-count="11"
        layout="total, prev, pager, next"
        :total="50"
      /> -->
    </span>
    <span class="action_list">
      <div class="left">
        <img src="@/assets/images/comment.png" alt="" />
        <span class="initiate_comments" @click="initiateComments">发起评论</span>
      </div>
      <!-- <div class="right"> -->
        <!-- <el-button type="primary" class="primary_btn" @click="openDialog2(1)">完善问题描述</el-button> -->
        <!-- <el-button type="primary" class="primary_btn" @click="openDialog2(2)">定义处理方式</el-button> -->
      <!-- </div> -->
    </span>
    <div class="comment" v-for="item in commentList" :key="item.date">
      <div class="userinfo">
        <img src="@/assets/images/userinfo.png" alt="" />
        <span class="username">{{item["userName"]}}</span>
      </div>
      <div class="content">{{item["text"]}}</div>
      <div class="date">{{item["date"]}}</div>
      <span class="reply">回复</span>
      <img class="tips" src="@/assets/images/tips.png" alt="" />
    </div>
    <div class="showMainDialog2">
      <el-dialog v-model="showMainDialog2" width="25%" :show-close="false">
        <span class="title">{{
          dialogType == 1 ? "完善问题描述" : "定义处理方式"
        }}</span>
        <span class="content" v-if="dialogType == 1">
          <span class="item">
            <span class="label">问题大类</span>
            <el-select v-model="dialog2Form.problemType" placeholder="">
              <el-option
                v-for="item in problemTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </span>
          <span class="item">
            <span class="label">售后问题</span>
            <el-select v-model="dialog2Form.afterSalesIssues" placeholder="">
              <el-option
                v-for="item in afterSalesIssuesList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </span>
          <!-- <span class="item">
            <span class="label">责任人</span>
            <el-input v-model="dialog2Form.responsiblePerson"></el-input>
          </span> -->
          <span class="item">
            <span class="label">问题描述</span>
            <el-input v-model="dialog2Form.problemDesc"></el-input>
          </span>
          <span class="item">
            <el-upload
              :file-list="dialog2Form.fileList"
              class="upload"
              drag
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              multiple
            >
              <el-icon class="el-icon--upload"></el-icon>
              <div class="el-upload__text">将文件拖至此处 或 点击上传</div>
              <template #tip>
                <div class="el-upload__tip">
                  jpg/png files with a size less than 500kb
                </div>
              </template>
            </el-upload>
          </span>
        </span>
        <span class="content" v-if="dialogType == 2">
          <span class="item">
            <span class="label">产品分类</span>
            <el-select v-model="dialog2Form.poductType" placeholder="">
              <el-option
                v-for="item in poductTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </span>
          <span class="item">
            <span class="label">部件分类</span>
            <el-select v-model="dialog2Form.componentType" placeholder="">
              <el-option
                v-for="item in componentTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </span>
          <span class="item">
            <span class="label">不良分类</span>
            <el-select v-model="dialog2Form.badType" placeholder="">
              <el-option
                v-for="item in badTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </span>
          <span class="item">
            <span class="label">质量指标一</span>
            <el-select v-model="dialog2Form.qualityIndicator1" placeholder="">
              <el-option
                v-for="item in qualityIndicator1List"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </span>
          <span class="item">
            <span class="label">质量指标二</span>
            <el-select v-model="dialog2Form.qualityIndicator2" placeholder="">
              <el-option
                v-for="item in qualityIndicator2List"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </span>
          <span class="item">
            <span class="label">处理方式</span>
            <el-select v-model="dialog2Form.handleWay" placeholder="">
              <el-option
                v-for="item in handleWayList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </span>
        </span>
        <template #footer>
          <div class="dialog-footer">
            <el-button
              class="cancel_btn"
              @click="
                showMainDialog2 = false
              "
              >取消</el-button
            >
            <el-button
              @click="confirmDialog"
              type="primary"
              class="primary_btn"
              style="margin-left:50px !important"
              >保存</el-button
            >
          </div>
        </template>
      </el-dialog>
    </div>
    <div class="showMainDialog3">
      <el-dialog v-model="showMainDialog3" width="100%" :show-close="false">
        <span class="title">售后处理记录详情</span>
        <span class="content">
          <span class="base_field">
            <span class="row_field">
              <span class="field">
                <span class="label">售后处理记录编号：</span>
                <span class="value">{{ticketSolutionDetials.name}}</span>
              </span>
              <span class="field">
                <span class="label">经销商名称：</span>
                <span class="value">{{ ticketSolutionDetials.distributor }}</span>
              </span>
              <span class="field">
                <span class="label">经销商电话：</span>
                <span class="value">{{ ticketSolutionDetials.distributorPhone }}</span>
              </span>
            </span>
            <span class="row_field">
              <span class="field">
                <span class="label">专卖店名称：</span>
                <span class="value">{{ ticketSolutionDetials.store }}</span>
              </span>
              <span class="field">
                <span class="label">专卖店电话：</span>
                <span class="value">{{ ticketSolutionDetials.storePhone }}</span>
              </span>
              <span class="field">
                <span class="label">订单编号：</span>
                <span class="value">{{ ticketSolutionDetials.orderId }}</span>
              </span>
            </span>
            <span class="row_field">
              <span class="field">
                <span class="label">生产单号：</span>
                <span class="value">{{ ticketSolutionDetials.productionOrderNo }}</span>
              </span>
              <span class="field">
                <span class="label">订单类型：</span>
                <span class="value">{{ ticketSolutionDetials.orderType }}</span>
              </span>
              <span class="field">
                <span class="label">处理进度：</span>
                <span class="value">{{ ticketSolutionDetials.status }}</span>
              </span>
            </span>
            <span class="row_field">
              <span class="field">
                <span class="label">客户姓名：</span>
                <span class="value">{{ ticketSolutionDetials.accountName }}</span>
              </span>
              <span class="field">
                <span class="label">客户电话：</span>
                <span class="value">{{ ticketSolutionDetials.customerPhone }}</span>
              </span>
              <span class="field">
                <span class="label">客户地址：</span>
                <span class="value">{{ ticketSolutionDetials.customerAddress }}</span>
              </span>
            </span>
            <span class="row_field">
              <span class="field">
                <span class="label">生产分厂：</span>
                <span class="value">{{ ticketSolutionDetials.productionBranch }}</span>
              </span>
              <span class="field">
                <span class="label">供应基地：</span>
                <span class="value">{{ ticketSolutionDetials.supplyBase }}</span>
              </span>
              <span class="field">
                <span class="label">冲款金额小计：</span>
                <span class="value">{{ ticketSolutionDetials.subtotalOfChargebackAmount }}</span>
              </span>
            </span>
            <span class="row_field">
              <span class="field">
                <span class="label">售后审核员：</span>
                <span class="value">{{ ticketSolutionDetials.auditor }}</span>
              </span>
              <span class="field">
                <span class="label">提报人：</span>
                <span class="value">{{ ticketSolutionDetials.reporter }}</span>
              </span>
              <span class="field">
                <span class="label">提报人电话：</span>
                <span class="value">{{ ticketSolutionDetials.reporterPhone }}</span>
              </span>
            </span>
            <span class="row_field">
              <span class="field">
                <span class="label">消费者需求描述：</span>
                <span class="value">{{ ticketSolutionDetials.customerDemands }}</span>
              </span>
              <span class="field">
                <span class="label">经销商需求描述：</span>
                <span class="value">{{ ticketSolutionDetials.distributorDemands }}</span>
              </span>
              <span class="field">
                <span class="label">原因调查情况：</span>
                <span class="value">{{ ticketSolutionDetials.investigationOfCause }}</span>
              </span>
            </span>
          </span>
          <el-table
            class="table_dialog3"
            :data="ticketSolutionDetials['details']"
            :stripe="false"
          >
            <el-table-column prop="ticketSolutionId" width="150px" label="售后处理记录编号" />
            <el-table-column prop="solution" width="150px" label="处理方式" />
            <el-table-column prop="plannedOrderId" width="150px" label="预订单" />
            <el-table-column prop="supplementaryOrderId" width="150px" label="售后订单" />
            <el-table-column prop="orderedDate" width="150px" label="下单时间" />
            <el-table-column prop="dateOfApproval" width="150px" label="审核日期" />
            <el-table-column prop="deliveryDate" width="150px" label="交货日期" />
            <el-table-column prop="accountabilityUnit" width="150px" label="责任部门" />
            <el-table-column prop="orderId" width="150px" label="订单编号" />
            <el-table-column prop="" width="150px" label="订单明细" />
            <el-table-column prop="sku" width="150px" label="详单编号" />
            <el-table-column prop="barcode" width="150px" label="详单条码" />
            <el-table-column prop="treeSpecies" width="150px" label="树种" />
            <el-table-column prop="" label="尺寸" width="150px" />
            <el-table-column prop="productClassificationSummary" width="150px" label="大类汇总" />
            <el-table-column prop="model" label="产品型号" width="150px" />
            <el-table-column prop="productCount" label="数量" width="150px" />
            <el-table-column prop="suggestion" label="分析纠正及处理建议" width="150px" />
        </el-table>
        </span>
        <template #footer>
          <div class="dialog-footer">
            <el-button class="cancel_btn"  @click="showMainDialog3 = false">返回</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
    <div class="showTicketSolutionDetailsDialog">
      <el-dialog v-model="showTicketSolutionDetailsDialog" title="售后处理明细" width="80% " :show-close="false">
          <!-- <div class="search">
            <el-input v-model="formDialog.searchValue" placeholder="搜索"></el-input>
          </div>
          <div class="filter_list">
            <el-select v-model="formDialog.orderType">
              <el-option v-for="item in filterList1" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-model="formDialog.productType">
              <el-option v-for="item in filterList2" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-model="formDialog.productModel">
              <el-option v-for="item in filterList3" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-model="formDialog.treeSpecies">
              <el-option v-for="item in filterList4" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-model="formDialog.paintColor">
              <el-option v-for="item in filterList5" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-model="formDialog.size">
              <el-option v-for="item in filterList6" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div> -->
          <div class="table">
            <el-table ref="multipleTableRef" :selection-change="handleSelectionChange" :data="ticketSoluDetailsTable" :stripe="false"
              style="width: 100%;overflow: auto;" max-height="300">
              <el-table-column prop="checked" label="全选" width="80px">
                <template #header>
                  <el-checkbox  @change="selectAll">全选</el-checkbox >
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
                  <div style="display:flex;align-items:center;">
                    {{ scope.row.ticketClassification ? (problemTypeList.find(val => val["code"] ==
                      scope.row.ticketClassification)?.name) : "" }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="ticketProblem" label="售后问题 ">
                <!-- <template #default="scope">
                  <div style="display:flex;align-items:center;">
                    {{ scope.row.ticketProblem ? (afterSalesIssuesList.find(val => val["code"] ==
                      scope.row.ticketProblem)?.name) : "" }}
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
              <el-option v-for="item in afterSalesIssuesListForSelect" :key="item.code" :label="item.name" :value="item.code" />
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
              <!-- <el-upload name="files" :on-success="handleUploaded" class="upload" drag
                action="https://sh.mengtian.com.cn:9595/md/api/common/file/upload" multiple>
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
        <template #footer>
          <div class="dialog-footer">
            <el-button class="cancel_btn" @click="showTicketSolutionDetailsDialog = false">取消</el-button>
            <el-button @click="submitDialog" type="primary" class="primary_btn"
              style="margin-left:50px !important">提交</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, getCurrentInstance, reactive ,onMounted} from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { useRoute } from "vue-router";
import { getOrderListByNeoId, getServiceCaseItem, getServiceticketById,getTicketSolutionById, getTicketSolutionByTicketId, getTicketSolutionByneoID, getticketsolution, updateOrCreateServiceticket } from "../../api/common";
import { Plus } from "@element-plus/icons-vue";
import { isArray } from "lodash";
import { BASE_URL } from "../../api/config"

const apiuploadUrl = `${BASE_URL}/md/api/common/file/upload`;
const { proxy }: any = getCurrentInstance()

const currentStep = ref(4)

const route = useRoute()

//售后处理明细弹出窗
const showTicketSolutionDetailsDialog = ref(false)
//订单明细
const orderDetails=ref({} as any)
//问题提报明细
const problemDetails=ref({} as any)

const commentList = ref<any>([
])

const dialog2Form = ref<any>({
  problemType: "",
  afterSalesIssues: "",
  responsiblePerson: "",
  problemDesc: "",
  fileList: [],
  poductType: "",
  componentType: "",
  badType: "",
  qualityIndicator1: "", 
  qualityIndicator2: "", 
  handleWay: ""
})

const problemTypeList = ref<any>([
  {code:"1",name:"经销商问题"},
  {code:"2",name:"公司问题"},
  {code:"3",name:"物流问题"}
])

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
  {code:"1",name:"店面测量师漏单"},
  {code:"2",name:"店面测量师量错"},
  {code:"3",name:"店里设计师漏分解"},
  {code:"4",name:"店里设计师分解错"},
  {code:"5",name:"店里设计不合理"},
  {code:"6",name:"店里下单员漏单"},
  {code:"7",name:"店里下单员下错"},
  {code:"8",name:"店里安装师问题"},
  {code:"9",name:"消费者补单"},
  {code:"10",name:"消费者使用不当"},
  {code:"11",name:"产品丢失"},
  {code:"12",name:"公司问题"},
  {code:"13",name:"物流问题"}
])

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
  {code:"1",  name:"墙板"},
  {code:"2",  name:"线条"},
  {code:"3",  name:"五金"},
  {code:"4",  name:"门套"},
  {code:"5",  name:"门扇"},
  {code:"6",  name:"柜体"},
  {code:"7",  name:"柜门"},
  {code:"8",  name:"玻璃"},
  {code:"9",  name:"挂板"},
  {code:"10",name:"罗马柱"},
  {code:"11",name:"帽头"},
  {code:"12",name:"装饰块"},
  {code:"13",name:"雕花件"},
  {code:"14",name:"色板"},
  {code:"15",name:"整单"},
  {code:"16",name:"入户门"}
])

const componentTypeList = ref<any>([
  {code:"1",name:"边梃"},
  {code:"2",name:"挂线条"},
  {code:"3",name:"芯板"},
  {code:"4",name:"金属条"},
  {code:"5",name:"码头"},
  {code:"6",name:"封边"},
  {code:"7",name:"L边"},
  {code:"8",name:"整体"},
  {code:"9",name:"面板执手"},
  {code:"10",name:"锁体"},
  {code:"11",name:"铰链"},
  {code:"12",name:"铰链底座"},
  {code:"13",name:"灯带"},
  {code:"14",name:"抽屉轨道"},
  {code:"15",name:"三合一"},
  {code:"16",name:"其他五金"},
  {code:"17",name:"档条"},
  {code:"18",name:"密封条"},
  {code:"19",name:"套板"},
  {code:"20",name:"门套"},
  {code:"21",name:"玻璃"},
  {code:"22",name:"门标"},
  {code:"23",name:"门芯板"},
  {code:"24",name:"配件"},
  {code:"25",name:"五金配件"},
  {code:"26",name:"8属边"},
  {code:"27",name:"背板"},
  {code:"28",name:"层板"},
  {code:"29",name:"抽屉板"},
  {code:"30",name:"底板"},
  {code:"31",name:"顶板"},
  {code:"32",name:"台面板"},
  {code:"33",name:"立板"},
  {code:"34",name:"侧板"},
  {code:"35",name:"踢脚板"},
  {code:"36",name:"五金件"},
  {code:"37",name:"挂板"},
  {code:"38",name:"罗马柱"},
  {code:"39",name:"帽头"},
  {code:"40",name:"装饰块"},
  {code:"41",name:"雕花件"},
  {code:"42",name:"色板"},
  {code:"43",name:"整单"},
  {code:"44",name:"修补漆"},
  {code:"45",name:"入户门扇"}
])

const badTypeList = ref<any>([
  {code:"1",name:"消费者"},
  {code:"2",name:"经销商"},
  {code:"3",name:"订单分解"},
  {code:"4",name:"备料"},
  {code:"5",name:"加工"},
  {code:"6",name:"免漆加工"},
  {code:"7",name:"油漆"},
  {code:"8",name:"少货"},
  {code:"9",name:"包装问题"},
  {code:"10",name:"五金问题"},
  {code:"11",name:"辅料问题"},
  {code:"12",name:"仓库发货"},
  {code:"13",name:"物流送达"},
  {code:"14",name:"系统问题"},
  {code:"15",name:"新品设计问题"},
  {code:"16",name:"隔音等级"},
  {code:"17",name:"受潮"},
  {code:"18",name:"无法提供证明的少货"},
  {code:"19",name:"交期延误"},
  {code:"20",name:"霉变"},
  {code:"21",name:"气味"},
  {code:"22",name:"长虫"},
  {code:"23",name:"过质保期"},
  {code:"24",name:"变色"},
  {code:"25",name:"入户门问题"}
])

const aftersalesHeaderDetails=ref<any>({})
const qualityIndicator1List = ref<any>([
  {code:"1",name:"订单分解错"},
  {code:"2",name:"订单漏分解"},
  {code:"3",name:"变形"}
])

const qualityIndicator2List = ref<any>([
  {code:"1",name:"漏备注"},
  {code:"2",name:"产品漏分解"},
  {code:"3",name:"配件漏分解"},
  {code:"4",name:"五金漏分解"},
  {code:"5",name:"孔位漏分解"},

])

const handleWayList = ref<any>([{
  label: "处理方式",
  value: "1"
}])

const approvalStatusList = ref<any>([
  {code:"0",name:"待提交"},
  {code:"1",name:"审批中"},
  {code:"2",name:"审批拒绝"},
  {code:"3",name:"审批通过"},
  {code:"4",name:"撤回"}
])

const showMainDialog2 = ref(false)

const showMainDialog3 = ref(false)

const dialogType = ref(1)

const filterList = ref({
  value1: "1",
  value2: "1",
  value3: "1",
  value4: "1",
  value5: "1",
  value6: "1",
})

const token = localStorage.getItem('token') || sessionStorage.getItem('token');

const headers = ref({
    Content: "application/json",
    Authorization: `${token}`, // Here you can add your token
    isImage: "true",
    needFileId: "true",
    "Trace-Id": "",
})

const tableData = ref([
  // {
  //   text1: "",
  //   text2: "CS015-00023-0-1-1",
  //   text3: "门套 (自动赋值)",
  //   text4: "示例字段...",
  //   text5: "示例字段...",
  //   text6: "示例字段...",
  //   text7: "示例字段...",
  //   text8: "2021-02-28 10:30:50",
  // },
  // {
  //   text1: "",
  //   text2: "CS015-00023-0-1-1",
  //   text3: "门套 (自动赋值)",
  //   text4: "示例字段...",
  //   text5: "示例字段...",
  //   text6: "示例字段...",
  //   text7: "示例字段...",
  //   text8: "2021-02-28 10:30:50",
  // },
  // {
  //   text1: "",
  //   text2: "CS015-00023-0-1-1",
  //   text3: "门套 (自动赋值)",
  //   text4: "示例字段...",
  //   text5: "示例字段...",
  //   text6: "示例字段...",
  //   text7: "示例字段...",
  //   text8: "2021-02-28 10:30:50",
  // },
])

const filterList1 = ref([{ label: "全部订单", value: "1" }])

const filterList2 = ref([{ label: "产品大类", value: "1" }])

const filterList3 = ref([{ label: "产品型号", value: "1" }])

const filterList4 = ref([{ label: "树种", value: "1" }])

const filterList5 = ref([{ label: "油漆颜色", value: "1" }])

const filterList6 = ref([{ label: "尺寸", value: "1" }])


const ticketSolutionTable = ref<any>([]);
const ticketSolutionDetials = ref<any>({});

const uploadDatas = ref({
  files: [],
  name: "files",
});

const approvalList = (code) => {
  let item = approvalStatusList.value.find((val) => val["code"] == code);
  if (code && item) {
    return item["name"];
  } else {
    return "";
  }
};

const caseNoJump = () =>{
  proxy.$router.push(`/problem_report_details?id=${problemDetails.value.id}&neoid = ${problemDetails.value["neoid"]}`);
}

const beforeUpload = (file) => {
  uploadDatas.value["files"] = [file];
};

const changeStep = (step) => {
  currentStep.value = step
}

const openDialog2 = (type) =>{
  dialogType.value = type;
  showMainDialog2.value = true
}

const initiateComments = () => {
  ElMessageBox.prompt("请填写评论内容", "发起评论", {
    inputPattern: /\S/,
    inputErrorMessage: '评论内容不能为空!',
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

const confirmDialog = () =>{
  proxy.$message.success("保存成功!");
  setTimeout(() => {
      showMainDialog2.value = false;
  }, 500);
}

onMounted(() => {
		getDetail(false);
});
const getDetail = (isTure: boolean) => {
		getServiceticketById(route.query.id).then((res : any) => {
			let data = res.data.data
			if (data!=undefined) {
				aftersalesHeaderDetails.value = data
        changeStep(aftersalesHeaderDetails.value["status__c"])
        getTicketSolutionData();
        getOrderData();
        getProblemData();
				if(isTure)
				{
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

const getTicketSolutionData = () =>{
  getTicketSolutionByTicketId(aftersalesHeaderDetails.value["neoId"]).then((res : any) => {
			let data = res.data.data
			if (data!=undefined) {
				let tableData = data;
        ticketSolutionDetials.value = tableData["details"];
        ticketSoluDetailsTable.value=tableData["details"];
        delete tableData["details"];
        ticketSolutionTable.value = [tableData];        
			} else {
			   console.log("获取数据失败!");
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

const getOrderData = () =>{
  getOrderListByNeoId(aftersalesHeaderDetails.value["orderNeoId"]).then((res : any) => {
			let data = res.data.data
			if (data!=undefined) {
				orderDetails.value=data      
			} else {
        console.log("无对应数据!");
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

const getProblemData = () =>{
  let params={
    id:"",
    neoid:aftersalesHeaderDetails.value["serviceCase__c"]
  }
  getServiceCaseItem(params).then((res : any) => {
			let data = res.data.data
			if (data!=undefined) {
				problemDetails.value=data      
			} else {
        console.log("无对应数据!");
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
const viewDetails = (row) =>{
  loadingOrderList()
  showTicketSolutionDetailsDialog.value = true
}

const fileIdList = ref<any>([])
const handleUploaded = (rep) => {
  fileIdList.value = fileIdList.value.concat(rep.data.map(item => item.fileId))
}

const handleSuccess = (res) => {
  console.log(res);
  if (res.code == "success") {
    fileIdList.value = fileIdList.value.concat(
    res.data.map((item) => item.fileId)
  );
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






//售后处理明细table
const ticketSoluDetailsTable=ref([])
const multipleTableRef = ref()
const multipleSelection = ref([])
//经销商填写售后处理描述
dialog2Form.value = ref({})
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

//售后处理明细中的产品明细和订单产品数据组合
const loadingOrderList = () => {
  getOrderListByNeoId(aftersalesHeaderDetails.value["orderNeoId"]).then((res: any) => {
    if (res.data.code == "success") {
      let orderPo = res.data.data.po //订单po
        let getOrderItems = res.data.data.items;
        ticketSoluDetailsTable.value.forEach(item => {
          item['checked'] = false
          item["orderPo"] = orderPo
        })
            if (getOrderItems && getOrderItems.length > 0) {
              ticketSoluDetailsTable.value.forEach(val => {
                let item = getOrderItems.find(val2 => val["orderProductId"] == val2["neoid"]);
                if (item) {
                  val["productionOrderNo__c"] = item["productionOrderNo__c"];
                  val["quantity"] = item["quantity"];
                  val["name"] = item["name"];
                  val["productName"] = item["productName"];
                  val["paintColor__c"] = item["paintColor__c"];
                  val["treeSpecies__c"] = item["treeSpecies__c"];
                  val["fscProductSpec"] = item["fscProductSpec"];
                  val["fscProductModel"] = item["fscProductModel"];
                  val["category1"] = item["category1"];
                  if(val["ticketProblem"] && isArray(val["ticketProblem"])){
                    let ticketProblemNames="";
                    console.log()
                    val["ticketProblem"].forEach((problem)=>{
                    ticketProblemNames=ticketProblemNames+
                    afterSalesIssuesList.value.find(
                        (aSItem) => aSItem["code"] == problem
                      ).name+","
                    })
                    //console.log(ticketProblemNames.substring(0,ticketProblemNames.length-1))
                    val["ticketProblem"] = ticketProblemNames.substring(0,ticketProblemNames.length-1);
                  }
                  
                }
              })
            } else {
              console.info("details没数据")
            }
    } else {
      proxy.$message.error("数据异常!");
    }
  })
}
//升级到总部售后提交按钮
const submitDialog = () => {
  const selectData = ticketSoluDetailsTable.value.filter(item => item.checked)
  if (selectData.length <= 0) {
    proxy.$message.error("必须勾选数据!");
    return;
  }
  if (!fileIdList.value || fileIdList.value.length === 0) {
    proxy.$message.warning("请上传问题图片");
    return;
  } 
  let selectDataClone=JSON.parse(JSON.stringify(selectData));
  selectDataClone.forEach(item => {
    item["picture"] = fileIdList.value //图片id
    item["treeSpecies"] = item["treeSpecies__c"] //树种
    item["category"] = item["category1"] //产品大类
    item["paintColor"] = item["paintColor__c"] //油漆颜色
    item["ticketClassification"] = dialog2Form.value.problemType //问题大类
    item["ticketProblem"] = dialog2Form.value.afterSalesIssues //售后问题
    // item["personLiable"] = dialog2Form.value.responsiblePerson //责任主体
    item["descriptionOfTicketProblem"] = dialog2Form.value.problemDesc //问题描述
  })

  let params = {
    id:ticketSolutionTable.value[0]["id"],
    orderId:orderDetails.value["neoid"],
    serviceTicket:aftersalesHeaderDetails.value["id"],
    serviceTicketId: parseInt(ticketSolutionTable.value[0]["serviceTicketId"]),
    serviceCaseId:parseInt(ticketSolutionTable.value[0]["serviceCaseId"]),
    details: selectDataClone
  }
  // dialog2Form.value["details"] = selectData
  if (!dialog2Form.value.problemType || !dialog2Form.value.afterSalesIssues  || !dialog2Form.value.problemDesc) {
    proxy.$message.error("必填选项不能为空!");
  } else {    
    setTimeout(() => {
      // params["caseVo"] = "234234234"
      //提交方法
      getticketsolution(params).then((res: any) => {
        let data = res.data.data;
        if(res.data.code=='success' && data!=undefined){
          selectData.forEach(item => {
            item["picture"] = fileIdList.value //图片id
            item["treeSpecies"] = item["treeSpecies__c"] //树种
            item["category"] = item["category1"] //产品大类
            item["paintColor"] = item["paintColor__c"] //油漆颜色
            item["ticketClassification"] = dialog2Form.value.problemType //问题大类
            item["ticketProblem"] = dialog2Form.value.afterSalesIssues //售后问题
            // item["personLiable"] = dialog2Form.value.responsiblePerson //责任主体
            item["descriptionOfTicketProblem"] = dialog2Form.value.problemDesc //问题描述
            if(item["ticketProblem"] && isArray(item["ticketProblem"])){
                    let ticketProblemNames="";
                    item["ticketProblem"].forEach((problem)=>{
                    ticketProblemNames=ticketProblemNames+
                    afterSalesIssuesList.value.find(
                        (aSItem) => aSItem["code"] == problem
                      ).name+","
                    })
                    //console.log(ticketProblemNames.substring(0,ticketProblemNames.length-1))
                    item["ticketProblem"] = ticketProblemNames.substring(0,ticketProblemNames.length-1);
                  }
          })
          proxy.$message.success("提交成功")
        }else{
          proxy.$message.warning("提交失败，请重试")
        }
      }).catch((error: any) => {
        ElMessage({
          message: '系统异常,提交失败',
          type: 'error'
        });
    })
    }, 500);
  }
}
const handleProblemTypeChange = (problemType) => {
  afterSalesIssuesListForSelect.value =
    afterSalesIssuesListWithType.value[problemType];
    dialog2Form.value.afterSalesIssues=[];
};
const selectAll=(event)=>{
  ticketSoluDetailsTable.value.forEach(item=>{
    item["checked"]=event
  })
};
const reSubmitApproval=()=>{
  if(aftersalesHeaderDetails==undefined || aftersalesHeaderDetails.value["approvalStatus"]!="2"){
    proxy.$message.warning("非审批退回状态重新提交")
    return
  }
  let updateParams={
    id:aftersalesHeaderDetails.value["id"],
    approvalStatus:1
  }
  updateOrCreateServiceticket(updateParams)
    .then((res) => {
      let serviceTicketRes = res.data;
      if (
        serviceTicketRes.code == "success" &&
        serviceTicketRes.data != undefined &&
        serviceTicketRes.data["id"] != undefined
      ) {
        ElMessage({
        message: "重新提交售后工单成功",
        type: "success",
      });
      }
    })
    .catch((error: any) => {
      ElMessage({
        message: "重新提交售后工单失败,请重试",
        type: "error",
      });
    });
}
</script>

<style lang="scss" scoped>
@import "./components/index.scss";
</style>
