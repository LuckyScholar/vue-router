export default {
    name: 'routerLink',
    props: { // 属性接受
        to: {
            type: String,
            required: true
        },
        tag: {
            type: String,
            default: 'a'
        }
    },
    methods: {
        // 指定跳转方法
        handler(to) {
            // 调用$router实例中的push方法进行跳转
            this.$router.push(to)
        }
    },
    render() {
        let { tag, to } = this
        // jsx语法 绑定事件  this指代的是当前组件  (插槽 分为具名插槽 )
        return <tag onclick={this.handler.bind(this, to)}>{this.$slots.default}</tag>
    }
}