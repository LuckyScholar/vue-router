
import createMatcher from './create-matcher';
import install from './install'

class vueRouter{
    constructor(options){
        // 根据用户的配置 和当前请求路径 渲染对应的组件
        // 创建匹配器 用于后续的匹配操作
        // 用户没有传递配置 默认传入一个空数组
        // 1.match通过路由来匹配组件
        // 2.addRoutes 动态添加匹配规则
        this.matcher =  createMatcher(options.route || [])
    }
    init(app){ // 初始化
        console.log(app.$options.name);
    }
    push(){

    }
}
vueRouter.install = install

// 默认vue-router会导出一个类 用户会 new Router({})
export default vueRouter