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


 
// eslint-disable-next-line @typescript-eslint/ban-types
const debounce = (callback: ResizeObserverCallback, delay: number) => {
    let tid: unknown
    return function (...rest: [entries: ResizeObserverEntry[], observer: ResizeObserver]) {
        const ctx = self
        tid && clearTimeout(tid as number);
        tid = setTimeout(() => {
            callback.apply(ctx, rest)
        }, delay)
    }
}

const _ =  ResizeObserver;
    window.ResizeObserver = class ResizeObserver extends _ {
        // eslint-disable-next-line @typescript-eslint/ban-types
        constructor(callback: ResizeObserverCallback) {
            callback = debounce(callback, 20)
            super(callback);
        }
    }