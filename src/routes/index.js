import { createRouter, createWebHashHistory  } from 'vue-router';

const routes = [
  { 
    path: '/', 
    redirect: '/main'
  },
  //工作台主界面
  { 
    path: '/main', 
    name: '工作台', 
    component: () => import('../views/main/index.vue') 
  },
  //任务详情 
  { 
    path: '/task_details',
    name:'任务详情',
    component: () => import('../views/taskDetails/index.vue') 
  },
  //订单中心 
  { 
    path: '/order_center',
    name:'订单中心',
    component: () => import('../views/orderCenter/index.vue') 
  },
  { 
    path: '/order_details',
    name:'订单详情',
    component: () => import('../views/orderDetails/index.vue') 
  },
    //售后工单 
  { 
    path: '/aftersales_workorder',
    name:'售后工单',
    component: () => import('../views/aftersalesWorkorder/index.vue') 
  },
  { 
    path: '/aftersales_workorder_details',
    name:'售后工单详情',
    component: () => import('../views/aftersalesWorkorderDetails/index.vue') 
  },
  { 
    path: '/dispatch_list',
    name:'派工单',
    component: () => import('../views/dispatchList/index.vue') 
  },
  { 
    path: '/dispatch_detials',
    name:'派工单详情',
    component: () => import('../views/dispatchDetails/index.vue') 
  },
  { 
    path: '/my_personnel',
    name:'我的人员',
    component: () => import('../views/myPersonnel/index.vue') 
  },
  { 
    path: '/qualification_information',
    name:'资质信息',
    component: () => import('../views/qualificationInformation/index.vue') 
  },
  //问题提报 
  { 
    path: '/problem_reporting',
    name:'问题提报',
    component: () => import('../views/problemReporting/index.vue') 
  }  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
