import Vue from "vue"
// vue框架的vue-router
// import VueRouter from "vue-router"

import VueRouter from "../vue-router"

Vue.use(VueRouter)  // 使用这个插件 内部会提供两个全局组件 router-view  router-link 还会提供两个原型上的属性 $route $router

// 路由就是匹配到对应路径显示对应的组件！
// 路由导出后 需要注册到实例中
const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import(/* webpackChunkName: "Home" */ "@/views/Home"),
    },
    {
        path: "/about",
        name: "About",
        component: () => import(/* webpackChunkName: "About" */ "@/views/About"),
        children: [
            {
                path: 'a',   //这里不能写/a /是根路径  可写成/about/a 这样太繁琐
                component: {
                    render: (h) => <h1>About a</h1>
                }
            },
            {
                path: 'b',
                component: {
                    render: (h) => <h1>About b</h1>
                }
            }
        ]
    },
]

const router = new VueRouter({
    mode: "hash",   // 默认是hash模式  history模式用在生产模式需要服务端支持否则一刷新页面就404
    routes,
})

// 动态添加路由
// router.matcher.addRoutes([
//     {
//         path: '/auth', component: { render: h => h('auth') }
//     }
// ])

// 当导航变化时 会依次执行这两个方法
router.beforeEach((from,to,next)=>{
    console.log(1);
    setTimeout(() => {
        next()
    }, 1000);
})
router.beforeEach((from,to,next)=>{
    console.log(2);
    setTimeout(() => {
        next()
    }, 1000);
})

export default router

// 完整的导航解析流程  就是路由钩子的渲染流程
// 1.导航被触发。
// 2.在失活的组件里调用 beforeRouteLeave 守卫。
// 3.调用全局的 beforeEach 守卫。
// 4.在重用的组件里调用 beforeRouteUpdate 守卫(2.2+)。
// 5.在路由配置里调用 beforeEnter。
// 6.解析异步路由组件。
// 7.在被激活的组件里调用 beforeRouteEnter。
// 8.调用全局的 beforeResolve 守卫(2.5+)。
// 8.导航被确认。
// 10.调用全局的 afterEach 钩子。
// 11.触发 DOM 更新。
// 12.调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。