<template>
    <div>
        <div class="cnt" v-if="!loading && myProducts.length !== 0">
            <h1 class="c_title">Products</h1>
            <div class="c_product_list">
                <div v-for="(product, i) in myProducts"
                     :key="i"
                     class="c_product"
                >
                    <div>
                        <ImageItem
                                class="article-item__image"
                                v-if="product.imageSrc"
                                :source="product.imageSrc"
                        />


                        <div>
                            <div class="c_subtitle">{{product.title}}</div>
                            <div class="">${{product.price}}</div>
                        </div>
                        <router-link :to="`/product/${product.id}`" class="c_btn">details</router-link>

                    </div>
                </div>
            </div>
        </div>

        <div class="cnt" v-else-if="!loading && myProducts.length === 0">
            <h1 class="c_title">You haven't products yet!</h1>
        </div>

        <Spinner v-else/>
    </div>

</template>

<script>
    import ImageItem from "../../components/ImageItem";

    export default {

        methods: {},
        computed: {
            myProducts() {
                return this.$store.getters.myProducts
            },
            loading() {
                return this.$store.getters.loading
            }
        },
        components: {
            ImageItem
        },
       /* beforeCreate: function(){
            console.log('beforeCreate()');
        },
        created: function(){
            console.log('created()');

        },
        beforeMount: function(){
            console.log('beforeMount()');
        },
        mounted: function(){
            console.log('mounted()');
        },
        beforeUpdate: function(){
            console.log('beforeUpdate()');
        },
        updated: function(){
            console.log('updated()');
        },
        beforeDestroy: function(){
            console.log('beforeDestroy()');
        },
        destroyed: function(){
            console.log('destroyed()');
        }*/
    }
</script>

<style lang="scss">
    .c_product_list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .c_product {
            width: 30%;
            position: relative;
            margin-bottom: 30px;

            @media screen and (max-width: 1024px) {
                width: 50%;
            }

            &:hover {
                .c_product_desc {
                    visibility: visible;
                    opacity: 1;
                }

                img {
                    filter: grayscale(100%) brightness(50%);
                }
            }

            .article-item__image {
                height: 300px;
            }

            img {
                object-fit: cover;
                height: 300px;
                width: 100%;
            }
        }
    }
</style>