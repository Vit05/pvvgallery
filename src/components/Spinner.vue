<template>
    <div class="c_overlay">
        <p-spinner
                size="huge"
                message="Loading..."
                text-fg-color="#fff"
                line-fg-color="#00dffc"></p-spinner>
    </div>
</template>

<script>
    import Spinner from 'vue-simple-spinner'

    export default {
        data() {
            return {}
        },
        components:{
            'p-spinner':Spinner
        }
    };
</script>

<style scoped lang="scss">
    .c_overlay {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        z-index: 2500;
        width: 100%;
        background-color: rgba(black, 0.5);

    }

</style>