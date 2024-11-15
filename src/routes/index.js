import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  //登录
  {
    path: '/login',
    name: '登录',
    component: () => import('../views/login/index.vue'),
    meta:{
      isAuth: true
    }
  },
  //中转界面 处理登录逻辑
  {
    path: '/validate',
    name: '获取token验证',
    component: () => import('../views/validate/index.vue'),
    meta:{
      isAuth: true
    }
  },
  //工作台主界面
  {
    path: '/main',
    name: '工作台',
    component: () => import('../views/main/index.vue'),
    meta:{
      isAuth: false
    }
  },
  //任务详情 
  {
    path: '/task_details',
    name: '任务详情',
    component: () => import('../views/taskDetails/index.vue'),
    meta:{
      isAuth: false
    }
  },
  //交付任务
  {
    path: '/delivery_tasks',
    name: '交付任务',
    component: () => import('../views/deliveryTasks/index.vue'),
    meta:{
      isAuth: false
    }
  },
  {
    path: '/delivery_tasks_details',
    name: '交付详情',
    component: () => import('../views/deliveryTasksDetails/index.vue'),
    meta:{
      isAuth: false
    }
  },
  {
    path: '/historical_orders',
    name: '历史订单',
    component: () => import('../views/historicalOrders/index.vue'),
    meta:{
      isAuth: false
    }
  },
  {
    path: '/historical_orders_details',
    name: '订单详情',
    component: () => import('../views/historicalOrdersDetails/index.vue'),
    meta:{
      isAuth: false
    }
  },
  //售后工单 
  {
    path: '/aftersales_workorder',
    name: '售后工单',
    component: () => import('../views/aftersalesWorkorder/index.vue'),
    meta:{
      isAuth: false
    }
  },
  {
    path: '/aftersales_workorder_details',
    name: '售后工单详情',
    component: () => import('../views/aftersalesWorkorderDetails/index.vue'),
    meta:{
      isAuth: false
    }
  },
  {
    path: '/aftersales_workorder_fordocno',
    name: '售后详情',
    component: () => import('../views/aftersalesWorkorderForDocNo/index.vue'),
    meta:{
      isAuth: true
    }
  },
  {
    path: '/dispatch_list',
    name: '派工单',
    component: () => import('../views/dispatchList/index.vue'),
    meta:{
      isAuth: false
    }
  },
  {
    path: '/dispatch_details',
    name: '派工单详情',
    component: () => import('../views/dispatchDetails/index.vue'),
    meta:{
      isAuth: false
    }
  },
  {
    path: '/service_workorder',
    name: '服务评价',
    component: () => import('../views/serviceWorkorder/index.vue'),
    meta:{
      isAuth: false
    }
  },
  {
    path: '/service_workorder_details',
    name: '服务评价详情',
    component: () => import('../views/serviceWorkorderDetails/index.vue'),
    meta:{
      isAuth: false
    }
  },
  {
    path: '/problem_report_list',
    name: '问题提报',
    component: () => import('../views/problemReportList/index.vue'),
    meta:{
      isAuth: false
    }
  },
  {
    path: '/problem_report_details',
    name: '问题提报详情',
    component: () => import('../views/problemReportDetails/index.vue'),
    meta:{
      isAuth: false
    }
  },
  {
    path: '/my_personnel',
    name: '我的人员',
    component: () => import('../views/myPersonnel/index.vue'),
    meta:{
      isAuth: false
    }
  },
  {
    path: '/qualification_information',
    name: '资质信息',
    component: () => import('../views/qualificationInformation/index.vue'),
    meta:{
      isAuth: false
    }
  },
  //问题提报 
  {
    path: '/problem_reporting',
    name: '新建问题提报',
    component: () => import('../views/problemReporting/index.vue'),
    meta:{
      isAuth: false
    }
  },
  //404 
  {
      path: '/404',
      name: '404',
      component: () => import('../views/404/index.vue'),
      meta:{
        isAuth: true
      }
    }
];



const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 判断是否在电脑浏览器中
function isInBrowser() {
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('micromessenger') === -1;
}

// 判断是否在企业微信中
function isInWeChat() {
  return typeof wx !== 'undefined';
}


router.beforeEach((to, from, next) => {
  const allowedRoutes = ['/login', '/validate','/aftersales_workorder_fordocno','/404'];
  let isLogin = "1"; //  localStorage.getItem("isLogin") || sessionStorage.getItem("isLogin");
  console.log("isLogin:"+isLogin);
  if (!allowedRoutes.includes(to.path)) {
    if(to.meta.isAuth || isLogin == "1")
    {
      next();
    }
    else{
      next({ path: "/login" }); 
    }
  } else {
    next(); // 允许访问目标路由
  }
});

export default router;
