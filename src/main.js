import { createApp} from 'vue'
import './styles/variables.scss'
import App from './App.vue'
import router from './routes'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import ECharts from 'vue-echarts'
import "echarts"
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App);
app.use(pinia);
app.use(ElementPlus, {
    locale: zhCn,
});
app.use(router);
app.component('ECharts',ECharts);
app.mount('#app');
