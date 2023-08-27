import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'dayjs/locale/zh-cn'
import './assets/css/baseStyle.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus,{
    locale: zhCn,
})
app.mount('#app')


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}