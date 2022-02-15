import createRouteMap from "./create-route-map";

export default function createMatcher(routes){
    // pathMap ={ '/':Home, '/about':About, '/about/a':AboutA, '/about/b':AboutB}
    // 收集所有的路由路径, 收集路径的对应渲染关系
    let {pathMap} = createRouteMap(routes)  //扁平化配置

    function addRoutes(routes){
        createRouteMap(routes,pathMap)  //将用户动态添加的路由也添加进这个扁平化的路由表中
        console.log('pathMap',pathMap);
    }
    function match(){

    }
    return {
        addRoutes,  //动态添加路由
        match   // 用于匹配路径
    }
}