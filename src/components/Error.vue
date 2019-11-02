<template>
    <div class="c_error">
        <slot></slot>
        <button @click="closeError"> Close</button>
    </div>
</template>

<script>
    export default {
        name: "error",
        methods:{
            closeError() {
                this.$store.dispatch('clearError')
            },
        }
    }
</script>

<style scoped lang="scss">
.c_error{
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    background-color: brown;
    z-index: 1000;
    color: white;
}
</style>