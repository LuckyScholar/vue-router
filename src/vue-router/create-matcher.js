import createRouteMap from "./create-route-map";
import { createRoute } from './history/base'

export default function createMatcher(routes){
    // pathMap ={ '/':Home, '/about':About, '/about/a':AboutA, '/about/b':AboutB}
    // 收集所有的路由路径, 收集路径的对应渲染关系
    let {pathMap} = createRouteMap(routes)  //扁平化配置

    function addRoutes(routes){
        createRouteMap(routes,pathMap)  //将用户动态添加的路由也添加进这个扁平化的路由表中
        console.log('pathMap',pathMap);
    }
    function match(location){ // 等会要通过用户输   入的路径 获取对应的匹配记录
        let record = pathMap[location];// 获取对应的记录
        // /about/a  => matched:[/about,/a]
        return createRoute(record,{
            path:location
        })
    }
    return {
        addRoutes,  //动态添加路由
        match   // 用于匹配路径
    }
}
