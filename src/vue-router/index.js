import createMatcher from "./create-matcher"
import install from "./install"
import HashHistory from "./history/hash"
import BrowserHistory from "./history/history"

class vueRouter {
    constructor(options) {
        // 根据用户的配置 和当前请求路径 渲染对应的组件
        // 创建匹配器 用于后续的匹配操作
        // 用户没有传递配置 默认传入一个空数组
        // 1.match通过路由来匹配组件
        // 2.addRoutes 动态添加匹配规则
        this.matcher = createMatcher(options.routes || [])
        console.log('this.matcher', this.matcher)
        // vue路由有三种模式 hash / h5api /abstract ,为了保证调用时方法一致。我们需要提供一个base类，在分别实现子类，不同模式下通过父类调用对应子类的方法

        // 创建历史管理  (路由两种模式 hash  浏览器api)
        this.mode = options.mode || "hash"

        switch (this.mode) {
            case "hash":
                this.history = new HashHistory(this)
                break
            case "history":
                this.history = new BrowserHistory(this)
                break
        }
    }
    match(location) {
        return this.matcher.match(location)
    }
    init(app) {
        // 初始化 目前这个app指代的就是最外层new Vue
        // 需要根据用户配置做一个映射表

        // 监听hash值的变化 默认跳转到对应的路径
        const history = this.history
        const setupHashListener = () => {
            history.setupListener() // 监听路由变化 hashchange
        }

        // 父类提供方法负责跳转   初始化 会先获得当前的hash值 进行跳转的时候监听hash变化
        history.transitionTo(
            history.getCurrentLocation(), // 子类获取当前的位置
            setupHashListener
        )
        history.listen(route => {
            // 每次路径变化 都会调用此方法
            app._route = route
        })

        // 初始化时 都需要调用更新_route的方法
        // transitionTo 跳转逻辑 hash 、 browser都有 做成公共方法
        // getCurrentLocation  hash和browser实现不一样
        // setupListener  hash监听
    }
    push(to) {
        console.log('vueRouter中的push')
        this.history.transitionTo(to)   // 跳转路径
    }
}
vueRouter.install = install

// 默认vue-router会导出一个类 用户会 new Router({})
export default vueRouter
