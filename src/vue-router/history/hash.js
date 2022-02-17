import History from './base'

function ensureSlash() {
    if (window.location.hash) {
        return
    }
    window.location.hash = '/'
}

function getHash() {
    return window.location.hash.slice(1)    // 从#后面开始截取
}
export default class HashHistory extends History {
    constructor(router) {
        super(router)
        this.router = router
        // 如果使用hashHistory 默认如果没有hash 应该跳转到 #/
        ensureSlash();
    }
    getCurrentLocation() {
        return getHash()
    }
    setupListener() {
        window.addEventListener('hashchange', () => {
            // hash值变化 再次执行匹配操作进行跳转
            this.transitionTo(getHash())
        })
    }
    push(location) {
        // 跳转的路径 改变hash值的回调函数
        this.transitionTo(location, () => {
            window.location.hash = location // 通过$router.push方法更新hash值 变化后跳转 但是不会重新更新current属性
        })
    }

}

