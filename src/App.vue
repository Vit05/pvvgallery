<template>
    <div id="app" class="wrapper">


        <MainHeader></MainHeader>
        <router-view/>
        <MainFooter></MainFooter>
    </div>
</template>
<script>
    import MainHeader from "./components/mainHeader";
    import MainFooter from "./components/mainFooter";

    export default {
        components: {
            MainHeader,
            MainFooter
        }
    }
</script>
<style lang="scss">

    .wrapper {
        max-width: 100%;
    }

    /*#app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }*/
</style>
