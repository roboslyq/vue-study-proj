import { asyncRoutes } from '@/router'

// 将菜单信息转成对应的路由信息 动态添加
export default function createRoutes(data) {
    const result = []
    if (!data || data.length == 0) {
        return result
    }
    const children = []
    result.push({
        path: '/',
        component: () => import('../components/Index.vue'),
        children,
    })

    data.forEach(item => {
        generateRoutes(children, item)
    })

    // 最后添加404页面 否则会在登陆成功后跳到404页面
    result.push(
        { path: '*', redirect: '/404' },
    )

    return result
}

function generateRoutes(children, item) {
    if (item.name && item.name.length > 0) {
        children.push(asyncRoutes[item.name])
    } else if (item.children && item.children.length > 0) {
        item.children.forEach(e => {
            generateRoutes(children, e)
        })
    }
}