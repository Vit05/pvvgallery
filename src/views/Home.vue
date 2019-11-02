<template>
    <div class="cnt_full">
        <div v-if="!loading" class="c_list">
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


            <div v-for="(item, i) in products"
                 :key="i"
                 class="c_product"
            >
                <!--                <router-link :aria-label="item.title" :id="item.id" :ownerId="item.ownerId" :to="`/product/${item.id}`">-->

                <img v-if="item.imageSrc"
                     :src="item.imageSrc"/>
                <!--                </router-link>-->

                <!--   <div>{{item.title}}</div>

                   <div>Price: ${{item.price}}</div>

                   {{item.description}}-->


                <div class="c_product_desc">
                    <router-link class="c_btn" :to="`/product/${item.id}`">More</router-link>
                    <button class="c_btn" @click="openModal" :productId="item.id" :ownerId="item.ownerId">buy</button>
                </div>
            </div>


            <app-buy-dialog :product="currentProduct" v-if="currentProduct"></app-buy-dialog>

        </div>
        <div v-else>

                <Spinner></Spinner>

        </div>
    </div>


</template>

<script>
    // import Spinner from 'vue-simple-spinner'

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
        /*components: {
            Spinner
        }*/
    };
</script>


<style scoped lang="scss">

   /* .c_overlay {
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

    }*/


    .c_list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        .c_product {
            width: calc(100% / 3);
            height: 40vh;
            position: relative;

            @media screen and (max-width:1024px) {
                width: 50%;
            }
            &:hover {
                .c_product_desc {
                    visibility: visible;
                    opacity: 1;

                }

                img {
                    filter: grayscale(100%)  brightness(50%);
                }
            }


            img {
                height: 40vh;
                object-fit: cover;
                width: 100%;
                transition: all ease-in-out .5s;

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
