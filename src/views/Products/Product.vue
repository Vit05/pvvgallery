<template>
    <div class="cnt_full">

        <div v-if="!loading" class="cnt c_product">
            <div class="c_pic">
                <ImageItem
                        class="article-item__image"
                        v-if="product.imageSrc"
                        :source="product.imageSrc"
                />

            </div>
            <div class="c_description">
                <p class="c_desc_item">
                    <span class="c_key">Name:</span>
                    <span class="c_value">{{ product.title }}</span>
                </p>
               <!-- <p class="c_desc_item">
                    <span class="c_key">Vendor:</span>
                    <span class="c_value">{{ product.vendor }}</span>
                </p>-->
                <p class="c_desc_item">
                    <span class="c_key">Color:</span>
                    <span class="c_value">{{ product.color }}</span>
                </p>
                <p class="c_desc_item">
                    <span class="c_key">Material:</span>
                    <span class="c_value">{{ product.material }}</span>
                </p>
                <p class="c_desc_item">
                    <span class="c_key">Price:</span>
                    <span class="c_value">$ {{ product.price }}</span>
                </p>
                <p class="c_desc_item" v-if="product.description">
                    <span class="c_key">Description:</span>
                    <span class="c_value">{{ product.description }}</span>
                </p>


                <div class="c_btn_row">
                    <template v-if="isOwner" >
                        <button class="c_btn" @click="openEditModal">edit</button>
                        <button class="c_btn" @click="deleteProduct"
                                style="background:brown; border-color: brown"
                                :productId="product.id">delete</button>
                    </template>



                    <button v-if="!isOwner" class="c_btn" @click="openBuyModal" :productId="product.id" :ownerId="product.ownerId">buy</button>
                </div>

            </div>
            <app-buy-dialog :product="product"></app-buy-dialog>
            <app-edit-dialog :product="product"></app-edit-dialog>
        </div>
        <Spinner v-else/>


    </div>
</template>

<script>
    import fb from 'firebase'
    import ImageItem from "../../components/ImageItem";

    export default {
        props: ['id'],
        data() {
            return {
                currentProduct: {
                    id: null,
                    ownerId: null
                },
            }
        },
        computed: {
            product() {
                const id = this.id;
                return this.$store.getters.productById(id)
            },
            loading() {
                return this.$store.getters.loading
            },
            isOwner() {
                if (this.$store.getters.isUserLoggedIn) {
                    return this.product.ownerId === fb.auth().currentUser.uid
                } else {
                    // console.log('YOU DO NOT LOGIN')
                }
            }
        },
        methods: {
            openBuyModal() {
                this.$modal.show('product-modal');
            },
            openEditModal() {
                this.$modal.show('edit-product-modal');
            },
            deleteProduct(){
                this.$store.dispatch('deleteProduct', {
                    id: this.product.id
                }).then(() => {
                    this.$router.push('/')
                })
                    .catch(() => {
                    })

            }
        },
        components: {
            ImageItem,
        },
        beforeCreate: function(){
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
        }
    }
</script>

<style scoped lang="scss">
    .c_product {
        display: flex;
        padding-top: 50px;
        padding-bottom: 50px;

        .c_pic {
            width: 50%;
        }

        .c_description {
            width: 50%;
            padding-left: 50px;

            .c_desc_item {
                width: 100%;
                display: flex;
                margin-bottom: 10px;
            }

            .c_key {
                width: 150px;
                font-weight: 700;
                display: block;
            }
        }
    }
</style>