import { createApp} from 'vue'
import './styles/variables.scss'
import App from './App.vue'
import router from './routes'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import ECharts from 'vue-echarts'
import "echarts"
import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App);
app.use(pinia);
app.use(ElementPlus);
app.use(router);
app.component('ECharts',ECharts);
app.mount('#app');
