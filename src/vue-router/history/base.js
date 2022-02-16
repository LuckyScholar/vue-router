export function createRoute(record,location){
    let res =[] // [/about, /about/a]
    if(record){
        while(record){
            res.unshift(record) // 不停的找父亲 并放在数组的首位
            record = record.parent
        }
    }

    return {
        ...location,
        matched:res
    }
}

export default class History{
    constructor(router){
        this.router = router

        // 当我们创建完路由后 先有一个默认值 路径和匹配到的记录做一个映射表
        // 默认当创建history时 路径应该是/ 并且匹配到的记录是[]
        this.current = createRoute(null,{
            // 存放路由状态的
            path:'/'
        })
        console.log('this.current',this.current);
        // this.current = { path:'/', matched: []}
    }
    transitionTo(location,onComplete){
        // 跳转时都会调用此方法 from... to...
        // 路径变化了 视图还要刷新 响应式的数据原理

        // 获取当前路径匹配出对应的记录，当路径变化时获取对应的记录  => 渲染页面 （router-view实现的）
        // 通过路径拿到对应的记录 有了记录之后 就可以找到对象的匹配
        let route = this.router.match(location)    // {'/',matched:[]}
        console.log('route-----',route);
        // 防止重复跳转 不需要再次渲染  匹配到的个数和路径都是相同的 就不需要再次跳转了
        if(location == this.current.path && route.matched.length == this.current.matched.length){
            return 
        }
        console.log('更新current,路由发生变化了');
        // 这个route就是当前最新的匹配到的结果
        this.updateRoute(route); // 更新路由即可

        // 根据路径加载不同的组件 this.router.matcher.match(location) 组件
        onComplete && onComplete()
    }
    listen(cb) { // 保存回调函数
        this.cb = cb;
    }
    updateRoute(route){  // 更新current属性
        this.current =route;
    }
}
