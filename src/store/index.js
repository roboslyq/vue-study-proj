import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 左侧菜单栏数据(默认主页)
        menuItems: [
            {
                id: 1,
                parentId: -1,
                children: [],
                name: 'home',
                type: 'md-home',
                text: '主页',
                size: 18,
            },
            {
                id: 5,
                parentId: -1,
                children: [
                    {
                        id: 13,
                        parentId: 5,
                        children: [],
                        name: 'userManager',
                        type: 'ios-grid',
                        text: '用户查询',
                        size: 18,
                    },
                    {
                        id: 14,
                        parentId: 5,
                        children: [],
                        name: 'password',
                        type: 'ios-grid',
                        text: '修改密码',
                        size: 18,
                    },
                ],
                name: '',
                type: 'ios-paper',
                text: '用户信息管理',
                size: 18,
            },
            {
                id: 29,
                parentId: -1,
                children: [
                    {
                        id: 30,
                        parentId: 29,
                        children: [],
                        name: 'serviceManager',
                        type: 'ios-grid',
                        text: '服务管理',
                        size: 18,
                    },
                ],
                name: '',
                type: 'ios-paper',
                text: '服务权限管理',
                size: 18,
            },
            {
                id: 31,
                parentId: -1,
                children: [
                    {
                        id: 32,
                        parentId: 31,
                        children: [],
                        name: 'registryManager',
                        type: 'ios-grid',
                        text: '服务注册中心',
                        size: 18,
                    },
                    {
                        id: 33,
                        parentId: 31,
                        children: [],
                        name: 'monitorManager',
                        type: 'ios-grid',
                        text: '服务状态监控',
                        size: 18,
                    },
                    {
                        id: 34,
                        parentId: 31,
                        children: [],
                        name: 'apmManager',
                        type: 'ios-grid',
                        text: '服务链路监控',
                        size: 18,
                    },
                ],
                name: '',
                type: 'ios-paper',
                text: '监控模块管理',
                size: 18,
            },
            {
                id: 35,
                parentId: -1,
                children: [
                    {
                        id: 6,
                        parentId: 35,
                        children: [],
                        name: 'menuManager',
                        type: 'ios-grid',
                        text: '菜单管理',
                        size: 18,
                    },
                    {
                        id: 7,
                        parentId: 35,
                        children: [],
                        name: 'roleAuthManager',
                        type: 'ios-grid',
                        text: '角色权限管理',
                        size: 18,
                    },
                    {
                        id: 8,
                        parentId: 35,
                        children: [],
                        name: 'roleTypeManager',
                        type: 'ios-grid',
                        text: '角色类型管理',
                        size: 18,
                    },
                    {
                        id: 27,
                        parentId: 35,
                        children: [],
                        name: 'gateLogManager',
                        type: 'ios-grid',
                        text: '操作日志',
                        size: 18,
                    },
                ],
                name: '',
                type: 'ios-paper',
                text: '系统管理',
                size: 18,
            },
            {
                id: 37,
                parentId: -1,
                children: [
                    {
                        id: 38,
                        parentId: 37,
                        children: [],
                        name: 'generate',
                        type: 'ios-grid',
                        text: '代码生成',
                        size: 18,
                    },
                ],
                name: '',
                type: 'ios-paper',
                text: '开发工具',
                size: 18,
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