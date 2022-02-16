import History from './base'

function ensureSlash(){
    if(window.location.hash){
        return 
    }
    window.location.hash = '/'
}

export default class HashHistory extends History{
    constructor(router){
        super(router)
        this.router = router
        // 如果使用hashHistory 默认如果没有hash 应该跳转到 #/
        ensureSlash();
    }
    getCurrentLocation(){
        return window.location.hash.slice(1)    // 从#后面开始截取
    }
    setupListener(){
        window.addEventListener('hashchange',()=>{
            // hash值变化 再次执行匹配操作进行跳转
            this.transitionTo(this.getCurrentLocation())
        })
    }
    push(location){
        this.transitionTo(location, ()=>{
            window.location.hash = location // 通过$router.push方法更新hash值 变化后跳转 但是不会重新更新current属性
        })
    }

}

