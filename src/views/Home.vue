<template>
    <div>Home页面</div>
</template>

<script>
export default {
    mounted(){
        // $route放的都是路由相关的属性
        // $router放的都是路由的方法
        console.log(this.$route);
        console.log(this.$router);
    }
}
</script>

<style scoped></style>
