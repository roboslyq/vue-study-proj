import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const commonRoutes = [
    {
        path: '/login',
        name: 'login',
        meta: { title: '登录' },
        component: () => import('../components/logon/Login'),
    },
    {
        path: '/404',
        name: '404',
        meta: { title: '404' },
        component: () => import('../components/common/404'),
    },
    { path: '/', redirect: '/home' },
]

// 本地所有的页面 需要配合后台返回的数据生成页面
export const asyncRoutes = {
    home: {
        path: 'home',
        name: 'home',
        meta: { title: '主页' },
        component: () => import('../views/home/Home.vue'),
    },
    // 系统管理
    menuManager: {
        path: 'menuManager',
        name: 'menuManager',
        meta: { title: '菜单管理' },
        component: () => import('../views/systemmanager/menuManager.vue'),
    },
    roleAuthManager: {
        path: 'roleAuthManager',
        name: 'roleAuthManager',
        meta: { title: '角色权限管理' },
        component: () => import('../views/systemmanager/roleAuthManager.vue'),
    },
    roleTypeManager: {
        path: 'roleTypeManager',
        name: 'roleTypeManager',
        meta: { title: '角色类型管理' },
        component: () => import('../views/systemmanager/roleTypeManager.vue'),
    },
    gateLogManager: {
        path: 'gateLogManager',
        name: 'gateLogManager',
        meta: { title: '操作日志管理' },
        component: () => import('../views/systemmanager/gateLogManager.vue'),
    },
    // 用户信息管理
    userManager: {
        path: 'userManager',
        name: 'userManager',
        meta: { title: '修改密码' },
        component: () => import('../views/usermanager/userManager.vue'),
    },
    password: {
        path: 'password',
        name: 'password',
        meta: { title: '修改密码' },
        component: () => import('../views/usermanager/password.vue'),
    },
    // 服务权限管理
    serviceManager: {
        path: 'serviceManager',
        name: 'serviceManager',
        meta: { title: '修改密码' },
        component: () => import('../views/servicemanager/serviceManager.vue'),
    },
    // 监控模块管理
    registryManager: {
        path: 'registryManager',
        name: 'registryManager',
        meta: { title: '修改密码' },
        component: () => import('../views/monitormanager/registryManager.vue'),
    },
    // 服务权限管理
    monitorManager: {
        path: 'monitorManager',
        name: 'monitorManager',
        meta: { title: '修改密码' },
        component: () => import('../views/monitormanager/monitorManager.vue'),
    },
    // 服务权限管理
    apmManager: {
        path: 'apmManager',
        name: 'apmManager',
        meta: { title: '修改密码' },
        component: () => import('../views/monitormanager/apmManager.vue'),
    },
    // 开发工具管理
    generate: {
        path: 'generate',
        name: 'generate',
        meta: { title: '代码生成' },
        component: () => import('../views/tools/generate.vue'),
    },
    // 右上角
    msg: {
        path: 'msg',
        name: 'msg',
        meta: { title: '通知消息' },
        component: () => import('../views/common/Msg.vue'),
    },
    userinfo: {
        path: 'userinfo',
        name: 'userinfo',
        meta: { title: '用户信息' },
        component: () => import('../views/user/UserInfo.vue'),
    },
}

const createRouter = () => new Router({
    routes: commonRoutes,
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

export default router