<template>
    <div class="cnt_full">
        <div class="cnt" v-if="!loading && myProducts.length !== 0">
            <h1 class="c_title">Products</h1>
            <div
                    max-width="768"
                    class="mx-auto mb-4"

                    v-for="(product, i) in myProducts"
                    :key="i"
                    :to="`/product/${product.id}`"
            >
                <div
                        class="py-2 pl-2"
                >
                    <div class="shrink">
                        <img
                                height="100"
                                width="100"
                                :src="product.imageSrc"
                        />
                    </div>

                    <div>
                        <div>
                            <div class="overline mb-4">{{product.title}}</div>
                            <div class="headline mb-1">${{product.price}}</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div v-else-if="!loading && myProducts.length === 0">
            <h1 class="c_title">You haven't products yet!</h1>
        </div>
        <Spinner v-else/>
    </div>

</template>

<script>
    export default {
        computed: {
            myProducts() {
                // console.log(this.$store.getters.myProducts);
                return this.$store.getters.myProducts
            },
            loading() {
                return this.$store.getters.loading
            }
        }
    }
</script>

<style scoped>

</style>