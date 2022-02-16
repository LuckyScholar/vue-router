export default {
    name: 'routerView',
    functional: true, // 函数式组件 使组件无状态 (没有 data) 和无实例 (没有 this 上下文)。他们用一个简单的 render 函数返回虚拟节点使它们渲染的代价更小。
    render(h, { parent, data }) {    // 调用render方法说明它一定是个routerView组件
        // 获取当前对应要渲染的记录
        let route = parent.$route; // this.current
        let depth = 0
        data.routerView = true  // 标识路由属性
        console.log('parent', parent)
        // App.vue 中渲染组件时 默认会调用render函数 父亲中没有data.routerView属性
        // 渲染第一层 并且标识当前routerView为true
        while (parent) {  // router-view的父标签
            // $vnode 代表的是占位符vnode 组件的标签名和虚拟节点
            // _vnode 组件内部渲染的虚拟节点
            // console.log('parent.$vnode', parent.$vnode)
            // console.log('parent._vnode', parent._vnode)
            if (parent.$vnode && parent.$vnode.data.routerView) {
                depth++;
            }
            parent = parent.$parent // 不停的找父亲
        }
        // 第一层router-view 渲染第一个record 第二个router-view渲染第二个
        let record = route.matched[depth]   // 获取对应层级的记录
        if (!record) {
            return h()  // 空的虚拟节点
        }
        // components
        return h(record.component, data)
    }
}




{/* 
<app></app>   <-- parent.$vnode app就是组件的名字 他是个占位符

app这个组件的内容例如是
<template>
    <div>
        我是app
    </div>
</template>
*/}