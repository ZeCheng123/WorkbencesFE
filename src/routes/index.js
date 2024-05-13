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
    component: () => import('../views/login/index.vue')
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
    name: '任务详情',
    component: () => import('../views/taskDetails/index.vue')
  },
  //交付任务
  {
    path: '/delivery_tasks',
    name: '交付任务',
    component: () => import('../views/deliveryTasks/index.vue')
  },
  {
    path: '/delivery_tasks_details',
    name: '交付详情',
    component: () => import('../views/deliveryTasksDetails/index.vue')
  },
  {
    path: '/historical_orders',
    name: '历史订单',
    component: () => import('../views/historicalOrders/index.vue')
  },
  {
    path: '/historical_orders_details',
    name: '订单详情',
    component: () => import('../views/historicalOrdersDetails/index.vue')
  },
  //售后工单 
  {
    path: '/aftersales_workorder',
    name: '售后工单',
    component: () => import('../views/aftersalesWorkorder/index.vue')
  },
  {
    path: '/aftersales_workorder_details',
    name: '售后工单详情',
    component: () => import('../views/aftersalesWorkorderDetails/index.vue')
  },
  {
    path: '/dispatch_list',
    name: '派工单',
    component: () => import('../views/dispatchList/index.vue')
  },
  {
    path: '/dispatch_details',
    name: '派工单详情',
    component: () => import('../views/dispatchDetails/index.vue')
  },
  {
    path: '/service_workorder',
    name: '服务评价',
    component: () => import('../views/serviceWorkorder/index.vue')
  },
  {
    path: '/service_workorder_details',
    name: '服务评价详情',
    component: () => import('../views/serviceWorkorderDetails/index.vue')
  },
  {
    path: '/problem_report_list',
    name: '问题提报',
    component: () => import('../views/problemReportList/index.vue')
  },
  {
    path: '/problem_report_details',
    name: '问题提报详情',
    component: () => import('../views/problemReportDetails/index.vue')
  },
  {
    path: '/my_personnel',
    name: '我的人员',
    component: () => import('../views/myPersonnel/index.vue')
  },
  {
    path: '/qualification_information',
    name: '资质信息',
    component: () => import('../views/qualificationInformation/index.vue')
  },
  //问题提报 
  {
    path: '/problem_reporting',
    name: '新建问题提报',
    component: () => import('../views/problemReporting/index.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});


// router.beforeEach((to, from, next) => {
//   const allowedRoutes = ['/main']; // 可以直接访问的路由，例如指定的页面
//   if (!allowedRoutes.includes(to.path)) {
//     next({ path: "/main" }); // 如果不是允许的路由且不是从主界面跳转，则重定向到主界面
//   } else {
//     next(); // 允许访问目标路由
//   }
// });


export default router;
