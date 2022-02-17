export let _Vue;
import routerLink from './components/router-link'
import routerView from './components/router-view';

export default function install(Vue, options) {
    // 插件安装的入口
    _Vue = Vue  // 这样别的文件都可以使用_Vue变量

    // 给所有组件都混入一个变量router
    Vue.mixin({
        beforeCreate() { // 给所有组件的生命周期都增加beforeCreate方法 在实例生成前混入
            if (this.$options.router) {   // 如果有router属性说明是根实例
                this._routerRoot = this // 给当前根实例添加一个_routerRoot属性 将根实例挂载在_routerRoot属性上
                this._router = this.$options.router   // 将当前router实例挂载在_router上
                this._router.init(this);    // 初始化路由,这里的this指向的是根实例
 
                // 如何获取到current属性 将current属性定义到_route上  this.$set只能设置某个属性不能设置整个对象为响应式
                Vue.util.defineReactive(this, '_route', this._router.history.current)
               
                // 当current变化后 更新_route属性
                // 如果current中path或者matched其他属性变化 也是响应式的
            } else {
                // 父组件渲染后会渲染子组件 子组件找它的父组件拿到对应的_routerRoot
                this._routerRoot = this.$parent && this.$parent._routerRoot
                // 保证所有子组件都拥有_routerRoot 属性，指向根实例 在根实例上取_router属性
                // 保证所有组件都可以通过 this._routerRoot._router 拿到用户传递进来的路由实例对象
            }
            // 永远是下一层找上一层
        }
    })

    // 路由实例注册到各组件流程
    // main._routerRoot = this(根实例)  =>  app._routerRoot => home._routerRoot

    // 插件一般用于定义全局组件 全局指令 过滤器 原型方法
    Vue.component('router-link', routerLink)
    Vue.component('router-view', routerView)
    // 路由中的所有属性
    Object.defineProperty(Vue.prototype, '$route', {
        get() {
            return this._routerRoot._route  // path matched
        }
    })
    // 路由中的所有方法
    Object.defineProperty(Vue.prototype, '$router', {
        get() {
            return this._routerRoot._router  // 方法 push go 
        }
    })

}
