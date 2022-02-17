export function createRoute(record, location) {
    let res = [] // [/about, /about/a]
    if (record) {
        while (record) {
            res.unshift(record) // 不停的找父亲 并放在数组的首位
            record = record.parent
        }
    }

    return {
        ...location,
        matched: res
    }
}

function runQueue(queue,iterator,cb){
    // 异步迭代
    function step(index){   // 可以实现中间件逻辑 就是Koa里的compose函数 中间件的洋葱模型（从外到里再从里到外）
        if(index >= queue.length) return cb()   //这里index要大于等于队列的长度就结束 因为index从0开始
        let hook = queue[index] //  将第二个hook的逻辑当做参数传入
        // hook就是队列里的每一项函数
        // router.beforeEach((from,to,next)=>{
        //     console.log(1);
        //     setTimeout(() => {
        //         next()
        //     }, 1000);
        // })
        // hook就是用户传进来的这个函数
        // (from,to,next)=>{
        //     console.log(1);
        //     setTimeout(() => {
        //         next()
        //     }, 1000);
        // }
        
        iterator(hook,()=>step(index+1))
    }
    // 调用runQueue方法先执行第一个hook函数
    step(0);
}
export default class History {
    constructor(router) {
        this.router = router
        
        // 当我们创建完路由后 先有一个默认值 路径和匹配到的记录做一个映射表
        // 默认当创建history时 路径应该是/ 并且匹配到的记录是[]
        this.current = createRoute(null, {
            // 存放路由状态的
            path: '/'
        })
        // console.log('this.current', this.current);
        // this.current = { path:'/', matched: []}
    }
    transitionTo(location, onComplete) {
        // 跳转时都会调用此方法 from... to...
        // 路径变化了 视图还要刷新 响应式的数据原理
        // console.log('路径变化location', location)
        // 获取当前路径匹配出对应的记录，当路径变化时获取对应的记录  => 渲染页面 （router-view实现的）
        // 通过路径拿到对应的记录 有了记录之后 就可以找到对象的匹配

        // 相当于this.router.matcher.match
        let route = this.router.match(location)    // {'/',matched:[]}
        // console.log('route-----', route);
        // 防止重复跳转 不需要再次渲染  匹配到的个数和路径都是相同的 就不需要再次跳转了
        if (location == this.current.path && route.matched.length == this.current.matched.length) {
            return
        }
        console.log('更新current,路由发生变化了');
        // 在更新前先调用注册好的导航守卫
        let queue = [].concat(this.router.beforeHooks) // 在当前实例上拿到对应的钩子 可能还有其他的钩子拼成队列
        // console.log('queue',queue);

        const iterator = (hook,next)=>{
            // this.current=> from   route=> to  ()=>{next()} => next函数  将next封装成高阶函数可以在箭头函数里做些其他操作
            hook(this.current,route,()=>{
                next()
            })
        }
        // 把我们队列里的函数依次执行 并且调用传入的iterator方法 
        runQueue(queue,iterator,()=>{
            // 执行完所有的路由前置导航后 如路由拦截啥的 成功后走更新路由操作

            // 这个route就是当前最新的匹配到的结果
            this.updateRoute(route); // 更新路由即可
            // console.log('onComplete',onComplete);
            // 根据路径加载不同的组件 this.router.matcher.match(location) 组件
            onComplete && onComplete()
        })
    }
    listen(cb) { // 保存回调函数
        this.cb = cb;
    }
    updateRoute(route) {
        // 每次你更新的是current 每次路由切换都会更新current属性 current要是响应式的
        this.current = route;
        // console.log('updateRoute', this.current)
        // 执行回调函数 也就是更改_route值
        // console.log('this.cb',this.cb);
        this.cb && this.cb(route)
    }
}
