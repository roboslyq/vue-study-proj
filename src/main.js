import Vue from 'vue'
import axios from 'axios'
import ViewUI from 'view-design'
import ElementUI from 'element-ui'
import App from './App'
import store from './store'
import router from './router'
import 'view-design/dist/styles/iview.css'
import 'element-ui/lib/theme-chalk/index.css'
import './permission'


Vue.config.productionTip = false
Vue.use(ViewUI)
Vue.use(ElementUI)

// 配置axios请求的地址
axios.defaults.baseURL = 'http://127.0.0.1:8765/'
// 设置请求超时时间
axios.defaults.timeout = 5000
// 配置POST默认请求类型，如果不配置，默认method=OPTIONS
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 是否允许跨域
axios.defaults.crossDomain = true
// 设置cross跨域 并设置访问权限 允许跨域携带cookie信息
// axios.defaults.withCredentials = true
// 设置请求头为 Authorization
axios.defaults.headers.common.Authorization = 'Basic ZGVtb19jbGllbnQ6MTIzNDU2'
// 赋值给vue
Vue.prototype.$axios = axios

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
})