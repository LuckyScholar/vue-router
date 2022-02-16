<template>
    <div id="app">
        <router-link to="/">首页</router-link>
        <router-link to="/about">About页面</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "app",
    mounted() {
        console.log('this._routerRoot._router',this._routerRoot._router)
    },
}
</script>

