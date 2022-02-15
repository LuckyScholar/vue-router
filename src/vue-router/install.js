export let _Vue;

export default function install(Vue,options){
    // 插件安装的入口
    _Vue = Vue  // 这样别的文件都可以使用_Vue变量

    // 给所有组件都混入一个变量router
    Vue.mixin({
        beforeCreate(){ // 给所有组件的生命周期都增加beforeCreate方法 在实例生成前混入
            if(this.$options.router){   // 如果有router属性说明是根实例
                this._routerRoot = this // 给当前根实例添加一个_routerRoot属性 将根实例挂载在_routerRoot属性上
                this._router = this.$options.router   // 将当前router实例挂载在_router上
                this._router.init(this);    // 初始化路由,这里的this指向的是根实例
            }else{
                // 父组件渲染后会渲染子组件 子组件找它的父组件拿到对应的_routerRoot
                this._routerRoot = this.$parent && this.$parent._routerRoot
                // 保证所有子组件都拥有_routerRoot 属性，指向根实例 在根实例上取_router属性
                // 保证所有组件都可以通过 this._routerRoot._router 拿到用户传递进来的路由实例对象
            }
        }
    })

    // 路由实例注册到各组件流程
    // main._routerRoot = this(根实例)  =>  app._routerRoot => home._routerRoot

    // 插件一般用于定义全局组件 全局指令 过滤器 原型方法
    Vue.component('router-link',{
        render:h=>h('a',{},'')
    })
    Vue.component('router-view',{
        render:h=>h('div',{},'')
    })
    Vue.prototype.$route = {}
    Vue.prototype.$router = {}

}
