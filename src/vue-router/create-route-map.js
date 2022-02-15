export default function createRouteMap(routes,oldPathMap){
    let pathMap = oldPathMap || Object.create(null) // 默认没有传递就直接创建
    // 映射关系
    routes.forEach(route => {
        // 添加到路由记录，用户配置可能是无限层级，稍后要递归调用此方法
        addRouteRecord(route,pathMap)
    });
    return {
        pathMap
    }
}

// 先序深度
function addRouteRecord(route,pathMap,parent){  // parent就是父亲
    // 当访问/时 应该渲染home组件 / => {Home}
    // 如果是子路由记录 需要增加前缀 
    let path = parent? (parent.path + '/' + route.path) : route.path
    let record ={
        path,
        component:route.component
    }
    // 不能定义重复路由 否则只生效第一个
    if(!pathMap[path]){
        pathMap[path] = record
    }
    if(route.children){
        // 递归去找子路由
        route.children.forEach(childRoute=>{
            // 遍历儿子时 将父亲的记录传进去
            addRouteRecord(childRoute,pathMap,record)
        })
    }

}