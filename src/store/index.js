import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 左侧菜单栏数据(默认主页)
        menuItems: [
            {
                name: 'home', // 要跳转的路由名称 不是路径
                size: 18, // icon大小
                type: 'md-home', // icon类型
                text: '主页', // 文本内容
            },
        ],
    },
    mutations: {
        setMenus(state, items) {
            state.menuItems = [...items]
        },
    },
    actions: {
        getMenus(context) {
            this.isShowLoading = true
            // Axios.get('/user/front/menus')
            Axios.get('/user/front/iview/menus')
            .then(response => {
                this.isShowLoading = false
                context.commit('setMenus', response.data)
            }).catch(error => {
                this.pwdError = error
                this.isShowLoading = false
            })
        },
    },
})

export default store