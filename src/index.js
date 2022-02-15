import Vue from "vue"
// vue框架的vue-router
// import VueRouter from "vue-router"

import VueRouter from "@/vue-router/index"

Vue.use(VueRouter)  // 使用这个插件 内部会提供两个全局组件 router-view  router-link 还会提供两个原型上的属性 $route $router

// 路由就是匹配到对应路径显示对应的组件！
// 路由导出后 需要注册到实例中
const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import(/* webpackChunkName: "about" */ "@/views/Home"),
    },
    {
        path: "/about",
        name: "About",
        component: () => import(/* webpackChunkName: "about" */ "@/views/About"),
        children:[
            {
                path:'a',   //这里不能写/a /是根路径  可写成/about/a 这样太繁琐
                component:{
                    render:(h)=><h1>About a</h1>
                }
            },
            {
                path:'b',   
                component:{
                    render:(h)=><h1>About b</h1>
                }
            }
        ]
    },
]

const router = new VueRouter({
    mode: "hash",   // 默认是hash模式  history模式用在生产模式需要服务端支持否则一刷新页面就404
    base: process.env.BASE_URL,
    routes,
})

// 动态添加路由
// router.addRoutes([
//     {
//         path:'/auth',component:{render:h=>h('auth')}
//     }
// ])
export default router
