import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
createApp(App)
.use(router)
.use(ElementPlus,{
  /* 设置中文 */
  locale: zhCn
})
.mount('#app')