<template>
    <div class="cnt_full">
        <template v-if="!loading">
            <!-- <v-container class="lighten-10" fluid>
                 <v-row>
                     <v-carousel :show-arrows="true">
                         <v-carousel-item
                                 v-for="(item,i) in productsPromo"
                                 :key="i"
                                 :src="item.imageSrc"
                         ></v-carousel-item>
                     </v-carousel>
                 </v-row>
             </v-container>-->
            <div class="c_list">

                <ImageItem
                        class="c_product"
                        v-for="(item, i) in products"
                        :key="i"
                        :source="item.imageSrc">
                    <div class="c_product_desc">
                        <span v-if="item.productCreator" class="c_creator">by {{item.productCreator}}</span>

                        <router-link class="c_btn" :to="`/product/${item.id}`">More</router-link>
                        <button class="c_btn" @click="openModal" :productId="item.id" :ownerId="item.ownerId">buy
                        </button>
                    </div>
                </ImageItem>
            </div>
            <app-buy-dialog :product="currentProduct" v-if="currentProduct"></app-buy-dialog>

        </template>
        <div v-else>
            <Spinner></Spinner>
        </div>
    </div>


</template>

<script>
    // import Spinner from 'vue-simple-spinner'
    import ImageItem from "../components/ImageItem.vue";

    export default {
        data() {
            return {

                currentProduct: {
                    id: null,
                    ownerId: null
                },
                overlay: false,
            }
        },
        computed: {
            products() {
                return this.$store.getters.products
            },
            productsPromo() {
                return this.$store.getters.productsPromo
            },
            product() {
                const id = this.id;
                return this.$store.getters.productById(id)
            },
            loading() {
                return this.$store.getters.loading
            }
        },
        methods: {
            openModal($event) {
                this.currentProduct.id = $event.target.attributes.productId.value
                this.currentProduct.ownerId = $event.target.attributes.ownerId.value
                this.$modal.show('product-modal');
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
    };
</script>


<style lang="scss">


    .c_list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        .c_product {
            width: calc(100% / 3);
            height: 40vh;
            position: relative;

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

            img {
                object-fit: cover;
                height: 40vh;
                width: 100%;
            }

.c_creator{
    position: absolute;
    color: #fff;
    left: 10px;
    top: 10px;
    z-index: 10;
    font-size: 12px;
}
            .c_product_desc {
                padding: 30px;
                display: flex;
                justify-content: center;
                align-items: flex-end;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                width: 100%;
                height: 100%;
                visibility: hidden;
                opacity: 0;
                transition: all ease-in-out .5s;

                .c_btn {
                    width: 30%;
                    margin: 0 20px;
                }
            }
        }
    }
</style>
